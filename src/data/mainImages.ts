export interface MainImage {
  id: string;
  imageSrc: string;
  logoSrc: string;
  title: string;
  href?: string;
}

export const mainImages: MainImage[] = [
  {
    id: "isolla",
    imageSrc: "/images/main/isolla.jpg",
    logoSrc: "/images/main/logos/isolla.png",
    title: "Isolla",
    href: "/project/isolla"
  },
  {
    id: "london-fashion-week",
    imageSrc: "/images/main/london fashion week.png", 
    logoSrc: "/images/main/logos/london.png",
    title: "London Fashion Week",
    href: "/project/london-fashion-week"
  },
  {
    id: "myrica",
    imageSrc: "/images/main/myrica.png",
    logoSrc: "/images/main/logos/myrica.png", 
    title: "Myrica",
    href: "/project/myrica-gin"
  },
  {
    id: "private-limo",
    imageSrc: "/images/main/private limo.png",
    logoSrc: "/images/main/logos/private.png",
    title: "Private Limo", 
    href: "/project/private-limo"
  },
  {
    id: "the-next-gen",
    imageSrc: "/images/main/the next gen of.png",
    logoSrc: "/images/main/logos/unicoin.png",
    title: "The Next Gen",
    href: "/project/unicoin"
  },
  {
    id: "youtube",
    imageSrc: "/images/main/youtube.jpg",
    logoSrc: "/images/main/logos/youtube.png",
    title: "YouTube CDMX",
    href: "/project/youtube-cdmx"
  }
];