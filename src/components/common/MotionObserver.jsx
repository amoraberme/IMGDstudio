import { useEffect } from "react";

export default function MotionObserver() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    const observePendingElements = () => {
      const elements = Array.from(document.querySelectorAll("[data-reveal]"));
      if (prefersReducedMotion) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      elements.forEach((element) => {
        if (!element.dataset.revealObserved) {
          element.dataset.revealObserved = "true";
          observer.observe(element);
        }
      });
    };

    observePendingElements();

    const mutationObserver = new MutationObserver(() => {
      observePendingElements();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
