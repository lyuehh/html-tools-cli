// @ts-nocheck
// Generated from tools/travel/hotel-cost.html
// Source SHA-256: 63f9ff6f42834319aefb465be7ca5977dc8690dbdffc45221cbcfcc82965abf0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "hotel_cost_data";

      function loadData() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            var data = JSON.parse(saved);
            document.getElementById("nights").value = data.nights || 1;
            document.getElementById("pricePerNight").value = data.pricePerNight || "";
            document.getElementById("rooms").value = data.rooms || 1;
            document.getElementById("taxRate").value = data.taxRate || 0;
            calculate();
          }
        } catch (e) {
          console.error("Failed to load data:", e);
        }
      }

      function saveData() {
        var data = {
          nights: document.getElementById("nights").value,
          pricePerNight: document.getElementById("pricePerNight").value,
          rooms: document.getElementById("rooms").value,
          taxRate: document.getElementById("taxRate").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function calculate() {
        var nights = parseFloat(document.getElementById("nights").value) || 0;
        var pricePerNight = parseFloat(document.getElementById("pricePerNight").value) || 0;
        var rooms = parseFloat(document.getElementById("rooms").value) || 1;
        var taxRate = parseFloat(document.getElementById("taxRate").value) || 0;

        var subtotal = nights * pricePerNight * rooms;
        var taxAmount = subtotal * (taxRate / 100);
        var total = subtotal + taxAmount;
        var avgPerNight = nights > 0 ? total / nights : 0;
        var avgPerRoomPerNight = nights > 0 && rooms > 0 ? total / nights / rooms : 0;

        document.getElementById("subtotal").textContent = "¥" + subtotal.toFixed(2);
        document.getElementById("roomCount").textContent = rooms + " 间";
        document.getElementById("taxAmount").textContent = "¥" + taxAmount.toFixed(2);
        document.getElementById("totalCost").textContent = "¥" + total.toFixed(2);
        document.getElementById("avgPerNight").textContent = "¥" + avgPerNight.toFixed(2);
        document.getElementById("avgPerRoomPerNight").textContent =
          "¥" + avgPerRoomPerNight.toFixed(2);

        saveData();
      }

      function clearInputs() {
        document.getElementById("nights").value = 1;
        document.getElementById("pricePerNight").value = "";
        document.getElementById("rooms").value = 1;
        document.getElementById("taxRate").value = 0;

        document.getElementById("subtotal").textContent = "¥0.00";
        document.getElementById("roomCount").textContent = "1 间";
        document.getElementById("taxAmount").textContent = "¥0.00";
        document.getElementById("totalCost").textContent = "¥0.00";
        document.getElementById("avgPerNight").textContent = "¥0.00";
        document.getElementById("avgPerRoomPerNight").textContent = "¥0.00";

        localStorage.removeItem(LS_KEY);
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
        input.addEventListener("input", calculate);
      });

      initTheme();
      loadData();
    
