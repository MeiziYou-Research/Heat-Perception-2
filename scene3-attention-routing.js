
(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    const stage = document.getElementById("attentionBubbleStage");
    if (!stage) return;

    stage.innerHTML = "";

    const ambientLayer = document.createElement("div");
    ambientLayer.id = "ambientBubbleLayer";

    const mainLayer = document.createElement("div");
    mainLayer.id = "mainBubbleLayer";

    const subLayer = document.createElement("div");
    subLayer.id = "subBubbleLayer";

    const panel = document.createElement("div");
    panel.id = "attentionCardPanel";
    panel.className = "s3r-card-panel";

    panel.innerHTML = `
      <button class="s3r-panel-close" type="button">×</button>
      <div class="s3r-panel-title"></div>
      <div class="s3r-panel-meta"></div>
      <div class="s3r-card-list"></div>
    `;

    stage.appendChild(ambientLayer);
    stage.appendChild(mainLayer);
    stage.appendChild(subLayer);
    stage.appendChild(panel);

    injectStyles();

    const DATA = [
      {
        id: "E",
        label: "Exposure & Lived Experience (E)",
        share: 76.2,
        x: 32,
        y: 56,
        size: 285,
        groups: [
          {
            id: "E_APP",
            label: "Appraisal",
            dx: -235,
            dy: -52,
            size: 118,
            items: [
              ["E11", "Everyday thermal sensation", "Perceptual appraisal"],
              ["E12", "Interpreting thermal feel", "Interpretive appraisal"]
            ]
          },
          {
            id: "E_DIS",
            label: "Situated disruptions",
            dx: -120,
            dy: -195,
            size: 132,
            items: [
              ["E21", "Nighttime heat & sleep", "Sleep / routine disruption"],
              ["E22", "Home life & companionship", "Home-life context"],
              ["E23", "Work & commute", "Role / obligation burden"],
              ["E24", "Outdoor activity", "Self-directed activity"],
              ["E25", "Organized events", "Structured activity"]
            ]
          },
          {
            id: "E_COP",
            label: "Coping",
            dx: 170,
            dy: -160,
            size: 118,
            items: [
              ["E31", "Affective coping", "Emotion-focused coping"],
              ["E32", "Device / spatial cooling", "Behavioural adjustment"],
              ["E33", "Consumptive cooling", "Cooling relief"]
            ]
          }
        ]
      },
      {
        id: "H",
        label: "Health Impacts & Burden (H)",
        share: 6.4,
        x: 58,
        y: 68,
        size: 170,
        groups: [
          {
            id: "H_VUL",
            label: "Vulnerability",
            dx: -12,
            dy: -175,
            size: 112,
            items: [
              ["H11", "Vulnerable populations", "Differential risk"],
              ["H12", "Animal health risk", "Non-human vulnerability"]
            ]
          },
          {
            id: "H_OUT",
            label: "Outcomes",
            dx: -160,
            dy: -4,
            size: 122,
            items: [
              ["H21", "Physical health outcomes", "Individual outcomes"],
              ["H22", "Mental health burden", "Psychological burden"],
              ["H31", "Population health burden", "System outcomes"]
            ]
          },
          {
            id: "H_ACT",
            label: "Public health action",
            dx: 150,
            dy: 8,
            size: 122,
            items: [
              ["H41", "Warnings & advice", "Public health response"]
            ]
          }
        ]
      },
      {
        id: "S",
        label: "Systems & Governance (S)",
        share: 17.4,
        x: 80,
        y: 41,
        size: 218,
        groups: [
          {
            id: "S_FRAME",
            label: "Framing",
            dx: -10,
            dy: -178,
            size: 116,
            items: [
              ["S41", "Climate attribution", "Causal attribution"],
              ["S42", "Climate controversy", "Contestation"],
              ["S43", "Climate background", "Temporal context"],
              ["S44", "Compound extremes", "Hazard complexity"]
            ]
          },
          {
            id: "S_EQUITY",
            label: "Structural vulnerability & equity",
            dx: -170,
            dy: 118,
            size: 132,
            items: [
              ["S11", "Climate justice framing", "Equity / justice"]
            ]
          },
          {
            id: "S_BUILT",
            label: "Built environment",
            dx: 140,
            dy: 122,
            size: 122,
            items: [
              ["S21", "Urban planning & heat", "Built-environment mechanism"]
            ]
          },
          {
            id: "S_INFRA",
            label: "Critical infrastructure",
            dx: 198,
            dy: -6,
            size: 122,
            items: [
              ["S22", "Power grid / energy system", "Infrastructure risk"]
            ]
          },
          {
            id: "S_INST",
            label: "Institutional response",
            dx: 2,
            dy: 174,
            size: 122,
            items: [
              ["S31", "Urban operations", "Governance response"]
            ]
          }
        ]
      }
    ];

    let activeFamily = null;
    let activeGroup = null;

    function injectStyles() {
      const old = document.getElementById("scene3-stable-redesign-style");
      if (old) old.remove();

      const style = document.createElement("style");
      style.id = "scene3-stable-redesign-style";
      style.textContent = `
        #attentionBubbleStage {
          position: relative !important;
          overflow: hidden !important;
        }

        #ambientBubbleLayer {
          position: absolute !important;
          inset: 0 !important;
          z-index: 1 !important;
          pointer-events: none !important;
          overflow: hidden !important;
        }

        #mainBubbleLayer {
          position: absolute !important;
          inset: 0 !important;
          z-index: 10 !important;
          pointer-events: none !important;
        }

        #subBubbleLayer {
          position: absolute !important;
          inset: 0 !important;
          z-index: 20 !important;
          pointer-events: none !important;
        }

        .scene3-ambient-bubble {
          position: absolute !important;
          border-radius: 999px !important;
          background: radial-gradient(
            circle at 35% 35%,
            rgba(255,255,255,0.72) 0%,
            rgba(255,255,255,0.34) 55%,
            rgba(255,255,255,0.12) 100%
          ) !important;
          border: 1px solid rgba(255,255,255,0.40) !important;
          pointer-events: none !important;
          animation: scene3BubbleFloat 10s ease-in-out infinite alternate;
        }

        @keyframes scene3BubbleFloat {
          from { transform: translateY(0px); }
          to { transform: translateY(-10px); }
        }

        .s3r-main-bubble,
        .s3r-group-bubble {
          position: absolute !important;
          transform: translate(-50%, -50%) !important;
          border-radius: 999px !important;
          pointer-events: auto !important;
          cursor: pointer !important;
          font-family: inherit !important;
          text-align: center !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease !important;
        }

        .s3r-main-bubble {
          background: radial-gradient(circle at 35% 28%,
            rgba(160,222,255,1) 0%,
            rgba(80,163,222,0.98) 54%,
            rgba(42,114,178,1) 100%
          ) !important;
          border: 1.5px solid rgba(255,255,255,0.70) !important;
          box-shadow: 0 18px 42px rgba(18,60,100,0.18) !important;
          color: #fff !important;
          padding: 20px !important;
          z-index: 11 !important;
        }

        .s3r-main-bubble.is-muted {
          opacity: 0.38 !important;
        }

        .s3r-main-bubble.is-active {
          opacity: 1 !important;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.14), 0 20px 48px rgba(16,47,75,0.22) !important;
        }

        .s3r-main-bubble .title {
          display: block !important;
          font-size: clamp(17px, 1.6vw, 22px) !important;
          font-weight: 850 !important;
          line-height: 1.18 !important;
          color: #fff !important;
        }

        .s3r-main-bubble .share {
          display: block !important;
          margin-top: 10px !important;
          font-size: clamp(22px, 2vw, 30px) !important;
          font-weight: 850 !important;
          color: #fff !important;
        }

        .s3r-group-bubble {
          background: rgba(255,255,255,0.98) !important;
          border: 1.5px solid rgba(255,255,255,0.96) !important;
          box-shadow: 0 12px 26px rgba(20,60,100,0.14) !important;
          color: #123c64 !important;
          padding: 13px !important;
          z-index: 21 !important;
          animation: s3rPopIn 0.24s ease both;
        }

        .s3r-group-bubble.is-selected {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.24), 0 16px 34px rgba(13,50,79,0.18) !important;
        }

        .s3r-group-bubble .label {
          font-size: 13px !important;
          font-weight: 850 !important;
          line-height: 1.18 !important;
          color: #123c64 !important;
        }

        .s3r-main-bubble:hover,
        .s3r-group-bubble:hover {
          transform: translate(-50%, -50%) scale(1.035) !important;
        }

        .s3r-card-panel {
          position: absolute !important;
          width: min(330px, calc(100% - 40px)) !important;
          max-height: 310px !important;
          overflow: auto !important;
          background: rgba(255,255,255,0.97) !important;
          color: #123c64 !important;
          border-radius: 18px !important;
          padding: 15px !important;
          border: 1px solid rgba(255,255,255,0.78) !important;
          box-shadow: 0 18px 42px rgba(18,60,100,0.20) !important;
          z-index: 50 !important;
          display: none !important;
        }

        .s3r-card-panel.is-visible {
          display: block !important;
        }

        .s3r-panel-close {
          position: absolute !important;
          top: 10px !important;
          right: 10px !important;
          width: 26px !important;
          height: 26px !important;
          border: none !important;
          border-radius: 999px !important;
          background: rgba(20,60,100,0.08) !important;
          color: #123c64 !important;
          font-size: 17px !important;
          cursor: pointer !important;
        }

        .s3r-panel-title {
          font-size: 21px !important;
          font-weight: 850 !important;
          margin: 0 34px 5px 0 !important;
          color: #123c64 !important;
        }

        .s3r-panel-meta {
          font-size: 12px !important;
          color: #4b6f90 !important;
          margin-bottom: 10px !important;
          font-weight: 750 !important;
        }

        .s3r-card-list {
          display: grid !important;
          gap: 8px !important;
        }

        .s3r-item-card {
          border-radius: 14px !important;
          border: 1px solid rgba(18,60,100,0.08) !important;
          background: #fff !important;
          padding: 10px 11px !important;
        }

        .s3r-item-head {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          flex-wrap: wrap !important;
          margin-bottom: 5px !important;
        }

        .s3r-code {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-width: 40px !important;
          height: 25px !important;
          border-radius: 999px !important;
          background: linear-gradient(90deg, #9d63ff 0%, #ed69ad 100%) !important;
          color: #fff !important;
          font-size: 11px !important;
          font-weight: 850 !important;
          padding: 0 9px !important;
        }

        .s3r-name {
          font-size: 13px !important;
          font-weight: 850 !important;
          color: #123c64 !important;
        }

        .s3r-role {
          display: inline-block !important;
          font-size: 10px !important;
          font-weight: 850 !important;
          letter-spacing: 0.04em !important;
          text-transform: uppercase !important;
          color: #507497 !important;
          background: rgba(80,116,151,0.10) !important;
          border-radius: 999px !important;
          padding: 4px 8px !important;
        }

        @keyframes s3rPopIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.86);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `;
      document.head.appendChild(style);
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function zones() {
      const stageRect = stage.getBoundingClientRect();
      const list = [];

      stage.querySelectorAll(".s3r-main-bubble, .s3r-group-bubble, .s3r-card-panel.is-visible").forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width < 5 || r.height < 5) return;
        list.push({
          x: r.left - stageRect.left + r.width / 2,
          y: r.top - stageRect.top + r.height / 2,
          rx: r.width / 2 + 170,
          ry: r.height / 2 + 170
        });
      });

      return list;
    }

    function hitZone(x, y, r, list) {
      return list.some(z => {
        const nx = (x - z.x) / (z.rx + r);
        const ny = (y - z.y) / (z.ry + r);
        return nx * nx + ny * ny < 1;
      });
    }

    function generateAmbientBubbles() {
      ambientLayer.innerHTML = "";

      const rect = stage.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const protectedZones = zones();

      let count = 0;
      let made = 0;
      let guard = 0;

      while (made < count && guard < 16000) {
        guard++;

        const r = rand(4, 17);
        const x = rand(r + 8, W - r - 8);
        const y = rand(r + 8, H - r - 8);

        if (hitZone(x, y, r, protectedZones)) continue;

        const b = document.createElement("span");
        b.className = "scene3-ambient-bubble";
        b.style.width = r * 2 + "px";
        b.style.height = r * 2 + "px";
        b.style.left = x - r + "px";
        b.style.top = y - r + "px";
        b.style.opacity = rand(0.35, 0.78).toFixed(2);
        b.style.animationDelay = rand(0, 6).toFixed(2) + "s";
        b.style.animationDuration = rand(7, 14).toFixed(2) + "s";
        ambientLayer.appendChild(b);

        made++;
      }
    }

    function refreshBubbles() {
      clearTimeout(window.__scene3StableBubbleTimer);
      window.__scene3StableBubbleTimer = setTimeout(generateAmbientBubbles, 90);
    }

    function renderMain() {
      mainLayer.innerHTML = "";

      DATA.forEach(family => {
        const el = document.createElement("button");
        el.type = "button";
        el.className = "s3r-main-bubble";
        el.dataset.family = family.id;
        el.style.left = family.x + "%";
        el.style.top = family.y + "%";
        el.style.width = family.size + "px";
        el.style.height = family.size + "px";

        el.innerHTML = `
          <div>
            <span class="title">${family.label}</span>
            <span class="share">${family.share}%</span>
          </div>
        `;

        el.addEventListener("click", function (e) {
          e.stopPropagation();
          selectFamily(family.id);
        });

        mainLayer.appendChild(el);
      });
    }

    function selectFamily(id) {
      activeFamily = DATA.find(d => d.id === id);
      activeGroup = null;
      subLayer.innerHTML = "";
      hidePanel();

      mainLayer.querySelectorAll(".s3r-main-bubble").forEach(el => {
        const on = el.dataset.family === id;
        el.classList.toggle("is-active", on);
        el.classList.toggle("is-muted", !on);
      });

      activeFamily.groups.forEach((g, i) => {
        const el = document.createElement("button");
        el.type = "button";
        el.className = "s3r-group-bubble";
        el.dataset.group = g.id;

        el.style.left = `calc(${activeFamily.x}% + ${g.dx}px)`;
        el.style.top = `calc(${activeFamily.y}% + ${g.dy}px)`;
        el.style.width = g.size + "px";
        el.style.height = g.size + "px";
        el.style.animationDelay = i * 40 + "ms";

        el.innerHTML = `<span class="label">${g.label}</span>`;

        el.addEventListener("click", function (e) {
          e.stopPropagation();
          selectGroup(g, el);
        });

        subLayer.appendChild(el);
      });

      refreshBubbles();
    }

    function selectGroup(group, anchor) {
      activeGroup = group;

      subLayer.querySelectorAll(".s3r-group-bubble").forEach(el => {
        el.classList.toggle("is-selected", el.dataset.group === group.id);
      });

      panel.querySelector(".s3r-panel-title").textContent = group.label;
      panel.querySelector(".s3r-panel-meta").textContent =
        `${activeFamily.label} · ${group.items.length} subcategories`;

      panel.querySelector(".s3r-card-list").innerHTML = group.items.map(item => {
        return `
          <div class="s3r-item-card">
            <div class="s3r-item-head">
              <span class="s3r-code">${item[0]}</span>
              <span class="s3r-name">${item[1]}</span>
            </div>
            <div class="s3r-role">${item[2]}</div>
          </div>
        `;
      }).join("");

      panel.classList.add("is-visible");
      placePanel(anchor);
      refreshBubbles();
    }

    function placePanel(anchor) {
      const s = stage.getBoundingClientRect();
      const a = anchor.getBoundingClientRect();

      const w = Math.min(330, s.width - 40);
      panel.style.width = w + "px";

      const h = Math.min(panel.scrollHeight || 240, 310);

      let left = a.left - s.left + a.width / 2 + 24;
      let top = a.top - s.top + a.height / 2 - h / 2;

      if (left + w > s.width - 18) {
        left = a.left - s.left - w - 24;
      }

      left = Math.max(18, Math.min(left, s.width - w - 18));
      top = Math.max(18, Math.min(top, s.height - h - 18));

      panel.style.left = left + "px";
      panel.style.top = top + "px";
      panel.style.right = "auto";
      panel.style.bottom = "auto";
    }

    function hidePanel() {
      panel.classList.remove("is-visible");
      subLayer.querySelectorAll(".s3r-group-bubble").forEach(el => {
        el.classList.remove("is-selected");
      });
    }

    panel.querySelector(".s3r-panel-close").addEventListener("click", function (e) {
      e.stopPropagation();
      hidePanel();
      refreshBubbles();
    });

    stage.addEventListener("click", function (e) {
      if (
        !e.target.closest(".s3r-main-bubble") &&
        !e.target.closest(".s3r-group-bubble") &&
        !e.target.closest(".s3r-card-panel")
      ) {
        hidePanel();
        refreshBubbles();
      }
    });

    window.addEventListener("resize", function () {
      if (activeGroup) {
        const anchor = subLayer.querySelector(`.s3r-group-bubble[data-group="${activeGroup.id}"]`);
        if (anchor && panel.classList.contains("is-visible")) {
          placePanel(anchor);
        }
      }
      refreshBubbles();
    });

    renderMain();
    refreshBubbles();
  });
})();
