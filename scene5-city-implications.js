
(function () {
  function makeSection() {
    return `
      <section id="scene-city-implications" class="city-implications-section">
        <div class="city-implications-shell">
          <div class="city-implications-kicker">City implications</div>
          <h2 class="city-implications-title">What this means for cities</h2>
          <p class="city-implications-subtitle">If access and social structure shape heat perception, they become design levers.</p>

          <div class="implication-card-grid">
            <article class="implication-card">
              <div class="implication-icon">🚶</div>
              <h3>Make cooling reachable</h3>
              <p>Plan shade, water, cool interiors, and night mobility as a 15-minute adaptation system.</p>
            </article>

            <article class="implication-card">
              <div class="implication-icon">👥</div>
              <h3>Support exposed groups</h3>
              <p>Target older residents, outdoor workers, low-income groups, and people with limited cooling access.</p>
            </article>

            <article class="implication-card">
              <div class="implication-icon">🌳</div>
              <h3>Reduce green inequality</h3>
              <p>Cooling landscapes matter most when they are accessible, shaded, and socially distributed.</p>
            </article>

            <article class="implication-card">
              <div class="implication-icon">📣</div>
              <h3>Localize heat messaging</h3>
              <p>Switch mechanisms show that the same heat message lands differently across cities.</p>
            </article>
          </div>

          <div class="city-final-statement">
            <p>
              The same heat is felt in a thousand ways — less by the
              <strong>thermometer</strong> than by the <strong>city</strong>
              and the <strong>people who live in it</strong>.
            </p>
          </div>
        </div>
      </section>
    `;
  }

  function findAnchor() {
    return document.getElementById("scene-driver-signal") ||
           document.getElementById("scene-driver-ranking") ||
           document.body.lastElementChild;
  }

  function ensure() {
    document.getElementById("scene-city-implications")?.remove();
    const wrapper = document.createElement("div");
    wrapper.id = "scene5-city-implications-wrapper";
    wrapper.innerHTML = makeSection();

    const anchor = findAnchor();
    if (anchor && anchor !== document.body.lastElementChild) anchor.insertAdjacentElement("afterend", wrapper);
    else document.body.appendChild(wrapper);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ensure);
  else ensure();
})();
