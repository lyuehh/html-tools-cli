// @ts-nocheck
// Generated from tools/text/text-merge.html
// Source SHA-256: 1f882a1df562b8a66c5d0d31b89dd25b66f8de6af0533b63443e1ed81768004a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      let inputCount = 2;

      window.addInput = function () {
        const container = document.getElementById("inputsContainer");
        const div = document.createElement("div");
        div.className = "input-group";
        div.dataset.index = inputCount;
        div.innerHTML = `
                <textarea placeholder="输入文本..." oninput="mergeTexts()"></textarea>
                <div class="input-actions">
                    <button class="btn btn-danger" onclick="removeInput(${inputCount})">×</button>
                    <button class="btn btn-secondary" onclick="clearInput(${inputCount})">清空</button>
                </div>
            `;
        container.appendChild(div);
        inputCount++;
      };

      window.removeInput = function (index) {
        const group = document.querySelector(`.input-group[data-index="${index}"]`);
        if (group && document.querySelectorAll(".input-group").length > 1) {
          group.remove();
          mergeTexts();
        }
      };

      window.clearInput = function (index) {
        const group = document.querySelector(`.input-group[data-index="${index}"]`);
        if (group) {
          group.querySelector("textarea").value = "";
          mergeTexts();
        }
      };

      window.updateSeparatorPreview = function () {
        const select = document.getElementById("lineSeparator");
        const customGroup = document.getElementById("customSepGroup");
        customGroup.style.display = select.value === "custom" ? "block" : "none";
      };

      // Toggle prefix/suffix inputs
      document.getElementById("addPrefix").addEventListener("change", (e) => {
        document.getElementById("prefixGroup").style.display = e.target.checked ? "block" : "none";
      });
      document.getElementById("addSuffix").addEventListener("change", (e) => {
        document.getElementById("suffixGroup").style.display = e.target.checked ? "block" : "none";
      });

      function mergeTexts() {
        const textareas = document.querySelectorAll(".input-group textarea");
        const lineSepSelect = document.getElementById("lineSeparator").value;
        const lineSep =
          lineSepSelect === "custom"
            ? document.getElementById("customSeparator").value
            : lineSepSelect.replace(/\\n/g, "\n").replace(/\\t/g, "\t");

        const blockSep = document.getElementById("blockSeparator").value.replace(/\\n/g, "\n");
        const sortMode = document.getElementById("sortMode").value;
        const removeDups = document.getElementById("removeDuplicates").checked;
        const removeEmpty = document.getElementById("removeEmpty").checked;
        const trimLines = document.getElementById("trimLines").checked;
        const addPrefix = document.getElementById("addPrefix").checked;
        const addSuffix = document.getElementById("addSuffix").checked;
        const addLineNumbers = document.getElementById("addLineNumbers").checked;
        const prefix = document.getElementById("prefixText").value;
        const suffix = document.getElementById("suffixText").value;

        let allLines = [];
        let originalCount = 0;

        textareas.forEach((ta, i) => {
          if (ta.value.trim()) {
            let lines = ta.value.split("\n");
            originalCount += lines.length;

            if (trimLines) {
              lines = lines.map((l) => l.trim());
            }
            if (removeEmpty) {
              lines = lines.filter((l) => l.length > 0);
            }

            if (blockSep === "none") {
              allLines = allLines.concat(lines);
            } else {
              if (allLines.length > 0) {
                allLines.push("__BLOCK_SEP__");
              }
              allLines = allLines.concat(lines);
            }
          }
        });

        // Remove duplicates
        let dupCount = 0;
        if (removeDups) {
          const before = allLines.length;
          allLines = [...new Set(allLines)];
          dupCount = before - allLines.length;
        }

        // Sort
        const blockSepLines = allLines.filter((l) => l === "__BLOCK_SEP__");
        let contentLines = allLines.filter((l) => l !== "__BLOCK_SEP__");

        switch (sortMode) {
          case "asc":
            contentLines.sort((a, b) => a.localeCompare(b, "zh-CN"));
            break;
          case "desc":
            contentLines.sort((a, b) => b.localeCompare(a, "zh-CN"));
            break;
          case "length-asc":
            contentLines.sort((a, b) => a.length - b.length);
            break;
          case "length-desc":
            contentLines.sort((a, b) => b.length - a.length);
            break;
          case "random":
            contentLines.sort(() => Math.random() - 0.5);
            break;
        }

        // Add prefix/suffix/line numbers
        contentLines = contentLines.map((line, i) => {
          let result = line;
          if (addLineNumbers) result = `${i + 1}. ${result}`;
          if (addPrefix) result = prefix + result;
          if (addSuffix) result = result + suffix;
          return result;
        });

        // Join with separator
        let output;
        if (blockSep === "none") {
          output = contentLines.join(lineSep);
        } else {
          // Reconstruct with block separators
          output = contentLines.join(lineSep);
        }

        // Replace block separators
        if (blockSep !== "none") {
          const actualBlockSep = blockSep === "\n" ? "\n" : blockSep === "\n\n" ? "\n\n" : blockSep;
          // Re-process with block awareness would need more complex logic
          // For now, simple join
        }

        document.getElementById("outputArea").textContent = output;
        document.getElementById("lineCount").textContent = contentLines.length;
        document.getElementById("charCount").textContent = output.length;
        document.getElementById("dupCount").textContent = dupCount;
      }

      window.copyOutput = function () {
        const output = document.getElementById("outputArea").textContent;
        navigator.clipboard.writeText(output);
        alert("已复制到剪贴板");
      };

      window.downloadOutput = function () {
        const output = document.getElementById("outputArea").textContent;
        const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "merged-text.txt";
        a.click();
        URL.revokeObjectURL(url);
      };

      window.clearAll = function () {
        document.querySelectorAll(".input-group textarea").forEach((ta) => (ta.value = ""));
        mergeTexts();
      };

      mergeTexts();
    
