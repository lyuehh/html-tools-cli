// @ts-nocheck
// Generated from tools/calculator/math-evaluator.html
// Source SHA-256: 5df4a030e67a576b00ed60ccf6594d8f5bc0d3ddf019248469ae9c661d0b2b8c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const expressionEl = document.getElementById("expression");
      const resultEl = document.getElementById("result");
      const historySection = document.getElementById("historySection");
      const historyList = document.getElementById("historyList");
      const functionGrid = document.getElementById("functionGrid");
      const LS_HISTORY_KEY = "math_eval_history_v1";

      const FUNCTIONS = [
        { name: "sin(x)", desc: "正弦" },
        { name: "cos(x)", desc: "余弦" },
        { name: "tan(x)", desc: "正切" },
        { name: "asin(x)", desc: "反正弦" },
        { name: "acos(x)", desc: "反余弦" },
        { name: "atan(x)", desc: "反正切" },
        { name: "sqrt(x)", desc: "平方根" },
        { name: "cbrt(x)", desc: "立方根" },
        { name: "abs(x)", desc: "绝对值" },
        { name: "log(x)", desc: "自然对数" },
        { name: "log10(x)", desc: "常用对数" },
        { name: "log2(x)", desc: "以2为底" },
        { name: "exp(x)", desc: "e^x" },
        { name: "floor(x)", desc: "向下取整" },
        { name: "ceil(x)", desc: "向上取整" },
        { name: "round(x)", desc: "四舍五入" },
        { name: "pow(x,y)", desc: "x的y次方" },
        { name: "min(a,b)", desc: "最小值" },
        { name: "max(a,b)", desc: "最大值" },
        { name: "pi", desc: "圆周率π" },
        { name: "e", desc: "自然常数e" }
      ];

      function renderFunctionGrid() {
        functionGrid.innerHTML = "";
        FUNCTIONS.forEach(function (fn) {
          const item = document.createElement("div");
          item.className = "function-item";
          const code = document.createElement("code");
          code.textContent = fn.name;
          item.appendChild(code);
          item.appendChild(document.createTextNode(" " + fn.desc));
          item.addEventListener("click", function () {
            insertFunction(fn.name);
          });
          functionGrid.appendChild(item);
        });
      }

      function insertFunction(fnName) {
        const pos = expressionEl.selectionStart;
        const text = expressionEl.value;
        expressionEl.value = text.substring(0, pos) + fnName + text.substring(pos);
        expressionEl.focus();
        if (fnName.includes("(x)")) {
          expressionEl.setSelectionRange(pos + fnName.indexOf("x"), pos + fnName.indexOf("x") + 1);
        } else {
          expressionEl.setSelectionRange(pos + fnName.length, pos + fnName.length);
        }
      }

      function formatResult(num) {
        if (typeof num === "object") return math.format(num, { precision: 14 });
        if (Number.isInteger(num)) return num.toString();
        if (Math.abs(num) < 1e-10 || Math.abs(num) > 1e10) return num.toExponential(10);
        return (Math.round(num * 1e12) / 1e12).toString();
      }

      window.calculate = function () {
        const expr = expressionEl.value.trim();
        if (!expr) {
          resultEl.textContent = "-";
          resultEl.classList.remove("error");
          return;
        }
        try {
          const result = math.evaluate(expr);
          const formatted = formatResult(result);
          resultEl.textContent = formatted;
          resultEl.classList.remove("error");
          addToHistory(expr, formatted);
        } catch (e) {
          resultEl.textContent = e.message || "计算错误";
          resultEl.classList.add("error");
        }
      };

      window.loadHistory = function () {
        try {
          return JSON.parse(localStorage.getItem(LS_HISTORY_KEY)) || [];
        } catch (e) {
          return [];
        }
      };
      function saveHistory(h) {
        localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(h));
      }
      function addToHistory(expr, result) {
        let h = loadHistory().filter((i) => i.expr !== expr);
        h.unshift({ expr, result });
        if (h.length > 20) h = h.slice(0, 20);
        saveHistory(h);
        renderHistory();
      }
      function renderHistory() {
        const h = loadHistory();
        if (!h.length) {
          historySection.style.display = "none";
          return;
        }
        historySection.style.display = "block";
        historyList.innerHTML = "";
        h.forEach(function (item) {
          const div = document.createElement("div");
          div.className = "history-item";
          const exprSpan = document.createElement("span");
          exprSpan.className = "expr";
          exprSpan.textContent = item.expr;
          const resultSpan = document.createElement("span");
          resultSpan.className = "result";
          resultSpan.textContent = "= " + item.result;
          div.appendChild(exprSpan);
          div.appendChild(resultSpan);
          div.addEventListener("click", function () {
            expressionEl.value = item.expr;
            calculate();
          });
          historyList.appendChild(div);
        });
      }

      document.getElementById("btnCalc").addEventListener("click", calculate);
      expressionEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") calculate();
      });
      document.getElementById("btnCopy").addEventListener("click", async function () {
        const r = resultEl.textContent;
        if (r !== "-" && !resultEl.classList.contains("error")) {
          try {
            await navigator.clipboard.writeText(r);
          } catch (e) {}
        }
      });
      document.getElementById("btnClear").addEventListener("click", function () {
        expressionEl.value = "";
        resultEl.textContent = "-";
        resultEl.classList.remove("error");
        expressionEl.focus();
      });
      document.getElementById("btnClearHistory").addEventListener("click", function () {
        localStorage.removeItem(LS_HISTORY_KEY);
        renderHistory();
      });

      renderFunctionGrid();
      renderHistory();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "dark" ? "" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next || "light");
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = "🌙";
        }
      })();
    
