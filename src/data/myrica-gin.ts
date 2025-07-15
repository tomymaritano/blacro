// data/myrica-gin.ts
import { Project } from "./types";

export const myricaGin: Project = {
    slug: "myrica-gin",
    title: "Myrica Gin",
    imageSrc: "main/myrica",
    logo: "logos/myricalogo",
    category: "Identidad Visual. Diseño de Producto",
    client: "Ruma Marketing",
    location: "Argentina",
    year: 2023,
    services: ["Branding", "Visual Identity", "Packaging", "Creative Direction"],
    images: [
        { src: "myrica/myrica-02", size: "large" },
        { src: "myrica/myrica-03", size: "large" },
        { src: "myrica/myrica-04", size: "large" },
        { src: "myrica/myrica-05", size: "large" },
        { src: "myrica/myrica-06", size: "large" },
        { src: "myrica/myrica-07", size: "medium" },
        { src: "myrica/myrica-08", size: "medium" },
        { src: "myrica/myrica-09", size: "large" },
        { src: "myrica/myrica-10", size: "small" },
        { src: "myrica/myrica-11", size: "small" },
        { src: "myrica/myrica-12", size: "small" },
    ],
    content: [
        { type: "text", content: "Myrica Gin surge de una búsqueda por capturar la esencia del mundo botánico. Inspirado en la planta Myrica Gale, su perfil combina notas cítricas y especiadas con un amargor suave, evocando lo silvestre, lo sensorial y lo auténtico. Es un destilado de autor, equilibrado y con carácter." },
        { type: "text", content: "Desde Blacró, acompañamos la construcción de su universo visual a partir de esta esencia. Diseñamos el sistema completo de marca —logotipo, colores, ilustraciones, etiqueta y acabados— cuidando cada detalle para reflejar su identidad botánica, su origen silvestre y su carácter premium y artesanal." },
        { type: "text", content: "Una identidad con personalidad clara y lenguaje propio, que posiciona a Myrica Gin como una marca con impronta de autor, elegante y refinada." }
    ],
    featured: true,
    
    // Main page fields
    mainImageSrc: "main/myrica",
    showInMain: true,
    mainOrder: 2,
    logo: "logos/myricalogo",
};