// @ts-nocheck
// Generated from tools/legal/contract-review.html
// Source SHA-256: ce8bec8316982232adbb1c3031b68cdd558291cd81744f89cf28fdac2b15b25e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "contract_review_v1";

      var checkRules = [
        // 风险条款检查
        {
          id: "unlimited_liability",
          type: "danger",
          title: "无限责任条款",
          pattern: /(承担全部责任|无限责任|全部赔偿|不设上限)/,
          message: "发现可能的无限责任条款，建议设定责任上限"
        },
        {
          id: "unilateral_termination",
          type: "warning",
          title: "单方解除权",
          pattern: /(单方(面)?解除|有权随时终止|可单独终止|无需理由终止)/,
          message: "存在单方解除条款，需注意是否对等"
        },
        {
          id: "auto_renewal",
          type: "warning",
          title: "自动续约条款",
          pattern: /(自动续(约|期)|期满后自动延续|默认续约)/,
          message: "包含自动续约条款，注意终止通知期限"
        },
        {
          id: "exclusive_clause",
          type: "warning",
          title: "排他性条款",
          pattern: /(独家|排他|专属|不得与第三方)/,
          message: "存在排他性条款，可能限制业务自由度"
        },
        {
          id: "penalty_clause",
          type: "warning",
          title: "违约金条款",
          pattern: /(违约金|罚款|罚金|惩罚性赔偿)/,
          message: "包含违约金条款，需评估金额是否合理"
        },
        {
          id: "jurisdiction",
          type: "info",
          title: "管辖权条款",
          pattern: /(管辖(权)?|仲裁|人民法院|争议解决)/,
          message: "找到争议解决条款"
        },
        {
          id: "ip_transfer",
          type: "danger",
          title: "知识产权转让",
          pattern: /(知识产权(归|属于|转让)|版权转让|专利转让|著作权归)/,
          message: "涉及知识产权转让，需特别注意权益保护"
        },
        {
          id: "confidentiality",
          type: "info",
          title: "保密条款",
          pattern: /(保密|机密|confidential|不得泄露|不得披露)/i,
          message: "包含保密义务条款"
        },
        {
          id: "non_compete",
          type: "warning",
          title: "竞业禁止",
          pattern: /(竞业禁止|竞业限制|不得从事.*竞争|不得加入.*竞争)/,
          message: "存在竞业禁止条款，注意期限和补偿"
        },
        {
          id: "indemnification",
          type: "warning",
          title: "赔偿条款",
          pattern: /(赔偿|补偿|indemnif)/i,
          message: "包含赔偿/补偿条款"
        },
        {
          id: "force_majeure",
          type: "info",
          title: "不可抗力",
          pattern: /(不可抗力|force majeure|天灾|战争|政府行为)/i,
          message: "包含不可抗力条款"
        },
        {
          id: "warranty",
          type: "info",
          title: "保证/担保",
          pattern: /(保证|担保|warranty|guarantee)/i,
          message: "包含保证或担保条款"
        },
        {
          id: "amendment",
          type: "warning",
          title: "单方修改权",
          pattern: /(有权(修改|变更)|单方(面)?修改|保留.*修改权)/,
          message: "存在单方修改条款，可能带来不确定性"
        },
        {
          id: "data_processing",
          type: "info",
          title: "数据处理",
          pattern: /(个人信息|数据处理|数据保护|隐私)/,
          message: "涉及数据处理相关条款"
        },
        {
          id: "payment_terms",
          type: "info",
          title: "付款条款",
          pattern: /(付款|支付|结算|账期|发票)/,
          message: "包含付款相关条款"
        }
      ];

      var essentialClauses = [
        { id: "parties", name: "合同主体", pattern: /(甲方|乙方|合同双方|签约方)/ },
        { id: "subject", name: "合同标的", pattern: /(服务内容|产品|标的|范围)/ },
        { id: "price", name: "价格/费用", pattern: /(价格|费用|金额|报酬|对价)/ },
        { id: "term", name: "合同期限", pattern: /(期限|有效期|起止时间|生效日)/ },
        { id: "liability", name: "违约责任", pattern: /(违约责任|违约|责任承担)/ },
        { id: "termination", name: "终止条款", pattern: /(终止|解除|退出)/ },
        { id: "dispute", name: "争议解决", pattern: /(争议|纠纷|仲裁|诉讼)/ },
        { id: "signature", name: "签署条款", pattern: /(签字|盖章|签署|生效)/ }
      ];

      function analyzeContract() {
        var text = document.getElementById("contractText").value.trim();

        if (!text) {
          showStatus("请输入合同文本", "error");
          return;
        }

        var findings = [];
        var counts = { danger: 0, warning: 0, info: 0, success: 0 };

        // 检查风险条款
        checkRules.forEach(function (rule) {
          var match = text.match(rule.pattern);
          if (match) {
            counts[rule.type]++;
            var contextStart = Math.max(0, match.index - 30);
            var contextEnd = Math.min(text.length, match.index + match[0].length + 30);
            var context = text.substring(contextStart, contextEnd);
            if (contextStart > 0) context = "..." + context;
            if (contextEnd < text.length) context = context + "...";

            findings.push({
              type: rule.type,
              title: rule.title,
              message: rule.message,
              quote: context
            });
          }
        });

        // 检查必备条款
        var missingClauses = [];
        essentialClauses.forEach(function (clause) {
          if (!clause.pattern.test(text)) {
            missingClauses.push(clause.name);
          }
        });

        if (missingClauses.length > 0) {
          counts.warning += missingClauses.length;
          findings.push({
            type: "warning",
            title: "可能缺失的基本条款",
            message: "以下基本条款可能缺失或未明确：" + missingClauses.join("、"),
            quote: null
          });
        }

        // 文本统计
        var charCount = text.length;
        var clauseMatches = text.match(/第[一二三四五六七八九十百]+条|[0-9]+\./g);
        var clauseCount = clauseMatches ? clauseMatches.length : 0;

        findings.push({
          type: "info",
          title: "合同统计",
          message: "合同全文约 " + charCount + " 字，识别到约 " + clauseCount + " 个条款章节",
          quote: null
        });

        // 如果没有发现风险项
        if (counts.danger === 0 && counts.warning === 0) {
          counts.success = 1;
          findings.unshift({
            type: "success",
            title: "初步检查通过",
            message: "未发现明显的高风险条款，但仍建议进行专业法律审查",
            quote: null
          });
        }

        renderResults(findings, counts);
        saveToStorage();
        showStatus("分析完成，发现 " + findings.length + " 项结果", "success");
      }

      function renderResults(findings, counts) {
        var resultsEl = document.getElementById("results");
        var badgesEl = document.getElementById("summaryBadges");
        var listEl = document.getElementById("findingsList");

        resultsEl.style.display = "block";

        // Render badges
        badgesEl.textContent = "";
        if (counts.danger > 0) {
          var dangerBadge = document.createElement("span");
          dangerBadge.className = "badge danger";
          dangerBadge.textContent = counts.danger + " 高风险";
          badgesEl.appendChild(dangerBadge);
        }
        if (counts.warning > 0) {
          var warningBadge = document.createElement("span");
          warningBadge.className = "badge warning";
          warningBadge.textContent = counts.warning + " 注意";
          badgesEl.appendChild(warningBadge);
        }
        if (counts.info > 0) {
          var infoBadge = document.createElement("span");
          infoBadge.className = "badge info";
          infoBadge.textContent = counts.info + " 信息";
          badgesEl.appendChild(infoBadge);
        }
        if (counts.success > 0) {
          var successBadge = document.createElement("span");
          successBadge.className = "badge success";
          successBadge.textContent = "通过";
          badgesEl.appendChild(successBadge);
        }

        // Render findings
        listEl.textContent = "";

        var icons = {
          danger: "🚨",
          warning: "⚠️",
          info: "ℹ️",
          success: "✅"
        };

        findings.forEach(function (finding) {
          var div = document.createElement("div");
          div.className = "finding " + finding.type;

          var header = document.createElement("div");
          header.className = "finding-header";

          var icon = document.createElement("span");
          icon.className = "finding-icon";
          icon.textContent = icons[finding.type];

          var title = document.createElement("span");
          title.className = "finding-title";
          title.textContent = finding.title;

          header.appendChild(icon);
          header.appendChild(title);

          var content = document.createElement("div");
          content.className = "finding-content";
          content.textContent = finding.message;

          div.appendChild(header);
          div.appendChild(content);

          if (finding.quote) {
            var quote = document.createElement("div");
            quote.className = "finding-quote";
            quote.textContent = finding.quote;
            div.appendChild(quote);
          }

          listEl.appendChild(div);
        });
      }

      function pasteText() {
        navigator.clipboard
          .readText()
          .then(function (text) {
            document.getElementById("contractText").value = text;
            showStatus("已粘贴", "success");
          })
          .catch(function () {
            showStatus("无法访问剪贴板", "error");
          });
      }

      function loadSample() {
        var sample =
          "服务合同\n\n" +
          "甲方：示例科技有限公司\n" +
          "乙方：XX服务商\n\n" +
          "第一条 服务内容\n" +
          "乙方为甲方提供技术咨询服务，具体服务内容详见附件一。\n\n" +
          "第二条 合同期限\n" +
          "本合同有效期为一年，自2024年1月1日至2024年12月31日。合同期满后自动续约一年，除非任何一方在期满前30日书面通知终止。\n\n" +
          "第三条 服务费用\n" +
          "服务费用为人民币10万元整，甲方应在合同签署后7个工作日内支付50%，项目验收后支付剩余50%。\n\n" +
          "第四条 知识产权\n" +
          "乙方在提供服务过程中产生的所有知识产权归甲方所有。\n\n" +
          "第五条 保密条款\n" +
          "双方对在合作过程中获知的对方商业秘密和机密信息负有保密义务，保密期限为合同终止后三年。\n\n" +
          "第六条 违约责任\n" +
          "任何一方违反本合同约定，应承担全部责任，并向守约方支付违约金人民币5万元。\n\n" +
          "第七条 争议解决\n" +
          "因本合同引起的争议，双方应友好协商解决。协商不成的，任何一方均可向甲方所在地人民法院提起诉讼。\n\n" +
          "第八条 其他\n" +
          "甲方有权根据业务需要单方面修改服务要求，乙方应予以配合。\n\n" +
          "甲方（盖章）：\n" +
          "乙方（盖章）：\n" +
          "签署日期：";

        document.getElementById("contractText").value = sample;
        showStatus("已加载示例合同", "success");
      }

      function clearAll() {
        document.getElementById("contractText").value = "";
        document.getElementById("results").style.display = "none";
        localStorage.removeItem(LS_KEY);
        showStatus("已清空", "success");
      }

      function saveToStorage() {
        try {
          localStorage.setItem(LS_KEY, document.getElementById("contractText").value);
        } catch (e) {}
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            document.getElementById("contractText").value = saved;
          }
        } catch (e) {}
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
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
        loadFromStorage();
      })();
    
