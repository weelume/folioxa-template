'use client';
import Link from 'next/link';
import { usePathname,useRouter } from 'next/navigation';
import { useState,useEffect,useRef,type ReactNode } from 'react';
import { AnimatePresence,motion,useReducedMotion } from 'framer-motion';
import type { SiteTemplatePageProps } from '../../../types';
import { brand } from '../config/brand';
import { useFolioxaHost } from '../host';
import { Reveal } from './Motion';
import '../theme.css';
export const hrefFor=(basePath:string,slug='')=>`${basePath.replace(/\/$/,'')}/${slug}`;
export function CallButton({basePath,locale='zh'}:SiteTemplatePageProps){return <Link className="fx-button" href={hrefFor(basePath,'contact')}>{locale==='zh'?'免费沟通项目':'Book a Free Call'}</Link>}
export function Availability({locale='zh'}:{locale?:'zh'|'en'}) {return <span className="fx-availability"><i/>{locale==='zh'?'目前仅有 2 个合作档期':'Only 2 open slots available!'}</span>}
export function Shell({children,locale='zh',basePath}:SiteTemplatePageProps&{children:ReactNode}){
  const host=useFolioxaHost(),path=usePathname(),router=useRouter(),reduced=useReducedMotion();
  const [menu,setMenu]=useState(false),trigger=useRef<HTMLButtonElement>(null),panel=useRef<HTMLDivElement>(null);
  const name=host.brandName?.[locale]??brand.name;
  const root=locale==='en'?basePath.replace(/\/en$/,''):basePath;
  const target=locale==='en'?path.replace(basePath,root||'')||'/':`${root}/en${path.slice(root.length)}`.replace(/\/$/,'');
  useEffect(()=>{
    if(!menu)return;
    const node=panel.current,first=node?.querySelector<HTMLElement>('a');first?.focus();
    const key=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){setMenu(false);trigger.current?.focus();}
      if(event.key==='Tab'&&node){const nodes=[...node.querySelectorAll<HTMLElement>('a,button')];const current=nodes.indexOf(document.activeElement as HTMLElement);if(event.shiftKey&&current===0){event.preventDefault();nodes.at(-1)?.focus();}else if(!event.shiftKey&&current===nodes.length-1){event.preventDefault();nodes[0]?.focus();}}
    };document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);
  },[menu]);
  const links=[['',locale==='zh'?'首页':'Home'],['projects',locale==='zh'?'作品':'Projects'],['#services',locale==='zh'?'服务':'Services'],['#pricing',locale==='zh'?'方案':'Pricing'],['contact',locale==='zh'?'联系':'Contact']];
  const navigation=links.map(([slug,title])=><Link key={slug} href={hrefFor(basePath,slug)} aria-current={(slug==='projects'?path.endsWith('/projects'):slug==='contact'?path.endsWith('/contact'):!slug&&path.replace(/\/$/,'')===basePath)?'page':undefined} onClick={()=>setMenu(false)}>{title}</Link>);
  return <div className="fx" lang={locale==='zh'?'zh-CN':'en'}>
    <motion.header className="fx-header" initial={reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{type:'spring',damping:30,stiffness:268,delay:.1}}>
      <Link className="fx-brand" href={hrefFor(basePath)} aria-label={name}>{host.logo?<><img src={host.logo} alt="" width="24" height="24"/><span>{name}</span></>:<img className="fx-original-logo" src={brand.logo} alt={name} width="114" height="35"/>}</Link>
      <nav className="fx-desktop-nav" aria-label={locale==='zh'?'主导航':'Main navigation'}>{navigation}</nav>
      <div className="fx-header-actions"><Link className="fx-language" href={target} hrefLang={locale==='zh'?'en':'zh-CN'} onClick={event=>{event.preventDefault();router.push(target+window.location.search+window.location.hash);setMenu(false);}}>{locale==='zh'?'EN':'中文'}</Link><button ref={trigger} type="button" className="fx-menu-button" aria-label={locale==='zh'?(menu?'关闭菜单':'打开菜单'):(menu?'Close menu':'Open menu')} aria-expanded={menu} aria-controls="fx-mobile-menu" onClick={()=>setMenu(!menu)}><span/ ><span/ ></button></div>
      <AnimatePresence>{menu&&<motion.div id="fx-mobile-menu" className="fx-mobile-menu" ref={panel} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduced?0:.25}}><nav aria-label={locale==='zh'?'手机导航':'Mobile navigation'}>{navigation}</nav></motion.div>}</AnimatePresence>
    </motion.header>
    <main className="fx-main">{children}</main>
    <footer className="fx-footer"><Reveal className="fx-footer-call fx-card"><Availability locale={locale}/><h2>{locale==='zh'?'让创意成为现实\n一起创造精彩':'Ready to Automate Smarter? Let’s Build Together'}</h2><p>{locale==='zh'?'从一次沟通开始，构建更好的数字体验':'Schedule a call and begin automating'}</p><CallButton basePath={basePath} locale={locale}/><a href={`mailto:${brand.email}`}>{brand.email}</a></Reveal>
      <div className="fx-footer-bottom"><span>© {brand.year} {name} · {locale==='zh'?'让设计表达你的不同':'Design that makes you stand out'}</span><div><Link href={hrefFor(basePath,'legal/privacy-policy')}>{locale==='zh'?'隐私政策':'Privacy Policy'}</Link><Link href={hrefFor(basePath,'legal/terms-of-service')}>{locale==='zh'?'服务条款':'Terms of Service'}</Link></div>{host.marketplaceHref&&<Link href={host.marketplaceHref}>{host.marketplaceLabel?.[locale]}</Link>}{host.filing}</div>
    </footer>
    {host.marketplaceHref&&<Link className="fx-marketplace" href={host.marketplaceHref} aria-label={host.marketplaceAriaLabel?.[locale]}><img src={host.lightLogo??host.logo} alt="" width="24" height="24"/><span>{name}</span></Link>}
  </div>;
}
