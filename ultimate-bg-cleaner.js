
(function () {
  const FLAT_BG = "#d9e8f1";
  const HERO_TEXTS = [
    "INTERACTIVE GLOBAL ATLAS",
    "Enter the atlas",
    "A visual atlas of how cities perceive"
  ];

  function text(el) {
    return (el && el.textContent ? el.textContent : "").replace(/\s+/g, " ").trim();
  }

  function findHeroRoot() {
    const all = Array.from(document.querySelectorAll("section, div, main"));
    const hit = all.find(el => {
      const t = text(el);
      return HERO_TEXTS.some(s => t.includes(s));
    });

    if (!hit) return null;

    let cur = hit;
    let best = hit;

    while (cur && cur !== document.body && cur !== document.documentElement) {
      const r = cur.getBoundingClientRect();
      const large = r.width > window.innerWidth * 0.75 && r.height > window.innerHeight * 0.45;
      if (large) best = cur;
      cur = cur.parentElement;
    }

    return best;
  }

  function isHeroLike(el) {
    if (!el || !el.matches) return false;

    if (el.closest(".tv-hero-preserve")) return true;

    const id = (el.id || "").toLowerCase();
    const cls = String(el.className || "").toLowerCase();

    return (
      id.includes("hero") ||
      id.includes("earth") ||
      id.includes("landing") ||
      cls.includes("hero") ||
      cls.includes("earth") ||
      cls.includes("landing")
    );
  }

  function parseRGB(color) {
    if (!color) return null;
    const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return null;
    return [Number(m[1]), Number(m[2]), Number(m[3])];
  }

  function isDarkBlue(rgb) {
    if (!rgb) return false;
    const [r, g, b] = rgb;
    return r < 95 && g < 125 && b < 165;
  }

  function isLayoutLike(el) {
    const idcls = ((el.id || "") + " " + String(el.className || "")).toLowerCase();
    return /scene|section|wrapper|shell|page|story|viewport|background|overlay|bg|container|layout/.test(idcls);
  }

  function shouldSkip(el) {
    const tag = (el.tagName || "").toLowerCase();
    if (["img", "video", "svg", "path", "circle", "line", "polyline", "polygon", "text", "canvas"].includes(tag)) {
      return true;
    }
    return false;
  }

  function restoreHero(hero) {
    if (!hero) return;
    hero.classList.add("tv-hero-preserve");
    hero.style.setProperty(
      "background",
      "radial-gradient(circle at 50% 30%, rgba(48, 85, 116, 0.48), transparent 42%), radial-gradient(circle at 50% 96%, rgba(120, 145, 160, 0.28), transparent 38%), linear-gradient(180deg, #020b14 0%, #071827 58%, #10283b 100%)",
      "important"
    );
    hero.style.setProperty("background-color", "#071827", "important");
    hero.style.setProperty("background-image", "radial-gradient(circle at 50% 30%, rgba(48, 85, 116, 0.48), transparent 42%), radial-gradient(circle at 50% 96%, rgba(120, 145, 160, 0.28), transparent 38%), linear-gradient(180deg, #020b14 0%, #071827 58%, #10283b 100%)", "important");
  }

  function cleanOthers() {
    document.documentElement.style.setProperty("background", FLAT_BG, "important");
    document.documentElement.style.setProperty("background-color", FLAT_BG, "important");
    document.documentElement.style.setProperty("background-image", "none", "important");

    document.body.style.setProperty("background", FLAT_BG, "important");
    document.body.style.setProperty("background-color", FLAT_BG, "important");
    document.body.style.setProperty("background-image", "none", "important");

    const hero = findHeroRoot();
    restoreHero(hero);

    document.querySelectorAll("*").forEach(el => {
      if (!el || shouldSkip(el) || isHeroLike(el)) return;

      const cs = window.getComputedStyle(el);
      const rgb = parseRGB(cs.backgroundColor);
      const bgImage = cs.backgroundImage || "";

      const hasGradient = /gradient/i.test(bgImage);
      const badDark = isDarkBlue(rgb);
      const layout = isLayoutLike(el);

      if (layout || hasGradient || badDark) {
        el.style.setProperty("background", "transparent", "important");
        el.style.setProperty("background-color", "transparent", "important");
        el.style.setProperty("background-image", "none", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("border-top", "none", "important");
        el.style.setProperty("border-bottom", "none", "important");
      }
    });

    console.log("[hero-dark-flat-blue] hero restored, other backgrounds cleaned");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanOthers);
  } else {
    cleanOthers();
  }

  window.addEventListener("load", cleanOthers);

  [200, 600, 1200, 2200, 3500].forEach(t => {
    setTimeout(cleanOthers, t);
  });
})();
