"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gift, CheckCircle2, ShoppingBag, Phone, Star } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-red-600 via-red-500 to-red-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        {/* Spice pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-16 lg:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Main CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                  <Star size={18} className="text-red-300" />
                  <span className="text-white font-bold text-sm uppercase tracking-wider">
                    Premium Masala Collection
                  </span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-black text-white leading-[1.1] tracking-tight">
                  Experience the <span className="text-red-300 italic">Authentic</span> Taste of India
                </h2>
                
                <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-lg font-medium">
                  Premium quality masalas and spices crafted using traditional methods. 
                  Delivered fresh to your doorstep with our quality guarantee.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                <Link
                  href="/shop"
                  className="group bg-red-500 hover:bg-red-400 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-red-500/30 hover:shadow-red-400/40 w-full sm:w-auto"
                >
                  <ShoppingBag size={18} />
                  Shop All Products
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Link>
                
                <Link
                  href="/contact"
                  className="group bg-transparent hover:bg-white/10 border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  <Phone size={18} />
                  Bulk Orders
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-red-300" />
                  <span className="text-white/80 text-sm font-semibold">Free Delivery Above ₹500</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-red-300" />
                  <span className="text-white/80 text-sm font-semibold">100% Natural Products</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Features & Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                  <Gift size={24} className="text-red-300" />
                  Why Choose Miraly Foods?
                </h3>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Premium Quality Assurance",
                      desc: "Every batch tested for purity and potency in our ISO-certified facility."
                    },
                    {
                      title: "Traditional Processing",
                      desc: "Time-honored grinding methods preserve natural oils and authentic flavors."
                    },
                    {
                      title: "Farm-Fresh Sourcing",
                      desc: "Direct partnerships with farmers ensure the finest raw materials."
                    },
                    {
                      title: "Secure Packaging",
                      desc: "Vacuum-sealed packs maintain freshness during transit across India."
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 group"
                    >
                      <CheckCircle2
                        size={20}
                        className="text-red-300 shrink-0 mt-1 group-hover:text-red-200 transition-colors"
                      />
                      <div>
                        <h4 className="text-white font-semibold text-base mb-1 group-hover:text-red-100 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Special offer banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-gradient-to-r from-red-500/20 to-red-400/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-6 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Gift size={20} className="text-red-300" />
                  <span className="text-red-200 font-bold text-sm uppercase tracking-wider">
                    Limited Time Offer
                  </span>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">
                  Get 15% Off on First Order
                </h4>
                <p className="text-white/80 text-sm mb-4">
                  Use code <span className="font-bold text-red-300">WELCOME15</span> at checkout
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 group"
                >
                  Claim Offer
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
