import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "آرایشی ویترین | خرید لوازم آرایشی و بهداشتی",
  description:
    "خرید آنلاین محصولات آرایشی، رنگ مو، مراقبت پوست و مو، عطر و ادکلن، لوازم برقی و ابزار.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur">
          <div className="container flex items-center gap-3 py-4">
            <Link
              href="/"
              className="whitespace-nowrap text-xl font-black text-[#b85f7d] md:text-2xl"
            >
              آرایشی ویترین
            </Link>

            <form action="/search" className="hidden flex-1 md:flex">
              <input
                name="q"
                placeholder="جستجوی محصول، برند یا دسته‌بندی..."
                className="w-full rounded-xl border border-pink-100 bg-[#fff7fa] px-4 py-3 outline-none"
              />
            </form>

            <Link href="/account" className="btn btn-light">
              حساب من
            </Link>
            <Link href="/cart" className="btn btn-primary">
              سبد خرید
            </Link>
          </div>

          <div className="container flex gap-5 overflow-x-auto pb-3 text-sm text-gray-600 md:hidden">
            {[
              ["آرایشی", "arayeshi"],
              ["رنگ مو", "rang-mo"],
              ["مراقبت پوست", "care-skin"],
              ["مراقبت مو", "care-hair"],
              ["عطر و ادکلن", "attar"],
              ["لوازم برقی", "barghi"],
              ["ابزار", "abzar"],
              ["بهداشتی", "behdashti"],
              ["لنز", "lenz"],
            ].map(([name, slug]) => (
              <Link key={slug} href={`/category/${slug}`} className="whitespace-nowrap">
                {name}
              </Link>
            ))}
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-16 border-t border-pink-100 bg-[#fff5f8]">
          <div className="container grid gap-8 py-10 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold">آرایشی ویترین</h3>
              <p className="mt-3 text-sm leading-7">
                فروشگاه آنلاین محصولات آرایشی، مراقبت پوست و مو، عطر و لوازم برقی.
              </p>
            </div>
            <div>
              <h3 className="font-bold">دسترسی سریع</h3>
              <div className="mt-3 grid gap-2 text-sm">
                <Link href="/category/arayeshi">آرایشی</Link>
                <Link href="/category/rang-mo">رنگ مو</Link>
                <Link href="/category/care-skin">مراقبت پوست</Link>
                <Link href="/category/attar">عطر و ادکلن</Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold">پشتیبانی</h3>
              <p className="mt-3 text-sm">هر روز از ساعت ۱۰ تا ۲۳</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
