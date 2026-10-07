import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  const products = q
    ? await prisma.product.findMany({
        where: {
          active: true,
          OR: [
            { name: { contains: q } },
            { sku: { contains: q } },
            { keywords: { contains: q } },
          ],
        },
        take: 50,
      })
    : [];

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-black">
        نتایج جستجو برای «{q}»
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <Link href={`/product/${p.slug}`} key={p.id} className="card p-4">
            <b>{p.name}</b>
            <div className="mt-2 text-[#b85f7d]">
              {p.price.toLocaleString("fa-IR")} تومان
            </div>
          </Link>
        ))}
      </div>

      {q && products.length === 0 && (
        <div className="card mt-10 p-6">
          محصولی پیدا نشد. عبارت دیگری امتحان کن.
        </div>
      )}
    </div>
  );
}
