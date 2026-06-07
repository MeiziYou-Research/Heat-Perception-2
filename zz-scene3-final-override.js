
(function () {
  "use strict";

  const positions = {
    E: { x: 33, y: 56, size: 290, count: 30, rx: 160, ry: 160 },
    H: { x: 57, y: 64, size: 170, count: 16, rx: 110, ry: 120 },
    S: { x: 72, y: 43, size: 215, count: 22, rx: 135, ry: 140 }
  };

  function setImp(el, prop, value) {
    if (el && el.style) el.style.setProperty(prop, value, "important");
  }

  function rand(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function forceHint() {
    const hint = document.querySelector("#scene3-attention-routing .attention-stage-hint, #attentionBubbleStage .attention-stage-hint, .attention-stage-hint");
    if (!hint) return false;

    setImp(hint, "opacity", "1");
    setImp(hint, "visibility", "visible");
    setImp(hint, "background", "linear-gradient(90deg, #a9cceb 0%, #d9c4ed 100%)");
    setImp(hint, "background-color", "#a9cceb");
    setImp(hint, "color", "#214d79");
    setImp(hint, "border", "1px solid rgba(255,255,255,0.88)");
    setImp(hint, "box-shadow", "0 10px 24px rgba(83,124,160,0.18)");
    setImp(hint, "backdrop-filter", "none");
    setImp(hint, "-webkit-backdrop-filter", "none");

    hint.querySelectorAll("*").forEach(child => {
      setImp(child, "opacity", "1");
      setImp(child, "visibility", "visible");
      setImp(child, "color", child.textContent.trim() === "01" ? "#ef5aa4" : "#214d79");
    });

    return true;
  }

  function forceMainBubbles() {
    const stage = document.getElementById("attentionBubbleStage");
    const mainLayer = document.getElementById("mainBubbleLayer");
    if (!stage || !mainLayer) return false;

    setImp(stage, "opacity", "1");
    setImp(stage, "filter", "none");
    setImp(stage, "mix-blend-mode", "normal");

    setImp(mainLayer, "opacity", "1");
    setImp(mainLayer, "filter", "none");
    setImp(mainLayer, "z-index", "5");

    const bubbles = mainLayer.querySelectorAll(".attention-main-bubble");
    if (!bubbles.length) return false;

    bubbles.forEach(el => {
      const id = el.dataset.familyId;
      const p = positions[id];
      if (p) {
        setImp(el, "left", p.x + "%");
        setImp(el, "top", p.y + "%");
        setImp(el, "width", p.size + "px");
        setImp(el, "height", p.size + "px");
      }

      setImp(el, "opacity", el.classList.contains("is-muted") ? "0.90" : "1");
      setImp(el, "visibility", "visible");
      setImp(el, "background", "radial-gradient(circle at 32% 24%, rgba(235,249,255,0.68), rgba(235,249,255,0.08) 38%, transparent 58%), linear-gradient(145deg, rgba(92,174,222,0.98), rgba(72,151,205,0.98))");
      setImp(el, "border", "1px solid rgba(255,255,255,0.80)");
      setImp(el, "box-shadow", "0 20px 52px rgba(69,119,160,0.24), 0 0 38px rgba(139,210,245,0.24), inset 0 1px 0 rgba(255,255,255,0.38)");
      setImp(el, "color", "#ffffff");
      setImp(el, "filter", el.classList.contains("is-muted") ? "saturate(0.92) brightness(1.02)" : "none");

      el.querySelectorAll(".bubble-title, .bubble-share, .bubble-text, span, div").forEach(child => {
        setImp(child, "color", "#ffffff");
        setImp(child, "opacity", "1");
        setImp(child, "text-shadow", "none");
      });
    });

    return true;
  }

  function forceSubBubbles() {
    const subLayer = document.getElementById("subBubbleLayer");
    if (!subLayer) return false;

    setImp(subLayer, "opacity", "1");
    setImp(subLayer, "filter", "none");
    setImp(subLayer, "z-index", "7");

    const subs = subLayer.querySelectorAll(".attention-sub-bubble");
    subs.forEach(el => {
      setImp(el, "opacity", "1");
      setImp(el, "visibility", "visible");
      setImp(el, "background", "rgba(255,255,255,0.94)");
      setImp(el, "border", "1px solid rgba(255,255,255,0.88)");
      setImp(el, "box-shadow", "0 14px 32px rgba(70,105,140,0.16), inset 0 1px 0 rgba(255,255,255,0.82)");
      setImp(el, "color", "#123f68");
      setImp(el, "filter", "none");
      setImp(el, "backdrop-filter", "none");
      setImp(el, "-webkit-backdrop-filter", "none");

      el.querySelectorAll(".subbubble-code").forEach(c => {
        setImp(c, "color", "#ef5aa4");
        setImp(c, "opacity", "1");
      });
      el.querySelectorAll(".subbubble-label").forEach(c => {
        setImp(c, "color", "#123f68");
        setImp(c, "opacity", "1");
      });
    });

    return true;
  }

  function rebuildAmbient() {
    const stage = document.getElementById("attentionBubbleStage");
    const mainLayer = document.getElementById("mainBubbleLayer");
    if (!stage || !mainLayer) return false;

    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;

    stage.querySelectorAll("#ambientBubbleLayer, .ambient-bubble-layer, #scene3ForcedAmbientLayer").forEach(el => el.remove());

    const layer = document.createElement("div");
    layer.id = "scene3ForcedAmbientLayer";
    stage.insertBefore(layer, mainLayer);

    Object.entries(positions).forEach(([id, p], idx) => {
      const cx = rect.width * p.x / 100;
      const cy = rect.height * p.y / 100;
      const radius = p.size / 2;

      for (let i = 0; i < p.count; i++) {
        const seed = (idx + 1) * 1000 + i * 17;
        const angle = Math.PI * 2 * i / p.count + (rand(seed) - 0.5) * 0.7;
        const ring = radius + 28 + rand(seed + 1) * 135;

        const size = 8 + rand(seed + 2) * 24;
        let x = cx + Math.cos(angle) * ring;
        let y = cy + Math.sin(angle) * ring;

        x = clamp(x, size + 12, rect.width - size - 12);
        y = clamp(y, size + 12, rect.height - size - 12);

        const b = document.createElement("span");
        b.className = "scene3-forced-ambient-bubble family-" + id.toLowerCase();
        b.style.left = x + "px";
        b.style.top = y + "px";
        b.style.setProperty("--s", size.toFixed(1) + "px");
        b.style.setProperty("--o", (0.34 + rand(seed + 3) * 0.34).toFixed(2));
        b.style.setProperty("--d", (9 + rand(seed + 4) * 6).toFixed(2) + "s");
        b.style.setProperty("--delay", (-rand(seed + 5) * 8).toFixed(2) + "s");
        b.style.setProperty("--x1", ((rand(seed + 6) - 0.5) * 20).toFixed(1) + "px");
        b.style.setProperty("--y1", ((rand(seed + 7) - 0.5) * 20).toFixed(1) + "px");
        b.style.setProperty("--x2", ((rand(seed + 8) - 0.5) * 20).toFixed(1) + "px");
        b.style.setProperty("--y2", ((rand(seed + 9) - 0.5) * 20).toFixed(1) + "px");

        layer.appendChild(b);
      }
    });

    return true;
  }

  function patchClickHandlers() {
    const mainLayer = document.getElementById("mainBubbleLayer");
    if (!mainLayer) return;

    mainLayer.querySelectorAll(".attention-main-bubble").forEach(el => {
      if (el.__zzScene3Patched) return;
      el.__zzScene3Patched = true;
      el.addEventListener("click", () => {
        setTimeout(() => {
          forceHint();
          forceMainBubbles();
          forceSubBubbles();
          rebuildAmbient();
        }, 60);
      });
    });
  }

  function apply() {
    const ok1 = forceHint();
    const ok2 = forceMainBubbles();
    forceSubBubbles();
    rebuildAmbient();
    patchClickHandlers();

    if (ok1 || ok2) {
      console.log("[zz-scene3-final-override] applied");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }

  window.addEventListener("load", apply);
  window.addEventListener("resize", () => setTimeout(apply, 120));

  [100, 300, 700, 1200, 2200, 3500].forEach(t => {
    setTimeout(apply, t);
  });
})();
