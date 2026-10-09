/* FLARE — interactions: preloader, header, menu, reveal, parallax, 3D tilt,
   hero scene, 3D ring, magnetic buttons, spotlight, counters, lightbox. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var isRTL = doc.getAttribute("dir") === "rtl";

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  /* ---------- Preloader ---------- */
  var preloader = $(".preloader");
  function hidePreloader() {
    if (preloader) preloader.classList.add("is-done");
    doc.classList.add("is-loaded");
    revealHero();
  }
  if (document.readyState === "complete") hidePreloader();
  else window.addEventListener("load", hidePreloader);
  setTimeout(hidePreloader, 3500);

  function revealHero() {
    $$(".hero [data-reveal], .sub-hero [data-reveal], .hero .split-line").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ---------- Header ---------- */
  var header = $(".site-header");
  var lastY = window.scrollY;
  function onHeaderScroll() {
    if (!header) return;
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    var menuOpen = document.body.classList.contains("menu-open");
    header.classList.toggle("is-hidden", !menuOpen && y > lastY && y > 400);
    lastY = y;
  }

  /* ---------- Mobile menu ---------- */
  var toggle = $(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active nav link ---------- */
  var navLinks = $$('.nav-links a[href^="#"]');
  if (navLinks.length && "IntersectionObserver" in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) {
      var t = document.getElementById(a.getAttribute("href").slice(1));
      if (t) navIO.observe(t);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$("[data-reveal], .split-line");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) {
      if (!el.closest(".hero, .sub-hero")) io.observe(el);
    });
  }

  /* ---------- Counters ---------- */
  var counters = $$("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var cIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cIO.unobserve(e.target);
        var el = e.target;
        var end = parseFloat(el.getAttribute("data-count"));
        var prefix = el.getAttribute("data-prefix") || "";
        var suffix = el.getAttribute("data-suffix") || "";
        if (reduceMotion) { el.textContent = prefix + end + suffix; return; }
        var start = performance.now();
        var dur = 1800;
        (function tick(now) {
          var p = clamp((now - start) / dur, 0, 1);
          var eased = 1 - Math.pow(1 - p, 4);
          el.textContent = prefix + Math.round(end * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cIO.observe(c); });
  }

  /* ---------- Parallax + ring (scroll driven) ---------- */
  var parallaxEls = $$("[data-speed]");
  var ring = $(".ring");
  var ticking = false;

  function updateScroll() {
    ticking = false;
    var vh = window.innerHeight;
    onHeaderScroll();
    if (reduceMotion) return;

    parallaxEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var speed = parseFloat(el.getAttribute("data-speed")) || 0;
      var offset = (r.top + r.height / 2 - vh / 2) * speed;
      el.style.translate = "0 " + offset.toFixed(1) + "px";
    });

    if (ring) {
      var wrap = ring.parentElement.getBoundingClientRect();
      var progress = (vh - wrap.top) / (vh + wrap.height);
      ring.style.setProperty("--spin", (progress * -220 + ringAuto) * (isRTL ? -1 : 1) + "deg");
    }
  }
  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScroll);
    }
  }
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);

  // Gentle continuous drift on the ring, layered on top of scroll rotation
  var ringAuto = 0;
  if (ring && !reduceMotion) {
    var ringVisible = false;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { ringVisible = e[0].isIntersecting; }).observe(ring.parentElement);
    }
    (function drift() {
      if (ringVisible) {
        ringAuto -= 0.06;
        updateScroll();
      }
      requestAnimationFrame(drift);
    })();
  }
  updateScroll();

  /* ---------- 3D tilt cards ---------- */
  if (finePointer && !reduceMotion) {
    $$("[data-tilt]").forEach(function (el) {
      var max = parseFloat(el.getAttribute("data-tilt")) || 10;
      if (!el.querySelector(".glare")) {
        var g = document.createElement("span");
        g.className = "glare";
        el.appendChild(g);
      }
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        el.classList.add("is-tilting");
        el.style.setProperty("--ry", ((px - 0.5) * max * 2).toFixed(2) + "deg");
        el.style.setProperty("--rx", ((0.5 - py) * max * 2).toFixed(2) + "deg");
        el.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
      });
      el.addEventListener("pointerleave", function () {
        el.classList.remove("is-tilting");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------- Hero 3D scene follows pointer ---------- */
  var stage = $(".scene__stage");
  if (stage && finePointer && !reduceMotion) {
    var hero = stage.closest("section") || document.body;
    hero.addEventListener("pointermove", function (e) {
      var x = e.clientX / window.innerWidth - 0.5;
      var y = e.clientY / window.innerHeight - 0.5;
      stage.style.setProperty("--ry", (x * 22).toFixed(2) + "deg");
      stage.style.setProperty("--rx", (-y * 16).toFixed(2) + "deg");
    });
    hero.addEventListener("pointerleave", function () {
      stage.style.setProperty("--ry", "0deg");
      stage.style.setProperty("--rx", "0deg");
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    $$("[data-magnetic]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", ((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1) + "px");
        el.style.setProperty("--my", ((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1) + "px");
      });
      el.addEventListener("pointerleave", function () {
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
      });
    });
  }

  /* ---------- Cursor spotlight ---------- */
  var spot = $(".spotlight");
  if (spot && finePointer && !reduceMotion) {
    var sx = -999, sy = -999, tx = -999, ty = -999, spotRunning = false;
    window.addEventListener("pointermove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!spotRunning) { spotRunning = true; requestAnimationFrame(moveSpot); }
    }, { passive: true });
    function moveSpot() {
      sx += (tx - sx) * 0.12;
      sy += (ty - sy) * 0.12;
      spot.style.setProperty("--cx", sx.toFixed(1) + "px");
      spot.style.setProperty("--cy", sy.toFixed(1) + "px");
      if (Math.abs(tx - sx) + Math.abs(ty - sy) > 0.5) requestAnimationFrame(moveSpot);
      else spotRunning = false;
    }
  }

  /* ---------- Smooth anchor scroll for scrollToContact() (sub pages) ---------- */
  window.scrollToContact = function () {
    var c = document.getElementById("contact");
    if (c) c.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  /* ---------- Lightbox gallery ---------- */
  var lb = $(".lightbox");
  var galleries = window.FLARE_GALLERIES || {};
  if (lb) {
    var lbImg = $(".lightbox__img", lb);
    var lbCount = $(".lightbox__count", lb);
    var current = [];
    var index = 0;
    var lastFocus = null;

    function show(i) {
      if (!current.length) return;
      index = (i + current.length) % current.length;
      lbImg.classList.add("is-loading");
      var src = current[index];
      var img = new Image();
      img.onload = img.onerror = function () {
        lbImg.src = src;
        lbImg.classList.remove("is-loading");
      };
      img.src = src;
      lbCount.textContent = String(index + 1).padStart(2, "0") + " / " + String(current.length).padStart(2, "0");
      // Preload neighbour
      new Image().src = current[(index + 1) % current.length];
    }
    function open(key, alt) {
      current = galleries[key] || [];
      if (!current.length) return;
      lastFocus = document.activeElement;
      lbImg.alt = alt || "";
      show(0);
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      $(".lightbox__close", lb).focus();
    }
    function close() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    var next = function () { show(index + 1); };
    var prev = function () { show(index - 1); };

    $$("[data-gallery]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        open(btn.getAttribute("data-gallery"), btn.getAttribute("aria-label"));
      });
    });
    $(".lightbox__close", lb).addEventListener("click", close);
    $(".lightbox__next", lb).addEventListener("click", isRTL ? prev : next);
    $(".lightbox__prev", lb).addEventListener("click", isRTL ? next : prev);
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") (isRTL ? prev : next)();
      if (e.key === "ArrowLeft") (isRTL ? next : prev)();
    });
    var touchX = null;
    lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) ((dx < 0) !== isRTL ? next : prev)();
      touchX = null;
    });
  }

  /* ---------- Back to top ---------- */
  $$('a[href="#top"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    });
  });

  /* ---------- Year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
