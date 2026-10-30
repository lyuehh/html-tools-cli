// @ts-nocheck
// Generated from tools/team-tools/feedback-form.html
// Source SHA-256: c1ca2628dfe02fa9531fb4b2fe68503fc649cd15df30a623b6d99b073cbab6c6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "feedback-form-data";
      var questions = [];
      var currentTab = "preview";

      var questionTypes = [
        { value: "text", label: "单行文本" },
        { value: "textarea", label: "多行文本" },
        { value: "radio", label: "单选" },
        { value: "checkbox", label: "多选" },
        { value: "rating", label: "评分 (1-5)" },
        { value: "nps", label: "NPS (0-10)" }
      ];

      function init() {
        var savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }

        loadFromUrl() || loadFromStorage();

        if (questions.length === 0) {
          addQuestion();
        }

        renderQuestions();
        updatePreview();
      }

      function generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
      }

      function addQuestion(text, type, required, options) {
        questions.push({
          id: generateId(),
          text: text || "",
          type: type || "text",
          required: required !== undefined ? required : true,
          options: options || ["选项1", "选项2", "选项3"]
        });
        renderQuestions();
        updatePreview();
        saveToStorage();
      }

      function removeQuestion(id) {
        questions = questions.filter(function (q) {
          return q.id !== id;
        });
        renderQuestions();
        updatePreview();
        saveToStorage();
      }

      function createTypeSelect(question) {
        var select = document.createElement("select");
        questionTypes.forEach(function (t) {
          var option = document.createElement("option");
          option.value = t.value;
          option.textContent = t.label;
          if (t.value === question.type) option.selected = true;
          select.appendChild(option);
        });
        select.onchange = function () {
          question.type = select.value;
          renderQuestions();
          updatePreview();
          saveToStorage();
        };
        return select;
      }

      function renderQuestions() {
        var container = document.getElementById("questionsList");
        container.textContent = "";

        questions.forEach(function (question, index) {
          var div = document.createElement("div");
          div.className = "question-item";

          var header = document.createElement("div");
          header.className = "question-header";

          var number = document.createElement("div");
          number.className = "question-number";
          number.textContent = index + 1;

          var content = document.createElement("div");
          content.className = "question-content";

          var textInput = document.createElement("input");
          textInput.type = "text";
          textInput.className = "question-input";
          textInput.placeholder = "输入问题";
          textInput.value = question.text;
          textInput.onchange = function () {
            question.text = textInput.value;
            updatePreview();
            saveToStorage();
          };

          var settings = document.createElement("div");
          settings.className = "question-settings";

          var typeSelect = createTypeSelect(question);

          var requiredLabel = document.createElement("label");
          var requiredCheckbox = document.createElement("input");
          requiredCheckbox.type = "checkbox";
          requiredCheckbox.checked = question.required;
          requiredCheckbox.onchange = function () {
            question.required = requiredCheckbox.checked;
            updatePreview();
            saveToStorage();
          };
          requiredLabel.appendChild(requiredCheckbox);
          requiredLabel.appendChild(document.createTextNode(" 必填"));

          settings.appendChild(typeSelect);
          settings.appendChild(requiredLabel);

          content.appendChild(textInput);
          content.appendChild(settings);

          if (question.type === "radio" || question.type === "checkbox") {
            var optionsList = document.createElement("div");
            optionsList.className = "options-list";

            question.options.forEach(function (opt, optIndex) {
              var row = document.createElement("div");
              row.className = "option-row";

              var optInput = document.createElement("input");
              optInput.type = "text";
              optInput.value = opt;
              optInput.placeholder = "选项 " + (optIndex + 1);
              optInput.onchange = function () {
                question.options[optIndex] = optInput.value;
                updatePreview();
                saveToStorage();
              };

              var removeOptBtn = document.createElement("button");
              removeOptBtn.className = "btn btn-danger";
              removeOptBtn.textContent = "×";
              removeOptBtn.onclick = function () {
                if (question.options.length > 2) {
                  question.options.splice(optIndex, 1);
                  renderQuestions();
                  updatePreview();
                  saveToStorage();
                }
              };

              row.appendChild(optInput);
              row.appendChild(removeOptBtn);
              optionsList.appendChild(row);
            });

            var addOptBtn = document.createElement("button");
            addOptBtn.className = "btn btn-secondary";
            addOptBtn.style.marginTop = "5px";
            addOptBtn.style.padding = "6px 12px";
            addOptBtn.style.fontSize = "12px";
            addOptBtn.textContent = "+ 添加选项";
            addOptBtn.onclick = function () {
              question.options.push("选项 " + (question.options.length + 1));
              renderQuestions();
              updatePreview();
              saveToStorage();
            };
            optionsList.appendChild(addOptBtn);

            content.appendChild(optionsList);
          }

          var deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "删除";
          deleteBtn.onclick = function () {
            removeQuestion(question.id);
          };

          header.appendChild(number);
          header.appendChild(content);
          header.appendChild(deleteBtn);

          div.appendChild(header);
          container.appendChild(div);
        });
      }

      function loadTemplate(type) {
        var templates = {
          performance: {
            title: "绩效反馈表",
            description: "请对团队成员的工作表现进行评价",
            questions: [
              { text: "被评价人姓名", type: "text", required: true },
              { text: "工作质量评分", type: "rating", required: true },
              { text: "工作效率评分", type: "rating", required: true },
              { text: "团队协作评分", type: "rating", required: true },
              { text: "主要优点", type: "textarea", required: true },
              { text: "改进建议", type: "textarea", required: false }
            ]
          },
          360: {
            title: "360度反馈评估",
            description: "多维度评估团队成员表现",
            questions: [
              { text: "专业能力评分", type: "rating", required: true },
              { text: "沟通能力评分", type: "rating", required: true },
              { text: "领导能力评分", type: "rating", required: true },
              { text: "创新能力评分", type: "rating", required: true },
              { text: "该同事的最大优势是什么？", type: "textarea", required: true },
              { text: "该同事可以在哪些方面提升？", type: "textarea", required: true }
            ]
          },
          meeting: {
            title: "会议反馈表",
            description: "帮助我们改进会议质量",
            questions: [
              {
                text: "会议主题是否清晰？",
                type: "radio",
                required: true,
                options: ["非常清晰", "比较清晰", "一般", "不太清晰"]
              },
              {
                text: "会议时长是否合适？",
                type: "radio",
                required: true,
                options: ["太短", "刚好", "稍长", "太长"]
              },
              { text: "会议效率评分", type: "rating", required: true },
              { text: "您的收获和建议", type: "textarea", required: false }
            ]
          },
          project: {
            title: "项目复盘反馈",
            description: "总结项目经验，持续改进",
            questions: [
              { text: "项目整体满意度", type: "rating", required: true },
              {
                text: "项目中做得好的地方",
                type: "checkbox",
                required: true,
                options: ["沟通协作", "进度管理", "质量控制", "风险应对", "资源调配"]
              },
              { text: "项目中可以改进的地方", type: "textarea", required: true },
              { text: "学到的经验教训", type: "textarea", required: true }
            ]
          },
          onboarding: {
            title: "入职体验调查",
            description: "帮助我们改进新人入职体验",
            questions: [
              { text: "入职流程清晰度", type: "rating", required: true },
              { text: "团队氛围评分", type: "rating", required: true },
              { text: "培训内容实用性", type: "rating", required: true },
              { text: "入职过程中遇到的困难", type: "textarea", required: false },
              { text: "改进建议", type: "textarea", required: false }
            ]
          },
          nps: {
            title: "NPS 满意度调查",
            description: "您的反馈对我们非常重要",
            questions: [
              { text: "您有多大可能向朋友推荐我们？", type: "nps", required: true },
              {
                text: "您最满意的方面",
                type: "checkbox",
                required: false,
                options: ["产品质量", "客户服务", "价格", "交付速度", "技术支持"]
              },
              { text: "请告诉我们原因", type: "textarea", required: false }
            ]
          }
        };

        var template = templates[type];
        if (template) {
          document.getElementById("formTitle").value = template.title;
          document.getElementById("formDescription").value = template.description;
          questions = template.questions.map(function (q) {
            return {
              id: generateId(),
              text: q.text,
              type: q.type,
              required: q.required,
              options: q.options || ["选项1", "选项2", "选项3"]
            };
          });
          renderQuestions();
          updatePreview();
          saveToStorage();
          showToast("已加载模板");
        }
      }

      function switchTab(tab, btn) {
        currentTab = tab;
        document.querySelectorAll(".tab").forEach(function (t) {
          t.classList.remove("active");
        });
        btn.classList.add("active");
        updatePreview();
      }

      function updatePreview() {
        var container = document.getElementById("previewContent");
        container.textContent = "";

        if (currentTab === "preview") {
          var previewDiv = document.createElement("div");
          previewDiv.className = "preview-container";
          previewDiv.id = "previewContainer";
          container.appendChild(previewDiv);
          renderFormPreview();
        } else {
          var codeDiv = document.createElement("div");
          codeDiv.className = "code-preview";
          codeDiv.id = "codePreview";

          if (currentTab === "html") {
            codeDiv.textContent = generateHTML();
          } else if (currentTab === "markdown") {
            codeDiv.textContent = generateMarkdown();
          } else if (currentTab === "json") {
            codeDiv.textContent = generateJSON();
          }
          container.appendChild(codeDiv);
        }
      }

      function renderFormPreview() {
        var container = document.getElementById("previewContainer");
        if (!container) return;
        container.textContent = "";

        var form = document.createElement("div");
        form.className = "preview-form";

        var title = document.createElement("div");
        title.className = "preview-title";
        title.textContent = document.getElementById("formTitle").value || "表单标题";
        form.appendChild(title);

        var desc = document.getElementById("formDescription").value;
        if (desc) {
          var description = document.createElement("div");
          description.className = "preview-description";
          description.textContent = desc;
          form.appendChild(description);
        }

        questions.forEach(function (question, index) {
          var qDiv = document.createElement("div");
          qDiv.className = "preview-question";

          var label = document.createElement("div");
          label.className = "preview-question-label";
          label.textContent = index + 1 + ". " + (question.text || "问题");
          if (question.required) {
            var mark = document.createElement("span");
            mark.className = "required-mark";
            mark.textContent = " *";
            label.appendChild(mark);
          }
          qDiv.appendChild(label);

          if (question.type === "text") {
            var input = document.createElement("input");
            input.type = "text";
            input.className = "preview-input";
            input.placeholder = "请输入回答";
            qDiv.appendChild(input);
          } else if (question.type === "textarea") {
            var textarea = document.createElement("textarea");
            textarea.className = "preview-textarea";
            textarea.placeholder = "请输入回答";
            qDiv.appendChild(textarea);
          } else if (question.type === "radio") {
            var radioGroup = document.createElement("div");
            radioGroup.className = "preview-radio";
            question.options.forEach(function (opt) {
              var radioLabel = document.createElement("label");
              var radio = document.createElement("input");
              radio.type = "radio";
              radio.name = "q_" + question.id;
              radioLabel.appendChild(radio);
              radioLabel.appendChild(document.createTextNode(" " + opt));
              radioGroup.appendChild(radioLabel);
            });
            qDiv.appendChild(radioGroup);
          } else if (question.type === "checkbox") {
            var checkGroup = document.createElement("div");
            checkGroup.className = "preview-checkbox";
            question.options.forEach(function (opt) {
              var checkLabel = document.createElement("label");
              var checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkLabel.appendChild(checkbox);
              checkLabel.appendChild(document.createTextNode(" " + opt));
              checkGroup.appendChild(checkLabel);
            });
            qDiv.appendChild(checkGroup);
          } else if (question.type === "rating") {
            var ratingDiv = document.createElement("div");
            ratingDiv.className = "preview-rating";
            for (var i = 1; i <= 5; i++) {
              var ratingBtn = document.createElement("button");
              ratingBtn.className = "rating-btn";
              ratingBtn.textContent = i;
              ratingDiv.appendChild(ratingBtn);
            }
            qDiv.appendChild(ratingDiv);
          } else if (question.type === "nps") {
            var npsDiv = document.createElement("div");
            npsDiv.className = "preview-nps";
            for (var j = 0; j <= 10; j++) {
              var npsBtn = document.createElement("button");
              npsBtn.className = "nps-btn";
              npsBtn.textContent = j;
              npsDiv.appendChild(npsBtn);
            }
            qDiv.appendChild(npsDiv);
          }

          form.appendChild(qDiv);
        });

        var submitBtn = document.createElement("button");
        submitBtn.className = "btn btn-primary";
        submitBtn.style.width = "100%";
        submitBtn.style.marginTop = "20px";
        submitBtn.textContent = "提交反馈";
        form.appendChild(submitBtn);

        container.appendChild(form);
      }

      function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function generateHTML() {
        var title = document.getElementById("formTitle").value || "反馈表单";
        var desc = document.getElementById("formDescription").value;

        var lines = [];
        lines.push("<!DOCTYPE html>");
        lines.push('<html lang="zh-CN">');
        lines.push("<head>");
        lines.push('  <meta charset="UTF-8">');
        lines.push('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
        lines.push("  <title>" + escapeHtml(title) + "</title>");
        lines.push("  <style>");
        lines.push(
          "    body { font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }"
        );
        lines.push("    h1 { text-align: center; }");
        lines.push("    .question { margin-bottom: 20px; }");
        lines.push("    label { display: block; margin-bottom: 8px; font-weight: 500; }");
        lines.push(
          '    input[type="text"], textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; }'
        );
        lines.push("    .required { color: red; }");
        lines.push(
          "    button { width: 100%; padding: 12px; background: #0891b2; color: white; border: none; border-radius: 6px; cursor: pointer; }"
        );
        lines.push("  </style>");
        lines.push("</head>");
        lines.push("<body>");
        lines.push("  <h2>" + escapeHtml(title) + "</h2>");
        if (desc) {
          lines.push('  <p style="text-align:center;color:#666;">' + escapeHtml(desc) + "</p>");
        }
        lines.push("  <form>");

        questions.forEach(function (q, i) {
          lines.push('    <div class="question">');
          lines.push(
            "      <label>" +
              (i + 1) +
              ". " +
              escapeHtml(q.text) +
              (q.required ? '<span class="required">*</span>' : "") +
              "</label>"
          );

          if (q.type === "text") {
            lines.push(
              '      <input type="text" name="q' +
                (i + 1) +
                '"' +
                (q.required ? " required" : "") +
                ">"
            );
          } else if (q.type === "textarea") {
            lines.push(
              '      <textarea name="q' +
                (i + 1) +
                '" rows="3"' +
                (q.required ? " required" : "") +
                "></textarea>"
            );
          } else if (q.type === "radio") {
            q.options.forEach(function (opt) {
              lines.push(
                '      <label><input type="radio" name="q' +
                  (i + 1) +
                  '" value="' +
                  escapeHtml(opt) +
                  '"' +
                  (q.required ? " required" : "") +
                  "> " +
                  escapeHtml(opt) +
                  "</label>"
              );
            });
          } else if (q.type === "checkbox") {
            q.options.forEach(function (opt) {
              lines.push(
                '      <label><input type="checkbox" name="q' +
                  (i + 1) +
                  '" value="' +
                  escapeHtml(opt) +
                  '"> ' +
                  escapeHtml(opt) +
                  "</label>"
              );
            });
          } else if (q.type === "rating") {
            var ratingOptions = ["1-很差", "2-较差", "3-一般", "4-较好", "5-很好"];
            ratingOptions.forEach(function (opt) {
              lines.push(
                '      <label><input type="radio" name="q' +
                  (i + 1) +
                  '" value="' +
                  opt.split("-")[0] +
                  '"' +
                  (q.required ? " required" : "") +
                  "> " +
                  opt +
                  "</label>"
              );
            });
          } else if (q.type === "nps") {
            lines.push('      <div style="display:flex;gap:5px;">');
            for (var n = 0; n <= 10; n++) {
              lines.push(
                '        <label><input type="radio" name="q' +
                  (i + 1) +
                  '" value="' +
                  n +
                  '"' +
                  (q.required ? " required" : "") +
                  "> " +
                  n +
                  "</label>"
              );
            }
            lines.push("      </div>");
          }

          lines.push("    </div>");
        });

        lines.push('    <button type="submit">提交反馈</button>');
        lines.push("  </form>");
        lines.push("</body>");
        lines.push("</html>");

        return lines.join("\n");
      }

      function generateMarkdown() {
        var title = document.getElementById("formTitle").value || "反馈表单";
        var desc = document.getElementById("formDescription").value;

        var lines = [];
        lines.push("# " + title);
        if (desc) lines.push("\n" + desc + "\n");
        lines.push("---\n");

        questions.forEach(function (q, i) {
          lines.push("### " + (i + 1) + ". " + q.text + (q.required ? " *" : ""));

          if (q.type === "text" || q.type === "textarea") {
            lines.push("\n_________________________________\n");
          } else if (q.type === "radio" || q.type === "checkbox") {
            q.options.forEach(function (opt) {
              lines.push("- [ ] " + opt);
            });
            lines.push("");
          } else if (q.type === "rating") {
            lines.push("- [ ] 1-很差  [ ] 2-较差  [ ] 3-一般  [ ] 4-较好  [ ] 5-很好\n");
          } else if (q.type === "nps") {
            lines.push("0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10\n");
          }
        });

        lines.push("---\n*表单生成于 " + new Date().toLocaleString() + "*");

        return lines.join("\n");
      }

      function generateJSON() {
        var data = {
          title: document.getElementById("formTitle").value || "反馈表单",
          description: document.getElementById("formDescription").value,
          questions: questions.map(function (q) {
            var qData = {
              text: q.text,
              type: q.type,
              required: q.required
            };
            if (q.type === "radio" || q.type === "checkbox") {
              qData.options = q.options;
            }
            return qData;
          }),
          createdAt: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
      }

      function copyOutput() {
        var content = "";
        if (currentTab === "preview") {
          content = generateMarkdown();
        } else {
          var codePreview = document.getElementById("codePreview");
          if (codePreview) content = codePreview.textContent;
        }

        navigator.clipboard.writeText(content).then(function () {
          showToast("已复制到剪贴板");
        });
      }

      function downloadOutput() {
        var title = document.getElementById("formTitle").value || "反馈表单";
        var content = "";
        var ext = "";

        if (currentTab === "html") {
          content = generateHTML();
          ext = "html";
        } else if (currentTab === "json") {
          content = generateJSON();
          ext = "json";
        } else {
          content = generateMarkdown();
          ext = "md";
        }

        var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = title + "." + ext;
        a.click();
        URL.revokeObjectURL(url);
      }

      function shareLink() {
        var data = {
          title: document.getElementById("formTitle").value,
          description: document.getElementById("formDescription").value,
          questions: questions
        };

        try {
          var encoded = btoa(encodeURIComponent(JSON.stringify(data)));
          var url = location.origin + location.pathname + "#" + encoded;
          navigator.clipboard.writeText(url);
          showToast("分享链接已复制");
        } catch (e) {
          showToast("生成链接失败");
        }
      }

      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          document.getElementById("formTitle").value = data.title || "";
          document.getElementById("formDescription").value = data.description || "";
          if (data.questions) questions = data.questions;
          return true;
        } catch (e) {
          return false;
        }
      }

      function saveToStorage() {
        var data = {
          title: document.getElementById("formTitle").value,
          description: document.getElementById("formDescription").value,
          questions: questions
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            document.getElementById("formTitle").value = data.title || "";
            document.getElementById("formDescription").value = data.description || "";
            if (data.questions) questions = data.questions;
          } catch (e) {
            console.error("Failed to load from storage");
          }
        }
      }

      function showToast(message) {
        var toast = document.createElement("div");
        toast.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--accent-color);color:#000;padding:12px 24px;border-radius:8px;z-index:1000;font-size:14px;";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(function () {
          toast.remove();
        }, 2000);
      }

      window.toggleTheme = function () {
        var body = document.body;
        var currentTheme = body.getAttribute("data-theme");
        var newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      init();
    
