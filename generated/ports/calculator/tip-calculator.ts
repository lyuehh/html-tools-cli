// @ts-nocheck
// Generated from tools/calculator/tip-calculator.html
// Source SHA-256: 35ca98ff73eb2cf20edd72105a1c0d26611727cfe1cc9c80cfd66509a05469b2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        var state = { bill: 0, pct: 15, people: 1, round: false };

        var $ = function (id) {
          return document.getElementById(id);
        };
        var fmt = function (n) {
          return "¥" + (Math.round(n * 100) / 100).toFixed(2);
        };

        function render() {
          var tip = state.bill * (state.pct / 100);
          var total = state.bill + tip;
          var per = total / state.people;
          if (state.round) {
            per = Math.ceil(per);
            total = per * state.people;
            tip = total - state.bill;
          }
          $("perPerson").textContent = fmt(per);
          $("rBill").textContent = fmt(state.bill);
          $("rTip").textContent = fmt(tip);
          $("rTotal").textContent = fmt(total);
          $("rPctTag").textContent = " · " + state.pct + "%";
          $("pctEcho").textContent = state.pct + "%";
          syncHash();
        }

        function syncChips() {
          var matched = false;
          document.querySelectorAll(".chip").forEach(function (c) {
            var on = Number(c.dataset.pct) === state.pct;
            c.classList.toggle("active", on);
            c.setAttribute("aria-pressed", String(on));
            if (on) matched = true;
          });
          $("customPct").textContent = matched ? "自定义" : state.pct + "%";
          $("pctRange").value = state.pct;
        }

        function syncHash() {
          var p = new URLSearchParams();
          if (state.bill) p.set("b", state.bill);
          p.set("p", state.pct);
          p.set("n", state.people);
          if (state.round) p.set("r", "1");
          history.replaceState(null, "", "#" + p.toString());
        }

        function loadHash() {
          var p = new URLSearchParams(location.hash.slice(1));
          if (p.has("b")) {
            state.bill = parseFloat(p.get("b")) || 0;
            $("bill").value = state.bill || "";
          }
          if (p.has("p")) state.pct = Math.min(40, Math.max(0, parseInt(p.get("p"), 10) || 15));
          if (p.has("n")) state.people = Math.max(1, parseInt(p.get("n"), 10) || 1);
          if (p.get("r") === "1") {
            state.round = true;
            $("roundUp").checked = true;
          }
          $("people").textContent = state.people;
        }

        $("bill").addEventListener("input", function () {
          state.bill = parseFloat(this.value) || 0;
          render();
        });

        $("chips").addEventListener("click", function (e) {
          var chip = e.target.closest(".chip");
          if (!chip) return;
          state.pct = Number(chip.dataset.pct);
          syncChips();
          render();
        });

        $("pctRange").addEventListener("input", function () {
          state.pct = Number(this.value);
          syncChips();
          render();
        });

        $("minus").addEventListener("click", function () {
          state.people = Math.max(1, state.people - 1);
          $("people").textContent = state.people;
          render();
        });

        $("plus").addEventListener("click", function () {
          state.people = Math.min(99, state.people + 1);
          $("people").textContent = state.people;
          render();
        });

        $("roundUp").addEventListener("change", function () {
          state.round = this.checked;
          render();
        });

        loadHash();
        syncChips();
        render();
      })();
    
