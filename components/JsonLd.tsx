export default function JsonLd() {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ProfessionalService",
                "@id": "https://volts-design.vercel.app/#organization",
                "name": "Volts Design",
                "url": "https://volts-design.vercel.app",
                "logo": "https://volts-design.vercel.app/icon.png",
                "image": "https://volts-design.vercel.app/og-image.jpg",
                "description": "Premier Architectural Lighting Design Firm in Malaysia specializing in luxury residential and commercial projects.",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kuala Lumpur",
                    "addressCountry": "MY"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+60-18-298-5882",
                    "contactType": "customer service",
                    "email": "info@voltsdesign.com",
                    "availableLanguage": ["English", "Malay"]
                },
                "sameAs": [
                    "https://www.instagram.com/volts.electra",
                    "https://wa.me/60182985882"
                ],
                "priceRange": "$$$$"
            },
            {
                "@type": "Person",
                "@id": "https://volts-design.vercel.app/#hazem",
                "name": "Hazem",
                "jobTitle": "Principal Lighting Architect",
                "worksFor": {
                    "@id": "https://volts-design.vercel.app/#organization"
                },
                "url": "https://volts-design.vercel.app",
                "sameAs": ["https://instagram.com/volts.electra"]
            },
            {
                "@type": "WebSite",
                "@id": "https://volts-design.vercel.app/#website",
                "url": "https://volts-design.vercel.app",
                "name": "Volts Design",
                "description": "Architectural Lighting Design Malaysia",
                "publisher": {
                    "@id": "https://volts-design.vercel.app/#organization"
                },
                "inLanguage": "en-US"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
