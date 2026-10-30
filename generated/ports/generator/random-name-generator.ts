// @ts-nocheck
// Generated from tools/generator/random-name-generator.html
// Source SHA-256: 987e6f9205e4bb79f47d13d0f739aa829183baed5cb87cf568e4a942d54cdf12
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const chineseSurnames = [
        "王",
        "李",
        "张",
        "刘",
        "陈",
        "杨",
        "黄",
        "赵",
        "周",
        "吴",
        "徐",
        "孙",
        "马",
        "朱",
        "胡",
        "郭",
        "林",
        "何",
        "高",
        "罗"
      ];
      const chineseMaleNames = [
        "伟",
        "强",
        "磊",
        "洋",
        "勇",
        "军",
        "杰",
        "涛",
        "明",
        "辉",
        "鹏",
        "飞",
        "超",
        "宇",
        "俊",
        "浩",
        "峰",
        "华",
        "建",
        "志"
      ];
      const chineseFemaleNames = [
        "芳",
        "娟",
        "敏",
        "静",
        "丽",
        "婷",
        "雪",
        "燕",
        "玲",
        "华",
        "红",
        "梅",
        "秀",
        "英",
        "莉",
        "桂",
        "兰",
        "萍",
        "霞",
        "颖"
      ];

      const englishMaleFirstNames = [
        "James",
        "John",
        "Robert",
        "Michael",
        "William",
        "David",
        "Richard",
        "Joseph",
        "Thomas",
        "Christopher",
        "Daniel",
        "Matthew",
        "Anthony",
        "Mark",
        "Steven"
      ];
      const englishFemaleFirstNames = [
        "Mary",
        "Patricia",
        "Jennifer",
        "Linda",
        "Elizabeth",
        "Barbara",
        "Susan",
        "Jessica",
        "Sarah",
        "Karen",
        "Lisa",
        "Nancy",
        "Emily",
        "Ashley",
        "Amanda"
      ];
      const englishLastNames = [
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
        "Anderson",
        "Taylor",
        "Thomas",
        "Moore",
        "Jackson"
      ];

      function random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }

      function generateChineseName(gender) {
        const surname = random(chineseSurnames);
        const g = gender === "random" ? (Math.random() > 0.5 ? "male" : "female") : gender;
        const names = g === "male" ? chineseMaleNames : chineseFemaleNames;
        const nameLength = Math.random() > 0.5 ? 1 : 2;
        let name = "";
        for (let i = 0; i < nameLength; i++) {
          name += random(names);
        }
        return { name: surname + name, type: "中文", gender: g === "male" ? "男" : "女" };
      }

      function generateEnglishName(gender) {
        const g = gender === "random" ? (Math.random() > 0.5 ? "male" : "female") : gender;
        const firstNames = g === "male" ? englishMaleFirstNames : englishFemaleFirstNames;
        const firstName = random(firstNames);
        const lastName = random(englishLastNames);
        return {
          name: firstName + " " + lastName,
          type: "English",
          gender: g === "male" ? "男" : "女"
        };
      }

      function generate() {
        const type = document.getElementById("type").value;
        const gender = document.getElementById("gender").value;
        const count = parseInt(document.getElementById("count").value) || 10;

        const names = [];
        for (let i = 0; i < count; i++) {
          let name;
          if (type === "chinese") {
            name = generateChineseName(gender);
          } else if (type === "english") {
            name = generateEnglishName(gender);
          } else {
            name = Math.random() > 0.5 ? generateChineseName(gender) : generateEnglishName(gender);
          }
          names.push(name);
        }

        // 显示名字卡片
        document.getElementById("nameList").innerHTML = names
          .map(
            (n) => `
        <div class="name-item" onclick="copyName('${n.name}')">
          <div class="name">${n.name}</div>
          <div class="type">${n.type} · ${n.gender}</div>
        </div>
      `
          )
          .join("");

        // 显示文本列表
        document.getElementById("output").value = names.map((n) => n.name).join("\n");
      }

      function copyName(name) {
        navigator.clipboard.writeText(name).then(() => {
          document.getElementById("status").textContent = "已复制: " + name;
          setTimeout(() => (document.getElementById("status").textContent = ""), 2000);
        });
      }

      function copyText() {
        const text = document.getElementById("output").value;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          document.getElementById("status").textContent = "已复制全部姓名";
          setTimeout(() => (document.getElementById("status").textContent = ""), 2000);
        });
      }

      generate();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
