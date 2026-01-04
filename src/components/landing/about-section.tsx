const timelineEvents = [
    {
      year: "2015",
      title: "Foundation",
      description: "EmiratiStaff Solutions was founded to bridge the gap between talented Emirati professionals and leading UAE companies.",
    },
    {
      year: "2017",
      title: "First Major Partnership",
      description: "Secured our first major partnership with a leading government entity, placing over 100 candidates.",
    },
    {
      year: "2019",
      title: "Service Expansion",
      description: "Expanded our services to include Emiratisation consulting and comprehensive HR outsourcing solutions.",
    },
    {
      year: "2021",
      title: "Technology Integration",
      description: "Launched our AI-powered candidate matching platform to streamline the recruitment process.",
    },
    {
      year: "2023",
      title: "Award for Excellence",
      description: "Recognized as the 'Best National Recruitment Agency' at the UAE Business Awards.",
    },
  ];
  
export function AboutSection() {
    return (
      <section id="about" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Journey of Growth</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              A timeline of our commitment to empowering the national workforce.
            </p>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-4 h-full w-0.5 bg-border" aria-hidden="true"></div>
            <div className="space-y-12 pl-12">
                {timelineEvents.map((event, index) => (
                    <div key={index} className="relative">
                        <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-primary border-4 border-card"></div>
                        <p className="text-accent font-bold text-lg mb-1">{event.year}</p>
                        <h3 className="text-2xl font-bold font-headline text-primary mb-2">{event.title}</h3>
                        <p className="text-muted-foreground">{event.description}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    );
}
