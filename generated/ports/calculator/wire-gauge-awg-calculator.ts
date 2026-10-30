// @ts-nocheck
// Generated from tools/calculator/wire-gauge-awg-calculator.html
// Source SHA-256: 6847d987d47ee10172f2dde213f04f001cc085a1e7b3330951a5d619387fa51c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // AWG 数据表
      // 参考：NEC 310 表、UL508A、MIL-W-22759 等工业标准
      // diam_mm: 导线直径（毫米）
      // mm2: 截面积（平方毫米）
      // kcmil: 千圆密耳
      // dcr_mohm_m: 直流电阻 mΩ/m（20°C，铜）
      // amp_chassis, amp_bundled, amp_free: 安培容量（机箱 / 束线 / 自由空气）
      var AWG_DATA = [
        {
          awg: "4/0",
          diam_mm: 11.684,
          mm2: 107.22,
          kcmil: 211.6,
          dcr_mohm_m: 0.1608,
          amp_chassis: 230,
          amp_bundled: 195,
          amp_free: 260
        },
        {
          awg: "3/0",
          diam_mm: 10.405,
          mm2: 85.01,
          kcmil: 167.8,
          dcr_mohm_m: 0.2028,
          amp_chassis: 200,
          amp_bundled: 165,
          amp_free: 225
        },
        {
          awg: "2/0",
          diam_mm: 9.266,
          mm2: 67.43,
          kcmil: 133.1,
          dcr_mohm_m: 0.2557,
          amp_chassis: 175,
          amp_bundled: 145,
          amp_free: 195
        },
        {
          awg: "1/0",
          diam_mm: 8.252,
          mm2: 53.49,
          kcmil: 105.5,
          dcr_mohm_m: 0.3224,
          amp_chassis: 150,
          amp_bundled: 125,
          amp_free: 170
        },
        {
          awg: "1",
          diam_mm: 7.348,
          mm2: 42.41,
          kcmil: 83.69,
          dcr_mohm_m: 0.4066,
          amp_chassis: 130,
          amp_bundled: 110,
          amp_free: 150
        },
        {
          awg: "2",
          diam_mm: 6.544,
          mm2: 33.63,
          kcmil: 66.37,
          dcr_mohm_m: 0.5127,
          amp_chassis: 115,
          amp_bundled: 95,
          amp_free: 130
        },
        {
          awg: "3",
          diam_mm: 5.827,
          mm2: 26.67,
          kcmil: 52.63,
          dcr_mohm_m: 0.6465,
          amp_chassis: 100,
          amp_bundled: 85,
          amp_free: 110
        },
        {
          awg: "4",
          diam_mm: 5.189,
          mm2: 21.15,
          kcmil: 41.74,
          dcr_mohm_m: 0.8152,
          amp_chassis: 85,
          amp_bundled: 70,
          amp_free: 95
        },
        {
          awg: "5",
          diam_mm: 4.621,
          mm2: 16.77,
          kcmil: 33.1,
          dcr_mohm_m: 1.028,
          amp_chassis: 70,
          amp_bundled: 60,
          amp_free: 85
        },
        {
          awg: "6",
          diam_mm: 4.115,
          mm2: 13.3,
          kcmil: 26.25,
          dcr_mohm_m: 1.296,
          amp_chassis: 60,
          amp_bundled: 50,
          amp_free: 75
        },
        {
          awg: "7",
          diam_mm: 3.665,
          mm2: 10.55,
          kcmil: 20.82,
          dcr_mohm_m: 1.634,
          amp_chassis: 50,
          amp_bundled: 44,
          amp_free: 65
        },
        {
          awg: "8",
          diam_mm: 3.264,
          mm2: 8.37,
          kcmil: 16.51,
          dcr_mohm_m: 2.061,
          amp_chassis: 40,
          amp_bundled: 35,
          amp_free: 55
        },
        {
          awg: "9",
          diam_mm: 2.906,
          mm2: 6.63,
          kcmil: 13.09,
          dcr_mohm_m: 2.599,
          amp_chassis: 35,
          amp_bundled: 30,
          amp_free: 45
        },
        {
          awg: "10",
          diam_mm: 2.588,
          mm2: 5.26,
          kcmil: 10.38,
          dcr_mohm_m: 3.277,
          amp_chassis: 30,
          amp_bundled: 25,
          amp_free: 40
        },
        {
          awg: "11",
          diam_mm: 2.305,
          mm2: 4.17,
          kcmil: 8.234,
          dcr_mohm_m: 4.132,
          amp_chassis: 25,
          amp_bundled: 22,
          amp_free: 33
        },
        {
          awg: "12",
          diam_mm: 2.053,
          mm2: 3.31,
          kcmil: 6.53,
          dcr_mohm_m: 5.211,
          amp_chassis: 20,
          amp_bundled: 17.5,
          amp_free: 27
        },
        {
          awg: "13",
          diam_mm: 1.828,
          mm2: 2.63,
          kcmil: 5.178,
          dcr_mohm_m: 6.571,
          amp_chassis: 17,
          amp_bundled: 15,
          amp_free: 23
        },
        {
          awg: "14",
          diam_mm: 1.628,
          mm2: 2.08,
          kcmil: 4.107,
          dcr_mohm_m: 8.286,
          amp_chassis: 15,
          amp_bundled: 13,
          amp_free: 20
        },
        {
          awg: "15",
          diam_mm: 1.45,
          mm2: 1.65,
          kcmil: 3.257,
          dcr_mohm_m: 10.45,
          amp_chassis: 12,
          amp_bundled: 11,
          amp_free: 17
        },
        {
          awg: "16",
          diam_mm: 1.291,
          mm2: 1.31,
          kcmil: 2.583,
          dcr_mohm_m: 13.17,
          amp_chassis: 10,
          amp_bundled: 8.5,
          amp_free: 13
        },
        {
          awg: "17",
          diam_mm: 1.15,
          mm2: 1.04,
          kcmil: 2.048,
          dcr_mohm_m: 16.61,
          amp_chassis: 7.5,
          amp_bundled: 7,
          amp_free: 11
        },
        {
          awg: "18",
          diam_mm: 1.024,
          mm2: 0.823,
          kcmil: 1.624,
          dcr_mohm_m: 20.95,
          amp_chassis: 5,
          amp_bundled: 5.5,
          amp_free: 9
        },
        {
          awg: "19",
          diam_mm: 0.912,
          mm2: 0.653,
          kcmil: 1.288,
          dcr_mohm_m: 26.42,
          amp_chassis: 4,
          amp_bundled: 4.5,
          amp_free: 7
        },
        {
          awg: "20",
          diam_mm: 0.812,
          mm2: 0.518,
          kcmil: 1.022,
          dcr_mohm_m: 33.31,
          amp_chassis: 3.5,
          amp_bundled: 3.5,
          amp_free: 5
        },
        {
          awg: "21",
          diam_mm: 0.723,
          mm2: 0.41,
          kcmil: 0.8101,
          dcr_mohm_m: 42.0,
          amp_chassis: 2.5,
          amp_bundled: 3,
          amp_free: 4
        },
        {
          awg: "22",
          diam_mm: 0.644,
          mm2: 0.326,
          kcmil: 0.6424,
          dcr_mohm_m: 52.96,
          amp_chassis: 2,
          amp_bundled: 2.5,
          amp_free: 3.5
        },
        {
          awg: "23",
          diam_mm: 0.573,
          mm2: 0.258,
          kcmil: 0.5093,
          dcr_mohm_m: 66.79,
          amp_chassis: 1.5,
          amp_bundled: 2,
          amp_free: 2.7
        },
        {
          awg: "24",
          diam_mm: 0.511,
          mm2: 0.205,
          kcmil: 0.404,
          dcr_mohm_m: 84.22,
          amp_chassis: 1.2,
          amp_bundled: 1.5,
          amp_free: 2.1
        },
        {
          awg: "25",
          diam_mm: 0.455,
          mm2: 0.162,
          kcmil: 0.3204,
          dcr_mohm_m: 106.2,
          amp_chassis: 1.0,
          amp_bundled: 1.2,
          amp_free: 1.6
        },
        {
          awg: "26",
          diam_mm: 0.405,
          mm2: 0.129,
          kcmil: 0.2541,
          dcr_mohm_m: 133.9,
          amp_chassis: 0.8,
          amp_bundled: 1.0,
          amp_free: 1.3
        },
        {
          awg: "27",
          diam_mm: 0.361,
          mm2: 0.102,
          kcmil: 0.2015,
          dcr_mohm_m: 168.9,
          amp_chassis: 0.6,
          amp_bundled: 0.8,
          amp_free: 1.0
        },
        {
          awg: "28",
          diam_mm: 0.321,
          mm2: 0.081,
          kcmil: 0.1598,
          dcr_mohm_m: 212.9,
          amp_chassis: 0.5,
          amp_bundled: 0.7,
          amp_free: 0.8
        },
        {
          awg: "29",
          diam_mm: 0.286,
          mm2: 0.0642,
          kcmil: 0.1267,
          dcr_mohm_m: 268.5,
          amp_chassis: 0.4,
          amp_bundled: 0.5,
          amp_free: 0.7
        },
        {
          awg: "30",
          diam_mm: 0.255,
          mm2: 0.0509,
          kcmil: 0.1005,
          dcr_mohm_m: 338.6,
          amp_chassis: 0.3,
          amp_bundled: 0.4,
          amp_free: 0.5
        },
        {
          awg: "31",
          diam_mm: 0.227,
          mm2: 0.0404,
          kcmil: 0.0797,
          dcr_mohm_m: 426.9,
          amp_chassis: 0.25,
          amp_bundled: 0.32,
          amp_free: 0.4
        },
        {
          awg: "32",
          diam_mm: 0.202,
          mm2: 0.032,
          kcmil: 0.0632,
          dcr_mohm_m: 538.3,
          amp_chassis: 0.2,
          amp_bundled: 0.26,
          amp_free: 0.32
        },
        {
          awg: "33",
          diam_mm: 0.18,
          mm2: 0.0254,
          kcmil: 0.0501,
          dcr_mohm_m: 678.8,
          amp_chassis: 0.15,
          amp_bundled: 0.21,
          amp_free: 0.26
        },
        {
          awg: "34",
          diam_mm: 0.16,
          mm2: 0.0201,
          kcmil: 0.0398,
          dcr_mohm_m: 855.9,
          amp_chassis: 0.12,
          amp_bundled: 0.17,
          amp_free: 0.21
        },
        {
          awg: "35",
          diam_mm: 0.143,
          mm2: 0.016,
          kcmil: 0.0315,
          dcr_mohm_m: 1079,
          amp_chassis: 0.1,
          amp_bundled: 0.13,
          amp_free: 0.17
        },
        {
          awg: "36",
          diam_mm: 0.127,
          mm2: 0.0127,
          kcmil: 0.025,
          dcr_mohm_m: 1361,
          amp_chassis: 0.08,
          amp_bundled: 0.11,
          amp_free: 0.13
        },
        {
          awg: "37",
          diam_mm: 0.113,
          mm2: 0.01,
          kcmil: 0.0198,
          dcr_mohm_m: 1716,
          amp_chassis: 0.06,
          amp_bundled: 0.09,
          amp_free: 0.1
        },
        {
          awg: "38",
          diam_mm: 0.101,
          mm2: 0.00797,
          kcmil: 0.0157,
          dcr_mohm_m: 2164,
          amp_chassis: 0.05,
          amp_bundled: 0.07,
          amp_free: 0.08
        },
        {
          awg: "39",
          diam_mm: 0.0897,
          mm2: 0.00632,
          kcmil: 0.01247,
          dcr_mohm_m: 2729,
          amp_chassis: 0.04,
          amp_bundled: 0.06,
          amp_free: 0.07
        },
        {
          awg: "40",
          diam_mm: 0.0799,
          mm2: 0.00501,
          kcmil: 0.0098,
          dcr_mohm_m: 3441,
          amp_chassis: 0.03,
          amp_bundled: 0.04,
          amp_free: 0.05
        }
      ];

      // 铝导体电阻率约为铜的 1.61 倍，安培容量约为铜的 0.84 倍
      var AL_RESIST_FACTOR = 1.61;
      var AL_AMP_FACTOR = 0.84;

      var statusEl = document.getElementById("status");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function getAmpacity(row, install, material) {
        var base;
        if (install === "chassis") {
          base = row.amp_chassis;
        } else if (install === "bundled") {
          base = row.amp_bundled;
        } else {
          base = row.amp_free;
        }
        return material === "aluminum" ? base * AL_AMP_FACTOR : base;
      }

      function getDcr(row, material) {
        return material === "aluminum" ? row.dcr_mohm_m * AL_RESIST_FACTOR : row.dcr_mohm_m;
      }

      // ---- 规格查询 ----
      var selAwgEl = document.getElementById("selAwg");
      var inputModeEl = document.getElementById("inputMode");
      var inMm2El = document.getElementById("inMm2");
      var inDiameterEl = document.getElementById("inDiameter");
      var selMaterialEl = document.getElementById("selMaterial");
      var selInstallEl = document.getElementById("selInstall");

      function buildAwgOptions(selectEl) {
        selectEl.innerHTML = "";
        AWG_DATA.forEach(function (row) {
          var opt = document.createElement("option");
          opt.value = row.awg;
          var mm2Str = row.mm2 < 0.1 ? row.mm2.toFixed(4) : row.mm2.toFixed(2);
          opt.textContent = "AWG " + row.awg + " (" + mm2Str + " mm²)";
          selectEl.appendChild(opt);
        });
        selectEl.value = "14";
      }

      buildAwgOptions(selAwgEl);
      buildAwgOptions(document.getElementById("vdSelAwg"));

      // 切换输入模式
      inputModeEl.addEventListener("change", function () {
        var mode = inputModeEl.value;
        document.getElementById("rowAwg").style.display = mode === "awg" ? "" : "none";
        document.getElementById("rowMm2").style.display = mode === "mm2" ? "" : "none";
        document.getElementById("rowDiameter").style.display = mode === "diameter" ? "" : "none";
        runLookup();
      });

      function findClosestRow(field, val) {
        var best = AWG_DATA[0];
        var bestDiff = Math.abs(AWG_DATA[0][field] - val);
        AWG_DATA.forEach(function (row) {
          var diff = Math.abs(row[field] - val);
          if (diff < bestDiff) {
            bestDiff = diff;
            best = row;
          }
        });
        return best;
      }

      function getSelectedRow() {
        var mode = inputModeEl.value;
        if (mode === "awg") {
          var awg = selAwgEl.value;
          return (
            AWG_DATA.find(function (r) {
              return r.awg === awg;
            }) || AWG_DATA[0]
          );
        } else if (mode === "mm2") {
          var v = parseFloat(inMm2El.value);
          if (isNaN(v) || v <= 0) {
            return null;
          }
          return findClosestRow("mm2", v);
        } else {
          var d = parseFloat(inDiameterEl.value);
          if (isNaN(d) || d <= 0) {
            return null;
          }
          return findClosestRow("diam_mm", d);
        }
      }

      function runLookup() {
        var row = getSelectedRow();
        if (!row) {
          showStatus("请输入有效数值", "error");
          return;
        }
        var material = selMaterialEl.value;
        var install = selInstallEl.value;
        var amp = getAmpacity(row, install, material);
        var dcr = getDcr(row, material);

        document.getElementById("resAwg").textContent = "AWG " + row.awg;
        document.getElementById("resMm2").textContent =
          row.mm2 < 0.1 ? row.mm2.toFixed(5) : row.mm2.toFixed(3);
        document.getElementById("resDiameter").textContent = row.diam_mm.toFixed(3);
        document.getElementById("resDcr").textContent = dcr < 1 ? dcr.toFixed(4) : dcr.toFixed(2);
        document.getElementById("resAmpacity").textContent = amp.toFixed(1);
        document.getElementById("resKcmil").textContent = row.kcmil.toFixed(4);

        var installNames = { chassis: "机箱内布线", bundled: "束线/多芯", free: "自由空气中" };
        var matNames = { copper: "铜", aluminum: "铝" };
        document.getElementById("resAmpacityUnit").textContent =
          "A（" + installNames[install] + "·" + matNames[material] + "）";

        // 安培条（以 AWG 4/0 满载为基准 260A）
        var maxRef = 260;
        var pct = Math.min(100, (amp / maxRef) * 100).toFixed(0);
        document.getElementById("ampacityBar").style.width = pct + "%";
        document.getElementById("ampacityPct").textContent = pct + "% (基准 260A)";
        document.getElementById("ampacityBarWrap").style.display = "";

        // 建议
        var recEl = document.getElementById("recommendation");
        var lines = [];
        if (amp > 100) {
          lines.push("适合大功率主干线路、汇流排、商业电气。");
        } else if (amp > 30) {
          lines.push("适合分支电路、家用主线、太阳能系统连接线。");
        } else if (amp > 10) {
          lines.push("适合家用一般支路、汽车音响、12V/24V 系统。");
        } else if (amp > 2) {
          lines.push("适合低功率控制线、传感器供电、LED 灯带。");
        } else {
          lines.push("仅适合信号线、低功耗 MCU/传感器接线，不宜用于大电流场景。");
        }

        if (material === "aluminum") {
          lines.push("铝线需使用铝专用接线端子，避免氧化腐蚀导致接触不良。");
        }
        if (install === "bundled") {
          lines.push("多芯束线时注意散热，建议降额使用（已体现在安全电流中）。");
        }

        // 给出等效 mm² 提示
        var isoMm2Sizes = [
          0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240
        ];
        var closest = isoMm2Sizes.reduce(function (a, b) {
          return Math.abs(b - row.mm2) < Math.abs(a - row.mm2) ? b : a;
        });
        lines.push("最近 ISO/IEC 标准截面积：" + closest + " mm²。");
        recEl.innerHTML = lines
          .map(function (l) {
            return "<p>• " + l + "</p>";
          })
          .join("");

        showStatus("AWG " + row.awg + " 查询完成", "success");
      }

      selAwgEl.addEventListener("change", runLookup);
      inMm2El.addEventListener("input", runLookup);
      inDiameterEl.addEventListener("input", runLookup);
      selMaterialEl.addEventListener("change", runLookup);
      selInstallEl.addEventListener("change", runLookup);

      // 初始执行一次
      runLookup();

      // ---- 压降计算 ----
      document.getElementById("btnCalcVD").onclick = function () {
        var awg = document.getElementById("vdSelAwg").value;
        var row = AWG_DATA.find(function (r) {
          return r.awg === awg;
        });
        if (!row) {
          showStatus("未找到规格", "error");
          return;
        }

        var length = parseFloat(document.getElementById("vdLength").value);
        var current = parseFloat(document.getElementById("vdCurrent").value);
        var voltage = parseFloat(document.getElementById("vdVoltage").value);
        var material = document.getElementById("vdMaterial").value;
        var temp = parseFloat(document.getElementById("vdTemp").value);

        if (
          [length, current, voltage, temp].some(isNaN) ||
          length <= 0 ||
          current <= 0 ||
          voltage <= 0
        ) {
          showStatus("请填写有效参数", "error");
          return;
        }

        // 温度修正：铜 α=0.00393 /°C, 铝 α=0.00403 /°C
        var alpha = material === "copper" ? 0.00393 : 0.00403;
        var dcrBase = getDcr(row, material); // mΩ/m at 20°C
        var dcrAtTemp = dcrBase * (1 + alpha * (temp - 20)); // mΩ/m at temp°C

        var totalLength = length * 2; // 双向
        var totalResist = (dcrAtTemp * totalLength) / 1000; // Ω
        var voltageDrop = totalResist * current; // V
        var voltageDropPct = (voltageDrop / voltage) * 100;
        var remainVoltage = voltage - voltageDrop;
        var powerLoss = voltageDrop * current; // W

        var ampacity = getAmpacity(row, "free", material);
        var loadPct = (current / ampacity) * 100;

        var vdEl = document.getElementById("vdResult");
        var colorPct =
          voltageDropPct > 5
            ? "var(--color-error)"
            : voltageDropPct > 3
              ? "var(--color-warning)"
              : "var(--color-success)";
        var colorLoad =
          loadPct > 100
            ? "var(--color-error)"
            : loadPct > 80
              ? "var(--color-warning)"
              : "var(--color-success)";

        var matLabel = material === "copper" ? "铜" : "铝";
        var alertHtml =
          voltageDropPct > 5
            ? '<div style="margin-top:var(--space-3);padding:var(--space-3);background:rgba(244,63,94,0.1);border-radius:var(--radius-sm);font-size:0.8125rem;color:var(--color-error)">⚠ 压降超过 5%，建议升级导线规格或缩短线路长度。</div>'
            : voltageDropPct > 3
              ? '<div style="margin-top:var(--space-3);padding:var(--space-3);background:rgba(251,191,36,0.1);border-radius:var(--radius-sm);font-size:0.8125rem;color:var(--color-warning)">注意：压降介于 3%–5%，敏感负载建议升级规格。</div>'
              : '<div style="margin-top:var(--space-3);padding:var(--space-3);background:rgba(16,185,129,0.1);border-radius:var(--radius-sm);font-size:0.8125rem;color:var(--color-success)">压降在安全范围（&lt;3%），线路选型合格。</div>';

        vdEl.innerHTML = [
          makeVDRow("AWG 规格", "AWG " + row.awg),
          makeVDRow("单边长度", length.toFixed(2) + " m（双向 " + totalLength.toFixed(2) + " m）"),
          makeVDRow("导体材料 / 温度", matLabel + " / " + temp + "°C"),
          makeVDRow("DC 电阻（@ " + temp + "°C）", dcrAtTemp.toFixed(2) + " mΩ/m"),
          makeVDRow("线路总阻抗", (totalResist * 1000).toFixed(2) + " mΩ"),
          makeVDRowColored(
            "电压降",
            voltageDrop.toFixed(4) + " V (" + voltageDropPct.toFixed(2) + "%)",
            colorPct
          ),
          makeVDRow("负载端电压", remainVoltage.toFixed(4) + " V"),
          makeVDRow("线路功率损耗", powerLoss.toFixed(3) + " W"),
          makeVDRowColored(
            "电流 vs 安全电流",
            current.toFixed(2) +
              " A / " +
              ampacity.toFixed(1) +
              " A（" +
              loadPct.toFixed(1) +
              "%）",
            colorLoad
          ),
          alertHtml
        ].join("");

        showStatus("压降计算完成", "success");
      };

      function makeVDRow(key, val) {
        return (
          '<div class="voltage-drop-row">' +
          '<span class="voltage-drop-key">' +
          key +
          "</span>" +
          '<span class="voltage-drop-val">' +
          val +
          "</span>" +
          "</div>"
        );
      }
      function makeVDRowColored(key, val, color) {
        return (
          '<div class="voltage-drop-row">' +
          '<span class="voltage-drop-key">' +
          key +
          "</span>" +
          '<span class="voltage-drop-val" style="color:' +
          color +
          '">' +
          val +
          "</span>" +
          "</div>"
        );
      }

      // ---- 完整对照表 ----
      var tableFilterEl = document.getElementById("tableFilter");

      function renderTable() {
        var filter = tableFilterEl.value;
        var rows =
          filter === "common"
            ? AWG_DATA.filter(function (r) {
                var n;
                if (r.awg === "4/0") {
                  n = -3;
                } else if (r.awg === "3/0") {
                  n = -2;
                } else if (r.awg === "2/0") {
                  n = -1;
                } else if (r.awg === "1/0") {
                  n = 0;
                } else {
                  n = parseInt(r.awg, 10);
                }
                return n <= 20;
              })
            : AWG_DATA;

        var tbody = document.getElementById("awgTableBody");
        tbody.innerHTML = "";
        rows.forEach(function (row) {
          var tr = document.createElement("tr");
          var ampClass = row.amp_free > 50 ? "good" : row.amp_free > 10 ? "" : "warn";
          var mm2Str = row.mm2 < 0.01 ? row.mm2.toFixed(5) : row.mm2.toFixed(3);
          tr.innerHTML =
            "<td>" +
            row.awg +
            "</td>" +
            "<td>" +
            row.diam_mm.toFixed(3) +
            "</td>" +
            "<td>" +
            mm2Str +
            "</td>" +
            "<td>" +
            row.kcmil.toFixed(4) +
            "</td>" +
            "<td>" +
            row.dcr_mohm_m.toFixed(2) +
            "</td>" +
            '<td class="' +
            ampClass +
            '">' +
            row.amp_chassis +
            "</td>" +
            '<td class="' +
            ampClass +
            '">' +
            row.amp_bundled +
            "</td>" +
            '<td class="' +
            ampClass +
            '">' +
            row.amp_free +
            "</td>";
          tbody.appendChild(tr);
        });
      }

      tableFilterEl.addEventListener("change", renderTable);
      renderTable();

      // 导出 CSV
      document.getElementById("btnExportCSV").onclick = function () {
        var header =
          "AWG,线径(mm),截面积(mm²),kcmil,DC电阻铜(mΩ/m),安全电流机箱(A),安全电流束线(A),安全电流空气(A)\n";
        var rows = AWG_DATA.map(function (r) {
          return [
            r.awg,
            r.diam_mm,
            r.mm2,
            r.kcmil,
            r.dcr_mohm_m,
            r.amp_chassis,
            r.amp_bundled,
            r.amp_free
          ].join(",");
        }).join("\n");
        var blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "awg-wire-gauge-table.csv";
        a.click();
        URL.revokeObjectURL(url);
        showStatus("CSV 已导出", "success");
      };

      // ---- 模式切换 ----
      var TABS = ["Lookup", "VoltageDrop", "FullTable"];
      TABS.forEach(function (name) {
        document.getElementById("tab" + name).addEventListener("click", function () {
          TABS.forEach(function (n) {
            document.getElementById("tab" + n).classList.toggle("active", n === name);
            document.getElementById("panel" + n).classList.toggle("active", n === name);
          });
        });
      });

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
        if (!localStorage.getItem("theme")) {
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        }
      });

      initTheme();
    
