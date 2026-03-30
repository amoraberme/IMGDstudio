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

  return (
    <section
      id="main-1"
      className="hero-stage relative overflow-hidden pt-28 pb-8 px-6 max-w-6xl mx-auto text-center flex flex-col items-center"
    >
      <div className="hero-badge mb-8 reveal-up" data-reveal style={{ "--reveal-delay": "0ms" }}>
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
          className="hero-panel hero-panel-center reveal-up"
          aria-label="AI agent showcase"
          data-reveal
          style={{ "--reveal-delay": "210ms" }}
        >
          <div className="hero-center-top">
            <span className="hero-center-brand">Nexio</span>
            <nav aria-hidden="true">
              <span>Product</span>
              <span>Solutions</span>
              <span>Pricing</span>
              <span>Resources</span>
              <span>Contact</span>
            </nav>
            <span className="hero-center-ghost" aria-hidden="true">
              Join Beta
            </span>
          </div>

          <div className="hero-center-headline">
            <p>Your smartest AI SDR</p>
            <h3>AI Agent That Turns Emails Into Closed Deals</h3>
            <div className="hero-center-actions" aria-hidden="true">
              <span className="hero-center-action primary">Join Beta</span>
              <span className="hero-center-action">Watch Demo</span>
            </div>
          </div>

          <div className="hero-center-canvas" aria-hidden="true">
            <div className="hero-center-note">
              Your words feel personal, your site feels premium, and every message lands with
              confidence.
            </div>
            <div className="hero-center-envelope" />
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
    </section>
  );
}
