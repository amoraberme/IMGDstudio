import { useState } from "react";
import { draftDesigns, freelanceProjects } from "../../data/projects";

function ProjectPreview({ type }) {
  switch (type) {
    case "oxwealth":
      return (
        <div className="project-preview oxwealth" aria-hidden="true">
          <div className="project-row-logo dark">
            <span className="project-row-logo-dot" />
            <span>Oxwealth</span>
          </div>
          <div className="project-floating-stack">
            <div className="project-floating-card a" />
            <div className="project-floating-card b" />
            <div className="project-floating-card c" />
          </div>
          <div className="project-preview-title">
            Your Wealth.
            <br />
            One Intelligent Place.
          </div>
        </div>
      );
    case "vikka":
      return (
        <div className="project-preview vikka" aria-hidden="true">
          <div className="project-vikka-board">Search, browse, purchase</div>
          <div className="project-preview-title">
            Buy &amp; Sell
            <br />
            Anything, Fast
          </div>
        </div>
      );
    case "ihgs":
      return (
        <div className="project-preview ihgs" aria-hidden="true">
          <div className="project-ihgs-copy">
            Elite Performance Marketing
            <br />
            for DTC Wellness Brands
            <small>Growth systems, retention, and acquisition for serious founders.</small>
          </div>
          <div className="project-ihgs-pill">Request Strategy Call</div>
        </div>
      );
    case "jova":
      return (
        <div className="project-preview jova" aria-hidden="true">
          <div className="project-jova-copy">
            The Blockchain For
            <br />
            Creators, Brands &amp; Communities
            <small>Secure rails, modular infrastructure, and a cleaner story for adoption.</small>
          </div>
        </div>
      );
    case "founderx":
      return (
        <div className="project-preview founderx" aria-hidden="true">
          <div className="project-founderx-screen">
            <div className="project-founderx-bars">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="project-preview-title">
            You Got Skills. So Why Aren&apos;t You
            <br />
            Monetizing Online Yet?
          </div>
        </div>
      );
    case "centrix":
      return (
        <div className="project-preview centrix" aria-hidden="true">
          <div className="project-centrix-metric">
            <strong>42%</strong>
            <span>Conversion uplift</span>
          </div>
          <div className="project-centrix-card" />
          <div className="project-preview-title">
            Scale Smarter
            <br />
            With Better Data
          </div>
        </div>
      );
    default:
      return (
        <div className="project-preview autocaption" aria-hidden="true">
          <div className="project-autocaption-title">
            Create Scroll-Stopping
            <br />
            Clips Faster
            <small>Auto-captions, creator workflows, and polished content exports.</small>
          </div>
          <div className="project-autocaption-avatars">
            <span className="project-autocaption-avatar" />
            <span className="project-autocaption-avatar" />
          </div>
        </div>
      );
  }
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card reveal-up" data-reveal style={{ "--reveal-delay": `${index * 55}ms` }}>
      <div className="project-card-body text-left">
        <div className="project-row-logo">
          <span className="project-row-logo-dot" />
          <span>{project.name}</span>
        </div>
        <div className="project-tag-row">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-duration">Duration: {project.duration}</div>
      </div>
      <ProjectPreview type={project.preview} />
    </article>
  );
}

function DraftPlaceholder({ item, index }) {
  return (
    <article
      className="project-placeholder-card reveal-up"
      data-reveal
      style={{ "--reveal-delay": `${index * 55}ms` }}
    >
      <div className="project-placeholder-copy">
        <h3>{item.title}</h3>
        <p>Reserved image placeholder for a future freelance concept preview.</p>
      </div>
      <div className={`project-placeholder-media ${item.variant}`.trim()} aria-hidden="true">
        <div className="project-placeholder-toolbar">
          <span />
          <span />
          <span />
        </div>
        <div className="project-placeholder-lines">
          <i />
          <i />
          <i />
        </div>
        <div className="project-placeholder-image" />
        <span className="project-placeholder-badge">Image Placeholder</span>
      </div>
    </article>
  );
}

export default function ProjectsArchiveSection({
  id = "projects",
  className = "pt-28 pb-10 px-6 max-w-6xl mx-auto text-center",
}) {
  const [view, setView] = useState("freelance");

  return (
    <section id={id} className={className}>
      <h2 className="text-4xl font-semibold mb-4 tracking-tight">
        Projects That Pay
        <br />
        Posts That Inspire
      </h2>
      <p className="text-gray-500 mb-10 max-w-xl mx-auto">
        A dedicated archive of landing pages, product sites, and client work built to make
        positioning sharper and conversions clearer.
      </p>

      <div className="projects-tabs mb-10" aria-label="Project categories">
        <button
          type="button"
          className={`projects-tab${view === "freelance" ? " active" : ""}`}
          aria-pressed={view === "freelance"}
          onClick={() => setView("freelance")}
        >
          Freelance Projects
        </button>
        <button
          type="button"
          className={`projects-tab${view === "drafts" ? " active" : ""}`}
          aria-pressed={view === "drafts"}
          onClick={() => setView("drafts")}
        >
          Draft Designs
        </button>
      </div>

      {view === "freelance" ? (
        <div className="projects-grid">
          {freelanceProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="project-placeholder-grid">
          {draftDesigns.map((item, index) => (
            <DraftPlaceholder key={item.id} item={item} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
