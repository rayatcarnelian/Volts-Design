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
        src: "/projects/project-1.png",
        location: "Kuala Lumpur",
        description: "A symphony of light and shadow designed to elevate the property viewing experience. We utilized warm, concealed linear lighting to guide visitors through the space, creating an emotional journey from entrance to closing.",
        gallery: ["/projects/project-1.png", "/projects/project-3.jpg", "/projects/project-5.jpg"],
        gridClass: "md:col-span-2 md:row-span-2",
    },
    {
        id: 2,
        title: "Old Town Heritage",
        category: "Facade", // Changed to match "Facade" in one list, but note: PortfolioPage used "Commercial". I will align categories later.
        src: "/projects/project-3.jpg",
        location: "Ipoh",
        description: "Revitalizing a historic landmark with modern illumination techniques while preserving its colonial charm. The lighting design focuses on highlighting architectural textures—brick, wood, and plaster—without overpowering the original aesthetic.",
        gallery: ["/projects/project-3.jpg", "/projects/project-1.png", "/projects/retail/gold-hill-1.jpg"],
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 3,
        title: "Mitsui Offices",
        category: "Office",
        src: "/projects/project-5.jpg",
        location: "Mitsui Park",
        description: "Human-centric office lighting designed to improve productivity and well-being. Circadian rhythm programming adjusts color temperature throughout the day.",
        gallery: ["/projects/project-5.jpg"],
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 4,
        title: "Aetas Interior",
        category: "Commercial",
        src: "/projects/project-2.png",
        location: "Kuala Lumpur",
        description: "Interior warmth and sophistication.",
        gallery: ["/projects/project-2.png"],
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 5,
        title: "Mitsui Lobby",
        category: "Office",
        src: "/projects/project-6.jpg",
        location: "Mitsui Park",
        description: "Lobby lighting design.",
        gallery: ["/projects/project-6.jpg"],
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 6,
        title: "Old Town Detail",
        category: "Facade",
        src: "/projects/project-4.jpg",
        location: "Ipoh",
        description: "Detail lighting.",
        gallery: ["/projects/project-4.jpg"],
        gridClass: "md:col-span-2 md:row-span-1",
    },
    // Add more projects here as needed
    {
        id: 11,
        title: "Golden Sun Club",
        category: "F&B",
        src: "/projects/retail/golden-sun-1.jpg",
        location: "Kuala Lumpur",
        description: "High-energy nightlife lighting design using programmed LED pixels and moving heads to synchronize with the music, creating an immersive sensory experience.",
        gallery: ["/projects/retail/golden-sun-1.jpg"],
    },
    {
        id: 12,
        title: "Upper Palace (TRX)",
        category: "F&B",
        src: "/projects/retail/upper-palace-1.jpg",
        location: "TRX Exchange",
        description: "The pinnacle of fine dining at TRX. Crystal chandeliers meet precision spot-lighting to make every dish look like a jewel.",
        gallery: ["/projects/retail/upper-palace-1.jpg"],
    },
    {
        id: 8,
        title: "The Oval Residence",
        category: "Residential",
        src: "/projects/residential/oval-1.jpg",
        location: "KLCC",
        description: "Ultra-luxury residential lighting. We integrated lighting into joinery and coves to eliminate visual clutter, letting the view of the Twin Towers take center stage.",
        gallery: ["/projects/residential/oval-1.jpg"],
    },
];

export const categories = ["All", "Residential", "Commercial", "Office", "F&B", "Facade"];
