
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
