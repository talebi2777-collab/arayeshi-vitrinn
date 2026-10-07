import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const p = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      brand: true,
      category: true,
      variants: true,
      reviews: { where: { approved: true }, take: 10 },
    },
  });

  if (!p) notFound();

  const discount =
    p.oldPrice && p.oldPrice > p.price
      ? Math.round((1 - p.price / p.oldPrice) * 100)
      : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.sku,
    description: p.description || p.metaDescription || "",
    brand: p.brand ? { "@type": "Brand", name: p.brand.name } : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: p.price,
      availability:
        p.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="container py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-5 text-sm text-gray-500">
        <Link href="/">خانه</Link> /{" "}
        <Link href={`/category/${p.category.slug}`}>{p.category.name}</Link> /{" "}
        {p.name}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="card flex aspect-square items-center justify-center bg-[#fff8fa] text-gray-400">
          {p.images[0]?.alt || "تصویر محصول"}
        </div>

        <div>
          <div className="text-sm text-[#b85f7d]">{p.brand?.name}</div>
          <h1 className="mt-2 text-3xl font-black">{p.name}</h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {p.oldPrice && (
              <del className="text-gray-400">
                {p.oldPrice.toLocaleString("fa-IR")}
              </del>
            )}
            <strong className="text-2xl text-[#b85f7d]">
              {p.price.toLocaleString("fa-IR")} تومان
            </strong>
            {discount > 0 && (
              <span className="rounded-full bg-[#b85f7d] px-3 py-1 text-white">
                {discount}٪
              </span>
            )}
          </div>

          <div className="mt-5">
            موجودی:{" "}
            {p.stock > 0 ? (
              <span className="text-green-600">موجود</span>
            ) : (
              <span className="text-red-500">ناموجود</span>
            )}
          </div>

          {p.variants.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-3 font-bold">انتخاب مدل</h2>
              <div className="flex flex-wrap gap-2">
                {p.variants.map((v) => (
                  <button key={v.id} className="btn btn-light">
                    {v.name}: {v.value}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            className="btn btn-primary mt-8 w-full text-lg"
            disabled={p.stock < 1}
          >
            افزودن به سبد خرید
          </button>

          <div className="mt-8 border-t pt-6 leading-8">
            <h2 className="mb-2 text-xl font-black">توضیحات محصول</h2>
            {p.description || "توضیحات محصول به‌زودی تکمیل می‌شود."}
          </div>
        </div>
      </div>
    </div>
  );
}
