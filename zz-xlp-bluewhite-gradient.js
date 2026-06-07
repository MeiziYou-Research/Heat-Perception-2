
(function () {
  const GRADIENT = "linear-gradient(180deg, #5f85a6 0%, #89aecd 34%, #bfd6e7 70%, #ffffff 100%)";

  function setImportant(el, prop, value) {
    if (el && el.style) {
      el.style.setProperty(prop, value, "important");
    }
  }

  function isHero(el) {
    if (!el || !el.matches) return false;
    const id = (el.id || "").toLowerCase();
    const cls = String(el.className || "").toLowerCase();

    return (
      id === "opening-hero" ||
      id === "scene-hero" ||
      id === "scene-earth" ||
      cls.includes("hero") ||
      cls.includes("earth")
    );
  }

  function isBackgroundLayer(el) {
    if (!el || !el.matches) return false;
    const id = (el.id || "").toLowerCase();
    const cls = String(el.className || "").toLowerCase();

    return (
      cls.includes("bg") ||
      cls.includes("background") ||
      cls.includes("overlay") ||
      cls.includes("gradient") ||
      cls.includes("interlude-bg") ||
      cls.includes("title-bg") ||
      id.includes("bg") ||
      id.includes("background")
    );
  }

  function applyGradient() {
    setImportant(document.documentElement, "background", GRADIENT);
    setImportant(document.documentElement, "background-image", GRADIENT);
    setImportant(document.documentElement, "background-attachment", "fixed");
    setImportant(document.documentElement, "background-size", "100% 100%");

    setImportant(document.body, "background", GRADIENT);
    setImportant(document.body, "background-image", GRADIENT);
    setImportant(document.body, "background-attachment", "fixed");
    setImportant(document.body, "background-size", "100% 100%");

    document.querySelectorAll(".final-blue-scene2, .final-blue-scene3, .final-blue-scene4").forEach(el => {
      el.classList.remove("final-blue-scene2", "final-blue-scene3", "final-blue-scene4");
    });

    document.querySelectorAll("body > section, section, main, div[id^='scene'], .scene, .story-section, .interlude-section, .page-shell, .story-shell, .section-shell, .scene-shell").forEach(el => {
      if (isHero(el)) return;

      setImportant(el, "background", "transparent");
      setImportant(el, "background-color", "transparent");
      setImportant(el, "background-image", "none");
    });

    document.querySelectorAll("div, section").forEach(el => {
      if (isHero(el)) return;
      if (!isBackgroundLayer(el)) return;

      setImportant(el, "background", "transparent");
      setImportant(el, "background-color", "transparent");
      setImportant(el, "background-image", "none");
      setImportant(el, "opacity", "0");
      setImportant(el, "display", "none");
    });

    console.log("[xlp-bluewhite-gradient] applied");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyGradient);
  } else {
    applyGradient();
  }

  window.addEventListener("load", applyGradient);
  [200, 600, 1200, 2200, 3500].forEach(t => {
    setTimeout(applyGradient, t);
  });
})();
