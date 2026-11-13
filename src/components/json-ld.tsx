export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "Euro Star Electromechanical",
    url: "https://eurostaremc.com",
    logo: "https://eurostaremc.com/logo.png",
    description:
      "Precision electromechanical contracting, structural steel fabrication, TIG/arc welding, and certified manpower solutions based in Ajman, UAE. Est. 2010.",
    foundingDate: "2010",
    telephone: ["+971503860061", "+971509142430"],
    email: "info@eurostaremc.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jurf Plaza, Room 602, Rashidiya 1",
      addressLocality: "Ajman",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.4052,
      longitude: 55.5136,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+971503860061",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+971509142430",
      },
    ],
  };

  return (
    <script
      id="json-ld-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
