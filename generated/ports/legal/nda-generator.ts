// @ts-nocheck
// Generated from tools/legal/nda-generator.html
// Source SHA-256: c28635e189734f81d81f4caaa83bb9ddc36394601cbcaa918ea06a74a9193708
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "nda_generator_form_v1";

      function getFormData() {
        return {
          ndaType: document.getElementById("ndaType").value,
          language: document.getElementById("language").value,
          discloserName: document.getElementById("discloserName").value.trim(),
          discloserAddress: document.getElementById("discloserAddress").value.trim(),
          discloserRep: document.getElementById("discloserRep").value.trim(),
          receiverName: document.getElementById("receiverName").value.trim(),
          receiverAddress: document.getElementById("receiverAddress").value.trim(),
          receiverRep: document.getElementById("receiverRep").value.trim(),
          effectiveDate: document.getElementById("effectiveDate").value,
          duration: document.getElementById("duration").value,
          purpose: document.getElementById("purpose").value.trim(),
          confidentialInfo: document.getElementById("confidentialInfo").value.trim(),
          jurisdiction: document.getElementById("jurisdiction").value,
          penalty: document.getElementById("penalty").value.trim()
        };
      }

      function setFormData(data) {
        if (!data) return;
        if (data.ndaType) document.getElementById("ndaType").value = data.ndaType;
        if (data.language) document.getElementById("language").value = data.language;
        if (data.discloserName) document.getElementById("discloserName").value = data.discloserName;
        if (data.discloserAddress)
          document.getElementById("discloserAddress").value = data.discloserAddress;
        if (data.discloserRep) document.getElementById("discloserRep").value = data.discloserRep;
        if (data.receiverName) document.getElementById("receiverName").value = data.receiverName;
        if (data.receiverAddress)
          document.getElementById("receiverAddress").value = data.receiverAddress;
        if (data.receiverRep) document.getElementById("receiverRep").value = data.receiverRep;
        if (data.effectiveDate) document.getElementById("effectiveDate").value = data.effectiveDate;
        if (data.duration) document.getElementById("duration").value = data.duration;
        if (data.purpose) document.getElementById("purpose").value = data.purpose;
        if (data.confidentialInfo)
          document.getElementById("confidentialInfo").value = data.confidentialInfo;
        if (data.jurisdiction) document.getElementById("jurisdiction").value = data.jurisdiction;
        if (data.penalty) document.getElementById("penalty").value = data.penalty;
      }

      function saveToStorage() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(getFormData()));
        } catch (e) {}
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            setFormData(JSON.parse(saved));
          }
        } catch (e) {}
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function generateNDA() {
        var data = getFormData();

        if (!data.discloserName) {
          showStatus("请输入披露方名称", "error");
          return;
        }
        if (!data.receiverName) {
          showStatus("请输入接收方名称", "error");
          return;
        }
        if (!data.purpose) {
          showStatus("请输入披露目的", "error");
          return;
        }

        var output = "";
        var effectiveDate = data.effectiveDate || new Date().toISOString().split("T")[0];

        if (data.language === "zh") {
          output = generateChineseNDA(data, effectiveDate);
        } else {
          output = generateEnglishNDA(data, effectiveDate);
        }

        document.getElementById("output").value = output;
        saveToStorage();
        showStatus("保密协议已生成", "success");
      }

      function generateChineseNDA(data, effectiveDate) {
        var lines = [];
        var isMutual = data.ndaType === "mutual";

        lines.push("保密协议");
        lines.push("");
        lines.push("协议编号：NDA-" + Date.now());
        lines.push("签署日期：" + effectiveDate);
        lines.push("");
        lines.push("═══════════════════════════════════════════════════════════════");
        lines.push("");
        lines.push("甲方（" + (isMutual ? "披露方/接收方" : "披露方") + "）：");
        lines.push("名称：" + data.discloserName);
        if (data.discloserAddress) {
          lines.push("地址：" + data.discloserAddress);
        }
        if (data.discloserRep) {
          lines.push("代表人：" + data.discloserRep);
        }
        lines.push("");
        lines.push("乙方（" + (isMutual ? "披露方/接收方" : "接收方") + "）：");
        lines.push("名称：" + data.receiverName);
        if (data.receiverAddress) {
          lines.push("地址：" + data.receiverAddress);
        }
        if (data.receiverRep) {
          lines.push("代表人：" + data.receiverRep);
        }
        lines.push("");
        lines.push("═══════════════════════════════════════════════════════════════");
        lines.push("");
        lines.push("鉴于：");
        lines.push("");
        lines.push(data.purpose);
        lines.push("");
        if (isMutual) {
          lines.push(
            "双方可能需要相互披露某些保密信息，为保护双方的合法权益，经友好协商，达成如下协议："
          );
        } else {
          lines.push(
            "甲方需要向乙方披露某些保密信息，为保护甲方的合法权益，经友好协商，达成如下协议："
          );
        }
        lines.push("");

        lines.push("第一条 保密信息的定义");
        lines.push("");
        lines.push(
          '1.1 本协议所称"保密信息"是指' +
            (isMutual ? "任一方" : "甲方") +
            "向" +
            (isMutual ? "另一方" : "乙方") +
            "披露的、与本协议目的相关的一切信息，包括但不限于："
        );
        lines.push("");
        if (data.confidentialInfo) {
          lines.push("    " + data.confidentialInfo);
        } else {
          lines.push("    (a) 商业计划、经营策略、市场分析");
          lines.push("    (b) 技术资料、研发成果、软件源代码");
          lines.push("    (c) 客户信息、供应商信息、合作伙伴信息");
          lines.push("    (d) 财务数据、价格策略、成本信息");
          lines.push("    (e) 员工信息、组织架构");
          lines.push("    (f) 其他明示或应当知悉属于保密性质的信息");
        }
        lines.push("");
        lines.push(
          "1.2 保密信息的载体形式包括但不限于：书面文件、电子文档、口头陈述、实物样品等。"
        );
        lines.push("");

        lines.push("第二条 保密义务");
        lines.push("");
        lines.push("2.1 " + (isMutual ? "接收方" : "乙方") + "承诺对保密信息承担如下保密义务：");
        lines.push("");
        lines.push(
          "    (a) 采取与保护自身同等重要保密信息相同的保护措施，但不低于合理审慎的标准；"
        );
        lines.push(
          "    (b) 不得向任何第三方披露保密信息，法律法规另有规定或经" +
            (isMutual ? "披露方" : "甲方") +
            "书面同意的除外；"
        );
        lines.push("    (c) 仅将保密信息用于本协议约定的目的；");
        lines.push(
          "    (d) 仅向因工作需要必须知悉的员工、代理人或顾问披露，并确保其承担同等保密义务；"
        );
        lines.push("    (e) 不得复制、摘录保密信息，除非为履行本协议目的所必需。");
        lines.push("");

        lines.push("第三条 保密信息的例外");
        lines.push("");
        lines.push("3.1 下列情形不属于本协议约束的保密信息：");
        lines.push("");
        lines.push("    (a) 在披露前已为公众所知的信息；");
        lines.push(
          "    (b) 非因" + (isMutual ? "接收方" : "乙方") + "的过错而成为公众所知的信息；"
        );
        lines.push("    (c) " + (isMutual ? "接收方" : "乙方") + "在接收前已合法拥有的信息；");
        lines.push(
          "    (d) " + (isMutual ? "接收方" : "乙方") + "从有权披露的第三方合法获得的信息；"
        );
        lines.push(
          "    (e) " + (isMutual ? "接收方" : "乙方") + "独立开发且未使用保密信息的成果。"
        );
        lines.push("");

        lines.push("第四条 保密期限");
        lines.push("");
        var durationText = data.duration === "permanent" ? "永久有效" : data.duration + " 年";
        lines.push("4.1 本协议的保密期限为：" + durationText + "，自本协议生效之日起计算。");
        lines.push("");
        lines.push(
          "4.2 保密期限届满后，" +
            (isMutual ? "接收方" : "乙方") +
            "对于本质上属于商业秘密的信息仍应持续保密。"
        );
        lines.push("");

        lines.push("第五条 保密信息的返还与销毁");
        lines.push("");
        lines.push(
          "5.1 在本协议终止或" +
            (isMutual ? "披露方" : "甲方") +
            "书面要求时，" +
            (isMutual ? "接收方" : "乙方") +
            "应当："
        );
        lines.push("");
        lines.push("    (a) 立即停止使用保密信息；");
        lines.push("    (b) 返还全部保密信息及其复制件；");
        lines.push("    (c) 销毁无法返还的保密信息，并书面确认销毁完成。");
        lines.push("");

        lines.push("第六条 违约责任");
        lines.push("");
        lines.push(
          "6.1 任何一方违反本协议约定的保密义务，应承担违约责任，赔偿守约方因此遭受的全部损失。"
        );
        lines.push("");
        if (data.penalty) {
          lines.push(
            "6.2 双方同意，违约方应向守约方支付违约金 " +
              data.penalty +
              "。如实际损失超过违约金，违约方应补足差额。"
          );
          lines.push("");
        }

        lines.push("第七条 法律适用与争议解决");
        lines.push("");
        var jurisdictionText = {
          cn: "本协议受中华人民共和国法律管辖。因本协议引起的或与本协议有关的任何争议，双方应友好协商解决；协商不成的，任何一方均可向甲方所在地有管辖权的人民法院提起诉讼。",
          hk: "本协议受中国香港特别行政区法律管辖。因本协议引起的任何争议，双方应友好协商解决；协商不成的，应提交香港国际仲裁中心按其仲裁规则进行仲裁。",
          us: "本协议受美国法律管辖。因本协议引起的任何争议，双方应首先寻求调解解决；调解不成的，应通过具有约束力的仲裁解决。",
          uk: "本协议受英国法律管辖。因本协议引起的任何争议，双方应友好协商解决；协商不成的，应提交伦敦国际仲裁院仲裁解决。"
        };
        lines.push("7.1 " + (jurisdictionText[data.jurisdiction] || jurisdictionText.cn));
        lines.push("");

        lines.push("第八条 其他条款");
        lines.push("");
        lines.push("8.1 本协议自双方签署之日起生效。");
        lines.push("");
        lines.push("8.2 本协议一式两份，双方各执一份，具有同等法律效力。");
        lines.push("");
        lines.push("8.3 本协议的修改须经双方书面同意。");
        lines.push("");
        lines.push("8.4 本协议的任何条款被认定为无效或不可执行，不影响其他条款的效力。");
        lines.push("");

        lines.push("═══════════════════════════════════════════════════════════════");
        lines.push("");
        lines.push("甲方（签章）：_________________________");
        lines.push("");
        lines.push("授权代表签字：_________________________");
        lines.push("");
        lines.push("签署日期：_________________________");
        lines.push("");
        lines.push("");
        lines.push("乙方（签章）：_________________________");
        lines.push("");
        lines.push("授权代表签字：_________________________");
        lines.push("");
        lines.push("签署日期：_________________________");

        return lines.join("\n");
      }

      function generateEnglishNDA(data, effectiveDate) {
        var lines = [];
        var isMutual = data.ndaType === "mutual";

        lines.push("NON-DISCLOSURE AGREEMENT");
        lines.push("");
        lines.push("Agreement No.: NDA-" + Date.now());
        lines.push("Date: " + effectiveDate);
        lines.push("");
        lines.push("═══════════════════════════════════════════════════════════════");
        lines.push("");
        lines.push(
          "PARTY A (" + (isMutual ? "Disclosing/Receiving Party" : "Disclosing Party") + "):"
        );
        lines.push("Name: " + data.discloserName);
        if (data.discloserAddress) {
          lines.push("Address: " + data.discloserAddress);
        }
        if (data.discloserRep) {
          lines.push("Representative: " + data.discloserRep);
        }
        lines.push("");
        lines.push(
          "PARTY B (" + (isMutual ? "Disclosing/Receiving Party" : "Receiving Party") + "):"
        );
        lines.push("Name: " + data.receiverName);
        if (data.receiverAddress) {
          lines.push("Address: " + data.receiverAddress);
        }
        if (data.receiverRep) {
          lines.push("Representative: " + data.receiverRep);
        }
        lines.push("");
        lines.push("═══════════════════════════════════════════════════════════════");
        lines.push("");
        lines.push("WHEREAS:");
        lines.push("");
        lines.push(data.purpose);
        lines.push("");
        if (isMutual) {
          lines.push(
            "The parties may need to disclose certain confidential information to each other. To protect the legitimate interests of both parties, they have agreed as follows:"
          );
        } else {
          lines.push(
            "Party A needs to disclose certain confidential information to Party B. To protect Party A's legitimate interests, the parties have agreed as follows:"
          );
        }
        lines.push("");

        lines.push("ARTICLE 1 - DEFINITION OF CONFIDENTIAL INFORMATION");
        lines.push("");
        lines.push(
          '1.1 "Confidential Information" means all information disclosed by ' +
            (isMutual ? "either party" : "Party A") +
            " to " +
            (isMutual ? "the other party" : "Party B") +
            " in connection with the purpose of this Agreement, including but not limited to:"
        );
        lines.push("");
        if (data.confidentialInfo) {
          lines.push("    " + data.confidentialInfo);
        } else {
          lines.push("    (a) Business plans, strategies, and market analysis");
          lines.push("    (b) Technical materials, R&D results, and software source code");
          lines.push("    (c) Customer, supplier, and partner information");
          lines.push("    (d) Financial data, pricing strategies, and cost information");
          lines.push("    (e) Employee information and organizational structure");
          lines.push("    (f) Other information that is marked or should be known as confidential");
        }
        lines.push("");
        lines.push(
          "1.2 Confidential Information may be in any form including written documents, electronic files, oral communications, or physical samples."
        );
        lines.push("");

        lines.push("ARTICLE 2 - CONFIDENTIALITY OBLIGATIONS");
        lines.push("");
        lines.push("2.1 The " + (isMutual ? "Receiving Party" : "Party B") + " agrees to:");
        lines.push("");
        lines.push(
          "    (a) Protect Confidential Information with the same degree of care used to protect its own confidential information, but no less than reasonable care;"
        );
        lines.push(
          "    (b) Not disclose Confidential Information to any third party except as required by law or with written consent from the " +
            (isMutual ? "Disclosing Party" : "Party A") +
            ";"
        );
        lines.push(
          "    (c) Use Confidential Information only for the purpose stated in this Agreement;"
        );
        lines.push(
          "    (d) Limit disclosure to employees, agents, or advisors who need to know and ensure they are bound by equivalent confidentiality obligations;"
        );
        lines.push(
          "    (e) Not copy or extract Confidential Information except as necessary for the purpose of this Agreement."
        );
        lines.push("");

        lines.push("ARTICLE 3 - EXCEPTIONS");
        lines.push("");
        lines.push("3.1 Confidential Information does not include information that:");
        lines.push("");
        lines.push("    (a) Was publicly known prior to disclosure;");
        lines.push(
          "    (b) Becomes publicly known through no fault of the " +
            (isMutual ? "Receiving Party" : "Party B") +
            ";"
        );
        lines.push(
          "    (c) Was lawfully in the " +
            (isMutual ? "Receiving Party's" : "Party B's") +
            " possession prior to disclosure;"
        );
        lines.push("    (d) Is lawfully obtained from a third party with the right to disclose;");
        lines.push("    (e) Is independently developed without use of Confidential Information.");
        lines.push("");

        lines.push("ARTICLE 4 - TERM");
        lines.push("");
        var durationText = data.duration === "permanent" ? "perpetual" : data.duration + " year(s)";
        lines.push(
          "4.1 The confidentiality obligations under this Agreement shall remain in effect for: " +
            durationText +
            ", commencing from the effective date of this Agreement."
        );
        lines.push("");
        lines.push(
          "4.2 After the expiration of the term, the " +
            (isMutual ? "Receiving Party" : "Party B") +
            " shall continue to keep confidential any information that constitutes trade secrets."
        );
        lines.push("");

        lines.push("ARTICLE 5 - RETURN AND DESTRUCTION");
        lines.push("");
        lines.push(
          "5.1 Upon termination of this Agreement or upon written request by the " +
            (isMutual ? "Disclosing Party" : "Party A") +
            ", the " +
            (isMutual ? "Receiving Party" : "Party B") +
            " shall:"
        );
        lines.push("");
        lines.push("    (a) Immediately cease using the Confidential Information;");
        lines.push("    (b) Return all Confidential Information and copies;");
        lines.push(
          "    (c) Destroy any Confidential Information that cannot be returned and provide written confirmation of destruction."
        );
        lines.push("");

        lines.push("ARTICLE 6 - BREACH");
        lines.push("");
        lines.push(
          "6.1 Any party that breaches its confidentiality obligations shall be liable for damages and shall compensate the non-breaching party for all losses suffered."
        );
        lines.push("");
        if (data.penalty) {
          lines.push(
            "6.2 The parties agree that the breaching party shall pay liquidated damages of " +
              data.penalty +
              " to the non-breaching party. If actual damages exceed the liquidated damages, the breaching party shall pay the difference."
          );
          lines.push("");
        }

        lines.push("ARTICLE 7 - GOVERNING LAW AND DISPUTE RESOLUTION");
        lines.push("");
        var jurisdictionText = {
          cn: "This Agreement shall be governed by the laws of the People's Republic of China. Any dispute arising from or related to this Agreement shall be resolved through friendly negotiation. If negotiation fails, either party may submit the dispute to the competent People's Court at Party A's location.",
          hk: "This Agreement shall be governed by the laws of Hong Kong SAR. Any dispute shall be resolved through friendly negotiation. If negotiation fails, the dispute shall be submitted to the Hong Kong International Arbitration Centre for arbitration.",
          us: "This Agreement shall be governed by the laws of the United States. Any dispute shall first be resolved through mediation. If mediation fails, the dispute shall be resolved through binding arbitration.",
          uk: "This Agreement shall be governed by the laws of England and Wales. Any dispute shall be resolved through friendly negotiation. If negotiation fails, the dispute shall be submitted to the London Court of International Arbitration."
        };
        lines.push("7.1 " + (jurisdictionText[data.jurisdiction] || jurisdictionText.us));
        lines.push("");

        lines.push("ARTICLE 8 - MISCELLANEOUS");
        lines.push("");
        lines.push("8.1 This Agreement shall become effective upon execution by both parties.");
        lines.push("");
        lines.push(
          "8.2 This Agreement is executed in two counterparts, each party holding one copy, with equal legal effect."
        );
        lines.push("");
        lines.push(
          "8.3 Any amendment to this Agreement must be in writing and signed by both parties."
        );
        lines.push("");
        lines.push(
          "8.4 If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall remain in full force and effect."
        );
        lines.push("");

        lines.push("═══════════════════════════════════════════════════════════════");
        lines.push("");
        lines.push("PARTY A (Seal): _________________________");
        lines.push("");
        lines.push("Authorized Signature: _________________________");
        lines.push("");
        lines.push("Date: _________________________");
        lines.push("");
        lines.push("");
        lines.push("PARTY B (Seal): _________________________");
        lines.push("");
        lines.push("Authorized Signature: _________________________");
        lines.push("");
        lines.push("Date: _________________________");

        return lines.join("\n");
      }

      function copyOutput() {
        var output = document.getElementById("output").value;
        if (!output) {
          showStatus("没有可复制的内容", "error");
          return;
        }
        navigator.clipboard
          .writeText(output)
          .then(function () {
            showStatus("已复制到剪贴板", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      function downloadNDA() {
        var output = document.getElementById("output").value;
        if (!output) {
          showStatus("没有可下载的内容", "error");
          return;
        }
        var data = getFormData();
        var filename = (data.language === "zh" ? "保密协议" : "NDA") + "_" + Date.now() + ".txt";
        var blob = new Blob([output], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showStatus("下载已开始", "success");
      }

      function clearForm() {
        document.getElementById("discloserName").value = "";
        document.getElementById("discloserAddress").value = "";
        document.getElementById("discloserRep").value = "";
        document.getElementById("receiverName").value = "";
        document.getElementById("receiverAddress").value = "";
        document.getElementById("receiverRep").value = "";
        document.getElementById("effectiveDate").value = "";
        document.getElementById("purpose").value = "";
        document.getElementById("confidentialInfo").value = "";
        document.getElementById("penalty").value = "";
        document.getElementById("output").value = "";
        localStorage.removeItem(LS_KEY);
        showStatus("已清空", "success");
      }

      document.querySelectorAll("input, select, textarea").forEach(function (el) {
        el.addEventListener("change", saveToStorage);
        el.addEventListener("input", saveToStorage);
      });

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
        if (!document.getElementById("effectiveDate").value) {
          document.getElementById("effectiveDate").value = new Date().toISOString().split("T")[0];
        }
      })();
    
