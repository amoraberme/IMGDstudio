import { useState } from "react";
import { pricingPlans } from "../../data/pricing";
import StaggeredSwapText from "../common/StaggeredSwapText";
import { useSiteShell } from "../common/SiteShellContext";

function Logo1Mark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 -5 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M27.77 13.56c-1.018-2.07-2.042-4.14-3.06-6.21-.366-.745-1.424-.745-1.79 0-1.02 2.075-2.04 4.145-3.06 6.22a1.97 1.97 0 0 1-.42.44c-1.897 1.039-3.793 2.081-5.69 3.12-.701.384-.688 1.39.02 1.76 1.886.985 3.774 1.965 5.66 2.95.191.1.337.266.43.46 1.017 2.117 2.043 4.233 3.06 6.35.363.756 1.437.756 1.8 0 1.015-2.112 2.025-4.228 3.04-6.34.098-.204.267-.361.47-.46 2.023-.981 4.047-1.969 6.07-2.95.744-.361.747-1.415.01-1.79-2.034-1.034-4.066-2.066-6.1-3.1a1.991 1.991 0 0 1-.44-.45Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function Logo2Mark() {
  return (
    <svg width="30" height="30" viewBox="0 -5 48 48" fill="none" aria-hidden="true">
      <path
        d="M27.07 12.01c-.601-1.427-1.199-2.863-1.8-4.29-.67-1.593-2.91-1.642-3.65-.08-.7 1.479-1.41 2.961-2.11 4.44-.3.634-.902 1.06-1.6 1.13-1.494.149-2.996.301-4.49.45-1.711.171-2.417 2.277-1.16 3.45 1.152 1.075 2.298 2.155 3.45 3.23.507.473.736 1.17.6 1.85-.311 1.555-.619 3.115-.93 4.67-.334 1.672 1.44 2.968 2.93 2.14 1.407-.781 2.813-1.559 4.22-2.34a1.95 1.95 0 0 1 1.99.02c1.221.718 2.439 1.442 3.66 2.16 1.489.876 3.309-.426 2.97-2.12-.302-1.508-.598-3.022-.9-4.53-.136-.68.093-1.377.6-1.85 1.152-1.075 2.298-2.155 3.45-3.23 1.257-1.173.551-3.279-1.16-3.45-1.474-.147-2.956-.293-4.43-.44-.729-.073-1.356-.535-1.64-1.21Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function VercelIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="currentColor" aria-hidden="true">
      <path d="M5 0.75L9.25 7.25H0.75L5 0.75Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.47 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.66-.22.66-.48 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.2-3.37-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.11 2.92.85.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.84c.85 0 1.7.12 2.49.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.17.59.67.48A10.25 10.25 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
      <path
        d="M8.48.75H4.44A1.87 1.87 0 0 0 2.98 1.5L.92 4.17c-.44.57-.03 1.4.69 1.4h2.86L1.8 9.66c-.45.7.05 1.59.88 1.59h2.4c.53 0 1.02-.27 1.31-.72l2.99-4.61c.46-.7-.04-1.6-.87-1.6H6.24L9.17 2.2c.45-.35.2-1.45-.69-1.45Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19.25V11.5m7 7.75V4.75m7 14.5v-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.75 19.5 8v8L12 20.25 4.5 16V8 3.75Zm0 0V12m0 8.25V12m0 0 7.5-4M12 12 4.5 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.75 19.25h4.25L19 9.25 14.75 5 4.75 15v4.25ZM13.5 6.25l4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3.75v3m10-3v3M4.75 9h14.5m-13 10.25h11.5A1.75 1.75 0 0 0 19.5 17.5V7.75A1.75 1.75 0 0 0 17.75 6H6.25A1.75 1.75 0 0 0 4.5 7.75v9.75A1.75 1.75 0 0 0 6.25 19.25Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 17.75 5.75 20v-3.3A6.75 6.75 0 1 1 9 17.75Zm4.5-11a5.75 5.75 0 1 1 0 11.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PricingCornerMark({ mode }) {
  if (mode !== "build") return null;

  return (
    <span className="pricing-dev-stack" aria-hidden="true">
      <span className="pricing-dev-pill">
        <VercelIcon />
        <span>Vercel</span>
      </span>
      <span className="pricing-dev-plus">+</span>
      <span className="pricing-dev-pill">
        <GitHubIcon />
        <span>GitHub</span>
      </span>
      <span className="pricing-dev-plus">+</span>
      <span className="pricing-dev-pill">
        <SupabaseIcon />
        <span>Supabase</span>
      </span>
      <span className="pricing-dev-plus">+</span>
      <span className="pricing-dev-pill">
        <AnalyticsIcon />
        <span>Analytics</span>
      </span>
    </span>
  );
}

function featureIconForIndex(index) {
  if (index === 0) return <CubeIcon />;
  if (index === 1) return <EditIcon />;
  if (index === 2) return <CalendarIcon />;
  return <ChatIcon />;
}

export default function PricingSection({
  id = "pricing",
  className = "pt-16 pb-10 px-6 max-w-4xl mx-auto text-center",
}) {
  const [mode, setMode] = useState("design");
  const { openContactModal } = useSiteShell();
  const multiPageDisclaimer = pricingPlans.find((plan) => plan.id === "multi-page")?.disclaimer ?? "";

  const changeMode = (nextMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
  };

  return (
    <section id={id} className={className}>
      <div className="section-tag mx-auto">Pricing</div>

      <h2 className="text-4xl font-semibold mb-4 tracking-tight">
        Simple Pricing
        <br />
        No Surprises
      </h2>
      <p className="text-gray-500 mb-5 max-w-sm mx-auto">
        Clear packages with flat rates &mdash; designed to
        <br />
        fit your scope and budget.
      </p>

      <div className="pricing-toggle mb-8" aria-label="Pricing mode">
        <button
          type="button"
          className={`pricing-toggle-option${mode === "design" ? " active" : ""}`}
          aria-pressed={mode === "design"}
          onClick={() => changeMode("design")}
        >
          <svg
            className="pricing-toggle-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="4" y="4" width="16" height="16" rx="3" />
          </svg>
          <span>Development</span>
        </button>
        <button
          type="button"
          className={`pricing-toggle-option${mode === "build" ? " active" : ""}`}
          aria-pressed={mode === "build"}
          onClick={() => changeMode("build")}
        >
          <svg
            className="pricing-toggle-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 6h12v12H6z" />
            <path d="M6 12h12" />
          </svg>
          <span>Development + Back-End</span>
        </button>
      </div>

      <div className="pricing-grid">
        {pricingPlans.map((plan, index) => (
          <div key={plan.id} className="pricing-card-stack">
            <article
              className="pricing-card reveal-up"
              data-reveal
              style={{ "--reveal-delay": `${index * 70}ms` }}
            >
              <div className="pricing-card-topbar">
                <div className={`pricing-plan-mark ${plan.icon}`} aria-hidden="true">
                  {plan.icon === "light" ? <Logo1Mark /> : <Logo2Mark />}
                </div>
                <div className={`pricing-corner-slot${mode === "build" ? " is-active" : ""}`}>
                  {mode === "build" ? (
                    <PricingCornerMark mode={mode} />
                  ) : null}
                </div>
              </div>

              <div className="pricing-card-head pricing-card-head-reference">
                <h3 className="pricing-card-title">{plan.title}</h3>
                <div className="pricing-card-price pricing-card-price-reference">
                  {plan.startingLabel ? (
                    <span className="pricing-card-starting">{plan.startingLabel}</span>
                  ) : null}
                  <strong>{plan.price[mode]}</strong>
                </div>
              </div>

              <p className="pricing-card-copy">{plan.copy}</p>

              <div className="pricing-divider" aria-hidden="true">
                <span className="pricing-divider-gem" />
                <span className="pricing-divider-line" />
                <span className="pricing-divider-gem" />
              </div>

              <div className="pricing-feature-list pricing-feature-list-reference">
                {plan.features.map((feature, featureIndex) => (
                  <div key={`${plan.id}-${featureIndex}`} className="pricing-feature">
                    <span className="pricing-feature-icon" aria-hidden="true">
                      {featureIconForIndex(featureIndex)}
                    </span>
                    <span>
                      {typeof feature === "object" ? feature[mode] : feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={`pricing-button pricing-button-reference${
                  mode === "build" ? " stagger-hover-target" : ""
                }`}
                onClick={() => openContactModal(`${plan.id}-${mode}`)}
              >
                {mode === "build" ? (
                  <StaggeredSwapText
                    label={plan.button[mode]}
                    hoverLabel="Let's Go"
                    align="center"
                  />
                ) : (
                  <span>{plan.button[mode]}</span>
                )}
              </button>
            </article>
          </div>
        ))}
      </div>

      {multiPageDisclaimer ? <p className="pricing-disclaimer pricing-disclaimer-centered">{multiPageDisclaimer}</p> : null}
    </section>
  );
}
