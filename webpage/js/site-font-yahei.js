(function () {
  "use strict";

  if (window.__XLP_GLOBAL_YAHEI_FONT__) return;
  window.__XLP_GLOBAL_YAHEI_FONT__ = true;

  var FONT = '"Microsoft YaHei", "Microsoft YaHei UI", "微软雅黑", "PingFang SC", "Noto Sans SC", Arial, sans-serif';

  function setFont(el) {
    if (!el || !el.style) return;
    el.style.setProperty("font-family", FONT, "important");
  }

  function applyDomFont() {
    document.documentElement.style.setProperty("font-family", FONT, "important");
    document.body.style.setProperty("font-family", FONT, "important");

    document.querySelectorAll(
      "body, body *:not(i):not(path):not(circle):not(rect):not(line):not(polyline):not(polygon):not(canvas)"
    ).forEach(setFont);

    document.querySelectorAll("svg text, svg tspan").forEach(function (el) {
      el.style.setProperty("font-family", FONT, "important");
    });
  }

  function applyChartFont() {
    try {
      if (!window.Chart) return;

      Chart.defaults.font = Chart.defaults.font || {};
      Chart.defaults.font.family = FONT;
      Chart.defaults.font.weight = Chart.defaults.font.weight || "600";

      if (Chart.defaults.plugins && Chart.defaults.plugins.legend && Chart.defaults.plugins.legend.labels) {
        Chart.defaults.plugins.legend.labels.font = Chart.defaults.plugins.legend.labels.font || {};
        Chart.defaults.plugins.legend.labels.font.family = FONT;
      }

      var instances = Chart.instances || {};

      if (typeof instances.forEach === "function") {
        instances.forEach(patchOneChart);
      } else {
        Object.keys(instances).forEach(function (key) {
          patchOneChart(instances[key]);
        });
      }
    } catch (e) {}
  }

  function patchOneChart(chart) {
    if (!chart || !chart.options) return;

    chart.options.font = chart.options.font || {};
    chart.options.font.family = FONT;

    if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
      chart.options.plugins.legend.labels.font = chart.options.plugins.legend.labels.font || {};
      chart.options.plugins.legend.labels.font.family = FONT;
    }

    if (chart.options.scales) {
      Object.keys(chart.options.scales).forEach(function (key) {
        var scale = chart.options.scales[key];

        scale.ticks = scale.ticks || {};
        scale.ticks.font = scale.ticks.font || {};
        scale.ticks.font.family = FONT;

        scale.pointLabels = scale.pointLabels || {};
        scale.pointLabels.font = scale.pointLabels.font || {};
        scale.pointLabels.font.family = FONT;
      });
    }

    try {
      chart.update();
    } catch (e) {}
  }

  function applyEChartsFont() {
    try {
      if (!window.echarts) return;

      document.querySelectorAll("div, section").forEach(function (el) {
        var instance = null;

        try {
          instance = echarts.getInstanceByDom(el);
        } catch (e) {}

        if (!instance) return;

        var option = instance.getOption ? instance.getOption() : null;
        if (!option) return;

        option.textStyle = option.textStyle || {};
        option.textStyle.fontFamily = FONT;

        if (option.title) {
          option.title.forEach(function (t) {
            t.textStyle = t.textStyle || {};
            t.textStyle.fontFamily = FONT;
          });
        }

        if (option.legend) {
          option.legend.forEach(function (l) {
            l.textStyle = l.textStyle || {};
            l.textStyle.fontFamily = FONT;
          });
        }

        if (option.xAxis) {
          option.xAxis.forEach(function (x) {
            x.axisLabel = x.axisLabel || {};
            x.axisLabel.fontFamily = FONT;
            x.nameTextStyle = x.nameTextStyle || {};
            x.nameTextStyle.fontFamily = FONT;
          });
        }

        if (option.yAxis) {
          option.yAxis.forEach(function (y) {
            y.axisLabel = y.axisLabel || {};
            y.axisLabel.fontFamily = FONT;
            y.nameTextStyle = y.nameTextStyle || {};
            y.nameTextStyle.fontFamily = FONT;
          });
        }

        try {
          instance.setOption(option, false);
        } catch (e) {}
      });
    } catch (e) {}
  }

  function applyAll() {
    applyDomFont();
    applyChartFont();
    applyEChartsFont();

    console.log("[XLP global YaHei font] applied");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyAll);
  } else {
    applyAll();
  }

  window.addEventListener("load", applyAll);
  window.addEventListener("resize", applyAll);

  [50, 150, 300, 700, 1200, 2000, 3500, 5000].forEach(function (t) {
    setTimeout(applyAll, t);
  });

  if (window.MutationObserver) {
    var observer = new MutationObserver(function () {
      clearTimeout(window.__xlpYaheiFontTimer);
      window.__xlpYaheiFontTimer = setTimeout(applyAll, 50);
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"]
      });
    }
  }
})();