// @ts-nocheck
// Generated from tools/security/hash-generator.html
// Source SHA-256: 6e8e568797514c941216d74b6ee66d4263f541fad1b7b424378ed55d6a4fe9d8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentTab = "text";

      window.switchTab = function (tab) {
        currentTab = tab;
        document
          .querySelectorAll(".tab")
          .forEach((t, i) =>
            t.classList.toggle("active", (i === 0 && tab === "text") || (i === 1 && tab === "file"))
          );
        document.getElementById("textTab").classList.toggle("hidden", tab !== "text");
        document.getElementById("fileTab").classList.toggle("hidden", tab !== "file");
        document.getElementById("results").innerHTML = "";
        if (tab === "text") window.calculateTextHash();
      };

      async function calculateHash(data, algorithm) {
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      }

      window.calculateTextHash = async function () {
        const text = document.getElementById("textInput").value;
        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        const algorithms = [
          { name: "SHA-1", algo: "SHA-1" },
          { name: "SHA-256", algo: "SHA-256" },
          { name: "SHA-384", algo: "SHA-384" },
          { name: "SHA-512", algo: "SHA-512" }
        ];

        let html = "";
        for (const { name, algo } of algorithms) {
          const hash = await calculateHash(data, algo);
          html += `<div class="result-item">
                      <span class="algo">${name}</span>
                      <span class="hash">${hash}</span>
                      <button class="copy-btn" onclick="copyHash('${hash}')">📋</button>
                  </div>`;
        }

        document.getElementById("results").innerHTML = html;
      };

      window.handleFile = async function (file) {
        if (!file) return;

        document.getElementById("fileInfo").style.display = "block";
        document.getElementById("fileName").textContent = file.name;
        document.getElementById("fileSize").textContent = formatSize(file.size);

        const arrayBuffer = await file.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        const algorithms = [
          { name: "SHA-1", algo: "SHA-1" },
          { name: "SHA-256", algo: "SHA-256" },
          { name: "SHA-384", algo: "SHA-384" },
          { name: "SHA-512", algo: "SHA-512" }
        ];

        document.getElementById("results").innerHTML =
          '<p style="text-align:center;color:var(--color-text-secondary)">计算中...</p>';

        let html = "";
        for (const { name, algo } of algorithms) {
          const hash = await calculateHash(data, algo);
          html += `<div class="result-item">
                      <span class="algo">${name}</span>
                      <span class="hash">${hash}</span>
                      <button class="copy-btn" onclick="copyHash('${hash}')">📋</button>
                  </div>`;
        }

        document.getElementById("results").innerHTML = html;
      };

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + " MB";
        return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
      }

      function copyText(text) {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          return Promise.reject(new Error("Clipboard API unavailable"));
        }
        return navigator.clipboard.writeText(text);
      }

      window.copyHash = function (hash) {
        copyText(hash).catch(function () {});
        const toast = document.getElementById("toast");
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2000);
        }
      };

      // Drag and drop
      const dropZone = document.getElementById("fileDrop");
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        window.handleFile(e.dataTransfer.files[0]);
      });

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
      window.calculateTextHash();
    
