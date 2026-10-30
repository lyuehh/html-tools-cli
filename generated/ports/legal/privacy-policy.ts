// @ts-nocheck
// Generated from tools/legal/privacy-policy.html
// Source SHA-256: b69980628dc906c6fdf1f4e9384c4fec06e87d18eb2ca0c2cdcd52a1709e9c3d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "privacy_policy_form_v1";

      function getFormData() {
        return {
          companyName: document.getElementById("companyName").value.trim(),
          websiteUrl: document.getElementById("websiteUrl").value.trim(),
          contactEmail: document.getElementById("contactEmail").value.trim(),
          effectiveDate: document.getElementById("effectiveDate").value,
          companyAddress: document.getElementById("companyAddress").value.trim(),
          dataTypes: {
            name: document.getElementById("dataName").checked,
            email: document.getElementById("dataEmail").checked,
            phone: document.getElementById("dataPhone").checked,
            address: document.getElementById("dataAddress").checked,
            payment: document.getElementById("dataPayment").checked,
            usage: document.getElementById("dataUsage").checked,
            cookies: document.getElementById("dataCookies").checked,
            location: document.getElementById("dataLocation").checked,
            device: document.getElementById("dataDevice").checked
          },
          laws: {
            gdpr: document.getElementById("lawGdpr").checked,
            ccpa: document.getElementById("lawCcpa").checked,
            pipl: document.getElementById("lawPipl").checked
          },
          language: document.getElementById("language").value
        };
      }

      function setFormData(data) {
        if (!data) return;
        if (data.companyName) document.getElementById("companyName").value = data.companyName;
        if (data.websiteUrl) document.getElementById("websiteUrl").value = data.websiteUrl;
        if (data.contactEmail) document.getElementById("contactEmail").value = data.contactEmail;
        if (data.effectiveDate) document.getElementById("effectiveDate").value = data.effectiveDate;
        if (data.companyAddress)
          document.getElementById("companyAddress").value = data.companyAddress;
        if (data.dataTypes) {
          Object.keys(data.dataTypes).forEach(function (key) {
            var el = document.getElementById("data" + key.charAt(0).toUpperCase() + key.slice(1));
            if (el) el.checked = data.dataTypes[key];
          });
        }
        if (data.laws) {
          if (data.laws.gdpr !== undefined)
            document.getElementById("lawGdpr").checked = data.laws.gdpr;
          if (data.laws.ccpa !== undefined)
            document.getElementById("lawCcpa").checked = data.laws.ccpa;
          if (data.laws.pipl !== undefined)
            document.getElementById("lawPipl").checked = data.laws.pipl;
        }
        if (data.language) document.getElementById("language").value = data.language;
      }

      function saveToStorage() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(getFormData()));
        } catch (e) {}
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            setFormData(JSON.parse(saved));
          }
        } catch (e) {}
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function generatePolicy() {
        var data = getFormData();

        if (!data.companyName) {
          showStatus("请输入公司/网站名称", "error");
          return;
        }
        if (!data.contactEmail) {
          showStatus("请输入联系邮箱", "error");
          return;
        }

        var output = "";
        var effectiveDate = data.effectiveDate || new Date().toISOString().split("T")[0];

        if (data.language === "zh") {
          output = generateChinesePolicy(data, effectiveDate);
        } else {
          output = generateEnglishPolicy(data, effectiveDate);
        }

        document.getElementById("output").value = output;
        saveToStorage();
        showStatus("隐私政策已生成", "success");
      }

      function generateChinesePolicy(data, effectiveDate) {
        var lines = [];
        lines.push("隐私政策");
        lines.push("");
        lines.push("生效日期：" + effectiveDate);
        lines.push("");
        lines.push("一、引言");
        lines.push("");
        lines.push(
          data.companyName +
            '（以下简称"我们"）非常重视您的隐私。本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。'
        );
        if (data.websiteUrl) {
          lines.push("");
          lines.push("本政策适用于 " + data.websiteUrl + " 及我们提供的相关服务。");
        }
        lines.push("");
        lines.push("二、我们收集的信息");
        lines.push("");
        lines.push("我们可能收集以下类型的个人信息：");
        lines.push("");

        var dataTypeNames = {
          name: "姓名",
          email: "电子邮件地址",
          phone: "电话号码",
          address: "通讯地址",
          payment: "支付和账单信息",
          usage: "服务使用数据和浏览记录",
          cookies: "Cookies 和类似技术收集的数据",
          location: "地理位置信息",
          device: "设备信息（设备型号、操作系统、浏览器类型等）"
        };

        Object.keys(data.dataTypes).forEach(function (key) {
          if (data.dataTypes[key] && dataTypeNames[key]) {
            lines.push("• " + dataTypeNames[key]);
          }
        });

        lines.push("");
        lines.push("三、信息的使用目的");
        lines.push("");
        lines.push("我们收集的信息将用于以下目的：");
        lines.push("");
        lines.push("• 提供、维护和改进我们的服务");
        lines.push("• 处理您的请求和交易");
        lines.push("• 与您沟通，包括发送服务通知");
        lines.push("• 遵守法律法规要求");
        lines.push("• 保护我们的合法权益");

        lines.push("");
        lines.push("四、信息的共享与披露");
        lines.push("");
        lines.push("除以下情况外，我们不会与第三方共享您的个人信息：");
        lines.push("");
        lines.push("• 获得您的明确同意");
        lines.push("• 法律法规要求");
        lines.push("• 与授权服务提供商合作以提供服务");
        lines.push("• 保护我们或他人的权利、财产或安全");

        lines.push("");
        lines.push("五、信息安全");
        lines.push("");
        lines.push(
          "我们采取适当的技术和组织措施来保护您的个人信息，防止未经授权的访问、使用或泄露。"
        );

        lines.push("");
        lines.push("六、您的权利");
        lines.push("");
        lines.push("根据适用法律，您可能拥有以下权利：");
        lines.push("");
        lines.push("• 访问您的个人信息");
        lines.push("• 更正不准确的信息");
        lines.push("• 删除您的个人信息");
        lines.push("• 限制或反对某些处理");
        lines.push("• 数据可携带权");

        if (data.laws.pipl) {
          lines.push("");
          lines.push("七、中国个人信息保护法合规");
          lines.push("");
          lines.push("根据《中华人民共和国个人信息保护法》，我们承诺：");
          lines.push("");
          lines.push("• 遵循合法、正当、必要和诚信原则处理个人信息");
          lines.push("• 明确告知处理目的、方式和范围");
          lines.push("• 不过度收集个人信息");
          lines.push("• 采取必要措施保障个人信息安全");
        }

        if (data.laws.gdpr) {
          lines.push("");
          lines.push("八、GDPR 合规声明");
          lines.push("");
          lines.push("对于欧盟用户，我们遵守《通用数据保护条例》（GDPR）的要求，包括：");
          lines.push("");
          lines.push("• 仅在有合法依据时处理个人数据");
          lines.push("• 提供清晰的同意机制");
          lines.push("• 保障数据主体权利");
          lines.push("• 跨境数据传输符合规定");
        }

        if (data.laws.ccpa) {
          lines.push("");
          lines.push("九、CCPA 合规声明");
          lines.push("");
          lines.push("对于加州居民，根据《加州消费者隐私法》（CCPA），您有权：");
          lines.push("");
          lines.push("• 了解我们收集的个人信息类别");
          lines.push("• 要求删除您的个人信息");
          lines.push("• 选择不出售您的个人信息");
          lines.push("• 不因行使隐私权而受到歧视");
        }

        if (data.dataTypes.cookies) {
          lines.push("");
          lines.push("十、Cookies 政策");
          lines.push("");
          lines.push(
            "我们使用 Cookies 和类似技术来改善用户体验、分析网站流量和提供个性化内容。您可以通过浏览器设置管理 Cookies 偏好。"
          );
        }

        lines.push("");
        lines.push("十一、政策更新");
        lines.push("");
        lines.push(
          "我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，重大变更时我们会通过适当方式通知您。"
        );

        lines.push("");
        lines.push("十二、联系我们");
        lines.push("");
        lines.push("如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：");
        lines.push("");
        lines.push("邮箱：" + data.contactEmail);
        if (data.companyAddress) {
          lines.push("地址：" + data.companyAddress);
        }

        lines.push("");
        lines.push("---");
        lines.push(data.companyName);
        lines.push("最后更新：" + effectiveDate);

        return lines.join("\n");
      }

      function generateEnglishPolicy(data, effectiveDate) {
        var lines = [];
        lines.push("Privacy Policy");
        lines.push("");
        lines.push("Effective Date: " + effectiveDate);
        lines.push("");
        lines.push("1. Introduction");
        lines.push("");
        lines.push(
          data.companyName +
            ' ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information.'
        );
        if (data.websiteUrl) {
          lines.push("");
          lines.push("This policy applies to " + data.websiteUrl + " and our related services.");
        }
        lines.push("");
        lines.push("2. Information We Collect");
        lines.push("");
        lines.push("We may collect the following types of personal information:");
        lines.push("");

        var dataTypeNames = {
          name: "Name",
          email: "Email address",
          phone: "Phone number",
          address: "Mailing address",
          payment: "Payment and billing information",
          usage: "Usage data and browsing history",
          cookies: "Data collected through cookies and similar technologies",
          location: "Geolocation information",
          device: "Device information (device model, operating system, browser type, etc.)"
        };

        Object.keys(data.dataTypes).forEach(function (key) {
          if (data.dataTypes[key] && dataTypeNames[key]) {
            lines.push("• " + dataTypeNames[key]);
          }
        });

        lines.push("");
        lines.push("3. How We Use Your Information");
        lines.push("");
        lines.push("We use the collected information for the following purposes:");
        lines.push("");
        lines.push("• To provide, maintain, and improve our services");
        lines.push("• To process your requests and transactions");
        lines.push("• To communicate with you, including service notifications");
        lines.push("• To comply with legal requirements");
        lines.push("• To protect our legitimate interests");

        lines.push("");
        lines.push("4. Information Sharing and Disclosure");
        lines.push("");
        lines.push("We do not share your personal information with third parties except:");
        lines.push("");
        lines.push("• With your explicit consent");
        lines.push("• As required by law");
        lines.push("• With authorized service providers to deliver our services");
        lines.push("• To protect our or others' rights, property, or safety");

        lines.push("");
        lines.push("5. Data Security");
        lines.push("");
        lines.push(
          "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, use, or disclosure."
        );

        lines.push("");
        lines.push("6. Your Rights");
        lines.push("");
        lines.push("Depending on applicable laws, you may have the following rights:");
        lines.push("");
        lines.push("• Access your personal information");
        lines.push("• Correct inaccurate information");
        lines.push("• Delete your personal information");
        lines.push("• Restrict or object to certain processing");
        lines.push("• Data portability");

        if (data.laws.gdpr) {
          lines.push("");
          lines.push("7. GDPR Compliance");
          lines.push("");
          lines.push(
            "For EU users, we comply with the General Data Protection Regulation (GDPR), including:"
          );
          lines.push("");
          lines.push("• Processing personal data only with a lawful basis");
          lines.push("• Providing clear consent mechanisms");
          lines.push("• Ensuring data subject rights");
          lines.push("• Complying with cross-border data transfer requirements");
        }

        if (data.laws.ccpa) {
          lines.push("");
          lines.push("8. CCPA Compliance");
          lines.push("");
          lines.push(
            "For California residents, under the California Consumer Privacy Act (CCPA), you have the right to:"
          );
          lines.push("");
          lines.push("• Know what personal information we collect");
          lines.push("• Request deletion of your personal information");
          lines.push("• Opt-out of the sale of your personal information");
          lines.push("• Non-discrimination for exercising your privacy rights");
        }

        if (data.dataTypes.cookies) {
          lines.push("");
          lines.push("9. Cookie Policy");
          lines.push("");
          lines.push(
            "We use cookies and similar technologies to improve user experience, analyze website traffic, and provide personalized content. You can manage your cookie preferences through your browser settings."
          );
        }

        lines.push("");
        lines.push("10. Policy Updates");
        lines.push("");
        lines.push(
          "We may update this Privacy Policy from time to time. Updated policies will be posted on this page, and we will notify you of significant changes through appropriate means."
        );

        lines.push("");
        lines.push("11. Contact Us");
        lines.push("");
        lines.push(
          "If you have any questions about this Privacy Policy or need to exercise your rights, please contact us:"
        );
        lines.push("");
        lines.push("Email: " + data.contactEmail);
        if (data.companyAddress) {
          lines.push("Address: " + data.companyAddress);
        }

        lines.push("");
        lines.push("---");
        lines.push(data.companyName);
        lines.push("Last Updated: " + effectiveDate);

        return lines.join("\n");
      }

      function copyOutput() {
        var output = document.getElementById("output").value;
        if (!output) {
          showStatus("没有可复制的内容", "error");
          return;
        }
        navigator.clipboard
          .writeText(output)
          .then(function () {
            showStatus("已复制到剪贴板", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      function downloadPolicy() {
        var output = document.getElementById("output").value;
        if (!output) {
          showStatus("没有可下载的内容", "error");
          return;
        }
        var data = getFormData();
        var filename = (data.language === "zh" ? "隐私政策" : "Privacy_Policy") + ".txt";
        var blob = new Blob([output], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showStatus("下载已开始", "success");
      }

      function clearForm() {
        document.getElementById("companyName").value = "";
        document.getElementById("websiteUrl").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("effectiveDate").value = "";
        document.getElementById("companyAddress").value = "";
        document.getElementById("output").value = "";
        localStorage.removeItem(LS_KEY);
        showStatus("已清空", "success");
      }

      // Auto-save on input
      document.querySelectorAll("input, select").forEach(function (el) {
        el.addEventListener("change", saveToStorage);
        el.addEventListener("input", saveToStorage);
      });

      // Theme toggle
      function toggleTheme() {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }

      // Initialize
      (function () {
        var savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
        }
        loadFromStorage();
        // Set default date
        if (!document.getElementById("effectiveDate").value) {
          document.getElementById("effectiveDate").value = new Date().toISOString().split("T")[0];
        }
      })();
    
