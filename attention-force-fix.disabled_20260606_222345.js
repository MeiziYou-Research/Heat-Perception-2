
(function () {
  const DEEP = "#1f4a78";
  const MID = "#4f7396";
  const SOFT_BG = "#dce9f1";

  function text(el) {
    return (el && el.textContent ? el.textContent : "").replace(/\s+/g, " ").trim();
  }

  function findTextElement(target) {
    const candidates = Array.from(document.querySelectorAll(
      "h1,h2,h3,p,div,span,section"
    ));

    return candidates.find(el => text(el).includes(target));
  }

  function findBestRoot(el) {
    if (!el) return null;

    let cur = el;
    let best = null;

    while (cur && cur !== document.body && cur !== document.documentElement) {
      const r = cur.getBoundingClientRect();
      const style = window.getComputedStyle(cur);

      const isLarge =
        r.width >= window.innerWidth * 0.75 &&
        r.height >= window.innerHeight * 0.45;

      const hasSceneName =
        (cur.id && /scene|section|attention|atlas|story|heat/i.test(cur.id)) ||
        (cur.className && /scene|section|attention|atlas|story|heat/i.test(String(cur.className)));

      if (isLarge || hasSceneName) {
        best = cur;
      }

      cur = cur.parentElement;
    }

    return best || el.closest("section, main, div") || el.parentElement;
  }

  function setImportant(el, prop, value) {
    if (!el || !el.style) return;
    el.style.setProperty(prop, value, "important");
  }

  function removeBadBackground(root) {
    if (!root) return;

    setImportant(root, "background", "transparent");
    setImportant(root, "background-color", "transparent");
    setImportant(root, "background-image", "none");
    setImportant(root, "box-shadow", "none");
    setImportant(root, "border-top", "none");
    setImportant(root, "border-bottom", "none");
  }

  function forceAttentionTitle() {
    const heading = findTextElement("Same Emotion, Different Attention");
    if (!heading) return false;

    const root = findBestRoot(heading);
    if (!root) return false;

    root.classList.add("tv-force-attention-title");

    setImportant(root, "background", "linear-gradient(180deg, #dce9f1 0%, #dce9f1 50%, #e2edf4 100%)");
    setImportant(root, "background-color", SOFT_BG);
    setImportant(root, "background-image", "linear-gradient(180deg, #dce9f1 0%, #dce9f1 50%, #e2edf4 100%)");
    setImportant(root, "box-shadow", "none");
    setImportant(root, "border", "none");

    setImportant(heading, "color", DEEP);
    setImportant(heading, "text-shadow", "none");
    setImportant(heading, "opacity", "1");

    const all = Array.from(root.querySelectorAll("h1,h2,h3,p,span,div"));
    all.forEach(el => {
      const t = text(el);

      if (t.includes("Same Emotion, Different Attention")) {
        setImportant(el, "color", DEEP);
        setImportant(el, "text-shadow", "none");
        setImportant(el, "opacity", "1");
      }

      if (t.includes("How 24 attention subcategories")) {
        setImportant(el, "color", MID);
        setImportant(el, "text-shadow", "none");
        setImportant(el, "opacity", "1");
      }

      if (t.includes("CLICK TO CONTINUE")) {
        setImportant(el, "color", "rgba(79,115,150,0.65)");
        setImportant(el, "text-shadow", "none");
        setImportant(el, "opacity", "1");
      }
    });

    console.log("[attention-force-fix] fixed title page:", root);
    return true;
  }

  function forceDayInHeat() {
    const heading = findTextElement("A day in the heat");
    if (!heading) return false;

    const root = findBestRoot(heading);
    if (!root) return false;

    root.classList.add("tv-force-attention-atlas");

    removeBadBackground(root);

    setImportant(heading, "color", DEEP);
    setImportant(heading, "text-shadow", "none");
    setImportant(heading, "opacity", "1");

    const all = Array.from(root.querySelectorAll("h1,h2,h3,p,span,div,button"));
    all.forEach(el => {
      const t = text(el);

      if (t.includes("A day in the heat")) {
        setImportant(el, "color", DEEP);
        setImportant(el, "text-shadow", "none");
        setImportant(el, "opacity", "1");
      }

      if (
        t.includes("A continuous urban scene") ||
        t.includes("Circular vignettes") ||
        t.includes("hover to preview") ||
        t.includes("click to inspect")
      ) {
        setImportant(el, "color", MID);
        setImportant(el, "text-shadow", "none");
        setImportant(el, "opacity", "1");
      }

      if (
        t.includes("ATTENTION SCENE ATLAS") ||
        t.includes("Appraisal") ||
        t.includes("Disruption") ||
        t.includes("Coping") ||
        t === "All"
      ) {
        setImportant(el, "color", DEEP);
        setImportant(el, "text-shadow", "none");
        setImportant(el, "opacity", "1");
      }

      // 如果文字被设成白色，也强制转深色
      const cs = window.getComputedStyle(el);
      const c = cs.color || "";
      const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (m) {
        const r = Number(m[1]), g = Number(m[2]), b = Number(m[3]);
        if (r > 220 && g > 220 && b > 220) {
          if (/h1|h2|h3/i.test(el.tagName)) {
            setImportant(el, "color", DEEP);
          } else {
            setImportant(el, "color", MID);
          }
          setImportant(el, "text-shadow", "none");
          setImportant(el, "opacity", "1");
        }
      }
    });

    console.log("[attention-force-fix] fixed day-in-heat page:", root);
    return true;
  }

  function fixAll() {
    forceAttentionTitle();
    forceDayInHeat();
  }

  function boot() {
    fixAll();

    // 防止其他 scene JS 后加载覆盖
    let count = 0;
    const timer = setInterval(() => {
      fixAll();
      count += 1;
      if (count > 40) clearInterval(timer);
    }, 250);

    const observer = new MutationObserver(() => {
      fixAll();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"]
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("load", fixAll);
  window.addEventListener("resize", fixAll);
})();
