// @ts-nocheck
// Generated from tools/dev/svg-optimizer.html
// Source SHA-256: c95473411a3dadf57461d3e0b3a37048c791c30ef90a3b18a4a4ddfc8844eea1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const dropZone = document.getElementById("dropZone");
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        handleFile(e.dataTransfer.files[0]);
      });

      function handleFile(file) {
        if (!file || !file.name.endsWith(".svg")) {
          alert("请选择SVG文件");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("inputSvg").value = e.target.result;
          updatePreview("input");
          updateStats();
        };
        reader.readAsText(file);
      }

      window.updatePreview = function (which) {
        const input = document.getElementById(which === "input" ? "inputSvg" : "outputSvg").value;
        const preview = document.getElementById(
          which === "input" ? "inputPreview" : "outputPreview"
        );

        if (input.trim().startsWith("<svg")) {
          preview.innerHTML = input;
        } else {
          preview.innerHTML = '<span style="color: var(--color-text-secondary);">无效的SVG</span>';
        }

        if (which === "input") updateStats();
      };

      function updateStats() {
        const input = document.getElementById("inputSvg").value;
        const output = document.getElementById("outputSvg").value;

        const inputSize = new Blob([input]).size;
        const outputSize = new Blob([output]).size;

        document.getElementById("inputStats").textContent = formatSize(inputSize);

        if (output && inputSize > 0) {
          const saved = ((1 - outputSize / inputSize) * 100).toFixed(1);
          document.getElementById("outputStats").innerHTML =
            `${formatSize(outputSize)} <span class="saved">(节省 ${saved}%)</span>`;
        } else {
          document.getElementById("outputStats").textContent = "0 字节";
        }
      }

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " 字节";
        return (bytes / 1024).toFixed(2) + " KB";
      }

      window.optimize = function () {
        let svg = document.getElementById("inputSvg").value;

        if (!svg.trim()) {
          alert("请输入SVG代码");
          return;
        }

        const options = {
          removeComments: document.getElementById("removeComments").checked,
          removeMetadata: document.getElementById("removeMetadata").checked,
          removeEmptyAttrs: document.getElementById("removeEmptyAttrs").checked,
          removeEmptyGroups: document.getElementById("removeEmptyGroups").checked,
          cleanupIds: document.getElementById("cleanupIds").checked,
          removeDefaultAttrs: document.getElementById("removeDefaultAttrs").checked,
          prettify: document.getElementById("prettify").checked,
          minify: document.getElementById("minify").checked
        };

        try {
          svg = optimizeSvg(svg, options);
          document.getElementById("outputSvg").value = svg;
          updatePreview("output");
          updateStats();
        } catch (e) {
          alert("优化失败: " + e.message);
        }
      };

      function optimizeSvg(svg, options) {
        // Remove XML declaration
        svg = svg.replace(/<\?xml[^?]*\?>/gi, "");

        // Remove comments
        if (options.removeComments) {
          svg = svg.replace(/<!--[\s\S]*?-->/g, "");
        }

        // Remove metadata
        if (options.removeMetadata) {
          svg = svg.replace(/<metadata[\s\S]*?<\/metadata>/gi, "");
          svg = svg.replace(/<title[\s\S]*?<\/title>/gi, "");
          svg = svg.replace(/<desc[\s\S]*?<\/desc>/gi, "");
        }

        // Remove editor-specific attributes
        const editorAttrs = [
          "xmlns:sodipodi",
          "xmlns:inkscape",
          "sodipodi:docname",
          "inkscape:version",
          "inkscape:export-filename",
          "inkscape:export-xdpi",
          "inkscape:export-ydpi",
          "data-name",
          "sketch:type"
        ];
        editorAttrs.forEach((attr) => {
          const regex = new RegExp(`\\s*${attr}="[^"]*"`, "gi");
          svg = svg.replace(regex, "");
        });

        // Remove empty attributes
        if (options.removeEmptyAttrs) {
          svg = svg.replace(/\s+[a-zA-Z-]+=""/g, "");
        }

        // Remove default attributes
        if (options.removeDefaultAttrs) {
          svg = svg.replace(/\s+fill-opacity="1"/g, "");
          svg = svg.replace(/\s+stroke-opacity="1"/g, "");
          svg = svg.replace(/\s+opacity="1"/g, "");
          svg = svg.replace(/\s+fill-rule="nonzero"/g, "");
        }

        // Remove empty groups
        if (options.removeEmptyGroups) {
          svg = svg.replace(/<g[^>]*>\s*<\/g>/gi, "");
        }

        // Simplify IDs
        if (options.cleanupIds) {
          let idCounter = 0;
          const idMap = new Map();

          svg = svg.replace(/\bid="([^"]+)"/g, (match, id) => {
            if (!idMap.has(id)) {
              idMap.set(id, "a" + idCounter++);
            }
            return `id="${idMap.get(id)}"`;
          });

          // Update references
          idMap.forEach((newId, oldId) => {
            svg = svg.replace(new RegExp(`#${oldId}(?=[^a-zA-Z0-9])`, "g"), "#" + newId);
            svg = svg.replace(new RegExp(`url\\(#${oldId}\\)`, "g"), `url(#${newId})`);
          });
        }

        // Minify or prettify
        if (options.minify && !options.prettify) {
          // Remove whitespace between tags
          svg = svg.replace(/>\s+</g, "><");
          // Remove extra whitespace
          svg = svg.replace(/\s+/g, " ");
          // Remove whitespace around =
          svg = svg.replace(/\s*=\s*/g, "=");
          svg = svg.trim();
        } else if (options.prettify) {
          // Simple prettify
          svg = svg.replace(/>\s*</g, ">\n<");
          const lines = svg.split("\n");
          let indent = 0;
          svg = lines
            .map((line) => {
              line = line.trim();
              if (line.startsWith("</")) indent--;
              const result = "  ".repeat(Math.max(0, indent)) + line;
              if (
                line.startsWith("<") &&
                !line.startsWith("</") &&
                !line.endsWith("/>") &&
                !line.includes("</")
              ) {
                indent++;
              }
              return result;
            })
            .join("\n");
        }

        return svg;
      }

      window.copySvg = function () {
        const output = document.getElementById("outputSvg").value;
        if (!output) {
          alert("没有可复制的内容");
          return;
        }
        navigator.clipboard.writeText(output);
        showToast();
      };

      window.downloadSvg = function () {
        const output = document.getElementById("outputSvg").value;
        if (!output) {
          alert("没有可下载的内容");
          return;
        }

        const blob = new Blob([output], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "optimized.svg";
        link.click();
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
