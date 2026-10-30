// @ts-nocheck
// Generated from tools/generator/resume-builder.html
// Source SHA-256: fdb73e989b62be4cd577f5a7eda6f08b44924c53d698559c150ae0757a5b61e7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 数据存储
      let resumeData = {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
        experiences: [],
        education: [],
        skills: []
      };

      // 辅助函数：转义HTML
      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      // 主题切换
      const themeToggle = document.getElementById("themeToggle");
      themeToggle.addEventListener("click", () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });

      // 加载保存的主题
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      // 模板切换
      document.getElementById("template").addEventListener("change", (e) => {
        const preview = document.getElementById("resumePreview");
        preview.className = "resume-preview template-" + e.target.value;
      });

      // 输入监听
      const inputs = ["name", "title", "email", "phone", "location", "summary", "skills"];
      inputs.forEach((id) => {
        document.getElementById(id).addEventListener("input", updatePreview);
      });

      // 添加工作经历
      document.getElementById("addExpBtn").addEventListener("click", function () {
        const company = document.getElementById("expCompany").value;
        const position = document.getElementById("expPosition").value;
        const start = document.getElementById("expStart").value;
        const end = document.getElementById("expCurrent").checked
          ? "至今"
          : document.getElementById("expEnd").value;
        const description = document.getElementById("expDescription").value;

        if (!company || !position) {
          alert("请填写公司名称和职位");
          return;
        }

        resumeData.experiences.push({ company, position, start, end, description });
        renderExperienceList();
        updatePreview();

        // 清空输入
        document.getElementById("expCompany").value = "";
        document.getElementById("expPosition").value = "";
        document.getElementById("expStart").value = "";
        document.getElementById("expEnd").value = "";
        document.getElementById("expCurrent").checked = false;
        document.getElementById("expDescription").value = "";
      });

      // 渲染工作经历列表
      function renderExperienceList() {
        const list = document.getElementById("experienceList");
        list.replaceChildren();

        resumeData.experiences.forEach((exp, index) => {
          const item = document.createElement("div");
          item.className = "entry-item";

          const header = document.createElement("div");
          header.className = "entry-item-header";

          const titleSpan = document.createElement("span");
          titleSpan.className = "entry-item-title";
          titleSpan.textContent = exp.company + " - " + exp.position;

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn-small outline";
          deleteBtn.textContent = "删除";
          deleteBtn.addEventListener("click", () => removeExperience(index));

          header.appendChild(titleSpan);
          header.appendChild(deleteBtn);

          const dateInfo = document.createElement("small");
          dateInfo.textContent =
            formatDate(exp.start) + " - " + (exp.end === "至今" ? "至今" : formatDate(exp.end));

          item.appendChild(header);
          item.appendChild(dateInfo);
          list.appendChild(item);
        });
      }

      // 删除工作经历
      function removeExperience(index) {
        resumeData.experiences.splice(index, 1);
        renderExperienceList();
        updatePreview();
      }

      // 添加教育经历
      document.getElementById("addEduBtn").addEventListener("click", function () {
        const school = document.getElementById("eduSchool").value;
        const degree = document.getElementById("eduDegree").value;
        const major = document.getElementById("eduMajor").value;
        const date = document.getElementById("eduDate").value;

        if (!school || !degree) {
          alert("请填写学校名称和学历");
          return;
        }

        resumeData.education.push({ school, degree, major, date });
        renderEducationList();
        updatePreview();

        // 清空输入
        document.getElementById("eduSchool").value = "";
        document.getElementById("eduDegree").value = "";
        document.getElementById("eduMajor").value = "";
        document.getElementById("eduDate").value = "";
      });

      // 渲染教育经历列表
      function renderEducationList() {
        const list = document.getElementById("educationList");
        list.replaceChildren();

        resumeData.education.forEach((edu, index) => {
          const item = document.createElement("div");
          item.className = "entry-item";

          const header = document.createElement("div");
          header.className = "entry-item-header";

          const titleSpan = document.createElement("span");
          titleSpan.className = "entry-item-title";
          titleSpan.textContent = edu.school + " - " + edu.degree;

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn-small outline";
          deleteBtn.textContent = "删除";
          deleteBtn.addEventListener("click", () => removeEducation(index));

          header.appendChild(titleSpan);
          header.appendChild(deleteBtn);

          const dateInfo = document.createElement("small");
          dateInfo.textContent = edu.major + " | " + formatDate(edu.date);

          item.appendChild(header);
          item.appendChild(dateInfo);
          list.appendChild(item);
        });
      }

      // 删除教育经历
      function removeEducation(index) {
        resumeData.education.splice(index, 1);
        renderEducationList();
        updatePreview();
      }

      // 格式化日期
      function formatDate(dateStr) {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return year + "年" + month + "月";
      }

      // 更新预览
      function updatePreview() {
        const name = document.getElementById("name").value;
        const title = document.getElementById("title").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const location = document.getElementById("location").value;
        const summary = document.getElementById("summary").value;
        const skillsStr = document.getElementById("skills").value;
        const skills = skillsStr
          ? skillsStr
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          : [];

        resumeData = { ...resumeData, name, title, email, phone, location, summary, skills };

        const preview = document.getElementById("resumePreview");
        preview.replaceChildren();

        if (!name && !title && !email && resumeData.experiences.length === 0) {
          const placeholder = document.createElement("p");
          placeholder.style.cssText =
            "color: var(--pico-muted-color); text-align: center; margin-top: 200px;";
          placeholder.textContent = "在左侧填写信息，预览将实时更新";
          preview.appendChild(placeholder);
          return;
        }

        // 头部信息
        if (name) {
          const h1 = document.createElement("h1");
          h1.textContent = name;
          preview.appendChild(h1);
        }

        if (title) {
          const titleP = document.createElement("p");
          titleP.style.cssText = "font-size: 1.2rem; margin-bottom: 0.5rem;";
          titleP.textContent = title;
          preview.appendChild(titleP);
        }

        const contactParts = [];
        if (email) contactParts.push(email);
        if (phone) contactParts.push(phone);
        if (location) contactParts.push(location);
        if (contactParts.length > 0) {
          const contactP = document.createElement("p");
          contactP.className = "contact-info";
          contactP.textContent = contactParts.join(" | ");
          preview.appendChild(contactP);
        }

        // 个人简介
        if (summary) {
          const section = document.createElement("div");
          section.className = "section";

          const sectionTitle = document.createElement("div");
          sectionTitle.className = "section-title";
          sectionTitle.textContent = "个人简介";

          const summaryP = document.createElement("p");
          summaryP.textContent = summary;

          section.appendChild(sectionTitle);
          section.appendChild(summaryP);
          preview.appendChild(section);
        }

        // 工作经历
        if (resumeData.experiences.length > 0) {
          const section = document.createElement("div");
          section.className = "section";

          const sectionTitle = document.createElement("div");
          sectionTitle.className = "section-title";
          sectionTitle.textContent = "工作经历";
          section.appendChild(sectionTitle);

          resumeData.experiences.forEach((exp) => {
            const item = document.createElement("div");
            item.className = "experience-item";

            const h4 = document.createElement("h4");
            h4.textContent = exp.position;

            const meta = document.createElement("div");
            meta.className = "meta";
            meta.textContent =
              exp.company +
              " | " +
              formatDate(exp.start) +
              " - " +
              (exp.end === "至今" ? "至今" : formatDate(exp.end));

            const desc = document.createElement("p");
            desc.textContent = exp.description;

            item.appendChild(h4);
            item.appendChild(meta);
            item.appendChild(desc);
            section.appendChild(item);
          });

          preview.appendChild(section);
        }

        // 教育背景
        if (resumeData.education.length > 0) {
          const section = document.createElement("div");
          section.className = "section";

          const sectionTitle = document.createElement("div");
          sectionTitle.className = "section-title";
          sectionTitle.textContent = "教育背景";
          section.appendChild(sectionTitle);

          resumeData.education.forEach((edu) => {
            const item = document.createElement("div");
            item.className = "education-item";

            const h4 = document.createElement("h4");
            h4.textContent = edu.school;

            const meta = document.createElement("div");
            meta.className = "meta";
            meta.textContent = edu.degree + " - " + edu.major + " | " + formatDate(edu.date);

            item.appendChild(h4);
            item.appendChild(meta);
            section.appendChild(item);
          });

          preview.appendChild(section);
        }

        // 技能
        if (skills.length > 0) {
          const section = document.createElement("div");
          section.className = "section";

          const sectionTitle = document.createElement("div");
          sectionTitle.className = "section-title";
          sectionTitle.textContent = "专业技能";
          section.appendChild(sectionTitle);

          const skillTags = document.createElement("div");
          skillTags.className = "skill-tags";

          skills.forEach((skill) => {
            const tag = document.createElement("span");
            tag.className = "skill-tag";
            tag.textContent = skill;
            skillTags.appendChild(tag);
          });

          section.appendChild(skillTags);
          preview.appendChild(section);
        }
      }

      window.updatePreview = updatePreview;

      // 导出PDF
      document.getElementById("exportPdfBtn").addEventListener("click", function () {
        window.print();
      });

      // 导出HTML
      document.getElementById("exportHtmlBtn").addEventListener("click", function () {
        const template = document.getElementById("template").value;
        const templateColor =
          template === "modern" ? "#2563eb" : template === "creative" ? "#7c3aed" : "#374151";

        let htmlContent =
          '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' +
          escapeHtml(resumeData.name) +
          "的简历 - WebUtils</title>";
        htmlContent += "<style>";
        htmlContent +=
          "body { font-family: var(--font-sans); max-width: 800px; margin: 0 auto; padding: 2rem; }";
        htmlContent += "h1 { margin-bottom: 0.5rem; }";
        htmlContent += ".contact-info { color: #666; margin-bottom: 1.5rem; }";
        htmlContent += ".section { margin-bottom: 1.5rem; }";
        htmlContent +=
          ".section-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 0.3rem; margin-bottom: 0.8rem; color: " +
          templateColor +
          "; }";
        htmlContent += ".experience-item, .education-item { margin-bottom: 1rem; }";
        htmlContent += ".experience-item h4, .education-item h4 { margin: 0; }";
        htmlContent += ".meta { color: #666; font-size: 0.85rem; }";
        htmlContent += ".skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }";
        htmlContent +=
          ".skill-tag { background: " +
          templateColor +
          "; color: white; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.8rem; }";
        htmlContent += "</style></head><body>";

        if (resumeData.name) htmlContent += "<h2>" + escapeHtml(resumeData.name) + "</h2>";
        if (resumeData.title)
          htmlContent +=
            '<p style="font-size: 1.2rem; margin-bottom: 0.5rem;">' +
            escapeHtml(resumeData.title) +
            "</p>";

        const contactParts = [];
        if (resumeData.email) contactParts.push(escapeHtml(resumeData.email));
        if (resumeData.phone) contactParts.push(escapeHtml(resumeData.phone));
        if (resumeData.location) contactParts.push(escapeHtml(resumeData.location));
        if (contactParts.length > 0) {
          htmlContent += '<p class="contact-info">' + contactParts.join(" | ") + "</p>";
        }

        if (resumeData.summary) {
          htmlContent +=
            '<div class="section"><div class="section-title">个人简介</div><p>' +
            escapeHtml(resumeData.summary) +
            "</p></div>";
        }

        if (resumeData.experiences.length > 0) {
          htmlContent += '<div class="section"><div class="section-title">工作经历</div>';
          resumeData.experiences.forEach((exp) => {
            htmlContent += '<div class="experience-item">';
            htmlContent += "<h4>" + escapeHtml(exp.position) + "</h4>";
            htmlContent +=
              '<div class="meta">' +
              escapeHtml(exp.company) +
              " | " +
              formatDate(exp.start) +
              " - " +
              (exp.end === "至今" ? "至今" : formatDate(exp.end)) +
              "</div>";
            htmlContent += "<p>" + escapeHtml(exp.description) + "</p>";
            htmlContent += "</div>";
          });
          htmlContent += "</div>";
        }

        if (resumeData.education.length > 0) {
          htmlContent += '<div class="section"><div class="section-title">教育背景</div>';
          resumeData.education.forEach((edu) => {
            htmlContent += '<div class="education-item">';
            htmlContent += "<h4>" + escapeHtml(edu.school) + "</h4>";
            htmlContent +=
              '<div class="meta">' +
              escapeHtml(edu.degree) +
              " - " +
              escapeHtml(edu.major) +
              " | " +
              formatDate(edu.date) +
              "</div>";
            htmlContent += "</div>";
          });
          htmlContent += "</div>";
        }

        if (resumeData.skills.length > 0) {
          htmlContent +=
            '<div class="section"><div class="section-title">专业技能</div><div class="skill-tags">';
          resumeData.skills.forEach((skill) => {
            htmlContent += '<span class="skill-tag">' + escapeHtml(skill) + "</span>";
          });
          htmlContent += "</div></div>";
        }

        htmlContent += "</body></html>";

        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = (resumeData.name || "简历") + ".html";
        a.click();
        URL.revokeObjectURL(url);
      });

      // 保存数据
      document.getElementById("saveDataBtn").addEventListener("click", function () {
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        alert("数据已保存到本地");
      });

      // 加载数据
      document.getElementById("loadDataBtn").addEventListener("click", function () {
        const saved = localStorage.getItem("resumeData");
        if (saved) {
          resumeData = JSON.parse(saved);
          document.getElementById("name").value = resumeData.name || "";
          document.getElementById("title").value = resumeData.title || "";
          document.getElementById("email").value = resumeData.email || "";
          document.getElementById("phone").value = resumeData.phone || "";
          document.getElementById("location").value = resumeData.location || "";
          document.getElementById("summary").value = resumeData.summary || "";
          document.getElementById("skills").value = resumeData.skills
            ? resumeData.skills.join(", ")
            : "";
          renderExperienceList();
          renderEducationList();
          updatePreview();
          alert("数据已加载");
        } else {
          alert("没有找到保存的数据");
        }
      });

      // 页面加载时尝试加载数据
      window.addEventListener("load", () => {
        const saved = localStorage.getItem("resumeData");
        if (saved) {
          resumeData = JSON.parse(saved);
          document.getElementById("name").value = resumeData.name || "";
          document.getElementById("title").value = resumeData.title || "";
          document.getElementById("email").value = resumeData.email || "";
          document.getElementById("phone").value = resumeData.phone || "";
          document.getElementById("location").value = resumeData.location || "";
          document.getElementById("summary").value = resumeData.summary || "";
          document.getElementById("skills").value = resumeData.skills
            ? resumeData.skills.join(", ")
            : "";
          renderExperienceList();
          renderEducationList();
          updatePreview();
        }
      });

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
