import { Project } from './types';

export const youtubeCDMX: Project = {
  slug: "youtube-cdmx",
  title: "YouTube CDMX",
  imageSrc: "main/youtube",
  mainImageSrc: "main/youtube",
  logo: "logos/youtubeconnect",
  category: "Dirección de Arte & Eventos",
  client: "Ninch Company",
  location: "CDMX, México",
  year: 2025,
  services: ["Dirección de Arte", "Eventos", "Diseño Escenográfico", "Señalética"],
  
  images: [
    { src: "youtube/youtube-01", size: "medium" },
    { src: "youtube/youtube-02", size: "medium" },
    { src: "youtube/youtube-03", size: "medium" },
    { src: "youtube/youtube-04", size: "medium" },
    { src: "youtube/youtube-10", size: "medium" },
    { src: "youtube/youtube-07", size: "medium" },
    { src: "youtube/youtube-13", size: "large" },
    { src: "youtube/youtube-12", size: "medium" },
    { src: "youtube/youtube-08", size: "medium" },
    { src: "youtube/youtube-11", size: "medium" },
    { src: "youtube/youtube-05", size: "medium" },
    { src: "youtube/youtube-06", size: "medium" },
    { src: "youtube/youtube-09", size: "medium" },
    { src: "youtube/youtube-14", size: "large" }
  ],
  content: [
    {
      type: "text",
      content: "Trabajamos en conjunto con el equipo de Ninch en la creación de un universo visual inmersivo, que combinara la identidad de YouTube con una atmósfera contemporánea, versátil y vibrante. El espacio incluía escenarios para charlas, workshops, un podcast en vivo, photo opportunity, coffee break, entre otros."
    },
    {
      type: "text",
      content: "Cada pieza —desde señalética hasta soportes escenográficos— fue pensada para acompañar el recorrido del evento y potenciar la experiencia."
    },
    {
      type: "text",
      content: "El resultado fue un evento dinámico, expresivo y visualmente sólido, que reforzó el vínculo de YouTube con su comunidad desde una estética fresca, coherente y adaptable a cada instancia del encuentro."
    }
  ],
  featured: true,
  size: "large",
  
  // Main page fields
  showInMain: true,
  mainOrder: 6,
};