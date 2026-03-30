const TELEGRAM_URL = "https://t.me/amoraberme";
const WHATSAPP_URL = "https://wa.me/639982460386";
const VIBER_URL = "viber://chat?number=%2B639982460386";
const WHATSAPP_PHONE = "639982460386";
const VIBER_PHONE = "+639982460386";

const buildLink = (label, href) => ({
  label,
  href,
  isExternal: /^https?:\/\//.test(href),
  isDisabled: !href,
});

const buildDiscussionLink = (label, href, appHref = "", fallbackHref = "") => ({
  label,
  href,
  appHref,
  fallbackHref,
  isExternal: /^https?:\/\//.test(href),
  isDisabled: !href && !appHref,
});

export const socialLinks = [
  buildLink("Threads", "https://www.threads.com/@amoraberme"),
  buildLink("Instagram", "https://www.instagram.com/amoraberme"),
  buildLink("LinkedIn", "https://www.linkedin.com/in/jab029"),
];

export const discussionLinks = [
  buildDiscussionLink(
    "Telegram",
    TELEGRAM_URL,
    "tg://resolve?domain=amoraberme",
    TELEGRAM_URL
  ),
  buildDiscussionLink(
    "Viber",
    VIBER_URL,
    VIBER_URL,
    `tel:${VIBER_PHONE}`
  ),
  buildDiscussionLink(
    "WhatsApp",
    WHATSAPP_URL,
    `whatsapp://send?phone=${WHATSAPP_PHONE}`,
    WHATSAPP_URL
  ),
  buildLink("Discord", "https://discord.gg/EmSCRetc"),
];

export const handleDiscussionLinkClick = (event, link) => {
  if (!link?.appHref) return;

  event.preventDefault();

  let fallbackTimer = 0;

  const cleanup = () => {
    window.clearTimeout(fallbackTimer);
    window.removeEventListener("blur", cleanup);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      cleanup();
    }
  };

  fallbackTimer = window.setTimeout(() => {
    cleanup();
    if (link.fallbackHref) {
      window.location.assign(link.fallbackHref);
    }
  }, 900);

  window.addEventListener("blur", cleanup, { once: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.location.assign(link.appHref);
};
