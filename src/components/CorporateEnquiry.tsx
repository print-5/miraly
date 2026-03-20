"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Users,
  Calendar,
  Briefcase,
  CheckCircle2,
  Building,
  Gift,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CorporateEnquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "Corporate Booking",
    message: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        toast.success("Enquiry sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          type: "Corporate Booking",
          message: "",
          date: "",
        });
      } else {
        toast.error("Failed to send enquiry. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400";

  if (success) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-lg mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 p-10 rounded-3xl text-center"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-3">
              Request Received Successfully!
            </h3>
            <p className="text-red-600 leading-relaxed mb-6">
              Thank you for considering Miraly Foods for your corporate needs. 
              Our business team will contact you within 24 hours to discuss your requirements.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="text-red-700 font-bold hover:underline"
            >
              Send another request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-500/[0.03] rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-6 py-2 mb-4">
              <Building size={16} className="text-red-500" />
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-600">
                Corporate Solutions
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 tracking-tight">
              Bulk Orders & <span className="text-red-600 italic">Corporate</span> Catering
            </h2>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-8 h-[2px] bg-gray-300 rounded-full" />
            </div>
            
            <p className="text-gray-600 leading-relaxed text-lg font-medium">
              From corporate gifting to large-scale events, bring the authentic taste of premium masalas 
              to your business occasions. We specialize in custom solutions for enterprises across India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                {
                  icon: Briefcase,
                  title: "Corporate Gifting",
                  desc: "Premium gift hampers with custom branding for employees and clients",
                  color: "blue"
                },
                {
                  icon: Users,
                  title: "Event Catering",
                  desc: "Bulk masala supplies for large gatherings and corporate events",
                  color: "green"
                },
                {
                  icon: Calendar,
                  title: "Festival Specials",
                  desc: "Pre-booking services for Diwali, Pongal, and other celebrations",
                  color: "purple"
                },
                {
                  icon: Truck,
                  title: "Bulk Distribution",
                  desc: "Wholesale pricing and nationwide delivery for large orders",
                  color: "orange"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg transition-all duration-300 ${
                    item.color === 'blue' ? 'bg-blue-500 group-hover:bg-blue-600' :
                    item.color === 'green' ? 'bg-red-500 group-hover:bg-red-600' :
                    item.color === 'purple' ? 'bg-purple-500 group-hover:bg-purple-600' :
                    'bg-orange-500 group-hover:bg-orange-600'
                  }`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Gift size={24} className="text-red-400" />
                Why Choose Our Corporate Services?
              </h3>
              <div className="space-y-3">
                {[
                  "Competitive wholesale pricing for bulk orders",
                  "Custom packaging with your company branding",
                  "Dedicated account manager for seamless coordination",
                  "Flexible delivery schedules across India",
                  "Quality guarantee on all corporate orders"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-red-400 shrink-0" />
                    <span className="text-sm text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl relative overflow-hidden"
          >
            {/* Form decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-xl flex items-center justify-center">
                <Send size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Get a Custom Quote
                </h3>
                <p className="text-sm text-gray-600">
                  Tell us about your requirements
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={inputClass}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputClass}
                  placeholder="john@company.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={inputClass}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">
                    Service Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option>Corporate Gifting</option>
                    <option>Event Catering</option>
                    <option>Bulk Orders</option>
                    <option>Custom Packaging</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">
                  Project Details *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputClass} min-h-[120px] resize-none`}
                  placeholder="Please describe your requirements, quantity needed, delivery timeline, and any special requests..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold uppercase tracking-wider py-4 rounded-xl shadow-xl shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 group"
              >
                {loading ? (
                  "Sending Request..."
                ) : (
                  <>
                    Send Enquiry
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Our corporate team will respond within 24 hours with a customized quote 
                and detailed proposal for your requirements.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

