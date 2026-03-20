"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { 
  Award, 
  Users, 
  Package, 
  Leaf,
  Shield,
  Clock,
  Heart,
  CheckCircle2,
  Sparkles,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface StatCardData {
  icon: React.ReactNode;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  trend?: string;
}

const AnimatedValue = ({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { damping: 30, stiffness: 100, mass: 1 });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, isInView, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Intl.NumberFormat("en-US").format(Math.floor(latest))}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [prefix, suffix, spring]);

  return <span ref={ref} />;
};

const StatCard = ({
  icon,
  value,
  label,
  prefix = "",
  suffix = "",
  trend,
  delay = 0,
}: StatCardData & { delay?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative overflow-hidden rounded-2xl border border-red-200/20 bg-gradient-to-br from-red-50/80 to-orange-50/80 p-6 backdrop-blur-sm shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-orange-400/5" />
      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 p-3 text-red-600">
          {icon}
        </div>
        <div className="mb-2 text-3xl font-bold text-gray-900">
          <AnimatedValue value={value} prefix={prefix} suffix={suffix} />
        </div>
        <div className="text-sm font-medium text-gray-600">{label}</div>
        {trend && (
          <div className="mt-2 text-xs text-red-600">{trend}</div>
        )}
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const stats: StatCardData[] = [
    {
      icon: <Clock className="h-6 w-6" />,
      value: 25,
      label: "Years of Excellence",
      suffix: "+",
      trend: "Trusted since 1999",
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: 50000,
      label: "Happy Families",
      suffix: "+",
      trend: "Worldwide",
    },
    {
      icon: <Package className="h-6 w-6" />,
      value: 100,
      label: "Premium Products",
      suffix: "+",
      trend: "Authentic blends",
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: 98,
      label: "Customer Satisfaction",
      suffix: "%",
      trend: "5-star ratings",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Animated Stats */}
      <div
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-red-400/20 to-orange-400/20 blur-3xl" />
          <div className="absolute -right-1/4 top-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-orange-400/20 to-yellow-400/20 blur-3xl" />
          <div className="absolute -bottom-1/4 left-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-red-400/20 to-red-400/20 blur-3xl" />
        </div>

        {/* Grid pattern */}
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="spice-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(220,38,38,0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#spice-grid)" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 pt-40">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-300/30 bg-red-100/50 px-6 py-2.5 backdrop-blur-sm"
            >
              <Leaf size={16} className="text-red-600" />
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-700">
                Authentic Indian Masalas Since 1999
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 max-w-4xl bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-5xl font-serif font-black tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Crafting Authentic Flavors for Generations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl"
            >
              From our family's traditional recipes to your kitchen, we bring the finest blend of spices 
              that tell a story of heritage, quality, and passion for authentic Indian cuisine.
            </motion.p>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} delay={0.6 + index * 0.1} />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
      </div>

      {/* Our Story Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Images Grid */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Premium Spices"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Traditional Methods"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.pexels.com/photos/674483/pexels-photo-674483.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Spice Collection"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.pexels.com/photos/4198021/pexels-photo-4198021.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Quality Testing"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-6 py-2.5 mb-6">
                <Heart size={16} className="text-red-500" />
                <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-600">
                  Our Story
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-gray-900 mb-6 leading-tight">
                From Family Kitchen to <span className="text-red-600 italic">Your Home</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                What began as a small family business in 1999 has evolved into one of India's most 
                trusted names in authentic spices and masalas. Our journey started with a simple 
                belief: that the best flavors come from pure, natural ingredients processed with 
                traditional methods.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Today, we continue to honor that tradition while embracing modern quality standards. 
                Every batch of our masalas is crafted with the same care and attention that our 
                founders put into their first products over two decades ago.
              </p>

              <div className="space-y-4">
                {[
                  "100% natural ingredients with no artificial additives",
                  "Traditional grinding methods for authentic taste",
                  "Rigorous quality testing at every stage",
                  "Direct sourcing from trusted farmers",
                  "Eco-friendly packaging and sustainable practices"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <div
            style={{
              backgroundImage: "radial-gradient(circle, #dc2626 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
            className="w-full h-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-6 py-2.5 mb-6">
              <Sparkles size={16} className="text-red-600" />
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-700">
                Our Values
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-gray-900 mb-6">
              What Makes Us <span className="text-red-600 italic">Different</span>
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our commitment to quality, authenticity, and customer satisfaction drives everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "100% Natural",
                desc: "Pure ingredients sourced directly from farms. No artificial colors, preservatives, or chemical additives in any of our products.",
                color: "green"
              },
              {
                icon: Award,
                title: "Traditional Methods",
                desc: "Time-honored grinding and processing techniques passed down through generations to preserve authentic taste and aroma.",
                color: "red"
              },
              {
                icon: Shield,
                title: "Quality Assured",
                desc: "Every batch undergoes rigorous testing in our ISO-certified facility. FSSAI approved with international quality standards.",
                color: "blue"
              },
              {
                icon: Clock,
                title: "Fresh Daily",
                desc: "Made fresh in small batches to ensure maximum potency and flavor. Vacuum-sealed packaging locks in freshness.",
                color: "purple"
              },
              {
                icon: Users,
                title: "Customer First",
                desc: "Over 50,000 satisfied customers trust us for their daily cooking needs. Your satisfaction is our priority.",
                color: "orange"
              },
              {
                icon: TrendingUp,
                title: "Sustainable",
                desc: "Eco-friendly practices from sourcing to packaging. Supporting local farmers and promoting sustainable agriculture.",
                color: "teal"
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 h-full border-2 border-gray-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                      value.color === 'green' ? 'bg-red-500' :
                      value.color === 'red' ? 'bg-red-500' :
                      value.color === 'blue' ? 'bg-blue-500' :
                      value.color === 'purple' ? 'bg-purple-500' :
                      value.color === 'orange' ? 'bg-orange-500' :
                      'bg-teal-500'
                    }`}>
                      <value.icon size={28} className="text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed text-sm">
                      {value.desc}
                    </p>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                    value.color === 'green' ? 'bg-red-500' :
                    value.color === 'red' ? 'bg-red-500' :
                    value.color === 'blue' ? 'bg-blue-500' :
                    value.color === 'purple' ? 'bg-purple-500' :
                    value.color === 'orange' ? 'bg-orange-500' :
                    'bg-teal-500'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
