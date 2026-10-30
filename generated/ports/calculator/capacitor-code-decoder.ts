// @ts-nocheck
// Generated from tools/calculator/capacitor-code-decoder.html
// Source SHA-256: 1d56668861cff32fd011c8d8a061a84b3264882a6fa7e76264432ce3b926efec
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ── 常量 ────────────────────────────────────────────────
      /** 标准 3 位代码参考数据 [代码, pF值, 典型用途] */
      var REF_TABLE = [
        ["100", 10, "高频滤波"],
        ["101", 100, "去耦、滤波"],
        ["102", 1000, "旁路电容"],
        ["103", 10000, "旁路 / 耦合"],
        ["104", 100000, "电源滤波（0.1μF）"],
        ["105", 1000000, "大容量滤波（1μF）"],
        ["150", 15, "振荡电路"],
        ["220", 22, "高频用"],
        ["221", 220, "滤波"],
        ["222", 2200, "旁路"],
        ["223", 22000, "耦合 / 去耦"],
        ["224", 220000, "低频滤波（0.22μF）"],
        ["330", 33, "振荡"],
        ["331", 330, "滤波"],
        ["332", 3300, "旁路"],
        ["333", 33000, "去耦"],
        ["334", 330000, "低频（0.33μF）"],
        ["470", 47, "RF 滤波"],
        ["471", 470, "滤波"],
        ["472", 4700, "旁路（4.7nF）"],
        ["473", 47000, "去耦（47nF）"],
        ["474", 470000, "低频（0.47μF）"],
        ["680", 68, "RF"],
        ["681", 680, "滤波"],
        ["682", 6800, "旁路"],
        ["683", 68000, "去耦"],
        ["684", 680000, "低频（0.68μF）"]
      ];

      // ── 工具函数 ─────────────────────────────────────────────
      function fmtNum(n, sig) {
        if (n === 0) return "0";
        var v = parseFloat(n.toPrecision(sig === undefined ? 5 : sig));
        return v.toString();
      }

      function pfToAll(pf) {
        return {
          pf: fmtNum(pf, 5),
          nf: fmtNum(pf / 1000, 5),
          uf: fmtNum(pf / 1000000, 5)
        };
      }

      function decodeCode(code) {
        var s = code.trim();
        if (!/^\d{3}$/.test(s)) return null;
        var d1 = parseInt(s[0], 10);
        var d2 = parseInt(s[1], 10);
        var d3 = parseInt(s[2], 10);
        var digits = d1 * 10 + d2;
        var multiplier;
        if (d3 === 8) {
          multiplier = 0.01;
        } else if (d3 === 9) {
          multiplier = 0.1;
        } else {
          multiplier = Math.pow(10, d3);
        }
        return { pf: digits * multiplier, digits: digits, multiplier: multiplier, d3: d3 };
      }

      function encodeValue(pf) {
        if (pf <= 0 || !isFinite(pf)) return null;
        var d3, mult, raw, rounded;
        for (d3 = 0; d3 <= 9; d3++) {
          if (d3 === 8) {
            mult = 0.01;
          } else if (d3 === 9) {
            mult = 0.1;
          } else {
            mult = Math.pow(10, d3);
          }
          raw = pf / mult;
          rounded = Math.round(raw);
          if (rounded >= 10 && rounded <= 99 && Math.abs(rounded - raw) < 1e-9) {
            return { code: "" + rounded + d3, exact: true };
          }
        }
        var best = null;
        var bestErr = Infinity;
        for (d3 = 0; d3 <= 9; d3++) {
          if (d3 === 8) {
            mult = 0.01;
          } else if (d3 === 9) {
            mult = 0.1;
          } else {
            mult = Math.pow(10, d3);
          }
          raw = pf / mult;
          rounded = Math.round(raw);
          if (rounded >= 10 && rounded <= 99) {
            var approxPf = rounded * mult;
            var err = Math.abs(approxPf - pf) / pf;
            if (err < bestErr) {
              bestErr = err;
              best = {
                code: "" + rounded + d3,
                exact: false,
                approxPf: approxPf,
                errPct: err * 100
              };
            }
          }
        }
        return best;
      }

      // ── DOM 引用 ─────────────────────────────────────────────
      var codeInputEl = document.getElementById("codeInput");
      var decodeResultEl = document.getElementById("decodeResult");
      var decodeInfoEl = document.getElementById("decodeInfo");
      var decodeErrEl = document.getElementById("decodeErr");

      var valInputEl = document.getElementById("valInput");
      var valUnitEl = document.getElementById("valUnit");
      var encodeResultEl = document.getElementById("encodeResult");
      var encodeInfoEl = document.getElementById("encodeInfo");
      var encodeErrEl = document.getElementById("encodeErr");

      var statusEl = document.getElementById("statusEl");
      var statsEl = document.getElementById("statsEl");

      // ── 解码逻辑 ─────────────────────────────────────────────
      function runDecode() {
        var code = codeInputEl.value.trim();
        codeInputEl.classList.remove("has-error");
        decodeErrEl.style.display = "none";
        decodeResultEl.style.display = "none";
        decodeInfoEl.style.display = "none";
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";

        if (!code) return;
        if (code.length < 3) return;

        var res = decodeCode(code);
        if (!res) {
          codeInputEl.classList.add("has-error");
          decodeErrEl.textContent = "代码无效：需要恰好 3 位数字（0-9），如 104、472";
          decodeErrEl.style.display = "block";
          statusEl.textContent = "格式错误";
          statusEl.className = "status error";
          return;
        }

        var vals = pfToAll(res.pf);
        document.getElementById("valPf").textContent = vals.pf;
        document.getElementById("valNf").textContent = vals.nf;
        document.getElementById("valUf").textContent = vals.uf;

        document.getElementById("cellPf").classList.remove("highlight");
        document.getElementById("cellNf").classList.remove("highlight");
        document.getElementById("cellUf").classList.remove("highlight");
        if (res.pf < 1000) {
          document.getElementById("cellPf").classList.add("highlight");
        } else if (res.pf < 1000000) {
          document.getElementById("cellNf").classList.add("highlight");
        } else {
          document.getElementById("cellUf").classList.add("highlight");
        }

        decodeResultEl.style.display = "grid";

        document.getElementById("infoDig").textContent = res.digits + " （代码前两位）";
        var multStr;
        if (res.d3 === 8) {
          multStr = "0.01 （第三位=8）";
        } else if (res.d3 === 9) {
          multStr = "0.1 （第三位=9）";
        } else {
          multStr = "10^" + res.d3 + " = " + res.multiplier;
        }
        document.getElementById("infoMult").textContent = multStr;
        document.getElementById("infoFormula").textContent =
          res.digits + " × " + res.multiplier + " = " + res.pf + " pF";

        decodeInfoEl.style.display = "block";

        document.getElementById("statPf").textContent = vals.pf;
        document.getElementById("statNf").textContent = vals.nf;
        document.getElementById("statUf").textContent = vals.uf;
        statsEl.classList.add("show");
        statusEl.textContent = "解码成功";
        statusEl.className = "status success";

        saveHash();
      }

      // ── 编码逻辑 ─────────────────────────────────────────────
      function runEncode() {
        var raw = valInputEl.value.trim();
        var unit = valUnitEl.value;
        encodeResultEl.style.display = "none";
        encodeInfoEl.style.display = "none";
        encodeErrEl.style.display = "none";
        valInputEl.classList.remove("has-error");

        if (!raw) return;

        var num = parseFloat(raw);
        if (isNaN(num) || num <= 0) {
          valInputEl.classList.add("has-error");
          encodeErrEl.textContent = "请输入有效的正数容值";
          encodeErrEl.style.display = "block";
          return;
        }

        var pf;
        if (unit === "pf") {
          pf = num;
        } else if (unit === "nf") {
          pf = num * 1000;
        } else {
          pf = num * 1000000;
        }

        if (pf < 0.01) {
          valInputEl.classList.add("has-error");
          encodeErrEl.textContent = "容值过小，超出 3 位代码表示范围";
          encodeErrEl.style.display = "block";
          return;
        }
        if (pf > 9.9e10) {
          valInputEl.classList.add("has-error");
          encodeErrEl.textContent = "容值过大，超出 3 位代码表示范围（最大 99×10^9 pF）";
          encodeErrEl.style.display = "block";
          return;
        }

        var enc = encodeValue(pf);
        if (!enc) {
          valInputEl.classList.add("has-error");
          encodeErrEl.textContent = "无法用标准 3 位代码精确或近似表示该容值";
          encodeErrEl.style.display = "block";
          return;
        }

        encodeResultEl.textContent = enc.code;
        encodeResultEl.style.display = "block";

        var vals = pfToAll(pf);
        document.getElementById("encPf").textContent = vals.pf + " pF";
        document.getElementById("encCode").textContent = enc.code;
        var note;
        if (enc.exact) {
          note = "精确匹配";
        } else {
          note =
            "近似代码（误差 " +
            enc.errPct.toFixed(2) +
            "%，约 " +
            fmtNum(enc.approxPf, 4) +
            " pF）";
        }
        document.getElementById("encNote").textContent = note;
        encodeInfoEl.style.display = "block";

        statusEl.textContent = "编码完成 — 代码 " + enc.code;
        statusEl.className = "status success";
      }

      // ── 参考表 ───────────────────────────────────────────────
      function buildRefTable() {
        var tbody = document.getElementById("refTableBody");
        REF_TABLE.forEach(function (row) {
          var code = row[0];
          var pf = row[1];
          var note = row[2];
          var vals = pfToAll(pf);
          var tr = document.createElement("tr");
          tr.title = "点击填入代码 " + code;

          var tdCode = document.createElement("td");
          tdCode.className = "code-col";
          tdCode.textContent = code;

          var tdPf = document.createElement("td");
          tdPf.textContent = vals.pf;

          var tdNf = document.createElement("td");
          tdNf.textContent = vals.nf;

          var tdUf = document.createElement("td");
          tdUf.textContent = vals.uf;

          var tdNote = document.createElement("td");
          tdNote.textContent = note;

          tr.appendChild(tdCode);
          tr.appendChild(tdPf);
          tr.appendChild(tdNf);
          tr.appendChild(tdUf);
          tr.appendChild(tdNote);

          tr.addEventListener(
            "click",
            (function (c) {
              return function () {
                codeInputEl.value = c;
                runDecode();
                codeInputEl.focus();
              };
            })(code)
          );

          tbody.appendChild(tr);
        });
      }

      // ── URL Hash 持久化 ──────────────────────────────────────
      function saveHash() {
        var code = codeInputEl.value.trim();
        if (/^\d{3}$/.test(code)) {
          history.replaceState(null, "", "#" + encodeURIComponent(code));
        } else {
          history.replaceState(null, "", location.pathname);
        }
      }

      function loadHash() {
        var hash = location.hash.slice(1);
        if (!hash) return;
        try {
          var code = decodeURIComponent(hash);
          if (/^\d{3}$/.test(code)) {
            codeInputEl.value = code;
            runDecode();
          }
        } catch (e) {
          // ignore malformed hash
        }
      }

      // ── 事件绑定 ─────────────────────────────────────────────
      codeInputEl.addEventListener("input", runDecode);
      valInputEl.addEventListener("input", runEncode);
      valUnitEl.addEventListener("change", runEncode);

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          if (document.activeElement === valInputEl || document.activeElement === valUnitEl) {
            runEncode();
          } else {
            runDecode();
          }
        }
      });

      // ── 初始化 ───────────────────────────────────────────────
      buildRefTable();
      loadHash();

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
    
