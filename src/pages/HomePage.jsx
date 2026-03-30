import SiteNavbar from "../components/common/SiteNavbar";
import SiteFooter from "../components/common/SiteFooter";
import FeaturesSection from "../components/sections/FeaturesSection";
import FAQSection from "../components/sections/FAQSection";
import HeroSection from "../components/sections/HeroSection";
import PricingSection from "../components/sections/PricingSection";
import ServicesSection from "../components/sections/ServicesSection";

const homeLinks = [
  { href: "#features", label: "Features" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function HomePage() {
  return (
    <div className="antialiased min-h-screen text-gray-900">
      <SiteNavbar
        centered
        links={homeLinks}
        cta={{ label: "See all projects", count: "(7)", disabled: true }}
        showBurger
        logoHref="/#main-1"
      />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <PricingSection id="pricing" />
      <FAQSection id="faq" />
      <SiteFooter />
    </div>
  );
}
