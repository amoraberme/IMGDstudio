import { useState } from "react";
import { discussionLinks, handleDiscussionLinkClick } from "../../data/contact";
import { faqItems } from "../../data/faqs";

function TelegramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.97-.64-.34-1 .22-1.58.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.06-.05-.16-.03-.23-.01-.1.02-1.63 1.03-4.61 3.03-.43.3-.82.45-1.18.44-.39-.01-1.14-.22-1.7-.4-.68-.22-.68-.34-.98-1.42 2.7-.91 5.4-1.87 8.16-2.91.86-.33 1.68-.62 2.37-.88.72-.27 1.39-.46 1.83-.49.37-.02.48.16.51.35z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function FAQSection({
  id = "faq",
  className = "pt-16 pb-10 px-6 max-w-3xl mx-auto text-center",
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const icons = {
    Telegram: <TelegramIcon />,
    WhatsApp: <WhatsAppIcon />,
    Viber: <XIcon />,
    Discord: <XIcon />,
  };

  return (
    <section id={id} className={className}>
      <div className="section-tag mx-auto">FAQ</div>

      <h2 className="text-4xl font-semibold mb-4 tracking-tight">
        Everything You
        <br />
        Need to Know
      </h2>
      <p className="text-gray-500 mb-8">
        From timelines to payments &mdash; here&apos;s what
        <br />
        founders usually ask us.
      </p>

      <div className="faq-stack">
        {faqItems.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <article
              key={item.question}
              className={`faq-item reveal-up${isOpen ? " is-open" : ""}`}
              data-reveal
              style={{ "--reveal-delay": `${index * 55}ms` }}
            >
              <button
                className="faq-question"
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}-${index + 1}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <h4>{item.question}</h4>
                <span className="faq-item-toggle" aria-hidden="true" />
              </button>
              <div className="faq-answer" id={`faq-answer-${id}-${index + 1}`}>
                <div className="faq-answer-inner">
                  <div className="faq-answer-copy">{item.answer}</div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="faq-help reveal-up" data-reveal style={{ "--reveal-delay": "120ms" }}>
        <h5 className="faq-help-title">Can&apos;t find your answer?</h5>
        <div className="faq-help-actions">
          {discussionLinks.map((link) =>
            link.isDisabled ? (
              <span key={link.label} className="faq-help-pill is-disabled" aria-disabled="true">
                <span>{link.label}</span>
                {icons[link.label]}
              </span>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="faq-help-pill"
                onClick={(event) => handleDiscussionLinkClick(event, link)}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noreferrer" : undefined}
              >
                <span>{link.label}</span>
                {icons[link.label]}
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}
