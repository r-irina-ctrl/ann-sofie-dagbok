
document.querySelectorAll(".film-shell").forEach((shell) => {
  const strip = shell.querySelector(".film-strip");
  const prev = shell.querySelector(".prev");
  const next = shell.querySelector(".next");
  const amount = () => Math.max(320, strip.clientWidth * 0.78);

  prev?.addEventListener("click", () => strip.scrollBy({ left: -amount(), behavior: "smooth" }));
  next?.addEventListener("click", () => strip.scrollBy({ left: amount(), behavior: "smooth" }));

  let down = false;
  let startX = 0;
  let scrollLeft = 0;

  strip.addEventListener("pointerdown", (event) => {
    down = true;
    startX = event.clientX;
    scrollLeft = strip.scrollLeft;
    strip.setPointerCapture(event.pointerId);
  });

  strip.addEventListener("pointermove", (event) => {
    if (!down) return;
    strip.scrollLeft = scrollLeft - (event.clientX - startX);
  });

  strip.addEventListener("pointerup", () => { down = false; });
  strip.addEventListener("pointercancel", () => { down = false; });
});

function fmt(t) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

document.querySelectorAll(".epilog-player").forEach((player) => {
  const audio = player.querySelector(".epilog-audio");
  const btn = player.querySelector(".epilog-play");
  const bar = player.querySelector(".epilog-progress");
  const fill = bar.querySelector("span");
  const cur = player.querySelector(".cur");
  const dur = player.querySelector(".dur");

  btn.addEventListener("click", () => {
    if (audio.paused) { audio.play(); } else { audio.pause(); }
  });
  audio.addEventListener("play", () => { btn.textContent = "❚❚"; });
  audio.addEventListener("pause", () => { btn.textContent = "▶"; });
  audio.addEventListener("loadedmetadata", () => { dur.textContent = fmt(audio.duration); });
  audio.addEventListener("timeupdate", () => {
    cur.textContent = fmt(audio.currentTime);
    fill.style.width = `${(audio.currentTime / (audio.duration || 1)) * 100}%`;
  });
  bar.addEventListener("click", (e) => {
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * (audio.duration || 0);
  });
});
