// @ts-nocheck
// Generated from tools/text/latex-editor.html
// Source SHA-256: daf5e693fd995c38aa178fe214b99abcf2725bb7e7415406ecb0cec39a413ce2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 符号数据
      const symbols = {
        greek: [
          ["α", "\\alpha"],
          ["β", "\\beta"],
          ["γ", "\\gamma"],
          ["δ", "\\delta"],
          ["ε", "\\epsilon"],
          ["ζ", "\\zeta"],
          ["η", "\\eta"],
          ["θ", "\\theta"],
          ["ι", "\\iota"],
          ["κ", "\\kappa"],
          ["λ", "\\lambda"],
          ["μ", "\\mu"],
          ["ν", "\\nu"],
          ["ξ", "\\xi"],
          ["π", "\\pi"],
          ["ρ", "\\rho"],
          ["σ", "\\sigma"],
          ["τ", "\\tau"],
          ["υ", "\\upsilon"],
          ["φ", "\\phi"],
          ["χ", "\\chi"],
          ["ψ", "\\psi"],
          ["ω", "\\omega"],
          ["Γ", "\\Gamma"],
          ["Δ", "\\Delta"],
          ["Θ", "\\Theta"],
          ["Λ", "\\Lambda"],
          ["Π", "\\Pi"],
          ["Σ", "\\Sigma"],
          ["Φ", "\\Phi"],
          ["Ψ", "\\Psi"],
          ["Ω", "\\Omega"]
        ],
        operators: [
          ["+", "+"],
          ["-", "-"],
          ["×", "\\times"],
          ["÷", "\\div"],
          ["±", "\\pm"],
          ["∓", "\\mp"],
          ["·", "\\cdot"],
          ["∗", "\\ast"],
          ["∑", "\\sum"],
          ["∏", "\\prod"],
          ["∫", "\\int"],
          ["∮", "\\oint"],
          ["∂", "\\partial"],
          ["∇", "\\nabla"],
          ["√", "\\sqrt{}"],
          ["∛", "\\sqrt[3]{}"],
          ["lim", "\\lim"],
          ["log", "\\log"],
          ["ln", "\\ln"],
          ["sin", "\\sin"],
          ["cos", "\\cos"],
          ["tan", "\\tan"],
          ["∞", "\\infty"],
          ["∅", "\\emptyset"]
        ],
        relations: [
          ["=", "="],
          ["≠", "\\neq"],
          ["<", "<"],
          [">", ">"],
          ["≤", "\\leq"],
          ["≥", "\\geq"],
          ["≪", "\\ll"],
          ["≫", "\\gg"],
          ["≈", "\\approx"],
          ["≡", "\\equiv"],
          ["∼", "\\sim"],
          ["≃", "\\simeq"],
          ["∈", "\\in"],
          ["∉", "\\notin"],
          ["⊂", "\\subset"],
          ["⊃", "\\supset"],
          ["⊆", "\\subseteq"],
          ["⊇", "\\supseteq"],
          ["∪", "\\cup"],
          ["∩", "\\cap"],
          ["∧", "\\land"],
          ["∨", "\\lor"],
          ["¬", "\\neg"],
          ["⊥", "\\perp"]
        ],
        arrows: [
          ["←", "\\leftarrow"],
          ["→", "\\rightarrow"],
          ["↑", "\\uparrow"],
          ["↓", "\\downarrow"],
          ["↔", "\\leftrightarrow"],
          ["⇐", "\\Leftarrow"],
          ["⇒", "\\Rightarrow"],
          ["⇔", "\\Leftrightarrow"],
          ["↦", "\\mapsto"],
          ["↩", "\\hookleftarrow"],
          ["↪", "\\hookrightarrow"],
          ["⟶", "\\longrightarrow"],
          ["⟵", "\\longleftarrow"],
          ["⟹", "\\Longrightarrow"],
          ["⟸", "\\Longleftarrow"],
          ["⟺", "\\Longleftrightarrow"]
        ],
        misc: [
          ["∀", "\\forall"],
          ["∃", "\\exists"],
          ["∄", "\\nexists"],
          ["ℕ", "\\mathbb{N}"],
          ["ℤ", "\\mathbb{Z}"],
          ["ℚ", "\\mathbb{Q}"],
          ["ℝ", "\\mathbb{R}"],
          ["ℂ", "\\mathbb{C}"],
          ["°", "^\\circ"],
          ["′", "'"],
          ["″", "''"],
          ["…", "\\ldots"],
          ["⋯", "\\cdots"],
          ["⋮", "\\vdots"],
          ["⋱", "\\ddots"],
          ["ℏ", "\\hbar"]
        ],
        structures: [
          ["分数", "\\frac{a}{b}"],
          ["上标", "x^{n}"],
          ["下标", "x_{i}"],
          ["根号", "\\sqrt{x}"],
          ["n次根", "\\sqrt[n]{x}"],
          ["求和", "\\sum_{i=1}^{n}"],
          ["积分", "\\int_{a}^{b}"],
          ["极限", "\\lim_{x \\to \\infty}"],
          ["矩阵", "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}"],
          ["向量", "\\vec{v}"],
          ["帽子", "\\hat{x}"],
          ["横线", "\\overline{x}"],
          ["下划线", "\\underline{x}"],
          ["大括号", "\\left\\{ x \\right\\}"],
          ["中括号", "\\left[ x \\right]"],
          ["绝对值", "\\left| x \\right|"]
        ]
      };

      // 示例公式
      const examples = [
        { name: "二次公式", latex: "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" },
        { name: "欧拉公式", latex: "e^{i\\pi} + 1 = 0" },
        { name: "泰勒展开", latex: "e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}" },
        { name: "定积分", latex: "\\int_0^1 x^2 dx = \\frac{1}{3}" },
        { name: "极限", latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1" },
        { name: "矩阵", latex: "\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}" },
        { name: "求和", latex: "\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}" },
        { name: "偏导数", latex: "\\frac{\\partial f}{\\partial x}" }
      ];

      // 历史记录
      let history = JSON.parse(localStorage.getItem("latexHistory") || "[]");

      // 显示符号
      function showSymbols(category) {
        const grid = document.getElementById("symbol-grid");
        grid.textContent = "";

        // 更新标签状态
        document.querySelectorAll(".symbol-tabs button").forEach((btn) => {
          btn.classList.remove("active");
          if (btn.textContent.includes(getCategoryName(category))) {
            btn.classList.add("active");
          }
        });

        symbols[category].forEach(([display, latex]) => {
          const btn = document.createElement("button");
          btn.className = "symbol-btn";
          btn.textContent = display;
          btn.title = latex;
          btn.onclick = () => insertSymbol(latex);
          grid.appendChild(btn);
        });
      }

      function getCategoryName(category) {
        const names = {
          greek: "希腊字母",
          operators: "运算符",
          relations: "关系符",
          arrows: "箭头",
          misc: "其他",
          structures: "结构"
        };
        return names[category];
      }

      // 插入符号
      function insertSymbol(latex) {
        const input = document.getElementById("latex-input");
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;

        input.value = text.substring(0, start) + latex + text.substring(end);
        input.focus();
        input.selectionStart = input.selectionEnd = start + latex.length;

        renderLatex();
      }

      // 渲染LaTeX
      function renderLatex() {
        const input = document.getElementById("latex-input").value;
        const preview = document.getElementById("preview-box");

        if (!input.trim()) {
          preview.textContent = "";
          const placeholder = document.createElement("span");
          placeholder.style.color = "var(--pico-muted-color)";
          placeholder.textContent = "预览将显示在这里...";
          preview.appendChild(placeholder);
          return;
        }

        try {
          preview.textContent = "";
          katex.render(input, preview, {
            displayMode: true,
            throwOnError: true,
            errorColor: "#e74c3c"
          });
        } catch (e) {
          preview.textContent = "";
          const errorDiv = document.createElement("div");
          errorDiv.className = "error-message";
          errorDiv.textContent = "错误: " + e.message;
          preview.appendChild(errorDiv);
        }
      }

      // 清空编辑器
      window.clearEditor = function () {
        document.getElementById("latex-input").value = "";
        renderLatex();
      };

      // 复制LaTeX代码
      window.copyLatex = function () {
        const input = document.getElementById("latex-input");
        navigator.clipboard.writeText(input.value).then(() => {
          const btn = event.target;
          const originalText = btn.textContent;
          btn.textContent = "已复制";
          setTimeout(() => {
            btn.textContent = originalText;
          }, 1500);
        });
      };

      // 导出SVG
      window.exportAsSVG = function () {
        const preview = document.getElementById("preview-box");
        const svg = preview.querySelector("svg");

        if (!svg) {
          alert("请先输入并渲染公式");
          return;
        }

        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "formula.svg";
        a.click();

        URL.revokeObjectURL(url);
      };

      // 保存到历史
      window.saveToHistory = function () {
        const input = document.getElementById("latex-input").value;
        if (!input.trim()) return;

        // 避免重复
        if (!history.includes(input)) {
          history.unshift(input);
          if (history.length > 20) history.pop();
          localStorage.setItem("latexHistory", JSON.stringify(history));
          updateHistoryList();
        }
      };

      // 更新历史列表
      function updateHistoryList() {
        const list = document.getElementById("history-list");
        list.textContent = "";

        if (history.length === 0) {
          const p = document.createElement("p");
          p.style.color = "var(--pico-muted-color)";
          p.style.fontSize = "0.85rem";
          p.textContent = "暂无历史记录";
          list.appendChild(p);
          return;
        }

        history.forEach((latex, index) => {
          const item = document.createElement("div");
          item.className = "history-item";
          item.textContent = latex.length > 50 ? latex.substring(0, 50) + "..." : latex;
          item.onclick = () => {
            document.getElementById("latex-input").value = latex;
            renderLatex();
          };
          list.appendChild(item);
        });
      }

      // 初始化示例
      function initExamples() {
        const list = document.getElementById("example-list");

        examples.forEach((ex) => {
          const item = document.createElement("div");
          item.className = "example-item";

          const name = document.createElement("span");
          name.textContent = ex.name;

          const code = document.createElement("code");
          code.textContent = ex.latex;

          item.appendChild(name);
          item.appendChild(code);

          item.onclick = () => {
            document.getElementById("latex-input").value = ex.latex;
            renderLatex();
          };
          list.appendChild(item);
        });
      }

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 初始化
      document.addEventListener("DOMContentLoaded", function () {
        // 初始化主题
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("theme-icon").textContent = savedTheme === "light" ? "🌙" : "☀️";

        // 显示默认符号
        showSymbols("greek");

        // 初始化示例
        initExamples();

        // 更新历史
        updateHistoryList();

        // 实时预览
        document.getElementById("latex-input").addEventListener("input", renderLatex);
      });
    
