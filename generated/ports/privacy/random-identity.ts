// @ts-nocheck
// Generated from tools/privacy/random-identity.html
// Source SHA-256: a26b2604df8c4e6b624ec0ce1413d80f0fb5f5aab49204e1616d307c31352f62
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var currentIdentity = {};

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
        "宇",
        "浩",
        "然",
        "俊",
        "宁",
        "峰"
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
        "萍",
        "欣",
        "怡",
        "佳",
        "雨",
        "晓"
      ];
      var provinces = [
        "北京市",
        "上海市",
        "广东省广州市",
        "江苏省南京市",
        "浙江省杭州市",
        "四川省成都市",
        "湖北省武汉市",
        "陕西省西安市",
        "山东省济南市",
        "河南省郑州市"
      ];
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
      var domains = ["qq.com", "163.com", "126.com", "gmail.com", "outlook.com", "sina.com"];
      var carriers = ["中国移动", "中国联通", "中国电信"];
      var bloodTypes = ["A", "B", "O", "AB"];
      var zodiacs = [
        "白羊座",
        "金牛座",
        "双子座",
        "巨蟹座",
        "狮子座",
        "处女座",
        "天秤座",
        "天蝎座",
        "射手座",
        "摩羯座",
        "水瓶座",
        "双鱼座"
      ];
      var educations = ["高中", "大专", "本科", "硕士研究生", "博士研究生"];
      var companies = [
        "科技有限公司",
        "网络科技有限公司",
        "信息技术有限公司",
        "电子商务有限公司",
        "软件开发有限公司"
      ];
      var jobs = [
        "软件工程师",
        "产品经理",
        "设计师",
        "数据分析师",
        "运营经理",
        "市场专员",
        "销售代表",
        "财务专员",
        "人事专员",
        "项目经理"
      ];

      function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }

      function generatePhone() {
        var prefixes = [
          "130",
          "131",
          "132",
          "133",
          "135",
          "136",
          "137",
          "138",
          "139",
          "150",
          "151",
          "152",
          "155",
          "156",
          "158",
          "159",
          "180",
          "181",
          "182",
          "183",
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

      function generateIdCard(birthYear, birthMonth, birthDay, gender) {
        var areaCodes = [
          "110101",
          "310101",
          "440106",
          "320102",
          "330102",
          "510104",
          "420102",
          "610102",
          "370102",
          "410102"
        ];
        var code = randomItem(areaCodes);
        code += birthYear;
        code += String(birthMonth).padStart(2, "0");
        code += String(birthDay).padStart(2, "0");

        // Sequence code (odd for male, even for female)
        var seq = random(10, 99);
        var lastDigit = gender === "男" ? random(0, 4) * 2 + 1 : random(0, 4) * 2;
        code += String(seq) + lastDigit;

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

      function generateEmail(name) {
        var pinyin = ["wang", "li", "zhang", "liu", "chen", "yang", "huang", "zhao", "zhou", "wu"];
        var prefix = randomItem(pinyin) + random(100, 9999);
        return prefix + "@" + randomItem(domains);
      }

      function generateIdentity() {
        var isMale = Math.random() > 0.5;
        var gender = isMale ? "男" : "女";
        var surname = randomItem(surnames);
        var namePool = isMale ? maleNames : femaleNames;
        var givenName = randomItem(namePool);
        if (Math.random() > 0.4) {
          givenName += randomItem(namePool);
        }
        var fullName = surname + givenName;

        var birthYear = random(1970, 2005);
        var birthMonth = random(1, 12);
        var birthDay = random(1, 28);
        var birthday =
          birthYear +
          "-" +
          String(birthMonth).padStart(2, "0") +
          "-" +
          String(birthDay).padStart(2, "0");

        var age = new Date().getFullYear() - birthYear;
        var zodiac = zodiacs[(birthMonth - 1) % 12];

        var province = randomItem(provinces);
        var street = randomItem(streets);
        var address =
          province + street + random(1, 500) + "号" + random(1, 30) + "栋" + random(101, 3001);

        var identity = {
          name: fullName,
          gender: gender,
          age: age,
          zodiac: zodiac,
          birthday: birthday,
          idCard: generateIdCard(birthYear, birthMonth, birthDay, gender),
          phone: generatePhone(),
          carrier: randomItem(carriers),
          email: generateEmail(fullName),
          address: address,
          bloodType: randomItem(bloodTypes) + "型",
          education: randomItem(educations),
          company: surname + randomItem(companies),
          job: randomItem(jobs),
          salary: random(8, 50) * 1000 + " 元/月"
        };

        return identity;
      }

      function renderIdentity(identity) {
        currentIdentity = identity;

        document.getElementById("avatar").textContent = identity.name[0];
        document.getElementById("name").textContent = identity.name;
        document.getElementById("genderAge").textContent =
          identity.gender + " · " + identity.age + " 岁 · " + identity.zodiac;

        var fields = [
          { label: "身份证号", key: "idCard" },
          { label: "出生日期", key: "birthday" },
          { label: "手机号码", key: "phone" },
          { label: "运营商", key: "carrier" },
          { label: "电子邮箱", key: "email" },
          { label: "血型", key: "bloodType" },
          { label: "学历", key: "education" },
          { label: "家庭住址", key: "address" },
          { label: "工作单位", key: "company" },
          { label: "职位", key: "job" },
          { label: "月薪", key: "salary" }
        ];

        var grid = document.getElementById("infoGrid");
        while (grid.firstChild) {
          grid.removeChild(grid.firstChild);
        }

        fields.forEach(function (field) {
          var item = document.createElement("div");
          item.className = "info-item";

          var label = document.createElement("div");
          label.className = "label";
          label.textContent = field.label;

          var value = document.createElement("div");
          value.className = "value";
          value.textContent = identity[field.key];

          var copyBtn = document.createElement("button");
          copyBtn.className = "copy-btn";
          copyBtn.textContent = "复制";
          copyBtn.onclick = function () {
            copyToClipboard(identity[field.key]);
          };

          item.appendChild(label);
          item.appendChild(value);
          item.appendChild(copyBtn);
          grid.appendChild(item);
        });
      }

      window.copyToClipboard = async function (text) {
        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制");
        } catch (e) {
          showStatus("复制失败");
        }
      };

      window.copyAll = function () {
        var text = "姓名: " + currentIdentity.name + "\n";
        text += "性别: " + currentIdentity.gender + "\n";
        text += "年龄: " + currentIdentity.age + "\n";
        text += "星座: " + currentIdentity.zodiac + "\n";
        text += "出生日期: " + currentIdentity.birthday + "\n";
        text += "身份证号: " + currentIdentity.idCard + "\n";
        text += "手机号码: " + currentIdentity.phone + "\n";
        text += "运营商: " + currentIdentity.carrier + "\n";
        text += "电子邮箱: " + currentIdentity.email + "\n";
        text += "血型: " + currentIdentity.bloodType + "\n";
        text += "学历: " + currentIdentity.education + "\n";
        text += "家庭住址: " + currentIdentity.address + "\n";
        text += "工作单位: " + currentIdentity.company + "\n";
        text += "职位: " + currentIdentity.job + "\n";
        text += "月薪: " + currentIdentity.salary;

        copyToClipboard(text);
      };

      window.exportJSON = function () {
        var json = JSON.stringify(currentIdentity, null, 2);
        var blob = new Blob([json], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.download = "identity.json";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        showStatus("已导出 JSON");
      };

      function showStatus(msg) {
        var statusEl = document.getElementById("status");
        statusEl.textContent = msg;
        setTimeout(function () {
          statusEl.textContent = "";
        }, 2000);
      }

      document.getElementById("btnGenerate").onclick = function () {
        renderIdentity(generateIdentity());
      };

      document.getElementById("btnCopyAll").onclick = copyAll;
      document.getElementById("btnExportJSON").onclick = exportJSON;

      // Generate initial identity
      renderIdentity(generateIdentity());

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
    
