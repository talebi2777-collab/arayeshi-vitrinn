import { prisma } from "@/lib/prisma";

export default async function Admin() {
  const [products, orders, users, lowStock] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.product.count({ where: { stock: { lte: 2 }, active: true } }),
  ]);

  const inventory = await prisma.product.findMany({
    select: { stock: true, purchaseCost: true, price: true },
  });

  const purchaseValue = inventory.reduce(
    (sum, p) => sum + p.stock * p.purchaseCost,
    0
  );
  const saleValue = inventory.reduce(
    (sum, p) => sum + p.stock * p.price,
    0
  );

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-black">داشبورد مدیریت</h1>

      <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["محصولات", products],
          ["سفارش‌ها", orders],
          ["مشتریان", users],
          ["موجودی کم", lowStock],
        ].map(([label, value]) => (
          <div className="card p-5" key={label}>
            <div className="text-gray-500">{label}</div>
            <div className="mt-2 text-3xl font-black">
              {Number(value).toLocaleString("fa-IR")}
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-6 p-6">
        <h2 className="text-xl font-black">ارزش موجودی</h2>
        <p className="mt-3">
          ارزش خرید: {purchaseValue.toLocaleString("fa-IR")} تومان
        </p>
        <p>ارزش فروش: {saleValue.toLocaleString("fa-IR")} تومان</p>
        <p>
          سود بالقوه: {(saleValue - purchaseValue).toLocaleString("fa-IR")} تومان
        </p>
      </div>
    </div>
  );
}
