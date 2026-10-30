// @ts-nocheck
// Generated from tools/design/border-radius-generator.html
// Source SHA-256: 4e351aff307ef8a6bb881832885a827dcafdf59894e8a7fd8aeeea98b8da4672
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const previewBox = document.getElementById("previewBox");
      const outputEl = document.getElementById("cssOutput");
      const statusEl = document.getElementById("status");
      const presetsEl = document.getElementById("presets");

      const presetValues = [
        { tl: 0, tr: 0, br: 0, bl: 0 },
        { tl: 8, tr: 8, br: 8, bl: 8 },
        { tl: 20, tr: 20, br: 20, bl: 20 },
        { tl: 50, tr: 50, br: 50, bl: 50 },
        { tl: 50, tr: 0, br: 50, bl: 0 },
        { tl: 0, tr: 50, br: 0, bl: 50 },
        { tl: 100, tr: 0, br: 0, bl: 0 },
        { tl: 30, tr: 70, br: 30, bl: 70 }
      ];

      function renderPresets() {
        presetValues.forEach((p, i) => {
          const div = document.createElement("div");
          div.className = "preset";
          div.style.borderRadius = `${p.tl}% ${p.tr}% ${p.br}% ${p.bl}%`;
          div.onclick = () => applyPreset(p);
          presetsEl.appendChild(div);
        });
      }

      function applyPreset(p) {
        document.getElementById("tl").value = p.tl;
        document.getElementById("tr").value = p.tr;
        document.getElementById("br").value = p.br;
        document.getElementById("bl").value = p.bl;
        document.getElementById("linkCorners").checked = false;
        updateRadius();
      }

      function updateRadius() {
        const linked = document.getElementById("linkCorners").checked;
        const tl = document.getElementById("tl").value;

        if (linked) {
          document.getElementById("tr").value = tl;
          document.getElementById("br").value = tl;
          document.getElementById("bl").value = tl;
        }

        const vals = {
          tl: document.getElementById("tl").value,
          tr: document.getElementById("tr").value,
          br: document.getElementById("br").value,
          bl: document.getElementById("bl").value
        };

        document.getElementById("tlVal").textContent = vals.tl + "px";
        document.getElementById("trVal").textContent = vals.tr + "px";
        document.getElementById("brVal").textContent = vals.br + "px";
        document.getElementById("blVal").textContent = vals.bl + "px";

        const radius = `${vals.tl}px ${vals.tr}px ${vals.br}px ${vals.bl}px`;
        previewBox.style.borderRadius = radius;

        // 简化输出
        if (vals.tl === vals.tr && vals.tr === vals.br && vals.br === vals.bl) {
          outputEl.value = `border-radius: ${vals.tl}px;`;
        } else {
          outputEl.value = `border-radius: ${radius};`;
        }
      }

      function resetRadius() {
        document.getElementById("tl").value = 20;
        document.getElementById("tr").value = 20;
        document.getElementById("br").value = 20;
        document.getElementById("bl").value = 20;
        document.getElementById("linkCorners").checked = true;
        updateRadius();
      }

      function copyCSS() {
        navigator.clipboard.writeText(outputEl.value).then(() => {
          statusEl.textContent = "已复制到剪贴板";
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

      renderPresets();
      updateRadius();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
