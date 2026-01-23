import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Volts Design | Architectural Lighting',
        short_name: 'Volts Design',
        description: 'Premier Architectural Lighting Design by Hazem. Sculpting atmosphere for luxury residential & commercial spaces.',
        start_url: '/',
        display: 'standalone',
        background_color: '#050505',
        theme_color: '#050505',
        icons: [
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
