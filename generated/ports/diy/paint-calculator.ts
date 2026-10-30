// @ts-nocheck
// Generated from tools/diy/paint-calculator.html
// Source SHA-256: f6a744c793c8a885914fe92113b65098dc7d149e6cb6d74504ba76b4c121d0de
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let walls = [
        { id: 1, name: "墙面1", width: 4, height: 2.8 },
        { id: 2, name: "墙面2", width: 3, height: 2.8 },
        { id: 3, name: "墙面3", width: 4, height: 2.8 },
        { id: 4, name: "墙面4", width: 3, height: 2.8 }
      ];
      let nextId = 5;

      function render() {
        const list = document.getElementById("wallsList");
        list.innerHTML = walls
          .map(
            (wall, index) => `
        <div class="wall-item" data-id="${wall.id}">
          <span class="wall-name">${wall.name}</span>
          <input type="number" class="wall-input" value="${wall.width}" min="0" step="0.1" placeholder="宽(m)"
            oninput="updateWall(${wall.id}, 'width', parseFloat(this.value) || 0)">
          <input type="number" class="wall-input" value="${wall.height}" min="0" step="0.1" placeholder="高(m)"
            oninput="updateWall(${wall.id}, 'height', parseFloat(this.value) || 0)">
          <button class="delete-btn" onclick="removeWall(${wall.id})" title="删除">×</button>
        </div>
      `
          )
          .join("");
        calculate();
      }

      function addWall() {
        walls.push({ id: nextId, name: `墙面${nextId}`, width: 3, height: 2.8 });
        nextId++;
        render();
      }

      function removeWall(id) {
        if (walls.length <= 1) {
          alert("至少保留一面墙");
          return;
        }
        walls = walls.filter((w) => w.id !== id);
        render();
      }

      function updateWall(id, field, value) {
        const wall = walls.find((w) => w.id === id);
        if (wall) {
          wall[field] = value;
          calculate();
        }
      }

      function calculate() {
        const coats = parseInt(document.getElementById("coats").value);
        const coverage = parseFloat(document.getElementById("coverage").value) || 10;
        const price = parseFloat(document.getElementById("price").value) || 0;
        const doorCount = parseInt(document.getElementById("doorCount").value) || 0;
        const windowCount = parseInt(document.getElementById("windowCount").value) || 0;
        const otherDeduct = parseFloat(document.getElementById("otherDeduct").value) || 0;

        // Calculate total wall area
        const totalArea = walls.reduce((sum, wall) => sum + wall.width * wall.height, 0);

        // Calculate deductions (door ≈ 2㎡, window ≈ 1.5㎡)
        const deductArea = doorCount * 2 + windowCount * 1.5 + otherDeduct;

        // Calculate paint area
        const paintArea = Math.max(0, totalArea - deductArea);
        const totalPaintArea = paintArea * coats;

        // Calculate paint needed
        const paintNeeded = totalPaintArea / coverage;
        const paintWithExtra = paintNeeded * 1.1; // 10% extra

        // Calculate cost
        const totalCost = paintNeeded * price;
        const totalCostExtra = paintWithExtra * price;

        // Update display
        document.getElementById("totalArea").textContent = totalArea.toFixed(1);
        document.getElementById("deductArea").textContent = deductArea.toFixed(1);
        document.getElementById("paintArea").textContent = paintArea.toFixed(1);
        document.getElementById("totalPaintArea").textContent = totalPaintArea.toFixed(1);
        document.getElementById("paintNeeded").textContent = paintNeeded.toFixed(1);
        document.getElementById("totalCost").textContent = "¥" + totalCost.toFixed(0);
        document.getElementById("totalCostExtra").textContent = "¥" + totalCostExtra.toFixed(0);

        // Generate tips
        generateTips(paintNeeded, coats, coverage);
      }

      function generateTips(paintNeeded, coats, coverage) {
        const tips = [];

        tips.push(`📏 标准涂布率参考：乳胶漆约10-12㎡/L，底漆约12-15㎡/L`);

        if (coats === 1) {
          tips.push("⚠️ 建议至少涂刷2遍以确保覆盖均匀");
        } else if (coats >= 3) {
          tips.push("✅ 3遍涂刷可获得最佳效果和耐久性");
        }

        if (paintNeeded < 5) {
          tips.push("🪣 小面积涂刷，建议购买小桶装（1L或5L）");
        } else if (paintNeeded < 20) {
          tips.push("🪣 中等面积，建议购买标准桶装（5L或10L）");
        } else {
          tips.push("🪣 大面积涂刷，建议购买大桶装（15L或20L）更划算");
        }

        tips.push("🖌️ 涂刷前确保墙面干燥、平整，处理好裂缝和钉眼");
        tips.push("⏱️ 每遍涂刷间隔2-4小时，确保干透后再刷下一遍");

        document.getElementById("tips").innerHTML = tips.join("<br>");
      }

      // Initialize
      render();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
