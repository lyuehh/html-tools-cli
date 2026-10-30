// @ts-nocheck
// Generated from tools/health/tdee-calorie-deficit-calculator.html
// Source SHA-256: 9b5c40d4f55f7a3678b7e5075a409374b214171cc0784166f88bc6cabcf18eb8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "tdee_calc_v1";

      function getGender() {
        return document.querySelector('input[name="gender"]:checked').value;
      }
      function getUnit() {
        return document.querySelector('input[name="unit"]:checked').value;
      }
      function showStatus(msg, type) {
        var el = document.getElementById("statusMsg");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function updateUnitLabels() {
        var unit = getUnit();
        document.getElementById("weightLabel").textContent =
          unit === "metric" ? "体重 (kg)" : "体重 (lb)";
        document.getElementById("heightLabel").textContent =
          unit === "metric" ? "身高 (cm)" : "身高 (in)";
      }

      function toMetric(weightRaw, heightRaw, unit) {
        if (unit === "imperial") {
          return {
            weight: weightRaw * 0.453592,
            height: heightRaw * 2.54
          };
        }
        return { weight: weightRaw, height: heightRaw };
      }

      function calcMifflin(gender, weightKg, heightCm, age) {
        var base = 10 * weightKg + 6.25 * heightCm - 5 * age;
        return gender === "male" ? base + 5 : base - 161;
      }
      function calcHarris(gender, weightKg, heightCm, age) {
        if (gender === "male") {
          return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
        }
        return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
      }
      function calcKatch(weightKg, bodyFatPct) {
        var lbm = weightKg * (1 - bodyFatPct / 100);
        return 370 + 21.6 * lbm;
      }

      function calculate() {
        var ageVal = parseFloat(document.getElementById("age").value);
        var weightVal = parseFloat(document.getElementById("weight").value);
        var heightVal = parseFloat(document.getElementById("height").value);
        var activityVal = parseFloat(document.getElementById("activity").value);
        var formulaVal = document.getElementById("formula").value;
        var gender = getGender();
        var unit = getUnit();

        var invalid = false;
        ["age", "weight", "height"].forEach(function (id) {
          var el = document.getElementById(id);
          if (!el.value || isNaN(parseFloat(el.value)) || parseFloat(el.value) <= 0) {
            el.classList.add("invalid");
            invalid = true;
          } else {
            el.classList.remove("invalid");
          }
        });

        var bodyFatVal = 0;
        if (formulaVal === "katch") {
          bodyFatVal = parseFloat(document.getElementById("bodyFat").value);
          if (!bodyFatVal || isNaN(bodyFatVal) || bodyFatVal < 3 || bodyFatVal > 60) {
            document.getElementById("bodyFat").classList.add("invalid");
            invalid = true;
          } else {
            document.getElementById("bodyFat").classList.remove("invalid");
          }
        }

        if (invalid) {
          showStatus("请检查输入值", "error");
          return;
        }

        var converted = toMetric(weightVal, heightVal, unit);
        var weightKg = converted.weight;
        var heightCm = converted.height;

        var bmr;
        var formulaName;
        if (formulaVal === "harris") {
          bmr = calcHarris(gender, weightKg, heightCm, ageVal);
          formulaName = "Harris-Benedict";
        } else if (formulaVal === "katch") {
          bmr = calcKatch(weightKg, bodyFatVal);
          formulaName = "Katch-McArdle";
        } else {
          bmr = calcMifflin(gender, weightKg, heightCm, ageVal);
          formulaName = "Mifflin-St Jeor";
        }

        var tdee = Math.round(bmr * activityVal);
        bmr = Math.round(bmr);

        document.getElementById("bmrValue").textContent = bmr + " kcal";
        document.getElementById("activityFactor").textContent = activityVal + "×";
        document.getElementById("formulaUsed").textContent = formulaName;
        document.getElementById("tdeeValue").textContent = tdee.toLocaleString();
        document.getElementById("weeklyMaintain").textContent =
          (tdee * 7).toLocaleString() + " kcal/周";
        document.getElementById("weeklyDeficit").textContent =
          ((tdee - 500) * 7).toLocaleString() + " kcal/周";

        var deficits = [
          { label: "轻度减脂", kcal: -250, rate: "≈ 0.23 kg/周" },
          { label: "温和减脂", kcal: -500, rate: "≈ 0.45 kg/周" },
          { label: "积极减脂", kcal: -750, rate: "≈ 0.68 kg/周" }
        ];
        var deficitGrid = document.getElementById("deficitGrid");
        deficitGrid.innerHTML = "";
        deficits.forEach(function (d) {
          var target = tdee + d.kcal;
          if (target < 1200) {
            target = 1200;
          }
          var card = document.createElement("div");
          card.className = "deficit-card";
          var labelEl = document.createElement("div");
          labelEl.className = "deficit-card-label";
          labelEl.textContent = d.label;
          var valueEl = document.createElement("div");
          valueEl.className = "deficit-card-value deficit";
          valueEl.textContent = target.toLocaleString() + " kcal";
          var rateEl = document.createElement("div");
          rateEl.className = "deficit-card-rate";
          rateEl.textContent = d.rate;
          card.appendChild(labelEl);
          card.appendChild(valueEl);
          card.appendChild(rateEl);
          deficitGrid.appendChild(card);
        });

        var surpluses = [
          { label: "轻度增肌", kcal: 200, rate: "≈ 0.18 kg/周" },
          { label: "温和增重", kcal: 500, rate: "≈ 0.45 kg/周" },
          { label: "快速增重", kcal: 1000, rate: "≈ 0.9 kg/周" }
        ];
        var surplusGrid = document.getElementById("surplusGrid");
        surplusGrid.innerHTML = "";
        surpluses.forEach(function (s) {
          var target = tdee + s.kcal;
          var card = document.createElement("div");
          card.className = "deficit-card surplus";
          var labelEl = document.createElement("div");
          labelEl.className = "deficit-card-label";
          labelEl.textContent = s.label;
          var valueEl = document.createElement("div");
          valueEl.className = "deficit-card-value surplus";
          valueEl.textContent = target.toLocaleString() + " kcal";
          var rateEl = document.createElement("div");
          rateEl.className = "deficit-card-rate";
          rateEl.textContent = s.rate;
          card.appendChild(labelEl);
          card.appendChild(valueEl);
          card.appendChild(rateEl);
          surplusGrid.appendChild(card);
        });

        document.getElementById("resultPlaceholder").style.display = "none";
        document.getElementById("resultCards").classList.add("show");

        showStatus(
          "TDEE = " + tdee.toLocaleString() + " kcal/day（" + formulaName + "）",
          "success"
        );
        saveState();
      }

      function resetForm() {
        ["age", "weight", "height", "bodyFat"].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) {
            el.value = "";
            el.classList.remove("invalid");
          }
        });
        document.getElementById("genderMale").checked = true;
        document.getElementById("unitMetric").checked = true;
        document.getElementById("activity").value = "1.55";
        document.getElementById("formula").value = "mifflin";
        document.getElementById("bodyFatGroup").style.display = "none";
        document.getElementById("resultPlaceholder").style.display = "";
        document.getElementById("resultCards").classList.remove("show");
        document.getElementById("statusMsg").textContent = "";
        document.getElementById("statusMsg").className = "status";
        updateUnitLabels();
        localStorage.removeItem(LS_KEY);
      }

      function saveState() {
        var state = {
          gender: getGender(),
          unit: getUnit(),
          age: document.getElementById("age").value,
          weight: document.getElementById("weight").value,
          height: document.getElementById("height").value,
          activity: document.getElementById("activity").value,
          formula: document.getElementById("formula").value,
          bodyFat: document.getElementById("bodyFat").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      }

      function loadState() {
        try {
          var raw = localStorage.getItem(LS_KEY);
          if (!raw) return;
          var state = JSON.parse(raw);
          if (state.gender === "female") document.getElementById("genderFemale").checked = true;
          if (state.unit === "imperial") document.getElementById("unitImperial").checked = true;
          if (state.age) document.getElementById("age").value = state.age;
          if (state.weight) document.getElementById("weight").value = state.weight;
          if (state.height) document.getElementById("height").value = state.height;
          if (state.activity) document.getElementById("activity").value = state.activity;
          if (state.formula) {
            document.getElementById("formula").value = state.formula;
            if (state.formula === "katch") {
              document.getElementById("bodyFatGroup").style.display = "";
            }
          }
          if (state.bodyFat) document.getElementById("bodyFat").value = state.bodyFat;
          updateUnitLabels();
          if (state.age && state.weight && state.height) {
            calculate();
          }
        } catch (e) {
          /* ignore corrupt state */
        }
      }

      document.getElementById("btnCalculate").onclick = calculate;
      document.getElementById("btnReset").onclick = resetForm;

      document.querySelectorAll('input[name="unit"]').forEach(function (radio) {
        radio.addEventListener("change", updateUnitLabels);
      });

      document.getElementById("formula").addEventListener("change", function () {
        var isKatch = this.value === "katch";
        document.getElementById("bodyFatGroup").style.display = isKatch ? "" : "none";
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calculate();
        }
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
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      loadState();
    
