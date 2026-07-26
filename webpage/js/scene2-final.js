




/* XLP_SCENE2_CHART_DARK_DEFAULTS */




try {




  if (window.Chart) {




    Chart.defaults.color = "#3A3A3A";




    Chart.defaults.borderColor = "rgba(58,58,58,0.18)";




    Chart.defaults.plugins.legend.labels.color = "#3A3A3A";




  }




} catch (e) {}














(function () {




  "use strict";









  if (window.__XLP_SCENE2_FINAL_RUNNING__) return;




  window.__XLP_SCENE2_FINAL_RUNNING__ = true;









    const EMOTIONS = [
    { key: "Sadness",  label: "Sadness",  emoji: "😢", color: "#3a97e8" },
    { key: "Surprise", label: "Surprise", emoji: "😮", color: "#8b7cff" },
    { key: "Neutral",  label: "Neutral",  emoji: "😐", color: "#8e8e86" },
    { key: "Joy",      label: "Joy",      emoji: "😊", color: "#f2a32f" },
    { key: "Anger",    label: "Anger",    emoji: "😡", color: "#e55757" },
    { key: "Fear",     label: "Fear",     emoji: "😨", color: "#5267d8" },
    { key: "Disgust",  label: "Disgust",  emoji: "🤢", color: "#29a982" }
  ];









  const STACK_KEYS = ["Sadness", "Surprise", "Neutral", "Joy"];




  const RADAR_KEYS = ["Joy", "Surprise", "Neutral", "Sadness", "Fear", "Disgust", "Anger"];




  const SHORT = { Sadness: "Sad", Surprise: "Sur", Neutral: "Neu", Joy: "Joy" };









  let features = [];




  let globalAvg = {};




  let selectedFeature = null;




  let currentEmotion = "Sadness";




  let map = null;




  let radar = null;




  let booted = false;









  function n(v) {




    const x = Number(v);




    return Number.isFinite(x) ? x : 0;




  }









  function f1(v) {




    return Number(v || 0).toFixed(1);




  }









  function emotion(key) {




    return EMOTIONS.find(e => e.key === key) || EMOTIONS[0];




  }









  function cityName(feature) {




    const p = feature && feature.properties ? feature.properties : {};




    return p.__city_name || p.city_name || p.city || p.name || "";




  }









  function countryName(feature) {




    const p = feature && feature.properties ? feature.properties : {};




    return p.__country || p.country || "";




  }

  function countryCode(country) {
    const key = String(country || "")
      .trim()
      .toLowerCase();

    const map = {
      "united states": "US",
      "united states of america": "US",
      "usa": "US",
      "us": "US",

      "canada": "CA",
      "ca": "CA",

      "united kingdom": "UK",
      "great britain": "UK",
      "uk": "UK",

      "australia": "AU",
      "au": "AU",

      "france": "FR",
      "fr": "FR",

      "mexico": "MX",
      "mx": "MX"
    };

    return (
      map[key] ||
      String(country || "").trim()
    );
  }


  function legendLabel(feature) {
    const city = cityName(feature);
    const code = countryCode(
      countryName(feature)
    );

    return code
      ? city + ", " + code
      : city;
  }










  function cityLabel(feature) {




    const c = cityName(feature);




    const country = countryName(feature);




    return country ? `${c}, ${country}` : c;




  }









  function getDataFeatures() {




    const fc = window.__CITY_SUMMARY_GEOJSON__ || window.CITY_SUMMARY_GEOJSON;




    if (!fc || !Array.isArray(fc.features)) return [];









    return fc.features




      .filter(f => f && f.properties && f.geometry && Array.isArray(f.geometry.coordinates))




      .map((f, i) => {




        const p = Object.assign({}, f.properties || {});




        p.__id = p.city_id || `${p.city_name || "city"}_${i}`;




        p.__city_name = p.city_name || p.city || p.name || "";




        p.__country = p.country || "";









        EMOTIONS.forEach(e => {




          p[e.key] = n(p[e.key]);




        });









        return {




          type: "Feature",




          properties: p,




          geometry: f.geometry




        };




      });




  }









  function computeAvg(fs) {




    const avg = {};




    EMOTIONS.forEach(e => avg[e.key] = 0);









    if (!fs.length) return avg;









    fs.forEach(f => {




      const p = f.properties || {};




      EMOTIONS.forEach(e => {




        avg[e.key] += n(p[e.key]);




      });




    });









    EMOTIONS.forEach(e => {




      avg[e.key] = avg[e.key] / fs.length;




    });









    return avg;




  }









  function defaultFeature() {




    return features.find(f => /toronto/i.test(cityName(f)) && /canada/i.test(countryName(f))) ||




           features.find(f => /toronto/i.test(cityName(f))) ||




           features[0] ||




           null;




  }









  function sortedFeatures() {




    return features.slice().sort((a, b) => {




      const aa = cityLabel(a).toLowerCase();




      const bb = cityLabel(b).toLowerCase();




      return aa.localeCompare(bb);




    });




  }









  function buildDom() {




    const root = document.getElementById("scene2-comparison");




    if (!root) return false;









    
    root.innerHTML = `
      <div class="s2f-shell">
        <h2 class="s2f-title">Heat perception - Emotion</h2>

        <div class="s2f-baseline-block">
          <div class="s2f-baseline-title">Stable emotional baseline</div>
          <div class="s2f-stackbox">
            <div id="s2fStack" class="s2f-stack"></div>
            <div id="s2fStackLabels" class="s2f-stack-labels"></div>
          </div>
        </div>

        <div class="s2f-desc">
          Sadness, Surprise, and Neutral together account for two-thirds of heat perception — but 1 in 6 tweets express Joy.
        </div>

        <div class="s2f-grid">
          <div class="s2f-card s2f-left">
            <div class="s2f-map-head">
              <div class="s2f-map-title">Global city map</div>
              <div id="s2fMapMeta" class="s2f-map-meta">50 cities</div>
            </div>

            <div id="s2fPills" class="s2f-pills"></div>

            <div id="s2fMap" class="s2f-map">
              <div id="s2fMapNotice" class="s2f-map-notice">Loading map...</div>
            </div>
          </div>

          <div class="s2f-card s2f-right">
            <div class="s2f-profile-head">
              <div>
                <div class="s2f-profile-title">Emotion profile</div>
                
                <div class="s2f-legend">
                  <span class="s2f-legend-item"><span class="s2f-dot s2f-dot-global"></span><span>Global</span></span>
                  <span class="s2f-legend-item"><span class="s2f-dot s2f-dot-city"></span><span id="s2fLegendCity">Toronto</span></span>
                </div>
              </div>

              <div class="s2f-city-picker">
                <button id="s2fCityBtn" class="s2f-city-btn" type="button">
                  <span id="s2fCityBtnLabel" class="s2f-city-label">Toronto, Canada</span>
                </button>
                <div id="s2fCityMenu" class="s2f-city-menu">
                  <input id="s2fCitySearch" class="s2f-city-search" type="text" placeholder="Search city..." />
                  <div id="s2fCityList" class="s2f-city-list"></div>
                </div>
              </div>
            </div>

            <div class="s2f-radar-wrap">
              <canvas id="s2fRadar"></canvas>
            </div>

            <div id="s2fMetrics" class="s2f-metrics"></div>

            <button class="s2f-compare" type="button">+ Add city to compare</button>
          </div>
        </div>
      </div>
    `;

    return true;





  }









  function renderPills() {




    const wrap = document.getElementById("s2fPills");




    if (!wrap) return;









    wrap.innerHTML = EMOTIONS.map(e => `




      <button class="s2f-pill ${e.key === currentEmotion ? "is-active" : ""}"




              type="button"




              data-emotion="${e.key}"




              style="--emotion-color:${e.color}">




        <span class="s2f-emoji">${e.emoji}</span>




        <span>${e.label}</span>




      </button>




    `).join("");









    wrap.querySelectorAll(".s2f-pill").forEach(btn => {




      btn.addEventListener("click", () => {




        currentEmotion = btn.dataset.emotion || "Joy";




        renderPills();




        updateMapPaint();




      });




    });




  }









  function renderStack(featureArg) {


  /*


    XLP slim stack source patch


    Rule:


    - value >= 10.0: FullName + value


    - value <  10.0: FullName only


    - bar widths remain proportional to values


  */





  try {


    if (typeof ensureSelectedCity === "function") {


      ensureSelectedCity();


    }


  } catch (e) {}





  const bars =


    document.getElementById("s2cleanStackBars") ||


    document.getElementById("scene2StackBars") ||


    document.getElementById("xlp2StackBars") ||


    document.getElementById("s2fStack");





  const labels =


    document.getElementById("s2cleanStackLabels") ||


    document.getElementById("scene2StackLabels") ||


    document.getElementById("xlp2StackLabels") ||


    document.getElementById("s2fStackLabels");





  if (!bars || !labels) return;





  const emotionList = (typeof EMOTIONS !== "undefined" && Array.isArray(EMOTIONS))


    ? EMOTIONS


    : [


        { key: "Joy", label: "Joy", short: "Joy", color: "#f2a32f" },


        { key: "Surprise", label: "Surprise", short: "Surprise", color: "#8b7cff" },


        { key: "Neutral", label: "Neutral", short: "Neutral", color: "#8e8e86" },


        { key: "Sadness", label: "Sadness", short: "Sadness", color: "#3a97e8" },


        { key: "Fear", label: "Fear", short: "Fear", color: "#5267d8" },


        { key: "Disgust", label: "Disgust", short: "Disgust", color: "#29a982" },


        { key: "Anger", label: "Anger", short: "Anger", color: "#e55757" }


      ];





  let selected = null;





  if (featureArg && featureArg.properties) {


    selected = featureArg;


  } else {


    try {


      if (typeof state !== "undefined" && state && state.selectedCity) {


        selected = state.selectedCity;


      }


    } catch (e) {}





    try {


      if (!selected && typeof selectedFeature !== "undefined" && selectedFeature) {


        selected = selectedFeature;


      }


    } catch (e) {}


  }





  if (!selected) return;





  const profile =
    (typeof globalAvg !== "undefined" && globalAvg && Object.keys(globalAvg).length)
      ? globalAvg
      : (selected.properties || selected.emotions || selected.profile || {});





  const fullNameMap = {


    joy: "Joy",


    surprise: "Surprise",


    neutral: "Neutral",


    sadness: "Sadness",


    fear: "Fear",


    disgust: "Disgust",


    anger: "Anger",


    Joy: "Joy",


    Surprise: "Surprise",


    Neutral: "Neutral",


    Sadness: "Sadness",


    Fear: "Fear",


    Disgust: "Disgust",


    Anger: "Anger",


    Sur: "Surprise",


    Neu: "Neutral",


    Sad: "Sadness",


    Dis: "Disgust",


    Ang: "Anger"


  };





  function cleanName(s) {


    return String(s || "")


      .replace(/[😊😮😲😐😢😥😨🤢😡🤬]/g, "")


      .replace(/\s+/g, " ")


      .trim();


  }





  function fullName(e) {


    const candidates = [


      e.dataKey,


      e.key,


      e.short,


      cleanName(e.label),


      cleanName(e.name)


    ].filter(Boolean);





    for (const c of candidates) {


      if (fullNameMap[c]) return fullNameMap[c];


      const lower = String(c).toLowerCase();


      if (fullNameMap[lower]) return fullNameMap[lower];


    }





    return cleanName(e.label || e.key || "");


  }





  function emotionValue(e) {


    const name = fullName(e);


    const keys = [


      e.key,


      e.dataKey,


      name,


      name.toLowerCase(),


      name.toUpperCase(),


      e.short


    ].filter(Boolean);





    for (const k of keys) {


      if (profile[k] != null) {


        const v = Number(profile[k]);


        if (Number.isFinite(v)) return v;


      }


    }





    return 0;


  }





  function emotionColor(e) {


    return e.color || {


      Joy: "#f2a32f",


      Surprise: "#8b7cff",


      Neutral: "#8e8e86",


      Sadness: "#3a97e8",


      Fear: "#5267d8",


      Disgust: "#29a982",


      Anger: "#e55757"


    }[fullName(e)] || "#999999";


  }





  const values = emotionList.map(e => {


    const v = emotionValue(e);


    return Number.isFinite(v) && v > 0 ? v : 0.001;


  });





  const total = values.reduce((a, b) => a + b, 0);





  bars.style.setProperty("display", "flex", "important");


  bars.style.setProperty("grid-template-columns", "none", "important");


  bars.style.setProperty("gap", "6px", "important");





  labels.style.setProperty("display", "flex", "important");


  labels.style.setProperty("grid-template-columns", "none", "important");


  labels.style.setProperty("gap", "6px", "important");





  bars.innerHTML = emotionList.map((e, i) => {


    const v = values[i];


    const pct = total > 0 ? (v / total) * 100 : 100 / emotionList.length;





    return (


      '<div class="s2clean-stack-seg xlp2-stack-seg s2f-stack-seg" ' +


      'data-xlp-stack-emotion="' + fullName(e) + '" ' +


      'style="' +


      'background:' + emotionColor(e) + ';' +


      'flex:' + v.toFixed(4) + ' 1 0%;' +


      'width:' + pct.toFixed(4) + '%;' +


      'min-width:0;' +


      '"></div>'


    );


  }).join("");





  labels.innerHTML = emotionList.map((e, i) => {


    const v = values[i];


    const pct = total > 0 ? (v / total) * 100 : 100 / emotionList.length;


    const realValue = emotionValue(e);


    const name = fullName(e);


    const labelText = name + " " + realValue.toFixed(1) + "%";





    return (


      '<div class="s2clean-stack-label xlp2-stack-label s2f-stack-label" ' +


      'data-xlp-stack-emotion="' + name + '" ' +


      'data-xlp-stack-value="' + realValue.toFixed(3) + '" ' +


      'data-xlp-stack-small="' + (isSmall ? "1" : "0") + '" ' +


      'style="' +


      'flex:' + v.toFixed(4) + ' 1 0%;' +


      'width:' + pct.toFixed(4) + '%;' +


      'min-width:0;' +


      'text-align:center;' +


      'white-space:nowrap;' +


      'overflow:visible;' +


      'color:#111111;' +


      'font-size:11px;' +


      'font-weight:850;' +


      'line-height:1.25;' +


      '">' + labelText + '</div>'


    );


  }).join("");


}









  function renderMetrics(feature) {




    const wrap = document.getElementById("s2fMetrics");




    if (!wrap || !feature) return;









    const p = feature.properties || {};




    const top = EMOTIONS.map(e => ({




      key: e.key,




      label: e.label,




      emoji: e.emoji,




      color: e.color,




      value: n(p[e.key])




    }))




    .sort((a, b) => b.value - a.value)




    .slice(0, 3);









    const ranks = ["highest", "second", "third"];









    wrap.innerHTML = top.map((d, i) => `




      <div class="s2f-metric">




        <div class="s2f-metric-value" style="color:${d.color}; -webkit-text-fill-color:${d.color};">${f1(d.value)}%</div>




        <div class="s2f-metric-name"><span class="s2f-emoji">${d.emoji}</span> ${d.label}</div>




        <div class="s2f-metric-rank">${ranks[i]}</div>




      </div>




    `).join("");




  }









  function radarMax(feature) {




    const vals = RADAR_KEYS.map(k => n(feature.properties[k])).concat(RADAR_KEYS.map(k => n(globalAvg[k])));




    return Math.max(30, Math.ceil(Math.max.apply(null, vals) / 10) * 10);




  }









  function renderRadar() {
  window.__XLP_SCENE2_COMPARE_RENDER_RADAR__ = renderRadar;

  try {
    if (typeof ensureSelectedCity === "function") {
      ensureSelectedCity();
    }
  } catch (e) {}

  const mount =
    document.getElementById("xlp2Radar") ||
    document.getElementById("s2cleanRadar") ||
    document.querySelector("#scene2-comparison .xlp2-radar") ||
    document.querySelector("#scene2-comparison .s2clean-radar") ||
    document.querySelector("#scene2-comparison .scene2-radar");

  if (!mount) return;

  const ORDER = ["joy", "surprise", "neutral", "sadness", "fear", "disgust", "anger"];

  const LABELS = {
    joy: "😊 Joy",
    surprise: "😲 Surprise",
    neutral: "😐 Neutral",
    sadness: "😥 Sadness",
    fear: "😨 Fear",
    disgust: "🤢 Disgust",
    anger: "🤬 Anger"
  };

  const CITY_COLOR = "#ff5b9a";
  const GLOBAL_COLOR = "#4e8df5";
  const COMPARE_COLOR = "#f59e0b";
  const MAX_VALUE = 30;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function norm(s) {
    return String(s || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function n(v) {
    const x = Number(v);
    return Number.isFinite(x) ? x : 0;
  }

  function readValue(obj, key) {
    if (!obj) return 0;

    const title = key.charAt(0).toUpperCase() + key.slice(1);

    const keys = [
      key,
      title,
      key.toLowerCase(),
      key.toUpperCase()
    ];

    for (const k of keys) {
      if (obj[k] != null) return n(obj[k]);
    }

    return 0;
  }

  function profileOf(item) {
    const raw =
      (item && item.emotions) ||
      (item && item.profile) ||
      (item && item.properties) ||
      item ||
      {};

    const out = {};
    ORDER.forEach(k => out[k] = readValue(raw, k));

    const maxv = Math.max.apply(null, ORDER.map(k => out[k] || 0));
    if (maxv > 0 && maxv <= 1.5) {
      ORDER.forEach(k => out[k] *= 100);
    }

    return out;
  }

  function nameOf(item) {
    const p = item && item.properties ? item.properties : item || {};
    return p.city_name || p.city || p.name || "City";
  }

  function countryOf(item) {
    const p = item && item.properties ? item.properties : item || {};
    return p.country || "";
  }

  function legendCountryCode(country) {
    const key = String(country || "")
      .trim()
      .toLowerCase();

    const map = {
      "united states": "US",
      "united states of america": "US",
      "usa": "US",
      "us": "US",

      "canada": "CA",
      "ca": "CA",

      "united kingdom": "UK",
      "great britain": "UK",
      "uk": "UK",

      "australia": "AU",
      "au": "AU",

      "france": "FR",
      "fr": "FR",

      "mexico": "MX",
      "mx": "MX"
    };

    return (
      map[key] ||
      String(country || "").trim()
    );
  }


  function legendLabelOf(item) {
    const city = nameOf(item);
    const code = legendCountryCode(
      countryOf(item)
    );

    return code
      ? city + ", " + code
      : city;
  }


  function idOf(item, i) {
    const p = item && item.properties ? item.properties : item || {};
    return String(p.city_id || p.id || (nameOf(item) + "|" + countryOf(item) + "|" + (i || 0)));
  }

  function getRawFeatures() {
    const fc =
      window.__CITY_SUMMARY_GEOJSON__ ||
      window.CITY_SUMMARY_GEOJSON ||
      null;

    if (fc && Array.isArray(fc.features)) return fc.features;
    return [];
  }

  function featureToCity(f, i) {
    const p = f.properties || {};
    const c = f.geometry && f.geometry.coordinates;

    return {
      city_id: p.city_id || p.id || (nameOf(f) + "|" + countryOf(f) + "|" + i),
      city: nameOf(f),
      country: countryOf(f),
      lon: c && c.length ? n(c[0]) : 0,
      lat: c && c.length ? n(c[1]) : 0,
      emotions: profileOf(p),
      properties: p
    };
  }

  function getCities() {
    return getRawFeatures().map(featureToCity).filter(Boolean);
  }

  function globalProfile() {
    const cities = getCities();
    const out = {};
    ORDER.forEach(k => out[k] = 0);

    cities.forEach(d => {
      const p = profileOf(d);
      ORDER.forEach(k => out[k] += p[k] || 0);
    });

    ORDER.forEach(k => {
      out[k] = cities.length ? out[k] / cities.length : 0;
    });

    return out;
  }

  function getSelectedFromState() {
    try {
      if (typeof state !== "undefined" && state && state.selectedCity) {
        return state.selectedCity;
      }
    } catch (e) {}

    try {
      if (typeof selectedFeature !== "undefined" && selectedFeature) {
        return selectedFeature;
      }
    } catch (e) {}

    return null;
  }

  function getCurrentCityText() {
    const pill =
      document.getElementById("xlp2CityPill") ||
      document.getElementById("s2cleanCityPill") ||
      document.getElementById("scene2ProfileCity");

    return pill ? pill.textContent : "";
  }

  function findCurrentCity() {
    const selected = getSelectedFromState();
    if (selected) return selected;

    const cities = getCities();
    const text = norm(getCurrentCityText());

    if (!text) return cities[0] || null;

    let found = cities.find(d => norm(d.city + ", " + d.country) === text);
    if (found) return found;

    found = cities.find(d => {
      const name = norm(d.city);
      const country = norm(d.country);
      return text.includes(name) && (!country || text.includes(country));
    });

    return found || cities[0] || null;
  }

  function findCompareCity() {
    const id = String(window.__XLP_COMPARE_CITY_ID__ || "");
    if (!id) return null;

    return getCities().find((d, i) => String(d.city_id) === id || idOf(d, i) === id) || null;
  }

  function polar(cx, cy, r, deg) {
    const rad = deg * Math.PI / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }

  function polygonPoints(profile, cx, cy, radius, maxValue) {
    return ORDER.map((key, i) => {
      const value = Math.max(0, Math.min(maxValue, profile[key] || 0));
      const p = polar(cx, cy, radius * value / maxValue, -90 + i * 360 / ORDER.length);
      return p.x.toFixed(2) + "," + p.y.toFixed(2);
    }).join(" ");
  }

  function dots(profile, cx, cy, radius, maxValue, color, strokeWidth) {
    return ORDER.map((key, i) => {
      const value = Math.max(0, Math.min(maxValue, profile[key] || 0));
      const p = polar(cx, cy, radius * value / maxValue, -90 + i * 360 / ORDER.length);

      return (
        '<circle cx="' + p.x.toFixed(2) + '" cy="' + p.y.toFixed(2) + '" r="3.8" ' +
        'fill="' + color + '" stroke="#333333" stroke-width="' + strokeWidth + '"></circle>'
      );
    }).join("");
  }

  const current = findCurrentCity();
  if (!current) return;

  const currentProfile = profileOf(current);
  const compareCity = findCompareCity();
  const globalP = globalProfile();

  const w = Math.max(360, mount.clientWidth || 420);
  const h = Math.max(380, mount.clientHeight || 430);
  const cx = w / 2;
  const cy = h / 2 + 2;
  const radius = Math.min(w, h) * 0.28;
  const labelRadius = radius + 44;

  const grid = [1, 2, 3, 4, 5].map(level => {
    const r = radius * level / 5;
    const pts = ORDER.map((key, i) => {
      const p = polar(cx, cy, r, -90 + i * 360 / ORDER.length);
      return p.x.toFixed(2) + "," + p.y.toFixed(2);
    }).join(" ");

    return '<polygon points="' + pts + '" fill="none" stroke="rgba(51,51,51,0.18)" stroke-width="1"></polygon>';
  }).join("");

  const axes = ORDER.map((key, i) => {
    const p = polar(cx, cy, radius, -90 + i * 360 / ORDER.length);
    return '<line x1="' + cx + '" y1="' + cy + '" x2="' + p.x.toFixed(2) + '" y2="' + p.y.toFixed(2) + '" fill="none" stroke="rgba(51,51,51,0.18)" stroke-width="1"></line>';
  }).join("");

  const labels = ORDER.map((key, i) => {
    const p = polar(cx, cy, labelRadius, -90 + i * 360 / ORDER.length);
    const anchor = p.x < cx - 8 ? "end" : (p.x > cx + 8 ? "start" : "middle");

    return (
      '<text x="' + p.x.toFixed(2) + '" y="' + p.y.toFixed(2) + '" ' +
      'text-anchor="' + anchor + '" dominant-baseline="middle" ' +
      'font-size="14" font-weight="850" fill="#333333">' + esc(LABELS[key]) + '</text>'
    );
  }).join("");

  let compareLine = "";

  if (compareCity) {
    compareLine =
      '<polygon points="' + polygonPoints(profileOf(compareCity), cx, cy, radius, MAX_VALUE) + '" ' +
      'fill="none" stroke="' + COMPARE_COLOR + '" stroke-width="2.4" stroke-dasharray="7 6"></polygon>' +
      dots(profileOf(compareCity), cx, cy, radius, MAX_VALUE, COMPARE_COLOR, 1.2);
  }

  mount.innerHTML =
    '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Emotion radar">' +
      grid +
      axes +
      '<polygon points="' + polygonPoints(globalP, cx, cy, radius, MAX_VALUE) + '" ' +
      'fill="none" stroke="' + GLOBAL_COLOR + '" stroke-width="2" stroke-dasharray="6 6"></polygon>' +
      compareLine +
      '<polygon points="' + polygonPoints(currentProfile, cx, cy, radius, MAX_VALUE) + '" ' +
      'fill="rgba(255,91,154,0.18)" stroke="' + CITY_COLOR + '" stroke-width="2.2"></polygon>' +
      dots(globalP, cx, cy, radius, MAX_VALUE, GLOBAL_COLOR, 1.15) +
      dots(currentProfile, cx, cy, radius, MAX_VALUE, CITY_COLOR, 1.35) +
      labels +
    '</svg>';

  const legend =
    document.querySelector("#scene2-comparison .xlp2-legend") ||
    document.querySelector("#scene2-comparison .s2clean-legend") ||
    document.querySelector("#scene2-comparison .scene2-legend") ||
    document.querySelector("#scene2-comparison .s2f-legend");

  if (legend) {
    const compareLegend = compareCity
      ? '<span><i style="display:inline-block;width:9px;height:9px;margin-right:6px;border-radius:999px;background:' + COMPARE_COLOR + ';vertical-align:middle;"></i>' + esc(legendLabelOf(compareCity)) + '</span>'
      : '';

    legend.innerHTML =
      '<span><i style="display:inline-block;width:9px;height:9px;margin-right:6px;border-radius:999px;background:' + GLOBAL_COLOR + ';vertical-align:middle;"></i>Global</span>' +
      '<span><i style="display:inline-block;width:9px;height:9px;margin-right:6px;border-radius:999px;background:' + CITY_COLOR + ';vertical-align:middle;"></i>' + esc(legendLabelOf(current)) + '</span>' +
      compareLegend;
  }
}









  function renderCityMenu(filterText = "") {




    const list = document.getElementById("s2fCityList");




    if (!list) return;









    const q = filterText.trim().toLowerCase();









    const rows = sortedFeatures().filter(f => {




      if (!q) return true;




      return cityLabel(f).toLowerCase().includes(q);




    });









    list.innerHTML = rows.map(f => {




      const selected = selectedFeature && f.properties.__id === selectedFeature.properties.__id;




      return `




        <button type="button"




                class="s2f-city-option ${selected ? "is-selected" : ""}"




                data-id="${f.properties.__id}">




          <span>${cityName(f)}</span>




          <span class="s2f-country">${countryName(f)}</span>




        </button>




      `;




    }).join("");









    list.querySelectorAll(".s2f-city-option").forEach(btn => {




      btn.addEventListener("click", () => {




        const id = btn.dataset.id;




        const f = features.find(x => x.properties.__id === id);




        if (f) {




          selectCity(f, { fly: true });




          closeCityMenu();




        }




      });




    });




  }









  function openCityMenu() {




    const menu = document.getElementById("s2fCityMenu");




    const search = document.getElementById("s2fCitySearch");




    if (!menu) return;









    menu.classList.add("is-open");




    renderCityMenu(search ? search.value : "");









    if (search) {




      setTimeout(() => search.focus(), 50);




    }




  }









  function closeCityMenu() {




    const menu = document.getElementById("s2fCityMenu");




    if (menu) menu.classList.remove("is-open");




  }









  function bindCityPicker() {




    const btn = document.getElementById("s2fCityBtn");




    const search = document.getElementById("s2fCitySearch");









    if (btn && !btn.dataset.bound) {




      btn.dataset.bound = "1";




      btn.addEventListener("click", ev => {




        ev.stopPropagation();




        const menu = document.getElementById("s2fCityMenu");




        if (menu && menu.classList.contains("is-open")) closeCityMenu();




        else openCityMenu();




      });




    }









    if (search && !search.dataset.bound) {




      search.dataset.bound = "1";




      search.addEventListener("input", () => renderCityMenu(search.value));




      search.addEventListener("click", ev => ev.stopPropagation());




    }









    document.addEventListener("click", ev => {




      const picker = document.querySelector("#scene2-comparison .s2f-city-picker");




      if (picker && !picker.contains(ev.target)) closeCityMenu();




    });




  }









  function updateLabels(feature) {




    const city = cityName(feature);




    const label = cityLabel(feature);









    const btnLabel = document.getElementById("s2fCityBtnLabel");




    const legendCity = document.getElementById("s2fLegendCity");









    if (btnLabel) btnLabel.textContent = label;




    if (legendCity) legendCity.textContent = legendLabel(feature);









    const meta = document.getElementById("s2fMapMeta");




    if (meta) {




      meta.textContent = `${features.length} cities · ${emotion(currentEmotion).emoji} ${currentEmotion}`;




    }




  }









  function selectCity(feature, opts = {}) {




    if (!feature) return;









    selectedFeature = feature;









    updateLabels(feature);




    renderStack(feature);




    renderRadar(feature);




    renderMetrics(feature);




    renderCityMenu(document.getElementById("s2fCitySearch") ? document.getElementById("s2fCitySearch").value : "");









    if (map && map.getLayer("s2f-selected-halo")) {




      map.setFilter("s2f-selected-halo", ["==", ["get", "__id"], feature.properties.__id]);




    }









    if (map && opts.fly && feature.geometry && Array.isArray(feature.geometry.coordinates)) {




      try {




        map.easeTo({




          center: feature.geometry.coordinates,




          zoom: Math.max(map.getZoom(), 2.4),




          duration: 700




        });




      } catch (e) {}




    }









    console.log("[Scene2 Final] selected:", cityLabel(feature));




  }









  function mapData() {




    return {




      type: "FeatureCollection",




      features




    };




  }









  function updateMapPaint() {




    if (!map || !map.getLayer("s2f-city-points")) return;









    const e = emotion(currentEmotion);









    map.setPaintProperty("s2f-city-points", "circle-color", e.color);




    map.setPaintProperty("s2f-city-points", "circle-radius", [




      "interpolate",




      ["linear"],




      ["coalesce", ["to-number", ["get", currentEmotion]], 0],




      0, 5.5,




      10, 7.5,




      20, 10.5,




      35, 15.5




    ]);




    map.setPaintProperty("s2f-city-points", "circle-opacity", [




      "interpolate",




      ["linear"],




      ["coalesce", ["to-number", ["get", currentEmotion]], 0],




      0, 0.50,




      20, 0.84,




      40, 0.96




    ]);









    updateLabels(selectedFeature);




  }










  function restyleMapboxBase() {
    if (!map) return;

    const bgColor = "#f5f6f7";      // 海洋/背景：接近页面浅白
    const landColor = "#d9d9d9";    // 陆地：灰色
    const parkColor = "#e5e5e5";    // 公园/绿地也统一偏灰

    try {
      const style = map.getStyle();
      const layers = (style && style.layers) ? style.layers : [];

      layers.forEach(layer => {
        const id = (layer.id || "").toLowerCase();
        const type = layer.type;

        // 背景
        if (type === "background") {
          try { map.setPaintProperty(layer.id, "background-color", bgColor); } catch(e) {}
        }

        // 海洋 / 水体
        if (/(water|ocean|river|lake|sea)/i.test(id)) {
          if (type === "fill") {
            try { map.setPaintProperty(layer.id, "fill-color", bgColor); } catch(e) {}
            try { map.setPaintProperty(layer.id, "fill-opacity", 1); } catch(e) {}
          }
          if (type === "line") {
            try { map.setPaintProperty(layer.id, "line-color", bgColor); } catch(e) {}
            try { map.setPaintProperty(layer.id, "line-opacity", 1); } catch(e) {}
          }
        }

        // 陆地
        if (/(^land$|land-|landcover|landuse|hillshade|contour)/i.test(id)) {
          if (type === "fill") {
            try { map.setPaintProperty(layer.id, "fill-color", landColor); } catch(e) {}
            try { map.setPaintProperty(layer.id, "fill-opacity", 1); } catch(e) {}
          }
          if (type === "line") {
            try { map.setPaintProperty(layer.id, "line-color", landColor); } catch(e) {}
          }
        }

        // 公园 / 绿地 / 草地：也偏灰，不要绿色太跳
        if (/(park|grass|greenspace|wood|forest|scrub)/i.test(id)) {
          if (type === "fill") {
            try { map.setPaintProperty(layer.id, "fill-color", parkColor); } catch(e) {}
            try { map.setPaintProperty(layer.id, "fill-opacity", 1); } catch(e) {}
          }
        }
      });

      // 容器本身背景也设成浅白
      const mapEl = document.getElementById("s2fMap");
      if (mapEl) mapEl.style.background = bgColor;

    } catch (err) {
      console.warn("[scene2] restyleMapboxBase failed:", err);
    }
  }


  function initMap() {




    const el = document.getElementById("s2fMap");




    const notice = document.getElementById("s2fMapNotice");









    if (!el) return;









    if (!window.mapboxgl) {




      if (notice) notice.textContent = "Mapbox is not loaded.";




      return;




    }









    const token =




      window.MAPBOX_ACCESS_TOKEN ||




      window.MAPBOX_TOKEN ||




      window.mapboxToken ||




      window.mapboxgl.accessToken;









    if (!token) {




      if (notice) notice.textContent = "Mapbox token is missing.";




      return;




    }









    window.mapboxgl.accessToken = token;









    if (window.__XLP_SCENE2_FINAL_MAP__) {




      try { window.__XLP_SCENE2_FINAL_MAP__.remove(); } catch (e) {}




      window.__XLP_SCENE2_FINAL_MAP__ = null;




    }









    el.innerHTML = "";









    map = new mapboxgl.Map({




      container: "s2fMap",




      style: "mapbox://styles/mapbox/light-v11",




      center: [-34, 34],




      zoom: 1.08,




      projection: "mercator",




      attributionControl: true,




      interactive: true




    });









    window.__XLP_SCENE2_FINAL_MAP__ = map;









    map.dragRotate.disable();




    map.touchZoomRotate.disableRotation();









    map.on("load", () => {




      map.addSource("s2f-cities", {




        type: "geojson",




        data: mapData()




      });









      map.addLayer({




        id: "s2f-selected-halo",




        type: "circle",




        source: "s2f-cities",




        filter: ["==", ["get", "__id"], selectedFeature ? selectedFeature.properties.__id : ""],




        paint: {




          "circle-radius": 15,




          "circle-color": "#ff5b91",




          "circle-opacity": 0.30,




          "circle-stroke-color": "rgba(0,0,0,0)",




          "circle-stroke-width": 0




        }




      });









      map.addLayer({




        id: "s2f-city-points",




        type: "circle",




        source: "s2f-cities",




        paint: {




          "circle-color": emotion(currentEmotion).color,




          "circle-radius": [




            "interpolate",




            ["linear"],




            ["coalesce", ["to-number", ["get", currentEmotion]], 0],




            0, 5.5,




            10, 7.5,




            20, 10.5,




            35, 15.5




          ],




          "circle-opacity": 0.86,




          "circle-stroke-color": "rgba(0,0,0,0)",




          "circle-stroke-width": 0




        }




      });









      const popup = new mapboxgl.Popup({




        closeButton: false,




        closeOnClick: false,




        offset: 14




      });









      map.on("mouseenter", "s2f-city-points", () => {




        map.getCanvas().style.cursor = "pointer";




      });









      map.on("mouseleave", "s2f-city-points", () => {




        map.getCanvas().style.cursor = "";




        popup.remove();




      });









      map.on("mousemove", "s2f-city-points", ev => {




        const f = ev.features && ev.features[0];




        if (!f) return;









        const p = f.properties || {};




        const e = emotion(currentEmotion);




        const val = n(p[currentEmotion]);









        
        const popupCity =
          p.__city_name ||
          p.city_name ||
          p.city ||
          p.name ||
          "Unknown city";

        const popupCountry =
          p.__country ||
          p.country ||
          p.country_name ||
          "";

        const popupLocation =
          popupCity +
          (popupCountry ? ", " + popupCountry : "");

        const safePopupLocation = String(popupLocation)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");

        popup
          .setLngLat(f.geometry.coordinates)
          .setHTML(
            '<div class="xlp-scene2-map-popup" ' +
                 'style="font-family:Microsoft YaHei,Arial,sans-serif;' +
                        'min-width:170px;' +
                        'visibility:visible !important;' +
                        'opacity:1 !important;">' +

              '<div class="xlp-scene2-map-popup-location" ' +
                   'style="display:block !important;' +
                          'color:#222222 !important;' +
                          '-webkit-text-fill-color:#222222 !important;' +
                          'font-size:14px !important;' +
                          'font-weight:900 !important;' +
                          'line-height:1.35 !important;' +
                          'margin:0 0 5px !important;' +
                          'visibility:visible !important;' +
                          'opacity:1 !important;">' +
                safePopupLocation +
              '</div>' +

              '<div class="xlp-scene2-map-popup-emotion" ' +
                   'style="display:block !important;' +
                          'color:' + e.color + ' !important;' +
                          '-webkit-text-fill-color:' + e.color + ' !important;' +
                          'font-size:13px !important;' +
                          'font-weight:850 !important;' +
                          'line-height:1.35 !important;' +
                          'visibility:visible !important;' +
                          'opacity:1 !important;">' +
                e.emoji +
                ' ' +
                currentEmotion +
                ': ' +
                f1(val) +
                '%' +
              '</div>' +

            '</div>'
          )
          .addTo(map);




      });









      map.on("click", "s2f-city-points", ev => {




        const f = ev.features && ev.features[0];




        if (!f) return;









        const id = f.properties && f.properties.__id;




        const original = features.find(x => x.properties.__id === id);




        if (original) selectCity(original, { fly: false });




      });









      updateMapPaint();









      setTimeout(() => {




        try { map.resize(); } catch (e) {}




      }, 300);




    });









    window.addEventListener("resize", () => {




      if (map) {




        setTimeout(() => {




          try { map.resize(); } catch (e) {}




        }, 120);




      }




    });




  }









  function boot() {




    if (booted) return;









    features = getDataFeatures();









    if (!features.length) {




      setTimeout(boot, 300);




      return;




    }









    booted = true;




    globalAvg = computeAvg(features);









    buildDom();




    renderPills();




    bindCityPicker();









    selectedFeature = defaultFeature();




    if (selectedFeature) {




      selectCity(selectedFeature);




    }









    initMap();









    console.log("[Scene2 Final] loaded:", features.length, "cities");




  }









  if (document.readyState === "loading") {




    document.addEventListener("DOMContentLoaded", boot);




  } else {




    boot();




  }









  window.addEventListener("load", () => {




    setTimeout(boot, 300);




  });




})();














/* XLP_DIRECT_SCENE2_RADAR_SVG_START */




(function () {




  "use strict";









  if (window.__XLP_DIRECT_SCENE2_RADAR_SVG__) return;




  window.__XLP_DIRECT_SCENE2_RADAR_SVG__ = true;









  const EMOTIONS = [




    { key: "Joy", emoji: "😊" },




    { key: "Surprise", emoji: "😲" },




    { key: "Neutral", emoji: "😐" },




    { key: "Sadness", emoji: "😢" },




    { key: "Fear", emoji: "😨" },




    { key: "Disgust", emoji: "🤢" },




    { key: "Anger", emoji: "😡" }




  ];









  const FALLBACK_CITY = {




    Joy: 21.9,




    Surprise: 21.0,




    Neutral: 20.3,




    Sadness: 18.4,




    Fear: 6.4,




    Disgust: 3.2,




    Anger: 8.8




  };









  const FALLBACK_GLOBAL = {




    Joy: 17.2,




    Surprise: 18.5,




    Neutral: 19.6,




    Sadness: 20.8,




    Fear: 7.3,




    Disgust: 3.9,




    Anger: 10.4




  };









  function injectStyle() {




    if (document.getElementById("xlp-direct-scene2-radar-svg-style")) return;









    const style = document.createElement("style");




    style.id = "xlp-direct-scene2-radar-svg-style";









    style.textContent = `




      #scene2-comparison .scene2-radar-wrap {




        position: relative !important;




        width: 100% !important;




        height: 420px !important;




        min-height: 420px !important;




        margin: 8px 0 26px !important;




        display: flex !important;




        align-items: center !important;




        justify-content: center !important;




        overflow: visible !important;




        background: transparent !important;




        border: none !important;




        box-shadow: none !important;




      }









      #scene2-comparison #scene2Radar {




        display: none !important;




        visibility: hidden !important;




        opacity: 0 !important;




        pointer-events: none !important;




      }









      #scene2-comparison .xlp-radar-overlay {




        display: none !important;




        visibility: hidden !important;




        opacity: 0 !important;




      }









      #xlpScene2RadarSvg {




        width: min(100%, 470px) !important;




        height: 420px !important;




        display: block !important;




        position: relative !important;




        z-index: 9999 !important;




        overflow: visible !important;




      }









      #xlpScene2RadarSvg svg {




        width: 100% !important;




        height: 100% !important;




        overflow: visible !important;




        display: block !important;




      }









      #xlpScene2RadarSvg .radar-grid {




        fill: none !important;




        stroke: rgba(51, 51, 51, 0.28) !important;




        stroke-width: 1.25 !important;




      }









      #xlpScene2RadarSvg .radar-axis {




        stroke: rgba(51, 51, 51, 0.20) !important;




        stroke-width: 1.1 !important;




      }









      #xlpScene2RadarSvg .radar-city {




        fill: rgba(255, 91, 147, 0.17) !important;




        stroke: #ff5b93 !important;




        stroke-width: 2.6 !important;




        stroke-linejoin: round !important;




      }









      #xlpScene2RadarSvg .radar-global {




        fill: rgba(45, 131, 230, 0.05) !important;




        stroke: #2d83e6 !important;




        stroke-width: 2.2 !important;




        stroke-dasharray: 7 6 !important;




        stroke-linejoin: round !important;




      }









      #xlpScene2RadarSvg .radar-point-city {




        fill: #ff5b93 !important;




        stroke: #333333 !important;




        stroke-width: 1.3 !important;




      }









      #xlpScene2RadarSvg .radar-point-global {




        fill: #2d83e6 !important;




        stroke: #333333 !important;




        stroke-width: 1.2 !important;




      }









      #xlpScene2RadarSvg .radar-label {




        font-family: "Microsoft YaHei", "Microsoft YaHei UI", "微软雅黑", Arial, sans-serif !important;




        font-size: 13.5px !important;




        font-weight: 850 !important;




        fill: #333333 !important;




        dominant-baseline: middle !important;




        paint-order: stroke !important;




        stroke: rgba(245, 248, 252, 0.96) !important;




        stroke-width: 3px !important;




        stroke-linejoin: round !important;




      }









      #xlpScene2RadarSvg .radar-debug {




        font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;




        font-size: 10px !important;




        fill: rgba(51, 51, 51, 0.45) !important;




      }









      #scene2-comparison .scene2-right,




      #scene2-comparison .scene2-right *:not(canvas) {




        color: #333333 !important;




        -webkit-text-fill-color: #333333 !important;




        text-shadow: none !important;




      }




    `;









    document.head.appendChild(style);




  }









  function safeNum(v) {




    const n = Number(v);




    return Number.isFinite(n) ? n : 0;




  }









  function getGeoData() {




    return window.CITY_SUMMARY_GEOJSON || window.__CITY_SUMMARY_GEOJSON__ || null;




  }









  function currentCityName() {




    const el = document.getElementById("scene2ProfileCity");




    const txt = el ? String(el.textContent || "").trim() : "Toronto, Canada";




    const parts = txt.split(",").map(s => s.trim());









    return {




      city: parts[0] || "Toronto",




      country: parts[1] || "Canada"




    };




  }









  function findCityFeature(features, city, country) {




    const c = String(city || "").toLowerCase();




    const k = String(country || "").toLowerCase();









    return (




      features.find(f =>




        String(f.properties.city_name || "").toLowerCase() === c &&




        String(f.properties.country || "").toLowerCase() === k




      ) ||




      features.find(f =>




        String(f.properties.city_name || "").toLowerCase() === c




      ) ||




      null




    );




  }









  function getGlobalAverage(features) {




    const out = {};









    EMOTIONS.forEach(e => {




      const vals = features.map(f => safeNum(f.properties[e.key]));




      out[e.key] = vals.reduce((a, b) => a + b, 0) / Math.max(vals.length, 1);




    });









    return out;




  }









  function getValues() {




    const geo = getGeoData();









    if (!geo || !geo.features || !geo.features.length) {




      return {




        city: FALLBACK_CITY,




        global: FALLBACK_GLOBAL,




        label: "Toronto, Canada",




        source: "fallback"




      };




    }









    const cur = currentCityName();




    const feature = findCityFeature(geo.features, cur.city, cur.country);









    const city = {};









    if (feature) {




      EMOTIONS.forEach(e => {




        city[e.key] = safeNum(feature.properties[e.key]);




      });




    } else {




      Object.assign(city, FALLBACK_CITY);




    }









    return {




      city,




      global: getGlobalAverage(geo.features),




      label: cur.city + (cur.country ? ", " + cur.country : ""),




      source: feature ? "data" : "fallback"




    };




  }









  function polar(cx, cy, r, angleDeg) {




    const rad = (angleDeg - 90) * Math.PI / 180;




    return {




      x: cx + r * Math.cos(rad),




      y: cy + r * Math.sin(rad)




    };




  }









  function polygon(cx, cy, r, n) {




    const pts = [];




    for (let i = 0; i < n; i++) {




      const p = polar(cx, cy, r, i * 360 / n);




      pts.push(`${p.x.toFixed(2)},${p.y.toFixed(2)}`);




    }




    return pts.join(" ");




  }









  function valuePolygon(values, maxVal, cx, cy, radius) {




    return EMOTIONS.map((e, i) => {




      const raw = safeNum(values[e.key]);




      const rr = radius * Math.max(0, Math.min(1, raw / maxVal));




      const p = polar(cx, cy, rr, i * 360 / EMOTIONS.length);




      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;




    }).join(" ");




  }









  function valuePoints(values, maxVal, cx, cy, radius) {




    return EMOTIONS.map((e, i) => {




      const raw = safeNum(values[e.key]);




      const rr = radius * Math.max(0, Math.min(1, raw / maxVal));




      const p = polar(cx, cy, rr, i * 360 / EMOTIONS.length);




      return { x: p.x, y: p.y };




    });




  }









  function anchor(x, cx) {




    if (x < cx - 20) return "end";




    if (x > cx + 20) return "start";




    return "middle";




  }









  function destroyOldChart() {




    const canvas = document.getElementById("scene2Radar");









    if (!canvas) return;









    try {




      if (window.Chart && typeof Chart.getChart === "function") {




        const chart = Chart.getChart(canvas);




        if (chart) chart.destroy();




      }




    } catch (e) {}









    canvas.style.setProperty("display", "none", "important");




    canvas.style.setProperty("visibility", "hidden", "important");




    canvas.style.setProperty("opacity", "0", "important");




    canvas.style.setProperty("pointer-events", "none", "important");




  }









  function renderSvgRadar() {




    injectStyle();









    const wrap = document.querySelector("#scene2-comparison .scene2-radar-wrap");




    if (!wrap) return false;









    destroyOldChart();









    wrap.querySelectorAll(".xlp-radar-overlay").forEach(el => {




      el.remove();




    });









    let mount = document.getElementById("xlpScene2RadarSvg");









    if (!mount) {




      mount = document.createElement("div");




      mount.id = "xlpScene2RadarSvg";




      mount.setAttribute("aria-label", "Emotion radar chart");




      wrap.appendChild(mount);




    }









    const vals = getValues();









    const W = 470;




    const H = 420;




    const cx = 235;




    const cy = 214;




    const radius = 122;




    const levels = 5;




    const n = EMOTIONS.length;









    let maxData = 0;









    EMOTIONS.forEach(e => {




      maxData = Math.max(maxData, safeNum(vals.city[e.key]), safeNum(vals.global[e.key]));




    });









    const maxVal = Math.max(30, Math.ceil(maxData / 5) * 5);









    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Emotion radar chart">`;









    for (let i = 1; i <= levels; i++) {




      const r = radius * i / levels;




      svg += `<polygon class="radar-grid" points="${polygon(cx, cy, r, n)}"></polygon>`;




    }









    for (let i = 0; i < n; i++) {




      const p = polar(cx, cy, radius, i * 360 / n);




      svg += `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${p.x.toFixed(2)}" y2="${p.y.toFixed(2)}"></line>`;




    }









    svg += `<polygon class="radar-global" points="${valuePolygon(vals.global, maxVal, cx, cy, radius)}"></polygon>`;




    svg += `<polygon class="radar-city" points="${valuePolygon(vals.city, maxVal, cx, cy, radius)}"></polygon>`;









    valuePoints(vals.global, maxVal, cx, cy, radius).forEach(p => {




      svg += `<circle class="radar-point-global" cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="3.2"></circle>`;




    });









    valuePoints(vals.city, maxVal, cx, cy, radius).forEach(p => {




      svg += `<circle class="radar-point-city" cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="3.8"></circle>`;




    });









    EMOTIONS.forEach((e, i) => {




      const p = polar(cx, cy, radius + 44, i * 360 / n);




      svg += `




        <text class="radar-label" x="${p.x.toFixed(2)}" y="${p.y.toFixed(2)}" text-anchor="${anchor(p.x, cx)}">




          <tspan>${e.emoji}</tspan><tspan> ${e.key}</tspan>




        </text>




      `;




    });









    svg += `<text class="radar-debug" x="8" y="414">SVG radar · ${vals.source}</text>`;




    svg += `</svg>`;









    mount.innerHTML = svg;









    console.log("[XLP direct scene2 SVG radar] rendered:", vals.label, vals.source);









    return true;




  }









  function observeCityName() {




    const el = document.getElementById("scene2ProfileCity");









    if (!el || el.dataset.directSvgRadarObserved === "1") return;









    el.dataset.directSvgRadarObserved = "1";









    const obs = new MutationObserver(() => {




      clearTimeout(window.__xlpDirectRadarCityTimer);




      window.__xlpDirectRadarCityTimer = setTimeout(renderSvgRadar, 80);




    });









    obs.observe(el, {




      childList: true,




      subtree: true,




      characterData: true




    });




  }









  function boot() {




    renderSvgRadar();




    observeCityName();




  }









  if (document.readyState === "loading") {




    document.addEventListener("DOMContentLoaded", boot);




  } else {




    boot();




  }









  window.addEventListener("load", boot);




  window.addEventListener("resize", renderSvgRadar);









  [50, 150, 300, 700, 1200, 2000, 3500, 5000, 8000, 12000].forEach(t => {




    setTimeout(boot, t);




  });









  window.xlpRenderScene2SvgRadar = renderSvgRadar;




})();




 /* XLP_DIRECT_SCENE2_RADAR_SVG_END */














/* XLP_DELETE_SCENE2_RADAR_JS_START */




(function () {




  function hide(el) {




    if (!el || !el.style) return;




    el.style.setProperty("display", "none", "important");




    el.style.setProperty("visibility", "hidden", "important");




    el.style.setProperty("opacity", "0", "important");




    el.style.setProperty("height", "0", "important");




    el.style.setProperty("min-height", "0", "important");




    el.style.setProperty("max-height", "0", "important");




    el.style.setProperty("margin", "0", "important");




    el.style.setProperty("padding", "0", "important");




    el.style.setProperty("overflow", "hidden", "important");




    el.style.setProperty("pointer-events", "none", "important");




  }









  function run() {




    var root = document.getElementById("scene2-comparison");




    if (!root) return;









    [




      ".scene2-radar-wrap",




      "#scene2Radar",




      "#scene2RadarSvgMount",




      "#xlpScene2RadarSvg",




      ".xlp-radar-overlay",




      ".xlp-final-radar-svg"




    ].forEach(function (sel) {




      root.querySelectorAll(sel).forEach(hide);




    });









    console.log("[XLP delete scene2 radar from scene2-final.js] done");




  }









  if (document.readyState === "loading") {




    document.addEventListener("DOMContentLoaded", run);




  } else {




    run();




  }









  window.addEventListener("load", run);









  [100, 300, 800, 1500, 3000, 5000, 8000].forEach(function (t) {




    setTimeout(run, t);




  });




})();




 /* XLP_DELETE_SCENE2_RADAR_JS_END */







/* === XLP SCENE2 PROPORTIONAL STACK DOM HELPER START === */



(function () {



  const ENABLE = true;







  function txt(el) {



    return (el && el.textContent ? el.textContent : "").replace(/\s+/g, " ").trim();



  }







  function parseNumber(s) {



    const m = String(s || "").match(/([0-9]+(?:\.[0-9]+)?)/);



    return m ? parseFloat(m[1]) : NaN;



  }







  function first(selectors) {



    for (const s of selectors) {



      const el = document.querySelector(s);



      if (el) return el;



    }



    return null;



  }







  function apply() {



    if (!ENABLE) return false;







    const bars = first(["#s2cleanStackBars", "#scene2StackBars", ".s2clean-stack-bars", ".scene2-stack-bars"]);



    const labels = first(["#s2cleanStackLabels", "#scene2StackLabels", ".s2clean-stack-labels", ".scene2-stack-labels"]);







    if (!bars || !labels) return false;







    const barItems = Array.from(bars.children);



    const labelItems = Array.from(labels.children);







    if (!barItems.length || !labelItems.length || barItems.length !== labelItems.length) return false;







    const values = labelItems.map(el => parseNumber(txt(el)));



    if (values.some(v => !isFinite(v))) return false;







    const total = values.reduce((a, b) => a + b, 0);



    if (!isFinite(total) || total <= 0) return false;







    bars.style.setProperty("display", "flex", "important");



    bars.style.setProperty("grid-template-columns", "none", "important");



    bars.style.setProperty("width", "100%", "important");



    bars.style.setProperty("gap", "6px", "important");







    labels.style.setProperty("display", "flex", "important");



    labels.style.setProperty("grid-template-columns", "none", "important");



    labels.style.setProperty("width", "100%", "important");



    labels.style.setProperty("gap", "6px", "important");







    values.forEach((v, i) => {



      const pct = (v / total) * 100;



      const grow = Math.max(v, 0.001).toFixed(4);



      const basis = pct.toFixed(4) + "%";







      if (barItems[i]) {



        barItems[i].style.setProperty("flex", grow + " 1 0%", "important");



        barItems[i].style.setProperty("width", basis, "important");



        barItems[i].style.setProperty("min-width", "0", "important");



      }







      if (labelItems[i]) {



        labelItems[i].style.setProperty("flex", grow + " 1 0%", "important");



        labelItems[i].style.setProperty("width", basis, "important");



        labelItems[i].style.setProperty("min-width", "0", "important");



        labelItems[i].style.setProperty("text-align", "center", "important");



      }



    });







    console.log("[XLP scene2] proportional stack applied:", values);



    return true;



  }







  function run() {



    apply();



    [80, 160, 320, 650, 1000, 1800, 3000, 5000].forEach(t => setTimeout(apply, t));



  }







  if (document.readyState === "loading") {



    document.addEventListener("DOMContentLoaded", run);



  } else {



    run();



  }







  window.addEventListener("load", run);



  window.addEventListener("resize", () => setTimeout(apply, 80));







  const observer = new MutationObserver(() => setTimeout(apply, 30));







  function installObserver() {



    const labels = first(["#s2cleanStackLabels", "#scene2StackLabels", ".s2clean-stack-labels", ".scene2-stack-labels"]);



    if (labels && labels.dataset.xlpStackObserved !== "1") {



      labels.dataset.xlpStackObserved = "1";



      observer.observe(labels, { childList: true, subtree: true, characterData: true });



    }



  }







  if (document.readyState === "loading") {



    document.addEventListener("DOMContentLoaded", installObserver);



  } else {



    installObserver();



  }







  window.addEventListener("load", installObserver);



})();



 /* === XLP SCENE2 PROPORTIONAL STACK DOM HELPER END === */



