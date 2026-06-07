
(function () {
  "use strict";

  const DATA = [
    {
      id: "E",
      label: "Exposure & Lived Experience",
      share: 76.2,
      x: 32,
      y: 56,
      size: 280,
      rx: 15,
      ry: 18,
      ambient: { count: 30, rx: 17, ry: 18 },
      subs: [
        ["E11", "Everyday monitoring", 0.38, "Surprise", "Backbone"],
        ["E12", "Outdoor exposure", 0.35, "Joy", "Backbone"],
        ["E13", "Night-time heat", 0.41, "Sadness", "Backbone"],
        ["E21", "Thermal appraisal", 0.36, "Neutral", "Backbone"],
        ["E22", "Work burden", 0.33, "Sadness", "Backbone"],
        ["E23", "Mobility burden", 0.37, "Sadness", "Backbone"],
        ["E24", "Cooling relief", 0.29, "Joy", "Backbone"],
        ["E25", "Adaptation", 0.28, "Joy", "Switch-like"],
        ["E31", "Indoor discomfort", 0.31, "Neutral", "Backbone"]
      ]
    },
    {
      id: "H",
      label: "Health Impacts & Burden",
      share: 6.4,
      x: 56,
      y: 64,
      size: 160,
      rx: 12,
      ry: 13,
      ambient: { count: 16, rx: 12, ry: 12 },
      subs: [
        ["H11", "Physical symptoms", 0.26, "Fear", "Backbone"],
        ["H12", "Heat illness", 0.30, "Fear", "Switch-like"],
        ["H21", "Vulnerability", 0.34, "Fear", "Backbone"],
        ["H22", "Older adults & children", 0.31, "Fear", "Backbone"],
        ["H31", "Public health action", 0.22, "Neutral", "Switch-like"],
        ["H41", "Health warning", 0.28, "Fear", "Backbone"]
      ]
    },
    {
      id: "S",
      label: "Systems & Governance",
      share: 17.4,
      x: 73,
      y: 42,
      size: 220,
      rx: 14,
      ry: 15,
      ambient: { count: 22, rx: 15, ry: 15 },
      subs: [
        ["S11", "Policy framing", 0.31, "Anger", "Switch-like"],
        ["S12", "Media framing", 0.27, "Surprise", "Switch-like"],
        ["S21", "Equity", 0.44, "Fear", "Switch-like"],
        ["S22", "Urban services", 0.30, "Neutral", "Backbone"],
        ["S31", "Built environment", 0.28, "Neutral", "Backbone"],
        ["S32", "Critical infrastructure", 0.25, "Sadness", "Switch-like"],
        ["S41", "Climate attribution", 0.32, "Fear", "Backbone"],
        ["S42", "Governance trust", 0.26, "Anger", "Switch-like"]
      ]
    }
  ];

  const DESCRIPTIONS = {
    E11: "Daily monitoring turns heat into a repeated urban signal rather than a single weather event.",
    E12: "Outdoor exposure links heat to streets, open space, and everyday movement.",
    E13: "Night-time heat makes discomfort persist after sunset, often routing attention toward sadness.",
    E21: "Thermal appraisal captures how people evaluate heat intensity and bodily sensation.",
    E22: "Work-related attention links heat to fatigue, productivity loss, and daily obligation.",
    E23: "Mobility burden connects heat with commuting, movement, and travel friction.",
    E24: "Cooling relief converts heat attention into moments of comfort, recovery, and joy.",
    E25: "Adaptation narratives connect discomfort with agency, adjustment, and coping capacity.",
    E31: "Indoor discomfort links heat to domestic and residential thermal experience.",
    H11: "Physical symptoms make heat bodily immediate and increase health-risk salience.",
    H12: "Heat illness turns thermal exposure into threat, urgency, and fear.",
    H21: "Vulnerability routes heat toward concern for at-risk bodies and unequal exposure.",
    H22: "Age-related vulnerability makes heat a matter of care and protection.",
    H31: "Public-health action stabilizes heat perception by translating risk into guidance.",
    H41: "Warnings and advice convert heat into a managed but imminent threat.",
    S11: "Policy framing changes whether heat is narrated through responsibility, critique, or blame.",
    S12: "Media framing can amplify heat as shock, event, or public spectacle.",
    S21: "Equity attention directs heat perception toward uneven exposure and structural risk.",
    S22: "Urban services frame heat as a problem of maintenance, support, and local governance.",
    S31: "Built environment attention links heat to urban form, materials, and spatial design.",
    S32: "Infrastructure attention makes heat visible through fragility and disruption.",
    S41: "Climate attribution connects everyday heat with broader climate risk.",
    S42: "Governance trust shapes whether heat feels manageable or politically frustrating."
  };

  let activeFamily = null;
  let selectedCode = null;

  function rand(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function findScene3Root() {
    const byId = document.getElementById("scene3-attention-routing");
    if (byId) return byId;

    const candidates = Array.from(document.querySelectorAll("section, div"));
    const hit = candidates.find(el => {
      const t = (el.textContent || "").replace(/\s+/g, " ");
      return t.includes("Click a major family") || t.includes("Heat Perception");
    });

    if (hit) return hit;

    const created = document.createElement("section");
    created.id = "scene3-attention-routing";
    document.body.appendChild(created);
    return created;
  }

  function bubbleText(label) {
    return label.replace(/ & /g, " &<br>");
  }

  function renderSkeleton(root) {
    root.classList.add("tv3-mounted");
    root.innerHTML = `
      <div class="tv3-stage">
        <div class="tv3-hint"><span>01</span><strong>Click a major family</strong></div>
        <a class="tv3-about" href="#about">About</a>

        <svg class="tv3-route" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path class="tv3-route-wide" d="M 9 82 C 25 66, 35 60, 49 65 S 65 72, 77 55 S 88 32, 96 27"></path>
          <path class="tv3-route-mid" d="M 10 82 C 25 66, 35 60, 49 65 S 65 72, 77 55 S 88 32, 96 27"></path>
          <path class="tv3-route-dash" d="M 10 82 C 25 66, 35 60, 49 65 S 65 72, 77 55 S 88 32, 96 27"></path>
        </svg>

        <div class="tv3-ambient-layer"></div>
        <div class="tv3-main-layer"></div>
        <div class="tv3-sub-layer"></div>

        <div class="tv3-card" aria-hidden="true">
          <div class="tv3-card-kicker">Selected subcategory</div>
          <h3 class="tv3-card-title">Select a route</h3>
          <div class="tv3-card-grid">
            <div class="tv3-card-metric"><span>Code</span><strong id="tv3Code">—</strong></div>
            <div class="tv3-card-metric"><span>Value</span><strong id="tv3Value">—</strong></div>
            <div class="tv3-card-metric"><span>Emotion</span><strong id="tv3Emotion">—</strong></div>
            <div class="tv3-card-metric"><span>Role</span><strong id="tv3Role">—</strong></div>
          </div>
          <p class="tv3-card-desc" id="tv3Desc">Click a major attention family, then choose one subcategory.</p>
        </div>

        <div class="tv3-origin">Heat Perception</div>
      </div>
    `;
  }

  function renderAmbient(root) {
    const layer = root.querySelector(".tv3-ambient-layer");
    if (!layer) return;

    layer.innerHTML = "";

    let seed = 100;

    DATA.forEach(f => {
      const count = f.ambient.count;
      for (let i = 0; i < count; i++) {
        const angle = Math.PI * 2 * i / count + rand(seed + i) * 0.75;
        const radial = 0.65 + rand(seed * 2 + i) * 0.75;
        const x = f.x + Math.cos(angle) * f.ambient.rx * radial + (rand(seed * 3 + i) - 0.5) * 4;
        const y = f.y + Math.sin(angle) * f.ambient.ry * radial + (rand(seed * 4 + i) - 0.5) * 4;
        const size = 7 + rand(seed * 5 + i) * 22;
        const opacity = 0.18 + rand(seed * 6 + i) * 0.34;

        const b = document.createElement("span");
        b.className = "tv3-ambient " + f.id.toLowerCase();
        b.style.left = x + "%";
        b.style.top = y + "%";
        b.style.setProperty("--s", size.toFixed(1) + "px");
        b.style.setProperty("--o", opacity.toFixed(2));
        b.style.setProperty("--d", (9 + rand(seed * 7 + i) * 7).toFixed(2) + "s");
        b.style.setProperty("--delay", (-rand(seed * 8 + i) * 8).toFixed(2) + "s");
        b.style.setProperty("--x1", ((rand(seed * 9 + i) - 0.5) * 20).toFixed(1) + "px");
        b.style.setProperty("--y1", ((rand(seed * 10 + i) - 0.5) * 20).toFixed(1) + "px");
        b.style.setProperty("--x2", ((rand(seed * 11 + i) - 0.5) * 20).toFixed(1) + "px");
        b.style.setProperty("--y2", ((rand(seed * 12 + i) - 0.5) * 20).toFixed(1) + "px");

        layer.appendChild(b);
      }

      seed += 100;
    });
  }

  function renderMain(root) {
    const layer = root.querySelector(".tv3-main-layer");
    if (!layer) return;

    layer.innerHTML = "";

    DATA.forEach(f => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tv3-main";
      btn.dataset.family = f.id;
      btn.style.setProperty("--x", f.x + "%");
      btn.style.setProperty("--y", f.y + "%");
      btn.style.setProperty("--diam", f.size + "px");

      btn.innerHTML = `
        <span>
          <span class="tv3-main-title">${bubbleText(f.label)}</span>
          <span class="tv3-main-share">${f.share}%</span>
        </span>
      `;

      btn.addEventListener("click", () => {
        setActive(root, f.id);
      });

      layer.appendChild(btn);
    });
  }

  function renderSubs(root, family) {
    const layer = root.querySelector(".tv3-sub-layer");
    if (!layer) return;

    layer.innerHTML = "";

    const n = family.subs.length;
    const start = family.id === "E" ? -150 : family.id === "H" ? 150 : -80;

    family.subs.forEach((row, i) => {
      const [code, label, value, emotion, role] = row;
      const angle = (start + i * (360 / n)) * Math.PI / 180;

      const x = family.x + Math.cos(angle) * family.rx;
      const y = family.y + Math.sin(angle) * family.ry;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tv3-sub";
      btn.dataset.code = code;
      btn.style.setProperty("--x", x + "%");
      btn.style.setProperty("--y", y + "%");
      btn.style.setProperty("--diam", "88px");

      btn.innerHTML = `
        <span>
          <span class="tv3-sub-code">${code}</span>
          <span class="tv3-sub-label">${label}</span>
        </span>
      `;

      btn.addEventListener("click", event => {
        event.stopPropagation();
        selectedCode = code;
        root.querySelectorAll(".tv3-sub").forEach(el => {
          el.classList.toggle("is-selected", el.dataset.code === code);
        });
        showCard(root, { code, label, value, emotion, role });
      });

      layer.appendChild(btn);

      requestAnimationFrame(() => {
        setTimeout(() => {
          btn.classList.add("is-visible");
        }, 30 + i * 26);
      });
    });
  }

  function setActive(root, id) {
    activeFamily = id;
    selectedCode = null;

    const family = DATA.find(f => f.id === id);
    if (!family) return;

    root.querySelectorAll(".tv3-main").forEach(el => {
      const active = el.dataset.family === id;
      el.classList.toggle("is-active", active);
      el.classList.toggle("is-muted", !active);
    });

    const hint = root.querySelector(".tv3-hint strong");
    if (hint) hint.textContent = "Select a subcategory";

    const hintNo = root.querySelector(".tv3-hint span");
    if (hintNo) hintNo.textContent = "02";

    renderSubs(root, family);
    hideCard(root);
  }

  function showCard(root, item) {
    const card = root.querySelector(".tv3-card");
    if (!card) return;

    root.querySelector(".tv3-card-title").textContent = item.label;
    root.querySelector("#tv3Code").textContent = item.code;
    root.querySelector("#tv3Value").textContent = item.value.toFixed(2);
    root.querySelector("#tv3Emotion").textContent = item.emotion;
    root.querySelector("#tv3Role").textContent = item.role;
    root.querySelector("#tv3Desc").textContent = DESCRIPTIONS[item.code] || "This subcategory describes one route from heat attention into emotion.";

    card.classList.add("is-visible");
    card.setAttribute("aria-hidden", "false");
  }

  function hideCard(root) {
    const card = root.querySelector(".tv3-card");
    if (!card) return;
    card.classList.remove("is-visible");
    card.setAttribute("aria-hidden", "true");
  }

  function renderScene3() {
    const root = findScene3Root();
    if (!root) return;

    renderSkeleton(root);
    renderAmbient(root);
    renderMain(root);
  }

  function boot() {
    renderScene3();
    setTimeout(renderScene3, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("load", boot);
})();
