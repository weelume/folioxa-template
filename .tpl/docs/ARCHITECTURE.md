# 架构

采用 Next.js App Router 和 strict TypeScript。src/features/site-templates/catalog/folioxa/ 内 config/brand.ts 为品牌；content/ 为双语内容与政策；theme.css 集中管理主题和断点；components/ 为导航、FAQ、项目卡和动画；pages/ 组合页面。meta.ts 注册 9 页，两种语言共 18 路由。host.tsx 提供可选宿主注入接口。独立运行使用 src/app/[[...slug]]/page.tsx。无后端、无数据库、无外部表单发送。
