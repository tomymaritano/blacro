// data/london-fashion-week.ts
import { Project } from "./types";

export const londonFashionWeek: Project = {
    slug: "london-fashion-week",
    title: "London Fashion Week",
    imageSrc: "/images/londonfashionweek/london-fashion-week-04.png",
    category: "Eventos & Producción de Set",
    client: "Aynie & La Rando",
    location: "Londres, Inglaterra",
    year: 2021,
    services: ["Event Production", "Set Production", "Creative Direction"],
    images: [
        { src: "/images/londonfashionweek/london-fashion-week-02.png", size: "large" },
        { src: "/images/londonfashionweek/london-fashion-week-01.png", size: "medium" },
        { src: "/images/londonfashionweek/london-fashion-week-05.png", size: "medium" },
        { src: "/images/londonfashionweek/london-fashion-week-03.png", size: "large" },
    ],
    content: [
        { type: "text", content: "Acompañamos a Aynie y La Rando, dentro del calendario oficial del London Fashion Week, llevando adelante la producción general de sus presentaciones. Formamos parte de un momento clave para ambas marcas, cuidando cada detalle para que su identidad brillara en una de las pasarelas más importantes del mundo." },
        { type: "text", content: "Nos aseguramos que todo estuviera alineado con el universo de las marcas, basado en la calidad, la tradición y el diseño de autor. A través de una experiencia sensorial que celebró lo mejor de Argentina en el corazón de Londres, con un enfoque contemporáneo y curado." }
    ],
    featured: true,
};