// @ts-nocheck
// Generated from tools/design/css-transform-generator.html
// Source SHA-256: 4ba87ea2acac7ed0755b3c20cef7e8a1369cb310a03fd3af5ec85d406910e9a5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function updateTransform() {
        const rotate = document.getElementById("rotate").value;
        const rotateX = document.getElementById("rotateX").value;
        const rotateY = document.getElementById("rotateY").value;
        const scale = document.getElementById("scale").value;
        const skewX = document.getElementById("skewX").value;
        const skewY = document.getElementById("skewY").value;
        const translateX = document.getElementById("translateX").value;
        const translateY = document.getElementById("translateY").value;

        document.getElementById("rotateVal").textContent = rotate + "deg";
        document.getElementById("rotateXVal").textContent = rotateX + "deg";
        document.getElementById("rotateYVal").textContent = rotateY + "deg";
        document.getElementById("scaleVal").textContent = scale;
        document.getElementById("skewXVal").textContent = skewX + "deg";
        document.getElementById("skewYVal").textContent = skewY + "deg";
        document.getElementById("translateXVal").textContent = translateX + "px";
        document.getElementById("translateYVal").textContent = translateY + "px";

        const transforms = [];
        if (translateX !== "0" || translateY !== "0")
          transforms.push(`translate(${translateX}px, ${translateY}px)`);
        if (rotate !== "0") transforms.push(`rotate(${rotate}deg)`);
        if (rotateX !== "0") transforms.push(`rotateX(${rotateX}deg)`);
        if (rotateY !== "0") transforms.push(`rotateY(${rotateY}deg)`);
        if (scale !== "1") transforms.push(`scale(${scale})`);
        if (skewX !== "0") transforms.push(`skewX(${skewX}deg)`);
        if (skewY !== "0") transforms.push(`skewY(${skewY}deg)`);

        const transformValue = transforms.length > 0 ? transforms.join(" ") : "none";
        document.getElementById("previewBox").style.transform = transformValue;
        document.getElementById("output").value = `transform: ${transformValue};`;
      }

      function resetTransform() {
        document.getElementById("rotate").value = 0;
        document.getElementById("rotateX").value = 0;
        document.getElementById("rotateY").value = 0;
        document.getElementById("scale").value = 1;
        document.getElementById("skewX").value = 0;
        document.getElementById("skewY").value = 0;
        document.getElementById("translateX").value = 0;
        document.getElementById("translateY").value = 0;
        updateTransform();
      }

      function copyCSS() {
        navigator.clipboard.writeText(document.getElementById("output").value);
      }

      updateTransform();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
