// @ts-nocheck
// Generated from tools/math/matrix-determinant-inverse.html
// Source SHA-256: fcdbdbf90a66233992ad1d7a266991420c79b817de10da509ff1ea571f90ad09
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var currentSize = 3;
      var currentResult = null;
      var activeTab = "det";

      function getPrec() {
        return parseInt(document.getElementById("precSelect").value, 10);
      }

      function fmt(v) {
        var p = getPrec();
        if (Math.abs(v) < 1e-10) return "0";
        return parseFloat(v.toFixed(p)).toString();
      }

      // ── Matrix grid rendering ──
      function buildGrid(size) {
        var grid = document.getElementById("matrixGrid");
        grid.innerHTML = "";
        grid.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
        for (var r = 0; r < size; r++) {
          for (var c = 0; c < size; c++) {
            var inp = document.createElement("input");
            inp.type = "number";
            inp.step = "any";
            inp.className = "matrix-cell";
            inp.id = "cell_" + r + "_" + c;
            inp.value = r === c ? "1" : "0";
            inp.setAttribute("aria-label", "行" + (r + 1) + " 列" + (c + 1));
            grid.appendChild(inp);
          }
        }
      }

      function getMatrix(size) {
        var m = [];
        for (var r = 0; r < size; r++) {
          m.push([]);
          for (var c = 0; c < size; c++) {
            var v = parseFloat(document.getElementById("cell_" + r + "_" + c).value);
            m[r].push(isNaN(v) ? 0 : v);
          }
        }
        return m;
      }

      // ── Linear algebra utilities ──
      function cloneMatrix(m) {
        return m.map(function (row) {
          return row.slice();
        });
      }

      function transposeMatrix(m) {
        var n = m.length;
        var t = [];
        for (var i = 0; i < n; i++) {
          t.push([]);
          for (var j = 0; j < n; j++) {
            t[i].push(m[j][i]);
          }
        }
        return t;
      }

      function matMul(a, b) {
        var n = a.length;
        var c = [];
        for (var i = 0; i < n; i++) {
          c.push([]);
          for (var j = 0; j < n; j++) {
            var s = 0;
            for (var k = 0; k < n; k++) {
              s += a[i][k] * b[k][j];
            }
            c[i].push(s);
          }
        }
        return c;
      }

      // Gaussian elimination with partial pivoting — returns det and inverse
      function gaussJordan(m) {
        var n = m.length;
        var aug = [];
        var steps = [];
        var i;
        var j;
        for (i = 0; i < n; i++) {
          aug.push(m[i].slice());
          for (j = 0; j < n; j++) {
            aug[i].push(i === j ? 1 : 0);
          }
        }

        var det = 1;
        for (var col = 0; col < n; col++) {
          var maxRow = col;
          for (var row = col + 1; row < n; row++) {
            if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) {
              maxRow = row;
            }
          }
          if (maxRow !== col) {
            var tmp = aug[col];
            aug[col] = aug[maxRow];
            aug[maxRow] = tmp;
            det *= -1;
            steps.push("交换第 " + (col + 1) + " 行和第 " + (maxRow + 1) + " 行");
          }

          var pivot = aug[col][col];
          if (Math.abs(pivot) < 1e-12) {
            return { det: 0, inverse: null, steps: steps, singular: true };
          }
          det *= pivot;

          steps.push(
            "以 a[" +
              (col + 1) +
              "][" +
              (col + 1) +
              "] = " +
              fmt(pivot) +
              " 为主元消去第 " +
              (col + 1) +
              " 列"
          );

          for (var k = 0; k < 2 * n; k++) {
            aug[col][k] /= pivot;
          }

          for (var r2 = 0; r2 < n; r2++) {
            if (r2 === col) continue;
            var factor = aug[r2][col];
            if (Math.abs(factor) < 1e-14) continue;
            for (var k2 = 0; k2 < 2 * n; k2++) {
              aug[r2][k2] -= factor * aug[col][k2];
            }
          }
        }

        var inv = [];
        for (var ii = 0; ii < n; ii++) {
          inv.push(aug[ii].slice(n));
        }
        return { det: det, inverse: inv, steps: steps, singular: false };
      }

      function det2x2(m) {
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];
      }

      function detSteps2(m) {
        var d = det2x2(m);
        return (
          "det(A) = a₁₁·a₂₂ − a₁₂·a₂₁\n" +
          "       = " +
          fmt(m[0][0]) +
          " × " +
          fmt(m[1][1]) +
          " − " +
          fmt(m[0][1]) +
          " × " +
          fmt(m[1][0]) +
          "\n" +
          "       = " +
          fmt(d) +
          "\n"
        );
      }

      function matMinor(m, row, col) {
        return m
          .filter(function (_, r) {
            return r !== row;
          })
          .map(function (r) {
            return r.filter(function (_, c) {
              return c !== col;
            });
          });
      }

      function determinant(m) {
        var n = m.length;
        if (n === 1) return m[0][0];
        if (n === 2) return det2x2(m);
        var d = 0;
        for (var j = 0; j < n; j++) {
          d += (j % 2 === 0 ? 1 : -1) * m[0][j] * determinant(matMinor(m, 0, j));
        }
        return d;
      }

      function detSteps3(m) {
        var lines = [];
        lines.push("按第一行展开（余子式展开）:");
        var d = 0;
        for (var j = 0; j < 3; j++) {
          var sign = j % 2 === 0 ? "+" : "−";
          var mn = matMinor(m, 0, j);
          var md = det2x2(mn);
          var contrib = (j % 2 === 0 ? 1 : -1) * m[0][j] * md;
          d += contrib;
          lines.push(
            "  " +
              sign +
              " " +
              fmt(m[0][j]) +
              " × M₁" +
              (j + 1) +
              " = " +
              sign +
              " " +
              fmt(m[0][j]) +
              " × (" +
              fmt(mn[0][0]) +
              "·" +
              fmt(mn[1][1]) +
              " − " +
              fmt(mn[0][1]) +
              "·" +
              fmt(mn[1][0]) +
              ") = " +
              fmt(contrib)
          );
        }
        lines.push("det(A) = " + fmt(d));
        return lines.join("\n") + "\n";
      }

      function buildDetSteps(m, n) {
        var s = "=== 行列式计算 ===\n";
        if (n === 2) {
          s += detSteps2(m);
        } else if (n === 3) {
          s += detSteps3(m);
        } else {
          s += "（4×4 使用高斯消元求行列式）\n";
          s += "det(A) = " + fmt(determinant(m)) + "\n";
        }
        return s;
      }

      function buildInvSteps(gjResult) {
        var s = "\n=== 逆矩阵（Gauss-Jordan 消元）===\n";
        if (gjResult.singular) {
          s += "矩阵奇异（行列式为 0），逆矩阵不存在。\n";
          return s;
        }
        s += gjResult.steps.join("\n") + "\n";
        s += "消元完成，右半部分即为 A⁻¹（已归一化）。\n";
        return s;
      }

      // ── Eigenvalue computation ──
      function eigenvalues2x2(m) {
        var tr = m[0][0] + m[1][1];
        var d = det2x2(m);
        var disc = tr * tr - 4 * d;
        if (disc < 0) {
          var re = tr / 2;
          var im = Math.sqrt(-disc) / 2;
          return [
            { re: re, im: im },
            { re: re, im: -im }
          ];
        }
        var sq = Math.sqrt(disc);
        return [
          { re: (tr + sq) / 2, im: 0 },
          { re: (tr - sq) / 2, im: 0 }
        ];
      }

      function solveCubic(a, b, c, d) {
        b /= a;
        c /= a;
        d /= a;
        var p3 = (3 * c - b * b) / 3;
        var q2 = (2 * b * b * b - 9 * b * c + 27 * d) / 27;
        var disc = (q2 / 2) * (q2 / 2) + (p3 / 3) * (p3 / 3) * (p3 / 3);
        var shift = -b / 3;
        var roots = [];
        if (Math.abs(disc) < 1e-10) {
          var u3 = Math.cbrt(-q2 / 2);
          roots = [
            { re: shift + 2 * u3, im: 0 },
            { re: shift - u3, im: 0 },
            { re: shift - u3, im: 0 }
          ];
        } else if (disc > 0) {
          var sqD = Math.sqrt(disc);
          var u1 = Math.cbrt(-q2 / 2 + sqD);
          var v1 = Math.cbrt(-q2 / 2 - sqD);
          roots = [
            { re: shift + u1 + v1, im: 0 },
            { re: shift - (u1 + v1) / 2, im: (Math.sqrt(3) / 2) * Math.abs(u1 - v1) },
            { re: shift - (u1 + v1) / 2, im: -(Math.sqrt(3) / 2) * Math.abs(u1 - v1) }
          ];
        } else {
          var r3 = Math.sqrt(-(p3 / 3) * (p3 / 3) * (p3 / 3));
          var theta = Math.acos(-q2 / 2 / r3);
          var m3 = 2 * Math.cbrt(r3);
          roots = [
            { re: shift + m3 * Math.cos(theta / 3), im: 0 },
            { re: shift + m3 * Math.cos((theta + 2 * Math.PI) / 3), im: 0 },
            { re: shift + m3 * Math.cos((theta + 4 * Math.PI) / 3), im: 0 }
          ];
        }
        return roots;
      }

      function eigenvalues3x3(m) {
        var tr = m[0][0] + m[1][1] + m[2][2];
        var d = determinant(m);
        var q =
          det2x2([
            [m[0][0], m[0][1]],
            [m[1][0], m[1][1]]
          ]) +
          det2x2([
            [m[0][0], m[0][2]],
            [m[2][0], m[2][2]]
          ]) +
          det2x2([
            [m[1][1], m[1][2]],
            [m[2][1], m[2][2]]
          ]);
        return solveCubic(1, -tr, q, -d);
      }

      function gramSchmidt(A, n) {
        var Q = [];
        for (var j = 0; j < n; j++) {
          var col = [];
          var i;
          for (i = 0; i < n; i++) {
            col.push(A[i][j]);
          }
          for (var k = 0; k < j; k++) {
            var dot = 0;
            for (i = 0; i < n; i++) {
              dot += col[i] * Q[k][i];
            }
            for (i = 0; i < n; i++) {
              col[i] -= dot * Q[k][i];
            }
          }
          var norm = 0;
          for (i = 0; i < n; i++) {
            norm += col[i] * col[i];
          }
          norm = Math.sqrt(norm);
          if (norm < 1e-14) {
            for (i = 0; i < n; i++) {
              col[i] = i === j ? 1 : 0;
            }
          } else {
            for (i = 0; i < n; i++) {
              col[i] /= norm;
            }
          }
          Q.push(col);
        }
        return transposeMatrix(Q);
      }

      function qrEigenvalues(m) {
        var n = m.length;
        var A = cloneMatrix(m);
        for (var iter = 0; iter < 2000; iter++) {
          var q = gramSchmidt(A, n);
          var qT = transposeMatrix(q);
          A = matMul(matMul(qT, A), q);
          var off = 0;
          for (var ii = 0; ii < n; ii++) {
            for (var jj = 0; jj < n; jj++) {
              if (ii !== jj) {
                off += A[ii][jj] * A[ii][jj];
              }
            }
          }
          if (off < 1e-20) break;
        }
        var eigs = [];
        for (var kk = 0; kk < n; kk++) {
          eigs.push({ re: A[kk][kk], im: 0 });
        }
        return eigs;
      }

      function fmtEigen(e) {
        if (Math.abs(e.im) < 1e-8) return fmt(e.re);
        var sign = e.im >= 0 ? "+" : "−";
        return fmt(e.re) + " " + sign + " " + fmt(Math.abs(e.im)) + "i";
      }

      // ── Render helpers ──
      function renderMatrix(data) {
        var n = data.length;
        var div = document.createElement("div");
        div.className = "result-matrix";
        div.style.gridTemplateColumns = "repeat(" + n + ", 1fr)";
        for (var r = 0; r < n; r++) {
          for (var c = 0; c < n; c++) {
            var cell = document.createElement("div");
            cell.className = "result-cell";
            cell.textContent = fmt(data[r][c]);
            div.appendChild(cell);
          }
        }
        return div;
      }

      // ── Tabs ──
      var TAB_NAMES = ["Det", "Inv", "Transpose", "Eigen", "Steps"];
      TAB_NAMES.forEach(function (name) {
        document.getElementById("tab" + name).addEventListener("click", function () {
          activeTab = name.toLowerCase();
          TAB_NAMES.forEach(function (n2) {
            document.getElementById("tab" + n2).classList.toggle("active", n2 === name);
            document.getElementById("panel" + n2).classList.toggle("active", n2 === name);
          });
        });
      });

      // ── Main calculation ──
      function calculate() {
        var n = currentSize;
        var m = getMatrix(n);
        var steps = "";

        var det = determinant(m);
        steps += buildDetSteps(m, n);

        var gjResult = gaussJordan(m);
        steps += buildInvSteps(gjResult);

        var trans = transposeMatrix(m);

        var eigs = [];
        if (n === 2) {
          eigs = eigenvalues2x2(m);
        } else if (n === 3) {
          eigs = eigenvalues3x3(m);
        } else {
          eigs = qrEigenvalues(m);
        }
        steps += "\n=== 特征值 ===\n";
        eigs.forEach(function (e, idx) {
          steps += "λ" + (idx + 1) + " = " + fmtEigen(e) + "\n";
        });

        currentResult = {
          det: det,
          inv: gjResult.inverse,
          trans: trans,
          eigs: eigs,
          steps: steps
        };

        document.getElementById("detValue").textContent = fmt(det);

        var invContent = document.getElementById("invContent");
        invContent.innerHTML = "";
        if (gjResult.singular) {
          var note = document.createElement("div");
          note.className = "singular-note";
          note.textContent = "矩阵奇异（行列式为 0），逆矩阵不存在。";
          invContent.appendChild(note);
        } else {
          invContent.appendChild(renderMatrix(gjResult.inverse));
        }

        var transposeContent = document.getElementById("transposeContent");
        transposeContent.innerHTML = "";
        transposeContent.appendChild(renderMatrix(trans));

        var eigenContent = document.getElementById("eigenContent");
        eigenContent.innerHTML = "";
        var list = document.createElement("div");
        list.className = "eigenvalue-list";
        eigs.forEach(function (e) {
          var chip = document.createElement("span");
          chip.className = "eigenvalue-chip";
          chip.textContent = "λ = " + fmtEigen(e);
          list.appendChild(chip);
        });
        eigenContent.appendChild(list);

        document.getElementById("stepsContent").textContent = steps;
        document.getElementById("resultSection").style.display = "block";

        showStatus("计算完成", "success");
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      // ── Button wiring ──
      document.getElementById("btnCalc").onclick = function () {
        try {
          calculate();
        } catch (e) {
          showStatus("计算错误: " + e.message, "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        var n = currentSize;
        for (var r = 0; r < n; r++) {
          for (var c = 0; c < n; c++) {
            var el = document.getElementById("cell_" + r + "_" + c);
            if (el) el.value = "";
          }
        }
        document.getElementById("resultSection").style.display = "none";
        showStatus("", "");
      };

      document.getElementById("btnRandom").onclick = function () {
        var n = currentSize;
        for (var r = 0; r < n; r++) {
          for (var c = 0; c < n; c++) {
            var el = document.getElementById("cell_" + r + "_" + c);
            if (el) el.value = Math.round((Math.random() * 20 - 10) * 10) / 10;
          }
        }
        document.getElementById("resultSection").style.display = "none";
        showStatus("已生成随机矩阵", "success");
      };

      document.getElementById("btnIdentity").onclick = function () {
        var n = currentSize;
        for (var r = 0; r < n; r++) {
          for (var c = 0; c < n; c++) {
            var el = document.getElementById("cell_" + r + "_" + c);
            if (el) el.value = r === c ? 1 : 0;
          }
        }
        document.getElementById("resultSection").style.display = "none";
        showStatus("已填入单位矩阵", "success");
      };

      document.getElementById("sizeSelect").onchange = function () {
        currentSize = parseInt(this.value, 10);
        buildGrid(currentSize);
        document.getElementById("resultSection").style.display = "none";
        showStatus("", "");
      };

      document.getElementById("btnCopyResult").onclick = function () {
        if (!currentResult) {
          showStatus("尚未计算", "error");
          return;
        }
        var text = "";
        if (activeTab === "det") {
          text = "det(A) = " + fmt(currentResult.det);
        } else if (activeTab === "inv") {
          if (!currentResult.inv) {
            text = "逆矩阵不存在（矩阵奇异）";
          } else {
            text = "A⁻¹ =\n";
            currentResult.inv.forEach(function (row) {
              text += row.map(fmt).join("\t") + "\n";
            });
          }
        } else if (activeTab === "transpose") {
          text = "Aᵀ =\n";
          currentResult.trans.forEach(function (row) {
            text += row.map(fmt).join("\t") + "\n";
          });
        } else if (activeTab === "eigen") {
          text = "特征值:\n";
          currentResult.eigs.forEach(function (e, idx) {
            text += "λ" + (idx + 1) + " = " + fmtEigen(e) + "\n";
          });
        } else {
          text = currentResult.steps;
        }
        navigator.clipboard.writeText(text).then(
          function () {
            showStatus("已复制", "success");
          },
          function () {
            showStatus("复制失败", "error");
          }
        );
      };

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          document.getElementById("btnCalc").click();
        }
      });

      // ── Init ──
      buildGrid(currentSize);

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
    
