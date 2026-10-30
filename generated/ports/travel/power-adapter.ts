// @ts-nocheck
// Generated from tools/travel/power-adapter.html
// Source SHA-256: 8b3a4366d617dde696daa9b5994b223449cdacb761b6a86c9fb37be563c459f8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // China reference: Type A/I, 220V, 50Hz
      var CHINA_PLUGS = ["A", "I"];
      var CHINA_VOLTAGE = 220;
      var CHINA_FREQUENCY = 50;

      var countries = [
        {
          code: "CN",
          name: "中国",
          nameEn: "China",
          flag: "🇨🇳",
          voltage: "220V",
          frequency: "50Hz",
          plugs: ["A", "C", "I"],
          note: "中国使用扁平两脚(A型)和斜角三脚(I型)插座"
        },
        {
          code: "US",
          name: "美国",
          nameEn: "United States",
          flag: "🇺🇸",
          voltage: "120V",
          frequency: "60Hz",
          plugs: ["A", "B"],
          note: "电压仅120V，部分电器可能需要变压器"
        },
        {
          code: "GB",
          name: "英国",
          nameEn: "United Kingdom",
          flag: "🇬🇧",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["G"],
          note: "英标三脚方插，必须使用G型转换器"
        },
        {
          code: "JP",
          name: "日本",
          nameEn: "Japan",
          flag: "🇯🇵",
          voltage: "100V",
          frequency: "50/60Hz",
          plugs: ["A", "B"],
          note: "电压仅100V，为全球最低，电热设备效率降低"
        },
        {
          code: "DE",
          name: "德国",
          nameEn: "Germany",
          flag: "🇩🇪",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆孔插座，需要C/F型转换器"
        },
        {
          code: "FR",
          name: "法国",
          nameEn: "France",
          flag: "🇫🇷",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "E"],
          note: "E型带接地针，C型欧标也可使用"
        },
        {
          code: "AU",
          name: "澳大利亚",
          nameEn: "Australia",
          flag: "🇦🇺",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["I"],
          note: "斜角扁平插头，与中国I型兼容"
        },
        {
          code: "CA",
          name: "加拿大",
          nameEn: "Canada",
          flag: "🇨🇦",
          voltage: "120V",
          frequency: "60Hz",
          plugs: ["A", "B"],
          note: "与美国标准相同，低电压"
        },
        {
          code: "KR",
          name: "韩国",
          nameEn: "South Korea",
          flag: "🇰🇷",
          voltage: "220V",
          frequency: "60Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头，频率为60Hz"
        },
        {
          code: "IN",
          name: "印度",
          nameEn: "India",
          flag: "🇮🇳",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "D", "M"],
          note: "多种插座类型并存，建议携带万能转换器"
        },
        {
          code: "SG",
          name: "新加坡",
          nameEn: "Singapore",
          flag: "🇸🇬",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["G"],
          note: "英标三脚方插，必须使用G型转换器"
        },
        {
          code: "MY",
          name: "马来西亚",
          nameEn: "Malaysia",
          flag: "🇲🇾",
          voltage: "240V",
          frequency: "50Hz",
          plugs: ["G"],
          note: "英标三脚方插"
        },
        {
          code: "TH",
          name: "泰国",
          nameEn: "Thailand",
          flag: "🇹🇭",
          voltage: "220V",
          frequency: "50Hz",
          plugs: ["A", "B", "C", "O"],
          note: "多种插座混用，A型中国插头可直接使用"
        },
        {
          code: "ID",
          name: "印度尼西亚",
          nameEn: "Indonesia",
          flag: "🇮🇩",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "VN",
          name: "越南",
          nameEn: "Vietnam",
          flag: "🇻🇳",
          voltage: "220V",
          frequency: "50Hz",
          plugs: ["A", "C", "G"],
          note: "多种插座类型，A型较常见"
        },
        {
          code: "PH",
          name: "菲律宾",
          nameEn: "Philippines",
          flag: "🇵🇭",
          voltage: "220V",
          frequency: "60Hz",
          plugs: ["A", "B", "C"],
          note: "美标和欧标混用，A型常见"
        },
        {
          code: "NZ",
          name: "新西兰",
          nameEn: "New Zealand",
          flag: "🇳🇿",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["I"],
          note: "与澳大利亚相同，I型兼容"
        },
        {
          code: "IT",
          name: "意大利",
          nameEn: "Italy",
          flag: "🇮🇹",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F", "L"],
          note: "L型为意大利特有三圆孔"
        },
        {
          code: "ES",
          name: "西班牙",
          nameEn: "Spain",
          flag: "🇪🇸",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "NL",
          name: "荷兰",
          nameEn: "Netherlands",
          flag: "🇳🇱",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "CH",
          name: "瑞士",
          nameEn: "Switzerland",
          flag: "🇨🇭",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "J"],
          note: "J型为瑞士特有，C型也可使用"
        },
        {
          code: "RU",
          name: "俄罗斯",
          nameEn: "Russia",
          flag: "🇷🇺",
          voltage: "220V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "TR",
          name: "土耳其",
          nameEn: "Turkey",
          flag: "🇹🇷",
          voltage: "220V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "BR",
          name: "巴西",
          nameEn: "Brazil",
          flag: "🇧🇷",
          voltage: "127/220V",
          frequency: "60Hz",
          plugs: ["C", "N"],
          note: "N型为巴西特有，注意确认当地电压"
        },
        {
          code: "AR",
          name: "阿根廷",
          nameEn: "Argentina",
          flag: "🇦🇷",
          voltage: "220V",
          frequency: "50Hz",
          plugs: ["C", "I"],
          note: "I型斜角插头，与中国部分兼容"
        },
        {
          code: "MX",
          name: "墨西哥",
          nameEn: "Mexico",
          flag: "🇲🇽",
          voltage: "127V",
          frequency: "60Hz",
          plugs: ["A", "B"],
          note: "与美国相同，低电压"
        },
        {
          code: "ZA",
          name: "南非",
          nameEn: "South Africa",
          flag: "🇿🇦",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "D", "M", "N"],
          note: "多种插座类型，建议万能转换器"
        },
        {
          code: "EG",
          name: "埃及",
          nameEn: "Egypt",
          flag: "🇪🇬",
          voltage: "220V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "AE",
          name: "阿联酋",
          nameEn: "United Arab Emirates",
          flag: "🇦🇪",
          voltage: "220V",
          frequency: "50Hz",
          plugs: ["C", "D", "G"],
          note: "G型英标为主，部分场所有欧标"
        },
        {
          code: "IL",
          name: "以色列",
          nameEn: "Israel",
          flag: "🇮🇱",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "H"],
          note: "H型为以色列特有，C型也可使用"
        },
        {
          code: "HK",
          name: "香港",
          nameEn: "Hong Kong",
          flag: "🇭🇰",
          voltage: "220V",
          frequency: "50Hz",
          plugs: ["G"],
          note: "英标三脚方插，必须使用G型转换器"
        },
        {
          code: "MO",
          name: "澳门",
          nameEn: "Macau",
          flag: "🇲🇴",
          voltage: "220V",
          frequency: "50Hz",
          plugs: ["G"],
          note: "英标三脚方插"
        },
        {
          code: "TW",
          name: "台湾",
          nameEn: "Taiwan",
          flag: "🇹🇼",
          voltage: "110V",
          frequency: "60Hz",
          plugs: ["A", "B"],
          note: "与美国日本类似，低电压"
        },
        {
          code: "GR",
          name: "希腊",
          nameEn: "Greece",
          flag: "🇬🇷",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "PT",
          name: "葡萄牙",
          nameEn: "Portugal",
          flag: "🇵🇹",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "SE",
          name: "瑞典",
          nameEn: "Sweden",
          flag: "🇸🇪",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "NO",
          name: "挪威",
          nameEn: "Norway",
          flag: "🇳🇴",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "DK",
          name: "丹麦",
          nameEn: "Denmark",
          flag: "🇩🇰",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "E", "F", "K"],
          note: "K型为丹麦特有，C/F型也可使用"
        },
        {
          code: "FI",
          name: "芬兰",
          nameEn: "Finland",
          flag: "🇫🇮",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "AT",
          name: "奥地利",
          nameEn: "Austria",
          flag: "🇦🇹",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "BE",
          name: "比利时",
          nameEn: "Belgium",
          flag: "🇧🇪",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "E"],
          note: "E型带接地针，C型也可使用"
        },
        {
          code: "PL",
          name: "波兰",
          nameEn: "Poland",
          flag: "🇵🇱",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "E"],
          note: "欧标圆插头"
        },
        {
          code: "CZ",
          name: "捷克",
          nameEn: "Czech Republic",
          flag: "🇨🇿",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "E"],
          note: "欧标圆插头"
        },
        {
          code: "HU",
          name: "匈牙利",
          nameEn: "Hungary",
          flag: "🇭🇺",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["C", "F"],
          note: "欧标圆插头"
        },
        {
          code: "IE",
          name: "爱尔兰",
          nameEn: "Ireland",
          flag: "🇮🇪",
          voltage: "230V",
          frequency: "50Hz",
          plugs: ["G"],
          note: "英标三脚方插"
        },
        {
          code: "SA",
          name: "沙特阿拉伯",
          nameEn: "Saudi Arabia",
          flag: "🇸🇦",
          voltage: "220V",
          frequency: "60Hz",
          plugs: ["A", "B", "G"],
          note: "多种插座类型，A型和G型常见"
        }
      ];

      // Sort countries by name
      countries.sort(function (a, b) {
        return a.name.localeCompare(b.name, "zh-CN");
      });

      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      function initCountrySelect() {
        var select = document.getElementById("countrySelect");
        countries.forEach(function (country) {
          var option = document.createElement("option");
          option.value = country.code;
          option.textContent = country.flag + " " + country.name + " (" + country.nameEn + ")";
          select.appendChild(option);
        });
      }

      function checkAdapterNeeded(country) {
        var plugsCompatible = country.plugs.some(function (plug) {
          return CHINA_PLUGS.indexOf(plug) !== -1;
        });

        var voltageNum = parseInt(country.voltage);
        var voltageCompatible = voltageNum >= 200 && voltageNum <= 240;

        if (country.voltage.indexOf("/") !== -1) {
          // Mixed voltage like Brazil
          var voltages = country.voltage.split("/").map(function (v) {
            return parseInt(v);
          });
          voltageCompatible = voltages.some(function (v) {
            return v >= 200 && v <= 240;
          });
        }

        return {
          plugsCompatible: plugsCompatible,
          voltageCompatible: voltageCompatible,
          needsAdapter: !plugsCompatible,
          needsTransformer: !voltageCompatible
        };
      }

      function displayResult(countryCode) {
        var country = countries.find(function (c) {
          return c.code === countryCode;
        });
        if (!country) {
          document.getElementById("resultArea").style.display = "none";
          return;
        }

        document.getElementById("resultArea").style.display = "block";
        document.getElementById("resultFlag").textContent = country.flag;
        document.getElementById("resultName").textContent = country.name;
        document.getElementById("resultNameEn").textContent = country.nameEn;
        document.getElementById("resultVoltage").textContent = country.voltage;
        document.getElementById("resultFrequency").textContent = country.frequency;
        document.getElementById("resultPlugs").textContent = country.plugs.join(" / ");

        var check = checkAdapterNeeded(country);
        var statusEl = document.getElementById("adapterStatus");
        var iconEl = document.getElementById("statusIcon");
        var titleEl = document.getElementById("statusTitle");
        var detailEl = document.getElementById("statusDetail");

        statusEl.className = "adapter-status";

        if (!check.needsAdapter && !check.needsTransformer) {
          statusEl.classList.add("not-needed");
          iconEl.textContent = "✅";
          titleEl.textContent = "无需转换器";
          detailEl.textContent = "中国插头可直接使用，电压兼容";
        } else if (check.needsAdapter && check.needsTransformer) {
          statusEl.classList.add("needed");
          iconEl.textContent = "⚠️";
          titleEl.textContent = "需要转换器 + 变压器";
          detailEl.textContent = "插座类型不兼容，且电压差异大，建议使用支持宽电压的设备";
        } else if (check.needsAdapter) {
          statusEl.classList.add("needed");
          iconEl.textContent = "🔌";
          titleEl.textContent = "需要转换器";
          detailEl.textContent = "插座类型不兼容，需要 " + country.plugs.join("/") + " 型转换器";
        } else {
          statusEl.classList.add("partial");
          iconEl.textContent = "⚡";
          titleEl.textContent = "需要变压器";
          detailEl.textContent =
            "插头兼容但电压不同（" + country.voltage + "），电热设备可能功率不足";
        }

        // Highlight compatible plug types
        var plugTypes = document.querySelectorAll(".plug-type");
        plugTypes.forEach(function (el) {
          var type = el.getAttribute("data-type");
          if (country.plugs.indexOf(type) !== -1) {
            el.classList.add("highlight");
          } else {
            el.classList.remove("highlight");
          }
        });

        // Show note
        var noteEl = document.getElementById("resultNote");
        var noteText = document.getElementById("noteText");
        if (country.note) {
          noteEl.style.display = "flex";
          noteText.textContent = country.note;
        } else {
          noteEl.style.display = "none";
        }

        // Update quick button active state
        var quickBtns = document.querySelectorAll(".quick-btn");
        quickBtns.forEach(function (btn) {
          if (btn.getAttribute("data-country") === countryCode) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });

        // Update select
        document.getElementById("countrySelect").value = countryCode;

        // Save to localStorage
        localStorage.setItem("powerAdapter_country", countryCode);
      }

      function showToast(msg) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Event listeners
      document.getElementById("countrySelect").addEventListener("change", function () {
        displayResult(this.value);
      });

      document.getElementById("quickButtons").addEventListener("click", function (e) {
        var btn = e.target.closest(".quick-btn");
        if (btn) {
          var code = btn.getAttribute("data-country");
          displayResult(code);
        }
      });

      // Initialize
      initCountrySelect();

      // Restore from localStorage
      var savedCountry = localStorage.getItem("powerAdapter_country");
      if (savedCountry) {
        displayResult(savedCountry);
      }
    
