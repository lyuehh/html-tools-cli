// @ts-nocheck
// Generated from tools/dev/css-text-shadow.html
// Source SHA-256: 51a5f1a4421cca19f4671f7fb05f4a3d27fe2fc460980e2f269a15a3e376d765
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let shadowLayers = [{ offsetX: 2, offsetY: 2, blur: 4, color: "#000000", opacity: 50 }];

      function renderLayers() {
        const container = document.getElementById("layersContainer");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        shadowLayers.forEach((layer, index) => {
          const layerDiv = document.createElement("div");
          layerDiv.className = "shadow-layer";
          layerDiv.id = "layer-" + index;

          const layerHTML = createLayerHTML(index, layer);
          layerDiv.appendChild(layerHTML);
          container.appendChild(layerDiv);
        });

        updateShadow();
      }

      function createLayerHTML(index, layer) {
        const fragment = document.createDocumentFragment();

        const titleDiv = document.createElement("div");
        titleDiv.className = "layer-title";

        const h4 = document.createElement("h4");
        h4.textContent = "图层 " + (index + 1);
        titleDiv.appendChild(h4);

        const actionsDiv = document.createElement("div");
        actionsDiv.className = "layer-actions";

        if (index > 0) {
          const upBtn = document.createElement("button");
          upBtn.textContent = "↑";
          upBtn.onclick = function () {
            moveLayer(index, -1);
          };
          actionsDiv.appendChild(upBtn);
        }

        if (index < shadowLayers.length - 1) {
          const downBtn = document.createElement("button");
          downBtn.textContent = "↓";
          downBtn.onclick = function () {
            moveLayer(index, 1);
          };
          actionsDiv.appendChild(downBtn);
        }

        const dupBtn = document.createElement("button");
        dupBtn.textContent = "复制";
        dupBtn.onclick = function () {
          duplicateLayer(index);
        };
        actionsDiv.appendChild(dupBtn);

        if (shadowLayers.length > 1) {
          const delBtn = document.createElement("button");
          delBtn.className = "delete";
          delBtn.textContent = "删除";
          delBtn.onclick = function () {
            deleteLayer(index);
          };
          actionsDiv.appendChild(delBtn);
        }

        titleDiv.appendChild(actionsDiv);
        fragment.appendChild(titleDiv);

        const controlRow1 = document.createElement("div");
        controlRow1.className = "control-row";
        controlRow1.appendChild(
          createSliderControl("X 偏移", "offsetX", index, layer.offsetX, -50, 50, "px")
        );
        controlRow1.appendChild(
          createSliderControl("Y 偏移", "offsetY", index, layer.offsetY, -50, 50, "px")
        );
        fragment.appendChild(controlRow1);

        const controlRow2 = document.createElement("div");
        controlRow2.className = "control-row";
        controlRow2.appendChild(
          createSliderControl("模糊", "blur", index, layer.blur, 0, 50, "px")
        );
        controlRow2.appendChild(
          createSliderControl("透明度", "opacity", index, layer.opacity, 0, 100, "%")
        );
        fragment.appendChild(controlRow2);

        const colorGroup = document.createElement("div");
        colorGroup.className = "control-group";

        const colorLabel = document.createElement("label");
        colorLabel.textContent = "颜色";
        colorGroup.appendChild(colorLabel);

        const colorInputDiv = document.createElement("div");
        colorInputDiv.className = "color-input";

        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.value = layer.color;
        colorPicker.oninput = function () {
          shadowLayers[index].color = this.value;
          document.getElementById("colorText-" + index).value = this.value;
          updateShadow();
        };
        colorInputDiv.appendChild(colorPicker);

        const colorText = document.createElement("input");
        colorText.type = "text";
        colorText.id = "colorText-" + index;
        colorText.value = layer.color;
        colorText.oninput = function () {
          if (/^#[0-9A-Fa-f]{6}$/.test(this.value)) {
            shadowLayers[index].color = this.value;
            colorPicker.value = this.value;
            updateShadow();
          }
        };
        colorInputDiv.appendChild(colorText);

        colorGroup.appendChild(colorInputDiv);
        fragment.appendChild(colorGroup);

        return fragment;
      }

      function createSliderControl(label, prop, index, value, min, max, unit) {
        const div = document.createElement("div");
        div.className = "control-group";

        const header = document.createElement("div");
        header.className = "control-header";

        const labelEl = document.createElement("label");
        labelEl.textContent = label;
        header.appendChild(labelEl);

        const valueSpan = document.createElement("span");
        valueSpan.className = "control-value";
        valueSpan.id = prop + "Value-" + index;
        valueSpan.textContent = value + unit;
        header.appendChild(valueSpan);

        div.appendChild(header);

        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.oninput = function () {
          shadowLayers[index][prop] = parseInt(this.value);
          document.getElementById(prop + "Value-" + index).textContent = this.value + unit;
          updateShadow();
        };
        div.appendChild(slider);

        return div;
      }

      window.addLayer = function () {
        shadowLayers.push({ offsetX: 2, offsetY: 2, blur: 4, color: "#000000", opacity: 50 });
        renderLayers();
      };

      function deleteLayer(index) {
        if (shadowLayers.length > 1) {
          shadowLayers.splice(index, 1);
          renderLayers();
        }
      }

      function duplicateLayer(index) {
        const copy = Object.assign({}, shadowLayers[index]);
        shadowLayers.splice(index + 1, 0, copy);
        renderLayers();
      }

      function moveLayer(index, direction) {
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < shadowLayers.length) {
          const temp = shadowLayers[index];
          shadowLayers[index] = shadowLayers[newIndex];
          shadowLayers[newIndex] = temp;
          renderLayers();
        }
      }

      function updateShadow() {
        const shadows = shadowLayers.map((layer) => {
          const r = parseInt(layer.color.slice(1, 3), 16);
          const g = parseInt(layer.color.slice(3, 5), 16);
          const b = parseInt(layer.color.slice(5, 7), 16);
          const a = layer.opacity / 100;
          return (
            layer.offsetX +
            "px " +
            layer.offsetY +
            "px " +
            layer.blur +
            "px rgba(" +
            r +
            ", " +
            g +
            ", " +
            b +
            ", " +
            a +
            ")"
          );
        });

        const shadowValue = shadows.join(", ");
        document.getElementById("previewText").style.textShadow = shadowValue;

        generateCode(shadows);
      }

      function updatePreviewText() {
        const text = document.getElementById("previewContent").value || "Text";
        const fontSize = document.getElementById("fontSize").value;
        const textColor = document.getElementById("textColor").value;

        const previewText = document.getElementById("previewText");
        previewText.textContent = text;
        previewText.style.fontSize = fontSize + "px";
        previewText.style.color = textColor;
      }

      window.setBg = function (bg, el) {
        document.querySelectorAll(".bg-option").forEach((opt) => opt.classList.remove("active"));
        el.classList.add("active");
        document.getElementById("previewStage").style.background = bg;
      };

      window.applyPreset = function (preset) {
        switch (preset) {
          case "simple":
            shadowLayers = [{ offsetX: 2, offsetY: 2, blur: 4, color: "#000000", opacity: 30 }];
            break;
          case "neon":
            shadowLayers = [
              { offsetX: 0, offsetY: 0, blur: 10, color: "#00ffff", opacity: 100 },
              { offsetX: 0, offsetY: 0, blur: 20, color: "#00ffff", opacity: 80 },
              { offsetX: 0, offsetY: 0, blur: 40, color: "#00ffff", opacity: 60 },
              { offsetX: 0, offsetY: 0, blur: 80, color: "#00ffff", opacity: 40 }
            ];
            document.getElementById("textColor").value = "#ffffff";
            setBg("#1a1a2e", document.querySelectorAll(".bg-option")[3]);
            break;
          case "retro":
            shadowLayers = [
              { offsetX: 1, offsetY: 1, blur: 0, color: "#e74c3c", opacity: 100 },
              { offsetX: 2, offsetY: 2, blur: 0, color: "#e74c3c", opacity: 100 },
              { offsetX: 3, offsetY: 3, blur: 0, color: "#c0392b", opacity: 100 },
              { offsetX: 4, offsetY: 4, blur: 0, color: "#c0392b", opacity: 100 },
              { offsetX: 5, offsetY: 5, blur: 0, color: "#a93226", opacity: 100 }
            ];
            break;
          case "outline":
            shadowLayers = [
              { offsetX: -1, offsetY: -1, blur: 0, color: "#000000", opacity: 100 },
              { offsetX: 1, offsetY: -1, blur: 0, color: "#000000", opacity: 100 },
              { offsetX: -1, offsetY: 1, blur: 0, color: "#000000", opacity: 100 },
              { offsetX: 1, offsetY: 1, blur: 0, color: "#000000", opacity: 100 }
            ];
            document.getElementById("textColor").value = "#ffffff";
            break;
          case "fire":
            shadowLayers = [
              { offsetX: 0, offsetY: -2, blur: 4, color: "#ffff00", opacity: 100 },
              { offsetX: 0, offsetY: -4, blur: 8, color: "#ff9500", opacity: 80 },
              { offsetX: 0, offsetY: -8, blur: 12, color: "#ff0000", opacity: 60 }
            ];
            document.getElementById("textColor").value = "#ff6600";
            setBg("#1a1a2e", document.querySelectorAll(".bg-option")[3]);
            break;
          case "emboss":
            shadowLayers = [
              { offsetX: -1, offsetY: -1, blur: 1, color: "#ffffff", opacity: 80 },
              { offsetX: 1, offsetY: 1, blur: 1, color: "#000000", opacity: 30 }
            ];
            document.getElementById("textColor").value = "#cccccc";
            setBg("#f5f5f5", document.querySelectorAll(".bg-option")[1]);
            break;
          case "glow":
            shadowLayers = [
              { offsetX: 0, offsetY: 0, blur: 5, color: "#ff00ff", opacity: 100 },
              { offsetX: 0, offsetY: 0, blur: 10, color: "#ff00ff", opacity: 80 },
              { offsetX: 0, offsetY: 0, blur: 20, color: "#ff00ff", opacity: 60 }
            ];
            document.getElementById("textColor").value = "#ffffff";
            setBg("#333333", document.querySelectorAll(".bg-option")[2]);
            break;
          case "long":
            shadowLayers = [];
            for (let i = 1; i <= 20; i++) {
              shadowLayers.push({
                offsetX: i,
                offsetY: i,
                blur: 0,
                color: "#3498db",
                opacity: Math.max(20, 100 - i * 4)
              });
            }
            document.getElementById("textColor").value = "#2980b9";
            break;
        }

        updatePreviewText();
        renderLayers();
      };

      function generateCode(shadows) {
        let css = ".element {\n";
        css += "  text-shadow: " + shadows.join(",\n               ") + ";\n";
        css += "}";
        document.getElementById("codeOutput").textContent = css;
      }

      window.copyCode = function () {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code).then(() => {
          const btn = document.querySelector(".copy-btn");
          btn.textContent = "已复制!";
          setTimeout(() => {
            btn.textContent = "复制代码";
          }, 2000);
        });
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        html.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
      };

      renderLayers();
    
