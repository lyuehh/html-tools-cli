// @ts-nocheck
// Generated from tools/travel/baggage-limit.html
// Source SHA-256: a39d54e092b236e14352f428b41eb84ea5cd123d8aec41fb27fd1317766b0e24
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const airlines = [
        {
          code: "CA",
          name: "中国国航",
          nameEn: "Air China",
          region: "中国",
          cabin: {
            economy: {
              carryOn: { weight: "10kg", size: "55×40×20cm", pieces: 1 },
              checked: { weight: "23kg", size: "三边之和≤158cm", pieces: 1, freeAllowance: "1件" }
            },
            business: {
              carryOn: { weight: "10kg", size: "55×40×20cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "10kg", size: "55×40×20cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "国内航班经济舱免费托运20kg，国际航班按计件制"
        },
        {
          code: "MU",
          name: "东方航空",
          nameEn: "China Eastern",
          region: "中国",
          cabin: {
            economy: {
              carryOn: { weight: "10kg", size: "55×40×20cm", pieces: 1 },
              checked: { weight: "23kg", size: "三边之和≤158cm", pieces: 1, freeAllowance: "1件" }
            },
            business: {
              carryOn: { weight: "10kg", size: "55×40×20cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "10kg", size: "55×40×20cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "国内航班经济舱免费托运20kg"
        },
        {
          code: "CZ",
          name: "南方航空",
          nameEn: "China Southern",
          region: "中国",
          cabin: {
            economy: {
              carryOn: { weight: "10kg", size: "55×40×20cm", pieces: 1 },
              checked: { weight: "23kg", size: "三边之和≤158cm", pieces: 1, freeAllowance: "1件" }
            },
            business: {
              carryOn: { weight: "10kg", size: "55×40×20cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "10kg", size: "55×40×20cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "国内航班经济舱免费托运20kg"
        },
        {
          code: "AA",
          name: "美国航空",
          nameEn: "American Airlines",
          region: "美国",
          cabin: {
            economy: {
              carryOn: { weight: "无限制", size: "56×36×23cm", pieces: 1 },
              checked: {
                weight: "23kg",
                size: "三边之和≤157cm",
                pieces: 0,
                freeAllowance: "需付费"
              }
            },
            business: {
              carryOn: { weight: "无限制", size: "56×36×23cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤157cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "无限制", size: "56×36×23cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤157cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "美国国内经济舱基础票不含免费托运行李"
        },
        {
          code: "UA",
          name: "联合航空",
          nameEn: "United Airlines",
          region: "美国",
          cabin: {
            economy: {
              carryOn: { weight: "无限制", size: "56×35×22cm", pieces: 1 },
              checked: {
                weight: "23kg",
                size: "三边之和≤157cm",
                pieces: 0,
                freeAllowance: "需付费"
              }
            },
            business: {
              carryOn: { weight: "无限制", size: "56×35×22cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤157cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "无限制", size: "56×35×22cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤157cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "国际航班经济舱通常含1件免费托运"
        },
        {
          code: "DL",
          name: "达美航空",
          nameEn: "Delta Airlines",
          region: "美国",
          cabin: {
            economy: {
              carryOn: { weight: "无限制", size: "56×35×23cm", pieces: 1 },
              checked: {
                weight: "23kg",
                size: "三边之和≤157cm",
                pieces: 0,
                freeAllowance: "需付费"
              }
            },
            business: {
              carryOn: { weight: "无限制", size: "56×35×23cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤157cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "无限制", size: "56×35×23cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤157cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "跨太平洋航班经济舱含1件免费托运"
        },
        {
          code: "BA",
          name: "英国航空",
          nameEn: "British Airways",
          region: "英国",
          cabin: {
            economy: {
              carryOn: { weight: "23kg", size: "56×45×25cm", pieces: 1 },
              checked: { weight: "23kg", size: "三边之和≤158cm", pieces: 1, freeAllowance: "1件" }
            },
            business: {
              carryOn: { weight: "23kg", size: "56×45×25cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "23kg", size: "56×45×25cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "Basic票价不含免费托运行李"
        },
        {
          code: "LH",
          name: "汉莎航空",
          nameEn: "Lufthansa",
          region: "德国",
          cabin: {
            economy: {
              carryOn: { weight: "8kg", size: "55×40×23cm", pieces: 1 },
              checked: { weight: "23kg", size: "三边之和≤158cm", pieces: 1, freeAllowance: "1件" }
            },
            business: {
              carryOn: { weight: "8kg", size: "55×40×23cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "8kg", size: "55×40×23cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "Light票价不含免费托运"
        },
        {
          code: "AF",
          name: "法国航空",
          nameEn: "Air France",
          region: "法国",
          cabin: {
            economy: {
              carryOn: { weight: "12kg", size: "55×35×25cm", pieces: 1 },
              checked: { weight: "23kg", size: "三边之和≤158cm", pieces: 1, freeAllowance: "1件" }
            },
            business: {
              carryOn: { weight: "18kg", size: "55×35×25cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "18kg", size: "55×35×25cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "Light票价不含免费托运"
        },
        {
          code: "EK",
          name: "阿联酋航空",
          nameEn: "Emirates",
          region: "阿联酋",
          cabin: {
            economy: {
              carryOn: { weight: "7kg", size: "55×38×20cm", pieces: 1 },
              checked: { weight: "30kg", size: "三边之和≤300cm", pieces: 1, freeAllowance: "30kg" }
            },
            business: {
              carryOn: { weight: "7kg", size: "55×38×20cm", pieces: 2 },
              checked: { weight: "40kg", size: "三边之和≤300cm", pieces: 2, freeAllowance: "40kg" }
            },
            first: {
              carryOn: { weight: "7kg", size: "55×38×20cm", pieces: 2 },
              checked: { weight: "50kg", size: "三边之和≤300cm", pieces: 2, freeAllowance: "50kg" }
            }
          },
          notes: "托运行李按重量制计算"
        },
        {
          code: "SQ",
          name: "新加坡航空",
          nameEn: "Singapore Airlines",
          region: "新加坡",
          cabin: {
            economy: {
              carryOn: { weight: "7kg", size: "55×35×25cm", pieces: 1 },
              checked: { weight: "30kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "30kg" }
            },
            business: {
              carryOn: { weight: "7kg", size: "55×35×25cm", pieces: 2 },
              checked: { weight: "40kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "40kg" }
            },
            first: {
              carryOn: { weight: "7kg", size: "55×35×25cm", pieces: 2 },
              checked: { weight: "50kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "50kg" }
            }
          },
          notes: "托运行李按重量制计算"
        },
        {
          code: "CX",
          name: "国泰航空",
          nameEn: "Cathay Pacific",
          region: "香港",
          cabin: {
            economy: {
              carryOn: { weight: "7kg", size: "56×36×23cm", pieces: 1 },
              checked: { weight: "30kg", size: "三边之和≤158cm", pieces: 1, freeAllowance: "30kg" }
            },
            business: {
              carryOn: { weight: "7kg", size: "56×36×23cm", pieces: 2 },
              checked: { weight: "40kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "40kg" }
            },
            first: {
              carryOn: { weight: "7kg", size: "56×36×23cm", pieces: 2 },
              checked: { weight: "50kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "50kg" }
            }
          },
          notes: "Light票价托运行李限额为20kg"
        },
        {
          code: "JL",
          name: "日本航空",
          nameEn: "Japan Airlines",
          region: "日本",
          cabin: {
            economy: {
              carryOn: { weight: "10kg", size: "55×40×25cm", pieces: 1 },
              checked: { weight: "23kg", size: "三边之和≤203cm", pieces: 2, freeAllowance: "2件" }
            },
            business: {
              carryOn: { weight: "10kg", size: "55×40×25cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤203cm", pieces: 3, freeAllowance: "3件" }
            },
            first: {
              carryOn: { weight: "10kg", size: "55×40×25cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤203cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "国际航班托运行李政策较为宽松"
        },
        {
          code: "NH",
          name: "全日空",
          nameEn: "All Nippon Airways",
          region: "日本",
          cabin: {
            economy: {
              carryOn: { weight: "10kg", size: "55×40×25cm", pieces: 1 },
              checked: { weight: "23kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "2件" }
            },
            business: {
              carryOn: { weight: "10kg", size: "55×40×25cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "10kg", size: "55×40×25cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "国际航班经济舱含2件免费托运"
        },
        {
          code: "KE",
          name: "大韩航空",
          nameEn: "Korean Air",
          region: "韩国",
          cabin: {
            economy: {
              carryOn: { weight: "10kg", size: "55×40×20cm", pieces: 1 },
              checked: { weight: "23kg", size: "三边之和≤158cm", pieces: 1, freeAllowance: "1件" }
            },
            business: {
              carryOn: { weight: "18kg", size: "55×40×20cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "2件" }
            },
            first: {
              carryOn: { weight: "18kg", size: "55×40×20cm", pieces: 2 },
              checked: { weight: "32kg", size: "三边之和≤158cm", pieces: 3, freeAllowance: "3件" }
            }
          },
          notes: "美洲航线经济舱含2件免费托运"
        },
        {
          code: "QR",
          name: "卡塔尔航空",
          nameEn: "Qatar Airways",
          region: "卡塔尔",
          cabin: {
            economy: {
              carryOn: { weight: "7kg", size: "50×37×25cm", pieces: 1 },
              checked: { weight: "30kg", size: "三边之和≤158cm", pieces: 1, freeAllowance: "30kg" }
            },
            business: {
              carryOn: { weight: "15kg", size: "50×37×25cm", pieces: 2 },
              checked: { weight: "40kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "40kg" }
            },
            first: {
              carryOn: { weight: "15kg", size: "50×37×25cm", pieces: 2 },
              checked: { weight: "50kg", size: "三边之和≤158cm", pieces: 2, freeAllowance: "50kg" }
            }
          },
          notes: "托运行李按重量制计算，政策较为宽松"
        }
      ];

      let selectedAirline = null;

      function toggleTheme() {
        const body = document.body;
        const isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      function filterAirlines() {
        const search = document.getElementById("searchInput").value.toLowerCase();
        const cabin = document.getElementById("cabinSelect").value;

        const filtered = airlines.filter(function (a) {
          return (
            a.name.toLowerCase().includes(search) ||
            a.nameEn.toLowerCase().includes(search) ||
            a.code.toLowerCase().includes(search) ||
            a.region.toLowerCase().includes(search)
          );
        });

        renderAirlines(filtered, cabin);
      }

      function renderAirlines(list, cabin) {
        const grid = document.getElementById("airlinesGrid");
        grid.textContent = "";

        list.forEach(function (airline) {
          const info = airline.cabin[cabin];

          const card = document.createElement("div");
          card.className = "airline-card" + (selectedAirline === airline.code ? " selected" : "");
          card.onclick = function () {
            showDetail(airline.code);
          };

          const header = document.createElement("div");
          header.className = "airline-header";

          const code = document.createElement("span");
          code.className = "airline-code";
          code.textContent = airline.code;

          const name = document.createElement("span");
          name.className = "airline-name";
          name.textContent = airline.name;

          const region = document.createElement("span");
          region.className = "airline-region";
          region.textContent = airline.region;

          header.appendChild(code);
          header.appendChild(name);
          header.appendChild(region);

          const baggageInfo = document.createElement("div");
          baggageInfo.className = "baggage-info";

          const carryOnItem = document.createElement("div");
          carryOnItem.className = "baggage-item";
          const carryOnLabel = document.createElement("div");
          carryOnLabel.className = "baggage-label";
          carryOnLabel.textContent = "手提行李";
          const carryOnValue = document.createElement("div");
          carryOnValue.className = "baggage-value";
          carryOnValue.textContent = info.carryOn.weight;
          const carryOnDetail = document.createElement("div");
          carryOnDetail.className = "baggage-detail";
          carryOnDetail.textContent = info.carryOn.size;
          carryOnItem.appendChild(carryOnLabel);
          carryOnItem.appendChild(carryOnValue);
          carryOnItem.appendChild(carryOnDetail);

          const checkedItem = document.createElement("div");
          checkedItem.className = "baggage-item";
          const checkedLabel = document.createElement("div");
          checkedLabel.className = "baggage-label";
          checkedLabel.textContent = "托运行李";
          const checkedValue = document.createElement("div");
          checkedValue.className = "baggage-value";
          checkedValue.textContent = info.checked.freeAllowance;
          const checkedDetail = document.createElement("div");
          checkedDetail.className = "baggage-detail";
          checkedDetail.textContent = "单件≤" + info.checked.weight;
          checkedItem.appendChild(checkedLabel);
          checkedItem.appendChild(checkedValue);
          checkedItem.appendChild(checkedDetail);

          baggageInfo.appendChild(carryOnItem);
          baggageInfo.appendChild(checkedItem);

          card.appendChild(header);
          card.appendChild(baggageInfo);
          grid.appendChild(card);
        });
      }

      function showDetail(code) {
        selectedAirline = code;
        var airline = airlines.find(function (a) {
          return a.code === code;
        });
        var cabin = document.getElementById("cabinSelect").value;
        var cabinNames = { economy: "经济舱", business: "商务舱", first: "头等舱" };
        var info = airline.cabin[cabin];

        var titleEl = document.getElementById("detailTitle");
        titleEl.textContent = "";
        var codeSpan = document.createElement("span");
        codeSpan.className = "airline-code";
        codeSpan.textContent = airline.code;
        titleEl.appendChild(codeSpan);
        titleEl.appendChild(
          document.createTextNode(" " + airline.name + " - " + cabinNames[cabin] + "行李规定")
        );

        var detailGrid = document.getElementById("detailGrid");
        detailGrid.textContent = "";

        var items = [
          { label: "手提行李重量", value: info.carryOn.weight },
          { label: "手提行李尺寸", value: info.carryOn.size },
          { label: "手提行李件数", value: info.carryOn.pieces + "件" },
          { label: "免费托运额度", value: info.checked.freeAllowance },
          { label: "托运单件重量上限", value: info.checked.weight },
          { label: "托运尺寸限制", value: info.checked.size }
        ];

        items.forEach(function (item) {
          var div = document.createElement("div");
          div.className = "detail-item";
          var labelDiv = document.createElement("div");
          labelDiv.className = "detail-item-label";
          labelDiv.textContent = item.label;
          var valueDiv = document.createElement("div");
          valueDiv.className = "detail-item-value";
          valueDiv.textContent = item.value;
          div.appendChild(labelDiv);
          div.appendChild(valueDiv);
          detailGrid.appendChild(div);
        });

        document.getElementById("noteBox").textContent = "⚠️ " + airline.notes;
        document.getElementById("detailPanel").classList.add("show");

        filterAirlines();
      }

      function showToast(msg) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Initialize
      filterAirlines();
    
