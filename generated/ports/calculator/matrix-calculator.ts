// @ts-nocheck
// Generated from tools/calculator/matrix-calculator.html
// Source SHA-256: 421ee4c3fa51440cea63354e0726e7cf46042be0602c0cc304d6552b7a3ba1a3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      let operation = "+";

      function resizeMatrix(name) {
        const rows = parseInt(document.getElementById(`rows${name}`).value) || 2;
        const cols = parseInt(document.getElementById(`cols${name}`).value) || 2;
        const container = document.getElementById(`matrix${name}`);

        container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        container.innerHTML = "";

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.className = "matrix-cell";
            input.value = "0";
            input.dataset.row = i;
            input.dataset.col = j;
            container.appendChild(input);
          }
        }
      }

      function getMatrix(name) {
        const rows = parseInt(document.getElementById(`rows${name}`).value);
        const cols = parseInt(document.getElementById(`cols${name}`).value);
        const cells = document.querySelectorAll(`#matrix${name} .matrix-cell`);

        const matrix = [];
        let idx = 0;
        for (let i = 0; i < rows; i++) {
          matrix[i] = [];
          for (let j = 0; j < cols; j++) {
            matrix[i][j] = parseFloat(cells[idx].value) || 0;
            idx++;
          }
        }
        return matrix;
      }

      window.setOperation = function (op) {
        operation = op;
        document.querySelectorAll(".op-btn").forEach((btn) => btn.classList.remove("active"));
        document.querySelector(`.op-btn[onclick="setOperation('${op}')"]`).classList.add("active");
      };

      window.setIdentity = function (name) {
        const rows = parseInt(document.getElementById(`rows${name}`).value);
        const cols = parseInt(document.getElementById(`cols${name}`).value);
        const cells = document.querySelectorAll(`#matrix${name} .matrix-cell`);

        let idx = 0;
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            cells[idx].value = i === j ? 1 : 0;
            idx++;
          }
        }
      };

      function setZero(name) {
        const cells = document.querySelectorAll(`#matrix${name} .matrix-cell`);
        cells.forEach((cell) => (cell.value = 0));
      }

      window.setRandom = function (name) {
        const cells = document.querySelectorAll(`#matrix${name} .matrix-cell`);
        cells.forEach((cell) => (cell.value = Math.floor(Math.random() * 19) - 9));
      };

      function matrixAdd(A, B) {
        if (A.length !== B.length || A[0].length !== B[0].length) {
          throw new Error("矩阵维度不匹配");
        }
        return A.map((row, i) => row.map((val, j) => val + B[i][j]));
      }

      function matrixSub(A, B) {
        if (A.length !== B.length || A[0].length !== B[0].length) {
          throw new Error("矩阵维度不匹配");
        }
        return A.map((row, i) => row.map((val, j) => val - B[i][j]));
      }

      function matrixMul(A, B) {
        if (A[0].length !== B.length) {
          throw new Error("矩阵A的列数必须等于矩阵B的行数");
        }
        const result = [];
        for (let i = 0; i < A.length; i++) {
          result[i] = [];
          for (let j = 0; j < B[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < A[0].length; k++) {
              sum += A[i][k] * B[k][j];
            }
            result[i][j] = sum;
          }
        }
        return result;
      }

      function transpose(M) {
        return M[0].map((_, j) => M.map((row) => row[j]));
      }

      function determinant(M) {
        const n = M.length;
        if (n !== M[0].length) throw new Error("必须是方阵");

        if (n === 1) return M[0][0];
        if (n === 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];

        let det = 0;
        for (let j = 0; j < n; j++) {
          det += Math.pow(-1, j) * M[0][j] * determinant(minor(M, 0, j));
        }
        return det;
      }

      function minor(M, row, col) {
        return M.filter((_, i) => i !== row).map((r) => r.filter((_, j) => j !== col));
      }

      function inverse(M) {
        const n = M.length;
        if (n !== M[0].length) throw new Error("必须是方阵");

        const det = determinant(M);
        if (Math.abs(det) < 1e-10) throw new Error("矩阵不可逆（行列式为0）");

        if (n === 1) return [[1 / M[0][0]]];

        // Calculate adjugate matrix
        const adj = [];
        for (let i = 0; i < n; i++) {
          adj[i] = [];
          for (let j = 0; j < n; j++) {
            adj[i][j] = Math.pow(-1, i + j) * determinant(minor(M, j, i));
          }
        }

        return adj.map((row) => row.map((val) => val / det));
      }

      function trace(M) {
        if (M.length !== M[0].length) throw new Error("必须是方阵");
        return M.reduce((sum, row, i) => sum + row[i], 0);
      }

      function rank(M) {
        // Create a copy
        const m = M.map((row) => [...row]);
        const rows = m.length;
        const cols = m[0].length;
        let r = 0;

        for (let c = 0; c < cols && r < rows; c++) {
          // Find pivot
          let pivot = r;
          for (let i = r + 1; i < rows; i++) {
            if (Math.abs(m[i][c]) > Math.abs(m[pivot][c])) pivot = i;
          }

          if (Math.abs(m[pivot][c]) < 1e-10) continue;

          // Swap rows
          [m[r], m[pivot]] = [m[pivot], m[r]];

          // Eliminate
          for (let i = r + 1; i < rows; i++) {
            const factor = m[i][c] / m[r][c];
            for (let j = c; j < cols; j++) {
              m[i][j] -= factor * m[r][j];
            }
          }
          r++;
        }
        return r;
      }

      window.calculate = function () {
        try {
          const A = getMatrix("A");
          const B = getMatrix("B");
          let result;

          switch (operation) {
            case "+":
              result = matrixAdd(A, B);
              break;
            case "-":
              result = matrixSub(A, B);
              break;
            case "*":
              result = matrixMul(A, B);
              break;
          }

          displayMatrix(result);
        } catch (e) {
          document.getElementById("resultArea").innerHTML =
            `<div class="error-message">${e.message}</div>`;
        }
      };

      window.singleOp = function (op, name) {
        try {
          const M = getMatrix(name);
          let result;
          let isScalar = false;

          switch (op) {
            case "transpose":
              result = transpose(M);
              break;
            case "determinant":
              result = determinant(M);
              isScalar = true;
              break;
            case "inverse":
              result = inverse(M);
              break;
            case "trace":
              result = trace(M);
              isScalar = true;
              break;
            case "rank":
              result = rank(M);
              isScalar = true;
              break;
          }

          if (isScalar) {
            displayScalar(result);
          } else {
            displayMatrix(result);
          }
        } catch (e) {
          document.getElementById("resultArea").innerHTML =
            `<div class="error-message">${e.message}</div>`;
        }
      };

      function displayMatrix(M) {
        const rows = M.length;
        const cols = M[0].length;

        let html = `<div class="result-matrix" style="grid-template-columns: repeat(${cols}, 1fr)">`;
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const val = M[i][j];
            const formatted = Number.isInteger(val) ? val : val.toFixed(4);
            html += `<div class="result-cell">${formatted}</div>`;
          }
        }
        html += "</div>";

        document.getElementById("resultArea").innerHTML = html;
      }

      function displayScalar(val) {
        const formatted = Number.isInteger(val) ? val : val.toFixed(6);
        document.getElementById("resultArea").innerHTML =
          `<div class="scalar-result">${formatted}</div>`;
      }

      window.clearAll = function () {
        setZero("A");
        setZero("B");
        document.getElementById("resultArea").innerHTML =
          '<span style="color: var(--color-text-secondary);">点击"计算结果"按钮查看结果</span>';
      };

      // Initialize
      resizeMatrix("A");
      resizeMatrix("B");
    
