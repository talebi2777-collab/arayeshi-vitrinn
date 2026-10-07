# آرایشی ویترین — نسخه آماده انتشار روی Vercel

این نسخه، همان نسخه پایه پروژه است که برای Deploy روی Vercel آماده شده است.

> توجه: این نسخه هنوز نسخه نهایی فروشگاه کامل نیست؛ امکانات پیشرفته‌ای که در نقشه راه پروژه ثبت شده‌اند باید در نسخه‌های بعدی پیاده‌سازی شوند.

## انتشار روی Vercel

### روش پیشنهادی
1. این پروژه را در GitHub قرار دهید.
2. وارد Vercel شوید و `Add New Project` را بزنید.
3. Repository پروژه را انتخاب کنید.
4. Framework را روی Next.js بگذارید.
5. در Environment Variables این موارد را وارد کنید:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
6. Deploy را بزنید.

### دیتابیس
این پروژه از PostgreSQL و Prisma استفاده می‌کند. برای اجرای آنلاین باید یک PostgreSQL ابری داشته باشید؛ بعد از ساخت دیتابیس، مقدار `DATABASE_URL` را در Vercel قرار دهید.

برای اعمال schema:
```bash
npx prisma db push
```

برای داده‌های آزمایشی:
```bash
npm run db:seed
```

## اجرای محلی
```bash
npm install
cp .env.example .env
npm run dev
```

سپس:
`http://localhost:3000`

## نکته امنیتی
هیچ رمز دیتابیس، کلید پرداخت، AUTH_SECRET واقعی یا اطلاعات حساس را داخل GitHub یا فایل ZIP قرار ندهید. این مقادیر باید فقط در Environment Variables سرویس میزبانی تنظیم شوند.
