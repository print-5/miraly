"use client";

import { motion } from "framer-motion";
import { Leaf, Shield, Award, Star, Truck, Users } from "lucide-react";

const trustPoints = [
  {
    icon: Leaf,
    title: "100% Pure & Natural",
    desc: "No artificial colors, preservatives, or additives. Only the finest natural ingredients sourced directly from farms.",
    stat: "100%",
    statLabel: "Natural",
    color: "green",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    desc: "Every batch undergoes rigorous quality testing. FSSAI certified facility with international standards.",
    stat: "ISO",
    statLabel: "Certified",
    color: "blue",
  },
  {
    icon: Award,
    title: "Traditional Recipes",
    desc: "Time-honored recipes passed down through generations, preserving authentic flavors and nutritional values.",
    stat: "50+",
    statLabel: "Years Legacy",
    color: "red",
  },
  {
    icon: Star,
    title: "Premium Grade",
    desc: "Hand-selected spices from the best regions of India. Each ingredient meets our premium quality standards.",
    stat: "A+",
    statLabel: "Grade",
    color: "yellow",
  },
  {
    icon: Truck,
    title: "Fresh Delivery",
    desc: "Direct from our facility to your doorstep. Vacuum-sealed packaging ensures maximum freshness and aroma.",
    stat: "24hrs",
    statLabel: "Fresh",
    color: "purple",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    desc: "Over 50,000 satisfied customers across India trust Miraly Foods for their daily cooking needs.",
    stat: "50K+",
    statLabel: "Customers",
    color: "orange",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-6 py-2.5 mb-6">
            <Award size={16} className="text-red-500" />
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-600">
              Why Choose Miraly
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 tracking-tight mb-6">
            Quality You Can <span className="text-red-600 italic">Trust</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            From farm to your kitchen, we ensure every step meets the highest standards of quality, 
            purity, and authenticity that your family deserves.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-16 h-[3px] bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-10 h-[2px] bg-gray-300 rounded-full" />
          </div>
        </motion.div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {trustPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 h-full border-2 border-gray-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 relative overflow-hidden">
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon with stat badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                      point.color === 'green' ? 'bg-red-500' :
                      point.color === 'blue' ? 'bg-blue-500' :
                      point.color === 'red' ? 'bg-red-500' :
                      point.color === 'yellow' ? 'bg-yellow-500' :
                      point.color === 'purple' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}>
                      <point.icon size={28} className="text-white" />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-serif font-black text-gray-900 leading-none">
                        {point.stat}
                      </div>
                      <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                        point.color === 'green' ? 'text-red-600' :
                        point.color === 'blue' ? 'text-blue-600' :
                        point.color === 'red' ? 'text-red-600' :
                        point.color === 'yellow' ? 'text-yellow-600' :
                        point.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                      }`}>
                        {point.statLabel}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {point.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm">
                    {point.desc}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                  point.color === 'green' ? 'bg-red-500' :
                  point.color === 'blue' ? 'bg-blue-500' :
                  point.color === 'red' ? 'bg-red-500' :
                  point.color === 'yellow' ? 'bg-yellow-500' :
                  point.color === 'purple' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-serif font-black text-red-400 mb-2 group-hover:text-red-300 transition-colors">
                  50K+
                </div>
                <div className="text-sm md:text-base font-semibold text-gray-300 uppercase tracking-wider">
                  Happy Customers
                </div>
              </div>
              
              <div className="text-center group relative">
                <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-700" />
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-700" />
                <div className="text-4xl md:text-5xl font-serif font-black text-red-400 mb-2 group-hover:text-red-300 transition-colors">
                  100%
                </div>
                <div className="text-sm md:text-base font-semibold text-gray-300 uppercase tracking-wider">
                  Natural Products
                </div>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-serif font-black text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">
                  ISO
                </div>
                <div className="text-sm md:text-base font-semibold text-gray-300 uppercase tracking-wider">
                  Certified Quality
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

