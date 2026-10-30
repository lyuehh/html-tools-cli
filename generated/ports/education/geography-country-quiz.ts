// @ts-nocheck
// Generated from tools/education/geography-country-quiz.html
// Source SHA-256: ab569a0d24e727df6c77e5e41ab64d03e8c4c360e3515e27c6d28016707fa7f6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ==================== Country Data ====================
      // [name, capital, continent, flag_emoji]
      var ALL_COUNTRIES = [
        ["中国", "北京", "亚洲", "🇨🇳"],
        ["日本", "东京", "亚洲", "🇯🇵"],
        ["韩国", "首尔", "亚洲", "🇰🇷"],
        ["印度", "新德里", "亚洲", "🇮🇳"],
        ["巴基斯坦", "伊斯兰堡", "亚洲", "🇵🇰"],
        ["孟加拉国", "达卡", "亚洲", "🇧🇩"],
        ["斯里兰卡", "科伦坡", "亚洲", "🇱🇰"],
        ["尼泊尔", "加德满都", "亚洲", "🇳🇵"],
        ["不丹", "廷布", "亚洲", "🇧🇹"],
        ["马尔代夫", "马累", "亚洲", "🇲🇻"],
        ["阿富汗", "喀布尔", "亚洲", "🇦🇫"],
        ["伊朗", "德黑兰", "亚洲", "🇮🇷"],
        ["伊拉克", "巴格达", "亚洲", "🇮🇶"],
        ["叙利亚", "大马士革", "亚洲", "🇸🇾"],
        ["黎巴嫩", "贝鲁特", "亚洲", "🇱🇧"],
        ["约旦", "安曼", "亚洲", "🇯🇴"],
        ["以色列", "耶路銣冷", "亚洲", "🇮🇱"],
        ["沙特阿拉伯", "利雅得", "亚洲", "🇸🇦"],
        ["也门", "萨那", "亚洲", "🇾🇪"],
        ["阿联酋", "阿布札比", "亚洲", "🇦🇪"],
        ["卡塔尔", "多哈", "亚洲", "🇶🇦"],
        ["科威特", "科威特城", "亚洲", "🇰🇼"],
        ["巴林", "麦纳麦", "亚洲", "🇧🇭"],
        ["阿曼", "马斯喀特", "亚洲", "🇴🇲"],
        ["土耳其", "安卡拉", "亚洲", "🇹🇷"],
        ["格鲁吉亚", "第比利斯", "亚洲", "🇬🇪"],
        ["亚美尼亚", "埃里温", "亚洲", "🇦🇲"],
        ["阿塞拜疆", "巴库", "亚洲", "🇦🇿"],
        ["哈萨克斯坦", "阿斯塔纳", "亚洲", "🇰🇿"],
        ["乌兹别克斯坦", "塔什干", "亚洲", "🇺🇿"],
        ["土库曼斯坦", "阿什哈巴德", "亚洲", "🇹🇲"],
        ["吉尔吉斯斯坦", "比什凯克", "亚洲", "🇰🇬"],
        ["塔吉克斯坦", "杜尚别", "亚洲", "🇹🇯"],
        ["蒙古", "乌兰巴托", "亚洲", "🇲🇳"],
        ["缅甸", "内比都", "亚洲", "🇲🇲"],
        ["泰国", "曼谷", "亚洲", "🇹🇭"],
        ["越南", "河内", "亚洲", "🇻🇳"],
        ["老挝", "万象", "亚洲", "🇱🇦"],
        ["柬埔寨", "金边", "亚洲", "🇰🇭"],
        ["马来西亚", "吉隆坡", "亚洲", "🇲🇾"],
        ["新加坡", "新加坡", "亚洲", "🇸🇬"],
        ["印度尼西亚", "雅加达", "亚洲", "🇮🇩"],
        ["菲律宾", "马尼拉", "亚洲", "🇵🇭"],
        ["文莱", "斯里巴加湾市", "亚洲", "🇧🇳"],
        ["东帝汶", "帝力", "亚洲", "🇹🇱"],
        ["朝鲜", "平壤", "亚洲", "🇰🇵"],
        ["巴勒斯坦", "拉姆安拉", "亚洲", "🇵🇸"],
        ["塞浦路斯", "尼科西亚", "亚洲", "🇨🇾"],
        ["俄罗斯", "莫斯科", "欧洲", "🇷🇺"],
        ["德国", "柏林", "欧洲", "🇩🇪"],
        ["法国", "巴黎", "欧洲", "🇫🇷"],
        ["英国", "伦敦", "欧洲", "🇬🇧"],
        ["意大利", "罗马", "欧洲", "🇮🇹"],
        ["西班牙", "马德里", "欧洲", "🇪🇸"],
        ["葡萄牙", "里斯本", "欧洲", "🇵🇹"],
        ["荷兰", "阿姆斯特丹", "欧洲", "🇳🇱"],
        ["比利时", "布鲁塞尔", "欧洲", "🇧🇪"],
        ["卢森堡", "卢森堡城", "欧洲", "🇱🇺"],
        ["瑞士", "伯尔尼", "欧洲", "🇨🇭"],
        ["奥地利", "维也纳", "欧洲", "🇦🇹"],
        ["波兰", "华沙", "欧洲", "🇵🇱"],
        ["捷克", "布拉格", "欧洲", "🇨🇿"],
        ["斯洛伐克", "布拉迪斯拉发", "欧洲", "🇸🇰"],
        ["匈牙利", "布达佩斯特", "欧洲", "🇭🇺"],
        ["罗马尼亚", "布加勒斯特", "欧洲", "🇷🇴"],
        ["保加利亚", "索非亚", "欧洲", "🇧🇬"],
        ["希腊", "雅典", "欧洲", "🇬🇷"],
        ["克罗地亚", "萨格勒布", "欧洲", "🇭🇷"],
        ["塞尔维亚", "贝尔格莱德", "欧洲", "🇷🇸"],
        ["波黑", "萨拉热窝", "欧洲", "🇧🇦"],
        ["斯洛文尼亚", "卢布尔雅那", "欧洲", "🇸🇮"],
        ["北马其顿", "斯科普里", "欧洲", "🇲🇰"],
        ["阿尔巴尼亚", "地拉那", "欧洲", "🇦🇱"],
        ["黑山", "波德戈里察", "欧洲", "🇲🇪"],
        ["科索沃", "普里什蒂纳", "欧洲", "🇽🇰"],
        ["乌克兰", "基辅", "欧洲", "🇺🇦"],
        ["白俄罗斯", "明斯克", "欧洲", "🇧🇾"],
        ["摩尔多瓦", "基希讷乌", "欧洲", "🇲🇩"],
        ["爱沙尼亚", "塔林", "欧洲", "🇪🇪"],
        ["拉脱维亚", "里加", "欧洲", "🇱🇻"],
        ["立陶宛", "维尔纽斯", "欧洲", "🇱🇹"],
        ["芬兰", "赫尔辛基", "欧洲", "🇫🇮"],
        ["瑞典", "斯德哥尔摩", "欧洲", "🇸🇪"],
        ["挪威", "奥斯陆", "欧洲", "🇳🇴"],
        ["丹麦", "哥本哈根", "欧洲", "🇩🇰"],
        ["冰岛", "雷克雅未克", "欧洲", "🇮🇸"],
        ["爱尔兰", "都柏林", "欧洲", "🇮🇪"],
        ["马耳他", "瓦莱塔", "欧洲", "🇲🇹"],
        ["安道尔", "安道尔城", "欧洲", "🇦🇩"],
        ["摩纳哥", "摩纳哥城", "欧洲", "🇲🇨"],
        ["列支敦士登", "瓦杜兹", "欧洲", "🇱🇮"],
        ["圣马力诺", "圣马力诺城", "欧洲", "🇸🇲"],
        ["梵蒂冈", "梵蒂冈城", "欧洲", "🇻🇦"],
        ["埃及", "开罗", "非洲", "🇪🇬"],
        ["利比亚", "的黎波里", "非洲", "🇱🇾"],
        ["突尼斯", "突尼斯城", "非洲", "🇹🇳"],
        ["阿尔及利亚", "阿尔及尔", "非洲", "🇩🇿"],
        ["摩洛哥", "拉巴特", "非洲", "🇲🇦"],
        ["毛里塔尼亚", "努瓦克肖特", "非洲", "🇲🇷"],
        ["塞内加尔", "达喀尔", "非洲", "🇸🇳"],
        ["冈比亚", "班珠尔", "非洲", "🇬🇲"],
        ["几内亚比绍", "比绍", "非洲", "🇬🇼"],
        ["几内亚", "科纳克里", "非洲", "🇬🇳"],
        ["塞拉利昂", "弗里敦", "非洲", "🇸🇱"],
        ["利比里亚", "蒙罗维亚", "非洲", "🇱🇷"],
        ["科特迪瓦", "亚穆苏克第金", "非洲", "🇨🇮"],
        ["加纳", "阿克拉", "非洲", "🇬🇭"],
        ["多哥", "洪美", "非洲", "🇹🇬"],
        ["贝宁", "波多诺伏", "非洲", "🇧🇯"],
        ["布基纳法索", "瓦加杜古", "非洲", "🇧🇫"],
        ["马里", "巴马科", "非洲", "🇲🇱"],
        ["尼日尔", "尼亚美", "非洲", "🇳🇪"],
        ["乍得", "恩贾梅纳", "非洲", "🇹🇩"],
        ["尼日利亚", "阿布贾", "非洲", "🇳🇬"],
        ["喀麦隆", "雅温得", "非洲", "🇨🇲"],
        ["赤道几内亚", "马拉博", "非洲", "🇬🇶"],
        ["加蓬", "利伯维尔", "非洲", "🇬🇦"],
        ["刚果共和国", "布拉柴维尔", "非洲", "🇨🇬"],
        ["刚果民主共和国", "金沙萨", "非洲", "🇨🇩"],
        ["中非共和国", "班吉", "非洲", "🇨🇫"],
        ["苏丹", "喀土穆", "非洲", "🇸🇩"],
        ["南苏丹", "朱巴", "非洲", "🇸🇸"],
        ["埃塞俄比亚", "亚的斯亚贝巴", "非洲", "🇪🇹"],
        ["厂特里亚", "阿斯马拉", "非洲", "🇪🇷"],
        ["吉布提", "吉布提市", "非洲", "🇩🇯"],
        ["索马里", "摩加迪沙", "非洲", "🇸🇴"],
        ["肃尼亚", "内罗毕", "非洲", "🇰🇪"],
        ["坦桑尼亚", "多多马", "非洲", "🇹🇿"],
        ["卢旺达", "基加利", "非洲", "🇷🇼"],
        ["布隆迪", "布球布拉", "非洲", "🇧🇮"],
        ["赞比亚", "卢萨卡", "非洲", "🇿🇲"],
        ["马拉威", "利隆圭", "非洲", "🇲🇼"],
        ["莫桑比克", "马普托", "非洲", "🇲🇿"],
        ["津巴布韦", "哈拉雷", "非洲", "🇿🇼"],
        ["南非", "比勒托利亚", "非洲", "🇿🇦"],
        ["斯威士兰", "姆巴巴内", "非洲", "🇸🇿"],
        ["莱索托", "马塞卢", "非洲", "🇱🇸"],
        ["马达加斯加", "塔那那利佛", "非洲", "🇲🇬"],
        ["科摩罗", "莫罗尼", "非洲", "🇰🇲"],
        ["毛里求斯", "路易港", "非洲", "🇲🇺"],
        ["塞舌尔", "维多利亚", "非洲", "🇸🇨"],
        ["圣多美和普林西比", "圣多美", "非洲", "🇸🇹"],
        ["佛得角", "普拉亚", "非洲", "🇨🇻"],
        ["安哥拉", "罗安达", "非洲", "🇦🇴"],
        ["美国", "华盛顿", "北美洲", "🇺🇸"],
        ["加拿大", "渥太华", "北美洲", "🇨🇦"],
        ["墨西哥", "墨西哥城", "北美洲", "🇲🇽"],
        ["危地马拉", "危地马拉城", "北美洲", "🇬🇹"],
        ["伯利兹", "贝尔莫潘", "北美洲", "🇧🇿"],
        ["洪都拉斯", "特古西加尔巴", "北美洲", "🇭🇳"],
        ["萨尔瓦多", "圣萨尔瓦多", "北美洲", "🇸🇻"],
        ["尼加拉瓜", "马那瓜", "北美洲", "🇳🇮"],
        ["哥斯达黎加", "圣何塞", "北美洲", "🇨🇷"],
        ["巴拿马", "巴拿马城", "北美洲", "🇵🇦"],
        ["古巴", "哈瓦那", "北美洲", "🇨🇺"],
        ["牙买加", "金斯顿", "北美洲", "🇯🇲"],
        ["海地", "太子港", "北美洲", "🇭🇹"],
        ["多米尼加", "圣多明各", "北美洲", "🇩🇴"],
        ["波多黎加", "圣多明各", "北美洲", "🇩🇴"],
        ["波多黎加共和国", "圣多明各", "北美洲", "🇩🇴"],
        ["特立尼达和多巴哥", "西班牙港", "北美洲", "🇹🇹"],
        ["巴巴多斯", "布里奇顿", "北美洲", "🇧🇧"],
        ["圣卢西亚", "卡斯特里", "北美洲", "🇱🇨"],
        ["安提瓜和巴布达", "圣约翰", "北美洲", "🇦🇬"],
        ["格林纳达", "圣乔治", "北美洲", "🇬🇩"],
        ["多米尼克", "罗索", "北美洲", "🇩🇲"],
        ["圣基茨和尼维斯", "巴斯特尔", "北美洲", "🇰🇳"],
        ["圣文森特和格林纳丁斯", "金斯敦", "北美洲", "🇻🇨"],
        ["巴哈马", "拿拿索", "北美洲", "🇧🇸"],
        ["巴西", "巴西利亚", "南美洲", "🇧🇷"],
        ["阿根廷", "布宜诺斯艾利斯", "南美洲", "🇦🇷"],
        ["智利", "圣地亚哥", "南美洲", "🇨🇱"],
        ["哥伦比亚", "波哥大", "南美洲", "🇨🇴"],
        ["委内瑞拉", "加拉加斯", "南美洲", "🇻🇪"],
        ["秘鲁", "利马", "南美洲", "🇵🇪"],
        ["厄瓜多尔", "基多", "南美洲", "🇪🇨"],
        ["玻利维亚", "苏克雷", "南美洲", "🇧🇴"],
        ["巴拉圭", "亚松森", "南美洲", "🇵🇾"],
        ["乌拉圭", "蒙得维的亚", "南美洲", "🇺🇾"],
        ["圭亚那", "乔治敦", "南美洲", "🇬🇾"],
        ["苏里南", "帕拉马里博", "南美洲", "🇸🇷"],
        ["澳大利亚", "堪培拉", "大洋洲", "🇦🇺"],
        ["新西兰", "惠灵顿", "大洋洲", "🇳🇿"],
        ["巴布亚新几内亚", "莫尔兹比港", "大洋洲", "🇵🇬"],
        ["斐济", "苏瓦", "大洋洲", "🇫🇯"],
        ["所罗门群岛", "霍尼亚拉", "大洋洲", "🇸🇧"],
        ["瓦冪阿图", "维拉港", "大洋洲", "🇻🇺"],
        ["萨摩亚", "阿皮亚", "大洋洲", "🇼🇸"],
        ["汤加", "努库阿洛法", "大洋洲", "🇹🇴"],
        ["基里巴斯", "南塔拉瓦", "大洋洲", "🇰🇮"],
        ["瑙鲁", "亚伦", "大洋洲", "🇳🇷"],
        ["图瓦卢", "富纳富提", "大洋洲", "🇹🇻"],
        ["密克罗尼西亚联邦", "帕利基尔", "大洋洲", "🇫🇲"],
        ["帕劳", "恩吉鲁层德", "大洋洲", "🇵🇼"],
        ["马绍尔群岛", "马机罗", "大洋洲", "🇲🇭"]
      ];

      // ==================== State ====================
      var quizMode = "flag";
      var selectedRegions = ["all"];
      var quizQueue = [];
      var wrongItems = [];
      var currentIdx = 0;
      var correctCount = 0;
      var wrongCount = 0;
      var totalCount = 0;
      var answered = false;

      // ==================== DOM refs ====================
      var startScreen = document.getElementById("startScreen");
      var quizScreen = document.getElementById("quizScreen");
      var resultScreen = document.getElementById("resultScreen");
      var questionFlag = document.getElementById("questionFlag");
      var questionText = document.getElementById("questionText");
      var questionPrompt = document.getElementById("questionPrompt");
      var optionsGrid = document.getElementById("optionsGrid");
      var feedbackText = document.getElementById("feedbackText");
      var feedbackHint = document.getElementById("feedbackHint");
      var btnNext = document.getElementById("btnNext");
      var btnRetryWrong = document.getElementById("btnRetryWrong");
      var btnRetryWrongResult = document.getElementById("btnRetryWrongResult");
      var progressFill = document.getElementById("progressFill");
      var progressLabel = document.getElementById("progressLabel");

      // ==================== Helpers ====================
      function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = a[i];
          a[i] = a[j];
          a[j] = tmp;
        }
        return a;
      }

      function getFilteredCountries() {
        if (selectedRegions.indexOf("all") !== -1) return ALL_COUNTRIES;
        return ALL_COUNTRIES.filter(function (c) {
          return selectedRegions.indexOf(c[2]) !== -1;
        });
      }

      function getDistractors(correct, pool, count) {
        var others = pool.filter(function (c) {
          return c !== correct;
        });
        return shuffle(others).slice(0, count);
      }

      function getPromptText() {
        if (quizMode === "flag") return "看国旗，猜国家名称";
        if (quizMode === "capital") return "看首都，猜国家名称";
        return "看国家，猜所在大洲";
      }

      function buildQuestion(country, pool) {
        if (quizMode === "flag") {
          var distractors = getDistractors(country, pool, 3).map(function (c) {
            return c[0];
          });
          return {
            displayFlag: country[3],
            displayText: "",
            correctAnswer: country[0],
            distractors: distractors
          };
        }
        if (quizMode === "capital") {
          var distractors2 = getDistractors(country, pool, 3).map(function (c) {
            return c[0];
          });
          return {
            displayFlag: "",
            displayText: country[1],
            correctAnswer: country[0],
            distractors: distractors2
          };
        }
        var continents = ["亚洲", "欧洲", "非洲", "北美洲", "南美洲", "大洋洲"];
        var distractorConts = shuffle(
          continents.filter(function (c) {
            return c !== country[2];
          })
        ).slice(0, 3);
        return {
          displayFlag: country[3],
          displayText: country[0],
          correctAnswer: country[2],
          distractors: distractorConts
        };
      }

      function updateScoreBoard() {
        document.getElementById("scoreCorrect").textContent = correctCount;
        document.getElementById("scoreWrong").textContent = wrongCount;
        var answered2 = correctCount + wrongCount;
        var rate = answered2 > 0 ? Math.round((correctCount / answered2) * 100) + "%" : "—";
        document.getElementById("scoreRate").textContent = rate;
        document.getElementById("scoreRemain").textContent = totalCount - currentIdx;
        var pct = totalCount > 0 ? Math.round((currentIdx / totalCount) * 100) : 0;
        progressFill.style.width = pct + "%";
        progressLabel.textContent = currentIdx + " / " + totalCount;
      }

      // ==================== Quiz flow ====================
      function startQuiz(countries) {
        quizQueue = shuffle(countries);
        wrongItems = [];
        currentIdx = 0;
        correctCount = 0;
        wrongCount = 0;
        totalCount = quizQueue.length;
        answered = false;

        startScreen.style.display = "none";
        resultScreen.classList.remove("show");
        quizScreen.style.display = "flex";

        btnRetryWrong.style.display = "none";
        questionPrompt.textContent = getPromptText();

        updateScoreBoard();
        showQuestion();
      }

      function showQuestion() {
        if (currentIdx >= totalCount) {
          showResult();
          return;
        }
        answered = false;
        feedbackText.textContent = "";
        feedbackHint.textContent = "";
        feedbackText.className = "feedback-text";
        btnNext.style.display = "none";

        var country = quizQueue[currentIdx];
        var pool = getFilteredCountries();
        var q = buildQuestion(country, pool);

        questionFlag.textContent = q.displayFlag;
        questionText.textContent = q.displayText;

        var allOptions = shuffle([q.correctAnswer].concat(q.distractors));
        optionsGrid.innerHTML = "";
        allOptions.forEach(function (opt) {
          var btn = document.createElement("button");
          btn.className = "option-btn";
          btn.textContent = opt;
          btn.dataset.answer = opt;
          btn.onclick = function () {
            handleAnswer(btn, q.correctAnswer, country);
          };
          optionsGrid.appendChild(btn);
        });
        updateScoreBoard();
      }

      function handleAnswer(clickedBtn, correctAnswer, country) {
        if (answered) return;
        answered = true;

        var allBtns = optionsGrid.querySelectorAll(".option-btn");
        allBtns.forEach(function (b) {
          b.disabled = true;
          if (b.dataset.answer === correctAnswer) b.classList.add("correct");
        });

        if (clickedBtn.dataset.answer === correctAnswer) {
          clickedBtn.classList.add("correct");
          feedbackText.textContent = "回答正确！";
          feedbackText.className = "feedback-text correct";
          feedbackHint.textContent = buildHint(country);
          correctCount++;
        } else {
          clickedBtn.classList.add("wrong");
          feedbackText.textContent = "回答错误";
          feedbackText.className = "feedback-text wrong";
          feedbackHint.textContent = "正确答案：" + correctAnswer + " · " + buildHint(country);
          wrongCount++;
          wrongItems.push(country);
        }

        currentIdx++;
        updateScoreBoard();

        if (wrongItems.length > 0) btnRetryWrong.style.display = "";
        btnNext.style.display = "";
      }

      function buildHint(country) {
        return country[0] + " · 首都：" + country[1] + " · " + country[2] + " " + country[3];
      }

      function showResult() {
        quizScreen.style.display = "none";
        resultScreen.classList.add("show");

        var rate = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
        document.getElementById("resCorrect").textContent = correctCount;
        document.getElementById("resWrong").textContent = wrongCount;
        document.getElementById("resRate").textContent = rate + "%";

        var emoji = "🏆";
        var title = "测验完成！";
        if (rate >= 90) {
          emoji = "🏆";
          title = "完美！地理达人！";
        } else if (rate >= 70) {
          emoji = "🌟";
          title = "不错！继续加油！";
        } else if (rate >= 50) {
          emoji = "📚";
          title = "还需努力，多练几次！";
        } else {
          emoji = "🌍";
          title = "加油！重新练习一下！";
        }
        document.getElementById("resultEmoji").textContent = emoji;
        document.getElementById("resultTitle").textContent = title;

        var wrongListWrap = document.getElementById("wrongListWrap");
        var wrongListItems = document.getElementById("wrongListItems");
        if (wrongItems.length > 0) {
          btnRetryWrongResult.style.display = "";
          wrongListWrap.classList.add("show");
          wrongListItems.innerHTML = "";
          wrongItems.forEach(function (c) {
            var item = document.createElement("div");
            item.className = "wrong-item";
            var flagDiv = document.createElement("div");
            flagDiv.className = "wrong-item-flag";
            flagDiv.textContent = c[3];
            var infoDiv = document.createElement("div");
            infoDiv.className = "wrong-item-info";
            var nameDiv = document.createElement("div");
            nameDiv.className = "wrong-item-name";
            nameDiv.textContent = c[0];
            var detailDiv = document.createElement("div");
            detailDiv.className = "wrong-item-detail";
            detailDiv.textContent = "首都：" + c[1] + " · " + c[2];
            infoDiv.appendChild(nameDiv);
            infoDiv.appendChild(detailDiv);
            item.appendChild(flagDiv);
            item.appendChild(infoDiv);
            wrongListItems.appendChild(item);
          });
        } else {
          btnRetryWrongResult.style.display = "none";
          wrongListWrap.classList.remove("show");
        }
      }

      function retryWrong() {
        var pool = getFilteredCountries();
        var base = wrongItems.slice();
        if (base.length < 4) {
          var extra = shuffle(
            pool.filter(function (c) {
              return base.indexOf(c) === -1;
            })
          ).slice(0, 4 - base.length);
          base = base.concat(extra);
        }
        startQuiz(base);
      }

      // ==================== Event listeners ====================
      document.querySelectorAll(".mode-card").forEach(function (card) {
        card.onclick = function () {
          quizMode = card.dataset.mode;
          document.querySelectorAll(".mode-card").forEach(function (c) {
            c.classList.remove("selected");
          });
          card.classList.add("selected");
        };
      });

      document.getElementById("regionChips").onclick = function (e) {
        var chip = e.target.closest(".region-chip");
        if (!chip) return;
        var region = chip.dataset.region;
        var allChip = document.querySelector('.region-chip[data-region="all"]');
        if (region === "all") {
          selectedRegions = ["all"];
          document.querySelectorAll(".region-chip").forEach(function (c) {
            c.classList.remove("selected");
          });
          chip.classList.add("selected");
        } else {
          var idx = selectedRegions.indexOf("all");
          if (idx !== -1) selectedRegions.splice(idx, 1);
          allChip.classList.remove("selected");
          var ri = selectedRegions.indexOf(region);
          if (ri !== -1) {
            selectedRegions.splice(ri, 1);
            chip.classList.remove("selected");
          } else {
            selectedRegions.push(region);
            chip.classList.add("selected");
          }
          if (selectedRegions.length === 0) {
            selectedRegions = ["all"];
            allChip.classList.add("selected");
          }
        }
      };

      document.getElementById("btnStart").onclick = function () {
        var pool = getFilteredCountries();
        if (pool.length < 4) {
          alert("所选大洲的国家数量不足 4 个，请选择更多大洲。");
          return;
        }
        startQuiz(pool);
      };

      document.getElementById("btnRestart").onclick = function () {
        startQuiz(getFilteredCountries());
      };

      btnRetryWrong.onclick = retryWrong;
      btnRetryWrongResult.onclick = retryWrong;

      document.getElementById("btnPlayAgain").onclick = function () {
        startQuiz(getFilteredCountries());
      };

      document.getElementById("btnBackToStart").onclick = function () {
        resultScreen.classList.remove("show");
        quizScreen.style.display = "none";
        startScreen.style.display = "flex";
      };

      btnNext.onclick = showQuestion;

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
    
