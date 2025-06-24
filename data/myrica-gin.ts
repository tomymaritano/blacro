// data/myrica-gin.ts
import { Project } from "./types";

export const myricaGin: Project = {
    slug: "myrica-gin",
    title: "Myrica Gin",
    imageSrc: "/images/myrica/test1.jpg",
    category: "Branding & Packaging",
    client: "Myrica Distillery",
    location: "Buenos Aires",
    year: 2025,
    services: ["Branding", "Visual Identity", "Packaging", "Creative Direction"],
    images: [
        { src: "/images/myrica/test8.jpg", size: "large" },
        { src: "/images/myrica/test9.jpg", size: "medium" },
        { src: "/images/myrica/test12.jpg", size: "medium" },
        { src: "/images/myrica/test13.jpg", size: "large" },
        { src: "/images/myrica/test11.jpg", size: "large" },
        { src: "/images/myrica/test13.jpg", size: "large" },
    ],
    content: [
        { type: "text", content: "Myrica Gin es una marca que nace de la conexión con la naturaleza, la sofisticación botánica y la búsqueda de autenticidad. Su propuesta combina ingredientes silvestres con un diseño contemporáneo que rinde homenaje a la tierra y sus ritmos." },
        { type: "text", content: "La marca nos convocó para acompañarlos en la creación y desarrollo integral de su identidad visual desde cero. Fue un proyecto 360° donde trabajamos en definir su carácter, su lenguaje visual y su universo narrativo." },
        { type: "text", content: "Diseñamos un plan de comunicación alineado con los valores de la marca: naturalidad, elegancia y carácter de autor. Establecimos los mensajes clave y trazamos una hoja de ruta para su posicionamiento en el mercado premium." },
        { type: "text", content: "El diseño parte de la morfología de la planta Myrica para dar lugar a un logotipo refinado, acompañado por una paleta cromática que evoca los colores de la tierra, los frutos y las hierbas." },
        { type: "text", content: "Diseñamos la experiencia del producto con foco en la materialidad, los detalles y el ritual. Cada decisión —desde la forma de la botella hasta los acabados de la etiqueta— fue pensada para transmitir la historia y el espíritu del gin. La identidad visual se completa con materiales gráficos, packaging y un sistema de marca que acompaña a Myrica Gin en cada punto de contacto." },
        { type: "text", content: "El resultado es una marca coherente, con una fuerte impronta de autor, lista para ingresar al mercado con una estética potente y una narrativa sólida." }
    ],
    featured: true,
};