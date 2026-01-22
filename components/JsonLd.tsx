export default function JsonLd() {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://volts-design.vercel.app/#organization",
                "name": "Volts Design",
                "url": "https://volts-design.vercel.app",
                "logo": "https://volts-design.vercel.app/logo-new.png",
                "description": "Premier Architectural Lighting Design Firm in Malaysia.",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+60-12-345-6789", // Placeholder
                    "contactType": "customer service"
                },
                "sameAs": [
                    "https://www.instagram.com/voltsdesign",
                    "https://twitter.com/voltsdesign" // Placeholder
                ]
            },
            {
                "@type": "Person",
                "@id": "https://volts-design.vercel.app/#hazem",
                "name": "Hazem",
                "jobTitle": "Architectural Lighting Architect",
                "worksFor": {
                    "@id": "https://volts-design.vercel.app/#organization"
                },
                "url": "https://volts-design.vercel.app",
                "image": "https://volts-design.vercel.app/profile.jpg" // Placeholder if valid
            },
            {
                "@type": "WebSite",
                "@id": "https://volts-design.vercel.app/#website",
                "url": "https://volts-design.vercel.app",
                "name": "Volts Design",
                "description": "Architectural Lighting Architect",
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
