// @ts-nocheck
// Generated from tools/generator/fake-data.html
// Source SHA-256: d4125f199104cb39eed6287692e427e382c6eafdf9b95dad259f03a4548902bf
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var outputEl = document.getElementById("output");
      var countEl = document.getElementById("count");
      var formatEl = document.getElementById("format");
      var statusEl = document.getElementById("status");
      var currentType = "person";

      // Data pools
      var surnames = [
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
        "胡",
        "朱",
        "郭",
        "何",
        "罗",
        "高",
        "林"
      ];
      var maleNames = [
        "伟",
        "强",
        "磊",
        "洋",
        "勇",
        "军",
        "杰",
        "涛",
        "超",
        "明",
        "刚",
        "平",
        "辉",
        "鹏",
        "华",
        "飞",
        "鑫",
        "波",
        "斌",
        "宇"
      ];
      var femaleNames = [
        "芳",
        "娟",
        "敏",
        "静",
        "秀",
        "丽",
        "霞",
        "燕",
        "玲",
        "娜",
        "红",
        "梅",
        "琴",
        "莉",
        "婷",
        "雪",
        "颖",
        "倩",
        "琳",
        "萍"
      ];
      var provinces = [
        "北京",
        "上海",
        "广东",
        "江苏",
        "浙江",
        "四川",
        "湖北",
        "湖南",
        "山东",
        "河南",
        "福建",
        "安徽",
        "辽宁",
        "陕西",
        "重庆"
      ];
      var cities = ["市区", "新区", "开发区", "高新区", "经济区"];
      var streets = [
        "中山路",
        "人民路",
        "解放路",
        "建设路",
        "和平路",
        "南京路",
        "长安街",
        "文化路",
        "科技路",
        "创新大道"
      ];
      var domains = [
        "qq.com",
        "163.com",
        "126.com",
        "gmail.com",
        "outlook.com",
        "sina.com",
        "foxmail.com",
        "hotmail.com"
      ];
      var companyTypes = [
        "科技",
        "网络",
        "信息",
        "软件",
        "电子",
        "通信",
        "数据",
        "智能",
        "云计算",
        "互联网"
      ];
      var companySuffixes = ["有限公司", "股份有限公司", "集团", "技术有限公司", "科技有限公司"];

      function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }

      function generateName() {
        var surname = randomItem(surnames);
        var isMale = Math.random() > 0.5;
        var namePool = isMale ? maleNames : femaleNames;
        var name = randomItem(namePool);
        if (Math.random() > 0.5) {
          name += randomItem(namePool);
        }
        return { name: surname + name, gender: isMale ? "男" : "女" };
      }

      function generateEmail() {
        var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        var name = "";
        var len = random(6, 12);
        for (var i = 0; i < len; i++) {
          name += chars[random(0, chars.length - 1)];
        }
        return name + "@" + randomItem(domains);
      }

      function generatePhone() {
        var prefixes = [
          "130",
          "131",
          "132",
          "133",
          "134",
          "135",
          "136",
          "137",
          "138",
          "139",
          "150",
          "151",
          "152",
          "153",
          "155",
          "156",
          "157",
          "158",
          "159",
          "180",
          "181",
          "182",
          "183",
          "184",
          "185",
          "186",
          "187",
          "188",
          "189"
        ];
        var phone = randomItem(prefixes);
        for (var i = 0; i < 8; i++) {
          phone += random(0, 9);
        }
        return phone;
      }

      function generateIdCard() {
        var areaCodes = [
          "110101",
          "310101",
          "440101",
          "320101",
          "330101",
          "510101",
          "420101",
          "430101",
          "370101",
          "410101"
        ];
        var code = randomItem(areaCodes);
        var year = random(1970, 2005);
        var month = String(random(1, 12)).padStart(2, "0");
        var day = String(random(1, 28)).padStart(2, "0");
        code += year + month + day;
        code += String(random(100, 999));

        // Calculate check digit
        var weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var checkCodes = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
        var sum = 0;
        for (var i = 0; i < 17; i++) {
          sum += parseInt(code[i]) * weights[i];
        }
        code += checkCodes[sum % 11];
        return code;
      }

      function generateAddress() {
        var province = randomItem(provinces);
        var city = province + randomItem(cities);
        var street = randomItem(streets);
        var number = random(1, 500) + "号";
        var building = random(1, 30) + "栋" + random(1, 30) + "层" + random(1, 10) + "室";
        return province + city + street + number + building;
      }

      function generateCompany() {
        var province = randomItem(provinces);
        var type = randomItem(companyTypes);
        var suffix = randomItem(companySuffixes);
        return province + type + suffix;
      }

      function generateIP() {
        return random(1, 255) + "." + random(0, 255) + "." + random(0, 255) + "." + random(1, 254);
      }

      function generateURL() {
        var protocols = ["http://", "https://"];
        var tlds = [".com", ".cn", ".net", ".org", ".io", ".co"];
        var chars = "abcdefghijklmnopqrstuvwxyz";
        var name = "";
        var len = random(5, 10);
        for (var i = 0; i < len; i++) {
          name += chars[random(0, chars.length - 1)];
        }
        return randomItem(protocols) + "www." + name + randomItem(tlds);
      }

      function generateDate() {
        var year = random(2000, 2024);
        var month = String(random(1, 12)).padStart(2, "0");
        var day = String(random(1, 28)).padStart(2, "0");
        return year + "-" + month + "-" + day;
      }

      function generateUUID() {
        var chars = "0123456789abcdef";
        var uuid = "";
        var pattern = [8, 4, 4, 4, 12];
        for (var p = 0; p < pattern.length; p++) {
          for (var i = 0; i < pattern[p]; i++) {
            uuid += chars[random(0, 15)];
          }
          if (p < 4) uuid += "-";
        }
        return uuid;
      }

      function generateColor() {
        var hex = "#";
        for (var i = 0; i < 6; i++) {
          hex += "0123456789ABCDEF"[random(0, 15)];
        }
        return hex;
      }

      function generatePerson() {
        var person = generateName();
        return {
          name: person.name,
          gender: person.gender,
          age: random(18, 65),
          phone: generatePhone(),
          email: generateEmail(),
          idcard: generateIdCard(),
          address: generateAddress(),
          company: generateCompany()
        };
      }

      var generators = {
        person: generatePerson,
        name: function () {
          return generateName().name;
        },
        email: generateEmail,
        phone: generatePhone,
        idcard: generateIdCard,
        address: generateAddress,
        company: generateCompany,
        ip: generateIP,
        url: generateURL,
        date: generateDate,
        uuid: generateUUID,
        color: generateColor
      };

      window.generate = function () {
        var count = parseInt(countEl.value) || 10;
        var format = formatEl.value;
        var generator = generators[currentType];

        if (count > 1000) count = 1000;

        var data = [];
        for (var i = 0; i < count; i++) {
          data.push(generator());
        }

        var output = "";

        if (format === "json") {
          output = JSON.stringify(data, null, 2);
        } else if (format === "csv") {
          if (currentType === "person") {
            var headers = [
              "name",
              "gender",
              "age",
              "phone",
              "email",
              "idcard",
              "address",
              "company"
            ];
            output = headers.join(",") + "\n";
            data.forEach(function (item) {
              output +=
                headers
                  .map(function (h) {
                    return '"' + item[h] + '"';
                  })
                  .join(",") + "\n";
            });
          } else {
            output = data.join("\n");
          }
        } else {
          if (currentType === "person") {
            data.forEach(function (item, i) {
              output += "--- #" + (i + 1) + " ---\n";
              output += "姓名: " + item.name + "\n";
              output += "性别: " + item.gender + "\n";
              output += "年龄: " + item.age + "\n";
              output += "电话: " + item.phone + "\n";
              output += "邮箱: " + item.email + "\n";
              output += "身份证: " + item.idcard + "\n";
              output += "地址: " + item.address + "\n";
              output += "公司: " + item.company + "\n\n";
            });
          } else {
            output = data.join("\n");
          }
        }

        outputEl.value = output;
        showStatus("已生成 " + count + " 条数据", "success");
      };

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // Type buttons
      document.querySelectorAll(".type-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".type-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");
          currentType = btn.getAttribute("data-type");
        });
      });

      document.getElementById("btnGenerate").onclick = generate;

      document.getElementById("btnCopy").onclick = async function () {
        if (!outputEl.value) {
          showStatus("没有内容可复制", "");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        outputEl.value = "";
        statusEl.textContent = "";
      };

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
    
