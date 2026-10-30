// @ts-nocheck
// Generated from tools/travel/tip-guide.html
// Source SHA-256: 2a34c46615a8dfe02a8038289369c78e73625c902d31e08a9a2a21a983e0e707
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var TIP_DATA = {
        美国: {
          expectation: "expected",
          expectationText: "必须给",
          details: [
            { label: "餐厅", value: "15-20%" },
            { label: "酒吧", value: "每杯 $1-2 或 15-20%" },
            { label: "出租车", value: "15-20%" },
            { label: "酒店行李员", value: "每件 $1-2" },
            { label: "酒店客房服务", value: "每晚 $2-5" }
          ],
          note: "在美国，小费是服务人员收入的重要组成部分。不给小费被认为是非常不礼貌的行为。"
        },
        加拿大: {
          expectation: "expected",
          expectationText: "必须给",
          details: [
            { label: "餐厅", value: "15-20%" },
            { label: "酒吧", value: "15-20%" },
            { label: "出租车", value: "15%" },
            { label: "酒店", value: "$1-2 每项服务" }
          ],
          note: "加拿大的小费文化与美国类似，服务人员依赖小费作为收入的一部分。"
        },
        英国: {
          expectation: "appreciated",
          expectationText: "欢迎但非必须",
          details: [
            { label: "餐厅", value: "10-15% (如未含服务费)" },
            { label: "酒吧", value: "不需要" },
            { label: "出租车", value: "四舍五入或 10%" },
            { label: "酒店", value: "£1-2 每项服务" }
          ],
          note: "许多餐厅会在账单中包含服务费。如果已含服务费，则不需要额外给小费。"
        },
        法国: {
          expectation: "appreciated",
          expectationText: "欢迎但非必须",
          details: [
            { label: "餐厅", value: "5-10% (服务费已含)" },
            { label: "咖啡馆", value: "零钱" },
            { label: "出租车", value: "四舍五入" },
            { label: "酒店", value: "€1-2 每项服务" }
          ],
          note: "法国的账单中通常已包含服务费(service compris)。额外的小费是对优质服务的感谢。"
        },
        德国: {
          expectation: "appreciated",
          expectationText: "欢迎但非必须",
          details: [
            { label: "餐厅", value: "5-10%" },
            { label: "酒吧", value: "四舍五入" },
            { label: "出租车", value: "四舍五入或 10%" },
            { label: "酒店", value: "€1-2 每项服务" }
          ],
          note: "德国人通常会将账单四舍五入到整数或多给一点。直接告诉服务员你想支付的总金额。"
        },
        日本: {
          expectation: "not-expected",
          expectationText: "不需要",
          details: [
            { label: "餐厅", value: "不需要" },
            { label: "出租车", value: "不需要" },
            { label: "酒店", value: "不需要" },
            { label: "温泉旅馆", value: "可给心意钱(1000-3000日元)" }
          ],
          note: "在日本给小费可能被视为不礼貌。优质服务是理所当然的。如果想表示感谢，可以用双手递上一个信封。"
        },
        中国: {
          expectation: "not-expected",
          expectationText: "不需要",
          details: [
            { label: "餐厅", value: "不需要" },
            { label: "出租车", value: "不需要" },
            { label: "酒店", value: "高档酒店可给行李员 10-20元" }
          ],
          note: "中国大陆没有小费文化。在高档酒店给行李员一些小费是可以的，但不是必须的。"
        },
        韩国: {
          expectation: "not-expected",
          expectationText: "不需要",
          details: [
            { label: "餐厅", value: "不需要" },
            { label: "出租车", value: "不需要" },
            { label: "酒店", value: "高档酒店可给 1000-2000韩元" }
          ],
          note: "韩国没有小费文化，服务费通常已包含在价格中。"
        },
        泰国: {
          expectation: "appreciated",
          expectationText: "欢迎但非必须",
          details: [
            { label: "餐厅", value: "10% 或四舍五入" },
            { label: "按摩", value: "50-100泰铢" },
            { label: "出租车", value: "四舍五入" },
            { label: "酒店", value: "20-50泰铢每项服务" }
          ],
          note: "虽然不是必须的，但给小费在泰国是受欢迎的。按摩师和酒店服务人员特别期待小费。"
        },
        新加坡: {
          expectation: "not-expected",
          expectationText: "不需要",
          details: [
            { label: "餐厅", value: "不需要 (已含10%服务费)" },
            { label: "出租车", value: "不需要" },
            { label: "酒店", value: "不需要" }
          ],
          note: "新加坡的账单中通常已包含10%服务费和7%消费税(GST)。不需要额外给小费。"
        },
        澳大利亚: {
          expectation: "appreciated",
          expectationText: "欢迎但非必须",
          details: [
            { label: "餐厅", value: "10-15% (高档餐厅)" },
            { label: "咖啡馆", value: "不需要" },
            { label: "出租车", value: "四舍五入" },
            { label: "酒店", value: "不需要" }
          ],
          note: "澳大利亚的最低工资较高，小费不是必须的。在高档餐厅对优质服务给小费是受欢迎的。"
        },
        "迪拜/阿联酋": {
          expectation: "appreciated",
          expectationText: "欢迎但非必须",
          details: [
            { label: "餐厅", value: "10-15%" },
            { label: "出租车", value: "四舍五入或10迪拉姆" },
            { label: "酒店", value: "10-20迪拉姆每项服务" },
            { label: "代客泊车", value: "10-20迪拉姆" }
          ],
          note: "虽然账单中可能已含服务费，但给额外小费是常见的，特别是在豪华酒店和餐厅。"
        }
      };

      function init() {
        initTheme();
        populateCountries();
        showTipInfo();
        calculateTip();
      }

      function populateCountries() {
        var select = document.getElementById("countrySelect");
        Object.keys(TIP_DATA).forEach(function (country) {
          var option = document.createElement("option");
          option.value = country;
          option.textContent = country;
          select.appendChild(option);
        });
      }

      function showTipInfo() {
        var country = document.getElementById("countrySelect").value;
        var data = TIP_DATA[country];

        if (!data) {
          document.getElementById("tipInfo").style.display = "none";
          return;
        }

        document.getElementById("tipCountry").textContent = country;

        var expectEl = document.getElementById("tipExpectation");
        expectEl.textContent = data.expectationText;
        expectEl.className = "tip-expectation " + data.expectation;

        var detailsEl = document.getElementById("tipDetails");
        detailsEl.textContent = "";

        data.details.forEach(function (item) {
          var row = document.createElement("div");
          row.className = "tip-item";

          var label = document.createElement("span");
          label.className = "tip-item-label";
          label.textContent = item.label;
          row.appendChild(label);

          var value = document.createElement("span");
          value.className = "tip-item-value";
          value.textContent = item.value;
          row.appendChild(value);

          detailsEl.appendChild(row);
        });

        document.getElementById("tipNote").textContent = data.note;
        document.getElementById("tipInfo").style.display = "block";
      }

      function setTipPercent(percent) {
        document.getElementById("tipPercent").value = percent;

        var buttons = document.querySelectorAll(".tip-btn");
        buttons.forEach(function (btn) {
          btn.classList.remove("active");
          if (parseInt(btn.textContent) === percent) {
            btn.classList.add("active");
          }
        });

        calculateTip();
      }

      function calculateTip() {
        var bill = parseFloat(document.getElementById("billAmount").value) || 0;
        var percent = parseFloat(document.getElementById("tipPercent").value) || 0;

        var tip = bill * (percent / 100);
        var total = bill + tip;

        document.getElementById("resultBill").textContent = bill.toFixed(2);
        document.getElementById("resultTip").textContent = tip.toFixed(2);
        document.getElementById("resultTotal").textContent = total.toFixed(2);

        // Update active button
        var buttons = document.querySelectorAll(".tip-btn");
        buttons.forEach(function (btn) {
          btn.classList.remove("active");
          if (parseInt(btn.textContent) === percent) {
            btn.classList.add("active");
          }
        });
      }

      function toggleTheme() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      init();
    
