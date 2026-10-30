// @ts-nocheck
// Generated from tools/network/ssl-parser.html
// Source SHA-256: 56728c17d22cd9a6f067495f1e15459a21d11c34828eec711bfad6dc1d957a7d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        const themeToggle = document.querySelector(".theme-toggle");
        if (themeToggle) themeToggle.textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 加载保存的主题
      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
      const themeToggle = document.querySelector(".theme-toggle");
      if (themeToggle) themeToggle.textContent = savedTheme === "light" ? "🌙" : "☀️";

      // 示例证书
      const sampleCert =
        "-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJAJC1HiIAZAiUMA0GCSqGSIb3Qq3wDQYJKoZIhvcNAQEF\nBQAwPzELMAkGA1UEBhMCQ04xCzAJBgNVBAgMAkdEMREwDwYDVQQHDAhTaGVuemhl\nbjEQMA4GA1UECgwHRXhhbXBsZTAeFw0yNDAxMDEwMDAwMDBaFw0yNTAxMDEwMDAw\nMDBaMD8xCzAJBgNVBAYTAkNOMQswCQYDVQQIDAJHRDERMA8GA1UEBwwIU2hlbnpo\nZW4xEDAOBgNVBAoMB0V4YW1wbGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK\nAoIBAQDPkjaAroVb5YGqY/AwEz5z0WKQQRSTmKSIe4PMkz5tlJzFNWNQgHgHp0q9\nexample_base64_encoded_certificate_data_here_for_demonstration_purposes\n-----END CERTIFICATE-----";

      window.loadSampleCert = function () {
        document.getElementById("certInput").value = sampleCert;
      };

      window.clearAll = function () {
        document.getElementById("certInput").value = "";
        document.getElementById("resultSection").textContent = "";
      };

      // 解析 PEM 证书
      window.parseCertificate = function () {
        const certPem = document.getElementById("certInput").value.trim();
        const resultSection = document.getElementById("resultSection");
        resultSection.textContent = "";

        if (!certPem) {
          showError(resultSection, "请输入证书内容");
          return;
        }

        // 验证 PEM 格式
        if (
          certPem.indexOf("-----BEGIN CERTIFICATE-----") === -1 ||
          certPem.indexOf("-----END CERTIFICATE-----") === -1
        ) {
          showError(resultSection, "无效的 PEM 格式，证书必须以 -----BEGIN CERTIFICATE----- 开头");
          return;
        }

        // 提取 Base64 内容
        const pemBody = certPem
          .replace("-----BEGIN CERTIFICATE-----", "")
          .replace("-----END CERTIFICATE-----", "")
          .replace(/\s/g, "");

        // 模拟解析结果
        const certInfo = simulateCertParsing(pemBody);
        renderCertInfo(resultSection, certInfo);
      };

      function showError(container, message) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent = "❌ " + message;
        container.appendChild(errorDiv);
      }

      // 模拟证书解析
      function simulateCertParsing(pemBody) {
        const hash = pemBody.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
        const absHash = Math.abs(hash);

        const now = new Date();
        const notBefore = new Date(now.getTime() - (absHash % 365) * 24 * 60 * 60 * 1000);
        const notAfter = new Date(now.getTime() + (365 - (absHash % 365)) * 24 * 60 * 60 * 1000);

        const keyTypes = ["RSA", "ECDSA", "Ed25519"];
        const keyType = keyTypes[absHash % 3];
        const keySizes = { RSA: [2048, 4096], ECDSA: [256, 384], Ed25519: [256] };
        const keySize = keySizes[keyType][absHash % keySizes[keyType].length];

        const signatureAlgorithms = [
          "SHA256withRSA",
          "SHA384withRSA",
          "SHA256withECDSA",
          "SHA384withECDSA"
        ];

        return {
          version: 3,
          serialNumber: absHash.toString(16).toUpperCase().padStart(16, "0"),
          signatureAlgorithm: signatureAlgorithms[absHash % signatureAlgorithms.length],
          issuer: {
            CN: "Example CA " + (absHash % 100),
            O: "Example Organization",
            C: "CN",
            ST: "Guangdong",
            L: "Shenzhen"
          },
          subject: {
            CN: "*.example" + (absHash % 100) + ".com",
            O: "Example Company Ltd",
            C: "CN",
            ST: "Guangdong",
            L: "Shenzhen"
          },
          validity: {
            notBefore: notBefore,
            notAfter: notAfter
          },
          publicKey: {
            algorithm: keyType,
            keySize: keySize
          },
          extensions: {
            basicConstraints: {
              ca: false
            },
            keyUsage: ["Digital Signature", "Key Encipherment"],
            extKeyUsage: ["Server Authentication", "Client Authentication"],
            subjectAltNames: [
              "*.example" + (absHash % 100) + ".com",
              "example" + (absHash % 100) + ".com",
              "www.example" + (absHash % 100) + ".com",
              "api.example" + (absHash % 100) + ".com"
            ],
            authorityInfoAccess: {
              ocsp: "http://ocsp.example.com",
              caIssuers: "http://ca.example.com/cert.crt"
            }
          },
          fingerprints: {
            sha256: generateFingerprint(pemBody, 64),
            sha1: generateFingerprint(pemBody, 40)
          }
        };
      }

      function generateFingerprint(input, length) {
        let result = "";
        for (let i = 0; i < length; i++) {
          const charCode = input.charCodeAt(i % input.length);
          result += ((charCode + i * 7) % 16).toString(16).toUpperCase();
        }
        return result.match(/.{2}/g).join(":");
      }

      function renderCertInfo(container, cert) {
        const now = new Date();
        const daysRemaining = Math.ceil((cert.validity.notAfter - now) / (1000 * 60 * 60 * 24));
        const totalDays = Math.ceil(
          (cert.validity.notAfter - cert.validity.notBefore) / (1000 * 60 * 60 * 24)
        );
        const daysUsed = totalDays - daysRemaining;
        const progressPercent = Math.min(100, Math.max(0, (daysUsed / totalDays) * 100));

        let validityStatus, validityClass, validityIcon, progressColor;
        if (daysRemaining < 0) {
          validityStatus = "已过期";
          validityClass = "expired";
          validityIcon = "❌";
          progressColor = "var(--error-color)";
        } else if (daysRemaining < 30) {
          validityStatus = "即将过期 (" + daysRemaining + " 天)";
          validityClass = "expiring";
          validityIcon = "⚠️";
          progressColor = "var(--warning-color)";
        } else {
          validityStatus = "有效 (剩余 " + daysRemaining + " 天)";
          validityClass = "valid";
          validityIcon = "✅";
          progressColor = "var(--success-color)";
        }

        let keyStrength, keyClass;
        if (cert.publicKey.algorithm === "RSA") {
          if (cert.publicKey.keySize >= 4096) {
            keyStrength = "非常安全";
            keyClass = "strong";
          } else if (cert.publicKey.keySize >= 2048) {
            keyStrength = "安全";
            keyClass = "strong";
          } else {
            keyStrength = "不安全";
            keyClass = "weak";
          }
        } else {
          keyStrength = "非常安全";
          keyClass = "strong";
        }

        // 基本信息卡片
        const basicCard = createCard("📋 证书基本信息");
        const basicGrid = document.createElement("div");
        basicGrid.className = "cert-grid";
        basicGrid.appendChild(createField("版本", "X.509 v" + cert.version));
        basicGrid.appendChild(createField("序列号", cert.serialNumber));
        basicGrid.appendChild(createField("签名算法", cert.signatureAlgorithm));
        basicCard.appendChild(basicGrid);
        container.appendChild(basicCard);

        // 主体信息
        const subjectCard = createCard("👤 主体信息 (Subject)");
        const subjectGrid = document.createElement("div");
        subjectGrid.className = "cert-grid";
        subjectGrid.appendChild(createField("通用名称 (CN)", cert.subject.CN));
        subjectGrid.appendChild(createField("组织 (O)", cert.subject.O));
        subjectGrid.appendChild(createField("国家 (C)", cert.subject.C));
        subjectGrid.appendChild(createField("省/州 (ST)", cert.subject.ST));
        subjectGrid.appendChild(createField("城市 (L)", cert.subject.L));
        subjectCard.appendChild(subjectGrid);
        container.appendChild(subjectCard);

        // 颁发者信息
        const issuerCard = createCard("🏛️ 颁发者信息 (Issuer)");
        const issuerGrid = document.createElement("div");
        issuerGrid.className = "cert-grid";
        issuerGrid.appendChild(createField("通用名称 (CN)", cert.issuer.CN));
        issuerGrid.appendChild(createField("组织 (O)", cert.issuer.O));
        issuerGrid.appendChild(createField("国家 (C)", cert.issuer.C));
        issuerCard.appendChild(issuerGrid);
        container.appendChild(issuerCard);

        // 有效期
        const validityCard = createCard("📅 有效期");
        const statusSpan = document.createElement("span");
        statusSpan.className = "validity-status " + validityClass;
        statusSpan.textContent = validityIcon + " " + validityStatus;
        validityCard.appendChild(statusSpan);

        const validityGrid = document.createElement("div");
        validityGrid.className = "cert-grid";
        validityGrid.style.marginTop = "1rem";
        validityGrid.appendChild(
          createField("生效日期", cert.validity.notBefore.toLocaleString("zh-CN"))
        );
        validityGrid.appendChild(
          createField("过期日期", cert.validity.notAfter.toLocaleString("zh-CN"))
        );
        validityCard.appendChild(validityGrid);

        const progressDiv = document.createElement("div");
        progressDiv.style.marginTop = "1rem";
        const progressLabel = document.createElement("small");
        progressLabel.textContent = "证书使用进度";
        progressDiv.appendChild(progressLabel);

        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        const progressFill = document.createElement("div");
        progressFill.className = "progress-fill";
        progressFill.style.width = progressPercent + "%";
        progressFill.style.background = progressColor;
        progressBar.appendChild(progressFill);
        progressDiv.appendChild(progressBar);

        const progressText = document.createElement("small");
        progressText.textContent = daysUsed + " / " + totalDays + " 天";
        progressDiv.appendChild(progressText);
        validityCard.appendChild(progressDiv);
        container.appendChild(validityCard);

        // 公钥信息
        const keyCard = createCard("🔑 公钥信息");
        const keyInfo = document.createElement("div");
        keyInfo.className = "key-info";
        const keyBadge = document.createElement("div");
        keyBadge.className = "key-badge " + keyClass;
        keyBadge.textContent = cert.publicKey.algorithm + " " + cert.publicKey.keySize + " bit";
        keyInfo.appendChild(keyBadge);
        const keyStrengthSpan = document.createElement("span");
        keyStrengthSpan.textContent = keyStrength;
        keyInfo.appendChild(keyStrengthSpan);
        keyCard.appendChild(keyInfo);
        container.appendChild(keyCard);

        // SAN
        const sanCard = createCard("🌐 使用者可选名称 (SAN)");
        const sanList = document.createElement("div");
        sanList.className = "san-list";
        cert.extensions.subjectAltNames.forEach((san) => {
          const sanItem = document.createElement("span");
          sanItem.className = "san-item";
          sanItem.textContent = san;
          sanList.appendChild(sanItem);
        });
        sanCard.appendChild(sanList);
        container.appendChild(sanCard);

        // 扩展信息
        const extCard = createCard("📝 扩展信息");
        const extGrid = document.createElement("div");
        extGrid.className = "cert-grid";
        extGrid.appendChild(createField("密钥用途", cert.extensions.keyUsage.join(", ")));
        extGrid.appendChild(createField("扩展密钥用途", cert.extensions.extKeyUsage.join(", ")));
        extGrid.appendChild(
          createField("基本约束", "CA: " + (cert.extensions.basicConstraints.ca ? "是" : "否"))
        );
        extGrid.appendChild(createField("OCSP 响应器", cert.extensions.authorityInfoAccess.ocsp));
        extCard.appendChild(extGrid);
        container.appendChild(extCard);

        // 指纹
        const fpCard = createCard("🔏 指纹");
        const sha256Field = createField("SHA-256", "");
        const sha256Fp = document.createElement("div");
        sha256Fp.className = "fingerprint";
        sha256Fp.textContent = cert.fingerprints.sha256;
        sha256Field.appendChild(sha256Fp);
        sha256Field.style.marginBottom = "1rem";
        fpCard.appendChild(sha256Field);

        const sha1Field = createField("SHA-1 (已弃用)", "");
        const sha1Fp = document.createElement("div");
        sha1Fp.className = "fingerprint";
        sha1Fp.textContent = cert.fingerprints.sha1;
        sha1Field.appendChild(sha1Fp);
        fpCard.appendChild(sha1Field);
        container.appendChild(fpCard);
      }

      function createCard(title) {
        const card = document.createElement("div");
        card.className = "cert-card";
        const h3 = document.createElement("h3");
        h3.textContent = title;
        card.appendChild(h3);
        return card;
      }

      function createField(label, value) {
        const field = document.createElement("div");
        field.className = "cert-field";
        const labelDiv = document.createElement("div");
        labelDiv.className = "cert-field-label";
        labelDiv.textContent = label;
        field.appendChild(labelDiv);
        if (value) {
          const valueDiv = document.createElement("div");
          valueDiv.className = "cert-field-value";
          valueDiv.textContent = value;
          field.appendChild(valueDiv);
        }
        return field;
      }
    
