<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 配置：替换成你的 Sleepy 后端地址
const SLEEPY_API_BASE = "http://192.168.54.182:8080"; // 开发时
// const SLEEPY_API_BASE = 'https://status.yourdomain.com' // 生产时

// 响应式数据
const statusName = ref("");
const statusDesc = ref("");
const statusColor = ref("#888888");
const updatedAt = ref("");
const privacyMode = ref(false);
const devices = ref([]);

let eventSource = null;
let pollInterval = null; // ← 新增：轮询定时器

// 获取状态（复用）
async function fetchStatus() {
  try {
    const res = await fetch(`${SLEEPY_API_BASE}/api/status/query`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    updateUI(data);
  } catch (err) {
    console.warn("⚠️ 轮询获取状态失败:", err.message);
  }
}

// 获取初始状态
async function fetchInitialStatus() {
  try {
    const res = await fetch(`${SLEEPY_API_BASE}/api/status/query`);
    if (!res.ok) throw new Error("API 请求失败");
    const data = await res.json();

    updateUI(data);
  } catch (err) {
    console.error("❌ 无法加载 Sleepy 状态:", err);
    statusName.value = "加载失败";
    statusDesc.value = "请检查网络或后端是否运行";
  }
}

// 更新 UI 的通用函数
function updateUI(data) {
  const status = data.status;
  statusName.value = status.name || "未知";
  statusDesc.value = status.desc || "";
  // 简单颜色映射（你可以根据实际 color 字段扩展）
  statusColor.value = status.color === "awake" ? "#4CAF50" : "#FF5722";
  updatedAt.value = new Date(data.last_updated * 1000).toLocaleString("zh-CN");

  const deviceData = data.device || {};
  devices.value = Object.values(deviceData).map((d) => ({
    id: d.id,
    name: d.show_name,
    in_use: d.using,
    app: d.status || "",
    custom: {},
  }));
}

// 初始化 SSE 连接
function setupSSE() {
  eventSource = new EventSource(`${SLEEPY_API_BASE}/api/status/events`);
  eventSource.onmessage = (e) => {
    const data = JSON.parse(e.data);
    updateUI(data);
  };
  eventSource.onerror = () => {
    console.warn("SSE 连接异常，将依赖轮询更新");
  };
}

function startPolling(interval = 30_000) {
  pollInterval = setInterval(() => {
    fetchStatus();
  }, interval);
}

function cleanup() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
  if (pollInterval) {
    clearInterval(pollInterval);
    pollInterval = null;
  }
}

// 生命周期
onMounted(() => {
  fetchStatus(); // 立即加载一次
  setupSSE(); // 启动实时推送
  startPolling(2_000); // 每 30 秒轮询一次（兜底）
});

onUnmounted(() => {
  cleanup();
});
</script>

<template class="text-left">
  <div class="container">
    <div
      class="status-card"
      :style="{ backgroundColor: statusColor }"
    >
      <h2>{{ statusName }}</h2>
      <p>{{ statusDesc }}</p>
      <small>更新于：{{ updatedAt }}</small>
    </div>

    <div
      v-if="privacyMode"
      class="privacy-note"
    >
      🔒 隐私模式已启用，设备信息已隐藏
    </div>

    <div
      v-else
      class="devices"
    >
      <h3>设备状态</h3>
      <div
        v-for="device in devices"
        :key="device.id"
        class="device-item"
      >
        <strong>{{ device.name }}</strong>：
        <span
          v-if="device.in_use"
          class="in-use"
        >
          正在使用（{{ device.app || "未知应用" }}）
        </span>
        <span
          v-else
          class="idle"
        >空闲</span>
        <div
          v-if="device.custom && Object.keys(device.custom).length > 0"
          class="custom"
        >
          {{ JSON.stringify(device.custom) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.status-card {
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.status-card h2 {
  margin: 0 0 8px;
}
.status-card p {
  margin: 0 0 12px;
  opacity: 0.9;
}
.privacy-note {
  background: #fff8e1;
  padding: 12px;
  border-left: 4px solid #ffc107;
  margin-bottom: 24px;
  border-radius: 4px;
}
.devices h3 {
  margin-bottom: 16px;
}
.device-item {
  background: #f8f9fa;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}
.in-use {
  color: #e91e63;
  font-weight: bold;
}
.idle {
  color: #6c757d;
}
.custom {
  margin-top: 6px;
  font-size: 0.9em;
  color: #555;
}
</style>
