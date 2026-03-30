export default function FeaturesSection() {
  return (
    <section id="features" className="pt-16 pb-10 px-6 max-w-5xl mx-auto text-center">
      <div className="section-tag mx-auto">Features</div>

      <h2 className="text-4xl font-semibold mb-4 tracking-tight">
        Built for Founders
        <br />
        Who Want More
      </h2>
      <p className="text-gray-500 mb-5">
        We focus on speed, clarity, and results &mdash; so
        <br />
        you can focus on growth.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 text-left">
        <article className="feature-card reveal-up" data-reveal style={{ "--reveal-delay": "0ms" }}>
          <div className="feature-preview feature-preview-quick" aria-hidden="true">
            <div className="feature-quick-dashboard">
              <div className="feature-quick-topline">
                <strong>Current orders</strong>
                <span>Live</span>
              </div>
              <div className="feature-quick-meta">In progress: 1 order</div>
              <div className="feature-quick-value">
                <span>10725</span>
              </div>
              <div className="feature-quick-footer">
                <i className="feature-quick-dot" />
                <span>Complete your delivery queue</span>
              </div>
            </div>
          </div>

          <div className="feature-copy">
            <h3>Quick Delivery</h3>
            <p>
              We work with one project at a time &mdash; so you get results faster, without
              the chaos.
            </p>
          </div>
        </article>

        <article className="feature-card reveal-up" data-reveal style={{ "--reveal-delay": "70ms" }}>
          <div className="feature-preview feature-preview-design" aria-hidden="true">
            <div className="feature-design-stage">
              <div className="feature-design-core" />
              <i className="feature-design-node light n1" />
              <i className="feature-design-node n2" />
              <i className="feature-design-node light n3" />
              <i className="feature-design-node n4" />
              <span className="feature-design-handle h1" />
              <span className="feature-design-handle h2" />
              <span className="feature-design-handle h3" />
              <span className="feature-design-handle h4" />
            </div>

            <div className="feature-design-toolbar">
              <i />
              <i />
              <span />
            </div>
          </div>

          <div className="feature-copy">
            <h3>Custom-Made Design</h3>
            <p>Every layout is designed from scratch to reflect your brand, not a template.</p>
          </div>
        </article>

        <article className="feature-card reveal-up" data-reveal style={{ "--reveal-delay": "140ms" }}>
          <div className="feature-preview" aria-hidden="true">
            <div className="feature-scale-stack">
              <div className="feature-scale-card small">
                <p>10 min ago</p>
                <p>Resizing components completed</p>
              </div>

              <div className="feature-scale-card large">
                <div className="feature-scale-row">
                  <span className="feature-scale-check">&#10003;</span>
                  <strong>Resizing components completed</strong>
                </div>
              </div>
            </div>

            <div className="feature-scale-chip">
              <b>Configuring CMS</b>
            </div>
          </div>

          <div className="feature-copy">
            <h3>Built to Scale</h3>
            <p>We create flexible systems that are easy to update as your business evolves.</p>
          </div>
        </article>

        <article className="feature-card reveal-up" data-reveal style={{ "--reveal-delay": "210ms" }}>
          <div className="feature-preview feature-preview-pricing" aria-hidden="true">
            <div className="feature-pricing-card left">
              <div className="feature-pricing-value">&#8369;8,000</div>
              <div className="feature-pricing-sub">Landing Page</div>
              <div className="feature-pricing-separator" />
              <div className="feature-pricing-button" />
            </div>

            <div className="feature-pricing-card right">
              <div className="feature-pricing-value">&#8369;10,000</div>
              <div className="feature-pricing-sub">Multi-page website</div>
              <div className="feature-pricing-separator" />
              <div className="feature-pricing-button" />
            </div>
          </div>

          <div className="feature-copy">
            <h3>Transparent Pricing</h3>
            <p>No hidden costs. Just clear, fixed rates that fit your scope and budget.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
