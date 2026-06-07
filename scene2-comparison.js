
/* =========================================================
   SCENE 2 FULLSCREEN FINAL
   Global map + Emotion wheel
========================================================= */

(function () {
  const EMOTIONS = [
    { key: "joy", label: "Joy", aliases: ["joy", "Joy", "emo_joy", "emotion_joy", "joy_pct", "p_joy", "Joy (%)"] },
    { key: "surprise", label: "Surprise", aliases: ["surprise", "Surprise", "emo_surprise", "emotion_surprise", "surprise_pct", "p_surprise", "Surprise (%)"] },
    { key: "neutral", label: "Neutral", aliases: ["neutral", "Neutral", "emo_neutral", "emotion_neutral", "neutral_pct", "p_neutral", "Neutral (%)"] },
    { key: "sadness", label: "Sadness", aliases: ["sadness", "Sadness", "emo_sadness", "emotion_sadness", "sadness_pct", "p_sadness", "Sadness (%)"] },
    { key: "fear", label: "Fear", aliases: ["fear", "Fear", "emo_fear", "emotion_fear", "fear_pct", "p_fear", "Fear (%)"] },
    { key: "disgust", label: "Disgust", aliases: ["disgust", "Disgust", "emo_disgust", "emotion_disgust", "disgust_pct", "p_disgust", "Disgust (%)"] },
    { key: "anger", label: "Anger", aliases: ["anger", "Anger", "emo_anger", "emotion_anger", "anger_pct", "p_anger", "Anger (%)"] }
  ];

  let records = [];
  let globalBaseline = null;
  let radar = null;
  let mapController = null;

  function pickString(obj, keys) {
    for (const k of keys) {
      if (obj && obj[k] !== undefined && obj[k] !== null && String(obj[k]).trim() !== "") {
        return String(obj[k]).trim();
      }
    }
    return "";
  }

  function pickNumber(obj, keys) {
    for (const k of keys) {
      if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== "") {
        const n = Number(obj[k]);
        if (!Number.isNaN(n)) return n;
      }
    }
    return 0;
  }

  function findDataRoot() {
    const known = [
      window.__CITY_SUMMARY__,
      window.CITY_SUMMARY,
      window.CITY_SUMMARY_DATA,
      window.citySummaryData,
      window.citySummary,
      window.city_summary,
      window.citySummaryInline,
      window.city_summary_inline,
      window.CITY_DATA,
      window.cityData
    ];

    for (const x of known) {
      if (x) return x;
    }

    const key = Object.keys(window).find(k => /city.*summary|summary.*city|city.*data/i.test(k));
    return key ? window[key] : null;
  }

  function normalizeData() {
    const root = findDataRoot();

    if (!root) {
      console.warn("[Scene2 fullscreen] No city summary data found.");
      return [];
    }

    let items = [];

    if (Array.isArray(root)) {
      items = root;
    } else if (root.features && Array.isArray(root.features)) {
      items = root.features;
    } else if (root.data && Array.isArray(root.data)) {
      items = root.data;
    } else {
      console.warn("[Scene2 fullscreen] Unsupported data format:", root);
      return [];
    }

    return items.map((item, i) => {
      const props = item.properties ? item.properties : item;
      const geom = item.geometry || null;

      const city = pickString(props, ["city", "City", "name", "Name", "city_name", "CITY"]);
      const country = pickString(props, ["country", "Country", "nation", "Nation", "COUNTRY"]);

      let lng = 0;
      let lat = 0;

      if (geom && geom.coordinates && geom.coordinates.length >= 2) {
        lng = Number(geom.coordinates[0]);
        lat = Number(geom.coordinates[1]);
      } else {
        lng = pickNumber(props, ["lng", "lon", "longitude", "Longitude", "LON", "LNG", "x"]);
        lat = pickNumber(props, ["lat", "latitude", "Latitude", "LAT", "y"]);
      }

      const emotions = {};
      EMOTIONS.forEach(e => {
        emotions[e.key] = pickNumber(props, e.aliases);
      });

      const dominant = EMOTIONS
        .map(e => ({ key: e.key, label: e.label, value: emotions[e.key] || 0 }))
        .sort((a, b) => b.value - a.value)[0];

      return {
        id: `${city || "City"}__${country || "Country"}__${i}`,
        city: city || `City ${i + 1}`,
        country: country || "Unknown",
        lat,
        lng,
        emotions,
        dominantKey: dominant.key,
        dominantLabel: dominant.label,
        maxShare: dominant.value
      };
    }).filter(d => Number.isFinite(d.lat) && Number.isFinite(d.lng) && d.lat !== 0 && d.lng !== 0);
  }

  function average(subset) {
    const out = {};
    EMOTIONS.forEach(e => {
      const vals = subset.map(r => Number(r.emotions[e.key]) || 0);
      out[e.key] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    });
    return out;
  }

  function countryBaseline(country) {
    const subset = records.filter(r => r.country === country);
    return subset.length ? average(subset) : globalBaseline;
  }

  function topEmotion(record) {
    return EMOTIONS
      .map(e => ({ key: e.key, label: e.label, value: Number(record.emotions[e.key]) || 0 }))
      .sort((a, b) => b.value - a.value)[0];
  }

  function largestGap(record) {
    return EMOTIONS
      .map(e => ({
        label: e.label,
        gap: (Number(record.emotions[e.key]) || 0) - (Number(globalBaseline[e.key]) || 0)
      }))
      .sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap))[0];
  }

  function fillSelect() {
    const select = document.getElementById("scene2-city-select");
    if (!select) return;

    const sorted = [...records].sort((a, b) => {
      if (a.country === b.country) return a.city.localeCompare(b.city);
      return a.country.localeCompare(b.country);
    });

    select.innerHTML = sorted.map(r => {
      return `<option value="${r.id}">${r.city}, ${r.country}</option>`;
    }).join("");
  }

  function renderRadar(record) {
    const canvas = document.getElementById("scene2-radar-chart");
    if (!canvas || !window.Chart) return;

    const cb = countryBaseline(record.country);

    const labels = EMOTIONS.map(e => e.label);
    const cityData = EMOTIONS.map(e => Number(record.emotions[e.key]) || 0);
    const globalData = EMOTIONS.map(e => Number(globalBaseline[e.key]) || 0);
    const countryData = EMOTIONS.map(e => Number(cb[e.key]) || 0);

    if (radar) {
      radar.data.labels = labels;
      radar.data.datasets[0].label = record.city;
      radar.data.datasets[0].data = cityData;
      radar.data.datasets[1].data = globalData;
      radar.data.datasets[2].label = `${record.country} baseline`;
      radar.data.datasets[2].data = countryData;

      // === XLP RADAR WHITE STYLE START ===
      // Force Emotion Wheel labels and hexagon grid to white.
      if (radar.options && radar.options.scales && radar.options.scales.r) {
        radar.options.scales.r.grid = radar.options.scales.r.grid || {};
        radar.options.scales.r.angleLines = radar.options.scales.r.angleLines || {};
        radar.options.scales.r.pointLabels = radar.options.scales.r.pointLabels || {};
        radar.options.scales.r.ticks = radar.options.scales.r.ticks || {};

        radar.options.scales.r.grid.color = "rgba(255,255,255,0.24)";
        radar.options.scales.r.grid.lineWidth = 1.1;

        radar.options.scales.r.angleLines.color = "rgba(255,255,255,0.30)";
        radar.options.scales.r.angleLines.lineWidth = 1.1;

        radar.options.scales.r.pointLabels.color = "#ffffff";
        radar.options.scales.r.pointLabels.font = {
          size: 14,
          weight: "700"
        };

        radar.options.scales.r.ticks.color = "rgba(255,255,255,0.85)";
      }
      // === XLP RADAR WHITE STYLE END ===

      radar.update();
      return;
    }

    radar = new Chart(canvas, {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            label: record.city,
            data: cityData,
            borderColor: "#ef5aa4",
            backgroundColor: "rgba(239,90,164,0.18)",
            borderWidth: 2.8,
            pointRadius: 3.6,
            pointHoverRadius: 5,
            pointBackgroundColor: "#ef5aa4"
          },
          {
            label: "Global baseline",
            data: globalData,
            borderColor: "#72b3ff",
            backgroundColor: "rgba(114,179,255,0.08)",
            borderDash: [6, 5],
            borderWidth: 2.2,
            pointRadius: 2.4,
            pointBackgroundColor: "#72b3ff"
          },
          {
            label: `${record.country} baseline`,
            data: countryData,
            borderColor: "#f2a25c",
            backgroundColor: "rgba(242,162,92,0.06)",
            borderDash: [3, 4],
            borderWidth: 2.2,
            pointRadius: 2.4,
            pointBackgroundColor: "#f2a25c"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 520,
          easing: "easeOutQuart"
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${Number(ctx.raw).toFixed(1)}%`
            }
          }
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 35,
            ticks: {
              display: false,
              color: "rgba(255,255,255,0.85)"
            },
            grid: {
              color: "rgba(255,255,255,0.24)",
              lineWidth: 1.1
            },
            angleLines: {
              color: "rgba(255,255,255,0.30)",
              lineWidth: 1.1
            },
            pointLabels: {
              color: "#ffffff",
              font: { size: 14, weight: "700" }
            }
          }
        }
      }
    });
  }

  function updateProfile(record) {
    const select = document.getElementById("scene2-city-select");
    if (select && select.value !== record.id) select.value = record.id;

    const top = topEmotion(record);
    const gap = largestGap(record);

    const cityEl = document.getElementById("scene2-stat-city");
    const topEl = document.getElementById("scene2-top-emotion");
    const shareEl = document.getElementById("scene2-top-share");
    const gapEl = document.getElementById("scene2-largest-gap");
    const locationEl = document.getElementById("scene2-profile-location");

    if (cityEl) cityEl.textContent = `${record.city}, ${record.country}`;
    if (topEl) topEl.textContent = top.label;
    if (shareEl) shareEl.textContent = `${top.value.toFixed(1)}%`;
    if (gapEl) gapEl.textContent = `${gap.label} ${gap.gap >= 0 ? "+" : ""}${gap.gap.toFixed(1)}`;
    if (locationEl) locationEl.textContent = `${record.city}, ${record.country} · compared with global and country baselines`;

    renderRadar(record);

    if (mapController && mapController.highlight) {
      mapController.highlight(record.id);
    }

    resizeScene2();
  }

  function createMap(onSelect) {
    const el = document.getElementById("scene2-map-view");
    if (!el) return null;

    if (!window.mapboxgl) {
      el.innerHTML = `<div class="scene2-map-fallback">Mapbox not available</div>`;
      return null;
    }

    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken =
        window.MAPBOX_ACCESS_TOKEN ||
        "pk.eyJ1IjoianYyeW0iLCJhIjoiY21oNDRrdTdzMGdrczJvcTAxeDZjMG4zdiJ9.SxckX6zT2_bvKPL4jdDTSQ";
    }

    if (!mapboxgl.accessToken) {
      el.innerHTML = `<div class="scene2-map-fallback">Mapbox access token not found</div>`;
      return null;
    }

    const map = new mapboxgl.Map({
      container: "scene2-map-view",
      style: "mapbox://styles/mapbox/light-v11",
      center: [-22, 38],
      zoom: 1.18,
      projection: "globe",
      attributionControl: true
    });

    window.scene2ComparisonMap = map;

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-left");

    map.on("style.load", () => {
      if (map.setFog) {
        map.setFog({
          color: "#d9edf8",
          "high-color": "#c7e2f3",
          "horizon-blend": 0.03,
          "space-color": "#d9edf8",
          "star-intensity": 0
        });
      }
    });

    map.on("load", () => {
      // SCENE2_LIGHTBLUE_FOG_FORCE
      if (map.setFog) {
        map.setFog({
          color: "#d9edf8",
          "high-color": "#c7e2f3",
          "horizon-blend": 0.03,
          "space-color": "#d9edf8",
          "star-intensity": 0
        });
      }

      const geojson = {
        type: "FeatureCollection",
        features: records.map(r => ({
          type: "Feature",
          geometry: { type: "Point", coordinates: [r.lng, r.lat] },
          properties: {
            id: r.id,
            city: r.city,
            country: r.country,
            dominant: r.dominantLabel,
            maxShare: r.maxShare
          }
        }))
      };

      map.addSource("scene2-cities", {
        type: "geojson",
        data: geojson
      });

      map.addLayer({
        id: "scene2-city-circles",
        type: "circle",
        source: "scene2-cities",
        paint: {
          "circle-radius": [
            "interpolate", ["linear"], ["get", "maxShare"],
            6, 5,
            12, 7,
            20, 11,
            30, 16
          ],
          "circle-color": [
            "match", ["get", "dominant"],
            "Joy", "#72b3ff",
            "Surprise", "#9d7fff",
            "Neutral", "#9baec1",
            "Sadness", "#ef5aa4",
            "Fear", "#f2a25c",
            "Disgust", "#68c9be",
            "Anger", "#ff8b73",
            "#72b3ff"
          ],
          "circle-opacity": 0.86,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1.5
        }
      });

      map.addLayer({
        id: "scene2-city-highlight",
        type: "circle",
        source: "scene2-cities",
        filter: ["==", ["get", "id"], ""],
        paint: {
          "circle-radius": 22,
          "circle-color": "rgba(255,255,255,0)",
          "circle-stroke-color": "#ff9a67",
          "circle-stroke-width": 3,
          "circle-opacity": 1
        }
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 14
      });

      map.on("mouseenter", "scene2-city-circles", e => {
        map.getCanvas().style.cursor = "pointer";
        const f = e.features && e.features[0];
        if (!f) return;

        popup
          .setLngLat(f.geometry.coordinates)
          .setHTML(`
            <div class="scene2-popup-title">${f.properties.city}</div>
            <div class="scene2-popup-sub">${f.properties.country}</div>
          `)
          .addTo(map);
      });

      map.on("mouseleave", "scene2-city-circles", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });

      map.on("click", "scene2-city-circles", e => {
        const f = e.features && e.features[0];
        if (!f) return;
        onSelect(f.properties.id);
      });

      resizeScene2();
      setTimeout(resizeScene2, 300);
      setTimeout(resizeScene2, 900);
    });

    return {
      map,
      highlight(id) {
        if (!map.getLayer("scene2-city-highlight")) return;
        map.setFilter("scene2-city-highlight", ["==", ["get", "id"], id]);
      }
    };
  }

  function resizeScene2() {
    const section = document.getElementById("scene2-comparison");
    if (!section) return;

    const map = window.scene2ComparisonMap;
    if (map && typeof map.resize === "function") {
      requestAnimationFrame(() => map.resize());
    }

    if (radar) {
      requestAnimationFrame(() => radar.resize());
    }
  }

  window.resizeScene2FullscreenFinal = resizeScene2;

  function init() {
    const section = document.getElementById("scene2-comparison");
    if (!section) return;

    records = normalizeData();

    if (!records.length) {
      const el = document.getElementById("scene2-map-view");
      if (el) el.innerHTML = `<div class="scene2-map-fallback">No city summary data found</div>`;
      return;
    }

    globalBaseline = average(records);

    fillSelect();

    function selectRecord(id) {
      const record = records.find(r => r.id === id);
      if (!record) return;
      updateProfile(record);
    }

    const select = document.getElementById("scene2-city-select");
    if (select) {
      select.addEventListener("change", () => selectRecord(select.value));
    }

    mapController = createMap(selectRecord);
    window.scene2ComparisonMapController = mapController;

    const defaultRecord =
      records.find(r => /arlington/i.test(r.city)) ||
      records.find(r => /toronto/i.test(r.city)) ||
      records[0];

    if (select) select.value = defaultRecord.id;
    updateProfile(defaultRecord);

    window.addEventListener("resize", () => {
      setTimeout(resizeScene2, 80);
    });

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => resizeScene2());
      ro.observe(section);
    }

    [120, 360, 800, 1400, 2200].forEach(t => setTimeout(resizeScene2, t));

    console.log("[Scene2 fullscreen final] initialized:", records.length, "cities");
  }

  function start() {
    if (window.Chart) {
      init();
    } else {
      const timer = setInterval(() => {
        if (window.Chart) {
          clearInterval(timer);
          init();
        }
      }, 120);

      setTimeout(() => clearInterval(timer), 7000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();


/* === FORCE SCENE2 MAPBOX LIGHT BLUE BACKGROUND START === */
(function () {
  window.forceScene2LightBlueMapbox = function () {
    const map = window.scene2ComparisonMap;
    if (!map || !map.setFog) return;

    try {
      map.setFog({
        color: "#d9edf8",
        "high-color": "#c7e2f3",
        "horizon-blend": 0.03,
        "space-color": "#d9edf8",
        "star-intensity": 0
      });
    } catch (e) {}
  };

  window.addEventListener("load", function () {
    setTimeout(window.forceScene2LightBlueMapbox, 300);
    setTimeout(window.forceScene2LightBlueMapbox, 1000);
    setTimeout(window.forceScene2LightBlueMapbox, 2000);
  });
})();
/* === FORCE SCENE2 MAPBOX LIGHT BLUE BACKGROUND END === */
