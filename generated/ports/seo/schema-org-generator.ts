// @ts-nocheck
// Generated from tools/seo/schema-org-generator.html
// Source SHA-256: b98226c05ffecb730e190ab48d7314c038def307793705e11b3cc538cc302dd0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var faqCounter = 0;
      var breadcrumbCounter = 0;

      var schemaTypeEl = document.getElementById("schemaType");
      var formPanelEl = document.getElementById("formPanel");
      var outputEl = document.getElementById("output");
      var statusEl = document.getElementById("status");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      /* ── field builder helpers ── */
      function makeGroup(labelText, required) {
        var g = document.createElement("div");
        g.className = "field-group";
        var lbl = document.createElement("label");
        lbl.className = "field-label";
        lbl.textContent = labelText;
        if (required) {
          var req = document.createElement("span");
          req.className = "required";
          req.textContent = " *";
          lbl.appendChild(req);
        }
        g.appendChild(lbl);
        return g;
      }

      function makeInput(id, placeholder, type) {
        var inp = document.createElement("input");
        inp.type = type || "text";
        inp.id = id;
        inp.className = "field-input";
        inp.placeholder = placeholder || "";
        return inp;
      }

      function makeTextarea(id, placeholder, rows) {
        var ta = document.createElement("textarea");
        ta.id = id;
        ta.className = "field-input";
        ta.placeholder = placeholder || "";
        if (rows) ta.rows = rows;
        return ta;
      }

      function makeDivider(text) {
        var d = document.createElement("div");
        d.className = "section-divider";
        d.textContent = text;
        return d;
      }

      function field(labelText, element, required) {
        var g = makeGroup(labelText, required);
        g.appendChild(element);
        return g;
      }

      /* ── form renderers per type ── */
      function renderArticleForm() {
        formPanelEl.innerHTML = "";
        formPanelEl.appendChild(makeDivider("文章信息"));
        formPanelEl.appendChild(field("标题", makeInput("a_headline", "文章标题", "text"), true));
        formPanelEl.appendChild(
          field("描述", makeTextarea("a_description", "文章摘要（建议 150 字以内）", 3))
        );
        formPanelEl.appendChild(
          field("页面 URL", makeInput("a_url", "https://example.com/article", "url"), true)
        );
        formPanelEl.appendChild(
          field("封面图 URL", makeInput("a_image", "https://example.com/image.jpg", "url"))
        );
        formPanelEl.appendChild(
          field("发布时间", makeInput("a_datePublished", "", "datetime-local"))
        );
        formPanelEl.appendChild(
          field("修改时间", makeInput("a_dateModified", "", "datetime-local"))
        );
        formPanelEl.appendChild(makeDivider("作者信息"));
        formPanelEl.appendChild(field("作者姓名", makeInput("a_authorName", "张三"), true));
        formPanelEl.appendChild(
          field("作者主页 URL", makeInput("a_authorUrl", "https://example.com/author", "url"))
        );
        formPanelEl.appendChild(makeDivider("发布机构"));
        formPanelEl.appendChild(field("机构名称", makeInput("a_publisherName", "WebUtils"), true));
        formPanelEl.appendChild(
          field(
            "机构 Logo URL",
            makeInput("a_publisherLogo", "https://example.com/logo.png", "url")
          )
        );
      }

      function renderFaqForm() {
        faqCounter = 0;
        formPanelEl.innerHTML = "";
        formPanelEl.appendChild(makeDivider("FAQ 条目"));
        var list = document.createElement("div");
        list.className = "faq-items";
        list.id = "faqList";
        formPanelEl.appendChild(list);
        addFaqItem();

        var addBtn = document.createElement("button");
        addBtn.className = "btn-add-faq";
        addBtn.id = "addFaqBtn";
        addBtn.textContent = "+ 添加问答条目";
        addBtn.addEventListener("click", addFaqItem);
        formPanelEl.appendChild(addBtn);
      }

      function addFaqItem() {
        faqCounter++;
        var list = document.getElementById("faqList");
        var item = document.createElement("div");
        item.className = "faq-item";
        item.id = "faqItem" + faqCounter;

        var header = document.createElement("div");
        header.className = "faq-item-header";

        var num = document.createElement("span");
        num.className = "faq-item-num";
        num.textContent = "问答 #" + faqCounter;
        header.appendChild(num);

        var removeBtn = document.createElement("button");
        removeBtn.className = "btn-remove";
        removeBtn.textContent = "✕";
        removeBtn.setAttribute("aria-label", "删除此条目");
        var capturedId = faqCounter;
        removeBtn.addEventListener("click", function () {
          var el = document.getElementById("faqItem" + capturedId);
          if (el) el.remove();
        });
        header.appendChild(removeBtn);
        item.appendChild(header);

        var qGroup = document.createElement("div");
        qGroup.className = "field-group";
        var qLabel = document.createElement("label");
        qLabel.className = "field-label";
        qLabel.textContent = "问题";
        var qInput = makeInput("faq_q_" + faqCounter, "用户常问的问题...");
        qGroup.appendChild(qLabel);
        qGroup.appendChild(qInput);
        item.appendChild(qGroup);

        var aGroup = document.createElement("div");
        aGroup.className = "field-group";
        var aLabel = document.createElement("label");
        aLabel.className = "field-label";
        aLabel.textContent = "回答";
        var aInput = makeTextarea("faq_a_" + faqCounter, "对应的详细回答...", 3);
        aGroup.appendChild(aLabel);
        aGroup.appendChild(aInput);
        item.appendChild(aGroup);

        list.appendChild(item);
      }

      function renderProductForm() {
        formPanelEl.innerHTML = "";
        formPanelEl.appendChild(makeDivider("产品基本信息"));
        formPanelEl.appendChild(field("产品名称", makeInput("p_name", "产品名称"), true));
        formPanelEl.appendChild(field("产品描述", makeTextarea("p_description", "产品描述...", 3)));
        formPanelEl.appendChild(
          field("产品图片 URL", makeInput("p_image", "https://example.com/product.jpg", "url"))
        );
        formPanelEl.appendChild(field("品牌名称", makeInput("p_brand", "品牌名")));
        formPanelEl.appendChild(field("SKU / 货号", makeInput("p_sku", "SKU-001")));
        formPanelEl.appendChild(makeDivider("价格与库存"));
        formPanelEl.appendChild(field("价格", makeInput("p_price", "99.00", "number")));
        formPanelEl.appendChild(field("货币代码", makeInput("p_currency", "CNY")));
        var availEl = document.createElement("select");
        availEl.id = "p_availability";
        availEl.className = "field-input";
        [
          ["InStock", "有货 (InStock)"],
          ["OutOfStock", "缺货 (OutOfStock)"],
          ["PreOrder", "预售 (PreOrder)"],
          ["LimitedAvailability", "限量 (LimitedAvailability)"]
        ].forEach(function (opt) {
          var o = document.createElement("option");
          o.value = opt[0];
          o.textContent = opt[1];
          availEl.appendChild(o);
        });
        formPanelEl.appendChild(field("库存状态", availEl));
        formPanelEl.appendChild(makeDivider("评分（可选）"));
        var ratingRow = document.createElement("div");
        ratingRow.className = "rating-row";
        var ratingGroup = makeGroup("平均评分 (0-5)");
        ratingGroup.appendChild(makeInput("p_ratingValue", "4.5", "number"));
        var countGroup = makeGroup("评分数量");
        countGroup.appendChild(makeInput("p_ratingCount", "128", "number"));
        ratingRow.appendChild(ratingGroup);
        ratingRow.appendChild(countGroup);
        formPanelEl.appendChild(ratingRow);
      }

      function renderLocalBusinessForm() {
        formPanelEl.innerHTML = "";
        formPanelEl.appendChild(makeDivider("商家信息"));
        formPanelEl.appendChild(field("商家名称", makeInput("lb_name", "张三餐厅"), true));
        formPanelEl.appendChild(field("简介", makeTextarea("lb_description", "商家简介...", 2)));
        formPanelEl.appendChild(field("电话", makeInput("lb_phone", "+86-010-12345678", "tel")));
        formPanelEl.appendChild(
          field("官网 URL", makeInput("lb_url", "https://example.com", "url"))
        );
        formPanelEl.appendChild(
          field("图片 URL", makeInput("lb_image", "https://example.com/store.jpg", "url"))
        );
        formPanelEl.appendChild(makeDivider("地址"));
        formPanelEl.appendChild(field("街道地址", makeInput("lb_street", "朝阳区建国路88号")));
        formPanelEl.appendChild(field("城市", makeInput("lb_city", "北京")));
        formPanelEl.appendChild(field("省份", makeInput("lb_region", "北京市")));
        formPanelEl.appendChild(field("邮政编码", makeInput("lb_postal", "100000")));
        formPanelEl.appendChild(field("国家代码", makeInput("lb_country", "CN")));
        formPanelEl.appendChild(makeDivider("评分（可选）"));
        var ratingRow = document.createElement("div");
        ratingRow.className = "rating-row";
        var rg = makeGroup("平均评分 (0-5)");
        rg.appendChild(makeInput("lb_ratingValue", "4.3", "number"));
        var rc = makeGroup("评分数量");
        rc.appendChild(makeInput("lb_ratingCount", "56", "number"));
        ratingRow.appendChild(rg);
        ratingRow.appendChild(rc);
        formPanelEl.appendChild(ratingRow);
      }

      function renderEventForm() {
        formPanelEl.innerHTML = "";
        formPanelEl.appendChild(makeDivider("活动信息"));
        formPanelEl.appendChild(field("活动名称", makeInput("ev_name", "2026 技术大会"), true));
        formPanelEl.appendChild(
          field("活动描述", makeTextarea("ev_description", "活动简介...", 3))
        );
        formPanelEl.appendChild(
          field("开始时间", makeInput("ev_start", "", "datetime-local"), true)
        );
        formPanelEl.appendChild(field("结束时间", makeInput("ev_end", "", "datetime-local")));
        formPanelEl.appendChild(
          field("活动页面 URL", makeInput("ev_url", "https://example.com/event", "url"))
        );
        formPanelEl.appendChild(
          field("活动图片 URL", makeInput("ev_image", "https://example.com/event.jpg", "url"))
        );
        formPanelEl.appendChild(makeDivider("地点"));
        var modeEl = document.createElement("select");
        modeEl.id = "ev_mode";
        modeEl.className = "field-input";
        [
          ["OfflineEventAttendanceMode", "线下活动"],
          ["OnlineEventAttendanceMode", "线上活动"],
          ["MixedEventAttendanceMode", "线上线下混合"]
        ].forEach(function (opt) {
          var o = document.createElement("option");
          o.value = opt[0];
          o.textContent = opt[1];
          modeEl.appendChild(o);
        });
        formPanelEl.appendChild(field("参与方式", modeEl));
        formPanelEl.appendChild(field("场馆名称", makeInput("ev_venueName", "国家会议中心")));
        formPanelEl.appendChild(
          field("场馆地址", makeInput("ev_venueAddress", "北京市朝阳区天辰东路7号"))
        );
        formPanelEl.appendChild(makeDivider("主办方"));
        formPanelEl.appendChild(field("主办方名称", makeInput("ev_organizer", "主办单位名称")));
        formPanelEl.appendChild(
          field("主办方 URL", makeInput("ev_organizerUrl", "https://example.com", "url"))
        );
      }

      function renderRecipeForm() {
        formPanelEl.innerHTML = "";
        formPanelEl.appendChild(makeDivider("菜谱信息"));
        formPanelEl.appendChild(field("菜名", makeInput("rc_name", "红烧肉"), true));
        formPanelEl.appendChild(field("描述", makeTextarea("rc_description", "菜肴简介...", 2)));
        formPanelEl.appendChild(
          field("图片 URL", makeInput("rc_image", "https://example.com/dish.jpg", "url"))
        );
        formPanelEl.appendChild(field("作者/食谱来源", makeInput("rc_author", "张厨师")));
        formPanelEl.appendChild(
          field("准备时间（分钟）", makeInput("rc_prepTime", "30", "number"))
        );
        formPanelEl.appendChild(
          field("烹饪时间（分钟）", makeInput("rc_cookTime", "60", "number"))
        );
        formPanelEl.appendChild(field("份量（人数）", makeInput("rc_yield", "4", "number")));
        formPanelEl.appendChild(
          field("食材（每行一个）", makeTextarea("rc_ingredients", "五花肉 500g\n酱油 2勺\n...", 4))
        );
        formPanelEl.appendChild(
          field("步骤说明（每行一步）", makeTextarea("rc_steps", "第一步: ...\n第二步: ...", 5))
        );
        formPanelEl.appendChild(makeDivider("评分（可选）"));
        var ratingRow = document.createElement("div");
        ratingRow.className = "rating-row";
        var rg = makeGroup("平均评分 (0-5)");
        rg.appendChild(makeInput("rc_ratingValue", "4.8", "number"));
        var rc2 = makeGroup("评分数量");
        rc2.appendChild(makeInput("rc_ratingCount", "200", "number"));
        ratingRow.appendChild(rg);
        ratingRow.appendChild(rc2);
        formPanelEl.appendChild(ratingRow);
      }

      function renderBreadcrumbForm() {
        breadcrumbCounter = 0;
        formPanelEl.innerHTML = "";
        formPanelEl.appendChild(makeDivider("面包屑条目（按顺序填写）"));
        var list = document.createElement("div");
        list.className = "faq-items";
        list.id = "breadcrumbList";
        formPanelEl.appendChild(list);
        addBreadcrumbItem("首页", "https://example.com/");
        addBreadcrumbItem("分类页", "https://example.com/category/");
        addBreadcrumbItem("当前页", "https://example.com/category/page");

        var addBtn = document.createElement("button");
        addBtn.className = "btn-add-faq";
        addBtn.id = "addBreadcrumbBtn";
        addBtn.textContent = "+ 添加面包屑节点";
        addBtn.addEventListener("click", function () {
          addBreadcrumbItem("", "");
        });
        formPanelEl.appendChild(addBtn);
      }

      function addBreadcrumbItem(defaultName, defaultUrl) {
        breadcrumbCounter++;
        var list = document.getElementById("breadcrumbList");
        var item = document.createElement("div");
        item.className = "faq-item";
        item.id = "bcItem" + breadcrumbCounter;

        var header = document.createElement("div");
        header.className = "faq-item-header";
        var num = document.createElement("span");
        num.className = "faq-item-num";
        num.textContent = "层级 " + breadcrumbCounter;
        header.appendChild(num);
        var removeBtn = document.createElement("button");
        removeBtn.className = "btn-remove";
        removeBtn.textContent = "✕";
        removeBtn.setAttribute("aria-label", "删除此节点");
        var capturedId = breadcrumbCounter;
        removeBtn.addEventListener("click", function () {
          var el = document.getElementById("bcItem" + capturedId);
          if (el) el.remove();
        });
        header.appendChild(removeBtn);
        item.appendChild(header);

        var ng = document.createElement("div");
        ng.className = "field-group";
        var nl = document.createElement("label");
        nl.className = "field-label";
        nl.textContent = "名称";
        var ni = makeInput("bc_name_" + breadcrumbCounter, "页面名称");
        ni.value = defaultName || "";
        ng.appendChild(nl);
        ng.appendChild(ni);
        item.appendChild(ng);

        var ug = document.createElement("div");
        ug.className = "field-group";
        var ul2 = document.createElement("label");
        ul2.className = "field-label";
        ul2.textContent = "URL";
        var ui = makeInput("bc_url_" + breadcrumbCounter, "https://example.com/page", "url");
        ui.value = defaultUrl || "";
        ug.appendChild(ul2);
        ug.appendChild(ui);
        item.appendChild(ug);

        list.appendChild(item);
      }

      /* ── generator functions ── */
      function generateArticle() {
        var headline = (document.getElementById("a_headline") || {}).value || "";
        var url = (document.getElementById("a_url") || {}).value || "";
        var authorName = (document.getElementById("a_authorName") || {}).value || "";
        if (!headline || !url || !authorName) {
          showStatus("请填写标题、URL 和作者姓名", "error");
          return null;
        }
        var schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: headline,
          url: url,
          author: {
            "@type": "Person",
            name: authorName
          }
        };
        var desc = (document.getElementById("a_description") || {}).value;
        if (desc) schema.description = desc;
        var image = (document.getElementById("a_image") || {}).value;
        if (image) schema.image = image;
        var datePublished = (document.getElementById("a_datePublished") || {}).value;
        if (datePublished) schema.datePublished = new Date(datePublished).toISOString();
        var dateModified = (document.getElementById("a_dateModified") || {}).value;
        if (dateModified) schema.dateModified = new Date(dateModified).toISOString();
        var authorUrl = (document.getElementById("a_authorUrl") || {}).value;
        if (authorUrl) schema.author.url = authorUrl;
        var publisherName = (document.getElementById("a_publisherName") || {}).value;
        if (publisherName) {
          schema.publisher = { "@type": "Organization", name: publisherName };
          var publisherLogo = (document.getElementById("a_publisherLogo") || {}).value;
          if (publisherLogo) {
            schema.publisher.logo = { "@type": "ImageObject", url: publisherLogo };
          }
        }
        return schema;
      }

      function generateFaq() {
        var list = document.getElementById("faqList");
        if (!list) return null;
        var items = list.querySelectorAll(".faq-item");
        var entities = [];
        items.forEach(function (item) {
          var id = item.id.replace("faqItem", "");
          var q = (document.getElementById("faq_q_" + id) || {}).value || "";
          var a = (document.getElementById("faq_a_" + id) || {}).value || "";
          if (q && a) {
            entities.push({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a }
            });
          }
        });
        if (!entities.length) {
          showStatus("请至少填写一组完整的问答", "error");
          return null;
        }
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: entities
        };
      }

      function generateProduct() {
        var name = (document.getElementById("p_name") || {}).value || "";
        if (!name) {
          showStatus("请填写产品名称", "error");
          return null;
        }
        var schema = { "@context": "https://schema.org", "@type": "Product", name: name };
        var desc = (document.getElementById("p_description") || {}).value;
        if (desc) schema.description = desc;
        var image = (document.getElementById("p_image") || {}).value;
        if (image) schema.image = image;
        var brand = (document.getElementById("p_brand") || {}).value;
        if (brand) schema.brand = { "@type": "Brand", name: brand };
        var sku = (document.getElementById("p_sku") || {}).value;
        if (sku) schema.sku = sku;
        var price = (document.getElementById("p_price") || {}).value;
        var currency = (document.getElementById("p_currency") || {}).value || "CNY";
        var availability = (document.getElementById("p_availability") || {}).value || "InStock";
        if (price) {
          schema.offers = {
            "@type": "Offer",
            price: parseFloat(price),
            priceCurrency: currency,
            availability: "https://schema.org/" + availability
          };
        }
        var ratingValue = (document.getElementById("p_ratingValue") || {}).value;
        var ratingCount = (document.getElementById("p_ratingCount") || {}).value;
        if (ratingValue) {
          schema.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: parseFloat(ratingValue),
            bestRating: 5,
            worstRating: 1
          };
          if (ratingCount) schema.aggregateRating.ratingCount = parseInt(ratingCount, 10);
        }
        return schema;
      }

      function generateLocalBusiness() {
        var name = (document.getElementById("lb_name") || {}).value || "";
        if (!name) {
          showStatus("请填写商家名称", "error");
          return null;
        }
        var schema = {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: name
        };
        var desc = (document.getElementById("lb_description") || {}).value;
        if (desc) schema.description = desc;
        var phone = (document.getElementById("lb_phone") || {}).value;
        if (phone) schema.telephone = phone;
        var url = (document.getElementById("lb_url") || {}).value;
        if (url) schema.url = url;
        var image = (document.getElementById("lb_image") || {}).value;
        if (image) schema.image = image;
        var street = (document.getElementById("lb_street") || {}).value;
        var city = (document.getElementById("lb_city") || {}).value;
        if (street || city) {
          schema.address = { "@type": "PostalAddress" };
          if (street) schema.address.streetAddress = street;
          if (city) schema.address.addressLocality = city;
          var region = (document.getElementById("lb_region") || {}).value;
          if (region) schema.address.addressRegion = region;
          var postal = (document.getElementById("lb_postal") || {}).value;
          if (postal) schema.address.postalCode = postal;
          var country = (document.getElementById("lb_country") || {}).value;
          if (country) schema.address.addressCountry = country;
        }
        var ratingValue = (document.getElementById("lb_ratingValue") || {}).value;
        var ratingCount = (document.getElementById("lb_ratingCount") || {}).value;
        if (ratingValue) {
          schema.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: parseFloat(ratingValue),
            bestRating: 5,
            worstRating: 1
          };
          if (ratingCount) schema.aggregateRating.ratingCount = parseInt(ratingCount, 10);
        }
        return schema;
      }

      function generateEvent() {
        var name = (document.getElementById("ev_name") || {}).value || "";
        var start = (document.getElementById("ev_start") || {}).value || "";
        if (!name || !start) {
          showStatus("请填写活动名称和开始时间", "error");
          return null;
        }
        var schema = {
          "@context": "https://schema.org",
          "@type": "Event",
          name: name,
          startDate: new Date(start).toISOString()
        };
        var end = (document.getElementById("ev_end") || {}).value;
        if (end) schema.endDate = new Date(end).toISOString();
        var desc = (document.getElementById("ev_description") || {}).value;
        if (desc) schema.description = desc;
        var url = (document.getElementById("ev_url") || {}).value;
        if (url) schema.url = url;
        var image = (document.getElementById("ev_image") || {}).value;
        if (image) schema.image = image;
        var mode = (document.getElementById("ev_mode") || {}).value || "OfflineEventAttendanceMode";
        schema.eventAttendanceMode = "https://schema.org/" + mode;
        var venueName = (document.getElementById("ev_venueName") || {}).value;
        var venueAddress = (document.getElementById("ev_venueAddress") || {}).value;
        if (venueName || venueAddress) {
          schema.location = { "@type": "Place" };
          if (venueName) schema.location.name = venueName;
          if (venueAddress) schema.location.address = venueAddress;
        }
        var organizer = (document.getElementById("ev_organizer") || {}).value;
        if (organizer) {
          schema.organizer = { "@type": "Organization", name: organizer };
          var organizerUrl = (document.getElementById("ev_organizerUrl") || {}).value;
          if (organizerUrl) schema.organizer.url = organizerUrl;
        }
        return schema;
      }

      function generateRecipe() {
        var name = (document.getElementById("rc_name") || {}).value || "";
        if (!name) {
          showStatus("请填写菜名", "error");
          return null;
        }
        var schema = {
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: name
        };
        var desc = (document.getElementById("rc_description") || {}).value;
        if (desc) schema.description = desc;
        var image = (document.getElementById("rc_image") || {}).value;
        if (image) schema.image = image;
        var author = (document.getElementById("rc_author") || {}).value;
        if (author) schema.author = { "@type": "Person", name: author };
        var prepTime = (document.getElementById("rc_prepTime") || {}).value;
        if (prepTime) schema.prepTime = "PT" + prepTime + "M";
        var cookTime = (document.getElementById("rc_cookTime") || {}).value;
        if (cookTime) schema.cookTime = "PT" + cookTime + "M";
        var yieldVal = (document.getElementById("rc_yield") || {}).value;
        if (yieldVal) schema.recipeYield = yieldVal + " 人份";
        var ingredients = (document.getElementById("rc_ingredients") || {}).value;
        if (ingredients) {
          schema.recipeIngredient = ingredients
            .split("\n")
            .map(function (s) {
              return s.trim();
            })
            .filter(Boolean);
        }
        var steps = (document.getElementById("rc_steps") || {}).value;
        if (steps) {
          schema.recipeInstructions = steps
            .split("\n")
            .map(function (s) {
              return s.trim();
            })
            .filter(Boolean)
            .map(function (text) {
              return { "@type": "HowToStep", text: text };
            });
        }
        var ratingValue = (document.getElementById("rc_ratingValue") || {}).value;
        var ratingCount = (document.getElementById("rc_ratingCount") || {}).value;
        if (ratingValue) {
          schema.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: parseFloat(ratingValue),
            bestRating: 5,
            worstRating: 1
          };
          if (ratingCount) schema.aggregateRating.ratingCount = parseInt(ratingCount, 10);
        }
        return schema;
      }

      function generateBreadcrumb() {
        var list = document.getElementById("breadcrumbList");
        if (!list) return null;
        var items = list.querySelectorAll(".faq-item");
        var elements = [];
        var pos = 1;
        items.forEach(function (item) {
          var id = item.id.replace("bcItem", "");
          var name = (document.getElementById("bc_name_" + id) || {}).value || "";
          var url = (document.getElementById("bc_url_" + id) || {}).value || "";
          if (name) {
            var elem = { "@type": "ListItem", position: pos, name: name };
            if (url) elem.item = url;
            elements.push(elem);
            pos++;
          }
        });
        if (!elements.length) {
          showStatus("请至少填写一个面包屑节点名称", "error");
          return null;
        }
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: elements
        };
      }

      /* ── main generate action ── */
      function generateSchema() {
        var type = schemaTypeEl.value;
        var schema = null;
        if (type === "Article") schema = generateArticle();
        else if (type === "FAQ") schema = generateFaq();
        else if (type === "Product") schema = generateProduct();
        else if (type === "LocalBusiness") schema = generateLocalBusiness();
        else if (type === "Event") schema = generateEvent();
        else if (type === "Recipe") schema = generateRecipe();
        else if (type === "BreadcrumbList") schema = generateBreadcrumb();
        if (schema) {
          outputEl.value = JSON.stringify(schema, null, 2);
          showStatus("JSON-LD 生成成功，共 " + JSON.stringify(schema).length + " 字符", "success");
        }
      }

      /* ── schema type switch ── */
      function onTypeChange() {
        outputEl.value = "";
        statusEl.textContent = "";
        statusEl.className = "status";
        var type = schemaTypeEl.value;
        if (type === "Article") renderArticleForm();
        else if (type === "FAQ") renderFaqForm();
        else if (type === "Product") renderProductForm();
        else if (type === "LocalBusiness") renderLocalBusinessForm();
        else if (type === "Event") renderEventForm();
        else if (type === "Recipe") renderRecipeForm();
        else if (type === "BreadcrumbList") renderBreadcrumbForm();
      }

      /* ── button bindings ── */
      document.getElementById("btnGenerate").onclick = generateSchema;

      document.getElementById("btnCopy").onclick = async function () {
        if (!outputEl.value) {
          showStatus("尚未生成代码", "error");
          return;
        }
        var tag = '<script type="application/ld+json">\n' + outputEl.value + "\n</" + "script>";
        try {
          await navigator.clipboard.writeText(tag);
          showStatus("已复制（含 <script> 标签）", "success");
        } catch (e) {
          outputEl.select();
          showStatus("请手动复制输出框内容", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        onTypeChange();
      };

      schemaTypeEl.addEventListener("change", onTypeChange);

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          generateSchema();
        }
      });

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
      onTypeChange();
    
