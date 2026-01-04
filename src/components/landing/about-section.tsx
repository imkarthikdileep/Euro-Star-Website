export function AboutSection() {
    return (
      <section id="about" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">About Euro Star Electromechanical</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
              With a team of dedicated, qualified, and highly professional skilled and semi-skilled workers, Euro Star Electromechanical Cont. is specialized in carrying out Fabrication works in various sectors like Oil field, Marine etc., involving intricate design, high standards, and superior engineering skill. This has assisted the company to successfully evolve as a leading Sub-Contractor in a short span of time.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-center max-w-4xl mx-auto">
            <div className="space-y-2">
                <h3 className="text-2xl font-bold font-headline text-primary">Our Commitment</h3>
                <p className="text-muted-foreground">
                    Euro Star Electromechanical is committed to the satisfaction of its clients and to put all its energy into the completion of the project on time.
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-bold font-headline text-primary">Our Process</h3>
                <p className="text-muted-foreground">
                    Our service starts with a thorough analysis and spans the complete cycle of the project, from implementation to comprehensive project management, with clear-out objectives and well-thought strategies for the completion and handing over of the project.
                </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-6">Our Sister Concerns</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-6 bg-background rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-primary">Kenz Hiraa Technical Services LLC</h4>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-primary">Kenz Hiraa General Trading LLC</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
