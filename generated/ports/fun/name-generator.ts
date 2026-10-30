// @ts-nocheck
// Generated from tools/fun/name-generator.html
// Source SHA-256: a9e8e07c6147046d6e4e127f31913527f778e7aa64f127d30ac87edbf7261b74
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const data = {
        chinese: {
          surnames: [
            "王",
            "李",
            "张",
            "刘",
            "陈",
            "杨",
            "赵",
            "黄",
            "周",
            "吴",
            "徐",
            "孙",
            "胡",
            "朱",
            "高",
            "林",
            "何",
            "郭",
            "马",
            "罗"
          ],
          male: [
            "伟",
            "强",
            "磊",
            "洋",
            "勇",
            "军",
            "杰",
            "涛",
            "明",
            "超",
            "鹏",
            "辉",
            "龙",
            "华",
            "浩",
            "博",
            "宇",
            "翔",
            "峰",
            "威"
          ],
          female: [
            "芳",
            "娜",
            "静",
            "婷",
            "敏",
            "丽",
            "艳",
            "红",
            "梅",
            "燕",
            "霞",
            "琳",
            "玲",
            "雪",
            "娟",
            "萍",
            "倩",
            "欣",
            "颖",
            "蕾"
          ]
        },
        english: {
          male: [
            "James",
            "John",
            "Robert",
            "Michael",
            "William",
            "David",
            "Richard",
            "Joseph",
            "Thomas",
            "Charles",
            "Daniel",
            "Matthew",
            "Anthony",
            "Mark",
            "Donald",
            "Steven",
            "Paul",
            "Andrew",
            "Joshua",
            "Kenneth"
          ],
          female: [
            "Mary",
            "Patricia",
            "Jennifer",
            "Linda",
            "Barbara",
            "Elizabeth",
            "Susan",
            "Jessica",
            "Sarah",
            "Karen",
            "Nancy",
            "Lisa",
            "Betty",
            "Margaret",
            "Sandra",
            "Ashley",
            "Dorothy",
            "Kimberly",
            "Emily",
            "Donna"
          ],
          surnames: [
            "Smith",
            "Johnson",
            "Williams",
            "Brown",
            "Jones",
            "Garcia",
            "Miller",
            "Davis",
            "Rodriguez",
            "Martinez",
            "Hernandez",
            "Lopez",
            "Gonzalez",
            "Wilson",
            "Anderson",
            "Thomas",
            "Taylor",
            "Moore",
            "Jackson",
            "Martin"
          ]
        },
        japanese: {
          surnames: [
            "佐藤",
            "鈴木",
            "高橋",
            "田中",
            "渡辺",
            "伊藤",
            "山本",
            "中村",
            "小林",
            "加藤",
            "吉田",
            "山田",
            "佐々木",
            "山口",
            "松本",
            "井上",
            "木村",
            "林",
            "清水",
            "山崎"
          ],
          male: [
            "太郎",
            "一郎",
            "健太",
            "大輔",
            "翔太",
            "拓也",
            "達也",
            "直樹",
            "雄大",
            "和也",
            "亮",
            "翔",
            "蓮",
            "大翔",
            "悠真",
            "陽翔",
            "蒼",
            "律",
            "朝陽",
            "湊"
          ],
          female: [
            "花子",
            "美咲",
            "陽菜",
            "結衣",
            "葵",
            "咲良",
            "凛",
            "楓",
            "莉子",
            "芽依",
            "彩乃",
            "優奈",
            "愛",
            "美優",
            "心春",
            "杏",
            "紬",
            "結菜",
            "詩",
            "桜"
          ]
        }
      };

      function random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }

      function generateName(lang, gender) {
        const d = data[lang];
        const g = gender === "random" ? (Math.random() > 0.5 ? "male" : "female") : gender;

        if (lang === "chinese") {
          return random(d.surnames) + random(d[g]) + (Math.random() > 0.5 ? random(d[g]) : "");
        } else if (lang === "english") {
          return random(d[g]) + " " + random(d.surnames);
        } else {
          return random(d.surnames) + " " + random(d[g]);
        }
      }

      function generate() {
        const lang = document.getElementById("language").value;
        const gender = document.getElementById("gender").value;
        const count = Math.min(
          20,
          Math.max(1, parseInt(document.getElementById("count").value) || 5)
        );

        const names = [];
        for (let i = 0; i < count; i++) {
          names.push(generateName(lang, gender));
        }

        document.getElementById("results").innerHTML = names
          .map(
            (name) => `
                <div class="name-item">
                    <span class="name-text">${name}</span>
                    <button class="copy-btn" onclick="navigator.clipboard.writeText('${name}'); this.textContent='已复制'; setTimeout(() => this.textContent='复制', 1000)" aria-label="复制">复制</button>
                </div>
            `
          )
          .join("");
      }

      generate();

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
    
