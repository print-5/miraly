import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const isAdmin = searchParams.get("admin") === "true";
    const exclude = searchParams.get("exclude");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const skip = searchParams.get("skip");

    const query: any = category ? { category } : {};

    if (!isAdmin) {
      query.isActive = true;
    }

    if (exclude) {
      query._id = { $ne: exclude };
    }

    // Inventory Filtering
    if (!isAdmin) {
      const Settings = (await import("@/models/Settings")).default;
      const settings = await Settings.findOne().lean();

      if (settings?.manageInventory ?? true) {
        query.$or = [{ stock: { $gt: 0 } }, { "variants.stock": { $gt: 0 } }];
      }
    }

    let productsQuery = Product.find(query)
      .select("-description -seo") // Exclude heavy fields
      .lean();

    // Pagination
    if (skip) {
      productsQuery = productsQuery.skip(parseInt(skip));
    } else if (page) {
      const pageNum = parseInt(page);
      const pageSize = limit ? parseInt(limit) : 20;
      productsQuery = productsQuery.skip((pageNum - 1) * pageSize).limit(pageSize);
    } else if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }

    const products = await productsQuery.exec();
    
    // Add cache headers for better performance
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const contentType = req.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File;

      // Standalone upload for ImageUpload component
      if (file && !formData.get("data")) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;
        const { secure_url } = await uploadToCloudinary(
          base64Image,
          "miraly/products",
        );
        return NextResponse.json({ secure_url });
      }

      const dataStr = formData.get("data") as string;
      if (!dataStr) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
      }

      const body = JSON.parse(dataStr);
      const newImages = formData.getAll("newImages") as File[];
      
      // OPTIMIZED: Upload images in parallel instead of sequentially
      const uploadPromises = newImages
        .filter(file => file && file instanceof File)
        .map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;
          const { secure_url } = await uploadToCloudinary(
            base64Image,
            "miraly/products",
          );
          return secure_url;
        });

      const uploadedUrls = await Promise.all(uploadPromises);

      body.images = [...(body.images || []), ...uploadedUrls];
      const product = await Product.create(body);

      return NextResponse.json(product, { status: 201 });
    }

    return NextResponse.json(
      { error: "Unsupported media type" },
      { status: 415 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
