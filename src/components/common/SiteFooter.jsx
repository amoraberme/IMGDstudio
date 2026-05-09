import { discussionLinks, handleDiscussionLinkClick, socialLinks } from "../../data/contact";
import StaggeredSwapText from "./StaggeredSwapText";

function XIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscussIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M26.02 3.1c1.76-.503 3.393 1.13 2.89 2.89l-6.1 21.32c-.546 1.912-3.077 2.306-4.18.65l-5.8-8.69a.75.75 0 0 0-.09-.1l-8.69-5.79c-1.655-1.103-1.262-3.644.65-4.19L26.02 3.1Zm-9.45 21.62a.278.278 0 0 0 .269-.203l5.69-19.92-11.03 11.03 5.07 7.61Zm-11.28-14.5 7.61 5.07 11.03-11.03-19.92 5.69a.278.278 0 0 0-.079.27.278.278 0 0 0 .123.17Z" />
    </svg>
  );
}

export default function SiteFooter() {
  const renderLink = (link) =>
    link.isDisabled ? (
      <span key={link.label} className="footer-link-disabled" aria-disabled="true">
        {link.label}
      </span>
    ) : (
      <a
        key={link.label}
        href={link.href}
        className="stagger-hover-target"
        onClick={(event) => handleDiscussionLinkClick(event, link)}
        target={link.isExternal ? "_blank" : undefined}
        rel={link.isExternal ? "noreferrer" : undefined}
      >
        <StaggeredSwapText label={link.label} />
      </a>
    );

  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="footer-column">
          
          <div className="footer-title">Social Media</div>
          <div className="footer-links">{socialLinks.map(renderLink)}</div>
        </div>

        <div className="footer-column">
          
          <div className="footer-title">For discuss</div>
          <div className="footer-links">{discussionLinks.map(renderLink)}</div>
        </div>

        <div className="footer-column">
          <div className="footer-meta-mark">
            <span className="footer-title">IMGD</span>
          </div>
          <div className="footer-meta">&copy; 2026 IMGD</div>
        </div>
      </div>
    </footer>
  );
}
