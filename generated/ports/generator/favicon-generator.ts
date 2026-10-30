// @ts-nocheck
// Generated from tools/generator/favicon-generator.html
// Source SHA-256: ea25bda0dd5144c64abf9828bd191c745510395e8ff95d7a6d2de32e754f7ac6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const emojis = ["🚀", "💡", "⭐", "🔥", "💎", "🎯", "📱", "💻", "🎨", "🎵", "📷", "✨"];
      const picker = document.getElementById("emojiPicker");
      emojis.forEach((e) => {
        const btn = document.createElement("button");
        btn.className = "emoji-btn";
        btn.textContent = e;
        btn.onclick = () => {
          document.getElementById("text").value = e;
          generate();
        };
        picker.appendChild(btn);
      });
      function drawFavicon(canvas, size) {
        const ctx = canvas.getContext("2d");
        const text = document.getElementById("text").value || "A";
        const bgColor = document.getElementById("bgColor").value;
        const textColor = document.getElementById("textColor").value;
        const radius = (document.getElementById("radius").value / 100) * (size / 2);
        const fontSize = (document.getElementById("fontSize").value / 100) * size;
        ctx.clearRect(0, 0, size, size);
        ctx.beginPath();
        ctx.roundRect(0, 0, size, size, radius);
        ctx.fillStyle = bgColor;
        ctx.fill();
        ctx.fillStyle = textColor;
        ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, size / 2, size / 2 + fontSize * 0.05);
      }
      function generate() {
        [16, 32, 64, 128].forEach((size) => {
          const canvas = document.getElementById("canvas" + size);
          canvas.width = size;
          canvas.height = size;
          drawFavicon(canvas, size);
        });
      }
      function download() {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        drawFavicon(canvas, 64);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "favicon.png";
          a.click();
          URL.revokeObjectURL(url);
        }, "image/png");
      }
      ["text", "fontSize", "bgColor", "textColor", "radius"].forEach((id) => {
        document.getElementById(id).addEventListener("input", generate);
      });
      generate();
    
