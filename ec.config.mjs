import { defineEcConfig } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginLanguageBadge } from "expressive-code-language-badge";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

export default defineEcConfig({
  plugins: [pluginLineNumbers(), pluginLanguageBadge(), pluginCollapsibleSections()],
  styleOverrides: {
    codeFontFamily: "var(--font-list-coding)",
  },
  themes: ["tokyo-night", "snazzy-light"],
});
