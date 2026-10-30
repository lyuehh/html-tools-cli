// @ts-nocheck
// Generated from tools/photography/exposure-calc.html
// Source SHA-256: 998b833924fd56880a1ba7a43e92bbd802ff32aa1f6b6e77875d0a9527692247
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let locked = { aperture: false, shutter: false, iso: false };

      const apertureStops = [1, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
      const shutterStops = [
        30, 15, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03333, 0.01667, 0.008, 0.004, 0.002, 0.001,
        0.0005, 0.00025, 0.000125
      ];
      const isoStops = [50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600];

      function formatShutter(value) {
        if (value >= 1) return value + "s";
        return "1/" + Math.round(1 / value);
      }

      function calculateEV(aperture, shutter, iso) {
        // EV = log2(N²/t) - log2(ISO/100)
        return Math.log2(Math.pow(aperture, 2) / shutter) - Math.log2(iso / 100);
      }

      function toggleLock(param) {
        locked[param] = !locked[param];
        const btn = document.querySelector(`#${param}Item .lock-btn`);
        const item = document.getElementById(`${param}Item`);
        btn.classList.toggle("locked", locked[param]);
        item.classList.toggle("locked", locked[param]);
        btn.textContent = locked[param] ? "🔓 解锁" : "🔒 锁定";
      }

      function calculate() {
        const aperture = parseFloat(document.getElementById("aperture").value);
        const shutter = parseFloat(document.getElementById("shutter").value);
        const iso = parseFloat(document.getElementById("iso").value);

        // Update display values
        document.getElementById("apertureValue").textContent = "f/" + aperture;
        document.getElementById("shutterValue").textContent = formatShutter(shutter);
        document.getElementById("isoValue").textContent = iso;

        // Calculate EV
        const ev = calculateEV(aperture, shutter, iso);
        document.getElementById("evValue").textContent = ev.toFixed(1);

        // Generate equivalent exposures
        generateEquivalents(aperture, shutter, iso, ev);
      }

      function generateEquivalents(currentAperture, currentShutter, currentIso, targetEV) {
        const equivalents = [];

        // Generate combinations
        for (let a of apertureStops) {
          for (let i of isoStops) {
            // Calculate required shutter
            // EV = log2(a²/t) - log2(iso/100)
            // t = a² / (2^(EV + log2(iso/100)))
            const requiredShutter = Math.pow(a, 2) / Math.pow(2, targetEV + Math.log2(i / 100));

            // Find closest shutter stop
            let closestShutter = shutterStops.reduce((prev, curr) =>
              Math.abs(curr - requiredShutter) < Math.abs(prev - requiredShutter) ? curr : prev
            );

            // Check if it's a valid combination
            const checkEV = calculateEV(a, closestShutter, i);
            if (Math.abs(checkEV - targetEV) < 0.5) {
              // Avoid duplicates and current setting
              const key = `${a}-${closestShutter}-${i}`;
              if (
                !equivalents.find((e) => e.key === key) &&
                !(a === currentAperture && closestShutter === currentShutter && i === currentIso)
              ) {
                equivalents.push({
                  key,
                  aperture: a,
                  shutter: closestShutter,
                  iso: i
                });
              }
            }
          }
        }

        // Sort and limit
        equivalents.sort((a, b) => a.aperture - b.aperture);
        const limited = equivalents.slice(0, 8);

        // Render
        const container = document.getElementById("equivalentList");
        container.innerHTML = limited
          .map(
            (eq) => `
        <div class="equivalent-item" onclick="applyEquivalent(${eq.aperture}, ${eq.shutter}, ${eq.iso})">
          <span>f/${eq.aperture}</span>
          <span>${formatShutter(eq.shutter)}</span>
          <span>ISO ${eq.iso}</span>
        </div>
      `
          )
          .join("");
      }

      function applyEquivalent(aperture, shutter, iso) {
        if (!locked.aperture) document.getElementById("aperture").value = aperture;
        if (!locked.shutter) {
          // Find closest option
          const select = document.getElementById("shutter");
          let closest = select.options[0].value;
          for (let opt of select.options) {
            if (
              Math.abs(parseFloat(opt.value) - shutter) < Math.abs(parseFloat(closest) - shutter)
            ) {
              closest = opt.value;
            }
          }
          select.value = closest;
        }
        if (!locked.iso) document.getElementById("iso").value = iso;
        calculate();
      }

      // Initialize
      calculate();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
