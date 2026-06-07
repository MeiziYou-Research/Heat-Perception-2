
/* =====================================================
   Scene 3 Atlas
   01 Emotion
   02 Attention
   03 Mechanism
   04 Lens
   ===================================================== */

(function () {
  "use strict";

  const EMOTIONS = [
    { key: "joy", label: "Joy", color: "#75b8ff" },
    { key: "surprise", label: "Surprise", color: "#f7a267" },
    { key: "neutral", label: "Neutral", color: "#9eb4c7" },
    { key: "sadness", label: "Sadness", color: "#e85ca9" },
    { key: "fear", label: "Fear", color: "#8b7cf6" },
    { key: "disgust", label: "Disgust", color: "#b96ad9" },
    { key: "anger", label: "Anger", color: "#ef6f8f" }
  ];

  const ATTENTIONS = [
    {
      key: "exposure",
      label: "Exposure & lived experience",
      short: "Exposure",
      family: "E",
      color: "#75b8ff"
    },
    {
      key: "health",
      label: "Health impacts & burden",
      short: "Health",
      family: "H",
      color: "#e85ca9"
    },
    {
      key: "systems",
      label: "Systems & governance",
      short: "Systems",
      family: "S",
      color: "#f7a267"
    }
  ];

  const CHANNEL_ASR = [
    { channel: "Exposure & lived experience", joy: 27.2, surprise: 24.0, neutral: -13.4, sadness: 3.8, fear: -66.2, disgust: -2.5, anger: 1.7 },
    { channel: "Health impacts & burden", joy: -28.1, surprise: -17.3, neutral: -8.5, sadness: 9.4, fear: 72.1, disgust: 1.5, anger: -2.5 },
    { channel: "Systems & governance", joy: -12.1, surprise: -15.6, neutral: 21.0, sadness: -10.6, fear: 26.8, disgust: 1.8, anger: -0.2 }
  ];

  const MECHANISMS = [
    {
      id: "E11_surprise",
      code: "E11 × Surprise",
      label: "Everyday monitoring as abnormality",
      channel: "exposure",
      emotion: "surprise",
      type: "Switch",
      description: "Everyday heat is framed as unusual or noteworthy rather than ordinary background."
    },
    {
      id: "E11_neutral",
      code: "E11 × Neutral",
      label: "Everyday monitoring baseline",
      channel: "exposure",
      emotion: "neutral",
      type: "Backbone",
      description: "Routine heat monitoring remains close to neutral or descriptive expression."
    },
    {
      id: "E21_sadness",
      code: "E21 × Sadness",
      label: "Sleep disruption burden",
      channel: "exposure",
      emotion: "sadness",
      type: "Backbone",
      description: "Night-time heat and sleep loss are expressed as depletion and burden."
    },
    {
      id: "E23_sadness",
      code: "E23 × Sadness",
      label: "Work / commute burden",
      channel: "exposure",
      emotion: "sadness",
      type: "Backbone",
      description: "Heat disrupting work and mobility is framed through sadness and exhaustion."
    },
    {
      id: "E33_joy",
      code: "E33 × Joy",
      label: "Consumptive cooling relief",
      channel: "exposure",
      emotion: "joy",
      type: "Backbone",
      description: "Cold drinks, ice cream and seasonal cooling practices become pleasurable coping."
    },
    {
      id: "H21_fear",
      code: "H21 × Fear",
      label: "Physical health risk appraisal",
      channel: "health",
      emotion: "fear",
      type: "Backbone",
      description: "Physical health outcomes are interpreted as threat and risk."
    },
    {
      id: "H41_fear",
      code: "H41 × Fear",
      label: "Health warning and advice",
      channel: "health",
      emotion: "fear",
      type: "Backbone",
      description: "Warnings and preventive advice convert heat into imminent threat."
    },
    {
      id: "S11_anger",
      code: "S11 × Anger",
      label: "Climate justice grievance",
      channel: "systems",
      emotion: "anger",
      type: "Switch",
      description: "Justice-related heat discourse can become anger-based and politically charged."
    },
    {
      id: "S21_fear",
      code: "S21 × Fear",
      label: "Planning as risk",
      channel: "systems",
      emotion: "fear",
      type: "Switch",
      description: "Urban form and planning are framed as risk-sensitive infrastructure questions."
    },
    {
      id: "S41_neutral",
      code: "S41 × Neutral",
      label: "Climate attribution monitoring",
      channel: "systems",
      emotion: "neutral",
      type: "Backbone",
      description: "Climate attribution often appears in informational or monitoring registers."
    },
    {
      id: "S43_fear",
      code: "S43 × Fear",
      label: "Long-term climate background risk",
      channel: "systems",
      emotion: "fear",
      type: "Backbone",
      description: "Long-term heat backgrounding carries a stable risk-oriented signal."
    }
  ];

  const MECHANISM_ASR = {
    "E11": { surprise: 23.3, neutral: 19.1, sadness: -25.8, fear: -28.8 },
    "E21": { joy: -9.5, neutral: -10.9, sadness: 23.2 },
    "E23": { joy: -17.1, neutral: -20.4, sadness: 35.9 },
    "E33": { joy: 29.6, neutral: -9.2, fear: -7.7 },
    "H21": { sadness: 9.9, fear: 46.8 },
    "H41": { fear: 47.0 },
    "S11": { sadness: 1.6, anger: 12.8 },
    "S21": { joy: 4.5, surprise: -6.9, fear: 4.2 },
    "S41": { joy: -12.8, surprise: -9.4, neutral: 19.7 },
    "S43": { fear: 8.9 },
    "S44": { surprise: -9.1, neutral: 12.5, fear: 16.3 }
  };

  const state = {
    rows: [],
    fields: {},
    city: null,
    activeMechanism: "E21_sadness",
    charts: {}
  };

  function norm(v) {
    return String(v || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  }

  function isNum(v) {
    return Number.isFinite(Number(v));
  }

  function rawNum(row, field) {
    if (!field) return 0;
    const v = Number(row[field]);
    return Number.isFinite(v) ? v : 0;
  }

  function keys() {
    const s = new Set();
    state.rows.forEach(r => Object.keys(r).forEach(k => s.add(k)));
    return Array.from(s);
  }

  function coverage(field) {
    return state.rows.filter(r => isNum(r[field])).length;
  }

  function maxOfField(field) {
    const vals = state.rows.map(r => rawNum(r, field)).filter(Number.isFinite);
    return vals.length ? Math.max(...vals) : 0;
  }

  function valuePercent(row, field) {
    if (!field) return 0;
    const v = rawNum(row, field);
    const mx = maxOfField(field);
    if (mx <= 1.05) return v * 100;
    return v;
  }

  function findField(patterns, exclude = []) {
    const minCoverage = Math.max(2, Math.ceil(state.rows.length * 0.08));
    const candidates = [];

    keys().forEach(k => {
      if (coverage(k) < minCoverage) return;

      const nk = norm(k);
      if (exclude.some(e => nk.includes(norm(e)))) return;

      let score = 0;

      patterns.forEach(p => {
        const np = norm(p);
        if (nk === np) score += 120;
        else if (nk.endsWith(np)) score += 80;
        else if (nk.startsWith(np)) score += 65;
        else if (nk.includes(np)) score += 45;
      });

      if (nk.includes("share") || nk.includes("pct") || nk.includes("percent") || nk.includes("ratio")) {
        score += 8;
      }

      if (score > 0) {
        candidates.push({ k, score });
      }
    });

    candidates.sort((a, b) => b.score - a.score);
    return candidates.length ? candidates[0].k : null;
  }

  function findTextField(patterns) {
    const candidates = [];

    keys().forEach(k => {
      const nk = norm(k);
      let score = 0;

      patterns.forEach(p => {
        const np = norm(p);
        if (nk === np) score += 110;
        else if (nk.includes(np)) score += 50;
      });

      if (score > 0) candidates.push({ k, score });
    });

    candidates.sort((a, b) => b.score - a.score);
    return candidates.length ? candidates[0].k : null;
  }

  function buildFields() {
    const emotionFields = {};
    const attentionFields = {};

    EMOTIONS.forEach(e => {
      emotionFields[e.key] = findField(
        [
          e.key,
          e.label,
          "emotion_" + e.key,
          e.key + "_emotion",
          e.key + "_share",
          e.key + "_pct",
          e.key + "_percent",
          "share_" + e.key,
          "pct_" + e.key,
          "percent_" + e.key
        ],
        ["dominant", "attention", "asr", "count", "number"]
      );
    });

    attentionFields.exposure = findField(
      [
        "exposure",
        "lived",
        "livedexperience",
        "exposure_lived",
        "exposure_lived_experience",
        "attention_exposure",
        "E_share",
        "E_pct",
        "channel_E"
      ],
      ["dominant", "emotion", "asr", "count"]
    );

    attentionFields.health = findField(
      [
        "health",
        "burden",
        "health_burden",
        "health_impacts",
        "attention_health",
        "H_share",
        "H_pct",
        "channel_H"
      ],
      ["dominant", "emotion", "asr", "count"]
    );

    attentionFields.systems = findField(
      [
        "systems",
        "governance",
        "vulnerability",
        "system_governance",
        "systems_governance",
        "attention_systems",
        "attention_governance",
        "S_share",
        "V_share",
        "S_pct",
        "V_pct",
        "channel_S",
        "channel_V"
      ],
      ["dominant", "emotion", "asr", "count"]
    );

    state.fields = {
      city: findTextField(["city", "cityname", "name", "place"]),
      country: findTextField(["country", "nation"]),
      emotionFields,
      attentionFields
    };

    console.log("[Scene3 Atlas] detected fields:", state.fields);
  }

  function cityName(row) {
    const f = state.fields.city;
    return String((f && row[f]) || row.city || row.City || row.name || row.Name || "Unknown");
  }

  function countryName(row) {
    const f = state.fields.country;
    return String((f && row[f]) || row.country || row.Country || "");
  }

  function selectedRow() {
    if (!state.rows.length) return null;

    if (state.city) {
      const found = state.rows.find(r => cityName(r) === state.city);
      if (found) return found;
    }

    const arlington = state.rows.find(r => cityName(r).toLowerCase() === "arlington");
    return arlington || state.rows[0];
  }

  function emotionValue(row, key) {
    return valuePercent(row, state.fields.emotionFields[key]);
  }

  function attentionValue(row, key) {
    const field = state.fields.attentionFields[key];
    if (field) return valuePercent(row, field);

    // fallback from channel family sum is not available, use balanced prior
    if (key === "exposure") return 55;
    if (key === "health") return 20;
    return 25;
  }

  function globalEmotionBaseline(key) {
    const vals = state.rows.map(r => emotionValue(r, key)).filter(Number.isFinite);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  }

  function countryEmotionBaseline(country, key) {
    const rows = state.rows.filter(r => countryName(r) === country);
    const vals = rows.map(r => emotionValue(r, key)).filter(Number.isFinite);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : globalEmotionBaseline(key);
  }

  function mechanismById(id) {
    return MECHANISMS.find(m => m.id === id) || MECHANISMS[0];
  }

  function findMechanismField(mech) {
    const code = mech.code.split("×")[0].trim();
    const emotion = mech.emotion;

    return findField(
      [
        code + "_" + emotion,
        code + emotion,
        "asr_" + code + "_" + emotion,
        "asr_" + code + emotion,
        code + "_" + emotion + "_asr",
        code + emotion + "_asr",
        emotion + "_" + code,
        emotion + code
      ],
      []
    );
  }

  function zScore(values, value) {
    const clean = values.filter(Number.isFinite);
    if (clean.length < 2) return 0;

    const mean = clean.reduce((a, b) => a + b, 0) / clean.length;
    const variance = clean.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / clean.length;
    const sd = Math.sqrt(variance) || 1;

    return (value - mean) / sd;
  }

  function fallbackMechanismScore(row, mech) {
    const eField = state.fields.emotionFields[mech.emotion];
    const aField = state.fields.attentionFields[mech.channel];

    const eVals = state.rows.map(r => eField ? valuePercent(r, eField) : 0);
    const aVals = state.rows.map(r => aField ? valuePercent(r, aField) : attentionValue(r, mech.channel));

    const e = eField ? valuePercent(row, eField) : emotionValue(row, mech.emotion);
    const a = aField ? valuePercent(row, aField) : attentionValue(row, mech.channel);

    const score = 0.62 * zScore(eVals, e) + 0.38 * zScore(aVals, a);
    return score;
  }

  function mechanismScore(row, mech) {
    const field = findMechanismField(mech);
    if (field) return rawNum(row, field);
    return fallbackMechanismScore(row, mech);
  }

  function chart(id) {
    const el = document.getElementById(id);
    if (!el || !window.echarts) return null;

    if (!state.charts[id]) {
      state.charts[id] = echarts.init(el, null, { renderer: "canvas" });
    }

    return state.charts[id];
  }

  function resizeAll() {
    Object.values(state.charts).forEach(c => {
      try { c.resize(); } catch (err) {}
    });
  }

  function gradient(a, b) {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: a },
      { offset: 1, color: b }
    ]);
  }

  function hGradient(a, b, c) {
    return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: a },
      { offset: 0.52, color: b },
      { offset: 1, color: c }
    ]);
  }

  function axisText(size = 11) {
    return {
      color: "rgba(20, 59, 88, 0.76)",
      fontSize: size,
      fontFamily: "Inter, Arial, sans-serif"
    };
  }

  function drawEmotionWheel() {
    const row = selectedRow();
    if (!row) return;

    const country = countryName(row);

    const selected = EMOTIONS.map(e => emotionValue(row, e.key));
    const global = EMOTIONS.map(e => globalEmotionBaseline(e.key));
    const countryBase = EMOTIONS.map(e => countryEmotionBaseline(country, e.key));

    const maxVal = Math.max(30, ...selected, ...global, ...countryBase) * 1.18;

    const c = chart("scene3-emotion-wheel");
    if (!c) return;

    c.setOption({
      backgroundColor: "transparent",
      tooltip: { trigger: "item" },
      legend: {
        bottom: 6,
        itemWidth: 12,
        itemHeight: 8,
        textStyle: axisText(11)
      },
      radar: {
        center: ["50%", "48%"],
        radius: "66%",
        splitNumber: 4,
        indicator: EMOTIONS.map(e => ({ name: e.label, max: maxVal })),
        axisName: {
          color: "rgba(20, 59, 88, 0.78)",
          fontSize: 12
        },
        axisLine: { lineStyle: { color: "rgba(20, 59, 88, 0.18)" } },
        splitLine: { lineStyle: { color: "rgba(20, 59, 88, 0.13)" } },
        splitArea: { areaStyle: { color: ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.02)"] } }
      },
      series: [{
        type: "radar",
        symbolSize: 5,
        data: [
          {
            name: cityName(row),
            value: selected,
            lineStyle: { color: "#e85ca9", width: 2.6 },
            itemStyle: { color: "#e85ca9" },
            areaStyle: { color: "rgba(232, 92, 169, 0.18)" }
          },
          {
            name: "Global baseline",
            value: global,
            lineStyle: { color: "#75b8ff", width: 2, type: "dashed" },
            itemStyle: { color: "#75b8ff" },
            areaStyle: { color: "rgba(117, 184, 255, 0.10)" }
          },
          {
            name: country || "Country baseline",
            value: countryBase,
            lineStyle: { color: "#f7a267", width: 1.8, type: "dotted" },
            itemStyle: { color: "#f7a267" },
            areaStyle: { color: "rgba(247, 162, 103, 0.06)" }
          }
        ]
      }]
    }, true);
  }

  function drawEmotionDeviation() {
    const row = selectedRow();
    if (!row) return;

    const items = EMOTIONS.map(e => {
      const v = emotionValue(row, e.key) - globalEmotionBaseline(e.key);
      return {
        key: e.key,
        label: e.label,
        value: v,
        color: e.color
      };
    });

    const c = chart("scene3-emotion-deviation");
    if (!c) return;

    c.setOption({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        formatter: params => {
          const p = params[0];
          return `${p.name}<br/>Deviation: <b>${p.value.toFixed(1)} pp</b>`;
        }
      },
      grid: { left: 82, right: 28, top: 26, bottom: 42 },
      xAxis: {
        type: "value",
        axisLabel: axisText(),
        splitLine: { lineStyle: { color: "rgba(20,59,88,0.13)" } },
        axisLine: { lineStyle: { color: "rgba(20,59,88,0.24)" } }
      },
      yAxis: {
        type: "category",
        data: items.map(d => d.label).reverse(),
        axisLabel: axisText(12),
        axisTick: { show: false },
        axisLine: { show: false }
      },
      series: [{
        type: "bar",
        data: items.map(d => ({
          value: d.value,
          itemStyle: {
            color: d.value >= 0 ? gradient("#f7a267", "#e85ca9") : gradient("#75b8ff", "#8b7cf6"),
            borderRadius: d.value >= 0 ? [0, 8, 8, 0] : [8, 0, 0, 8]
          }
        })).reverse(),
        barWidth: 16,
        label: {
          show: true,
          position: "right",
          color: "rgba(20,59,88,0.78)",
          fontSize: 11,
          formatter: p => `${p.value > 0 ? "+" : ""}${p.value.toFixed(1)}`
        },
        markLine: {
          symbol: "none",
          lineStyle: { color: "rgba(20,59,88,0.32)", type: "dashed" },
          data: [{ xAxis: 0 }]
        }
      }]
    }, true);
  }

  function drawAttentionModulators() {
    const row = selectedRow();
    if (!row) return;

    const items = ATTENTIONS.map(a => ({
      label: a.label,
      short: a.short,
      value: attentionValue(row, a.key),
      color: a.color
    }));

    const c = chart("scene3-attention-modulators");
    if (!c) return;

    c.setOption({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        formatter: params => {
          const p = params[0];
          return `${p.name}<br/>Share: <b>${Number(p.value).toFixed(1)}%</b>`;
        }
      },
      grid: { left: 168, right: 48, top: 42, bottom: 48 },
      xAxis: {
        type: "value",
        axisLabel: axisText(),
        splitLine: { lineStyle: { color: "rgba(20,59,88,0.13)" } },
        axisLine: { lineStyle: { color: "rgba(20,59,88,0.22)" } }
      },
      yAxis: {
        type: "category",
        data: items.map(d => d.label).reverse(),
        axisLabel: axisText(12),
        axisTick: { show: false },
        axisLine: { show: false }
      },
      series: [{
        type: "bar",
        data: items.map(d => d.value).reverse(),
        barWidth: 18,
        itemStyle: {
          color: hGradient("#75b8ff", "#e85ca9", "#f7a267"),
          borderRadius: 12
        },
        label: {
          show: true,
          position: "right",
          color: "rgba(20,59,88,0.82)",
          fontSize: 12,
          formatter: p => `${Number(p.value).toFixed(1)}%`
        }
      }]
    }, true);
  }

  function drawChannelHeatmap() {
  const c = chart("scene3-channel-heatmap");
  if (!c) return;

  // 关键：清掉之前 visualMap 残留，避免出现中间两条竖线
  c.clear();

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function hexToRgb(hex) {
    const clean = String(hex).replace("#", "");
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  }

  function mixColor(a, b, t) {
    const ca = hexToRgb(a);
    const cb = hexToRgb(b);
    const r = Math.round(ca.r + (cb.r - ca.r) * t);
    const g = Math.round(ca.g + (cb.g - ca.g) * t);
    const b2 = Math.round(ca.b + (cb.b - ca.b) * t);
    return `rgb(${r}, ${g}, ${b2})`;
  }

  // 手动颜色映射：
  // 负值 = 蓝色，接近 0 = 浅色，正值 = 粉色
  // 这样就不需要 visualMap 图例，也不会再出现竖线
  function heatColor(value) {
    const v = clamp(value, -75, 75);

    if (v < 0) {
      const t = Math.abs(v) / 75;
      return mixColor("#edf7fb", "#67b7d9", t);
    }

    const t = v / 75;
    return mixColor("#edf7fb", "#e85ca9", t);
  }

  const data = [];

  CHANNEL_ASR.forEach((row, y) => {
    EMOTIONS.forEach((e, x) => {
      const value = row[e.key];

      data.push({
        value: [x, y, value],
        itemStyle: {
          color: heatColor(value),
          borderColor: "rgba(255,255,255,0.42)",
          borderWidth: 1,
          borderRadius: 4
        }
      });
    });
  });

  c.setOption({
    backgroundColor: "transparent",

    tooltip: {
      formatter: p => {
        const emotion = EMOTIONS[p.value[0]].label;
        const channel = CHANNEL_ASR[p.value[1]].channel;
        const value = p.value[2];
        return `${channel}<br/>${emotion}: <b>${value > 0 ? "+" : ""}${value.toFixed(1)}</b>`;
      }
    },

    grid: {
      left: 154,
      right: 44,
      top: 26,
      bottom: 42
    },

    xAxis: {
      type: "category",
      data: EMOTIONS.map(e => e.label),
      axisLabel: axisText(11),
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false }
    },

    yAxis: {
      type: "category",
      data: CHANNEL_ASR.map(d => d.channel),
      axisLabel: axisText(11),
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false }
    },

    // 注意：这里故意不写 visualMap
    // 之前中间两条竖线就是 visualMap 图例错位造成的

    series: [{
      type: "heatmap",
      data,
      label: {
        show: true,
        formatter: p => {
          const v = p.value[2];
          return `${v > 0 ? "+" : ""}${v.toFixed(0)}`;
        },
        color: "rgba(20,59,88,0.78)",
        fontSize: 10,
        fontWeight: 600
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 12,
          shadowColor: "rgba(18,58,90,0.22)"
        }
      }
    }]
  }, true);
}


  function drawMechanismAtlas() {
    const rows = ["E11", "E21", "E23", "E33", "H21", "H41", "S11", "S21", "S41", "S43", "S44"];
    const data = [];

    rows.forEach((code, yi) => {
      const vals = MECHANISM_ASR[code] || {};
      EMOTIONS.forEach((e, xi) => {
        const v = vals[e.key];
        if (Number.isFinite(v)) {
          data.push({
            value: [xi, yi, v],
            itemStyle: {
              color: v >= 0 ? "rgba(232,92,169,0.72)" : "rgba(103,183,217,0.72)",
              borderColor: v >= 0 ? "#e85ca9" : "#67b7d9",
              borderWidth: 1.5
            }
          });
        }
      });
    });

    const c = chart("scene3-mechanism-atlas");
    if (!c) return;

    c.setOption({
      backgroundColor: "transparent",
      tooltip: {
        formatter: p => {
          const emotion = EMOTIONS[p.value[0]].label;
          const code = rows[p.value[1]];
          const v = p.value[2];
          return `${code} × ${emotion}<br/>ASR: <b>${v > 0 ? "+" : ""}${v.toFixed(1)}</b>`;
        }
      },
      grid: { left: 92, right: 44, top: 38, bottom: 58 },
      xAxis: {
        type: "category",
        data: EMOTIONS.map(e => e.label),
        axisLabel: axisText(12),
        axisTick: { show: false },
        axisLine: { lineStyle: { color: "rgba(20,59,88,0.25)" } },
        splitLine: { show: true, lineStyle: { color: "rgba(20,59,88,0.08)" } }
      },
      yAxis: {
        type: "category",
        data: rows,
        axisLabel: axisText(12),
        axisTick: { show: false },
        axisLine: { lineStyle: { color: "rgba(20,59,88,0.25)" } },
        splitLine: { show: true, lineStyle: { color: "rgba(20,59,88,0.08)" } }
      },
      series: [{
        type: "scatter",
        data,
        symbolSize: d => Math.max(10, Math.min(54, Math.abs(d[2]) * 0.9 + 8)),
        label: {
          show: true,
          formatter: p => {
            const v = p.value[2];
            if (Math.abs(v) < 8) return "";
            return `${v > 0 ? "+" : ""}${v.toFixed(0)}`;
          },
          color: "rgba(20,59,88,0.78)",
          fontSize: 10
        }
      }]
    }, true);
  }

  function renderMechanismButtons() {
    const box = document.getElementById("scene3-mechanism-buttons");
    if (!box) return;

    box.innerHTML = MECHANISMS.map(m => {
      const active = m.id === state.activeMechanism ? "active" : "";
      return `
        <button class="mechanism-chip ${active}" data-mechanism="${m.id}">
          <span class="mechanism-code">${m.code}</span>
          <span class="mechanism-name">${m.label}</span>
          <span class="mechanism-type">${m.type}</span>
        </button>
      `;
    }).join("");

    box.querySelectorAll(".mechanism-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        state.activeMechanism = btn.dataset.mechanism;
        renderMechanismButtons();
        renderMechanismCities();
      });
    });
  }

  function renderMechanismCities() {
    const box = document.getElementById("scene3-mechanism-city-list");
    if (!box) return;

    const mech = mechanismById(state.activeMechanism);

    const ranked = state.rows
      .map(r => ({
        city: cityName(r),
        country: countryName(r),
        value: mechanismScore(r, mech),
        row: r
      }))
      .filter(d => Number.isFinite(d.value))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    const selected = selectedRow();
    const selectedCity = selected ? cityName(selected) : "";

    box.innerHTML = `
      <div class="lens-summary">
        <div>
          <div class="lens-code">${mech.code}</div>
          <div class="lens-title">${mech.label}</div>
          <p>${mech.description}</p>
        </div>
      </div>

      <div class="lens-city-grid">
        ${ranked.map((d, i) => `
          <button class="lens-city ${d.city === selectedCity ? "active" : ""}" data-city="${d.city}">
            <span class="rank">${String(i + 1).padStart(2, "0")}</span>
            <span class="city-name">${d.city}</span>
            <span class="city-country">${d.country || "—"}</span>
            <span class="city-score">${d.value >= 0 ? "+" : ""}${d.value.toFixed(2)}</span>
          </button>
        `).join("")}
      </div>
    `;

    box.querySelectorAll(".lens-city").forEach(btn => {
      btn.addEventListener("click", () => {
        const city = btn.dataset.city;
        const select = document.getElementById("scene3-city-select");
        state.city = city;
        if (select) select.value = city;
        drawAll();

        window.dispatchEvent(new CustomEvent("thermal:city-selected", {
          detail: { city }
        }));
      });
    });

    window.dispatchEvent(new CustomEvent("thermal:mechanism-selected", {
      detail: {
        mechanism: mech,
        topCities: ranked.map(d => d.city)
      }
    }));
  }

  function populateCitySelect() {
    const select = document.getElementById("scene3-city-select");
    if (!select) return;

    const names = state.rows
      .map(cityName)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    select.innerHTML = names.map(n => `<option value="${n}">${n}</option>`).join("");

    const defaultCity = names.includes("Arlington") ? "Arlington" : names[0];
    state.city = defaultCity;
    select.value = defaultCity;

    select.addEventListener("change", () => {
      state.city = select.value;
      drawAll();

      window.dispatchEvent(new CustomEvent("thermal:city-selected", {
        detail: { city: state.city }
      }));
    });
  }

  function drawAll() {
    drawEmotionWheel();
    drawEmotionDeviation();
    drawAttentionModulators();
    drawChannelHeatmap();
    drawMechanismAtlas();
    renderMechanismButtons();
    renderMechanismCities();

    setTimeout(resizeAll, 80);
    setTimeout(resizeAll, 400);
  }

  function showError(msg) {
    const root = document.getElementById("profile-dashboard");
    if (!root) return;

    const div = document.createElement("div");
    div.className = "scene3-atlas-error";
    div.textContent = msg;
    root.prepend(div);
  }

  function readData() {
    if (window.__CITY_SUMMARY_GEOJSON__ && Array.isArray(window.__CITY_SUMMARY_GEOJSON__.features)) {
      return window.__CITY_SUMMARY_GEOJSON__.features.map(f => Object.assign({}, f.properties || f));
    }

    if (window.CITY_SUMMARY_GEOJSON && Array.isArray(window.CITY_SUMMARY_GEOJSON.features)) {
      return window.CITY_SUMMARY_GEOJSON.features.map(f => Object.assign({}, f.properties || f));
    }

    const candidates = [
      window.city_summary_geojson,
      window.city_summary,
      window.citySummary,
      window.CITY_SUMMARY,
      window.CITY_DATA,
      window.cityData,
      window.DATA,
      window.data
    ];

    for (const item of candidates) {
      if (item && Array.isArray(item.features)) {
        return item.features.map(f => Object.assign({}, f.properties || f));
      }
      if (Array.isArray(item)) {
        return item.map(f => Object.assign({}, f.properties || f));
      }
    }

    return [];
  }

  function init() {
    const root = document.getElementById("profile-dashboard");
    if (!root) return;

    if (!window.echarts) {
      showError("ECharts is not loaded.");
      return;
    }

    state.rows = readData();

    if (!state.rows.length) {
      showError("City data not found. Please check data/city_summary.inline.js.");
      return;
    }

    buildFields();
    populateCitySelect();
    drawAll();

    window.addEventListener("resize", resizeAll);

    setTimeout(drawAll, 400);
    setTimeout(drawAll, 1200);

    console.log("[Scene3 Atlas] initialized:", state.rows.length, "cities");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();




