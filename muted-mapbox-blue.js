
/* =====================================================
   Muted blue-gray Mapbox style
   轻度压暗 Mapbox 底图，但保留清新蓝粉网站风格
   ===================================================== */

(function () {
  "use strict";

  const MUTED = {
    background: "#dbeaf3",
    land: "#d1d8df",
    landAlt: "#cbd5de",
    water: "#c4d8e7",
    waterLine: "#a8c4d7",
    roadMinor: "#b8c7d2",
    roadMajor: "#9fb6c8",
    boundary: "#9fb0bd",
    building: "#c5d1da",
    park: "#c7ddd7",
    label: "#586b7a",
    labelDim: "#70808c",
    halo: "rgba(232, 243, 250, 0.88)"
  };

  function safe(fn) {
    try {
      fn();
    } catch (err) {}
  }

  function lower(value) {
    return String(value || "").toLowerCase();
  }

  function isCustomDataLayer(layer) {
    const id = lower(layer.id);
    const source = lower(layer.source);
    const sourceLayer = lower(layer["source-layer"]);

    const custom =
      id.includes("city") ||
      id.includes("cities") ||
      id.includes("emotion") ||
      id.includes("attention") ||
      id.includes("heat") ||
      id.includes("selected") ||
      id.includes("highlight") ||
      id.includes("point") ||
      id.includes("thermal") ||
      source.includes("city") ||
      source.includes("cities") ||
      source.includes("emotion") ||
      source.includes("attention") ||
      source.includes("heat") ||
      sourceLayer.includes("city") ||
      sourceLayer.includes("cities");

    const basemapLabel =
      id.includes("settlement") ||
      id.includes("place") ||
      id.includes("country") ||
      id.includes("state") ||
      id.includes("province") ||
      id.includes("label");

    return custom && !basemapLabel;
  }

  function classifyLayer(layer) {
    const id = lower(layer.id);
    const sl = lower(layer["source-layer"]);
    const text = id + " " + sl;

    if (text.includes("water") || text.includes("ocean") || text.includes("sea")) return "water";
    if (text.includes("landuse") || text.includes("park") || text.includes("green") || text.includes("wood")) return "park";
    if (text.includes("building")) return "building";
    if (text.includes("road") || text.includes("street") || text.includes("motorway") || text.includes("highway")) return "road";
    if (text.includes("admin") || text.includes("boundary") || text.includes("border")) return "boundary";
    if (text.includes("place") || text.includes("settlement") || text.includes("country") || text.includes("state") || text.includes("label")) return "label";

    return "base";
  }

  function recolorLayer(map, layer) {
    if (!layer || !layer.id) return;
    if (isCustomDataLayer(layer)) return;

    const kind = classifyLayer(layer);

    if (layer.type === "background") {
      safe(() => map.setPaintProperty(layer.id, "background-color", MUTED.background));
      safe(() => map.setPaintProperty(layer.id, "background-opacity", 1));
      return;
    }

    if (layer.type === "fill") {
      if (kind === "water") {
        safe(() => map.setPaintProperty(layer.id, "fill-color", MUTED.water));
        safe(() => map.setPaintProperty(layer.id, "fill-opacity", 0.98));
      } else if (kind === "park") {
        safe(() => map.setPaintProperty(layer.id, "fill-color", MUTED.park));
        safe(() => map.setPaintProperty(layer.id, "fill-opacity", 0.62));
      } else if (kind === "building") {
        safe(() => map.setPaintProperty(layer.id, "fill-color", MUTED.building));
        safe(() => map.setPaintProperty(layer.id, "fill-opacity", 0.56));
      } else {
        safe(() => map.setPaintProperty(layer.id, "fill-color", MUTED.land));
        safe(() => map.setPaintProperty(layer.id, "fill-opacity", 0.96));
      }
      return;
    }

    if (layer.type === "line") {
      if (kind === "road") {
        const id = lower(layer.id);
        const isMajor =
          id.includes("motorway") ||
          id.includes("trunk") ||
          id.includes("primary") ||
          id.includes("major");

        safe(() => map.setPaintProperty(layer.id, "line-color", isMajor ? MUTED.roadMajor : MUTED.roadMinor));
        safe(() => map.setPaintProperty(layer.id, "line-opacity", isMajor ? 0.58 : 0.38));
        safe(() => map.setPaintProperty(layer.id, "line-blur", 0.05));
      } else if (kind === "boundary") {
        safe(() => map.setPaintProperty(layer.id, "line-color", MUTED.boundary));
        safe(() => map.setPaintProperty(layer.id, "line-opacity", 0.58));
      } else if (kind === "water") {
        safe(() => map.setPaintProperty(layer.id, "line-color", MUTED.waterLine));
        safe(() => map.setPaintProperty(layer.id, "line-opacity", 0.44));
      } else {
        safe(() => map.setPaintProperty(layer.id, "line-color", "#b5c4cf"));
        safe(() => map.setPaintProperty(layer.id, "line-opacity", 0.30));
      }
      return;
    }

    if (layer.type === "symbol") {
      safe(() => map.setPaintProperty(layer.id, "text-color", kind === "label" ? MUTED.label : MUTED.labelDim));
      safe(() => map.setPaintProperty(layer.id, "text-halo-color", MUTED.halo));
      safe(() => map.setPaintProperty(layer.id, "text-halo-width", 1.05));
      safe(() => map.setPaintProperty(layer.id, "text-halo-blur", 0.22));
      safe(() => map.setPaintProperty(layer.id, "text-opacity", 0.78));
      safe(() => map.setPaintProperty(layer.id, "icon-opacity", 0.52));
      return;
    }

    if (layer.type === "raster") {
      safe(() => map.setPaintProperty(layer.id, "raster-brightness-min", 0.62));
      safe(() => map.setPaintProperty(layer.id, "raster-brightness-max", 0.88));
      safe(() => map.setPaintProperty(layer.id, "raster-saturation", -0.38));
      safe(() => map.setPaintProperty(layer.id, "raster-contrast", -0.02));
      return;
    }

    if (layer.type === "fill-extrusion") {
      safe(() => map.setPaintProperty(layer.id, "fill-extrusion-color", MUTED.building));
      safe(() => map.setPaintProperty(layer.id, "fill-extrusion-opacity", 0.32));
    }
  }

  function styleCityLayers(map) {
    const style = map.getStyle();
    if (!style || !style.layers) return;

    style.layers.forEach(function (layer) {
      const id = lower(layer.id);
      const source = lower(layer.source);

      const isCityPoint =
        id.includes("city") ||
        id.includes("cities") ||
        id.includes("emotion") ||
        id.includes("attention") ||
        id.includes("selected") ||
        id.includes("point") ||
        source.includes("city") ||
        source.includes("cities");

      if (!isCityPoint) return;

      if (layer.type === "circle") {
        safe(() => map.setPaintProperty(layer.id, "circle-opacity", 0.94));
        safe(() => map.setPaintProperty(layer.id, "circle-stroke-opacity", 0.82));
        safe(() => map.setPaintProperty(layer.id, "circle-stroke-color", "rgba(255,255,255,0.76)"));
        safe(() => map.setPaintProperty(layer.id, "circle-stroke-width", 1.15));
        safe(() => map.setPaintProperty(layer.id, "circle-blur", 0.08));
      }

      if (layer.type === "symbol") {
        safe(() => map.setPaintProperty(layer.id, "text-color", "#24455f"));
        safe(() => map.setPaintProperty(layer.id, "text-halo-color", "rgba(235, 245, 250, 0.88)"));
        safe(() => map.setPaintProperty(layer.id, "text-halo-width", 1.1));
      }
    });
  }

  function setMutedAtmosphere(map) {
    safe(() => {
      if (map.setProjection) {
        map.setProjection("globe");
      }
    });

    safe(() => {
      if (map.setFog) {
        map.setFog({
          color: "#d9eaf4",
          "high-color": "#bed7ea",
          "horizon-blend": 0.07,
          "space-color": "#d7e9f4",
          "star-intensity": 0.0
        });
      }
    });

    safe(() => {
      if (map.setLight) {
        map.setLight({
          anchor: "viewport",
          color: "#ffffff",
          intensity: 0.42
        });
      }
    });
  }

  function applyMutedMapboxBlue(map) {
    if (!map || !map.getStyle) return;

    function run() {
      const style = map.getStyle();
      if (!style || !style.layers) return;

      setMutedAtmosphere(map);

      style.layers.forEach(function (layer) {
        recolorLayer(map, layer);
      });

      styleCityLayers(map);

      map.__mutedBlueStyled = true;
      console.log("[Muted Mapbox Blue] applied.");
    }

    if (map.loaded && map.loaded()) {
      run();
    } else {
      safe(() => map.once("load", run));
    }

    if (!map.__mutedBlueListenerAdded) {
      map.__mutedBlueListenerAdded = true;

      safe(() => {
        map.on("style.load", function () {
          setTimeout(run, 100);
          setTimeout(run, 600);
        });
      });

      safe(() => {
        map.on("idle", function () {
          if (!map.__mutedBlueStyled) {
            run();
          }
        });
      });
    }

    setTimeout(run, 300);
    setTimeout(run, 900);
    setTimeout(run, 1800);
  }

  window.applyMutedMapboxBlue = applyMutedMapboxBlue;

  function installHook() {
    if (!window.mapboxgl || !window.mapboxgl.Map) return false;
    if (window.mapboxgl.Map.__mutedBluePatched) return true;

    const OriginalMap = window.mapboxgl.Map;

    function WrappedMap(options) {
      const map = new OriginalMap(options);
      window.__thermalMapboxMap = map;

      setTimeout(() => applyMutedMapboxBlue(map), 80);
      setTimeout(() => applyMutedMapboxBlue(map), 600);
      setTimeout(() => applyMutedMapboxBlue(map), 1400);

      return map;
    }

    WrappedMap.prototype = OriginalMap.prototype;
    Object.setPrototypeOf(WrappedMap, OriginalMap);

    Object.keys(OriginalMap).forEach(function (key) {
      try {
        WrappedMap[key] = OriginalMap[key];
      } catch (err) {}
    });

    WrappedMap.__mutedBluePatched = true;
    window.mapboxgl.Map = WrappedMap;

    console.log("[Muted Mapbox Blue] mapboxgl.Map hook installed.");
    return true;
  }

  if (!installHook()) {
    let tries = 0;
    const timer = setInterval(function () {
      tries += 1;
      if (installHook() || tries > 600) {
        clearInterval(timer);
      }
    }, 10);
  }

  let followTries = 0;
  const followTimer = setInterval(function () {
    followTries += 1;

    if (window.__thermalMapboxMap) {
      applyMutedMapboxBlue(window.__thermalMapboxMap);
    }

    if (followTries > 30) {
      clearInterval(followTimer);
    }
  }, 300);
})();
