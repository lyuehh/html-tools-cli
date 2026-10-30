// @ts-nocheck
// Generated from tools/travel/fuel-cost.html
// Source SHA-256: 752fc3f97857b35499e0fee2a426837d695453e6e8f1df4bb2b5c71166b1b54a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "fuel_cost_data";
      var currentPreset = null;

      function showToast(message) {
        var toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      function selectPreset(btn, fuelEfficiency) {
        document.querySelectorAll(".preset-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        document.getElementById("fuelEfficiency").value = fuelEfficiency;
        currentPreset = fuelEfficiency;
        calculate();
      }

      function updatePresetSelection() {
        var currentValue = parseFloat(document.getElementById("fuelEfficiency").value);
        document.querySelectorAll(".preset-btn").forEach(function (btn) {
          var btnValue = parseFloat(btn.dataset.fuel);
          if (btnValue === currentValue) {
            btn.classList.add("active");
            currentPreset = currentValue;
          } else {
            btn.classList.remove("active");
          }
        });
      }

      function loadData() {
        var hash = window.location.hash.slice(1);
        if (hash) {
          try {
            var data = JSON.parse(decodeURIComponent(atob(hash)));
            if (data.distance) document.getElementById("distance").value = data.distance;
            if (data.fuelEfficiency)
              document.getElementById("fuelEfficiency").value = data.fuelEfficiency;
            if (data.fuelPrice) document.getElementById("fuelPrice").value = data.fuelPrice;
            updatePresetSelection();
            calculate();
            return;
          } catch (e) {
            console.error("Failed to parse URL hash:", e);
          }
        }

        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            var data = JSON.parse(saved);
            if (data.distance) document.getElementById("distance").value = data.distance;
            if (data.fuelEfficiency)
              document.getElementById("fuelEfficiency").value = data.fuelEfficiency;
            if (data.fuelPrice) document.getElementById("fuelPrice").value = data.fuelPrice;
            updatePresetSelection();
            calculate();
          }
        } catch (e) {
          console.error("Failed to load data:", e);
        }
      }

      function saveData() {
        var data = {
          distance: document.getElementById("distance").value,
          fuelEfficiency: document.getElementById("fuelEfficiency").value,
          fuelPrice: document.getElementById("fuelPrice").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function calculate() {
        var distance = parseFloat(document.getElementById("distance").value) || 0;
        var fuelEfficiency = parseFloat(document.getElementById("fuelEfficiency").value) || 0;
        var fuelPrice = parseFloat(document.getElementById("fuelPrice").value) || 0;

        var fuelNeeded = (distance / 100) * fuelEfficiency;
        var totalCost = fuelNeeded * fuelPrice;
        var costPerKm = distance > 0 ? totalCost / distance : 0;

        document.getElementById("fuelNeeded").textContent = fuelNeeded.toFixed(1);
        document.getElementById("totalCost").textContent = "¥" + totalCost.toFixed(2);
        document.getElementById("costPerKm").textContent = "¥" + costPerKm.toFixed(2);

        saveData();
      }

      function clearInputs() {
        document.getElementById("distance").value = "";
        document.getElementById("fuelEfficiency").value = "";
        document.getElementById("fuelPrice").value = "";
        document.getElementById("fuelNeeded").textContent = "0";
        document.getElementById("totalCost").textContent = "¥0.00";
        document.getElementById("costPerKm").textContent = "¥0.00";

        document.querySelectorAll(".preset-btn").forEach(function (btn) {
          btn.classList.remove("active");
        });
        currentPreset = null;

        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", window.location.pathname);
        showToast("已清空所有输入");
      }

      function shareResult() {
        var data = {
          distance: document.getElementById("distance").value,
          fuelEfficiency: document.getElementById("fuelEfficiency").value,
          fuelPrice: document.getElementById("fuelPrice").value
        };

        if (!data.distance && !data.fuelEfficiency && !data.fuelPrice) {
          showToast("请先输入数据");
          return;
        }

        try {
          var hash = btoa(encodeURIComponent(JSON.stringify(data)));
          var url = window.location.origin + window.location.pathname + "#" + hash;

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
              .writeText(url)
              .then(function () {
                showToast("链接已复制到剪贴板");
              })
              .catch(function () {
                showToast("复制失败，请手动复制");
              });
          } else {
            var textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            showToast("链接已复制到剪贴板");
          }

          history.replaceState(null, "", "#" + hash);
        } catch (e) {
          showToast("分享失败");
          console.error("Share failed:", e);
        }
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

      document.querySelectorAll("input").forEach(function (input) {
        input.addEventListener("input", function () {
          if (input.id === "fuelEfficiency") {
            updatePresetSelection();
          }
          calculate();
        });
      });

      initTheme();
      loadData();
    
