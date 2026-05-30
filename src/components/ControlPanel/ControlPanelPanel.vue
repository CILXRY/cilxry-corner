<script setup lang="ts">
import { X } from "lucide-vue-next";

defineProps<{
  panelVisible: boolean;
  onClose: () => void;
}>();
</script>

<template>
  <div
    @click.self="onClose"
    class="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
  >
    <aside
      class="absolute right-0 top-0 h-full w-full max-w-md transition-transform duration-250 ease-out"
      :class="panelVisible ? 'translate-x-0' : 'translate-x-full'"
    >
      <div
        class="panel-scroll h-full flex flex-col bg-surface shadow-2xl overflow-y-auto"
      >
        <header
          class="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-default bg-surface"
        >
          <div>
            <h3 class="text-lg font-semibold text-primary m-0 leading-tight">
              控制中心
            </h3>
            <p class="text-xs text-tertiary m-0 mt-0.5">
              Control Center
            </p>
          </div>
          <button
            @click="onClose"
            class="w-10 h-10 rounded-lg bg-surface-secondary hover:bg-surface-tertiary transition-colors flex items-center justify-center border border-default"
            aria-label="关闭"
          >
            <X class="w-5 h-5 text-secondary" />
          </button>
        </header>

        <div class="flex-1 px-6 py-5 space-y-6">
          <slot />
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.panel-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.4) transparent;
}

.panel-scroll::-webkit-scrollbar {
  width: 5px;
}

.panel-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.panel-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.4);
  border-radius: 3px;
}
</style>
