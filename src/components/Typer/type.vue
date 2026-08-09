<template>
  <div class="typer-wrap">
    <span class="typer-wave">👋</span>
    <h1 class="typer-text">
      <span class="typer-cursor" v-if="currentText === ''">|</span>
      <span>{{ currentText }}</span>
      <span class="typer-cursor">|</span>
    </h1>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 配置内容
const messages = [
  "Hi There.",
  "I'm CILXRY!",
  "From Shanghai, China",
  "Welcome to my site!"
]

const currentText = ref('')
let currentIndex = 0
let isErasing = false
let timer = null

onMounted(() => {
  // 初始显示完整的第一句，然后开始循环
  currentText.value = messages[0]
  setTimeout(() => {
    isErasing = true
    timer = setTimeout(startTyping, 300)
  }, 2000)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

function startTyping() {
  const text = messages[currentIndex]

  if (isErasing) {
    currentText.value = text.slice(0, currentText.value.length - 1)
    if (currentText.value === '') {
      isErasing = false
      currentIndex = (currentIndex + 1) % messages.length
      timer = setTimeout(startTyping, 400)
    } else {
      timer = setTimeout(startTyping, 30)
    }
  } else {
    currentText.value = text.slice(0, currentText.value.length + 1)
    if (currentText.value === text) {
      isErasing = true
      timer = setTimeout(startTyping, 2000)
    } else {
      timer = setTimeout(startTyping, 70)
    }
  }
}
</script>

<style scoped>
.typer-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.typer-wave {
  font-size: 2rem;
  line-height: 1;
  animation: wave 2.5s ease-in-out infinite;
}
.typer-text {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 300;
  color: var(--text-colord);
  margin: 0;
  letter-spacing: 0.03em;
}
.typer-cursor {
  display: inline-block;
  font-weight: 100;
  color: var(--primary);
  animation: blink 0.8s step-end infinite;
  margin-left: 1px;
}
@keyframes blink {
  50% { opacity: 0; }
}
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  75% { transform: rotate(-10deg); }
}
</style>
