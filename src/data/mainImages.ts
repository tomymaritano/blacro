export interface MainImage {
  id: string;
  imageSrc: string;
  logoSrc: string;
  title: string;
  href?: string;
}

export const mainImages: MainImage[] = [
  {
    id: "private-limo",
    imageSrc: "main/privatelimo",
    logoSrc: "logos/privatelimologo",
    title: "Private Limo", 
    href: "/project/private-limo"
  },
  {
    id: "myrica",
    imageSrc: "main/myrica",
    logoSrc: "logos/myricalogo", 
    title: "Myrica",
    href: "/project/myrica-gin"
  },
  {
    id: "london-fashion-week",
    imageSrc: "main/londonfashionweek", 
    logoSrc: "logos/londonlogo",
    title: "London Fashion Week",
    href: "/project/london-fashion-week"
  },
  {
    id: "isolla",
    imageSrc: "main/isolla",
    logoSrc: "logos/isollalogo",
    title: "Isolla",
    href: "/project/isolla"
  },
  {
    id: "the-next-gen",
    imageSrc: "main/thenextgenof",
    logoSrc: "logos/unicoinlogo",
    title: "The Next Gen",
    href: "/project/unicoin-nextgen"
  },
  {
    id: "youtube",
    imageSrc: "main/youtube",
    logoSrc: "logos/youtubeconnect",
    title: "YouTube CDMX",
    href: "/project/youtube-cdmx"
  }
];