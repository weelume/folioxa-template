import type { ReactNode } from 'react'; import './globals.css';
export const metadata={title:'Folioxa · 创意设计与网站开发',description:'独立设计师作品集、案例、服务与联系'};
export default function Layout({children}:{children:ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}