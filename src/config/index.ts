// "c-config.ts" "CLIX.ts" "mainConfig.ts"
// 谁看了谁不懵逼

// 双仓库补充更新
// 这是一个独立于 configs.example 的配置
// 因为双仓库，所以在重新部署的时候需要考虑文章和配置的克隆

const IS_DUAL_REPO: boolean = true;

const dualRepoUrl: URL = new URL("https://github.com/CILXRY/cilxry-markdown-pages");

const configsFolder = "/datas/configs";

// Add more in content.config.ts
const postsFolder = "/datas/posts";

// =========================================

export { items } from "./aboutConfig.ts";

const { PersonalConfig } = await import(`${configsFolder}/personalConfig.ts`);
const { siteConfig } = await import(`${configsFolder}/siteConfig.ts`);
const { hyperlinks } = await import(`${configsFolder}/friendlinksConfig.ts`);
const { renderedConfig } = await import(`${configsFolder}/devConfig.ts`);

export { PersonalConfig, siteConfig as SiteConfig, hyperlinks, renderedConfig };

export { navLogo, navItems } from "./navbarConfig.ts";

export { postsSchema } from "./schema.ts";
