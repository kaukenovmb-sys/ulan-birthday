const EVENT_DATE = new Date("2026-09-15T00:00:00+05:00").getTime();

const loader = document.getElementById("loader");
const site = document.getElementById("site");
const openInvite = document.getElementById("openInvite");

openInvite.addEventListener("click", () => {
  loader.classList.add("opened");
  site.classList.remove("hidden");
  setTimeout(() => document.querySelector(".hero-content")?.classList.add("visible"), 300);
  window.scrollTo(0, 0);
});

const pad = n => String(n).padStart(2, "0");
function updateCountdown() {
  const diff = EVENT_DATE - Date.now();
  if (diff <= 0) {
    document.getElementById("countdownGrid").classList.add("hidden");
    document.getElementById("todayMessage").classList.remove("hidden");
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resizeCanvas() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
function createParticles() {
  particles = Array.from({length: Math.min(70, Math.floor(innerWidth/12))}, () => ({
    x: Math.random()*innerWidth, y: Math.random()*innerHeight,
    r: Math.random()*1.5+.2, a: Math.random()*.45+.08,
    vx: (Math.random()-.5)*.12, vy: (Math.random()-.5)*.16
  }));
}
function animateParticles() {
  ctx.clearRect(0,0,innerWidth,innerHeight);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x<0)p.x=innerWidth;if(p.x>innerWidth)p.x=0;
    if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(205,165,77,${p.a})`; ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
resizeCanvas(); createParticles(); animateParticles();
addEventListener("resize", () => { resizeCanvas(); createParticles(); });

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.classList.add("active");
      musicBtn.innerHTML = "♫ <span>МУЗЫКА ОЙНАП ТҰР</span>";
    } else {
      music.pause();
      musicBtn.classList.remove("active");
      musicBtn.innerHTML = "♫ <span>МУЗЫКАНЫ ҚОСУ</span>";
    }
  } catch {
    musicBtn.innerHTML = "♫ <span>music.mp3 ФАЙЛЫН ТЕКСЕРІҢІЗ</span>";
  }
});

document.querySelectorAll(".rsvp-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const msg = document.getElementById("rsvpMessage");
    msg.textContent = btn.dataset.message;
    btn.animate([{transform:"scale(1)"},{transform:"scale(.96)"},{transform:"scale(1)"}], {duration:280});
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
document.querySelectorAll(".gallery-item").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeLightbox(); });
