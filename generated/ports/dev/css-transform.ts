// @ts-nocheck
// Generated from tools/dev/css-transform.html
// Source SHA-256: cb507585c0e1cfaf8be356bfc19a8aff224c4c7f204e7e0c3dd78d730a6d0915
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const defaults = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        skewY: 0,
        perspective: 800,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        translateZ: 0,
        originX: 50,
        originY: 50
      };

      function updateTransform() {
        const translateX = document.getElementById("translateX").value;
        const translateY = document.getElementById("translateY").value;
        const rotate = document.getElementById("rotate").value;
        const scaleX = document.getElementById("scaleX").value;
        const scaleY = document.getElementById("scaleY").value;
        const skewX = document.getElementById("skewX").value;
        const skewY = document.getElementById("skewY").value;
        const perspective = document.getElementById("perspective").value;
        const rotateX = document.getElementById("rotateX").value;
        const rotateY = document.getElementById("rotateY").value;
        const rotateZ = document.getElementById("rotateZ").value;
        const translateZ = document.getElementById("translateZ").value;

        document.getElementById("translateXValue").textContent = translateX + "px";
        document.getElementById("translateYValue").textContent = translateY + "px";
        document.getElementById("rotateValue").textContent = rotate + "deg";
        document.getElementById("scaleXValue").textContent = scaleX;
        document.getElementById("scaleYValue").textContent = scaleY;
        document.getElementById("skewXValue").textContent = skewX + "deg";
        document.getElementById("skewYValue").textContent = skewY + "deg";
        document.getElementById("perspectiveValue").textContent = perspective + "px";
        document.getElementById("rotateXValue").textContent = rotateX + "deg";
        document.getElementById("rotateYValue").textContent = rotateY + "deg";
        document.getElementById("rotateZValue").textContent = rotateZ + "deg";
        document.getElementById("translateZValue").textContent = translateZ + "px";

        document.getElementById("previewStage").style.perspective = perspective + "px";

        let transformParts = [];
        if (translateX != 0 || translateY != 0 || translateZ != 0) {
          transformParts.push(
            "translate3d(" + translateX + "px, " + translateY + "px, " + translateZ + "px)"
          );
        }
        if (rotateX != 0) transformParts.push("rotateX(" + rotateX + "deg)");
        if (rotateY != 0) transformParts.push("rotateY(" + rotateY + "deg)");
        if (rotateZ != 0) transformParts.push("rotateZ(" + rotateZ + "deg)");
        if (rotate != 0) transformParts.push("rotate(" + rotate + "deg)");
        if (scaleX != 1 || scaleY != 1) {
          transformParts.push("scale(" + scaleX + ", " + scaleY + ")");
        }
        if (skewX != 0 || skewY != 0) {
          transformParts.push("skew(" + skewX + "deg, " + skewY + "deg)");
        }

        const transformValue = transformParts.length > 0 ? transformParts.join(" ") : "none";
        document.getElementById("previewBox").style.transform = transformValue;

        generateCode(transformParts, perspective);
      }

      function updateOrigin() {
        const originX = document.getElementById("originX").value;
        const originY = document.getElementById("originY").value;

        document.getElementById("originXValue").textContent = originX + "%";
        document.getElementById("originYValue").textContent = originY + "%";

        document.getElementById("previewBox").style.transformOrigin =
          originX + "% " + originY + "%";

        document
          .querySelectorAll(".origin-preset-btn")
          .forEach((btn) => btn.classList.remove("active"));

        updateTransform();
      }

      function setOrigin(x, y) {
        document.getElementById("originX").value = parseInt(x);
        document.getElementById("originY").value = parseInt(y);

        document.querySelectorAll(".origin-preset-btn").forEach((btn) => {
          btn.classList.remove("active");
          if (btn.onclick.toString().includes(x) && btn.onclick.toString().includes(y)) {
            btn.classList.add("active");
          }
        });

        updateOrigin();
      }

      function generateCode(transformParts, perspective) {
        const originX = document.getElementById("originX").value;
        const originY = document.getElementById("originY").value;

        let css = ".container {\n";
        css += "  perspective: " + perspective + "px;\n";
        css += "}\n\n";
        css += ".element {\n";

        if (transformParts.length > 0) {
          css += "  transform: " + transformParts.join("\n             ") + ";\n";
        } else {
          css += "  transform: none;\n";
        }

        if (originX != 50 || originY != 50) {
          css += "  transform-origin: " + originX + "% " + originY + "%;\n";
        }

        css += "  transform-style: preserve-3d;\n";
        css += "}";

        document.getElementById("codeOutput").textContent = css;
      }

      window.resetControl = function (id, defaultValue) {
        document.getElementById(id).value = defaultValue;
        updateTransform();
      };

      window.resetAll = function () {
        Object.keys(defaults).forEach((key) => {
          const el = document.getElementById(key);
          if (el) el.value = defaults[key];
        });

        document
          .querySelectorAll(".origin-preset-btn")
          .forEach((btn) => btn.classList.remove("active"));
        document.querySelectorAll(".origin-preset-btn")[4].classList.add("active");

        updateOrigin();
        updateTransform();
      };

      window.applyPreset = function (preset) {
        resetAll();

        switch (preset) {
          case "flip":
            document.getElementById("scaleX").value = -1;
            break;
          case "flipV":
            document.getElementById("scaleY").value = -1;
            break;
          case "rotate45":
            document.getElementById("rotate").value = 45;
            break;
          case "scale2x":
            document.getElementById("scaleX").value = 2;
            document.getElementById("scaleY").value = 2;
            break;
          case "skew":
            document.getElementById("skewX").value = 20;
            document.getElementById("skewY").value = 10;
            break;
          case "perspective":
            document.getElementById("perspective").value = 500;
            document.getElementById("rotateY").value = 45;
            break;
          case "card3d":
            document.getElementById("perspective").value = 600;
            document.getElementById("rotateX").value = 20;
            document.getElementById("rotateY").value = -30;
            break;
          case "swing":
            document.getElementById("rotate").value = 15;
            setOrigin("50%", "0%");
            break;
        }

        updateTransform();
      };

      window.copyCode = function () {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code).then(() => {
          const btn = document.querySelector(".copy-btn");
          btn.textContent = "已复制!";
          setTimeout(() => {
            btn.textContent = "复制代码";
          }, 2000);
        });
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        html.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
      };

      updateTransform();
    
