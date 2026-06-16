
(function () {
  if (window.__XLP_DAYHEAT_MODAL_VERSION__) return;
  window.__XLP_DAYHEAT_MODAL_VERSION__ = true;

  const BG_PATH = "webpage/assets/main scene.png?v=mainfix_20260612_205421";
  const SCENE_DIR = "webpage/assets/attention_scenes";
  const SCENE_EXT = "png";

  const CATEGORY_META = {
    lived: {
      label: "Exposure & lived experience",
      color: "#f6a623",
      soft: "rgba(246,166,35,0.18)"
    },
    health: {
      label: "Health impacts & burden",
      color: "#5b8ff9",
      soft: "rgba(91,143,249,0.18)"
    },
    system: {
      label: "Systems & governance",
      color: "#2fc58d",
      soft: "rgba(47,197,141,0.18)"
    }
  };

  const SCENES = [
    {
      code: "E11",
      title: "Everyday thermal sensation statements",
      type: "Exposure & lived experience",
      theory: "Transactional Stress & Coping",
      domain: "Appraisal",
      category: "Sensory thermal state",
      role: "Perceptual appraisal",
      definition: "Reports an immediate thermal sensation or comfort state, such as hot, cold, warm, cool, comfortable, or uncomfortable, as a descriptive, present-focused state report.",
      categoryGroup: "lived",
      x: 17,
      y: 44
    },
    {
      code: "E12",
      title: "Interpreting thermal feel",
      type: "Exposure & lived experience",
      theory: "Transactional Stress & Coping",
      domain: "Appraisal",
      category: "Situational interpretation of thermal discomfort",
      role: "Interpretive appraisal",
      definition: "Explains, attributes, or compares why the thermal experience feels a certain way by providing a situational interpretation of the sensation, without anchoring the statement to a specific life-domain disruption or explicit health-risk framing.",
      categoryGroup: "lived",
      x: 82,
      y: 55
    },
    {
      code: "E21",
      title: "Nighttime heat & sleep disruption",
      type: "Exposure & lived experience",
      theory: "Transactional Stress & Coping",
      domain: "Situated disruptions",
      category: "Nighttime heat & sleep disruption",
      role: "Domain disruption: sleep / routine",
      definition: "Heat framed as disrupting sleep or routines, including difficulty falling asleep, restless nights, or sweating at night, without clinical diagnosis or medical risk framing.",
      categoryGroup: "lived",
      x: 49,
      y: 50
    },
    {
      code: "E22",
      title: "Home life & everyday companionship cooling",
      type: "Exposure & lived experience",
      theory: "Transactional Stress & Coping",
      domain: "Situated disruptions",
      category: "Home life & everyday companionship cooling",
      role: "Domain disruption: home-life context",
      definition: "Home-based everyday life under heat, including domestic routines, family or companionship, and pets as companionship, without centring explicit animal health risk or institutional service provision.",
      categoryGroup: "lived",
      x: 68,
      y: 63
    },
    {
      code: "E23",
      title: "Work & commute",
      type: "Exposure & lived experience",
      theory: "Transactional Stress & Coping",
      domain: "Situated disruptions",
      category: "Work & commute burden",
      role: "Domain disruption: role / obligation",
      definition: "Heat interferes with work or commuting, including PPE discomfort, productivity loss, or travel inconvenience, without clinical or medical framing.",
      categoryGroup: "lived",
      x: 58,
      y: 79
    },
    {
      code: "E24",
      title: "Personal outdoor activity experience",
      type: "Exposure & lived experience",
      theory: "Transactional Stress & Coping",
      domain: "Situated disruptions",
      category: "Personal outdoor activity experience",
      role: "Domain disruption: self-directed activity",
      definition: "Heat experienced during self-directed outdoor activities such as walking, running, leisure, or travel, emphasizing constraints, adjustments, and personal experience rather than organized events.",
      categoryGroup: "lived",
      x: 31,
      y: 70
    },
    {
      code: "E25",
      title: "Organized events & mass-activity heat experience",
      type: "Exposure & lived experience",
      theory: "Transactional Stress & Coping",
      domain: "Situated disruptions",
      category: "Organized events & mass-activity heat experience",
      role: "Domain disruption: organized / structured context",
      definition: "Heat experienced in organized settings such as sports events, festivals, venues, crowds, queues, or event rules and operations where the structured context is central.",
      categoryGroup: "lived",
      x: 69,
      y: 34
    },
    {
      code: "E31",
      title: "Affective coping",
      type: "Exposure & lived experience",
      theory: "Transactional Stress & Coping",
      domain: "Coping",
      category: "Affective coping",
      role: "Emotion-focused coping",
      definition: "Emotion expressed as regulation or social coping, including negative venting, ranting, swearing, exaggerated complaint, and positive savoring or celebration of warmth; excludes clinical mental health burden framing.",
      categoryGroup: "lived",
      x: 73,
      y: 40
    },
    {
      code: "E32",
      title: "Device/spatial cooling strategies",
      type: "Exposure & lived experience",
      theory: "Transactional Stress & Coping",
      domain: "Coping",
      category: "Device/spatial cooling strategies",
      role: "Problem-focused coping",
      definition: "Cooling via devices or spatial strategies, such as AC, fans, shade, staying indoors, or seeking cooler indoor spaces, when framed as personal coping rather than institutional provision.",
      categoryGroup: "lived",
      x: 61,
      y: 48
    },
    {
      code: "E33",
      title: "Consumptive cooling",
      type: "Exposure & lived experience",
      theory: "Transactional Stress & Coping",
      domain: "Coping",
      category: "Consumptive cooling: food / drink",
      role: "Problem-focused coping",
      definition: "Cooling or relief via beverages or food, such as ice cream, cold drinks, chilled foods, or treat framing, as a personal coping practice.",
      categoryGroup: "lived",
      x: 27,
      y: 82
    },

    {
      code: "H11",
      title: "Vulnerable populations at risk",
      type: "Health impacts & burden",
      theory: "Environmental Health Risk Pathway",
      domain: "Vulnerability",
      category: "Vulnerable populations at risk",
      role: "Differential susceptibility / exposure",
      definition: "Highlights heightened heat risk for specific groups such as older adults, children, unhoused people, chronically ill people, marginalized groups, and occupational exposure, framed as vulnerability rather than outcomes.",
      categoryGroup: "health",
      x: 86,
      y: 71
    },
    {
      code: "H12",
      title: "Animal health risk",
      type: "Health impacts & burden",
      theory: "Environmental Health Risk Pathway",
      domain: "Vulnerability",
      category: "Animal health risk",
      role: "Non-human vulnerability",
      definition: "Heat-related illness, risk, or death concerns for pets or wildlife, including overheating, dehydration, or rescue, framed as animal vulnerability.",
      categoryGroup: "health",
      x: 91,
      y: 56
    },
    {
      code: "H21",
      title: "Individual physical health outcomes",
      type: "Health impacts & burden",
      theory: "Environmental Health Risk Pathway",
      domain: "Outcomes",
      category: "Individual physical health outcomes",
      role: "Individual physical outcomes",
      definition: "Explicit physical symptoms or medical framing, such as heat illness, dehydration, fainting, nausea, emergency room or hospital references, or symptom-tied advice.",
      categoryGroup: "health",
      x: 76,
      y: 25
    },
    {
      code: "H22",
      title: "Individual mental health risk & burden",
      type: "Health impacts & burden",
      theory: "Environmental Health Risk Pathway",
      domain: "Outcomes",
      category: "Individual mental health risk & burden",
      role: "Mental health outcomes / burden",
      definition: "Heat framed as mental health risk or burden, including anxiety, depression, psychological distress, or mental health system strain beyond everyday venting or humor.",
      categoryGroup: "health",
      x: 43,
      y: 24
    },
    {
      code: "H31",
      title: "Population/system health burden",
      type: "Health impacts & burden",
      theory: "Environmental Health Risk Pathway",
      domain: "Outcomes",
      category: "Population/system health burden",
      role: "Population / system outcomes",
      definition: "Population-level impacts such as mortality, hospitalizations, epidemiological statistics, or health system overload framed as collective burden.",
      categoryGroup: "health",
      x: 53,
      y: 21
    },
    {
      code: "H41",
      title: "Health warnings & preventive advice",
      type: "Health impacts & burden",
      theory: "Environmental Health Risk Pathway",
      domain: "Public health action",
      category: "Health warnings & preventive advice",
      role: "Public health action / response",
      definition: "Heat alerts, risk reminders, and prevention guidance, including hydration, check-ins, or staying indoors, framed as action-oriented public health messaging.",
      categoryGroup: "health",
      x: 63,
      y: 16
    },

    {
      code: "S11",
      title: "Structural inequality & climate justice framing",
      type: "Systems & governance",
      theory: "Socio-technical Risk Governance",
      domain: "Structural vulnerability & equity",
      category: "Structural inequality & climate justice framing",
      role: "Equity / justice governance frame",
      definition: "Structural drivers of unequal heat exposure or cooling access, including housing, renting, resource distribution, justice claims, and refugee or justice narratives.",
      categoryGroup: "system",
      x: 9,
      y: 76
    },
    {
      code: "S21",
      title: "Urban planning shaping heat exposure & cooling conditions",
      type: "Systems & governance",
      theory: "Socio-technical Risk Governance",
      domain: "Built environment",
      category: "Urban form / planning shaping heat exposure",
      role: "Built-environment mechanism",
      definition: "System-level mechanisms linking urban design, materials, greenery, infrastructure, and planning to heat exposure and cooling conditions; excludes institutional cooling-centre operations.",
      categoryGroup: "system",
      x: 36,
      y: 31
    },
    {
      code: "S22",
      title: "Power grid/energy system vulnerability & response",
      type: "Systems & governance",
      theory: "Socio-technical Risk Governance",
      domain: "Critical infrastructure",
      category: "Power grid/energy system vulnerability & response",
      role: "Critical infrastructure risk",
      definition: "Heat-driven grid stress, outages, peak demand, resilience measures, and infrastructure response, where reliability and cascading impacts are central.",
      categoryGroup: "system",
      x: 93,
      y: 20
    },
    {
      code: "S31",
      title: "Institutional heat response & urban operations",
      type: "Systems & governance",
      theory: "Risk Governance",
      domain: "Institutional response",
      category: "Institutional heat response & urban operations",
      role: "Operational governance response",
      definition: "Institutional provision and operational adjustments under heat, including cooling centres, public buildings as refuges, service rescheduling, emergency operations, and governance decisions.",
      categoryGroup: "system",
      x: 88,
      y: 34
    },
    {
      code: "S41",
      title: "Climate change attribution framing",
      type: "Systems & governance",
      theory: "Public Discourse & Risk Framing",
      domain: "Framing: Why",
      category: "Climate change attribution framing",
      role: "Causal attribution",
      definition: "Explicitly links current heat or extreme weather to climate change or global warming via causal attribution language.",
      categoryGroup: "system",
      x: 79,
      y: 14
    },
    {
      code: "S42",
      title: "Climate controversy/contestation framing",
      type: "Systems & governance",
      theory: "Public Discourse & Risk Framing",
      domain: "Framing: Contest",
      category: "Climate controversy/contestation framing",
      role: "Contestation",
      definition: "Debates around climate change claims, including science communication versus skepticism, denial, conspiracy, persuasion, and contestation.",
      categoryGroup: "system",
      x: 70,
      y: 10
    },
    {
      code: "S43",
      title: "Long-term climate/seasonal background framing",
      type: "Systems & governance",
      theory: "Public Discourse & Risk Framing",
      domain: "Framing: Context",
      category: "Long-term climate/seasonal background framing",
      role: "Temporal backgrounding",
      definition: "Places heat within long-term trends, seasonality, or climate background as context without explicit causal attribution.",
      categoryGroup: "system",
      x: 50,
      y: 11
    },
    {
      code: "S44",
      title: "Extreme heat & compound extremes framing",
      type: "Systems & governance",
      theory: "Public Discourse & Risk Framing",
      domain: "Framing: Risk type",
      category: "Extreme heat & compound extremes framing",
      role: "Hazard complexity",
      definition: "Frames heat as part of compound or multi-hazard events, such as heat plus drought, flood, fire, or smoke, emphasizing cascading risks and hazard complexity.",
      categoryGroup: "system",
      x: 60,
      y: 9
    }
  ];

  let activeFilter = "lived";

  function encodePath(path) {
    const raw = String(path || "");
    const qIndex = raw.indexOf("?");
    const cleanPath = qIndex >= 0 ? raw.slice(0, qIndex) : raw;
    const query = qIndex >= 0 ? raw.slice(qIndex) : "";

    return cleanPath.split("/").map(function (part) {
      return encodeURIComponent(part);
    }).join("/") + query;
  }

  function sceneImage(code) {
    return SCENE_DIR + "/" + code + "." + SCENE_EXT + "?v=e22fix_20260612_204603";
  }

  function categoryColor(cat) {
    return CATEGORY_META[cat] ? CATEGORY_META[cat].color : "#999";
  }

  function categoryLabel(cat) {
    return CATEGORY_META[cat] ? CATEGORY_META[cat].label : cat;
  }

  function injectStyle() {
    const old = document.getElementById("xlp-dayheat-modal-style");
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = "xlp-dayheat-modal-style";
    style.textContent = `
      #scene3-attention-routing {
        position: relative !important;
        width: 100% !important;
        min-height: 100vh !important;
        background: #f5f8fc !important;
        padding: 22px 36px 36px !important;
        box-sizing: border-box !important;
        color: #333338 !important;
        font-family: "Microsoft YaHei", "Microsoft YaHei UI", "微软雅黑", Arial, sans-serif !important;
      }

      #scene3-attention-routing * {
        box-sizing: border-box !important;
      }

      #scene3-attention-routing .dayheat-wrap {
        width: min(1600px, 96vw) !important;
        margin: 0 auto !important;
      }

      #scene3-attention-routing .dayheat-head {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        gap: 10px !important;
        margin-bottom: 12px !important;
      }

      #scene3-attention-routing .dayheat-filters {
        display: grid !important;
        grid-template-columns: 5fr 2fr 3fr !important;
        gap: 12px !important;
        width: 100% !important;
        justify-content: stretch !important;
        align-self: stretch !important;
        padding-bottom: 4px !important;
      }

      #scene3-attention-routing .dayheat-filter {
        appearance: none !important;
        border: 0 !important;
        width: 100% !important;
        height: 40px !important;
        min-height: 40px !important;
        padding: 0 16px !important;
        border-radius: 999px !important;
        background: rgba(255,255,255,0.84) !important;
        background-image: none !important;
        color: #252a34 !important;
        font: inherit !important;
        font-size: 14px !important;
        line-height: 1.05 !important;
        font-weight: 900 !important;
        cursor: pointer !important;
        box-shadow: 0 10px 24px rgba(20,30,60,0.05) !important;
        transition: background 0.18s ease, box-shadow 0.18s ease !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
        white-space: normal !important;
      }

      #scene3-attention-routing .dayheat-filter.is-active {
        background: #DCE8FF !important;
        background-color: #DCE8FF !important;
        background-image: none !important;
        box-shadow: 0 10px 24px rgba(80,120,180,0.12) !important;
      }

      #scene3-attention-routing .dayheat-stage {
        position: relative !important;
        width: 100% !important;
        height: min(800px, calc(100vh - 120px)) !important;
        min-height: 720px !important;
        border-radius: 30px !important;
        overflow: hidden !important;
        background: #edf1f5 !important;
        box-shadow: 0 26px 80px rgba(20,30,60,0.12) !important;
      }

      #scene3-attention-routing .dayheat-bg {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center center !important;
        user-select: none !important;
        pointer-events: none !important;
        z-index: 0 !important;
      }

      #scene3-attention-routing .dayheat-overlay {
        position: absolute !important;
        inset: 0 !important;
        z-index: 5 !important;
      }

      #scene3-attention-routing .dayheat-pin {
        --pin-color: #f6a623;
        position: absolute !important;
        transform: translate(-50%, -50%) !important;
        width: 90px !important;
        height: 90px !important;
        border-radius: 50% !important;
        border: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        overflow: visible !important;
        cursor: pointer !important;
        transition: transform 0.18s ease, opacity 0.18s ease, filter 0.18s ease !important;
      }

      #scene3-attention-routing .dayheat-pin:hover {
        transform: translate(-50%, -50%) scale(1.07) !important;
        z-index: 20 !important;
      }

      #scene3-attention-routing .dayheat-pin.is-hidden {
        display: none !important;
      }

      #scene3-attention-routing .dayheat-pin-img-wrap {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        overflow: hidden !important;
        background: rgba(255,255,255,0.94) !important;
        box-shadow:
          0 14px 30px rgba(20,30,60,0.18),
          0 0 0 5px rgba(255,255,255,0.92),
          0 0 0 7px var(--pin-color) !important;
        clip-path: circle(50% at 50% 50%) !important;
      }

      #scene3-attention-routing .dayheat-pin-thumb {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center center !important;
        border-radius: 50% !important;
        clip-path: circle(50% at 50% 50%) !important;
      }

      #scene3-attention-routing .dayheat-pin-badge {
        position: absolute !important;
        left: 50% !important;
        bottom: -10px !important;
        transform: translateX(-50%) !important;
        min-width: 44px !important;
        height: 24px !important;
        padding: 0 10px !important;
        border-radius: 999px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: rgba(255,255,255,0.96) !important;
        color: #1f2937 !important;
        font-size: 12px !important;
        font-weight: 950 !important;
        box-shadow: 0 8px 20px rgba(20,30,60,0.16) !important;
      }

      .dayheat-modal {
        position: fixed !important;
        inset: 0 !important;
        z-index: 99999 !important;
        display: none !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 42px !important;
        background: rgba(75, 93, 112, 0.42) !important;
        backdrop-filter: blur(12px) saturate(0.95) !important;
      }

      .dayheat-modal.is-open {
        display: flex !important;
      }

      .dayheat-modal-panel {
        position: relative !important;
        width: min(1040px, 92vw) !important;
        min-height: 520px !important;
        border-radius: 28px !important;
        overflow: hidden !important;
        background: rgba(255,255,255,0.94) !important;
        box-shadow: 0 40px 120px rgba(18, 35, 55, 0.34) !important;
        display: grid !important;
        grid-template-columns: 56% 44% !important;
      }

      .dayheat-modal-image {
        position: relative !important;
        min-height: 520px !important;
        background: #eaf2f8 !important;
        overflow: hidden !important;
      }

      .dayheat-modal-image img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center center !important;
        display: block !important;
      }

      .dayheat-modal-content {
        padding: 42px 42px 36px !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
      }

      .dayheat-modal-kicker {
        margin-bottom: 18px !important;
        font-size: 13px !important;
        font-weight: 950 !important;
        letter-spacing: 0.18em !important;
        text-transform: uppercase !important;
      }

      .dayheat-modal-title {
        margin: 0 0 18px !important;
        font-size: clamp(38px, 4.2vw, 58px) !important;
        line-height: 0.95 !important;
        font-weight: 950 !important;
        letter-spacing: -0.055em !important;
        color: #164575 !important;
      }

      .dayheat-modal-chips {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 9px !important;
        margin-bottom: 24px !important;
      }

      .dayheat-modal-chip {
        display: inline-flex !important;
        align-items: center !important;
        border-radius: 999px !important;
        padding: 8px 12px !important;
        background: #eaf2fa !important;
        color: #24527c !important;
        font-size: 13px !important;
        font-weight: 850 !important;
      }

      .dayheat-modal-definition {
        margin: 0 !important;
        font-size: 17px !important;
        line-height: 1.65 !important;
        font-weight: 500 !important;
        color: #315c7c !important;
      }

      .dayheat-modal-role {
        margin-top: 22px !important;
        padding-top: 18px !important;
        border-top: 1px solid rgba(49, 92, 124, 0.14) !important;
        font-size: 14px !important;
        line-height: 1.5 !important;
        color: rgba(30, 55, 76, 0.74) !important;
        font-weight: 700 !important;
      }

      .dayheat-modal-close {
        position: absolute !important;
        right: 18px !important;
        top: 18px !important;
        width: 40px !important;
        height: 40px !important;
        border: none !important;
        border-radius: 999px !important;
        background: rgba(255,255,255,0.70) !important;
        color: rgba(22,69,117,0.42) !important;
        font-size: 24px !important;
        line-height: 40px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        box-shadow: 0 10px 24px rgba(20,30,60,0.08) !important;
      }

      @media (max-width: 1050px) {
        .dayheat-modal-panel {
          grid-template-columns: 1fr !important;
          max-height: 88vh !important;
          overflow-y: auto !important;
        }

        .dayheat-modal-image {
          min-height: 320px !important;
        }

        .dayheat-modal-title {
          font-size: 42px !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function buildSceneHTML() {
    return `
      <div class="dayheat-wrap">
        <div class="dayheat-head">
          <div class="dayheat-head-left">
            <h2 class="dayheat-title">Heat perception - Attention</h2>
          </div>

          <div class="dayheat-filters" id="dayheat-filters">
            <button class="dayheat-filter is-active filter-lived" type="button" data-filter="lived">
              Exposure &amp; lived experience (E) 76.2%
            </button>
            <button class="dayheat-filter filter-health" type="button" data-filter="health">
              Health impacts &amp; burden (H) 6.4%
            </button>
            <button class="dayheat-filter filter-system" type="button" data-filter="system">
              Systems &amp; governance (S) 17.4%
            </button>
          </div>
        </div>

        <div class="dayheat-stage">
          <img class="dayheat-bg" src="${encodePath(BG_PATH)}" alt="Main attention scene background">
          <div class="dayheat-overlay" id="dayheat-overlay"></div>
        </div>
      </div>
    `;
  }

  function buildModalHTML() {
    return `
      <div class="dayheat-modal" id="dayheat-modal" aria-hidden="true">
        <div class="dayheat-modal-panel" role="dialog" aria-modal="true">
          <button class="dayheat-modal-close" type="button" aria-label="Close">×</button>
          <div class="dayheat-modal-image">
            <img id="dayheat-modal-img" src="" alt="">
          </div>
          <div class="dayheat-modal-content">
            <div class="dayheat-modal-kicker" id="dayheat-modal-kicker"></div>
            <h3 class="dayheat-modal-title" id="dayheat-modal-title"></h3>
            <div class="dayheat-modal-chips">
              <span class="dayheat-modal-chip" id="dayheat-modal-type"></span>
              <span class="dayheat-modal-chip" id="dayheat-modal-category"></span>
              <span class="dayheat-modal-chip" id="dayheat-modal-theory"></span>
            </div>
            <p class="dayheat-modal-definition" id="dayheat-modal-definition"></p>
            <div class="dayheat-modal-role" id="dayheat-modal-role"></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPins(root) {
    const overlay = root.querySelector("#dayheat-overlay");
    if (!overlay) return;

    overlay.innerHTML = SCENES.map(function (scene) {
      const color = categoryColor(scene.categoryGroup);

      return `
        <button
          class="dayheat-pin ${scene.categoryGroup !== activeFilter ? "is-hidden" : ""}"
          type="button"
          data-code="${scene.code}"
          data-category="${scene.categoryGroup}"
          style="left:${scene.x}%; top:${scene.y}%; --pin-color:${color};"
          aria-label="${scene.code} ${scene.title}"
        >
          <div class="dayheat-pin-img-wrap">
            <img class="dayheat-pin-thumb" src="${encodePath(sceneImage(scene.code))}" alt="${scene.title}">
          </div>
          <span class="dayheat-pin-badge">${scene.code}</span>
        </button>
      `;
    }).join("");
  }

  function ensureModal() {
    let modal = document.getElementById("dayheat-modal");

    if (!modal) {
      const wrap = document.createElement("div");
      wrap.innerHTML = buildModalHTML().trim();
      modal = wrap.firstElementChild;
      document.body.appendChild(modal);
    }

    return modal;
  }

  function openModal(scene) {
    const modal = ensureModal();
    const color = categoryColor(scene.categoryGroup);

    modal.querySelector("#dayheat-modal-img").src = encodePath(sceneImage(scene.code));
    modal.querySelector("#dayheat-modal-img").alt = scene.title;

    const kicker = modal.querySelector("#dayheat-modal-kicker");
    kicker.textContent = `${scene.code} · ${scene.domain}`;
    kicker.style.color = color;

    modal.querySelector("#dayheat-modal-title").textContent = scene.title;
    modal.querySelector("#dayheat-modal-type").textContent = scene.type;
    modal.querySelector("#dayheat-modal-category").textContent = `Category ${scene.category}`;
    modal.querySelector("#dayheat-modal-theory").textContent = scene.theory;
    modal.querySelector("#dayheat-modal-definition").textContent = scene.definition;
    modal.querySelector("#dayheat-modal-role").textContent = `Theoretical role: ${scene.role}`;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
  }

  function closeModal() {
    const modal = document.getElementById("dayheat-modal");
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
  }

  function bindModalEvents() {
    const modal = ensureModal();

    modal.addEventListener("click", function (event) {
      if (event.target.id === "dayheat-modal" || event.target.closest(".dayheat-modal-close")) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
    });
  }

  function bindInteractions(root) {
    function normalizeFilter(filter) {
      filter = String(filter || "").toLowerCase().trim();

      if (filter.includes("lived") || filter.includes("exposure") || filter === "e") {
        return "lived";
      }

      if (filter.includes("health") || filter === "h") {
        return "health";
      }

      if (filter.includes("system") || filter.includes("governance") || filter === "s") {
        return "system";
      }

      return "lived";
    }

    function updateFilter(filter) {
      filter = normalizeFilter(filter);
      activeFilter = filter;
      root.dataset.activeFilter = filter;

      const filters = Array.from(root.querySelectorAll(".dayheat-filter"));
      const pins = Array.from(root.querySelectorAll(".dayheat-pin"));

      filters.forEach(function (btn) {
        const btnFilter = normalizeFilter(btn.dataset.filter || btn.textContent);

        const active = btnFilter === filter;

        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });

      pins.forEach(function (pin) {
        const pinCategory = normalizeFilter(pin.dataset.category || "");

        const visible = pinCategory === filter;

        pin.classList.toggle("is-hidden", !visible);

        /*
          清掉之前外部补丁可能残留的 inline 样式。
          真正的显示隐藏只交给 .is-hidden 控制。
        */
        pin.style.removeProperty("display");
        pin.style.removeProperty("opacity");
        pin.style.removeProperty("pointer-events");
      });
    }

    const filters = Array.from(root.querySelectorAll(".dayheat-filter"));

    filters.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();

        const filter = normalizeFilter(btn.dataset.filter || btn.textContent);
        updateFilter(filter);
      });
    });

    root.querySelectorAll(".dayheat-pin").forEach(function (pin) {
      pin.addEventListener("click", function (event) {
        event.stopPropagation();

        const scene = SCENES.find(function (s) {
          return s.code === pin.dataset.code;
        });

        if (scene) openModal(scene);
      });
    });

    updateFilter(activeFilter || "lived");
  }

  function findOrCreateRoot() {
    let root = document.getElementById("scene3-attention-routing");

    if (root) return root;

    root = document.createElement("section");
    root.id = "scene3-attention-routing";

    const scene4 =
      document.getElementById("scene4-title-page") ||
      Array.from(document.querySelectorAll("section, div")).find(function (el) {
        return (el.textContent || "").includes("What Stays, What Shifts");
      });

    if (scene4 && scene4.parentNode) {
      scene4.parentNode.insertBefore(root, scene4);
    } else {
      document.body.appendChild(root);
    }

    return root;
  }


  function syncAttentionTitleToScene2(root) {
    const attentionTitle = root
      ? root.querySelector(".dayheat-title")
      : document.querySelector("#scene3-attention-routing .dayheat-title");

    const emotionTitle = document.querySelector("#scene2-comparison .s2clean-title");

    if (!attentionTitle) return;

    attentionTitle.textContent = "Heat perception - Attention";

    if (emotionTitle) {
      const cs = window.getComputedStyle(emotionTitle);

      attentionTitle.style.setProperty("font-size", cs.fontSize, "important");
      attentionTitle.style.setProperty("line-height", cs.lineHeight, "important");
      attentionTitle.style.setProperty("font-weight", cs.fontWeight, "important");
      attentionTitle.style.setProperty("letter-spacing", cs.letterSpacing, "important");
      attentionTitle.style.setProperty("font-family", cs.fontFamily, "important");
    } else {
      attentionTitle.style.setProperty("font-size", "clamp(42px, 4.5vw, 64px)", "important");
      attentionTitle.style.setProperty("line-height", "1.05", "important");
      attentionTitle.style.setProperty("font-weight", "900", "important");
      attentionTitle.style.setProperty("letter-spacing", "-0.045em", "important");
    }

    attentionTitle.style.setProperty("text-align", "center", "important");
    attentionTitle.style.setProperty("margin", "0", "important");
  }

  function mount() {
    injectStyle();

    const root = findOrCreateRoot();
    if (!root) return;

    root.classList.add("dayheat-scene");
    root.innerHTML = buildSceneHTML();

    renderPins(root);
    ensureModal();
    bindModalEvents();
    bindInteractions(root);

    syncAttentionTitleToScene2(root);
    setTimeout(function () { syncAttentionTitleToScene2(root); }, 80);
    setTimeout(function () { syncAttentionTitleToScene2(root); }, 240);
    setTimeout(function () { syncAttentionTitleToScene2(root); }, 700);

    root.dataset.dayheatVersion = "modal-card";
  }

  function boot() {
    mount();
    console.log("[XLP] A day in the heat modal-card version mounted.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("load", boot);

  window.addEventListener("resize", function () {
    const root = document.getElementById("scene3-attention-routing");
    if (!root) return;

    setTimeout(function () {
      syncAttentionTitleToScene2(root);
    }, 80);
  });

})();
