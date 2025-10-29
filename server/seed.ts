// Royal Alimentos - Database Seed Script
import { storage } from "./storage";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // ==========================================
    // SEED CATEGORIES
    // ==========================================
    console.log("📦 Seeding categories...");
    const categoriesData = [
      { name: "Bovinos", slug: "bovinos", icon: "🥩", image: "/assets/categories/bovinos.jpg" },
      { name: "Suínos", slug: "suinos", icon: "🥓", image: "/assets/categories/suinos.jpg" },
      { name: "Aves", slug: "aves", icon: "🍗", image: "/assets/categories/aves.jpg" },
      { name: "Congelados", slug: "congelados", icon: "❄️", image: "/assets/categories/congelados.jpg" },
      { name: "Resfriados", slug: "resfriados", icon: "🧊", image: "/assets/categories/resfriados.jpg" },
      { name: "Especiais", slug: "especiais", icon: "⭐", image: "/assets/categories/especiais.jpg" },
    ];

    const categories = [];
    for (const cat of categoriesData) {
      const category = await storage.createCategory(cat);
      categories.push(category);
      console.log(`  ✓ Created category: ${category.name}`);
    }

    // ==========================================
    // SEED PRODUCTS
    // ==========================================
    console.log("\n📦 Seeding products...");
    const productsData = [
      {
        sku: "BOV-001",
        name: "Picanha Premium",
        description: "Corte nobre bovino com capa de gordura uniforme. Ideal para churrascos e assados especiais.",
        packaging: "Caixa: 18 kg | 12 a 15 peças por caixa",
        categoryId: categories[0].id, // Bovinos
        featured: true,
        status: "active",
        images: ["https://placehold.co/800x600/1E3A5F/white?text=Picanha+Premium"],
      },
      {
        sku: "BOV-002",
        name: "Contrafilé Angus",
        description: "Contrafilé macio e suculento de gado Angus. Perfeito para bifes e medalhões.",
        packaging: "Caixa: 20 kg | Peças de 2-3 kg",
        categoryId: categories[0].id,
        featured: true,
        status: "active",
        images: ["https://placehold.co/800x600/1E3A5F/white?text=Contrafile"],
      },
      {
        sku: "AVE-001",
        name: "Peito de Frango IQF",
        description: "Peito de frango congelado individualmente (IQF). Facilita o porcionamento em cozinhas industriais.",
        packaging: "Caixa: 20 kg | 4 pacotes de 5 kg",
        categoryId: categories[2].id, // Aves
        featured: true,
        status: "active",
        images: ["https://placehold.co/800x600/1E3A5F/white?text=Peito+Frango"],
      },
      {
        sku: "AVE-002",
        name: "Coxa e Sobrecoxa",
        description: "Coxa e sobrecoxa de frango de primeira qualidade. Ideal para assados e frituras.",
        packaging: "Caixa: 15 kg | Aproximadamente 60 peças",
        categoryId: categories[2].id,
        featured: false,
        status: "active",
        images: ["https://placehold.co/800x600/1E3A5F/white?text=Coxa+Frango"],
      },
      {
        sku: "SUI-001",
        name: "Costela Suína em Ripa",
        description: "Costelinha suína em ripa, ideal para assados e barbecue. Carne macia e saborosa.",
        packaging: "Caixa: 15 kg | 8 a 10 peças por caixa",
        categoryId: categories[1].id, // Suínos
        featured: false,
        status: "active",
        images: ["https://placehold.co/800x600/1E3A5F/white?text=Costela+Suina"],
      },
      {
        sku: "SUI-002",
        name: "Lombo Suíno Premium",
        description: "Lombo suíno premium sem osso. Perfeito para assados e medalhões.",
        packaging: "Caixa: 12 kg | Peças de 2-2,5 kg",
        categoryId: categories[1].id,
        featured: true,
        status: "active",
        images: ["https://placehold.co/800x600/1E3A5F/white?text=Lombo+Suino"],
      },
    ];

    for (const prod of productsData) {
      const product = await storage.createProduct(prod);
      console.log(`  ✓ Created product: ${product.name} (${product.sku})`);
    }

    // ==========================================
    // SEED ADMIN USERS
    // ==========================================
    console.log("\n👤 Seeding admin users...");
    const adminUsersData = [
      {
        name: "Admin Master",
        email: "admin@royalalimentos.com.br",
        password: "admin123", // In production, this should be hashed
        role: "admin",
      },
      {
        name: "Felipe Vendedor",
        email: "vendedor@royalalimentos.com.br",
        password: "vendas123",
        role: "vendedor",
      },
    ];

    for (const user of adminUsersData) {
      const adminUser = await storage.createAdminUser(user);
      console.log(`  ✓ Created admin user: ${adminUser.name} (${adminUser.email})`);
    }

    // ==========================================
    // SEED BANNERS
    // ==========================================
    console.log("\n🎨 Seeding banners...");
    const bannersData = [
      {
        desktopImage: "/assets/banner-oferta-carne.png",
        mobileImage: "/assets/banner-oferta-carne.png",
        linkUrl: "/produtos",
        order: 1,
        active: true,
      },
      {
        desktopImage: "/assets/banner-oferta-semana.png",
        mobileImage: "/assets/banner-oferta-semana.png",
        linkUrl: "/produtos",
        order: 2,
        active: true,
      },
    ];

    for (const banner of bannersData) {
      const newBanner = await storage.createBanner(banner);
      console.log(`  ✓ Created banner with order: ${newBanner.order}`);
    }

    // ==========================================
    // SEED SAMPLE QUOTE REQUEST
    // ==========================================
    console.log("\n📋 Seeding sample quote request...");
    const quoteRequest = await storage.createQuoteRequest({
      customerName: "João Silva",
      customerCompany: "Restaurante Sabor & Arte",
      customerCnpj: "12.345.678/0001-90",
      customerEmail: "joao@saborarte.com.br",
      customerPhone: "(11) 98765-4321",
      status: "novo",
    });
    console.log(`  ✓ Created quote request #${quoteRequest.id}`);

    // Add items to quote
    const products = await storage.getProducts();
    if (products.length >= 2) {
      await storage.createQuoteItem({
        quoteRequestId: quoteRequest.id,
        productId: products[0].id,
        productName: products[0].name,
        productSku: products[0].sku,
        quantity: 5,
      });
      await storage.createQuoteItem({
        quoteRequestId: quoteRequest.id,
        productId: products[1].id,
        productName: products[1].name,
        productSku: products[1].sku,
        quantity: 3,
      });
      console.log(`  ✓ Added items to quote request`);
    }

    console.log("\n✅ Database seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
