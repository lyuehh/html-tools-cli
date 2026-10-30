// @ts-nocheck
// Generated from tools/dev/svg-to-data-uri.html
// Source SHA-256: e86d33673fa4247705b087343f8f937be3485336eb305a241345bc5cfd20ce22
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var svgInputEl = document.getElementById("svgInput");
      var uriOutputEl = document.getElementById("uriOutput");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var previewBoxEl = document.getElementById("previewBox");
      var previewImgEl = document.getElementById("previewImg");
      var cssSnippetEl = document.getElementById("cssSnippet");
      var encodeModeEl = document.getElementById("encodeMode");
      var optimizeSvgEl = document.getElementById("optimizeSvg");
      var addNsEl = document.getElementById("addNs");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(1) + " MB";
      }

      function prepareSvg(raw) {
        var svg = raw.trim();
        if (addNsEl.checked && svg.indexOf("xmlns") === -1) {
          svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (optimizeSvgEl.checked) {
          svg = svg.replace(/<!--[\s\S]*?-->/g, "");
          svg = svg.replace(/\s{2,}/g, " ");
          svg = svg.replace(/>\s+</g, "><");
          svg = svg.trim();
        }
        return svg;
      }

      function svgToUrlEncoded(svg) {
        return (
          "data:image/svg+xml," +
          svg
            .replace(/%/g, "%25")
            .replace(/</g, "%3C")
            .replace(/>/g, "%3E")
            .replace(/"/g, "%22")
            .replace(/&/g, "%26")
            .replace(/#/g, "%23")
        );
      }

      function svgToBase64(svg) {
        return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
      }

      function convert() {
        var raw = svgInputEl.value.trim();
        if (!raw) {
          showStatus("请输入 SVG 代码", "error");
          return;
        }
        if (raw.indexOf("<svg") === -1) {
          showStatus("输入内容似乎不包含 <svg> 标签", "error");
          svgInputEl.classList.add("error");
          return;
        }
        svgInputEl.classList.remove("error");

        var svg = prepareSvg(raw);
        var mode = encodeModeEl.value;
        var dataUri;
        try {
          dataUri = mode === "base64" ? svgToBase64(svg) : svgToUrlEncoded(svg);
        } catch (e) {
          showStatus("编码失败: " + e.message, "error");
          return;
        }

        uriOutputEl.value = dataUri;
        previewImgEl.src = dataUri;
        cssSnippetEl.textContent = 'background-image: url("' + dataUri + '");';
        previewBoxEl.classList.add("show");

        var origSize = new Blob([raw]).size;
        var encodedSize = new Blob([dataUri]).size;
        document.getElementById("statOrigSize").textContent = formatSize(origSize);
        document.getElementById("statEncodedSize").textContent = formatSize(encodedSize);
        document.getElementById("statRatio").textContent =
          ((encodedSize / origSize) * 100).toFixed(0) + "%";
        statsEl.classList.add("show");

        showStatus("转换成功（" + (mode === "base64" ? "Base64" : "URL 编码") + "）", "success");
      }

      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          svgInputEl.value = text;
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnConvert").onclick = convert;

      document.getElementById("btnClear").onclick = function () {
        svgInputEl.value = "";
        uriOutputEl.value = "";
        svgInputEl.classList.remove("error");
        previewBoxEl.classList.remove("show");
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        previewImgEl.src = "";
        cssSnippetEl.textContent = "";
        history.replaceState(null, "", location.pathname);
      };

      document.getElementById("btnCopyUri").onclick = async function () {
        if (!uriOutputEl.value) {
          showStatus("没有可复制的内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(uriOutputEl.value);
          showStatus("Data URI 已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnCopyCss").onclick = async function () {
        if (!cssSnippetEl.textContent) {
          showStatus("没有可复制的内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(cssSnippetEl.textContent);
          showStatus("CSS 代码已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      svgInputEl.addEventListener("input", function () {
        svgInputEl.classList.remove("error");
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          convert();
        }
      });

      (function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return;
        try {
          svgInputEl.value = decodeURIComponent(atob(hash));
        } catch (e) {
          // ignore
        }
      })();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
