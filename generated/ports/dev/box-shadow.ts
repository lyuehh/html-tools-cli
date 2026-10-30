// @ts-nocheck
// Generated from tools/dev/box-shadow.html
// Source SHA-256: d91176545b9e4e6c46ac84565bf7abf28d227534415146c501e52c6108cbbd0e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Constants
      const LS_KEY = "box_shadow_state_v1";

      // Preset styles
      const PRESETS = [
        {
          name: "柔和",
          layers: [
            {
              offsetX: 0,
              offsetY: 2,
              blur: 8,
              spread: 0,
              color: "#000000",
              opacity: 15,
              inset: false
            }
          ]
        },
        {
          name: "悬浮",
          layers: [
            {
              offsetX: 0,
              offsetY: 8,
              blur: 24,
              spread: -4,
              color: "#000000",
              opacity: 30,
              inset: false
            }
          ]
        },
        {
          name: "深层",
          layers: [
            {
              offsetX: 0,
              offsetY: 4,
              blur: 6,
              spread: -1,
              color: "#000000",
              opacity: 10,
              inset: false
            },
            {
              offsetX: 0,
              offsetY: 10,
              blur: 15,
              spread: -3,
              color: "#000000",
              opacity: 10,
              inset: false
            },
            {
              offsetX: 0,
              offsetY: 20,
              blur: 25,
              spread: -5,
              color: "#000000",
              opacity: 10,
              inset: false
            }
          ]
        },
        {
          name: "锐利",
          layers: [
            {
              offsetX: 4,
              offsetY: 4,
              blur: 0,
              spread: 0,
              color: "#000000",
              opacity: 100,
              inset: false
            }
          ]
        },
        {
          name: "新拟态凸",
          layers: [
            {
              offsetX: 6,
              offsetY: 6,
              blur: 12,
              spread: 0,
              color: "#000000",
              opacity: 30,
              inset: false
            },
            {
              offsetX: -6,
              offsetY: -6,
              blur: 12,
              spread: 0,
              color: "#ffffff",
              opacity: 8,
              inset: false
            }
          ]
        },
        {
          name: "新拟态凹",
          layers: [
            {
              offsetX: 4,
              offsetY: 4,
              blur: 8,
              spread: 0,
              color: "#000000",
              opacity: 25,
              inset: true
            },
            {
              offsetX: -4,
              offsetY: -4,
              blur: 8,
              spread: 0,
              color: "#ffffff",
              opacity: 5,
              inset: true
            }
          ]
        },
        {
          name: "青色发光",
          layers: [
            {
              offsetX: 0,
              offsetY: 0,
              blur: 20,
              spread: 2,
              color: "#00f5d4",
              opacity: 50,
              inset: false
            }
          ]
        },
        {
          name: "品红发光",
          layers: [
            {
              offsetX: 0,
              offsetY: 0,
              blur: 20,
              spread: 2,
              color: "#f72585",
              opacity: 50,
              inset: false
            }
          ]
        },
        {
          name: "多层柔和",
          layers: [
            {
              offsetX: 0,
              offsetY: 1,
              blur: 2,
              spread: 0,
              color: "#000000",
              opacity: 5,
              inset: false
            },
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: 0,
              color: "#000000",
              opacity: 5,
              inset: false
            },
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: 0,
              color: "#000000",
              opacity: 5,
              inset: false
            },
            {
              offsetX: 0,
              offsetY: 8,
              blur: 16,
              spread: 0,
              color: "#000000",
              opacity: 5,
              inset: false
            }
          ]
        },
        {
          name: "边框发光",
          layers: [
            {
              offsetX: 0,
              offsetY: 0,
              blur: 0,
              spread: 1,
              color: "#00f5d4",
              opacity: 80,
              inset: false
            },
            {
              offsetX: 0,
              offsetY: 0,
              blur: 10,
              spread: 0,
              color: "#00f5d4",
              opacity: 40,
              inset: false
            }
          ]
        }
      ];

      // State
      let state = {
        layers: [
          {
            offsetX: 0,
            offsetY: 4,
            blur: 12,
            spread: 0,
            color: "#000000",
            opacity: 25,
            inset: false,
            visible: true
          }
        ],
        currentLayer: 0,
        preview: { bgColor: "#1a1a2e", boxColor: "#3a3a5a", boxSize: 160, boxRadius: 16 }
      };

      // DOM Elements
      const previewContainer = document.getElementById("previewContainer");
      const previewBox = document.getElementById("previewBox");
      const codeOutput = document.getElementById("codeOutput");
      const statusEl = document.getElementById("status");
      const presetsGrid = document.getElementById("presetsGrid");
      const layersList = document.getElementById("layersList");

      // Sliders
      const sliders = {
        offsetX: document.getElementById("offsetX"),
        offsetY: document.getElementById("offsetY"),
        blur: document.getElementById("blur"),
        spread: document.getElementById("spread"),
        opacity: document.getElementById("opacity")
      };

      const sliderValues = {
        offsetX: document.getElementById("offsetXValue"),
        offsetY: document.getElementById("offsetYValue"),
        blur: document.getElementById("blurValue"),
        spread: document.getElementById("spreadValue"),
        opacity: document.getElementById("opacityValue")
      };

      // Preview controls
      const bgColorInput = document.getElementById("bgColor");
      const boxColorInput = document.getElementById("boxColor");
      const boxSizeInput = document.getElementById("boxSize");
      const boxRadiusInput = document.getElementById("boxRadius");
      const shadowColorInput = document.getElementById("shadowColor");
      const insetCheckbox = document.getElementById("inset");
      const insetToggle = document.getElementById("insetToggle");

      // Buttons
      const copyBtn = document.getElementById("copyBtn");
      const shareBtn = document.getElementById("shareBtn");
      const resetBtn = document.getElementById("resetBtn");
      const addLayerBtn = document.getElementById("addLayerBtn");

      // Helper: convert hex to rgba
      function hexToRgba(hex, opacity) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return "rgba(" + r + ", " + g + ", " + b + ", " + (opacity / 100).toFixed(2) + ")";
      }

      // Generate box-shadow CSS
      function generateShadowCSS() {
        const visibleLayers = state.layers.filter(function (l) {
          return l.visible !== false;
        });
        if (visibleLayers.length === 0) return "none";

        return visibleLayers
          .map(function (layer) {
            const inset = layer.inset ? "inset " : "";
            const color = hexToRgba(layer.color, layer.opacity);
            return (
              inset +
              layer.offsetX +
              "px " +
              layer.offsetY +
              "px " +
              layer.blur +
              "px " +
              layer.spread +
              "px " +
              color
            );
          })
          .join(",\n             ");
      }

      // Update preview
      window.updatePreview = function () {
        const shadow = generateShadowCSS();
        previewBox.style.boxShadow = shadow;
        previewContainer.style.background = state.preview.bgColor;
        previewBox.style.background = state.preview.boxColor;
        previewBox.style.setProperty("--box-size", state.preview.boxSize + "px");
        previewBox.style.width = state.preview.boxSize + "px";
        previewBox.style.height = state.preview.boxSize + "px";
        previewBox.style.borderRadius = state.preview.boxRadius + "px";

        // Update code output
        const cssValue = generateShadowCSS();
        codeOutput.textContent = "box-shadow: " + cssValue + ";";

        // Save state
        saveState();
      };

      // Update slider values display
      function updateSliderDisplay() {
        const layer = state.layers[state.currentLayer];
        if (!layer) return;

        sliders.offsetX.value = layer.offsetX;
        sliders.offsetY.value = layer.offsetY;
        sliders.blur.value = layer.blur;
        sliders.spread.value = layer.spread;
        sliders.opacity.value = layer.opacity;
        shadowColorInput.value = layer.color;
        insetCheckbox.checked = layer.inset;
        insetToggle.classList.toggle("active", layer.inset);

        sliderValues.offsetX.textContent = layer.offsetX + "px";
        sliderValues.offsetY.textContent = layer.offsetY + "px";
        sliderValues.blur.textContent = layer.blur + "px";
        sliderValues.spread.textContent = layer.spread + "px";
        sliderValues.opacity.textContent = layer.opacity + "%";
      }

      // Create layer item element
      function createLayerItem(layer, index) {
        const item = document.createElement("div");
        item.className = "layer-item" + (index === state.currentLayer ? " active" : "");

        const colorDiv = document.createElement("div");
        colorDiv.className = "layer-color";
        colorDiv.style.background = hexToRgba(layer.color, layer.opacity);

        const nameSpan = document.createElement("span");
        nameSpan.className = "layer-name";
        nameSpan.textContent = (layer.inset ? "Inset " : "") + "层 " + (index + 1);

        const toggleBtn = document.createElement("button");
        toggleBtn.className = "layer-toggle" + (layer.visible === false ? " hidden" : "");
        toggleBtn.setAttribute("data-index", index);
        toggleBtn.title = "切换可见性";
        toggleBtn.textContent = layer.visible === false ? "◯" : "◉";
        toggleBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          state.layers[index].visible = state.layers[index].visible === false;
          renderLayers();
          updatePreview();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "layer-delete";
        deleteBtn.setAttribute("data-index", index);
        deleteBtn.title = "删除层";
        deleteBtn.textContent = "×";
        deleteBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          if (state.layers.length > 1) {
            state.layers.splice(index, 1);
            if (state.currentLayer >= state.layers.length) {
              state.currentLayer = state.layers.length - 1;
            }
            renderLayers();
            updateSliderDisplay();
            updatePreview();
          }
        });

        item.appendChild(colorDiv);
        item.appendChild(nameSpan);
        item.appendChild(toggleBtn);
        item.appendChild(deleteBtn);

        item.addEventListener("click", function (e) {
          if (
            !e.target.classList.contains("layer-toggle") &&
            !e.target.classList.contains("layer-delete")
          ) {
            state.currentLayer = index;
            renderLayers();
            updateSliderDisplay();
          }
        });

        return item;
      }

      // Render layers list
      function renderLayers() {
        // Clear existing layers
        while (layersList.firstChild) {
          layersList.removeChild(layersList.firstChild);
        }

        state.layers.forEach(function (layer, index) {
          const item = createLayerItem(layer, index);
          layersList.appendChild(item);
        });
      }

      // Create preset button element
      function createPresetBtn(preset, index) {
        const btn = document.createElement("button");
        btn.className = "preset-btn";
        btn.title = preset.name;

        const preview = document.createElement("div");
        preview.className = "preset-preview";

        // Generate shadow for preview
        const shadowCSS = preset.layers
          .map(function (layer) {
            const inset = layer.inset ? "inset " : "";
            const color = hexToRgba(layer.color, layer.opacity);
            return (
              inset +
              layer.offsetX * 0.3 +
              "px " +
              layer.offsetY * 0.3 +
              "px " +
              layer.blur * 0.3 +
              "px " +
              layer.spread * 0.3 +
              "px " +
              color
            );
          })
          .join(", ");
        preview.style.boxShadow = shadowCSS;

        btn.appendChild(preview);
        btn.addEventListener("click", function () {
          applyPreset(index);
        });

        return btn;
      }

      // Render presets
      function renderPresets() {
        // Clear existing presets
        while (presetsGrid.firstChild) {
          presetsGrid.removeChild(presetsGrid.firstChild);
        }

        PRESETS.forEach(function (preset, index) {
          const btn = createPresetBtn(preset, index);
          presetsGrid.appendChild(btn);
        });
      }

      // Apply preset
      window.applyPreset = function (index) {
        const preset = PRESETS[index];
        state.layers = preset.layers.map(function (l) {
          return Object.assign({}, l, { visible: true });
        });
        state.currentLayer = 0;
        renderLayers();
        updateSliderDisplay();
        updatePreview();
        showStatus("已应用预设: " + preset.name, "success");
      };

      // Show status message
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status show " + type;
        setTimeout(function () {
          statusEl.classList.remove("show");
        }, 2000);
      }

      // Save state to localStorage
      function saveState() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(state));
        } catch (e) {
          // Ignore storage errors
        }
      }

      // Load state from localStorage
      function loadState() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            state = Object.assign({}, state, parsed);
            return true;
          }
        } catch (e) {
          // Ignore parse errors
        }
        return false;
      }

      // Load from URL hash
      window.loadFromUrl = function () {
        const hash = location.hash.slice(1);
        if (hash) {
          try {
            const decoded = decodeURIComponent(atob(hash));
            const parsed = JSON.parse(decoded);
            state = Object.assign({}, state, parsed);
            return true;
          } catch (e) {
            // Invalid hash, ignore
          }
        }
        return false;
      };

      // Save to URL hash
      function saveToUrl() {
        try {
          const encoded = btoa(encodeURIComponent(JSON.stringify(state)));
          history.replaceState(null, "", "#" + encoded);
        } catch (e) {
          // Ignore errors
        }
      }

      // Copy to clipboard
      window.copyCode = function () {
        const code = codeOutput.textContent;
        navigator.clipboard
          .writeText(code)
          .then(function () {
            showStatus("已复制到剪贴板", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      };

      // Share link
      function shareLink() {
        saveToUrl();
        const url = window.location.href;
        navigator.clipboard
          .writeText(url)
          .then(function () {
            showStatus("链接已复制", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      // Reset to default
      function resetState() {
        state = {
          layers: [
            {
              offsetX: 0,
              offsetY: 4,
              blur: 12,
              spread: 0,
              color: "#000000",
              opacity: 25,
              inset: false,
              visible: true
            }
          ],
          currentLayer: 0,
          preview: { bgColor: "#1a1a2e", boxColor: "#3a3a5a", boxSize: 160, boxRadius: 16 }
        };
        bgColorInput.value = state.preview.bgColor;
        boxColorInput.value = state.preview.boxColor;
        boxSizeInput.value = state.preview.boxSize;
        boxRadiusInput.value = state.preview.boxRadius;
        renderLayers();
        updateSliderDisplay();
        updatePreview();
        history.replaceState(null, "", location.pathname);
        showStatus("已重置", "success");
      }

      // Add new layer
      window.addLayer = function () {
        if (state.layers.length >= 10) {
          showStatus("最多支持 10 层阴影", "error");
          return;
        }
        state.layers.push({
          offsetX: 0,
          offsetY: 4,
          blur: 12,
          spread: 0,
          color: "#000000",
          opacity: 25,
          inset: false,
          visible: true
        });
        state.currentLayer = state.layers.length - 1;
        renderLayers();
        updateSliderDisplay();
        updatePreview();
      };

      // Event Listeners - Sliders
      Object.keys(sliders).forEach(function (key) {
        sliders[key].addEventListener("input", function () {
          const value = parseInt(sliders[key].value);
          state.layers[state.currentLayer][key] = value;
          sliderValues[key].textContent = value + (key === "opacity" ? "%" : "px");
          renderLayers();
          updatePreview();
        });
      });

      // Shadow color
      shadowColorInput.addEventListener("input", function () {
        state.layers[state.currentLayer].color = shadowColorInput.value;
        renderLayers();
        updatePreview();
      });

      // Inset toggle
      insetToggle.addEventListener("click", function () {
        const newValue = !insetCheckbox.checked;
        insetCheckbox.checked = newValue;
        insetToggle.classList.toggle("active", newValue);
        state.layers[state.currentLayer].inset = newValue;
        renderLayers();
        updatePreview();
      });

      // Preview controls
      bgColorInput.addEventListener("input", function () {
        state.preview.bgColor = bgColorInput.value;
        updatePreview();
      });

      boxColorInput.addEventListener("input", function () {
        state.preview.boxColor = boxColorInput.value;
        updatePreview();
      });

      boxSizeInput.addEventListener("input", function () {
        state.preview.boxSize = parseInt(boxSizeInput.value) || 160;
        updatePreview();
      });

      boxRadiusInput.addEventListener("input", function () {
        state.preview.boxRadius = parseInt(boxRadiusInput.value) || 0;
        updatePreview();
      });

      // Buttons
      copyBtn.addEventListener("click", copyCode);
      shareBtn.addEventListener("click", shareLink);
      resetBtn.addEventListener("click", resetState);
      addLayerBtn.addEventListener("click", addLayer);

      // Initialize
      function init() {
        // Try to load from URL first, then localStorage
        if (!loadFromUrl()) {
          loadState();
        }

        // Update preview controls
        bgColorInput.value = state.preview.bgColor;
        boxColorInput.value = state.preview.boxColor;
        boxSizeInput.value = state.preview.boxSize;
        boxRadiusInput.value = state.preview.boxRadius;

        renderPresets();
        renderLayers();
        updateSliderDisplay();
        updatePreview();
      }

      init();

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
    
