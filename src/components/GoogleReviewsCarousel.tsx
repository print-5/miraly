"use client";

import React, { useEffect, useState, useRef } from "react";
import { Star, Loader2, Quote, ChevronLeft, ChevronRight, Award } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GoogleReview {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  userPhoto?: string;
  createdAt: string;
  source: string;
}

interface GoogleReviewsData {
  reviews: GoogleReview[];
  averageRating: number;
  totalReviewCount: number;
  cached?: boolean;
  error?: string;
}

export default function GoogleReviewsCarousel() {
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews/google");
        const reviewData = await res.json();
        setData(reviewData);
      } catch (err) {
        console.error("Failed to fetch Google reviews:", err);
        setData({
          reviews: [],
          averageRating: 0,
          totalReviewCount: 0,
          error: "Failed to load reviews",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!data?.reviews?.length) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.reviews.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (data?.reviews?.length || 1));
    }, 5000);
  };

  const goNext = () => {
    if (!data?.reviews) return;
    goTo((activeIndex + 1) % data.reviews.length);
  };

  const goPrev = () => {
    if (!data?.reviews) return;
    goTo((activeIndex - 1 + data.reviews.length) % data.reviews.length);
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (data?.error || !data?.reviews || data.reviews.length === 0) {
    return null;
  }

  const allReviews = data.reviews;
  const visibleCount = Math.min(3, allReviews.length);

  // Get the 3 reviews to show at any given time
  const getVisibleReviews = () => {
    const reviews = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (activeIndex + i) % allReviews.length;
      reviews.push({ review: allReviews[idx], index: idx });
    }
    return reviews;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      {/* Large decorative quote mark */}
      <div className="absolute top-20 left-10 lg:left-20 opacity-[0.03] pointer-events-none">
        <Quote size={200} className="text-gray-900" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Google Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 px-6 py-3 rounded-full shadow-lg">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-gray-700 font-semibold text-sm">
                Google Reviews
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-6 py-2 mb-4">
            <Award size={16} className="text-red-500" />
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-red-600">
              Customer Testimonials
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 tracking-tight mb-4">
            Loved by <span className="text-red-600 italic">Thousands</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Real experiences from families who trust Miraly Foods for their authentic masala needs
          </p>

          {/* Rating Summary */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center gap-8 bg-white border border-gray-200 px-10 py-6 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-serif font-black text-gray-900 mb-2">
                  {data.averageRating.toFixed(1)}
                </div>
                <div className="flex gap-1 mb-2 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.round(data.averageRating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm font-semibold">
                  {data.totalReviewCount} verified reviews
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleReviews().map(({ review, index: idx }, cardIndex) => (
              <motion.div
                key={`${idx}-${activeIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: cardIndex * 0.1, duration: 0.6 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 relative group hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-500"
              >
                {/* Google icon */}
                <button
                  onClick={() =>
                    window.open(
                      "https://www.google.com/search?q=miraly+foods+reviews",
                      "_blank",
                    )
                  }
                  className="absolute top-6 right-6 opacity-50 hover:opacity-80 transition-opacity"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </button>

                {/* Quote icon */}
                <div className="mb-6">
                  <Quote size={32} className="text-red-500/30" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4">
                  {review.comment || "Excellent quality masalas! The authentic taste and aroma are unmatched. Highly recommended for traditional cooking."}
                </p>

                {/* User info */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  {review.userPhoto ? (
                    <Image
                      src={review.userPhoto}
                      alt={review.userName}
                      width={48}
                      height={48}
                      className="rounded-full ring-2 ring-gray-200"
                      unoptimized
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center ring-2 ring-red-200">
                      <span className="text-red-600 font-bold text-lg">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      {review.userName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation controls */}
          {allReviews.length > 3 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={goPrev}
                className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {allReviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 bg-red-500"
                        : "w-2 bg-gray-300 hover:bg-red-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* View All on Google CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?q=miraly+foods+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            View All {data.totalReviewCount} Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
