// @ts-nocheck
// Generated from tools/education/citation-generator.html
// Source SHA-256: 358d74d981d7ea02debed6b2c2ed517b4b3cf02771fdaae96081d2ee46afdbed
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentType = "book";
      let currentFormat = "apa";

      document.querySelectorAll(".source-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".source-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          currentType = btn.dataset.type;
          showForm(currentType);
          generate();
        });
      });

      document.querySelectorAll(".format-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".format-tab").forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          currentFormat = tab.dataset.format;
          generate();
        });
      });

      function showForm(type) {
        const forms = ["bookForm", "journalForm", "websiteForm", "newspaperForm", "thesisForm"];
        forms.forEach((f) => {
          document.getElementById(f).style.display = "none";
        });
        document.getElementById(type + "Form").style.display = "block";
      }

      function getBookData() {
        return {
          author: document.getElementById("author").value.trim(),
          year: document.getElementById("year").value.trim(),
          title: document.getElementById("title").value.trim(),
          publisher: document.getElementById("publisher").value.trim(),
          location: document.getElementById("location").value.trim(),
          edition: document.getElementById("edition").value.trim(),
          isbn: document.getElementById("isbn").value.trim()
        };
      }

      function getJournalData() {
        return {
          author: document.getElementById("jAuthor").value.trim(),
          year: document.getElementById("jYear").value.trim(),
          title: document.getElementById("jTitle").value.trim(),
          journal: document.getElementById("jJournal").value.trim(),
          volume: document.getElementById("jVolume").value.trim(),
          issue: document.getElementById("jIssue").value.trim(),
          pages: document.getElementById("jPages").value.trim(),
          doi: document.getElementById("jDoi").value.trim()
        };
      }

      function getWebsiteData() {
        return {
          author: document.getElementById("wAuthor").value.trim(),
          date: document.getElementById("wDate").value.trim(),
          title: document.getElementById("wTitle").value.trim(),
          site: document.getElementById("wSite").value.trim(),
          url: document.getElementById("wUrl").value.trim(),
          access: document.getElementById("wAccess").value.trim()
        };
      }

      function getNewspaperData() {
        return {
          author: document.getElementById("nAuthor").value.trim(),
          date: document.getElementById("nDate").value.trim(),
          title: document.getElementById("nTitle").value.trim(),
          newspaper: document.getElementById("nNewspaper").value.trim(),
          page: document.getElementById("nPage").value.trim()
        };
      }

      function getThesisData() {
        return {
          author: document.getElementById("tAuthor").value.trim(),
          year: document.getElementById("tYear").value.trim(),
          title: document.getElementById("tTitle").value.trim(),
          degree: document.getElementById("tDegree").value,
          university: document.getElementById("tUniversity").value.trim()
        };
      }

      function generate() {
        let result = "";

        switch (currentType) {
          case "book":
            result = generateBookCitation(getBookData());
            break;
          case "journal":
            result = generateJournalCitation(getJournalData());
            break;
          case "website":
            result = generateWebsiteCitation(getWebsiteData());
            break;
          case "newspaper":
            result = generateNewspaperCitation(getNewspaperData());
            break;
          case "thesis":
            result = generateThesisCitation(getThesisData());
            break;
        }

        document.getElementById("result").textContent = result || "请填写文献信息...";
      }

      function generateBookCitation(d) {
        if (!d.author || !d.title) return "";

        switch (currentFormat) {
          case "apa":
            let apa = d.author + " (" + (d.year || "n.d.") + "). ";
            apa += d.title + (d.edition ? " (" + d.edition + ")" : "") + ". ";
            apa += d.publisher + ".";
            return apa;

          case "mla":
            let mla = d.author + ". " + d.title + ". ";
            if (d.edition) mla += d.edition + ", ";
            mla += d.publisher + ", " + (d.year || "") + ".";
            return mla;

          case "chicago":
            let chi = d.author + ". " + d.title + ". ";
            if (d.location) chi += d.location + ": ";
            chi += d.publisher + ", " + (d.year || "") + ".";
            return chi;

          case "gb":
            let gb = d.author + ". " + d.title + "[M]. ";
            if (d.location) gb += d.location + ": ";
            gb += d.publisher + ", " + (d.year || "") + ".";
            return gb;
        }
      }

      function generateJournalCitation(d) {
        if (!d.author || !d.title || !d.journal) return "";

        switch (currentFormat) {
          case "apa":
            let apa = d.author + " (" + (d.year || "n.d.") + "). " + d.title + ". ";
            apa += d.journal + ", " + d.volume;
            if (d.issue) apa += "(" + d.issue + ")";
            if (d.pages) apa += ", " + d.pages;
            apa += ".";
            if (d.doi) apa += " https://doi.org/" + d.doi;
            return apa;

          case "mla":
            let mla = d.author + '. "' + d.title + '." ' + d.journal + ", ";
            mla += "vol. " + d.volume;
            if (d.issue) mla += ", no. " + d.issue;
            mla += ", " + (d.year || "") + ", pp. " + (d.pages || "") + ".";
            return mla;

          case "chicago":
            let chi = d.author + '. "' + d.title + '." ' + d.journal + " ";
            chi += d.volume;
            if (d.issue) chi += ", no. " + d.issue;
            chi += " (" + (d.year || "") + "): " + (d.pages || "") + ".";
            return chi;

          case "gb":
            let gb = d.author + ". " + d.title + "[J]. " + d.journal + ", ";
            gb += (d.year || "") + ", " + d.volume;
            if (d.issue) gb += "(" + d.issue + ")";
            gb += ": " + (d.pages || "") + ".";
            return gb;
        }
      }

      function generateWebsiteCitation(d) {
        if (!d.title || !d.url) return "";

        switch (currentFormat) {
          case "apa":
            let apa =
              (d.author || d.site || "") + " (" + (d.date || "n.d.") + "). " + d.title + ". ";
            if (d.site && d.author) apa += d.site + ". ";
            apa += d.url;
            return apa;

          case "mla":
            let mla = (d.author ? d.author + ". " : "") + '"' + d.title + '." ';
            mla += d.site + ", " + (d.date || "") + ", " + d.url + ".";
            if (d.access) mla += " Accessed " + d.access + ".";
            return mla;

          case "chicago":
            let chi = (d.author ? d.author + ". " : "") + '"' + d.title + '." ';
            chi += d.site + ". " + (d.date ? "Last modified " + d.date + ". " : "");
            chi += d.url + ".";
            return chi;

          case "gb":
            let gb = (d.author || d.site || "") + ". " + d.title + "[EB/OL]. ";
            gb += "(" + (d.date || "") + ")[" + (d.access || "") + "]. " + d.url + ".";
            return gb;
        }
      }

      function generateNewspaperCitation(d) {
        if (!d.title || !d.newspaper) return "";

        switch (currentFormat) {
          case "apa":
            let apa = (d.author || "") + " (" + (d.date || "n.d.") + "). " + d.title + ". ";
            apa += d.newspaper + (d.page ? ", " + d.page : "") + ".";
            return apa;

          case "mla":
            let mla = (d.author ? d.author + ". " : "") + '"' + d.title + '." ';
            mla += d.newspaper + ", " + (d.date || "") + ", p. " + (d.page || "") + ".";
            return mla;

          case "chicago":
            let chi = (d.author ? d.author + ". " : "") + '"' + d.title + '." ';
            chi += d.newspaper + ", " + (d.date || "") + ".";
            return chi;

          case "gb":
            let gb = (d.author || "") + ". " + d.title + "[N]. ";
            gb += d.newspaper + ", " + (d.date || "") + "(" + (d.page || "") + ").";
            return gb;
        }
      }

      function generateThesisCitation(d) {
        if (!d.author || !d.title || !d.university) return "";

        switch (currentFormat) {
          case "apa":
            let apa = d.author + " (" + (d.year || "n.d.") + "). " + d.title;
            apa += " [" + d.degree + ", " + d.university + "].";
            return apa;

          case "mla":
            let mla = d.author + '. "' + d.title + '." ' + d.degree + ", ";
            mla += d.university + ", " + (d.year || "") + ".";
            return mla;

          case "chicago":
            let chi = d.author + '. "' + d.title + '." ' + d.degree + ", ";
            chi += d.university + ", " + (d.year || "") + ".";
            return chi;

          case "gb":
            let gb = d.author + ". " + d.title + "[D]. ";
            gb += d.university + ", " + (d.year || "") + ".";
            return gb;
        }
      }

      function copyResult() {
        const text = document.getElementById("result").textContent;
        if (text && text !== "请填写文献信息...") {
          navigator.clipboard.writeText(text).then(() => {
            const notice = document.getElementById("copyNotice");
            notice.style.display = "block";
            setTimeout(() => {
              notice.style.display = "none";
            }, 2000);
          });
        }
      }

      function clearForm() {
        const inputs = document.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
          input.value = "";
        });
        generate();
      }

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
