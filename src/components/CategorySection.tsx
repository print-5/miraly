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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative block h-[420px] rounded-2xl overflow-hidden shadow-lg shadow-gray-900/10 border border-gray-200/50 bg-white hover:shadow-2xl hover:shadow-gray-900/20 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-[280px] overflow-hidden">
                  <Image
                    src={
                      cat.image ||
                      "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800"
                    }
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Premium badge */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-xs font-bold uppercase tracking-wider">Premium</span>
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-6 bg-white">
                  <div className="mb-3">
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-red-500 mb-2 block">
                      {cat.description || "Authentic & Pure"}
                    </span>
                    <h3 className="text-xl font-serif font-black text-gray-900 mb-2 leading-tight group-hover:text-red-600 transition-colors duration-300">
                      {cat.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">
                      Explore Collection
                    </span>
                    <div className="w-8 h-8 rounded-full bg-red-50 group-hover:bg-red-500 flex items-center justify-center transition-all duration-300">
                      <ArrowRight
                        size={16}
                        className="text-red-500 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/20 rounded-2xl transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
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
