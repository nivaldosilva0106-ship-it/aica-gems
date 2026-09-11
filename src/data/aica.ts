export type CategoryGroupId =
  "influencia" | "comunicacao" | "cultura" | "negocios" | "impacto" | "inovacao";

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

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  body: string[];
};

export type Partner = {
  name: string;
  tier: "apresentador" | "oficial" | "media";
  blurb: string;
};

export const CATEGORY_GROUPS: {
  id: CategoryGroupId;
  label: string;
  short: string;
  blurb: string;
}[] = [
  {
    id: "influencia",
    label: "Influência & Cultura",
    short: "Influência",
    blurb: "Vozes que moldam conversas, estéticas e comportamentos na lusofonia.",
  },
  {
    id: "comunicacao",
    label: "Comunicação & Media",
    short: "Comunicação",
    blurb: "Quem informa, entrevista, apresenta e conta as histórias do nosso tempo.",
  },
  {
    id: "cultura",
    label: "Cultura & Criatividade",
    short: "Cultura",
    blurb: "Artistas e criadores que exportam identidade lusófona.",
  },
  {
    id: "negocios",
    label: "Empreendedorismo & Negócios",
    short: "Negócios",
    blurb: "Liderança, marcas e empresas que constroem valor duradouro.",
  },
  {
    id: "impacto",
    label: "Impacto Social",
    short: "Impacto",
    blurb: "Projectos que transformam comunidades de forma mensurável.",
  },
  {
    id: "inovacao",
    label: "Inovação & Tecnologia",
    short: "Inovação",
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
    slug: "programa-do-ano",
    name: "Programa do Ano",
    group: "comunicacao",
    description: "O formato televisivo ou digital com maior excelência editorial.",
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
    slug: "feliciana-marisa",
    name: "Feliciana Marisa",
    country: "Moçambique",
    categorySlug: "melhor-apresentadora-lusofona",
    bio: "Jornalista e apresentadora com trabalho em televisão e plataformas digitais.",
    contribution: "Deu visibilidade a histórias do Índico num horário nobre lusófono.",
  },
  {
    slug: "soraia-nogueira",
    name: "Soraia Nogueira",
    country: "Portugal",
    categorySlug: "melhor-apresentadora-lusofona",
    bio: "Apresentadora de cultura e actualidade com passagem por rádio e streaming.",
    contribution: "Abriu espaço regular a convidados africanos na televisão portuguesa.",
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
    slug: "rui-caldeira",
    name: "Rui Caldeira",
    country: "Portugal",
    categorySlug: "apresentador-do-ano",
    bio: "Apresentador de debate e actualidade com duas décadas de antena.",
    contribution: "Conduziu debates eleitorais com audiência recorde na diáspora.",
  },
  {
    slug: "helio-mateus",
    name: "Hélio Mateus",
    country: "Moçambique",
    categorySlug: "apresentador-do-ano",
    bio: "Apresentador desportivo e de grandes eventos ao vivo.",
    contribution: "Levou o jornalismo desportivo moçambicano a um palco continental.",
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
    slug: "tiago-nunes",
    name: "Tiago Nunes",
    country: "Brasil",
    categorySlug: "criador-digital-do-ano",
    bio: "Realizador de documentários curtos sobre cidades lusófonas.",
    contribution: "Série sobre mercados africanos com mais de 40 milhões de visualizações.",
  },
  {
    slug: "yara-monteiro",
    name: "Yara Monteiro",
    country: "Moçambique",
    categorySlug: "criador-digital-do-ano",
    bio: "Criadora de conteúdo de moda, língua e quotidiano em Maputo.",
    contribution: "Normalizou o português moçambicano em plataformas globais.",
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
    slug: "lara-tavares",
    name: "Lara Tavares",
    country: "Portugal",
    categorySlug: "influenciador-do-ano",
    bio: "Comunicadora de estilo de vida com foco em consumo consciente.",
    contribution: "Transformou uma comunidade digital numa rede de impacto social.",
  },
  {
    slug: "bruno-kiala",
    name: "Bruno Kiala",
    country: "Angola",
    categorySlug: "influenciador-do-ano",
    bio: "Criador e comentador cultural com audiência em três continentes.",
    contribution: "Colocou o humor angolano no centro da conversa lusófona.",
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
    slug: "palavra-aberta",
    name: "Palavra Aberta",
    country: "Angola",
    categorySlug: "podcast-do-ano",
    bio: "Podcast de entrevistas longas gravado em Luanda.",
    contribution: "Arquivo vivo de pensadores, artistas e empreendedores angolanos.",
  },
  {
    slug: "lusofonia-live",
    name: "Lusofonia Live",
    country: "Brasil",
    categorySlug: "podcast-do-ano",
    bio: "Programa semanal com correspondentes em sete capitais lusófonas.",
    contribution: "Criou o primeiro noticiário áudio verdadeiramente CPLP.",
  },
  {
    slug: "estudio-sete",
    name: "Estúdio Sete",
    country: "Angola",
    categorySlug: "programa-do-ano",
    bio: "Magazine cultural nocturno com convidados de toda a lusofonia.",
    contribution: "Reinventou o talk-show africano com produção de palco cinematográfica.",
  },
  {
    slug: "linha-do-horizonte",
    name: "Linha do Horizonte",
    country: "Portugal",
    categorySlug: "programa-do-ano",
    bio: "Documentário semanal sobre rotas, pessoas e ofícios da língua portuguesa.",
    contribution: "Filmou em todos os países lusófonos numa única temporada.",
  },
  {
    slug: "praia-central",
    name: "Praia Central",
    country: "Cabo Verde",
    categorySlug: "programa-do-ano",
    bio: "Formato de conversa e música gravado ao ar livre.",
    contribution: "Levou a televisão cabo-verdiana a plataformas internacionais.",
  },
  {
    slug: "aline-frazao",
    name: "Aline Frazão",
    country: "Angola",
    categorySlug: "influencia-cultural",
    bio: "Cantora e compositora com obra entre Luanda, Lisboa e Madrid.",
    contribution: "Levou a língua portuguesa a palcos onde raramente era ouvida.",
  },
  {
    slug: "mayra-andrade-lab",
    name: "Atelier Morabeza",
    country: "Cabo Verde",
    categorySlug: "influencia-cultural",
    bio: "Colectivo de design, música e arquivo das ilhas.",
    contribution: "Digitalizou e reeditou um século de memória sonora crioula.",
  },
  {
    slug: "casa-da-palavra",
    name: "Casa da Palavra",
    country: "Brasil",
    categorySlug: "influencia-cultural",
    bio: "Editora e laboratório literário com autores de oito países.",
    contribution: "Publicou a primeira colecção conjunta de poesia lusófona contemporânea.",
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
    slug: "pongo-luz",
    name: "Pongo Luz",
    country: "Angola",
    categorySlug: "artista-do-ano",
    bio: "Artista de palco com linguagem visual própria e discografia bilingue.",
    contribution: "Tournée que esgotou salas em Lisboa, Paris e São Paulo.",
  },
  {
    slug: "nacia-gouveia",
    name: "Nácia Gouveia",
    country: "São Tomé e Príncipe",
    categorySlug: "artista-do-ano",
    bio: "Cantora e compositora da nova geração santomense.",
    contribution: "Álbum de estreia nomeado em três países no mesmo ciclo.",
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
    slug: "narnia-costa",
    name: "Nárnia Costa",
    country: "Angola",
    categorySlug: "empreendedor-do-ano",
    bio: "Fundadora de uma marca de cosmética com matéria-prima nacional.",
    contribution: "Criou 200 postos de trabalho na cadeia de óleo de café e baobá.",
  },
  {
    slug: "miguel-pignatelli",
    name: "Miguel Pignatelli",
    country: "Portugal",
    categorySlug: "empreendedor-do-ano",
    bio: "Investidor e operador de retalho com foco em mercados africanos.",
    contribution: "Abriu a primeira rede de lojas de design lusófono em três capitais.",
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
    slug: "kubinga",
    name: "Kubinga",
    country: "Angola",
    categorySlug: "startup-do-ano",
    bio: "Aplicação de mobilidade urbana com frota de motoristas independentes.",
    contribution: "Reduziu o tempo médio de espera em Luanda em 40 por cento.",
  },
  {
    slug: "paymoz",
    name: "Paymoz",
    country: "Moçambique",
    categorySlug: "startup-do-ano",
    bio: "Carteira digital para remessas e pagamentos de serviços.",
    contribution: "Baixou o custo das remessas da diáspora para metade.",
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
    slug: "kelson-dala",
    name: "Kelson Dala",
    country: "Angola",
    categorySlug: "voz-jovem-da-lusofonia",
    bio: "Jovem jornalista e apresentador digital.",
    contribution: "Criou um noticiário geracional com linguagem própria.",
  },
  {
    slug: "ines-barbosa",
    name: "Inês Barbosa",
    country: "Portugal",
    categorySlug: "voz-jovem-da-lusofonia",
    bio: "Ensaísta e podcaster sobre identidade e diáspora.",
    contribution: "Ensaios virais que reabriram o debate sobre a língua comum.",
  },
  {
    slug: "djamila-silva",
    name: "Djamila Silva",
    country: "Cabo Verde",
    categorySlug: "lideranca-jovem",
    bio: "Directora de uma aceleradora de negócios nas ilhas.",
    contribution: "Acompanhou 60 startups lusófonas no último ciclo.",
  },
  {
    slug: "andre-ganga",
    name: "André Ganga",
    country: "Angola",
    categorySlug: "lideranca-jovem",
    bio: "Líder associativo e fundador de uma rede de mentoria.",
    contribution: "Ligou 1.200 jovens profissionais a conselhos de administração.",
  },
  {
    slug: "telma-pereira",
    name: "Telma Pereira",
    country: "Guiné-Bissau",
    categorySlug: "lideranca-jovem",
    bio: "Advogada e fundadora de um laboratório de políticas públicas.",
    contribution: "Liderou a primeira clínica jurídica digital do país.",
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
    slug: "escola-da-baia",
    name: "Escola da Baía",
    country: "São Tomé e Príncipe",
    categorySlug: "projecto-social-do-ano",
    bio: "Projecto educativo em zonas costeiras com currículo bilingue.",
    contribution: "Reduziu o abandono escolar em três distritos.",
  },
  {
    slug: "maos-da-terra",
    name: "Mãos da Terra",
    country: "Timor-Leste",
    categorySlug: "projecto-social-do-ano",
    bio: "Cooperativa agrícola e de alfabetização em zonas rurais.",
    contribution: "Formou 800 agricultores e abriu bibliotecas comunitárias.",
  },
  {
    slug: "cplp-media-lab",
    name: "CPLP Media Lab",
    country: "Portugal",
    categorySlug: "comunicacao-sem-fronteiras",
    bio: "Laboratório de jornalismo colaborativo entre redacções lusófonas.",
    contribution: "Produziu 40 investigações transnacionais no último ano.",
  },
  {
    slug: "ponte-lisboa-luanda",
    name: "Ponte Lisboa–Luanda",
    country: "Angola",
    categorySlug: "comunicacao-sem-fronteiras",
    bio: "Residência de criadores e jornalistas entre as duas capitais.",
    contribution: "Trocou 120 profissionais e gerou uma rede permanente.",
  },
  {
    slug: "radio-arquipelago",
    name: "Rádio Arquipélago",
    country: "Cabo Verde",
    categorySlug: "comunicacao-sem-fronteiras",
    bio: "Emissora digital com correspondentes nas ilhas e na diáspora.",
    contribution: "Uniu audiências de Boston, Lisboa e Praia num só noticiário.",
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
    slug: "agroluso",
    name: "AgroLuso",
    country: "Moçambique",
    categorySlug: "inovacao-do-ano",
    bio: "Plataforma de dados climáticos para pequenos produtores.",
    contribution: "Alertas que protegeram safras de 12.000 agricultores.",
  },
  {
    slug: "saudeja",
    name: "SaúdeJá",
    country: "Brasil",
    categorySlug: "inovacao-do-ano",
    bio: "Telemedicina em português para comunidades da diáspora.",
    contribution: "Atendeu pacientes em seis países com médicos lusófonos.",
  },
  {
    slug: "revista-baia",
    name: "Revista Baía",
    country: "Moçambique",
    categorySlug: "marca-digital-do-ano",
    bio: "Publicação digital de cultura e estilo de vida.",
    contribution: "Referência editorial com comunidade activa em toda a lusofonia.",
  },
  {
    slug: "magazina",
    name: "Magazina",
    country: "Angola",
    categorySlug: "marca-digital-do-ano",
    bio: "Marca de media e comércio electrónico de moda.",
    contribution: "Construiu a maior comunidade de estilo de Luanda.",
  },
  {
    slug: "kamba-wear",
    name: "Kamba Wear",
    country: "Angola",
    categorySlug: "marca-digital-do-ano",
    bio: "Marca de vestuário com narrativa visual própria.",
    contribution: "Campanhas que redefiniram o luxo contemporâneo angolano.",
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

export const ARTICLES: Article[] = [
  {
    slug: "conheca-os-nomeados",
    title: "Conheça os nomeados da edição Diamante",
    excerpt: "A curadoria revela as personalidades e os projectos que definem o AICA 2026.",
    date: "2026-07-12",
    tag: "Nomeados",
    body: [
      "A primeira lista de nomeados do AICA 2026 atravessa oito territórios e quinze categorias. Não é um ranking de popularidade: é um mapa de influência contemporânea.",
      "O conselho de curadoria trabalhou a partir de indicações públicas, arquivo mediático e evidência de impacto. Cada nome foi lido em voz alta, confrontado com o regulamento e, só depois, confirmado.",
      "Nas próximas semanas, o AICA Journal publicará retratos, bastidores e conversas com os nomeados — para que o voto não seja um gesto vazio.",
    ],
  },
  {
    slug: "historias-dos-diamantes",
    title: "Histórias dos Diamantes",
    excerpt: "O que significa ser um diamante humano da lusofonia nesta edição inaugural.",
    date: "2026-07-28",
    tag: "Ensaio",
    body: [
      "Um diamante não nasce brilhante. Nasce sob pressão, no escuro, e só depois é lapidado. O conceito da primeira edição do AICA parte dessa metáfora sem a transformar em slogan vazio.",
      "Os nomeados desta edição partilham um traço: fizeram trabalho difícil em contextos que raramente oferecem palco. O prémio não inventa o brilho — limita-se a apontar a luz.",
    ],
  },
  {
    slug: "entrevista-patricia-pacheco",
    title: "Patrícia Pacheco: «A língua é o nosso palco comum»",
    excerpt:
      "A apresentadora angolana fala de ofício, de Luanda e de uma lusofonia que cabe no ecrã.",
    date: "2026-08-04",
    tag: "Entrevista",
    body: [
      "Patrícia Pacheco recebe-nos num estúdio de Luanda, entre ensaios de um magazine nocturno. A voz é a mesma que o país já conhece — baixa, precisa, sem pressa.",
      "«Apresentar não é ocupar o centro», diz. «É criar um espaço onde o outro consiga falar inteiro.» A frase poderia ser o manifesto desta categoria.",
      "Nomeada para Melhor Apresentadora Lusófona, Pacheco recusa o protagonismo fácil e insiste no ofício: preparação, escuta, respeito pelo directo.",
    ],
  },
  {
    slug: "bastidores-da-curadoria",
    title: "Bastidores da curadoria",
    excerpt: "Como se constrói uma shortlist quando o território é um oceano inteiro.",
    date: "2026-08-19",
    tag: "Bastidores",
    body: [
      "O conselho reuniu-se quatro vezes. Duas em Luanda, uma em Lisboa, uma por videoconferência com Maputo, Praia e São Paulo na mesma chamada.",
      "O critério não foi unanimidade. Foi argumentação. Cada nome precisava de um defensor e de um céptico. Só os que sobreviviam a ambos avançavam.",
    ],
  },
  {
    slug: "actualizacao-votacao",
    title: "A votação abre a 1 de Outubro",
    excerpt: "Datas, regras e o que muda quando o público entra no processo.",
    date: "2026-09-02",
    tag: "Votação",
    body: [
      "A votação pública do AICA 2026 abre às 08:00 de 1 de Outubro e encerra sete dias antes da Gala. Cada eleitor identificado pode votar uma vez por categoria.",
      "O motor de votação regista sessão, dispositivo e um identificador do eleitor. Há limite, há CAPTCHA, há auditoria. Não há atalhos.",
      "Os resultados oficiais são anunciados em palco, em Luanda, em Novembro.",
    ],
  },
  {
    slug: "noticias-da-gala",
    title: "A Grande Noite: o que já se sabe da Gala",
    excerpt: "Local, red carpet, dress code e a primeira nota sobre a transmissão.",
    date: "2026-09-08",
    tag: "Gala",
    body: [
      "A Gala AICA 2026 acontece em Novembro, em Luanda. O palco é concebido como uma lapidação: negro profundo, ouro, pouco ruído visual.",
      "O red carpet abre ao final da tarde. Dress code: black tie com um detalhe dourado. A after party é por convite.",
      "A imprensa credenciada terá zona própria. A transmissão será anunciada com os parceiros de media.",
    ],
  },
];

export const PARTNERS: Partner[] = [
  {
    name: "ZAP",
    tier: "apresentador",
    blurb: "Parceiro apresentador da primeira edição. Media, alcance e a casa televisiva da Gala.",
  },
  {
    name: "Refriango",
    tier: "oficial",
    blurb: "Parceiro oficial de hospitalidade — a mesa e o brinde da Grande Noite.",
  },
  {
    name: "Unitel",
    tier: "oficial",
    blurb: "Parceiro de conectividade. A votação móvel e a cobertura da noite.",
  },
  {
    name: "BAI",
    tier: "oficial",
    blurb: "Parceiro financeiro da edição Diamante.",
  },
  {
    name: "TAAG",
    tier: "oficial",
    blurb: "Companhia aérea oficial — a ponte entre as capitais da lusofonia.",
  },
  {
    name: "Movicel",
    tier: "media",
    blurb: "Parceiro de divulgação digital.",
  },
  {
    name: "Rádio Nacional de Angola",
    tier: "media",
    blurb: "Parceiro de media e arquivo sonoro da cerimónia.",
  },
  {
    name: "TPA",
    tier: "media",
    blurb: "Parceiro de transmissão e red carpet.",
  },
];

export const VOTING_OPENS = "2026-10-01T08:00:00Z";
export const VOTING_CLOSES = "2026-11-14T23:59:59Z";
export const GALA_DATE = "2026-11-21T19:00:00Z";

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getNominee = (slug: string) => NOMINEES.find((n) => n.slug === slug);
export const nomineesByCategory = (slug: string) => NOMINEES.filter((n) => n.categorySlug === slug);
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const getGroup = (id: CategoryGroupId) => CATEGORY_GROUPS.find((g) => g.id === id);

export function portraitHue(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h + name.charCodeAt(i) * (i + 1)) % 360;
  return h;
}
