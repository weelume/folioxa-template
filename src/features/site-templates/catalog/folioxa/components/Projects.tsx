'use client';
import Link from 'next/link';
import { motion,useReducedMotion } from 'framer-motion';
import type { SiteTemplatePageProps } from '../../../types';
import { projects,media } from '../content/data';
import { hrefFor } from './Shell';
import { Reveal } from './Motion';
export function ProjectGrid({basePath,locale='zh',compact=false}:{compact?:boolean}&SiteTemplatePageProps){const reduced=useReducedMotion();return <div className={`fx-projects ${compact?'fx-projects-compact':''}`}>{projects.map((project,index)=><Reveal key={project.slug} delay={index%2*.12} y={40}><Link className="fx-project fx-card" href={hrefFor(basePath,`projects/${project.slug}`)}><div className="fx-project-image"><motion.img src={media(project.image)} alt={project.title[locale]} width="1200" height="800" whileHover={reduced?undefined:{scale:1.05}} transition={{type:'spring',stiffness:180,damping:24}}/><span className="fx-project-pill">{project.category[locale]}</span></div><div className="fx-project-caption"><h3>{project.title[locale]}</h3><span>/{project.year}</span></div>{!compact&&<p>{project.service[locale]}</p>}</Link></Reveal>)}</div>}
/** 原站案例结尾为连续横向作品流，重复组隐藏语义并退出键盘顺序。 */
export function RelatedProjects({basePath,locale='zh'}:SiteTemplatePageProps){return <div className="fx-related" tabIndex={0} aria-label={locale==='zh'?'最新作品，悬停或聚焦可暂停滚动':'Latest projects, pause scrolling on hover or focus'}><div className="fx-related-track">{[0,1].map(copy=><div className="fx-related-group" key={copy} aria-hidden={copy===1}>{projects.slice(0,3).map(project=><Link key={project.slug} className="fx-project fx-card" href={hrefFor(basePath,`projects/${project.slug}`)} tabIndex={copy===1?-1:undefined}><div className="fx-project-image"><img src={media(project.image)} alt={copy===1?'':project.title[locale]} width="1200" height="800"/></div><div className="fx-project-caption"><h3>{project.title[locale]}</h3></div><p>{project.service[locale]}</p></Link>)}</div>)}</div></div>}
