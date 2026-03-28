"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export default function CategorySection({
  initialCategories,
}: {
  initialCategories: any[];
}) {
  const [categories] = useState<any[]>(initialCategories);
  const [loading] = useState(false);

  if (loading) return null;
  if (categories.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-6 py-2 mb-4">
            <Sparkles size={16} className="text-red-500" />
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-600">
              Premium Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 tracking-tight mb-4">
            Authentic <span className="text-red-600 italic">Masala</span> Range
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Discover our carefully curated collection of premium spices and masalas, 
            crafted using traditional recipes and the finest ingredients.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-[3px] bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-8 h-[2px] bg-gray-300 rounded-full" />
          </div>
        </motion.div>

        {/* Categories Scrollable Container with Dots */}
        <div className="relative w-full max-w-full">
          <div 
            id="category-scroll-container"
            className="flex flex-nowrap lg:flex-wrap items-start justify-start lg:justify-center gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory pb-8 px-4 sm:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={(e) => {
              const el = e.currentTarget;
              const scrollPosition = el.scrollLeft;
              const itemWidth = el.scrollWidth / categories.length;
              if (itemWidth > 0) {
                const newIndex = Math.round(scrollPosition / itemWidth);
                const activeIndicator = document.getElementById("active-category-index");
                if (activeIndicator) {
                  activeIndicator.dataset.index = newIndex.toString();
                  // Natively update dots
                  const dots = document.querySelectorAll(".category-dot");
                  dots.forEach((dot, idx) => {
                    if (idx === newIndex) {
                      dot.classList.add("bg-red-600", "w-6");
                      dot.classList.remove("bg-red-200", "w-2");
                    } else {
                      dot.classList.add("bg-red-200", "w-2");
                      dot.classList.remove("bg-red-600", "w-6");
                    }
                  });
                }
              }
            }}
          >
            {/* Inject CSS to hide webkit scrollbar but keep component scoped */}
            <style dangerouslySetInnerHTML={{__html: `
              #category-scroll-container::-webkit-scrollbar { display: none; }
            `}} />

            {categories.map((cat, i) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="snap-center shrink-0 first:ml-[calc(50vw-80px)] lg:first:ml-0 last:mr-[calc(50vw-80px)] lg:last:mr-0"
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="group flex flex-col items-center gap-4 hover:-translate-y-2 transition-all duration-300 w-32 md:w-40"
                >
                  {/* Round Image Container */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg shadow-red-900/10 border-[3px] border-white group-hover:border-red-100 group-hover:shadow-xl group-hover:shadow-red-900/20 transition-all duration-500">
                    <Image
                      src={
                        cat.image ||
                        "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800"
                      }
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 160px, 200px"
                    />
                    
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Category Text */}
                  <div className="text-center w-full">
                    <h3 className="text-lg md:text-xl font-serif font-black text-gray-900 group-hover:text-red-600 transition-colors duration-300 truncate w-full px-2">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-red-400 transition-colors duration-300 mt-1 block truncate w-full">
                      {cat.description || "Explore"}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div id="active-category-index" data-index="0" className="hidden" />

          {/* Dots Indicator for Mobile/Tablet */}
          {categories.length > 1 && (
            <div className="flex lg:hidden justify-center items-center gap-2 mt-4">
              {categories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const container = document.getElementById("category-scroll-container");
                    if (container) {
                      const itemWidth = container.scrollWidth / categories.length;
                      container.scrollTo({ left: itemWidth * i, behavior: 'smooth' });
                    }
                  }}
                  className={`category-dot h-2 rounded-full transition-all duration-300 ${
                    i === 0 ? "bg-red-600 w-6" : "bg-red-200 w-2"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            View All Categories
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
