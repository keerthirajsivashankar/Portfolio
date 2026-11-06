/* ==========================================================================
   KEERTHIRAJ SIVASHANKAR - PORTFOLIO INTERACTIVITY SCRIPT
   - Controlled Length Typewriter Swapper (No Layout Jump)
   - 60FPS Interactive Agentic AI Canvas Node Visualizer
   - Bento Project Category Filter System
   - Credentials Tabs & Mobile Drawer Handler
   - Copy Toast Notification
   -new portfolio design complete 
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
  initCanvasVisualizer();
  initMobileNav();
  initProjectsFilter();
  initCertTabs();
  initCursorGlowAndSpotlight();
  initScrollProgressAndSpy();
  initCountUp();
});

/* ==========================================================================
   0. BENTO EFFECTS: cursor glow, card spotlight, progress bar, scroll-spy,
      count-up metrics
   ========================================================================== */

function initCursorGlowAndSpotlight() {
  const glow = document.querySelector(".cursor-glow");
  if (glow) {
    window.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  document
    .querySelectorAll(".clay-card, .glass-panel, .skeuo-terminal")
    .forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
}

function initScrollProgressAndSpy() {
  const bar = document.querySelector(".scroll-progress");
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [...links]
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  function onScroll() {
    const h = document.documentElement;
    if (bar) {
      bar.style.width =
        (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
    }
    let current = null;
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top <= 140) current = s.id;
    });
    links.forEach((a) =>
      a.classList.toggle("active-link", a.getAttribute("href") === "#" + current)
    );
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initCountUp() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const start = performance.now();
        const dur = 1500;
        function step(t) {
          const p = Math.min((t - start) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  nums.forEach((n) => io.observe(n));
}

/* ==========================================================================
   1. FIXED TYPEWRITER EFFECT
   ========================================================================== */

const typewriterPhrases = [
  "SDE @ Prodapt",
  "Agentic AI (LangChain, LangGraph)",
  "FastAPI Microservices & Backend",
  "Vector DBs, RAG & LlamaIndex",
  "Data Engineering & ML Pipelines",
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-text");

function initTypewriter() {
  if (!typedEl) return;

  function typeLoop() {
    const currentPhrase = typewriterPhrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
      typedEl.textContent = currentPhrase.substring(0, charIdx);
    } else {
      charIdx++;
      typedEl.textContent = currentPhrase.substring(0, charIdx);
    }

    let delay = isDeleting ? 35 : 75;

    if (!isDeleting && charIdx === currentPhrase.length) {
      delay = 2200; // Hold full text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % typewriterPhrases.length;
      delay = 350;
    }

    setTimeout(typeLoop, delay);
  }

  typeLoop();
}

/* ==========================================================================
   2. 60FPS INTERACTIVE CANVAS NODE VISUALIZER
   ========================================================================== */

function initCanvasVisualizer() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const colors = ["#3de0d0", "#5ab9ff", "#a78bfa", "#f472b6"];
  const mouse = { x: -999, y: -999 };
  let w, h, nodes = [], pulses = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = Array.from({ length: 34 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: i < 5 ? 5 : 2.5, // first 5 nodes are the "agent" hubs
      c: colors[i % colors.length],
    }));
  }

  const panel = canvas.parentElement;
  panel.addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  panel.addEventListener("mouseleave", () => {
    mouse.x = mouse.y = -999;
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const max = 95;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (!reduce) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
      }
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < max) {
          ctx.strokeStyle = `rgba(90,185,255,${(1 - d / max) * 0.45})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < 140) {
        ctx.strokeStyle = `rgba(61,224,208,${(1 - dm / 140) * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    // data pulses travelling between agent hubs
    if (!reduce && Math.random() < 0.04) {
      const a = Math.floor(Math.random() * 5);
      const b = Math.floor(Math.random() * 5);
      if (a !== b) pulses.push({ a, b, t: 0 });
    }
    pulses = pulses.filter((p) => p.t < 1);
    pulses.forEach((p) => {
      p.t += 0.012;
      const A = nodes[p.a], B = nodes[p.b];
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "#3de0d0";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(A.x + (B.x - A.x) * p.t, A.y + (B.y - A.y) * p.t, 3, 0, 7);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    nodes.forEach((n) => {
      ctx.fillStyle = n.c;
      ctx.shadowColor = n.c;
      ctx.shadowBlur = n.r > 3 ? 18 : 8;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, 7);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */

function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navAnchors = document.querySelectorAll(".nav-links a");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navAnchors.forEach((a) => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

/* ==========================================================================
   4. BENTO PROJECTS CATEGORY FILTER
   ========================================================================== */

function initProjectsFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || cardCat === category) {
          card.style.display = ""; // restore each card's own layout (grid/flex)
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   5. CERTIFICATIONS TABS
   ========================================================================== */

function initCertTabs() {
  const filterBtns = document.querySelectorAll(".cert-tabs .tab-btn");
  const tiles = document.querySelectorAll(".cert-tile");
  if (!filterBtns.length) return;

  // show how many certificates each filter contains
  filterBtns.forEach((btn) => {
    const f = btn.getAttribute("data-filter");
    const n = f === "all" ? tiles.length : [...tiles].filter((t) => t.dataset.cert === f).length;
    btn.insertAdjacentHTML("beforeend", `<span class="count">${n}</span>`);
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      tiles.forEach((tile) => {
        const show = f === "all" || tile.dataset.cert === f;
        tile.classList.toggle("is-hidden", !show);
        if (show) {
          tile.classList.remove("pop-in");
          void tile.offsetWidth; // restart animation
          tile.classList.add("pop-in");
        }
      });
    });
  });
}

/* ==========================================================================
   6. COPY TO CLIPBOARD TOAST HELPER
   ========================================================================== */

function copyEmail() {
  const email = "keerthirajsivashankar@gmail.com";
  navigator.clipboard
    .writeText(email)
    .then(() => {
      showToast("Email copied to clipboard!");
    })
    .catch(() => {
      showToast("Failed to copy email.");
    });
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
