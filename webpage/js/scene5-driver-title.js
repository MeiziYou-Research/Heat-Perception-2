
(function () {
  if (window.__XLP_SCENE5_DRIVER_TITLE_SAFE__) return;
  window.__XLP_SCENE5_DRIVER_TITLE_SAFE__ = true;

  function makeDriverTitle() {
    return `
      <section id="scene-driver-title" class="driver-title-section">
        <div class="driver-title-inner">
          <div class="driver-title-kicker">Associated factors</div>
          <h2 class="driver-title-main">Why does it stay or shift?</h2>
          <p class="driver-title-sub"><strong>Access and people, not climate,</strong> explain local rewiring.</p>
        </div>
        <div class="driver-title-hint">CLICK TO CONTINUE</div>
      </section>
    `;
  }

  function rootOf(el) {
    if (!el) return null;

    if (
      el.id === "scene4-title-page" ||
      el.id === "scene4-mechanism-wrapper" ||
      el.id === "scene4-switch-wrapper"
    ) {
      return el;
    }

    var p = el.parentElement;
    if (p && (
      p.id === "scene4-mechanism-wrapper" ||
      p.id === "scene4-switch-wrapper"
    )) {
      return p;
    }

    return el;
  }

  function findScene4EndAnchor() {
    const candidates = [
      rootOf(document.getElementById("scene4-switch-wrapper")),
      rootOf(document.getElementById("scene-switch-mechanisms")),
      rootOf(document.getElementById("scene4-mechanism-wrapper")),
      rootOf(document.getElementById("scene-backbone-mechanisms")),
      rootOf(document.getElementById("scene4-title-page"))
    ].filter(Boolean);

    if (!candidates.length) return null;

    candidates.sort(function (a, b) {
      if (a === b) return 0;
      return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });

    return candidates[candidates.length - 1];
  }

  function ensure() {
    const anchor = findScene4EndAnchor();

    // 第四幕没生成完成前，不插入
    if (!anchor) return false;

    document.getElementById("scene-driver-title")?.remove();
    document.getElementById("scene5-driver-title-wrapper")?.remove();

    const wrapper = document.createElement("div");
    wrapper.id = "scene5-driver-title-wrapper";
    wrapper.innerHTML = makeDriverTitle();

    anchor.insertAdjacentElement("afterend", wrapper);

    const section = document.getElementById("scene-driver-title");
    if (section && section.dataset.bound !== "1") {
      section.dataset.bound = "1";
      section.addEventListener("click", function () {
        const ranking = document.getElementById("scene-driver-ranking");
        if (ranking) {
          ranking.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    return true;
  }

  function boot() {
    let tries = 0;

    const timer = setInterval(function () {
      tries += 1;
      const ok = ensure();

      if (ok || tries > 100) {
        clearInterval(timer);
      }
    }, 120);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("load", boot);
})();
