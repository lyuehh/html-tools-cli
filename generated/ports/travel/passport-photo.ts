// @ts-nocheck
// Generated from tools/travel/passport-photo.html
// Source SHA-256: a1f8e4f6a70ffcbd2181c42361f878785a11f771b1b78114edb7dc26eaa22127
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var countries = [
        {
          name: "中国",
          nameEn: "China",
          flag: "🇨🇳",
          size: "33×48mm",
          pixels: "390×567px",
          background: "白色",
          headSize: "头部占比2/3",
          requirements: ["正面免冠", "不戴眼镜", "露出耳朵", "近6个月拍摄", "哑光相纸"]
        },
        {
          name: "美国",
          nameEn: "United States",
          flag: "🇺🇸",
          size: "2×2英寸(51×51mm)",
          pixels: "600×600px",
          background: "白色或浅灰色",
          headSize: "头部占比50-69%",
          requirements: ["正面免冠", "可戴眼镜(无反光)", "近6个月拍摄", "自然表情", "无边框"]
        },
        {
          name: "英国",
          nameEn: "United Kingdom",
          flag: "🇬🇧",
          size: "35×45mm",
          pixels: "600×750px",
          background: "浅灰色或白色",
          headSize: "面部高度29-34mm",
          requirements: ["正面免冠", "不戴眼镜", "闭嘴", "眼睛睁开", "近1个月拍摄"]
        },
        {
          name: "日本",
          nameEn: "Japan",
          flag: "🇯🇵",
          size: "35×45mm",
          pixels: "420×540px",
          background: "白色或浅色",
          headSize: "面部占比70-80%",
          requirements: ["正面免冠", "不戴眼镜", "近6个月拍摄", "无阴影", "哑光相纸"]
        },
        {
          name: "德国",
          nameEn: "Germany",
          flag: "🇩🇪",
          size: "35×45mm",
          pixels: "413×531px",
          background: "浅灰色(70-80%灰度)",
          headSize: "面部高度32-36mm",
          requirements: ["生物识别标准", "正面免冠", "闭嘴中性表情", "不戴眼镜", "近6个月拍摄"]
        },
        {
          name: "法国",
          nameEn: "France",
          flag: "🇫🇷",
          size: "35×45mm",
          pixels: "413×531px",
          background: "浅灰色或浅蓝色",
          headSize: "面部高度32-36mm",
          requirements: ["正面免冠", "闭嘴", "不戴眼镜", "无首饰遮挡", "近6个月拍摄"]
        },
        {
          name: "澳大利亚",
          nameEn: "Australia",
          flag: "🇦🇺",
          size: "35×45mm",
          pixels: "413×531px",
          background: "白色",
          headSize: "头部高度32-36mm",
          requirements: ["正面免冠", "闭嘴中性表情", "可戴眼镜(无反光)", "近6个月拍摄"]
        },
        {
          name: "加拿大",
          nameEn: "Canada",
          flag: "🇨🇦",
          size: "50×70mm",
          pixels: "420×540px",
          background: "白色或浅色",
          headSize: "面部高度31-36mm",
          requirements: ["正面免冠", "中性表情", "不戴眼镜", "近6个月拍摄", "照片背面签名"]
        },
        {
          name: "韩国",
          nameEn: "South Korea",
          flag: "🇰🇷",
          size: "35×45mm",
          pixels: "413×531px",
          background: "白色",
          headSize: "面部占比70-80%",
          requirements: ["正面免冠", "不戴眼镜", "闭嘴", "近6个月拍摄", "无阴影"]
        },
        {
          name: "印度",
          nameEn: "India",
          flag: "🇮🇳",
          size: "35×35mm/51×51mm",
          pixels: "350×350px",
          background: "白色",
          headSize: "面部占比50-60%",
          requirements: ["正面免冠", "可戴眼镜", "近6个月拍摄", "签证照片需51×51mm"]
        },
        {
          name: "新加坡",
          nameEn: "Singapore",
          flag: "🇸🇬",
          size: "35×45mm",
          pixels: "400×514px",
          background: "白色",
          headSize: "面部占比70-80%",
          requirements: ["正面免冠", "不戴眼镜", "近3个月拍摄", "哑光相纸"]
        },
        {
          name: "泰国",
          nameEn: "Thailand",
          flag: "🇹🇭",
          size: "35×45mm",
          pixels: "413×531px",
          background: "白色",
          headSize: "面部占比70-80%",
          requirements: ["正面免冠", "不戴眼镜", "近6个月拍摄", "无首饰"]
        },
        {
          name: "俄罗斯",
          nameEn: "Russia",
          flag: "🇷🇺",
          size: "35×45mm",
          pixels: "413×531px",
          background: "白色",
          headSize: "面部高度32-36mm",
          requirements: ["正面免冠", "不戴眼镜", "近6个月拍摄", "哑光相纸"]
        },
        {
          name: "巴西",
          nameEn: "Brazil",
          flag: "🇧🇷",
          size: "50×70mm",
          pixels: "413×531px",
          background: "白色",
          headSize: "面部占比70-80%",
          requirements: ["正面免冠", "可戴眼镜", "近6个月拍摄"]
        },
        {
          name: "申根区",
          nameEn: "Schengen Area",
          flag: "🇪🇺",
          size: "35×45mm",
          pixels: "413×531px",
          background: "浅灰色或浅蓝色",
          headSize: "面部高度32-36mm",
          requirements: ["ICAO标准", "正面免冠", "闭嘴中性表情", "不戴眼镜", "近6个月拍摄"]
        }
      ];

      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      function filterCountries() {
        var search = document.getElementById("searchInput").value.toLowerCase();
        var filtered = countries.filter(function (c) {
          return c.name.toLowerCase().includes(search) || c.nameEn.toLowerCase().includes(search);
        });
        renderCountries(filtered);
      }

      function renderCountries(list) {
        var container = document.getElementById("countryList");
        container.textContent = "";

        list.forEach(function (country) {
          var card = document.createElement("div");
          card.className = "country-card";

          var header = document.createElement("div");
          header.className = "country-header";
          var flag = document.createElement("div");
          flag.className = "country-flag";
          flag.textContent = country.flag;
          var nameDiv = document.createElement("div");
          var name = document.createElement("div");
          name.className = "country-name";
          name.textContent = country.name;
          var nameEn = document.createElement("div");
          nameEn.className = "country-name-en";
          nameEn.textContent = country.nameEn;
          nameDiv.appendChild(name);
          nameDiv.appendChild(nameEn);
          header.appendChild(flag);
          header.appendChild(nameDiv);

          var specs = document.createElement("div");
          specs.className = "photo-specs";
          var specItems = [
            { label: "尺寸", value: country.size },
            { label: "像素", value: country.pixels },
            { label: "背景", value: country.background },
            { label: "头部", value: country.headSize }
          ];
          specItems.forEach(function (item) {
            var specEl = document.createElement("div");
            specEl.className = "spec-item";
            var label = document.createElement("div");
            label.className = "spec-label";
            label.textContent = item.label;
            var value = document.createElement("div");
            value.className = "spec-value";
            value.textContent = item.value;
            specEl.appendChild(label);
            specEl.appendChild(value);
            specs.appendChild(specEl);
          });

          var reqs = document.createElement("div");
          reqs.className = "requirements";
          var reqTitle = document.createElement("div");
          reqTitle.className = "requirements-title";
          reqTitle.textContent = "具体要求";
          var reqList = document.createElement("ul");
          reqList.className = "requirements-list";
          country.requirements.forEach(function (req) {
            var li = document.createElement("li");
            li.textContent = req;
            reqList.appendChild(li);
          });
          reqs.appendChild(reqTitle);
          reqs.appendChild(reqList);

          card.appendChild(header);
          card.appendChild(specs);
          card.appendChild(reqs);
          container.appendChild(card);
        });
      }

      function showToast(msg) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Initialize
      filterCountries();
    
