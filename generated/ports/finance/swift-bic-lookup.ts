// @ts-nocheck
// Generated from tools/finance/swift-bic-lookup.html
// Source SHA-256: a838eb8e46b1461df715f02e7a30df69c1e7e0868965fefccf11eabe1f843a62
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* ── SWIFT/BIC lookup logic ── */

      // ISO 3166-1 alpha-2 → country name (Chinese) + flag emoji
      var COUNTRIES = {
        AD: { name: "安道尔", flag: "🇦🇩" },
        AE: { name: "阿联酋", flag: "🇦🇪" },
        AF: { name: "阿富汗", flag: "🇦🇫" },
        AG: { name: "安提瓜和巴布达", flag: "🇦🇬" },
        AL: { name: "阿尔巴尼亚", flag: "🇦🇱" },
        AM: { name: "亚美尼亚", flag: "🇦🇲" },
        AO: { name: "安哥拉", flag: "🇦🇴" },
        AR: { name: "阿根廷", flag: "🇦🇷" },
        AT: { name: "奥地利", flag: "🇦🇹" },
        AU: { name: "澳大利亚", flag: "🇦🇺" },
        AZ: { name: "阿塞拜疆", flag: "🇦🇿" },
        BA: { name: "波黑", flag: "🇧🇦" },
        BB: { name: "巴巴多斯", flag: "🇧🇧" },
        BD: { name: "孟加拉国", flag: "🇧🇩" },
        BE: { name: "比利时", flag: "🇧🇪" },
        BF: { name: "布基纳法索", flag: "🇧🇫" },
        BG: { name: "保加利亚", flag: "🇧🇬" },
        BH: { name: "巴林", flag: "🇧🇭" },
        BI: { name: "布隆迪", flag: "🇧🇮" },
        BJ: { name: "贝宁", flag: "🇧🇯" },
        BN: { name: "文莱", flag: "🇧🇳" },
        BO: { name: "玻利维亚", flag: "🇧🇴" },
        BR: { name: "巴西", flag: "🇧🇷" },
        BS: { name: "巴哈马", flag: "🇧🇸" },
        BT: { name: "不丹", flag: "🇧🇹" },
        BW: { name: "博茨瓦纳", flag: "🇧🇼" },
        BY: { name: "白俄罗斯", flag: "🇧🇾" },
        BZ: { name: "伯利兹", flag: "🇧🇿" },
        CA: { name: "加拿大", flag: "🇨🇦" },
        CD: { name: "刚果（金）", flag: "🇨🇩" },
        CF: { name: "中非", flag: "🇨🇫" },
        CG: { name: "刚果（布）", flag: "🇨🇬" },
        CH: { name: "瑞士", flag: "🇨🇭" },
        CI: { name: "科特迪瓦", flag: "🇨🇮" },
        CL: { name: "智利", flag: "🇨🇱" },
        CM: { name: "喀麦隆", flag: "🇨🇲" },
        CN: { name: "中国", flag: "🇨🇳" },
        CO: { name: "哥伦比亚", flag: "🇨🇴" },
        CR: { name: "哥斯达黎加", flag: "🇨🇷" },
        CU: { name: "古巴", flag: "🇨🇺" },
        CV: { name: "佛得角", flag: "🇨🇻" },
        CY: { name: "塞浦路斯", flag: "🇨🇾" },
        CZ: { name: "捷克", flag: "🇨🇿" },
        DE: { name: "德国", flag: "🇩🇪" },
        DJ: { name: "吉布提", flag: "🇩🇯" },
        DK: { name: "丹麦", flag: "🇩🇰" },
        DM: { name: "多米尼克", flag: "🇩🇲" },
        DO: { name: "多米尼加", flag: "🇩🇴" },
        DZ: { name: "阿尔及利亚", flag: "🇩🇿" },
        EC: { name: "厄瓜多尔", flag: "🇪🇨" },
        EE: { name: "爱沙尼亚", flag: "🇪🇪" },
        EG: { name: "埃及", flag: "🇪🇬" },
        ER: { name: "厄立特里亚", flag: "🇪🇷" },
        ES: { name: "西班牙", flag: "🇪🇸" },
        ET: { name: "埃塞俄比亚", flag: "🇪🇹" },
        FI: { name: "芬兰", flag: "🇫🇮" },
        FJ: { name: "斐济", flag: "🇫🇯" },
        FR: { name: "法国", flag: "🇫🇷" },
        GA: { name: "加蓬", flag: "🇬🇦" },
        GB: { name: "英国", flag: "🇬🇧" },
        GD: { name: "格林纳达", flag: "🇬🇩" },
        GE: { name: "格鲁吉亚", flag: "🇬🇪" },
        GH: { name: "加纳", flag: "🇬🇭" },
        GM: { name: "冈比亚", flag: "🇬🇲" },
        GN: { name: "几内亚", flag: "🇬🇳" },
        GQ: { name: "赤道几内亚", flag: "🇬🇶" },
        GR: { name: "希腊", flag: "🇬🇷" },
        GT: { name: "危地马拉", flag: "🇬🇹" },
        GW: { name: "几内亚比绍", flag: "🇬🇼" },
        GY: { name: "圭亚那", flag: "🇬🇾" },
        HK: { name: "中国香港", flag: "🇭🇰" },
        HN: { name: "洪都拉斯", flag: "🇭🇳" },
        HR: { name: "克罗地亚", flag: "🇭🇷" },
        HT: { name: "海地", flag: "🇭🇹" },
        HU: { name: "匈牙利", flag: "🇭🇺" },
        ID: { name: "印度尼西亚", flag: "🇮🇩" },
        IE: { name: "爱尔兰", flag: "🇮🇪" },
        IL: { name: "以色列", flag: "🇮🇱" },
        IN: { name: "印度", flag: "🇮🇳" },
        IQ: { name: "伊拉克", flag: "🇮🇶" },
        IR: { name: "伊朗", flag: "🇮🇷" },
        IS: { name: "冰岛", flag: "🇮🇸" },
        IT: { name: "意大利", flag: "🇮🇹" },
        JM: { name: "牙买加", flag: "🇯🇲" },
        JO: { name: "约旦", flag: "🇯🇴" },
        JP: { name: "日本", flag: "🇯🇵" },
        KE: { name: "肯尼亚", flag: "🇰🇪" },
        KG: { name: "吉尔吉斯斯坦", flag: "🇰🇬" },
        KH: { name: "柬埔寨", flag: "🇰🇭" },
        KI: { name: "基里巴斯", flag: "🇰🇮" },
        KM: { name: "科摩罗", flag: "🇰🇲" },
        KN: { name: "圣基茨和尼维斯", flag: "🇰🇳" },
        KP: { name: "朝鲜", flag: "🇰🇵" },
        KR: { name: "韩国", flag: "🇰🇷" },
        KW: { name: "科威特", flag: "🇰🇼" },
        KZ: { name: "哈萨克斯坦", flag: "🇰🇿" },
        LA: { name: "老挝", flag: "🇱🇦" },
        LB: { name: "黎巴嫩", flag: "🇱🇧" },
        LC: { name: "圣卢西亚", flag: "🇱🇨" },
        LI: { name: "列支敦士登", flag: "🇱🇮" },
        LK: { name: "斯里兰卡", flag: "🇱🇰" },
        LR: { name: "利比里亚", flag: "🇱🇷" },
        LS: { name: "莱索托", flag: "🇱🇸" },
        LT: { name: "立陶宛", flag: "🇱🇹" },
        LU: { name: "卢森堡", flag: "🇱🇺" },
        LV: { name: "拉脱维亚", flag: "🇱🇻" },
        LY: { name: "利比亚", flag: "🇱🇾" },
        MA: { name: "摩洛哥", flag: "🇲🇦" },
        MC: { name: "摩纳哥", flag: "🇲🇨" },
        MD: { name: "摩尔多瓦", flag: "🇲🇩" },
        ME: { name: "黑山", flag: "🇲🇪" },
        MG: { name: "马达加斯加", flag: "🇲🇬" },
        MH: { name: "马绍尔群岛", flag: "🇲🇭" },
        MK: { name: "北马其顿", flag: "🇲🇰" },
        ML: { name: "马里", flag: "🇲🇱" },
        MM: { name: "缅甸", flag: "🇲🇲" },
        MN: { name: "蒙古", flag: "🇲🇳" },
        MO: { name: "中国澳门", flag: "🇲🇴" },
        MR: { name: "毛里塔尼亚", flag: "🇲🇷" },
        MT: { name: "马耳他", flag: "🇲🇹" },
        MU: { name: "毛里求斯", flag: "🇲🇺" },
        MV: { name: "马尔代夫", flag: "🇲🇻" },
        MW: { name: "马拉维", flag: "🇲🇼" },
        MX: { name: "墨西哥", flag: "🇲🇽" },
        MY: { name: "马来西亚", flag: "🇲🇾" },
        MZ: { name: "莫桑比克", flag: "🇲🇿" },
        NA: { name: "纳米比亚", flag: "🇳🇦" },
        NE: { name: "尼日尔", flag: "🇳🇪" },
        NG: { name: "尼日利亚", flag: "🇳🇬" },
        NI: { name: "尼加拉瓜", flag: "🇳🇮" },
        NL: { name: "荷兰", flag: "🇳🇱" },
        NO: { name: "挪威", flag: "🇳🇴" },
        NP: { name: "尼泊尔", flag: "🇳🇵" },
        NR: { name: "瑙鲁", flag: "🇳🇷" },
        NZ: { name: "新西兰", flag: "🇳🇿" },
        OM: { name: "阿曼", flag: "🇴🇲" },
        PA: { name: "巴拿马", flag: "🇵🇦" },
        PE: { name: "秘鲁", flag: "🇵🇪" },
        PG: { name: "巴布亚新几内亚", flag: "🇵🇬" },
        PH: { name: "菲律宾", flag: "🇵🇭" },
        PK: { name: "巴基斯坦", flag: "🇵🇰" },
        PL: { name: "波兰", flag: "🇵🇱" },
        PT: { name: "葡萄牙", flag: "🇵🇹" },
        PW: { name: "帕劳", flag: "🇵🇼" },
        PY: { name: "巴拉圭", flag: "🇵🇾" },
        QA: { name: "卡塔尔", flag: "🇶🇦" },
        RO: { name: "罗马尼亚", flag: "🇷🇴" },
        RS: { name: "塞尔维亚", flag: "🇷🇸" },
        RU: { name: "俄罗斯", flag: "🇷🇺" },
        RW: { name: "卢旺达", flag: "🇷🇼" },
        SA: { name: "沙特阿拉伯", flag: "🇸🇦" },
        SB: { name: "所罗门群岛", flag: "🇸🇧" },
        SC: { name: "塞舌尔", flag: "🇸🇨" },
        SD: { name: "苏丹", flag: "🇸🇩" },
        SE: { name: "瑞典", flag: "🇸🇪" },
        SG: { name: "新加坡", flag: "🇸🇬" },
        SI: { name: "斯洛文尼亚", flag: "🇸🇮" },
        SK: { name: "斯洛伐克", flag: "🇸🇰" },
        SL: { name: "塞拉利昂", flag: "🇸🇱" },
        SM: { name: "圣马力诺", flag: "🇸🇲" },
        SN: { name: "塞内加尔", flag: "🇸🇳" },
        SO: { name: "索马里", flag: "🇸🇴" },
        SR: { name: "苏里南", flag: "🇸🇷" },
        SS: { name: "南苏丹", flag: "🇸🇸" },
        ST: { name: "圣多美和普林西比", flag: "🇸🇹" },
        SV: { name: "萨尔瓦多", flag: "🇸🇻" },
        SY: { name: "叙利亚", flag: "🇸🇾" },
        SZ: { name: "斯威士兰", flag: "🇸🇿" },
        TD: { name: "乍得", flag: "🇹🇩" },
        TG: { name: "多哥", flag: "🇹🇬" },
        TH: { name: "泰国", flag: "🇹🇭" },
        TJ: { name: "塔吉克斯坦", flag: "🇹🇯" },
        TL: { name: "东帝汶", flag: "🇹🇱" },
        TM: { name: "土库曼斯坦", flag: "🇹🇲" },
        TN: { name: "突尼斯", flag: "🇹🇳" },
        TO: { name: "汤加", flag: "🇹🇴" },
        TR: { name: "土耳其", flag: "🇹🇷" },
        TT: { name: "特立尼达和多巴哥", flag: "🇹🇹" },
        TV: { name: "图瓦卢", flag: "🇹🇻" },
        TW: { name: "中国台湾", flag: "🇹🇼" },
        TZ: { name: "坦桑尼亚", flag: "🇹🇿" },
        UA: { name: "乌克兰", flag: "🇺🇦" },
        UG: { name: "乌干达", flag: "🇺🇬" },
        US: { name: "美国", flag: "🇺🇸" },
        UY: { name: "乌拉圭", flag: "🇺🇾" },
        UZ: { name: "乌兹别克斯坦", flag: "🇺🇿" },
        VA: { name: "梵蒂冈", flag: "🇻🇦" },
        VC: { name: "圣文森特和格林纳丁斯", flag: "🇻🇨" },
        VE: { name: "委内瑞拉", flag: "🇻🇪" },
        VN: { name: "越南", flag: "🇻🇳" },
        VU: { name: "瓦努阿图", flag: "🇻🇺" },
        WS: { name: "萨摩亚", flag: "🇼🇸" },
        XK: { name: "科索沃", flag: "🇽🇰" },
        YE: { name: "也门", flag: "🇾🇪" },
        ZA: { name: "南非", flag: "🇿🇦" },
        ZM: { name: "赞比亚", flag: "🇿🇲" },
        ZW: { name: "津巴布韦", flag: "🇿🇼" }
      };

      // Full 8/11-char BIC → known bank name
      var KNOWN_BANKS = {
        BOFAUS3N: "Bank of America, NA (US)",
        CITIUS33: "Citibank NA (New York)",
        CHASUS33: "JPMorgan Chase Bank NA",
        WFBIUS6S: "Wells Fargo Bank NA",
        HSBCGB2L: "HSBC Bank plc (London)",
        BARCGB22: "Barclays Bank plc",
        DEUTDEDB: "Deutsche Bank AG",
        BNPAFRPP: "BNP Paribas SA",
        SOGEFRPP: "Societe Generale",
        BSCHESMM: "Banco Santander SA",
        INGBNL2A: "ING Bank NV",
        UBSWCHZH: "UBS AG",
        CRESCHZZ: "Credit Suisse",
        ICBKCNBJ: "Industrial and Commercial Bank of China",
        BKCHCNBJ: "Bank of China",
        CMBCCHNA: "China Merchants Bank",
        PCBCCNBJ: "China Construction Bank",
        ABOCCNBJ: "Agricultural Bank of China",
        DBSSSGSG: "DBS Bank Ltd",
        UOVBSGSG: "United Overseas Bank",
        SCBLSGSG: "Standard Chartered Bank Singapore",
        ANZBAU3M: "Australia and New Zealand Banking Group",
        NATAAU33: "National Australia Bank",
        WPACAU2S: "Westpac Banking Corporation",
        CBAAAU2S: "Commonwealth Bank of Australia",
        NWBKGB2L: "NatWest",
        LLOYGB2L: "Lloyds Bank",
        AIBKIE2D: "Allied Irish Banks",
        BOIIE2D: "Bank of Ireland",
        ABNAAMST: "ABN AMRO Bank NV",
        RAIFCH22: "Raiffeisen Bank International",
        NBPAPLPW: "Narodowy Bank Polski",
        SCBLHKHH: "Standard Chartered Hong Kong",
        HSBCHKHH: "HSBC (Hong Kong)",
        BKCHHKHH: "Bank of China (Hong Kong)"
      };

      // Partial institution code (4 chars) → bank name fallback
      var KNOWN_INST = {
        BOFA: "Bank of America",
        CITI: "Citibank",
        CHAS: "JPMorgan Chase",
        WFBI: "Wells Fargo",
        HSBC: "HSBC",
        BARC: "Barclays",
        DEUT: "Deutsche Bank",
        BNPA: "BNP Paribas",
        SOGE: "Societe Generale",
        INGB: "ING Group",
        UBSW: "UBS",
        CRES: "Credit Suisse",
        ICBK: "ICBC",
        BKCH: "Bank of China",
        CMBC: "China Merchants Bank",
        PCBC: "China Construction Bank",
        ABOC: "Agricultural Bank of China",
        DBSS: "DBS Bank",
        UOVB: "United Overseas Bank",
        SCBL: "Standard Chartered",
        ANZB: "ANZ Banking Group",
        NATA: "National Australia Bank",
        WPAC: "Westpac",
        NWBK: "NatWest",
        LLOY: "Lloyds Bank",
        MIDL: "HSBC (formerly Midland Bank)",
        RBOS: "Royal Bank of Scotland",
        ABNA: "ABN AMRO",
        RAIF: "Raiffeisen",
        NBPA: "Narodowy Bank Polski",
        PKOP: "PKO Bank Polski",
        SMBC: "Sumitomo Mitsui Banking",
        MHCB: "Mizuho Bank",
        TOKY: "MUFG Bank",
        HANV: "KEB Hana Bank",
        AIBK: "Allied Irish Banks",
        BOFI: "Bank of Ireland"
      };

      var EXAMPLES = [
        { code: "BOFAUS3N", label: "美国银行" },
        { code: "CITIUS33", label: "花旗银行" },
        { code: "CHASUS33", label: "摩根大通" },
        { code: "HSBCGB2L", label: "汇丰英国" },
        { code: "BNPAFRPP", label: "法国巴黎银行" },
        { code: "DEUTDEDB", label: "德意志银行" },
        { code: "UBSWCHZH", label: "瑞士联合银行" },
        { code: "ICBKCNBJ", label: "工商银行" },
        { code: "DBSSSGSG", label: "星展银行" },
        { code: "BARCGB22", label: "巴克莱银行" }
      ];

      var swiftInput = document.getElementById("swiftInput");
      var statusEl = document.getElementById("status");
      var resultGrid = document.getElementById("resultGrid");
      var swiftStructure = document.getElementById("swiftStructure");
      var btnCopyEl = document.getElementById("btnCopy");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function validateSwift(code) {
        if (!code) return "请输入 SWIFT/BIC 代码";
        if (code.length !== 8 && code.length !== 11) {
          return "BIC 必须为 8 位或 11 位，当前 " + code.length + " 位";
        }
        var i;
        for (i = 0; i < 4; i++) {
          if (code[i] < "A" || code[i] > "Z") {
            return "前 4 位（银行代码）只能包含字母，第 " + (i + 1) + " 位非法";
          }
        }
        var cc = code.slice(4, 6);
        if (!COUNTRIES[cc]) return '第 5-6 位国家代码 "' + cc + '" 不在 ISO 3166-1 列表中';
        var c;
        for (i = 6; i < 8; i++) {
          c = code[i];
          if (!((c >= "A" && c <= "Z") || (c >= "0" && c <= "9"))) {
            return "第 " + (i + 1) + " 位地点代码含非法字符";
          }
        }
        if (code.length === 11) {
          for (i = 8; i < 11; i++) {
            c = code[i];
            if (!((c >= "A" && c <= "Z") || (c >= "0" && c <= "9"))) {
              return "分行代码（第 9-11 位）含非法字符";
            }
          }
        }
        return null;
      }

      function lookupBank(code) {
        var upper = code.toUpperCase();
        if (KNOWN_BANKS[upper]) return KNOWN_BANKS[upper];
        if (upper.length === 11 && KNOWN_BANKS[upper.slice(0, 8)]) {
          return KNOWN_BANKS[upper.slice(0, 8)];
        }
        var inst = upper.slice(0, 4);
        if (KNOWN_INST[inst]) return KNOWN_INST[inst];
        return null;
      }

      function parseBic(code) {
        var upper = code.toUpperCase().trim();
        var err = validateSwift(upper);
        if (err) {
          showStatus(err, "error");
          swiftInput.classList.add("error");
          swiftStructure.classList.add("hidden");
          resultGrid.classList.add("hidden");
          btnCopyEl.classList.add("hidden");
          return;
        }
        swiftInput.classList.remove("error");

        var bank = upper.slice(0, 4);
        var country = upper.slice(4, 6);
        var location = upper.slice(6, 8);
        var branch = upper.length === 11 ? upper.slice(8, 11) : "XXX";

        // Segmented bar
        document.getElementById("segBank").textContent = bank;
        document.getElementById("segCountry").textContent = country;
        document.getElementById("segLocation").textContent = location;
        document.getElementById("segBranch").textContent = branch;
        swiftStructure.classList.remove("hidden");

        // Results
        document.getElementById("rBank").textContent = bank;

        var countryInfo = COUNTRIES[country];
        document.getElementById("rFlag").textContent = countryInfo ? countryInfo.flag : "";
        document.getElementById("rCountryName").textContent = countryInfo
          ? country + " – " + countryInfo.name
          : country + " （未知地区）";

        // Location: passive participant if first char is digit
        var firstChar = location.charCodeAt(0);
        var isPassive = firstChar >= 48 && firstChar <= 57;
        var locNote = location;
        if (isPassive) locNote += "  （首字符为数字，标识被动参与者）";
        document.getElementById("rLocation").textContent = locNote;

        document.getElementById("rBranch").textContent =
          branch === "XXX" ? "XXX（总行 / Head Office）" : branch;

        document.getElementById("rLength").textContent =
          upper.length === 11 ? "11 位（完整格式，含分行代码）" : "8 位（标准格式，不含分行代码）";

        document.getElementById("rHead").textContent =
          branch === "XXX" ? "是（分行代码 XXX 代表总行）" : "否（" + branch + " 为指定分行）";

        document.getElementById("rPassive").textContent = isPassive
          ? "是（地点代码首位为数字）"
          : "否（地点代码首位为字母）";

        var bankName = lookupBank(upper);
        document.getElementById("rBankName").textContent = bankName || "数据库中暂无此代码记录";

        resultGrid.classList.remove("hidden");
        btnCopyEl.classList.remove("hidden");

        showStatus("解析成功 — " + upper.length + " 位 BIC", "success");

        try {
          history.replaceState(null, "", "#" + upper);
        } catch (e) {
          // ignore
        }
      }

      // Buttons
      document.getElementById("btnLookup").onclick = function () {
        parseBic(swiftInput.value.trim());
      };

      document.getElementById("btnClear").onclick = function () {
        swiftInput.value = "";
        swiftInput.classList.remove("error");
        swiftStructure.classList.add("hidden");
        resultGrid.classList.add("hidden");
        btnCopyEl.classList.add("hidden");
        statusEl.textContent = "";
        statusEl.className = "status";
        try {
          history.replaceState(null, "", location.pathname);
        } catch (e) {
          // ignore
        }
      };

      btnCopyEl.onclick = async function () {
        var val = swiftInput.value.trim().toUpperCase();
        if (!val) return;
        try {
          await navigator.clipboard.writeText(val);
          showStatus("已复制 " + val, "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      swiftInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          parseBic(swiftInput.value.trim());
        }
      });

      swiftInput.addEventListener("input", function () {
        var pos = this.selectionStart;
        this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        this.setSelectionRange(pos, pos);
        if (this.classList.contains("error")) {
          this.classList.remove("error");
          statusEl.textContent = "";
          statusEl.className = "status";
        }
      });

      // Build example chips
      var listEl = document.getElementById("examplesList");
      EXAMPLES.forEach(function (ex) {
        var chip = document.createElement("button");
        chip.className = "example-chip";
        chip.textContent = ex.code + " – " + ex.label;
        chip.addEventListener("click", function () {
          swiftInput.value = ex.code;
          parseBic(ex.code);
          swiftInput.focus();
        });
        listEl.appendChild(chip);
      });

      // Load from URL hash
      (function () {
        var hash = location.hash.slice(1);
        if (hash && /^[A-Z0-9]{8,11}$/i.test(hash)) {
          swiftInput.value = hash.toUpperCase();
          parseBic(hash);
        }
      })();

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
        if (!localStorage.getItem("theme")) {
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        }
      });

      initTheme();
    
