// @ts-nocheck
// Generated from tools/dev/editorconfig-gen.html
// Source SHA-256: 8746550f5b1750fe360ab6ba6ea38dfcdb0d19879a2c02d1b5b07166920c4e57
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const themeToggle = document.getElementById("themeToggle");
      const rootFlagInput = document.getElementById("rootFlag");
      const sectionListEl = document.getElementById("sectionList");
      const previewEl = document.getElementById("preview");
      const editingPatternEl = document.getElementById("editingPattern");

      // 表单元素
      const patternInput = document.getElementById("pattern");
      const indentStyleSelect = document.getElementById("indentStyle");
      const indentSizeSelect = document.getElementById("indentSize");
      const endOfLineSelect = document.getElementById("endOfLine");
      const charsetSelect = document.getElementById("charset");
      const trimTrailingSelect = document.getElementById("trimTrailing");
      const insertFinalNewlineSelect = document.getElementById("insertFinalNewline");
      const maxLineLengthInput = document.getElementById("maxLineLength");

      let sections = [];
      let editingIndex = -1;

      // 预设配置
      const presets = {
        web: [
          {
            pattern: "*",
            indent_style: "space",
            indent_size: "2",
            end_of_line: "lf",
            charset: "utf-8",
            trim_trailing_whitespace: "true",
            insert_final_newline: "true"
          },
          { pattern: "*.md", trim_trailing_whitespace: "false" },
          { pattern: "Makefile", indent_style: "tab" },
          { pattern: "*.{json,yml,yaml}", indent_size: "2" }
        ],
        node: [
          {
            pattern: "*",
            indent_style: "space",
            indent_size: "2",
            end_of_line: "lf",
            charset: "utf-8",
            trim_trailing_whitespace: "true",
            insert_final_newline: "true"
          },
          { pattern: "*.md", trim_trailing_whitespace: "false" },
          { pattern: "package.json", indent_size: "2" }
        ],
        python: [
          {
            pattern: "*",
            indent_style: "space",
            indent_size: "4",
            end_of_line: "lf",
            charset: "utf-8",
            trim_trailing_whitespace: "true",
            insert_final_newline: "true"
          },
          { pattern: "*.py", max_line_length: "88" },
          { pattern: "Makefile", indent_style: "tab" }
        ],
        java: [
          {
            pattern: "*",
            indent_style: "space",
            indent_size: "4",
            end_of_line: "lf",
            charset: "utf-8",
            trim_trailing_whitespace: "true",
            insert_final_newline: "true"
          },
          { pattern: "*.xml", indent_size: "2" },
          { pattern: "Makefile", indent_style: "tab" }
        ],
        go: [
          {
            pattern: "*",
            indent_style: "tab",
            end_of_line: "lf",
            charset: "utf-8",
            trim_trailing_whitespace: "true",
            insert_final_newline: "true"
          },
          { pattern: "*.go", indent_style: "tab" },
          { pattern: "Makefile", indent_style: "tab" }
        ],
        rust: [
          {
            pattern: "*",
            indent_style: "space",
            indent_size: "4",
            end_of_line: "lf",
            charset: "utf-8",
            trim_trailing_whitespace: "true",
            insert_final_newline: "true"
          },
          { pattern: "*.rs", indent_size: "4" },
          { pattern: "Makefile", indent_style: "tab" }
        ]
      };

      // 主题切换
      function initTheme() {
        const savedTheme = localStorage.getItem("editorconfig-gen-theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateThemeButton(savedTheme);
      }

      function updateThemeButton(theme) {
        themeToggle.textContent = theme === "dark" ? "浅色模式" : "深色模式";
      }

      themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("editorconfig-gen-theme", newTheme);
        updateThemeButton(newTheme);
      });

      // 加载预设
      window.loadPreset = function (name) {
        if (sections.length > 0 && !confirm("这将替换当前配置，确定继续吗？")) {
          return;
        }
        sections = JSON.parse(JSON.stringify(presets[name]));
        editingIndex = -1;
        renderSectionList();
        updatePreview();
        saveToStorage();
      };

      // 渲染规则列表
      function renderSectionList() {
        if (sections.length === 0) {
          sectionListEl.innerHTML = '<div class="empty-state">暂无规则，请添加</div>';
          return;
        }

        sectionListEl.innerHTML = sections
          .map(
            (s, i) => `
                <div class="section-item ${i === editingIndex ? "active" : ""}" onclick="editSection(${i})">
                    <span>[${s.pattern}]</span>
                    <button class="btn-small outline" onclick="event.stopPropagation(); deleteSection(${i})">删除</button>
                </div>
            `
          )
          .join("");
      }

      // 添加规则
      window.addSection = function () {
        sections.push({ pattern: "*" });
        editingIndex = sections.length - 1;
        renderSectionList();
        loadSectionToForm(editingIndex);
        updatePreview();
        saveToStorage();
      };

      // 编辑规则
      window.editSection = function (index) {
        editingIndex = index;
        renderSectionList();
        loadSectionToForm(index);
      };

      // 加载规则到表单
      function loadSectionToForm(index) {
        const section = sections[index];
        editingPatternEl.textContent = `[${section.pattern}]`;

        patternInput.value = section.pattern || "*";
        indentStyleSelect.value = section.indent_style || "";
        indentSizeSelect.value = section.indent_size || "";
        endOfLineSelect.value = section.end_of_line || "";
        charsetSelect.value = section.charset || "";
        trimTrailingSelect.value = section.trim_trailing_whitespace || "";
        insertFinalNewlineSelect.value = section.insert_final_newline || "";
        maxLineLengthInput.value = section.max_line_length || "";
      }

      // 保存规则
      window.saveSection = function () {
        if (editingIndex < 0) return;

        const pattern = patternInput.value.trim() || "*";

        sections[editingIndex] = {
          pattern
        };

        if (indentStyleSelect.value) sections[editingIndex].indent_style = indentStyleSelect.value;
        if (indentSizeSelect.value) sections[editingIndex].indent_size = indentSizeSelect.value;
        if (endOfLineSelect.value) sections[editingIndex].end_of_line = endOfLineSelect.value;
        if (charsetSelect.value) sections[editingIndex].charset = charsetSelect.value;
        if (trimTrailingSelect.value)
          sections[editingIndex].trim_trailing_whitespace = trimTrailingSelect.value;
        if (insertFinalNewlineSelect.value)
          sections[editingIndex].insert_final_newline = insertFinalNewlineSelect.value;
        if (maxLineLengthInput.value)
          sections[editingIndex].max_line_length = maxLineLengthInput.value;

        renderSectionList();
        updatePreview();
        saveToStorage();
      };

      // 取消编辑
      window.cancelEdit = function () {
        editingIndex = -1;
        renderSectionList();
        clearForm();
      };

      // 清空表单
      function clearForm() {
        editingPatternEl.textContent = "";
        patternInput.value = "*";
        indentStyleSelect.value = "";
        indentSizeSelect.value = "";
        endOfLineSelect.value = "";
        charsetSelect.value = "";
        trimTrailingSelect.value = "";
        insertFinalNewlineSelect.value = "";
        maxLineLengthInput.value = "";
      }

      // 删除规则
      window.deleteSection = function (index) {
        if (confirm("确定要删除这条规则吗？")) {
          sections.splice(index, 1);
          if (editingIndex === index) {
            editingIndex = -1;
            clearForm();
          } else if (editingIndex > index) {
            editingIndex--;
          }
          renderSectionList();
          updatePreview();
          saveToStorage();
        }
      };

      // 更新预览
      window.updatePreview = function () {
        let output = "# EditorConfig 帮助开发者在不同编辑器之间保持一致的编码风格\n";
        output += "# https://editorconfig.org\n\n";

        if (rootFlagInput.checked) {
          output += "root = true\n";
        }

        sections.forEach((section) => {
          output += `\n[${section.pattern}]\n`;

          if (section.indent_style) output += `indent_style = ${section.indent_style}\n`;
          if (section.indent_size) output += `indent_size = ${section.indent_size}\n`;
          if (section.end_of_line) output += `end_of_line = ${section.end_of_line}\n`;
          if (section.charset) output += `charset = ${section.charset}\n`;
          if (section.trim_trailing_whitespace)
            output += `trim_trailing_whitespace = ${section.trim_trailing_whitespace}\n`;
          if (section.insert_final_newline)
            output += `insert_final_newline = ${section.insert_final_newline}\n`;
          if (section.max_line_length) output += `max_line_length = ${section.max_line_length}\n`;
        });

        previewEl.textContent = output;
      };

      // 复制
      window.copyConfig = function () {
        navigator.clipboard.writeText(previewEl.textContent).then(() => {
          alert("已复制到剪贴板！");
        });
      };

      // 下载
      window.downloadConfig = function () {
        const content = previewEl.textContent;
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = ".editorconfig";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 清空
      window.clearAll = function () {
        if (confirm("确定要清空所有配置吗？")) {
          sections = [];
          editingIndex = -1;
          clearForm();
          renderSectionList();
          updatePreview();
          saveToStorage();
        }
      };

      // 保存到本地存储
      function saveToStorage() {
        localStorage.setItem(
          "editorconfig-gen-data",
          JSON.stringify({
            root: rootFlagInput.checked,
            sections
          })
        );
      }

      // 从本地存储加载
      function loadFromStorage() {
        const saved = localStorage.getItem("editorconfig-gen-data");
        if (saved) {
          try {
            const data = JSON.parse(saved);
            rootFlagInput.checked = data.root !== false;
            sections = data.sections || [];
            renderSectionList();
            updatePreview();
          } catch (e) {
            console.error("Failed to load saved data:", e);
          }
        }
      }

      // 监听 root 变化
      rootFlagInput.addEventListener("change", () => {
        updatePreview();
        saveToStorage();
      });

      // 初始化
      initTheme();
      loadFromStorage();

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
    
