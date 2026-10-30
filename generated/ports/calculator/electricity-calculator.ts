// @ts-nocheck
// Generated from tools/calculator/electricity-calculator.html
// Source SHA-256: 66873c8130d21c15d68806a6bbfef18c5aedfd822157079303884b93a4b9c830
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const usage = parseFloat(document.getElementById("usage").value) || 0;
        const type = document.getElementById("priceType").value;
        let total = 0,
          breakdown = [];

        if (type === "residential") {
          // 阶梯电价示例
          if (usage <= 200) {
            total = usage * 0.52;
            breakdown.push({ label: "第一档 (0-200度)", value: usage * 0.52, kwh: usage });
          } else if (usage <= 400) {
            total = 200 * 0.52 + (usage - 200) * 0.57;
            breakdown.push({ label: "第一档 (0-200度)", value: 200 * 0.52, kwh: 200 });
            breakdown.push({
              label: "第二档 (201-400度)",
              value: (usage - 200) * 0.57,
              kwh: usage - 200
            });
          } else {
            total = 200 * 0.52 + 200 * 0.57 + (usage - 400) * 0.82;
            breakdown.push({ label: "第一档 (0-200度)", value: 200 * 0.52, kwh: 200 });
            breakdown.push({ label: "第二档 (201-400度)", value: 200 * 0.57, kwh: 200 });
            breakdown.push({
              label: "第三档 (>400度)",
              value: (usage - 400) * 0.82,
              kwh: usage - 400
            });
          }
        } else if (type === "commercial") {
          total = usage * 0.85;
          breakdown.push({ label: "商业电价", value: total, kwh: usage });
        } else {
          total = usage * 0.65;
          breakdown.push({ label: "工业电价", value: total, kwh: usage });
        }

        document.getElementById("total").textContent = "¥" + total.toFixed(2);
        document.getElementById("breakdown").innerHTML = breakdown
          .map(
            (b) =>
              '<div class="breakdown-item"><span>' +
              b.label +
              " (" +
              b.kwh +
              "度)</span><span>¥" +
              b.value.toFixed(2) +
              "</span></div>"
          )
          .join("");
      }
      document.getElementById("usage").addEventListener("input", calculate);
      document.getElementById("priceType").addEventListener("change", calculate);
      calculate();
    
