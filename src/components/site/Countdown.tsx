import { useEffect, useState } from "react";

function diff(target: string) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ target, label }: { target: string; label: string }) {
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff(target));
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { value: time?.days, unit: "Dias" },
    { value: time?.hours, unit: "Horas" },
    { value: time?.minutes, unit: "Min" },
    { value: time?.seconds, unit: "Seg" },
  ];

  return (
    <div>
      <p className="eyebrow text-center">{label}</p>
      <div className="mt-8 grid grid-cols-4 gap-px bg-border/60">
        {cells.map((c) => (
          <div key={c.unit} className="bg-background/80 px-2 py-7 text-center">
            <p className="font-display text-3xl text-gold-gradient md:text-5xl">
              {c.value === undefined ? "--" : pad(c.value)}
            </p>
            <p className="mt-3 text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
              {c.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
