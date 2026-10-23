'use client';
import { motion, useReducedMotion, useMotionValue, useSpring, useAnimationFrame, useInView, type Transition } from 'framer-motion';
import { useRef, useState, useEffect, type ReactNode } from 'react';
type RevealProps={children:ReactNode;className?:string;delay?:number;y?:number;hero?:boolean;mobileClient?:boolean;rotate?:number;scale?:number;rotateX?:number;stiffness?:number;damping?:number;mass?:number;amount?:number;once?:boolean;transition?:Transition};
export function Reveal({children,className='',delay=0,y=50,hero=false,mobileClient=false,rotate=0,scale=1,rotateX=0,stiffness=300,damping=60,mass=1,amount=0,once=true,transition}:RevealProps) {
  const reduced=useReducedMotion();
  const [mobile,setMobile]=useState(false);
  useEffect(()=>{if(!mobileClient)return;const query=matchMedia("(max-width:809px)");const update=()=>setMobile(query.matches);update();query.addEventListener("change",update);return()=>query.removeEventListener("change",update);},[mobileClient]);
  return <motion.div className={className} initial={reduced?false:{opacity:0,y,rotate,scale,rotateX}} {...(hero?{animate:{opacity:1,y:0,rotate:0,scale:1,rotateX:0}}:{whileInView:{opacity:1,y:0,rotate:0,scale:1,rotateX:0},viewport:{once,amount}})} transition={reduced?{duration:0}:transition??{type:'spring',stiffness:mobileClient&&mobile?210:stiffness,damping:mobileClient&&mobile?70:damping,mass,delay:reduced?0:mobileClient&&mobile?2:delay}}>{children}</motion.div>;
}
export function SectionTitle({eyebrow,title}:{eyebrow:string;title:string}) {
  const reduced=useReducedMotion();
  return <div className="fx-section-title"><motion.span className="fx-eyebrow" initial={reduced?false:{opacity:0,y:-16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={reduced?{duration:0}:{type:'spring',stiffness:240,damping:56,delay:.1}}><i/>{eyebrow}</motion.span><motion.h2 initial={reduced?false:{opacity:0,y:-16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={reduced?{duration:0}:{type:'spring',stiffness:240,damping:56,delay:.3}}>{title}</motion.h2></div>;
}
/** 以真实内容宽度和像素速度推进，避免三端使用固定周期造成速度变化。 */
export function Ticker({children,className='',velocity,gap=60,hoverSpeed=1}:{children:ReactNode;className?:string;velocity:number;gap?:number;hoverSpeed?:number}) {
  const ref=useRef<HTMLDivElement>(null),group=useRef<HTMLDivElement>(null),distance=useRef(0),offset=useRef(0);
  const x=useMotionValue(0),visible=useInView(ref),reduced=useReducedMotion();
  const [hover,setHover]=useState(false),[focus,setFocus]=useState(false),[copies,setCopies]=useState(2);
  useEffect(()=>{const node=group.current;if(!node)return;const observer=new ResizeObserver(()=>{distance.current=node.offsetWidth;setCopies(Math.max(2,Math.ceil((ref.current?.clientWidth??0)/Math.max(1,distance.current))+1));});observer.observe(node);if(ref.current)observer.observe(ref.current);return()=>observer.disconnect();},[]);
  useAnimationFrame((_,delta)=>{if(reduced||!visible||focus||document.hidden||!distance.current)return;offset.current=(offset.current+Math.min(delta,64)/1000*velocity*(hover?hoverSpeed:1))%distance.current;x.set(-offset.current);});
  return <div ref={ref} className={'fx-motion-ticker '+className} tabIndex={0} onPointerEnter={()=>setHover(true)} onPointerLeave={()=>setHover(false)} onFocusCapture={()=>setFocus(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocus(false);}}><motion.div className="fx-motion-track" style={{x:reduced?0:x}}>{Array.from({length:copies},(_,copy)=><div ref={copy===0?group:undefined} className="fx-motion-group" style={{gap,paddingRight:gap}} key={copy} aria-hidden={copy>0} inert={copy>0?true:undefined}>{children}</div>)}</motion.div></div>;
}
export function MagneticAvatar({src}:{src:string}) {
  const reduced=useReducedMotion(),x=useSpring(0,{stiffness:1025,damping:100}),y=useSpring(0,{stiffness:1025,damping:100});
  return <motion.img className="fx-inline-avatar" src={src} alt="" width="56" height="56" style={{x,y,rotate:9}} onPointerMove={event=>{if(reduced||event.pointerType==='touch')return;const box=event.currentTarget.getBoundingClientRect();x.set((event.clientX-box.left-box.width/2)/5);y.set((event.clientY-box.top-box.height/2)/5);}} onPointerLeave={()=>{x.set(0);y.set(0);}}/>;
}
export function AwardCard({name,award,work,image}:{name:string;award:string;work:string;image:string}) {
  const reduced=useReducedMotion();
  return <motion.div className="fx-award-fold" tabIndex={0} initial="rest" whileHover={reduced?undefined:'active'} whileFocus={reduced?undefined:'active'}><motion.div className="fx-award-row" style={{transformPerspective:1200,originY:1}} variants={{rest:{rotateX:0,borderTopLeftRadius:10,borderTopRightRadius:10},active:{rotateX:-45,borderTopLeftRadius:0,borderTopRightRadius:0}}} transition={{type:'spring',duration:.4,bounce:.2}}><div className="fx-award-peek" aria-hidden="true"><img src={image} alt=""/></div><b>{name}</b><span>{award}</span><span>{work}</span></motion.div></motion.div>;
}
