"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Filter,
  Search as SearchIcon,
  ChevronDown,
  Star,
  ShoppingCart,
  Loader2,
  Heart,
  CheckCircle2,
  X,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Zap,
  Package,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearchParams } from "next/navigation";

export default function ShopClient({
  initialProducts,
  initialCategories,
  initialManageInventory,
}: {
  initialProducts: any[];
  initialCategories: any[];
  initialManageInventory: boolean;
}) {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "All";
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [products] = useState<any[]>(initialProducts);
  const [categories] = useState<any[]>(initialCategories);
  const [loading] = useState(false);

  // Filters & Sorting
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [manageInventory] = useState(initialManageInventory);
  const [sortBy, setSortBy] = useState("Recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 8;

  // Handle URL parameter changes
  useEffect(() => {
    const urlCategory = searchParams.get("category") || "All";
    const urlSearch = searchParams.get("search") || "";
    
    setActiveCategory(urlCategory);
    setSearchQuery(urlSearch);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = p.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesPrice =
          p.price >= priceRange[0] && p.price <= priceRange[1];
        const matchesRating = (p.rating || 4.5) >= minRating;
        const matchesStock =
          !manageInventory ||
          !inStockOnly ||
          p.stock > 0 ||
          (p.variants && p.variants.some((v: any) => v.stock > 0));
        return (
          matchesCategory &&
          matchesSearch &&
          matchesPrice &&
          matchesRating &&
          matchesStock
        );
      })
      .sort((a, b) => {
        if (sortBy === "Price: Low to High") return a.price - b.price;
        if (sortBy === "Price: High to Low") return b.price - a.price;
        if (sortBy === "Top Rated") return (b.rating || 0) - (a.rating || 0);
        return 0; // "Recommended"
      });
  }, [
    products,
    activeCategory,
    searchQuery,
    priceRange,
    minRating,
    inStockOnly,
    sortBy,
  ]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="bg-gray-50">
      {/* Hero Section - Masala Theme */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-orange-600 border-b border-red-800/20 py-12 pt-32 md:pt-36">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-8 bg-white/60"></span>
                <span className="text-[10px] font-sans font-black uppercase text-white/80 tracking-[0.3em]">
                  Premium Quality Spices
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-3">
                Our Products
              </h1>
              <p className="text-white/90 text-sm md:text-base font-sans font-medium">
                Showing {filteredProducts.length} authentic masala blends
              </p>
            </div>

            {/* Desktop Quick Search In Header */}
            <div className="relative hidden md:block w-80">
              <SearchIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for spices, masalas..."
                className="w-full bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-full py-3.5 pl-12 pr-4 text-sm font-sans font-medium outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 placeholder:text-gray-500 shadow-lg"
              />
            </div>

            {/* Mobile Search */}
            <div className="relative md:hidden w-full mt-2">
              <SearchIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-full py-3 pl-11 pr-4 text-sm font-sans font-medium outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 placeholder:text-gray-500 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          {/* Sidebar Filters - Masala Theme */}
          <aside className="hidden lg:block lg:w-72 shrink-0 space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit sticky top-24">
            {/* Active Filters Summary */}
            {(activeCategory !== "All" || inStockOnly || minRating > 0) && (
              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-gray-900">
                    Active Filters
                  </h4>
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setInStockOnly(false);
                      setMinRating(0);
                    }}
                    className="text-[9px] font-sans font-bold text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCategory !== "All" && (
                    <span className="px-2 py-1 bg-white text-[9px] font-sans font-bold rounded-lg border border-red-200 text-red-600 flex items-center gap-1">
                      {activeCategory}{" "}
                      <X
                        size={10}
                        className="cursor-pointer"
                        onClick={() => setActiveCategory("All")}
                      />
                    </span>
                  )}
                  {inStockOnly && (
                    <span className="px-2 py-1 bg-white text-[9px] font-sans font-bold rounded-lg border border-red-200 text-red-600 flex items-center gap-1">
                      In Stock{" "}
                      <X
                        size={10}
                        className="cursor-pointer"
                        onClick={() => setInStockOnly(false)}
                      />
                    </span>
                  )}
                  {minRating > 0 && (
                    <span className="px-2 py-1 bg-white text-[9px] font-sans font-bold rounded-lg border border-red-200 text-red-600 flex items-center gap-1">
                      {minRating}+ Stars{" "}
                      <X
                        size={10}
                        className="cursor-pointer"
                        onClick={() => setMinRating(0)}
                      />
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Categories Vertical */}
            <div>
              <h3 className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center justify-between">
                Categories <ChevronDown size={14} className="text-gray-400" />
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-sans font-medium transition-all ${activeCategory === "All" ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-sans font-medium transition-all ${activeCategory === cat.name ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wide mb-3">
                Price Range
              </h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-red-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-3">
                  <span className="text-xs font-sans font-medium text-gray-500">
                    ₹0
                  </span>
                  <span className="text-xs font-sans font-bold text-gray-900">
                    Up to ₹{priceRange[1]}
                  </span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wide mb-3">
                Customer Rating
              </h3>
              <div className="space-y-2">
                {[4, 3, 2].map((star) => (
                  <button
                    key={star}
                    onClick={() => setMinRating(star)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-sans font-medium transition-all ${minRating === star ? "border-2 border-red-600 bg-red-50 text-gray-900" : "border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                  >
                    <div className="flex text-yellow-500">
                      {[...Array(star)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                      {[...Array(5 - star)].map((_, i) => (
                        <Star key={i} size={14} className="text-gray-300" />
                      ))}
                    </div>
                    & Up
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            {manageInventory && (
              <div>
                <h3 className="text-xs font-sans font-bold text-gray-900 uppercase tracking-wide mb-3">
                  Availability
                </h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-11 h-6 rounded-full p-1 transition-all ${inStockOnly ? "bg-red-600" : "bg-gray-300"}`}
                    onClick={() => setInStockOnly(!inStockOnly)}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${inStockOnly ? "translate-x-5" : "translate-x-0"}`}
                    ></div>
                  </div>
                  <span className="text-sm font-sans font-medium text-gray-600 group-hover:text-gray-900">
                    In Stock Only
                  </span>
                </label>
              </div>
            )}
          </aside>

          {/* 3. High-Density Product Grid (Bringing Items Above Fold) */}
          {/* 3. High-Density Product Grid (Bringing Items Above Fold) */}
          <div className="flex-grow">
            {/* Utility Bar */}
            <div className="flex items-center justify-between mb-6 md:mb-8 bg-white p-3 md:p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="flex lg:hidden items-center gap-2 text-[10px] font-sans font-black text-gray-900 uppercase tracking-widest bg-red-50 px-3 py-2 rounded-lg border border-red-100"
                >
                  <Filter size={14} /> Filters
                </button>
                <div className="hidden lg:flex items-center gap-2 text-[10px] font-sans font-black text-gray-900 uppercase tracking-widest">
                  <Filter size={14} className="text-red-600" /> Filters
                </div>
                <span className="h-4 w-px bg-gray-200"></span>
                <p className="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-widest">
                  {filteredProducts.length} Results
                </p>
              </div>

              <div className="flex items-center gap-2 group relative">
                <ArrowUpDown
                  size={14}
                  className="text-gray-400 absolute left-0 pointer-events-none"
                />
                <select
                  className="appearance-none bg-transparent pl-5 pr-4 py-1 text-[10px] font-sans font-black text-gray-900 uppercase tracking-widest cursor-pointer outline-none focus:ring-0 border-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Recommended">Recommended</option>
                  <option value="Top Rated">Top Rated</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 space-y-4 border border-gray-200"
                  >
                    <div className="aspect-[4/5] bg-gray-100 rounded-xl animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                  <LayoutGrid size={32} />
                </div>
                <h3 className="text-lg font-serif font-black text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600 text-sm max-w-xs mx-auto font-sans">
                  We couldn't find any products matching your current filters.
                  Try adjusting them!
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setPriceRange([0, 2000]);
                    setMinRating(0);
                    setSearchQuery("");
                  }}
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full text-[10px] font-sans font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((p, idx) => {
                      const totalStock =
                        p.variants && p.variants.length > 0
                          ? p.variants.reduce(
                              (acc: number, v: any) => acc + (v.stock || 0),
                              0,
                            )
                          : p.stock || 0;
                      const isOutOfStock = manageInventory && totalStock === 0;
                      return (
                        <motion.div
                          layout
                          key={p._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="group relative"
                        >
                          <div
                            className={`h-full bg-white rounded-2xl p-2.5 md:p-4 border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-500 flex flex-col ${isOutOfStock ? "opacity-70 grayscale-[0.5]" : ""}`}
                          >
                            {/* Product Image Wrapper */}
                            <Link href={`/shop/${p.slug || p._id}`} className="block">
                              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 mb-4">
                                <Image
                                  src={
                                    p.images?.[0] ||
                                    "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800"
                                  }
                                  alt={p.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  fill
                                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                  priority={idx < 4}
                                />

                                {/* Badges */}
                                {p.badge && (
                                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-orange-600 text-white px-2.5 py-1 rounded-lg text-[9px] font-sans font-black uppercase tracking-widest shadow-lg">
                                    {p.badge}
                                  </div>
                                )}

                                {/* Wishlist Button */}
                                <button 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (isInWishlist(p._id)) {
                                      removeFromWishlist(p._id);
                                    } else {
                                      addToWishlist(p);
                                    }
                                  }}
                                  className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 ${
                                    isInWishlist(p._id)
                                      ? 'bg-red-500 text-white hover:bg-red-600'
                                      : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                                  }`}
                                >
                                  <Heart size={14} fill={isInWishlist(p._id) ? 'currentColor' : 'none'} />
                                </button>

                                {isOutOfStock && (
                                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                                    <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-[10px] font-sans font-black uppercase tracking-widest shadow-xl">
                                      Sold Out
                                    </span>
                                  </div>
                                )}
                              </div>
                            </Link>

                            {/* Product Details */}
                            <div className="flex-grow flex flex-col px-1 pb-1">
                              <Link href={`/shop/${p.slug || p._id}`} className="block">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-[10px] font-sans font-black text-gray-500 uppercase tracking-widest truncate">
                                    {p.category}
                                  </p>
                                  <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={10} fill="currentColor" />
                                    <span className="text-[10px] font-sans font-bold text-gray-900">
                                      {p.rating || 4.5}
                                    </span>
                                  </div>
                                </div>
                                <h3 className="text-sm font-serif font-black text-gray-900 line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-red-600 transition-colors mb-4">
                                  {p.name}
                                </h3>

                                <div className="flex items-baseline gap-2 mb-4">
                                  <p className="text-xl font-sans font-black text-gray-900">
                                    ₹{p.price}
                                  </p>
                                  {p.mrp && p.mrp > p.price && (
                                    <span className="text-xs font-sans text-gray-400 line-through">
                                      ₹{p.mrp}
                                    </span>
                                  )}
                                </div>
                              </Link>

                              {/* Add to Cart Button - Outside Link to prevent nested links */}
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (isOutOfStock) return;
                                  if (p.variants && p.variants.length > 0) {
                                    // Find first in-stock variant, or default to first if none found (fallback)
                                    const bestVariant =
                                      p.variants.find(
                                        (v: any) =>
                                          !manageInventory || v.stock > 0,
                                      ) || p.variants[0];
                                    addToCart(
                                      {
                                        ...p,
                                        price: bestVariant.price,
                                        uom: bestVariant.uom,
                                      },
                                      1,
                                    );
                                  } else {
                                    addToCart(p, 1);
                                  }
                                }}
                                disabled={isOutOfStock}
                                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
                                  isOutOfStock
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-red-600 to-orange-600 text-white hover:shadow-xl"
                                }`}
                              >
                                <ShoppingCart size={14} />
                                {isOutOfStock ? "Sold Out" : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Modern Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="p-3 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 disabled:opacity-30 transition-all shadow-sm"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-12 h-12 rounded-xl font-sans font-black text-xs transition-all ${currentPage === i + 1 ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg scale-110" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-3 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 disabled:opacity-30 transition-all shadow-sm"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Benefits Section - Masala Theme */}
      <section className="bg-white border-y border-gray-200 py-12 mb-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: <CheckCircle2 className="text-red-600" />,
              title: "Quality Check",
              desc: "100% Authentic",
            },
            {
              icon: <Zap className="text-yellow-500" />,
              title: "Fast Shipping",
              desc: "Ships in 24 Hours",
            },
            {
              icon: <Heart className="text-red-600" />,
              title: "Traditional",
              desc: "Heritage Recipes",
            },
            {
              icon: <Package className="text-orange-600" />,
              title: "Secure Packing",
              desc: "Safe Delivery",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h4 className="text-xs font-sans font-bold uppercase text-gray-900 mb-1">
                {item.title}
              </h4>
              <p className="text-[10px] text-gray-500 font-sans font-medium uppercase tracking-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Filter Drawer - Masala Theme */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[101] shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-serif font-black text-gray-900 uppercase tracking-wider">
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-10 pb-20">
                  {/* Active Filters */}
                  <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-gray-900">
                        Active Filters
                      </h4>
                      <button
                        onClick={() => {
                          setActiveCategory("All");
                          setInStockOnly(false);
                          setMinRating(0);
                        }}
                        className="text-[9px] font-sans font-bold text-red-600 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeCategory === "All" && !inStockOnly && (
                        <span className="text-[10px] text-gray-400 font-bold uppercase italic">
                          None Active
                        </span>
                      )}
                      {activeCategory !== "All" && (
                        <span className="px-3 py-1.5 bg-white text-[10px] font-sans font-bold rounded-lg border border-red-200 text-red-600 flex items-center gap-2">
                          {activeCategory}{" "}
                          <X
                            size={12}
                            className="cursor-pointer"
                            onClick={() => setActiveCategory("All")}
                          />
                        </span>
                      )}
                      {inStockOnly && (
                        <span className="px-3 py-1.5 bg-white text-[10px] font-sans font-bold rounded-lg border border-red-200 text-red-600 flex items-center gap-2">
                          In Stock{" "}
                          <X
                            size={12}
                            className="cursor-pointer"
                            onClick={() => setInStockOnly(false)}
                          />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="text-xs font-sans font-bold text-gray-900 uppercase tracking-widest mb-4">
                      Categories
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveCategory("All")}
                        className={`text-left px-4 py-3 rounded-xl text-xs font-sans font-bold transition-all ${activeCategory === "All" ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg" : "bg-gray-50 text-gray-600"}`}
                      >
                        All
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat._id}
                          onClick={() => setActiveCategory(cat.name)}
                          className={`text-left px-4 py-3 rounded-xl text-xs font-sans font-bold transition-all ${activeCategory === cat.name ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg" : "bg-gray-50 text-gray-600"}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h3 className="text-xs font-sans font-bold text-gray-900 uppercase tracking-widest mb-4">
                      Price Range
                    </h3>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([0, parseInt(e.target.value)])
                      }
                      className="w-full accent-red-600 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-3 px-1">
                      <span className="text-xs font-sans font-medium text-gray-500">
                        ₹0
                      </span>
                      <span className="text-xs font-sans font-bold text-gray-900">
                        Up to ₹{priceRange[1]}
                      </span>
                    </div>
                  </div>

                  {/* Ratings */}
                  <div>
                    <h3 className="text-xs font-sans font-bold text-gray-900 uppercase tracking-widest mb-4">
                      Min Rating
                    </h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {[4, 3, 2].map((star) => (
                        <button
                          key={star}
                          onClick={() => setMinRating(star)}
                          className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-bold transition-all border-2 ${minRating === star ? "border-red-600 bg-red-50 text-gray-900" : "border-gray-100 text-gray-500 hover:border-red-200"}`}
                        >
                          {star}â˜… & Up
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                    <span className="text-sm font-sans font-bold text-gray-900 uppercase tracking-wider">
                      In Stock Only
                    </span>
                    <div
                      className={`w-12 h-6.5 rounded-full p-1 transition-all ${inStockOnly ? "bg-red-600" : "bg-gray-300"}`}
                      onClick={() => setInStockOnly(!inStockOnly)}
                    >
                      <motion.div
                        animate={{ x: inStockOnly ? 22 : 0 }}
                        className="w-4.5 h-4.5 bg-white rounded-full shadow-sm"
                      />
                    </div>
                  </label>

                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
