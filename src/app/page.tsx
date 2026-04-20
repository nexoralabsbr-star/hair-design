"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { SpecialistCard } from "@/components/SpecialistCard";

const portfolioItems = [
  { id: 1, title: "Transformação Capilar", before: "/assets/images/antes01.png", after: "/assets/images/depois01.png" },
  { id: 2, title: "Luzes & Mechas", before: "/assets/images/antes02.png", after: "/assets/images/depois02.png" },
  { id: 3, title: "Corte & Styling", before: "/assets/images/antes03.png", after: "/assets/images/depois03.png" },
  { id: 4, title: "Cor & Transformação", before: "/assets/images/antes04.png", after: "/assets/images/depois04.png" },
];

const specialists = [
  { id: 1, name: "Isabella Venetti", role: "Diretora Criativa", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=1000&fit=crop" },
  { id: 2, name: "Marco D'Angelo", role: "Colorista Mestre", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop" },
];

const services = [
  { id: 1, name: "Corte & Styling Premium", price: "R$ 180", description: "Corte personalizado com styling profissional, usando produtos premium e técnicas exclusivas para valorizar seu estilo único.", icon: "✂️", image: "/assets/images/servicos/001.png" },
  { id: 2, name: "Coloração & Mechas", price: "R$ 350", description: "Coloração profissional com mechas, balayage ou ombre hair. Produtos de alta qualidade para um resultado natural e duradouro.", icon: "🎨", image: "/assets/images/servicos/002.png" },
  { id: 3, name: "Tratamentos Capilares", price: "R$ 220", description: "Tratamentos regenerativos, hidratação profunda e reconstrução. Recupere a saúde e brilho dos seus cabelos.", icon: "💆", image: "/assets/images/servicos/003.png" },
  { id: 4, name: "Maquiagem Editorial", price: "R$ 280", description: "Maquiagem profissional para eventos, ensaios fotográficos ou ocasiões especiais. Técnicas de iluminação e acabamento premium.", icon: "💄", image: "/assets/images/servicos/004.png" },
  { id: 5, name: "Manicure & Pedicure Spa", price: "R$ 150", description: "Tratamento completo para mãos e pés com massagem relaxante, esmalte semipermanente ou tradicional.", icon: "💅", image: "/assets/images/servicos/005.png" },
  { id: 6, name: "Spa Capilar", price: "R$ 190", description: "Experiência relaxante com massagem craniana, máscaras reconstrutivas e tratamento térmico para cabelos revitalizados.", icon: "🌿", image: "/assets/images/servicos/006.png" },
];

// Animation durations based on ui-ux-pro-max: 150-300ms for micro-interactions
const ANIMATION = {
  enter: 0.4,
  exit: 0.25, // Exit faster than enter (~60-70%)
  stagger: 0.08, // 30-50ms per item for stagger
  spring: { stiffness: 120, damping: 20 },
};

function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isReducedMotion, setIsReducedMotion] = useState(true);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: isReducedMotion ? 0 : ANIMATION.enter,
        delay: isReducedMotion ? 0 : delay,
        ease: "easeOut"
      }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(true);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    if (isReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * 0.25, y: y * 0.25 });
    }
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  if (isReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={ANIMATION.spring}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#arte", label: "Nossa Arte" },
    { href: "#especialistas", label: "Especialistas" },
    { href: "#servicos", label: "Serviços" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[#1a1a1a]/95 backdrop-blur-lg shadow-lg shadow-black/20"
          : "bg-transparent"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-large">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="relative group"
              aria-label="BELLOA - Início"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl md:text-3xl heading-style-h5 text-white tracking-[0.2em] relative">
                BELLOA
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#F0C6C8] group-hover:w-full transition-all duration-300" />
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10" role="navigation" aria-label="Navegação principal">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm text-white/80 hover:text-white transition-colors py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#F0C6C8] hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#contato"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F0C6C8] text-[#1a1a1a] text-sm font-medium rounded-full hover:bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#F0C6C8]/20"
              >
                Agendar
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-6 h-5">
                <span className={`absolute left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? "top-2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-2 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? "top-2 -rotate-45" : "top-4"}`} />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Background */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 bg-[#1a1a1a]/98 backdrop-blur-xl"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              {/* Close Button */}
              <motion.button
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar menu"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Logo */}
              <motion.span
                className="text-3xl heading-style-h5 text-white tracking-[0.3em] mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                BELLOA
              </motion.span>

              {/* Nav Links */}
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl heading-style-h5 text-white/80 hover:text-[#F0C6C8] transition-colors relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {link.label}
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-[#F0C6C8] group-hover:w-full transition-all duration-300" />
                  </motion.a>
                ))}
              </nav>

              {/* CTA */}
              <motion.a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-12 inline-flex items-center gap-3 px-8 py-3 bg-[#F0C6C8] text-[#1a1a1a] text-lg font-medium rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Agendar horário
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section
      className="relative min-h-[85dvh] flex items-center justify-center overflow-hidden"
      aria-label="Hero principal"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/videos/0001.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

      <div className="relative z-10 container-large text-center px-4">
        <RevealOnScroll>
          <h1 className="heading-style-h1 text-white mb-4 md:mb-6">
            Realce Sua<br />Beleza Natural
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={ANIMATION.stagger}>
          <p className="text-base md:text-xl text-white/70 md:text-white/80 mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">
            Bem-vindo ao nosso salão! Oferecemos uma ampla gama de serviços de beleza.
            Agende seu horário hoje e deixe nossa equipe de especialistas cuidar de você.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={ANIMATION.stagger * 2}>
          <MagneticButton>
            <a
              href="#contato"
              className="button-hero text-sm md:text-lg min-h-[44px] md:min-h-[52px] px-5 md:px-8 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-full inline-flex items-center"
            >
              Agendar horário
              <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </MagneticButton>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function Portfolio() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <section id="arte" className="padding-section-large bg-black" aria-labelledby="arte-title">
      <div className="container-large">
        <RevealOnScroll>
          <h2 id="arte-title" className="heading-style-h3 text-white text-center mb-10 md:mb-16">Nossa Arte</h2>
        </RevealOnScroll>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {portfolioItems.map((item, index) => (
              <div key={item.id} className="flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-2">
                <article className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-3 md:mb-4 transition-all duration-300">
                    <Image
                      src={item.before}
                      alt={`${item.title} - Antes`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <Image
                      src={item.after}
                      alt={`${item.title} - Depois`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                  <h3 className="text-sm md:text-lg heading-style-h6 text-white text-center">{item.title}</h3>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {portfolioItems.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="w-2 h-2 rounded-full bg-white/30 hover:bg-pink-1 transition-colors"
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSlider({ before, after, title, onInteract }: { before: string; after: string; title: string; onInteract?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
    onInteract?.();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;
    
    const handleGlobalPointerMove = (e: PointerEvent) => {
      e.preventDefault();
      updatePosition(e.clientX);
    };
    
    const handleGlobalPointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [isDragging]);

  return (
    <article 
      className="relative w-full max-w-3xl mx-auto aspect-[4/5] overflow-hidden rounded-lg select-none touch-none" 
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Image src={after} alt={`${title} - Depois`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />

      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <Image src={before} alt={`${title} - Antes`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
      </div>

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center" style={{ left: `${sliderPosition}%`, marginLeft: '-1px' }}>
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg" />
        <button
          className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-ew-resize hover:scale-110 transition-transform"
          aria-label="Arraste para comparar antes e depois"
        >
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8M8 15h4" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1.5 rounded text-xs text-black font-medium">Antes</div>
      <div className="absolute bottom-4 right-4 bg-[var(--color--pink-1)] px-3 py-1.5 rounded text-xs text-black font-medium">Depois</div>
    </article>
  );
}

function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const item = portfolioItems[currentIndex];

  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);

  return (
    <section id="antes-depois" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #f5dee0, #f0c6c9)" }} aria-labelledby="antes-depois-title">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative container-large">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block text-pink-500 text-sm tracking-[0.3em] uppercase mb-4">Transformação</span>
            <h2 id="antes-depois-title" className="heading-style-h3 text-black">Antes & Depois</h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="relative max-w-2xl mx-auto">
            <ComparisonSlider before={item.before} after={item.after} title={item.title} />
            <button onClick={goToPrev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors md:left-4 md:w-12 md:h-12" aria-label="Anterior">
              <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors md:right-4 md:w-12 md:h-12" aria-label="Próximo">
              <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </RevealOnScroll>

        <div className="flex justify-center gap-3 mt-8">
          {portfolioItems.slice(0, 4).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-pink-500 scale-125' : 'bg-black/20 hover:bg-black/40'
              }`}
              aria-label={`Ver transformação ${index + 1}`}
              aria-pressed={currentIndex === index}
            />
          ))}
        </div>

        <p className="text-center text-black/60 text-sm mt-6">{item.title}</p>
      </div>
    </section>
  );
}

function Specialists() {
  const specialistData = [
    {
      id: 1,
      name: "Isabella Venetti",
      role: "Diretora Criativa",
      image: specialists[0].image,
      bio: "Mais de 15 anos de experiência em cabelos cacheados e ondulados. Especialista em transformações radicais.",
      instagram: "@isabella.venetti"
    },
    {
      id: 2,
      name: "Marco D'Angelo",
      role: "Colorista Mestre",
      image: specialists[1].image,
      bio: "Mestre em todas as técnicas de coloração. Criador do método D'Angelo de luzes perfeitas.",
      instagram: "@marco.dangelohair"
    },
  ];

  return (
    <section id="especialistas" className="relative py-24 lg:py-32 overflow-hidden" aria-labelledby="especialistas-title">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative container-large">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block text-pink-400 text-sm tracking-[0.3em] uppercase mb-4">Equipe Premium</span>
            <h2 id="especialistas-title" className="heading-style-h3 text-white">
              Nossos Especialistas
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              Profissionais renomados que transforms sua beleza com técnica refinada e olhar artístico único.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {specialistData.map((specItem, index) => (
            <RevealOnScroll key={specItem.id} delay={index * 0.15}>
              <motion.article
                className="group relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                  <Image
                    src={specItem.image}
                    alt={specItem.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <div className="transform translate-y-0 group-hover:translate-y-[-8px] transition-transform duration-500">
                      <span className="inline-block px-3 py-1 bg-white/90 text-black text-xs font-medium tracking-wider rounded-full mb-3">
                        {specItem.role}
                      </span>
                      <h3 className="text-2xl lg:text-3xl heading-style-h5 text-white mb-2">{specItem.name}</h3>
                      <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{specItem.bio}</p>
                      <span className="inline-flex items-center gap-2 text-white/70 text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.668.014-4.952.072-4.234.183-6.723 2.816-6.906 6.906-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.952.184 4.234 2.816 6.723 6.906 6.906 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.952-.072 4.235-.184 6.724-2.817 6.906-6.906.058-1.281.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.951-.184-4.235-2.816-6.723-6.906-6.906-1.281-.059-1.689-.073-4.948-.073z" />
                          <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm5.404-10.327a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                        </svg>
                        {specItem.instagram}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-px rounded-2xl border border-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3}>
          <div className="text-center mt-16">
            <p className="text-zinc-500 text-sm">+Junte-se à nossa equipe de artistas</p>
            <button className="mt-4 px-8 py-3 bg-transparent border border-pink-500/50 text-pink-400 rounded-full hover:bg-pink-500/10 hover:border-pink-500 transition-all duration-300">
              Ver todos os profissionais
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300
    }
  }
};

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <RevealOnScroll delay={index * 0.1}>
      <motion.article
        className="group relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
        }}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
          {service.image && (
            <Image src={service.image} alt={service.name} fill className="object-cover group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/50 to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-500" />

          {!service.image && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">{service.icon}</span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <div className="transform translate-y-0 transition-transform duration-500">
              <h3 className="text-[24px] text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{service.name}</h3>
              <p className="text-[14px] text-white line-clamp-2 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{service.description}</p>
              <span className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{service.price}</span>
            </div>
          </div>
        </div>

        <div className="absolute -inset-px rounded-2xl border border-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.article>
    </RevealOnScroll>
  );
}

function Services() {
  return (
    <section id="servicos" className="padding-section-large" style={{ background: "linear-gradient(180deg, #f5dee0, #f0c6c9)" }} aria-labelledby="servicos-title">
      <div className="container-large">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block text-pink-500 text-sm tracking-[0.3em] uppercase mb-4">Serviços</span>
            <h2 id="servicos-title" className="heading-style-h3 text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>Nossos Serviços</h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAB() {
  const [isReducedMotion, setIsReducedMotion] = useState(true);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <motion.a
      href="#contato"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-[var(--color--pink-1)] rounded-full flex items-center justify-center shadow-lg z-50 group min-w-[48px] md:min-w-[56px] focus:outline-none focus:ring-2 focus:ring-white rounded-full"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 14 }}
      whileHover={{ scale: isReducedMotion ? 1 : 1.08 }}
      whileTap={{ scale: isReducedMotion ? 1 : 0.92 }}
      aria-label="Agendar horário"
    >
      <svg className="w-4 h-4 md:w-5 md:h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="absolute right-full mr-3 bg-white text-black px-3 py-1.5 rounded text-sm opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
        Agendar
      </span>
    </motion.a>
  );
}

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPinIcon, ClockIcon, PhoneIcon } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceName = services.find(s => s.id === Number(formData.service))?.name || "Serviço não especificado";
    const message = `Olá! Gostaria de agendar um horário no BELLOA.\n\n*Nome:* ${formData.name}\n*Telefone:* ${formData.phone}\n*Serviço:* ${serviceName}\n*Data preferida:* ${formData.date}\n*Mensagem:* ${formData.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contato" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)" }}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[--pink-1]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[--gold]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative container-large">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block text-pink-400 text-sm tracking-[0.3em] uppercase mb-4">Contato</span>
            <h2 className="heading-style-h3 text-white">Agende Sua Experiência</h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">Transforme sua beleza com nossos especialistas. Preencha o formulário e entraremos em contato pelo WhatsApp.</p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          <RevealOnScroll>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[--pink-1]/20 via-transparent to-[--gold]/20 rounded-2xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] md:aspect-[16/9]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.097!2d-46.6524!3d-23.5629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDLLMDI5JnRvdC8!5e0!3m2!1spt-BR!2sbr!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização do salão"
                  />
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-[--pink-1]/10 flex items-center justify-center shrink-0">
                      <MapPinIcon className="w-5 h-5 text-[--pink-1]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Av. Paulista, 1000</p>
                      <p className="text-white/50 text-sm">Bela Vista - São Paulo, SP</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-[--pink-1]/10 flex items-center justify-center shrink-0">
                      <ClockIcon className="w-5 h-5 text-[--pink-1]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Seg a Sáb: 9h às 20h</p>
                      <p className="text-white/50 text-sm">Dom: Fechado</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-[--pink-1]/10 flex items-center justify-center shrink-0">
                      <PhoneIcon className="w-5 h-5 text-[--pink-1]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">(11) 99999-9999</p>
                      <p className="text-white/50 text-sm">WhatsApp disponível</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={ANIMATION.stagger}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-l from-[--pink-1]/10 via-transparent to-[--gold]/10 rounded-2xl blur-xl" />
              <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-white/70">Nome completo</label>
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm text-white/70">WhatsApp</label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm text-white/70">Serviço desejado</label>
                    <Select value={formData.service} onValueChange={(value) => handleChange("service", value || "")}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12">
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10">
                        {services.map(service => (
                          <SelectItem key={service.id} value={String(service.id)} className="text-white">
                            <span className="flex justify-between w-full gap-4">
                              <span>{service.name}</span>
                              <span className="text-white font-bold">{service.price}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm text-white/70">Data preferida</label>
                    <Input
                      id="date"
                      placeholder="Ex: Segunda-feira, 20/01"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-white/70">Mensagem adicional</label>
                    <Textarea
                      id="message"
                      placeholder="Alguma informação adicional..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[100px] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-base bg-transparent border border-pink-500/50 text-pink-400 hover:bg-pink-500/10 hover:border-pink-500 transition-all duration-300 font-medium rounded-full"
                  >
                    Agendar via WhatsApp
                  </Button>
                </form>
              </div>
            </div>
          </RevealOnScroll>
        </div>


      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12" style={{ background: "linear-gradient(0deg, #f0c6c9, #f5dee0)" }}>
      <div className="container-large">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-xs tracking-[0.2em] mb-2" style={{ color: "#272222" }}>BELLOA</span>
            <p className="text-xs" style={{ color: "#272222", opacity: 0.6 }}>
              © 2026 Todos os direitos reservados.
            </p>
          </div>
<div className="flex gap-4 items-center">
            <a href="https://instagram.com/belloa" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity" aria-label="Instagram">
              <img src="/assets/gifs/insta.png" alt="Instagram" className="max-w-full max-h-full object-contain" />
            </a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center hover:opacity-60 transition-opacity" aria-label="WhatsApp">
              <img src="/assets/gifs/whats.png" alt="WhatsApp" className="max-w-full max-h-full object-contain" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <BeforeAfter />
      <Specialists />
      <Contact />
      <Footer />
      <FAB />
    </main>
  );
}