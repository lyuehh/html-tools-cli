// @ts-nocheck
// Generated from tools/travel/visa-requirements.html
// Source SHA-256: 6b83c1407a9959b081312e7e898173afdb15afb13b0d105153b007103e92f252
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Simplified visa data (for demonstration)
      const VISA_DATA = {
        "CN-TH": {
          type: "free",
          stay: "30天",
          requirements: "有效护照",
          validity: "入境时至少6个月"
        },
        "CN-SG": {
          type: "free",
          stay: "30天",
          requirements: "有效护照、返程机票",
          validity: "入境时至少6个月"
        },
        "CN-MY": {
          type: "free",
          stay: "30天",
          requirements: "有效护照",
          validity: "入境时至少6个月"
        },
        "CN-JP": {
          type: "required",
          stay: "依签证类型",
          requirements: "提前申请签证",
          validity: "申请时至少6个月",
          notice: "需要通过旅行社或代办机构申请"
        },
        "CN-KR": {
          type: "free",
          stay: "60天",
          requirements: "有效护照",
          validity: "入境时至少6个月"
        },
        "CN-VN": {
          type: "arrival",
          stay: "30天",
          requirements: "落地签申请表、照片",
          validity: "入境时至少6个月",
          notice: "建议提前办理电子签证"
        },
        "CN-US": {
          type: "required",
          stay: "依签证类型",
          requirements: "B1/B2签证",
          validity: "申请时至少6个月",
          notice: "需要面试，建议提前3个月申请"
        },
        "CN-GB": {
          type: "required",
          stay: "依签证类型",
          requirements: "旅游签证",
          validity: "行程结束后至少3个月",
          notice: "需要提供财务证明和行程单"
        },
        "US-CN": {
          type: "required",
          stay: "依签证类型",
          requirements: "提前申请签证",
          validity: "申请时至少6个月"
        },
        "US-JP": { type: "free", stay: "90天", requirements: "有效护照", validity: "整个行程有效" },
        "US-GB": { type: "free", stay: "180天", requirements: "有效护照", validity: "整个行程有效" }
      };

      function selectDestination(dest) {
        document.getElementById("passportCountry").value = "CN";
        document.getElementById("destination").value = dest;
        checkVisa();
      }

      function checkVisa() {
        const passport = document.getElementById("passportCountry").value;
        const destination = document.getElementById("destination").value;

        if (!passport || !destination) {
          document.getElementById("visaResult").classList.remove("show");
          return;
        }

        const key = `${passport}-${destination}`;
        const data = VISA_DATA[key] || {
          type: "required",
          stay: "依签证类型",
          requirements: "请联系使领馆确认",
          validity: "建议至少6个月",
          notice: "签证政策未收录，请访问目的地国家使领馆官网查询最新信息。"
        };

        const result = document.getElementById("visaResult");
        result.classList.remove("visa-free", "visa-on-arrival", "visa-required");

        if (data.type === "free") {
          result.classList.add("visa-free");
          document.getElementById("visaIcon").textContent = "✅";
          document.getElementById("visaTitle").textContent = "免签入境";
          document.getElementById("visaSubtitle").textContent = "无需申请签证即可入境";
        } else if (data.type === "arrival") {
          result.classList.add("visa-on-arrival");
          document.getElementById("visaIcon").textContent = "🛂";
          document.getElementById("visaTitle").textContent = "落地签";
          document.getElementById("visaSubtitle").textContent = "抵达时在机场办理签证";
        } else {
          result.classList.add("visa-required");
          document.getElementById("visaIcon").textContent = "📄";
          document.getElementById("visaTitle").textContent = "需要签证";
          document.getElementById("visaSubtitle").textContent = "出发前需提前申请签证";
        }

        document.getElementById("stayDuration").textContent = data.stay;
        document.getElementById("entryRequirements").textContent = data.requirements;
        document.getElementById("passportValidity").textContent = data.validity;
        document.getElementById("noticeText").textContent =
          data.notice || "签证政策可能随时变化，请在出行前访问目的地国家使领馆官网确认最新要求。";

        result.classList.add("show");
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
