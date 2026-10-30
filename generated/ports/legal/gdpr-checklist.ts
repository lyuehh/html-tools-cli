// @ts-nocheck
// Generated from tools/legal/gdpr-checklist.html
// Source SHA-256: 7e335e3cb0159f251ee8249290d1a7dfc7efd94bf2463e3e1efec94f64cb8362
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "gdpr_checklist_v1";

      var checklistData = [
        {
          id: "lawful-basis",
          title: "合法性基础",
          icon: "⚖️",
          items: [
            {
              id: "lb1",
              label: "识别并记录每种处理活动的合法性基础",
              desc: "确保每项数据处理都有明确的法律依据（同意、合同、法律义务等）"
            },
            {
              id: "lb2",
              label: "同意机制清晰、具体、可撤回",
              desc: "用户同意必须是自由给予、具体、知情和明确的"
            },
            { id: "lb3", label: "记录所有同意的获取和撤回", desc: "保留同意记录作为合规证据" },
            { id: "lb4", label: "定期审查处理活动的合法性基础", desc: "确保法律基础持续有效" }
          ]
        },
        {
          id: "data-subject-rights",
          title: "数据主体权利",
          icon: "👤",
          items: [
            {
              id: "dsr1",
              label: "建立响应数据主体请求的流程",
              desc: "能够在一个月内响应访问、删除、更正等请求"
            },
            {
              id: "dsr2",
              label: "支持数据可携带权",
              desc: "能够以结构化、机器可读的格式导出用户数据"
            },
            { id: "dsr3", label: "实施被遗忘权（删除权）", desc: "有能力完全删除用户数据" },
            { id: "dsr4", label: "提供限制处理的机制", desc: "允许用户限制其数据的处理方式" },
            {
              id: "dsr5",
              label: "支持反对权，特别是直接营销",
              desc: "用户可以反对其数据用于营销目的"
            }
          ]
        },
        {
          id: "transparency",
          title: "透明度与通知",
          icon: "📋",
          items: [
            { id: "tr1", label: "发布清晰、易懂的隐私政策", desc: "使用简明语言解释数据处理实践" },
            { id: "tr2", label: "在收集时提供隐私通知", desc: "告知用户数据收集的目的和使用方式" },
            { id: "tr3", label: "说明数据保留期限", desc: "明确告知数据保存多长时间" },
            { id: "tr4", label: "披露第三方数据共享", desc: "列出所有接收数据的第三方" },
            {
              id: "tr5",
              label: "提供数据保护官（DPO）联系方式",
              desc: "如适用，公开 DPO 的联系信息"
            }
          ]
        },
        {
          id: "data-protection",
          title: "数据保护措施",
          icon: "🔒",
          items: [
            {
              id: "dp1",
              label: "实施数据加密（传输中和静态）",
              desc: "使用 HTTPS、数据库加密等技术"
            },
            { id: "dp2", label: "实施访问控制和身份验证", desc: "限制对个人数据的访问" },
            { id: "dp3", label: "进行定期安全评估", desc: "漏洞扫描、渗透测试等" },
            { id: "dp4", label: "实施数据最小化原则", desc: "仅收集和保留必要的数据" },
            { id: "dp5", label: "实施假名化或匿名化", desc: "在可能的情况下降低数据识别性" }
          ]
        },
        {
          id: "breach-management",
          title: "数据泄露管理",
          icon: "🚨",
          items: [
            { id: "bm1", label: "建立数据泄露检测机制", desc: "能够及时发现安全事件" },
            { id: "bm2", label: "制定数据泄露响应计划", desc: "明确泄露发生时的处理流程" },
            { id: "bm3", label: "能够在72小时内通知监管机构", desc: "GDPR 要求的强制通知时限" },
            { id: "bm4", label: "建立受影响个人通知流程", desc: "高风险泄露需通知数据主体" },
            { id: "bm5", label: "记录所有数据泄露事件", desc: "维护泄露事件日志" }
          ]
        },
        {
          id: "accountability",
          title: "问责制",
          icon: "📊",
          items: [
            { id: "ac1", label: "维护处理活动记录 (ROPA)", desc: "记录所有数据处理活动的详细信息" },
            { id: "ac2", label: "进行数据保护影响评估 (DPIA)", desc: "对高风险处理进行影响评估" },
            { id: "ac3", label: "任命数据保护官（如需要）", desc: "大规模处理敏感数据时必须任命" },
            { id: "ac4", label: "实施隐私设计和默认隐私", desc: "在产品设计阶段就考虑隐私保护" },
            { id: "ac5", label: "对员工进行数据保护培训", desc: "确保员工了解 GDPR 要求" }
          ]
        },
        {
          id: "third-party",
          title: "第三方管理",
          icon: "🤝",
          items: [
            { id: "tp1", label: "与数据处理者签订合同", desc: "确保合同包含 GDPR 要求的条款" },
            { id: "tp2", label: "评估第三方的合规状况", desc: "尽职调查供应商的数据保护实践" },
            { id: "tp3", label: "监控第三方数据处理", desc: "定期审查第三方的合规性" },
            { id: "tp4", label: "跨境数据传输有适当保障", desc: "使用标准合同条款或其他机制" }
          ]
        },
        {
          id: "special-categories",
          title: "特殊类别数据",
          icon: "⚠️",
          items: [
            {
              id: "sc1",
              label: "识别所有特殊类别数据处理",
              desc: "健康、生物特征、宗教信仰等敏感数据"
            },
            {
              id: "sc2",
              label: "有处理特殊类别数据的额外法律基础",
              desc: "需要满足第9条的额外条件"
            },
            { id: "sc3", label: "对特殊类别数据实施增强保护", desc: "更严格的访问控制和安全措施" }
          ]
        }
      ];

      var checkedItems = {};

      function init() {
        loadFromStorage();
        renderChecklist();
        updateProgress();
      }

      function renderChecklist() {
        var container = document.getElementById("checklistContainer");
        container.textContent = "";

        checklistData.forEach(function (category) {
          var categoryDiv = document.createElement("div");
          categoryDiv.className = "category";

          var header = document.createElement("div");
          header.className = "category-header";

          var title = document.createElement("span");
          title.className = "category-title";
          title.textContent = category.icon + " " + category.title;

          var progress = document.createElement("span");
          progress.className = "category-progress";
          progress.id = "progress-" + category.id;

          header.appendChild(title);
          header.appendChild(progress);

          var itemsDiv = document.createElement("div");
          itemsDiv.className = "category-items";

          category.items.forEach(function (item) {
            var itemDiv = document.createElement("div");
            itemDiv.className = "checklist-item";

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = item.id;
            checkbox.checked = !!checkedItems[item.id];
            checkbox.addEventListener("change", function () {
              checkedItems[item.id] = checkbox.checked;
              saveToStorage();
              updateProgress();
            });

            var content = document.createElement("div");
            content.className = "checklist-content";

            var label = document.createElement("label");
            label.className = "checklist-label";
            label.htmlFor = item.id;
            label.textContent = item.label;

            var desc = document.createElement("div");
            desc.className = "checklist-desc";
            desc.textContent = item.desc;

            content.appendChild(label);
            content.appendChild(desc);

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(content);
            itemsDiv.appendChild(itemDiv);
          });

          categoryDiv.appendChild(header);
          categoryDiv.appendChild(itemsDiv);
          container.appendChild(categoryDiv);
        });
      }

      function updateProgress() {
        var total = 0;
        var completed = 0;
        var uncheckedItems = [];

        checklistData.forEach(function (category) {
          var categoryTotal = category.items.length;
          var categoryCompleted = 0;

          category.items.forEach(function (item) {
            total++;
            if (checkedItems[item.id]) {
              completed++;
              categoryCompleted++;
            } else {
              uncheckedItems.push(item);
            }
          });

          var progressEl = document.getElementById("progress-" + category.id);
          if (progressEl) {
            progressEl.textContent = categoryCompleted + " / " + categoryTotal;
          }
        });

        var percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        document.getElementById("progressStats").textContent =
          completed + " / " + total + " 已完成";
        document.getElementById("progressFill").style.width = percentage + "%";

        var scoreEl = document.getElementById("scoreValue");
        scoreEl.textContent = percentage + "%";
        scoreEl.className = "score-value";
        if (percentage >= 80) {
          scoreEl.classList.add("good");
        } else if (percentage >= 50) {
          scoreEl.classList.add("warning");
        } else {
          scoreEl.classList.add("danger");
        }

        // Update recommendations
        var recommendationsEl = document.getElementById("recommendations");
        var listEl = document.getElementById("recommendationsList");

        if (uncheckedItems.length > 0 && uncheckedItems.length <= 10) {
          recommendationsEl.style.display = "block";
          listEl.textContent = "";

          uncheckedItems.slice(0, 5).forEach(function (item) {
            var div = document.createElement("div");
            div.className = "recommendation-item";
            div.textContent = item.label;
            listEl.appendChild(div);
          });

          if (uncheckedItems.length > 5) {
            var more = document.createElement("div");
            more.className = "recommendation-item";
            more.textContent = "还有 " + (uncheckedItems.length - 5) + " 项需要完成...";
            listEl.appendChild(more);
          }
        } else {
          recommendationsEl.style.display = "none";
        }
      }

      function saveToStorage() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(checkedItems));
        } catch (e) {}
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            checkedItems = JSON.parse(saved);
          }
        } catch (e) {
          checkedItems = {};
        }
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function exportReport() {
        var total = 0;
        var completed = 0;
        var lines = [];

        lines.push("GDPR 合规检查报告");
        lines.push("生成日期：" + new Date().toLocaleString("zh-CN"));
        lines.push("");
        lines.push("═══════════════════════════════════════════════════════════════");
        lines.push("");

        checklistData.forEach(function (category) {
          var categoryCompleted = 0;
          var categoryTotal = category.items.length;

          lines.push(category.icon + " " + category.title);
          lines.push("─".repeat(40));

          category.items.forEach(function (item) {
            total++;
            var isChecked = !!checkedItems[item.id];
            if (isChecked) {
              completed++;
              categoryCompleted++;
            }
            lines.push((isChecked ? "[✓]" : "[ ]") + " " + item.label);
          });

          lines.push("进度: " + categoryCompleted + "/" + categoryTotal);
          lines.push("");
        });

        var percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        lines.push("═══════════════════════════════════════════════════════════════");
        lines.push("");
        lines.push("总体合规评分: " + percentage + "%");
        lines.push("已完成: " + completed + " / " + total + " 项");
        lines.push("");

        if (percentage >= 80) {
          lines.push("评估结果: 良好");
          lines.push("您的组织在 GDPR 合规方面表现良好，请继续保持并定期审查。");
        } else if (percentage >= 50) {
          lines.push("评估结果: 需要改进");
          lines.push("您的组织需要在多个方面加强 GDPR 合规工作。");
        } else {
          lines.push("评估结果: 高风险");
          lines.push("您的组织存在重大合规缺口，建议立即采取行动。");
        }

        lines.push("");
        lines.push("免责声明: 本检查清单仅供参考，不构成法律建议。");
        lines.push("如需专业法律意见，请咨询数据保护律师或顾问。");

        var content = lines.join("\n");
        var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "GDPR合规报告_" + new Date().toISOString().split("T")[0] + ".txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showStatus("报告已导出", "success");
      }

      function resetChecklist() {
        if (confirm("确定要重置所有检查项吗？")) {
          checkedItems = {};
          localStorage.removeItem(LS_KEY);
          renderChecklist();
          updateProgress();
          showStatus("已重置", "success");
        }
      }

      function toggleTheme() {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }

      (function () {
        var savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
        }
        init();
      })();
    
