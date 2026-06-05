function cursorGlow() {
  let cursorCleanup: AbortController | null = null;

  // 首次初始化
  const init = () => {
    // Cleanup previous listeners
    if (cursorCleanup) cursorCleanup.abort();
    cursorCleanup = new AbortController();
    const { signal } = cursorCleanup;

    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = document.querySelector<HTMLElement>(".site-cursor-glow");
    let ticking = false;

    if (glow) {
      document.addEventListener("mousemove", (e: MouseEvent) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            glow.style.setProperty("--site-cx", `${e.clientX}px`);
            glow.style.setProperty("--site-cy", `${e.clientY}px`);
            if (!glow.classList.contains("active")) {
              glow.classList.add("active");
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { signal });

      document.addEventListener("mouseleave", () => {
        glow.classList.remove("active");
      }, { signal });
    }
  };

  // 立即初始化
  init();
}

cursorGlow();
