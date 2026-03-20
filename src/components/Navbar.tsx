"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Package,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  Search,
  MapPin,
} from "lucide-react";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<
    { _id: string; name: string; slug: string }[]
  >([]);

  const [settings, setSettings] = useState<any>(null);

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const fetchData = async () => {
      try {
        const [catRes, setRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/admin/settings"),
        ]);

        if (catRes.ok) {
          const data = await catRes.json();
          if (Array.isArray(data)) setCategories(data);
        }

        if (setRes.ok) {
          const sData = await setRes.json();
          setSettings(sData);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className={`fixed w-full z-50 transition-all duration-300`}>
        {/* Top Bar */}
        {!isScrolled && (
          <div className="bg-gradient-to-r from-red-700 to-red-600 text-white/90 py-2.5 border-b border-red-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-medium">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-red-300" />
                  <span className="text-white/80">Serving Fresh Masalas Across India</span>
                </div>
                {settings?.contactPhone && (
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="hover:text-red-300 transition-colors flex items-center gap-2"
                  >
                    <Phone size={12} className="text-red-300" />
                    {settings.contactPhone}
                  </a>
                )}
                {settings?.contactEmail && (
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="hidden lg:flex hover:text-red-300 transition-colors items-center gap-2"
                  >
                    <Mail size={12} className="text-red-300" />
                    {settings.contactEmail}
                  </a>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden md:block text-white/70 text-xs">Follow Us:</span>
                {settings?.socialMedia?.facebook && (
                  <a
                    href={settings.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-300 transition-colors p-1"
                  >
                    <Facebook size={16} />
                  </a>
                )}
                {settings?.socialMedia?.instagram && (
                  <a
                    href={settings.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-300 transition-colors p-1"
                  >
                    <Instagram size={16} />
                  </a>
                )}
                {settings?.socialMedia?.twitter && (
                  <a
                    href={settings.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-300 transition-colors p-1"
                  >
                    <Twitter size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <nav
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-xl py-3 border-b border-gray-200/50"
              : "bg-white py-4 shadow-lg"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={24} />
              </button>

              {/* Brand Logo */}
              <Link
                href="/"
                className="flex items-center group flex-shrink-0"
              >
                {settings?.logo ? (
                  <div className="h-12 md:h-16 lg:h-20 w-32 md:w-48 lg:w-64 relative">
                    <Image
                      src={settings.logo}
                      alt={settings.shopName || "Miraly Foods"}
                      fill
                      className="object-contain transition-transform group-hover:scale-105"
                      priority
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-xl mr-3">
                      <span className="text-lg md:text-2xl font-serif font-black tracking-tight">
                        M
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl md:text-3xl font-serif font-black text-gray-900 tracking-tight leading-none group-hover:text-red-600 transition-colors">
                        Miraly
                      </span>
                      <span className="text-xs md:text-sm uppercase font-bold tracking-[0.2em] text-red-600 leading-none">
                        Foods
                      </span>
                    </div>
                  </div>
                )}
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                <Link
                  href="/"
                  className={`text-sm font-semibold transition-colors ${
                    isActive("/") && pathname === "/"
                      ? "text-red-600"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  Home
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">
                    Categories
                    <ChevronDown
                      size={16}
                      className="group-hover:rotate-180 transition-transform"
                    />
                  </button>
                  <div className="absolute top-full -left-4 w-64 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden py-3 ring-1 ring-gray-200 border border-gray-100">
                      {categories.length > 0 ? (
                        categories.map((cat) => (
                          <Link
                            key={cat._id}
                            href={`/shop?category=${encodeURIComponent(cat.name)}`}
                            className="block px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors border-l-4 border-transparent hover:border-red-500"
                          >
                            {cat.name}
                          </Link>
                        ))
                      ) : (
                        <div className="px-6 py-4 text-sm text-gray-400 italic">
                          No categories found
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  href="/shop"
                  className={`text-sm font-semibold transition-colors ${
                    isActive("/shop")
                      ? "text-red-600"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  All Products
                </Link>
                
                <Link
                  href="/about"
                  className={`text-sm font-semibold transition-colors ${
                    isActive("/about")
                      ? "text-red-600"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  About Us
                </Link>
                
                <Link
                  href="/contact"
                  className={`text-sm font-semibold transition-colors ${
                    isActive("/contact")
                      ? "text-red-600"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  Contact
                </Link>
              </div>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                <form onSubmit={handleSearch} className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for masalas, spices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Search size={18} />
                  </button>
                </form>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-2 shrink-0">
                {session ? (
                  <Link
                    href={
                      session.user.role === "admin"
                        ? "/admin/dashboard"
                        : session.user.role === "customer"
                          ? "/profile"
                          : "/login"
                    }
                    className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                  >
                    <User size={20} />
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                  >
                    <User size={20} />
                  </Link>
                )}
                
                <Link
                  href="/wishlist"
                  className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full relative group transition-all"
                >
                  <Heart size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full relative group transition-all"
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="md:hidden mt-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search masalas & spices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] flex flex-col shadow-2xl"
            >
              {/* Mobile Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="bg-white/20 text-white px-3 py-2 rounded-lg mr-3">
                      <span className="text-lg font-serif font-black">M</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-serif font-black tracking-tight">
                        Miraly
                      </span>
                      <span className="text-xs uppercase font-bold tracking-wider text-red-200">
                        Foods
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="text-sm text-white/80">Premium Authentic Masalas & Spices</p>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">
                      Navigation
                    </h3>
                    <Link
                      href="/"
                      className={`block text-lg font-semibold ${
                        isActive("/") && pathname === "/" ? "text-red-600" : "text-gray-900"
                      } hover:text-red-600 transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/shop"
                      className={`block text-lg font-semibold ${
                        isActive("/shop") ? "text-red-600" : "text-gray-900"
                      } hover:text-red-600 transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      All Products
                    </Link>
                    <Link
                      href="/about"
                      className={`block text-lg font-semibold ${
                        isActive("/about") ? "text-red-600" : "text-gray-900"
                      } hover:text-red-600 transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      className={`block text-lg font-semibold ${
                        isActive("/contact") ? "text-red-600" : "text-gray-900"
                      } hover:text-red-600 transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">
                      Categories
                    </h3>
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <Link
                          key={cat._id}
                          href={`/shop?category=${encodeURIComponent(cat.name)}`}
                          className="block text-base font-medium text-gray-600 hover:text-red-600 transition-colors pl-4 border-l-2 border-transparent hover:border-red-500"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic pl-4">
                        No categories available
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="space-y-3">
                  <Link
                    href={
                      session
                        ? session.user.role === "admin"
                          ? "/admin/dashboard"
                          : "/profile"
                        : "/login"
                    }
                    className="flex items-center gap-3 text-gray-700 hover:text-red-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    {session
                      ? session.user.role === "admin"
                        ? "Admin Dashboard"
                        : "My Profile"
                      : "Login / Register"}
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 text-gray-700 hover:text-red-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={20} />
                    My Wishlist
                    {wishlistCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 text-gray-700 hover:text-red-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Package size={20} />
                    My Orders
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

