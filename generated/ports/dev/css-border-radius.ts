// @ts-nocheck
// Generated from tools/dev/css-border-radius.html
// Source SHA-256: 976d8a572af60a76bfa818a77e5ffba29081e1ccd5a3865c33014db23480ba84
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const corners = ["tl", "tr", "bl", "br"];
      const dirs = ["h", "v"];

      function updateRadius(changed) {
        const linked = document.getElementById("linked").checked;

        if (linked) {
          const value = document.getElementById(changed).value;
          corners.forEach((c) => {
            dirs.forEach((d) => {
              document.getElementById(`${c}-${d}`).value = value;
              document.getElementById(`${c}-${d}-val`).textContent = value + "px";
            });
          });
        } else {
          document.getElementById(changed + "-val").textContent =
            document.getElementById(changed).value + "px";
        }

        render();
      }

      function render() {
        const values = {};
        corners.forEach((c) => {
          dirs.forEach((d) => {
            values[`${c}-${d}`] = document.getElementById(`${c}-${d}`).value;
          });
        });

        const h = `${values["tl-h"]}px ${values["tr-h"]}px ${values["br-h"]}px ${values["bl-h"]}px`;
        const v = `${values["tl-v"]}px ${values["tr-v"]}px ${values["br-v"]}px ${values["bl-v"]}px`;

        const isSimple = corners.every((c) => values[`${c}-h`] === values[`${c}-v`]);
        const isUniform = corners.every(
          (c) => values[`${c}-h`] === values["tl-h"] && values[`${c}-v`] === values["tl-v"]
        );

        let css;
        if (isUniform && isSimple) {
          css = `border-radius: ${values["tl-h"]}px;`;
        } else if (isSimple) {
          css = `border-radius: ${values["tl-h"]}px ${values["tr-h"]}px ${values["br-h"]}px ${values["bl-h"]}px;`;
        } else {
          css = `border-radius: ${h} / ${v};`;
        }

        document.getElementById("preview").style.borderRadius = `${h} / ${v}`;
        document.getElementById("output").textContent = css;
      }

      function applyPreset(tl, tr, br, bl) {
        document.getElementById("tl-h").value = document.getElementById("tl-v").value = tl;
        document.getElementById("tr-h").value = document.getElementById("tr-v").value = tr;
        document.getElementById("br-h").value = document.getElementById("br-v").value = br;
        document.getElementById("bl-h").value = document.getElementById("bl-v").value = bl;

        corners.forEach((c) => {
          dirs.forEach((d) => {
            document.getElementById(`${c}-${d}-val`).textContent =
              document.getElementById(`${c}-${d}`).value + "px";
          });
        });

        render();
      }

      function toggleLink() {
        if (document.getElementById("linked").checked) {
          const value = document.getElementById("tl-h").value;
          corners.forEach((c) => {
            dirs.forEach((d) => {
              document.getElementById(`${c}-${d}`).value = value;
              document.getElementById(`${c}-${d}-val`).textContent = value + "px";
            });
          });
          render();
        }
      }

      function copyCSS() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
        alert("已复制到剪贴板!");
      }

      render();
    
