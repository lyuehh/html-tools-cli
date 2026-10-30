// @ts-nocheck
// Generated from tools/dev/html-entities.html
// Source SHA-256: 286661baac83d6604e31dfebfe764a2ebd482a8a8ea85c7032d51801880992bc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      const entities = [
        // Common
        { char: " ", name: "&nbsp;", code: "&#160;", desc: "不换行空格", cat: "common" },
        { char: "&", name: "&amp;", code: "&#38;", desc: "和号", cat: "common" },
        { char: "<", name: "&lt;", code: "&#60;", desc: "小于号", cat: "common" },
        { char: ">", name: "&gt;", code: "&#62;", desc: "大于号", cat: "common" },
        { char: '"', name: "&quot;", code: "&#34;", desc: "双引号", cat: "common" },
        { char: "'", name: "&apos;", code: "&#39;", desc: "单引号", cat: "common" },
        { char: "©", name: "&copy;", code: "&#169;", desc: "版权", cat: "common" },
        { char: "®", name: "&reg;", code: "&#174;", desc: "注册商标", cat: "common" },
        { char: "™", name: "&trade;", code: "&#8482;", desc: "商标", cat: "common" },
        { char: "°", name: "&deg;", code: "&#176;", desc: "度", cat: "common" },
        // Punctuation
        { char: "–", name: "&ndash;", code: "&#8211;", desc: "短破折号", cat: "punct" },
        { char: "—", name: "&mdash;", code: "&#8212;", desc: "长破折号", cat: "punct" },
        { char: "\u2018", name: "&lsquo;", code: "&#8216;", desc: "左单引号", cat: "punct" },
        { char: "\u2019", name: "&rsquo;", code: "&#8217;", desc: "右单引号", cat: "punct" },
        { char: "\u201C", name: "&ldquo;", code: "&#8220;", desc: "左双引号", cat: "punct" },
        { char: "\u201D", name: "&rdquo;", code: "&#8221;", desc: "右双引号", cat: "punct" },
        { char: "…", name: "&hellip;", code: "&#8230;", desc: "省略号", cat: "punct" },
        { char: "·", name: "&middot;", code: "&#183;", desc: "中点", cat: "punct" },
        { char: "•", name: "&bull;", code: "&#8226;", desc: "项目符号", cat: "punct" },
        { char: "¶", name: "&para;", code: "&#182;", desc: "段落符", cat: "punct" },
        { char: "§", name: "&sect;", code: "&#167;", desc: "章节符", cat: "punct" },
        // Arrows
        { char: "←", name: "&larr;", code: "&#8592;", desc: "左箭头", cat: "arrow" },
        { char: "→", name: "&rarr;", code: "&#8594;", desc: "右箭头", cat: "arrow" },
        { char: "↑", name: "&uarr;", code: "&#8593;", desc: "上箭头", cat: "arrow" },
        { char: "↓", name: "&darr;", code: "&#8595;", desc: "下箭头", cat: "arrow" },
        { char: "↔", name: "&harr;", code: "&#8596;", desc: "左右箭头", cat: "arrow" },
        { char: "↵", name: "&crarr;", code: "&#8629;", desc: "回车箭头", cat: "arrow" },
        { char: "⇐", name: "&lArr;", code: "&#8656;", desc: "双线左箭头", cat: "arrow" },
        { char: "⇒", name: "&rArr;", code: "&#8658;", desc: "双线右箭头", cat: "arrow" },
        { char: "⇑", name: "&uArr;", code: "&#8657;", desc: "双线上箭头", cat: "arrow" },
        { char: "⇓", name: "&dArr;", code: "&#8659;", desc: "双线下箭头", cat: "arrow" },
        { char: "⇔", name: "&hArr;", code: "&#8660;", desc: "双线左右箭头", cat: "arrow" },
        // Math
        { char: "±", name: "&plusmn;", code: "&#177;", desc: "正负号", cat: "math" },
        { char: "×", name: "&times;", code: "&#215;", desc: "乘号", cat: "math" },
        { char: "÷", name: "&divide;", code: "&#247;", desc: "除号", cat: "math" },
        { char: "=", name: "&equals;", code: "&#61;", desc: "等号", cat: "math" },
        { char: "≠", name: "&ne;", code: "&#8800;", desc: "不等号", cat: "math" },
        { char: "≈", name: "&asymp;", code: "&#8776;", desc: "约等于", cat: "math" },
        { char: "≤", name: "&le;", code: "&#8804;", desc: "小于等于", cat: "math" },
        { char: "≥", name: "&ge;", code: "&#8805;", desc: "大于等于", cat: "math" },
        { char: "∞", name: "&infin;", code: "&#8734;", desc: "无穷", cat: "math" },
        { char: "∑", name: "&sum;", code: "&#8721;", desc: "求和", cat: "math" },
        { char: "√", name: "&radic;", code: "&#8730;", desc: "根号", cat: "math" },
        { char: "π", name: "&pi;", code: "&#960;", desc: "圆周率", cat: "math" },
        { char: "∈", name: "&isin;", code: "&#8712;", desc: "属于", cat: "math" },
        { char: "∉", name: "&notin;", code: "&#8713;", desc: "不属于", cat: "math" },
        { char: "∅", name: "&empty;", code: "&#8709;", desc: "空集", cat: "math" },
        { char: "∩", name: "&cap;", code: "&#8745;", desc: "交集", cat: "math" },
        { char: "∪", name: "&cup;", code: "&#8746;", desc: "并集", cat: "math" },
        { char: "∀", name: "&forall;", code: "&#8704;", desc: "任意", cat: "math" },
        { char: "∃", name: "&exist;", code: "&#8707;", desc: "存在", cat: "math" },
        { char: "∂", name: "&part;", code: "&#8706;", desc: "偏导", cat: "math" },
        // Currency
        { char: "¢", name: "&cent;", code: "&#162;", desc: "美分", cat: "currency" },
        { char: "£", name: "&pound;", code: "&#163;", desc: "英镑", cat: "currency" },
        { char: "¥", name: "&yen;", code: "&#165;", desc: "日元/人民币", cat: "currency" },
        { char: "€", name: "&euro;", code: "&#8364;", desc: "欧元", cat: "currency" },
        { char: "₹", name: "&#8377;", code: "&#8377;", desc: "印度卢比", cat: "currency" },
        { char: "₩", name: "&#8361;", code: "&#8361;", desc: "韩元", cat: "currency" },
        { char: "฿", name: "&#3647;", code: "&#3647;", desc: "泰铢", cat: "currency" },
        // Symbols
        { char: "♠", name: "&spades;", code: "&#9824;", desc: "黑桃", cat: "symbol" },
        { char: "♣", name: "&clubs;", code: "&#9827;", desc: "梅花", cat: "symbol" },
        { char: "♥", name: "&hearts;", code: "&#9829;", desc: "红心", cat: "symbol" },
        { char: "♦", name: "&diams;", code: "&#9830;", desc: "方块", cat: "symbol" },
        { char: "★", name: "&#9733;", code: "&#9733;", desc: "实心星", cat: "symbol" },
        { char: "☆", name: "&#9734;", code: "&#9734;", desc: "空心星", cat: "symbol" },
        { char: "✓", name: "&#10003;", code: "&#10003;", desc: "勾选", cat: "symbol" },
        { char: "✗", name: "&#10007;", code: "&#10007;", desc: "叉号", cat: "symbol" },
        { char: "✉", name: "&#9993;", code: "&#9993;", desc: "信封", cat: "symbol" },
        { char: "☎", name: "&#9742;", code: "&#9742;", desc: "电话", cat: "symbol" },
        { char: "♪", name: "&#9834;", code: "&#9834;", desc: "音符", cat: "symbol" },
        { char: "♫", name: "&#9835;", code: "&#9835;", desc: "双音符", cat: "symbol" },
        { char: "☀", name: "&#9728;", code: "&#9728;", desc: "太阳", cat: "symbol" },
        { char: "☁", name: "&#9729;", code: "&#9729;", desc: "云", cat: "symbol" },
        { char: "☂", name: "&#9730;", code: "&#9730;", desc: "雨伞", cat: "symbol" },
        { char: "☃", name: "&#9731;", code: "&#9731;", desc: "雪人", cat: "symbol" },
        // Greek
        { char: "α", name: "&alpha;", code: "&#945;", desc: "alpha", cat: "greek" },
        { char: "β", name: "&beta;", code: "&#946;", desc: "beta", cat: "greek" },
        { char: "γ", name: "&gamma;", code: "&#947;", desc: "gamma", cat: "greek" },
        { char: "δ", name: "&delta;", code: "&#948;", desc: "delta", cat: "greek" },
        { char: "ε", name: "&epsilon;", code: "&#949;", desc: "epsilon", cat: "greek" },
        { char: "θ", name: "&theta;", code: "&#952;", desc: "theta", cat: "greek" },
        { char: "λ", name: "&lambda;", code: "&#955;", desc: "lambda", cat: "greek" },
        { char: "μ", name: "&mu;", code: "&#956;", desc: "mu", cat: "greek" },
        { char: "σ", name: "&sigma;", code: "&#963;", desc: "sigma", cat: "greek" },
        { char: "φ", name: "&phi;", code: "&#966;", desc: "phi", cat: "greek" },
        { char: "ω", name: "&omega;", code: "&#969;", desc: "omega", cat: "greek" },
        { char: "Δ", name: "&Delta;", code: "&#916;", desc: "Delta", cat: "greek" },
        { char: "Σ", name: "&Sigma;", code: "&#931;", desc: "Sigma", cat: "greek" },
        { char: "Ω", name: "&Omega;", code: "&#937;", desc: "Omega", cat: "greek" }
      ];

      const categories = {
        all: "全部",
        common: "常用",
        punct: "标点",
        arrow: "箭头",
        math: "数学",
        currency: "货币",
        symbol: "符号",
        greek: "希腊字母"
      };

      let currentCategory = "all";
      let selectedEntity = null;

      function init() {
        // Render category tabs
        const tabsHtml = Object.entries(categories)
          .map(
            ([key, name]) =>
              `<button class="tab-btn ${key === "all" ? "active" : ""}" data-cat="${key}" onclick="setCategory('${key}')">${name}</button>`
          )
          .join("");
        document.getElementById("categoryTabs").innerHTML = tabsHtml;

        filterEntities();

        // Close copy options on click outside
        document.addEventListener("click", (e) => {
          if (!e.target.closest(".copy-options") && !e.target.closest(".entity-card")) {
            document.getElementById("copyOptions").classList.remove("show");
          }
        });

        // Copy option click handlers
        document.querySelectorAll(".copy-option").forEach((opt) => {
          opt.addEventListener("click", () => {
            if (!selectedEntity) return;
            const type = opt.dataset.type;
            let text;
            switch (type) {
              case "char":
                text = selectedEntity.char;
                break;
              case "name":
                text = selectedEntity.name;
                break;
              case "code":
                text = selectedEntity.code;
                break;
            }
            navigator.clipboard.writeText(text);
            showToast(`已复制: ${text}`);
            document.getElementById("copyOptions").classList.remove("show");
          });
        });
      }

      window.setCategory = function (cat) {
        currentCategory = cat;
        document.querySelectorAll(".tab-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.cat === cat);
        });
        filterEntities();
      };

      function filterEntities() {
        const search = document.getElementById("searchInput").value.toLowerCase();
        let filtered = entities;

        if (currentCategory !== "all") {
          filtered = filtered.filter((e) => e.cat === currentCategory);
        }

        if (search) {
          filtered = filtered.filter(
            (e) =>
              e.char.toLowerCase().includes(search) ||
              e.name.toLowerCase().includes(search) ||
              e.desc.toLowerCase().includes(search)
          );
        }

        renderEntities(filtered);
      }

      function renderEntities(list) {
        const grid = document.getElementById("entitiesGrid");
        grid.innerHTML = list
          .map(
            (e, i) => `
                <div class="entity-card" data-index="${i}" onclick="showCopyOptions(event, ${entities.indexOf(e)})">
                    <div class="entity-char">${e.char}</div>
                    <div class="entity-name">${escapeHtml(e.name)}</div>
                    <div class="entity-code">${e.code}</div>
                    <div class="entity-desc">${e.desc}</div>
                </div>
            `
          )
          .join("");

        document.getElementById("stats").textContent =
          `显示 ${list.length} / ${entities.length} 个实体`;
      }

      window.escapeHtml = function (text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };

      window.showCopyOptions = function (event, index) {
        event.stopPropagation();
        selectedEntity = entities[index];

        document.getElementById("optChar").textContent = selectedEntity.char;
        document.getElementById("optName").textContent = selectedEntity.name;
        document.getElementById("optCode").textContent = selectedEntity.code;

        const options = document.getElementById("copyOptions");
        const rect = event.currentTarget.getBoundingClientRect();
        options.style.left = Math.min(rect.left, window.innerWidth - 220) + "px";
        options.style.top = rect.bottom + 5 + "px";
        options.classList.add("show");
      };

      function showToast(text) {
        const toast = document.getElementById("toast");
        toast.textContent = text;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      init();
    
