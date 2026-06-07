
(function () {
  const X_FIELD = "E21";
  const Y_FIELD = "Sadness";
  const CITY_FIELD = "city_name";

  function makeSection() {
    return `
      <section id="scene-driver-signal" class="driver-signal-section">
        <div class="driver-signal-shell">
          <div class="driver-signal-kicker">Observed association</div>
          <h2 class="driver-signal-title">Sleep-disruption attention aligns with sadness</h2>
          <p class="driver-signal-subtitle">
            Using real city-summary data, this view shows whether cities with more E21 sleep-disruption attention also show higher sadness share.
          </p>

          <div class="signal-chip-row">
            <div class="signal-chip">🌙 E21 sleep disruption</div>
            <div class="signal-chip">😢 Sadness share</div>
            <div class="signal-chip strong">real city summary</div>
          </div>

          <div class="signal-chart-card">
            <div class="signal-chart-head">
              <div>
                <h3>Each dot represents one city</h3>
                <p>Computed from <code>data/city_summary.inline.js</code>, using <code>E21</code> and <code>Sadness</code>.</p>
              </div>
              <div class="signal-legend">
                <span class="signal-legend-dot"></span>
                real city data
              </div>
            </div>

            <div class="signal-svg-wrap">
              <svg id="driverSignalSvg" viewBox="0 0 1100 480"></svg>
            </div>

            <div class="signal-stat-grid">
              <div class="signal-stat-card">
                <strong id="signalCorr">—</strong>
                <span>correlation</span>
              </div>
              <div class="signal-stat-card">
                <strong id="signalR2">—</strong>
                <span>R²</span>
              </div>
              <div class="signal-stat-card">
                <strong id="signalN">—</strong>
                <span>cities used</span>
              </div>
            </div>
          </div>

          <div class="signal-meaning-box">
            <p>
              <strong>Interpretation:</strong>
              this is a real city-level descriptive association, not the final driver regression. 
              For the formal driver page, replace the x-axis with a driver such as nightlife accessibility once that driver table is available.
            </p>
          </div>
        </div>
      </section>
    `;
  }

  function findAnchor() {
    return (
      document.getElementById("scene-driver-ranking") ||
      document.getElementById("scene-driver-title") ||
      document.getElementById("scene-switch-mechanisms") ||
      document.body.lastElementChild
    );
  }

  function ensureSection() {
    document.getElementById("scene-driver-signal")?.remove();

    const wrapper = document.createElement("div");
    wrapper.id = "scene5-driver-signal-wrapper";
    wrapper.innerHTML = makeSection();

    const anchor = findAnchor();

    if (anchor && anchor !== document.body.lastElementChild) {
      anchor.insertAdjacentElement("afterend", wrapper);
    } else {
      document.body.appendChild(wrapper);
    }
  }

  function toNumber(v) {
    if (v === null || v === undefined || v === "") return NaN;
    if (typeof v === "number") return Number.isFinite(v) ? v : NaN;
    const n = Number(String(v).replace("%", "").trim());
    return Number.isFinite(n) ? n : NaN;
  }

  function findGeoJSON() {
    const likelyNames = [
      "CITY_SUMMARY",
      "citySummary",
      "city_summary",
      "CITY_SUMMARY_DATA",
      "citySummaryData",
      "city_summary_data",
      "GLOBAL_CITY_SUMMARY",
      "thermalCitySummary"
    ];

    for (const name of likelyNames) {
      const obj = window[name];
      if (obj && obj.type === "FeatureCollection" && Array.isArray(obj.features)) {
        return { name, obj };
      }
    }

    for (const key of Object.keys(window)) {
      try {
        const obj = window[key];
        if (obj && obj.type === "FeatureCollection" && Array.isArray(obj.features)) {
          const first = obj.features[0];
          if (first && first.properties && (X_FIELD in first.properties) && (Y_FIELD in first.properties)) {
            return { name: key, obj };
          }
        }
      } catch (e) {}
    }

    return null;
  }

  function pearson(points) {
    const n = points.length;
    if (n < 3) return NaN;

    const mx = points.reduce((s, p) => s + p.x, 0) / n;
    const my = points.reduce((s, p) => s + p.y, 0) / n;

    let num = 0;
    let dx = 0;
    let dy = 0;

    points.forEach(p => {
      const a = p.x - mx;
      const b = p.y - my;
      num += a * b;
      dx += a * a;
      dy += b * b;
    });

    return num / Math.sqrt(dx * dy);
  }

  function regression(points) {
    const n = points.length;
    const mx = points.reduce((s, p) => s + p.x, 0) / n;
    const my = points.reduce((s, p) => s + p.y, 0) / n;

    let num = 0;
    let den = 0;

    points.forEach(p => {
      num += (p.x - mx) * (p.y - my);
      den += (p.x - mx) ** 2;
    });

    const slope = den === 0 ? 0 : num / den;
    const intercept = my - slope * mx;

    return { slope, intercept };
  }

  function drawChart(points) {
    const svg = document.getElementById("driverSignalSvg");
    if (!svg) return;

    const W = 1100;
    const H = 480;
    const m = { l: 86, r: 56, t: 44, b: 74 };
    const pw = W - m.l - m.r;
    const ph = H - m.t - m.b;

    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);

    let xMin = Math.min(...xs);
    let xMax = Math.max(...xs);
    let yMin = Math.min(...ys);
    let yMax = Math.max(...ys);

    const xPad = (xMax - xMin) * 0.10 || 1;
    const yPad = (yMax - yMin) * 0.10 || 1;

    xMin -= xPad;
    xMax += xPad;
    yMin -= yPad;
    yMax += yPad;

    const x = v => m.l + (v - xMin) / (xMax - xMin) * pw;
    const y = v => m.t + ph - (v - yMin) / (yMax - yMin) * ph;

    const { slope, intercept } = regression(points);
    const lineY = xv => intercept + slope * xv;

    svg.innerHTML = "";

    for (let i = 0; i <= 5; i++) {
      const yy = m.t + i / 5 * ph;
      const xx = m.l + i / 5 * pw;
      svg.insertAdjacentHTML("beforeend", `<line class="signal-grid" x1="${m.l}" x2="${W-m.r}" y1="${yy}" y2="${yy}"></line>`);
      svg.insertAdjacentHTML("beforeend", `<line class="signal-grid" x1="${xx}" x2="${xx}" y1="${m.t}" y2="${H-m.b}"></line>`);
    }

    const x1 = xMin + (xMax - xMin) * 0.06;
    const x2 = xMax - (xMax - xMin) * 0.06;
    const spread = (yMax - yMin) * 0.10;

    svg.insertAdjacentHTML("beforeend", `
      <polygon class="signal-band"
        points="${x(x1)},${y(lineY(x1)+spread)} ${x(x2)},${y(lineY(x2)+spread)} ${x(x2)},${y(lineY(x2)-spread)} ${x(x1)},${y(lineY(x1)-spread)}">
      </polygon>
    `);

    svg.insertAdjacentHTML("beforeend", `
      <path class="signal-line" d="M ${x(x1)} ${y(lineY(x1))} L ${x(x2)} ${y(lineY(x2))}"></path>
    `);

    points.forEach(p => {
      svg.insertAdjacentHTML("beforeend", `
        <circle class="signal-dot" cx="${x(p.x)}" cy="${y(p.y)}" r="5.8">
          <title>${p.city}: ${X_FIELD}=${p.x}, ${Y_FIELD}=${p.y}</title>
        </circle>
      `);
    });

    svg.insertAdjacentHTML("beforeend", `
      <line class="signal-axis" x1="${m.l}" y1="${H-m.b}" x2="${W-m.r}" y2="${H-m.b}"></line>
      <line class="signal-axis" x1="${m.l}" y1="${m.t}" x2="${m.l}" y2="${H-m.b}"></line>
      <text class="signal-axis-label" x="${W/2}" y="${H-25}" text-anchor="middle">${X_FIELD}: sleep-disruption attention →</text>
      <text class="signal-axis-label" x="28" y="${H/2}" text-anchor="middle" transform="rotate(-90 28 ${H/2})">${Y_FIELD}: emotion share →</text>
    `);

    const byX = [...points].sort((a, b) => a.x - b.x);
    const low = byX[0];
    const high = byX[byX.length - 1];

    if (low) {
      svg.insertAdjacentHTML("beforeend", `<text class="signal-label" x="${x(low.x)+10}" y="${y(low.y)+22}">${low.city}</text>`);
    }

    if (high && high !== low) {
      svg.insertAdjacentHTML("beforeend", `<text class="signal-label" x="${x(high.x)+10}" y="${y(high.y)-10}">${high.city}</text>`);
    }
  }

  function render() {
    ensureSection();

    const found = findGeoJSON();

    if (!found) {
      const card = document.querySelector("#scene-driver-signal .signal-chart-card");
      if (card) {
        card.insertAdjacentHTML("afterbegin", `
          <div class="signal-warning-box">
            <strong>没有找到包含 ${X_FIELD} 和 ${Y_FIELD} 的 GeoJSON 数据。</strong><br>
            请确认 data/city_summary.inline.js 已经挂载到 window 变量，并且 properties 中包含这两个字段。
          </div>
        `);
      }
      return;
    }

    const features = found.obj.features || [];

    const points = features.map((f, i) => {
      const p = f.properties || {};
      return {
        city: String(p[CITY_FIELD] || p.city || p.city_id || `City ${i + 1}`),
        x: toNumber(p[X_FIELD]),
        y: toNumber(p[Y_FIELD])
      };
    }).filter(p => Number.isFinite(p.x) && Number.isFinite(p.y));

    console.log("[E21-Sadness] source variable:", found.name);
    console.log("[E21-Sadness] points:", points);

    if (points.length < 8) {
      const card = document.querySelector("#scene-driver-signal .signal-chart-card");
      if (card) {
        card.insertAdjacentHTML("afterbegin", `
          <div class="signal-warning-box">
            <strong>有效城市点太少。</strong><br>
            当前 ${X_FIELD} × ${Y_FIELD} 有效点数：${points.length}
          </div>
        `);
      }
      return;
    }

    const r = pearson(points);
    const r2 = Number.isFinite(r) ? r * r : NaN;

    document.getElementById("signalCorr").textContent =
      Number.isFinite(r) ? (r > 0 ? "+" : "") + r.toFixed(2) : "—";

    document.getElementById("signalR2").textContent =
      Number.isFinite(r2) ? r2.toFixed(2) : "—";

    document.getElementById("signalN").textContent = String(points.length);

    drawChart(points);
  }

  function boot() {
    let tries = 0;

    const timer = setInterval(function () {
      tries += 1;

      try {
        render();
        clearInterval(timer);
      } catch (e) {
        console.warn("[E21-Sadness] waiting for city_summary data...", e);
      }

      if (tries > 30) {
        clearInterval(timer);
      }
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("load", boot);
})();
