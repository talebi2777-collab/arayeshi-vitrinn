import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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

  for (const [name, slug] of categories) {
    await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
  }

  const category = await prisma.category.findUniqueOrThrow({
    where: { slug: "arayeshi" },
  });

  const brand = await prisma.brand.upsert({
    where: { slug: "scarlet" },
    update: { name: "اسکارلت" },
    create: { name: "اسکارلت", slug: "scarlet" },
  });

  await prisma.product.upsert({
    where: { slug: "رژ-لب-مدادی-اسکارلت" },
    update: {},
    create: {
      name: "رژ لب مدادی اسکارلت",
      slug: "رژ-لب-مدادی-اسکارلت",
      sku: "SCARLET-LIP-001",
      brandId: brand.id,
      categoryId: category.id,
      purchaseCost: 250000,
      price: 390000,
      oldPrice: 450000,
      stock: 12,
      minStock: 2,
      isNew: true,
      seoTitle: "خرید رژ لب مدادی اسکارلت | قیمت و مشخصات",
      metaDescription:
        "خرید رژ لب مدادی اسکارلت با قیمت مناسب از آرایشی ویترین.",
      keywords: "رژ لب مدادی اسکارلت, خرید رژ لب اسکارلت",
      images: {
        create: [{ url: "/products/scarlet-lip.jpg", alt: "رژ لب مدادی اسکارلت" }],
      },
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
