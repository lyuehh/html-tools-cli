// @ts-nocheck
// Generated from tools/food/recipe-timer.html
// Source SHA-256: fd371d7f530e73c9f68ab99235e7a16f96fb034583ba654e69d5e66e2e727ee2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let seconds = 300;
      let interval = null;
      function start() {
        if (interval) return;
        interval = setInterval(() => {
          if (seconds > 0) {
            seconds--;
            render();
          } else {
            clearInterval(interval);
            interval = null;
            alert("时间到！");
          }
        }, 1000);
      }
      function reset() {
        if (interval) clearInterval(interval);
        interval = null;
        seconds = 300;
        render();
      }
      function render() {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        document.getElementById("time").textContent =
          `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
      }
    
