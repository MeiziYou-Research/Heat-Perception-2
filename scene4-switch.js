
(function () {
  const switchData = [
    { code: "E11", name: "Everyday monitoring", a: "Surprise", b: "Neutral", av: 26, bv: 24,
      text: "Daily heat checking becomes abnormality in some cities, routine background in others." },
    { code: "E31", name: "Affective coping", a: "Joy", b: "Negative", av: 14, bv: 36,
      text: "Coping can feel like relief when resources are accessible, or frustration when they are not." },
    { code: "S42", name: "Environmental justice", a: "Anger", b: "Other", av: 27, bv: 23,
      text: "Heat injustice turns into anger when unequal exposure is linked to neglect or responsibility." },
    { code: "S21", name: "Energy / planning", a: "Fear", b: "Descriptive", av: 21, bv: 29,
      text: "Energy discourse becomes fear when infrastructure feels fragile; otherwise it stays technical." }
  ];

  function makeSection() {
    const rows = switchData.map((d, i) => {
      const total = d.av + d.bv;
      const ap = Math.round(d.av / total * 100);
      const bp = 100 - ap;

      return `
        <div class="switch-row ${i === 0 ? "active" : ""}" data-index="${i}">
          <div class="switch-row-head">
            <div class="switch-name"><span>${d.code}</span>${d.name}</div>
            <div class="switch-split-text">${d.av} / ${d.bv} cities</div>
          </div>
          <div class="switch-bar">
            <div class="switch-bar-a" style="width:${ap}%">${d.a}</div>
            <div class="switch-bar-b" style="width:${bp}%">${d.b}</div>
          </div>
        </div>
      `;
    }).join("");

    return `
      <section id="scene-switch-mechanisms" class="scene4-section">
        <div class="scene4-shell">
          <div class="scene4-kicker">Switch mechanisms</div>
          <h2 class="scene4-title">When the same heat flips meaning</h2>
          <p class="scene4-subtitle">Some mechanisms are not fixed. The same attention channel can land in different emotions across cities.</p>

          <div class="switch-layout">
            <div class="switch-main-card">
              <div class="switch-section-label">🔀 City splits</div>
              ${rows}
            </div>

            <aside class="switch-detail-card">
              <div class="switch-selected-label">Selected switch</div>
              <h3 class="switch-selected-title" id="switchSelectedTitle"></h3>
              <p class="switch-selected-desc" id="switchSelectedDesc"></p>

              <div class="switch-regime-grid">
                <div class="switch-regime-card">
                  <div class="label">Regime A</div>
                  <strong id="switchRegimeA"></strong>
                  <small id="switchRegimeACount"></small>
                </div>
                <div class="switch-regime-card">
                  <div class="label">Regime B</div>
                  <strong id="switchRegimeB"></strong>
                  <small id="switchRegimeBCount"></small>
                </div>
              </div>

              <div class="switch-explain-box" id="switchExplainBox"></div>
            </aside>
          </div>
        </div>
      </section>
    `;
  }

  function findAnchor() {
    return document.getElementById("scene-backbone-mechanisms") ||
           document.getElementById("scene-mechanism-overview") ||
           document.body.lastElementChild;
  }

  function ensureSwitch() {
    document.getElementById("scene-switch-mechanisms")?.remove();

    const wrapper = document.createElement("div");
    wrapper.id = "scene4-switch-wrapper";
    wrapper.innerHTML = makeSection();

    const anchor = findAnchor();
    if (anchor && anchor !== document.body.lastElementChild) {
      anchor.insertAdjacentElement("afterend", wrapper);
    } else {
      document.body.appendChild(wrapper);
    }

    initSwitch();
  }

  function initSwitch() {
    const rows = document.querySelectorAll("#scene-switch-mechanisms .switch-row");

    function render(i) {
      const d = switchData[i] || switchData[0];
      rows.forEach(r => r.classList.remove("active"));
      rows[i]?.classList.add("active");

      document.getElementById("switchSelectedTitle").textContent = d.code + " · " + d.name;
      document.getElementById("switchSelectedDesc").textContent = d.text;
      document.getElementById("switchRegimeA").textContent = d.a;
      document.getElementById("switchRegimeB").textContent = d.b;
      document.getElementById("switchRegimeACount").textContent = d.av + " cities";
      document.getElementById("switchRegimeBCount").textContent = d.bv + " cities";
      document.getElementById("switchExplainBox").textContent =
        "Switch mechanisms are where policy framing must become local.";
    }

    rows.forEach(row => row.addEventListener("click", () => render(Number(row.dataset.index || 0))));
    render(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureSwitch);
  } else {
    ensureSwitch();
  }
})();
