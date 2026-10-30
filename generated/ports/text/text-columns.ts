// @ts-nocheck
// Generated from tools/text/text-columns.html
// Source SHA-256: ee796f3dd2ba48ed349ae78fe8432d5f1111f8e1863a99bfe73037a63c495a53
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const t =
          document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      function parseColumnSpec(spec, maxCol) {
        const cols = [];
        spec.split(",").forEach((part) => {
          part = part.trim();
          if (part.includes("-")) {
            const [start, end] = part.split("-").map((n) => parseInt(n.trim()));
            for (let i = start; i <= end && i <= maxCol; i++) cols.push(i);
          } else {
            const n = parseInt(part);
            if (n && n <= maxCol) cols.push(n);
          }
        });
        return cols;
      }

      function process() {
        const input = document.getElementById("input").value;
        const operation = document.getElementById("operation").value;
        const inDelim = document.getElementById("inputDelimiter").value.replace("\\t", "\t");
        const outDelim = document.getElementById("outputDelimiter").value.replace("\\t", "\t");
        const colSpec = document.getElementById("columns").value;

        const lines = input.split("\n").filter((l) => l.trim());
        if (!lines.length) {
          document.getElementById("output").value = "";
          document.getElementById("columnInfo").innerHTML = "";
          return;
        }

        const data = lines.map((line) => line.split(inDelim));
        const maxCols = Math.max(...data.map((row) => row.length));
        const cols = parseColumnSpec(colSpec, maxCols);

        let result;
        switch (operation) {
          case "extract":
            result = data.map((row) => cols.map((c) => row[c - 1] || "").join(outDelim));
            break;
          case "remove":
            result = data.map((row) => row.filter((_, i) => !cols.includes(i + 1)).join(outDelim));
            break;
          case "reorder":
            result = data.map((row) => cols.map((c) => row[c - 1] || "").join(outDelim));
            break;
          case "swap":
            if (cols.length >= 2) {
              const [a, b] = [cols[0] - 1, cols[1] - 1];
              result = data.map((row) => {
                const newRow = [...row];
                [newRow[a], newRow[b]] = [newRow[b], newRow[a]];
                return newRow.join(outDelim);
              });
            } else {
              result = data.map((row) => row.join(outDelim));
            }
            break;
        }

        document.getElementById("output").value = result.join("\n");

        // Show column info
        const firstRow = data[0] || [];
        document.getElementById("columnInfo").innerHTML =
          '<strong style="color:var(--color-text-secondary);margin-right:0.5rem;">检测到的列:</strong>' +
          firstRow
            .map(
              (col, i) =>
                `<span>列${i + 1}: ${col.substring(0, 10)}${col.length > 10 ? "..." : ""}</span>`
            )
            .join("");
      }

      window.copyOutput = function () {
        navigator.clipboard.writeText(document.getElementById("output").value);
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      };

      window.clearAll = function () {
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("columnInfo").innerHTML = "";
      };

      process();
    
