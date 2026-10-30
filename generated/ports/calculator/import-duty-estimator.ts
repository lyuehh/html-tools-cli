// @ts-nocheck
// Generated from tools/calculator/import-duty-estimator.html
// Source SHA-256: 6b12028e7629fa6f48ba2edf0a2ab9f0a6be51d170b82edb8eae7618d8e8cab3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 税率数据库：[dutyRate, vatRate, exciseRate, note]
      var TAX_DB = {
        CN: {
          electronics: [0.08, 0.13, 0, "部分商品享有最惠国税率，低值免税 <= 50 CNY"],
          clothing: [0.14, 0.13, 0, "最惠国税率，棉质约 12%，合纤约 14%"],
          cosmetics: [0.1, 0.13, 0.15, "高档化妆品含消费税 15%"],
          food: [0.1, 0.09, 0, "部分食品进口关税 10%，增值税 9%"],
          alcohol: [0.1, 0.13, 0.1, "葡萄酒关税 14%，白酒消费税 10%（此处取均值）"],
          tobacco: [0.2, 0.13, 0.45, "烟草消费税高，具体由海关认定"],
          auto: [0.15, 0.13, 0.1, "乘用车关税 15%，排量 > 4.0L 消费税 40%（简化）"],
          machinery: [0.05, 0.13, 0, "机械设备较低，部分零部件免税"],
          furniture: [0.1, 0.13, 0, "一般家具关税 10%"],
          toys: [0.1, 0.13, 0, "玩具一般关税约 10%"],
          jewelry: [0.1, 0.13, 0, "珠宝首饰关税 10%，黄金 0%"],
          books: [0, 0.09, 0, "图书进口免关税，增值税 9%（部分品类免税）"],
          medicine: [0.03, 0.09, 0, "药品关税较低，增值税 9%"],
          chemicals: [0.05, 0.13, 0, "化工品关税视 HS 章节，5% 为均值"],
          other: [0.1, 0.13, 0, "其他商品适用综合平均税率"]
        },
        US: {
          electronics: [0.0, 0.0, 0, "大多数电子品关税 0%，无联邦增值税"],
          clothing: [0.12, 0.0, 0, "服装平均关税约 12%，无联邦增值税"],
          cosmetics: [0.0, 0.0, 0, "多数化妆品关税 0%"],
          food: [0.05, 0.0, 0, "食品关税约 5%，无联邦增值税"],
          alcohol: [0.04, 0.0, 0.12, "酒类含联邦消费税（简化为 12%）"],
          tobacco: [0.1, 0.0, 0.5, "烟草联邦消费税高"],
          auto: [0.025, 0.0, 0, "乘用车关税 2.5%，皮卡 25%（取均值）"],
          machinery: [0.02, 0.0, 0, "机械设备关税较低"],
          furniture: [0.03, 0.0, 0, "家具关税约 3%"],
          toys: [0.0, 0.0, 0, "玩具大多关税 0%"],
          jewelry: [0.065, 0.0, 0, "珠宝关税约 6.5%"],
          books: [0.0, 0.0, 0, "图书免关税"],
          medicine: [0.0, 0.0, 0, "药品通常免关税"],
          chemicals: [0.03, 0.0, 0, "化工品约 3%"],
          other: [0.05, 0.0, 0, "综合均值，无联邦增值税"]
        },
        EU: {
          electronics: [0.0, 0.2, 0, "多数电子品 MFN 关税 0%，增值税约 20%"],
          clothing: [0.12, 0.2, 0, "服装关税 12%，增值税 20%"],
          cosmetics: [0.065, 0.2, 0, "化妆品关税 6.5%，增值税 20%"],
          food: [0.1, 0.1, 0, "食品关税约 10%，增值税较低"],
          alcohol: [0.1, 0.2, 0.15, "酒类消费税因国家而异"],
          tobacco: [0.24, 0.2, 0.5, "烟草税重"],
          auto: [0.1, 0.2, 0, "乘用车关税约 6.5%（含杂项约 10%）"],
          machinery: [0.02, 0.2, 0, "机械较低"],
          furniture: [0.06, 0.2, 0, "家具关税约 5.7%"],
          toys: [0.045, 0.2, 0, "玩具约 4.5%"],
          jewelry: [0.025, 0.2, 0, "珠宝约 2.5%"],
          books: [0.0, 0.05, 0, "图书增值税率多国 5-7%"],
          medicine: [0.0, 0.1, 0, "药品免关税，增值税约 10%"],
          chemicals: [0.065, 0.2, 0, "化工品约 6.5%"],
          other: [0.07, 0.2, 0, "综合均值"]
        },
        UK: {
          electronics: [0.0, 0.2, 0, "脱欧后多数电子品关税 0%，增值税 20%"],
          clothing: [0.12, 0.2, 0, "服装关税约 12%"],
          cosmetics: [0.065, 0.2, 0, "化妆品约 6.5%"],
          food: [0.05, 0.0, 0, "基本食品增值税 0%，进口关税约 5%"],
          alcohol: [0.1, 0.2, 0.2, "酒类含 Alcohol Duty"],
          tobacco: [0.24, 0.2, 0.5, "烟草税重"],
          auto: [0.065, 0.2, 0, "乘用车关税 6.5%"],
          machinery: [0.02, 0.2, 0, "机械较低"],
          furniture: [0.06, 0.2, 0, "家具约 6%"],
          toys: [0.045, 0.2, 0, "玩具约 4.5%"],
          jewelry: [0.025, 0.2, 0, "珠宝约 2.5%"],
          books: [0.0, 0.0, 0, "图书免关税、免增值税"],
          medicine: [0.0, 0.0, 0, "药品免税"],
          chemicals: [0.065, 0.2, 0, "化工品约 6.5%"],
          other: [0.07, 0.2, 0, "综合均值"]
        },
        JP: {
          electronics: [0.0, 0.1, 0, "消費税 10%，多数电子品关税 0%"],
          clothing: [0.1, 0.1, 0, "服装关税约 10%"],
          cosmetics: [0.03, 0.1, 0, "化妆品约 3%"],
          food: [0.1, 0.08, 0, "食品消費税 8%（轻减税率）"],
          alcohol: [0.15, 0.1, 0.1, "酒税（酒税法）"],
          tobacco: [0.3, 0.1, 0.5, "烟草税重"],
          auto: [0.0, 0.1, 0, "汽车关税 0%（EPA 协定后）"],
          machinery: [0.0, 0.1, 0, "机械多数免税"],
          furniture: [0.03, 0.1, 0, "家具约 3%"],
          toys: [0.0, 0.1, 0, "玩具免关税"],
          jewelry: [0.055, 0.1, 0, "珠宝约 5.5%"],
          books: [0.0, 0.1, 0, "图书免关税"],
          medicine: [0.0, 0.1, 0, "药品免关税"],
          chemicals: [0.03, 0.1, 0, "化工品约 3%"],
          other: [0.05, 0.1, 0, "综合均值"]
        },
        KR: {
          electronics: [0.08, 0.1, 0, "增值税 10%，电子品约 8%（部分 0%）"],
          clothing: [0.13, 0.1, 0, "服装约 13%"],
          cosmetics: [0.08, 0.1, 0, "化妆品约 8%"],
          food: [0.1, 0.1, 0, "食品关税约 10%（农产品更高）"],
          alcohol: [0.15, 0.1, 0.1, "酒税"],
          tobacco: [0.3, 0.1, 0.5, "烟草税"],
          auto: [0.08, 0.1, 0, "乘用车 8%"],
          machinery: [0.05, 0.1, 0, "机械约 5%"],
          furniture: [0.08, 0.1, 0, "家具约 8%"],
          toys: [0.08, 0.1, 0, "玩具约 8%"],
          jewelry: [0.08, 0.1, 0, "珠宝约 8%"],
          books: [0.0, 0.0, 0, "图书免税"],
          medicine: [0.0, 0.0, 0, "药品免税"],
          chemicals: [0.065, 0.1, 0, "化工约 6.5%"],
          other: [0.08, 0.1, 0, "综合均值"]
        },
        AU: {
          electronics: [0.0, 0.1, 0, "GST 10%，多数电子品关税 0%"],
          clothing: [0.1, 0.1, 0, "服装关税约 10%"],
          cosmetics: [0.0, 0.1, 0, "化妆品免关税"],
          food: [0.0, 0.0, 0, "基本食品 GST 免税，关税 0%"],
          alcohol: [0.05, 0.1, 0.15, "WET（酒税）约 15% + GST"],
          tobacco: [0.0, 0.1, 0.6, "烟税极重（按支计费）"],
          auto: [0.0, 0.1, 0, "汽车关税 0%（FTA 后）"],
          machinery: [0.0, 0.1, 0, "机械关税 0%"],
          furniture: [0.05, 0.1, 0, "家具约 5%"],
          toys: [0.0, 0.1, 0, "玩具 0%"],
          jewelry: [0.05, 0.1, 0, "珠宝约 5%"],
          books: [0.0, 0.0, 0, "图书免税"],
          medicine: [0.0, 0.0, 0, "药品免税"],
          chemicals: [0.0, 0.1, 0, "化工品 0%"],
          other: [0.03, 0.1, 0, "综合均值"]
        },
        CA: {
          electronics: [0.0, 0.05, 0, "GST 5%，多数电子品关税 0%（+各省 PST）"],
          clothing: [0.18, 0.05, 0, "服装关税约 18%，纺织品较高"],
          cosmetics: [0.0, 0.05, 0, "化妆品 0% 关税"],
          food: [0.0, 0.0, 0, "基本食品零关税、免 GST"],
          alcohol: [0.06, 0.05, 0.1, "酒精制品含联邦消费税"],
          tobacco: [0.3, 0.05, 0.5, "烟草税重"],
          auto: [0.0, 0.05, 0, "汽车多数 0%（CUSMA）"],
          machinery: [0.0, 0.05, 0, "机械 0%"],
          furniture: [0.07, 0.05, 0, "家具约 7%"],
          toys: [0.0, 0.05, 0, "玩具 0%"],
          jewelry: [0.0, 0.05, 0, "珠宝 0%"],
          books: [0.0, 0.0, 0, "图书免税"],
          medicine: [0.0, 0.0, 0, "药品免税"],
          chemicals: [0.04, 0.05, 0, "化工品约 4%"],
          other: [0.05, 0.05, 0, "综合均值"]
        },
        SG: {
          electronics: [0.0, 0.09, 0, "GST 9%，关税 0%（自由港）"],
          clothing: [0.0, 0.09, 0, "服装 0% 关税"],
          cosmetics: [0.0, 0.09, 0, "化妆品 0% 关税"],
          food: [0.0, 0.09, 0, "一般食品 0%，GST 9%"],
          alcohol: [0.0, 0.09, 0.1, "含新加坡酒精消费税（按容量）"],
          tobacco: [0.0, 0.09, 0.5, "烟草消费税极重"],
          auto: [0.0, 0.09, 0, "汽车关税 0%，但有附加费（COE 等）"],
          machinery: [0.0, 0.09, 0, "机械 0%"],
          furniture: [0.0, 0.09, 0, "家具 0%"],
          toys: [0.0, 0.09, 0, "玩具 0%"],
          jewelry: [0.0, 0.09, 0, "珠宝 0%"],
          books: [0.0, 0.09, 0, "图书 GST 9%"],
          medicine: [0.0, 0.0, 0, "药品免税"],
          chemicals: [0.0, 0.09, 0, "化工 0%"],
          other: [0.0, 0.09, 0, "自由贸易港，关税 0%"]
        },
        IN: {
          electronics: [0.15, 0.18, 0, "GST 18%，进口关税约 15%"],
          clothing: [0.2, 0.12, 0, "服装 GST 12%，关税约 20%"],
          cosmetics: [0.2, 0.28, 0, "化妆品 GST 28%（奢侈品）"],
          food: [0.3, 0.12, 0, "食品关税较高，部分农产品 30%+"],
          alcohol: [0.15, 0.18, 0.15, "酒精关税 15%，各邦增值税差异大"],
          tobacco: [0.3, 0.28, 0.5, "烟草税极重"],
          auto: [0.125, 0.28, 0.12, "汽车关税 125%（进口车），GST 28%"],
          machinery: [0.075, 0.18, 0, "机械约 7.5%"],
          furniture: [0.2, 0.18, 0, "家具约 20%"],
          toys: [0.6, 0.18, 0, "玩具关税 60%（保护本国市场）"],
          jewelry: [0.15, 0.03, 0, "黄金 15%，钻石 0%，GST 3%"],
          books: [0.0, 0.05, 0, "教材免税，其他图书 GST 5%"],
          medicine: [0.0, 0.05, 0, "药品免关税，部分 GST 5%"],
          chemicals: [0.075, 0.18, 0, "化工品约 7.5%"],
          other: [0.15, 0.18, 0, "综合均值"]
        },
        BR: {
          electronics: [0.12, 0.17, 0.05, "巴西进口税高，II + IPI + ICMS 叠加（简化）"],
          clothing: [0.35, 0.17, 0.05, "服装 II 35%"],
          cosmetics: [0.18, 0.17, 0.05, "化妆品约 18%"],
          food: [0.1, 0.17, 0, "食品关税约 10%"],
          alcohol: [0.2, 0.17, 0.15, "酒类税重"],
          tobacco: [0.3, 0.17, 0.5, "烟草税重"],
          auto: [0.35, 0.17, 0.1, "汽车关税 35%"],
          machinery: [0.1, 0.17, 0.05, "机械约 10%"],
          furniture: [0.2, 0.17, 0, "家具约 20%"],
          toys: [0.2, 0.17, 0, "玩具约 20%"],
          jewelry: [0.18, 0.17, 0, "珠宝约 18%"],
          books: [0.0, 0.0, 0, "图书免税"],
          medicine: [0.0, 0.0, 0, "药品免税"],
          chemicals: [0.1, 0.17, 0, "化工约 10%"],
          other: [0.2, 0.17, 0.05, "综合均值（叠加税率高）"]
        },
        MX: {
          electronics: [0.05, 0.16, 0, "IVA 16%，电子品约 5%"],
          clothing: [0.25, 0.16, 0, "服装约 25%"],
          cosmetics: [0.1, 0.16, 0, "化妆品约 10%"],
          food: [0.2, 0.0, 0, "食品 IVA 0%（基本食品）"],
          alcohol: [0.2, 0.16, 0.26, "酒类 IEPS 约 26%"],
          tobacco: [0.2, 0.16, 0.6, "烟草 IEPS 60%"],
          auto: [0.0, 0.16, 0, "CUSMA 成员国 0% 关税"],
          machinery: [0.05, 0.16, 0, "机械约 5%"],
          furniture: [0.15, 0.16, 0, "家具约 15%"],
          toys: [0.2, 0.16, 0, "玩具约 20%"],
          jewelry: [0.15, 0.16, 0, "珠宝约 15%"],
          books: [0.0, 0.0, 0, "图书免税"],
          medicine: [0.0, 0.0, 0, "药品免税"],
          chemicals: [0.05, 0.16, 0, "化工约 5%"],
          other: [0.15, 0.16, 0, "综合均值"]
        },
        HK: {
          electronics: [0.0, 0.0, 0, "香港自由港，绝大多数商品零关税、无增值税"],
          clothing: [0.0, 0.0, 0, "零关税"],
          cosmetics: [0.0, 0.0, 0, "零关税"],
          food: [0.0, 0.0, 0, "零关税"],
          alcohol: [0.0, 0.0, 0.1, "葡萄酒 0%，烈酒 100%（酒精度 > 30%，简化为 10%）"],
          tobacco: [0.0, 0.0, 0.5, "烟草消费税按支"],
          auto: [0.0, 0.0, 0, "零关税，但首次登记税约 40-100%（未计）"],
          machinery: [0.0, 0.0, 0, "零关税"],
          furniture: [0.0, 0.0, 0, "零关税"],
          toys: [0.0, 0.0, 0, "零关税"],
          jewelry: [0.0, 0.0, 0, "零关税"],
          books: [0.0, 0.0, 0, "零关税"],
          medicine: [0.0, 0.0, 0, "零关税"],
          chemicals: [0.0, 0.0, 0, "零关税"],
          other: [0.0, 0.0, 0, "自由港，零关税"]
        },
        TW: {
          electronics: [0.0, 0.05, 0, "货物税 5%，关税多数 0%"],
          clothing: [0.125, 0.05, 0, "服装约 12.5%"],
          cosmetics: [0.08, 0.05, 0, "化妆品约 8%"],
          food: [0.1, 0.05, 0, "食品约 10%"],
          alcohol: [0.15, 0.05, 0.1, "含酒税"],
          tobacco: [0.2, 0.05, 0.5, "烟草税重"],
          auto: [0.175, 0.05, 0.25, "汽车关税 17.5%，货物税约 25%"],
          machinery: [0.0, 0.05, 0, "机械 0%"],
          furniture: [0.05, 0.05, 0, "家具约 5%"],
          toys: [0.0, 0.05, 0, "玩具 0%"],
          jewelry: [0.055, 0.05, 0, "珠宝约 5.5%"],
          books: [0.0, 0.0, 0, "图书免税"],
          medicine: [0.0, 0.0, 0, "药品免税"],
          chemicals: [0.05, 0.05, 0, "化工约 5%"],
          other: [0.07, 0.05, 0, "综合均值"]
        },
        TH: {
          electronics: [0.1, 0.07, 0, "VAT 7%，电子品约 10%"],
          clothing: [0.3, 0.07, 0, "服装约 30%"],
          cosmetics: [0.2, 0.07, 0, "化妆品约 20%"],
          food: [0.3, 0.07, 0, "食品约 30%（农产品更高）"],
          alcohol: [0.4, 0.07, 0.2, "酒税重"],
          tobacco: [0.3, 0.07, 0.5, "烟草税重"],
          auto: [0.8, 0.07, 0.3, "汽车关税极高（保护本国 ASEAN 生产）"],
          machinery: [0.1, 0.07, 0, "机械约 10%"],
          furniture: [0.2, 0.07, 0, "家具约 20%"],
          toys: [0.3, 0.07, 0, "玩具约 30%"],
          jewelry: [0.05, 0.07, 0, "珠宝约 5%"],
          books: [0.0, 0.0, 0, "图书免税"],
          medicine: [0.0, 0.0, 0, "药品免税"],
          chemicals: [0.1, 0.07, 0, "化工约 10%"],
          other: [0.2, 0.07, 0, "综合均值"]
        }
      };

      // 参考表格精选条目
      var REF_ROWS = [
        {
          country: "中国大陆",
          cat: "电子产品",
          duty: "8%",
          vat: "13%",
          excise: "0%",
          note: "低值 <=50 CNY 免税"
        },
        {
          country: "中国大陆",
          cat: "服装",
          duty: "14%",
          vat: "13%",
          excise: "0%",
          note: "MFN 税率"
        },
        {
          country: "中国大陆",
          cat: "化妆品",
          duty: "10%",
          vat: "13%",
          excise: "15%",
          note: "高档化妆品含消费税"
        },
        {
          country: "美国",
          cat: "电子产品",
          duty: "0%",
          vat: "0%",
          excise: "0%",
          note: "无联邦增值税"
        },
        {
          country: "美国",
          cat: "服装",
          duty: "12%",
          vat: "0%",
          excise: "0%",
          note: "各州另有销售税"
        },
        {
          country: "欧盟",
          cat: "电子产品",
          duty: "0%",
          vat: "20%",
          excise: "0%",
          note: "增值税因国家略有差异"
        },
        { country: "欧盟", cat: "服装", duty: "12%", vat: "20%", excise: "0%", note: "" },
        {
          country: "英国",
          cat: "图书",
          duty: "0%",
          vat: "0%",
          excise: "0%",
          note: "免关税免增值税"
        },
        {
          country: "日本",
          cat: "电子产品",
          duty: "0%",
          vat: "10%",
          excise: "0%",
          note: "消費税 10%"
        },
        {
          country: "新加坡",
          cat: "全类别",
          duty: "0%",
          vat: "9%",
          excise: "0%",
          note: "自由港，烟酒例外"
        },
        {
          country: "香港",
          cat: "全类别",
          duty: "0%",
          vat: "0%",
          excise: "0%",
          note: "自由港，烈酒除外"
        },
        {
          country: "印度",
          cat: "玩具",
          duty: "60%",
          vat: "18%",
          excise: "0%",
          note: "保护本国制造业"
        },
        {
          country: "巴西",
          cat: "电子产品",
          duty: "12%",
          vat: "17%",
          excise: "5%",
          note: "II+IPI+ICMS 叠加"
        },
        {
          country: "泰国",
          cat: "汽车",
          duty: "80%",
          vat: "7%",
          excise: "30%",
          note: "进口整车税率极高"
        }
      ];

      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");

      function fmtCurrency(n, currency) {
        var sym = {
          CNY: "CNY ",
          USD: "USD ",
          EUR: "EUR ",
          GBP: "GBP ",
          JPY: "JPY ",
          KRW: "KRW ",
          AUD: "AUD ",
          CAD: "CAD ",
          HKD: "HKD ",
          SGD: "SGD "
        };
        var s = sym[currency] || "";
        if (currency === "JPY" || currency === "KRW") {
          return s + Math.round(n).toLocaleString();
        }
        return s + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      function fmtPct(n) {
        return (n * 100).toFixed(1) + "%";
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function calculate() {
        var country = document.getElementById("destCountry").value;
        var category = document.getElementById("hsCategory").value;
        var valueStr = document.getElementById("goodsValue").value;
        var currency = document.getElementById("currency").value;
        var qty = parseInt(document.getElementById("quantity").value, 10) || 1;

        if (!valueStr || parseFloat(valueStr) <= 0) {
          document.getElementById("goodsValue").classList.add("has-error");
          showStatus("请输入有效的商品货值", "error");
          return;
        }
        document.getElementById("goodsValue").classList.remove("has-error");

        var cifPerUnit = parseFloat(valueStr);
        var cif = cifPerUnit * qty;

        var countryData = TAX_DB[country] || TAX_DB.CN;
        var rates = countryData[category] || [0.1, 0.13, 0];
        var dutyRate = rates[0];
        var vatRate = rates[1];
        var exciseRate = rates[2];

        // 关税 = CIF * dutyRate
        // 增值税 = (CIF + 关税) * vatRate
        // 消费税 = CIF * exciseRate（简化计算）
        var dutyAmt = cif * dutyRate;
        var vatBase = cif + dutyAmt;
        var vatAmt = vatBase * vatRate;
        var exciseAmt = cif * exciseRate;
        var totalTax = dutyAmt + vatAmt + exciseAmt;
        var landedCost = cif + totalTax;
        var effectiveRate = cif > 0 ? totalTax / cif : 0;

        document.getElementById("rDutyRate").textContent = fmtPct(dutyRate);
        document.getElementById("rVatRate").textContent = vatRate > 0 ? fmtPct(vatRate) : "—";
        document.getElementById("rExciseRate").textContent =
          exciseRate > 0 ? fmtPct(exciseRate) : "—";
        document.getElementById("rTotalRate").textContent = fmtPct(effectiveRate);
        document.getElementById("rCifValue").textContent = fmtCurrency(cif, currency);
        document.getElementById("rDutyAmt").textContent = fmtCurrency(dutyAmt, currency);
        document.getElementById("rVatAmt").textContent =
          vatAmt > 0 ? fmtCurrency(vatAmt, currency) : "—";
        document.getElementById("rExciseAmt").textContent =
          exciseAmt > 0 ? fmtCurrency(exciseAmt, currency) : "—";
        document.getElementById("rTotalTax").textContent = fmtCurrency(totalTax, currency);
        document.getElementById("rGoodsVal2").textContent = fmtCurrency(cif, currency);
        document.getElementById("rTaxTotal2").textContent = fmtCurrency(totalTax, currency);
        document.getElementById("rLandedCost").textContent = fmtCurrency(landedCost, currency);

        document.getElementById("placeholderResult").style.display = "none";
        document.getElementById("calcResult").style.display = "";

        document.getElementById("statDuty").textContent = fmtPct(dutyRate);
        document.getElementById("statVat").textContent = vatRate > 0 ? fmtPct(vatRate) : "0%";
        document.getElementById("statTotal").textContent = fmtPct(effectiveRate);
        statsEl.classList.add("show");

        showStatus("计算完成（综合税率 " + fmtPct(effectiveRate) + "）", "success");
      }

      function resetForm() {
        document.getElementById("goodsValue").value = "";
        document.getElementById("quantity").value = "1";
        document.getElementById("goodsValue").classList.remove("has-error");
        document.getElementById("placeholderResult").style.display = "";
        document.getElementById("calcResult").style.display = "none";
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
      }

      function buildRefTable() {
        var tbody = document.getElementById("refTableBody");
        REF_ROWS.forEach(function (row) {
          var tr = document.createElement("tr");
          var cols = [row.country, row.cat, row.duty, row.vat, row.excise, row.note];
          cols.forEach(function (col, i) {
            var td = document.createElement("td");
            td.textContent = col;
            if (i >= 2 && i <= 4) {
              td.className = "rate-cell";
            }
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
      }

      document.getElementById("btnCalculate").onclick = calculate;

      document.getElementById("btnReset").onclick = resetForm;

      document.getElementById("btnCopyResult").onclick = async function () {
        var calcResult = document.getElementById("calcResult");
        if (calcResult.style.display === "none") {
          showStatus("请先计算关税", "error");
          return;
        }
        var destSel = document.getElementById("destCountry");
        var catSel = document.getElementById("hsCategory");
        var lines = [
          "进口关税估算结果",
          "目的国：" + destSel.options[destSel.selectedIndex].text,
          "商品类别：" + catSel.options[catSel.selectedIndex].text,
          "货值：" + document.getElementById("rCifValue").textContent,
          "关税率：" + document.getElementById("rDutyRate").textContent,
          "增值税率：" + document.getElementById("rVatRate").textContent,
          "消费税率：" + document.getElementById("rExciseRate").textContent,
          "综合税率：" + document.getElementById("rTotalRate").textContent,
          "关税金额：" + document.getElementById("rDutyAmt").textContent,
          "增值税金额：" + document.getElementById("rVatAmt").textContent,
          "消费税金额：" + document.getElementById("rExciseAmt").textContent,
          "税费合计：" + document.getElementById("rTotalTax").textContent,
          "到手总成本：" + document.getElementById("rLandedCost").textContent
        ];
        try {
          await navigator.clipboard.writeText(lines.join("\n"));
          showStatus("结果已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calculate();
        }
      });

      buildRefTable();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
