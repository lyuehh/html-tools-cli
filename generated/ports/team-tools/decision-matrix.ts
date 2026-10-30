// @ts-nocheck
// Generated from tools/team-tools/decision-matrix.html
// Source SHA-256: 3683a0025ff6d6c598021cefd2a272b7c4844b3ed2b4189c397df2eaacfc698c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "decision-matrix-data";

      let criteria = [];
      let options = [];
      let scores = {};

      function init() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }

        loadFromStorage();
        loadFromUrl();

        if (criteria.length === 0) {
          criteria = [
            { id: 1, name: "成本", weight: 8 },
            { id: 2, name: "效果", weight: 9 },
            { id: 3, name: "风险", weight: 7 }
          ];
        }
        if (options.length === 0) {
          options = [
            { id: 1, name: "方案 A" },
            { id: 2, name: "方案 B" }
          ];
        }

        renderCriteria();
        renderOptions();
        renderMatrix();

        document.getElementById("decisionTitle").addEventListener("input", saveToStorage);
      }

      function generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
      }

      function addCriteria(name = "", weight = 5) {
        criteria.push({ id: generateId(), name: name, weight: weight });
        renderCriteria();
        renderMatrix();
        saveToStorage();
      }

      function removeCriteria(id) {
        criteria = criteria.filter((c) => c.id !== id);
        renderCriteria();
        renderMatrix();
        saveToStorage();
      }

      function renderCriteria() {
        const container = document.getElementById("criteriaList");
        container.textContent = "";

        criteria.forEach((c) => {
          const div = document.createElement("div");
          div.className = "criteria-item";

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.placeholder = "评估标准";
          nameInput.value = c.name;
          nameInput.addEventListener("input", (e) => {
            c.name = e.target.value;
            renderMatrix();
            saveToStorage();
          });

          const weightInput = document.createElement("input");
          weightInput.type = "number";
          weightInput.className = "weight-input";
          weightInput.min = "1";
          weightInput.max = "10";
          weightInput.placeholder = "权重";
          weightInput.value = c.weight;
          weightInput.addEventListener("input", (e) => {
            c.weight = parseInt(e.target.value) || 1;
            renderMatrix();
            calculateResults();
            saveToStorage();
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => removeCriteria(c.id));

          div.appendChild(nameInput);
          div.appendChild(weightInput);
          div.appendChild(deleteBtn);

          container.appendChild(div);
        });
      }

      function addOption(name = "") {
        options.push({ id: generateId(), name: name });
        renderOptions();
        renderMatrix();
        saveToStorage();
      }

      function removeOption(id) {
        options = options.filter((o) => o.id !== id);
        renderOptions();
        renderMatrix();
        saveToStorage();
      }

      function renderOptions() {
        const container = document.getElementById("optionList");
        container.textContent = "";

        options.forEach((o) => {
          const div = document.createElement("div");
          div.className = "option-item";

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.placeholder = "方案名称";
          nameInput.value = o.name;
          nameInput.addEventListener("input", (e) => {
            o.name = e.target.value;
            renderMatrix();
            saveToStorage();
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => removeOption(o.id));

          div.appendChild(nameInput);
          div.appendChild(deleteBtn);

          container.appendChild(div);
        });
      }

      function renderMatrix() {
        const table = document.getElementById("matrixTable");
        table.textContent = "";

        if (criteria.length === 0 || options.length === 0) {
          const row = document.createElement("tr");
          const cell = document.createElement("td");
          cell.textContent = "请先添加评估标准和可选方案";
          cell.style.padding = "20px";
          cell.style.opacity = "0.5";
          row.appendChild(cell);
          table.appendChild(row);
          return;
        }

        // Header row
        const headerRow = document.createElement("tr");
        const emptyHeader = document.createElement("th");
        emptyHeader.textContent = "方案 / 标准";
        headerRow.appendChild(emptyHeader);

        criteria.forEach((c) => {
          const th = document.createElement("th");
          th.className = "criteria-header";
          const nameSpan = document.createElement("div");
          nameSpan.textContent = c.name || "(未命名)";
          const weightSpan = document.createElement("span");
          weightSpan.textContent = "权重: " + c.weight;
          th.appendChild(nameSpan);
          th.appendChild(weightSpan);
          headerRow.appendChild(th);
        });

        const totalHeader = document.createElement("th");
        totalHeader.textContent = "加权总分";
        headerRow.appendChild(totalHeader);

        table.appendChild(headerRow);

        // Calculate totals for each option
        const totals = [];
        options.forEach((o) => {
          let total = 0;
          criteria.forEach((c) => {
            const key = o.id + "-" + c.id;
            const score = scores[key] || 0;
            total += score * c.weight;
          });
          totals.push({ optionId: o.id, total: total });
        });

        const maxTotal = Math.max(...totals.map((t) => t.total));

        // Option rows
        options.forEach((o) => {
          const row = document.createElement("tr");
          const optionTotal = totals.find((t) => t.optionId === o.id);

          if (optionTotal && optionTotal.total === maxTotal && maxTotal > 0) {
            row.className = "winner";
          }

          const nameCell = document.createElement("td");
          nameCell.className = "option-name";
          nameCell.textContent = o.name || "(未命名)";
          row.appendChild(nameCell);

          criteria.forEach((c) => {
            const cell = document.createElement("td");
            cell.className = "score-cell";

            const input = document.createElement("input");
            input.type = "number";
            input.className = "score-input";
            input.min = "1";
            input.max = "10";
            const key = o.id + "-" + c.id;
            input.value = scores[key] || "";
            input.addEventListener("input", (e) => {
              const val = parseInt(e.target.value);
              if (val >= 1 && val <= 10) {
                scores[key] = val;
              } else if (!e.target.value) {
                delete scores[key];
              }
              renderMatrix();
              calculateResults();
              saveToStorage();
            });

            cell.appendChild(input);
            row.appendChild(cell);
          });

          const totalCell = document.createElement("td");
          totalCell.className = "total-cell";
          totalCell.textContent = optionTotal ? optionTotal.total.toFixed(1) : "0";
          row.appendChild(totalCell);

          table.appendChild(row);
        });

        calculateResults();
      }

      function calculateResults() {
        const results = options.map((o) => {
          let total = 0;
          let hasScores = false;
          criteria.forEach((c) => {
            const key = o.id + "-" + c.id;
            if (scores[key]) {
              total += scores[key] * c.weight;
              hasScores = true;
            }
          });
          return { option: o, total: total, hasScores: hasScores };
        });

        results.sort((a, b) => b.total - a.total);

        const winnerName = document.getElementById("winnerName");
        const winnerScore = document.getElementById("winnerScore");
        const rankingList = document.getElementById("rankingList");

        if (results.length > 0 && results[0].hasScores) {
          winnerName.textContent = results[0].option.name || "(未命名)";
          winnerScore.textContent = "加权总分: " + results[0].total.toFixed(1);
        } else {
          winnerName.textContent = "-";
          winnerScore.textContent = "请完成评分";
        }

        rankingList.textContent = "";
        results.forEach((r, index) => {
          const div = document.createElement("div");
          div.className = "ranking-item" + (index === 0 ? " rank-1" : "");

          const left = document.createElement("div");
          left.style.cssText = "display:flex;align-items:center;gap:12px;";

          const rankNum = document.createElement("div");
          rankNum.className = "rank-number";
          rankNum.textContent = index + 1;

          const name = document.createElement("span");
          name.textContent = r.option.name || "(未命名)";

          left.appendChild(rankNum);
          left.appendChild(name);

          const score = document.createElement("span");
          score.textContent = r.total.toFixed(1);
          score.style.fontWeight = "bold";

          div.appendChild(left);
          div.appendChild(score);

          rankingList.appendChild(div);
        });
      }

      function exportResult() {
        const title = document.getElementById("decisionTitle").value || "决策分析";
        let text = "═══════════════════════════════════════\n";
        text += "        决策矩阵分析结果\n";
        text += "═══════════════════════════════════════\n\n";
        text += "决策问题: " + title + "\n\n";

        text += "评估标准:\n";
        criteria.forEach((c) => {
          text += "• " + (c.name || "(未命名)") + " (权重: " + c.weight + ")\n";
        });
        text += "\n";

        text += "评分矩阵:\n";
        text += "───────────────────────────────────────\n";

        const results = options.map((o) => {
          let total = 0;
          let scoreDetails = [];
          criteria.forEach((c) => {
            const key = o.id + "-" + c.id;
            const score = scores[key] || 0;
            total += score * c.weight;
            scoreDetails.push((c.name || "标准") + ":" + score);
          });
          return { option: o, total: total, details: scoreDetails };
        });

        results.sort((a, b) => b.total - a.total);

        results.forEach((r, index) => {
          text += index + 1 + ". " + (r.option.name || "(未命名)") + "\n";
          text += "   评分: " + r.details.join(", ") + "\n";
          text += "   加权总分: " + r.total.toFixed(1) + "\n\n";
        });

        text += "───────────────────────────────────────\n";
        text += "推荐选择: " + (results[0]?.option.name || "-") + "\n";
        text += "═══════════════════════════════════════\n";

        navigator.clipboard.writeText(text).then(() => {
          showToast("已复制到剪贴板");
        });
      }

      function shareMatrix() {
        const data = {
          title: document.getElementById("decisionTitle").value,
          criteria: criteria,
          options: options,
          scores: scores
        };
        const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        const url = window.location.href.split("#")[0] + "#" + encoded;
        navigator.clipboard.writeText(url).then(() => {
          showToast("分享链接已复制");
        });
      }

      function loadFromUrl() {
        const hash = window.location.hash.slice(1);
        if (hash) {
          try {
            const data = JSON.parse(decodeURIComponent(atob(hash)));
            document.getElementById("decisionTitle").value = data.title || "";
            if (data.criteria) criteria = data.criteria;
            if (data.options) options = data.options;
            if (data.scores) scores = data.scores;
          } catch (e) {
            console.error("Failed to load from URL:", e);
          }
        }
      }

      function saveToStorage() {
        const data = {
          title: document.getElementById("decisionTitle").value,
          criteria: criteria,
          options: options,
          scores: scores
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            document.getElementById("decisionTitle").value = data.title || "";
            if (data.criteria) criteria = data.criteria;
            if (data.options) options = data.options;
            if (data.scores) scores = data.scores;
          } catch (e) {
            console.error("Failed to load from storage:", e);
          }
        }
      }

      function clearAll() {
        if (confirm("确定要清空所有内容吗？")) {
          document.getElementById("decisionTitle").value = "";
          criteria = [
            { id: generateId(), name: "成本", weight: 8 },
            { id: generateId(), name: "效果", weight: 9 },
            { id: generateId(), name: "风险", weight: 7 }
          ];
          options = [
            { id: generateId(), name: "方案 A" },
            { id: generateId(), name: "方案 B" }
          ];
          scores = {};
          renderCriteria();
          renderOptions();
          renderMatrix();
          localStorage.removeItem(LS_KEY);
          window.location.hash = "";
        }
      }

      function showToast(message) {
        const toast = document.createElement("div");
        toast.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--accent-color);color:#000;padding:12px 24px;border-radius:8px;z-index:1000;font-size:14px;";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      }

      window.toggleTheme = function () {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      init();
    
