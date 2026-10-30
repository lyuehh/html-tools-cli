// @ts-nocheck
// Generated from tools/travel/toll-calculator.html
// Source SHA-256: dd0b6cef7166adba2b2a97aad1e93d655be628f995af2493c60899fb5dc0a31d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 车型费率配置 (元/公里)
      const VEHICLE_RATES = {
        car1: { name: "小轿车", rate: 0.4, desc: "≤7座客车" },
        car2: { name: "小客车", rate: 0.45, desc: "8-9座客车" },
        minibus: { name: "中型客车", rate: 0.6, desc: "10-19座客车" },
        bus: { name: "大型客车", rate: 0.8, desc: "20-39座客车" },
        coach: { name: "特大客车", rate: 1.0, desc: "≥40座客车" },
        truck1: { name: "轻型货车", rate: 0.45, desc: "≤2吨货车" },
        truck2: { name: "中型货车", rate: 0.65, desc: "2-5吨货车" },
        truck3: { name: "大型货车", rate: 1.0, desc: "5-10吨货车" },
        truck4: { name: "特大货车", rate: 1.3, desc: "10-20吨货车" },
        truck5: { name: "重型货车", rate: 1.6, desc: ">20吨货车" }
      };

      // 当前选中的车型
      let selectedVehicle = "car1";

      // localStorage key
      const LS_KEY = "toll_calculator_v1";

      // 主题切换
      function toggleTheme() {
        const body = document.body;
        const isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // 加载主题
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // 初始化车型选择
      function initVehicleSelection() {
        const grid = document.getElementById("vehicleGrid");
        const cards = grid.querySelectorAll(".vehicle-card");

        cards.forEach((card) => {
          card.addEventListener("click", () => {
            // 移除所有选中状态
            cards.forEach((c) => c.classList.remove("selected"));
            // 添加当前选中状态
            card.classList.add("selected");
            // 更新选中车型
            selectedVehicle = card.dataset.type;
            // 保存状态
            saveState();
            // 自动计算
            calculate();
          });
        });
      }

      // 计算过路费
      function calculate() {
        const distanceInput = document.getElementById("distance");
        const distance = parseFloat(distanceInput.value) || 0;

        if (distance <= 0) {
          showToast("请输入有效的行驶距离");
          return;
        }

        const vehicle = VEHICLE_RATES[selectedVehicle];
        const toll = distance * vehicle.rate;

        // 更新结果显示
        document.getElementById("tollAmount").textContent = toll.toFixed(2);
        document.getElementById("resultDistance").textContent = distance.toFixed(1) + " km";
        document.getElementById("resultVehicle").textContent = vehicle.name;
        document.getElementById("resultRate").textContent = "¥" + vehicle.rate.toFixed(2) + "/km";

        // 保存状态
        saveState();

        showToast("计算完成");
      }

      // 清空所有内容
      function clearAll() {
        document.getElementById("distance").value = "";
        document.getElementById("tollAmount").textContent = "0.00";
        document.getElementById("resultDistance").textContent = "0 km";
        document.getElementById("resultVehicle").textContent = "小轿车";
        document.getElementById("resultRate").textContent = "¥0.40/km";

        // 重置车型选择
        selectedVehicle = "car1";
        const cards = document.querySelectorAll(".vehicle-card");
        cards.forEach((c) => c.classList.remove("selected"));
        cards[0].classList.add("selected");

        // 清除 localStorage
        localStorage.removeItem(LS_KEY);

        showToast("已清空");
      }

      // 保存状态到 localStorage
      function saveState() {
        const state = {
          distance: document.getElementById("distance").value,
          vehicle: selectedVehicle
        };
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      }

      // 从 localStorage 加载状态
      function loadState() {
        const saved = localStorage.getItem(LS_KEY);
        if (!saved) return;

        try {
          const state = JSON.parse(saved);

          if (state.distance) {
            document.getElementById("distance").value = state.distance;
          }

          if (state.vehicle && VEHICLE_RATES[state.vehicle]) {
            selectedVehicle = state.vehicle;
            const cards = document.querySelectorAll(".vehicle-card");
            cards.forEach((c) => {
              if (c.dataset.type === selectedVehicle) {
                c.classList.add("selected");
              } else {
                c.classList.remove("selected");
              }
            });
          }

          // 自动计算
          if (state.distance) {
            calculate();
          }
        } catch (e) {
          console.error("Failed to load state:", e);
        }
      }

      // 显示提示
      function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // 监听输入变化
      document.getElementById("distance").addEventListener("input", () => {
        saveState();
      });

      // 监听回车键计算
      document.getElementById("distance").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          calculate();
        }
      });

      // 初始化
      initVehicleSelection();
      loadState();
    
