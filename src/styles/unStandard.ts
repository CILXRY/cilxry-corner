import type { Rule } from "unocss";
export const unSRule: Rule[] = [
  // ========================================
  // 文字颜色
  // ========================================
  [
    /^text-(primary|secondary|tertiary|muted|colord)$/,
    ([, type]) => {
      const priority = {
        primary: "text-primary",
        secondary: "text-secondary",
        tertiary: "text-tertiary",
        colord: "text-colord",
      }[type];
      return {
        color: `var(--${priority})`,
      };
    },
  ],

  // ========================================
  // 背景颜色
  // ========================================
  [
    /^bg-surface(-secondary|-tertiary|-elevated)?$/,
    ([, suffix]) => {
      const colors: Record<string, string> = {
        "": "oklch(0.15 0.03 var(--primary-h))",
        "-secondary": "oklch(0.18 0.04 var(--primary-h))",
        "-tertiary": "oklch(0.22 0.05 var(--primary-h))",
        "-elevated": "oklch(0.25 0.05 var(--primary-h))",
      };
      return { "background-color": colors[suffix ?? ""] };
    },
  ],

  // ========================================
  // 主色按钮/交互元素
  // ========================================
  [
    /^btn-primary-(default|hover|active|light|dark)$/,
    ([, type]) => {
      const calculations = {
        default: "var(--primary-l-dark)",
        hover: "calc(var(--primary-l-dark) + 0.08)",
        active: "calc(var(--primary-l-dark) + 0.12)",
        light: "calc(var(--primary-l-dark) - 0.15)",
        dark: "calc(var(--primary-l-dark) + 0.15)",
      }[type];
      return {
        "background-color": `oklch(${calculations} var(--primary-c) var(--primary-h))`,
        color: type === "default" ? "#fff" : "inherit",
      };
    },
  ],

  // ========================================
  // 边框颜色
  // ========================================
  [
    /^border-(default|hover|focus)$/,
    ([, type]) => {
      const colors = {
        default: "oklch(0.3 0.05 var(--primary-h))",
        hover: "oklch(0.4 0.06 var(--primary-h))",
        focus: "oklch(var(--primary-l-dark) var(--primary-c) var(--primary-h))",
      }[type];
      return { "border-color": colors };
    },
  ],

  // ========================================
  // 阴影
  // ========================================
  [
    /^shadow-themed-(sm|md|lg)$/,
    ([, size]) => {
      const shadows = {
        sm: "oklch(0.1 0.03 var(--primary-h) / 0.3)",
        md: "oklch(0.1 0.03 var(--primary-h) / 0.4)",
        lg: "oklch(0.1 0.03 var(--primary-h) / 0.5)",
      }[size];
      return { "box-shadow": `0 4px 6px -1px ${shadows}` };
    },
  ],

  // ========================================
  // 链接颜色
  // ========================================
  [
    /^link-(default|hover|visited)$/,
    ([, type]) => {
      const calculations = {
        default: "calc(var(--primary-l-dark) + 0.15)",
        hover: "calc(var(--primary-l-dark) + 0.2)",
        visited: "calc(var(--primary-l-dark) + 0.1)",
      }[type];
      return {
        color: `oklch(${calculations} var(--primary-c) var(--primary-h))`,
      };
    },
  ],

  // ========================================
  // 标题颜色
  // ========================================
  [
    /^heading-(h[1-4])$/,
    ([, level]) => {
      const configs: Record<string, [string, string]> = {
        h1: ["0.98", "0.02"],
        h2: ["0.95", "0.02"],
        h3: ["0.92", "0.03"],
        h4: ["0.9", "0.03"],
      };
      const [l, c] = configs[level]!;
      return { color: `oklch(${l} ${c} var(--primary-h))` };
    },
  ],

  // ========================================
  // 状态颜色
  // ========================================
  ["status-success", { color: "oklch(0.65 0.12 150)" }],
  ["status-warning", { color: "oklch(0.7 0.15 75)" }],
  ["status-error", { color: "oklch(0.6 0.18 25)" }],
  ["status-info", { color: "oklch(0.65 0.1 240)" }],
];
