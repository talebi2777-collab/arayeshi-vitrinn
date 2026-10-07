import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await prisma.category.findUnique({ where: { slug } });

  if (!c) {
    return <div className="container py-20">دسته‌بندی پیدا نشد.</div>;
  }

  const products = await prisma.product.findMany({
    where: { categoryId: c.id, active: true },
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-black">{c.name}</h1>
      <p className="mt-3 text-gray-600">
        {c.description || `خرید ${c.name} با تنوع مناسب از آرایشی ویترین.`}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="card overflow-hidden"
          >
            <div className="flex aspect-square items-center justify-center bg-[#fff7fa] text-gray-400">
              {p.images[0]?.alt || "تصویر محصول"}
            </div>
            <div className="p-4 font-bold">
              {p.name}
              <div className="mt-2 text-[#b85f7d]">
                {p.price.toLocaleString("fa-IR")} تومان
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
