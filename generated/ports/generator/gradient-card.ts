// @ts-nocheck
// Generated from tools/generator/gradient-card.html
// Source SHA-256: f495eb14e231d20eb2091001fa033aa17ed8e9dd60cff08259d6082adfdd8b27
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      const themeToggle = document.getElementById("themeToggle");
      themeToggle.addEventListener("click", function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        html.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
      });

      // Preset gradients
      const presets = [
        { colors: ["#667eea", "#764ba2"], name: "紫色梦境" },
        { colors: ["#f093fb", "#f5576c"], name: "粉红日落" },
        { colors: ["#4facfe", "#00f2fe"], name: "海洋蓝" },
        { colors: ["#43e97b", "#38f9d7"], name: "薄荷清新" },
        { colors: ["#fa709a", "#fee140"], name: "热带水果" },
        { colors: ["#a8edea", "#fed6e3"], name: "柔和晨曦" },
        { colors: ["#ff9a9e", "#fecfef"], name: "樱花粉" },
        { colors: ["#667eea", "#764ba2", "#f093fb"], name: "三色渐变" },
        { colors: ["#11998e", "#38ef7d"], name: "翠绿" },
        { colors: ["#fc4a1a", "#f7b733"], name: "日落橙" },
        { colors: ["#0f0c29", "#302b63", "#24243e"], name: "深邃夜空" },
        { colors: ["#ee0979", "#ff6a00"], name: "烈焰红" }
      ];

      // Initialize presets
      const presetsContainer = document.getElementById("presets");
      presets.forEach(function (preset, index) {
        const div = document.createElement("div");
        div.className = "preset";
        div.style.background = "linear-gradient(90deg, " + preset.colors.join(", ") + ")";
        div.title = preset.name;
        div.addEventListener("click", function () {
          applyPreset(preset);
        });
        presetsContainer.appendChild(div);
      });

      let colorStops = [
        { color: "#667eea", position: 0 },
        { color: "#764ba2", position: 100 }
      ];

      // Apply preset
      window.applyPreset = function (preset) {
        colorStops = preset.colors.map(function (color, i) {
          return {
            color: color,
            position: Math.round((i / (preset.colors.length - 1)) * 100)
          };
        });
        renderColorStops();
        generateGradient();
      };

      // Render color stops
      function renderColorStops() {
        const container = document.getElementById("colorStops");
        let html = "";
        colorStops.forEach(function (stop, i) {
          html +=
            '<div class="color-stop">' +
            '<input type="color" value="' +
            stop.color +
            '" data-index="' +
            i +
            '" aria-label="颜色选择器">' +
            '<input type="number" value="' +
            stop.position +
            '" min="0" max="100" data-index="' +
            i +
            '" aria-label="数字输入框" placeholder="请输入数字输入框">%' +
            '<button class="outline secondary" onclick="removeStop(' +
            i +
            ')" aria-label="删除">删除</button>' +
            "</div>";
        });
        container.innerHTML = html;

        // Add event listeners
        container.querySelectorAll('input[type="color"]').forEach(function (input) {
          input.addEventListener("input", function (e) {
            colorStops[parseInt(e.target.dataset.index)].color = e.target.value;
            generateGradient();
          });
        });

        container.querySelectorAll('input[type="number"]').forEach(function (input) {
          input.addEventListener("input", function (e) {
            colorStops[parseInt(e.target.dataset.index)].position = parseInt(e.target.value);
            generateGradient();
          });
        });
      }

      // Remove color stop
      window.removeStop = function (index) {
        if (colorStops.length > 2) {
          colorStops.splice(index, 1);
          renderColorStops();
          generateGradient();
        }
      };

      // Add color stop
      document.getElementById("addStop").addEventListener("click", function () {
        const lastColor = colorStops[colorStops.length - 1];
        colorStops.push({
          color: lastColor.color,
          position: Math.min(100, lastColor.position + 20)
        });
        renderColorStops();
        generateGradient();
      });

      // Elements
      const angle = document.getElementById("angle");
      const colorCount = document.getElementById("colorCount");
      const gradientType = document.getElementById("gradientType");

      // Update range values
      angle.addEventListener("input", function () {
        document.getElementById("angleValue").textContent = angle.value;
        generateGradient();
      });

      colorCount.addEventListener("input", function () {
        document.getElementById("colorCountValue").textContent = colorCount.value;
        generateGradient();
      });

      gradientType.addEventListener("change", generateGradient);

      // Convert hex to RGB
      function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            }
          : null;
      }

      // Convert RGB to hex
      function rgbToHex(r, g, b) {
        return (
          "#" +
          [r, g, b]
            .map(function (x) {
              const hex = Math.round(x).toString(16);
              return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
        );
      }

      // Interpolate between two colors
      function interpolateColor(color1, color2, factor) {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);
        return rgbToHex(
          rgb1.r + factor * (rgb2.r - rgb1.r),
          rgb1.g + factor * (rgb2.g - rgb1.g),
          rgb1.b + factor * (rgb2.b - rgb1.b)
        );
      }

      // Get color at position from gradient
      function getColorAtPosition(position) {
        const sorted = colorStops.slice().sort(function (a, b) {
          return a.position - b.position;
        });

        if (position <= sorted[0].position) return sorted[0].color;
        if (position >= sorted[sorted.length - 1].position) return sorted[sorted.length - 1].color;

        for (let i = 0; i < sorted.length - 1; i++) {
          if (position >= sorted[i].position && position <= sorted[i + 1].position) {
            const factor =
              (position - sorted[i].position) / (sorted[i + 1].position - sorted[i].position);
            return interpolateColor(sorted[i].color, sorted[i + 1].color, factor);
          }
        }
        return sorted[0].color;
      }

      // Extract colors from gradient
      function extractColors() {
        const count = parseInt(colorCount.value);
        const colors = [];
        for (let i = 0; i < count; i++) {
          const position = (i / (count - 1)) * 100;
          colors.push(getColorAtPosition(position));
        }
        return colors;
      }

      // Generate CSS gradient string
      function getGradientCSS() {
        const type = gradientType.value;
        const angleVal = angle.value;
        const stops = colorStops
          .map(function (s) {
            return s.color + " " + s.position + "%";
          })
          .join(", ");

        switch (type) {
          case "linear":
            return "linear-gradient(" + angleVal + "deg, " + stops + ")";
          case "radial":
            return "radial-gradient(circle, " + stops + ")";
          case "conic":
            return "conic-gradient(from " + angleVal + "deg, " + stops + ")";
        }
      }

      // Generate gradient
      function generateGradient() {
        const preview = document.getElementById("gradientPreview");
        preview.style.background = getGradientCSS();

        // Extract and display colors
        const colors = extractColors();
        const cardsContainer = document.getElementById("colorCards");
        let cardsHtml = "";
        colors.forEach(function (color) {
          const rgb = hexToRgb(color);
          cardsHtml +=
            '<div class="color-card" onclick="copyColor(\'' +
            color +
            "')\">" +
            '<div class="swatch" style="background: ' +
            color +
            '"></div>' +
            '<div class="info">' +
            '<div class="hex">' +
            color.toUpperCase() +
            "</div>" +
            '<div class="rgb">rgb(' +
            rgb.r +
            ", " +
            rgb.g +
            ", " +
            rgb.b +
            ")</div>" +
            "</div></div>";
        });
        cardsContainer.innerHTML = cardsHtml;
      }

      // Copy color
      window.copyColor = function (color) {
        navigator.clipboard.writeText(color);
        showToast("颜色已复制: " + color);
      };

      // Show toast
      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.style.display = "block";
        setTimeout(function () {
          toast.style.display = "none";
        }, 2000);
      }

      // Random gradient
      document.getElementById("randomBtn").addEventListener("click", function () {
        const randomColor = function () {
          return (
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")
          );
        };
        const count = Math.floor(Math.random() * 3) + 2;
        colorStops = [];
        for (let i = 0; i < count; i++) {
          colorStops.push({
            color: randomColor(),
            position: Math.round((i / (count - 1)) * 100)
          });
        }
        angle.value = Math.floor(Math.random() * 360);
        document.getElementById("angleValue").textContent = angle.value;
        renderColorStops();
        generateGradient();
      });

      // Generate button
      document.getElementById("generateBtn").addEventListener("click", generateGradient);

      // Copy CSS
      document.getElementById("copyCSS").addEventListener("click", function () {
        navigator.clipboard.writeText("background: " + getGradientCSS() + ";");
        showToast("CSS 已复制");
      });

      // Copy colors array
      document.getElementById("copyColors").addEventListener("click", function () {
        const colors = extractColors();
        navigator.clipboard.writeText(JSON.stringify(colors));
        showToast("颜色数组已复制");
      });

      // Download PNG
      document.getElementById("downloadPng").addEventListener("click", function () {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        colorStops.forEach(function (stop) {
          gradient.addColorStop(stop.position / 100, stop.color);
        });

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "gradient.png";
        a.click();
      });

      // Initial render
      renderColorStops();
      generateGradient();

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
    
