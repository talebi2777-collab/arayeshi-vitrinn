import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [products, categories] = await Promise.all([
    prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.category.findMany({ select: { slug: true } }),
  ]);

  return [
    { url: base, lastModified: new Date() },
    ...categories.map((x) => ({ url: `${base}/category/${x.slug}` })),
    ...products.map((x) => ({
      url: `${base}/product/${x.slug}`,
      lastModified: x.updatedAt,
    })),
  ];
}
