// @ts-nocheck
// Generated from tools/office/label-maker.html
// Source SHA-256: 60078563491f954bfe2562cabcff0eb4f31b250f571ed0a3e06cab64da9ca017
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var inputEl = document.getElementById("input");
      var labelsGridEl = document.getElementById("labelsGrid");
      var statusEl = document.getElementById("status");
      var labelSizeEl = document.getElementById("labelSize");
      var fontSizeEl = document.getElementById("fontSize");
      var fontSizeValueEl = document.getElementById("fontSizeValue");
      var statLabelsEl = document.getElementById("statLabels");
      var statSizeEl = document.getElementById("statSize");
      var alignBtns = document.querySelectorAll(".align-btn");
      var LS_KEY = "label_maker_input_v1";

      var currentAlign = "center";

      var sizeNames = {
        small: "小",
        medium: "中",
        large: "大"
      };

      window.loadFromUrl = function () {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          if (data.input) inputEl.value = data.input;
          if (data.size) labelSizeEl.value = data.size;
          if (data.fontSize) {
            fontSizeEl.value = data.fontSize;
            fontSizeValueEl.textContent = data.fontSize + "px";
          }
          if (data.align) {
            currentAlign = data.align;
            updateAlignButtons();
          }
          return true;
        } catch (e) {
          return false;
        }
      };

      function saveToUrl() {
        try {
          var data = {
            input: inputEl.value,
            size: labelSizeEl.value,
            fontSize: fontSizeEl.value,
            align: currentAlign
          };
          var encoded = btoa(encodeURIComponent(JSON.stringify(data)));
          if (encoded.length > 2000) return;
          history.replaceState(null, "", "#" + encoded);
        } catch (e) {}
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            if (data.input) inputEl.value = data.input;
            if (data.size) labelSizeEl.value = data.size;
            if (data.fontSize) {
              fontSizeEl.value = data.fontSize;
              fontSizeValueEl.textContent = data.fontSize + "px";
            }
            if (data.align) {
              currentAlign = data.align;
              updateAlignButtons();
            }
          } catch (e) {
            inputEl.value = saved;
          }
        }
      }

      function saveToStorage() {
        var data = {
          input: inputEl.value,
          size: labelSizeEl.value,
          fontSize: fontSizeEl.value,
          align: currentAlign
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function updateAlignButtons() {
        alignBtns.forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.align === currentAlign);
        });
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function getLabels() {
        return inputEl.value
          .split("\n")
          .map(function (line) {
            return line.trim();
          })
          .filter(function (line) {
            return line.length > 0;
          });
      }

      function createEmptyState() {
        var container = document.createElement("div");
        container.className = "empty-state";

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "1.5");

        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", "3");
        rect.setAttribute("y", "5");
        rect.setAttribute("width", "18");
        rect.setAttribute("height", "14");
        rect.setAttribute("rx", "2");
        svg.appendChild(rect);

        var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "7");
        line1.setAttribute("y1", "10");
        line1.setAttribute("x2", "17");
        line1.setAttribute("y2", "10");
        svg.appendChild(line1);

        var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "7");
        line2.setAttribute("y1", "14");
        line2.setAttribute("x2", "13");
        line2.setAttribute("y2", "14");
        svg.appendChild(line2);

        container.appendChild(svg);

        var span = document.createElement("span");
        span.textContent = '输入内容后点击"预览"';
        container.appendChild(span);

        return container;
      }

      function createLabelElement(text, size, fontSize) {
        var labelItem = document.createElement("div");
        labelItem.className = "label-item size-" + size;

        var labelContent = document.createElement("div");
        labelContent.className = "label-content align-" + currentAlign;
        labelContent.style.fontSize = fontSize + "px";
        labelContent.textContent = text;

        labelItem.appendChild(labelContent);
        return labelItem;
      }

      function generatePreview() {
        var labels = getLabels();
        var size = labelSizeEl.value;
        var fontSize = fontSizeEl.value;

        labelsGridEl.textContent = "";

        if (labels.length === 0) {
          labelsGridEl.appendChild(createEmptyState());
          statLabelsEl.textContent = "0";
          showStatus("请输入标签内容", "");
          return;
        }

        labels.forEach(function (label) {
          labelsGridEl.appendChild(createLabelElement(label, size, fontSize));
        });

        statLabelsEl.textContent = labels.length;
        statSizeEl.textContent = sizeNames[size];
        showStatus("已生成 " + labels.length + " 个标签", "success");
        saveToStorage();
        saveToUrl();
      }

      document.getElementById("btnPaste").onclick = function () {
        navigator.clipboard
          .readText()
          .then(function (text) {
            inputEl.value = text;
            saveToStorage();
            showStatus("已粘贴", "success");
          })
          .catch(function () {
            showStatus("无法访问剪贴板", "");
          });
      };

      document.getElementById("btnPreview").onclick = generatePreview;

      document.getElementById("btnPrint").onclick = function () {
        var labels = getLabels();
        if (labels.length === 0) {
          showStatus("请先输入标签内容", "");
          return;
        }
        generatePreview();
        setTimeout(function () {
          window.print();
        }, 100);
      };

      document.getElementById("btnShare").onclick = function () {
        saveToUrl();
        navigator.clipboard
          .writeText(location.href)
          .then(function () {
            showStatus("链接已复制", "success");
          })
          .catch(function () {
            showStatus("复制失败", "");
          });
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        labelsGridEl.textContent = "";
        labelsGridEl.appendChild(createEmptyState());
        statLabelsEl.textContent = "0";
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        showStatus("已清空", "success");
      };

      fontSizeEl.addEventListener("input", function () {
        fontSizeValueEl.textContent = this.value + "px";
        var labels = getLabels();
        if (labels.length > 0) {
          generatePreview();
        }
      });

      labelSizeEl.addEventListener("change", function () {
        var labels = getLabels();
        if (labels.length > 0) {
          generatePreview();
        }
      });

      alignBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentAlign = this.dataset.align;
          updateAlignButtons();
          var labels = getLabels();
          if (labels.length > 0) {
            generatePreview();
          }
        });
      });

      inputEl.addEventListener("input", function () {
        saveToStorage();
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          generatePreview();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "p") {
          e.preventDefault();
          document.getElementById("btnPrint").click();
        }
      });

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
      if (!loadFromUrl()) loadFromStorage();
    
