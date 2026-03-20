import { getProducts, getCategories, getSettings } from "@/lib/data";
import ShopClient from "./ShopClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Shop Premium Masala & Spices | Miraly Foods",
  description:
    "Browse our collection of authentic masala blends and premium spices. Traditional recipes, modern quality standards.",
};

export default async function ShopPage() {
  const [products, categories, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getSettings(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-red-600" size={48} />
              <p className="text-[10px] font-sans font-black text-gray-900 uppercase tracking-widest">
                Loading premium spices...
              </p>
            </div>
          </div>
        }
      >
        <ShopClient
          initialProducts={products}
          initialCategories={categories}
          initialManageInventory={settings.manageInventory ?? true}
        />
      </Suspense>
      <Footer />
    </main>
  );
}
