// @ts-nocheck
// Generated from tools/generator/uuid-generator.html
// Source SHA-256: 2c757c1bffc0614130bd3444eb744f909fb04e64bf3554b0ebe472473d72e785
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        var idTypeEl = document.getElementById("idType");
        var formatEl = document.getElementById("format");
        var countEl = document.getElementById("count");
        var singleResultEl = document.getElementById("singleResult");
        var singleIdEl = document.getElementById("singleId");
        var batchOutputEl = document.getElementById("batchOutput");
        var statusEl = document.getElementById("status");
        var ULID_CHARS = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
        var statusTimer;

        function randomBytes(n) {
          var b = new Uint8Array(n);
          crypto.getRandomValues(b);
          return b;
        }

        function bytesToUuid(bytes) {
          var hex = Array.prototype.map
            .call(bytes, function (b) {
              return b.toString(16).padStart(2, "0");
            })
            .join("");
          return (
            hex.slice(0, 8) +
            "-" +
            hex.slice(8, 12) +
            "-" +
            hex.slice(12, 16) +
            "-" +
            hex.slice(16, 20) +
            "-" +
            hex.slice(20)
          );
        }

        function uuidV4() {
          var b = randomBytes(16);
          b[6] = (b[6] & 0x0f) | 0x40;
          b[8] = (b[8] & 0x3f) | 0x80;
          return bytesToUuid(b);
        }

        function uuidV7() {
          var now = Date.now();
          var b = randomBytes(16);
          b[0] = Math.floor(now / 0x10000000000) & 0xff;
          b[1] = Math.floor(now / 0x100000000) & 0xff;
          b[2] = Math.floor(now / 0x1000000) & 0xff;
          b[3] = Math.floor(now / 0x10000) & 0xff;
          b[4] = Math.floor(now / 0x100) & 0xff;
          b[5] = now & 0xff;
          b[6] = (b[6] & 0x0f) | 0x70;
          b[8] = (b[8] & 0x3f) | 0x80;
          return bytesToUuid(b);
        }

        function ulid() {
          var t = Date.now();
          var time = "";
          for (var i = 0; i < 10; i++) {
            time = ULID_CHARS[t % 32] + time;
            t = Math.floor(t / 32);
          }
          var rand = "";
          var b = randomBytes(16);
          for (var j = 0; j < 16; j++) {
            rand += ULID_CHARS[b[j] & 0x1f];
          }
          return time + rand;
        }

        function formatId(id, type) {
          var fmt = formatEl.value;
          if (type === "ulid") {
            return fmt === "upper" ? id : id.toLowerCase();
          }
          if (fmt === "upper") return id.toUpperCase();
          if (fmt === "nohyphen") return id.replace(/-/g, "");
          return id;
        }

        function makeOne() {
          var type = idTypeEl.value;
          var raw = type === "uuid7" ? uuidV7() : type === "ulid" ? ulid() : uuidV4();
          return formatId(raw, type);
        }

        function flash(msg, ok) {
          statusEl.textContent = msg;
          statusEl.style.color = ok === false ? "var(--accent-red)" : "var(--accent-green)";
          clearTimeout(statusTimer);
          statusTimer = setTimeout(function () {
            statusEl.textContent = "";
          }, 2200);
        }

        function generate() {
          var n = Math.min(Math.max(parseInt(countEl.value, 10) || 1, 1), 100);
          countEl.value = n;
          if (n === 1) {
            singleIdEl.textContent = makeOne();
            singleResultEl.style.display = "flex";
            batchOutputEl.style.display = "none";
          } else {
            var ids = [];
            for (var i = 0; i < n; i++) {
              ids.push(makeOne());
            }
            batchOutputEl.value = ids.join("\n");
            singleResultEl.style.display = "none";
            batchOutputEl.style.display = "block";
          }
        }

        function copy(text) {
          if (!text || text === "-") return;
          navigator.clipboard.writeText(text).then(
            function () {
              flash("✓ 已复制到剪贴板");
            },
            function () {
              flash("复制失败，请手动选择", false);
            }
          );
        }

        document.getElementById("btnGenerate").addEventListener("click", generate);
        idTypeEl.addEventListener("change", generate);
        formatEl.addEventListener("change", generate);

        document.getElementById("btnCopySingle").addEventListener("click", function () {
          copy(singleIdEl.textContent);
        });

        document.getElementById("btnCopy").addEventListener("click", function () {
          copy(
            batchOutputEl.style.display !== "none" ? batchOutputEl.value : singleIdEl.textContent
          );
        });

        document.getElementById("btnClear").addEventListener("click", function () {
          singleIdEl.textContent = "-";
          batchOutputEl.value = "";
          batchOutputEl.style.display = "none";
          singleResultEl.style.display = "flex";
          flash("已清空");
        });

        generate();
      })();
    
