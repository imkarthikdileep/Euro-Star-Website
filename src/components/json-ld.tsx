export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Euro Star Electromechanical Cont.',
        url: 'https://www.eurostaremc.com',
        logo: 'https://www.eurostaremc.com/logo.png',
        description: "Specialists in electromechanical and fabrication works.",
        foundingDate: "2010",
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Ajman',
            addressCountry: 'AE'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+971-55-905-2313' // Ensure this number is correct or replaced with the specific one if provided later
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
