import { useState } from "react";
import { useSiteShell } from "../common/SiteShellContext";

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function HeroSection() {
  const { openContactModal } = useSiteShell();
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="main-1"
      className="hero-stage relative overflow-hidden pt-28 pb-8 px-6 max-w-6xl mx-auto text-center flex flex-col items-center"
    >
      <div className="hero-badge mt-28 mb-8 reveal-up" data-reveal style={{ "--reveal-delay": "0ms" }}>
        <div className="hero-badge-avatars" aria-hidden="true">
          <span className="hero-badge-avatar a1" />
          <span className="hero-badge-avatar a2" />
          <span className="hero-badge-avatar a3" />
        </div>
        <span className="text-sm font-medium text-gray-600">Our clients trust us</span>
      </div>

      <div className="hero-copy reveal-up" data-reveal style={{ "--reveal-delay": "60ms" }}>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
          Next-Level Web Site
          <br />
          for SaaS &amp; Startups
        </h1>

        <p className="hero-kicker max-w-xl mx-auto mb-5">
          A strategic website that accelerates
          <br />
          your SaaS or startup&apos;s success
        </p>
      </div>

      <div
        className="hero-actions reveal-up"
        aria-label="Hero actions"
        data-reveal
        style={{ "--reveal-delay": "110ms" }}
      >
        <button
          type="button"
          className="hero-action-btn hero-action-primary"
          onClick={() => openContactModal("hero")}
        >
          <span>Secure your spot</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
        <a href="#pricing" className="hero-action-btn hero-action-secondary">
          Plans and Pricing
        </a>
      </div>

      <div className="hero-showcase">
        <article
          className="hero-panel hero-panel-left reveal-up"
          aria-label="Optics showcase"
          data-reveal
          style={{ "--reveal-delay": "150ms" }}
        >
          <div className="hero-left-topbar" aria-hidden="true">
            <span className="hero-left-wordmark">optics</span>
            <div className="hero-left-topnav">
              <span>Product</span>
              <span>Solutions</span>
              <span>Pricing</span>
              <span>Resources</span>
              <span className="hero-left-mini-pill">Secure a Spot</span>
            </div>
          </div>

          <div className="hero-panel-left-copy">
            <p className="hero-panel-eyebrow">Optics</p>
            <h3>
              Boost AOV <span className="hero-inline-toggle" aria-hidden="true"><i /></span> LTV, and
              Conversions at Scale
            </h3>
            <p className="hero-panel-left-sub">
              Optimize subscriptions, upsells, and retention with a revenue system built to
              grow.
            </p>
          </div>

          <div className="hero-left-chip">
            <span>Get My Revenue Forecast</span>
            <strong>&rarr;</strong>
          </div>

          <div className="hero-left-controls" aria-hidden="true">
            <span className="hero-left-control">Revenue Growth Dashboard</span>
            <span className="hero-left-control">Growth Analytics</span>
          </div>

          <div className="hero-optics-graph" aria-hidden="true">
            <span className="hero-network-line l1" />
            <span className="hero-network-line l2" />
            <span className="hero-network-line l3" />
            <span className="hero-network-line l4" />
            <span className="hero-network-line l5" />
            <span className="hero-network-card c1" />
            <span className="hero-network-card c2" />
            <span className="hero-network-card c3" />
            <span className="hero-network-card c4" />
            <span className="hero-network-card c5" />
            <span className="hero-network-card c6" />
            <span className="hero-network-card c7" />
            <span className="hero-network-dot d1" />
            <span className="hero-network-dot d2" />
            <span className="hero-network-dot d3" />
          </div>
        </article>

        <article
          className="hero-panel hero-panel-center-v2 reveal-up is-clickable"
          aria-label="Engine showcase"
          data-reveal
          style={{ "--reveal-delay": "210ms" }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onMouseMove={handleMouseMove}
          onClick={() => window.open("https://www.careersync.website/", "_blank")}
        >
          <div className="careersync-scan-card">
            <div className="card-header">
              <span><span className="live-dot"></span>LIVE RESUME MATCH SCAN</span>
              <span style={{ color: "#999" }}>10: 87x-992-bf</span>
            </div>
            <div className="scan-grid">
              <div className="gauge-container">
                <svg className="gauge-svg" width="100" height="100" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40"></circle>
                  <circle className="gauge-fill" cx="50" cy="50" r="40"></circle>
                </svg>
                <div className="gauge-text">
                  <span className="gauge-val">85</span>
                  <span className="gauge-max">/100</span>
                </div>
              </div>
              <div className="tags-container">
                <span className="tag">Python</span>
                <span className="tag">Results-driven</span>
                <span className="tag" style={{ background: "#e1f2ef" }}>Project Management</span>        
                <span className="tag">Hard worker</span>
                <span className="tag" style={{ background: "#e1f2ef" }}>React</span>
                <span className="tag">Team player</span>
                <span className="tag" style={{ background: "#e1f2ef" }}>Stakeholder Communication</span> 
                <span className="tag">SQL</span>
              </div>
            </div>
            <div className="status-terminal">
              {">"} match_analysis_complete: drafting_cover_letter... <span className="cursor"></span>    
            </div>
          </div>
        </article>

        <article
          className="hero-panel hero-panel-right reveal-up"
          aria-label="Oxwealth showcase"
          data-reveal
          style={{ "--reveal-delay": "270ms" }}
        >
          <div className="hero-right-brand">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
            <span>Oxwealth</span>
          </div>
          <div className="hero-right-nav" aria-hidden="true">
            <span>How It Works</span>
            <span>Features</span>
            <span>Intelligence</span>
          </div>

          <div className="hero-right-glow" aria-hidden="true" />

          <div className="hero-right-copy">
            <h3>
              Your Wealth.
              <br />
              One Intelligent Place.
            </h3>
            <p>
              Manage stocks, crypto, and everyday money in a simple app built for
              future-focused investing.
            </p>
          </div>

          <div className="hero-right-cta-row" aria-hidden="true">
            <span className="hero-right-pill">Request Invite</span>
            <span className="hero-right-pill primary">Explore Platform</span>
          </div>

          <div className="hero-right-social" aria-hidden="true">
            <XIcon />
            <span>X/Twitter</span>
          </div>
        </article>
      </div>

      {showTooltip && (
        <div 
          className="hero-center-tooltip"
          style={{ 
            left: `${tooltipPos.x}px`, 
            top: `${tooltipPos.y}px` 
          }}
        >
          <span>Visit careersync.website</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </div>
      )}
    </section>
  );
}
