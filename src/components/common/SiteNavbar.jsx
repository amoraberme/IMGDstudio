import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import brandMark from "../../assets/Brand.png";

function BurgerButton() {
  return (
    <button type="button" className="site-nav-burger" aria-label="Open menu">
      <span className="site-nav-burger-grid" aria-hidden="true" />
    </button>
  );
}

export default function SiteNavbar({
  links = [],
  cta,
  centered = false,
  showBurger = true,
  logoHref = "/#main-1",
}) {
  const menuRef = useRef(null);
  const linkRefs = useRef({});
  const [activeHref, setActiveHref] = useState(null);
  const [hoverHref, setHoverHref] = useState(null);
  const [indicator, setIndicator] = useState({ width: 0, left: 0, opacity: 0 });

  const currentHref = hoverHref || activeHref;

  useEffect(() => {
    if (!links.length) return undefined;

    const syncActiveSection = () => {
      const checkpoint = window.innerHeight * 0.4;
      let current = null;
      let fallback = null;

      links.forEach((link) => {
        if (!link.href?.startsWith("#")) return;
        const section = document.querySelector(link.href);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const crossesCheckpoint = rect.top <= checkpoint && rect.bottom >= checkpoint;
        if (rect.top <= checkpoint) fallback = link.href;
        if (crossesCheckpoint) current = link.href;
      });

      setActiveHref(current || fallback);
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);
    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, [links]);

  useEffect(() => {
    if (!links.length) return;
    const menu = menuRef.current;
    const activeNode = currentHref ? linkRefs.current[currentHref] : null;
    if (!menu || !activeNode || window.getComputedStyle(menu).display === "none") {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    setIndicator({
      width: activeNode.offsetWidth,
      left: activeNode.offsetLeft,
      opacity: 1,
    });
  }, [currentHref, links]);

  const navClassName = useMemo(
    () => `site-nav${centered ? " home-nav" : ""}`,
    [centered]
  );

  return (
    <nav className={navClassName}>
      <div className="site-nav-inner">
        <a href={logoHref} className="site-nav-logo" aria-label="IMGD home">
          <img src={brandMark} alt="" className="site-nav-logo-mark" />
          <span>IMGD</span>
        </a>

        {links.length > 0 && (
          <div className="site-nav-center">
            <div ref={menuRef} className="site-nav-menu" aria-label="Primary">
              <span
                className="site-nav-menu-indicator"
                aria-hidden="true"
                style={{
                  width: `${indicator.width}px`,
                  transform: `translateX(${indicator.left}px)`,
                  opacity: indicator.opacity,
                }}
              />
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  ref={(node) => {
                    linkRefs.current[link.href] = node;
                  }}
                  className={[
                    "site-nav-link",
                    activeHref === link.href ? "is-current" : "",
                    hoverHref === link.href ? "is-hovered" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseEnter={() => setHoverHref(link.href)}
                  onMouseLeave={() => setHoverHref(null)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="site-nav-actions">
          {cta &&
            (cta.disabled ? (
              <span
                className={`site-nav-cta is-disabled${cta.className ? ` ${cta.className}` : ""}`}
                aria-disabled="true"
              >
                <span>{cta.label}</span>
                {cta.count ? <span className="site-nav-cta-count">{cta.count}</span> : null}
              </span>
            ) : cta.to ? (
              <Link to={cta.to} className={`site-nav-cta${cta.className ? ` ${cta.className}` : ""}`}>
                <span>{cta.label}</span>
                {cta.count ? <span className="site-nav-cta-count">{cta.count}</span> : null}
              </Link>
            ) : (
              <a href={cta.href} className={`site-nav-cta${cta.className ? ` ${cta.className}` : ""}`}>
                <span>{cta.label}</span>
                {cta.count ? <span className="site-nav-cta-count">{cta.count}</span> : null}
              </a>
            ))}
          {showBurger ? <BurgerButton /> : null}
        </div>
      </div>
    </nav>
  );
}
