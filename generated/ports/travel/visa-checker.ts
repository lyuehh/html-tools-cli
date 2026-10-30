// @ts-nocheck
// Generated from tools/travel/visa-checker.html
// Source SHA-256: a0d40e78dd0976fcd52c721fd186a2f6a4bbc0d19c11a1778bad58b875c7bdff
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Visa requirement types
      var VISA_TYPES = {
        VISA_FREE: "visa-free",
        VISA_ON_ARRIVAL: "visa-on-arrival",
        E_VISA: "e-visa",
        VISA_REQUIRED: "visa-required"
      };

      // Visa data for Chinese passport holders (2024 data - approximate)
      // Format: { type, days, notes }
      var VISA_DATA = {
        CN: {
          // Asia - Visa Free
          JP: {
            type: VISA_TYPES.VISA_FREE,
            days: 30,
            notes: ["2024年11月起单次免签30天", "需持有效护照", "需有返程机票"]
          },
          KR: {
            type: VISA_TYPES.VISA_FREE,
            days: 15,
            notes: ["2024年11月起试行免签15天", "需持有效护照", "需有返程机票"]
          },
          SG: {
            type: VISA_TYPES.VISA_FREE,
            days: 30,
            notes: ["2024年2月起互免签证", "可停留30天", "需有返程机票和足够资金"]
          },
          TH: {
            type: VISA_TYPES.VISA_FREE,
            days: 30,
            notes: ["2024年3月起永久互免签证", "可停留30天", "需有返程机票"]
          },
          MY: {
            type: VISA_TYPES.VISA_FREE,
            days: 30,
            notes: ["2023年12月起互免签证", "可停留30天", "需有返程机票和酒店预订"]
          },
          KZ: {
            type: VISA_TYPES.VISA_FREE,
            days: 30,
            notes: ["2024年11月起互免签证", "可停留30天"]
          },
          AE: {
            type: VISA_TYPES.VISA_FREE,
            days: 30,
            notes: ["免签入境", "可停留30天", "可续签30天"]
          },
          QA: { type: VISA_TYPES.VISA_FREE, days: 30, notes: ["免签入境", "可停留30天"] },
          GE: { type: VISA_TYPES.VISA_FREE, days: 30, notes: ["免签入境", "可停留30天"] },
          AM: { type: VISA_TYPES.VISA_FREE, days: 90, notes: ["免签入境", "180天内可停留90天"] },
          AZ: { type: VISA_TYPES.VISA_FREE, days: 30, notes: ["免签入境", "可停留30天"] },

          // Asia - Visa on Arrival
          KH: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 30,
            notes: ["落地签费用约30美元", "需准备2寸照片", "建议提前申请电子签"]
          },
          LA: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 20,
            notes: ["落地签费用约20美元", "需准备2寸照片"]
          },
          NP: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 30,
            notes: ["落地签费用约30美元", "需准备照片和美元现金"]
          },
          LK: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 50,
            notes: ["建议提前申请ETA电子签", "落地签费用约50美元"]
          },
          MV: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 0,
            notes: ["免费落地签", "需有酒店预订和返程机票"]
          },
          ID: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 35,
            notes: ["落地签费用约35美元", "巴厘岛等主要口岸可办理", "建议提前申请电子签"]
          },
          BD: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 51,
            notes: ["落地签费用约51美元", "需有邀请函或酒店预订"]
          },
          JO: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 40,
            notes: ["落地签费用约40约旦第纳尔"]
          },
          BH: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 14,
            fee: 25,
            notes: ["落地签费用约25巴林第纳尔", "可延期至1个月"]
          },
          OM: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 20,
            notes: ["落地签费用约20阿曼里亚尔"]
          },

          // Asia - E-Visa
          VN: {
            type: VISA_TYPES.E_VISA,
            days: 30,
            fee: 25,
            notes: ["电子签费用约25美元", "可在线申请", "处理时间约3个工作日"]
          },
          IN: {
            type: VISA_TYPES.E_VISA,
            days: 30,
            fee: 25,
            notes: ["电子签费用约25美元", "需提前申请", "可多次入境"]
          },
          MM: {
            type: VISA_TYPES.E_VISA,
            days: 28,
            fee: 50,
            notes: ["电子签费用约50美元", "仅限旅游签"]
          },
          PK: {
            type: VISA_TYPES.E_VISA,
            days: 30,
            fee: 60,
            notes: ["电子签费用约60美元", "处理时间约7-10个工作日"]
          },
          UZ: {
            type: VISA_TYPES.E_VISA,
            days: 30,
            fee: 20,
            notes: ["电子签费用约20美元", "可在线申请"]
          },
          TJ: { type: VISA_TYPES.E_VISA, days: 45, fee: 50, notes: ["电子签费用约50美元"] },
          KG: { type: VISA_TYPES.E_VISA, days: 60, fee: 70, notes: ["电子签费用约70美元"] },

          // Asia - Visa Required
          IL: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需提前申请签证", "旅游签可停留90天", "需提供行程单和酒店预订"]
          },
          SA: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请旅游签证", "2019年开放旅游签"]
          },
          KW: { type: VISA_TYPES.VISA_REQUIRED, days: 90, notes: ["需提前申请签证"] },
          IR: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 30,
            notes: ["需提前申请签证", "部分情况可落地签"]
          },
          IQ: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 30,
            notes: ["需提前申请签证", "安全形势需关注"]
          },
          AF: { type: VISA_TYPES.VISA_REQUIRED, days: 30, notes: ["需提前申请签证", "不建议前往"] },
          SY: { type: VISA_TYPES.VISA_REQUIRED, days: 15, notes: ["需提前申请签证", "不建议前往"] },
          YE: { type: VISA_TYPES.VISA_REQUIRED, days: 30, notes: ["需提前申请签证", "不建议前往"] },
          BT: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 15,
            notes: ["需通过授权旅行社办理", "每日最低消费要求"]
          },
          TM: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 10,
            notes: ["需提前申请签证", "签证较难获得"]
          },
          KP: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 30,
            notes: ["需通过授权旅行社办理", "团队游为主"]
          },
          PH: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 30,
            notes: ["需提前申请签证", "可申请9a旅游签证"]
          },
          BN: { type: VISA_TYPES.VISA_REQUIRED, days: 14, notes: ["需提前申请签证"] },

          // Europe - Visa Free
          RS: { type: VISA_TYPES.VISA_FREE, days: 30, notes: ["免签入境", "可停留30天"] },
          BA: { type: VISA_TYPES.VISA_FREE, days: 90, notes: ["免签入境", "180天内可停留90天"] },
          AL: {
            type: VISA_TYPES.VISA_FREE,
            days: 90,
            notes: ["旅游旺季免签(4-10月)", "其他时间需签证"]
          },
          BY: {
            type: VISA_TYPES.VISA_FREE,
            days: 30,
            notes: ["免签入境", "可停留30天", "需从明斯克机场入境"]
          },
          ME: { type: VISA_TYPES.VISA_FREE, days: 30, notes: ["免签入境", "可停留30天"] },
          MK: { type: VISA_TYPES.VISA_FREE, days: 90, notes: ["持有效申根签证可免签"] },

          // Europe - Visa Required (Schengen)
          DE: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天", "建议提前2-3个月申请"]
          },
          FR: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天", "旅游签证较易获得"]
          },
          IT: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          ES: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          NL: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          BE: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          AT: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          CH: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          PT: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          GR: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          SE: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          NO: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          DK: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          FI: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          PL: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          CZ: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },
          HU: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请申根签证", "可在申根区停留90天/180天"]
          },

          // Europe - Non-Schengen
          GB: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 180,
            notes: ["需申请英国签证", "旅游签可停留6个月", "建议提前申请"]
          },
          IE: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请爱尔兰签证", "与英国签证独立"]
          },
          RU: {
            type: VISA_TYPES.VISA_FREE,
            days: 30,
            notes: ["团队旅游免签", "个人旅游可申请电子签", "世界杯/大型活动期间有特殊政策"]
          },
          UA: { type: VISA_TYPES.E_VISA, days: 30, notes: ["可申请电子签", "注意安全形势"] },
          TR: {
            type: VISA_TYPES.E_VISA,
            days: 30,
            fee: 50,
            notes: ["电子签费用约50美元", "可在线申请", "持有效申根/英美签证可免签"]
          },
          HR: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["2023年加入申根区", "需申请申根签证"]
          },
          RO: { type: VISA_TYPES.VISA_REQUIRED, days: 90, notes: ["持有效申根签证可入境"] },
          BG: { type: VISA_TYPES.VISA_REQUIRED, days: 90, notes: ["持有效申根签证可入境"] },

          // Americas - Visa Free
          EC: { type: VISA_TYPES.VISA_FREE, days: 90, notes: ["免签入境", "可停留90天"] },

          // Americas - Visa Required
          US: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 180,
            notes: ["需申请B1/B2签证", "面签必须", "建议提前3个月预约"]
          },
          CA: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 180,
            notes: ["需申请访客签证", "可在线申请", "持有效美签可简化申请"]
          },
          MX: {
            type: VISA_TYPES.VISA_FREE,
            days: 180,
            notes: ["持有效美签可免签入境", "或需申请墨西哥签证"]
          },
          BR: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需提前申请签证", "可申请电子签"]
          },
          AR: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需提前申请签证", "持有效美签可申请AVE电子授权"]
          },
          CL: { type: VISA_TYPES.VISA_FREE, days: 90, notes: ["持有效美签可免签", "或需申请签证"] },
          PE: {
            type: VISA_TYPES.VISA_FREE,
            days: 183,
            notes: ["持有效美签/申根签可免签", "或需申请签证"]
          },
          CO: {
            type: VISA_TYPES.VISA_FREE,
            days: 90,
            notes: ["持有效美签/申根签可免签", "或需申请签证"]
          },
          CU: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 25,
            notes: ["需购买旅游卡", "费用约25美元"]
          },
          PA: { type: VISA_TYPES.VISA_FREE, days: 180, notes: ["持有效美签可免签入境"] },
          CR: { type: VISA_TYPES.VISA_FREE, days: 30, notes: ["持有效美签/申根签可免签"] },

          // Oceania
          AU: {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 90,
            notes: ["需申请访客签证(600类)", "可在线申请", "处理时间约20天"]
          },
          NZ: { type: VISA_TYPES.VISA_REQUIRED, days: 90, notes: ["需申请访客签证", "可在线申请"] },
          FJ: { type: VISA_TYPES.VISA_FREE, days: 120, notes: ["免签入境", "可停留120天"] },
          WS: { type: VISA_TYPES.VISA_FREE, days: 60, notes: ["免签入境", "可停留60天"] },
          TO: { type: VISA_TYPES.VISA_FREE, days: 30, notes: ["免签入境", "可停留30天"] },
          VU: { type: VISA_TYPES.VISA_FREE, days: 30, notes: ["免签入境", "可停留30天"] },
          PG: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 60,
            fee: 100,
            notes: ["落地签费用约100基那"]
          },

          // Africa - Visa Free
          MU: { type: VISA_TYPES.VISA_FREE, days: 60, notes: ["免签入境", "可停留60天"] },
          SC: { type: VISA_TYPES.VISA_FREE, days: 30, notes: ["免签入境", "可停留30天"] },
          MA: { type: VISA_TYPES.VISA_FREE, days: 90, notes: ["免签入境", "可停留90天"] },
          TN: {
            type: VISA_TYPES.VISA_FREE,
            days: 90,
            notes: ["团队旅游免签", "需有返程机票和酒店预订"]
          },
          ZA: { type: VISA_TYPES.VISA_FREE, days: 90, notes: ["免签入境", "可停留90天"] },
          BW: { type: VISA_TYPES.VISA_FREE, days: 90, notes: ["免签入境", "可停留90天"] },

          // Africa - Visa on Arrival
          EG: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 25,
            notes: ["落地签费用约25美元", "仅限特定口岸"]
          },
          KE: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 90,
            fee: 50,
            notes: ["建议申请电子签", "落地签费用约50美元"]
          },
          TZ: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 90,
            fee: 50,
            notes: ["落地签费用约50美元", "可在线申请电子签"]
          },
          ET: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 52,
            notes: ["仅限亚的斯亚贝巴机场", "费用约52美元"]
          },
          MG: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 90,
            fee: 35,
            notes: ["落地签费用约35美元"]
          },
          RW: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 30,
            notes: ["落地签费用约30美元"]
          },
          UG: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 90,
            fee: 50,
            notes: ["建议申请电子签", "落地签费用约50美元"]
          },
          ZM: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 90,
            fee: 50,
            notes: ["落地签费用约50美元"]
          },
          ZW: {
            type: VISA_TYPES.VISA_ON_ARRIVAL,
            days: 30,
            fee: 30,
            notes: ["落地签费用约30美元", "可申请KAZA签证"]
          },

          // Africa - Visa Required
          NG: { type: VISA_TYPES.VISA_REQUIRED, days: 30, notes: ["需提前申请签证"] },
          GH: { type: VISA_TYPES.VISA_REQUIRED, days: 30, notes: ["需提前申请签证"] },
          SN: { type: VISA_TYPES.VISA_REQUIRED, days: 30, notes: ["需提前申请签证"] },
          CI: { type: VISA_TYPES.VISA_REQUIRED, days: 30, notes: ["需提前申请签证"] },
          DZ: { type: VISA_TYPES.VISA_REQUIRED, days: 30, notes: ["需提前申请签证"] },
          AO: { type: VISA_TYPES.VISA_REQUIRED, days: 30, notes: ["需提前申请签证"] },
          NA: { type: VISA_TYPES.VISA_REQUIRED, days: 90, notes: ["需提前申请签证"] }
        }
      };

      // Country data with names and flags
      var COUNTRIES = {
        // Asia
        JP: { name: "日本", nameEn: "Japan", flag: "🇯🇵", region: "亚洲" },
        KR: { name: "韩国", nameEn: "South Korea", flag: "🇰🇷", region: "亚洲" },
        SG: { name: "新加坡", nameEn: "Singapore", flag: "🇸🇬", region: "亚洲" },
        TH: { name: "泰国", nameEn: "Thailand", flag: "🇹🇭", region: "亚洲" },
        MY: { name: "马来西亚", nameEn: "Malaysia", flag: "🇲🇾", region: "亚洲" },
        VN: { name: "越南", nameEn: "Vietnam", flag: "🇻🇳", region: "亚洲" },
        KH: { name: "柬埔寨", nameEn: "Cambodia", flag: "🇰🇭", region: "亚洲" },
        LA: { name: "老挝", nameEn: "Laos", flag: "🇱🇦", region: "亚洲" },
        MM: { name: "缅甸", nameEn: "Myanmar", flag: "🇲🇲", region: "亚洲" },
        PH: { name: "菲律宾", nameEn: "Philippines", flag: "🇵🇭", region: "亚洲" },
        ID: { name: "印度尼西亚", nameEn: "Indonesia", flag: "🇮🇩", region: "亚洲" },
        BN: { name: "文莱", nameEn: "Brunei", flag: "🇧🇳", region: "亚洲" },
        IN: { name: "印度", nameEn: "India", flag: "🇮🇳", region: "亚洲" },
        NP: { name: "尼泊尔", nameEn: "Nepal", flag: "🇳🇵", region: "亚洲" },
        LK: { name: "斯里兰卡", nameEn: "Sri Lanka", flag: "🇱🇰", region: "亚洲" },
        MV: { name: "马尔代夫", nameEn: "Maldives", flag: "🇲🇻", region: "亚洲" },
        BD: { name: "孟加拉国", nameEn: "Bangladesh", flag: "🇧🇩", region: "亚洲" },
        PK: { name: "巴基斯坦", nameEn: "Pakistan", flag: "🇵🇰", region: "亚洲" },
        AE: { name: "阿联酋", nameEn: "UAE", flag: "🇦🇪", region: "亚洲" },
        QA: { name: "卡塔尔", nameEn: "Qatar", flag: "🇶🇦", region: "亚洲" },
        SA: { name: "沙特阿拉伯", nameEn: "Saudi Arabia", flag: "🇸🇦", region: "亚洲" },
        KW: { name: "科威特", nameEn: "Kuwait", flag: "🇰🇼", region: "亚洲" },
        BH: { name: "巴林", nameEn: "Bahrain", flag: "🇧🇭", region: "亚洲" },
        OM: { name: "阿曼", nameEn: "Oman", flag: "🇴🇲", region: "亚洲" },
        JO: { name: "约旦", nameEn: "Jordan", flag: "🇯🇴", region: "亚洲" },
        IL: { name: "以色列", nameEn: "Israel", flag: "🇮🇱", region: "亚洲" },
        IR: { name: "伊朗", nameEn: "Iran", flag: "🇮🇷", region: "亚洲" },
        IQ: { name: "伊拉克", nameEn: "Iraq", flag: "🇮🇶", region: "亚洲" },
        SY: { name: "叙利亚", nameEn: "Syria", flag: "🇸🇾", region: "亚洲" },
        YE: { name: "也门", nameEn: "Yemen", flag: "🇾🇪", region: "亚洲" },
        AF: { name: "阿富汗", nameEn: "Afghanistan", flag: "🇦🇫", region: "亚洲" },
        KZ: { name: "哈萨克斯坦", nameEn: "Kazakhstan", flag: "🇰🇿", region: "亚洲" },
        UZ: { name: "乌兹别克斯坦", nameEn: "Uzbekistan", flag: "🇺🇿", region: "亚洲" },
        TJ: { name: "塔吉克斯坦", nameEn: "Tajikistan", flag: "🇹🇯", region: "亚洲" },
        KG: { name: "吉尔吉斯斯坦", nameEn: "Kyrgyzstan", flag: "🇰🇬", region: "亚洲" },
        TM: { name: "土库曼斯坦", nameEn: "Turkmenistan", flag: "🇹🇲", region: "亚洲" },
        GE: { name: "格鲁吉亚", nameEn: "Georgia", flag: "🇬🇪", region: "亚洲" },
        AM: { name: "亚美尼亚", nameEn: "Armenia", flag: "🇦🇲", region: "亚洲" },
        AZ: { name: "阿塞拜疆", nameEn: "Azerbaijan", flag: "🇦🇿", region: "亚洲" },
        BT: { name: "不丹", nameEn: "Bhutan", flag: "🇧🇹", region: "亚洲" },
        KP: { name: "朝鲜", nameEn: "North Korea", flag: "🇰🇵", region: "亚洲" },

        // Europe
        GB: { name: "英国", nameEn: "United Kingdom", flag: "🇬🇧", region: "欧洲" },
        FR: { name: "法国", nameEn: "France", flag: "🇫🇷", region: "欧洲" },
        DE: { name: "德国", nameEn: "Germany", flag: "🇩🇪", region: "欧洲" },
        IT: { name: "意大利", nameEn: "Italy", flag: "🇮🇹", region: "欧洲" },
        ES: { name: "西班牙", nameEn: "Spain", flag: "🇪🇸", region: "欧洲" },
        PT: { name: "葡萄牙", nameEn: "Portugal", flag: "🇵🇹", region: "欧洲" },
        NL: { name: "荷兰", nameEn: "Netherlands", flag: "🇳🇱", region: "欧洲" },
        BE: { name: "比利时", nameEn: "Belgium", flag: "🇧🇪", region: "欧洲" },
        AT: { name: "奥地利", nameEn: "Austria", flag: "🇦🇹", region: "欧洲" },
        CH: { name: "瑞士", nameEn: "Switzerland", flag: "🇨🇭", region: "欧洲" },
        GR: { name: "希腊", nameEn: "Greece", flag: "🇬🇷", region: "欧洲" },
        SE: { name: "瑞典", nameEn: "Sweden", flag: "🇸🇪", region: "欧洲" },
        NO: { name: "挪威", nameEn: "Norway", flag: "🇳🇴", region: "欧洲" },
        DK: { name: "丹麦", nameEn: "Denmark", flag: "🇩🇰", region: "欧洲" },
        FI: { name: "芬兰", nameEn: "Finland", flag: "🇫🇮", region: "欧洲" },
        PL: { name: "波兰", nameEn: "Poland", flag: "🇵🇱", region: "欧洲" },
        CZ: { name: "捷克", nameEn: "Czech Republic", flag: "🇨🇿", region: "欧洲" },
        HU: { name: "匈牙利", nameEn: "Hungary", flag: "🇭🇺", region: "欧洲" },
        IE: { name: "爱尔兰", nameEn: "Ireland", flag: "🇮🇪", region: "欧洲" },
        RU: { name: "俄罗斯", nameEn: "Russia", flag: "🇷🇺", region: "欧洲" },
        UA: { name: "乌克兰", nameEn: "Ukraine", flag: "🇺🇦", region: "欧洲" },
        TR: { name: "土耳其", nameEn: "Turkey", flag: "🇹🇷", region: "欧洲" },
        RS: { name: "塞尔维亚", nameEn: "Serbia", flag: "🇷🇸", region: "欧洲" },
        HR: { name: "克罗地亚", nameEn: "Croatia", flag: "🇭🇷", region: "欧洲" },
        BA: { name: "波黑", nameEn: "Bosnia", flag: "🇧🇦", region: "欧洲" },
        ME: { name: "黑山", nameEn: "Montenegro", flag: "🇲🇪", region: "欧洲" },
        AL: { name: "阿尔巴尼亚", nameEn: "Albania", flag: "🇦🇱", region: "欧洲" },
        MK: { name: "北马其顿", nameEn: "North Macedonia", flag: "🇲🇰", region: "欧洲" },
        BY: { name: "白俄罗斯", nameEn: "Belarus", flag: "🇧🇾", region: "欧洲" },
        RO: { name: "罗马尼亚", nameEn: "Romania", flag: "🇷🇴", region: "欧洲" },
        BG: { name: "保加利亚", nameEn: "Bulgaria", flag: "🇧🇬", region: "欧洲" },

        // Americas
        US: { name: "美国", nameEn: "United States", flag: "🇺🇸", region: "美洲" },
        CA: { name: "加拿大", nameEn: "Canada", flag: "🇨🇦", region: "美洲" },
        MX: { name: "墨西哥", nameEn: "Mexico", flag: "🇲🇽", region: "美洲" },
        BR: { name: "巴西", nameEn: "Brazil", flag: "🇧🇷", region: "美洲" },
        AR: { name: "阿根廷", nameEn: "Argentina", flag: "🇦🇷", region: "美洲" },
        CL: { name: "智利", nameEn: "Chile", flag: "🇨🇱", region: "美洲" },
        PE: { name: "秘鲁", nameEn: "Peru", flag: "🇵🇪", region: "美洲" },
        CO: { name: "哥伦比亚", nameEn: "Colombia", flag: "🇨🇴", region: "美洲" },
        EC: { name: "厄瓜多尔", nameEn: "Ecuador", flag: "🇪🇨", region: "美洲" },
        CU: { name: "古巴", nameEn: "Cuba", flag: "🇨🇺", region: "美洲" },
        PA: { name: "巴拿马", nameEn: "Panama", flag: "🇵🇦", region: "美洲" },
        CR: { name: "哥斯达黎加", nameEn: "Costa Rica", flag: "🇨🇷", region: "美洲" },

        // Oceania
        AU: { name: "澳大利亚", nameEn: "Australia", flag: "🇦🇺", region: "大洋洲" },
        NZ: { name: "新西兰", nameEn: "New Zealand", flag: "🇳🇿", region: "大洋洲" },
        FJ: { name: "斐济", nameEn: "Fiji", flag: "🇫🇯", region: "大洋洲" },
        WS: { name: "萨摩亚", nameEn: "Samoa", flag: "🇼🇸", region: "大洋洲" },
        TO: { name: "汤加", nameEn: "Tonga", flag: "🇹🇴", region: "大洋洲" },
        VU: { name: "瓦努阿图", nameEn: "Vanuatu", flag: "🇻🇺", region: "大洋洲" },
        PG: { name: "巴布亚新几内亚", nameEn: "Papua New Guinea", flag: "🇵🇬", region: "大洋洲" },

        // Africa
        EG: { name: "埃及", nameEn: "Egypt", flag: "🇪🇬", region: "非洲" },
        MA: { name: "摩洛哥", nameEn: "Morocco", flag: "🇲🇦", region: "非洲" },
        TN: { name: "突尼斯", nameEn: "Tunisia", flag: "🇹🇳", region: "非洲" },
        DZ: { name: "阿尔及利亚", nameEn: "Algeria", flag: "🇩🇿", region: "非洲" },
        ZA: { name: "南非", nameEn: "South Africa", flag: "🇿🇦", region: "非洲" },
        KE: { name: "肯尼亚", nameEn: "Kenya", flag: "🇰🇪", region: "非洲" },
        TZ: { name: "坦桑尼亚", nameEn: "Tanzania", flag: "🇹🇿", region: "非洲" },
        ET: { name: "埃塞俄比亚", nameEn: "Ethiopia", flag: "🇪🇹", region: "非洲" },
        NG: { name: "尼日利亚", nameEn: "Nigeria", flag: "🇳🇬", region: "非洲" },
        GH: { name: "加纳", nameEn: "Ghana", flag: "🇬🇭", region: "非洲" },
        SN: { name: "塞内加尔", nameEn: "Senegal", flag: "🇸🇳", region: "非洲" },
        CI: { name: "科特迪瓦", nameEn: "Ivory Coast", flag: "🇨🇮", region: "非洲" },
        MU: { name: "毛里求斯", nameEn: "Mauritius", flag: "🇲🇺", region: "非洲" },
        SC: { name: "塞舌尔", nameEn: "Seychelles", flag: "🇸🇨", region: "非洲" },
        MG: { name: "马达加斯加", nameEn: "Madagascar", flag: "🇲🇬", region: "非洲" },
        RW: { name: "卢旺达", nameEn: "Rwanda", flag: "🇷🇼", region: "非洲" },
        UG: { name: "乌干达", nameEn: "Uganda", flag: "🇺🇬", region: "非洲" },
        ZM: { name: "赞比亚", nameEn: "Zambia", flag: "🇿🇲", region: "非洲" },
        ZW: { name: "津巴布韦", nameEn: "Zimbabwe", flag: "🇿🇼", region: "非洲" },
        BW: { name: "博茨瓦纳", nameEn: "Botswana", flag: "🇧🇼", region: "非洲" },
        NA: { name: "纳米比亚", nameEn: "Namibia", flag: "🇳🇦", region: "非洲" },
        AO: { name: "安哥拉", nameEn: "Angola", flag: "🇦🇴", region: "非洲" }
      };

      // Popular destinations for quick selection
      var POPULAR_DESTINATIONS = [
        "JP",
        "KR",
        "TH",
        "SG",
        "MY",
        "US",
        "AU",
        "GB",
        "FR",
        "DE",
        "IT",
        "MV",
        "AE",
        "NZ"
      ];

      // Passport country data
      var PASSPORT_COUNTRIES = {
        CN: { name: "中国", nameEn: "China", flag: "🇨🇳" },
        HK: { name: "中国香港", nameEn: "Hong Kong SAR", flag: "🇭🇰" },
        MO: { name: "中国澳门", nameEn: "Macau SAR", flag: "🇲🇴" },
        TW: { name: "中国台湾", nameEn: "Taiwan", flag: "🇹🇼" }
      };

      var LS_KEY = "visa_checker_state_v1";

      // Theme toggle
      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // Load theme
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // Toast notification
      function showToast(msg, isError) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.className = "toast" + (isError ? " error" : "");
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Initialize destination select
      function initDestinationSelect() {
        var select = document.getElementById("destinationCountry");

        // Group countries by region
        var regions = {};
        Object.keys(COUNTRIES).forEach(function (code) {
          var country = COUNTRIES[code];
          if (!regions[country.region]) {
            regions[country.region] = [];
          }
          regions[country.region].push({ code: code, country: country });
        });

        // Sort regions
        var regionOrder = ["亚洲", "欧洲", "美洲", "大洋洲", "非洲"];

        regionOrder.forEach(function (regionName) {
          if (regions[regionName]) {
            var optgroup = document.createElement("optgroup");
            optgroup.label = regionName;

            // Sort countries within region by name
            regions[regionName].sort(function (a, b) {
              return a.country.name.localeCompare(b.country.name, "zh-CN");
            });

            regions[regionName].forEach(function (item) {
              var option = document.createElement("option");
              option.value = item.code;
              option.textContent =
                item.country.flag + " " + item.country.name + " (" + item.country.nameEn + ")";
              optgroup.appendChild(option);
            });

            select.appendChild(optgroup);
          }
        });
      }

      // Initialize popular destinations buttons
      function initPopularDestinations() {
        var container = document.getElementById("popularDestinations");

        POPULAR_DESTINATIONS.forEach(function (code) {
          var country = COUNTRIES[code];
          if (country) {
            var btn = document.createElement("button");
            btn.className = "dest-btn";

            var flagSpan = document.createElement("span");
            flagSpan.className = "flag";
            flagSpan.textContent = country.flag;
            btn.appendChild(flagSpan);

            var nameText = document.createTextNode(country.name);
            btn.appendChild(nameText);

            btn.onclick = function () {
              document.getElementById("destinationCountry").value = code;
              checkVisa();
            };
            container.appendChild(btn);
          }
        });
      }

      // Get visa type label
      function getVisaTypeLabel(type) {
        switch (type) {
          case VISA_TYPES.VISA_FREE:
            return "免签";
          case VISA_TYPES.VISA_ON_ARRIVAL:
            return "落地签";
          case VISA_TYPES.E_VISA:
            return "电子签证";
          case VISA_TYPES.VISA_REQUIRED:
            return "需要签证";
          default:
            return "未知";
        }
      }

      // Get visa type icon
      function getVisaTypeIcon(type) {
        switch (type) {
          case VISA_TYPES.VISA_FREE:
            return "✓";
          case VISA_TYPES.VISA_ON_ARRIVAL:
            return "🛬";
          case VISA_TYPES.E_VISA:
            return "💻";
          case VISA_TYPES.VISA_REQUIRED:
            return "📝";
          default:
            return "?";
        }
      }

      // Create detail item element
      function createDetailItem(label, value, isHighlight) {
        var item = document.createElement("div");
        item.className = "detail-item";

        var labelEl = document.createElement("span");
        labelEl.className = "detail-label";
        labelEl.textContent = label;
        item.appendChild(labelEl);

        var valueEl = document.createElement("span");
        valueEl.className = "detail-value" + (isHighlight ? " highlight" : "");
        valueEl.textContent = value;
        item.appendChild(valueEl);

        return item;
      }

      // Check visa requirement
      function checkVisa() {
        var passportCode = document.getElementById("passportCountry").value;
        var destCode = document.getElementById("destinationCountry").value;

        if (!destCode) {
          showToast("请选择目的地国家", true);
          return;
        }

        var passport = PASSPORT_COUNTRIES[passportCode];
        var destination = COUNTRIES[destCode];
        var visaData = VISA_DATA[passportCode] && VISA_DATA[passportCode][destCode];

        if (!visaData) {
          // Default to visa required if no data
          visaData = {
            type: VISA_TYPES.VISA_REQUIRED,
            days: 30,
            notes: ["暂无详细数据", "请查阅官方渠道获取最新信息"]
          };
        }

        // Update result card
        document.getElementById("fromCountry").textContent = passport.flag + " " + passport.name;
        document.getElementById("toCountry").textContent =
          destination.flag + " " + destination.name;

        // Update badge
        var badge = document.getElementById("visaBadge");
        badge.className = "visa-badge " + visaData.type;
        badge.textContent = getVisaTypeIcon(visaData.type) + " " + getVisaTypeLabel(visaData.type);

        // Build details using safe DOM methods
        var detailsContainer = document.getElementById("resultDetails");
        // Clear existing content
        while (detailsContainer.firstChild) {
          detailsContainer.removeChild(detailsContainer.firstChild);
        }

        detailsContainer.appendChild(
          createDetailItem("签证类型", getVisaTypeLabel(visaData.type), true)
        );

        if (visaData.days) {
          detailsContainer.appendChild(createDetailItem("停留天数", visaData.days + " 天", false));
        }

        if (visaData.fee !== undefined) {
          detailsContainer.appendChild(
            createDetailItem("签证费用", "约 " + visaData.fee + " 美元", false)
          );
        }

        detailsContainer.appendChild(
          createDetailItem("目的地", destination.name + " (" + destination.nameEn + ")", false)
        );
        detailsContainer.appendChild(createDetailItem("所属地区", destination.region, false));

        // Update notes
        var notesList = document.getElementById("notesList");
        // Clear existing notes
        while (notesList.firstChild) {
          notesList.removeChild(notesList.firstChild);
        }

        if (visaData.notes && visaData.notes.length > 0) {
          visaData.notes.forEach(function (note) {
            var li = document.createElement("li");
            li.textContent = note;
            notesList.appendChild(li);
          });
          document.getElementById("notesSection").style.display = "block";
        } else {
          document.getElementById("notesSection").style.display = "none";
        }

        // Show result card
        document.getElementById("resultCard").classList.add("show");

        // Save state
        saveToStorage();

        showToast("查询完成");
      }

      // Clear selection
      function clearSelection() {
        document.getElementById("passportCountry").value = "CN";
        document.getElementById("destinationCountry").value = "";
        document.getElementById("resultCard").classList.remove("show");
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        showToast("已清空");
      }

      // Share result
      function shareResult() {
        var passportCode = document.getElementById("passportCountry").value;
        var destCode = document.getElementById("destinationCountry").value;

        if (!destCode) {
          showToast("请先选择目的地", true);
          return;
        }

        var data = { p: passportCode, d: destCode };
        var encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        history.replaceState(null, "", "#" + encoded);

        navigator.clipboard
          .writeText(location.href)
          .then(function () {
            showToast("链接已复制到剪贴板");
          })
          .catch(function () {
            showToast("请手动复制地址栏链接");
          });
      }

      // Save to storage
      function saveToStorage() {
        var data = {
          passport: document.getElementById("passportCountry").value,
          destination: document.getElementById("destinationCountry").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      // Load from storage
      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return false;

        try {
          var data = JSON.parse(saved);
          if (data.passport) {
            document.getElementById("passportCountry").value = data.passport;
          }
          if (data.destination) {
            document.getElementById("destinationCountry").value = data.destination;
            checkVisa();
          }
          return true;
        } catch (e) {
          return false;
        }
      }

      // Load from URL
      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;

        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          if (data.p) {
            document.getElementById("passportCountry").value = data.p;
          }
          if (data.d) {
            document.getElementById("destinationCountry").value = data.d;
            checkVisa();
          }
          return true;
        } catch (e) {
          return false;
        }
      }

      // Calculate and display stats
      function calculateStats() {
        var passportCode = "CN";
        var visaData = VISA_DATA[passportCode];

        if (!visaData) return;

        var stats = {
          visaFree: 0,
          visaOnArrival: 0,
          eVisa: 0,
          visaRequired: 0
        };

        Object.keys(visaData).forEach(function (destCode) {
          var visa = visaData[destCode];
          switch (visa.type) {
            case VISA_TYPES.VISA_FREE:
              stats.visaFree++;
              break;
            case VISA_TYPES.VISA_ON_ARRIVAL:
              stats.visaOnArrival++;
              break;
            case VISA_TYPES.E_VISA:
              stats.eVisa++;
              break;
            case VISA_TYPES.VISA_REQUIRED:
              stats.visaRequired++;
              break;
          }
        });

        document.getElementById("statVisaFree").textContent = stats.visaFree;
        document.getElementById("statVisaOnArrival").textContent = stats.visaOnArrival;
        document.getElementById("statEVisa").textContent = stats.eVisa;
        document.getElementById("statVisaRequired").textContent = stats.visaRequired;
      }

      // Initialize
      (function init() {
        initDestinationSelect();
        initPopularDestinations();
        calculateStats();

        if (!loadFromUrl()) {
          loadFromStorage();
        }

        // Auto-save on change
        document.getElementById("passportCountry").addEventListener("change", function () {
          calculateStats();
          if (document.getElementById("destinationCountry").value) {
            checkVisa();
          }
        });
      })();
    
