// @ts-nocheck
// Generated from tools/education/gpa-calculator.html
// Source SHA-256: 9f3e41a3751403b5d2548958e21be8dd5ee16574f03cae27568146af8c1a5525
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const gradeSystems = {
        china4: {
          name: "中国4.0制",
          maxGPA: 4.0,
          grades: [
            { label: "A/优秀", min: 90, max: 100, gpa: 4.0 },
            { label: "B+", min: 85, max: 89, gpa: 3.7 },
            { label: "B/良好", min: 80, max: 84, gpa: 3.3 },
            { label: "C+", min: 75, max: 79, gpa: 3.0 },
            { label: "C/中等", min: 70, max: 74, gpa: 2.7 },
            { label: "D", min: 60, max: 69, gpa: 2.0 },
            { label: "F/不及格", min: 0, max: 59, gpa: 0 }
          ],
          scoreToGPA: function (score) {
            if (score >= 90) return 4.0;
            if (score >= 85) return 3.7;
            if (score >= 80) return 3.3;
            if (score >= 75) return 3.0;
            if (score >= 70) return 2.7;
            if (score >= 60) return 2.0;
            return 0;
          }
        },
        china5: {
          name: "中国5.0制",
          maxGPA: 5.0,
          grades: [
            { label: "A+", min: 95, max: 100, gpa: 5.0 },
            { label: "A", min: 90, max: 94, gpa: 4.5 },
            { label: "B+", min: 85, max: 89, gpa: 4.0 },
            { label: "B", min: 80, max: 84, gpa: 3.5 },
            { label: "C+", min: 75, max: 79, gpa: 3.0 },
            { label: "C", min: 70, max: 74, gpa: 2.5 },
            { label: "D", min: 60, max: 69, gpa: 2.0 },
            { label: "F", min: 0, max: 59, gpa: 0 }
          ],
          scoreToGPA: function (score) {
            if (score >= 95) return 5.0;
            if (score >= 90) return 4.5;
            if (score >= 85) return 4.0;
            if (score >= 80) return 3.5;
            if (score >= 75) return 3.0;
            if (score >= 70) return 2.5;
            if (score >= 60) return 2.0;
            return 0;
          }
        },
        us4: {
          name: "美国4.0制",
          maxGPA: 4.0,
          grades: [
            { label: "A", min: 93, max: 100, gpa: 4.0 },
            { label: "A-", min: 90, max: 92, gpa: 3.7 },
            { label: "B+", min: 87, max: 89, gpa: 3.3 },
            { label: "B", min: 83, max: 86, gpa: 3.0 },
            { label: "B-", min: 80, max: 82, gpa: 2.7 },
            { label: "C+", min: 77, max: 79, gpa: 2.3 },
            { label: "C", min: 73, max: 76, gpa: 2.0 },
            { label: "C-", min: 70, max: 72, gpa: 1.7 },
            { label: "D+", min: 67, max: 69, gpa: 1.3 },
            { label: "D", min: 60, max: 66, gpa: 1.0 },
            { label: "F", min: 0, max: 59, gpa: 0 }
          ],
          scoreToGPA: function (score) {
            if (score >= 93) return 4.0;
            if (score >= 90) return 3.7;
            if (score >= 87) return 3.3;
            if (score >= 83) return 3.0;
            if (score >= 80) return 2.7;
            if (score >= 77) return 2.3;
            if (score >= 73) return 2.0;
            if (score >= 70) return 1.7;
            if (score >= 67) return 1.3;
            if (score >= 60) return 1.0;
            return 0;
          }
        },
        uk: {
          name: "英国制",
          maxGPA: 4.0,
          grades: [
            { label: "一等(First)", min: 70, max: 100, gpa: 4.0 },
            { label: "二等上(2:1)", min: 60, max: 69, gpa: 3.3 },
            { label: "二等下(2:2)", min: 50, max: 59, gpa: 2.7 },
            { label: "三等(Third)", min: 40, max: 49, gpa: 2.0 },
            { label: "不及格", min: 0, max: 39, gpa: 0 }
          ],
          scoreToGPA: function (score) {
            if (score >= 70) return 4.0;
            if (score >= 60) return 3.3;
            if (score >= 50) return 2.7;
            if (score >= 40) return 2.0;
            return 0;
          }
        }
      };

      let currentSystem = "china4";
      let courses = [];
      let courseId = 0;

      function init() {
        const saved = localStorage.getItem("gpa_data");
        if (saved) {
          try {
            const data = JSON.parse(saved);
            currentSystem = data.system || "china4";
            courses = data.courses || [];
            courseId = data.courseId || 0;
          } catch (e) {
            courses = [];
          }
        }

        if (courses.length === 0) {
          addCourse();
        }

        updateSystemTabs();
        renderGradeScale();
        renderCourses();
        calculate();
      }

      function updateSystemTabs() {
        document.querySelectorAll(".tab").forEach((tab) => {
          tab.classList.toggle("active", tab.dataset.system === currentSystem);
        });
      }

      function renderGradeScale() {
        const container = document.getElementById("gradeScale");
        container.textContent = "";
        const system = gradeSystems[currentSystem];

        system.grades.forEach((g) => {
          const item = document.createElement("div");
          item.className = "grade-item";

          const gradeSpan = document.createElement("span");
          gradeSpan.className = "grade";
          gradeSpan.textContent = g.label;

          const rangeText = document.createTextNode(
            " " + g.min + "-" + g.max + "分 → " + g.gpa.toFixed(1)
          );

          item.appendChild(gradeSpan);
          item.appendChild(rangeText);
          container.appendChild(item);
        });
      }

      function addCourse() {
        courses.push({
          id: ++courseId,
          name: "",
          credit: 3,
          score: 85
        });
        renderCourses();
        saveData();
      }

      function removeCourse(id) {
        courses = courses.filter((c) => c.id !== id);
        if (courses.length === 0) {
          addCourse();
        } else {
          renderCourses();
          calculate();
          saveData();
        }
      }

      function renderCourses() {
        const container = document.getElementById("courseList");
        container.textContent = "";

        courses.forEach((course) => {
          const row = document.createElement("div");
          row.className = "course-row";

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.placeholder = "课程名称";
          nameInput.value = course.name;
          nameInput.oninput = function () {
            course.name = this.value;
            saveData();
          };

          const creditInput = document.createElement("input");
          creditInput.type = "number";
          creditInput.placeholder = "学分";
          creditInput.min = "0.5";
          creditInput.max = "10";
          creditInput.step = "0.5";
          creditInput.value = course.credit;
          creditInput.oninput = function () {
            course.credit = parseFloat(this.value) || 0;
            calculate();
            saveData();
          };

          const scoreInput = document.createElement("input");
          scoreInput.type = "number";
          scoreInput.placeholder = "分数";
          scoreInput.min = "0";
          scoreInput.max = "100";
          scoreInput.value = course.score;
          scoreInput.oninput = function () {
            course.score = parseFloat(this.value) || 0;
            calculate();
            saveData();
          };

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.onclick = function () {
            removeCourse(course.id);
          };

          row.appendChild(nameInput);
          row.appendChild(creditInput);
          row.appendChild(scoreInput);
          row.appendChild(deleteBtn);
          container.appendChild(row);
        });
      }

      function calculate() {
        const system = gradeSystems[currentSystem];
        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach((course) => {
          if (course.credit > 0 && course.score >= 0) {
            const gpa = system.scoreToGPA(course.score);
            totalPoints += gpa * course.credit;
            totalCredits += course.credit;
          }
        });

        const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

        document.getElementById("gpaResult").textContent = gpa.toFixed(2);
        document.getElementById("totalCredits").textContent = totalCredits.toFixed(1);
        document.getElementById("totalCourses").textContent = courses.length;

        let level = "-";
        const ratio = gpa / system.maxGPA;
        if (ratio >= 0.9) level = "优秀";
        else if (ratio >= 0.8) level = "良好";
        else if (ratio >= 0.7) level = "中等";
        else if (ratio >= 0.6) level = "及格";
        else if (totalCredits > 0) level = "不及格";

        document.getElementById("gradeLevel").textContent = level;
      }

      function clearAll() {
        courses = [];
        courseId = 0;
        addCourse();
        calculate();
        saveData();
      }

      function saveData() {
        localStorage.setItem(
          "gpa_data",
          JSON.stringify({
            system: currentSystem,
            courses: courses,
            courseId: courseId
          })
        );
      }

      document.getElementById("systemTabs").addEventListener("click", function (e) {
        if (e.target.classList.contains("tab")) {
          currentSystem = e.target.dataset.system;
          updateSystemTabs();
          renderGradeScale();
          calculate();
          saveData();
        }
      });

      init();

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
    
