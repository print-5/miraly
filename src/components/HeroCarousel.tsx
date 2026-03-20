"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Leaf,
  Shield,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Types
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
interface Slide {
  _id?: string;
  title: string;
  titleAccent: string;
  tag: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge1: string;
  badge2: string;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Fallback slides (masala-themed)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const fallbackSlides: Slide[] = [
  {
    title: "Premium Authentic",
    titleAccent: "Masalas",
    tag: "Signature Blend",
    description:
      "Experience the rich heritage of traditional Indian spices with our premium masala collection. Hand-ground using time-honored recipes passed down through generations.",
    image:
      "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ctaText: "Shop Masalas",
    ctaLink: "/shop?category=Masalas",
    badge1: "Hand Ground",
    badge2: "Pure & Natural",
  },
  {
    title: "Aromatic Spice",
    titleAccent: "Blends",
    tag: "Chef's Choice",
    description:
      "Discover our expertly crafted spice blends that bring authentic flavors to your kitchen. Each blend is carefully balanced for the perfect taste experience.",
    image:
      "https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ctaText: "Explore Spices",
    ctaLink: "/shop?category=Spices",
    badge1: "Expert Crafted",
    badge2: "Premium Quality",
  },
  {
    title: "Traditional",
    titleAccent: "Recipes",
    tag: "Heritage Collection",
    description:
      "Authentic taste that connects you to your roots. Our traditional masala recipes preserve the essence of Indian culinary heritage in every packet.",
    image:
      "https://images.pexels.com/photos/4198016/pexels-photo-4198016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ctaText: "View Collection",
    ctaLink: "/shop",
    badge1: "Traditional Recipe",
    badge2: "Authentic Taste",
  },
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Animation variants
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
  }),
};

const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.85,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    scale: 0.85,
    transition: { duration: 0.5 },
  }),
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Component
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function HeroCarousel({
  initialSlides,
}: {
  initialSlides?: Slide[];
}) {
  const [[currentSlide, direction], setSlide] = useState<[number, number]>([
    0, 0,
  ]);
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState<Slide[]>(
    initialSlides && initialSlides.length > 0 ? initialSlides : fallbackSlides,
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* â”€â”€ Auto-play â”€â”€ */
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setSlide(([prev]) => [(prev + 1) % slides.length, 1]);
      }
    }, 6000);
  }, [isPaused, slides.length]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  const goTo = (index: number) => {
    const dir = index > currentSlide ? 1 : -1;
    setSlide([index, dir]);
  };

  const next = () => {
    setSlide(([prev]) => [(prev + 1) % slides.length, 1]);
    startAutoPlay();
  };

  const prev = () => {
    setSlide(([prev]) => [(prev - 1 + slides.length) % slides.length, -1]);
    startAutoPlay();
  };

  const slide = slides[currentSlide] || slides[0];

  return (
    <section
      className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-700 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* â”€â”€â”€â”€â”€ Decorative Background â”€â”€â”€â”€â”€ */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Spice pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-[100px]" />
        {/* Floating spice elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-yellow-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-16 w-6 h-6 bg-red-400/20 rounded-full animate-bounce" />
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-orange-400/40 rounded-full animate-pulse" />
      </div>

      {/* â”€â”€â”€â”€â”€ Main Carousel Content â”€â”€â”€â”€â”€ */}
      <div className="relative z-10 max-w-[1440px] mx-auto min-h-[90vh] md:min-h-[720px] flex items-center px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* â”€â”€ Left: Text Content â”€â”€ */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`text-${currentSlide}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-start justify-center text-white"
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
                <Award size={14} className="text-red-300" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-200">
                  {slide.tag}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[3rem] md:text-6xl lg:text-[4.5rem] font-serif font-black text-white leading-[1.05] tracking-tight mb-2">
                {slide.title}
              </h1>
              <h1 className="text-[3rem] md:text-6xl lg:text-[4.5rem] font-serif font-black text-red-300 italic leading-[1.05] tracking-tight mb-6">
                {slide.titleAccent}
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-[3px] bg-gradient-to-r from-red-400 to-yellow-400 rounded-full" />
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <div className="w-8 h-[2px] bg-white/30 rounded-full" />
              </div>

              {/* Description */}
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-lg mb-10 font-medium">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <Link
                  href={slide.ctaLink}
                  className="group bg-red-500 hover:bg-red-400 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-2xl shadow-red-500/30 hover:shadow-red-400/40 transition-all duration-300 active:scale-95 flex items-center gap-3"
                >
                  {slide.ctaText}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/shop"
                  className="text-white/80 hover:text-white text-sm font-bold uppercase tracking-widest border-b-2 border-white/40 hover:border-white pb-1 transition-all duration-300"
                >
                  Explore All â†’
                </Link>
              </div>

              {/* Quality Badges */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Leaf size={16} className="text-red-300" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white/80">
                    {slide.badge1}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Shield size={16} className="text-red-300" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white/80">
                    {slide.badge2}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* â”€â”€ Right: Product Image â”€â”€ */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`img-${currentSlide}`}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg lg:max-w-xl mx-auto">
                {/* Decorative background circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl scale-110" />
                
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border-2 border-white/20 group">
                  <Image
                    src={slide.image}
                    alt={`${slide.title} ${slide.titleAccent}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Floating quality badge */}
                  <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="text-xs font-bold uppercase tracking-wider">Premium Quality</span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400/60 rounded-full blur-sm" />
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-red-400/40 rounded-full blur-md" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* â”€â”€â”€â”€â”€ Navigation Arrows â”€â”€â”€â”€â”€ */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 flex items-center justify-center transition-all group"
            aria-label="Previous slide"
          >
            <ChevronLeft
              size={24}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 flex items-center justify-center transition-all group"
            aria-label="Next slide"
          >
            <ChevronRight
              size={24}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </>
      )}

      {/* â”€â”€â”€â”€â”€ Slide Indicators â”€â”€â”€â”€â”€ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "w-10 h-3 bg-white shadow-lg shadow-white/30"
                : "w-3 h-3 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* â”€â”€â”€â”€â”€ Bottom Wave â”€â”€â”€â”€â”€ */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V30C240 10 480 0 720 12C960 24 1200 48 1440 30V60H0Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}
