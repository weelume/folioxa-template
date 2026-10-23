'use client';
import { useState } from 'react';
import { AnimatePresence,motion,useReducedMotion } from 'framer-motion';
import { faqs } from '../content/data';
import type { TemplateLocale } from '../../../types';
export function FAQ({locale}:{locale:TemplateLocale}){const[open,setOpen]=useState<number|null>(0),reduced=useReducedMotion();return <div className="fx-faq">{faqs.map(([question,answer],index)=><div className="fx-faq-item fx-card" key={index}><h3><button type="button" aria-expanded={open===index} aria-controls={`fx-answer-${index}`} id={`fx-question-${index}`} onClick={()=>setOpen(open===index?null:index)}>{question[locale]}<span aria-hidden="true">{open===index?'−':'+'}</span></button></h3><AnimatePresence initial={false}>{open===index&&<motion.div id={`fx-answer-${index}`} role="region" aria-labelledby={`fx-question-${index}`} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduced?0:.3}}><p>{answer[locale]}</p></motion.div>}</AnimatePresence></div>)}</div>}
