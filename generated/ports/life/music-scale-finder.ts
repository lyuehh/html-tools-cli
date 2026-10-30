// @ts-nocheck
// Generated from tools/life/music-scale-finder.html
// Source SHA-256: f829eecd48bb346c0e994d683448c790a1ac34a274ed36e3d5144c4933ac6684
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var ALL_NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      var ALL_NOTES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

      var SCALES = {
        major: {
          name: "大调 Major",
          intervals: [0, 2, 4, 5, 7, 9, 11],
          steps: ["W", "W", "H", "W", "W", "W", "H"],
          chordQualities: ["M", "m", "m", "M", "M", "m", "dim"]
        },
        minor: {
          name: "自然小调 Natural Minor",
          intervals: [0, 2, 3, 5, 7, 8, 10],
          steps: ["W", "H", "W", "W", "H", "W", "W"],
          chordQualities: ["m", "dim", "M", "m", "m", "M", "M"]
        },
        harmonic_minor: {
          name: "和声小调 Harmonic Minor",
          intervals: [0, 2, 3, 5, 7, 8, 11],
          steps: ["W", "H", "W", "W", "H", "A2", "H"],
          chordQualities: ["m", "dim", "aug", "m", "M", "M", "dim"]
        },
        melodic_minor: {
          name: "旋律小调 Melodic Minor",
          intervals: [0, 2, 3, 5, 7, 9, 11],
          steps: ["W", "H", "W", "W", "W", "W", "H"],
          chordQualities: ["m", "m", "aug", "M", "M", "dim", "dim"]
        },
        dorian: {
          name: "多利亚 Dorian",
          intervals: [0, 2, 3, 5, 7, 9, 10],
          steps: ["W", "H", "W", "W", "W", "H", "W"],
          chordQualities: ["m", "m", "M", "M", "m", "dim", "M"]
        },
        phrygian: {
          name: "弗里几亚 Phrygian",
          intervals: [0, 1, 3, 5, 7, 8, 10],
          steps: ["H", "W", "W", "W", "H", "W", "W"],
          chordQualities: ["m", "M", "M", "m", "dim", "M", "m"]
        },
        lydian: {
          name: "利底亚 Lydian",
          intervals: [0, 2, 4, 6, 7, 9, 11],
          steps: ["W", "W", "W", "H", "W", "W", "H"],
          chordQualities: ["M", "M", "m", "dim", "M", "m", "m"]
        },
        mixolydian: {
          name: "混合利底亚 Mixolydian",
          intervals: [0, 2, 4, 5, 7, 9, 10],
          steps: ["W", "W", "H", "W", "W", "H", "W"],
          chordQualities: ["M", "m", "dim", "M", "m", "m", "M"]
        },
        locrian: {
          name: "洛克里亚 Locrian",
          intervals: [0, 1, 3, 5, 6, 8, 10],
          steps: ["H", "W", "W", "H", "W", "W", "W"],
          chordQualities: ["dim", "M", "m", "m", "M", "M", "m"]
        },
        pentatonic_major: {
          name: "五声大调 Major Pentatonic",
          intervals: [0, 2, 4, 7, 9],
          steps: ["W", "W", "m3", "W", "m3"],
          chordQualities: null
        },
        pentatonic_minor: {
          name: "五声小调 Minor Pentatonic",
          intervals: [0, 3, 5, 7, 10],
          steps: ["m3", "W", "W", "m3", "W"],
          chordQualities: null
        },
        blues: {
          name: "布鲁斯 Blues",
          intervals: [0, 3, 5, 6, 7, 10],
          steps: ["m3", "W", "H", "H", "m3", "W"],
          chordQualities: null
        },
        whole_tone: {
          name: "全音阶 Whole Tone",
          intervals: [0, 2, 4, 6, 8, 10],
          steps: ["W", "W", "W", "W", "W", "W"],
          chordQualities: null
        },
        diminished: {
          name: "减音阶 Diminished (W-H)",
          intervals: [0, 2, 3, 5, 6, 8, 9, 11],
          steps: ["W", "H", "W", "H", "W", "H", "W", "H"],
          chordQualities: null
        }
      };

      var ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"];
      var DEGREE_NAMES = ["主音", "上主音", "中音", "下属音", "属音", "下中音", "导音"];
      var GUITAR_OPEN = [4, 11, 7, 2, 9, 4];

      function noteIndex(noteName) {
        var idx = ALL_NOTES_SHARP.indexOf(noteName);
        if (idx === -1) idx = ALL_NOTES_FLAT.indexOf(noteName);
        return idx;
      }

      function getScaleNotes(rootName, scaleKey, useFlat) {
        var notes = useFlat ? ALL_NOTES_FLAT : ALL_NOTES_SHARP;
        var root = noteIndex(rootName);
        var scale = SCALES[scaleKey];
        return scale.intervals.map(function (semitones) {
          return notes[(root + semitones) % 12];
        });
      }

      function getScaleIndices(rootName, scaleKey) {
        var root = noteIndex(rootName);
        var scale = SCALES[scaleKey];
        return scale.intervals.map(function (s) {
          return (root + s) % 12;
        });
      }

      function renderNotes(scaleNotes) {
        var container = document.getElementById("scaleNotesRow");
        container.innerHTML = "";
        var degrees = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        scaleNotes.forEach(function (note, i) {
          var badge = document.createElement("div");
          badge.className = "note-badge" + (i === 0 ? " root" : "");
          var nameEl = document.createElement("div");
          nameEl.className = "note-name";
          nameEl.textContent = note;
          var degEl = document.createElement("div");
          degEl.className = "note-degree";
          degEl.textContent = degrees[i] || "-";
          badge.appendChild(nameEl);
          badge.appendChild(degEl);
          container.appendChild(badge);
        });
      }

      function renderFormula(scaleKey) {
        var scale = SCALES[scaleKey];
        var el = document.getElementById("scaleFormula");
        el.innerHTML =
          "<strong>" +
          scale.name +
          "</strong>" +
          "&emsp;半音公式：" +
          scale.intervals.join(", ") +
          "&emsp;步进：" +
          scale.steps.join(" - ");
      }

      function renderIntervals(scaleKey) {
        var scale = SCALES[scaleKey];
        var container = document.getElementById("intervalRow");
        container.innerHTML = "";
        scale.steps.forEach(function (step) {
          var badge = document.createElement("span");
          var cls = step === "W" ? "whole" : step === "H" ? "half" : "";
          badge.className = "interval-badge " + cls;
          if (step === "W") badge.textContent = "全音 W";
          else if (step === "H") badge.textContent = "半音 H";
          else if (step === "m3") badge.textContent = "小三度";
          else if (step === "A2") badge.textContent = "增二度";
          else badge.textContent = step;
          container.appendChild(badge);
        });
      }

      function renderPiano(scaleIndices, rootIdx) {
        var piano = document.getElementById("pianoEl");
        piano.innerHTML = "";
        var layout = [
          { note: 0, type: "white" },
          { note: 1, type: "black" },
          { note: 2, type: "white" },
          { note: 3, type: "black" },
          { note: 4, type: "white" },
          { note: 5, type: "white" },
          { note: 6, type: "black" },
          { note: 7, type: "white" },
          { note: 8, type: "black" },
          { note: 9, type: "white" },
          { note: 10, type: "black" },
          { note: 11, type: "white" }
        ];
        var noteNames = ALL_NOTES_SHARP;
        for (var oct = 0; oct < 2; oct++) {
          layout.forEach(function (k) {
            var key = document.createElement("div");
            var inScale = scaleIndices.indexOf(k.note) !== -1;
            var isRoot = k.note === rootIdx;
            var cls = "piano-key " + k.type;
            if (isRoot) cls += " is-root";
            else if (inScale) cls += " in-scale";
            key.className = cls;
            if (inScale || isRoot) {
              var lbl = document.createElement("div");
              lbl.className = "piano-key-label";
              lbl.textContent = noteNames[k.note];
              key.appendChild(lbl);
            }
            piano.appendChild(key);
          });
        }
      }

      function renderFretboard(scaleIndices, rootIdx) {
        var numFrets = 13;
        var stringNotes = GUITAR_OPEN;
        var stringLabels = ["e", "B", "G", "D", "A", "E"];
        var noteNames = ALL_NOTES_SHARP;

        var numRow = document.getElementById("fretNumbers");
        numRow.innerHTML = "";
        var emptyDiv = document.createElement("div");
        emptyDiv.style.width = "32px";
        emptyDiv.style.flexShrink = "0";
        numRow.appendChild(emptyDiv);
        for (var f = 0; f < numFrets; f++) {
          var numEl = document.createElement("div");
          numEl.className = "fret-num";
          numEl.textContent = f === 0 ? "开" : String(f);
          numRow.appendChild(numEl);
        }

        var strContainer = document.getElementById("fretStrings");
        strContainer.innerHTML = "";
        stringNotes.forEach(function (openNote, si) {
          var row = document.createElement("div");
          row.className = "fret-row";
          var strLbl = document.createElement("div");
          strLbl.className = "string-label";
          strLbl.textContent = stringLabels[si];
          row.appendChild(strLbl);
          for (var fret = 0; fret < numFrets; fret++) {
            var noteAtFret = (openNote + fret) % 12;
            var cell = document.createElement("div");
            cell.className = "fret-cell";
            var inScale = scaleIndices.indexOf(noteAtFret) !== -1;
            var isRoot = noteAtFret === rootIdx;
            if (inScale || isRoot) {
              var dot = document.createElement("div");
              dot.className = "fret-dot " + (isRoot ? "is-root" : "in-scale");
              dot.textContent = noteNames[noteAtFret];
              cell.appendChild(dot);
            }
            row.appendChild(cell);
          }
          strContainer.appendChild(row);
        });
      }

      function renderChords(scaleNotes, scaleKey) {
        var tbody = document.getElementById("chordTableBody");
        tbody.innerHTML = "";
        var scale = SCALES[scaleKey];
        if (!scale.chordQualities) {
          var tr = document.createElement("tr");
          var td = document.createElement("td");
          td.colSpan = 5;
          td.textContent = "此音阶通常无固定自然和弦级数";
          td.style.color = "var(--text-muted)";
          tr.appendChild(td);
          tbody.appendChild(tr);
          return;
        }
        var n = scaleNotes.length;
        for (var i = 0; i < n; i++) {
          var quality = scale.chordQualities[i];
          var root = scaleNotes[i];
          var third = scaleNotes[(i + 2) % n];
          var fifth = scaleNotes[(i + 4) % n];
          var roman = ROMAN_NUMERALS[i] || String(i + 1);
          if (quality === "m") roman = roman.toLowerCase();
          else if (quality === "dim") roman = roman.toLowerCase() + "°";
          else if (quality === "aug") roman = roman + "+";

          var chordName = root;
          if (quality === "m") chordName += "m";
          else if (quality === "dim") chordName += "dim";
          else if (quality === "aug") chordName += "aug";

          var qualityLabel =
            quality === "M"
              ? "大三和弦"
              : quality === "m"
                ? "小三和弦"
                : quality === "dim"
                  ? "减三和弦"
                  : quality === "aug"
                    ? "增三和弦"
                    : quality;
          var qualityClass =
            quality === "M" ? "major" : quality === "m" ? "minor" : quality === "dim" ? "dim" : "";

          var tr = document.createElement("tr");
          var degTd = document.createElement("td");
          degTd.textContent = i + 1 + " — " + (DEGREE_NAMES[i] || "");
          var romanTd = document.createElement("td");
          romanTd.textContent = roman;
          var nameTd = document.createElement("td");
          nameTd.textContent = chordName;
          var qualTd = document.createElement("td");
          var qSpan = document.createElement("span");
          qSpan.className = "chord-quality " + qualityClass;
          qSpan.textContent = qualityLabel;
          qualTd.appendChild(qSpan);
          var notesTd = document.createElement("td");
          notesTd.textContent = root + " - " + third + " - " + fifth;
          tr.appendChild(degTd);
          tr.appendChild(romanTd);
          tr.appendChild(nameTd);
          tr.appendChild(qualTd);
          tr.appendChild(notesTd);
          tbody.appendChild(tr);
        }
      }

      function updateStatus(rootName, scaleKey) {
        var scale = SCALES[scaleKey];
        var statusEl = document.getElementById("status");
        statusEl.className = "status success";
        statusEl.textContent =
          rootName + " " + scale.name + "　共 " + scale.intervals.length + " 个音";
      }

      function render() {
        var rootName = document.getElementById("rootNote").value;
        var scaleKey = document.getElementById("scaleMode").value;
        var useFlat = document.getElementById("noteDisplay").value === "flat";
        var scaleNotes = getScaleNotes(rootName, scaleKey, useFlat);
        var scaleIndices = getScaleIndices(rootName, scaleKey);
        var rootIdx = noteIndex(rootName);
        renderNotes(scaleNotes);
        renderFormula(scaleKey);
        renderIntervals(scaleKey);
        renderPiano(scaleIndices, rootIdx);
        renderFretboard(scaleIndices, rootIdx);
        renderChords(scaleNotes, scaleKey);
        updateStatus(rootName, scaleKey);
        saveState();
      }

      var TABS = [
        { btn: "tabPiano", view: "viewPiano" },
        { btn: "tabGuitar", view: "viewGuitar" },
        { btn: "tabChords", view: "viewChords" }
      ];

      function activateTab(idx) {
        TABS.forEach(function (t, i) {
          var btn = document.getElementById(t.btn);
          var view = document.getElementById(t.view);
          if (i === idx) {
            btn.classList.add("active");
            view.classList.add("active");
          } else {
            btn.classList.remove("active");
            view.classList.remove("active");
          }
        });
      }

      document.getElementById("tabPiano").onclick = function () {
        activateTab(0);
      };
      document.getElementById("tabGuitar").onclick = function () {
        activateTab(1);
      };
      document.getElementById("tabChords").onclick = function () {
        activateTab(2);
      };

      document.getElementById("btnCopyNotes").onclick = function () {
        var rootName = document.getElementById("rootNote").value;
        var scaleKey = document.getElementById("scaleMode").value;
        var useFlat = document.getElementById("noteDisplay").value === "flat";
        var notes = getScaleNotes(rootName, scaleKey, useFlat);
        var statusEl = document.getElementById("status");
        navigator.clipboard
          .writeText(notes.join(", "))
          .then(function () {
            statusEl.className = "status success";
            statusEl.textContent = "已复制：" + notes.join(", ");
          })
          .catch(function () {
            statusEl.className = "status error";
            statusEl.textContent = "复制失败";
          });
      };

      document.getElementById("btnCopyFormula").onclick = function () {
        var scaleKey = document.getElementById("scaleMode").value;
        var scale = SCALES[scaleKey];
        var text =
          scale.name + " 公式：" + scale.intervals.join(", ") + "  步进：" + scale.steps.join("-");
        var statusEl = document.getElementById("status");
        navigator.clipboard
          .writeText(text)
          .then(function () {
            statusEl.className = "status success";
            statusEl.textContent = "公式已复制";
          })
          .catch(function () {
            statusEl.className = "status error";
            statusEl.textContent = "复制失败";
          });
      };

      var LS_KEY = "music_scale_finder_v1";

      function saveState() {
        try {
          localStorage.setItem(
            LS_KEY,
            JSON.stringify({
              root: document.getElementById("rootNote").value,
              mode: document.getElementById("scaleMode").value,
              display: document.getElementById("noteDisplay").value
            })
          );
        } catch (e) {
          /* ignore */
        }
      }

      function loadState() {
        try {
          var saved = JSON.parse(localStorage.getItem(LS_KEY) || "null");
          if (!saved) return;
          if (saved.root) document.getElementById("rootNote").value = saved.root;
          if (saved.mode) document.getElementById("scaleMode").value = saved.mode;
          if (saved.display) document.getElementById("noteDisplay").value = saved.display;
        } catch (e) {
          /* ignore */
        }
      }

      document.getElementById("rootNote").addEventListener("change", render);
      document.getElementById("scaleMode").addEventListener("change", render);
      document.getElementById("noteDisplay").addEventListener("change", render);

      loadState();
      render();

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
    
