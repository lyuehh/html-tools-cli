// @ts-nocheck
// Generated from tools/dev/svg-sprite-generator.html
// Source SHA-256: 5af3a370f3f9a41fd29e5254c59ce39aafa2ca16af23096d5d8d02f1e507cd24
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var icons = [];

      var dropZoneEl = document.getElementById("dropZone");
      var fileInputEl = document.getElementById("fileInput");
      var iconListEl = document.getElementById("iconList");
      var iconListEmptyEl = document.getElementById("iconListEmpty");
      var spriteOutputEl = document.getElementById("spriteOutput");
      var useOutputEl = document.getElementById("useOutput");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var optStripFillEl = document.getElementById("optStripFill");
      var optStripStrokeEl = document.getElementById("optStripStroke");
      var optHiddenEl = document.getElementById("optHidden");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
      }

      function slugify(name) {
        var slug = name
          .toLowerCase()
          .replace(/\.svg$/i, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        return slug || "icon";
      }

      function extractViewBox(svgText) {
        var m = svgText.match(/viewBox\s*=\s*["']([^"']+)["']/i);
        return m ? m[1] : "0 0 24 24";
      }

      function extractInnerContent(svgText) {
        var m = svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
        return m ? m[1].trim() : svgText;
      }

      function stripAttr(content, attr) {
        return content.replace(new RegExp("\\s" + attr + "\\s*=\\s*[\"'][^\"']*[\"']", "gi"), "");
      }

      function processSvgContent(svgText) {
        var inner = extractInnerContent(svgText);
        if (optStripFillEl.checked) {
          inner = stripAttr(inner, "fill");
        }
        if (optStripStrokeEl.checked) {
          inner = stripAttr(inner, "stroke");
        }
        return inner;
      }

      function readFile(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (e) {
            resolve(e.target.result);
          };
          reader.onerror = reject;
          reader.readAsText(file);
        });
      }

      function buildPreviewSvg(svgText) {
        var vb = extractViewBox(svgText);
        var inner = extractInnerContent(svgText);
        return (
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' +
          vb +
          '" width="48" height="48">' +
          inner +
          "</svg>"
        );
      }

      function addIcons(files) {
        var svgFiles = Array.from(files).filter(function (f) {
          return f.type === "image/svg+xml" || f.name.toLowerCase().endsWith(".svg");
        });
        if (svgFiles.length === 0) {
          showStatus("没有找到有效的 SVG 文件", "error");
          return;
        }
        var promises = svgFiles.map(function (file) {
          return readFile(file).then(function (text) {
            var id = slugify(file.name);
            var baseId = id;
            var counter = 1;
            while (
              icons.some(function (ic) {
                return ic.id === id;
              })
            ) {
              id = baseId + "-" + counter;
              counter++;
            }
            icons.push({
              id: id,
              originalName: file.name,
              svgText: text,
              viewBox: extractViewBox(text)
            });
          });
        });
        Promise.all(promises).then(function () {
          renderIconList();
          showStatus("已加载 " + svgFiles.length + " 个图标", "success");
        });
      }

      function renderIconList() {
        iconListEl.innerHTML = "";
        if (icons.length === 0) {
          iconListEl.style.display = "none";
          iconListEmptyEl.style.display = "";
          statsEl.classList.remove("show");
          return;
        }
        iconListEl.style.display = "";
        iconListEmptyEl.style.display = "none";

        icons.forEach(function (icon, idx) {
          var item = document.createElement("div");
          item.className = "icon-item";

          var preview = document.createElement("div");
          preview.className = "icon-preview";
          preview.innerHTML = buildPreviewSvg(icon.svgText);

          var nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.className = "icon-name-input";
          nameInput.value = icon.id;
          nameInput.setAttribute("aria-label", "图标 ID");
          nameInput.dataset.idx = String(idx);

          nameInput.addEventListener("change", function () {
            var newId =
              this.value
                .trim()
                .replace(/[^a-z0-9-_]/gi, "-")
                .replace(/^-+|-+$/g, "") || "icon-" + this.dataset.idx;
            icons[Number(this.dataset.idx)].id = newId;
            this.value = newId;
          });

          var removeBtn = document.createElement("button");
          removeBtn.className = "icon-remove";
          removeBtn.textContent = "x";
          removeBtn.setAttribute("aria-label", "移除 " + icon.id);
          removeBtn.dataset.idx = String(idx);

          removeBtn.addEventListener("click", function () {
            icons.splice(Number(this.dataset.idx), 1);
            renderIconList();
            showStatus("已移除图标", "");
          });

          item.appendChild(preview);
          item.appendChild(nameInput);
          item.appendChild(removeBtn);
          iconListEl.appendChild(item);
        });

        document.getElementById("statIcons").textContent = icons.length;
        statsEl.classList.add("show");
      }

      function generateSprite() {
        if (icons.length === 0) {
          showStatus("请先上传 SVG 图标", "error");
          return "";
        }
        var hiddenAttr = optHiddenEl.checked ? ' style="display:none"' : "";
        var symbols = icons.map(function (icon) {
          var inner = processSvgContent(icon.svgText);
          return (
            '  <symbol id="' +
            icon.id +
            '" viewBox="' +
            icon.viewBox +
            '">\n    ' +
            inner.replace(/\n/g, "\n    ") +
            "\n  </symbol>"
          );
        });
        return (
          '<svg xmlns="http://www.w3.org/2000/svg"' +
          hiddenAttr +
          ">\n" +
          symbols.join("\n") +
          "\n</svg>"
        );
      }

      function generateUseCode() {
        return icons
          .map(function (icon) {
            return (
              "<!-- " +
              icon.id +
              ' -->\n<svg width="24" height="24" aria-hidden="true">\n  <use href="#' +
              icon.id +
              '"></use>\n</svg>'
            );
          })
          .join("\n\n");
      }

      document.getElementById("btnGenerate").onclick = function () {
        if (icons.length === 0) {
          showStatus("请先上传 SVG 图标", "error");
          return;
        }
        var sprite = generateSprite();
        var useCode = generateUseCode();
        spriteOutputEl.value = sprite;
        useOutputEl.value = useCode;
        var bytes = new Blob([sprite]).size;
        document.getElementById("statSize").textContent = formatSize(bytes);
        showStatus("已生成 " + icons.length + " 个图标的 sprite", "success");
        statsEl.classList.add("show");
      };

      document.getElementById("btnDownload").onclick = function () {
        var sprite = generateSprite();
        if (!sprite) return;
        var blob = new Blob([sprite], { type: "image/svg+xml" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "sprite.svg";
        a.click();
        URL.revokeObjectURL(url);
        showStatus("已下载 sprite.svg", "success");
      };

      document.getElementById("btnCopySprite").onclick = async function () {
        var sprite = generateSprite();
        if (!sprite) return;
        try {
          await navigator.clipboard.writeText(sprite);
          showStatus("Sprite 已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败，请手动复制", "error");
        }
      };

      document.getElementById("btnCopyUse").onclick = async function () {
        if (icons.length === 0) {
          showStatus("请先上传图标", "error");
          return;
        }
        var useCode = generateUseCode();
        try {
          await navigator.clipboard.writeText(useCode);
          showStatus("use 代码已复制", "success");
        } catch (e) {
          showStatus("复制失败，请手动复制", "error");
        }
      };

      document.getElementById("btnClearAll").onclick = function () {
        icons = [];
        spriteOutputEl.value = "";
        useOutputEl.value = "";
        statusEl.textContent = "";
        statusEl.className = "status";
        renderIconList();
      };

      // Drop zone events
      dropZoneEl.addEventListener("click", function (e) {
        if (e.target !== fileInputEl) {
          fileInputEl.click();
        }
      });

      dropZoneEl.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropZoneEl.classList.add("drag-over");
      });

      dropZoneEl.addEventListener("dragleave", function () {
        dropZoneEl.classList.remove("drag-over");
      });

      dropZoneEl.addEventListener("drop", function (e) {
        e.preventDefault();
        dropZoneEl.classList.remove("drag-over");
        addIcons(e.dataTransfer.files);
      });

      fileInputEl.addEventListener("change", function () {
        if (this.files && this.files.length > 0) {
          addIcons(this.files);
          this.value = "";
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
    
