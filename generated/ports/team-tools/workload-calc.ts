// @ts-nocheck
// Generated from tools/team-tools/workload-calc.html
// Source SHA-256: 8c0ac7b6747a4e05980d3137699a98c74e8e6a1565596346df909ae4fcf27b87
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "workload-calc-data";
      var method = "storyPoints";
      var tasks = [];
      var fibonacciPoints = [1, 2, 3, 5, 8, 13, 21];
      var tshirtSizes = { XS: 1, S: 2, M: 5, L: 8, XL: 13, XXL: 21 };

      function init() {
        var savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }

        loadFromUrl() || loadFromStorage();

        if (tasks.length === 0) {
          addTask();
        }

        renderTasks();
        calculate();
      }

      function generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
      }

      function setMethod(newMethod, btn) {
        method = newMethod;
        document.querySelectorAll(".method-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");

        var labels = {
          storyPoints: { header: "故事点数", unit: "SP", total: "总故事点" },
          hours: { header: "预计工时", unit: "小时", total: "总工时" },
          tshirt: { header: "T恤尺码", unit: "SP", total: "总故事点" },
          threePoint: { header: "乐观/可能/悲观", unit: "小时", total: "总工时" }
        };

        document.getElementById("estimateHeader").textContent = labels[method].header;
        document.getElementById("velocityUnit").textContent = labels[method].unit;
        document.getElementById("totalLabel").textContent = labels[method].total;

        renderTasks();
        calculate();
        saveToStorage();
      }

      function addTask(name, estimate, complexity, owner) {
        tasks.push({
          id: generateId(),
          name: name || "",
          estimate: estimate || (method === "threePoint" ? { o: 0, m: 0, p: 0 } : 0),
          complexity: complexity || "medium",
          owner: owner || ""
        });
        renderTasks();
        saveToStorage();
      }

      function removeTask(id) {
        tasks = tasks.filter(function (t) {
          return t.id !== id;
        });
        renderTasks();
        calculate();
        saveToStorage();
      }

      function createStoryPointsSelector(task) {
        var container = document.createElement("div");
        container.className = "story-points";

        fibonacciPoints.forEach(function (point) {
          var btn = document.createElement("button");
          btn.className = "point-btn" + (task.estimate === point ? " selected" : "");
          btn.textContent = point;
          btn.onclick = function () {
            task.estimate = point;
            renderTasks();
            calculate();
            saveToStorage();
          };
          container.appendChild(btn);
        });

        return container;
      }

      function createTshirtSelector(task) {
        var select = document.createElement("select");
        Object.keys(tshirtSizes).forEach(function (size) {
          var option = document.createElement("option");
          option.value = size;
          option.textContent = size;
          if (task.estimate === size) option.selected = true;
          select.appendChild(option);
        });
        select.onchange = function () {
          task.estimate = select.value;
          calculate();
          saveToStorage();
        };
        return select;
      }

      function createThreePointInputs(task) {
        var container = document.createElement("div");
        container.style.display = "flex";
        container.style.gap = "5px";

        var fields = [
          { key: "o", placeholder: "乐观" },
          { key: "m", placeholder: "可能" },
          { key: "p", placeholder: "悲观" }
        ];

        if (typeof task.estimate !== "object") {
          task.estimate = { o: 0, m: 0, p: 0 };
        }

        fields.forEach(function (field) {
          var input = document.createElement("input");
          input.type = "number";
          input.placeholder = field.placeholder;
          input.value = task.estimate[field.key] || "";
          input.style.width = "60px";
          input.min = "0";
          input.onchange = function () {
            task.estimate[field.key] = parseFloat(input.value) || 0;
            calculate();
            saveToStorage();
          };
          container.appendChild(input);
        });

        return container;
      }

      function createHoursInput(task) {
        var input = document.createElement("input");
        input.type = "number";
        input.placeholder = "工时";
        input.value = task.estimate || "";
        input.min = "0";
        input.step = "0.5";
        input.onchange = function () {
          task.estimate = parseFloat(input.value) || 0;
          calculate();
          saveToStorage();
        };
        return input;
      }

      function createComplexitySelect(task) {
        var select = document.createElement("select");
        var options = [
          { value: "low", label: "低" },
          { value: "medium", label: "中" },
          { value: "high", label: "高" }
        ];
        options.forEach(function (opt) {
          var option = document.createElement("option");
          option.value = opt.value;
          option.textContent = opt.label;
          if (task.complexity === opt.value) option.selected = true;
          select.appendChild(option);
        });
        select.onchange = function () {
          task.complexity = select.value;
          calculate();
          saveToStorage();
        };
        return select;
      }

      function renderTasks() {
        var container = document.getElementById("taskList");
        container.textContent = "";

        tasks.forEach(function (task) {
          var div = document.createElement("div");
          div.className = "task-item";

          var nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.placeholder = "任务名称";
          nameInput.value = task.name;
          nameInput.onchange = function () {
            task.name = nameInput.value;
            saveToStorage();
          };

          var estimateContainer;
          switch (method) {
            case "storyPoints":
              estimateContainer = createStoryPointsSelector(task);
              break;
            case "tshirt":
              estimateContainer = createTshirtSelector(task);
              break;
            case "threePoint":
              estimateContainer = createThreePointInputs(task);
              break;
            default:
              estimateContainer = createHoursInput(task);
          }

          var complexitySelect = createComplexitySelect(task);

          var ownerInput = document.createElement("input");
          ownerInput.type = "text";
          ownerInput.placeholder = "负责人";
          ownerInput.value = task.owner;
          ownerInput.onchange = function () {
            task.owner = ownerInput.value;
            saveToStorage();
          };

          var deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.onclick = function () {
            removeTask(task.id);
          };

          div.appendChild(nameInput);
          div.appendChild(estimateContainer);
          div.appendChild(complexitySelect);
          div.appendChild(ownerInput);
          div.appendChild(deleteBtn);
          container.appendChild(div);
        });
      }

      function getTaskEstimate(task) {
        if (method === "tshirt") {
          return tshirtSizes[task.estimate] || 0;
        }
        if (method === "threePoint" && typeof task.estimate === "object") {
          var o = task.estimate.o || 0;
          var m = task.estimate.m || 0;
          var p = task.estimate.p || 0;
          return (o + 4 * m + p) / 6;
        }
        return parseFloat(task.estimate) || 0;
      }

      function calculate() {
        var velocity = parseFloat(document.getElementById("velocity").value) || 30;
        var sprintLength = parseFloat(document.getElementById("sprintLength").value) || 14;
        var teamSize = parseInt(document.getElementById("teamSize").value) || 5;

        var totalEstimate = 0;
        var complexityCounts = { low: 0, medium: 0, high: 0 };
        var complexityEstimates = { low: 0, medium: 0, high: 0 };

        tasks.forEach(function (task) {
          var estimate = getTaskEstimate(task);
          totalEstimate += estimate;
          complexityCounts[task.complexity]++;
          complexityEstimates[task.complexity] += estimate;
        });

        var sprintsNeeded = Math.ceil(totalEstimate / velocity);
        var estimatedDays = sprintsNeeded * sprintLength;
        var avgPerPerson = tasks.length > 0 ? (totalEstimate / teamSize).toFixed(1) : 0;

        document.getElementById("totalEstimate").textContent = totalEstimate.toFixed(1);
        document.getElementById("sprintsNeeded").textContent = sprintsNeeded;
        document.getElementById("estimatedDays").textContent = estimatedDays;
        document.getElementById("avgPerPerson").textContent = avgPerPerson;

        renderSummary(complexityCounts, complexityEstimates, totalEstimate);
        renderRiskAnalysis(complexityCounts, totalEstimate, sprintsNeeded);
        saveToStorage();
      }

      function renderSummary(counts, estimates, total) {
        var tbody = document.getElementById("summaryBody");
        tbody.textContent = "";

        var complexityLabels = {
          low: { label: "低复杂度", class: "complexity-low" },
          medium: { label: "中复杂度", class: "complexity-medium" },
          high: { label: "高复杂度", class: "complexity-high" }
        };

        Object.keys(complexityLabels).forEach(function (key) {
          var tr = document.createElement("tr");

          var td1 = document.createElement("td");
          var badge = document.createElement("span");
          badge.className = "complexity-badge " + complexityLabels[key].class;
          badge.textContent = complexityLabels[key].label;
          td1.appendChild(badge);

          var td2 = document.createElement("td");
          td2.textContent = counts[key];

          var td3 = document.createElement("td");
          td3.textContent = estimates[key].toFixed(1);

          var td4 = document.createElement("td");
          var percent = total > 0 ? ((estimates[key] / total) * 100).toFixed(1) : 0;
          var progressDiv = document.createElement("div");
          progressDiv.style.display = "flex";
          progressDiv.style.alignItems = "center";
          progressDiv.style.gap = "10px";

          var bar = document.createElement("div");
          bar.className = "progress-bar";
          bar.style.flex = "1";
          var fill = document.createElement("div");
          fill.className = "progress-fill";
          fill.style.width = percent + "%";
          bar.appendChild(fill);

          var percentText = document.createElement("span");
          percentText.textContent = percent + "%";
          percentText.style.fontSize = "12px";
          percentText.style.minWidth = "45px";

          progressDiv.appendChild(bar);
          progressDiv.appendChild(percentText);
          td4.appendChild(progressDiv);

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tbody.appendChild(tr);
        });
      }

      function renderRiskAnalysis(counts, total, sprints) {
        var container = document.getElementById("riskAnalysis");
        container.textContent = "";

        var risks = [];

        var highRatio = total > 0 ? counts.high / tasks.length : 0;
        if (highRatio > 0.3) {
          risks.push({
            level: "high",
            message:
              "⚠️ 高复杂度任务占比 " + (highRatio * 100).toFixed(0) + "%，建议拆分或增加缓冲时间"
          });
        }

        if (sprints > 3) {
          risks.push({
            level: "medium",
            message: "📅 项目周期较长 (" + sprints + " 个冲刺)，建议分阶段交付"
          });
        }

        var unassigned = tasks.filter(function (t) {
          return !t.owner;
        }).length;
        if (unassigned > 0) {
          risks.push({
            level: "low",
            message: "👤 有 " + unassigned + " 个任务未分配负责人"
          });
        }

        if (method === "threePoint") {
          var variance = 0;
          tasks.forEach(function (task) {
            if (typeof task.estimate === "object") {
              var diff = (task.estimate.p || 0) - (task.estimate.o || 0);
              variance += diff * diff;
            }
          });
          if (variance > 100) {
            risks.push({
              level: "medium",
              message: "📊 估算不确定性较高，建议进一步细化需求"
            });
          }
        }

        if (risks.length === 0) {
          risks.push({
            level: "success",
            message: "✅ 当前评估风险较低"
          });
        }

        risks.forEach(function (risk) {
          var div = document.createElement("div");
          div.style.padding = "12px";
          div.style.borderRadius = "8px";
          div.style.marginBottom = "10px";
          div.style.fontSize = "14px";

          var colors = {
            high: "rgba(248, 113, 113, 0.1)",
            medium: "rgba(251, 191, 36, 0.1)",
            low: "rgba(0, 217, 255, 0.1)",
            success: "rgba(74, 222, 128, 0.1)"
          };
          div.style.background = colors[risk.level];
          div.textContent = risk.message;
          container.appendChild(div);
        });
      }

      function importTasks() {
        var input = prompt("请输入任务列表 (每行一个任务名称):");
        if (input) {
          var lines = input.split("\n").filter(function (l) {
            return l.trim();
          });
          lines.forEach(function (line) {
            addTask(line.trim());
          });
        }
      }

      function clearTasks() {
        if (confirm("确定要清空所有任务吗？")) {
          tasks = [];
          addTask();
          calculate();
        }
      }

      function exportCSV() {
        var lines = ["任务名称,估算值,复杂度,负责人"];
        tasks.forEach(function (task) {
          var estimate = getTaskEstimate(task);
          lines.push(
            '"' + task.name + '",' + estimate + "," + task.complexity + ',"' + task.owner + '"'
          );
        });

        var blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "工作量评估.csv";
        a.click();
        URL.revokeObjectURL(url);
      }

      function exportMarkdown() {
        var velocity = document.getElementById("velocity").value;
        var totalEstimate = parseFloat(document.getElementById("totalEstimate").textContent);
        var sprints = document.getElementById("sprintsNeeded").textContent;
        var days = document.getElementById("estimatedDays").textContent;

        var lines = [];
        lines.push("# 工作量评估报告");
        lines.push("");
        lines.push("## 基本信息");
        lines.push("- 评估方法: " + method);
        lines.push("- 团队速度: " + velocity);
        lines.push("- 总工作量: " + totalEstimate);
        lines.push("- 预计冲刺: " + sprints);
        lines.push("- 预计天数: " + days);
        lines.push("");
        lines.push("## 任务列表");
        lines.push("");
        lines.push("| 任务 | 估算 | 复杂度 | 负责人 |");
        lines.push("|------|------|--------|--------|");

        tasks.forEach(function (task) {
          var estimate = getTaskEstimate(task);
          lines.push(
            "| " +
              (task.name || "-") +
              " | " +
              estimate +
              " | " +
              task.complexity +
              " | " +
              (task.owner || "-") +
              " |"
          );
        });

        var content = lines.join("\n");
        var blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "工作量评估.md";
        a.click();
        URL.revokeObjectURL(url);
      }

      function shareLink() {
        var data = {
          method: method,
          velocity: document.getElementById("velocity").value,
          sprintLength: document.getElementById("sprintLength").value,
          teamSize: document.getElementById("teamSize").value,
          tasks: tasks
        };

        try {
          var encoded = btoa(encodeURIComponent(JSON.stringify(data)));
          var url = location.origin + location.pathname + "#" + encoded;
          navigator.clipboard.writeText(url);
          showToast("分享链接已复制");
        } catch (e) {
          showToast("生成链接失败");
        }
      }

      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          method = data.method || "storyPoints";
          document.getElementById("velocity").value = data.velocity || 30;
          document.getElementById("sprintLength").value = data.sprintLength || 14;
          document.getElementById("teamSize").value = data.teamSize || 5;
          if (data.tasks) tasks = data.tasks;

          document.querySelectorAll(".method-btn").forEach(function (btn) {
            btn.classList.remove("active");
          });
          document.querySelectorAll(".method-btn").forEach(function (btn) {
            if (
              (method === "storyPoints" && btn.textContent.indexOf("故事点") !== -1) ||
              (method === "hours" && btn.textContent.indexOf("工时") !== -1) ||
              (method === "tshirt" && btn.textContent.indexOf("T恤") !== -1) ||
              (method === "threePoint" && btn.textContent.indexOf("三点") !== -1)
            ) {
              btn.classList.add("active");
            }
          });

          return true;
        } catch (e) {
          return false;
        }
      }

      function saveToStorage() {
        var data = {
          method: method,
          velocity: document.getElementById("velocity").value,
          sprintLength: document.getElementById("sprintLength").value,
          teamSize: document.getElementById("teamSize").value,
          tasks: tasks
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            method = data.method || "storyPoints";
            document.getElementById("velocity").value = data.velocity || 30;
            document.getElementById("sprintLength").value = data.sprintLength || 14;
            document.getElementById("teamSize").value = data.teamSize || 5;
            if (data.tasks) tasks = data.tasks;

            document.querySelectorAll(".method-btn").forEach(function (btn) {
              btn.classList.remove("active");
            });
            document.querySelectorAll(".method-btn").forEach(function (btn) {
              if (
                (method === "storyPoints" && btn.textContent.indexOf("故事点") !== -1) ||
                (method === "hours" && btn.textContent.indexOf("工时") !== -1) ||
                (method === "tshirt" && btn.textContent.indexOf("T恤") !== -1) ||
                (method === "threePoint" && btn.textContent.indexOf("三点") !== -1)
              ) {
                btn.classList.add("active");
              }
            });
          } catch (e) {
            console.error("Failed to load from storage");
          }
        }
      }

      function showToast(message) {
        var toast = document.createElement("div");
        toast.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--accent-color);color:#000;padding:12px 24px;border-radius:8px;z-index:1000;font-size:14px;";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(function () {
          toast.remove();
        }, 2000);
      }

      window.toggleTheme = function () {
        var body = document.body;
        var currentTheme = body.getAttribute("data-theme");
        var newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      init();
    
