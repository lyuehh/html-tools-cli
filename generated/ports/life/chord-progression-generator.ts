// @ts-nocheck
// Generated from tools/life/chord-progression-generator.html
// Source SHA-256: ef0431232debaddfbc29f68d1b31990a0df18a843c51bd0df2a0fd3e1cbe7dc5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ── Music theory constants ─────────────────────────────────────────────
      var CHROMATIC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      var FLAT_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
      var SHARP_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      var FLAT_KEYS = ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Dm", "Gm", "Cm", "Fm", "Bbm", "Ebm"];

      // Scale intervals (semitones from root)
      var MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
      var MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10];

      // Diatonic chord qualities per scale degree
      var MAJOR_TRIAD_Q = [
        "大三和弦",
        "小三和弦",
        "小三和弦",
        "大三和弦",
        "大三和弦",
        "小三和弦",
        "减三和弦"
      ];
      var MAJOR_7TH_Q = [
        "大七和弦",
        "小七和弦",
        "小七和弦",
        "大七和弦",
        "属七和弦",
        "小七和弦",
        "半减七和弦"
      ];
      var MINOR_TRIAD_Q = [
        "小三和弦",
        "减三和弦",
        "大三和弦",
        "小三和弦",
        "小三和弦",
        "大三和弦",
        "大三和弦"
      ];
      var MINOR_7TH_Q = [
        "小七和弦",
        "半减七和弦",
        "大七和弦",
        "小七和弦",
        "小七和弦",
        "大七和弦",
        "属七和弦"
      ];

      // Roman numerals
      var MAJOR_ROM_TRIAD = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
      var MAJOR_ROM_7TH = ["Imaj7", "ii7", "iii7", "IVmaj7", "V7", "vi7", "vii°7"];
      var MINOR_ROM_TRIAD = ["i", "ii°", "III", "iv", "v", "VI", "VII"];
      var MINOR_ROM_7TH = ["i7", "ii°7", "IIImaj7", "iv7", "v7", "VImaj7", "VII7"];

      // Chord interval sets (semitones)
      var TRIAD_IVLS = {
        大三和弦: [0, 4, 7],
        小三和弦: [0, 3, 7],
        减三和弦: [0, 3, 6],
        增三和弦: [0, 4, 8]
      };
      var SEVENTH_IVLS = {
        大七和弦: [0, 4, 7, 11],
        小七和弦: [0, 3, 7, 10],
        属七和弦: [0, 4, 7, 10],
        半减七和弦: [0, 3, 6, 10],
        减七和弦: [0, 3, 6, 9]
      };

      // Common chord progressions (1-based scale degree indices)
      var PROGRESSIONS = [
        { degs: [1, 4, 5, 1], name: "I-IV-V-I（正格终止）", genre: "流行 · 摇滚 · 民谣" },
        { degs: [1, 5, 6, 4], name: "I-V-vi-IV（四和弦进行）", genre: "流行" },
        { degs: [1, 6, 4, 5], name: "I-vi-IV-V（50s 经典）", genre: "50s 流行" },
        { degs: [2, 5, 1], name: "ii-V-I（爵士核心）", genre: "爵士" },
        { degs: [2, 5, 1, 6], name: "ii-V-I-vi（爵士延伸）", genre: "爵士" },
        { degs: [1, 4, 1, 5], name: "I-IV-I-V（蓝调感）", genre: "蓝调 · 摇滚" },
        { degs: [1, 3, 4, 5], name: "I-iii-IV-V", genre: "流行 · R&B" },
        { degs: [1, 6, 2, 5], name: "I-vi-ii-V（爵士转位）", genre: "爵士" },
        { degs: [1, 4, 6, 5], name: "I-IV-vi-V", genre: "流行" },
        { degs: [6, 4, 1, 5], name: "vi-IV-I-V（小调感流行）", genre: "流行 · 抒情" },
        { degs: [1, 5, 6, 3, 4, 1, 4, 5], name: "卡农进行", genre: "古典 · 流行" },
        { degs: [1, 2, 3, 4], name: "I-II-III-IV（上行）", genre: "R&B · 灵魂乐" }
      ];

      // ── State ──────────────────────────────────────────────────────────────
      var gKey = "C";
      var gChordType = "triad";
      var gProgIdx = 0;

      // ── Helpers ────────────────────────────────────────────────────────────
      function isMinor(key) {
        return key.charAt(key.length - 1) === "m";
      }

      function getScaleRootIdx(key) {
        var root = key.replace(/m$/, "");
        var flatMap = { Bb: 10, Eb: 3, Ab: 8, Db: 1, Gb: 6 };
        if (flatMap[root] !== undefined) return flatMap[root];
        return CHROMATIC.indexOf(root);
      }

      function buildScale(key) {
        var rootIdx = getScaleRootIdx(key);
        var intervals = isMinor(key) ? MINOR_INTERVALS : MAJOR_INTERVALS;
        var names = FLAT_KEYS.indexOf(key) !== -1 ? FLAT_NAMES : SHARP_NAMES;
        return intervals.map(function (semitones) {
          return names[(rootIdx + semitones) % 12];
        });
      }

      function noteToIdx(note) {
        var flatMap = { Db: 1, Eb: 3, Fb: 4, Gb: 6, Ab: 8, Bb: 10, Cb: 11 };
        if (flatMap[note] !== undefined) return flatMap[note];
        return CHROMATIC.indexOf(note);
      }

      function buildChord(rootNote, quality, chordType) {
        var rootIdx = noteToIdx(rootNote);
        var intervals;
        if (chordType === "seventh") {
          intervals = SEVENTH_IVLS[quality];
          if (!intervals) {
            // Fall back to triad quality label if seventh not found
            intervals = TRIAD_IVLS[quality] || [0, 4, 7];
          }
        } else {
          intervals = TRIAD_IVLS[quality] || [0, 4, 7];
        }
        return intervals.map(function (s) {
          return SHARP_NAMES[(rootIdx + s) % 12];
        });
      }

      function getDiatonicChords(key, chordType) {
        var scale = buildScale(key);
        var minor = isMinor(key);
        var qualities =
          chordType === "seventh"
            ? minor
              ? MINOR_7TH_Q
              : MAJOR_7TH_Q
            : minor
              ? MINOR_TRIAD_Q
              : MAJOR_TRIAD_Q;
        var numerals =
          chordType === "seventh"
            ? minor
              ? MINOR_ROM_7TH
              : MAJOR_ROM_7TH
            : minor
              ? MINOR_ROM_TRIAD
              : MAJOR_ROM_TRIAD;

        return scale.map(function (note, i) {
          return {
            root: note,
            quality: qualities[i],
            numeral: numerals[i],
            notes: buildChord(note, qualities[i], chordType)
          };
        });
      }

      var QUALITY_SYMBOL = {
        大三和弦: "",
        小三和弦: "m",
        减三和弦: "dim",
        增三和弦: "aug",
        大七和弦: "maj7",
        小七和弦: "m7",
        属七和弦: "7",
        半减七和弦: "m7b5",
        减七和弦: "dim7"
      };

      function chordLabel(chord) {
        return chord.root + (QUALITY_SYMBOL[chord.quality] || "");
      }

      function getNumerals(key, chordType) {
        var minor = isMinor(key);
        if (chordType === "seventh") return minor ? MINOR_ROM_7TH : MAJOR_ROM_7TH;
        return minor ? MINOR_ROM_TRIAD : MAJOR_ROM_TRIAD;
      }

      // ── Render catalog ─────────────────────────────────────────────────────
      function renderCatalog() {
        var catalog = document.getElementById("progressionCatalog");
        catalog.innerHTML = "";
        var diatonic = getDiatonicChords(gKey, gChordType);
        var numerals = getNumerals(gKey, gChordType);

        PROGRESSIONS.forEach(function (prog, idx) {
          var numLabels = prog.degs.map(function (d) {
            return numerals[d - 1] || "?";
          });
          var nameLabels = prog.degs.map(function (d) {
            var ch = diatonic[d - 1];
            return ch ? chordLabel(ch) : "?";
          });

          var row = document.createElement("div");
          row.className = "prog-row" + (idx === gProgIdx ? " active" : "");

          var numDiv = document.createElement("div");
          numDiv.className = "prog-numerals";
          numDiv.textContent = numLabels.join(" – ");

          var nameDiv = document.createElement("div");
          nameDiv.className = "prog-name";
          nameDiv.textContent = nameLabels.join(" – ") + "　" + prog.name;

          var genreDiv = document.createElement("div");
          genreDiv.className = "prog-genre";
          genreDiv.textContent = prog.genre;

          row.appendChild(numDiv);
          row.appendChild(nameDiv);
          row.appendChild(genreDiv);

          (function (i) {
            row.addEventListener("click", function () {
              gProgIdx = i;
              renderAll();
            });
          })(idx);

          catalog.appendChild(row);
        });
      }

      // ── Render chord grid ──────────────────────────────────────────────────
      function renderGrid() {
        var grid = document.getElementById("progressionGrid");
        grid.innerHTML = "";
        var diatonic = getDiatonicChords(gKey, gChordType);
        var prog = PROGRESSIONS[gProgIdx];

        prog.degs.forEach(function (deg) {
          var chord = diatonic[deg - 1];
          if (!chord) return;

          var block = document.createElement("div");
          block.className = "chord-block";

          var numDiv = document.createElement("div");
          numDiv.className = "chord-numeral";
          numDiv.textContent = chord.numeral;

          var nameDiv = document.createElement("div");
          nameDiv.className = "chord-name";
          nameDiv.textContent = chordLabel(chord);

          var qualDiv = document.createElement("div");
          qualDiv.className = "chord-quality";
          qualDiv.textContent = chord.quality;

          var notesDiv = document.createElement("div");
          notesDiv.className = "chord-notes";
          chord.notes.forEach(function (note, ni) {
            var pill = document.createElement("span");
            pill.className = "note-pill" + (ni === 0 ? " root" : "");
            pill.textContent = note;
            notesDiv.appendChild(pill);
          });

          block.appendChild(numDiv);
          block.appendChild(nameDiv);
          block.appendChild(qualDiv);
          block.appendChild(notesDiv);
          grid.appendChild(block);
        });
      }

      // ── Render text output ─────────────────────────────────────────────────
      function renderOutput() {
        var diatonic = getDiatonicChords(gKey, gChordType);
        var prog = PROGRESSIONS[gProgIdx];
        var keyEl = document.getElementById("selKey");
        var keyName = keyEl.options[keyEl.selectedIndex].text;
        var typeName = gChordType === "seventh" ? "七和弦" : "三和弦";

        var lines = [
          "调性: " + keyName + "  |  和弦类型: " + typeName,
          "进行: " + prog.name + "  [" + prog.genre + "]",
          "---"
        ];
        prog.degs.forEach(function (deg) {
          var chord = diatonic[deg - 1];
          if (!chord) return;
          lines.push(
            chord.numeral +
              "  →  " +
              chordLabel(chord) +
              "  (" +
              chord.quality +
              ")  音符: " +
              chord.notes.join(" - ")
          );
        });
        document.getElementById("outputText").value = lines.join("\n");
      }

      function renderAll() {
        renderCatalog();
        renderGrid();
        renderOutput();
      }

      // ── Event listeners ────────────────────────────────────────────────────
      document.getElementById("selKey").addEventListener("change", function () {
        gKey = this.value;
        renderAll();
      });

      document.getElementById("selChordType").addEventListener("change", function () {
        gChordType = this.value;
        renderAll();
      });

      document.getElementById("btnCopy").onclick = async function () {
        var text = document.getElementById("outputText").value;
        if (!text) {
          showStatus("没有内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        document.getElementById("selKey").value = "C";
        document.getElementById("selChordType").value = "triad";
        gKey = "C";
        gChordType = "triad";
        gProgIdx = 0;
        renderAll();
        showStatus("已重置", "success");
      };

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      // ── Init ───────────────────────────────────────────────────────────────
      renderAll();

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
    
