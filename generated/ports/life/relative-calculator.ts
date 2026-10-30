// @ts-nocheck
// Generated from tools/life/relative-calculator.html
// Source SHA-256: 7b6be51f73b3ace066f5357b50753011147c95574acf2b39434eac1e8abfb4ec
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 关系链
      let relations = [];

      // 关系名称映射
      const RELATION_NAMES = {
        f: "父亲",
        m: "母亲",
        h: "丈夫",
        w: "妻子",
        ob: "哥哥",
        lb: "弟弟",
        os: "姐姐",
        ls: "妹妹",
        s: "儿子",
        d: "女儿",
        xb: "兄弟",
        xs: "姐妹"
      };

      // 称呼数据库 - 简化版本，覆盖常见亲戚
      const TITLES = {
        // 直系长辈
        f: { title: "爸爸/父亲", reverse: "儿子/女儿" },
        m: { title: "妈妈/母亲", reverse: "儿子/女儿" },
        "f,f": { title: "爷爷", reverse: "孙子/孙女" },
        "f,m": { title: "奶奶", reverse: "孙子/孙女" },
        "m,f": { title: "外公/姥爷", reverse: "外孙/外孙女" },
        "m,m": { title: "外婆/姥姥", reverse: "外孙/外孙女" },
        "f,f,f": { title: "曾祖父", reverse: "曾孙/曾孙女" },
        "f,f,m": { title: "曾祖母", reverse: "曾孙/曾孙女" },
        "m,m,m": { title: "外曾祖母", reverse: "外曾孙/外曾孙女" },
        "m,m,f": { title: "外曾祖父", reverse: "外曾孙/外曾孙女" },

        // 直系晚辈
        s: { title: "儿子", reverse: "爸爸/妈妈" },
        d: { title: "女儿", reverse: "爸爸/妈妈" },
        "s,s": { title: "孙子", reverse: "爷爷/奶奶" },
        "s,d": { title: "孙女", reverse: "爷爷/奶奶" },
        "d,s": { title: "外孙", reverse: "外公/外婆" },
        "d,d": { title: "外孙女", reverse: "外公/外婆" },

        // 兄弟姐妹
        ob: { title: "哥哥", reverse: "弟弟/妹妹" },
        lb: { title: "弟弟", reverse: "哥哥/姐姐" },
        os: { title: "姐姐", reverse: "弟弟/妹妹" },
        ls: { title: "妹妹", reverse: "哥哥/姐姐" },
        xb: { title: "兄弟", reverse: "兄弟/姐妹" },
        xs: { title: "姐妹", reverse: "兄弟/姐妹" },

        // 配偶
        h: { title: "丈夫/老公", reverse: "妻子/老婆" },
        w: { title: "妻子/老婆", reverse: "丈夫/老公" },

        // 父亲的兄弟姐妹
        "f,ob": { title: "伯父", reverse: "侄子/侄女" },
        "f,lb": { title: "叔叔", reverse: "侄子/侄女" },
        "f,xb": { title: "伯父/叔叔", reverse: "侄子/侄女" },
        "f,os": { title: "姑姑", reverse: "侄子/侄女" },
        "f,ls": { title: "姑姑", reverse: "侄子/侄女" },
        "f,xs": { title: "姑姑", reverse: "侄子/侄女" },

        // 母亲的兄弟姐妹
        "m,ob": { title: "舅舅", reverse: "外甥/外甥女" },
        "m,lb": { title: "舅舅", reverse: "外甥/外甥女" },
        "m,xb": { title: "舅舅", reverse: "外甥/外甥女" },
        "m,os": { title: "姨妈", reverse: "外甥/外甥女" },
        "m,ls": { title: "姨妈", reverse: "外甥/外甥女" },
        "m,xs": { title: "姨妈", reverse: "外甥/外甥女" },

        // 伯父叔叔的配偶
        "f,ob,w": { title: "伯母", reverse: "侄子/侄女" },
        "f,lb,w": { title: "婶婶", reverse: "侄子/侄女" },
        "f,xb,w": { title: "伯母/婶婶", reverse: "侄子/侄女" },

        // 姑姑的配偶
        "f,os,h": { title: "姑父", reverse: "内侄/内侄女" },
        "f,ls,h": { title: "姑父", reverse: "内侄/内侄女" },
        "f,xs,h": { title: "姑父", reverse: "内侄/内侄女" },

        // 舅舅的配偶
        "m,ob,w": { title: "舅妈", reverse: "外甥/外甥女" },
        "m,lb,w": { title: "舅妈", reverse: "外甥/外甥女" },
        "m,xb,w": { title: "舅妈", reverse: "外甥/外甥女" },

        // 姨妈的配偶
        "m,os,h": { title: "姨父", reverse: "外甥/外甥女" },
        "m,ls,h": { title: "姨父", reverse: "外甥/外甥女" },
        "m,xs,h": { title: "姨父", reverse: "外甥/外甥女" },

        // 堂兄弟姐妹（父亲的兄弟的子女）
        "f,ob,s": { title: "堂哥/堂弟", reverse: "堂弟/堂妹" },
        "f,ob,d": { title: "堂姐/堂妹", reverse: "堂弟/堂妹" },
        "f,lb,s": { title: "堂哥/堂弟", reverse: "堂哥/堂姐" },
        "f,lb,d": { title: "堂姐/堂妹", reverse: "堂哥/堂姐" },
        "f,xb,s": { title: "堂兄弟", reverse: "堂兄弟/堂姐妹" },
        "f,xb,d": { title: "堂姐妹", reverse: "堂兄弟/堂姐妹" },

        // 表兄弟姐妹（父亲的姐妹的子女）
        "f,os,s": { title: "表哥/表弟", reverse: "表弟/表妹" },
        "f,os,d": { title: "表姐/表妹", reverse: "表弟/表妹" },
        "f,ls,s": { title: "表哥/表弟", reverse: "表哥/表姐" },
        "f,ls,d": { title: "表姐/表妹", reverse: "表哥/表姐" },
        "f,xs,s": { title: "表兄弟", reverse: "表兄弟/表姐妹" },
        "f,xs,d": { title: "表姐妹", reverse: "表兄弟/表姐妹" },

        // 表兄弟姐妹（母亲的兄弟姐妹的子女）
        "m,ob,s": { title: "表哥/表弟", reverse: "表弟/表妹" },
        "m,ob,d": { title: "表姐/表妹", reverse: "表弟/表妹" },
        "m,lb,s": { title: "表哥/表弟", reverse: "表哥/表姐" },
        "m,lb,d": { title: "表姐/表妹", reverse: "表哥/表姐" },
        "m,xb,s": { title: "表兄弟", reverse: "表兄弟/表姐妹" },
        "m,xb,d": { title: "表姐妹", reverse: "表兄弟/表姐妹" },
        "m,os,s": { title: "表哥/表弟", reverse: "表弟/表妹" },
        "m,os,d": { title: "表姐/表妹", reverse: "表弟/表妹" },
        "m,ls,s": { title: "表哥/表弟", reverse: "表哥/表姐" },
        "m,ls,d": { title: "表姐/表妹", reverse: "表哥/表姐" },
        "m,xs,s": { title: "表兄弟", reverse: "表兄弟/表姐妹" },
        "m,xs,d": { title: "表姐妹", reverse: "表兄弟/表姐妹" },

        // 兄弟姐妹的子女
        "ob,s": { title: "侄子", reverse: "叔叔/姑姑" },
        "ob,d": { title: "侄女", reverse: "叔叔/姑姑" },
        "lb,s": { title: "侄子", reverse: "伯父/姑姑" },
        "lb,d": { title: "侄女", reverse: "伯父/姑姑" },
        "xb,s": { title: "侄子", reverse: "伯父/叔叔/姑姑" },
        "xb,d": { title: "侄女", reverse: "伯父/叔叔/姑姑" },
        "os,s": { title: "外甥", reverse: "舅舅/姨妈" },
        "os,d": { title: "外甥女", reverse: "舅舅/姨妈" },
        "ls,s": { title: "外甥", reverse: "舅舅/姨妈" },
        "ls,d": { title: "外甥女", reverse: "舅舅/姨妈" },
        "xs,s": { title: "外甥", reverse: "舅舅/姨妈" },
        "xs,d": { title: "外甥女", reverse: "舅舅/姨妈" },

        // 兄弟姐妹的配偶
        "ob,w": { title: "嫂子", reverse: "小叔子/小姑子" },
        "lb,w": { title: "弟妹", reverse: "大伯子/大姑子" },
        "xb,w": { title: "嫂子/弟妹", reverse: "叔子/姑子" },
        "os,h": { title: "姐夫", reverse: "小舅子/小姨子" },
        "ls,h": { title: "妹夫", reverse: "大舅子/大姨子" },
        "xs,h": { title: "姐夫/妹夫", reverse: "舅子/姨子" },

        // 配偶的父母
        "h,f": { title: "公公", reverse: "儿媳" },
        "h,m": { title: "婆婆", reverse: "儿媳" },
        "w,f": { title: "岳父", reverse: "女婿" },
        "w,m": { title: "岳母", reverse: "女婿" },

        // 配偶的兄弟姐妹
        "h,ob": { title: "大伯子", reverse: "弟妹" },
        "h,lb": { title: "小叔子", reverse: "嫂子" },
        "h,xb": { title: "叔子", reverse: "嫂子/弟妹" },
        "h,os": { title: "大姑子", reverse: "弟妹" },
        "h,ls": { title: "小姑子", reverse: "嫂子" },
        "h,xs": { title: "姑子", reverse: "嫂子/弟妹" },
        "w,ob": { title: "大舅子", reverse: "妹夫" },
        "w,lb": { title: "小舅子", reverse: "姐夫" },
        "w,xb": { title: "舅子", reverse: "姐夫/妹夫" },
        "w,os": { title: "大姨子", reverse: "妹夫" },
        "w,ls": { title: "小姨子", reverse: "姐夫" },
        "w,xs": { title: "姨子", reverse: "姐夫/妹夫" },

        // 子女的配偶
        "s,w": { title: "儿媳妇", reverse: "公公/婆婆" },
        "d,h": { title: "女婿", reverse: "岳父/岳母" },

        // 连襟妯娌
        "h,ob,w": { title: "妯娌", reverse: "妯娌" },
        "h,lb,w": { title: "妯娌", reverse: "妯娌" },
        "h,xb,w": { title: "妯娌", reverse: "妯娌" },
        "w,os,h": { title: "连襟", reverse: "连襟" },
        "w,ls,h": { title: "连襟", reverse: "连襟" },
        "w,xs,h": { title: "连襟", reverse: "连襟" }
      };

      /**
       * 添加关系
       */
      window.addRelation = function (rel) {
        relations.push(rel);
        updatePath();
      };

      /**
       * 撤销最后一个关系
       */
      window.undoRelation = function () {
        if (relations.length > 0) {
          relations.pop();
          updatePath();
        }
      };

      /**
       * 清空所有关系
       */
      window.clearRelation = function () {
        relations = [];
        updatePath();
        document.getElementById("resultBox").classList.remove("show");
      };

      /**
       * 更新关系链显示
       */
      function updatePath() {
        const pathEl = document.getElementById("relationPath");

        if (relations.length === 0) {
          pathEl.innerHTML =
            '<span class="relation-placeholder">点击下方按钮添加关系，如：父亲 → 的 → 哥哥 = 伯父</span>';
          return;
        }

        let html = '<span style="color: var(--accent-cyan); font-weight: 500;">我</span>';

        relations.forEach((rel, index) => {
          html += '<span class="relation-arrow">→</span>';
          html += `<span class="relation-item">${RELATION_NAMES[rel]}<span class="remove" onclick="removeRelation(${index}); event.stopPropagation();">×</span></span>`;
        });

        pathEl.innerHTML = html;
      }

      /**
       * 删除指定位置的关系
       */
      window.removeRelation = function (index) {
        relations.splice(index, 1);
        updatePath();
      };

      /**
       * 计算称呼
       */
      window.calculate = function () {
        if (relations.length === 0) {
          alert("请先添加亲戚关系");
          return;
        }

        const key = relations.join(",");
        const result = TITLES[key];

        const resultBox = document.getElementById("resultBox");
        const resultTitle = document.getElementById("resultTitle");
        const resultReverse = document.getElementById("resultReverse");

        if (result) {
          resultTitle.textContent = result.title;
          resultReverse.innerHTML = `TA应该叫你：<strong>${result.reverse}</strong>`;
        } else {
          // 尝试简化关系
          resultTitle.textContent = "关系较复杂";
          resultReverse.textContent = "建议拆分查询或咨询长辈";
        }

        resultBox.classList.add("show");
      };

      /**
       * 设置示例
       */
      window.setExample = function (rels) {
        relations = [...rels];
        updatePath();
        calculate();
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
    
