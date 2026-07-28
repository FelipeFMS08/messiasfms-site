'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  ArrowRight, 
  Menu, 
  X, 
  ExternalLink, 
  Code2,
  Cpu,
  FolderGit2,
  Terminal,
  MapPin,
  Sparkles
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import translations from '../lib/translations.json';

// Dynamically import the Hero shader background to guarantee SSR safety and premium canvas loads in the browser
const HeroBackground = dynamic(() => import('../components/HeroBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#09090b]" />
});

// Custom SVG Compass/Starburst Star Icon for Partner Badge
const StarburstIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-5 h-5 text-[#dc2626] fill-current shrink-0" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.3 8.3L22.6 6L16.3 12L22.6 18L14.3 15.7L12 24L9.7 15.7L1.4 18L7.7 12L1.4 6L9.7 8.3L12 0Z" />
  </svg>
);

// Custom Text Roll Animation Component
interface TextRollProps {
  text: string;
  className?: string;
  dark?: boolean;
}

const TextRoll: React.FC<TextRollProps> = ({ text, className = "", dark = false }) => {
  return (
    <div className={`overflow-hidden h-[20px] ${className}`}>
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
        <span className={`h-[20px] leading-[20px] ${dark ? 'text-black' : 'text-white'}`}>{text}</span>
        <span className={`h-[20px] leading-[20px] ${dark ? 'text-black' : 'text-white'}`}>{text}</span>
      </div>
    </div>
  );
};

// Rich text renderer utility to easily introduce responsive line breaks matching designs
const renderRichText = (text: string, brClass: string = "hidden sm:block") => {
  return text.split('\n').map((line, idx, arr) => (
    <React.Fragment key={idx}>
      {line}
      {idx < arr.length - 1 && (
        <>
          {' '}
          <br className={brClass} />
        </>
      )}
    </React.Fragment>
  ));
};

export default function LandingPage() {
  const [saoPauloTime, setSaoPauloTime] = useState<string>('12:00');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<'pt' | 'en'>('en');
  const [copiedText, setCopiedText] = useState<'email' | 'link' | null>(null);

  // Detect browser locale after mount only, so SSR/client markup match on first paint (EN fallback)
  useEffect(() => {
    const locale = window.navigator.language || '';
    if (locale.toLowerCase().startsWith('pt')) {
      startTransition(() => setLang('pt'));
    }
  }, []);

  // Track Live São Paulo Time in HH:MM format
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setSaoPauloTime(formatter.format(new Date()));
      } catch (err) {
        // Fallback if environment timezone database is unavailable
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const spTime = new Date(utc + 3600000 * -3); // UTC-3
        const hours = String(spTime.getHours()).padStart(2, '0');
        const minutes = String(spTime.getMinutes()).padStart(2, '0');
        setSaoPauloTime(`${hours}:${minutes}`);
      }
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);



  // Utility to handle copying email / start a project
  const handleCopyContact = (text: string, type: 'email' | 'link') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Robust dynamic highlighting for brand keywords
  const renderBio = (text: string) => {
    const highlight = /(pipelines de automação por IA em produção|AI automation pipelines in production)/;
    const parts = text.split(highlight);
    return parts.map((part, i) =>
      highlight.test(part) && highlight.exec(part)?.[0] === part
        ? <span key={i} className="text-white font-semibold">{part}</span>
        : part
    );
  };

  const t = translations[lang];

  // Nav Links mapping dynamically
  const navLinks = [
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.agency, href: "#connect" }
  ];

  return (
    <main className="bg-[#09090b] text-white overflow-x-hidden selection:bg-[#dc2626]/30 selection:text-white" id="landing-root">
      
      {/* SECTION 1: HERO CONTAINER (Full viewport height) */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden" id="hero-section">
        {/* Animated Custom WebGL Shaders / Fallback Canvas layer */}
        <HeroBackground />

        {/* Navigation Bar (z-20 relative) */}
        <header className="z-20 relative max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pt-6 sm:pt-8" id="header-nav">
          <nav className="bg-[#0f0f12]/80 backdrop-blur-md border border-white/5 rounded-full p-2 sm:p-3 flex items-center justify-between transition-all duration-300 shadow-xl shadow-black/30">
            
            {/* Left: Stark Logo + Desk links */}
            <div className="flex items-center gap-8">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 duration-300">
                <Image src="/logo.png" alt="FM" width={40} height={40} className="w-full h-full object-contain" priority />
              </a>
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.label} 
                    href={link.href}
                    className="text-[14px] text-gray-300 hover:text-[#dc2626] transition-colors duration-300 font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Desk availability info, live clock, language picker, CTA */}
            <div className="hidden md:flex items-center gap-6">
              <div className="hidden lg:block text-[13px] text-gray-400 font-medium tracking-tight">
                {t.nav.available}
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-gray-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                <span>{saoPauloTime} {t.nav.timeInSp}</span>
              </div>
              
              {/* Premium Language Switch */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 gap-0.5" id="lang-switch-desktop">
                <button 
                  onClick={() => setLang('pt')} 
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer ${lang === 'pt' ? 'bg-white text-black font-semibold' : 'text-gray-400 hover:text-white'}`}
                >
                  PT
                </button>
                <button 
                  onClick={() => setLang('en')} 
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer ${lang === 'en' ? 'bg-white text-black font-semibold' : 'text-gray-400 hover:text-white'}`}
                >
                  EN
                </button>
              </div>

              <a 
                href="#connect"
                className="bg-white text-black pl-5 pr-2 py-2 rounded-full font-medium text-[13px] group flex items-center gap-2 transition-premium hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <TextRoll text={t.nav.startProject} dark />
                <div className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>

            {/* Mobile Menu Trigger & Language Indicator */}
            <div className="flex md:hidden items-center gap-2">
              <button 
                onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
                className="bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-gray-300 font-semibold uppercase font-mono active:scale-95"
              >
                {lang}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="bg-white text-black rounded-full px-4 py-1.5 text-[13px] font-semibold flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Menu className="w-4 h-4 text-black" />
                <span>{t.nav.menu}</span>
              </button>
            </div>
          </nav>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex flex-col justify-end">
              {/* Dark backdrop element */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />
              
              {/* Sliding Bottom Sheet */}
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative bg-[#0f0f12] border border-red-500/10 rounded-2xl mx-3 mb-3 p-6 z-10 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-gray-400 font-mono tracking-tight">{t.contact.activeCity}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Language Switch inside sheet */}
                    <div className="flex bg-white/5 border border-white/10 rounded-full p-0.5 gap-0.5">
                      <button 
                        onClick={() => setLang('pt')} 
                        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${lang === 'pt' ? 'bg-white text-black' : 'text-gray-400'}`}
                      >
                        PT
                      </button>
                      <button 
                        onClick={() => setLang('en')} 
                        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-white text-black' : 'text-gray-400'}`}
                      >
                        EN
                      </button>
                    </div>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-95"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-5 mb-8">
                  {navLinks.map((link) => (
                    <a 
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[28px] sm:text-[32px] font-medium text-white hover:text-[#dc2626] transition-colors duration-300 tracking-tight"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-6 flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{t.nav.liveTime}</span>
                  <div className="flex items-center gap-1.5 font-mono text-sm">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    <span>{saoPauloTime} São Paulo, BR</span>
                  </div>
                </div>

                <a 
                  href="#connect"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-white text-black py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group cursor-pointer active:scale-98 transition-all"
                >
                  <span>{t.nav.startProject}</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Hero Content (z-20 content aligned bottom-ish) */}
        <div className="z-20 relative max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-24 pt-20 flex-1 flex flex-col justify-end" id="hero-content">
          <div className="max-w-5xl">
            {/* Small Label */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 mb-4 sm:mb-6"
            >
              <span className="h-[1px] w-6 bg-[#dc2626]" />
              <span className="text-[13px] sm:text-[14px] text-white tracking-wider font-semibold uppercase">
                {t.hero.label}
              </span>
            </motion.div>

            {/* Headline H1 with customized font clamps */}
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white"
            >
              {renderRichText(t.hero.headline, "hidden sm:block")}
            </motion.h1>

            {/* CTA row (flex-col sm:flex-row gap-4 sm:gap-5) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
            >
              {/* Crimson Gradient Button */}
              <a 
                href="#projects"
                className="bg-gradient-to-r from-[#991b1b] to-[#dc2626] hover:opacity-95 text-white pl-5 sm:pl-6 pr-2 py-2 rounded-full font-medium text-[13px] sm:text-[14px] group flex items-center justify-between sm:justify-start gap-3 self-start transition-premium hover:-translate-y-0.5 animate-pulse-subtle"
              >
                <TextRoll text={t.hero.viewPortfolio} />
                <div className="bg-white text-black w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0 shadow-md">
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </div>
              </a>

              {/* Partners Badge Pill */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[4px] px-3 sm:px-4 py-2 flex items-center gap-2.5 sm:gap-3 self-start hover:bg-white/10 transition-colors duration-300">
                <StarburstIcon />
                <span className="text-[13px] sm:text-[14px] font-medium text-white tracking-tight">
                  {t.hero.founder}
                </span>
                <span className="text-[10px] sm:text-[11px] bg-[#991b1b] text-white px-1.5 sm:px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider shrink-0">
                  {t.hero.badge}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT / EXPERIENCE (Carbon background) */}
      <section 
        className="bg-[#09090b] border-t border-white/5 pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden relative" 
        id="experience"
      >
        <div className="max-w-[1440px] mx-auto w-full">
          
          {/* Badge Row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8" id="exp-badge">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shadow-lg shadow-black/40">
              1
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium text-white border border-red-500/20 bg-red-500/5 rounded-full px-3 sm:px-4 py-1.5 tracking-tight uppercase">
              {t.philosophy.badge}
            </div>
          </div>

          {/* Heading H2 */}
          <div className="px-5 sm:px-8 lg:px-12" id="exp-heading">
            <h2 className="font-display text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-12 sm:mb-16 lg:mb-28 max-w-5xl">
              {renderRichText(t.philosophy.title, "hidden md:block")}
            </h2>
          </div>

          {/* Responsive layouts */}
          {/* MOBILE/TABLET STACK (lg:hidden) */}
          <div className="lg:hidden px-5 sm:px-8 space-y-12" id="about-mob-tablet">
            <div className="space-y-6">
              <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-400">
                {renderBio(t.philosophy.bio)}
              </p>
              
              <a 
                href="#projects" 
                className="bg-white/5 border border-white/10 text-white pl-5 pr-2 py-2 rounded-full font-medium text-[13px] group flex items-center justify-between max-w-xs transition-premium hover:bg-white/10"
              >
                <TextRoll text={t.philosophy.cta} />
                <div className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </div>
              </a>
            </div>

            {/* Mob/Tablet image grids/cards simulation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Card 1: Tech Stacks */}
              <div className="bg-[#0f0f12]/90 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/5 rounded-full blur-2xl group-hover:bg-red-500/5 transition-colors duration-500" />
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-4 h-4 text-[#dc2626]" />
                  <span className="text-xs uppercase font-mono tracking-wider text-gray-400">{t.philosophy.card1Title}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t.philosophy.card1Title}</h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['TypeScript', 'Node.js', 'Java', '.NET', 'React', 'Docker'].map((tech) => (
                    <span key={tech} className="text-xs bg-white/5 text-gray-300 px-2.5 py-1 rounded-sm border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 2: MBA & AI Education */}
              <div className="bg-[#0f0f12]/90 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-950/20 rounded-full blur-2xl" />
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-4 h-4 text-[#dc2626]" />
                  <span className="text-xs uppercase font-mono tracking-wider text-gray-400">{t.philosophy.card2Label}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t.philosophy.card2Title}</h3>
                <p className="text-sm text-gray-400">
                  {t.philosophy.card2Desc}
                </p>
              </div>
            </div>
          </div>

          {/* DESKTOP ROW (lg:grid) */}
          <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-stretch gap-6 xl:gap-8 px-12" id="about-desktop-grid">
            
            {/* Left Column: Cuboconnect Details */}
            <div className="bg-[#0f0f12]/95 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-[#dc2626]/20 transition-all duration-500 group">
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-red-950/10 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="w-4 h-4 text-[#dc2626]" />
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">{t.philosophy.cuboLabel}</span>
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight mb-2">Cuboconnect</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {t.philosophy.cuboconnectDesc}
                </p>
                <div className="w-full border-t border-white/5 my-4" />
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-500">{t.philosophy.cuboInfra}</span>
                    <span className="text-[#dc2626]">REST • SOAP • LDAP</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-500">{t.philosophy.cuboOpt}</span>
                    <span className="text-white">{t.philosophy.cuboOptValue}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                <span>{t.philosophy.cuboActive}</span>
                <span>cuboconnect.co</span>
              </div>
            </div>

            {/* Center Column: Experience bio + button */}
            <div className="flex flex-col justify-between py-2 pr-4">
              <div className="space-y-6">
                <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-400 font-display">
                  {renderBio(t.philosophy.bio)}
                </p>
              </div>

              <div className="relative group self-start mt-8">
                {/* Crimson glowing backlight */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#991b1b] to-[#dc2626] opacity-0 group-hover:opacity-40 blur-md transition-all duration-500" />
                <a 
                  href="#projects" 
                  className="relative bg-white/5 border border-white/10 text-white pl-5 pr-2 py-2 rounded-full font-medium text-[13px] group flex items-center justify-between gap-3 transition-premium hover:bg-white/15 hover:border-white/20 active:translate-y-0.5"
                >
                  <TextRoll text={t.philosophy.cta} />
                  <div className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Large Glassmorphic detailing F&P Solutions achievements */}
            <div className="bg-gradient-to-b from-[#121215] to-[#0f0f12] border border-white/5 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between hover:border-red-500/20 transition-all duration-500 group shadow-2xl">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors duration-1000" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <StarburstIcon />
                    <span className="text-xs uppercase font-mono tracking-wider text-gray-400">{t.philosophy.agencyLabel}</span>
                  </div>
                  <span className="text-[11px] bg-[#dc2626]/10 text-[#dc2626] border border-red-500/30 px-2 py-0.5 rounded-sm font-semibold uppercase">
                    {t.philosophy.agencyPartnership}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 my-6 border-b border-white/5 pb-6">
                  <div>
                    <div className="text-3xl font-display font-bold text-white tracking-tight">{t.philosophy.agencyCount}</div>
                    <div className="text-xs text-gray-400 mt-1">{t.philosophy.agencyCountDesc}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-semibold text-white tracking-tight flex items-center gap-1">
                      <span>{t.philosophy.agencyTech}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{t.philosophy.agencyTechDesc}</div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {t.philosophy.agencyDesc}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-gray-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
                  <span>{t.philosophy.agencyQuality}</span>
                </div>
                <div className="text-xs text-[#dc2626] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>fp-solutions.agency</span>
                  <ExternalLink className="w-3 h-3 text-[#dc2626]" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: CASE STUDIES / PROJECTS (Matte Dark Slate Background) */}
      <section 
        className="bg-[#0d0d10] border-t border-white/5 pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 relative" 
        id="projects"
      >
        <div className="max-w-[1440px] mx-auto w-full">
          
          {/* Badge Row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8" id="proj-badge">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shadow-lg shadow-black/40">
              2
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium text-white border border-red-500/10 bg-red-500/5 rounded-full px-3 sm:px-4 py-1.5 tracking-tight uppercase">
              {t.projects.badge}
            </div>
          </div>

          {/* Heading H2 */}
          <div className="px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14 lg:mb-16" id="proj-heading">
            <h2 className="font-display text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
              {t.projects.title}
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 sm:gap-6 lg:gap-8 px-5 sm:px-8 lg:px-12" id="proj-grid">
            
            {/* CARD 1: Fleet Alert System */}
            <a
              href="https://github.com/FelipeFMS08/Fleet-Alert"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col group"
            >
              {/* Visual layer aspect-[329/246] */}
              <div className="aspect-[329/246] w-full rounded-2xl overflow-hidden bg-[#141417] border border-white/5 group-hover:border-[#dc2626]/20 transition-all duration-500 cursor-pointer relative shadow-xl">
                
                {/* Simulated Geofencing Canvas overlay with crimson accents */}
                <div className="absolute inset-0 z-0 bg-radial-gradient from-zinc-900 via-neutral-950 to-black overflow-hidden flex items-center justify-center">
                  
                  {/* Grid System Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
                  
                  {/* Radar Scanning Visual Ring */}
                  <div className="absolute w-[240px] h-[240px] rounded-full border border-[#dc2626]/10 animate-ping duration-[3500ms] ease-out opacity-25" />
                  <div className="absolute w-[140px] h-[140px] rounded-full border border-dashed border-[#dc2626]/20 animate-spin duration-[24000ms] linear" />
                  
                  {/* Map Geofence Overlay Path in striking deep red lines */}
                  <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full text-[#dc2626] opacity-65 pointer-events-none">
                    {/* Pulsing route line */}
                    <path 
                      d="M 50 150 Q 150 50 220 180 T 350 120" 
                      fill="none" 
                      stroke="#991b1b" 
                      strokeWidth="2" 
                      strokeDasharray="4 6" 
                    />
                    <path 
                      d="M 50 150 Q 150 50 220 180 T 350 120" 
                      fill="none" 
                      stroke="#dc2626" 
                      strokeWidth="2" 
                      className="animate-pulse" 
                    />
                    {/* Geofence area polygon */}
                    <polygon 
                      points="120,80 240,70 290,160 170,190" 
                      fill="rgba(153, 27, 27, 0.08)" 
                      stroke="rgba(220, 38, 38, 0.45)" 
                      strokeWidth="1.5" 
                      strokeDasharray="2,3" 
                    />
                    
                    {/* Pulsing Coordinates Nodes */}
                    <circle cx="120" cy="80" r="4.5" fill="#dc2626" className="animate-pulse" />
                    <circle cx="220" cy="180" r="6" fill="#dc2626" />
                    <circle cx="220" cy="180" r="12" stroke="#dc2626" strokeWidth="1" fill="none" className="animate-ping" />
                    <circle cx="350" cy="120" r="4" fill="#661010" />
                  </svg>

                  {/* Dynamic Map Pin Box */}
                  <div className="absolute top-[80px] left-[230px] bg-black/95 border border-red-500/20 rounded-md p-2 font-mono text-[9px] text-[#dc2626] shadow-2xl flex items-center gap-1.5 animate-bounce">
                    <MapPin className="w-3 h-3 text-[#dc2626]" />
                    <span>ID: V-7419 ({t.projects.telemetryLabel})</span>
                  </div>

                  {/* Dark transparent mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-5" />
                </div>

                {/* Micro tech specs overlay */}
                <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-gray-400 bg-black/80 border border-white/5 rounded px-2 py-1 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
                  <span>LOCATION_INTELLIGENCE: DISPATCHER_LIVE</span>
                </div>

                {/* Expandable Hover Action Button */}
                <div className="absolute bottom-4 left-4 bg-white text-black h-9 w-9 rounded-full flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden group-hover:w-[148px] px-2.5 z-25 shadow-xl">
                  <span className="text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pl-1.5">
                    Fleet Alert
                  </span>
                  <ExternalLink className="w-4 h-4 text-black shrink-0 mx-auto group-hover:mx-0" />
                </div>

              </div>
              
              {/* Info texts below visual layer */}
              <div className="mt-4">
                <span className="text-xs uppercase font-mono tracking-wider text-gray-500 font-semibold mb-1 block">{t.projects.case1Label}</span>
                <h3 className="text-[16px] sm:text-[18px] font-semibold text-white tracking-tight">{t.projects.case1Title}</h3>
                <p className="text-[13px] sm:text-[14px] text-gray-400 mt-1.5 leading-relaxed">
                  {t.projects.case1Desc}
                </p>
              </div>

            </a>

            {/* CARDS 2-7: text-forward project cards, same visual language as Fleet Alert */}
            {t.projects.moreCases.map((project) => {
              const CardTag = project.href ? 'a' : 'div';
              return (
                <CardTag
                  key={project.title}
                  {...(project.href
                    ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="flex flex-col group"
                >
                  <div className="w-full rounded-2xl overflow-hidden bg-[#111114] border border-white/5 group-hover:border-[#dc2626]/20 transition-all duration-500 cursor-pointer shadow-xl p-5 sm:p-6 flex flex-col gap-4 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500">{project.label}</span>
                      <span className="text-[10px] uppercase tracking-wider text-[#dc2626]">{project.status}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-[13px] text-gray-400 leading-relaxed font-sans">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span key={tech} className="text-[10px] bg-white/5 text-gray-300 px-2 py-1 rounded-sm border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.href ? (
                      <div className="self-start mt-2 bg-white text-black h-9 w-9 rounded-full flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden group-hover:w-[148px] px-2.5 shadow-xl">
                        <span className="text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pl-1.5">
                          {t.projects.moreLabel}
                        </span>
                        <ExternalLink className="w-4 h-4 text-black shrink-0 mx-auto group-hover:mx-0" />
                      </div>
                    ) : (
                      <div className="self-start mt-2 text-[10px] uppercase tracking-wider text-gray-500 border border-white/10 rounded-full px-3 py-1.5">
                        {t.projects.privateLabel}
                      </div>
                    )}
                  </div>
                </CardTag>
              );
            })}

          </div>

        </div>
      </section>

      {/* ADDITIONAL SUBTITLE FOOTER / CONNECT */}
      <section 
        className="bg-[#09090b] border-t border-white/10 pt-20 pb-20 relative text-center overflow-hidden" 
        id="connect"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-5 relative z-10 space-y-8">
          
          <StarburstIcon />
          
          <h2 className="font-display text-[clamp(2rem,6vw,3.8rem)] font-bold tracking-tight text-white leading-tight">
            {renderRichText(t.contact.title, "sm:hidden")}
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t.contact.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Direct Copy Button */}
            <button 
              onClick={() => handleCopyContact('felipe.messias.fms@gmail.com', 'email')}
              className="bg-white text-black font-semibold text-sm px-6 py-3 rounded-full flex items-center gap-2 hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer max-w-xs"
            >
              <span>{copiedText === 'email' ? t.contact.copiedEmail : t.contact.copyEmail}</span>
              <FolderGit2 className="w-4 h-4 text-black" />
            </button>
            
            {/* Call Action Link */}
            <a
              href="https://github.com/FelipeFMS08"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-white/10 text-white font-semibold text-sm px-6 py-3 rounded-full flex items-center gap-2 hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <span>{t.contact.githubBtn}</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>

          <div className="border-t border-white/5 pt-12 mt-12 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
            <div>
              <span>© {new Date().getFullYear()} {t.contact.copyright}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.contact.availability}</span>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
