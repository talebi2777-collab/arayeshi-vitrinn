export default function Account() {
  return (
    <div className="container py-20">
      <div className="card mx-auto max-w-md p-8">
        <h1 className="text-2xl font-black">حساب کاربری</h1>
        <p className="mt-3 text-gray-600">
          ورود، ثبت‌نام، سفارش‌ها، علاقه‌مندی‌ها، وفاداری و معرفی دوستان.
        </p>
        <div className="mt-6 grid gap-3">
          <input className="rounded-xl border p-3" placeholder="شماره موبایل" />
          <input className="rounded-xl border p-3" placeholder="رمز عبور" />
          <button className="btn btn-primary">ورود</button>
        </div>
      </div>
    </div>
  );
}
