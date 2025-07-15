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
    imageSrc: "projects/covers/isolla",
    logoSrc: "projects/logos/isolla",
    title: "Isolla",
    href: "/project/isolla"
  },
  {
    id: "london-fashion-week",
    imageSrc: "projects/covers/london-fashion-week", 
    logoSrc: "projects/logos/london",
    title: "London Fashion Week",
    href: "/project/london-fashion-week"
  },
  {
    id: "myrica",
    imageSrc: "projects/covers/myrica",
    logoSrc: "projects/logos/myrica", 
    title: "Myrica",
    href: "/project/myrica-gin"
  },
  {
    id: "private-limo",
    imageSrc: "projects/covers/private-limo",
    logoSrc: "projects/logos/private",
    title: "Private Limo", 
    href: "/project/private-limo"
  },
  {
    id: "the-next-gen",
    imageSrc: "projects/covers/unicoin-nextgen",
    logoSrc: "projects/logos/unicoin",
    title: "The Next Gen",
    href: "/project/unicoin"
  },
  {
    id: "youtube",
    imageSrc: "projects/covers/youtube-cdmx",
    logoSrc: "projects/logos/youtube",
    title: "YouTube CDMX",
    href: "/project/youtube-cdmx"
  }
];