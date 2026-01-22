// data/categories.ts

export type GridType = "masonry" | "uniform" | "elegant" | "bold";
export type GridSize = "small" | "medium" | "large" | "full";
export type GridLayout = GridSize[][];

export interface ProjectMetadata {
  label: string;
  value: string;
}

export interface CategoryProject {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  metadata?: ProjectMetadata[];
  previewImage?: string;
  headerImage: string;
  images: string[];
  gridType?: GridType;
  gridLayout?: GridLayout;
}

export interface CategoryData {
  experiencias: CategoryProject[];
  branding: CategoryProject[];
  espacios: CategoryProject[];
}

export const categoryProjects: CategoryData = {
  // ==========================================
  // EXPERIENCIAS
  // ==========================================
  experiencias: [
    {
      slug: "unicoin-is-everywhere",
      title: "Unicoin is Everywhere",
      description: "Desarrollo de concepto, dirección creativa, producción y gestión integral de la experiencia 'Unicoin is Everywhere' en Nueva York, Montreal, Cancún, y Miami.",
      longDescription: "Fuimos convocadas para desarrollar una campaña con el objetivo de posicionar a Unicoin como la criptomoneda más confiable y reconocida a nivel global.\n\nBajo el concepto 'Unicoin is Everywhere', trabajamos una identidad visual con visión de futuro, optimista y global, incluyendo cartelería, flyers, contenido audiovisual, experiencias y merchandising.\n\nLa campaña se activó en múltiples ciudades: Nueva York, Montreal, Cancún y Miami, en colaboración con el creativo Lautaro Cayarga.",
      metadata: [
        { label: "Categoría", value: "Experiencias" },
        { label: "Ubicación", value: "NYC, Estados Unidos" },
        { label: "Servicios", value: "Dirección de Arte & Eventos" },
        { label: "Año", value: "2025" },
        { label: "Cliente", value: "Unicoin" },
      ],
      previewImage: "/EXPERIENCIAS/COVERS/foto01.jpg",
      headerImage: "/EXPERIENCIAS/UNICOIN/header/header_06@2x.png",
      images: [
        "/EXPERIENCIAS/UNICOIN/fotos/foto_01.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_02.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_03.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_04.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_05.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_06.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_07.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_08.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_09.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_10.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_11.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_12.jpg",
        "/EXPERIENCIAS/UNICOIN/fotos/foto_13.jpg",
      ],
      gridLayout: [
        ["medium", "small"],
        ["small", "large"],
        ["small", "large", "small"],
        ["large", "small"],
        ["small", "large"],
        ["large", "small"],
      ],
    },
    {
      slug: "youtube-connect",
      title: "YouTube Connect",
      description: "Colaboración para Ninch Company en la dirección de arte y desarrollo de originales del evento YouTube Connect, un encuentro dedicado a creadores de contenido.",
      longDescription: "Colaboramos con Ninch Company en la dirección de arte y el desarrollo de originales para YouTube Connect, un evento exclusivo dedicado a creadores de contenido en Ciudad de México.\n\nNos encargamos de la conceptualización visual, el diseño de los espacios y la producción gráfica del evento, creando una experiencia inmersiva que celebra la creatividad de la comunidad de creadores de YouTube.",
      metadata: [
        { label: "Categoría", value: "Experiencias" },
        { label: "Ubicación", value: "CDMX, México" },
        { label: "Servicios", value: "Dirección de Arte & Eventos" },
        { label: "Año", value: "2025" },
        { label: "Cliente", value: "YouTube" },
      ],
      previewImage: "/EXPERIENCIAS/COVERS/foto02.jpg",
      headerImage: "/EXPERIENCIAS/YOUTUBE/header/header_05@2x.png",
      images: [
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_01.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_02.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_03.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_04.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_05.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_06.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_07.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_08.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_09.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_10.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_12.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_13.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_14.jpg",
        "/EXPERIENCIAS/YOUTUBE/fotos/foto_15.jpg",
      ],
      gridLayout: [
        ["large", "small", "small"],
        ["small", "medium", "small"],
        ["large", "small"],
        ["small", "medium", "small"],
        ["medium", "small", "small"],
      ],
    },
    {
      slug: "loreal-paris",
      title: "L'Oréal Paris",
      description: "Diseño de stand para la activación 'The Infallible Activation' de L'Oréal Paris México para Ninch Company.",
      longDescription: "Desarrollamos el diseño y la producción del stand para la activación #YoSoyInfallible de L'Oréal Paris en Ciudad de México, trabajando para Ninch Company.\n\nEl proyecto incluyó el diseño integral del espacio para el 'Reto Skin Ink', una experiencia inmersiva que conectó a los visitantes con la propuesta de la marca de manera memorable e innovadora.",
      metadata: [
        { label: "Categoría", value: "Experiencias" },
        { label: "Ubicación", value: "CDMX, México" },
        { label: "Servicios", value: "Eventos & Producción de Set" },
        { label: "Año", value: "2025" },
        { label: "Cliente", value: "L'Oréal Paris" },
      ],
      previewImage: "/EXPERIENCIAS/COVERS/foto03.jpg",
      headerImage: "/EXPERIENCIAS/LOREAL/header/header01.jpg",
      images: [
        "/EXPERIENCIAS/LOREAL/fotos/foto01.jpg",
        "/EXPERIENCIAS/LOREAL/fotos/foto02.jpg",
        "/EXPERIENCIAS/LOREAL/fotos/foto03.jpg",
        "/EXPERIENCIAS/LOREAL/fotos/foto04.jpg",
        "/EXPERIENCIAS/LOREAL/fotos/foto05.jpg",
        "/EXPERIENCIAS/LOREAL/fotos/foto06.jpg",
        "/EXPERIENCIAS/LOREAL/fotos/foto07.jpg",
        "/EXPERIENCIAS/LOREAL/fotos/foto08.jpg",
        "/EXPERIENCIAS/LOREAL/fotos/foto09.jpg",
        "/EXPERIENCIAS/LOREAL/fotos/foto10.jpg",
        "/EXPERIENCIAS/LOREAL/fotos/foto11.jpg",
      ],
      gridType: "elegant",
    },
    {
      slug: "london-fashion-week",
      title: "LFW - Aynie & La Rando",
      description: "Producción integral para Aynie y La Rando, en su primera presentación en el Reino Unido, dentro del calendario oficial del London Fashion Week.",
      longDescription: "Realizamos la producción integral para las marcas Aynie y La Rando en su primera presentación en el Reino Unido, dentro del calendario oficial del London Fashion Week.\n\nEl proyecto abarcó desde la coordinación logística hasta el diseño del set y la experiencia completa para los invitados, logrando una presentación que destacó la identidad única de ambas marcas en uno de los eventos de moda más prestigiosos del mundo.",
      metadata: [
        { label: "Categoría", value: "Experiencias" },
        { label: "Ubicación", value: "LND, Reino Unido" },
        { label: "Servicios", value: "Eventos & Producción de Set" },
        { label: "Año", value: "2021" },
        { label: "Cliente", value: "Aynie & La Rando" },
      ],
      previewImage: "/EXPERIENCIAS/COVERS/foto04.jpg",
      headerImage: "/EXPERIENCIAS/LONDON FASHION WEEK/-header/header.jpg",
      images: [
        "/EXPERIENCIAS/LONDON FASHION WEEK/fotos/foto01.jpg",
        "/EXPERIENCIAS/LONDON FASHION WEEK/fotos/foto02.jpg",
        "/EXPERIENCIAS/LONDON FASHION WEEK/fotos/foto03.jpg",
        "/EXPERIENCIAS/LONDON FASHION WEEK/fotos/foto04.jpg",
        "/EXPERIENCIAS/LONDON FASHION WEEK/fotos/foto05.jpg",
        "/EXPERIENCIAS/LONDON FASHION WEEK/fotos/foto06.jpg",
        "/EXPERIENCIAS/LONDON FASHION WEEK/fotos/foto07.jpg",
        "/EXPERIENCIAS/LONDON FASHION WEEK/fotos/foto08.jpg",
        "/EXPERIENCIAS/LONDON FASHION WEEK/fotos/foto09.jpg",
        "/EXPERIENCIAS/LONDON FASHION WEEK/fotos/foto10.jpg",
      ],
      gridLayout: [
        ["medium", "small", "small"],
        ["small", "large"],
        ["large", "small"],
        ["small", "large", "small"],
      ],
    },
    {
      slug: "argentine-design-in-london",
      title: "Argentine Design in London",
      description: "Producción del set de la Argentine Design Creative Experience, una serie de eventos presentados durante la London Design Week y la London Craft Week.",
      longDescription: "Desarrollamos la producción del set para la Argentine Design Creative Experience, una serie de eventos presentados durante la London Design Week y la London Craft Week, en colaboración con la Embajada Argentina en el Reino Unido.\n\nEl proyecto buscó destacar el talento y la creatividad del diseño argentino en el escenario internacional, creando espacios que reflejaran la identidad cultural y la innovación de los diseñadores locales.",
      metadata: [
        { label: "Categoría", value: "Experiencias" },
        { label: "Ubicación", value: "LND, Reino Unido" },
        { label: "Servicios", value: "Eventos & Producción de Set" },
        { label: "Año", value: "2022" },
        { label: "Cliente", value: "Argentina Embassy UK" },
      ],
      previewImage: "/EXPERIENCIAS/COVERS/foto05.jpg",
      headerImage: "/EXPERIENCIAS/ARGENTINE DESIGN/header/header01.jpg",
      images: [
        "/EXPERIENCIAS/ARGENTINE DESIGN/fotos/foto01.jpg",
        "/EXPERIENCIAS/ARGENTINE DESIGN/fotos/foto02.jpg",
        "/EXPERIENCIAS/ARGENTINE DESIGN/fotos/foto03.jpg",
        "/EXPERIENCIAS/ARGENTINE DESIGN/fotos/foto04.jpg",
        "/EXPERIENCIAS/ARGENTINE DESIGN/fotos/foto05.jpg",
        "/EXPERIENCIAS/ARGENTINE DESIGN/fotos/foto06.jpg",
        "/EXPERIENCIAS/ARGENTINE DESIGN/fotos/foto07.jpg",
      ],
      gridLayout: [
        ["medium", "small", "small"],
        ["small", "large"],
        ["medium", "large"],
      ],
    },
  ],

  // ==========================================
  // ESPACIOS
  // ==========================================
  espacios: [
    {
      slug: "mip-unicorn-hunters",
      title: "MIPCOM Unicorn Hunters",
      description: "Desarrollamos la producción integral del brand space de Unicorn Hunters en MIPCOM Cannes. Desde el diseño de stands hasta contenidos digitales, señalética y materiales de experiencia.",
      longDescription: "En el marco de MIPCOM Cannes, uno de los encuentros más importantes de la industria del entretenimiento, desarrollamos la producción integral del brand space de Unicorn Hunters.\n\nEl proyecto abarcó desde el diseño de stands hasta contenidos digitales, señalética y materiales de experiencia. El desafío fue crear un espacio que expresara su carácter innovador y su espíritu emprendedor, consolidando su presencia como 'la serie de negocios más icónica de los últimos tiempos'.",
      metadata: [
        { label: "Ubicación", value: "Cannes, Francia" },
        { label: "Año", value: "2024" },
        { label: "Servicios", value: "Eventos & Producción de Set" },
        { label: "Cliente", value: "Unicorn Hunters" },
      ],
      previewImage: "/ESPACIOS/COVERS/mipcon.png",
      headerImage: "/ESPACIOS/MIPCOM/header/header_01.png",
      images: [
        "/ESPACIOS/MIPCOM/fotos/foto_01.jpg",
        "/ESPACIOS/MIPCOM/fotos/foto_02.jpg",
        "/ESPACIOS/MIPCOM/fotos/foto_03.jpg",
        "/ESPACIOS/MIPCOM/fotos/foto_04.jpg",
        "/ESPACIOS/MIPCOM/fotos/foto_05.jpg",
        "/ESPACIOS/MIPCOM/fotos/foto_06.jpg",
        "/ESPACIOS/MIPCOM/fotos/foto_07.jpg",
        "/ESPACIOS/MIPCOM/fotos/foto_08.jpg",
        "/ESPACIOS/MIPCOM/fotos/foto_09.jpg",
        "/ESPACIOS/MIPCOM/fotos/foto_10.jpg",
        "/ESPACIOS/MIPCOM/fotos/foto_11.jpg",
      ],
      gridLayout: [
        ["small", "large", "small"],
        ["small", "large"],
        ["small", "large", "small"],
        ["medium", "small", "small"],
      ],
    },
    {
      slug: "unicoin-trade-fairs",
      title: "Unicoin Trade Fairs",
      description: "Producción y presencia de marca en eventos internacionales de alto perfil como Paris Blockchain Week, Web Summit (Lisboa y Qatar) y Colombia TechWeek.",
      longDescription: "Desarrollamos la producción y presencia de marca de Unicoin en eventos internacionales de alto perfil alrededor del mundo.\n\nNuestra participación incluyó Paris Blockchain Week, MIPCOM Cannes, Web Summit (Lisboa y Qatar), Pinta Miami y Colombia TechWeek. En cada evento, creamos experiencias espaciales que combinan innovación tecnológica con diseño funcional para maximizar el impacto y posicionar a Unicoin como líder en el ecosistema crypto global.",
      metadata: [
        { label: "Categoría", value: "Espacios" },
        { label: "Ubicación", value: "Worldwide" },
        { label: "Servicios", value: "Diseño de Stand, Feria Comercial" },
        { label: "Año", value: "2023-2024" },
        { label: "Cliente", value: "Unicoin" },
      ],
      previewImage: "/ESPACIOS/COVERS/unicointradeafaris.png",
      headerImage: "/ESPACIOS/UNICOIN TRADE FAIR/header/header_02@2x.png",
      images: [
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_01.jpg",
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_02.jpg",
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_03.jpg",
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_04.jpg",
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_05.jpg",
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_06.jpg",
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_07.jpg",
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_08.jpg",
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_09.jpg",
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_10.jpg",
        "/ESPACIOS/UNICOIN TRADE FAIR/fotos/foto_11.jpg",
      ],
      gridLayout: [
        ["medium", "small", "small"],
        ["small", "large"],
        ["small", "large", "small"],
        ["medium", "small", "small"],
      ],
    },
    {
      slug: "loreal-paris-espacios",
      title: "L'Oréal Paris",
      description: "Desarrollo de stand, display, cartelería y materiales de experiencia para Ninch Company en CDMX.",
      longDescription: "Desarrollamos el stand, display, cartelería y materiales de experiencia para L'Oréal Paris en Ciudad de México, trabajando para Ninch Company.\n\nCada elemento espacial fue diseñado para reflejar la esencia de la marca y potenciar la interacción con los visitantes, creando una experiencia memorable.",
      metadata: [
        { label: "Categoría", value: "Espacios" },
        { label: "Ubicación", value: "CDMX, México" },
        { label: "Servicios", value: "Pop up & Brand Spaces" },
        { label: "Año", value: "2025" },
        { label: "Cliente", value: "L'Oréal Paris" },
      ],
      previewImage: "/ESPACIOS/COVERS/lorearlparis.png",
      headerImage: "/ESPACIOS/LOREAL/header/header_03.png",
      images: [
        "/ESPACIOS/LOREAL/fotos/foto_01.jpg",
        "/ESPACIOS/LOREAL/fotos/foto_02.jpg",
        "/ESPACIOS/LOREAL/fotos/foto_03.jpg",
        "/ESPACIOS/LOREAL/fotos/foto_04.jpg",
        "/ESPACIOS/LOREAL/fotos/foto_05.jpg",
        "/ESPACIOS/LOREAL/fotos/foto_06.jpg",
        "/ESPACIOS/LOREAL/fotos/foto_07.jpg",
        "/ESPACIOS/LOREAL/fotos/foto_08.jpg",
      ],
      gridLayout: [
        ["small", "large", "small"],
        ["small", "large"],
        ["small", "large", "small"],
      ],
    },
    {
      slug: "sol-de-patagonia",
      title: "Sol de Patagonia",
      description: "Deco seasons & brand spaces for Sol de Patagonia.",
      metadata: [
        { label: "Ubicación", value: "Buenos Aires, Argentina" },
        { label: "Año", value: "2025" },
        { label: "Servicios", value: "Deco Seasons & Brand Spaces" },
        { label: "Cliente", value: "Sol de Patagonia" },
      ],
      previewImage: "/ESPACIOS/SOL DE PATAGONIA/fotos/foto_01.jpg",
      headerImage: "/ESPACIOS/SOL DE PATAGONIA/header/header_04@2x.png",
      images: [
        "/ESPACIOS/SOL DE PATAGONIA/fotos/foto_01.jpg",
        "/ESPACIOS/SOL DE PATAGONIA/fotos/foto_02.jpg",
        "/ESPACIOS/SOL DE PATAGONIA/fotos/foto_03.jpg",
        "/ESPACIOS/SOL DE PATAGONIA/fotos/foto_04.jpg",
        "/ESPACIOS/SOL DE PATAGONIA/fotos/foto_05.jpg",
        "/ESPACIOS/SOL DE PATAGONIA/fotos/foto_06.jpg",
        "/ESPACIOS/SOL DE PATAGONIA/fotos/foto_07.jpg",
        "/ESPACIOS/SOL DE PATAGONIA/fotos/foto_08.jpg",
      ],
      gridLayout: [
        ["small", "large", "small"],
        ["small", "large"],
        ["small", "large", "small"],
      ],
    },
  ],

  // ==========================================
  // BRANDING
  // ==========================================
  branding: [
    {
      slug: "isolla",
      title: "Isolla",
      description: "Branding, identidad visual y estrategia de comunicación, definiendo sus pilares discursivos y creando la identidad visual.",
      longDescription: "Acompañamos el desarrollo de Isolla desde sus inicios, construyendo su estrategia de comunicación, definiendo sus pilares discursivos y creando la identidad visual que hoy la representa.\n\nEl resultado es una marca de estética simple y relajada, pero con una personalidad firme y auténtica que conecta con su audiencia de manera genuina.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Ubicación", value: "BA, Argentina" },
        { label: "Servicios", value: "Identidad de Marca, Estrategia & Comunicación" },
        { label: "Año", value: "2025" },
        { label: "Cliente", value: "Isolla" },
      ],
      previewImage: "/BRANDING/COVERS/isollacover.png",
      headerImage: "/BRANDING/ISOLLA/header/header_01.png",
      images: [
        "/BRANDING/ISOLLA/fotos/foto_01.jpg",
        "/BRANDING/ISOLLA/fotos/foto_02.jpg",
        "/BRANDING/ISOLLA/fotos/foto_03.jpg",
        "/BRANDING/ISOLLA/fotos/foto_04.jpg",
        "/BRANDING/ISOLLA/fotos/foto_05.png",
        "/BRANDING/ISOLLA/fotos/foto_06.png",
        "/BRANDING/ISOLLA/fotos/foto_07.png",
        "/BRANDING/ISOLLA/fotos/foto_08.jpg",
        "/BRANDING/ISOLLA/fotos/foto_09.jpg",
        "/BRANDING/ISOLLA/fotos/foto_10.jpg",
        "/BRANDING/ISOLLA/fotos/foto_11.jpg",
      ],
      gridType: "uniform",
    },
    {
      slug: "g1m",
      title: "Go One More (G1M)",
      description: "Rebranding G1M y ampliación del sistema visual, sistema de productos y packagings, creación de tienda nube.",
      longDescription: "Desarrollamos el rebranding completo de G1M (Go One More) y la ampliación de su sistema visual.\n\nEl proyecto incluyó el diseño del sistema de productos y packagings, así como la creación de su tienda nube, consolidando una marca de nutrición deportiva contemporánea con una identidad potente y coherente.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Servicios", value: "Identidad Visual, Packaging" },
        { label: "Año", value: "2024" },
        { label: "Cliente", value: "G1M" },
      ],
      previewImage: "/BRANDING/COVERS/goonemore.jpg",
      headerImage: "/BRANDING/G1M/header/header_01.png",
      images: Array.from({ length: 20 }, (_, i) => `/BRANDING/G1M/fotos/foto_${String(i + 1).padStart(2, '0')}.jpg`),
      gridLayout: [
        ["small", "large", "small"],
        ["small", "small", "large"],
        ["full"],
        ["large", "small"],
        ["large", "small"],
        ["medium", "small", "small"],
        ["small", "large"],
        ["full"],
        ["large", "small"],
        ["small", "large"],
        ["large", "small"],
        ["small", "large", "small"],
        ["small", "large"],
        ["small", "large", "small"],
        ["medium", "small", "small"],
      ],
    },
    {
      slug: "private-limo",
      title: "Private Limo",
      description: "Rebranding de Private Limo creando un nuevo sistema visual a partir de la esencia de la marca. Trabajamos en piezas para redes, página web, papelería institucional.",
      longDescription: "Desarrollamos el rebranding de Private Limo, creando un nuevo sistema visual a partir de la esencia de la marca.\n\nEl proyecto incluyó el diseño de un escudo distintivo, piezas para redes sociales, página web y papelería institucional. La identidad visual transmite sofisticación, elegancia y confianza, valores fundamentales para un servicio de transporte premium.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Ubicación", value: "BA, Argentina" },
        { label: "Servicios", value: "Identidad Visual & Branding" },
        { label: "Año", value: "2025" },
        { label: "Cliente", value: "Private Limo" },
      ],
      previewImage: "/BRANDING/COVERS/privatelimo.png",
      headerImage: "/BRANDING/PRIVATE LIMO/header/foto_01.jpg",
      images: [
        "/BRANDING/PRIVATE LIMO/fotos/foto_01.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_02.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_03.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_04.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_05.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_06.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_07.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_08.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_09.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_10.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_11.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_12.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_13.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_14.jpg",
        "/BRANDING/PRIVATE LIMO/fotos/foto_15.jpg",
      ],
      gridLayout: [
        ["large", "small"],
        ["small", "large"],
        ["medium", "medium"],
        ["large", "small"],
        ["small", "large", "small"],
        ["large", "small"],
        ["small", "large"],
      ],
    },
    {
      slug: "myrica",
      title: "Myrica",
      description: "Diseñamos logo y sistema de etiquetas para Myrica Gin, cuidando cada detalle para reflejar su identidad botánica, su origen silvestre y su carácter premium y artesanal.",
      longDescription: "Diseñamos el logo y sistema de etiquetas para Myrica Gin, trabajando para RUMA Marketing.\n\nCuidamos cada detalle para reflejar su identidad botánica, su origen silvestre y su carácter premium y artesanal. El resultado es una marca que destaca en el mercado de bebidas artesanales con una estética distintiva y sofisticada.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Ubicación", value: "BA, Argentina" },
        { label: "Servicios", value: "Identidad Visual, Diseño de Producto" },
        { label: "Año", value: "2021" },
        { label: "Cliente", value: "RUMA Marketing" },
      ],
      previewImage: "/BRANDING/COVERS/myrica.jpg",
      headerImage: "/BRANDING/MYRICA/header/header_01.png",
      images: [
        "/BRANDING/MYRICA/fotos/foto_01.jpg",
        "/BRANDING/MYRICA/fotos/foto_02.jpg",
        "/BRANDING/MYRICA/fotos/foto_03.gif",
        "/BRANDING/MYRICA/fotos/foto_04.jpg",
        "/BRANDING/MYRICA/fotos/foto_05.jpg",
        "/BRANDING/MYRICA/fotos/foto_06.jpg",
        "/BRANDING/MYRICA/fotos/foto_07.jpg",
        "/BRANDING/MYRICA/fotos/foto_08.jpg",
        "/BRANDING/MYRICA/fotos/foto_09.gif",
        "/BRANDING/MYRICA/fotos/foto_10.jpg",
        "/BRANDING/MYRICA/fotos/foto_11.jpg",
        "/BRANDING/MYRICA/fotos/foto_12.jpg",
      ],
      gridLayout: [
        ["large", "small"],
        ["small", "large"],
        ["medium", "small", "small"],
        ["large", "small"],
        ["small", "large", "small"],
      ],
    },
    {
      slug: "lilac-chocolateria",
      title: "Lilac Chocolates",
      description: "Desarrollamos un trabajo de diseño estacional para las campañas de Back to School, Halloween y Navidad de Li-Lac Chocolates con IA.",
      longDescription: "Desarrollamos un trabajo de diseño estacional para Li-Lac Chocolates, utilizando inteligencia artificial como herramienta creativa.\n\nEl proyecto incluyó las campañas de Back to School, Halloween y Navidad, creando materiales visuales que combinan la tradición de la marca con una estética contemporánea e innovadora.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Ubicación", value: "NYC, Estados Unidos" },
        { label: "Servicios", value: "IA Design" },
        { label: "Año", value: "2025" },
        { label: "Cliente", value: "Li-Lac Chocolates" },
      ],
      previewImage: "/BRANDING/COVERS/lilac.png",
      headerImage: "/BRANDING/LILAC/header/header_01.png",
      images: [
        "/BRANDING/LILAC/- fotos/foto_01.jpg",
        "/BRANDING/LILAC/- fotos/foto_02.jpg",
        "/BRANDING/LILAC/- fotos/foto_03.jpg",
        "/BRANDING/LILAC/- fotos/foto_04.jpg",
        "/BRANDING/LILAC/- fotos/foto_05.jpg",
        "/BRANDING/LILAC/- fotos/foto_06.jpg",
        "/BRANDING/LILAC/- fotos/foto_07.jpg",
        "/BRANDING/LILAC/- fotos/foto_08.jpg",
        "/BRANDING/LILAC/- fotos/foto_09.jpg",
        "/BRANDING/LILAC/- fotos/foto_10.jpg",
        "/BRANDING/LILAC/- fotos/foto_11.jpg",
        "/BRANDING/LILAC/- fotos/foto_12.jpg",
        "/BRANDING/LILAC/- fotos/foto_13.jpg",
        "/BRANDING/LILAC/- fotos/foto_14.jpg",
        "/BRANDING/LILAC/- fotos/foto_15.jpg",
        "/BRANDING/LILAC/- fotos/foto_16.jpg",
        "/BRANDING/LILAC/- fotos/foto_17.jpg",
        "/BRANDING/LILAC/- fotos/foto_18.jpg",
        "/BRANDING/LILAC/- fotos/foto_19.jpg",
        "/BRANDING/LILAC/- fotos/foto_20.jpg",
        "/BRANDING/LILAC/- fotos/foto_21.jpg",
        "/BRANDING/LILAC/- fotos/foto_22.jpg",
      ],
      gridLayout: [
        ["small", "small", "large"],
        ["small", "large", "small"],
        ["large", "medium"],
        ["small", "large", "small"],
        ["small", "large", "small"],
        ["small", "small", "large"],
        ["small", "large", "small"],
        ["large", "medium"],
        ["medium", "large"],
      ],
    },
    {
      slug: "unicoin",
      title: "Unicoin",
      description: "Desarrollamos el rebranding del ecosistema Unicoin, redefiniendo su identidad visual.",
      longDescription: "Desarrollamos el rebranding del ecosistema Unicoin bajo el concepto 'The Next Gen of Crypto', redefiniendo su identidad visual para posicionar a la marca como líder en el sector crypto.\n\nEl proyecto incluyó la dirección de arte y el diseño de campañas que comunican innovación, confianza y visión de futuro, elementos fundamentales para consolidar su presencia global.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Ubicación", value: "NYC, Estados Unidos" },
        { label: "Servicios", value: "Design Campaign & Art Direction" },
        { label: "Año", value: "2024" },
        { label: "Cliente", value: "Unicoin" },
      ],
      previewImage: "/BRANDING/COVERS/unicoin.png",
      headerImage: "/BRANDING/UNICOIN/header/IMG_0348 (1) 1 (2).jpg",
      images: [
        "/BRANDING/UNICOIN/fotos/foto_01.jpg",
        "/BRANDING/UNICOIN/fotos/foto_02.jpg",
        "/BRANDING/UNICOIN/fotos/foto_03.jpg",
        "/BRANDING/UNICOIN/fotos/foto_04.jpg",
        "/BRANDING/UNICOIN/fotos/foto_05.jpg",
        "/BRANDING/UNICOIN/fotos/foto_06.jpg",
        "/BRANDING/UNICOIN/fotos/foto_07.jpg",
        "/BRANDING/UNICOIN/fotos/foto_08.jpg",
        "/BRANDING/UNICOIN/fotos/foto_09.jpg",
        "/BRANDING/UNICOIN/fotos/foto_10.jpg",
        "/BRANDING/UNICOIN/fotos/foto_11.jpg",
        "/BRANDING/UNICOIN/fotos/foto_12.jpg",
        "/BRANDING/UNICOIN/fotos/foto_13.jpg",
        "/BRANDING/UNICOIN/fotos/foto_14.jpg",
        "/BRANDING/UNICOIN/fotos/foto_15.jpg",
      ],
      gridLayout: [
        ["small", "large"],
        ["large", "medium"],
        ["small", "medium", "small"],
        ["large", "small"],
        ["full"],
        ["large", "small"],
        ["small", "large"],
        ["large", "small"],
      ],
    },
  ],
};

// Helper to get all projects as a flat array
export const getAllCategoryProjects = (): CategoryProject[] => {
  return [
    ...categoryProjects.branding,
    ...categoryProjects.espacios,
    ...categoryProjects.experiencias,
  ];
};

// Helper to find a project by slug
export const findProjectBySlug = (slug: string): { project: CategoryProject; category: keyof CategoryData } | null => {
  for (const [category, projects] of Object.entries(categoryProjects)) {
    const project = projects.find((p: CategoryProject) => p.slug === slug);
    if (project) {
      return { project, category: category as keyof CategoryData };
    }
  }
  return null;
};
