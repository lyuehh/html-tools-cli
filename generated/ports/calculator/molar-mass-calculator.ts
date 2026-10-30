// @ts-nocheck
// Generated from tools/calculator/molar-mass-calculator.html
// Source SHA-256: 420ba743cb75a503bbf43e12f4f99229e42abe7770e300e659975a7466da8ec1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // === 元素周期表数据（原子序数、符号、中文名、相对原子质量 IUPAC 2021） ===
      const ELEMENTS = {
        H: { name: "氢", mass: 1.008 },
        He: { name: "氦", mass: 4.0026 },
        Li: { name: "锂", mass: 6.94 },
        Be: { name: "铍", mass: 9.0122 },
        B: { name: "硼", mass: 10.81 },
        C: { name: "碳", mass: 12.011 },
        N: { name: "氮", mass: 14.007 },
        O: { name: "氧", mass: 15.999 },
        F: { name: "氟", mass: 18.998 },
        Ne: { name: "氖", mass: 20.18 },
        Na: { name: "钠", mass: 22.99 },
        Mg: { name: "镁", mass: 24.305 },
        Al: { name: "铝", mass: 26.982 },
        Si: { name: "硅", mass: 28.085 },
        P: { name: "磷", mass: 30.974 },
        S: { name: "硫", mass: 32.06 },
        Cl: { name: "氯", mass: 35.45 },
        Ar: { name: "氩", mass: 39.948 },
        K: { name: "钾", mass: 39.098 },
        Ca: { name: "钙", mass: 40.078 },
        Sc: { name: "钪", mass: 44.956 },
        Ti: { name: "钛", mass: 47.867 },
        V: { name: "钒", mass: 50.942 },
        Cr: { name: "铬", mass: 51.996 },
        Mn: { name: "锰", mass: 54.938 },
        Fe: { name: "铁", mass: 55.845 },
        Co: { name: "钴", mass: 58.933 },
        Ni: { name: "镍", mass: 58.693 },
        Cu: { name: "铜", mass: 63.546 },
        Zn: { name: "锌", mass: 65.38 },
        Ga: { name: "镓", mass: 69.723 },
        Ge: { name: "锗", mass: 72.63 },
        As: { name: "砷", mass: 74.922 },
        Se: { name: "硒", mass: 78.971 },
        Br: { name: "溴", mass: 79.904 },
        Kr: { name: "氪", mass: 83.798 },
        Rb: { name: "铷", mass: 85.468 },
        Sr: { name: "锶", mass: 87.62 },
        Y: { name: "钇", mass: 88.906 },
        Zr: { name: "锆", mass: 91.224 },
        Nb: { name: "铌", mass: 92.906 },
        Mo: { name: "钼", mass: 95.95 },
        Tc: { name: "锝", mass: 97 },
        Ru: { name: "钌", mass: 101.07 },
        Rh: { name: "铑", mass: 102.91 },
        Pd: { name: "钯", mass: 106.42 },
        Ag: { name: "银", mass: 107.87 },
        Cd: { name: "镉", mass: 112.41 },
        In: { name: "铟", mass: 114.82 },
        Sn: { name: "锡", mass: 118.71 },
        Sb: { name: "锑", mass: 121.76 },
        Te: { name: "碲", mass: 127.6 },
        I: { name: "碘", mass: 126.9 },
        Xe: { name: "氙", mass: 131.29 },
        Cs: { name: "铯", mass: 132.91 },
        Ba: { name: "钡", mass: 137.33 },
        La: { name: "镧", mass: 138.91 },
        Ce: { name: "铈", mass: 140.12 },
        Pr: { name: "镨", mass: 140.91 },
        Nd: { name: "钕", mass: 144.24 },
        Pm: { name: "钷", mass: 145 },
        Sm: { name: "钐", mass: 150.36 },
        Eu: { name: "铕", mass: 151.96 },
        Gd: { name: "钆", mass: 157.25 },
        Tb: { name: "铽", mass: 158.93 },
        Dy: { name: "镝", mass: 162.5 },
        Ho: { name: "钬", mass: 164.93 },
        Er: { name: "铒", mass: 167.26 },
        Tm: { name: "铥", mass: 168.93 },
        Yb: { name: "镱", mass: 173.05 },
        Lu: { name: "镥", mass: 174.97 },
        Hf: { name: "铪", mass: 178.49 },
        Ta: { name: "钽", mass: 180.95 },
        W: { name: "钨", mass: 183.84 },
        Re: { name: "铼", mass: 186.21 },
        Os: { name: "锇", mass: 190.23 },
        Ir: { name: "铱", mass: 192.22 },
        Pt: { name: "铂", mass: 195.08 },
        Au: { name: "金", mass: 196.97 },
        Hg: { name: "汞", mass: 200.59 },
        Tl: { name: "铊", mass: 204.38 },
        Pb: { name: "铅", mass: 207.2 },
        Bi: { name: "铋", mass: 208.98 },
        Po: { name: "钋", mass: 209 },
        At: { name: "砹", mass: 210 },
        Rn: { name: "氡", mass: 222 },
        Fr: { name: "钫", mass: 223 },
        Ra: { name: "镭", mass: 226 },
        Ac: { name: "锕", mass: 227 },
        Th: { name: "钍", mass: 232.04 },
        Pa: { name: "镤", mass: 231.04 },
        U: { name: "铀", mass: 238.03 },
        Np: { name: "镎", mass: 237 },
        Pu: { name: "钚", mass: 244 },
        Am: { name: "镅", mass: 243 },
        Cm: { name: "锔", mass: 247 },
        Bk: { name: "锫", mass: 247 },
        Cf: { name: "锎", mass: 251 },
        Es: { name: "锿", mass: 252 },
        Fm: { name: "镄", mass: 257 },
        Md: { name: "钔", mass: 258 },
        No: { name: "锘", mass: 259 },
        Lr: { name: "铹", mass: 266 }
      };

      const EXAMPLES = [
        "H2O",
        "H2SO4",
        "NaCl",
        "C6H12O6",
        "Ca(OH)2",
        "Fe2O3",
        "CaCO3",
        "Al2(SO4)3",
        "K2Cr2O7",
        "C12H22O11"
      ];

      // DOM refs
      const formulaInput = document.getElementById("formulaInput");
      const btnCalc = document.getElementById("btnCalc");
      const btnClear = document.getElementById("btnClear");
      const errorDetailEl = document.getElementById("errorDetail");
      const resultSection = document.getElementById("resultSection");
      const resultFormula = document.getElementById("resultFormula");
      const resultValue = document.getElementById("resultValue");
      const breakdownBody = document.getElementById("breakdownBody");
      const statusEl = document.getElementById("status");
      const statsEl = document.getElementById("stats");
      const massInput = document.getElementById("massInput");
      const molesInput = document.getElementById("molesInput");
      const molesResult = document.getElementById("molesResult");
      const massResult = document.getElementById("massResult");

      let currentMolarMass = 0;

      // === 化学式解析器 ===
      // 支持括号嵌套，如 Al2(SO4)3, Ca(OH)2, K2[Fe(CN)6] 等
      function parseFormula(formula) {
        // 标准化：将 [] 替换为 ()
        const f = formula.replace(/\[/g, "(").replace(/\]/g, ")");
        const result = {};
        const stack = [{}];
        let i = 0;

        while (i < f.length) {
          const ch = f[i];

          if (ch === "(") {
            stack.push({});
            i++;
          } else if (ch === ")") {
            i++;
            let numStr = "";
            while (i < f.length && f[i] >= "0" && f[i] <= "9") {
              numStr += f[i++];
            }
            const multiplier = numStr ? parseInt(numStr, 10) : 1;
            const top = stack.pop();
            const current = stack[stack.length - 1];
            for (const sym in top) {
              current[sym] = (current[sym] || 0) + top[sym] * multiplier;
            }
          } else if (ch >= "A" && ch <= "Z") {
            // 元素符号：大写字母开头，后跟 0 或多个小写字母
            let sym = ch;
            i++;
            while (i < f.length && f[i] >= "a" && f[i] <= "z") {
              sym += f[i++];
            }
            if (!ELEMENTS[sym]) {
              throw new Error("未知元素符号：" + sym);
            }
            let numStr = "";
            while (i < f.length && f[i] >= "0" && f[i] <= "9") {
              numStr += f[i++];
            }
            const count = numStr ? parseInt(numStr, 10) : 1;
            const current = stack[stack.length - 1];
            current[sym] = (current[sym] || 0) + count;
          } else if (ch === "·" || ch === "•" || ch === "·") {
            // 水合物点号，忽略前面内容，开始新的解析段
            i++;
          } else if (ch >= "0" && ch <= "9") {
            // 水合物前的系数，如 CuSO4·5H2O 中的 5
            // 此处直接跳过（由括号逻辑处理系数），若在顶层直接当系数处理
            let numStr = "";
            while (i < f.length && f[i] >= "0" && f[i] <= "9") {
              numStr += f[i++];
            }
            const coeff = parseInt(numStr, 10);
            // 读取后续元素
            if (i < f.length && f[i] >= "A" && f[i] <= "Z") {
              let sym = f[i++];
              while (i < f.length && f[i] >= "a" && f[i] <= "z") {
                sym += f[i++];
              }
              if (!ELEMENTS[sym]) {
                throw new Error("未知元素符号：" + sym);
              }
              let num2 = "";
              while (i < f.length && f[i] >= "0" && f[i] <= "9") {
                num2 += f[i++];
              }
              const cnt = num2 ? parseInt(num2, 10) : 1;
              const current = stack[stack.length - 1];
              current[sym] = (current[sym] || 0) + coeff * cnt;
            }
          } else {
            throw new Error("不支持的字符：" + ch);
          }
        }

        if (stack.length !== 1) {
          throw new Error("括号不匹配");
        }
        return stack[0];
      }

      function formatNum(n) {
        // 最多 4 位小数，去掉多余 0
        return parseFloat(n.toFixed(4)).toString();
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status" + (type ? " " + type : "");
      }

      function showError(msg) {
        errorDetailEl.textContent = msg;
        errorDetailEl.classList.add("show");
        formulaInput.classList.add("error");
        resultSection.classList.remove("show");
        statsEl.classList.remove("show");
        showStatus("解析失败", "error");
      }

      function clearError() {
        errorDetailEl.classList.remove("show");
        errorDetailEl.textContent = "";
        formulaInput.classList.remove("error");
      }

      function calculate() {
        const raw = formulaInput.value.trim();
        if (!raw) {
          showStatus("请输入化学式", "error");
          clearError();
          resultSection.classList.remove("show");
          statsEl.classList.remove("show");
          return;
        }
        clearError();

        let composition;
        try {
          composition = parseFormula(raw);
        } catch (e) {
          showError(e.message);
          return;
        }

        if (Object.keys(composition).length === 0) {
          showError("化学式为空或无法解析");
          return;
        }

        // 计算摩尔质量
        let total = 0;
        let totalAtoms = 0;
        const rows = [];
        for (const sym in composition) {
          const cnt = composition[sym];
          const atomMass = ELEMENTS[sym].mass;
          const subtotal = cnt * atomMass;
          total += subtotal;
          totalAtoms += cnt;
          rows.push({ sym, cnt, atomMass, subtotal });
        }

        currentMolarMass = total;

        // 显示结果
        resultFormula.textContent = raw;
        resultValue.textContent = formatNum(total);

        // 填充明细表
        breakdownBody.innerHTML = "";
        rows.forEach(function (r) {
          const pct = ((r.subtotal / total) * 100).toFixed(2);
          const barW = Math.round((r.subtotal / total) * 100);
          const tr = document.createElement("tr");
          tr.innerHTML =
            '<td><span class="elem-symbol">' +
            r.sym +
            '</span><span class="elem-name">' +
            ELEMENTS[r.sym].name +
            '</span></td><td style="font-family:var(--font-mono)">' +
            r.cnt +
            '</td><td style="font-family:var(--font-mono)">' +
            formatNum(r.atomMass) +
            '</td><td style="font-family:var(--font-mono);color:var(--color-accent-primary)">' +
            formatNum(r.subtotal) +
            '</td><td class="bar-cell"><div class="bar-wrap"><div class="bar-fill" style="width:' +
            barW +
            '%"></div></div><span class="pct-text">' +
            pct +
            "%</span></td>";
          breakdownBody.appendChild(tr);
        });

        // 重置换算
        massInput.value = "";
        molesInput.value = "";
        molesResult.textContent = "— mol";
        massResult.textContent = "— g";

        resultSection.classList.add("show");

        // 状态栏统计
        document.getElementById("statMolar").textContent = formatNum(total);
        document.getElementById("statAtoms").textContent = totalAtoms;
        document.getElementById("statElems").textContent = Object.keys(composition).length;
        statsEl.classList.add("show");

        showStatus("计算成功", "success");
      }

      function clearAll() {
        formulaInput.value = "";
        clearError();
        resultSection.classList.remove("show");
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        currentMolarMass = 0;
        massInput.value = "";
        molesInput.value = "";
        molesResult.textContent = "— mol";
        massResult.textContent = "— g";
        localStorage.removeItem("molar_formula_v1");
        history.replaceState(null, "", location.pathname);
      }

      // 按钮绑定
      btnCalc.onclick = calculate;
      btnClear.onclick = clearAll;

      // 回车触发计算
      formulaInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          calculate();
        }
      });

      // 自动保存 & URL hash
      formulaInput.addEventListener("input", function () {
        localStorage.setItem("molar_formula_v1", formulaInput.value);
        try {
          const enc = btoa(encodeURIComponent(formulaInput.value));
          history.replaceState(null, "", "#" + enc);
        } catch (_e) {
          // ignore
        }
      });

      // 质量 → 摩尔数
      massInput.addEventListener("input", function () {
        const m = parseFloat(massInput.value);
        if (isNaN(m) || m < 0 || currentMolarMass === 0) {
          molesResult.textContent = "— mol";
          return;
        }
        molesResult.textContent = formatNum(m / currentMolarMass) + " mol";
      });

      // 摩尔数 → 质量
      molesInput.addEventListener("input", function () {
        const mol = parseFloat(molesInput.value);
        if (isNaN(mol) || mol < 0 || currentMolarMass === 0) {
          massResult.textContent = "— g";
          return;
        }
        massResult.textContent = formatNum(mol * currentMolarMass) + " g";
      });

      // 示例按钮
      const examplesBar = document.getElementById("examplesBar");
      EXAMPLES.forEach(function (ex) {
        const chip = document.createElement("button");
        chip.className = "example-chip";
        chip.textContent = ex;
        chip.type = "button";
        chip.onclick = function () {
          formulaInput.value = ex;
          calculate();
        };
        examplesBar.appendChild(chip);
      });

      // 初始化：从 URL hash 或 localStorage 恢复
      function init() {
        const hash = location.hash.slice(1);
        if (hash) {
          try {
            const val = decodeURIComponent(atob(hash));
            formulaInput.value = val;
            calculate();
            return;
          } catch (_e) {
            // ignore
          }
        }
        const saved = localStorage.getItem("molar_formula_v1");
        if (saved) {
          formulaInput.value = saved;
          calculate();
        }
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      init();
    
