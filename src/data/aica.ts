export type CategoryGroupId =
  | "influencia"
  | "comunicacao"
  | "cultura"
  | "negocios"
  | "impacto"
  | "inovacao";

export type Category = {
  slug: string;
  name: string;
  group: CategoryGroupId;
  description: string;
};

export type Nominee = {
  slug: string;
  name: string;
  country: string;
  categorySlug: string;
  bio: string;
  contribution: string;
};

export const CATEGORY_GROUPS: { id: CategoryGroupId; label: string; blurb: string }[] = [
  {
    id: "influencia",
    label: "Influência & Cultura",
    blurb: "Vozes que moldam conversas, estéticas e comportamentos na lusofonia.",
  },
  {
    id: "comunicacao",
    label: "Comunicação & Media",
    blurb: "Quem informa, entrevista, apresenta e conta as histórias do nosso tempo.",
  },
  {
    id: "cultura",
    label: "Cultura & Criatividade",
    blurb: "Artistas e criadores que exportam identidade lusófona.",
  },
  {
    id: "negocios",
    label: "Empreendedorismo & Negócios",
    blurb: "Liderança, marcas e empresas que constroem valor duradouro.",
  },
  {
    id: "impacto",
    label: "Impacto Social",
    blurb: "Projectos que transformam comunidades de forma mensurável.",
  },
  {
    id: "inovacao",
    label: "Inovação & Tecnologia",
    blurb: "Tecnologia, produto e ideias que aceleram o futuro.",
  },
];

export const CATEGORIES: Category[] = [
  {
    slug: "influenciador-do-ano",
    name: "Influenciador do Ano",
    group: "influencia",
    description: "A personalidade digital com maior consistência, alcance e influência positiva.",
  },
  {
    slug: "criador-digital-do-ano",
    name: "Criador Digital do Ano",
    group: "influencia",
    description: "Criatividade, originalidade e domínio de formato em conteúdo digital.",
  },
  {
    slug: "voz-jovem-da-lusofonia",
    name: "Voz Jovem da Lusofonia",
    group: "influencia",
    description: "Menos de 30 anos, uma mensagem que atravessa fronteiras.",
  },
  {
    slug: "melhor-apresentadora-lusofona",
    name: "Melhor Apresentadora Lusófona",
    group: "comunicacao",
    description: "Presença, rigor e carisma no ecrã e no palco.",
  },
  {
    slug: "apresentador-do-ano",
    name: "Apresentador do Ano",
    group: "comunicacao",
    description: "Condução de programas com impacto de audiência e qualidade editorial.",
  },
  {
    slug: "podcast-do-ano",
    name: "Podcast do Ano",
    group: "comunicacao",
    description: "O formato áudio que mais marcou a conversa pública.",
  },
  {
    slug: "influencia-cultural",
    name: "Influência Cultural",
    group: "cultura",
    description: "Quem elevou a cultura lusófona dentro e fora do continente.",
  },
  {
    slug: "artista-do-ano",
    name: "Artista do Ano",
    group: "cultura",
    description: "Obra, palco e projecção internacional no último ciclo.",
  },
  {
    slug: "empreendedor-do-ano",
    name: "Empreendedor do Ano",
    group: "negocios",
    description: "Visão, execução e resultados num mercado exigente.",
  },
  {
    slug: "startup-do-ano",
    name: "Startup do Ano",
    group: "negocios",
    description: "Crescimento, tracção e relevância para o mercado lusófono.",
  },
  {
    slug: "lideranca-jovem",
    name: "Liderança Jovem",
    group: "negocios",
    description: "Liderança emergente com influência real na sua indústria.",
  },
  {
    slug: "projecto-social-do-ano",
    name: "Projecto Social do Ano",
    group: "impacto",
    description: "Impacto comunitário comprovado e sustentável.",
  },
  {
    slug: "comunicacao-sem-fronteiras",
    name: "Comunicação Sem Fronteiras",
    group: "impacto",
    description: "Iniciativas que aproximam os povos de língua portuguesa.",
  },
  {
    slug: "inovacao-do-ano",
    name: "Inovação do Ano",
    group: "inovacao",
    description: "A solução tecnológica que resolveu um problema real.",
  },
  {
    slug: "marca-digital-do-ano",
    name: "Marca Digital do Ano",
    group: "inovacao",
    description: "A marca com melhor construção de presença e comunidade digital.",
  },
];

export const NOMINEES: Nominee[] = [
  {
    slug: "patricia-pacheco",
    name: "Patrícia Pacheco",
    country: "Angola",
    categorySlug: "melhor-apresentadora-lusofona",
    bio: "Apresentadora e comunicadora angolana com uma década de televisão, rádio e grandes eventos.",
    contribution:
      "Conduziu coberturas de referência que aproximaram audiências de Luanda, Maputo e Lisboa.",
  },
  {
    slug: "nelson-quintas",
    name: "Nelson Quintas",
    country: "Angola",
    categorySlug: "apresentador-do-ano",
    bio: "Rosto de um dos formatos de entrevista mais vistos do país.",
    contribution: "Trouxe rigor jornalístico ao entretenimento televisivo.",
  },
  {
    slug: "mariana-fortes",
    name: "Mariana Fortes",
    country: "Cabo Verde",
    categorySlug: "criador-digital-do-ano",
    bio: "Criadora digital cabo-verdiana focada em cultura das ilhas e diáspora.",
    contribution: "Construiu uma comunidade lusófona em torno da identidade crioula.",
  },
  {
    slug: "edson-macuacua",
    name: "Edson Macuácua",
    country: "Moçambique",
    categorySlug: "influenciador-do-ano",
    bio: "Comunicador moçambicano com forte presença em vídeo curto.",
    contribution: "Campanhas de literacia financeira que alcançaram milhões de jovens.",
  },
  {
    slug: "joana-almeida",
    name: "Joana Almeida",
    country: "Portugal",
    categorySlug: "podcast-do-ano",
    bio: "Anfitriã de um podcast semanal sobre criação e negócios na lusofonia.",
    contribution: "Deu palco a fundadores africanos num mercado editorial europeu.",
  },
  {
    slug: "ruy-do-carmo",
    name: "Ruy do Carmo",
    country: "Brasil",
    categorySlug: "artista-do-ano",
    bio: "Músico e produtor com trabalho entre Salvador, Luanda e Lisboa.",
    contribution: "Fusão sonora que colocou ritmos angolanos nas tabelas brasileiras.",
  },
  {
    slug: "aissa-embalo",
    name: "Aissá Embaló",
    country: "Guiné-Bissau",
    categorySlug: "projecto-social-do-ano",
    bio: "Fundadora de uma rede de formação digital para raparigas.",
    contribution: "Mais de 4.000 jovens formadas em competências digitais.",
  },
  {
    slug: "carlos-menezes",
    name: "Carlos Menezes",
    country: "São Tomé e Príncipe",
    categorySlug: "empreendedor-do-ano",
    bio: "Empresário do sector agroalimentar com operação em três países.",
    contribution: "Cadeia de valor local que exporta cacau com marca própria.",
  },
  {
    slug: "tandala-tech",
    name: "Tandala Tech",
    country: "Angola",
    categorySlug: "startup-do-ano",
    bio: "Plataforma de pagamentos digitais para pequenos comerciantes.",
    contribution: "Digitalizou milhares de microempresas fora dos grandes centros.",
  },
  {
    slug: "sofia-lemos",
    name: "Sofia Lemos",
    country: "Angola",
    categorySlug: "voz-jovem-da-lusofonia",
    bio: "Activista e criadora de conteúdo sobre educação e cidadania.",
    contribution: "Mobilizou campanhas jovens em cinco países lusófonos.",
  },
  {
    slug: "kianda-labs",
    name: "Kianda Labs",
    country: "Angola",
    categorySlug: "inovacao-do-ano",
    bio: "Laboratório de produto digital dedicado a serviços públicos.",
    contribution: "Reduziu tempos de atendimento com soluções de software cívico.",
  },
  {
    slug: "revista-baia",
    name: "Revista Baía",
    country: "Moçambique",
    categorySlug: "marca-digital-do-ano",
    bio: "Publicação digital de cultura e estilo de vida.",
    contribution: "Referência editorial com comunidade activa em toda a lusofonia.",
  },
];

export const COUNTRIES = [
  "Angola",
  "Moçambique",
  "Cabo Verde",
  "Guiné-Bissau",
  "São Tomé e Príncipe",
  "Portugal",
  "Brasil",
  "Timor-Leste",
];

export const VOTING_OPENS = "2026-10-01T08:00:00Z";
export const GALA_DATE = "2026-11-21T19:00:00Z";

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getNominee = (slug: string) => NOMINEES.find((n) => n.slug === slug);
export const nomineesByCategory = (slug: string) =>
  NOMINEES.filter((n) => n.categorySlug === slug);
