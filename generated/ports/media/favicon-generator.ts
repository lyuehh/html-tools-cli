// @ts-nocheck
// Generated from tools/media/favicon-generator.html
// Source SHA-256: a9e5a0c875e87e18c4ad5b6109792c095dbb820010b5b11b36345c3e1fb4b1be
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentSource = null; // 'image', 'emoji', or 'text'
      let sourceImage = null;
      let selectedEmoji = "🚀";

      // Popular emojis
      const emojis = [
        "🚀",
        "⭐",
        "🔥",
        "💡",
        "🎯",
        "🎨",
        "💎",
        "🌟",
        "❤️",
        "💙",
        "💚",
        "💜",
        "🧡",
        "💛",
        "🖤",
        "🤍",
        "📱",
        "💻",
        "🖥️",
        "⌨️",
        "🖱️",
        "🔧",
        "⚙️",
        "🛠️",
        "📊",
        "📈",
        "📉",
        "📋",
        "📌",
        "📍",
        "🔗",
        "🔒",
        "🏠",
        "🏢",
        "🏪",
        "🏭",
        "🏗️",
        "🌍",
        "🌎",
        "🌏",
        "☀️",
        "🌙",
        "⚡",
        "🌈",
        "❄️",
        "🔆",
        "💫",
        "✨",
        "🎵",
        "🎶",
        "🎬",
        "🎮",
        "🎲",
        "🎪",
        "🎭",
        "🎪",
        "🍎",
        "🍊",
        "🍋",
        "🍇",
        "🍓",
        "🥝",
        "🍑",
        "🍒"
      ];

      // Theme handling
      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const newTheme = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Tab handling
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          tab.classList.add("active");
          document.getElementById(tab.dataset.tab + "-tab").classList.add("active");

          if (tab.dataset.tab === "emoji") {
            currentSource = "emoji";
            renderFavicon();
          } else if (tab.dataset.tab === "text") {
            currentSource = "text";
            renderFavicon();
          }
        });
      });

      // Initialize emoji grid
      function initEmojiGrid() {
        const grid = document.getElementById("emojiGrid");
        emojis.forEach((emoji) => {
          const item = document.createElement("div");
          item.className = "emoji-item" + (emoji === selectedEmoji ? " selected" : "");
          item.textContent = emoji;
          item.onclick = () => {
            document.querySelectorAll(".emoji-item").forEach((e) => e.classList.remove("selected"));
            item.classList.add("selected");
            selectedEmoji = emoji;
            currentSource = "emoji";
            renderFavicon();
          };
          grid.appendChild(item);
        });
      }

      // Image upload
      const uploadArea = document.getElementById("uploadArea");
      const imageInput = document.getElementById("imageInput");

      uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = "var(--accent-color)";
      });

      uploadArea.addEventListener("dragleave", () => {
        uploadArea.style.borderColor = "";
      });

      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = "";
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
          loadImage(file);
        }
      });

      imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) loadImage(file);
      });

      window.loadImage = function (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            sourceImage = img;
            currentSource = "image";
            uploadArea.classList.add("has-image");
            uploadArea.innerHTML = `<img src="${e.target.result}" alt="Uploaded">`;
            renderFavicon();
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      // Color input sync
      ["text", "bg"].forEach((prefix) => {
        const colorInput = document.getElementById(prefix + "Color");
        const hexInput = document.getElementById(prefix + "ColorHex");

        colorInput.addEventListener("input", () => {
          hexInput.value = colorInput.value;
          if (currentSource === "text") renderFavicon();
        });

        hexInput.addEventListener("input", () => {
          if (/^#[0-9A-Fa-f]{6}$/.test(hexInput.value)) {
            colorInput.value = hexInput.value;
            if (currentSource === "text") renderFavicon();
          }
        });
      });

      // Text inputs
      ["textInput", "fontFamily", "borderRadius"].forEach((id) => {
        document.getElementById(id).addEventListener("input", () => {
          if (currentSource === "text") renderFavicon();
        });
      });

      // Render favicon
      function renderFavicon() {
        const canvas = document.getElementById("previewCanvas");
        const ctx = canvas.getContext("2d");
        const size = 128;

        ctx.clearRect(0, 0, size, size);

        if (currentSource === "image" && sourceImage) {
          // Draw image centered and cropped to square
          const srcSize = Math.min(sourceImage.width, sourceImage.height);
          const srcX = (sourceImage.width - srcSize) / 2;
          const srcY = (sourceImage.height - srcSize) / 2;
          ctx.drawImage(sourceImage, srcX, srcY, srcSize, srcSize, 0, 0, size, size);
        } else if (currentSource === "emoji") {
          ctx.font = "100px serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(selectedEmoji, size / 2, size / 2 + 5);
        } else if (currentSource === "text") {
          const text = document.getElementById("textInput").value || "Hi";
          const textColor = document.getElementById("textColor").value;
          const bgColor = document.getElementById("bgColor").value;
          const fontFamily = document.getElementById("fontFamily").value;
          const radius = parseInt(document.getElementById("borderRadius").value);

          // Draw background
          ctx.fillStyle = bgColor;
          if (radius > 0) {
            roundRect(ctx, 0, 0, size, size, radius);
            ctx.fill();
          } else {
            ctx.fillRect(0, 0, size, size);
          }

          // Draw text
          ctx.fillStyle = textColor;
          ctx.font = `bold ${text.length === 1 ? 80 : 60}px ${fontFamily}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(text, size / 2, size / 2 + 4);
        }

        // Update size previews
        updateSizePreviews();
      }

      function roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }

      function updateSizePreviews() {
        const sourceCanvas = document.getElementById("previewCanvas");
        [16, 32, 48, 64, 128].forEach((size) => {
          const canvas = document.getElementById("preview" + size);
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, size, size);
          ctx.drawImage(sourceCanvas, 0, 0, size, size);
        });
      }

      function generateCanvas(size) {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        const sourceCanvas = document.getElementById("previewCanvas");
        ctx.drawImage(sourceCanvas, 0, 0, size, size);
        return canvas;
      }

      window.downloadSelected = function () {
        const checkboxes = document.querySelectorAll(".download-option input:checked");
        checkboxes.forEach((cb) => {
          const size = parseInt(cb.dataset.size);
          const canvas = generateCanvas(size);
          downloadCanvas(canvas, `favicon-${size}x${size}.png`);
        });
      };

      function downloadCanvas(canvas, filename) {
        const link = document.createElement("a");
        link.download = filename;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }

      window.downloadAll = async function () {
        // Simple version - download each file
        const sizes = [16, 32, 48, 64, 128, 180, 192, 512];
        for (const size of sizes) {
          const canvas = generateCanvas(size);
          downloadCanvas(canvas, `favicon-${size}x${size}.png`);
          await new Promise((r) => setTimeout(r, 100)); // Small delay between downloads
        }
      };

      // Initialize
      initTheme();
      initEmojiGrid();
      currentSource = "emoji";
      renderFavicon();
    
