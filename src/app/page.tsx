import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import TrustSection from "@/components/TrustSection";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutUs from "@/components/AboutUs";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CorporateEnquiry from "@/components/CorporateEnquiry";
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel";
import { getHeroSlides, getCategories, getProducts } from "@/lib/data";

export const metadata = {
  title: "Miraly Foods | Premium Authentic Masala & Spices",
  description:
    "Discover the finest collection of authentic masalas, spices, and traditional food products from Miraly Foods. Premium quality, traditional recipes, modern packaging.",
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [heroSlides, categories, products] = await Promise.all([
    getHeroSlides(),
    getCategories(),
    getProducts(),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Carousel */}
      <HeroCarousel initialSlides={heroSlides} />

      {/* Trust Badges */}
      <TrustSection />

      {/* Premium Categories */}
      <CategorySection initialCategories={categories} />

      {/* Featured Products */}
      <FeaturedProducts initialProducts={products.slice(0, 8)} />

      {/* About Us */}
      <AboutUs />

      {/* Google Reviews */}
      <GoogleReviewsCarousel />

      {/* Corporate Enquiry */}
      <CorporateEnquiry />

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </main>
  );
}
