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

/* ════════════════════════════════════════════════════════════════════════════════════════════════════════
   Types
   ════════════════════════════════════════════════════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════════════════════════════════════════════════════
   Fallback slides (masala-themed)
   ════════════════════════════════════════════════════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════════════════════════════════════════════════════
   Animation variants
   ════════════════════════════════════════════════════════════════════════════════════════════════════════ */
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

const bgVariants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.8 },
  },
};

/* ════════════════════════════════════════════════════════════════════════════════════════════════════════
   Component
   ════════════════════════════════════════════════════════════════════════════════════════════════════════ */
export default function HeroCarousel({
  initialSlides,
}: {
  initialSlides?: Slide[];
}) {
  const [[currentSlide, direction], setSlide] = useState<[number, number]>([
    0, 0,
  ]);
  const [isPaused, setIsPaused] = useState(false);
  const [slides] = useState<Slide[]>(
    initialSlides && initialSlides.length > 0 ? initialSlides : fallbackSlides,
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* ── Auto-play ── */
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
      className="relative min-h-screen bg-black overflow-hidden flex items-center group/section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ───── Full Size Background Banner ───── */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`bg-${currentSlide}`}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover/section:scale-105"
              fill
              priority
              sizes="100vw"
              quality={100}
            />
            {/* Gradients to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/20 z-10" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ───── Main Carousel Content ───── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-24">
        <div className="w-full max-w-2xl">
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
              <div className="inline-flex items-center gap-2 bg-[#991b1b]/80 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6 shadow-lg">
                <Award size={14} className="text-white" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                  {slide.tag}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[3rem] md:text-6xl lg:text-[4.5rem] font-serif font-black text-white leading-[1.05] tracking-tight mb-2 drop-shadow-xl">
                {slide.title}
              </h1>
              <h1 className="text-[3rem] md:text-6xl lg:text-[4.5rem] font-serif font-black text-[#f8bf51] italic leading-[1.05] tracking-tight mb-6 drop-shadow-xl">
                {slide.titleAccent}
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-[3px] bg-gradient-to-r from-[#f8bf51] to-yellow-200 rounded-full" />
                <Star size={16} className="text-[#f8bf51] fill-[#f8bf51]" />
                <div className="w-8 h-[2px] bg-white/50 rounded-full" />
              </div>

              {/* Description */}
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-medium drop-shadow-md">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <Link
                  href={slide.ctaLink}
                  className="group bg-[#f8bf51] hover:bg-[#e5b24b] text-[#991b1b] px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-xl shadow-black/20 transition-all duration-300 active:scale-95 flex items-center gap-3"
                >
                  {slide.ctaText}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/shop"
                  className="text-white hover:text-[#f8bf51] text-sm font-bold uppercase tracking-widest border-b-2 border-white/40 hover:border-[#f8bf51] pb-1 transition-all duration-300 drop-shadow-md"
                >
                  Explore All →
                </Link>
              </div>

              {/* Quality Badges */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <Leaf size={16} className="text-[#f8bf51]" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white drop-shadow-md">
                    {slide.badge1}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <Shield size={16} className="text-[#f8bf51]" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white drop-shadow-md">
                    {slide.badge2}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ───── Navigation Arrows ───── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-black/50 hover:scale-110 flex items-center justify-center transition-all group shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft
              size={24}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-black/50 hover:scale-110 flex items-center justify-center transition-all group shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight
              size={24}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </>
      )}

      {/* ───── Slide Indicators ───── */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 shadow-md ${
              i === currentSlide
                ? "w-10 h-3 bg-[#f8bf51]"
                : "w-3 h-3 bg-white/50 hover:bg-white/90"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
