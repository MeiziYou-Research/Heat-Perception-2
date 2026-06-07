
(function () {
  const DEEP_BLUE = "#123a5d";
  const ORANGE = "#f2a06b";
  const PINK = "#ed69ad";
  const BLUE = "#83c7ff";

  function normalizeText(t) {
    return (t || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function parseColorToRGB(color) {
    if (!color) return null;

    color = color.trim().toLowerCase();

    if (color.startsWith("#")) {
      let hex = color.slice(1);
      if (hex.length === 3) {
        hex = hex.split("").map(c => c + c).join("");
      }
      if (hex.length === 6) {
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16)
        };
      }
    }

    const rgbMatch = color.match(/rgba?\(([^)]+)\)/);
    if (rgbMatch) {
      const parts = rgbMatch[1].split(",").map(v => parseFloat(v.trim()));
      return {
        r: parts[0] || 0,
        g: parts[1] || 0,
        b: parts[2] || 0
      };
    }

    return null;
  }

  function isGreenish(colorStr) {
    const rgb = parseColorToRGB(colorStr);
    if (!rgb) return false;
    return rgb.g > rgb.r + 15 && rgb.g > rgb.b + 10;
  }

  function isWhiteLike(colorStr) {
    const rgb = parseColorToRGB(colorStr);
    if (!rgb) return false;
    return rgb.r > 210 && rgb.g > 210 && rgb.b > 210;
  }

  function applyDeepBlueText(container) {
    const textSelectors = [
      "h1","h2","h3","h4","h5","h6",
      "p","span","small","strong","em","label","li","dt","dd",
      ".eyebrow",".section-kicker",".metric-label",".metric-value",
      ".chart-title",".chart-subtitle",".note",".explain",".caption",
      ".pill",".tag",".badge",".stat",".stat-label",".stat-value",
      ".callout",".callout-title",".callout-text",
      ".driver-chip",".driver-pill",".legend-item",".legend-label"
    ];

    container.querySelectorAll(textSelectors.join(",")).forEach(el => {
      el.style.color = DEEP_BLUE;
      el.style.fill = DEEP_BLUE;
      el.style.stroke = el.tagName.toLowerCase() === "text" ? "none" : el.style.stroke;
    });

    // SVG 里的文字
    container.querySelectorAll("svg text").forEach(el => {
      el.setAttribute("fill", DEEP_BLUE);
      el.style.fill = DEEP_BLUE;
    });
  }

  function recolorSVGGraphics(container) {
    container.querySelectorAll("svg path, svg line, svg polyline, svg circle, svg rect").forEach(el => {
      const cs = getComputedStyle(el);
      const stroke = el.getAttribute("stroke") || cs.stroke || "";
      const fill = el.getAttribute("fill") || cs.fill || "";

      // 绿色线改橙色
      if (isGreenish(stroke)) {
        el.setAttribute("stroke", ORANGE);
        el.style.stroke = ORANGE;
      }

      // 如果有绿色填充，也改成橙色（比如线条 marker / badge）
      if (isGreenish(fill)) {
        el.setAttribute("fill", ORANGE);
        el.style.fill = ORANGE;
      }

      // 太浅的白字统一成深蓝
      if (isWhiteLike(fill)) {
        el.setAttribute("fill", DEEP_BLUE);
        el.style.fill = DEEP_BLUE;
      }
    });
  }

  function recolorCanvasLikeHints(container) {
    // 如果页面用的是 HTML 图例 / 指示器，也统一深蓝
    container.querySelectorAll("[style*='color'], [style*='fill']").forEach(el => {
      const cs = getComputedStyle(el);
      if (isGreenish(cs.color) || isWhiteLike(cs.color)) {
        el.style.color = DEEP_BLUE;
      }
      if (isGreenish(cs.fill) || isWhiteLike(cs.fill)) {
        el.style.fill = DEEP_BLUE;
      }
    });

    // 常见“绿色标签/数字”也统一深蓝
    container.querySelectorAll(".metric, .metric-card, .metric-box, .summary-box, .stats-box").forEach(box => {
      box.querySelectorAll("*").forEach(el => {
        el.style.color = DEEP_BLUE;
        el.style.fill = DEEP_BLUE;
      });
    });
  }

  function patchRegressionLineIfHTML(container) {
    // 有些站点的拟合线可能是普通 div/path，用类名或 inline style 画的
    const candidates = container.querySelectorAll(
      ".regression-line, .trend-line, .fit-line, .line-fit, .ols-line, .scatter-fit-line, [data-role='fit-line']"
    );
    candidates.forEach(el => {
      el.style.background = ORANGE;
      el.style.borderColor = ORANGE;
      el.style.stroke = ORANGE;
      el.style.fill = "none";
      el.setAttribute("stroke", ORANGE);
    });
  }

  function findTargetSection() {
    const all = Array.from(document.querySelectorAll("section, div, article"));
    const keywords = [
      "sleep-disruption attention aligns with sadness",
      "why does it stay or shift",
      "nightlife accessibility",
      "sadness asr",
      "partial r² = 0.46",
      "partial r²=0.46",
      "each dot is one of 50 cities"
    ];

    for (const el of all) {
      const txt = normalizeText(el.innerText || "");
      if (keywords.some(k => txt.includes(k))) {
        return el;
      }
    }

    // 退一步：找最大标题
    const headings = Array.from(document.querySelectorAll("h1,h2,h3"));
    for (const h of headings) {
      const txt = normalizeText(h.innerText || "");
      if (txt.includes("sleep-disruption attention aligns with sadness")) {
        return h.closest("section, div, article") || h.parentElement;
      }
    }

    return null;
  }

  function injectScopedCSS() {
    const style = document.createElement("style");
    style.innerHTML = `
      .observed-association-color-patched,
      .observed-association-color-patched * {
        --tv-deep-blue: ${DEEP_BLUE};
        --tv-orange: ${ORANGE};
        --tv-pink: ${PINK};
        --tv-blue: ${BLUE};
      }

      .observed-association-color-patched h1,
      .observed-association-color-patched h2,
      .observed-association-color-patched h3,
      .observed-association-color-patched h4,
      .observed-association-color-patched p,
      .observed-association-color-patched span,
      .observed-association-color-patched small,
      .observed-association-color-patched li,
      .observed-association-color-patched label,
      .observed-association-color-patched strong,
      .observed-association-color-patched em {
        color: ${DEEP_BLUE} !important;
      }

      .observed-association-color-patched svg text {
        fill: ${DEEP_BLUE} !important;
      }

      .observed-association-color-patched .metric-card *,
      .observed-association-color-patched .summary-box *,
      .observed-association-color-patched .stats-box *,
      .observed-association-color-patched .callout *,
      .observed-association-color-patched .legend * {
        color: ${DEEP_BLUE} !important;
        fill: ${DEEP_BLUE} !important;
      }

      /* 保留蓝粉橙风格：仅把绿色拟合相关元素变橙 */
      .observed-association-color-patched .regression-line,
      .observed-association-color-patched .trend-line,
      .observed-association-color-patched .fit-line,
      .observed-association-color-patched .line-fit {
        background: ${ORANGE} !important;
        border-color: ${ORANGE} !important;
        stroke: ${ORANGE} !important;
      }
    `;
    document.head.appendChild(style);
  }

  function runPatch() {
    const target = findTargetSection();
    if (!target) {
      console.warn("Observed association section not found.");
      return;
    }

    target.classList.add("observed-association-color-patched");

    injectScopedCSS();
    applyDeepBlueText(target);
    recolorSVGGraphics(target);
    recolorCanvasLikeHints(target);
    patchRegressionLineIfHTML(target);

    console.log("Observed association color patch applied.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runPatch);
  } else {
    runPatch();
  }

  // 某些页面会延迟渲染，再补一次
  setTimeout(runPatch, 800);
  setTimeout(runPatch, 1800);
})();
