(function () {
  if (window.__XLP_SCENE5_DRIVER_RANKING_SAFE__) return;
  window.__XLP_SCENE5_DRIVER_RANKING_SAFE__ = true;

  const BAR_COLOR = "#4A9FF5";

  const driverData = [
    ["access", "🚶", "15-min accessibility", 8],
    ["demo", "👥", "Socio-demographics", 4],
    ["form", "🏙️", "Urban environment", 2],
    ["governance", "🏛️", "Governance", 1],
    ["climate", "🌡️", "Climatic heat regime", 1]
  ];

  function injectStyle() {
    const old = document.getElementById("scene5-driver-ranking-solid-style");
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = "scene5-driver-ranking-solid-style";
    style.textContent = `
      #scene-driver-ranking .driver-ranking-shell {
        padding-top: 16px !important;
        padding-bottom: 18px !important;
      }

      #scene-driver-ranking .driver-ranking-kicker {
        margin-bottom: 10px !important;
      }

      #scene-driver-ranking .driver-ranking-title {
        margin: 0 0 22px 0 !important;
        font-size: clamp(42px, 4.6vw, 62px) !important;
        letter-spacing: -0.05em !important;
        line-height: 0.98 !important;
      }

      #scene-driver-ranking .driver-ranking-subtitle {
        display: none !important;
      }

      #scene-driver-ranking .driver-ranking-main-card {
        padding: 28px 38px 30px !important;
      }

      #scene-driver-ranking .driver-ranking-card-head {
        margin-bottom: 22px !important;
      }

      #scene-driver-ranking .driver-ranking-card-head h3 {
        margin: 0 !important;
      }

      #scene-driver-ranking .driver-ranking-card-head p {
        display: none !important;
      }

      #scene-driver-ranking .driver-bar-list {
        gap: 18px !important;
      }

      #scene-driver-ranking .driver-bar-row {
        min-height: 58px !important;
      }

      #scene-driver-ranking .driver-label {
        gap: 14px !important;
      }

      #scene-driver-ranking .driver-icon {
        width: 44px !important;
        height: 44px !important;
        min-width: 44px !important;
      }

      #scene-driver-ranking .driver-bar-track {
        height: 34px !important;
      }

      #scene-driver-ranking .driver-bar-fill {
        width: var(--w) !important;
        background: ${BAR_COLOR} !important;
        background-image: none !important;
        box-shadow: none !important;
        color: transparent !important;
        font-size: 0 !important;
      }

      #scene-driver-ranking .driver-bar-fill.access,
      #scene-driver-ranking .driver-bar-fill.demo,
      #scene-driver-ranking .driver-bar-fill.form,
      #scene-driver-ranking .driver-bar-fill.governance,
      #scene-driver-ranking .driver-bar-fill.climate {
        background: ${BAR_COLOR} !important;
        background-image: none !important;
      }

      #scene-driver-ranking .driver-desc,
      #scene-driver-ranking .driver-ranking-unit {
        display: none !important;
      }

      #scene-driver-ranking .driver-headline-box {
        margin-top: 22px !important;
      }
    `;

    document.head.appendChild(style);
  }

  function makeSection() {
    const max = Math.max(...driverData.map((item) => item[3]));

    const rows = driverData.map(([key, icon, name, count]) => `
      <div class="driver-bar-row" data-key="${key}">
        <div class="driver-label">
          <div class="driver-icon">${icon}</div>
          <div class="driver-name">${name}</div>
        </div>
        <div class="driver-bar-track">
          <div
            class="driver-bar-fill ${key}"
            style="--w:${Math.round(count / max * 100)}%;"
          ></div>
        </div>
      </div>
    `).join("");

    return `
      <section id="scene-driver-ranking" class="driver-ranking-section">
        <div class="driver-ranking-shell">
          <div class="driver-ranking-kicker">Driver ranking</div>
          <h2 class="driver-ranking-title">Which driver matters most?</h2>

          <div class="driver-ranking-main-card">
            <div class="driver-ranking-card-head">
              <h3>Top driver families</h3>
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

  function findTitleAnchor() {
    return (
      document.getElementById("scene5-driver-title-wrapper") ||
      document.getElementById("scene-driver-title")
    );
  }

  function ensure() {
    injectStyle();

    const anchor = findTitleAnchor();
    if (!anchor) return false;

    document.getElementById("scene-driver-ranking")?.remove();
    document.getElementById("scene5-driver-ranking-wrapper")?.remove();

    const wrapper = document.createElement("div");
    wrapper.id = "scene5-driver-ranking-wrapper";
    wrapper.innerHTML = makeSection();

    anchor.insertAdjacentElement("afterend", wrapper);
    return true;
  }

  function boot() {
    let tries = 0;

    const timer = setInterval(function () {
      tries += 1;
      const ok = ensure();

      if (ok || tries > 120) {
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
