// @ts-nocheck
// Generated from tools/life/student-grouping.html
// Source SHA-256: 16b741e0a16b5143ae94554d2d2dfebda4dd7425e0a28591833edcdbef526518
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 状态
      const state = {
        students: [],
        groups: [],
        mode: "random",
        groupColors: [
          "#3498db",
          "#27ae60",
          "#9b59b6",
          "#e67e22",
          "#1abc9c",
          "#e74c3c",
          "#34495e",
          "#f39c12",
          "#2ecc71",
          "#e91e63"
        ]
      };

      // 初始化
      document.addEventListener("DOMContentLoaded", () => {
        // 模式选择
        document.querySelectorAll(".mode-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            state.mode = btn.dataset.mode;
          });
        });

        // 分组方式切换
        document.getElementById("groupMethod").addEventListener("change", (e) => {
          const label = document.getElementById("groupValueLabel");
          const input = document.getElementById("groupValue");
          if (e.target.value === "count") {
            label.textContent = "组数";
            input.value = 4;
            input.max = 20;
          } else {
            label.textContent = "每组人数";
            input.value = 5;
            input.max = 50;
          }
        });

        // 输入变化时更新统计
        document.getElementById("studentInput").addEventListener("input", updateInputStats);

        // 加载示例数据
        loadSampleData();
      });

      function loadSampleData() {
        const sampleData = `张伟,男,92
李娜,女,88
王强,男,76
刘芳,女,95
陈明,男,82
杨丽,女,79
赵鹏,男,85
黄婷,女,91
周杰,男,73
吴敏,女,87
徐磊,男,80
孙燕,女,84
朱浩,男,78
马莉,女,90
胡涛,男,86
郭静,女,81
林峰,男,77
何雪,女,93
罗勇,男,75
郑丹,女,89`;
        document.getElementById("studentInput").value = sampleData;
        updateInputStats();
      }

      // HTML 转义函数，防止 XSS
      function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function parseStudents(input) {
        const lines = input
          .trim()
          .split("\n")
          .filter((line) => line.trim());
        const students = [];

        for (const line of lines) {
          // 尝试多种分隔符
          let parts = line.includes(",") ? line.split(",") : line.split(/\s+/);
          parts = parts.map((p) => p.trim()).filter((p) => p);

          if (parts.length === 0) continue;

          const student = {
            name: parts[0],
            gender: null,
            score: null
          };

          // 解析性别
          if (parts.length >= 2) {
            const genderPart = parts[1].toLowerCase();
            if (["男", "m", "male", "1"].includes(genderPart)) {
              student.gender = "male";
            } else if (["女", "f", "female", "0", "2"].includes(genderPart)) {
              student.gender = "female";
            }
          }

          // 解析成绩
          if (parts.length >= 3) {
            const score = parseFloat(parts[2]);
            if (!isNaN(score)) {
              student.score = score;
            }
          } else if (parts.length === 2 && student.gender === null) {
            // 可能第二个是成绩
            const score = parseFloat(parts[1]);
            if (!isNaN(score)) {
              student.score = score;
            }
          }

          students.push(student);
        }

        return students;
      }

      function updateInputStats() {
        const input = document.getElementById("studentInput").value;
        const students = parseStudents(input);
        state.students = students;

        const statsDiv = document.getElementById("inputStats");

        if (students.length === 0) {
          statsDiv.style.display = "none";
          return;
        }

        statsDiv.style.display = "flex";

        document.getElementById("totalCount").textContent = students.length;

        const males = students.filter((s) => s.gender === "male").length;
        const females = students.filter((s) => s.gender === "female").length;
        document.getElementById("maleCount").textContent = males || "-";
        document.getElementById("femaleCount").textContent = females || "-";

        const scores = students.filter((s) => s.score !== null).map((s) => s.score);
        if (scores.length > 0) {
          const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
          document.getElementById("avgScore").textContent = avg.toFixed(1);
        } else {
          document.getElementById("avgScore").textContent = "-";
        }
      }

      function shuffleArray(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
      }

      function doGrouping() {
        if (state.students.length === 0) {
          alert("请先输入学生名单");
          return;
        }

        const method = document.getElementById("groupMethod").value;
        const value = parseInt(document.getElementById("groupValue").value);

        let groupCount;
        if (method === "count") {
          groupCount = value;
        } else {
          groupCount = Math.ceil(state.students.length / value);
        }

        if (groupCount < 2) {
          alert("分组数量至少为2组");
          return;
        }

        if (groupCount > state.students.length) {
          alert("分组数量不能超过学生人数");
          return;
        }

        // 根据模式分组
        let groups;
        switch (state.mode) {
          case "gender":
            groups = groupByGender(groupCount);
            break;
          case "score":
            groups = groupByScore(groupCount);
            break;
          default:
            groups = groupRandom(groupCount);
        }

        // 指定组长
        const leaderMethod = document.getElementById("leaderMethod").value;
        if (leaderMethod !== "none") {
          assignLeaders(groups, leaderMethod);
        }

        state.groups = groups;
        renderGroups();
      }

      function groupRandom(groupCount) {
        const shuffled = shuffleArray(state.students);
        return distributeToGroups(shuffled, groupCount);
      }

      function groupByGender(groupCount) {
        const males = shuffleArray(state.students.filter((s) => s.gender === "male"));
        const females = shuffleArray(state.students.filter((s) => s.gender === "female"));
        const unknown = shuffleArray(state.students.filter((s) => s.gender === null));

        const groups = Array.from({ length: groupCount }, () => []);

        // 交替分配男女生
        let groupIndex = 0;

        while (males.length > 0 || females.length > 0 || unknown.length > 0) {
          if (males.length > 0) {
            groups[groupIndex % groupCount].push(males.pop());
            groupIndex++;
          }
          if (females.length > 0) {
            groups[groupIndex % groupCount].push(females.pop());
            groupIndex++;
          }
          if (unknown.length > 0) {
            groups[groupIndex % groupCount].push(unknown.pop());
            groupIndex++;
          }
        }

        return groups;
      }

      function groupByScore(groupCount) {
        // 按成绩排序（蛇形分配）
        const sorted = [...state.students].sort((a, b) => {
          if (a.score === null) return 1;
          if (b.score === null) return -1;
          return b.score - a.score;
        });

        const groups = Array.from({ length: groupCount }, () => []);

        // 蛇形分配确保各组成绩均衡
        let direction = 1;
        let groupIndex = 0;

        for (const student of sorted) {
          groups[groupIndex].push(student);

          groupIndex += direction;
          if (groupIndex >= groupCount) {
            groupIndex = groupCount - 1;
            direction = -1;
          } else if (groupIndex < 0) {
            groupIndex = 0;
            direction = 1;
          }
        }

        return groups;
      }

      function distributeToGroups(students, groupCount) {
        const groups = Array.from({ length: groupCount }, () => []);
        students.forEach((student, index) => {
          groups[index % groupCount].push(student);
        });
        return groups;
      }

      function assignLeaders(groups, method) {
        for (const group of groups) {
          if (group.length === 0) continue;

          let leaderIndex = 0;

          switch (method) {
            case "first":
              leaderIndex = 0;
              break;
            case "highscore":
              leaderIndex = group.reduce((maxIdx, student, idx, arr) => {
                if (student.score === null) return maxIdx;
                if (arr[maxIdx].score === null) return idx;
                return student.score > arr[maxIdx].score ? idx : maxIdx;
              }, 0);
              break;
            case "random":
              leaderIndex = Math.floor(Math.random() * group.length);
              break;
          }

          group[leaderIndex].isLeader = true;
        }
      }

      function renderGroups() {
        const container = document.getElementById("groupsContainer");
        const prefix = document.getElementById("groupPrefix").value || "";
        const suffix = document.getElementById("groupSuffix").value || "";

        if (state.groups.length === 0) {
          container.innerHTML = `
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <p>输入学生名单后点击"开始分组"</p>
                    </div>
                `;
          document.getElementById("resultActions").style.display = "none";
          return;
        }

        document.getElementById("resultActions").style.display = "flex";

        const groupsHTML = state.groups
          .map((group, index) => {
            const color = state.groupColors[index % state.groupColors.length];
            const groupName = `${prefix}${toChineseNumber(index + 1)}${suffix}`;

            // 计算组统计
            const males = group.filter((s) => s.gender === "male").length;
            const females = group.filter((s) => s.gender === "female").length;
            const scores = group.filter((s) => s.score !== null).map((s) => s.score);
            const avgScore =
              scores.length > 0
                ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
                : null;

            const membersHTML = group
              .map((student) => {
                const genderIcon =
                  student.gender === "male" ? "♂" : student.gender === "female" ? "♀" : "";
                const genderColor =
                  student.gender === "male"
                    ? "#3498db"
                    : student.gender === "female"
                      ? "#e91e63"
                      : "";
                const leaderBadge = student.isLeader ? "👑" : "";
                const scoreText = student.score !== null ? `(${student.score})` : "";
                const safeName = escapeHtml(student.name);

                return `
                        <span class="member-tag">
                            ${leaderBadge}${safeName}
                            ${genderIcon ? `<span class="gender" style="color:${genderColor}">${genderIcon}</span>` : ""}
                            ${scoreText ? `<span class="score">${scoreText}</span>` : ""}
                        </span>
                    `;
              })
              .join("");

            const statsItems = [];
            if (males > 0 || females > 0) {
              statsItems.push(`男${males} 女${females}`);
            }
            if (avgScore !== null) {
              statsItems.push(`平均分 ${avgScore}`);
            }

            return `
                    <div class="group-card" style="border-color: ${color}20">
                        <div class="group-header" style="background: ${color}">
                            <span>${groupName}</span>
                            <span class="group-count">${group.length}人</span>
                        </div>
                        <div class="group-members">
                            ${membersHTML}
                        </div>
                        ${
                          statsItems.length > 0
                            ? `
                            <div class="group-stats">
                                ${statsItems.join(" | ")}
                            </div>
                        `
                            : ""
                        }
                    </div>
                `;
          })
          .join("");

        container.innerHTML = `<div class="groups-container">${groupsHTML}</div>`;
      }

      function toChineseNumber(num) {
        const chars = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        if (num <= 10) return chars[num];
        if (num < 20) return "十" + (num % 10 === 0 ? "" : chars[num % 10]);
        if (num < 100) {
          const tens = Math.floor(num / 10);
          const ones = num % 10;
          return chars[tens] + "十" + (ones === 0 ? "" : chars[ones]);
        }
        return num.toString();
      }

      function reshuffleGroups() {
        doGrouping();
      }

      function toggleAdvanced() {
        const options = document.getElementById("advancedOptions");
        const arrow = document.getElementById("advancedArrow");
        options.classList.toggle("show");
        arrow.textContent = options.classList.contains("show") ? "▲" : "▼";
      }

      function exportResult() {
        if (state.groups.length === 0) return;

        const prefix = document.getElementById("groupPrefix").value || "";
        const suffix = document.getElementById("groupSuffix").value || "";
        const modeName = {
          random: "随机分组",
          gender: "性别均衡分组",
          score: "成绩均衡分组"
        }[state.mode];

        let content = `分组结果 - ${modeName}\n`;
        content += `生成时间：${new Date().toLocaleString()}\n`;
        content += `总人数：${state.students.length}人，共${state.groups.length}组\n`;
        content += "═".repeat(50) + "\n\n";

        state.groups.forEach((group, index) => {
          const groupName = `${prefix}${toChineseNumber(index + 1)}${suffix}`;
          content += `【${groupName}】(${group.length}人)\n`;

          group.forEach((student, idx) => {
            const leader = student.isLeader ? "[组长]" : "";
            const gender =
              student.gender === "male" ? "男" : student.gender === "female" ? "女" : "";
            const score = student.score !== null ? `(${student.score}分)` : "";
            content += `  ${idx + 1}. ${student.name} ${gender} ${score} ${leader}\n`;
          });

          // 组统计
          const males = group.filter((s) => s.gender === "male").length;
          const females = group.filter((s) => s.gender === "female").length;
          const scores = group.filter((s) => s.score !== null).map((s) => s.score);
          if (scores.length > 0) {
            const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
            content += `  [统计] 男${males} 女${females} 平均分${avg}\n`;
          } else if (males > 0 || females > 0) {
            content += `  [统计] 男${males} 女${females}\n`;
          }
          content += "\n";
        });

        // 下载文件
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `分组结果_${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
      }

      function printResult() {
        window.print();
      }

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
    
