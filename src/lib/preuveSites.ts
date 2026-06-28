export interface PreuveSite {
  id: string;
  /** Nom du projet */
  name: string;
  /** Adresse affichée sous la miniature (sans https://) */
  url: string;
  /** URL complète du site */
  href: string;
  /** Capture viewport du site */
  imageSrc?: string;
  /** Position horizontale sur le taureau (0–100 %) */
  x: number;
  /** Position verticale sur le taureau (0–100 %) */
  y: number;
}

/**
 * 9 cas clients Moriarty — positions % sur le taureau.
 * Captures dans public/media/preuves/ (script : node scripts/capture-preuves.mjs).
 */
export const PREUVE_SITES: PreuveSite[] = [
  {
    id: "1",
    name: "NaviSphere",
    url: "navi-sphere.vercel.app",
    href: "https://navi-sphere.vercel.app/",
    imageSrc: "/media/preuves/navisphere.jpg",
    x: 21,
    y: 44,
  },
  {
    id: "2",
    name: "Damien Verhée",
    url: "damienverhee.fr",
    href: "https://www.damienverhee.fr/",
    imageSrc: "/media/preuves/damien-verhee.jpg",
    x: 33,
    y: 27,
  },
  {
    id: "3",
    name: "Smart-Z",
    url: "smart-z.fr",
    href: "https://www.smart-z.fr/",
    imageSrc: "/media/preuves/smart-z.jpg",
    x: 47,
    y: 36,
  },
  {
    id: "4",
    name: "Renmob",
    url: "renmob.fr",
    href: "https://www.renmob.fr/",
    imageSrc: "/media/preuves/renmob.jpg",
    x: 56,
    y: 51,
  },
  {
    id: "5",
    name: "SophieD",
    url: "sophied-nailartist.fr",
    href: "https://sophied-nailartist.fr/",
    imageSrc: "/media/preuves/sophied.jpg",
    x: 71,
    y: 43,
  },
  {
    id: "6",
    name: "Jinja Music Center",
    url: "jinja-music-center.com",
    href: "https://www.jinja-music-center.com/",
    imageSrc: "/media/preuves/jinja-music.jpg",
    x: 84,
    y: 57,
  },
  {
    id: "7",
    name: "Calypso Bay",
    url: "calypso-bay.com",
    href: "https://www.calypso-bay.com/",
    imageSrc: "/media/preuves/calypso-bay.jpg",
    x: 39,
    y: 63,
  },
  {
    id: "8",
    name: "PBDR",
    url: "kevinb59.github.io/PBDR-carroserie",
    href: "https://kevinb59.github.io/PBDR-carroserie/#accueil",
    imageSrc: "/media/preuves/pbdr.jpg",
    x: 64,
    y: 69,
  },
  {
    id: "9",
    name: "Maoya Makeup",
    url: "formation.maoyamakeup.fr",
    href: "https://formation.maoyamakeup.fr/",
    imageSrc: "/media/preuves/maoya-makeup.jpg",
    x: 27,
    y: 54,
  },
];
