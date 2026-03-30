import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches && !isMobileDevice;
    if (!hasFinePointer || !dotRef.current || !ringRef.current) return undefined;

    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    root.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let visible = false;
    let hoveringInteractive = false;
    let clicked = false;
    let frame = 0;

    const applyCursorState = () => {
      dot.classList.toggle("is-visible", visible);
      ring.classList.toggle("is-visible", visible);
      ring.classList.toggle("is-hovered", hoveringInteractive);
      ring.classList.toggle("is-clicked", clicked);
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const handleMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      visible = true;
      applyCursorState();
    };
    const handleEnter = () => {
      visible = true;
      applyCursorState();
    };
    const handleLeave = () => {
      visible = false;
      applyCursorState();
    };
    const handleDown = () => {
      clicked = true;
      applyCursorState();
    };
    const handleUp = () => {
      clicked = false;
      applyCursorState();
    };
    const handleOver = (event) => {
      hoveringInteractive = !!event.target.closest("a, button, [role='button']");
      applyCursorState();
    };
    const handleOut = (event) => {
      if (event.relatedTarget && event.relatedTarget.closest("a, button, [role='button']")) return;
      hoveringInteractive = false;
      applyCursorState();
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    applyCursorState();
    tick();

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="circle-cursor-dot" />
      <div ref={ringRef} className="circle-cursor-ring" />
    </>
  );
}

