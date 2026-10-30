// @ts-nocheck
// Generated from tools/health/symptom-checker.html
// Source SHA-256: 262521b67fa025ba979c2fd81540796d0255297db8b32a2b3f9dadb917add7a8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const bodyPartData = [
        { id: "head", name: "头部", icon: "🧠" },
        { id: "eye", name: "眼睛", icon: "👁️" },
        { id: "ear", name: "耳朵", icon: "👂" },
        { id: "nose", name: "鼻子", icon: "👃" },
        { id: "throat", name: "喉咙", icon: "🗣️" },
        { id: "chest", name: "胸部", icon: "🫁" },
        { id: "stomach", name: "腹部", icon: "🤢" },
        { id: "back", name: "腰背", icon: "🔙" },
        { id: "skin", name: "皮肤", icon: "🖐️" }
      ];

      const symptomsData = {
        head: ["头痛", "头晕", "偏头痛", "记忆力下降", "失眠", "头皮痒"],
        eye: ["视力模糊", "眼睛干涩", "眼睛红肿", "畏光", "眼睛疲劳", "飞蚊症"],
        ear: ["耳鸣", "听力下降", "耳朵痛", "耳朵发痒", "眩晕"],
        nose: ["鼻塞", "流鼻涕", "打喷嚏", "鼻出血", "嗅觉减退"],
        throat: ["咽喉痛", "咳嗽", "声音嘶哑", "吞咽困难", "口干"],
        chest: ["胸闷", "胸痛", "心悸", "呼吸困难", "咳嗽"],
        stomach: ["腹痛", "腹泻", "便秘", "恶心呕吐", "胃胀", "食欲不振"],
        back: ["腰痛", "背痛", "颈椎痛", "肌肉酸痛", "关节痛"],
        skin: ["皮肤瘙痒", "皮疹", "红斑", "脱皮", "过敏", "长痘"]
      };

      const conditionsData = {
        "头痛+头晕+失眠": {
          name: "神经衰弱/压力大",
          desc: "可能与工作压力、睡眠不足有关",
          advice: "建议调整作息，适当运动放松",
          dept: "神经内科",
          level: "medium"
        },
        "头痛+恶心呕吐": {
          name: "偏头痛",
          desc: "典型的偏头痛症状",
          advice: "避免强光噪音，休息后若不缓解需就医",
          dept: "神经内科",
          level: "medium"
        },
        "头晕+心悸": {
          name: "贫血/低血压",
          desc: "可能是血压或血液问题",
          advice: "建议检查血压和血常规",
          dept: "内科",
          level: "medium"
        },
        "咳嗽+流鼻涕+咽喉痛": {
          name: "感冒",
          desc: "常见的上呼吸道感染",
          advice: "多休息多喝水，症状严重或持续超过一周需就医",
          dept: "内科",
          level: "low"
        },
        "咳嗽+胸闷+呼吸困难": {
          name: "肺部问题",
          desc: "可能是支气管炎或其他肺部疾病",
          advice: "建议尽快就医检查",
          dept: "呼吸内科",
          level: "high"
        },
        "胸痛+心悸+呼吸困难": {
          name: "心脏问题",
          desc: "可能是心血管疾病",
          advice: "立即就医！可能需要急诊",
          dept: "心内科/急诊",
          level: "emergency"
        },
        "腹痛+腹泻+恶心呕吐": {
          name: "急性肠胃炎",
          desc: "可能是饮食不洁引起",
          advice: "注意饮食，补充水分，症状严重需就医",
          dept: "消化内科",
          level: "medium"
        },
        "腹痛+便秘+胃胀": {
          name: "消化不良/便秘",
          desc: "肠道功能紊乱",
          advice: "增加膳食纤维摄入，多喝水",
          dept: "消化内科",
          level: "low"
        },
        "腰痛+肌肉酸痛": {
          name: "腰肌劳损",
          desc: "长期不良姿势或过度劳累",
          advice: "注意休息，适当运动，避免久坐",
          dept: "骨科",
          level: "low"
        },
        "皮肤瘙痒+皮疹+过敏": {
          name: "过敏性皮炎",
          desc: "可能是接触或食物过敏",
          advice: "避免接触过敏原，必要时用药",
          dept: "皮肤科",
          level: "medium"
        },
        "眼睛干涩+眼睛疲劳+视力模糊": {
          name: "干眼症/视疲劳",
          desc: "长时间用眼导致",
          advice: "减少电子屏幕使用，多眨眼，使用人工泪液",
          dept: "眼科",
          level: "low"
        },
        "鼻塞+流鼻涕+打喷嚏": {
          name: "过敏性鼻炎",
          desc: "对某些物质过敏引起",
          advice: "避免过敏原，可使用鼻喷剂",
          dept: "耳鼻喉科",
          level: "low"
        },
        "耳鸣+听力下降+眩晕": {
          name: "耳部疾病",
          desc: "可能是内耳问题",
          advice: "建议尽快就医检查",
          dept: "耳鼻喉科",
          level: "medium"
        },
        "失眠+头痛+记忆力下降": {
          name: "睡眠障碍",
          desc: "可能与压力、焦虑有关",
          advice: "改善睡眠习惯，必要时寻求专业帮助",
          dept: "神经内科/心理科",
          level: "medium"
        }
      };

      let selectedPart = null;
      let selectedSymptoms = [];

      function renderBodyParts() {
        const container = document.getElementById("bodyParts");
        container.innerHTML = bodyPartData
          .map(
            (part) => `
        <button class="body-btn ${selectedPart === part.id ? "active" : ""}" onclick="selectPart('${part.id}')">
          <span class="body-icon">${part.icon}</span>
          ${part.name}
        </button>
      `
          )
          .join("");
      }

      function selectPart(partId) {
        selectedPart = partId;
        renderBodyParts();
        renderSymptoms();
        document.getElementById("symptomsCard").style.display = "block";
        document.getElementById("selectedCard").style.display = "block";
        document.getElementById("resultCard").classList.remove("show");
      }

      function renderSymptoms() {
        const symptoms = symptomsData[selectedPart] || [];
        const container = document.getElementById("symptomsGrid");
        container.innerHTML = symptoms
          .map(
            (s) => `
        <button class="symptom-btn ${selectedSymptoms.includes(s) ? "selected" : ""}" onclick="toggleSymptom('${s}')">
          ${s}
        </button>
      `
          )
          .join("");
      }

      function toggleSymptom(symptom) {
        if (selectedSymptoms.includes(symptom)) {
          selectedSymptoms = selectedSymptoms.filter((s) => s !== symptom);
        } else {
          selectedSymptoms.push(symptom);
        }
        renderSymptoms();
        renderSelected();
      }

      function removeSymptom(symptom) {
        selectedSymptoms = selectedSymptoms.filter((s) => s !== symptom);
        renderSymptoms();
        renderSelected();
      }

      function renderSelected() {
        const container = document.getElementById("selectedSymptoms");
        if (selectedSymptoms.length === 0) {
          container.innerHTML = '<span style="color:var(--text-muted)">请选择症状...</span>';
          document.getElementById("analyzeBtn").disabled = true;
        } else {
          container.innerHTML = selectedSymptoms
            .map(
              (s) => `
          <span class="symptom-tag">
            ${s}
            <button onclick="removeSymptom('${s}')">×</button>
          </span>
        `
            )
            .join("");
          document.getElementById("analyzeBtn").disabled = false;
        }
      }

      function analyze() {
        const results = [];

        // Find matching conditions
        for (const [key, condition] of Object.entries(conditionsData)) {
          const keySymptoms = key.split("+");
          const matchCount = keySymptoms.filter((s) => selectedSymptoms.includes(s)).length;
          if (matchCount >= 2) {
            const matchPercent = Math.round((matchCount / keySymptoms.length) * 100);
            results.push({ ...condition, matchPercent, matchCount });
          }
        }

        // Sort by match percentage
        results.sort((a, b) => b.matchPercent - a.matchPercent);

        const container = document.getElementById("resultContent");

        if (results.length === 0) {
          container.innerHTML = `
          <div style="text-align:center;padding:2rem;color:var(--text-muted)">
            <div style="font-size:2rem;margin-bottom:.5rem">🤔</div>
            <div>未找到匹配的健康问题</div>
            <div style="font-size:.85rem;margin-top:.5rem">请尝试选择更多症状，或咨询专业医生</div>
          </div>
        `;
        } else {
          container.innerHTML = results
            .slice(0, 3)
            .map(
              (r) => `
          <div class="condition-item ${r.level}">
            <div class="condition-header">
              <span class="condition-name">${r.name}</span>
              <span class="condition-match ${r.matchPercent >= 70 ? "high" : "medium"}">
                匹配度 ${r.matchPercent}%
              </span>
            </div>
            <div class="condition-desc">${r.desc}</div>
            <div class="condition-advice">💡 ${r.advice}</div>
            <span class="department-tag">🏥 建议科室：${r.dept}</span>
          </div>
        `
            )
            .join("");
        }

        document.getElementById("resultCard").classList.add("show");
        document.getElementById("resultCard").scrollIntoView({ behavior: "smooth" });
      }

      // Initialize
      renderBodyParts();
      renderSelected();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
