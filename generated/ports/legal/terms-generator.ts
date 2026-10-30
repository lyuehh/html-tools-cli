// @ts-nocheck
// Generated from tools/legal/terms-generator.html
// Source SHA-256: bc8d89dd6e8320c39bb8d43fb9d6479da633bfcd77256c561b6e1e2e9df01ca7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "terms_generator_form_v1";

      function getFormData() {
        return {
          companyName: document.getElementById("companyName").value.trim(),
          websiteUrl: document.getElementById("websiteUrl").value.trim(),
          contactEmail: document.getElementById("contactEmail").value.trim(),
          effectiveDate: document.getElementById("effectiveDate").value,
          serviceType: document.getElementById("serviceType").value,
          jurisdiction: document.getElementById("jurisdiction").value,
          serviceDescription: document.getElementById("serviceDescription").value.trim(),
          terms: {
            account: document.getElementById("termAccount").checked,
            payment: document.getElementById("termPayment").checked,
            refund: document.getElementById("termRefund").checked,
            ip: document.getElementById("termIP").checked,
            ugc: document.getElementById("termUGC").checked,
            privacy: document.getElementById("termPrivacy").checked,
            termination: document.getElementById("termTermination").checked,
            dispute: document.getElementById("termDispute").checked
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
        if (data.serviceType) document.getElementById("serviceType").value = data.serviceType;
        if (data.jurisdiction) document.getElementById("jurisdiction").value = data.jurisdiction;
        if (data.serviceDescription)
          document.getElementById("serviceDescription").value = data.serviceDescription;
        if (data.terms) {
          Object.keys(data.terms).forEach(function (key) {
            var el = document.getElementById("term" + key.charAt(0).toUpperCase() + key.slice(1));
            if (el) el.checked = data.terms[key];
          });
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

      function generateTerms() {
        var data = getFormData();

        if (!data.companyName) {
          showStatus("请输入公司/网站名称", "error");
          return;
        }
        if (!data.websiteUrl) {
          showStatus("请输入网站地址", "error");
          return;
        }
        if (!data.contactEmail) {
          showStatus("请输入联系邮箱", "error");
          return;
        }

        var output = "";
        var effectiveDate = data.effectiveDate || new Date().toISOString().split("T")[0];

        if (data.language === "zh") {
          output = generateChineseTerms(data, effectiveDate);
        } else {
          output = generateEnglishTerms(data, effectiveDate);
        }

        document.getElementById("output").value = output;
        saveToStorage();
        showStatus("服务条款已生成", "success");
      }

      function generateChineseTerms(data, effectiveDate) {
        var lines = [];
        var sectionNum = 1;

        lines.push("服务条款");
        lines.push("");
        lines.push("生效日期：" + effectiveDate);
        lines.push("");
        lines.push(sectionNum++ + ". 接受条款");
        lines.push("");
        lines.push(
          "欢迎使用 " +
            data.companyName +
            '（以下简称"我们"或"本服务"）提供的服务。在使用本服务之前，请仔细阅读以下服务条款。'
        );
        lines.push("");
        lines.push(
          "访问或使用我们的网站 " +
            data.websiteUrl +
            " 及相关服务，即表示您同意受本服务条款的约束。如果您不同意这些条款，请勿使用本服务。"
        );

        if (data.serviceDescription) {
          lines.push("");
          lines.push(sectionNum++ + ". 服务说明");
          lines.push("");
          lines.push(data.serviceDescription);
        }

        if (data.terms.account) {
          lines.push("");
          lines.push(sectionNum++ + ". 账户注册与安全");
          lines.push("");
          lines.push("• 您必须年满 18 周岁或在您所在司法管辖区达到法定成年年龄才能注册账户");
          lines.push("• 您须提供准确、完整的注册信息，并保持信息的及时更新");
          lines.push("• 您有责任保护您的账户安全，包括妥善保管密码");
          lines.push("• 您的账户下发生的所有活动由您负责");
          lines.push("• 发现任何未经授权使用您账户的情况，请立即通知我们");
        }

        if (data.terms.payment) {
          lines.push("");
          lines.push(sectionNum++ + ". 付款条款");
          lines.push("");
          lines.push("• 使用本服务的付费功能需要支付相应费用");
          lines.push("• 所有价格均以人民币计价，除非另有说明");
          lines.push("• 付款后，您将获得相应服务的使用权");
          lines.push("• 我们保留随时调整价格的权利，价格变动前会提前通知");
          lines.push("• 逾期未付款可能导致服务中断");
        }

        if (data.terms.refund) {
          lines.push("");
          lines.push(sectionNum++ + ". 退款政策");
          lines.push("");
          lines.push("• 数字产品和服务通常不支持退款");
          lines.push("• 特殊情况下的退款请求将逐案评估");
          lines.push("• 如需申请退款，请在购买后 7 天内联系我们");
          lines.push("• 退款将原路返还至您的支付账户");
        }

        lines.push("");
        lines.push(sectionNum++ + ". 用户行为规范");
        lines.push("");
        lines.push("使用本服务时，您同意不会：");
        lines.push("");
        lines.push("• 违反任何适用的法律法规");
        lines.push("• 侵犯他人的知识产权或其他权利");
        lines.push(
          "• 上传、发布或传输任何非法、有害、威胁性、辱骂性、骚扰性、诽谤性、淫秽或其他不当内容"
        );
        lines.push("• 干扰或破坏本服务的正常运行");
        lines.push("• 未经授权访问本服务的任何部分");
        lines.push("• 使用自动化工具或脚本进行未经授权的操作");

        if (data.terms.ugc) {
          lines.push("");
          lines.push(sectionNum++ + ". 用户内容");
          lines.push("");
          lines.push("• 您对您上传、发布或共享的内容承担全部责任");
          lines.push("• 您保证您拥有发布该内容的权利");
          lines.push("• 您授予我们非独占的、全球性的、免版税的许可，以使用、展示和分发您的内容");
          lines.push("• 我们有权（但无义务）删除任何违反本条款的用户内容");
        }

        if (data.terms.ip) {
          lines.push("");
          lines.push(sectionNum++ + ". 知识产权");
          lines.push("");
          lines.push(
            "• 本服务及其内容（包括但不限于文字、图形、标识、软件）均受著作权、商标权等知识产权法律保护"
          );
          lines.push("• 未经我们书面许可，您不得复制、修改、分发或以其他方式使用本服务的任何内容");
          lines.push("• 所有商标、服务标记和标识均为其各自所有者的财产");
        }

        if (data.terms.privacy) {
          lines.push("");
          lines.push(sectionNum++ + ". 隐私政策");
          lines.push("");
          lines.push(
            "您使用本服务即表示您同意我们按照隐私政策收集和使用您的信息。请查阅我们的隐私政策以了解更多详情。"
          );
        }

        lines.push("");
        lines.push(sectionNum++ + ". 免责声明");
        lines.push("");
        lines.push('• 本服务按"现状"和"现有"基础提供，不提供任何明示或暗示的保证');
        lines.push("• 我们不保证本服务将不间断、及时、安全或无错误");
        lines.push("• 您使用本服务的风险由您自行承担");

        lines.push("");
        lines.push(sectionNum++ + ". 责任限制");
        lines.push("");
        lines.push("在法律允许的最大范围内，我们及我们的董事、员工、代理人不对以下情况承担责任：");
        lines.push("");
        lines.push("• 任何间接、偶发、特殊、惩罚性或后果性损害");
        lines.push("• 利润损失、数据丢失或业务中断");
        lines.push("• 由您使用或无法使用本服务引起的任何损害");

        if (data.terms.termination) {
          lines.push("");
          lines.push(sectionNum++ + ". 终止");
          lines.push("");
          lines.push("• 您可以随时停止使用本服务或注销账户");
          lines.push("• 如果您违反本条款，我们有权立即终止或暂停您的账户");
          lines.push("• 终止后，您使用本服务的权利将立即停止");
          lines.push("• 终止后，某些条款（如知识产权、免责声明、责任限制）将继续有效");
        }

        lines.push("");
        lines.push(sectionNum++ + ". 条款修改");
        lines.push("");
        lines.push(
          "我们保留随时修改本服务条款的权利。修改后的条款将在本页面发布，继续使用本服务即表示您接受修改后的条款。重大变更时，我们会通过适当方式通知您。"
        );

        if (data.terms.dispute) {
          lines.push("");
          lines.push(sectionNum++ + ". 争议解决");
          lines.push("");
          var jurisdictionText = {
            cn: "本条款受中华人民共和国法律管辖，任何争议应提交至我们所在地有管辖权的人民法院解决。",
            hk: "本条款受中国香港特别行政区法律管辖，任何争议应通过友好协商解决，协商不成时提交香港国际仲裁中心仲裁。",
            us: "本条款受美国法律管辖，任何争议应通过具有约束力的仲裁解决。",
            eu: "本条款受欧盟法律管辖，任何争议应首先尝试通过调解解决。"
          };
          lines.push(jurisdictionText[data.jurisdiction] || jurisdictionText.cn);
        }

        lines.push("");
        lines.push(sectionNum++ + ". 联系我们");
        lines.push("");
        lines.push("如对本服务条款有任何疑问，请通过以下方式联系我们：");
        lines.push("");
        lines.push("邮箱：" + data.contactEmail);
        lines.push("网站：" + data.websiteUrl);

        lines.push("");
        lines.push("---");
        lines.push(data.companyName);
        lines.push("最后更新：" + effectiveDate);

        return lines.join("\n");
      }

      function generateEnglishTerms(data, effectiveDate) {
        var lines = [];
        var sectionNum = 1;

        lines.push("Terms of Service");
        lines.push("");
        lines.push("Effective Date: " + effectiveDate);
        lines.push("");
        lines.push(sectionNum++ + ". Acceptance of Terms");
        lines.push("");
        lines.push(
          "Welcome to " +
            data.companyName +
            ' ("we", "us", or "the Service"). Please read these Terms of Service carefully before using our service.'
        );
        lines.push("");
        lines.push(
          "By accessing or using our website " +
            data.websiteUrl +
            " and related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service."
        );

        if (data.serviceDescription) {
          lines.push("");
          lines.push(sectionNum++ + ". Service Description");
          lines.push("");
          lines.push(data.serviceDescription);
        }

        if (data.terms.account) {
          lines.push("");
          lines.push(sectionNum++ + ". Account Registration and Security");
          lines.push("");
          lines.push(
            "• You must be at least 18 years old or have reached the age of majority in your jurisdiction to register an account"
          );
          lines.push(
            "• You must provide accurate and complete registration information and keep it updated"
          );
          lines.push(
            "• You are responsible for maintaining the security of your account, including keeping your password safe"
          );
          lines.push("• You are responsible for all activities that occur under your account");
          lines.push(
            "• Please notify us immediately if you discover any unauthorized use of your account"
          );
        }

        if (data.terms.payment) {
          lines.push("");
          lines.push(sectionNum++ + ". Payment Terms");
          lines.push("");
          lines.push("• Using paid features of the Service requires payment of applicable fees");
          lines.push("• All prices are in USD unless otherwise stated");
          lines.push("• Upon payment, you will receive access to the corresponding services");
          lines.push("• We reserve the right to adjust prices at any time with prior notice");
          lines.push("• Late payment may result in service interruption");
        }

        if (data.terms.refund) {
          lines.push("");
          lines.push(sectionNum++ + ". Refund Policy");
          lines.push("");
          lines.push("• Digital products and services are generally non-refundable");
          lines.push(
            "• Refund requests for special circumstances will be evaluated on a case-by-case basis"
          );
          lines.push("• To request a refund, please contact us within 7 days of purchase");
          lines.push("• Refunds will be returned to your original payment method");
        }

        lines.push("");
        lines.push(sectionNum++ + ". User Conduct");
        lines.push("");
        lines.push("When using the Service, you agree not to:");
        lines.push("");
        lines.push("• Violate any applicable laws or regulations");
        lines.push("• Infringe upon the intellectual property or other rights of others");
        lines.push(
          "• Upload, post, or transmit any illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable content"
        );
        lines.push("• Interfere with or disrupt the normal operation of the Service");
        lines.push("• Access any part of the Service without authorization");
        lines.push("• Use automated tools or scripts for unauthorized operations");

        if (data.terms.ugc) {
          lines.push("");
          lines.push(sectionNum++ + ". User Content");
          lines.push("");
          lines.push("• You are solely responsible for content you upload, post, or share");
          lines.push("• You warrant that you have the right to post such content");
          lines.push(
            "• You grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content"
          );
          lines.push(
            "• We have the right (but not the obligation) to remove any user content that violates these terms"
          );
        }

        if (data.terms.ip) {
          lines.push("");
          lines.push(sectionNum++ + ". Intellectual Property");
          lines.push("");
          lines.push(
            "• The Service and its content (including but not limited to text, graphics, logos, software) are protected by copyright, trademark, and other intellectual property laws"
          );
          lines.push(
            "• You may not copy, modify, distribute, or otherwise use any content from the Service without our written permission"
          );
          lines.push(
            "• All trademarks, service marks, and logos are the property of their respective owners"
          );
        }

        if (data.terms.privacy) {
          lines.push("");
          lines.push(sectionNum++ + ". Privacy Policy");
          lines.push("");
          lines.push(
            "By using the Service, you consent to our collection and use of your information in accordance with our Privacy Policy. Please review our Privacy Policy for more details."
          );
        }

        lines.push("");
        lines.push(sectionNum++ + ". Disclaimer of Warranties");
        lines.push("");
        lines.push(
          '• The Service is provided on an "as is" and "as available" basis without any warranties, express or implied'
        );
        lines.push(
          "• We do not warrant that the Service will be uninterrupted, timely, secure, or error-free"
        );
        lines.push("• Your use of the Service is at your own risk");

        lines.push("");
        lines.push(sectionNum++ + ". Limitation of Liability");
        lines.push("");
        lines.push(
          "To the maximum extent permitted by law, we and our directors, employees, and agents shall not be liable for:"
        );
        lines.push("");
        lines.push("• Any indirect, incidental, special, punitive, or consequential damages");
        lines.push("• Loss of profits, data loss, or business interruption");
        lines.push("• Any damages arising from your use or inability to use the Service");

        if (data.terms.termination) {
          lines.push("");
          lines.push(sectionNum++ + ". Termination");
          lines.push("");
          lines.push("• You may stop using the Service or delete your account at any time");
          lines.push(
            "• We may immediately terminate or suspend your account if you violate these terms"
          );
          lines.push("• Upon termination, your right to use the Service will cease immediately");
          lines.push(
            "• Certain provisions (such as intellectual property, disclaimers, limitation of liability) will survive termination"
          );
        }

        lines.push("");
        lines.push(sectionNum++ + ". Modifications to Terms");
        lines.push("");
        lines.push(
          "We reserve the right to modify these Terms of Service at any time. Modified terms will be posted on this page, and your continued use of the Service constitutes acceptance of the modified terms. We will notify you of significant changes through appropriate means."
        );

        if (data.terms.dispute) {
          lines.push("");
          lines.push(sectionNum++ + ". Dispute Resolution");
          lines.push("");
          var jurisdictionText = {
            cn: "These terms are governed by the laws of the People's Republic of China. Any disputes shall be submitted to the competent people's court in our location.",
            hk: "These terms are governed by the laws of Hong Kong Special Administrative Region. Any disputes shall be resolved through amicable negotiation, failing which, through arbitration at the Hong Kong International Arbitration Centre.",
            us: "These terms are governed by the laws of the United States. Any disputes shall be resolved through binding arbitration.",
            eu: "These terms are governed by EU law. Any disputes shall first be attempted to be resolved through mediation."
          };
          lines.push(jurisdictionText[data.jurisdiction] || jurisdictionText.us);
        }

        lines.push("");
        lines.push(sectionNum++ + ". Contact Us");
        lines.push("");
        lines.push("If you have any questions about these Terms of Service, please contact us:");
        lines.push("");
        lines.push("Email: " + data.contactEmail);
        lines.push("Website: " + data.websiteUrl);

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

      function downloadTerms() {
        var output = document.getElementById("output").value;
        if (!output) {
          showStatus("没有可下载的内容", "error");
          return;
        }
        var data = getFormData();
        var filename = (data.language === "zh" ? "服务条款" : "Terms_of_Service") + ".txt";
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
        document.getElementById("serviceDescription").value = "";
        document.getElementById("output").value = "";
        localStorage.removeItem(LS_KEY);
        showStatus("已清空", "success");
      }

      // Auto-save on input
      document.querySelectorAll("input, select, textarea").forEach(function (el) {
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
        if (!document.getElementById("effectiveDate").value) {
          document.getElementById("effectiveDate").value = new Date().toISOString().split("T")[0];
        }
      })();
    
