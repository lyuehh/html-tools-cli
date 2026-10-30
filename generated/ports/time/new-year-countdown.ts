// @ts-nocheck
// Generated from tools/time/new-year-countdown.html
// Source SHA-256: 64971ef00f8d12a91719c8b6a7473ef63a8774fb41a9f2b8ee09b669b75e2f24
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "new-year-countdown-state-v1";

      const els = {
        yearSelect: document.getElementById("yearSelect"),
        targetYearText: document.getElementById("targetYearText"),
        tzText: document.getElementById("tzText"),
        targetAt: document.getElementById("targetAt"),
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
        milliseconds: document.getElementById("milliseconds"),
        subtitle: document.getElementById("subtitle"),
        progressBar: document.getElementById("progressBar"),
        toast: document.getElementById("toast"),
        fireworks: document.getElementById("fireworks")
      };

      let state = {
        year: 2026
      };

      let timerId = null;
      let celebrationRunning = false;

      function pad2(n) {
        return String(n).padStart(2, "0");
      }

      function formatTargetLabel(date) {
        const yyyy = date.getFullYear();
        const mm = pad2(date.getMonth() + 1);
        const dd = pad2(date.getDate());
        const hh = pad2(date.getHours());
        const mi = pad2(date.getMinutes());
        return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
      }

      function getTargetDate(year) {
        return new Date(year, 0, 1, 0, 0, 0, 0);
      }

      function getYearProgress(targetYear) {
        const start = new Date(targetYear - 1, 0, 1, 0, 0, 0, 0);
        const end = new Date(targetYear, 0, 1, 0, 0, 0, 0);
        const now = new Date();
        const clamped = Math.min(Math.max(now.getTime(), start.getTime()), end.getTime());
        const ratio = (clamped - start.getTime()) / (end.getTime() - start.getTime());
        return Math.min(Math.max(ratio, 0), 1);
      }

      function showToast(text) {
        if (!els.toast) return;
        els.toast.textContent = text;
        els.toast.classList.add("show");
        window.clearTimeout(showToast._t);
        showToast._t = window.setTimeout(() => {
          els.toast.classList.remove("show");
        }, 2000);
      }

      function saveState() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(state));
        } catch {
          // ignore
        }
      }

      function loadState() {
        const params = new URLSearchParams((location.hash || "").replace(/^#/, ""));
        const y = params.get("y");
        if (y && /^\d{4}$/.test(y)) {
          state.year = Number(y);
          return;
        }

        try {
          const raw = localStorage.getItem(LS_KEY);
          if (!raw) return;
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed.year === "number") {
            state.year = parsed.year;
          }
        } catch {
          // ignore
        }
      }

      function syncHash() {
        const params = new URLSearchParams();
        params.set("y", String(state.year));
        const next = `#${params.toString()}`;
        if (location.hash !== next) {
          history.replaceState(null, "", next);
        }
      }

      function initYearSelect() {
        const now = new Date();
        const currentYear = now.getFullYear();

        const nextYear =
          now.getTime() < getTargetDate(currentYear + 1).getTime()
            ? currentYear + 1
            : currentYear + 2;
        if (!state.year) state.year = nextYear;

        const years = [];
        for (let y = currentYear; y <= currentYear + 8; y++) {
          years.push(y);
        }

        els.yearSelect.replaceChildren();
        for (const y of years) {
          const opt = document.createElement("option");
          opt.value = String(y);
          opt.textContent = String(y);
          els.yearSelect.appendChild(opt);
        }

        if (!years.includes(state.year)) {
          state.year = nextYear;
        }

        els.yearSelect.value = String(state.year);
        els.yearSelect.addEventListener("change", () => {
          state.year = Number(els.yearSelect.value);
          saveState();
          syncHash();
          renderStatic();
          tick();
        });
      }

      function renderStatic() {
        if (els.targetYearText) els.targetYearText.textContent = String(state.year);

        const target = getTargetDate(state.year);
        els.targetAt.textContent = formatTargetLabel(target);

        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";
        els.tzText.textContent = tz;

        const progress = getYearProgress(state.year);
        els.progressBar.style.width = `${Math.round(progress * 100)}%`;
      }

      function setTiles({ d, h, m, s, ms }) {
        els.days.textContent = String(d);
        els.hours.textContent = pad2(h);
        els.minutes.textContent = pad2(m);
        els.seconds.textContent = pad2(s);
        els.milliseconds.textContent = String(ms).padStart(3, "0");
      }

      function tick() {
        const now = new Date();
        const target = getTargetDate(state.year);
        const diffMs = target.getTime() - now.getTime();

        if (diffMs <= 0) {
          setTiles({ d: 0, h: 0, m: 0, s: 0, ms: 0 });
          els.subtitle.textContent = `新年快乐！欢迎来到 ${state.year}。`;
          maybeCelebrate();
          return;
        }

        const totalSeconds = Math.floor(diffMs / 1000);
        const d = Math.floor(totalSeconds / 86400);
        const h = Math.floor((totalSeconds % 86400) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        const ms = diffMs % 1000;

        setTiles({ d, h, m, s, ms });
        els.subtitle.textContent = `还剩 ${d} 天 ${pad2(h)}:${pad2(m)}:${pad2(s)}`;
      }

      function startTimer() {
        stopTimer();

        const loop = () => {
          tick();
          timerId = requestAnimationFrame(loop);
        };

        loop();
      }

      function stopTimer() {
        if (timerId) {
          cancelAnimationFrame(timerId);
          timerId = null;
        }
      }

      function toggleFullscreen() {
        const el = document.documentElement;
        if (!document.fullscreenElement) {
          el.requestFullscreen?.().catch(() => {
            showToast("当前浏览器不支持全屏");
          });
        } else {
          document.exitFullscreen?.();
        }
      }

      function togglePhotoMode() {
        document.body.classList.toggle("photo-mode");

        const isInPhotoMode = document.body.classList.contains("photo-mode");

        if (isInPhotoMode) {
          // Also request fullscreen for better experience
          document.documentElement.requestFullscreen?.().catch(() => {});
        } else {
          // Exit fullscreen if exiting photo mode
          if (document.fullscreenElement) {
            document.exitFullscreen?.();
          }
        }
      }

      function exitPhotoMode() {
        if (document.body.classList.contains("photo-mode")) {
          document.body.classList.remove("photo-mode");
          if (document.fullscreenElement) {
            document.exitFullscreen?.();
          }
        }
      }

      // Auto fullscreen on mobile (requires user interaction first)
      let mobileFullscreenRequested = false;
      function requestMobileFullscreen() {
        // Only on mobile devices and not already requested
        if (mobileFullscreenRequested) return;
        if (window.innerWidth > 768) return;
        if (document.fullscreenElement) return;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) return;

        // Check if user has interacted with the page
        mobileFullscreenRequested = true;

        // Request fullscreen after a short delay
        setTimeout(() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.().catch(() => {
              // Silently fail if not supported or blocked
            });
          }
        }, 300);
      }

      async function copyShareLink() {
        syncHash();
        const url = location.href;

        try {
          await navigator.clipboard.writeText(url);
          showToast("分享链接已复制");
          return;
        } catch {
          // fallback
        }

        const ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();

        try {
          document.execCommand("copy");
          showToast("分享链接已复制");
        } catch {
          showToast("复制失败，请手动复制地址栏");
        } finally {
          ta.remove();
        }
      }

      function testCelebration() {
        showToast("测试庆祝效果 🎆");
        startFireworks();
        window.setTimeout(() => {
          stopFireworks();
        }, 5000);
      }

      function resetToNextYear() {
        const now = new Date();
        const nextYear = now.getFullYear() + 1;
        state.year = nextYear;
        els.yearSelect.value = String(nextYear);
        saveState();
        syncHash();
        renderStatic();
        tick();
        showToast(`已重置到 ${nextYear} 年`);
      }

      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let fw = null;

      function maybeCelebrate() {
        if (celebrationRunning || !motionOK) return;
        celebrationRunning = true;
        showToast("新年快乐！");
        startFireworks();
        window.setTimeout(() => {
          stopFireworks();
        }, 9000);
      }

      function startFireworks() {
        const canvas = els.fireworks;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

        const resize = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          canvas.width = Math.floor(w * dpr);
          canvas.height = Math.floor(h * dpr);
          canvas.style.width = `${w}px`;
          canvas.style.height = `${h}px`;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener("resize", resize);

        const particles = [];
        const rand = (min, max) => min + Math.random() * (max - min);

        const burst = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const x = rand(w * 0.15, w * 0.85);
          const y = rand(h * 0.15, h * 0.5);
          const count = Math.floor(rand(36, 64));

          const hues = [160, 255, 205, 285, 35];
          const hue = hues[Math.floor(Math.random() * hues.length)];

          for (let i = 0; i < count; i++) {
            const a = (Math.PI * 2 * i) / count + rand(-0.04, 0.04);
            const v = rand(2.2, 4.6);
            particles.push({
              x,
              y,
              vx: Math.cos(a) * v,
              vy: Math.sin(a) * v,
              life: rand(0.9, 1.25),
              age: 0,
              hue,
              size: rand(1.2, 2.4)
            });
          }
        };

        let last = performance.now();

        const frame = (t) => {
          const dt = Math.min(0.033, (t - last) / 1000);
          last = t;

          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          ctx.globalCompositeOperation = "lighter";

          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.age += dt;
            if (p.age >= p.life) {
              particles.splice(i, 1);
              continue;
            }

            p.vy += 2.2 * dt;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.992;
            p.vy *= 0.992;

            const k = 1 - p.age / p.life;
            const alpha = Math.max(0, Math.min(1, k));

            ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.globalCompositeOperation = "source-over";

          if (Math.random() < 0.06) burst();
          fw = requestAnimationFrame(frame);
        };

        burst();
        fw = requestAnimationFrame(frame);

        stopFireworks._cleanup = () => {
          window.removeEventListener("resize", resize);
        };
      }

      function stopFireworks() {
        if (fw) {
          cancelAnimationFrame(fw);
          fw = null;
        }

        if (typeof stopFireworks._cleanup === "function") {
          stopFireworks._cleanup();
          stopFireworks._cleanup = null;
        }

        if (!els.fireworks) return;
        const ctx = els.fireworks.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }

      function init() {
        initTheme();
        loadState();
        initYearSelect();
        syncHash();
        renderStatic();
        startTimer();

        window.setInterval(renderStatic, 60 * 1000);

        window.addEventListener("hashchange", () => {
          loadState();
          els.yearSelect.value = String(state.year);
          renderStatic();
          tick();
        });

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
          }
        });

        // Mobile fullscreen: tap on hero section to enter fullscreen
        const heroSection = document.querySelector(".hero");
        if (heroSection) {
          heroSection.addEventListener("click", (e) => {
            // Don't trigger if clicking on buttons or form elements
            if (e.target.closest("button, select, a")) return;
            requestMobileFullscreen();
          });
        }

        // Also add a global touch listener for first interaction
        let hasInteracted = false;
        document.addEventListener(
          "touchstart",
          () => {
            if (!hasInteracted) {
              hasInteracted = true;
              // Request fullscreen on first tap if on mobile
              if (
                window.innerWidth <= 768 &&
                /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
              ) {
                setTimeout(() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen?.().catch(() => {});
                  }
                }, 500);
              }
            }
          },
          { once: true }
        );

        // Photo mode: ESC key to exit
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            exitPhotoMode();
          }
        });

        // Photo mode: click anywhere to exit
        document.addEventListener("click", (e) => {
          if (document.body.classList.contains("photo-mode")) {
            // Don't exit if clicking the photo mode button
            if (e.target.closest('[onclick="togglePhotoMode()"]')) return;
            exitPhotoMode();
          }
        });
      }

      init();
    
