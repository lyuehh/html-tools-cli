// @ts-nocheck
// Generated from tools/pets/pet-medication-dosage.html
// Source SHA-256: b5e1d549b413eaaa103af14901b112f412dc18982256216c58a12bec8160648f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 药物数据库：涵盖犬猫常见非处方/常用药物
      var DRUG_DB = {
        dog: [
          {
            id: "amoxicillin",
            name: "阿莫西林",
            category: "抗生素",
            doseMin: 10,
            doseMax: 20,
            freq: "每 12 小时",
            info: "广谱青霉素类抗生素，用于皮肤、泌尿道、呼吸道细菌感染。"
          },
          {
            id: "metronidazole",
            name: "甲硝唑",
            category: "抗菌/抗原虫",
            doseMin: 10,
            doseMax: 25,
            freq: "每 12 小时",
            info: "用于厌氧菌感染、贾第鞭毛虫、炎症性肠病等，常用于腹泻治疗。"
          },
          {
            id: "carprofen",
            name: "卡洛芬",
            category: "非甾体消炎药（NSAID）",
            doseMin: 2,
            doseMax: 4.4,
            freq: "每 24 小时 或分两次每 12 小时",
            info: "犬专用 NSAID，用于骨关节炎疼痛及术后镇痛。禁用于猫。"
          },
          {
            id: "meloxicam-dog",
            name: "美洛昔康（犬）",
            category: "非甾体消炎药（NSAID）",
            doseMin: 0.1,
            doseMax: 0.2,
            freq: "首日 0.2 mg/kg，之后每 24 小时 0.1 mg/kg",
            info: "COX-2 选择性 NSAID，用于关节炎与疼痛管理。"
          },
          {
            id: "fenbendazole",
            name: "芬苯达唑（驱虫）",
            category: "驱虫药",
            doseMin: 50,
            doseMax: 50,
            freq: "每 24 小时，连续 3 天",
            info: "广谱苯并咪唑类驱虫药，对蛔虫、钩虫、鞭虫及某些绦虫有效。"
          },
          {
            id: "praziquantel-dog",
            name: "吡喹酮（犬驱绦虫）",
            category: "驱虫药",
            doseMin: 5,
            doseMax: 10,
            freq: "单次给药",
            info: "高效绦虫驱虫药，对多种绦虫单次给药即可。"
          },
          {
            id: "diphenhydramine-dog",
            name: "苯海拉明（抗组胺）",
            category: "抗过敏药",
            doseMin: 1,
            doseMax: 2,
            freq: "每 8–12 小时",
            info: "用于过敏反应、蚊虫叮咬等。犬用最大单次不超过 50 mg。"
          },
          {
            id: "omeprazole-dog",
            name: "奥美拉唑（犬）",
            category: "质子泵抑制剂",
            doseMin: 0.5,
            doseMax: 1,
            freq: "每 24 小时",
            info: "用于胃食管反流、胃溃疡及 NSAID 所致胃黏膜损伤的保护。"
          }
        ],
        cat: [
          {
            id: "amoxicillin-cat",
            name: "阿莫西林",
            category: "抗生素",
            doseMin: 10,
            doseMax: 20,
            freq: "每 12 小时",
            info: "广谱青霉素类抗生素，适用于皮肤和软组织感染，注意猫对部分抗生素较敏感。"
          },
          {
            id: "metronidazole-cat",
            name: "甲硝唑",
            category: "抗菌/抗原虫",
            doseMin: 7.5,
            doseMax: 15,
            freq: "每 12 小时",
            info: "猫用剂量低于犬，用于厌氧菌感染及贾第鞭毛虫。猫对神经毒性较敏感，剂量需谨慎。"
          },
          {
            id: "meloxicam-cat",
            name: "美洛昔康（猫，单次）",
            category: "非甾体消炎药（NSAID）",
            doseMin: 0.1,
            doseMax: 0.3,
            freq: "单次（术后镇痛）",
            info: "猫对 NSAID 极为敏感，肾毒性风险高。长期使用需严格兽医监督，禁止日常口服自行给药。"
          },
          {
            id: "fenbendazole-cat",
            name: "芬苯达唑（驱虫）",
            category: "驱虫药",
            doseMin: 50,
            doseMax: 50,
            freq: "每 24 小时，连续 3 天",
            info: "广谱驱虫药，对猫蛔虫、钩虫有效。"
          },
          {
            id: "praziquantel-cat",
            name: "吡喹酮（猫驱绦虫）",
            category: "驱虫药",
            doseMin: 5,
            doseMax: 10,
            freq: "单次给药",
            info: "高效绦虫驱虫药，猫用口服剂量与犬相近。"
          },
          {
            id: "famotidine-cat",
            name: "法莫替丁（猫）",
            category: "H2 受体拮抗剂",
            doseMin: 0.5,
            doseMax: 1,
            freq: "每 12–24 小时",
            info: "用于猫胃酸过多、胃炎的辅助治疗，相对安全。"
          },
          {
            id: "diphenhydramine-cat",
            name: "苯海拉明（猫）",
            category: "抗过敏药",
            doseMin: 1,
            doseMax: 2,
            freq: "每 8 小时",
            info: "猫用抗组胺药，用于轻度过敏症状缓解。猫对某些配方中的辅料（如酒精）敏感，请核查成分。"
          },
          {
            id: "prednisolone-cat",
            name: "泼尼松龙",
            category: "皮质类固醇",
            doseMin: 1,
            doseMax: 2,
            freq: "每 24 小时（免疫抑制）",
            info: "用于炎症、过敏、免疫介导性疾病。猫优先使用泼尼松龙（而非泼尼松），需兽医处方。"
          }
        ]
      };

      var selectedDrug = null;

      function buildPresets() {
        var petType = document.getElementById("petType").value;
        var list = document.getElementById("drugPresetList");
        list.innerHTML = "";
        selectedDrug = null;
        var drugs = DRUG_DB[petType] || [];
        drugs.forEach(function (drug) {
          var btn = document.createElement("button");
          btn.className = "drug-preset-btn";
          btn.textContent = drug.name;
          btn.dataset.id = drug.id;
          btn.addEventListener("click", function () {
            document.querySelectorAll(".drug-preset-btn").forEach(function (b) {
              b.classList.remove("active");
            });
            btn.classList.add("active");
            selectedDrug = drug;
            document.getElementById("customDoseMin").value = "";
            document.getElementById("customDoseMax").value = "";
            showStatus("已选择：" + drug.name, "");
          });
          list.appendChild(btn);
        });
      }

      function getWeightKg() {
        var raw = parseFloat(document.getElementById("petWeight").value);
        var unit = document.getElementById("weightUnit").value;
        if (isNaN(raw) || raw <= 0) return null;
        return unit === "lb" ? raw * 0.453592 : raw;
      }

      function calculate() {
        var weightKg = getWeightKg();
        if (!weightKg) {
          showStatus("请输入有效的宠物体重", "error");
          return;
        }

        var customMinVal = parseFloat(document.getElementById("customDoseMin").value);
        var customMaxVal = parseFloat(document.getElementById("customDoseMax").value);
        var hasCustom = !isNaN(customMinVal) && customMinVal > 0;

        var doseMin, doseMax, drugName, freq, info, category;

        if (hasCustom) {
          doseMin = customMinVal;
          doseMax =
            !isNaN(customMaxVal) && customMaxVal >= customMinVal ? customMaxVal : customMinVal;
          drugName = "自定义剂量";
          freq = "请遵医嘱";
          info = null;
          category = "自定义";
          selectedDrug = null;
          document.querySelectorAll(".drug-preset-btn").forEach(function (b) {
            b.classList.remove("active");
          });
        } else if (selectedDrug) {
          doseMin = selectedDrug.doseMin;
          doseMax = selectedDrug.doseMax;
          drugName = selectedDrug.name;
          freq = selectedDrug.freq;
          info = selectedDrug.info;
          category = selectedDrug.category;
        } else {
          showStatus("请选择药物预设或输入自定义剂量范围", "error");
          return;
        }

        var totalMin = doseMin * weightKg;
        var totalMax = doseMax * weightKg;
        var totalMid = (totalMin + totalMax) / 2;

        document.getElementById("doseMid").textContent = totalMid.toFixed(2);
        if (doseMin === doseMax) {
          document.getElementById("doseRange").textContent = "（" + totalMin.toFixed(2) + " mg）";
        } else {
          document.getElementById("doseRange").textContent =
            "范围：" + totalMin.toFixed(2) + " – " + totalMax.toFixed(2) + " mg";
        }

        var unitLabel = document.getElementById("weightUnit").value === "lb" ? "lb" : "kg";
        var rawWeight = parseFloat(document.getElementById("petWeight").value);
        document.getElementById("weightKg").textContent =
          rawWeight + " " + unitLabel + " = " + weightKg.toFixed(2) + " kg";
        document.getElementById("dosePerKg").textContent =
          doseMin === doseMax ? doseMin + " mg/kg" : doseMin + " – " + doseMax + " mg/kg";
        document.getElementById("doseFreq").textContent = freq;
        document.getElementById("drugCategory").textContent = category;

        var infoBox = document.getElementById("drugInfoBox");
        if (info) {
          document.getElementById("drugInfoTitle").textContent = drugName + " — 简介";
          document.getElementById("drugInfoText").textContent = info;
          infoBox.classList.remove("hidden");
        } else {
          infoBox.classList.add("hidden");
        }

        document.getElementById("resultSection").classList.remove("hidden");
        showStatus("计算完成：" + drugName, "success");
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function reset() {
        document.getElementById("petWeight").value = "";
        document.getElementById("customDoseMin").value = "";
        document.getElementById("customDoseMax").value = "";
        document.getElementById("weightUnit").value = "kg";
        document.getElementById("petType").value = "dog";
        selectedDrug = null;
        buildPresets();
        document.getElementById("resultSection").classList.add("hidden");
        showStatus("", "");
      }

      document.getElementById("btnCalculate").addEventListener("click", calculate);
      document.getElementById("btnReset").addEventListener("click", reset);
      document.getElementById("petType").addEventListener("change", function () {
        buildPresets();
        document.getElementById("resultSection").classList.add("hidden");
        showStatus("", "");
      });

      // 初始化预设列表
      buildPresets();

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
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
