import Link from "next/link";
import { prisma } from "@/lib/prisma";

const categories = [
  ["آرایشی", "arayeshi"],
  ["رنگ مو", "rang-mo"],
  ["مراقبت پوست", "care-skin"],
  ["مراقبت مو", "care-hair"],
  ["عطر و ادکلن", "attar"],
  ["لوازم برقی", "barghi"],
  ["ابزار", "abzar"],
  ["بهداشتی", "behdashti"],
  ["لنز", "lenz"],
];

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: { images: true, brand: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <section className="bg-[#fff4f8]">
        <div className="container grid items-center gap-8 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="font-bold text-[#b85f7d]">
              فروشگاه آنلاین آرایشی ویترین
            </span>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              زیبایی، انتخاب مطمئن،
              <br />
              خرید آسان
            </h1>
            <p className="mt-5 leading-8 text-gray-600">
              محصولات آرایشی، مراقبت پوست و مو، عطر، رنگ مو و لوازم برقی.
            </p>
            <Link href="/category/arayeshi" className="btn btn-primary mt-6">
              مشاهده محصولات
            </Link>
          </div>
          <div className="card flex min-h-64 items-center justify-center bg-white text-3xl font-black text-[#b85f7d] md:min-h-80">
            بنر اصلی آرایشی ویترین
          </div>
        </div>
      </section>

      <section className="container py-10">
        <h2 className="mb-5 text-2xl font-black">دسته‌بندی‌ها</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map(([name, slug]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="card min-w-32 p-4 text-center transition hover:-translate-y-1"
            >
              {name}
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black">جدیدترین محصولات</h2>
          <Link href="/category/arayeshi" className="text-[#b85f7d]">
            مشاهده همه
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((p) => (
            <Link href={`/product/${p.slug}`} key={p.id} className="card overflow-hidden">
              <div className="flex aspect-square items-center justify-center bg-[#fff7fa] text-sm text-gray-400">
                {p.images[0]?.alt || "تصویر محصول"}
              </div>
              <div className="p-4">
                <div className="font-bold">{p.name}</div>
                <div className="mt-2 font-black text-[#b85f7d]">
                  {p.price.toLocaleString("fa-IR")} تومان
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="card bg-[#fff4f8] p-7 md:p-10">
          <h2 className="text-2xl font-black">🎁 تخفیف اولین خرید</h2>
          <p className="mt-2">ثبت‌نام کن و کد تخفیف اولین خریدت را دریافت کن.</p>
          <Link href="/account" className="btn btn-primary mt-4">
            ثبت‌نام
          </Link>
        </div>
      </section>

      <section className="container py-8">
        <div className="card p-7">
          <h2 className="text-xl font-black">⏳ محصولات زودمصرف</h2>
          <p className="mt-2 text-gray-600">
            محصولاتی که تاریخ مصرف نزدیک‌تری دارند، با قیمت ویژه تا پایان موجودی.
          </p>
        </div>
      </section>

      <section className="container py-8">
        <div className="card bg-[#fff8fa] p-7">
          <h2 className="text-xl font-black">دوستت را دعوت کن و جایزه بگیر</h2>
          <p className="mt-2 text-gray-600">
            بعد از ۳ خرید موفق، امکان معرفی دوستان و دریافت تخفیف فعال می‌شود.
          </p>
        </div>
      </section>
    </div>
  );
}
