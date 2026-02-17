(function () {
  "use strict";

  const config = {
    appStoreUrl: "https://apps.apple.com/us/app/wordflux-word-puzzles/id6757514622",
    appId: "6757514622",
    privacyUrl: "privacy.html",
    termsUrl: "terms-of-service.html",
    heroStackItems: {
      left: {
        src: "assets/screenshots/adventure-mode-levels.png",
        alt: "WordFlux adventure mode level map"
      },
      center: {
        src: "assets/screenshots/word-game.png",
        alt: "WordFlux word gameplay board"
      },
      right: {
        src: "assets/screenshots/theme-game-landing.png",
        alt: "WordFlux theme mode selection screen"
      }
    },
    featuredMediaVideo: {
      label: "Word Game",
      title: "Fast rounds. Clean focus.",
      description: "Solve clue-driven rounds before time runs out.",
      src: "assets/videos/web/word-game-promo-balanced-h264.mp4",
      fallbackSrc: "assets/videos/word-game-promo.mp4",
      poster: "assets/screenshots/word-game.png",
      fallbackImage: "assets/screenshots/word-game.png"
    },
    gameplayVideos: [],
    screenshotItems: [
      { src: "assets/screenshots/adventure-mode-levels.png", caption: "", alt: "WordFlux adventure mode progression map screen" },
      { src: "assets/screenshots/landing-page-blue.png", caption: "", alt: "WordFlux blue landing page with game options" },
      { src: "assets/screenshots/landing-page-pink.png", caption: "", alt: "WordFlux pink landing page with game options" },
      { src: "assets/screenshots/landing-page-purple.png", caption: "", alt: "WordFlux purple landing page with game options" },
      { src: "assets/screenshots/landing-page-teal.png", caption: "", alt: "WordFlux teal landing page with game options" },
      { src: "assets/screenshots/leaderboard.png", caption: "", alt: "WordFlux leaderboard screen" },
      { src: "assets/screenshots/profile.png", caption: "", alt: "WordFlux player profile and achievements screen" },
      { src: "assets/screenshots/singpleplayermodes.png", caption: "", alt: "WordFlux single player mode selection screen" },
      { src: "assets/screenshots/theme-game-landing.png", caption: "", alt: "WordFlux theme mode landing screen" },
      { src: "assets/screenshots/themeGame.png", caption: "", alt: "WordFlux theme gameplay screen" },
      { src: "assets/screenshots/word-game.png", caption: "", alt: "WordFlux word game board screen" },
      { src: "assets/screenshots/wordJourney.png", caption: "", alt: "WordFlux word journey vocabulary tracking screen" }
    ],
    modeItems: [
      {
        label: "Practice Mode",
        description: "Play at your own pace with hints and no timer pressure.",
        preview: { src: "assets/screenshots/word-game.png", alt: "Practice mode gameplay preview" }
      },
      {
        label: "Adventure Mode",
        description: "Progress through 75 levels with increasing challenge and tighter choices.",
        preview: { src: "assets/screenshots/adventure-mode-levels.png", alt: "Adventure mode level map preview" }
      },
      {
        label: "Theme Mode",
        description: "Solve focused rounds across curated themes with clue-driven prompts.",
        preview: { src: "assets/screenshots/themeGame.png", alt: "Theme mode gameplay preview" }
      },
      {
        label: "Multiplayer Mode",
        description: "Compete in real time with friends and push for leaderboard rank.",
        preview: { src: "assets/screenshots/leaderboard.png", alt: "Multiplayer leaderboard preview" }
      }
    ]
  };

  window.wordFluxConfig = config;

  const dom = {
    ctas: Array.from(document.querySelectorAll(".js-app-cta")),
    heroVideoWrap: document.getElementById("hero-video-wrap"),
    heroVideo: document.getElementById("hero-video"),
    heroFallbackStack: document.getElementById("hero-fallback-stack"),
    heroFallbackLeftImage: document.getElementById("hero-fallback-left-image"),
    heroFallbackCenterImage: document.getElementById("hero-fallback-center-image"),
    heroFallbackRightImage: document.getElementById("hero-fallback-right-image"),
    playSelector: document.getElementById("play-selector"),
    playPreviewFigure: document.querySelector(".play-preview"),
    playPreviewImage: document.getElementById("play-preview-image"),
    featuredMediaWrap: document.getElementById("featured-media-wrap"),
    featuredMediaVideo: document.getElementById("featured-media-video"),
    featuredMediaFallback: document.getElementById("featured-media-fallback"),
    featuredMediaLabel: document.getElementById("featured-media-label"),
    featuredMediaTitle: document.getElementById("featured-media-title"),
    featuredMediaText: document.getElementById("featured-media-text"),
    screenshotRail: document.getElementById("screenshot-rail"),
    screenshotGrid: document.getElementById("screenshot-grid"),
    videoWrap: document.getElementById("video-wrap"),
    videoGrid: document.getElementById("video-grid"),
    modal: document.getElementById("qr-modal"),
    qrImage: document.getElementById("qr-image"),
    qrActionLink: document.getElementById("app-store-link"),
    privacyLink: document.getElementById("privacy-link"),
    termsLink: document.getElementById("terms-link"),
    year: document.getElementById("year")
  };

  let lastActiveElement = null;
  let activeModeIndex = 0;
  let modePreviewSwapToken = 0;
  let featuredVideoObserver = null;
  const unavailableVideoSources = new Set();
  const reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const railState = {
    animationFrameId: 0,
    lastFrameTimestamp: 0,
    offsetX: 0,
    loopWidth: 0,
    speed: 0.034,
    uniqueCount: 0,
    cards: [],
    hydrationObserver: null,
    dragging: false,
    dragPointerId: null,
    dragStartX: 0,
    dragStartOffset: 0
  };
  const transparentPlaceholder = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  function shuffleItems(list) {
    const shuffled = list.slice();
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  }

  function isLandingVariant(item) {
    if (!item || typeof item.src !== "string") {
      return false;
    }
    return item.src.indexOf("assets/screenshots/landing-page-") === 0;
  }

  function getOptimizedRailSrc(source) {
    if (typeof source !== "string" || source.length === 0 || source.indexOf("assets/screenshots/") !== 0) {
      return source;
    }

    const fileName = source.split("/").pop();
    if (typeof fileName !== "string" || fileName.length === 0) {
      return source;
    }

    const stem = fileName.replace(/\.(png|jpg|jpeg)$/i, "");
    if (!stem) {
      return source;
    }

    return "assets/screenshots/rail/" + stem + ".jpg";
  }

  function distributeScreenshotItems(items) {
    const landingItems = [];
    const otherItems = [];

    items.forEach(function (item) {
      if (isLandingVariant(item)) {
        landingItems.push(item);
      } else {
        otherItems.push(item);
      }
    });

    if (landingItems.length <= 1 || otherItems.length === 0) {
      return shuffleItems(items);
    }

    const shuffledLanding = shuffleItems(landingItems);
    const shuffledOthers = shuffleItems(otherItems);

    // If not enough separators exist, fall back to plain shuffle.
    if (shuffledLanding.length > shuffledOthers.length + 1) {
      return shuffleItems(items);
    }

    const slotIndices = shuffleItems(
      Array.from({ length: shuffledOthers.length + 1 }, function (_, idx) {
        return idx;
      })
    )
      .slice(0, shuffledLanding.length)
      .sort(function (a, b) {
        return a - b;
      });

    const result = [];
    let landingCursor = 0;

    for (let slot = 0; slot <= shuffledOthers.length; slot += 1) {
      if (landingCursor < slotIndices.length && slotIndices[landingCursor] === slot) {
        result.push(shuffledLanding[landingCursor]);
        landingCursor += 1;
      }
      if (slot < shuffledOthers.length) {
        result.push(shuffledOthers[slot]);
      }
    }

    return result;
  }

  function isPhoneDevice() {
    const ua = navigator.userAgent.toLowerCase();
    return /iphone|ipod|android.+mobile|windows phone/.test(ua);
  }

  function setFooterLinks() {
    dom.privacyLink.href = config.privacyUrl;
    dom.termsLink.href = config.termsUrl;
    dom.year.textContent = String(new Date().getFullYear());
  }

  function resetVideoElement(videoElement) {
    videoElement.pause();
    videoElement.removeAttribute("src");
    videoElement.removeAttribute("data-current-src");
    videoElement.removeAttribute("data-preview-crop-applied");
    videoElement.style.removeProperty("--preview-pos-x");
    videoElement.style.removeProperty("--preview-pos-y");
    videoElement.style.removeProperty("--preview-zoom");
    videoElement.classList.remove("is-preview-crop-ready");
    videoElement.load();
  }

  function tryPlayMutedLoop(videoElement) {
    const playPromise = videoElement.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {
        /* Autoplay can be blocked depending on browser heuristics. */
      });
    }
  }

  function chooseVideoSource(primarySrc, fallbackSrc) {
    const hasPrimary = typeof primarySrc === "string" && primarySrc.length > 0;
    const hasFallback = typeof fallbackSrc === "string" && fallbackSrc.length > 0;

    if (!hasPrimary && !hasFallback) {
      return {
        primary: "",
        fallback: ""
      };
    }

    if (!hasPrimary && hasFallback) {
      return {
        primary: fallbackSrc,
        fallback: ""
      };
    }

    if (!hasFallback) {
      return {
        primary: unavailableVideoSources.has(primarySrc) ? "" : primarySrc,
        fallback: ""
      };
    }

    if (unavailableVideoSources.has(primarySrc)) {
      return {
        primary: fallbackSrc,
        fallback: ""
      };
    }

    return {
      primary: primarySrc,
      fallback: fallbackSrc
    };
  }

  function loadLoopingVideo(options) {
    const videoElement = options.videoElement;
    const primarySrc = options.primarySrc;
    const fallbackSrc = options.fallbackSrc;
    const poster = options.poster;
    const onFatal = options.onFatal;
    const onReady = options.onReady;

    const resolved = chooseVideoSource(primarySrc, fallbackSrc);
    if (!resolved.primary) {
      if (typeof onFatal === "function") {
        onFatal();
      }
      return;
    }

    if (typeof poster === "string" && poster.length > 0) {
      videoElement.poster = poster;
    } else {
      videoElement.removeAttribute("poster");
    }

    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    videoElement.preload = "metadata";

    const handleLoadedData = function () {
      if (typeof onReady === "function") {
        onReady();
      }
      tryPlayMutedLoop(videoElement);
    };

    const handleError = function () {
      unavailableVideoSources.add(resolved.primary);
      if (resolved.fallback) {
        loadLoopingVideo({
          videoElement: videoElement,
          primarySrc: resolved.fallback,
          fallbackSrc: "",
          poster: poster,
          onFatal: onFatal,
          onReady: onReady
        });
        return;
      }
      if (typeof onFatal === "function") {
        onFatal();
      }
    };

    videoElement.addEventListener("loadeddata", handleLoadedData, { once: true });
    videoElement.addEventListener("error", handleError, { once: true });
    videoElement.dataset.currentSrc = resolved.primary;
    videoElement.src = resolved.primary;
    videoElement.load();
  }

  function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function detectVisibleVideoBounds(videoElement) {
    if (!(videoElement instanceof HTMLVideoElement)) {
      return null;
    }
    if (!videoElement.videoWidth || !videoElement.videoHeight) {
      return null;
    }

    const sampleWidth = Math.min(360, videoElement.videoWidth);
    const sampleHeight = Math.max(180, Math.round((sampleWidth * videoElement.videoHeight) / videoElement.videoWidth));
    const canvas = document.createElement("canvas");
    canvas.width = sampleWidth;
    canvas.height = sampleHeight;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return null;
    }

    context.drawImage(videoElement, 0, 0, sampleWidth, sampleHeight);
    const frame = context.getImageData(0, 0, sampleWidth, sampleHeight);
    const data = frame.data;

    let left = sampleWidth;
    let right = -1;
    let top = sampleHeight;
    let bottom = -1;
    const threshold = 20;

    for (let y = 0; y < sampleHeight; y += 1) {
      const rowOffset = y * sampleWidth * 4;
      for (let x = 0; x < sampleWidth; x += 1) {
        const pixelIndex = rowOffset + x * 4;
        const r = data[pixelIndex];
        const g = data[pixelIndex + 1];
        const b = data[pixelIndex + 2];
        const a = data[pixelIndex + 3];

        if (a < 16) {
          continue;
        }

        // Detect non-black regions to isolate the app preview area.
        if (r > threshold || g > threshold || b > threshold) {
          if (x < left) {
            left = x;
          }
          if (x > right) {
            right = x;
          }
          if (y < top) {
            top = y;
          }
          if (y > bottom) {
            bottom = y;
          }
        }
      }
    }

    if (right <= left || bottom <= top) {
      return null;
    }

    const width = right - left + 1;
    const height = bottom - top + 1;
    const widthRatio = width / sampleWidth;
    const heightRatio = height / sampleHeight;

    if (widthRatio > 0.97 && heightRatio > 0.97) {
      return null;
    }

    const padX = Math.round(width * 0.07);
    const padY = Math.round(height * 0.06);
    left = Math.max(0, left - padX);
    right = Math.min(sampleWidth - 1, right + padX);
    top = Math.max(0, top - padY);
    bottom = Math.min(sampleHeight - 1, bottom + padY);

    const finalWidth = right - left + 1;
    const finalHeight = bottom - top + 1;
    const centerX = ((left + right) / 2 / sampleWidth) * 100;
    const centerY = ((top + bottom) / 2 / sampleHeight) * 100;
    const finalWidthRatio = finalWidth / sampleWidth;
    const finalHeightRatio = finalHeight / sampleHeight;

    // Stronger fill targets to remove side black bars from square exports.
    const zoomFromWidth = 0.96 / finalWidthRatio;
    const zoomFromHeight = 0.96 / finalHeightRatio;
    const zoom = clampNumber(Math.max(zoomFromWidth, zoomFromHeight), 1.08, 3);

    return {
      posX: clampNumber(centerX, 10, 90),
      posY: clampNumber(centerY, 8, 92),
      zoom: zoom
    };
  }

  function applyVideoPreviewCrop(videoElement) {
    if (!(videoElement instanceof HTMLVideoElement)) {
      return;
    }
    if (videoElement.dataset.previewCropApplied === "true") {
      return;
    }

    const currentSource = videoElement.dataset.currentSrc || videoElement.currentSrc || "";
    if (
      currentSource.indexOf("-cropped-h264.mp4") !== -1 ||
      currentSource.indexOf("-cropped.mp4") !== -1 ||
      currentSource.indexOf("-clean-h264.mp4") !== -1 ||
      currentSource.indexOf("-balanced-h264.mp4") !== -1
    ) {
      videoElement.style.setProperty("--preview-pos-x", "50%");
      videoElement.style.setProperty("--preview-pos-y", "50%");
      videoElement.style.setProperty("--preview-zoom", "1");
      videoElement.dataset.previewCropApplied = "true";
      videoElement.classList.add("is-preview-crop-ready");
      return;
    }

    const applyDetectedCrop = function () {
      const bounds = detectVisibleVideoBounds(videoElement);
      if (bounds) {
        videoElement.style.setProperty("--preview-pos-x", bounds.posX.toFixed(2) + "%");
        videoElement.style.setProperty("--preview-pos-y", bounds.posY.toFixed(2) + "%");
        videoElement.style.setProperty("--preview-zoom", bounds.zoom.toFixed(3));
      } else {
        // Neutral fallback for already-cropped portrait previews.
        videoElement.style.setProperty("--preview-pos-x", "50%");
        videoElement.style.setProperty("--preview-pos-y", "50%");
        videoElement.style.setProperty("--preview-zoom", "1");
      }
      videoElement.dataset.previewCropApplied = "true";
      videoElement.classList.add("is-preview-crop-ready");
    };

    const scheduleCrop = function () {
      if (typeof videoElement.requestVideoFrameCallback === "function") {
        videoElement.requestVideoFrameCallback(function () {
          applyDetectedCrop();
        });
        return;
      }
      window.setTimeout(function () {
        applyDetectedCrop();
      }, 80);
    };

    if (videoElement.readyState >= 2) {
      scheduleCrop();
      return;
    }

    videoElement.addEventListener(
      "loadeddata",
      function () {
        scheduleCrop();
      },
      { once: true }
    );
  }

  function renderHeroStack() {
    if (!(dom.heroFallbackStack instanceof HTMLElement) || !(dom.heroVideoWrap instanceof HTMLElement) || !(dom.heroVideo instanceof HTMLVideoElement)) {
      return;
    }

    const heroStackItems = config.heroStackItems || {};
    const left = heroStackItems.left || {};
    const center = heroStackItems.center || {};
    const right = heroStackItems.right || {};

    if (dom.heroFallbackLeftImage instanceof HTMLImageElement) {
      if (typeof left.src === "string" && left.src.length > 0) {
        dom.heroFallbackLeftImage.src = left.src;
      }
      dom.heroFallbackLeftImage.alt = left.alt || "WordFlux adventure mode screenshot";
    }

    if (dom.heroFallbackCenterImage instanceof HTMLImageElement) {
      if (typeof center.src === "string" && center.src.length > 0) {
        dom.heroFallbackCenterImage.src = center.src;
      }
      dom.heroFallbackCenterImage.alt = center.alt || "WordFlux gameplay screenshot";
    }

    if (dom.heroFallbackRightImage instanceof HTMLImageElement) {
      if (typeof right.src === "string" && right.src.length > 0) {
        dom.heroFallbackRightImage.src = right.src;
      }
      dom.heroFallbackRightImage.alt = right.alt || "WordFlux theme mode screenshot";
    }

    dom.heroVideoWrap.classList.add("is-hidden");
    dom.heroFallbackStack.classList.remove("is-hidden");
    resetVideoElement(dom.heroVideo);
  }

  function renderModeChips() {
    if (!(dom.playSelector instanceof HTMLElement) || !Array.isArray(config.modeItems) || !config.modeItems.length) {
      return;
    }

    dom.playSelector.innerHTML = config.modeItems
      .map(function (item, index) {
        const active = index === activeModeIndex;
        return (
          '<button class="play-chip' +
          (active ? " is-active" : "") +
          '" type="button" role="listitem" data-mode-index="' +
          index +
          '" aria-pressed="' +
          (active ? "true" : "false") +
          '">' +
          '<span class="play-chip-title">' +
          item.label +
          "</span>" +
          '<span class="play-chip-subtitle">' +
          (item.description || "") +
          "</span>" +
          "</button>"
        );
      })
      .join("");
  }

  function clearModePreviewGhosts() {
    if (!(dom.playPreviewFigure instanceof HTMLElement)) {
      return;
    }

    Array.from(dom.playPreviewFigure.querySelectorAll(".preview-ghost")).forEach(function (node) {
      node.remove();
    });
  }

  function setModePreviewImmediate(src, alt) {
    if (!(dom.playPreviewImage instanceof HTMLImageElement)) {
      return;
    }

    dom.playPreviewImage.classList.remove("is-mode-preview-next", "is-mode-preview-in");
    dom.playPreviewImage.src = src;
    dom.playPreviewImage.alt = alt;
    clearModePreviewGhosts();
  }

  function animateModePreview(src, alt) {
    if (!(dom.playPreviewImage instanceof HTMLImageElement)) {
      return;
    }

    const currentSrc = dom.playPreviewImage.getAttribute("src") || "";
    if (reducedMotionMediaQuery.matches || !currentSrc || currentSrc === src || !(dom.playPreviewFigure instanceof HTMLElement)) {
      setModePreviewImmediate(src, alt);
      return;
    }

    const transitionToken = ++modePreviewSwapToken;
    const preloader = new Image();
    preloader.decoding = "async";
    let committed = false;

    const commitTransition = function () {
      if (committed || transitionToken !== modePreviewSwapToken) {
        return;
      }
      committed = true;

      clearModePreviewGhosts();
      const ghost = dom.playPreviewImage.cloneNode(true);
      ghost.removeAttribute("id");
      ghost.classList.add("preview-ghost");
      ghost.setAttribute("aria-hidden", "true");
      dom.playPreviewFigure.appendChild(ghost);

      dom.playPreviewImage.classList.remove("is-mode-preview-in");
      dom.playPreviewImage.classList.add("is-mode-preview-next");
      dom.playPreviewImage.src = src;
      dom.playPreviewImage.alt = alt;

      window.requestAnimationFrame(function () {
        if (transitionToken !== modePreviewSwapToken) {
          return;
        }
        ghost.classList.add("is-mode-preview-out");
        dom.playPreviewImage.classList.add("is-mode-preview-in");
        dom.playPreviewImage.classList.remove("is-mode-preview-next");
      });

      window.setTimeout(function () {
        ghost.remove();
        if (transitionToken === modePreviewSwapToken) {
          dom.playPreviewImage.classList.remove("is-mode-preview-in");
        }
      }, 420);
    };

    preloader.onload = commitTransition;
    preloader.onerror = function () {
      if (transitionToken !== modePreviewSwapToken) {
        return;
      }
      setModePreviewImmediate(src, alt);
    };
    preloader.src = src;

    if (preloader.complete) {
      commitTransition();
    }
  }

  function renderModePreview(animate) {
    if (!(dom.playPreviewImage instanceof HTMLImageElement)) {
      return;
    }
    if (!Array.isArray(config.modeItems) || !config.modeItems.length) {
      return;
    }

    const currentMode = config.modeItems[activeModeIndex] || config.modeItems[0];
    const preview = currentMode.preview || {};
    const nextSrc = preview.src || config.heroStackItems.center.src;
    const nextAlt = preview.alt || currentMode.label + " mode preview";

    if (animate) {
      animateModePreview(nextSrc, nextAlt);
      return;
    }

    setModePreviewImmediate(nextSrc, nextAlt);
  }

  function bindModeSelector() {
    if (!(dom.playSelector instanceof HTMLElement)) {
      return;
    }

    dom.playSelector.addEventListener("click", function (event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const chip = target.closest(".play-chip");
      if (!(chip instanceof HTMLElement)) {
        return;
      }

      const nextIndex = Number(chip.dataset.modeIndex);
      if (!Number.isInteger(nextIndex) || nextIndex < 0 || nextIndex >= config.modeItems.length || nextIndex === activeModeIndex) {
        return;
      }

      activeModeIndex = nextIndex;
      renderModeChips();
      renderModePreview(true);
    });
  }

  function buildScreenshotCards(items, eagerCount) {
    return items
      .map(function (item, index) {
        const eager = index < eagerCount;
        const loadingValue = eager ? "eager" : "lazy";
        const fetchPriority = eager ? "high" : "low";
        const displaySrc = item.src;
        const optimizedSrc = getOptimizedRailSrc(displaySrc);
        const initialSrc = eager ? optimizedSrc : transparentPlaceholder;
        const deferredAttrs = eager ? "" : ' data-src="' + optimizedSrc + '"';
        const captionMarkup = item.caption
          ? '<figcaption class="screenshot-caption">' + item.caption + "</figcaption>"
          : "";

        return (
          '<figure class="screenshot-card">' +
          '<img src="' +
          initialSrc +
          '" alt="' +
          item.alt +
          '" loading="' +
          loadingValue +
          '" fetchpriority="' +
          fetchPriority +
          '" data-fallback-src="' +
          displaySrc +
          '"' +
          deferredAttrs +
          '" decoding="async" width="563" height="1150" />' +
          captionMarkup +
          "</figure>"
        );
      })
      .join("");
  }

  function disconnectRailHydrationObserver() {
    if (railState.hydrationObserver instanceof IntersectionObserver) {
      railState.hydrationObserver.disconnect();
      railState.hydrationObserver = null;
    }
  }

  function hydrateRailImage(image) {
    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    const deferredSource = image.dataset.src;
    if (typeof deferredSource !== "string" || deferredSource.length === 0) {
      return;
    }

    image.removeAttribute("data-src");
    image.src = deferredSource;
  }

  function setupRailImageHydration() {
    if (!(dom.screenshotGrid instanceof HTMLElement) || !(dom.screenshotRail instanceof HTMLElement)) {
      return;
    }

    disconnectRailHydrationObserver();

    const deferredImages = Array.from(dom.screenshotGrid.querySelectorAll("img[data-src]"));
    if (!deferredImages.length) {
      return;
    }

    // Prime a few cards immediately so the first loop never feels empty.
    deferredImages.slice(0, 4).forEach(hydrateRailImage);

    if (!("IntersectionObserver" in window)) {
      deferredImages.forEach(hydrateRailImage);
      return;
    }

    railState.hydrationObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          const image = entry.target;
          hydrateRailImage(image);
          observer.unobserve(image);
        });
      },
      {
        root: dom.screenshotRail,
        rootMargin: "180% 0px",
        threshold: 0.01
      }
    );

    deferredImages.forEach(function (image) {
      railState.hydrationObserver.observe(image);
    });
  }

  function handleRailImageError(event) {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) {
      return;
    }
    if (!target.closest(".screenshot-card")) {
      return;
    }

    const fallback = target.dataset.fallbackSrc;
    if (typeof fallback !== "string" || fallback.length === 0 || target.dataset.fallbackApplied === "true") {
      return;
    }

    target.dataset.fallbackApplied = "true";
    target.removeAttribute("data-src");
    target.src = fallback;
  }

  function stopScreenshotRail() {
    if (railState.animationFrameId) {
      window.cancelAnimationFrame(railState.animationFrameId);
      railState.animationFrameId = 0;
    }
    railState.lastFrameTimestamp = 0;
  }

  function normalizeRailOffset() {
    if (railState.loopWidth <= 0) {
      railState.offsetX = 0;
      return;
    }

    while (railState.offsetX <= -railState.loopWidth) {
      railState.offsetX += railState.loopWidth;
    }
    while (railState.offsetX > 0) {
      railState.offsetX -= railState.loopWidth;
    }
  }

  function applyRailTransform() {
    dom.screenshotGrid.style.transform = "translate3d(" + railState.offsetX.toFixed(2) + "px, 0, 0)";
  }

  function applyScreenshotParallax() {
    if (!dom.screenshotRail || reducedMotionMediaQuery.matches) {
      return;
    }

    const viewportRect = dom.screenshotRail.getBoundingClientRect();
    if (viewportRect.width <= 0) {
      return;
    }

    const viewportCenter = viewportRect.left + viewportRect.width / 2;
    railState.cards.forEach(function (card) {
      const image = card.querySelector("img");
      if (!(image instanceof HTMLImageElement)) {
        return;
      }

      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distanceRatio = (cardCenter - viewportCenter) / viewportRect.width;
      const shiftX = Math.max(-18, Math.min(18, distanceRatio * -36));
      image.style.transform = "translate3d(" + shiftX.toFixed(2) + "px, 0, 0)";
    });
  }

  function measureRailLoop() {
    const uniqueCount = railState.uniqueCount;
    if (uniqueCount === 0) {
      railState.cards = [];
      railState.loopWidth = 0;
      return;
    }

    railState.cards = Array.from(dom.screenshotGrid.querySelectorAll(".screenshot-card"));
    if (!railState.cards.length || railState.cards.length < uniqueCount) {
      railState.loopWidth = 0;
      return;
    }

    const endCard = railState.cards[uniqueCount - 1];
    railState.loopWidth = endCard.offsetLeft + endCard.offsetWidth;
  }

  function updateRailLayout() {
    if (!dom.screenshotGrid.classList.contains("is-looping")) {
      return;
    }
    measureRailLoop();
    normalizeRailOffset();
    applyRailTransform();
    applyScreenshotParallax();
  }

  function animateScreenshotRail(timestamp) {
    if (!dom.screenshotGrid.classList.contains("is-looping")) {
      return;
    }

    if (!railState.lastFrameTimestamp) {
      railState.lastFrameTimestamp = timestamp;
    }

    const elapsed = Math.min(48, timestamp - railState.lastFrameTimestamp);
    railState.lastFrameTimestamp = timestamp;

    if (!railState.dragging) {
      railState.offsetX -= elapsed * railState.speed;
      normalizeRailOffset();
    }

    applyRailTransform();
    applyScreenshotParallax();
    railState.animationFrameId = window.requestAnimationFrame(animateScreenshotRail);
  }

  function startScreenshotRail() {
    if (!dom.screenshotGrid.classList.contains("is-looping") || reducedMotionMediaQuery.matches || railState.loopWidth <= 0) {
      return;
    }
    if (railState.animationFrameId) {
      return;
    }
    railState.animationFrameId = window.requestAnimationFrame(animateScreenshotRail);
  }

  function handleRailPointerDown(event) {
    if (!dom.screenshotGrid.classList.contains("is-looping")) {
      return;
    }

    railState.dragging = true;
    railState.dragPointerId = event.pointerId;
    railState.dragStartX = event.clientX;
    railState.dragStartOffset = railState.offsetX;
    dom.screenshotRail.classList.add("is-dragging");
    dom.screenshotRail.setPointerCapture(event.pointerId);
  }

  function handleRailPointerMove(event) {
    if (!railState.dragging || event.pointerId !== railState.dragPointerId) {
      return;
    }

    railState.offsetX = railState.dragStartOffset + (event.clientX - railState.dragStartX);
    normalizeRailOffset();
    applyRailTransform();
    applyScreenshotParallax();
  }

  function handleRailPointerUp(event) {
    if (!railState.dragging || event.pointerId !== railState.dragPointerId) {
      return;
    }

    railState.dragging = false;
    railState.dragPointerId = null;
    dom.screenshotRail.classList.remove("is-dragging");
    if (dom.screenshotRail.hasPointerCapture(event.pointerId)) {
      dom.screenshotRail.releasePointerCapture(event.pointerId);
    }
  }

  function handleRailWheel(event) {
    if (!dom.screenshotGrid.classList.contains("is-looping")) {
      return;
    }

    const absX = Math.abs(event.deltaX);
    const absY = Math.abs(event.deltaY);
    const shiftHorizontal = event.shiftKey && absY > 0;
    const hasHorizontalIntent = absX > absY;

    if (!hasHorizontalIntent && !shiftHorizontal) {
      return;
    }

    const horizontalDelta = shiftHorizontal && absX < 0.1 ? event.deltaY : event.deltaX;
    event.preventDefault();
    railState.offsetX -= horizontalDelta * 0.48;
    normalizeRailOffset();
    applyRailTransform();
    applyScreenshotParallax();
  }

  function handleRailVisibilityChange() {
    if (document.hidden) {
      stopScreenshotRail();
      if (dom.featuredMediaVideo instanceof HTMLVideoElement) {
        dom.featuredMediaVideo.pause();
      }
      return;
    }
    startScreenshotRail();
    if (dom.featuredMediaVideo instanceof HTMLVideoElement && dom.featuredMediaVideo.dataset.loaded === "true") {
      tryPlayMutedLoop(dom.featuredMediaVideo);
    }
  }

  function bindScreenshotRail() {
    if (!(dom.screenshotRail instanceof HTMLElement)) {
      return;
    }

    dom.screenshotRail.addEventListener("pointerdown", handleRailPointerDown);
    dom.screenshotRail.addEventListener("pointermove", handleRailPointerMove);
    dom.screenshotRail.addEventListener("pointerup", handleRailPointerUp);
    dom.screenshotRail.addEventListener("pointercancel", handleRailPointerUp);
    dom.screenshotRail.addEventListener("pointerleave", handleRailPointerUp);
    dom.screenshotRail.addEventListener("wheel", handleRailWheel, { passive: false });
    dom.screenshotGrid.addEventListener("error", handleRailImageError, true);
    window.addEventListener("resize", updateRailLayout);
    document.addEventListener("visibilitychange", handleRailVisibilityChange);
  }

  function renderScreenshots() {
    const items = distributeScreenshotItems(config.screenshotItems);
    const useLoopingRail = items.length > 1 && !reducedMotionMediaQuery.matches;

    stopScreenshotRail();
    railState.offsetX = 0;
    railState.uniqueCount = items.length;

    if (useLoopingRail) {
      dom.screenshotGrid.classList.add("is-looping");
      dom.screenshotGrid.classList.remove("is-manual");
      dom.screenshotGrid.innerHTML = buildScreenshotCards(items.concat(items), 4);
      setupRailImageHydration();
      window.requestAnimationFrame(function () {
        updateRailLayout();
        startScreenshotRail();
      });
      return;
    }

    dom.screenshotGrid.classList.remove("is-looping");
    dom.screenshotGrid.classList.add("is-manual");
    dom.screenshotGrid.style.transform = "";
    dom.screenshotGrid.innerHTML = buildScreenshotCards(items, 2);
    setupRailImageHydration();
    railState.cards = [];
    railState.loopWidth = 0;
  }

  function renderVideos() {
    if (!Array.isArray(config.gameplayVideos) || config.gameplayVideos.length === 0) {
      dom.videoWrap.classList.add("is-hidden");
      return;
    }

    const cards = config.gameplayVideos
      .map(function (video) {
        return (
          '<figure class="video-card">' +
          '<video controls preload="metadata" playsinline src="' +
          video.src +
          '"></video>' +
          "</figure>"
        );
      })
      .join("");

    dom.videoGrid.innerHTML = cards;
    dom.videoWrap.classList.remove("is-hidden");
  }

  function hideFeaturedMediaVideo() {
    if (!(dom.featuredMediaVideo instanceof HTMLVideoElement) || !(dom.featuredMediaFallback instanceof HTMLImageElement)) {
      return;
    }

    resetVideoElement(dom.featuredMediaVideo);
    dom.featuredMediaVideo.classList.add("is-hidden");
    dom.featuredMediaFallback.classList.remove("is-hidden");
  }

  function renderFeaturedMedia() {
    if (
      !(dom.featuredMediaWrap instanceof HTMLElement) ||
      !(dom.featuredMediaVideo instanceof HTMLVideoElement) ||
      !(dom.featuredMediaFallback instanceof HTMLImageElement) ||
      !(dom.featuredMediaLabel instanceof HTMLElement) ||
      !(dom.featuredMediaTitle instanceof HTMLElement) ||
      !(dom.featuredMediaText instanceof HTMLElement)
    ) {
      return;
    }

    const featured = config.featuredMediaVideo;
    if (!(featured && typeof featured === "object")) {
      dom.featuredMediaWrap.classList.add("is-hidden");
      return;
    }

    if (typeof featured.label === "string" && featured.label.length > 0) {
      dom.featuredMediaLabel.textContent = featured.label;
    }
    if (typeof featured.title === "string" && featured.title.length > 0) {
      dom.featuredMediaTitle.textContent = featured.title;
    }
    if (typeof featured.description === "string" && featured.description.length > 0) {
      dom.featuredMediaText.textContent = featured.description;
    }

    const fallbackImage = typeof featured.fallbackImage === "string" && featured.fallbackImage.length > 0 ? featured.fallbackImage : featured.poster;
    if (typeof fallbackImage === "string" && fallbackImage.length > 0) {
      dom.featuredMediaFallback.src = fallbackImage;
    }
    dom.featuredMediaFallback.alt = (featured.label || "WordFlux") + " gameplay video fallback image";
    dom.featuredMediaWrap.classList.remove("is-hidden");

    if (reducedMotionMediaQuery.matches) {
      hideFeaturedMediaVideo();
      return;
    }

    featuredVideoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            dom.featuredMediaVideo.pause();
            return;
          }

          if (dom.featuredMediaVideo.dataset.loaded !== "true") {
            loadLoopingVideo({
              videoElement: dom.featuredMediaVideo,
              primarySrc: featured.src,
              fallbackSrc: featured.fallbackSrc,
              poster: featured.poster,
              onReady: function () {
                dom.featuredMediaVideo.dataset.loaded = "true";
                applyVideoPreviewCrop(dom.featuredMediaVideo);
                dom.featuredMediaVideo.classList.remove("is-hidden");
                dom.featuredMediaFallback.classList.add("is-hidden");
              },
              onFatal: function () {
                hideFeaturedMediaVideo();
              }
            });
            return;
          }

          tryPlayMutedLoop(dom.featuredMediaVideo);
        });
      },
      {
        threshold: 0.45
      }
    );

    featuredVideoObserver.observe(dom.featuredMediaWrap);
  }

  function getQrCodeUrl() {
    return "https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=" + encodeURIComponent(config.appStoreUrl);
  }

  function openModal() {
    lastActiveElement = document.activeElement;
    dom.qrImage.src = getQrCodeUrl();
    dom.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const closeButton = dom.modal.querySelector(".modal-close");
    if (closeButton instanceof HTMLElement) {
      closeButton.focus();
    }
  }

  function closeModal() {
    dom.modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastActiveElement instanceof HTMLElement) {
      lastActiveElement.focus();
    }
  }

  function bindCtas() {
    const phoneDevice = isPhoneDevice();
    const buttonLabel = "Download on the App Store";
    const mobileBar = document.querySelector(".mobile-install-bar");

    dom.ctas.forEach(function (button) {
      const insideStickyBar = mobileBar instanceof HTMLElement && mobileBar.contains(button);
      button.textContent = insideStickyBar ? "Open in App Store" : buttonLabel;

      button.addEventListener("click", function () {
        if (phoneDevice) {
          window.location.href = config.appStoreUrl;
          return;
        }
        openModal();
      });
    });

    dom.qrActionLink.href = config.appStoreUrl;
  }

  function bindModalControls() {
    dom.modal.addEventListener("click", function (event) {
      const target = event.target;
      if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && dom.modal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });
  }

  function setupRevealObserver() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(document.querySelectorAll(".reveal"));

    if (reducedMotion) {
      revealNodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12
      }
    );

    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  function init() {
    setFooterLinks();
    renderHeroStack();
    renderModeChips();
    renderModePreview(false);
    renderFeaturedMedia();
    renderScreenshots();
    bindScreenshotRail();
    renderVideos();
    bindModeSelector();
    bindCtas();
    bindModalControls();
    setupRevealObserver();
  }

  init();
})();
