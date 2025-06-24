// data/unicoin-campaign.ts
import { Project } from "./types";

export const unicoinCampaign: Project = {
    slug: "unicoin-campaign",
    title: "THE NEXT GEN OF CRYPTO",
    imageSrc: "/images/unicoin/campaign-01.jpg",
    category: "Creative Campaign",
    client: "Unicoin Inc.",
    location: "New York, United States",
    year: 2024,
    services: ["Creative Campaign", "Art Direction"],
    images: [
        { src: "/images/unicoin/campaign-01.jpg", size: "large" },
        { src: "/images/unicoin/campaign-02.jpg", size: "large" },
        { src: "/images/unicoin/campaign-03.jpg", size: "large" },
        { src: "/images/unicoin/campaign-04.jpg", size: "large" },
        { src: "/images/unicoin/campaign-05.jpg", size: "large" },
        { src: "/images/unicoin/campaign-06.jpg", size: "large" },
    ],
    content: [
        {
            type: "text",
            content: "Para el desarrollo de la campaña global “The Next Gen of Crypto”, el cliente nos convocó con el objetivo de posicionar a la marca como un actor clave dentro del mercado cripto."
        },
        {
            type: "text",
            content: "De la mano del director creativo Nicolás Serna, la campaña fue concebida para transmitir una propuesta clara, ambiciosa y alineada con el momento de expansión y consolidación de la compañía."
        },
        {
            type: "text",
            content: "La estrategia se construyó a partir de territorios de marca definidos: innovación, conciencia ambiental, seguridad y confianza, impulso comunitario y propósito social positivo."
        },
        {
            type: "text",
            content: "Todo el enfoque creativo se articuló en torno a los valores de la marca: empoderar a personas y empresas a nivel global a través de una plataforma cripto accesible, eficiente y sostenible, que impulse la innovación y genere impacto social real."
        }
    ],
    featured: true,
};