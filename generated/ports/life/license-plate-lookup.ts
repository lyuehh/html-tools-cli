// @ts-nocheck
// Generated from tools/life/license-plate-lookup.html
// Source SHA-256: f75813403cf29033d8799b75192cf34e5b99b3654f2bb63c21c5b1302b9e389f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 车牌数据
      const PLATE_DATA = {
        京: {
          name: "北京市",
          type: "直辖市",
          plates: {
            A: "市区",
            B: "出租车",
            C: "市区",
            D: "市区",
            E: "市区",
            F: "市区",
            G: "市区",
            H: "市区",
            J: "市区",
            K: "市区",
            L: "市区",
            M: "市区",
            N: "市区",
            P: "市区",
            Q: "市区",
            Y: "郊区"
          }
        },
        津: {
          name: "天津市",
          type: "直辖市",
          plates: {
            A: "市区",
            B: "市区",
            C: "市区",
            D: "市区",
            E: "市区",
            F: "市区",
            G: "市区",
            H: "市区",
            J: "市区",
            K: "市区",
            L: "市区",
            M: "市区",
            N: "市区",
            Q: "市区",
            R: "市区"
          }
        },
        沪: {
          name: "上海市",
          type: "直辖市",
          plates: {
            A: "市区",
            B: "市区",
            C: "郊区",
            D: "市区",
            E: "市区",
            F: "市区",
            G: "市区",
            H: "市区",
            J: "市区",
            K: "市区",
            L: "市区",
            M: "市区",
            N: "市区",
            R: "崇明区"
          }
        },
        渝: {
          name: "重庆市",
          type: "直辖市",
          plates: {
            A: "渝中区等",
            B: "江北区等",
            C: "永川区",
            D: "万州区",
            F: "万州区",
            G: "涪陵区",
            H: "黔江区",
            N: "市区"
          }
        },
        冀: {
          name: "河北省",
          type: "省份",
          plates: {
            A: "石家庄市",
            B: "唐山市",
            C: "秦皇岛市",
            D: "邯郸市",
            E: "邢台市",
            F: "保定市",
            G: "张家口市",
            H: "承德市",
            J: "沧州市",
            R: "廊坊市",
            T: "衡水市"
          }
        },
        豫: {
          name: "河南省",
          type: "省份",
          plates: {
            A: "郑州市",
            B: "开封市",
            C: "洛阳市",
            D: "平顶山市",
            E: "安阳市",
            F: "鹤壁市",
            G: "新乡市",
            H: "焦作市",
            J: "濮阳市",
            K: "许昌市",
            L: "漯河市",
            M: "三门峡市",
            N: "商丘市",
            P: "周口市",
            Q: "驻马店市",
            R: "南阳市",
            S: "信阳市",
            U: "济源市"
          }
        },
        云: {
          name: "云南省",
          type: "省份",
          plates: {
            A: "昆明市",
            C: "昭通市",
            D: "曲靖市",
            E: "楚雄州",
            F: "玉溪市",
            G: "红河州",
            H: "文山州",
            J: "思茅地区",
            K: "西双版纳州",
            L: "大理州",
            M: "保山市",
            N: "德宏州",
            P: "丽江市",
            Q: "怒江州",
            R: "迪庆州",
            S: "临沧市"
          }
        },
        辽: {
          name: "辽宁省",
          type: "省份",
          plates: {
            A: "沈阳市",
            B: "大连市",
            C: "鞍山市",
            D: "抚顺市",
            E: "本溪市",
            F: "丹东市",
            G: "锦州市",
            H: "营口市",
            J: "阜新市",
            K: "辽阳市",
            L: "盘锦市",
            M: "铁岭市",
            N: "朝阳市",
            P: "葫芦岛市"
          }
        },
        黑: {
          name: "黑龙江省",
          type: "省份",
          plates: {
            A: "哈尔滨市",
            B: "齐齐哈尔市",
            C: "牡丹江市",
            D: "佳木斯市",
            E: "大庆市",
            F: "伊春市",
            G: "鸡西市",
            H: "鹤岗市",
            J: "双鸭山市",
            K: "七台河市",
            L: "松花江地区",
            M: "绥化市",
            N: "黑河市",
            P: "大兴安岭地区",
            R: "农垦系统"
          }
        },
        湘: {
          name: "湖南省",
          type: "省份",
          plates: {
            A: "长沙市",
            B: "株洲市",
            C: "湘潭市",
            D: "衡阳市",
            E: "邵阳市",
            F: "岳阳市",
            G: "张家界市",
            H: "益阳市",
            J: "常德市",
            K: "娄底市",
            L: "郴州市",
            M: "永州市",
            N: "怀化市",
            U: "湘西州"
          }
        },
        皖: {
          name: "安徽省",
          type: "省份",
          plates: {
            A: "合肥市",
            B: "芜湖市",
            C: "蚌埠市",
            D: "淮南市",
            E: "马鞍山市",
            F: "淮北市",
            G: "铜陵市",
            H: "安庆市",
            J: "黄山市",
            K: "阜阳市",
            L: "宿州市",
            M: "滁州市",
            N: "六安市",
            P: "宣城市",
            Q: "巢湖市",
            R: "池州市",
            S: "亳州市"
          }
        },
        鲁: {
          name: "山东省",
          type: "省份",
          plates: {
            A: "济南市",
            B: "青岛市",
            C: "淄博市",
            D: "枣庄市",
            E: "东营市",
            F: "烟台市",
            G: "潍坊市",
            H: "济宁市",
            J: "泰安市",
            K: "威海市",
            L: "日照市",
            M: "滨州市",
            N: "德州市",
            P: "聊城市",
            Q: "临沂市",
            R: "菏泽市",
            S: "莱芜市",
            U: "青岛增补",
            V: "潍坊增补",
            Y: "烟台增补"
          }
        },
        新: {
          name: "新疆维吾尔自治区",
          type: "自治区",
          plates: {
            A: "乌鲁木齐市",
            B: "昌吉州",
            C: "石河子市",
            D: "奎屯市",
            E: "博尔塔拉州",
            F: "伊犁州",
            G: "塔城地区",
            H: "阿勒泰地区",
            J: "克拉玛依市",
            K: "吐鲁番地区",
            L: "哈密地区",
            M: "巴音郭楞州",
            N: "阿克苏地区",
            P: "克孜勒苏州",
            Q: "喀什地区",
            R: "和田地区"
          }
        },
        苏: {
          name: "江苏省",
          type: "省份",
          plates: {
            A: "南京市",
            B: "无锡市",
            C: "徐州市",
            D: "常州市",
            E: "苏州市",
            F: "南通市",
            G: "连云港市",
            H: "淮安市",
            J: "盐城市",
            K: "扬州市",
            L: "镇江市",
            M: "泰州市",
            N: "宿迁市"
          }
        },
        浙: {
          name: "浙江省",
          type: "省份",
          plates: {
            A: "杭州市",
            B: "宁波市",
            C: "温州市",
            D: "绍兴市",
            E: "湖州市",
            F: "嘉兴市",
            G: "金华市",
            H: "衢州市",
            J: "台州市",
            K: "丽水市",
            L: "舟山市"
          }
        },
        赣: {
          name: "江西省",
          type: "省份",
          plates: {
            A: "南昌市",
            B: "赣州市",
            C: "宜春市",
            D: "吉安市",
            E: "上饶市",
            F: "抚州市",
            G: "九江市",
            H: "景德镇市",
            J: "萍乡市",
            K: "新余市",
            L: "鹰潭市",
            M: "南昌增补"
          }
        },
        鄂: {
          name: "湖北省",
          type: "省份",
          plates: {
            A: "武汉市",
            B: "黄石市",
            C: "十堰市",
            D: "荆州市",
            E: "宜昌市",
            F: "襄阳市",
            G: "鄂州市",
            H: "荆门市",
            J: "黄冈市",
            K: "孝感市",
            L: "咸宁市",
            M: "仙桃市",
            N: "潜江市",
            P: "神农架",
            Q: "恩施州",
            R: "天门市",
            S: "随州市"
          }
        },
        桂: {
          name: "广西壮族自治区",
          type: "自治区",
          plates: {
            A: "南宁市",
            B: "柳州市",
            C: "桂林市",
            D: "梧州市",
            E: "北海市",
            F: "南宁地区",
            G: "柳州地区",
            H: "桂林地区",
            J: "贺州市",
            K: "玉林市",
            L: "百色市",
            M: "河池市",
            N: "钦州市",
            P: "防城港市",
            R: "贵港市"
          }
        },
        甘: {
          name: "甘肃省",
          type: "省份",
          plates: {
            A: "兰州市",
            B: "嘉峪关市",
            C: "金昌市",
            D: "白银市",
            E: "天水市",
            F: "酒泉市",
            G: "张掖市",
            H: "武威市",
            J: "定西市",
            K: "陇南市",
            L: "平凉市",
            M: "庆阳市",
            N: "临夏州",
            P: "甘南州"
          }
        },
        晋: {
          name: "山西省",
          type: "省份",
          plates: {
            A: "太原市",
            B: "大同市",
            C: "阳泉市",
            D: "长治市",
            E: "晋城市",
            F: "朔州市",
            H: "忻州市",
            J: "吕梁市",
            K: "晋中市",
            L: "临汾市",
            M: "运城市"
          }
        },
        蒙: {
          name: "内蒙古自治区",
          type: "自治区",
          plates: {
            A: "呼和浩特市",
            B: "包头市",
            C: "乌海市",
            D: "赤峰市",
            E: "呼伦贝尔市",
            F: "兴安盟",
            G: "通辽市",
            H: "锡林郭勒盟",
            J: "乌兰察布市",
            K: "鄂尔多斯市",
            L: "巴彦淖尔市",
            M: "阿拉善盟"
          }
        },
        陕: {
          name: "陕西省",
          type: "省份",
          plates: {
            A: "西安市",
            B: "铜川市",
            C: "宝鸡市",
            D: "咸阳市",
            E: "渭南市",
            F: "汉中市",
            G: "安康市",
            H: "商洛市",
            J: "延安市",
            K: "榆林市",
            V: "杨凌区"
          }
        },
        吉: {
          name: "吉林省",
          type: "省份",
          plates: {
            A: "长春市",
            B: "吉林市",
            C: "四平市",
            D: "辽源市",
            E: "通化市",
            F: "白山市",
            G: "白城市",
            H: "延边州",
            J: "松原市"
          }
        },
        闽: {
          name: "福建省",
          type: "省份",
          plates: {
            A: "福州市",
            B: "莆田市",
            C: "泉州市",
            D: "厦门市",
            E: "漳州市",
            F: "龙岩市",
            G: "三明市",
            H: "南平市",
            J: "宁德市",
            K: "省直机关"
          }
        },
        贵: {
          name: "贵州省",
          type: "省份",
          plates: {
            A: "贵阳市",
            B: "六盘水市",
            C: "遵义市",
            D: "铜仁市",
            E: "黔西南州",
            F: "毕节市",
            G: "安顺市",
            H: "黔东南州",
            J: "黔南州"
          }
        },
        粤: {
          name: "广东省",
          type: "省份",
          plates: {
            A: "广州市",
            B: "深圳市",
            C: "珠海市",
            D: "汕头市",
            E: "佛山市",
            F: "韶关市",
            G: "湛江市",
            H: "肇庆市",
            J: "江门市",
            K: "茂名市",
            L: "惠州市",
            M: "梅州市",
            N: "汕尾市",
            P: "河源市",
            Q: "阳江市",
            R: "清远市",
            S: "东莞市",
            T: "中山市",
            U: "潮州市",
            V: "揭阳市",
            W: "云浮市",
            X: "顺德区",
            Y: "南海区",
            Z: "港澳入境车"
          }
        },
        川: {
          name: "四川省",
          type: "省份",
          plates: {
            A: "成都市",
            B: "绵阳市",
            C: "自贡市",
            D: "攀枝花市",
            E: "泸州市",
            F: "德阳市",
            H: "广元市",
            J: "遂宁市",
            K: "内江市",
            L: "乐山市",
            M: "资阳市",
            Q: "宜宾市",
            R: "南充市",
            S: "达州市",
            T: "雅安市",
            U: "阿坝州",
            V: "甘孜州",
            W: "凉山州",
            X: "广安市",
            Y: "巴中市",
            Z: "眉山市"
          }
        },
        青: {
          name: "青海省",
          type: "省份",
          plates: {
            A: "西宁市",
            B: "海东市",
            C: "海北州",
            D: "黄南州",
            E: "海南州",
            F: "果洛州",
            G: "玉树州",
            H: "海西州"
          }
        },
        藏: {
          name: "西藏自治区",
          type: "自治区",
          plates: {
            A: "拉萨市",
            B: "昌都市",
            C: "山南市",
            D: "日喀则市",
            E: "那曲市",
            F: "阿里地区",
            G: "林芝市"
          }
        },
        琼: {
          name: "海南省",
          type: "省份",
          plates: {
            A: "海口市",
            B: "三亚市",
            C: "琼北地区",
            D: "五指山等",
            E: "洋浦开发区"
          }
        },
        宁: {
          name: "宁夏回族自治区",
          type: "自治区",
          plates: {
            A: "银川市",
            B: "石嘴山市",
            C: "银南地区",
            D: "固原市",
            E: "中卫市"
          }
        }
      };

      // 省份简称列表
      const PROVINCES = Object.keys(PLATE_DATA);

      // 当前选中的省份
      let currentProvince = "京";

      // 初始化
      function init() {
        // 生成省份标签
        const tabs = document.getElementById("provinceTabs");
        PROVINCES.forEach((p) => {
          const tab = document.createElement("div");
          tab.className = "province-tab" + (p === currentProvince ? " active" : "");
          tab.textContent =
            p + " " + PLATE_DATA[p].name.replace(/省|市|自治区|壮族|回族|维吾尔/g, "");
          tab.onclick = () => selectProvince(p);
          tabs.appendChild(tab);
        });

        // 生成省份简称图例
        const legendGrid = document.getElementById("legendGrid");
        PROVINCES.forEach((p) => {
          const item = document.createElement("div");
          item.className = "legend-item";
          item.innerHTML = `<span class="short">${p}</span><span class="name">${PLATE_DATA[p].name.substring(0, 2)}</span>`;
          item.style.cursor = "pointer";
          item.onclick = () => selectProvince(p);
          legendGrid.appendChild(item);
        });

        // 显示当前省份的车牌
        showProvincePlates(currentProvince);
      }

      /**
       * 选择省份
       */
      function selectProvince(province) {
        currentProvince = province;

        // 更新标签状态
        document.querySelectorAll(".province-tab").forEach((tab) => {
          tab.classList.toggle("active", tab.textContent.startsWith(province));
        });

        showProvincePlates(province);
      }

      /**
       * 显示省份车牌列表
       */
      function showProvincePlates(province) {
        const grid = document.getElementById("plateGrid");
        const data = PLATE_DATA[province];

        grid.innerHTML = "";

        Object.entries(data.plates).forEach(([code, city]) => {
          const item = document.createElement("div");
          item.className = "plate-item";
          item.innerHTML = `<div class="code">${province}${code}</div><div class="city">${city}</div>`;
          item.onclick = () => {
            document.getElementById("plateInput").value = province + code;
            search();
          };
          grid.appendChild(item);
        });
      }

      /**
       * 搜索车牌
       */
      window.search = function () {
        const input = document.getElementById("plateInput").value.trim().toUpperCase();
        const resultBox = document.getElementById("resultBox");

        if (!input) {
          resultBox.classList.remove("show");
          return;
        }

        // 提取省份简称和字母
        const province = input[0];
        const code = input[1] || "";

        if (!PLATE_DATA[province]) {
          document.getElementById("resultPlate").textContent = input;
          document.getElementById("resultLocation").textContent = "未找到该省份";
          document.getElementById("resultDetail").textContent = "请检查输入是否正确";
          resultBox.classList.add("show");
          return;
        }

        const data = PLATE_DATA[province];
        let city = "该省份";

        if (code && data.plates[code]) {
          city = data.plates[code];
        }

        document.getElementById("resultPlate").textContent =
          input.substring(0, 2) + (input.length > 2 ? " " + input.substring(2) : "");
        document.getElementById("resultLocation").textContent =
          data.name + (code ? " · " + city : "");
        document.getElementById("resultDetail").textContent = data.type;
        resultBox.classList.add("show");

        // 切换到对应省份
        selectProvince(province);
      };

      /**
       * 主题切换
       */
      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      // 初始化
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
      init();
    
