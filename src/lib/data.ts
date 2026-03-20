import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Settings from "@/models/Settings";
import HeroSlide from "@/models/HeroSlide";
import { getUrlFromPublicId } from "@/lib/cloudinary";

export async function getProducts() {
  await connectDB();
  const products = await Product.find({ isActive: { $ne: false } }).sort({
    createdAt: -1,
  });
  return JSON.parse(JSON.stringify(products));
}

export async function getCategories() {
  await connectDB();
  const categories = await Category.find({ isActive: { $ne: false } }).sort({
    order: 1,
  });
  return JSON.parse(JSON.stringify(categories));
}

export async function getSettings() {
  await connectDB();
  const settings = await Settings.findOne();
  return JSON.parse(JSON.stringify(settings || {}));
}

export async function getHeroSlides() {
  await connectDB();
  const slides = await HeroSlide.find({ isActive: { $ne: false } }).sort({
    order: 1,
  });
  
  // Convert public_ids to full URLs
  const slidesWithUrls = slides.map((slide: any) => {
    const slideObj = slide.toObject ? slide.toObject() : slide;
    return {
      ...slideObj,
      image: slideObj.image && !slideObj.image.startsWith("http")
        ? getUrlFromPublicId(slideObj.image)
        : slideObj.image,
    };
  });
  
  return JSON.parse(JSON.stringify(slidesWithUrls));
}

export async function getProductBySlug(slug: string) {
  await connectDB();
  const product = await Product.findOne({ slug, isActive: { $ne: false } });
  return product ? JSON.parse(JSON.stringify(product)) : null;
}
