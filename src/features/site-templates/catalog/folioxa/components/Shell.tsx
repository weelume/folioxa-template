'use client';
import Link from 'next/link';
import { usePathname,useRouter } from 'next/navigation';
import { useState,useEffect,useRef,type ReactNode,type MouseEvent } from 'react';
import { AnimatePresence,motion,useReducedMotion,useInView } from 'framer-motion';
import type { SiteTemplatePageProps } from '../../../types';
import { brand } from '../config/brand';
import { useFolioxaHost } from '../host';
import { Reveal } from './Motion';
import '../theme.css';
export const hrefFor=(basePath:string,slug='')=>`${basePath.replace(/\/$/,'')}/${slug}`;
export function CallButton({basePath,locale='zh'}:SiteTemplatePageProps){return <Link className="fx-button" href={hrefFor(basePath,'contact')}>{locale==='zh'?'免费沟通项目':'Book a Free Call'}</Link>}
export function Availability({locale='zh'}:{locale?:'zh'|'en'}) {const ref=useRef<HTMLSpanElement>(null),visible=useInView(ref),reduced=useReducedMotion();return <span ref={ref} className="fx-availability" data-running={visible&&!reduced}><i/>{locale==='zh'?'目前仅有 2 个合作档期':'Only 2 open slots available!'}</span>}
export function Shell({children,locale='zh',basePath}:SiteTemplatePageProps&{children:ReactNode}){
  const host=useFolioxaHost(),path=usePathname(),router=useRouter(),reduced=useReducedMotion();
  const page=useRef<HTMLDivElement>(null),navigating=useRef(false);
  useEffect(()=>{navigating.current=false;},[path]);
  // 先完成退场，再交由 Next 路由切换；锚点、下载、外部链接保留浏览器原生行为。
  async function navigate(event:MouseEvent<HTMLDivElement>){
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const link=(event.target as HTMLElement).closest('a');if(!link||link.classList.contains("fx-language")||link.target==='_blank'||link.hasAttribute('download'))return;
    const destination=new URL(link.href,window.location.href);if(destination.origin!==window.location.origin||destination.pathname===path)return;
    const scope=basePath.replace(/\/en$/,'');if(scope&&!destination.pathname.startsWith(scope+'/'))return;
    event.preventDefault();void transitionTo(destination.pathname+destination.search+destination.hash);
  }
  async function transitionTo(destination:string){
    if(navigating.current)return;navigating.current=true;
    if(process.env.NODE_ENV==="development")console.debug("[Folioxa motion] route exit started",{pathname:destination.split(/[?#]/)[0]});
    if(!reduced&&page.current){
      // 整页遮罩使用独立的浏览器动画，不向区块传播动画控制器。
      const exit=page.current.animate([{opacity:1,transform:'translateY(0)',clipPath:'inset(0% 0% 0% 0%)'},{opacity:0,transform:'translateY(-30vh)',clipPath:'inset(0% 0% 100% 0%)'}],{delay:500,duration:600,easing:'cubic-bezier(.73,0,.33,1)',fill:'forwards'});
      await exit.finished;
    }
    if(process.env.NODE_ENV==="development")console.debug("[Folioxa motion] route exit completed");
    router.push(destination);
  }
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
  return <div key={path} ref={page} className="fx" onClickCapture={navigate} lang={locale==='zh'?'zh-CN':'en'}>
    <motion.header className="fx-header" initial={reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{type:'spring',damping:30,stiffness:268,delay:.1}}>
      <Link className="fx-brand" href={hrefFor(basePath)} aria-label={name}>{host.logo?<><img src={host.logo} alt="" width="24" height="24"/><span>{name}</span></>:<img className="fx-original-logo" src={brand.logo} alt={name} width="114" height="35"/>}</Link>
      <nav className="fx-desktop-nav" aria-label={locale==='zh'?'主导航':'Main navigation'}>{navigation}</nav>
      <div className="fx-header-actions"><Link className="fx-language" href={target} hrefLang={locale==='zh'?'en':'zh-CN'} onClick={event=>{event.preventDefault();void transitionTo(target+window.location.search+window.location.hash);setMenu(false);}}>{locale==='zh'?'EN':'中文'}</Link><button ref={trigger} type="button" className="fx-menu-button" aria-label={locale==='zh'?(menu?'关闭菜单':'打开菜单'):(menu?'Close menu':'Open menu')} aria-expanded={menu} aria-controls="fx-mobile-menu" onClick={()=>setMenu(!menu)}><span/ ><span/ ></button></div>
      <AnimatePresence>{menu&&<motion.div id="fx-mobile-menu" className="fx-mobile-menu" ref={panel} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduced?0:.25}}><nav aria-label={locale==='zh'?'手机导航':'Mobile navigation'}>{navigation}</nav></motion.div>}</AnimatePresence>
    </motion.header>
    <motion.main className="fx-main" inherit={false} initial={false} animate={{opacity:1}}>{children}</motion.main>
    <motion.footer className="fx-footer" inherit={false} initial={false} animate={{opacity:1}}><Reveal className="fx-footer-call fx-card" delay={.3}><Availability locale={locale}/><h2>{locale==='zh'?'让创意成为现实\n一起创造精彩':'Ready to Automate Smarter? Let’s Build Together'}</h2><p>{locale==='zh'?'从一次沟通开始，构建更好的数字体验':'Schedule a call and begin automating'}</p><CallButton basePath={basePath} locale={locale}/><Reveal className="fx-footer-email" y={60} delay={.6} stiffness={320} damping={60}><a href={`mailto:${brand.email}`}>{brand.email}</a></Reveal></Reveal>
      <div className="fx-footer-bottom"><span>© {brand.year} {name} · {locale==='zh'?'让设计表达你的不同':'Design that makes you stand out'}</span><div><Link href={hrefFor(basePath,'legal/privacy-policy')}>{locale==='zh'?'隐私政策':'Privacy Policy'}</Link><Link href={hrefFor(basePath,'legal/terms-of-service')}>{locale==='zh'?'服务条款':'Terms of Service'}</Link></div>{host.marketplaceHref&&<Link href={host.marketplaceHref}>{host.marketplaceLabel?.[locale]}</Link>}{host.filing}</div>
    </motion.footer>
    {host.marketplaceHref&&<Link className="fx-marketplace" href={host.marketplaceHref} aria-label={host.marketplaceAriaLabel?.[locale]}><img src={host.lightLogo??host.logo} alt="" width="24" height="24"/><span>{name}</span></Link>}
  </div>;
}
