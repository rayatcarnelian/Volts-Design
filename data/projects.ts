export interface Project {
    id: number;
    title: string;
    category: string;
    src: string;
    location?: string;
    description?: string;
    gallery?: string[];
    gridClass?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Aetas Sales Gallery",
        category: "Commercial",
        src: "/projects/aetas-sales/Screenshot_1.png",
        location: "Kuala Lumpur",
        description: "A symphony of light and shadow designed to elevate the property viewing experience. We utilized warm, concealed linear lighting to guide visitors through the space, creating an emotional journey from entrance to closing.",
        gallery: ["/projects/aetas-sales/Screenshot_1.png", "/projects/aetas-sales/Screenshot_2.png", "/projects/aetas-sales/Screenshot_3.png"],
        gridClass: "md:col-span-2 md:row-span-2",
    },
    {
        id: 11,
        title: "Golden Sun Club",
        category: "F&B",
        src: "/projects/golden-sun/487171515_1079218950898186_3249925751065150302_n.jpg",
        location: "Kuala Lumpur",
        description: "High-energy nightlife lighting design using programmed LED pixels and moving heads to synchronize with the music, creating an immersive sensory experience.",
        gallery: ["/projects/golden-sun/487103027_1079218937564854_2730222437339798446_n.jpg", "/projects/golden-sun/486802347_1079219144231500_1366745404938446586_n.jpg", "/projects/golden-sun/488023151_1079218960898185_1917273508085614533_n.jpg"],
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 3,
        title: "Empire of Gold",
        category: "F&B",
        src: "/projects/gold-hill/476235808_122221614434026826_2363352486470271201_n.jpg",
        location: "Genting Highlands",
        description: "An intimate dining atmosphere crafted through layered lighting. Low-kelvin pendants create pockets of privacy for diners, while architectural accent lights reveal the richness of the interior materials.",
        gallery: ["/projects/gold-hill/476235808_122221614434026826_2363352486470271201_n.jpg", "/projects/gold-hill/476351071_122221614230026826_2626066982721069945_n (1).jpg", "/projects/gold-hill/476449139_122221614644026826_242461573600559703_n (1).jpg"],
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 12,
        title: "Upper Palace (TRX)",
        category: "F&B",
        src: "/projects/upper-palace/530620448_3268468223300999_7778033962337080290_n.jpg",
        location: "TRX Exchange",
        description: "The pinnacle of fine dining at TRX. Crystal chandeliers meet precision spot-lighting to make every dish look like a jewel.",
        gallery: ["/projects/upper-palace/530620448_3268468223300999_7778033962337080290_n.jpg", "/projects/upper-palace/medium-0001c298fd1684c151ca17910938fc91.jpg"],
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 6,
        title: "Panel Plus HQ",
        category: "Office",
        src: "/projects/panel-plus/IMG-20251123-WA0064.jpg",
        location: "Industrial Park",
        description: "Industrial chic office lighting. Linear pendants and cool white tones foster focus and clarity in this modern workspace.",
        gallery: ["/projects/panel-plus/IMG-20251123-WA0066.jpg", "/projects/panel-plus/IMG-20251123-WA0068.jpg"],
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 5,
        title: "PJ Bungalow",
        category: "Residential",
        src: "/projects/pj-bungalow/IMG-20250528-WA0016.jpg",
        location: "Petaling Jaya",
        description: "A private residence illuminated with warmth and subtly. Landscape lighting extends the living space outdoors.",
        gallery: ["/projects/pj-bungalow/IMG-20250528-WA0017.jpg", "/projects/pj-bungalow/IMG-20250528-WA0018.jpg"],
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 13,
        title: "Aetas Show Unit",
        category: "Residential",
        src: "/projects/aetas/Screenshot_1.png",
        location: "Damansara",
        description: "Luxury show unit lighting design designed to highlight textures and finishes.",
        gallery: ["/projects/aetas/Screenshot_1.png", "/projects/aetas/Screenshot_2.png", "/projects/aetas/Screenshot_3.png"],
        gridClass: "md:col-span-2 md:row-span-1",
    }
];

export const categories = ["All", "Residential", "Commercial", "Office", "F&B", "Facade"];
