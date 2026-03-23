import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Settings from "@/models/Settings";
import HeroSlide from "@/models/HeroSlide";
import { getUrlFromPublicId } from "@/lib/cloudinary";
import { unstable_cache } from "next/cache";

export const getProducts = unstable_cache(async () => {
  await connectDB();
  const products = await Product.find({ isActive: { $ne: false } })
    .sort({ createdAt: -1 })
    .select("-description -seo")
    .lean()
    .exec();
  return JSON.parse(JSON.stringify(products));
}, ["products"], { revalidate: 60, tags: ["products"] });

export const getCategories = unstable_cache(async () => {
  await connectDB();
  const categories = await Category.find({ isActive: { $ne: false } })
    .sort({ order: 1 })
    .lean()
    .exec();
  return JSON.parse(JSON.stringify(categories));
}, ["categories"], { revalidate: 60, tags: ["categories"] });

export const getSettings = unstable_cache(async () => {
  await connectDB();
  const settings = await Settings.findOne().lean().exec();
  return JSON.parse(JSON.stringify(settings || {}));
}, ["settings"], { revalidate: 60, tags: ["settings"] });

export const getHeroSlides = unstable_cache(async () => {
  await connectDB();
  const slides = await HeroSlide.find({ isActive: { $ne: false } })
    .sort({ order: 1 })
    .lean()
    .exec();
  
  // Convert public_ids to full URLs
  const slidesWithUrls = slides.map((slide: any) => {
    return {
      ...slide,
      image: slide.image && !slide.image.startsWith("http")
        ? getUrlFromPublicId(slide.image)
        : slide.image,
    };
  });
  
  return JSON.parse(JSON.stringify(slidesWithUrls));
}, ["heroSlides"], { revalidate: 60, tags: ["heroSlides"] });

export async function getProductBySlug(slug: string) {
  await connectDB();
  const product = await Product.findOne({ slug, isActive: { $ne: false } });
  return product ? JSON.parse(JSON.stringify(product)) : null;
}
