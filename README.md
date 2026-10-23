# Folioxa

设计师作品集，React / Next.js / TypeScript / Framer Motion。首页、作品列表、四个案例、联系、隐私政策和服务条款；默认中文，英文 /en。

## 使用

Node 版本见 .nvmrc，pnpm 9.15.4。执行 pnpm install --frozen-lockfile，然后 pnpm dev；默认 http://127.0.0.1:43336，可用 PORT 改端口。停止用 Ctrl+C。生产 pnpm build 后 pnpm start。运行前复制 .env.example 为 .env（不要求私密参数）。

检查：pnpm typecheck、pnpm lint、pnpm test、pnpm build。发布包：提交后 pnpm bundle。安装会访问包仓库；表单不访问网络、不保存业务数据。主题、内容与品牌入口见 .tpl/docs/CUSTOMIZATION.md。许可与素材来源见 .tpl/docs/LICENSE.md 和 ASSETS.md。三端真实截图已交付，完整原站动效对照尚未完成，图片内嵌英文未汉化。不得标记为完整复刻完成。
