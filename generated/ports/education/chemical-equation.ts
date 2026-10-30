// @ts-nocheck
// Generated from tools/education/chemical-equation.html
// Source SHA-256: 1aa15f699f2858e5868ae1aa71bdc6caddd61bf3d5315df333b26edff4a29cb5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function parseFormula(formula) {
        var elements = {};
        var regex = /([A-Z][a-z]?)(\d*)/g;
        var match;

        while ((match = regex.exec(formula)) !== null) {
          var element = match[1];
          var count = parseInt(match[2]) || 1;
          elements[element] = (elements[element] || 0) + count;
        }

        return elements;
      }

      function parseEquation(eq) {
        eq = eq.replace(/\s+/g, "").replace(/->/g, "=");
        var sides = eq.split("=");
        if (sides.length !== 2) return null;

        var reactants = sides[0].split("+").filter(function (s) {
          return s;
        });
        var products = sides[1].split("+").filter(function (s) {
          return s;
        });

        if (reactants.length === 0 || products.length === 0) return null;

        return { reactants: reactants, products: products };
      }

      function getAllElements(compounds) {
        var elements = {};
        compounds.forEach(function (compound) {
          var parsed = parseFormula(compound);
          for (var el in parsed) {
            elements[el] = true;
          }
        });
        return Object.keys(elements);
      }

      function balanceEquation(reactants, products) {
        var allCompounds = reactants.concat(products);
        var elements = getAllElements(allCompounds);
        var numVars = allCompounds.length;
        var numReactants = reactants.length;

        var maxCoef = 12;

        function check(coeffs) {
          return elements.every(function (el) {
            var reactantSum = 0;
            var productSum = 0;

            reactants.forEach(function (compound, i) {
              var parsed = parseFormula(compound);
              reactantSum += coeffs[i] * (parsed[el] || 0);
            });

            products.forEach(function (compound, i) {
              var parsed = parseFormula(compound);
              productSum += coeffs[numReactants + i] * (parsed[el] || 0);
            });

            return reactantSum === productSum;
          });
        }

        function search(coeffs, index) {
          if (index === numVars) {
            return check(coeffs) ? coeffs.slice() : null;
          }

          for (var c = 1; c <= maxCoef; c++) {
            coeffs[index] = c;
            var result = search(coeffs, index + 1);
            if (result) return result;
          }
          return null;
        }

        var coeffs = [];
        for (var i = 0; i < numVars; i++) coeffs.push(1);
        return search(coeffs, 0);
      }

      function formatFormula(formula) {
        var subscripts = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
        return formula.replace(/([A-Z][a-z]?)(\d+)/g, function (match, el, num) {
          var subscript = num
            .split("")
            .map(function (d) {
              return subscripts[parseInt(d)];
            })
            .join("");
          return el + subscript;
        });
      }

      function balance() {
        var input = document.getElementById("equation").value.trim();
        var resultCard = document.getElementById("resultCard");
        var resultEquation = document.getElementById("resultEquation");
        var elementCount = document.getElementById("elementCount");
        var stepsDiv = document.getElementById("steps");

        if (!input) {
          resultCard.style.display = "none";
          return;
        }

        var parsed = parseEquation(input);
        if (!parsed) {
          resultCard.style.display = "block";
          var errorSpan = document.createElement("span");
          errorSpan.className = "error";
          errorSpan.textContent = "无法解析方程式，请检查格式";
          resultEquation.textContent = "";
          resultEquation.appendChild(errorSpan);
          elementCount.textContent = "";
          stepsDiv.textContent = "";
          return;
        }

        var reactants = parsed.reactants;
        var products = parsed.products;
        var coefficients = balanceEquation(reactants, products);

        if (!coefficients) {
          resultCard.style.display = "block";
          var errorSpan = document.createElement("span");
          errorSpan.className = "error";
          errorSpan.textContent = "无法配平此方程式";
          resultEquation.textContent = "";
          resultEquation.appendChild(errorSpan);
          elementCount.textContent = "";
          stepsDiv.textContent = "";
          return;
        }

        resultCard.style.display = "block";

        // 使用DOM API安全构建HTML
        resultEquation.textContent = "";
        reactants.forEach(function (compound, i) {
          if (i > 0) {
            resultEquation.appendChild(document.createTextNode(" + "));
          }
          var coef = coefficients[i];
          if (coef > 1) {
            var coefSpan = document.createElement("span");
            coefSpan.className = "coef";
            coefSpan.textContent = coef;
            resultEquation.appendChild(coefSpan);
          }
          resultEquation.appendChild(document.createTextNode(formatFormula(compound)));
        });

        var arrowSpan = document.createElement("span");
        arrowSpan.className = "arrow";
        arrowSpan.textContent = " → ";
        resultEquation.appendChild(arrowSpan);

        products.forEach(function (compound, i) {
          if (i > 0) {
            resultEquation.appendChild(document.createTextNode(" + "));
          }
          var coef = coefficients[reactants.length + i];
          if (coef > 1) {
            var coefSpan = document.createElement("span");
            coefSpan.className = "coef";
            coefSpan.textContent = coef;
            resultEquation.appendChild(coefSpan);
          }
          resultEquation.appendChild(document.createTextNode(formatFormula(compound)));
        });

        var elements = getAllElements(reactants.concat(products));
        elementCount.textContent = "";

        elements.forEach(function (el) {
          var leftCount = 0;
          var rightCount = 0;

          reactants.forEach(function (compound, i) {
            var parsed = parseFormula(compound);
            leftCount += coefficients[i] * (parsed[el] || 0);
          });

          products.forEach(function (compound, i) {
            var parsed = parseFormula(compound);
            rightCount += coefficients[reactants.length + i] * (parsed[el] || 0);
          });

          var badge = document.createElement("span");
          badge.className = "element-badge balanced";
          badge.textContent = el + ": " + leftCount + " = " + rightCount;
          elementCount.appendChild(badge);
        });

        stepsDiv.textContent = "";

        var step1 = document.createElement("div");
        step1.className = "step";
        var step1Title = document.createElement("div");
        step1Title.className = "step-title";
        step1Title.textContent = "步骤 1: 识别反应物和生成物";
        step1.appendChild(step1Title);
        var step1Reactants = document.createElement("div");
        step1Reactants.textContent = "反应物: " + reactants.map(formatFormula).join(", ");
        step1.appendChild(step1Reactants);
        var step1Products = document.createElement("div");
        step1Products.textContent = "生成物: " + products.map(formatFormula).join(", ");
        step1.appendChild(step1Products);
        stepsDiv.appendChild(step1);

        var step2 = document.createElement("div");
        step2.className = "step";
        var step2Title = document.createElement("div");
        step2Title.className = "step-title";
        step2Title.textContent = "步骤 2: 识别所有元素";
        step2.appendChild(step2Title);
        var step2Content = document.createElement("div");
        step2Content.textContent = "元素: " + elements.join(", ");
        step2.appendChild(step2Content);
        stepsDiv.appendChild(step2);

        var step3 = document.createElement("div");
        step3.className = "step";
        var step3Title = document.createElement("div");
        step3Title.className = "step-title";
        step3Title.textContent = "步骤 3: 确定配平系数";
        step3.appendChild(step3Title);
        var step3Content = document.createElement("div");
        step3Content.textContent = "系数: " + coefficients.join(", ");
        step3.appendChild(step3Content);
        stepsDiv.appendChild(step3);
      }

      function setExample(eq) {
        document.getElementById("equation").value = eq;
        balance();
      }

      function clearInput() {
        document.getElementById("equation").value = "";
        document.getElementById("resultCard").style.display = "none";
      }

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
    
