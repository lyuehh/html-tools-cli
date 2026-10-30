// @ts-nocheck
// Generated from tools/chinese/stroke-order.html
// Source SHA-256: 9326ff21f07a209a7a1dd60491e6ae275c268051c09c3d6701cd5c6572844758
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 汉字数据库
      const charDatabase = {
        永: {
          strokes: 5,
          radical: "水",
          structure: "独体字",
          strokeOrder: ["点", "横折钩", "横撇", "撇", "捺"]
        },
        龙: {
          strokes: 5,
          radical: "龙",
          structure: "独体字",
          strokeOrder: ["横", "撇", "竖弯钩", "撇", "点"]
        },
        飞: {
          strokes: 3,
          radical: "飞",
          structure: "独体字",
          strokeOrder: ["横折弯钩", "撇", "点"]
        },
        爱: {
          strokes: 10,
          radical: "爫",
          structure: "上下结构",
          strokeOrder: ["撇", "点", "点", "撇", "点", "横撇", "横钩", "竖钩", "点", "点"]
        },
        国: {
          strokes: 8,
          radical: "囗",
          structure: "全包围结构",
          strokeOrder: ["竖", "横折", "横", "横", "竖", "横", "点", "横"]
        },
        学: {
          strokes: 8,
          radical: "子",
          structure: "上下结构",
          strokeOrder: ["点", "点", "撇", "点", "横撇", "横钩", "横撇", "弯钩"]
        },
        中: {
          strokes: 4,
          radical: "丨",
          structure: "独体字",
          strokeOrder: ["竖", "横折", "横", "竖"]
        },
        华: {
          strokes: 6,
          radical: "十",
          structure: "上下结构",
          strokeOrder: ["撇", "竖", "撇", "竖弯钩", "横", "竖"]
        },
        人: { strokes: 2, radical: "人", structure: "独体字", strokeOrder: ["撇", "捺"] },
        大: { strokes: 3, radical: "大", structure: "独体字", strokeOrder: ["横", "撇", "捺"] },
        小: { strokes: 3, radical: "小", structure: "独体字", strokeOrder: ["竖钩", "撇", "点"] },
        山: { strokes: 3, radical: "山", structure: "独体字", strokeOrder: ["竖", "竖折", "竖"] },
        水: {
          strokes: 4,
          radical: "水",
          structure: "独体字",
          strokeOrder: ["竖钩", "横撇", "撇", "捺"]
        },
        火: {
          strokes: 4,
          radical: "火",
          structure: "独体字",
          strokeOrder: ["点", "撇", "撇", "捺"]
        },
        土: { strokes: 3, radical: "土", structure: "独体字", strokeOrder: ["横", "竖", "横"] },
        木: {
          strokes: 4,
          radical: "木",
          structure: "独体字",
          strokeOrder: ["横", "竖", "撇", "捺"]
        },
        日: {
          strokes: 4,
          radical: "日",
          structure: "独体字",
          strokeOrder: ["竖", "横折", "横", "横"]
        },
        月: {
          strokes: 4,
          radical: "月",
          structure: "独体字",
          strokeOrder: ["撇", "横折钩", "横", "横"]
        },
        天: {
          strokes: 4,
          radical: "大",
          structure: "独体字",
          strokeOrder: ["横", "横", "撇", "捺"]
        },
        地: {
          strokes: 6,
          radical: "土",
          structure: "左右结构",
          strokeOrder: ["横", "竖", "提", "横折钩", "竖", "竖弯钩"]
        },
        上: { strokes: 3, radical: "一", structure: "独体字", strokeOrder: ["竖", "横", "横"] },
        下: { strokes: 3, radical: "一", structure: "独体字", strokeOrder: ["横", "竖", "点"] },
        心: {
          strokes: 4,
          radical: "心",
          structure: "独体字",
          strokeOrder: ["点", "卧钩", "点", "点"]
        },
        手: {
          strokes: 4,
          radical: "手",
          structure: "独体字",
          strokeOrder: ["撇", "横", "横", "竖钩"]
        },
        口: { strokes: 3, radical: "口", structure: "独体字", strokeOrder: ["竖", "横折", "横"] },
        目: {
          strokes: 5,
          radical: "目",
          structure: "独体字",
          strokeOrder: ["竖", "横折", "横", "横", "横"]
        },
        耳: {
          strokes: 6,
          radical: "耳",
          structure: "独体字",
          strokeOrder: ["横", "竖", "竖", "横", "横", "横"]
        },
        足: {
          strokes: 7,
          radical: "足",
          structure: "上下结构",
          strokeOrder: ["竖", "横折", "横", "竖", "横", "撇", "捺"]
        }
      };

      let animationTimer = null;
      let currentStrokeIndex = 0;

      function limitInput() {
        const input = document.getElementById("charInput");
        if (input.value.length > 1) {
          input.value = input.value.charAt(0);
        }
      }

      function quickQuery(char) {
        document.getElementById("charInput").value = char;
        query();
      }

      function query() {
        const char = document.getElementById("charInput").value.trim();
        const resultCard = document.getElementById("resultCard");

        if (!char) {
          resultCard.classList.add("hidden");
          return;
        }

        if (!/[\u4e00-\u9fa5]/.test(char)) {
          alert("请输入一个汉字");
          return;
        }

        resultCard.classList.remove("hidden");
        resetAnimation();

        document.getElementById("charDisplay").textContent = char;

        const charInfo = charDatabase[char];

        if (charInfo) {
          document.getElementById("strokeCount").textContent = charInfo.strokes;
          document.getElementById("radical").textContent = charInfo.radical;
          document.getElementById("structure").textContent = charInfo.structure;

          const strokeList = document.getElementById("strokeList");
          strokeList.textContent = "";

          for (let i = 0; i < charInfo.strokes; i++) {
            const item = document.createElement("div");
            item.className = "stroke-item";
            item.id = "stroke-" + i;
            item.textContent = char;

            const num = document.createElement("span");
            num.className = "num";
            num.textContent = i + 1;
            item.appendChild(num);

            strokeList.appendChild(item);
          }

          const strokeNames = document.getElementById("strokeNames");
          strokeNames.textContent = "";

          charInfo.strokeOrder.forEach((name, i) => {
            const tag = document.createElement("span");
            tag.className = "stroke-tag";

            const nameSpan = document.createElement("span");
            nameSpan.className = "name";
            nameSpan.textContent = i + 1 + ".";

            tag.appendChild(nameSpan);
            tag.appendChild(document.createTextNode(" " + name));
            strokeNames.appendChild(tag);
          });
        } else {
          const estimatedStrokes = getEstimatedStrokes(char);
          document.getElementById("strokeCount").textContent = estimatedStrokes + " (估计)";
          document.getElementById("radical").textContent = "-";
          document.getElementById("structure").textContent = "-";

          const strokeList = document.getElementById("strokeList");
          strokeList.textContent = "";

          const notice = document.createElement("div");
          notice.style.cssText = "padding: 20px; color: var(--text-secondary); text-align: center;";
          notice.textContent = "暂无该字的详细笔顺数据";
          strokeList.appendChild(notice);

          const strokeNames = document.getElementById("strokeNames");
          strokeNames.textContent = "";
        }
      }

      function getEstimatedStrokes(char) {
        const code = char.charCodeAt(0);
        return Math.floor((code - 0x4e00) / 500) + 3;
      }

      function playAnimation() {
        const char = document.getElementById("charInput").value.trim();
        const charInfo = charDatabase[char];

        if (!charInfo) return;

        resetAnimation();

        animationTimer = setInterval(() => {
          if (currentStrokeIndex < charInfo.strokes) {
            const item = document.getElementById("stroke-" + currentStrokeIndex);
            if (item) {
              item.classList.add("highlight");
            }
            currentStrokeIndex++;
          } else {
            clearInterval(animationTimer);
          }
        }, 500);
      }

      function resetAnimation() {
        if (animationTimer) {
          clearInterval(animationTimer);
        }
        currentStrokeIndex = 0;

        document.querySelectorAll(".stroke-item").forEach((item) => {
          item.classList.remove("highlight");
        });
      }

      document.getElementById("charInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") query();
      });

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
