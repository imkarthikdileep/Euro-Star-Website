export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Euro Star Electromechanical',
        url: 'https://www.eurostaremc.com',
        logo: 'https://www.eurostaremc.com/logo.png',
        description: "UAE's trusted partner for industrial manpower and fabrication since 2010.",
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Ajman',
            addressCountry: 'UAE'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+971-55-905-2313',
            contactType: 'customer service',
            areaServed: 'AE',
            availableLanguage: ['en', 'ar']
        },
        sameAs: [
            // Add social media links here if available, e.g.
            // 'https://www.linkedin.com/company/eurostaremc',
            // 'https://www.facebook.com/eurostaremc'
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
