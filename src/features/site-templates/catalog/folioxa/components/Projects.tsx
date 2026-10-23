'use client';
import Link from 'next/link';
import { motion,useReducedMotion } from 'framer-motion';
import type { SiteTemplatePageProps } from '../../../types';
import { projects,media } from '../content/data';
import { hrefFor } from './Shell';
import { Reveal } from './Motion';
export function ProjectGrid({basePath,locale='zh',compact=false}:{compact?:boolean}&SiteTemplatePageProps){const reduced=useReducedMotion();return <div className={`fx-projects ${compact?'fx-projects-compact':''}`}>{projects.map((project)=><Reveal key={project.slug} delay={.3} y={50} stiffness={360} damping={60} mass={.5}><Link className="fx-project fx-card" href={hrefFor(basePath,`projects/${project.slug}`)}><div className="fx-project-image"><motion.img src={media(project.image)} alt={project.title[locale]} width="1200" height="800" whileHover={reduced?undefined:{scale:1.1}} transition={{type:'spring',stiffness:500,damping:60}}/><span className="fx-project-pill">{project.category[locale]}</span></div><div className="fx-project-caption"><h3>{project.title[locale]}</h3><span>/{project.year}</span></div>{!compact&&<p>{project.service[locale]}</p>}</Link></Reveal>)}</div>}
/** 原站案例结尾是响应式作品网格，不做额外循环。 */
export function RelatedProjects({basePath,locale='zh'}:SiteTemplatePageProps){const reduced=useReducedMotion();return <div className="fx-related-grid">{projects.slice(0,3).map(project=><Reveal key={project.slug} y={50} delay={.1} amount={.5}><Link className="fx-project fx-card" href={hrefFor(basePath,`projects/${project.slug}`)}><div className="fx-project-image"><motion.img src={media(project.image)} alt={project.title[locale]} width="1200" height="800" whileHover={reduced?undefined:{scale:1.1}} transition={{type:'spring',stiffness:500,damping:60}}/></div><div className="fx-project-caption"><h3>{project.title[locale]}</h3></div><p>{project.service[locale]}</p></Link></Reveal>)}</div>}
