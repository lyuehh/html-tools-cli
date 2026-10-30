// @ts-nocheck
// Generated from tools/generator/logo-text.html
// Source SHA-256: 8988e006ccd7fce08a17d8ff8720a5d5b3cc3f98e4c9662fcbd3b2daccb557c9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      const themeToggle = document.getElementById("themeToggle");
      themeToggle.addEventListener("click", function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        html.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
      });

      // Elements
      const logoPreview = document.getElementById("logoPreview");
      const logoText = document.getElementById("logoText");
      const textColor = document.getElementById("textColor");
      const textColorText = document.getElementById("textColorText");
      const gradientColor2 = document.getElementById("gradientColor2");
      const gradientColor2Text = document.getElementById("gradientColor2Text");
      const useGradient = document.getElementById("useGradient");
      const fontSize = document.getElementById("fontSize");
      const letterSpacing = document.getElementById("letterSpacing");
      const shadowColor = document.getElementById("shadowColor");
      const shadowColorText = document.getElementById("shadowColorText");
      const outlineColor = document.getElementById("outlineColor");
      const outlineColorText = document.getElementById("outlineColorText");
      const outlineWidth = document.getElementById("outlineWidth");
      const rotate = document.getElementById("rotate");

      let currentFont = "Arial Black, sans-serif";

      // Font preset selection
      document.querySelectorAll(".font-preset").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".font-preset").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");
          currentFont = btn.dataset.font;
          updatePreview();
        });
      });

      // Sync color inputs
      function syncColorInputs(colorInput, textInput) {
        colorInput.addEventListener("input", function () {
          textInput.value = colorInput.value;
          updatePreview();
        });
        textInput.addEventListener("input", function () {
          if (/^#[0-9A-Fa-f]{6}$/.test(textInput.value)) {
            colorInput.value = textInput.value;
            updatePreview();
          }
        });
      }

      syncColorInputs(textColor, textColorText);
      syncColorInputs(gradientColor2, gradientColor2Text);
      syncColorInputs(shadowColor, shadowColorText);
      syncColorInputs(outlineColor, outlineColorText);

      // Toggle gradient colors visibility
      useGradient.addEventListener("change", function () {
        document.getElementById("gradientColors").style.display = useGradient.checked
          ? "block"
          : "none";
        updatePreview();
      });

      // Update range values
      const rangeInputs = [
        { input: fontSize, display: "fontSizeValue" },
        { input: letterSpacing, display: "letterSpacingValue" },
        { input: outlineWidth, display: "outlineWidthValue" },
        { input: rotate, display: "rotateValue" }
      ];

      rangeInputs.forEach(function (item) {
        item.input.addEventListener("input", function () {
          document.getElementById(item.display).textContent = item.input.value;
          updatePreview();
        });
      });

      // Text input
      logoText.addEventListener("input", updatePreview);

      // Effect checkboxes
      const effectCheckboxes = [
        "effectBold",
        "effectItalic",
        "effectUppercase",
        "effectShadow",
        "effectOutline",
        "effect3D"
      ];
      effectCheckboxes.forEach(function (id) {
        document.getElementById(id).addEventListener("change", updatePreview);
      });

      // Update preview
      function updatePreview() {
        const text = logoText.value || "Logo";
        const size = fontSize.value;
        const spacing = letterSpacing.value;
        const rotateVal = rotate.value;
        const outlineW = outlineWidth.value;

        let styles = {
          fontFamily: currentFont,
          fontSize: size + "px",
          letterSpacing: spacing + "px",
          transform: "rotate(" + rotateVal + "deg)",
          fontWeight: document.getElementById("effectBold").checked ? "bold" : "normal",
          fontStyle: document.getElementById("effectItalic").checked ? "italic" : "normal",
          textTransform: document.getElementById("effectUppercase").checked ? "uppercase" : "none"
        };

        // Color or gradient
        if (useGradient.checked) {
          styles.background =
            "linear-gradient(90deg, " + textColor.value + ", " + gradientColor2.value + ")";
          styles.webkitBackgroundClip = "text";
          styles.webkitTextFillColor = "transparent";
          styles.backgroundClip = "text";
          styles.color = "transparent";
        } else {
          styles.background = "none";
          styles.webkitBackgroundClip = "unset";
          styles.webkitTextFillColor = "unset";
          styles.backgroundClip = "unset";
          styles.color = textColor.value;
        }

        // Text shadow
        let shadows = [];
        if (document.getElementById("effectShadow").checked) {
          shadows.push("3px 3px 6px " + shadowColor.value + "80");
        }
        if (document.getElementById("effect3D").checked) {
          for (let i = 1; i <= 5; i++) {
            shadows.push(i + "px " + i + "px 0 " + shadowColor.value);
          }
        }
        styles.textShadow = shadows.length > 0 ? shadows.join(", ") : "none";

        // Outline
        if (document.getElementById("effectOutline").checked) {
          styles.webkitTextStroke = outlineW + "px " + outlineColor.value;
        } else {
          styles.webkitTextStroke = "unset";
        }

        // Apply styles
        logoPreview.textContent = text;
        Object.assign(logoPreview.style, styles);
      }

      window.updatePreview = updatePreview;

      // Random style
      document.getElementById("randomBtn").addEventListener("click", function () {
        const randomColor = function () {
          return (
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")
          );
        };

        textColor.value = randomColor();
        textColorText.value = textColor.value;
        gradientColor2.value = randomColor();
        gradientColor2Text.value = gradientColor2.value;
        shadowColor.value = randomColor();
        shadowColorText.value = shadowColor.value;

        fontSize.value = Math.floor(Math.random() * 100) + 48;
        document.getElementById("fontSizeValue").textContent = fontSize.value;

        letterSpacing.value = Math.floor(Math.random() * 20) - 5;
        document.getElementById("letterSpacingValue").textContent = letterSpacing.value;

        rotate.value = Math.floor(Math.random() * 30) - 15;
        document.getElementById("rotateValue").textContent = rotate.value;

        useGradient.checked = Math.random() > 0.5;
        document.getElementById("gradientColors").style.display = useGradient.checked
          ? "block"
          : "none";

        effectCheckboxes.forEach(function (id) {
          if (id !== "effectBold") {
            document.getElementById(id).checked = Math.random() > 0.6;
          }
        });

        const fonts = document.querySelectorAll(".font-preset");
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        fonts.forEach(function (f) {
          f.classList.remove("active");
        });
        randomFont.classList.add("active");
        currentFont = randomFont.dataset.font;

        updatePreview();
      });

      // Generate button
      document.getElementById("generateBtn").addEventListener("click", updatePreview);

      // Download PNG
      document.getElementById("downloadPng").addEventListener("click", function () {
        const canvas = document.createElement("canvas");
        const scale = 2;
        const padding = 40;

        // Calculate text dimensions
        const tempSpan = document.createElement("span");
        Object.assign(tempSpan.style, {
          fontFamily: currentFont,
          fontSize: fontSize.value + "px",
          fontWeight: document.getElementById("effectBold").checked ? "bold" : "normal",
          fontStyle: document.getElementById("effectItalic").checked ? "italic" : "normal",
          letterSpacing: letterSpacing.value + "px",
          visibility: "hidden",
          position: "absolute"
        });
        tempSpan.textContent = logoText.value || "Logo";
        document.body.appendChild(tempSpan);
        const textWidth = tempSpan.offsetWidth;
        const textHeight = tempSpan.offsetHeight;
        document.body.removeChild(tempSpan);

        canvas.width = (textWidth + padding * 2) * scale;
        canvas.height = (textHeight + padding * 2) * scale;

        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);

        const text = logoText.value || "Logo";
        const displayText = document.getElementById("effectUppercase").checked
          ? text.toUpperCase()
          : text;

        ctx.font =
          (document.getElementById("effectItalic").checked ? "italic " : "") +
          (document.getElementById("effectBold").checked ? "bold " : "") +
          fontSize.value +
          "px " +
          currentFont;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const centerX = canvas.width / (2 * scale);
        const centerY = canvas.height / (2 * scale);

        // Apply rotation
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((rotate.value * Math.PI) / 180);

        // Draw 3D effect
        if (document.getElementById("effect3D").checked) {
          ctx.fillStyle = shadowColor.value;
          for (let i = 5; i > 0; i--) {
            ctx.fillText(displayText, i, i);
          }
        }

        // Draw shadow
        if (document.getElementById("effectShadow").checked) {
          ctx.shadowColor = shadowColor.value + "80";
          ctx.shadowBlur = 6;
          ctx.shadowOffsetX = 3;
          ctx.shadowOffsetY = 3;
        }

        // Draw outline
        if (document.getElementById("effectOutline").checked) {
          ctx.strokeStyle = outlineColor.value;
          ctx.lineWidth = parseInt(outlineWidth.value);
          ctx.strokeText(displayText, 0, 0);
        }

        // Draw text
        if (useGradient.checked) {
          const gradient = ctx.createLinearGradient(-textWidth / 2, 0, textWidth / 2, 0);
          gradient.addColorStop(0, textColor.value);
          gradient.addColorStop(1, gradientColor2.value);
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = textColor.value;
        }
        ctx.fillText(displayText, 0, 0);

        ctx.restore();

        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "logo.png";
        a.click();
      });

      // Download SVG
      document.getElementById("downloadSvg").addEventListener("click", function () {
        const text = logoText.value || "Logo";
        const displayText = document.getElementById("effectUppercase").checked
          ? text.toUpperCase()
          : text;
        const size = fontSize.value;

        let svgContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
        svgContent +=
          '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200" viewBox="0 0 600 200">\n';

        if (useGradient.checked) {
          svgContent += "  <defs>\n";
          svgContent +=
            '    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">\n';
          svgContent += '      <stop offset="0%" stop-color="' + textColor.value + '"/>\n';
          svgContent += '      <stop offset="100%" stop-color="' + gradientColor2.value + '"/>\n';
          svgContent += "    </linearGradient>\n";
          svgContent += "  </defs>\n";
        }

        const fill = useGradient.checked ? "url(#textGradient)" : textColor.value;
        const fontWeight = document.getElementById("effectBold").checked ? "bold" : "normal";
        const fontStyle = document.getElementById("effectItalic").checked ? "italic" : "normal";

        svgContent += '  <text x="300" y="100" text-anchor="middle" dominant-baseline="middle" ';
        svgContent += 'font-family="' + currentFont + '" font-size="' + size + '" ';
        svgContent += 'font-weight="' + fontWeight + '" font-style="' + fontStyle + '" ';
        svgContent += 'fill="' + fill + '" letter-spacing="' + letterSpacing.value + '" ';
        svgContent += 'transform="rotate(' + rotate.value + ' 300 100)"';

        if (document.getElementById("effectOutline").checked) {
          svgContent +=
            ' stroke="' + outlineColor.value + '" stroke-width="' + outlineWidth.value + '"';
        }

        svgContent += ">" + displayText + "</text>\n";
        svgContent += "</svg>";

        const blob = new Blob([svgContent], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "logo.svg";
        a.click();
        URL.revokeObjectURL(url);
      });

      // Copy CSS
      document.getElementById("copyCSS").addEventListener("click", function () {
        let css = ".logo {\n";
        css += "  font-family: " + currentFont + ";\n";
        css += "  font-size: " + fontSize.value + "px;\n";
        css += "  letter-spacing: " + letterSpacing.value + "px;\n";
        css +=
          "  font-weight: " +
          (document.getElementById("effectBold").checked ? "bold" : "normal") +
          ";\n";
        css +=
          "  font-style: " +
          (document.getElementById("effectItalic").checked ? "italic" : "normal") +
          ";\n";

        if (document.getElementById("effectUppercase").checked) {
          css += "  text-transform: uppercase;\n";
        }

        if (useGradient.checked) {
          css +=
            "  background: linear-gradient(90deg, " +
            textColor.value +
            ", " +
            gradientColor2.value +
            ");\n";
          css += "  -webkit-background-clip: text;\n";
          css += "  -webkit-text-fill-color: transparent;\n";
        } else {
          css += "  color: " + textColor.value + ";\n";
        }

        if (document.getElementById("effectOutline").checked) {
          css +=
            "  -webkit-text-stroke: " + outlineWidth.value + "px " + outlineColor.value + ";\n";
        }

        let shadows = [];
        if (document.getElementById("effectShadow").checked) {
          shadows.push("3px 3px 6px " + shadowColor.value + "80");
        }
        if (document.getElementById("effect3D").checked) {
          for (let i = 1; i <= 5; i++) {
            shadows.push(i + "px " + i + "px 0 " + shadowColor.value);
          }
        }
        if (shadows.length > 0) {
          css += "  text-shadow: " + shadows.join(", ") + ";\n";
        }

        if (rotate.value !== "0") {
          css += "  transform: rotate(" + rotate.value + "deg);\n";
        }

        css += "}";

        navigator.clipboard.writeText(css);
        alert("CSS 已复制到剪贴板");
      });

      // Initial preview
      updatePreview();

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
    
