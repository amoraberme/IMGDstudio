import SiteNavbar from "../components/common/SiteNavbar";
import SiteFooter from "../components/common/SiteFooter";
import PricingSection from "../components/sections/PricingSection";
import ProjectsArchiveSection from "../components/sections/ProjectsArchiveSection";

export default function ProjectsPage() {
  return (
    <div className="antialiased min-h-screen text-gray-900">
      <SiteNavbar
        cta={{ href: "/#main-1", label: "Home", className: "site-nav-cta-home" }}
        showBurger={false}
        logoHref="/#main-1"
      />
      <ProjectsArchiveSection id="projects" />
      <PricingSection
        id="projects-pricing"
        className="pt-16 pb-10 px-6 max-w-4xl mx-auto text-center"
      />
      <SiteFooter />
    </div>
  );
}
