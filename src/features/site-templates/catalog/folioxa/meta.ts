import type {SiteTemplate} from '../../types';
export const folioxaTemplate:SiteTemplate={...{
  "id": "folioxa",
  "gitUrl": "https://github.com/weelume/folioxa-template",
  "name": "Folioxa · 创意设计师作品集",
  "localizedNames": {
    "en": "Folioxa · Creative designer portfolio"
  },
  "sceneId": "brand-portfolio",
  "listed": false,
  "tags": [
    "设计师作品集",
    "橙白卡片",
    "Framer",
    "双语",
    "PC / iPad / H5"
  ],
  "summary": "设计师作品集，包含服务、三档报价、客户评价、8 项常见问题、4 个项目案例、联系及政策页面。",
  "accentColor": "#ff6e13",
  "cover": "/templates/folioxa/screenshots/desktop-home.webp",
  "screenshots": [
    {
      "src": "/templates/folioxa/screenshots/desktop-home.webp",
      "alt": "Folioxa desktop home",
      "device": "desktop",
      "width": 1440,
      "height": 1000
    },
    {
      "src": "/templates/folioxa/screenshots/desktop-projects.webp",
      "alt": "Folioxa desktop projects",
      "device": "desktop",
      "width": 1440,
      "height": 1000
    },
    {
      "src": "/templates/folioxa/screenshots/desktop-case.webp",
      "alt": "Folioxa desktop case",
      "device": "desktop",
      "width": 1440,
      "height": 1000
    },
    {
      "src": "/templates/folioxa/screenshots/desktop-contact.webp",
      "alt": "Folioxa desktop contact",
      "device": "desktop",
      "width": 1440,
      "height": 1000
    },
    {
      "src": "/templates/folioxa/screenshots/tablet-home.webp",
      "alt": "Folioxa tablet home",
      "device": "tablet",
      "width": 834,
      "height": 1180
    },
    {
      "src": "/templates/folioxa/screenshots/tablet-projects.webp",
      "alt": "Folioxa tablet projects",
      "device": "tablet",
      "width": 834,
      "height": 1180
    },
    {
      "src": "/templates/folioxa/screenshots/tablet-case.webp",
      "alt": "Folioxa tablet case",
      "device": "tablet",
      "width": 834,
      "height": 1180
    },
    {
      "src": "/templates/folioxa/screenshots/tablet-contact.webp",
      "alt": "Folioxa tablet contact",
      "device": "tablet",
      "width": 834,
      "height": 1180
    },
    {
      "src": "/templates/folioxa/screenshots/mobile-home.webp",
      "alt": "Folioxa mobile home",
      "device": "mobile",
      "width": 390,
      "height": 844
    },
    {
      "src": "/templates/folioxa/screenshots/mobile-projects.webp",
      "alt": "Folioxa mobile projects",
      "device": "mobile",
      "width": 390,
      "height": 844
    },
    {
      "src": "/templates/folioxa/screenshots/mobile-case.webp",
      "alt": "Folioxa mobile case",
      "device": "mobile",
      "width": 390,
      "height": 844
    },
    {
      "src": "/templates/folioxa/screenshots/mobile-contact.webp",
      "alt": "Folioxa mobile contact",
      "device": "mobile",
      "width": 390,
      "height": 844
    }
  ]
},surfaces:[{id:'site',name:'设计师作品集',platform:'pc',locales:['zh','en'],pages:[{slug:"",title:"首页",localizedTitles:{en:"Home"},load:()=>import('./pages/HomePage')},
{slug:"projects",title:"作品",localizedTitles:{en:"Projects"},load:()=>import('./pages/ProjectsPage')},
{slug:"projects/creative-studio-landing-page",title:"创意工作室",localizedTitles:{en:"Creative Studio"},load:()=>import('./pages/ProjectPage')},
{slug:"projects/e-commerce-product-website",title:"电商产品网站",localizedTitles:{en:"E-commerce Product"},load:()=>import('./pages/ProjectPage')},
{slug:"projects/personal-portfolio-website",title:"个人作品集",localizedTitles:{en:"Personal Portfolio"},load:()=>import('./pages/ProjectPage')},
{slug:"projects/event-management-website",title:"活动管理平台",localizedTitles:{en:"Event Management"},load:()=>import('./pages/ProjectPage')},
{slug:"contact",title:"联系",localizedTitles:{en:"Contact"},load:()=>import('./pages/ContactPage')},
{slug:"legal/privacy-policy",title:"隐私政策",localizedTitles:{en:"Privacy Policy"},load:()=>import('./pages/PolicyPage')},
{slug:"legal/terms-of-service",title:"服务条款",localizedTitles:{en:"Terms of Service"},load:()=>import('./pages/PolicyPage')}]}]};
