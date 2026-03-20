"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Twitter,
  Award,
  Leaf,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative">
      {/* Main Footer */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 pt-20 pb-12 relative overflow-hidden border-t-4 border-red-600">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 border-b border-white/10 pb-16">
            {/* Column 1: Brand Info */}
            <div className="space-y-5">
              <Link href="/">
                {settings?.logo ? (
                  <div className="h-20 w-72 md:h-24 md:w-80 relative mb-4 brightness-110">
                    <Image
                      src={settings.logo}
                      alt={settings.shopName || "Miraly Foods"}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-xl mr-3">
                      <span className="text-2xl font-serif font-black tracking-tight">
                        M
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-serif font-black text-white tracking-tight leading-none">
                        Miraly
                      </span>
                      <span className="text-sm uppercase font-bold tracking-[0.2em] text-red-400 leading-none">
                        Foods
                      </span>
                    </div>
                  </div>
                )}
              </Link>
              <p className="text-red-400 font-serif italic text-base">
                "Authentic Masalas, Timeless Flavors"
              </p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Premium quality masalas and spices crafted with traditional methods, 
                bringing authentic Indian flavors to your kitchen.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <Award size={16} className="text-red-400" />
                  <span className="text-xs font-bold text-gray-300">100% Authentic</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <Leaf size={16} className="text-red-400" />
                  <span className="text-xs font-bold text-gray-300">Pure & Natural</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <Shield size={16} className="text-blue-400" />
                  <span className="text-xs font-bold text-gray-300">Quality Assured</span>
                </div>
              </div>

              <div className="space-y-3.5 pt-4">
                {settings?.contactPhone && (
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="flex items-center gap-3 group text-gray-400 hover:text-white transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-red-600/20 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                      <Phone size={15} />
                    </div>
                    <span className="text-sm font-semibold">
                      {settings.contactPhone}
                    </span>
                  </a>
                )}
                {settings?.contactEmail && (
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="flex items-center gap-3 group text-gray-400 hover:text-white transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-red-600/20 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                      <Mail size={15} />
                    </div>
                    <span className="text-sm font-semibold">
                      {settings.contactEmail}
                    </span>
                  </a>
                )}
                {settings?.address && (
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-9 h-9 rounded-xl bg-red-600/20 flex items-center justify-center">
                      <MapPin size={15} />
                    </div>
                    <span className="text-sm font-medium leading-snug">
                      {settings.address}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Column 2: Our Policies */}
            <div>
              <h4 className="text-white font-bold text-base mb-6 relative inline-block">
                Our Policies
                <span className="absolute -bottom-1.5 left-0 w-12 h-[3px] bg-gradient-to-r from-red-600 to-red-500 rounded-full" />
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Privacy Policy", link: "/privacy-policy" },
                  { name: "Shipping Policy", link: "/shipping-policy" },
                  { name: "Return & Refund", link: "/return-and-refund" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className="text-gray-400 hover:text-red-400 hover:pl-2 transition-all text-sm font-medium flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 className="text-white font-bold text-base mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1.5 left-0 w-12 h-[3px] bg-gradient-to-r from-red-600 to-red-500 rounded-full" />
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Track Your Order", link: "/track" },
                  { name: "About Us", link: "/about" },
                  { name: "Contact Us", link: "/contact" },
                  { name: "All Products", link: "/shop" },
                  { name: "Bulk Orders", link: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className="text-gray-400 hover:text-red-400 hover:pl-2 transition-all text-sm font-medium flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Corporate Services + Socials */}
            <div>
              <h4 className="text-white font-bold text-base mb-6 relative inline-block">
                Corporate Services
                <span className="absolute -bottom-1.5 left-0 w-12 h-[3px] bg-gradient-to-r from-red-600 to-red-500 rounded-full" />
              </h4>
              <ul className="space-y-3 mb-8">
                {[
                  { name: "Custom Packaging", link: "/contact" },
                  { name: "Bulk Orders", link: "/contact" },
                  { name: "Corporate Gifting", link: "/contact" },
                  { name: "Event Catering", link: "/contact" },
                  { name: "Wholesale Pricing", link: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className="text-gray-400 hover:text-red-400 hover:pl-2 transition-all text-sm font-medium flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Connect With Us
                </p>
                <div className="flex gap-3">
                  {settings?.socialMedia?.instagram && (
                    <a
                      href={settings.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  {settings?.socialMedia?.facebook && (
                    <a
                      href={settings.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all"
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                  {settings?.socialMedia?.twitter && (
                    <a
                      href={settings.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white hover:border-transparent transition-all"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
            >
              Bulk Enquiry
            </Link>
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 border border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/40"
            >
              View Offers
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center border-t border-white/10 pt-8">
            <p className="text-gray-500 text-xs font-semibold">
              Â© {new Date().getFullYear()} {settings?.shopName || "Miraly Foods"}. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-gray-500 text-xs font-semibold">
              <Link
                href="/terms"
                className="hover:text-red-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="hover:text-red-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll To Top */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-110 transition-all group"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}


