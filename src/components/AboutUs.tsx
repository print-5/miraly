"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Award, Users, Leaf, Clock } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    icon: Leaf,
    title: "100% Natural & Pure",
    desc: "No artificial colors, preservatives, or chemical additives"
  },
  {
    icon: Award,
    title: "Traditional Methods",
    desc: "Time-honored grinding and processing techniques"
  },
  {
    icon: Users,
    title: "Family Heritage",
    desc: "Recipes passed down through generations of spice masters"
  },
  {
    icon: Clock,
    title: "Fresh Daily Production",
    desc: "Made fresh in small batches to ensure maximum potency"
  }
];

const achievements = [
  { number: "25+", label: "Years of Excellence" },
  { number: "50K+", label: "Happy Families" },
  { number: "100%", label: "Natural Products" },
  { number: "ISO", label: "Certified Quality" }
];

export default function AboutUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-red-500 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-red-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/20 border-4 border-white">
              <Image
                src="/heritage.jpg"
                alt="Traditional spice grinding process"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Floating achievement badge */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[200px] border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Award size={24} className="text-red-500" />
                  <div>
                    <p className="text-2xl font-serif font-black text-gray-900">25+</p>
                    <p className="text-xs uppercase font-bold tracking-wider text-gray-600">
                      Years Heritage
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Preserving authentic flavors since 1999
                </p>
              </div>
            </div>

            {/* Decorative frame elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-red-500/30 rounded-tl-3xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-red-500/30 rounded-br-3xl pointer-events-none" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-6 py-2 mb-6">
              <Leaf size={16} className="text-red-600" />
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-700">
                Our Heritage
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 leading-tight mb-4 tracking-tight">
              Bringing Authentic <span className="text-red-600 italic">Indian Flavors</span> to Your Kitchen
            </h2>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-8 h-[2px] bg-gray-300 rounded-full" />
            </div>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              What began as a small family business has evolved into one of India's most trusted names in authentic spices and masalas. At Miraly Foods, we don't just process spices; we preserve culinary traditions using time-honored methods and the finest natural ingredients.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 group p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shrink-0">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-wider text-sm shadow-xl shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300 active:scale-95 group"
            >
              Read Our Full Story
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-serif font-black mb-3">
              Our Journey in Numbers
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Every milestone represents our commitment to quality and customer satisfaction
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl font-serif font-black text-red-400 mb-2 group-hover:text-red-300 transition-colors">
                  {achievement.number}
                </div>
                <div className="text-gray-300 text-sm font-semibold uppercase tracking-wider">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quality Promise */}
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <CheckCircle2 size={20} className="text-red-400" />
              <span className="text-sm font-semibold">
                Quality Promise: 100% Natural, 100% Authentic, 100% Satisfaction
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
