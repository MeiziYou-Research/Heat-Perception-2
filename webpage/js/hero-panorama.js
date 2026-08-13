(function () {
  "use strict";

  if (window.__XLP_HERO_PANORAMA_V19__) return;
  window.__XLP_HERO_PANORAMA_V19__ = true;

  function unlockLegacyState() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.height = "";

    [
      "atlas-locked",
      "atlas-intro-playing",
      "atlas-transitioning",
      "atlas-entering"
    ].forEach(function (className) {
      document.body.classList.remove(className);
    });
  }

  function installTitle(hero) {
    var wrap = hero.querySelector(".opening-title-wrap");

    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "opening-title-wrap";
      hero.appendChild(wrap);
    }

    wrap.querySelectorAll(".hero-panorama-title").forEach(function (node) {
      node.remove();
    });

    var title = document.createElement("h1");
    title.className = "hero-panorama-title";
    title.setAttribute(
      "aria-label",
      "Attention–Emotion Signatures of Urban Heat Perception"
    );

    [
      "Attention–Emotion Signatures",
      "of Urban Heat Perception"
    ].forEach(function (lineText) {
      var line = document.createElement("span");
      line.className = "hero-panorama-title-line";
      line.textContent = lineText;
      title.appendChild(line);
    });

    wrap.appendChild(title);
    wrap.hidden = false;
    wrap.style.opacity = "1";

    return wrap;
  }

  function installDialogues(track) {
    var oldLayer = track.querySelector("#hero-panorama-dialogue-layer");
    if (oldLayer) oldLayer.remove();

    var layer = document.createElement("div");
    layer.id = "hero-panorama-dialogue-layer";
    layer.setAttribute("aria-label", "Heat perception story");

    var definitions = [
      {
        key: "physical",
        label: "Physical Heat:",
        text: "“Urban surfaces and radiation intensify the heat around us.”",
        xRatio: 0.328,
        xOffset: 360,
        start: 0.075,
        end: 0.315
      },
      {
        key: "health",
        label: "Heat & Health:",
        text: "“Prolonged exposure can turn heat into thermal stress and health risk.”",
        xRatio: 0.652,
        xOffset: 40,
        start: 0.355,
        end: 0.655
      },
      {
        key: "perception",
        label: "Heat Perception:",
        text: "“Heat shapes what we notice, feel, and share.”",
        xRatio: 0.863,
        xOffset: -40,
        start: 0.685,
        end: 0.995
      }
    ];

    var cards = definitions.map(function (definition) {
      var card = document.createElement("div");
      card.className = "hero-panorama-dialogue";
      card.dataset.dialogue = definition.key;
      card.dataset.xRatio = String(definition.xRatio);
      card.dataset.xOffset = String(definition.xOffset);
      card.dataset.start = String(definition.start);
      card.dataset.end = String(definition.end);
      card.setAttribute("role", "note");

      var label = document.createElement("span");
      label.className = "hero-panorama-dialogue-label";
      label.textContent = definition.label + " ";

      var text = document.createElement("span");
      text.className = "hero-panorama-dialogue-text";
      text.textContent = definition.text;

      card.appendChild(label);
      card.appendChild(text);
      layer.appendChild(card);

      return card;
    });

    track.appendChild(layer);

    return {
      layer: layer,
      cards: cards
    };
  }

  function installHint(viewport) {
    var oldHint = viewport.querySelector("#hero-panorama-scroll-hint");
    if (oldHint) oldHint.remove();

    var hint = document.createElement("div");
    hint.id = "hero-panorama-scroll-hint";
    hint.textContent = "Scroll to explore";
    viewport.appendChild(hint);
    return hint;
  }

  function init() {
    unlockLegacyState();

    var hero = document.getElementById("opening-hero");
    var viewport = document.getElementById("hero-panorama");
    var image = document.getElementById("hero-panorama-image");

    if (!hero || !viewport || !image) return;
    if (hero.dataset.panoramaV19Bound === "1") return;
    hero.dataset.panoramaV19Bound = "1";

    /*
      v18 used a view-timeline range that Edge could resolve as completed at
      page load. Remove those classes before building the reliable track.
    */
    hero.classList.remove(
      "use-native-scroll-timeline",
      "use-js-scroll-fallback",
      "is-panorama-before",
      "is-panorama-pinned",
      "is-panorama-ended",
      "has-panorama-progress"
    );

    var titleWrap = installTitle(hero);
    var topbar = hero.querySelector(".hero-topbar");

    if (titleWrap.parentElement !== viewport) {
      viewport.appendChild(titleWrap);
    }

    if (topbar && topbar.parentElement !== viewport) {
      viewport.appendChild(topbar);
    }

    var oldTrack = viewport.querySelector("#hero-panorama-track");
    if (oldTrack) {
      oldTrack.replaceWith(image);
    }

    var track = document.createElement("div");
    track.id = "hero-panorama-track";
    viewport.appendChild(track);
    track.appendChild(image);

    var dialogueUI = installDialogues(track);
    var dialogueLayer = dialogueUI.layer;
    var dialogueCards = dialogueUI.cards;
    var hint = installHint(viewport);

    var heroTop = 0;
    var viewportHeight = 1;
    var scrollDistance = 1;
    var maxOffset = 0;
    var rafId = 0;
    var activeDialogueIndex = -1;
    var lastState = "";
    var lastProgress = -1;
    var displayedProgress = -1;
    var targetProgress = 0;
    var lastFrameTime = 0;
    var measuredWidth = 0;
    var measuredHeight = 0;
    var resizeTimer = 0;
    var resumeRafId = 0;

    function clamp(value, minimum, maximum) {
      return Math.min(maximum, Math.max(minimum, value));
    }

    function setStageState(state) {
      if (state === lastState) return;
      lastState = state;

      hero.classList.remove(
        "is-panorama-before",
        "is-panorama-pinned",
        "is-panorama-ended"
      );
      hero.classList.add(state);
    }

    function updateDialogue(progress) {
      var nextIndex = -1;

      for (var index = 0; index < dialogueCards.length; index += 1) {
        var card = dialogueCards[index];
        var start = Number(card.dataset.start);
        var end = Number(card.dataset.end);

        if (progress >= start && progress < end) {
          nextIndex = index;
          break;
        }
      }

      if (nextIndex === activeDialogueIndex) return;
      activeDialogueIndex = nextIndex;

      dialogueCards.forEach(function (card, index) {
        card.classList.toggle(
          "is-visible",
          index === activeDialogueIndex
        );
      });
    }

    function renderProgress(progress) {
      if (Math.abs(progress - lastProgress) < 0.00001) return;
      lastProgress = progress;

      var offset = maxOffset * progress;
      track.style.transform =
        "translate3d(" + (-offset).toFixed(2) + "px, 0, 0)";

      var titleProgress = clamp(progress / 0.24, 0, 1);
      var titleOpacity = 1 - titleProgress;
      titleWrap.style.opacity = titleOpacity.toFixed(4);

      hero.classList.toggle("has-panorama-progress", progress > 0.035);
      updateDialogue(progress);
    }

    function paint(frameTime) {
      rafId = 0;

      var y = window.scrollY;
      var start = heroTop;
      var end = heroTop + scrollDistance;
      var progress;

      if (y < start) {
        progress = 0;
        setStageState("is-panorama-before");
      } else if (y < end) {
        progress = (y - start) / scrollDistance;
        setStageState("is-panorama-pinned");
      } else {
        progress = 1;
        setStageState("is-panorama-ended");
      }

      progress = clamp(progress, 0, 1);
      targetProgress = progress;

      /*
        Smooth the discrete wheel/trackpad scroll steps with a short,
        time-based GPU animation.  The exponential factor behaves the same at
        different refresh rates and converges quickly without overshooting.
      */
      if (displayedProgress < 0 || !frameTime) {
        displayedProgress = targetProgress;
      } else {
        var elapsed = lastFrameTime
          ? Math.min(50, Math.max(1, frameTime - lastFrameTime))
          : 16.7;
        var smoothing = 1 - Math.exp(-elapsed / 55);
        displayedProgress +=
          (targetProgress - displayedProgress) * smoothing;

        if (Math.abs(targetProgress - displayedProgress) < 0.00015) {
          displayedProgress = targetProgress;
        }
      }

      lastFrameTime = frameTime || performance.now();
      renderProgress(displayedProgress);

      if (displayedProgress !== targetProgress) {
        requestPaint();
      } else {
        lastFrameTime = 0;
      }
    }

    function requestPaint() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(paint);
    }

    function measure() {
      /*
        Browsers can report a 0x0 (or nearly 0x0) viewport while the window is
        minimized.  Never commit that transient size to the hero: doing so
        collapses its scroll track and leaves the page looking frozen when the
        window is restored.
      */
      if (
        document.hidden ||
        window.innerWidth < 2 ||
        window.innerHeight < 2
      ) {
        return;
      }

      unlockLegacyState();

      var width = Math.max(1, window.innerWidth);
      viewportHeight = Math.max(1, window.innerHeight);
      measuredWidth = width;
      measuredHeight = viewportHeight;

      var naturalWidth = image.naturalWidth || width;
      var naturalHeight = image.naturalHeight || viewportHeight;
      var aspectRatio = naturalWidth / Math.max(1, naturalHeight);
      var renderedWidth = Math.max(
        width,
        Math.ceil(viewportHeight * aspectRatio)
      );

      maxOffset = Math.max(0, renderedWidth - width);
      scrollDistance = Math.max(
        Math.round(viewportHeight * 0.85),
        Math.round(maxOffset * 1.18),
        1
      );

      hero.style.setProperty(
        "--hero-panorama-viewport-height",
        viewportHeight + "px"
      );
      hero.style.setProperty(
        "--hero-panorama-scroll-distance",
        scrollDistance + "px"
      );
      hero.style.setProperty(
        "height",
        (viewportHeight + scrollDistance) + "px",
        "important"
      );
      hero.style.setProperty(
        "min-height",
        (viewportHeight + scrollDistance) + "px",
        "important"
      );

      track.style.setProperty(
        "width",
        renderedWidth + "px",
        "important"
      );
      track.style.setProperty(
        "height",
        viewportHeight + "px",
        "important"
      );

      image.style.setProperty(
        "width",
        renderedWidth + "px",
        "important"
      );
      image.style.setProperty(
        "height",
        viewportHeight + "px",
        "important"
      );

      dialogueLayer.style.setProperty(
        "width",
        renderedWidth + "px",
        "important"
      );
      dialogueLayer.style.setProperty(
        "height",
        viewportHeight + "px",
        "important"
      );

      dialogueCards.forEach(function (card) {
        var xRatio = Number(card.dataset.xRatio);
        var xOffset = Number(card.dataset.xOffset || 0);
        card.style.left =
          Math.round(renderedWidth * xRatio + xOffset) + "px";
      });

      heroTop = hero.getBoundingClientRect().top + window.scrollY;

      lastState = "";
      lastProgress = -1;
      displayedProgress = -1;
      lastFrameTime = 0;
      paint(0);
    }

    function scheduleMeasure() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 120);
    }

    function resumeLayout() {
      if (document.hidden) return;

      /* Restore scrolling immediately; never wake every chart on the page. */
      unlockLegacyState();
      requestPaint();

      if (resumeRafId) return;
      resumeRafId = window.requestAnimationFrame(function () {
        resumeRafId = 0;

        if (
          window.innerWidth !== measuredWidth ||
          window.innerHeight !== measuredHeight
        ) {
          measure();
        } else {
          requestPaint();
        }
      });
    }

    window.addEventListener("scroll", requestPaint, {
      passive: true
    });

    window.addEventListener("resize", scheduleMeasure, {
      passive: true
    });

    window.addEventListener("orientationchange", scheduleMeasure, {
      passive: true
    });

    /*
      Switching tabs only schedules one exact repaint. It does not traverse
      window globals, dispatch synthetic resize events, or restart a loop.
    */
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) resumeLayout();
    }, { passive: true });

    window.addEventListener("focus", resumeLayout, { passive: true });

    window.addEventListener("pageshow", function (event) {
      if (event.persisted) {
        window.requestAnimationFrame(measure);
      } else {
        resumeLayout();
      }
    }, { passive: true });

    image.addEventListener("load", measure, { once: true });

    /*
      Prevent Edge from restoring a stale end position on a direct reload,
      while preserving genuine back/forward navigation.
    */
    try {
      history.scrollRestoration = "manual";

      var navigation = performance.getEntriesByType("navigation")[0];
      if (
        navigation &&
        navigation.type !== "back_forward" &&
        !location.hash
      ) {
        window.scrollTo(0, 0);
      }
    } catch (error) {}

    measure();

    if (image.complete && typeof image.decode === "function") {
      image.decode()
        .catch(function () {})
        .then(measure);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
