'use client';
import type { SiteTemplatePageProps } from '../../../types';
import { Shell } from '../components/Shell';
import { SectionTitle } from '../components/Motion';
import { ProjectGrid } from '../components/Projects';
export default function ProjectsPage({basePath,locale='zh'}:SiteTemplatePageProps){return <Shell basePath={basePath} locale={locale}><section className="fx-section fx-page-heading"><SectionTitle eyebrow={locale==='zh'?'我的作品':'My Projects'} title={locale==='zh'?'近期精选项目':'My Latest Projects'}/><ProjectGrid basePath={basePath} locale={locale}/><p className="fx-end-of-list" role="status">{locale==='zh'?'已展示全部 4 个项目':'All 4 projects are shown'}</p></section></Shell>}
