import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  googleProvider,
  signInWithPopup,
  ref,
  set,
  get,
  update,
  push,
  type User,
} from "@/lib/firebase";
import { toast } from "sonner";

export type UserProfile = {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  country?: string;
  bio?: string;
  createdAt?: string;
};

export type UserVote = {
  id: string;
  categorySlug: string;
  nomineeSlug: string;
  nomineeName: string;
  timestamp: string;
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  votes: UserVote[];
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<boolean>;
  recordVoteInFirebase: (categorySlug: string, nomineeSlug: string, nomineeName: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [votes, setVotes] = useState<UserVote[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync user profile & votes from Firebase Realtime Database
  const fetchUserData = async (currentUser: User) => {
    try {
      const userRef = ref(db, `users/${currentUser.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const val = snapshot.val();
        setProfile({
          uid: currentUser.uid,
          displayName: val.displayName || currentUser.displayName || "Eleitor AICA",
          email: currentUser.email || val.email || "",
          photoURL: val.photoURL || currentUser.photoURL || "",
          country: val.country || "Angola",
          bio: val.bio || "",
          createdAt: val.createdAt || new Date().toISOString(),
        });

        if (val.votes) {
          const voteList: UserVote[] = Object.entries(val.votes).map(([id, v]: [string, any]) => ({
            id,
            categorySlug: v.categorySlug,
            nomineeSlug: v.nomineeSlug,
            nomineeName: v.nomineeName,
            timestamp: v.timestamp,
          }));
          setVotes(voteList.reverse());
        }
      } else {
        // Create initial Realtime DB user profile
        const newProfile: UserProfile = {
          uid: currentUser.uid,
          displayName: currentUser.displayName || "Eleitor AICA",
          email: currentUser.email || "",
          photoURL: currentUser.photoURL || "",
          country: "Angola",
          bio: "Eleitor Diamante no AICA 2026",
          createdAt: new Date().toISOString(),
        };
        await set(userRef, newProfile);
        setProfile(newProfile);
      }
    } catch (err) {
      console.error("Error fetching user profile from Realtime Database", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserData(currentUser);
      } else {
        setProfile(null);
        setVotes([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      await fetchUserData(res.user);
      toast.success("Login efetuado com sucesso!");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Email ou palavra-passe incorretos.");
      return false;
    }
  };

  const signup = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(res.user, { displayName: name });
      const newProfile: UserProfile = {
        uid: res.user.uid,
        displayName: name,
        email,
        photoURL: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`,
        country: "Angola",
        bio: "Eleitor registado AICA 2026",
        createdAt: new Date().toISOString(),
      };
      await set(ref(db, `users/${res.user.uid}`), newProfile);
      setProfile(newProfile);
      toast.success("Conta criada com sucesso no AICA!");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Não foi possível criar a conta.");
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await fetchUserData(res.user);
      toast.success(`Bem-vindo, ${res.user.displayName}!`);
      return true;
    } catch (err: any) {
      toast.error("Erro ao autenticar com Google.");
      return false;
    }
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
    setVotes([]);
    toast.message("Sessão encerrada com sucesso.");
  };

  const updateProfileData = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user || !profile) return false;
    try {
      const userRef = ref(db, `users/${user.uid}`);
      await update(userRef, data);

      if (data.displayName || data.photoURL) {
        await updateProfile(user, {
          displayName: data.displayName ?? user.displayName,
          photoURL: data.photoURL ?? user.photoURL,
        });
      }

      setProfile((prev) => (prev ? { ...prev, ...data } : null));
      toast.success("Perfil atualizado no Firebase!");
      return true;
    } catch (err) {
      toast.error("Erro ao atualizar perfil.");
      return false;
    }
  };

  const recordVoteInFirebase = async (
    categorySlug: string,
    nomineeSlug: string,
    nomineeName: string,
  ): Promise<boolean> => {
    if (!user) {
      toast.message("Inicie sessão para guardar o seu histórico oficial no Firebase!");
    }
    try {
      const voteData = {
        categorySlug,
        nomineeSlug,
        nomineeName,
        voterEmail: user?.email || "anonimo@aica.ao",
        voterUid: user?.uid || "anonimo",
        timestamp: new Date().toISOString(),
      };

      // 1. Store in global Firebase Realtime DB votes
      const votesRef = ref(db, "votes");
      await push(votesRef, voteData);

      // 2. Increment nominee tally in Realtime DB
      const nomineeRef = ref(db, `nominees/${nomineeSlug}/votesCount`);
      const snapshot = await get(nomineeRef);
      const currentVotes = snapshot.exists() ? snapshot.val() : 0;
      await set(nomineeRef, currentVotes + 1);

      // 3. Store in user's personal vote history if logged in
      if (user) {
        const userVotesRef = ref(db, `users/${user.uid}/votes`);
        await push(userVotesRef, voteData);
        setVotes((prev) => [
          {
            id: Math.random().toString(36).substring(2),
            categorySlug,
            nomineeSlug,
            nomineeName,
            timestamp: voteData.timestamp,
          },
          ...prev,
        ]);
      }

      return true;
    } catch (err) {
      console.error("Firebase vote save error", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        votes,
        loading,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateProfileData,
        recordVoteInFirebase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
