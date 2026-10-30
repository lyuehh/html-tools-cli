// @ts-nocheck
// Generated from tools/generator/fake-data-generator.html
// Source SHA-256: 098bc30d78ce9f787fe018de35e6f4d9386547a3e06a5b37677b4897a9a6df77
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentFormat = "json";
      let generatedData = [];

      const data = {
        zh: {
          surnames: [
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
            "胡"
          ],
          names: [
            "伟",
            "芳",
            "娟",
            "秀英",
            "敏",
            "静",
            "丽",
            "强",
            "磊",
            "洋",
            "艳",
            "勇",
            "军",
            "杰",
            "娜"
          ],
          cities: ["北京", "上海", "广州", "深圳", "杭州", "南京", "武汉", "成都", "西安", "重庆"],
          districts: [
            "朝阳区",
            "海淀区",
            "浦东新区",
            "天河区",
            "南山区",
            "江干区",
            "鼓楼区",
            "武昌区"
          ],
          streets: ["中山路", "解放路", "人民路", "建设路", "和平路", "文化路", "学院路", "科技路"],
          companies: [
            "科技有限公司",
            "网络科技公司",
            "信息技术公司",
            "软件开发公司",
            "电子商务公司"
          ],
          jobs: [
            "软件工程师",
            "产品经理",
            "设计师",
            "市场经理",
            "运营专员",
            "数据分析师",
            "前端开发",
            "后端开发"
          ]
        },
        en: {
          firstNames: [
            "James",
            "John",
            "Michael",
            "David",
            "Mary",
            "Jennifer",
            "Linda",
            "Sarah",
            "Emily",
            "Jessica"
          ],
          lastNames: [
            "Smith",
            "Johnson",
            "Williams",
            "Brown",
            "Jones",
            "Garcia",
            "Miller",
            "Davis",
            "Wilson",
            "Moore"
          ],
          cities: [
            "New York",
            "Los Angeles",
            "Chicago",
            "Houston",
            "Phoenix",
            "Philadelphia",
            "San Antonio",
            "San Diego"
          ],
          streets: [
            "Main St",
            "Oak Ave",
            "Park Rd",
            "Cedar Ln",
            "Elm St",
            "Lake Dr",
            "Hill Rd",
            "River Rd"
          ],
          companies: [
            "Tech Corp",
            "Digital Solutions",
            "Web Services",
            "Cloud Systems",
            "Data Analytics Inc"
          ],
          jobs: [
            "Software Engineer",
            "Product Manager",
            "Designer",
            "Marketing Manager",
            "Data Analyst",
            "Developer"
          ]
        }
      };

      function random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }

      function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function generateName(locale) {
        if (locale === "zh") {
          return random(data.zh.surnames) + random(data.zh.names);
        }
        return random(data.en.firstNames) + " " + random(data.en.lastNames);
      }

      function generateEmail(name) {
        const domains = ["gmail.com", "qq.com", "163.com", "outlook.com", "yahoo.com"];
        const cleanName = name.replace(/\s/g, "").toLowerCase();
        return cleanName + randomInt(1, 999) + "@" + random(domains);
      }

      function generatePhone() {
        const prefixes = ["138", "139", "150", "151", "152", "158", "159", "186", "187", "188"];
        return random(prefixes) + String(randomInt(10000000, 99999999));
      }

      function generateAddress(locale) {
        if (locale === "zh") {
          return (
            random(data.zh.cities) +
            random(data.zh.districts) +
            random(data.zh.streets) +
            randomInt(1, 999) +
            "号"
          );
        }
        return randomInt(1, 9999) + " " + random(data.en.streets) + ", " + random(data.en.cities);
      }

      function generateCompany(locale) {
        const d = locale === "zh" ? data.zh : data.en;
        if (locale === "zh") {
          return (
            random(data.zh.cities) +
            random(["中", "华", "新", "美", "科", "智"]) +
            random(["创", "达", "通", "云", "数"]) +
            random(d.companies)
          );
        }
        return random(d.companies);
      }

      function generateJob(locale) {
        const d = locale === "zh" ? data.zh : data.en;
        return random(d.jobs);
      }

      function generateBirthday() {
        const year = randomInt(1970, 2005);
        const month = String(randomInt(1, 12)).padStart(2, "0");
        const day = String(randomInt(1, 28)).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      function generateIdCard() {
        const areas = [
          "110101",
          "310101",
          "440103",
          "330102",
          "320102",
          "420102",
          "510104",
          "500103"
        ];
        const year = randomInt(1970, 2005);
        const month = String(randomInt(1, 12)).padStart(2, "0");
        const day = String(randomInt(1, 28)).padStart(2, "0");
        const seq = String(randomInt(1, 999)).padStart(3, "0");
        const base = random(areas) + year + month + day + seq;

        const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const checks = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
        let sum = 0;
        for (let i = 0; i < 17; i++) {
          sum += parseInt(base[i]) * weights[i];
        }
        return base + checks[sum % 11];
      }

      function generateUsername() {
        const adj = ["cool", "super", "happy", "lucky", "fast", "smart", "good", "nice"];
        const noun = ["coder", "dev", "hacker", "ninja", "master", "guru", "pro", "king"];
        return random(adj) + "_" + random(noun) + randomInt(1, 999);
      }

      function generateIP() {
        return (
          randomInt(1, 255) +
          "." +
          randomInt(0, 255) +
          "." +
          randomInt(0, 255) +
          "." +
          randomInt(1, 254)
        );
      }

      document.querySelectorAll(".field-tag").forEach((tag) => {
        tag.addEventListener("click", () => tag.classList.toggle("active"));
      });

      function setFormat(format, btn) {
        currentFormat = format;
        document.querySelectorAll(".format-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        updateOutput();
      }

      function generate() {
        const count = parseInt(document.getElementById("count").value) || 10;
        const locale = document.getElementById("locale").value;
        const fields = Array.from(document.querySelectorAll(".field-tag.active")).map(
          (t) => t.dataset.field
        );

        generatedData = [];
        for (let i = 0; i < count; i++) {
          const item = {};
          const name = generateName(locale);

          fields.forEach((field) => {
            switch (field) {
              case "name":
                item.name = name;
                break;
              case "email":
                item.email = generateEmail(name);
                break;
              case "phone":
                item.phone = generatePhone();
                break;
              case "address":
                item.address = generateAddress(locale);
                break;
              case "company":
                item.company = generateCompany(locale);
                break;
              case "job":
                item.job = generateJob(locale);
                break;
              case "birthday":
                item.birthday = generateBirthday();
                break;
              case "idcard":
                item.idcard = generateIdCard();
                break;
              case "username":
                item.username = generateUsername();
                break;
              case "ip":
                item.ip = generateIP();
                break;
            }
          });

          generatedData.push(item);
        }

        updateOutput();
      }

      function updateOutput() {
        let output = "";

        if (currentFormat === "json") {
          output = JSON.stringify(generatedData, null, 2);
        } else if (currentFormat === "csv") {
          if (generatedData.length > 0) {
            const headers = Object.keys(generatedData[0]);
            output = headers.join(",") + "\n";
            output += generatedData
              .map((item) => headers.map((h) => `"${item[h] || ""}"`).join(","))
              .join("\n");
          }
        } else if (currentFormat === "sql") {
          if (generatedData.length > 0) {
            const headers = Object.keys(generatedData[0]);
            output = generatedData
              .map((item) => {
                const values = headers
                  .map((h) => `'${(item[h] || "").replace(/'/g, "''")}'`)
                  .join(", ");
                return `INSERT INTO users (${headers.join(", ")}) VALUES (${values});`;
              })
              .join("\n");
          }
        }

        document.getElementById("output").value = output;
      }

      function copyOutput() {
        navigator.clipboard.writeText(document.getElementById("output").value);
      }

      function downloadOutput() {
        const output = document.getElementById("output").value;
        const ext = currentFormat === "json" ? "json" : currentFormat === "csv" ? "csv" : "sql";
        const blob = new Blob([output], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `fake-data.${ext}`;
        link.click();
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
    
