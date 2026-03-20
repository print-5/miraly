"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Shield, Award, Users, Clock, Star } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural Ingredients",
    desc: "Pure spices sourced directly from farms across India. No artificial colors, preservatives, or chemical additives in any of our products.",
    num: "01",
    color: "green",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    desc: "Every batch undergoes rigorous testing in our FSSAI-certified facility. ISO standards maintained throughout the production process.",
    num: "02",
    color: "blue",
  },
  {
    icon: Award,
    title: "Traditional Recipes",
    desc: "Time-honored grinding techniques passed down through generations. Authentic taste that connects you to your culinary heritage.",
    num: "03",
    color: "red",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    desc: "Over 50,000 satisfied customers across India trust Miraly Foods for their daily cooking needs and special occasions.",
    num: "04",
    color: "purple",
  },
];

const stats = [
  { number: "50K+", label: "Happy Customers", icon: Users },
  { number: "100%", label: "Natural Products", icon: Leaf },
  { number: "25+", label: "Years Experience", icon: Clock },
  { number: "4.8", label: "Customer Rating", icon: Star },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

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
            <Award size={16} className="text-red-500" />
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-600">
              Why Choose Miraly
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 tracking-tight mb-4">
            Authentic Quality You Can <span className="text-red-600 italic">Trust</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            From traditional grinding methods to modern packaging, every step in our process 
            is designed to deliver the purest, most authentic masalas to your kitchen.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-[3px] bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-8 h-[2px] bg-gray-300 rounded-full" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
          {/* Left: Features */}
          <div className="space-y-8">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-6 group p-6 bg-white rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    item.color === 'green' ? 'bg-red-500 group-hover:bg-red-600' :
                    item.color === 'blue' ? 'bg-blue-500 group-hover:bg-blue-600' :
                    item.color === 'red' ? 'bg-red-500 group-hover:bg-red-600' :
                    'bg-purple-500 group-hover:bg-purple-600'
                  }`}>
                    <item.icon size={28} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 tracking-widest">
                    {item.num}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-gray-900/20 relative">
              <Image
                src="https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                alt="Premium spices and masalas"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-6 -left-6 bg-red-500 text-white p-6 rounded-2xl shadow-2xl">
              <p className="text-3xl font-serif font-black mb-1">ISO</p>
              <p className="text-xs font-bold uppercase tracking-wider opacity-90">
                Certified Quality
              </p>
            </div>

            <div className="absolute -top-4 -right-4 bg-white p-5 rounded-2xl shadow-2xl border border-gray-200">
              <p className="text-2xl font-serif font-black text-gray-900 mb-0.5">50K+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Customers
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 -left-3 w-6 h-6 bg-red-400/60 rounded-full blur-sm" />
            <div className="absolute bottom-1/3 -right-3 w-8 h-8 bg-red-400/40 rounded-full blur-md" />
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-serif font-black text-white mb-3">
              Trusted Across India
            </h3>
            <p className="text-red-100 text-lg max-w-2xl mx-auto">
              Our commitment to quality has earned the trust of families nationwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                  <stat.icon size={28} className="text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-serif font-black text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-red-100 text-sm font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
