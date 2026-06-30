// ── 回到頂部 ──
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── 輪播邏輯 ──
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track   = carousel.querySelector('.carousel-track');
  const images  = Array.from(track.querySelectorAll('img'));
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsWrap   = carousel.querySelector('.carousel-dots');
  const counterWrap = carousel.querySelector('.carousel-counter');

  let current = 0;
  let autoTimer = null;

  // ── 建立指示點 ──
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

  // ── 切換到第 n 張 ──
  function goTo(n) {
    images[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (n + images.length) % images.length;

    images[current].classList.add('active');
    dots[current].classList.add('active');
    counterWrap.textContent = (current + 1) + ' / ' + images.length;
  }

  // ── 初始化計數 ──
  counterWrap.textContent = '1 / ' + images.length;

  // ── 按鈕事件 ──
  prevBtn.addEventListener('click', () => {
    goTo(current - 1);
    resetAuto();
  });

  nextBtn.addEventListener('click', () => {
    goTo(current + 1);
    resetAuto();
  });

  // ── 自動播放（4 秒） ──
  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // ── 滑鼠移入暫停 ──
  carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel.addEventListener('mouseleave', () => startAuto());

  startAuto();
});

function openGame(url) {
  window.open(url, "_blank", "width=900,height=700");
}

function toggleMenu(){
  document.querySelector(".nav-links").classList.toggle("active");
}

document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click",()=>{
    document.querySelector(".nav-links").classList.remove("active");
  });
});

// ── Scroll-spy：自動標記目前所在區塊 ──
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveNav() {
  const scrollPos = window.scrollY + 120; // 補上 navbar 高度
  let currentSection = sections[0];

  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) {
      currentSection = section;
    }
  });

  navLinks.forEach(link => {
    const isActive = link.getAttribute("href") === `#${currentSection.id}`;
    link.classList.toggle("active-link", isActive);
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

// ── 區塊淡入動畫 ──
const fadeTargets = document.querySelectorAll(
  ".card, .project-card, .game-card, .video-card, .carousel-wrapper"
);

const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeTargets.forEach(el => {
  el.classList.add("fade-in");
  fadeObserver.observe(el);
});