
(function () {
  const driverData = [
    ["access", "🚶", "15-min accessibility", 8],
    ["demo", "👥", "Socio-demographics", 4],
    ["form", "🏙️", "Urban environment", 2],
    ["governance", "🏛️", "Governance", 1],
    ["climate", "🌡️", "Climatic heat regime", 1]
  ];

  function makeSection() {
    const max = 8;
    const rows = driverData.map(([key, icon, name, count]) => `
      <div class="driver-bar-row" data-key="${key}">
        <div class="driver-label">
          <div class="driver-icon">${icon}</div>
          <div>
            <div class="driver-name">${name}</div>
            <div class="driver-desc">${count} top-ranked mechanisms</div>
          </div>
        </div>
        <div class="driver-bar-track">
          <div class="driver-bar-fill ${key}" style="--w:${Math.round(count/max*100)}%">${count}</div>
        </div>
      </div>
    `).join("");

    return `
      <section id="scene-driver-ranking" class="driver-ranking-section">
        <div class="driver-ranking-shell">
          <div class="driver-ranking-kicker">Driver ranking</div>
          <h2 class="driver-ranking-title">Which city drivers matter most?</h2>
          <p class="driver-ranking-subtitle">The strongest signal is not temperature itself.</p>

          <div class="driver-ranking-main-card">
            <div class="driver-ranking-card-head">
              <div>
                <h3>Top driver families</h3>
                <p>Number of mechanisms where each driver family ranks first.</p>
              </div>
              <div class="driver-ranking-unit">mechanism count</div>
            </div>
            <div class="driver-bar-list">${rows}</div>
          </div>

          <div class="driver-headline-box">
            <div class="driver-headline-icon">💡</div>
            <p><strong>Key message:</strong> access to relief and social exposure explain heat perception better than city-level heat alone.</p>
          </div>
        </div>
      </section>
    `;
  }

  function findAnchor() {
    return document.getElementById("scene-driver-title") ||
           document.getElementById("scene-switch-mechanisms") ||
           document.body.lastElementChild;
  }

  function ensure() {
    document.getElementById("scene-driver-ranking")?.remove();
    const wrapper = document.createElement("div");
    wrapper.id = "scene5-driver-ranking-wrapper";
    wrapper.innerHTML = makeSection();

    const anchor = findAnchor();
    if (anchor && anchor !== document.body.lastElementChild) anchor.insertAdjacentElement("afterend", wrapper);
    else document.body.appendChild(wrapper);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ensure);
  else ensure();
})();
