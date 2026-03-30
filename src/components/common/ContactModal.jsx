import { useEffect, useRef, useState } from "react";
import { useSiteShell } from "./SiteShellContext";

const initialFormState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactModal() {
  const { contactSource, isContactModalOpen, closeContactModal } = useSiteShell();
  const firstFieldRef = useRef(null);
  const [formState, setFormState] = useState(initialFormState);
  const [status, setStatus] = useState({ tone: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isContactModalOpen) {
      const timeoutId = window.setTimeout(() => {
        setFormState(initialFormState);
        setStatus({ tone: "idle", message: "" });
        setIsSubmitting(false);
      }, 220);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    firstFieldRef.current?.focus();

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeContactModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeContactModal, isContactModalOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ tone: "idle", message: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          source: contactSource,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send your inquiry.");
      }

      setStatus({
        tone: "success",
        message: "Message sent successfully. We'll be in touch soon.",
      });
      setFormState(initialFormState);
    } catch (error) {
      setStatus({
        tone: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`contact-modal${isContactModalOpen ? " is-open" : ""}`}
      aria-hidden={!isContactModalOpen}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeContactModal();
        }
      }}
    >
      <section
        className="contact-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button
          type="button"
          className="contact-modal-close"
          aria-label="Close contact form"
          onClick={closeContactModal}
        >
          <span />
          <span />
        </button>

        <div className="contact-modal-copy">
          <div className="section-tag">Secure your spot</div>
          <h2 id="contact-modal-title">Tell us what you&apos;re building.</h2>
          <p>
            Share a few details and IMGD will follow up with next steps, timing, and the best-fit
            scope.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-field">
            <span>Name</span>
            <input
              ref={firstFieldRef}
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </label>

          <label className="contact-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="contact-field">
            <span>Project details</span>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Tell us about the pages, goals, and timeline."
              rows="5"
              required
            />
          </label>

          <div
            className={`contact-form-status${
              status.tone !== "idle" ? ` is-${status.tone}` : ""
            }`}
            aria-live="polite"
          >
            {status.message}
          </div>

          <button type="submit" className="contact-submit-button" disabled={isSubmitting}>
            <span>{isSubmitting ? "Sending inquiry..." : "Send inquiry"}</span>
          </button>
        </form>
      </section>
    </div>
  );
}
