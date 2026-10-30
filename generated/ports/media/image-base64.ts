// @ts-nocheck
// Generated from tools/media/image-base64.html
// Source SHA-256: ce801f253f719b1f88bc64eb20ee6e1682a12b04ee6c036ed07988144598f559
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };
      initTheme();

      let currentDataUri = "";
      let currentMimeType = "";
      let currentFileName = "";

      // Tab switching
      window.switchTab = function (tab) {
        document.querySelectorAll(".tab-btn").forEach((btn) => {
          btn.classList.toggle(
            "active",
            btn.textContent.includes(tab === "encode" ? "图片" : "Base64 →")
          );
        });
        document.querySelectorAll(".tab-content").forEach((content) => {
          content.classList.remove("active");
        });
        document.getElementById(tab + "Tab").classList.add("active");
      };

      // Drag and drop
      const uploadArea = document.getElementById("uploadArea");
      uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.classList.add("dragover");
      });
      uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("dragover");
      });
      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.classList.remove("dragover");
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
          processImage(file);
        }
      });

      document.getElementById("imageInput").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) processImage(file);
      });

      function processImage(file) {
        currentFileName = file.name;
        currentMimeType = file.type;

        const reader = new FileReader();
        reader.onload = (e) => {
          currentDataUri = e.target.result;

          // Show preview
          const img = document.getElementById("previewImage");
          img.src = currentDataUri;

          img.onload = () => {
            // Update info
            const base64Length = currentDataUri.split(",")[1].length;
            const sizeKB = ((base64Length * 0.75) / 1024).toFixed(2);
            document.getElementById("imageInfo").textContent =
              `${img.naturalWidth} × ${img.naturalHeight} | ${file.type} | ~${sizeKB} KB (Base64)`;

            document.getElementById("encodeResult").style.display = "block";
            updateOutput();
          };
        };
        reader.readAsDataURL(file);
      }

      function updateOutput() {
        const format = document.querySelector('input[name="outputFormat"]:checked').value;
        const output = document.getElementById("encodeOutput");
        const base64 = currentDataUri.split(",")[1];

        switch (format) {
          case "dataUri":
            output.textContent = currentDataUri;
            break;
          case "base64":
            output.textContent = base64;
            break;
          case "html":
            output.textContent = `<img src="${currentDataUri}" alt="image">`;
            break;
          case "css":
            output.textContent = `background-image: url('${currentDataUri}');`;
            break;
        }
      }

      window.copyOutput = function () {
        const output = document.getElementById("encodeOutput").textContent;
        navigator.clipboard.writeText(output);
        showToast("已复制");
      };

      window.downloadText = function () {
        const output = document.getElementById("encodeOutput").textContent;
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = currentFileName.replace(/\.[^.]+$/, "") + ".txt";
        a.click();
        URL.revokeObjectURL(url);
      };

      // Decode functions
      window.decodeBase64 = function () {
        const input = document.getElementById("base64Input").value.trim();
        if (!input) {
          document.getElementById("decodeResult").style.display = "none";
          return;
        }

        let dataUri = input;

        // If not a data URI, try to create one
        if (!input.startsWith("data:")) {
          // Try to detect image type from base64
          const mimeType = detectMimeType(input);
          dataUri = `data:${mimeType};base64,${input}`;
        }

        const img = document.getElementById("decodedImage");
        img.onload = () => {
          document.getElementById("decodeResult").style.display = "block";
          const base64 = dataUri.split(",")[1];
          const sizeKB = ((base64.length * 0.75) / 1024).toFixed(2);
          document.getElementById("decodeInfo").textContent =
            `${img.naturalWidth} × ${img.naturalHeight} | ~${sizeKB} KB`;
        };
        img.onerror = () => {
          document.getElementById("decodeResult").style.display = "none";
        };
        img.src = dataUri;
      };

      function detectMimeType(base64) {
        // Check magic bytes
        const signatures = {
          "/9j/": "image/jpeg",
          iVBORw: "image/png",
          R0lGOD: "image/gif",
          UklGR: "image/webp",
          PHN2Zz: "image/svg+xml"
        };

        for (const [sig, mime] of Object.entries(signatures)) {
          if (base64.startsWith(sig)) return mime;
        }
        return "image/png"; // Default
      }

      window.pasteFromClipboard = async function () {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("base64Input").value = text;
          decodeBase64();
        } catch (e) {
          alert("无法访问剪贴板");
        }
      };

      window.clearInput = function () {
        document.getElementById("base64Input").value = "";
        document.getElementById("decodeResult").style.display = "none";
      };

      window.downloadImage = function () {
        const img = document.getElementById("decodedImage");
        const a = document.createElement("a");
        a.href = img.src;

        // Get extension from mime type
        const mimeMatch = img.src.match(/data:image\/([^;]+)/);
        const ext = mimeMatch ? mimeMatch[1].replace("jpeg", "jpg") : "png";

        a.download = `decoded-image.${ext}`;
        a.click();
      };

      function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }
    
