// @ts-nocheck
// Generated from tools/dev/flexbox-playground.html
// Source SHA-256: 9d41a47cce98af4ea467b03320b0a1e8d12cf24593f364e1aab43b7997233b34
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const flexContainer = document.getElementById("flexContainer");
      const codeOutput = document.getElementById("codeOutput");
      const statusEl = document.getElementById("status");

      const controls = {
        flexDirection: document.getElementById("flexDirection"),
        flexWrap: document.getElementById("flexWrap"),
        justifyContent: document.getElementById("justifyContent"),
        alignItems: document.getElementById("alignItems"),
        alignContent: document.getElementById("alignContent"),
        gap: document.getElementById("gap"),
        itemCount: document.getElementById("itemCount")
      };

      const LS_KEY = "flexbox_playground_v1";

      window.updatePreview = function () {
        const styles = {
          display: "flex",
          flexDirection: controls.flexDirection.value,
          flexWrap: controls.flexWrap.value,
          justifyContent: controls.justifyContent.value,
          alignItems: controls.alignItems.value,
          alignContent: controls.alignContent.value,
          gap: controls.gap.value + "px"
        };

        flexContainer.style.display = styles.display;
        flexContainer.style.flexDirection = styles.flexDirection;
        flexContainer.style.flexWrap = styles.flexWrap;
        flexContainer.style.justifyContent = styles.justifyContent;
        flexContainer.style.alignItems = styles.alignItems;
        flexContainer.style.alignContent = styles.alignContent;
        flexContainer.style.gap = styles.gap;

        // Update item count
        const count = parseInt(controls.itemCount.value) || 4;
        const currentCount = flexContainer.children.length;

        if (count > currentCount) {
          for (let i = currentCount; i < count; i++) {
            const item = document.createElement("div");
            item.className = "flex-item";
            item.textContent = i + 1;
            flexContainer.appendChild(item);
          }
        } else if (count < currentCount) {
          for (let i = currentCount; i > count; i--) {
            flexContainer.removeChild(flexContainer.lastChild);
          }
        }

        // Generate CSS code
        const css = `.flex-container {
  display: flex;
  flex-direction: ${styles.flexDirection};
  flex-wrap: ${styles.flexWrap};
  justify-content: ${styles.justifyContent};
  align-items: ${styles.alignItems};
  align-content: ${styles.alignContent};
  gap: ${styles.gap};
}`;

        codeOutput.textContent = css;
        saveToStorage();
      };

      function saveToStorage() {
        const state = {
          flexDirection: controls.flexDirection.value,
          flexWrap: controls.flexWrap.value,
          justifyContent: controls.justifyContent.value,
          alignItems: controls.alignItems.value,
          alignContent: controls.alignContent.value,
          gap: controls.gap.value,
          itemCount: controls.itemCount.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            const state = JSON.parse(saved);
            controls.flexDirection.value = state.flexDirection || "row";
            controls.flexWrap.value = state.flexWrap || "nowrap";
            controls.justifyContent.value = state.justifyContent || "flex-start";
            controls.alignItems.value = state.alignItems || "stretch";
            controls.alignContent.value = state.alignContent || "stretch";
            controls.gap.value = state.gap || "10";
            controls.itemCount.value = state.itemCount || "4";
          } catch (e) {
            // ignore
          }
        }
      }

      function showStatus(msg) {
        statusEl.textContent = msg;
        statusEl.className = "status success";
        setTimeout(function () {
          statusEl.className = "status";
        }, 2000);
      }

      // Event listeners
      Object.values(controls).forEach(function (control) {
        control.addEventListener("change", updatePreview);
        control.addEventListener("input", updatePreview);
      });

      document.getElementById("btnCopy").onclick = async function () {
        try {
          await navigator.clipboard.writeText(codeOutput.textContent);
          showStatus("CSS 已复制到剪贴板");
        } catch (e) {
          showStatus("复制失败");
        }
      };

      document.getElementById("btnReset").onclick = function () {
        controls.flexDirection.value = "row";
        controls.flexWrap.value = "nowrap";
        controls.justifyContent.value = "flex-start";
        controls.alignItems.value = "stretch";
        controls.alignContent.value = "stretch";
        controls.gap.value = "10";
        controls.itemCount.value = "4";
        updatePreview();
        showStatus("已重置");
      };

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();

      // Initialize
      loadFromStorage();
      updatePreview();
    
