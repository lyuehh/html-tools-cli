// @ts-nocheck
// Generated from tools/office/contract-template.html
// Source SHA-256: fdd010c995a4745fe9a0c3a6d2857fbdafc7256bdfbc56c041ad253444bb8303
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "contract_template_v2";
      var currentType = "service";

      var previewEl = document.getElementById("contractPreview");
      var statusEl = document.getElementById("status");

      var contractNoEl = document.getElementById("contractNo");
      var contractDateEl = document.getElementById("contractDate");
      var partyAEl = document.getElementById("partyA");
      var partyBEl = document.getElementById("partyB");
      var startDateEl = document.getElementById("startDate");
      var endDateEl = document.getElementById("endDate");
      var amountEl = document.getElementById("amount");
      var paymentMethodEl = document.getElementById("paymentMethod");
      var extraTermsEl = document.getElementById("extraTerms");

      var serviceScopeEl = document.getElementById("serviceScope");
      var serviceLocationEl = document.getElementById("serviceLocation");

      var positionEl = document.getElementById("position");
      var departmentEl = document.getElementById("department");
      var jobDutiesEl = document.getElementById("jobDuties");
      var workLocationEl = document.getElementById("workLocation");
      var probationEl = document.getElementById("probation");

      var rentalItemEl = document.getElementById("rentalItem");
      var depositEl = document.getElementById("deposit");
      var rentalUseEl = document.getElementById("rentalUse");

      var templates = {
        service: {
          title: "服务合同",
          intro:
            "甲乙双方本着平等自愿、诚实信用的原则，经友好协商，就甲方委托乙方提供服务事宜，达成如下协议：",
          sections: [
            {
              title: "第一条 服务内容",
              content:
                "乙方同意按照本合同约定，为甲方提供以下服务：\n{serviceScope}\n服务地点：{serviceLocation}"
            },
            {
              title: "第二条 服务期限",
              content: "本合同服务期限自 {startDate} 起至 {endDate} 止。"
            },
            {
              title: "第三条 服务费用",
              content:
                "本合同服务费用总计人民币 {amount} 元整（大写：{amountCN}）。\n付款方式：{paymentMethod}。"
            },
            {
              title: "第四条 甲方权利义务",
              content:
                "1. 甲方有权按照合同约定要求乙方提供服务，并监督服务质量；\n2. 甲方应按约定时间和方式支付服务费用；\n3. 甲方应配合乙方完成服务工作，提供必要的工作条件和资料。"
            },
            {
              title: "第五条 乙方权利义务",
              content:
                "1. 乙方有权按约定收取服务费用；\n2. 乙方应按照合同约定的内容、标准和期限提供服务；\n3. 乙方应保证服务质量，对服务过程中知悉的甲方商业秘密负有保密义务。"
            },
            {
              title: "第六条 违约责任",
              content:
                "1. 任何一方违反本合同约定，应承担违约责任，赔偿对方因此造成的损失；\n2. 甲方逾期付款的，应按日支付逾期金额的万分之五作为违约金；\n3. 乙方未按约定提供服务或服务质量不符合要求的，甲方有权要求乙方重新提供服务或退还相应费用。"
            },
            {
              title: "第七条 合同解除",
              content:
                "1. 经双方协商一致，可以解除本合同；\n2. 一方严重违约，另一方有权解除本合同并要求赔偿损失。"
            },
            {
              title: "第八条 争议解决",
              content:
                "因本合同引起的或与本合同有关的争议，双方应首先协商解决；协商不成的，任何一方均可向合同签订地人民法院提起诉讼。"
            }
          ]
        },
        employment: {
          title: "劳动合同",
          intro:
            "甲乙双方根据《中华人民共和国劳动合同法》及相关法律法规，在平等自愿、协商一致的基础上，签订本合同：",
          sections: [
            {
              title: "第一条 工作内容与岗位",
              content:
                "乙方同意在甲方 {department} 部门担任 {position} 岗位工作。\n主要工作职责：{jobDuties}\n工作地点：{workLocation}"
            },
            {
              title: "第二条 合同期限",
              content:
                "本合同为固定期限劳动合同，期限自 {startDate} 起至 {endDate} 止。\n试用期为 {probation} 个月，自 {startDate} 起至试用期届满。"
            },
            {
              title: "第三条 劳动报酬",
              content:
                "甲方每月支付乙方工资人民币 {amount} 元整（大写：{amountCN}）。\n付款方式：{paymentMethod}。\n甲方应于每月15日前支付上月工资。"
            },
            {
              title: "第四条 工作时间与休息休假",
              content:
                "1. 乙方实行标准工时制度，每日工作8小时，每周工作40小时；\n2. 乙方依法享有国家规定的法定节假日、年休假、婚假、产假等假期；\n3. 甲方因工作需要安排乙方加班的，应依法支付加班工资或安排补休。"
            },
            {
              title: "第五条 社会保险与福利",
              content:
                "1. 甲方按照国家和地方规定为乙方缴纳社会保险费（养老、医疗、失业、工伤、生育保险）；\n2. 甲方为乙方缴纳住房公积金；\n3. 乙方依法享有甲方规定的其他福利待遇。"
            },
            {
              title: "第六条 劳动保护与条件",
              content:
                "甲方应为乙方提供符合国家规定的劳动安全卫生条件和必要的劳动防护用品，保障乙方的人身安全和健康。"
            },
            {
              title: "第七条 合同变更、解除与终止",
              content:
                "1. 经双方协商一致，可以变更或解除本合同；\n2. 乙方提前30日以书面形式通知甲方，可以解除本合同；试用期内提前3日通知；\n3. 甲方解除本合同应符合法律规定的条件和程序。"
            },
            {
              title: "第八条 保密与竞业限制",
              content:
                "乙方应对工作中知悉的甲方商业秘密和技术秘密负有保密义务，未经甲方书面同意，不得向任何第三方披露。"
            }
          ]
        },
        rental: {
          title: "租赁合同",
          intro: "甲乙双方就租赁事宜，经平等协商，达成如下协议：",
          sections: [
            {
              title: "第一条 租赁物",
              content:
                "甲方同意将以下物品/房屋出租给乙方使用：\n{rentalItem}\n使用用途：{rentalUse}"
            },
            {
              title: "第二条 租赁期限",
              content:
                "租赁期限自 {startDate} 起至 {endDate} 止。\n租赁期满，如乙方需继续租用，应提前30日向甲方提出书面申请，双方另行签订合同。"
            },
            {
              title: "第三条 租金与押金",
              content:
                "1. 租金总计人民币 {amount} 元整（大写：{amountCN}）；\n2. 付款方式：{paymentMethod}；\n3. 乙方应于本合同签订时向甲方支付押金人民币 {deposit} 元整；\n4. 租赁期满且乙方无违约行为的，甲方应于交还租赁物后7日内退还押金。"
            },
            {
              title: "第四条 甲方权利义务",
              content:
                "1. 甲方应按约定时间将租赁物交付乙方使用，并保证租赁物符合约定的使用条件；\n2. 甲方应保证租赁物不存在权属纠纷，不影响乙方正常使用；\n3. 甲方负责租赁物的结构性维修。"
            },
            {
              title: "第五条 乙方权利义务",
              content:
                "1. 乙方应按约定用途使用租赁物，不得擅自改变用途；\n2. 未经甲方书面同意，乙方不得将租赁物转租、转借给第三方；\n3. 乙方应妥善保管、合理使用租赁物，如有损坏应照价赔偿；\n4. 乙方负责租赁期间的日常维护和水电等费用。"
            },
            {
              title: "第六条 租赁物返还",
              content:
                "1. 租赁期满或合同解除时，乙方应将租赁物按原状返还甲方；\n2. 乙方对租赁物进行的装修、改造，应事先征得甲方书面同意；\n3. 租赁期满，装修、改造物的归属由双方另行协商。"
            },
            {
              title: "第七条 违约责任",
              content:
                "1. 甲方逾期交付租赁物的，每逾期一日，应向乙方支付日租金的双倍作为违约金；\n2. 乙方逾期支付租金的，每逾期一日，应向甲方支付逾期租金的万分之五作为违约金；\n3. 任何一方擅自解除合同的，应向对方支付一个月租金作为违约金。"
            },
            {
              title: "第八条 合同解除",
              content:
                "1. 经双方协商一致，可以解除本合同；\n2. 一方严重违约，另一方有权解除本合同并要求赔偿损失；\n3. 因不可抗力致使合同目的无法实现的，双方可以解除合同。"
            }
          ]
        }
      };

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function formatDate(dateStr) {
        if (!dateStr) return "____年__月__日";
        var d = new Date(dateStr);
        return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
      }

      function numberToChinese(num) {
        if (!num || isNaN(num)) return "____";
        var digits = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
        var units = ["", "拾", "佰", "仟"];
        var bigUnits = ["", "万", "亿"];

        num = Math.floor(parseFloat(num));
        if (num === 0) return "零元整";

        var result = "";
        var unitIndex = 0;

        while (num > 0) {
          var section = num % 10000;
          var sectionStr = "";
          var zeroFlag = false;

          for (var i = 0; section > 0; i++) {
            var digit = section % 10;
            if (digit === 0) {
              zeroFlag = true;
            } else {
              if (zeroFlag) {
                sectionStr = "零" + sectionStr;
                zeroFlag = false;
              }
              sectionStr = digits[digit] + units[i] + sectionStr;
            }
            section = Math.floor(section / 10);
          }

          if (sectionStr) {
            result = sectionStr + bigUnits[unitIndex] + result;
          }

          num = Math.floor(num / 10000);
          unitIndex++;
        }

        return result + "元整";
      }

      function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.textContent;
      }

      function getFormData() {
        return {
          type: currentType,
          contractNo: contractNoEl.value || "【合同编号】",
          contractDate: formatDate(contractDateEl.value),
          partyA: partyAEl.value || "【甲方名称】",
          partyB: partyBEl.value || "【乙方名称】",
          startDate: formatDate(startDateEl.value),
          endDate: formatDate(endDateEl.value),
          amount: amountEl.value || "____",
          amountCN: numberToChinese(amountEl.value),
          paymentMethod: paymentMethodEl.value,
          extraTerms: extraTermsEl.value,
          serviceScope: serviceScopeEl.value || "【服务内容】",
          serviceLocation: serviceLocationEl.value || "【服务地点】",
          position: positionEl.value || "【岗位名称】",
          department: departmentEl.value || "【部门名称】",
          jobDuties: jobDutiesEl.value || "【工作职责】",
          workLocation: workLocationEl.value || "【工作地点】",
          probation: probationEl.value || "3",
          rentalItem: rentalItemEl.value || "【租赁物描述】",
          deposit: depositEl.value || "____",
          rentalUse: rentalUseEl.value
        };
      }

      function generateContract() {
        var data = getFormData();
        var tpl = templates[currentType];

        while (previewEl.firstChild) {
          previewEl.removeChild(previewEl.firstChild);
        }

        var h2 = document.createElement("h2");
        h2.textContent = tpl.title;
        previewEl.appendChild(h2);

        var contractNum = document.createElement("div");
        contractNum.className = "contract-number";
        contractNum.textContent = "合同编号：" + escapeHtml(data.contractNo);
        previewEl.appendChild(contractNum);

        var partiesDiv = document.createElement("div");
        partiesDiv.className = "parties";
        var pA = document.createElement("p");
        var pAStrong = document.createElement("strong");
        pAStrong.textContent = "甲方（委托方/用人单位/出租方）：";
        pA.appendChild(pAStrong);
        pA.appendChild(document.createTextNode(escapeHtml(data.partyA)));
        var pB = document.createElement("p");
        var pBStrong = document.createElement("strong");
        pBStrong.textContent = "乙方（服务方/劳动者/承租方）：";
        pB.appendChild(pBStrong);
        pB.appendChild(document.createTextNode(escapeHtml(data.partyB)));
        partiesDiv.appendChild(pA);
        partiesDiv.appendChild(pB);
        previewEl.appendChild(partiesDiv);

        var introP = document.createElement("p");
        introP.textContent = tpl.intro;
        previewEl.appendChild(introP);

        tpl.sections.forEach(function (section) {
          var titleP = document.createElement("p");
          titleP.className = "section-title";
          titleP.textContent = section.title;
          previewEl.appendChild(titleP);

          var content = section.content;
          Object.keys(data).forEach(function (key) {
            content = content.replace(new RegExp("\\{" + key + "\\}", "g"), data[key]);
          });

          content.split("\n").forEach(function (line) {
            var p = document.createElement("p");
            p.textContent = line;
            previewEl.appendChild(p);
          });
        });

        if (data.extraTerms) {
          var extraTitle = document.createElement("p");
          extraTitle.className = "section-title";
          extraTitle.textContent = "第九条 附加条款";
          previewEl.appendChild(extraTitle);

          data.extraTerms.split("\n").forEach(function (line) {
            var p = document.createElement("p");
            p.textContent = line;
            previewEl.appendChild(p);
          });
        }

        var finalP = document.createElement("p");
        finalP.textContent =
          "本合同一式两份，甲乙双方各执一份，具有同等法律效力。本合同自双方签字（盖章）之日起生效。";
        previewEl.appendChild(finalP);

        var sigDiv = document.createElement("div");
        sigDiv.className = "signature";

        var sigA = document.createElement("div");
        sigA.className = "sig-block";
        var sigALabel1 = document.createElement("div");
        sigALabel1.className = "sig-label";
        sigALabel1.textContent = "甲方（签字/盖章）：";
        var sigALine1 = document.createElement("div");
        sigALine1.className = "sig-line";
        var sigALabel2 = document.createElement("div");
        sigALabel2.className = "sig-label";
        sigALabel2.textContent = "日期：";
        var sigALine2 = document.createElement("div");
        sigALine2.className = "sig-line";
        sigA.appendChild(sigALabel1);
        sigA.appendChild(sigALine1);
        sigA.appendChild(sigALabel2);
        sigA.appendChild(sigALine2);

        var sigB = document.createElement("div");
        sigB.className = "sig-block";
        var sigBLabel1 = document.createElement("div");
        sigBLabel1.className = "sig-label";
        sigBLabel1.textContent = "乙方（签字/盖章）：";
        var sigBLine1 = document.createElement("div");
        sigBLine1.className = "sig-line";
        var sigBLabel2 = document.createElement("div");
        sigBLabel2.className = "sig-label";
        sigBLabel2.textContent = "日期：";
        var sigBLine2 = document.createElement("div");
        sigBLine2.className = "sig-line";
        sigB.appendChild(sigBLabel1);
        sigB.appendChild(sigBLine1);
        sigB.appendChild(sigBLabel2);
        sigB.appendChild(sigBLine2);

        sigDiv.appendChild(sigA);
        sigDiv.appendChild(sigB);
        previewEl.appendChild(sigDiv);

        showStatus("合同已生成", "success");
      }

      function getPlainText() {
        return previewEl.innerText;
      }

      function saveToStorage() {
        var data = {
          type: currentType,
          contractNo: contractNoEl.value,
          contractDate: contractDateEl.value,
          partyA: partyAEl.value,
          partyB: partyBEl.value,
          startDate: startDateEl.value,
          endDate: endDateEl.value,
          amount: amountEl.value,
          paymentMethod: paymentMethodEl.value,
          extraTerms: extraTermsEl.value,
          serviceScope: serviceScopeEl.value,
          serviceLocation: serviceLocationEl.value,
          position: positionEl.value,
          department: departmentEl.value,
          jobDuties: jobDutiesEl.value,
          workLocation: workLocationEl.value,
          probation: probationEl.value,
          rentalItem: rentalItemEl.value,
          deposit: depositEl.value,
          rentalUse: rentalUseEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            currentType = data.type || "service";
            contractNoEl.value = data.contractNo || "";
            contractDateEl.value = data.contractDate || "";
            partyAEl.value = data.partyA || "";
            partyBEl.value = data.partyB || "";
            startDateEl.value = data.startDate || "";
            endDateEl.value = data.endDate || "";
            amountEl.value = data.amount || "";
            paymentMethodEl.value = data.paymentMethod || "一次性付清";
            extraTermsEl.value = data.extraTerms || "";
            serviceScopeEl.value = data.serviceScope || "";
            serviceLocationEl.value = data.serviceLocation || "";
            positionEl.value = data.position || "";
            departmentEl.value = data.department || "";
            jobDutiesEl.value = data.jobDuties || "";
            workLocationEl.value = data.workLocation || "";
            probationEl.value = data.probation || "";
            rentalItemEl.value = data.rentalItem || "";
            depositEl.value = data.deposit || "";
            rentalUseEl.value = data.rentalUse || "居住";

            updateTypeUI();
            return true;
          } catch (e) {
            return false;
          }
        }
        return false;
      }

      function updateTypeUI() {
        document.querySelectorAll(".type-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.type === currentType);
        });
        document.querySelectorAll(".template-fields").forEach(function (el) {
          el.classList.remove("active");
        });
        document.getElementById(currentType + "Fields").classList.add("active");
      }

      function clearForm() {
        if (!confirm("确定要清空所有内容吗？")) return;

        contractNoEl.value = "";
        contractDateEl.value = new Date().toISOString().split("T")[0];
        partyAEl.value = "";
        partyBEl.value = "";
        startDateEl.value = "";
        endDateEl.value = "";
        amountEl.value = "";
        paymentMethodEl.value = "一次性付清";
        extraTermsEl.value = "";
        serviceScopeEl.value = "";
        serviceLocationEl.value = "";
        positionEl.value = "";
        departmentEl.value = "";
        jobDutiesEl.value = "";
        workLocationEl.value = "";
        probationEl.value = "";
        rentalItemEl.value = "";
        depositEl.value = "";
        rentalUseEl.value = "居住";

        currentType = "service";
        updateTypeUI();
        localStorage.removeItem(LS_KEY);
        while (previewEl.firstChild) {
          previewEl.removeChild(previewEl.firstChild);
        }
        showStatus("已清空", "success");
      }

      document.querySelectorAll(".type-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentType = btn.dataset.type;
          updateTypeUI();
          saveToStorage();
          generateContract();
        });
      });

      var allInputs = [
        contractNoEl,
        contractDateEl,
        partyAEl,
        partyBEl,
        startDateEl,
        endDateEl,
        amountEl,
        paymentMethodEl,
        extraTermsEl,
        serviceScopeEl,
        serviceLocationEl,
        positionEl,
        departmentEl,
        jobDutiesEl,
        workLocationEl,
        probationEl,
        rentalItemEl,
        depositEl,
        rentalUseEl
      ];

      allInputs.forEach(function (el) {
        el.addEventListener("input", saveToStorage);
        el.addEventListener("change", saveToStorage);
      });

      document.getElementById("btnGenerate").addEventListener("click", generateContract);

      document.getElementById("btnCopy").addEventListener("click", function () {
        var text = getPlainText();
        if (!text) {
          showStatus("请先生成合同", "error");
          return;
        }
        navigator.clipboard
          .writeText(text)
          .then(function () {
            showStatus("已复制到剪贴板", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      });

      document.getElementById("btnPrint").addEventListener("click", function () {
        if (!previewEl.textContent) {
          generateContract();
        }
        window.print();
      });

      document.getElementById("btnClear").addEventListener("click", clearForm);

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme")) {
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        }
      });

      initTheme();

      if (!contractDateEl.value) {
        contractDateEl.value = new Date().toISOString().split("T")[0];
      }

      loadFromStorage();
      updateTypeUI();
      generateContract();
    
