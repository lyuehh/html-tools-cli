// @ts-nocheck
// Generated from tools/education/solar-system-explorer.html
// Source SHA-256: 6a25626ba9dd14addbceece7426e5dcdab8454003a8ff2d4673487b7d778b960
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var BODIES = [
        {
          id: "sun",
          name: "太阳",
          en: "Sun",
          type: "恒星",
          emoji: "☀️",
          order: 0,
          massKg: 1.989e30,
          radiusKm: 696340,
          densityGcm3: 1.41,
          surfaceGravityMs2: 274,
          escapeVelocityKms: 617.5,
          orbitalPeriodDays: null,
          rotationPeriodDays: 25.38,
          distanceAU: 0,
          eccentricity: null,
          axialTiltDeg: 7.25,
          moons: 0,
          rings: false,
          surfaceTempK: 5778,
          desc: "太阳是太阳系的中心天体，一颗中等质量的黄矮星（G型主序星），包含太阳系总质量的 99.86%。其核心通过氢聚变为氦的核聚变反应不断产生能量，表面温度约 5778 K，核心温度高达 1500 万 K。"
        },
        {
          id: "mercury",
          name: "水星",
          en: "Mercury",
          type: "类地行星",
          emoji: "🌑",
          order: 1,
          massKg: 3.301e23,
          radiusKm: 2439.7,
          densityGcm3: 5.427,
          surfaceGravityMs2: 3.7,
          escapeVelocityKms: 4.25,
          orbitalPeriodDays: 87.97,
          rotationPeriodDays: 58.65,
          distanceAU: 0.387,
          eccentricity: 0.206,
          axialTiltDeg: 0.034,
          moons: 0,
          rings: false,
          surfaceTempK: 440,
          desc: "水星是太阳系最小的行星，也是离太阳最近的行星。它几乎没有大气层，昼夜温差极大：白天温度可达 430°C，夜间骤降至 -180°C。水星核心富含铁，铁核相对质量占比为所有行星最高。"
        },
        {
          id: "venus",
          name: "金星",
          en: "Venus",
          type: "类地行星",
          emoji: "🌕",
          order: 2,
          massKg: 4.867e24,
          radiusKm: 6051.8,
          densityGcm3: 5.243,
          surfaceGravityMs2: 8.87,
          escapeVelocityKms: 10.36,
          orbitalPeriodDays: 224.7,
          rotationPeriodDays: -243.02,
          distanceAU: 0.723,
          eccentricity: 0.007,
          axialTiltDeg: 177.4,
          moons: 0,
          rings: false,
          surfaceTempK: 737,
          desc: "金星是太阳系中最热的行星，表面平均温度约 464°C，超过水星。浓厚的二氧化碳大气产生极端温室效应。金星自转方向与大多数行星相反（逆行自转），且自转极慢，一天比一年更长。"
        },
        {
          id: "earth",
          name: "地球",
          en: "Earth",
          type: "类地行星",
          emoji: "🌍",
          order: 3,
          massKg: 5.972e24,
          radiusKm: 6371,
          densityGcm3: 5.514,
          surfaceGravityMs2: 9.807,
          escapeVelocityKms: 11.186,
          orbitalPeriodDays: 365.25,
          rotationPeriodDays: 0.9973,
          distanceAU: 1.0,
          eccentricity: 0.017,
          axialTiltDeg: 23.44,
          moons: 1,
          rings: false,
          surfaceTempK: 288,
          desc: "地球是目前已知唯一存在生命的天体，拥有液态水、大气层和磁场的完美组合。地球表面 71% 为海洋覆盖，板块构造运动持续改变地貌。地球唯一的天然卫星月球对地球的潮汐和轴倾有重要影响。"
        },
        {
          id: "mars",
          name: "火星",
          en: "Mars",
          type: "类地行星",
          emoji: "🔴",
          order: 4,
          massKg: 6.39e23,
          radiusKm: 3389.5,
          densityGcm3: 3.933,
          surfaceGravityMs2: 3.72,
          escapeVelocityKms: 5.03,
          orbitalPeriodDays: 686.97,
          rotationPeriodDays: 1.026,
          distanceAU: 1.524,
          eccentricity: 0.093,
          axialTiltDeg: 25.19,
          moons: 2,
          rings: false,
          surfaceTempK: 210,
          desc: "火星因其红色外表而得名，红色来自地表氧化铁（铁锈）。火星拥有太阳系最高的山奥林匹斯山（21 km），也有最深的峡谷水手号峡谷。火星有两颗小型卫星：福波斯和德摩斯。"
        },
        {
          id: "jupiter",
          name: "木星",
          en: "Jupiter",
          type: "气态巨行星",
          emoji: "🟤",
          order: 5,
          massKg: 1.898e27,
          radiusKm: 69911,
          densityGcm3: 1.326,
          surfaceGravityMs2: 24.79,
          escapeVelocityKms: 59.5,
          orbitalPeriodDays: 4332.59,
          rotationPeriodDays: 0.414,
          distanceAU: 5.203,
          eccentricity: 0.049,
          axialTiltDeg: 3.13,
          moons: 95,
          rings: true,
          surfaceTempK: 165,
          desc: "木星是太阳系中最大的行星，质量超过其他所有行星质量之和的 2.5 倍。其标志性的大红斑是一场持续了数百年的超级风暴。木星主要由氢和氦组成，拥有至少 95 颗已知卫星。"
        },
        {
          id: "saturn",
          name: "土星",
          en: "Saturn",
          type: "气态巨行星",
          emoji: "🪐",
          order: 6,
          massKg: 5.683e26,
          radiusKm: 58232,
          densityGcm3: 0.687,
          surfaceGravityMs2: 10.44,
          escapeVelocityKms: 35.5,
          orbitalPeriodDays: 10759.22,
          rotationPeriodDays: 0.444,
          distanceAU: 9.537,
          eccentricity: 0.057,
          axialTiltDeg: 26.73,
          moons: 146,
          rings: true,
          surfaceTempK: 134,
          desc: "土星以其壮观的光环系统著称，光环主要由冰块和岩石碎片组成，宽度可达 27 万 km 但厚度仅约 10~100 m。土星是太阳系密度最低的行星，密度低于水，理论上可以漂浮在水上。"
        },
        {
          id: "uranus",
          name: "天王星",
          en: "Uranus",
          type: "冰巨行星",
          emoji: "🔵",
          order: 7,
          massKg: 8.681e25,
          radiusKm: 25362,
          densityGcm3: 1.27,
          surfaceGravityMs2: 8.87,
          escapeVelocityKms: 21.3,
          orbitalPeriodDays: 30688.5,
          rotationPeriodDays: -0.718,
          distanceAU: 19.19,
          eccentricity: 0.046,
          axialTiltDeg: 97.77,
          moons: 27,
          rings: true,
          surfaceTempK: 76,
          desc: '天王星最显著的特征是其极端的轴倾角（97.77°），近乎"躺着"公转，可能由早期与大型天体碰撞引起。天王星是冰巨行星，内部富含水、甲烷、氨等冰质物质，大气中的甲烷使其呈现蓝绿色。'
        },
        {
          id: "neptune",
          name: "海王星",
          en: "Neptune",
          type: "冰巨行星",
          emoji: "🟦",
          order: 8,
          massKg: 1.024e26,
          radiusKm: 24622,
          densityGcm3: 1.638,
          surfaceGravityMs2: 11.15,
          escapeVelocityKms: 23.5,
          orbitalPeriodDays: 60182,
          rotationPeriodDays: 0.671,
          distanceAU: 30.07,
          eccentricity: 0.01,
          axialTiltDeg: 28.32,
          moons: 16,
          rings: true,
          surfaceTempK: 72,
          desc: "海王星是太阳系中最遥远的行星，距太阳约 30 AU。它拥有太阳系中最强的风暴，风速可达 2100 km/h。海王星最大卫星海卫一（Triton）以逆行轨道运行，可能是被俘获的柯伊伯带天体。"
        },
        {
          id: "pluto",
          name: "冥王星",
          en: "Pluto",
          type: "矮行星",
          emoji: "🟫",
          order: 9,
          massKg: 1.303e22,
          radiusKm: 1188.3,
          densityGcm3: 1.854,
          surfaceGravityMs2: 0.62,
          escapeVelocityKms: 1.21,
          orbitalPeriodDays: 90560,
          rotationPeriodDays: -6.387,
          distanceAU: 39.48,
          eccentricity: 0.249,
          axialTiltDeg: 122.53,
          moons: 5,
          rings: false,
          surfaceTempK: 44,
          desc: '冥王星于 2006 年被国际天文联合会重新划分为矮行星，位于柯伊伯带，由岩石和冰组成。2015 年新视野号探测器飞越冥王星，揭示其表面有心形氮冰平原"汤博区"，地貌异常复杂。'
        }
      ];

      var UNITS = [
        { id: "km", name: "千米 (km)", factor: 1, group: "distance" },
        { id: "AU", name: "天文单位 (AU)", factor: 1.496e8, group: "distance" },
        { id: "ly", name: "光年 (ly)", factor: 9.461e12, group: "distance" },
        { id: "pc", name: "秒差距 (pc)", factor: 3.086e13, group: "distance" },
        { id: "Rsun", name: "太阳半径 (R☉)", factor: 696340, group: "distance" },
        { id: "Rearth", name: "地球半径 (R⊕)", factor: 6371, group: "distance" },
        { id: "kg", name: "千克 (kg)", factor: 1, group: "mass" },
        { id: "Msun", name: "太阳质量 (M☉)", factor: 1.989e30, group: "mass" },
        { id: "Mearth", name: "地球质量 (M⊕)", factor: 5.972e24, group: "mass" },
        { id: "Mjup", name: "木星质量 (M♃)", factor: 1.898e27, group: "mass" },
        { id: "days", name: "地球日 (d)", factor: 1, group: "time" },
        { id: "years", name: "地球年 (yr)", factor: 365.25, group: "time" },
        { id: "hours", name: "小时 (h)", factor: 1 / 24, group: "time" },
        { id: "Myr", name: "百万年 (Myr)", factor: 365.25e6, group: "time" }
      ];

      var currentBody = BODIES[3];
      var currentMode = "detail";

      function fmtNum(n) {
        if (n === null || n === undefined) return "—";
        if (Math.abs(n) >= 1e18 || (Math.abs(n) < 0.001 && n !== 0)) {
          return n.toExponential(3);
        }
        if (Number.isInteger(n)) return n.toLocaleString("zh-CN");
        return parseFloat(n.toPrecision(5)).toLocaleString("zh-CN");
      }

      function fmtMass(kg) {
        if (kg === null) return "—";
        var earthMasses = kg / 5.972e24;
        var sunMasses = kg / 1.989e30;
        if (sunMasses >= 0.01) return sunMasses.toFixed(4) + " M☉";
        if (earthMasses >= 1) return earthMasses.toFixed(4) + " M⊕";
        return (kg / 1e22).toFixed(3) + " × 10²² kg";
      }

      function fmtPeriod(days) {
        if (days === null) return "—";
        var absDays = Math.abs(days);
        if (absDays >= 365.25) return (days / 365.25).toFixed(2) + " 年";
        if (absDays < 1) return (days * 24).toFixed(2) + " 小时";
        return absDays.toFixed(2) + " 天" + (days < 0 ? "（逆转）" : "");
      }

      function fmtTemp(K) {
        if (K === null) return "—";
        return K + " K（" + (K - 273.15).toFixed(0) + " °C）";
      }

      function buildSidebar() {
        var list = document.getElementById("sidebarList");
        list.innerHTML = "";
        BODIES.forEach(function (b) {
          var btn = document.createElement("button");
          btn.className = "sse-body-btn" + (b.id === currentBody.id ? " active" : "");
          btn.dataset.id = b.id;
          btn.innerHTML =
            '<span class="sse-body-emoji">' +
            b.emoji +
            "</span>" +
            '<div class="sse-body-meta">' +
            '<div class="sse-body-name">' +
            b.name +
            "</div>" +
            '<div class="sse-body-type">' +
            b.type +
            "</div>" +
            "</div>";
          btn.addEventListener("click", function () {
            var btnId = btn.dataset.id;
            currentBody = BODIES.find(function (x) {
              return x.id === btnId;
            });
            buildSidebar();
            renderDetail();
          });
          list.appendChild(btn);
        });
      }

      function renderDetail() {
        var b = currentBody;
        var panel = document.getElementById("detailPanel");
        var maxR = BODIES[0].radiusKm;
        var pct = Math.max(0.5, (b.radiusKm / maxR) * 100).toFixed(1);

        var params = [
          { label: "质量", value: fmtMass(b.massKg), unit: "" },
          { label: "赤道半径", value: fmtNum(b.radiusKm), unit: "km" },
          { label: "平均密度", value: fmtNum(b.densityGcm3), unit: "g/cm³" },
          { label: "表面重力", value: fmtNum(b.surfaceGravityMs2), unit: "m/s²" },
          { label: "逃逸速度", value: fmtNum(b.escapeVelocityKms), unit: "km/s" },
          {
            label: "公转周期",
            value: b.orbitalPeriodDays !== null ? fmtPeriod(b.orbitalPeriodDays) : "—",
            unit: ""
          },
          { label: "自转周期", value: fmtPeriod(b.rotationPeriodDays), unit: "" },
          { label: "距太阳", value: b.distanceAU > 0 ? fmtNum(b.distanceAU) : "—", unit: "AU" },
          {
            label: "轨道离心率",
            value: b.eccentricity !== null ? fmtNum(b.eccentricity) : "—",
            unit: ""
          },
          { label: "轴倾角", value: fmtNum(b.axialTiltDeg), unit: "°" },
          { label: "已知卫星", value: String(b.moons), unit: "颗" },
          { label: "环系统", value: b.rings ? "有" : "无", unit: "" },
          { label: "表面温度", value: fmtTemp(b.surfaceTempK), unit: "" }
        ];

        var cardsHtml = params
          .map(function (p) {
            return (
              '<div class="sse-param-card">' +
              '<div class="sse-param-label">' +
              p.label +
              "</div>" +
              '<div class="sse-param-value">' +
              p.value +
              "</div>" +
              (p.unit ? '<div class="sse-param-unit">' + p.unit + "</div>" : "") +
              "</div>"
            );
          })
          .join("");

        panel.innerHTML =
          '<div class="sse-hero">' +
          '<div class="sse-hero-emoji">' +
          b.emoji +
          "</div>" +
          '<div class="sse-hero-info">' +
          "<h2>" +
          b.name +
          "</h2>" +
          '<div class="sse-hero-en">' +
          b.en +
          " · " +
          b.type +
          "</div>" +
          "<p>" +
          b.desc +
          "</p>" +
          "</div>" +
          "</div>" +
          '<div class="sse-size-bar-wrap">' +
          '<div class="sse-size-bar-label"><span>相对半径（对比太阳）</span><span>' +
          b.radiusKm.toLocaleString("zh-CN") +
          " km</span></div>" +
          '<div class="sse-size-bar-track">' +
          '<div class="sse-size-bar-fill" style="width:' +
          pct +
          '%"></div>' +
          "</div>" +
          "</div>" +
          '<p class="sse-section-title">物理参数</p>' +
          '<div class="sse-params-grid">' +
          cardsHtml +
          "</div>";

        document.getElementById("statusMsg").textContent =
          "当前查看：" + b.name + "（" + b.en + "）";
      }

      function buildCompareRow(lbl, val) {
        return (
          '<div class="sse-compare-row"><span class="sse-compare-lbl">' +
          lbl +
          '</span><span class="sse-compare-val">' +
          val +
          "</span></div>"
        );
      }

      function renderCompare() {
        var sort = document.getElementById("compareSort").value;
        var bodies = BODIES.slice();
        if (sort === "mass") {
          bodies.sort(function (a, b) {
            return b.massKg - a.massKg;
          });
        } else if (sort === "radius") {
          bodies.sort(function (a, b) {
            return b.radiusKm - a.radiusKm;
          });
        } else if (sort === "period") {
          bodies.sort(function (a, b) {
            var pa = a.orbitalPeriodDays !== null ? Math.abs(a.orbitalPeriodDays) : 0;
            var pb = b.orbitalPeriodDays !== null ? Math.abs(b.orbitalPeriodDays) : 0;
            return pa - pb;
          });
        } else if (sort === "moons") {
          bodies.sort(function (a, b) {
            return b.moons - a.moons;
          });
        }
        var grid = document.getElementById("compareGrid");
        grid.innerHTML = bodies
          .map(function (b) {
            return (
              '<div class="sse-compare-card">' +
              '<div class="sse-compare-head">' +
              '<span class="sse-compare-emoji">' +
              b.emoji +
              "</span>" +
              '<div><div class="sse-compare-name">' +
              b.name +
              '</div><div style="font-size:0.75rem;color:var(--text-muted);font-family:var(--font-mono)">' +
              b.type +
              "</div></div>" +
              "</div>" +
              buildCompareRow("质量", fmtMass(b.massKg)) +
              buildCompareRow("半径", fmtNum(b.radiusKm) + " km") +
              buildCompareRow("密度", fmtNum(b.densityGcm3) + " g/cm³") +
              buildCompareRow("表面重力", fmtNum(b.surfaceGravityMs2) + " m/s²") +
              buildCompareRow(
                "公转周期",
                b.orbitalPeriodDays !== null ? fmtPeriod(b.orbitalPeriodDays) : "—"
              ) +
              buildCompareRow("卫星数", b.moons + " 颗") +
              buildCompareRow("距太阳", b.distanceAU > 0 ? b.distanceAU + " AU" : "—") +
              buildCompareRow("表面温度", fmtTemp(b.surfaceTempK)) +
              "</div>"
            );
          })
          .join("");
      }

      function buildConvertSelects() {
        var fromEl = document.getElementById("convFrom");
        var toEl = document.getElementById("convTo");
        var groups = { distance: "距离", mass: "质量", time: "时间" };
        ["distance", "mass", "time"].forEach(function (g) {
          var og1 = document.createElement("optgroup");
          og1.label = groups[g];
          var og2 = document.createElement("optgroup");
          og2.label = groups[g];
          UNITS.filter(function (u) {
            return u.group === g;
          }).forEach(function (u) {
            var o1 = document.createElement("option");
            o1.value = u.id;
            o1.textContent = u.name;
            og1.appendChild(o1);
            var o2 = document.createElement("option");
            o2.value = u.id;
            o2.textContent = u.name;
            og2.appendChild(o2);
          });
          fromEl.appendChild(og1);
          toEl.appendChild(og2);
        });
        fromEl.value = "AU";
        toEl.value = "km";
        doConvert();
      }

      function doConvert() {
        var val = parseFloat(document.getElementById("convInput").value);
        var fromId = document.getElementById("convFrom").value;
        var toId = document.getElementById("convTo").value;
        var fromU = UNITS.find(function (u) {
          return u.id === fromId;
        });
        var toU = UNITS.find(function (u) {
          return u.id === toId;
        });
        var resEl = document.getElementById("convResult");
        var extraEl = document.getElementById("convExtra");
        extraEl.innerHTML = "";

        if (!fromU || !toU || fromU.group !== toU.group) {
          resEl.textContent = "单位类型不匹配";
          return;
        }
        if (isNaN(val)) {
          resEl.textContent = "请输入数值";
          return;
        }
        var siVal = val * fromU.factor;
        var result = siVal / toU.factor;
        resEl.textContent = fmtNum(result) + " " + toU.id;

        if (fromU.group === "distance") {
          var km = siVal;
          var refs = [
            { label: "月球轨道半径", km: 384400 },
            { label: "地球-太阳 (1 AU)", km: 1.496e8 },
            { label: "最近恒星 (比邻星)", km: 4.013e13 }
          ];
          var html = '<p class="sse-section-title" style="margin-top:var(--space-4)">距离参考</p>';
          refs.forEach(function (r) {
            var ratio = km / r.km;
            html +=
              '<div class="sse-compare-row" style="padding:6px 0;border-bottom:1px solid var(--color-border-subtle)">' +
              '<span class="sse-compare-lbl">' +
              r.label +
              "</span>" +
              '<span class="sse-compare-val">' +
              (ratio >= 1 ? fmtNum(ratio) + " 倍" : "约 1/" + fmtNum(1 / ratio) + " 倍") +
              "</span></div>";
          });
          extraEl.innerHTML = html;
        }
      }

      function buildTh(t) {
        return (
          '<th style="text-align:left;padding:8px 12px;border-bottom:1px solid var(--color-border-subtle);color:var(--text-muted);font-size:0.75rem;text-transform:uppercase;letter-spacing:0.06em">' +
          t +
          "</th>"
        );
      }

      function buildTd(t) {
        return (
          '<td style="padding:8px 12px;border-bottom:1px solid var(--color-border-subtle);color:var(--color-text-primary)">' +
          t +
          "</td>"
        );
      }

      function buildDistanceTable() {
        var planets = BODIES.filter(function (b) {
          return b.distanceAU > 0;
        });
        var html =
          '<table style="width:100%;border-collapse:collapse;font-family:var(--font-mono);font-size:0.8125rem">' +
          "<thead><tr>" +
          buildTh("天体") +
          buildTh("距太阳 (AU)") +
          buildTh("距太阳 (km)") +
          buildTh("光到达时间") +
          buildTh("类型") +
          "</tr></thead><tbody>";
        planets.forEach(function (b) {
          var au = b.distanceAU;
          var km = au * 1.496e8;
          var lightMinutes = (km / 299792.458 / 60).toFixed(1);
          html +=
            "<tr>" +
            buildTd(b.emoji + " " + b.name) +
            buildTd(au.toFixed(3)) +
            buildTd(km.toExponential(3)) +
            buildTd(lightMinutes + " 分钟") +
            buildTd(b.type) +
            "</tr>";
        });
        html += "</tbody></table>";
        document.getElementById("distanceTable").innerHTML = html;
      }

      function setMode(mode) {
        currentMode = mode;
        document.getElementById("modeDetail").style.display = mode === "detail" ? "" : "none";
        document.getElementById("modeCompare").style.display = mode === "compare" ? "" : "none";
        document.getElementById("modeConvert").style.display = mode === "convert" ? "" : "none";
        document.getElementById("tabDetail").classList.toggle("active", mode === "detail");
        document.getElementById("tabCompare").classList.toggle("active", mode === "compare");
        document.getElementById("tabConvert").classList.toggle("active", mode === "convert");

        if (mode === "compare") renderCompare();
        if (mode === "convert") buildDistanceTable();

        var msgMap = {
          detail: "点击左侧天体查看详情",
          compare: "所有太阳系天体对比一览",
          convert: "输入数值并选择单位进行换算"
        };
        document.getElementById("statusMsg").textContent = msgMap[mode];
      }

      document.getElementById("tabDetail").addEventListener("click", function () {
        setMode("detail");
      });
      document.getElementById("tabCompare").addEventListener("click", function () {
        setMode("compare");
      });
      document.getElementById("tabConvert").addEventListener("click", function () {
        setMode("convert");
      });
      document.getElementById("compareSort").addEventListener("change", renderCompare);
      document.getElementById("convInput").addEventListener("input", doConvert);
      document.getElementById("convFrom").addEventListener("change", doConvert);
      document.getElementById("convTo").addEventListener("change", doConvert);

      buildSidebar();
      renderDetail();
      buildConvertSelects();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
