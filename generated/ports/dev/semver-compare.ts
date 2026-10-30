// @ts-nocheck
// Generated from tools/dev/semver-compare.html
// Source SHA-256: b692d57b9576c2eef7d7ceb85e688c1abe176f2eac79bce1d15cc973f07d062d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 解析版本号
      function parseVersion(v) {
        const match = v
          .trim()
          .match(/^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.-]+))?(?:\+([a-zA-Z0-9.-]+))?$/);
        if (!match) return null;
        return {
          major: parseInt(match[1], 10),
          minor: parseInt(match[2], 10),
          patch: parseInt(match[3], 10),
          prerelease: match[4] || "",
          build: match[5] || ""
        };
      }

      // 比较两个版本
      function compareVersions(a, b) {
        const va = parseVersion(a);
        const vb = parseVersion(b);

        if (!va || !vb) return NaN;

        if (va.major !== vb.major) return va.major - vb.major;
        if (va.minor !== vb.minor) return va.minor - vb.minor;
        if (va.patch !== vb.patch) return va.patch - vb.patch;

        // prerelease 比较
        if (va.prerelease && !vb.prerelease) return -1;
        if (!va.prerelease && vb.prerelease) return 1;
        if (va.prerelease && vb.prerelease) {
          return va.prerelease.localeCompare(vb.prerelease);
        }

        return 0;
      }

      // 检查版本是否满足范围
      function satisfiesRange(version, range) {
        const v = parseVersion(version);
        if (!v) return false;

        // 处理 || 分隔的多个范围
        const orParts = range.split("||").map((p) => p.trim());
        return orParts.some((part) => satisfiesSingleRange(version, part));
      }

      function satisfiesSingleRange(version, range) {
        const v = parseVersion(version);
        if (!v) return false;

        range = range.trim();

        // ^1.2.3 - 兼容修改
        if (range.startsWith("^")) {
          const base = parseVersion(range.slice(1));
          if (!base) return false;
          if (v.major !== base.major) return false;
          if (v.major === 0) {
            if (v.minor !== base.minor) return false;
            return v.patch >= base.patch;
          }
          return compareVersions(version, range.slice(1)) >= 0;
        }

        // ~1.2.3 - 约等于
        if (range.startsWith("~")) {
          const base = parseVersion(range.slice(1));
          if (!base) return false;
          return v.major === base.major && v.minor === base.minor && v.patch >= base.patch;
        }

        // 1.2.x 或 1.x
        if (range.includes("x") || range.includes("*")) {
          const parts = range.replace(/x|\*/g, "0").split(".");
          const base = parseVersion(parts.join("."));
          if (!base) return false;
          if (parts[2] === "0" && range.includes("x")) {
            // 1.2.x
            return v.major === base.major && v.minor === base.minor;
          }
          if (parts[1] === "0" && parts.length === 2) {
            // 1.x
            return v.major === base.major;
          }
        }

        // >=1.0.0 <2.0.0 (空格分隔的多个条件)
        const conditions = range.split(/\s+/).filter((c) => c);
        return conditions.every((cond) => checkCondition(version, cond));
      }

      function checkCondition(version, cond) {
        const v = parseVersion(version);
        if (!v) return false;

        let op, target;

        if (cond.startsWith(">=")) {
          op = ">=";
          target = cond.slice(2);
        } else if (cond.startsWith("<=")) {
          op = "<=";
          target = cond.slice(2);
        } else if (cond.startsWith(">")) {
          op = ">";
          target = cond.slice(1);
        } else if (cond.startsWith("<")) {
          op = "<";
          target = cond.slice(1);
        } else if (cond.startsWith("=")) {
          op = "=";
          target = cond.slice(1);
        } else {
          op = "=";
          target = cond;
        }

        const cmp = compareVersions(version, target);

        switch (op) {
          case ">=":
            return cmp >= 0;
          case "<=":
            return cmp <= 0;
          case ">":
            return cmp > 0;
          case "<":
            return cmp < 0;
          case "=":
            return cmp === 0;
          default:
            return false;
        }
      }

      // DOM 元素
      const versionAEl = document.getElementById("versionA");
      const versionBEl = document.getElementById("versionB");
      const compareResultEl = document.getElementById("compareResult");
      const rangeVersionEl = document.getElementById("rangeVersion");
      const rangeExprEl = document.getElementById("rangeExpr");
      const rangeResultEl = document.getElementById("rangeResult");
      const sortInputEl = document.getElementById("sortInput");

      function updateCompare() {
        const a = versionAEl.value.trim();
        const b = versionBEl.value.trim();

        if (!a || !b) {
          compareResultEl.textContent = "?";
          compareResultEl.className = "compare-result";
          return;
        }

        const cmp = compareVersions(a, b);

        if (isNaN(cmp)) {
          compareResultEl.textContent = "?";
          compareResultEl.className = "compare-result";
        } else if (cmp > 0) {
          compareResultEl.textContent = ">";
          compareResultEl.className = "compare-result gt";
        } else if (cmp < 0) {
          compareResultEl.textContent = "<";
          compareResultEl.className = "compare-result lt";
        } else {
          compareResultEl.textContent = "=";
          compareResultEl.className = "compare-result eq";
        }
      }

      function checkRange() {
        const version = rangeVersionEl.value.trim();
        const range = rangeExprEl.value.trim();

        if (!version || !range) {
          rangeResultEl.style.display = "none";
          return;
        }

        const matches = satisfiesRange(version, range);
        rangeResultEl.style.display = "block";
        rangeResultEl.className = "range-result " + (matches ? "match" : "no-match");
        rangeResultEl.textContent = matches
          ? `✓ ${version} 满足 ${range}`
          : `✗ ${version} 不满足 ${range}`;
      }

      function sortVersions(asc) {
        const lines = sortInputEl.value
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l);
        const sorted = lines.sort((a, b) => {
          const cmp = compareVersions(a, b);
          return asc ? cmp : -cmp;
        });
        sortInputEl.value = sorted.join("\n");
      }

      // 事件绑定
      versionAEl.addEventListener("input", updateCompare);
      versionBEl.addEventListener("input", updateCompare);
      document.getElementById("btnCheckRange").addEventListener("click", checkRange);
      document.getElementById("btnSortAsc").addEventListener("click", () => sortVersions(true));
      document.getElementById("btnSortDesc").addEventListener("click", () => sortVersions(false));

      // 示例点击
      document.querySelectorAll(".example-item").forEach((item) => {
        item.addEventListener("click", () => {
          rangeExprEl.value = item.dataset.range;
          checkRange();
        });
      });

      // 初始化
      updateCompare();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
