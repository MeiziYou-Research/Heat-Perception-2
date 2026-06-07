
(function () {
  function makeDriverTitle() {
    return `
      <section id="scene-driver-title" class="driver-title-section">
        <div class="driver-title-inner">
          <div class="driver-title-kicker">Urban drivers</div>
          <h2 class="driver-title-main">Why does it stay or shift?</h2>
          <p class="driver-title-sub"><strong>Access and people, not climate,</strong> explain local rewiring.</p>
        </div>
        <div class="driver-title-hint">CLICK TO CONTINUE</div>
      </section>
    `;
  }

  function findAnchor() {
    return document.getElementById("scene-switch-mechanisms") ||
           document.getElementById("scene-backbone-mechanisms") ||
           document.body.lastElementChild;
  }

  function ensure() {
    document.getElementById("scene-driver-title")?.remove();
    const wrapper = document.createElement("div");
    wrapper.id = "scene5-driver-title-wrapper";
    wrapper.innerHTML = makeDriverTitle();

    const anchor = findAnchor();
    if (anchor && anchor !== document.body.lastElementChild) {
      anchor.insertAdjacentElement("afterend", wrapper);
    } else {
      document.body.appendChild(wrapper);
    }

    const s = document.getElementById("scene-driver-title");
    s?.addEventListener("click", () => s.nextElementSibling?.scrollIntoView({behavior:"smooth", block:"start"}));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ensure);
  else ensure();
})();
