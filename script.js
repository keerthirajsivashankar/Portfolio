/* ==========================================================================
   KEERTHIRAJ SIVASHANKAR - PORTFOLIO INTERACTIVITY SCRIPT
   - Controlled Length Typewriter Swapper (No Layout Jump)
   - 60FPS Interactive Agentic AI Canvas Node Visualizer
   - Bento Project Category Filter System
   - Credentials Tabs & Mobile Drawer Handler
   - Copy Toast Notification
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
  initCanvasVisualizer();
  initMobileNav();
  initProjectsFilter();
  initCertTabs();
});

/* ==========================================================================
   1. FIXED TYPEWRITER EFFECT
   ========================================================================== */

const typewriterPhrases = [
  "SDE @ Prodapt",
  "Agentic AI (LangChain, LangGraph)",
  "FastAPI Microservices & Backend",
  "Vector DBs, RAG & LlamaIndex",
  "130+ Day LeetCode Streak"
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
  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  });

  const nodeCount = 36;
  const nodes = [];
  const mouse = { x: null, y: null, radius: 130 };

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Nodes initialization
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 3.5 + 2,
      color: Math.random() > 0.4 ? "#f97316" : "#8b5cf6",
      isAgent: Math.random() > 0.65
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach((node, i) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          node.x -= Math.cos(angle) * force * 2;
          node.y -= Math.sin(angle) * force * 2;
        }
      }

      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 105) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          const alpha = (1 - dist / 105) * 0.45;
          ctx.strokeStyle = node.color === "#f97316" 
            ? `rgba(249, 115, 22, ${alpha})` 
            : `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.shadowBlur = node.isAgent ? 12 : 6;
      ctx.shadowColor = node.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(render);
  }

  render();
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
          card.style.display = "flex";
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
  const tabBtns = document.querySelectorAll(".tab-btn");
  const certContents = document.querySelectorAll(".cert-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      tabBtns.forEach((b) => b.classList.remove("active"));
      certContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   6. COPY TO CLIPBOARD TOAST HELPER
   ========================================================================== */

function copyEmail() {
  const email = "keerthirajsivashankar@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast("Email copied to clipboard!");
  }).catch(() => {
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
