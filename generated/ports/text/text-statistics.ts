// @ts-nocheck
// Generated from tools/text/text-statistics.html
// Source SHA-256: a108b5eebede40233e8ba40fe1e18838854b40d165c9566ddbc9515a5bff868e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function analyze() {
        const text = document.getElementById("input").value;
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, "").length;
        const chinese = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
        const letters = (text.match(/[a-zA-Z]/g) || []).length;
        const numbers = (text.match(/[0-9]/g) || []).length;
        const spaces = (text.match(/ /g) || []).length;
        const punctuation = (text.match(/[.,!?;:'"()[\]{}，。！？；：""''（）【】、]/g) || [])
          .length;
        const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
        const words = chinese + englishWords;
        const sentences = (text.match(/[.!?。！？]+/g) || []).length || (text.trim() ? 1 : 0);
        const paragraphs =
          text.split(/\n\s*\n/).filter((p) => p.trim()).length || (text.trim() ? 1 : 0);
        const lines = text.split("\n").length;
        const readTime = Math.ceil(words / 200);
        const speakTime = Math.ceil(words / 150);
        const avgWordLen = words > 0 ? (charsNoSpace / words).toFixed(1) : 0;
        document.getElementById("chars").textContent = chars;
        document.getElementById("words").textContent = words;
        document.getElementById("sentences").textContent = sentences;
        document.getElementById("paragraphs").textContent = paragraphs;
        document.getElementById("charsNoSpace").textContent = charsNoSpace;
        document.getElementById("chinese").textContent = chinese;
        document.getElementById("letters").textContent = letters;
        document.getElementById("numbers").textContent = numbers;
        document.getElementById("spaces").textContent = spaces;
        document.getElementById("punctuation").textContent = punctuation;
        document.getElementById("readTime").textContent = readTime + " 分钟";
        document.getElementById("speakTime").textContent = speakTime + " 分钟";
        document.getElementById("avgWordLen").textContent = avgWordLen;
        document.getElementById("lines").textContent = lines;
      }
      document.getElementById("input").addEventListener("input", analyze);
      analyze();
    
