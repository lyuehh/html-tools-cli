// @ts-nocheck
// Generated from tools/text/emoji-search.html
// Source SHA-256: b9157a36e55fce5343dc11b84f149f7fa942d0a75f36ff7edd636faefad2695b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };
      initTheme();

      // Emoji data with Chinese keywords
      const emojiData = {
        "😀笑脸": [
          { e: "😀", k: "grinning 笑 开心 高兴" },
          { e: "😃", k: "smiley 笑 开心 大笑" },
          { e: "😄", k: "smile 笑 开心 眯眼" },
          { e: "😁", k: "grin 笑 露齿" },
          { e: "😆", k: "laughing 大笑 哈哈" },
          { e: "😅", k: "sweat smile 尴尬 汗" },
          { e: "🤣", k: "rofl 笑哭 笑死" },
          { e: "😂", k: "joy 笑哭 开心" },
          { e: "🙂", k: "slightly smiling 微笑" },
          { e: "😊", k: "blush 害羞 微笑" },
          { e: "😇", k: "innocent 天使 乖" },
          { e: "🥰", k: "smiling hearts 喜欢 爱心" },
          { e: "😍", k: "heart eyes 爱心 喜欢 花痴" },
          { e: "🤩", k: "star struck 星星眼 崇拜" },
          { e: "😘", k: "kissing heart 飞吻 亲亲" },
          { e: "😗", k: "kissing 亲亲" },
          { e: "😚", k: "kissing closed eyes 亲亲" },
          { e: "😙", k: "kissing smiling eyes 亲亲" },
          { e: "🥲", k: "smiling tear 感动 流泪" },
          { e: "😋", k: "yum 好吃 馋" },
          { e: "😛", k: "stuck out tongue 吐舌" },
          { e: "😜", k: "wink tongue 调皮" },
          { e: "🤪", k: "zany 疯狂 搞怪" },
          { e: "😝", k: "squinting tongue 吐舌" },
          { e: "🤑", k: "money 发财 钱" },
          { e: "🤗", k: "hugging 拥抱 抱抱" },
          { e: "🤭", k: "hand over mouth 捂嘴 偷笑" },
          { e: "🤫", k: "shushing 嘘 安静" },
          { e: "🤔", k: "thinking 思考 想" }
        ],
        "😢表情": [
          { e: "😐", k: "neutral 无语 面无表情" },
          { e: "😑", k: "expressionless 无语" },
          { e: "😶", k: "no mouth 沉默 无语" },
          { e: "😏", k: "smirk 得意 奸笑" },
          { e: "😒", k: "unamused 不高兴 嫌弃" },
          { e: "🙄", k: "roll eyes 翻白眼 无语" },
          { e: "😬", k: "grimacing 尴尬 龇牙" },
          { e: "😮‍💨", k: "exhaling 叹气" },
          { e: "🤥", k: "lying 说谎 匹诺曹" },
          { e: "😌", k: "relieved 放松 满足" },
          { e: "😔", k: "pensive 沮丧 难过" },
          { e: "😪", k: "sleepy 困 瞌睡" },
          { e: "🤤", k: "drooling 流口水 馋" },
          { e: "😴", k: "sleeping 睡觉 困" },
          { e: "😷", k: "mask 口罩 生病" },
          { e: "🤒", k: "thermometer 发烧 生病" },
          { e: "🤕", k: "bandage 受伤 绷带" },
          { e: "🤢", k: "nauseated 恶心 想吐" },
          { e: "🤮", k: "vomiting 吐 呕吐" },
          { e: "🤧", k: "sneezing 打喷嚏 感冒" },
          { e: "🥵", k: "hot 热 出汗" },
          { e: "🥶", k: "cold 冷 冻" },
          { e: "😵", k: "dizzy 晕 头晕" },
          { e: "🤯", k: "exploding head 爆炸 震惊" },
          { e: "😱", k: "scream 尖叫 害怕" },
          { e: "😨", k: "fearful 害怕 恐惧" },
          { e: "😰", k: "anxious 焦虑 紧张" },
          { e: "😥", k: "sad 难过 失望" },
          { e: "😢", k: "cry 哭 流泪" },
          { e: "😭", k: "sob 大哭 哭泣" },
          { e: "😤", k: "triumph 生气 哼" },
          { e: "😡", k: "angry 生气 愤怒" },
          { e: "😠", k: "rage 生气 恼怒" },
          { e: "🤬", k: "cursing 骂人 愤怒" }
        ],
        "👋手势": [
          { e: "👋", k: "wave 挥手 你好 再见" },
          { e: "🤚", k: "raised back 手背" },
          { e: "🖐️", k: "hand 手掌 五" },
          { e: "✋", k: "raised hand 举手 停" },
          { e: "🖖", k: "vulcan 瓦肯 星际迷航" },
          { e: "👌", k: "ok 好的 完美" },
          { e: "🤌", k: "pinched 捏 意大利" },
          { e: "🤏", k: "pinching 一点点 小" },
          { e: "✌️", k: "victory 胜利 耶" },
          { e: "🤞", k: "crossed fingers 祈祷 好运" },
          { e: "🤟", k: "love you 爱你 摇滚" },
          { e: "🤘", k: "rock 摇滚 金属" },
          { e: "🤙", k: "call me 打电话 冲浪" },
          { e: "👈", k: "left 左 指向" },
          { e: "👉", k: "right 右 指向" },
          { e: "👆", k: "up 上 指向" },
          { e: "👇", k: "down 下 指向" },
          { e: "☝️", k: "index up 第一 注意" },
          { e: "👍", k: "thumbs up 赞 好" },
          { e: "👎", k: "thumbs down 踩 差" },
          { e: "✊", k: "fist 拳头 加油" },
          { e: "👊", k: "punch 拳头 打" },
          { e: "🤛", k: "left fist 拳头 碰拳" },
          { e: "🤜", k: "right fist 拳头 碰拳" },
          { e: "👏", k: "clap 鼓掌 拍手" },
          { e: "🙌", k: "raised hands 举手 庆祝" },
          { e: "🤝", k: "handshake 握手 合作" },
          { e: "🙏", k: "pray 祈祷 拜托 谢谢" }
        ],
        "❤️爱心": [
          { e: "❤️", k: "red heart 红心 爱心 喜欢" },
          { e: "🧡", k: "orange heart 橙心" },
          { e: "💛", k: "yellow heart 黄心" },
          { e: "💚", k: "green heart 绿心" },
          { e: "💙", k: "blue heart 蓝心" },
          { e: "💜", k: "purple heart 紫心" },
          { e: "🖤", k: "black heart 黑心" },
          { e: "🤍", k: "white heart 白心" },
          { e: "🤎", k: "brown heart 棕心" },
          { e: "💔", k: "broken heart 心碎 分手" },
          { e: "❤️‍🔥", k: "heart fire 火热 激情" },
          { e: "❤️‍🩹", k: "mending heart 修复 愈合" },
          { e: "💕", k: "two hearts 双心" },
          { e: "💞", k: "revolving hearts 旋转心" },
          { e: "💓", k: "beating heart 心跳" },
          { e: "💗", k: "growing heart 膨胀心" },
          { e: "💖", k: "sparkling heart 闪亮心" },
          { e: "💘", k: "cupid 丘比特 箭心" },
          { e: "💝", k: "gift heart 礼物心" },
          { e: "💟", k: "heart decoration 心形装饰" }
        ],
        "🐱动物": [
          { e: "🐶", k: "dog 狗 汪" },
          { e: "🐱", k: "cat 猫 喵" },
          { e: "🐭", k: "mouse 老鼠" },
          { e: "🐹", k: "hamster 仓鼠" },
          { e: "🐰", k: "rabbit 兔子" },
          { e: "🦊", k: "fox 狐狸" },
          { e: "🐻", k: "bear 熊" },
          { e: "🐼", k: "panda 熊猫" },
          { e: "🐨", k: "koala 考拉" },
          { e: "🐯", k: "tiger 老虎" },
          { e: "🦁", k: "lion 狮子" },
          { e: "🐮", k: "cow 牛" },
          { e: "🐷", k: "pig 猪" },
          { e: "🐸", k: "frog 青蛙" },
          { e: "🐵", k: "monkey 猴子" },
          { e: "🐔", k: "chicken 鸡" },
          { e: "🐧", k: "penguin 企鹅" },
          { e: "🐦", k: "bird 鸟" },
          { e: "🦆", k: "duck 鸭子" },
          { e: "🦅", k: "eagle 鹰" },
          { e: "🦉", k: "owl 猫头鹰" },
          { e: "🐴", k: "horse 马" },
          { e: "🦄", k: "unicorn 独角兽" },
          { e: "🐝", k: "bee 蜜蜂" },
          { e: "🦋", k: "butterfly 蝴蝶" },
          { e: "🐛", k: "bug 虫子 毛毛虫" },
          { e: "🐌", k: "snail 蜗牛" },
          { e: "🐙", k: "octopus 章鱼" },
          { e: "🦀", k: "crab 螃蟹" },
          { e: "🐠", k: "fish 鱼" },
          { e: "🐬", k: "dolphin 海豚" },
          { e: "🐳", k: "whale 鲸鱼" },
          { e: "🦈", k: "shark 鲨鱼" }
        ],
        "🍎食物": [
          { e: "🍎", k: "apple 苹果" },
          { e: "🍐", k: "pear 梨" },
          { e: "🍊", k: "orange 橙子 橘子" },
          { e: "🍋", k: "lemon 柠檬" },
          { e: "🍌", k: "banana 香蕉" },
          { e: "🍉", k: "watermelon 西瓜" },
          { e: "🍇", k: "grapes 葡萄" },
          { e: "🍓", k: "strawberry 草莓" },
          { e: "🫐", k: "blueberries 蓝莓" },
          { e: "🍑", k: "peach 桃子" },
          { e: "🥭", k: "mango 芒果" },
          { e: "🍍", k: "pineapple 菠萝" },
          { e: "🥥", k: "coconut 椰子" },
          { e: "🥝", k: "kiwi 猕猴桃" },
          { e: "🍅", k: "tomato 番茄 西红柿" },
          { e: "🥑", k: "avocado 牛油果" },
          { e: "🥦", k: "broccoli 西兰花" },
          { e: "🥬", k: "leafy green 青菜" },
          { e: "🥒", k: "cucumber 黄瓜" },
          { e: "🌶️", k: "pepper 辣椒" },
          { e: "🌽", k: "corn 玉米" },
          { e: "🥕", k: "carrot 胡萝卜" },
          { e: "🧄", k: "garlic 大蒜" },
          { e: "🧅", k: "onion 洋葱" },
          { e: "🍞", k: "bread 面包" },
          { e: "🥐", k: "croissant 羊角包" },
          { e: "🍕", k: "pizza 披萨" },
          { e: "🍔", k: "burger 汉堡" },
          { e: "🍟", k: "fries 薯条" },
          { e: "🌭", k: "hot dog 热狗" },
          { e: "🍿", k: "popcorn 爆米花" },
          { e: "🍜", k: "noodles 面条 拉面" },
          { e: "🍣", k: "sushi 寿司" },
          { e: "🍱", k: "bento 便当" },
          { e: "🍛", k: "curry 咖喱饭" },
          { e: "🍚", k: "rice 米饭" },
          { e: "🍙", k: "rice ball 饭团" },
          { e: "🥟", k: "dumpling 饺子" },
          { e: "🍦", k: "ice cream 冰淇淋" },
          { e: "🍰", k: "cake 蛋糕" },
          { e: "🎂", k: "birthday cake 生日蛋糕" },
          { e: "☕", k: "coffee 咖啡" },
          { e: "🍵", k: "tea 茶" },
          { e: "🍺", k: "beer 啤酒" },
          { e: "🍷", k: "wine 红酒" }
        ],
        "🚗交通": [
          { e: "🚗", k: "car 汽车 小汽车" },
          { e: "🚕", k: "taxi 出租车" },
          { e: "🚌", k: "bus 公交车 巴士" },
          { e: "🚎", k: "trolleybus 电车" },
          { e: "🚐", k: "minibus 面包车" },
          { e: "🚑", k: "ambulance 救护车" },
          { e: "🚒", k: "fire engine 消防车" },
          { e: "🚓", k: "police car 警车" },
          { e: "🚲", k: "bicycle 自行车 单车" },
          { e: "🛵", k: "scooter 摩托车 电动车" },
          { e: "🏍️", k: "motorcycle 摩托车" },
          { e: "🚄", k: "train 高铁 火车" },
          { e: "🚅", k: "bullet train 动车 高铁" },
          { e: "🚇", k: "metro 地铁" },
          { e: "✈️", k: "airplane 飞机" },
          { e: "🚀", k: "rocket 火箭" },
          { e: "🛸", k: "ufo 飞碟" },
          { e: "🚁", k: "helicopter 直升机" },
          { e: "⛵", k: "sailboat 帆船" },
          { e: "🚢", k: "ship 轮船 船" }
        ],
        "⚽运动": [
          { e: "⚽", k: "soccer 足球" },
          { e: "🏀", k: "basketball 篮球" },
          { e: "🏈", k: "football 橄榄球" },
          { e: "⚾", k: "baseball 棒球" },
          { e: "🥎", k: "softball 垒球" },
          { e: "🎾", k: "tennis 网球" },
          { e: "🏐", k: "volleyball 排球" },
          { e: "🏓", k: "ping pong 乒乓球" },
          { e: "🏸", k: "badminton 羽毛球" },
          { e: "⛳", k: "golf 高尔夫" },
          { e: "🏊", k: "swimming 游泳" },
          { e: "🏃", k: "running 跑步" },
          { e: "🚴", k: "cycling 骑车" },
          { e: "🧘", k: "yoga 瑜伽" },
          { e: "🏋️", k: "weight lifting 举重 健身" },
          { e: "🤸", k: "gymnastics 体操" },
          { e: "⛷️", k: "skiing 滑雪" },
          { e: "🏂", k: "snowboarding 滑雪板" },
          { e: "🎯", k: "darts 飞镖 目标" },
          { e: "🎮", k: "gaming 游戏 电竞" },
          { e: "🎲", k: "dice 骰子" },
          { e: "🏆", k: "trophy 奖杯 冠军" },
          { e: "🥇", k: "gold medal 金牌 第一" },
          { e: "🥈", k: "silver medal 银牌 第二" },
          { e: "🥉", k: "bronze medal 铜牌 第三" }
        ],
        "🎉物品": [
          { e: "🎉", k: "party 派对 庆祝" },
          { e: "🎊", k: "confetti 彩带 庆祝" },
          { e: "🎈", k: "balloon 气球" },
          { e: "🎁", k: "gift 礼物" },
          { e: "🎀", k: "ribbon 蝴蝶结 丝带" },
          { e: "🔔", k: "bell 铃铛 通知" },
          { e: "📱", k: "phone 手机" },
          { e: "💻", k: "laptop 电脑 笔记本" },
          { e: "🖥️", k: "desktop 台式机 电脑" },
          { e: "⌨️", k: "keyboard 键盘" },
          { e: "🖱️", k: "mouse 鼠标" },
          { e: "📷", k: "camera 相机" },
          { e: "🔍", k: "magnifying glass 放大镜 搜索" },
          { e: "💡", k: "light bulb 灯泡 想法" },
          { e: "🔋", k: "battery 电池" },
          { e: "🔌", k: "plug 插头" },
          { e: "📚", k: "books 书 书籍" },
          { e: "📝", k: "memo 备忘录 笔记" },
          { e: "✏️", k: "pencil 铅笔" },
          { e: "📌", k: "pushpin 图钉 固定" },
          { e: "📎", k: "paperclip 回形针" },
          { e: "🔑", k: "key 钥匙" },
          { e: "🔒", k: "lock 锁 安全" },
          { e: "🔓", k: "unlock 解锁" },
          { e: "💰", k: "money bag 钱袋 有钱" },
          { e: "💵", k: "dollar 美元 钱" },
          { e: "💴", k: "yen 日元 钱" },
          { e: "💳", k: "credit card 信用卡 银行卡" }
        ],
        "🌟符号": [
          { e: "⭐", k: "star 星星 收藏" },
          { e: "🌟", k: "glowing star 闪亮 星星" },
          { e: "✨", k: "sparkles 闪闪 亮晶晶" },
          { e: "💫", k: "dizzy 头晕 星星" },
          { e: "🔥", k: "fire 火 热门 厉害" },
          { e: "💥", k: "boom 爆炸" },
          { e: "💢", k: "anger 生气 愤怒" },
          { e: "💦", k: "sweat 汗 水滴" },
          { e: "💧", k: "droplet 水滴" },
          { e: "💤", k: "zzz 睡觉 困" },
          { e: "✅", k: "check mark 完成 对" },
          { e: "❌", k: "cross mark 错误 取消" },
          { e: "❓", k: "question 问号 疑问" },
          { e: "❗", k: "exclamation 感叹号 注意" },
          { e: "⚠️", k: "warning 警告" },
          { e: "🔴", k: "red circle 红色 圆" },
          { e: "🟠", k: "orange circle 橙色 圆" },
          { e: "🟡", k: "yellow circle 黄色 圆" },
          { e: "🟢", k: "green circle 绿色 圆" },
          { e: "🔵", k: "blue circle 蓝色 圆" },
          { e: "🟣", k: "purple circle 紫色 圆" },
          { e: "⚪", k: "white circle 白色 圆" },
          { e: "⚫", k: "black circle 黑色 圆" },
          { e: "🔶", k: "orange diamond 橙色 菱形" },
          { e: "🔷", k: "blue diamond 蓝色 菱形" },
          { e: "▶️", k: "play 播放" },
          { e: "⏸️", k: "pause 暂停" },
          { e: "⏹️", k: "stop 停止" },
          { e: "➕", k: "plus 加" },
          { e: "➖", k: "minus 减" },
          { e: "➗", k: "divide 除" },
          { e: "✖️", k: "multiply 乘" },
          { e: "♻️", k: "recycle 回收 循环" },
          { e: "💯", k: "hundred 一百 满分" }
        ]
      };

      let currentCategory = null;
      let recentEmojis = JSON.parse(localStorage.getItem("recentEmojis") || "[]");

      function renderCategories() {
        const container = document.getElementById("categories");
        container.innerHTML = `
                <button class="category-btn active" onclick="showCategory(null)">全部</button>
                ${Object.keys(emojiData)
                  .map(
                    (cat) =>
                      `<button class="category-btn" onclick="showCategory('${cat}')">${cat}</button>`
                  )
                  .join("")}
            `;
      }

      window.showCategory = function (cat) {
        currentCategory = cat;
        document.getElementById("searchInput").value = "";

        document.querySelectorAll(".category-btn").forEach((btn) => {
          btn.classList.toggle(
            "active",
            (cat === null && btn.textContent === "全部") || btn.textContent === cat
          );
        });

        renderEmojis();
      };

      function renderEmojis(searchTerm = "") {
        const container = document.getElementById("emojiContainer");
        let emojis = [];

        const categories = currentCategory ? [currentCategory] : Object.keys(emojiData);

        for (const cat of categories) {
          for (const item of emojiData[cat]) {
            if (!searchTerm || item.k.toLowerCase().includes(searchTerm.toLowerCase())) {
              emojis.push(item);
            }
          }
        }

        if (emojis.length === 0) {
          container.innerHTML = `
                    <div class="no-results">
                        <div class="icon">🔍</div>
                        <div>没有找到匹配的 Emoji</div>
                    </div>
                `;
          document.getElementById("stats").textContent = "";
          return;
        }

        container.innerHTML = `
                <div class="emoji-grid">
                    ${emojis
                      .map(
                        (item) =>
                          `<div class="emoji-item" onclick="copyEmoji('${item.e}')" title="${item.k}">${item.e}</div>`
                      )
                      .join("")}
                </div>
            `;

        document.getElementById("stats").textContent = `共 ${emojis.length} 个 Emoji`;
      }

      window.searchEmoji = function () {
        const term = document.getElementById("searchInput").value;
        renderEmojis(term);
      };

      window.copyEmoji = function (emoji) {
        navigator.clipboard.writeText(emoji);

        // Show copied feedback
        event.target.classList.add("copied");
        setTimeout(() => event.target.classList.remove("copied"), 500);

        // Show toast
        const toast = document.getElementById("toast");
        toast.querySelector(".emoji").textContent = emoji;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 1500);

        // Add to recent
        addToRecent(emoji);
      };

      function addToRecent(emoji) {
        recentEmojis = recentEmojis.filter((e) => e !== emoji);
        recentEmojis.unshift(emoji);
        recentEmojis = recentEmojis.slice(0, 20);
        localStorage.setItem("recentEmojis", JSON.stringify(recentEmojis));
        renderRecent();
      }

      function renderRecent() {
        const section = document.getElementById("recentSection");
        const grid = document.getElementById("recentGrid");

        if (recentEmojis.length === 0) {
          section.style.display = "none";
          return;
        }

        section.style.display = "block";
        grid.innerHTML = recentEmojis
          .map((e) => `<div class="recent-item" onclick="copyEmoji('${e}')">${e}</div>`)
          .join("");
      }

      // Initialize
      renderCategories();
      renderEmojis();
      renderRecent();
    
