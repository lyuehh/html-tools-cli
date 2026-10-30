// @ts-nocheck
// Generated from tools/dev/protobuf-decoder.html
// Source SHA-256: 6b5bd08c182c21ba942c7e7521942ba98a2708a703d9edbe6c24a7a5edbedee2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const WIRE_TYPES = {
        0: "Varint",
        1: "64-bit",
        2: "Length-delimited",
        5: "32-bit"
      };

      window.decode = function () {
        const input = document.getElementById("input").value.trim();
        const output = document.getElementById("output");

        if (!input) {
          output.innerHTML = '<span style="color:var(--text-muted)">请输入数据</span>';
          return;
        }

        try {
          // Decode base64
          const binary = atob(input);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }

          const fields = parseProtobuf(bytes);
          output.innerHTML = renderFields(fields, 0);
        } catch (e) {
          output.innerHTML = `<span style="color:#ff6b6b">解码错误: ${e.message}</span>`;
        }
      };

      function parseProtobuf(bytes, offset = 0, end = bytes.length) {
        const fields = [];
        let pos = offset;

        while (pos < end) {
          const [tag, newPos] = readVarint(bytes, pos);
          pos = newPos;

          const fieldNum = tag >> 3;
          const wireType = tag & 0x7;

          let value, rawBytes;

          switch (wireType) {
            case 0: // Varint
              const [v, p] = readVarint(bytes, pos);
              value = v;
              pos = p;
              break;
            case 1: // 64-bit
              value = bytes.slice(pos, pos + 8);
              pos += 8;
              break;
            case 2: // Length-delimited
              const [len, lenPos] = readVarint(bytes, pos);
              pos = lenPos;
              rawBytes = bytes.slice(pos, pos + len);
              // Try to decode as string or nested message
              try {
                const str = new TextDecoder().decode(rawBytes);
                if (/^[\x20-\x7E\s]*$/.test(str)) {
                  value = { type: "string", data: str };
                } else {
                  throw new Error("Not a string");
                }
              } catch {
                try {
                  const nested = parseProtobuf(rawBytes, 0, rawBytes.length);
                  if (nested.length > 0) {
                    value = { type: "message", data: nested };
                  } else {
                    value = { type: "bytes", data: rawBytes };
                  }
                } catch {
                  value = { type: "bytes", data: rawBytes };
                }
              }
              pos += len;
              break;
            case 5: // 32-bit
              value = bytes.slice(pos, pos + 4);
              pos += 4;
              break;
            default:
              throw new Error(`Unknown wire type: ${wireType}`);
          }

          fields.push({ fieldNum, wireType, value });
        }

        return fields;
      }

      function readVarint(bytes, pos) {
        let result = 0n;
        let shift = 0n;
        while (pos < bytes.length) {
          const byte = bytes[pos++];
          result |= BigInt(byte & 0x7f) << shift;
          if ((byte & 0x80) === 0) break;
          shift += 7n;
        }
        return [Number(result), pos];
      }

      function renderFields(fields, indent) {
        const pad = "  ".repeat(indent);
        return fields
          .map((f) => {
            let valueStr;
            if (typeof f.value === "object" && f.value !== null) {
              if (f.value.type === "string") {
                valueStr = `"${f.value.data}"`;
              } else if (f.value.type === "message") {
                valueStr = "{\n" + renderFields(f.value.data, indent + 1) + pad + "}";
              } else if (f.value.type === "bytes") {
                valueStr =
                  "[" +
                  Array.from(f.value.data)
                    .map((b) => b.toString(16).padStart(2, "0"))
                    .join(" ") +
                  "]";
              } else if (f.value instanceof Uint8Array) {
                valueStr =
                  "[" +
                  Array.from(f.value)
                    .map((b) => b.toString(16).padStart(2, "0"))
                    .join(" ") +
                  "]";
              }
            } else {
              valueStr = String(f.value);
            }
            return `${pad}<div class="field"><div class="field-header">Field ${f.fieldNum} <span class="wire-type">(${WIRE_TYPES[f.wireType] || f.wireType})</span></div><div class="field-value">${valueStr}</div></div>`;
          })
          .join("\n");
      }

      window.clearAll = function () {
        document.getElementById("input").value = "";
        document.getElementById("output").innerHTML =
          '<span style="color:var(--text-muted)">解码结果将显示在这里</span>';
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
