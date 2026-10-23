'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
export function Reveal({children,className='',delay=0,y=50,hero=false}:{children:ReactNode;className?:string;delay?:number;y?:number;hero?:boolean}) {
  const reduced=useReducedMotion();
  return <motion.div className={className} initial={reduced?false:{opacity:0,y}} {...(hero?{animate:{opacity:1,y:0}}:{whileInView:{opacity:1,y:0},viewport:{once:true,amount:0.12}})} transition={{type:'spring',stiffness:300,damping:60,mass:1,delay:reduced?0:delay}}>{children}</motion.div>;
}
export function SectionTitle({eyebrow,title}:{eyebrow:string;title:string}) {
  const reduced=useReducedMotion();
  return <div className="fx-section-title"><span className="fx-eyebrow"><i/>{eyebrow}</span><h2>{title.split(' ').map((word,index)=><motion.span key={index} initial={reduced?false:{opacity:0.25,y:12,filter:'blur(3px)'}} whileInView={{opacity:1,y:0,filter:'blur(0px)'}} viewport={{once:true,amount:0.8}} transition={{duration:0.45,delay:reduced?0:index*0.045}}>{word} </motion.span>)}</h2></div>;
}
