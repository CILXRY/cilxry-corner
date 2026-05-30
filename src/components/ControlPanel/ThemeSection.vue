<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Palette } from "lucide-vue-next";
import { applyThemeColor } from "@/utils/CustomizationUtils/themeUtils.ts";

const themeColor = ref(275);

const handleThemeColorChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const color = parseInt(target.value);
  themeColor.value = color;
  applyThemeColor(color);
};

onMounted(() => {
  const saved = localStorage.getItem("ThemeColor");
  if (saved) themeColor.value = parseInt(saved);
});
</script>

<template>
  <div class="p-5 rounded-xl border border-default bg-surface-secondary">
    <div class="flex items-center gap-3 mb-4">
      <Palette class="w-5 h-5 flex-shrink-0 text-secondary" />
      <span class="text-sm font-medium text-primary">主题色</span>
      <span class="text-xs text-tertiary ml-auto">Color</span>
    </div>
    <input
      type="range"
      min="0"
      max="360"
      step="2"
      :value="themeColor"
      @input="handleThemeColorChange"
      class="w-full h-2 b-rd-1 cursor-pointer theme-slider"
    />
    <div class="flex justify-between mt-1.5">
      <span class="text-xs text-tertiary">0°</span>
      <span class="text-xs text-tertiary">360°</span>
    </div>
  </div>
</template>

<style scoped>
.theme-slider {
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(
    to right,
    oklch(0.77 0.11 0),
    oklch(0.77 0.11 60),
    oklch(0.77 0.11 120),
    oklch(0.77 0.11 180),
    oklch(0.77 0.11 240),
    oklch(0.77 0.11 300),
    oklch(0.77 0.11 360)
  );
}

.theme-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s;
}

.theme-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.theme-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s;
}

.theme-slider::-moz-range-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>
