"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingBag, ArrowRight, Heart, Award } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

export default function FeaturedProducts({
  initialProducts,
}: {
  initialProducts: any[];
}) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [products] = useState<any[]>(initialProducts);
  const [loading] = useState(false);

  if (loading)
    return (
      <section className="py-24 bg-white flex justify-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </section>
    );

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-500/[0.03] rounded-full blur-[100px] translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-6 py-2 mb-4">
              <Award size={16} className="text-red-600" />
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-700">
                Customer Favorites
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 tracking-tight mb-4">
              Best <span className="text-red-600 italic">Sellers</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-lg leading-relaxed font-medium">
              Discover our most loved masalas and spices, trusted by thousands of customers for their authentic taste and premium quality.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-[3px] bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-red-500 rounded-full" />
            </div>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-6 py-3 rounded-xl border border-gray-200 hover:border-red-200 font-semibold"
          >
            View All Products
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col h-full group"
            >
              <Link href={`/shop/${product.slug}`} className="flex flex-col h-full">
                {/* Image Container */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square mb-4 border border-gray-200 group-hover:shadow-xl group-hover:shadow-gray-900/15 transition-all duration-500">
                  <Image
                    src={
                      product.images && product.images[0]
                        ? product.images[0]
                        : "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=400"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Product badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {product.mrp && product.mrp > product.price && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full shadow-lg">
                      <span className="text-xs font-bold">
                        {Math.round(
                          ((product.mrp - product.price) / product.mrp) * 100,
                        )}
                        % OFF
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (isInWishlist(product._id)) {
                        removeFromWishlist(product._id);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                    className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 ${
                      isInWishlist(product._id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart size={16} fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
                  </button>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow px-1">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors duration-300 mb-3">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-gray-900">
                        ₹{product.price}
                      </span>
                      {product.mrp && product.mrp > product.price && (
                        <span className="text-sm text-gray-400 line-through font-medium">
                          ₹{product.mrp}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-200">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-gray-700">
                        {product.rating || "4.8"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Add to Cart Button */}
              <div className="px-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product, 1);
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom section with quality assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-gradient-to-r from-gray-50 to-white px-8 py-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Award size={16} className="text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Premium Quality</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Star size={16} className="text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Authentic Taste</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Heart size={16} className="text-yellow-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Customer Loved</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
