
(function () {
  const PRESERVE_HERO = true;

  function isHero(el) {
    if (!el || !el.matches) return false;
    if (!PRESERVE_HERO) return false;

    const id = (el.id || "").toLowerCase();
    const cls = String(el.className || "").toLowerCase();

    return (
      id === "opening-hero" ||
      id === "hero" ||
      id === "scene-hero" ||
      id === "scene-earth" ||
      cls.includes("hero") ||
      cls.includes("earth")
    );
  }

  function isSceneLike(el) {
    if (!el || !el.matches) return false;

    const tag = el.tagName ? el.tagName.toLowerCase() : "";
    const id = (el.id || "").toLowerCase();
    const cls = String(el.className || "").toLowerCase();

    return (
      tag === "section" ||
      tag === "main" ||
      id.startsWith("scene") ||
      cls.includes("scene") ||
      cls.includes("section") ||
      cls.includes("story") ||
      cls.includes("wrapper") ||
      cls.includes("shell")
    );
  }

  function setImportant(el, prop, value) {
    if (el && el.style) {
      el.style.setProperty(prop, value, "important");
    }
  }

  function applyGradient() {
    setImportant(document.documentElement, "background", "linear-gradient(180deg, #dceaf2 0%, #e7f1f6 28%, #edf5f8 58%, #fafcfd 82%, #ffffff 100%)");
    setImportant(document.documentElement, "background-attachment", "fixed");
    setImportant(document.documentElement, "background-size", "100% 100%");

    setImportant(document.body, "background", "linear-gradient(180deg, #dceaf2 0%, #e7f1f6 28%, #edf5f8 58%, #fafcfd 82%, #ffffff 100%)");
    setImportant(document.body, "background-attachment", "fixed");
    setImportant(document.body, "background-size", "100% 100%");

    document.querySelectorAll("section, main, div").forEach(el => {
      if (isHero(el)) return;
      if (!isSceneLike(el)) return;

      setImportant(el, "background", "transparent");
      setImportant(el, "background-color", "transparent");
      setImportant(el, "background-image", "none");
    });

    console.log("[final-bg-gradient] applied");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyGradient);
  } else {
    applyGradient();
  }

  window.addEventListener("load", applyGradient);
  [200, 700, 1500, 3000].forEach(t => setTimeout(applyGradient, t));
})();
