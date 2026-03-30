import Lenis from "@studio-freight/lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SiteShellContext = createContext(null);

const lenisEasing = (time) => Math.min(1, 1.001 - 2 ** (-10 * time));

export function SiteShellProvider({ children }) {
  const lenisRef = useRef(null);
  const [contactState, setContactState] = useState({
    isOpen: false,
    source: "general",
  });

  const openContactModal = useCallback((source = "general") => {
    setContactState({ isOpen: true, source });
  }, []);

  const closeContactModal = useCallback(() => {
    setContactState((current) => ({ ...current, isOpen: false }));
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return undefined;

    const lenis = new Lenis({
      duration: 1.5,
      easing: lenisEasing,
      smooth: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    let frameId = 0;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    const root = document.documentElement;

    if (contactState.isOpen) {
      document.body.style.overflow = "hidden";
      root.classList.add("has-locked-scroll");
      lenis?.stop();
      return;
    }

    document.body.style.overflow = "";
    root.classList.remove("has-locked-scroll");
    lenis?.start();

    return undefined;
  }, [contactState.isOpen]);

  useEffect(
    () => () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("has-locked-scroll");
    },
    []
  );

  useEffect(() => {
    const handleAnchorClick = (event) => {
      const trigger = event.target.closest('a[href^="#"]');
      if (!trigger) return;

      const href = trigger.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const lenis = lenisRef.current;
      const offset = window.innerWidth >= 1024 ? -96 : -84;

      if (lenis) {
        lenis.scrollTo(target, {
          offset,
          duration: 1.35,
          easing: lenisEasing,
        });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return undefined;

    const target = document.querySelector(hash);
    if (!target) return undefined;

    const timeoutId = window.setTimeout(() => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          offset: window.innerWidth >= 1024 ? -96 : -84,
          immediate: true,
        });
      } else {
        target.scrollIntoView({ block: "start" });
      }
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const value = useMemo(
    () => ({
      contactSource: contactState.source,
      isContactModalOpen: contactState.isOpen,
      openContactModal,
      closeContactModal,
    }),
    [contactState.isOpen, contactState.source, openContactModal, closeContactModal]
  );

  return <SiteShellContext.Provider value={value}>{children}</SiteShellContext.Provider>;
}

export function useSiteShell() {
  const context = useContext(SiteShellContext);

  if (!context) {
    throw new Error("useSiteShell must be used within SiteShellProvider.");
  }

  return context;
}
