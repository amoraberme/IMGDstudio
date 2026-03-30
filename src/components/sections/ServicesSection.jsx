const services = [
  {
    title: "Website Design",
    copy:
      "Conversion-focused website interfaces made from scratch built for startups, SaaS, and personal brands.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    title: "Bento Design",
    copy:
      "Modular UI card systems designed to showcase features, content, or pricing with a clean visual rhythm.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "AI Expert",
    copy:
      "AI workflow setup, prompt systems, and automation guidance designed to make your product and operations smarter.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3.75v3.5M12 16.75v3.5M4.75 12h3.5M15.75 12h3.5" />
        <circle cx="12" cy="12" r="4.5" />
        <path d="M7.5 7.5 6 6m12 12-1.5-1.5M16.5 7.5 18 6M7.5 16.5 6 18" />
      </svg>
    ),
  },
  {
    title: "SQL Database",
    copy:
      "Structured SQL database design for scalable products, with clean schemas, relationships, and practical backend readiness.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
        <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="pt-16 pb-10 px-6 max-w-5xl mx-auto text-center">
      <div className="section-tag mx-auto">Services</div>

      <h2 className="text-4xl font-semibold mb-4 tracking-tight">What We Do Best</h2>
      <p className="text-gray-500 mb-5 max-w-sm mx-auto">
        From design to launch we cover the full cycle to make your product stand out.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="service-card reveal-up"
            data-reveal
            style={{ "--reveal-delay": `${index * 70}ms` }}
          >
            <div className="icon-box" aria-hidden="true">
              <span className="icon-box-orbit orbit-a" />
              <span className="icon-box-orbit orbit-b" />
              <span className="icon-box-glow" />
              <span className="icon-box-glyph">{service.icon}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{service.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
