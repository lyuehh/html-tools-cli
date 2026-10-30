// @ts-nocheck
// Generated from tools/media/image-to-ascii.html
// Source SHA-256: 14ffb89ec22b69c87f81ae90320c589bf3078b82270acbb1870446bd503e1f37
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var currentImage = null;

      var charsets = {
        standard: "@%#*+=-:. ",
        simple: "#=-. ",
        blocks: "█▓▒░ ",
        detailed: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`. '
      };

      var dropzone = document.querySelector(".dropzone");
      dropzone.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
      dropzone.addEventListener("drop", function (e) {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
          handleFile(e.dataTransfer.files[0]);
        }
      });

      function handleFile(file) {
        if (!file || !file.type.startsWith("image/")) return;

        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.onload = function () {
            currentImage = img;
            document.getElementById("originalImg").src = e.target.result;
            document.getElementById("previewArea").style.display = "grid";
            convert();
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      function convert() {
        if (!currentImage) return;

        var width = parseInt(document.getElementById("width").value) || 100;
        var charsetName = document.getElementById("charset").value;
        var invert = document.getElementById("invert").value === "yes";
        var chars = charsets[charsetName];

        var aspectRatio = currentImage.height / currentImage.width;
        var height = Math.round(width * aspectRatio * 0.5);

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(currentImage, 0, 0, width, height);

        var imageData = ctx.getImageData(0, 0, width, height);
        var pixels = imageData.data;

        var ascii = "";
        for (var y = 0; y < height; y++) {
          for (var x = 0; x < width; x++) {
            var idx = (y * width + x) * 4;
            var r = pixels[idx];
            var g = pixels[idx + 1];
            var b = pixels[idx + 2];
            var brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            if (invert) brightness = 1 - brightness;

            var charIdx = Math.floor(brightness * (chars.length - 1));
            ascii += chars[charIdx];
          }
          ascii += "\n";
        }

        document.getElementById("asciiOutput").textContent = ascii;
      }

      window.copyAscii = function () {
        var ascii = document.getElementById("asciiOutput").textContent;
        navigator.clipboard.writeText(ascii).then(function () {
          event.target.textContent = "已复制!";
          setTimeout(function () {
            event.target.textContent = "复制 ASCII";
          }, 1500);
        });
      };

      window.downloadAscii = function () {
        var ascii = document.getElementById("asciiOutput").textContent;
        var blob = new Blob([ascii], { type: "text/plain" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "ascii-art.txt";
        a.click();
      };

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
