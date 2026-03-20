"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageSquare,
  Users,
  Calendar,
  Briefcase,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [settings, setSettings] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"general" | "corporate">("general");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };
    fetchSettings();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "General Inquiry",
    message: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

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
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          type: activeTab === "general" ? "General Inquiry" : "Corporate Booking",
          message: "",
          date: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfos = [
    {
      title: "Visit Us",
      content: settings?.address || "# 3/81, 1st Floor, Kaveri Main Street, SRV Nagar, Thirunagar, Madurai - 625006",
      icon: MapPin,
      color: "red",
    },
    {
      title: "Call / WhatsApp",
      content: settings?.contactPhone || "+91 96009 16065",
      icon: Phone,
      color: "green",
    },
    {
      title: "Email Us",
      content: settings?.contactEmail || "info@miraly.com",
      icon: Mail,
      color: "blue",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-8 md:pb-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-6 py-2.5 mb-6">
              <MessageSquare size={16} className="text-red-500" />
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-600">
                Get in Touch
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 mb-6 leading-tight">
              We'd Love to <span className="text-red-600 italic">Hear</span> From You
            </h1>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-[3px] bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-10 h-[2px] bg-gray-300 rounded-full" />
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you have a question, feedback, or need bulk orders for your event, 
              we're here to assist you with authentic masalas and spices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfos.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="group"
                >
                  <div className="bg-white border-2 border-gray-100 hover:border-red-200 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                        item.color === 'red' ? 'bg-red-500 group-hover:bg-red-600' :
                        item.color === 'green' ? 'bg-red-500 group-hover:bg-red-600' :
                        'bg-blue-500 group-hover:bg-blue-600'
                      }`}>
                        <item.icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={24} className="text-red-400" />
                  <h3 className="text-lg font-bold">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Saturday</span>
                    <span className="font-semibold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="font-semibold">10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </motion.div>

              {/* Corporate Services */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-red-600 to-red-500 rounded-3xl p-6 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                <h3 className="text-lg font-bold mb-4 relative z-10">Corporate Services</h3>
                <div className="space-y-3 mb-6 relative z-10">
                  {[
                    { icon: Briefcase, text: "Corporate Gifting" },
                    { icon: Users, text: "Bulk Orders" },
                    { icon: Calendar, text: "Event Catering" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-red-300" />
                      <span className="text-sm font-medium text-white/90">{item.text}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab("corporate")}
                  className="text-sm font-bold text-white hover:text-red-300 transition-colors relative z-10"
                >
                  Request Quote â†’
                </button>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white border-2 border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl"
              >
                {/* Tab Switcher */}
                <div className="flex gap-3 mb-8 p-1.5 bg-gray-100 rounded-2xl">
                  <button
                    onClick={() => {
                      setActiveTab("general");
                      setFormData({ ...formData, type: "General Inquiry" });
                    }}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                      activeTab === "general"
                        ? "bg-white text-red-600 shadow-md"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    General Inquiry
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("corporate");
                      setFormData({ ...formData, type: "Corporate Booking" });
                    }}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                      activeTab === "corporate"
                        ? "bg-white text-red-600 shadow-md"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Corporate / Events
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white rounded-xl py-3.5 px-4 outline-none transition-all text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white rounded-xl py-3.5 px-4 outline-none transition-all text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white rounded-xl py-3.5 px-4 outline-none transition-all text-gray-900"
                      />
                    </div>
                    {activeTab === "corporate" && (
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your Company"
                          className="w-full bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white rounded-xl py-3.5 px-4 outline-none transition-all text-gray-900"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      {activeTab === "general" ? "Subject" : "Enquiry Type"}
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white rounded-xl py-3.5 px-4 outline-none transition-all text-gray-900 appearance-none cursor-pointer"
                    >
                      {activeTab === "general" ? (
                        <>
                          <option>General Inquiry</option>
                          <option>Order Support</option>
                          <option>Product Question</option>
                          <option>Feedback</option>
                        </>
                      ) : (
                        <>
                          <option>Corporate Booking</option>
                          <option>Event Catering</option>
                          <option>Bulk Order</option>
                          <option>Corporate Gifting</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      Message *
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        activeTab === "general"
                          ? "How can we help you today?"
                          : "Tell us about your event, expected guest count, and requirements..."
                      }
                      className="w-full bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white rounded-xl py-4 px-4 outline-none transition-all text-gray-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all active:scale-95 group disabled:opacity-70"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
