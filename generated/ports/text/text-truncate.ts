// @ts-nocheck
// Generated from tools/text/text-truncate.html
// Source SHA-256: fd2971ce198f056a8a9125e2423135b8b0a34e414750eb7df08c5d37e74f485a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let truncatedResult = "";

      document.getElementById("ellipsis").addEventListener("change", function () {
        document.getElementById("customEllipsisGroup").style.display =
          this.value === "custom" ? "block" : "none";
        truncateText();
      });

      window.toggleTheme = function () {
        const t =
          document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      (function () {
        document.documentElement.setAttribute(
          "data-theme",
          localStorage.getItem("theme") || "dark"
        );
      })();

      function truncateText() {
        const input = document.getElementById("input").value;
        const mode = document.getElementById("mode").value;
        const limit = parseInt(document.getElementById("limit").value) || 1;
        const ellipsisSelect = document.getElementById("ellipsis").value;
        const ellipsis =
          ellipsisSelect === "custom"
            ? document.getElementById("customEllipsis").value
            : ellipsisSelect;

        let result = "";
        let isTruncated = false;

        switch (mode) {
          case "char":
            if (input.length > limit) {
              result = input.slice(0, limit) + ellipsis;
              isTruncated = true;
            } else {
              result = input;
            }
            break;
          case "word":
            const words = input.split(/\s+/);
            if (words.length > limit) {
              result = words.slice(0, limit).join(" ") + ellipsis;
              isTruncated = true;
            } else {
              result = input;
            }
            break;
          case "line":
            const lines = input.split("\n");
            if (lines.length > limit) {
              result = lines.slice(0, limit).join("\n") + ellipsis;
              isTruncated = true;
            } else {
              result = input;
            }
            break;
        }

        truncatedResult = result;
        const preview = document.getElementById("preview");

        if (isTruncated) {
          const mainText = result.slice(0, -ellipsis.length);
          preview.innerHTML =
            escapeHtml(mainText) + '<span class="ellipsis">' + escapeHtml(ellipsis) + "</span>";
        } else {
          preview.textContent = result;
        }

        document.getElementById("originalLen").textContent = input.length;
        document.getElementById("truncatedLen").textContent = result.length;
        document.getElementById("removedLen").textContent = Math.max(
          0,
          input.length - result.length + ellipsis.length
        );
      }

      window.escapeHtml = function (str) {
        return str.replace(
          /[&<>"']/g,
          (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m]
        );
      };

      window.copyResult = function () {
        if (truncatedResult) {
          navigator.clipboard.writeText(truncatedResult);
          const toast = document.getElementById("toast");
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2000);
        }
      };

      window.clearAll = function () {
        document.getElementById("input").value = "";
        document.getElementById("preview").textContent = "";
        truncatedResult = "";
        document.getElementById("originalLen").textContent = "0";
        document.getElementById("truncatedLen").textContent = "0";
        document.getElementById("removedLen").textContent = "0";
      };

      truncateText();
    
