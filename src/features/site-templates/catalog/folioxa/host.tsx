'use client';
import { createContext, useContext, type ReactNode } from 'react';
import type { TemplateLocale } from '../../types';
export interface FolioxaHostOptions {
    brandName?: Record<TemplateLocale, string>;
    logo?: string;
    lightLogo?: string;
    marketplaceHref?: string;
    marketplaceLabel?: Record<TemplateLocale, string>;
    marketplaceAriaLabel?: Record<TemplateLocale, string>;
    filing?: ReactNode;
}
const Context = createContext<FolioxaHostOptions>({});
/** 宿主仅注入品牌和市场入口，通用页面不依赖宿主实现。 */
export function FolioxaHostProvider({ children, ...options }: FolioxaHostOptions & {
    children: ReactNode;
}) { return <Context.Provider value={options}>{children}</Context.Provider>; }
export function useFolioxaHost() { return useContext(Context); }
