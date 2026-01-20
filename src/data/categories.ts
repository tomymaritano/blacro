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
      description: "Global brand experience and activations for Unicoin.",
      longDescription: "Diseñamos experiencias de marca globales para Unicoin, posicionando la marca en el ecosistema fintech y crypto a nivel mundial.\n\nCada experiencia fue pensada para educar, inspirar y conectar con la audiencia objetivo en múltiples mercados.",
      metadata: [
        { label: "Categoría", value: "Experiencias" },
        { label: "Servicios", value: "Activaciones Globales, Experiencia de Marca" },
        { label: "Año", value: "2024" },
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
      description: "Creative production and brand experience for YouTube CDMX.",
      longDescription: "Desarrollamos la producción creativa y experiencia de marca para YouTube Connect CDMX, creando un espacio que celebra la creatividad y la comunidad de creadores.\n\nEl proyecto incluyó diseño de espacios, producción de contenido y coordinación del evento.",
      metadata: [
        { label: "Categoría", value: "Experiencias" },
        { label: "Servicios", value: "Producción Creativa, Experiencia de Marca" },
        { label: "Año", value: "2024" },
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
      description: "Immersive brand experiences and activations for L'Oréal.",
      longDescription: "Creamos experiencias de marca inmersivas y activaciones para L'Oréal Paris, conectando la marca con su audiencia de manera innovadora y memorable.\n\nCada activación fue diseñada para generar engagement y fortalecer el vínculo emocional con la marca.",
      metadata: [
        { label: "Categoría", value: "Experiencias" },
        { label: "Servicios", value: "Activaciones, Experiencias Inmersivas" },
        { label: "Año", value: "2024" },
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
      title: "LFW Ainie & La Rando",
      description: "Brand experience and event design for London Fashion Week.",
      longDescription: "Diseñamos la experiencia de marca y evento para London Fashion Week con Ainie & La Rando, uno de los eventos de moda más prestigiosos del mundo.\n\nEl proyecto incluyó diseño de espacios, producción visual y coordinación de la experiencia completa para invitados.",
      metadata: [
        { label: "Categoría", value: "Experiencias" },
        { label: "Servicios", value: "Diseño de Evento, Experiencia de Marca" },
        { label: "Ubicación", value: "Londres, UK" },
        { label: "Año", value: "2024" },
        { label: "Cliente", value: "London Fashion Week" },
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
      description: "Curating and showcasing the best of Argentine design on the global stage.",
      longDescription: "Curamos y presentamos lo mejor del diseño argentino en Londres, destacando la creatividad y talento local en el escenario global.\n\nEl proyecto incluyó la selección de diseñadores, coordinación de exhibiciones y producción de contenido promocional.",
      metadata: [
        { label: "Categoría", value: "Experiencias" },
        { label: "Servicios", value: "Curaduría, Producción de Eventos" },
        { label: "Ubicación", value: "Londres, UK" },
        { label: "Año", value: "2024" },
        { label: "Cliente", value: "Argentine Design" },
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
      title: "MIP Unicorn Hunters",
      description: "Stand design and set production for Unicorn Hunters at MIPCOM Cannes.",
      longDescription: "En el marco de MIPCOM Cannes, uno de los encuentros más importantes de la industria del entretenimiento, desarrollamos el diseño y la producción del stand de Unicorn Hunters.\n\nEl desafío fue crear un espacio que expresara su carácter innovador y su espíritu emprendedor, consolidando su presencia como \"la serie de negocios más icónica de los últimos tiempos\".",
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
      description: "Trade fair booth and spatial experience for Unicoin.",
      longDescription: "Diseñamos el stand y la experiencia espacial de Unicoin para ferias comerciales internacionales de tecnología y finanzas.\n\nEl espacio combina innovación tecnológica con diseño funcional para maximizar el impacto en los visitantes.",
      metadata: [
        { label: "Categoría", value: "Espacios" },
        { label: "Servicios", value: "Diseño de Stand, Feria Comercial" },
        { label: "Año", value: "2024" },
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
      description: "Spatial design and brand activation for L'Oréal events.",
      longDescription: "Diseñamos espacios inmersivos para eventos de L'Oréal Paris, creando experiencias que conectan la marca con su audiencia de manera memorable.\n\nCada elemento espacial fue pensado para reflejar la esencia de la marca y potenciar la interacción con los visitantes.",
      metadata: [
        { label: "Categoría", value: "Espacios" },
        { label: "Servicios", value: "Diseño Espacial, Activación de Marca" },
        { label: "Año", value: "2024" },
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
      description: "Complete brand development for Isolla, where creativity meets functionality.",
      longDescription: "Acompañamos el desarrollo de Isolla desde sus inicios, construyendo su estrategia de comunicación, definiendo sus pilares discursivos y creando la identidad visual que hoy la representa.\n\nEl resultado es una marca de estética simple y relajada, pero con una personalidad firme y auténtica.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Servicios", value: "Branding, Identidad Visual" },
        { label: "Año", value: "2024" },
        { label: "Cliente", value: "Isolla Studio" },
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
      description: "Brand identity and visual system for G1M, a modern nutrition brand.",
      longDescription: "Desarrollamos la identidad visual completa para G1M (Go One More), una marca de nutrición deportiva contemporánea.\n\nEl proyecto incluyó la creación del sistema de marca, packaging y materiales que reflejan la energía y compromiso del estudio.",
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
      description: "Luxury branding for Private Limo, premium transportation services.",
      longDescription: "Desarrollamos la marca de lujo para Private Limo, un servicio de transporte premium que demanda elegancia y exclusividad en cada detalle.\n\nLa identidad visual transmite sofisticación y confianza.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Servicios", value: "Branding de Lujo, Identidad Corporativa" },
        { label: "Año", value: "2024" },
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
      description: "Brand identity for Myrica Gin, crafting a premium spirits brand.",
      longDescription: "Diseñamos la identidad de marca para Myrica Gin, una marca premium de destilados que busca destacar en el mercado de bebidas artesanales.\n\nEl proyecto incluyó el diseño de etiquetas, packaging y materiales promocionales.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Servicios", value: "Packaging, Identidad de Marca" },
        { label: "Año", value: "2023" },
        { label: "Cliente", value: "Myrica Gin" },
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
      title: "Lilac Chocolatería",
      description: "Visual identity and brand strategy for Lilac Chocolatería.",
      longDescription: "Creamos la identidad visual y estrategia de marca para Lilac Chocolatería, desarrollando un sistema visual coherente que comunica elegancia y sofisticación.\n\nEl proyecto abarcó desde la conceptualización hasta la implementación completa de la marca.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Servicios", value: "Estrategia de Marca, Identidad Visual" },
        { label: "Año", value: "2023" },
        { label: "Cliente", value: "Lilac Chocolatería" },
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
      description: "Brand identity for Unicoin, a next-generation cryptocurrency platform.",
      longDescription: "Creamos la identidad de marca para Unicoin, una plataforma de criptomonedas de nueva generación que busca revolucionar el mercado financiero digital.\n\nEl diseño combina tecnología y confianza, elementos fundamentales para una marca en el sector fintech.",
      metadata: [
        { label: "Categoría", value: "Branding" },
        { label: "Servicios", value: "Identidad Digital, Sistema de Marca" },
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
