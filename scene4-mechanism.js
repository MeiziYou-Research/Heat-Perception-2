
(function () {
  const backboneData = [
    { code: "E23", route: "Mobility burden → Sadness", score: "48/50", value: 96,
      why: "Heat makes movement costly. Across cities, commuting, waiting, and walking are repeatedly read as fatigue and sadness." },
    { code: "E33", route: "Consumptive cooling → Joy", score: "48/50", value: 96,
      why: "Cold drinks, shaded cafés, and small cooling rituals consistently turn heat into relief." },
    { code: "H41", route: "Health warnings → Fear", score: "48/50", value: 96,
      why: "When heat is framed as health risk, fear becomes the stable emotional response." },
    { code: "S41", route: "Climate attribution → Neutral", score: "49/50", value: 98,
      why: "Climate attribution usually works as explanation rather than immediate emotion." },
    { code: "E24", route: "Cooling relief → Joy", score: "44/50", value: 88,
      why: "Shade, breeze, and resting places repeatedly shift heat from stress to comfort." }
  ];

  function overviewHTML() {
    return `
      <section id="scene-mechanism-overview" class="scene4-section">
        <div class="scene4-shell">
          <div class="mechanism-overview-header">
            <div class="scene4-kicker">Mechanism logic</div>
            <h2 class="scene4-title">What stays vs what shifts — and why it matters</h2>
            <p class="scene4-subtitle">
              Heat perception has two layers: universal emotional pathways and locally rewired pathways.
            </p>
          </div>

          <div class="mechanism-overview-grid">
            <article class="mechanism-overview-card mechanism-stays-card">
              <div class="mechanism-overview-badge">🔒 What stays</div>
              <h3>Backbone mechanisms</h3>
              <p>These couplings recur across cities. They are stable enough to support broad policy design.</p>
              <div class="mechanism-overview-policy">
                <strong>Design logic:</strong> universal interventions — warnings, commute relief, cooling amenities.
              </div>
            </article>

            <article class="mechanism-overview-card mechanism-shifts-card">
              <div class="mechanism-overview-badge">🔀 What shifts</div>
              <h3>Switch mechanisms</h3>
              <p>These couplings flip by city. They reveal where local context changes emotional meaning.</p>
              <div class="mechanism-overview-policy">
                <strong>Design logic:</strong> local framing — communication, justice narratives, targeted adaptation.
              </div>
            </article>
          </div>

          <div class="mechanism-overview-question">
            <h3>If mechanisms shift, <span>what rewires them?</span></h3>
            <p>Five driver families explain where a city lands: access, people, form, governance, and climate.</p>
            <div class="mechanism-driver-chips">
              <button class="mechanism-driver-chip">🚶 Access</button>
              <button class="mechanism-driver-chip">👥 People</button>
              <button class="mechanism-driver-chip">🏙️ Urban form</button>
              <button class="mechanism-driver-chip">🏛️ Governance</button>
              <button class="mechanism-driver-chip">🌡️ Climate</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function backboneHTML() {
    const rows = backboneData.map((d, i) => `
      <div class="backbone-row ${i === 0 ? "active" : ""}" data-index="${i}">
        <div class="backbone-name"><span>${d.code}</span>${d.route}</div>
        <div class="backbone-progress">
          <div class="backbone-progress-fill" style="width:${d.value}%"></div>
        </div>
        <div class="backbone-score">${d.score}</div>
      </div>
    `).join("");

    return `
      <section id="scene-backbone-mechanisms" class="scene4-section">
        <div class="scene4-shell">
          <div class="scene4-kicker">Backbone mechanisms</div>
          <h2 class="scene4-title">The couplings that hold everywhere</h2>
          <p class="scene4-subtitle">A small set of attention–emotion routes forms the shared grammar of urban heat perception.</p>

          <div class="backbone-layout">
            <div class="backbone-list-card">
              <h3 class="backbone-list-title">Universal couplings</h3>
              ${rows}
            </div>

            <aside class="backbone-side">
              <div class="backbone-detail-card">
                <div class="backbone-selected-label">Selected backbone</div>
                <h3 class="backbone-selected-title" id="backboneSelectedTitle"></h3>
                <p class="backbone-selected-text" id="backboneSelectedText"></p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    `;
  }

  function findAnchor() {
    return (
      document.getElementById("scene-mechanism-title") ||
      document.getElementById("scene-attention-story") ||
      document.getElementById("scene3-attention-routing") ||
      document.body.lastElementChild
    );
  }

  function ensureScene4() {
    document.getElementById("scene-mechanism-overview")?.remove();
    document.getElementById("scene-backbone-mechanisms")?.remove();

    const wrapper = document.createElement("div");
    wrapper.id = "scene4-mechanism-wrapper";
    wrapper.innerHTML = overviewHTML() + backboneHTML();

    const anchor = findAnchor();
    if (anchor && anchor !== document.body.lastElementChild) {
      anchor.insertAdjacentElement("afterend", wrapper);
    } else {
      document.body.appendChild(wrapper);
    }

    initBackbone();
  }

  function initBackbone() {
    const rows = document.querySelectorAll("#scene-backbone-mechanisms .backbone-row");
    const title = document.getElementById("backboneSelectedTitle");
    const text = document.getElementById("backboneSelectedText");

    function render(i) {
      const d = backboneData[i] || backboneData[0];
      rows.forEach(r => r.classList.remove("active"));
      rows[i]?.classList.add("active");
      title.textContent = d.code + " × " + d.route.split("→")[1].trim();
      text.textContent = d.why;
    }

    rows.forEach(row => {
      row.addEventListener("click", () => render(Number(row.dataset.index || 0)));
    });

    render(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureScene4);
  } else {
    ensureScene4();
  }
})();
