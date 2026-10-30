// @ts-nocheck
// Generated from tools/life/electricity-bill.html
// Source SHA-256: 721d078ceafd8403c25ac70d1954b0ed866b1bdddde6e51e67247fb80d01ef35
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 各地电价数据（2024年标准，实际应以当地最新公告为准）
      const electricityPrices = {
        default: {
          name: "全国通用",
          monthly: {
            tier1: { limit: 170, price: 0.52 },
            tier2: { limit: 260, price: 0.57 },
            tier3: { limit: Infinity, price: 0.82 }
          },
          peakValley: {
            peak: 0.56,
            valley: 0.36
          }
        },
        beijing: {
          name: "北京",
          monthly: {
            tier1: { limit: 240, price: 0.4883 },
            tier2: { limit: 400, price: 0.5383 },
            tier3: { limit: Infinity, price: 0.7883 }
          },
          peakValley: {
            peak: 0.5583,
            valley: 0.3583
          }
        },
        shanghai: {
          name: "上海",
          monthly: {
            tier1: { limit: 260, price: 0.617 },
            tier2: { limit: 400, price: 0.667 },
            tier3: { limit: Infinity, price: 0.917 }
          },
          peakValley: {
            peak: 0.617,
            valley: 0.307
          }
        },
        guangdong: {
          name: "广东",
          monthly: {
            tier1: { limit: 260, price: 0.59 },
            tier2: { limit: 600, price: 0.64 },
            tier3: { limit: Infinity, price: 0.89 }
          },
          peakValley: {
            peak: 0.9966,
            valley: 0.2966
          }
        },
        jiangsu: {
          name: "江苏",
          monthly: {
            tier1: { limit: 230, price: 0.5283 },
            tier2: { limit: 400, price: 0.5783 },
            tier3: { limit: Infinity, price: 0.8283 }
          },
          peakValley: {
            peak: 0.5583,
            valley: 0.3583
          }
        },
        zhejiang: {
          name: "浙江",
          monthly: {
            tier1: { limit: 276, price: 0.538 },
            tier2: { limit: 476, price: 0.588 },
            tier3: { limit: Infinity, price: 0.838 }
          },
          peakValley: {
            peak: 0.568,
            valley: 0.288
          }
        },
        shandong: {
          name: "山东",
          monthly: {
            tier1: { limit: 210, price: 0.5469 },
            tier2: { limit: 400, price: 0.5969 },
            tier3: { limit: Infinity, price: 0.8469 }
          },
          peakValley: {
            peak: 0.5769,
            valley: 0.3069
          }
        },
        sichuan: {
          name: "四川",
          monthly: {
            tier1: { limit: 180, price: 0.5224 },
            tier2: { limit: 280, price: 0.6224 },
            tier3: { limit: Infinity, price: 0.8224 }
          },
          peakValley: {
            peak: 0.5824,
            valley: 0.3324
          }
        },
        hubei: {
          name: "湖北",
          monthly: {
            tier1: { limit: 180, price: 0.558 },
            tier2: { limit: 400, price: 0.608 },
            tier3: { limit: Infinity, price: 0.858 }
          },
          peakValley: {
            peak: 0.598,
            valley: 0.298
          }
        },
        hunan: {
          name: "湖南",
          monthly: {
            tier1: { limit: 180, price: 0.588 },
            tier2: { limit: 350, price: 0.638 },
            tier3: { limit: Infinity, price: 0.888 }
          },
          peakValley: {
            peak: 0.618,
            valley: 0.338
          }
        },
        henan: {
          name: "河南",
          monthly: {
            tier1: { limit: 180, price: 0.56 },
            tier2: { limit: 260, price: 0.61 },
            tier3: { limit: Infinity, price: 0.86 }
          },
          peakValley: {
            peak: 0.58,
            valley: 0.3
          }
        },
        hebei: {
          name: "河北",
          monthly: {
            tier1: { limit: 170, price: 0.52 },
            tier2: { limit: 260, price: 0.57 },
            tier3: { limit: Infinity, price: 0.82 }
          },
          peakValley: {
            peak: 0.55,
            valley: 0.3
          }
        },
        fujian: {
          name: "福建",
          monthly: {
            tier1: { limit: 200, price: 0.4983 },
            tier2: { limit: 400, price: 0.5483 },
            tier3: { limit: Infinity, price: 0.7983 }
          },
          peakValley: {
            peak: 0.5383,
            valley: 0.2783
          }
        },
        anhui: {
          name: "安徽",
          monthly: {
            tier1: { limit: 180, price: 0.5653 },
            tier2: { limit: 350, price: 0.6153 },
            tier3: { limit: Infinity, price: 0.8653 }
          },
          peakValley: {
            peak: 0.5953,
            valley: 0.3053
          }
        },
        liaoning: {
          name: "辽宁",
          monthly: {
            tier1: { limit: 180, price: 0.5 },
            tier2: { limit: 280, price: 0.55 },
            tier3: { limit: Infinity, price: 0.8 }
          },
          peakValley: {
            peak: 0.54,
            valley: 0.28
          }
        },
        shaanxi: {
          name: "陕西",
          monthly: {
            tier1: { limit: 160, price: 0.4983 },
            tier2: { limit: 240, price: 0.5483 },
            tier3: { limit: Infinity, price: 0.7983 }
          },
          peakValley: {
            peak: 0.5483,
            valley: 0.2783
          }
        },
        chongqing: {
          name: "重庆",
          monthly: {
            tier1: { limit: 200, price: 0.52 },
            tier2: { limit: 400, price: 0.57 },
            tier3: { limit: Infinity, price: 0.82 }
          },
          peakValley: {
            peak: 0.57,
            valley: 0.3
          }
        },
        tianjin: {
          name: "天津",
          monthly: {
            tier1: { limit: 220, price: 0.4883 },
            tier2: { limit: 400, price: 0.5383 },
            tier3: { limit: Infinity, price: 0.7883 }
          },
          peakValley: {
            peak: 0.5383,
            valley: 0.3083
          }
        }
      };

      let currentType = "ladder";

      document.addEventListener("DOMContentLoaded", () => {
        updatePriceTable();
      });

      function switchType(type) {
        currentType = type;

        document.querySelectorAll(".type-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.type === type);
        });

        document.getElementById("ladderInput").style.display = type === "ladder" ? "block" : "none";
        document.getElementById("peakValleyInput").classList.toggle("show", type === "peakvalley");
        document.getElementById("fixedInput").style.display = type === "fixed" ? "block" : "none";
      }

      function updatePriceTable() {
        const province = document.getElementById("province").value;
        const period = document.getElementById("period").value;
        const priceData = electricityPrices[province] || electricityPrices.default;

        const multiplier = period === "yearly" ? 12 : 1;
        const tiers = priceData.monthly;

        const tableBody = document.getElementById("priceTableBody");
        tableBody.innerHTML = `
                <tr>
                    <td style="color: var(--tier1-color); font-weight: 600;">第一档</td>
                    <td>0 - ${tiers.tier1.limit * multiplier} 度</td>
                    <td>${tiers.tier1.price.toFixed(4)} 元</td>
                </tr>
                <tr>
                    <td style="color: var(--tier2-color); font-weight: 600;">第二档</td>
                    <td>${tiers.tier1.limit * multiplier + 1} - ${tiers.tier2.limit * multiplier} 度</td>
                    <td>${tiers.tier2.price.toFixed(4)} 元</td>
                </tr>
                <tr>
                    <td style="color: var(--tier3-color); font-weight: 600;">第三档</td>
                    <td>${tiers.tier2.limit * multiplier + 1} 度以上</td>
                    <td>${tiers.tier3.price.toFixed(4)} 元</td>
                </tr>
            `;

        if (priceData.peakValley) {
          tableBody.innerHTML += `
                    <tr>
                        <td colspan="3" style="background: var(--bg-color); font-weight: 600; color: var(--color-text-secondary);">
                            峰谷电价（需申请分时电表）
                        </td>
                    </tr>
                    <tr>
                        <td style="color: var(--danger-color);">峰时 (8:00-22:00)</td>
                        <td>-</td>
                        <td>${priceData.peakValley.peak.toFixed(4)} 元</td>
                    </tr>
                    <tr>
                        <td style="color: var(--success-color);">谷时 (22:00-8:00)</td>
                        <td>-</td>
                        <td>${priceData.peakValley.valley.toFixed(4)} 元</td>
                    </tr>
                `;
        }
      }

      function calculate() {
        const province = document.getElementById("province").value;
        const period = document.getElementById("period").value;
        const priceData = electricityPrices[province] || electricityPrices.default;
        const includeBaseFee = document.getElementById("includeBaseFee").checked;

        let totalUsage = 0;
        let totalBill = 0;
        let breakdownItems = [];
        const multiplier = period === "yearly" ? 12 : 1;

        switch (currentType) {
          case "ladder": {
            totalUsage = parseFloat(document.getElementById("totalUsage").value) || 0;
            if (totalUsage <= 0) {
              alert("请输入用电量");
              return;
            }

            const tiers = priceData.monthly;
            const tier1Limit = tiers.tier1.limit * multiplier;
            const tier2Limit = tiers.tier2.limit * multiplier;

            // 第一档
            const tier1Usage = Math.min(totalUsage, tier1Limit);
            const tier1Cost = tier1Usage * tiers.tier1.price;
            breakdownItems.push({
              name: "第一档",
              class: "tier-1",
              range: `0-${tier1Limit}度`,
              usage: tier1Usage,
              price: tiers.tier1.price,
              cost: tier1Cost
            });

            // 第二档
            if (totalUsage > tier1Limit) {
              const tier2Usage = Math.min(totalUsage - tier1Limit, tier2Limit - tier1Limit);
              const tier2Cost = tier2Usage * tiers.tier2.price;
              breakdownItems.push({
                name: "第二档",
                class: "tier-2",
                range: `${tier1Limit + 1}-${tier2Limit}度`,
                usage: tier2Usage,
                price: tiers.tier2.price,
                cost: tier2Cost
              });
            }

            // 第三档
            if (totalUsage > tier2Limit) {
              const tier3Usage = totalUsage - tier2Limit;
              const tier3Cost = tier3Usage * tiers.tier3.price;
              breakdownItems.push({
                name: "第三档",
                class: "tier-3",
                range: `${tier2Limit + 1}度以上`,
                usage: tier3Usage,
                price: tiers.tier3.price,
                cost: tier3Cost
              });
            }

            totalBill = breakdownItems.reduce((sum, item) => sum + item.cost, 0);
            break;
          }

          case "peakvalley": {
            const peakUsage = parseFloat(document.getElementById("peakUsage").value) || 0;
            const valleyUsage = parseFloat(document.getElementById("valleyUsage").value) || 0;
            totalUsage = peakUsage + valleyUsage;

            if (totalUsage <= 0) {
              alert("请输入用电量");
              return;
            }

            const peakPrice = priceData.peakValley?.peak || 0.56;
            const valleyPrice = priceData.peakValley?.valley || 0.36;

            const peakCost = peakUsage * peakPrice;
            const valleyCost = valleyUsage * valleyPrice;

            breakdownItems.push({
              name: "峰时用电",
              class: "tier-3",
              range: "8:00-22:00",
              usage: peakUsage,
              price: peakPrice,
              cost: peakCost
            });

            breakdownItems.push({
              name: "谷时用电",
              class: "tier-1",
              range: "22:00-8:00",
              usage: valleyUsage,
              price: valleyPrice,
              cost: valleyCost
            });

            totalBill = peakCost + valleyCost;
            break;
          }

          case "fixed": {
            totalUsage = parseFloat(document.getElementById("fixedUsage").value) || 0;
            const fixedPrice = parseFloat(document.getElementById("fixedPrice").value) || 0.52;

            if (totalUsage <= 0) {
              alert("请输入用电量");
              return;
            }

            totalBill = totalUsage * fixedPrice;
            breakdownItems.push({
              name: "固定电价",
              class: "tier-1",
              range: "统一价格",
              usage: totalUsage,
              price: fixedPrice,
              cost: totalBill
            });
            break;
          }
        }

        // 基本电费
        if (includeBaseFee) {
          const baseFee = 5;
          breakdownItems.push({
            name: "基本电费",
            class: "tier-2",
            range: "固定收取",
            usage: "-",
            price: "-",
            cost: baseFee
          });
          totalBill += baseFee;
        }

        // 显示结果
        document.getElementById("resultSection").classList.add("show");
        document.getElementById("totalBill").textContent = totalBill.toFixed(2);
        document.getElementById("totalKwh").textContent = totalUsage.toFixed(0);
        document.getElementById("avgPrice").textContent =
          totalUsage > 0 ? (totalBill / totalUsage).toFixed(4) : "0.00";
        document.getElementById("dailyAvg").textContent = (
          totalUsage / (period === "yearly" ? 365 : 30)
        ).toFixed(1);

        // 渲染明细
        const breakdownHtml = breakdownItems
          .map(
            (item) => `
                <div class="tier-item ${item.class}">
                    <div class="tier-name ${item.class}">${item.name}</div>
                    <div class="tier-range">${item.range}</div>
                    <div class="tier-usage">${typeof item.usage === "number" ? item.usage.toFixed(0) + " 度" : item.usage}</div>
                    <div class="tier-cost">¥${item.cost.toFixed(2)}</div>
                </div>
            `
          )
          .join("");
        document.getElementById("tierBreakdown").innerHTML = breakdownHtml;

        // 滚动到结果
        document.getElementById("resultSection").scrollIntoView({ behavior: "smooth" });
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
    
