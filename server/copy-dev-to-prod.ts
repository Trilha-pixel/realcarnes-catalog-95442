// Script para copiar dados do banco de desenvolvimento para produção
import { db } from './db';
import { categories, products, adminUsers, banners, quoteRequests, quoteItems } from '../shared/schema';
import { neon } from '@neondatabase/serverless';

async function copyDevToProduction() {
  console.log('🚀 Iniciando cópia de dados DEV → PROD...\n');

  // Verifica se a DATABASE_URL está configurada
  const prodDatabaseUrl = process.env.DATABASE_URL;
  if (!prodDatabaseUrl) {
    console.error('❌ DATABASE_URL não encontrada nas variáveis de ambiente');
    console.error('   Configure a URL do banco de produção');
    process.exit(1);
  }

  console.log('✅ Conectando ao banco de produção...');
  const prodSql = neon(prodDatabaseUrl);

  try {
    // ==========================================
    // 1. COPIAR CATEGORIAS
    // ==========================================
    console.log('\n📦 Copiando categorias...');
    const devCategories = await db.select().from(categories);
    console.log(`   Encontradas ${devCategories.length} categorias no DEV`);

    for (const category of devCategories) {
      const { id, ...categoryData } = category;
      await prodSql`
        INSERT INTO categories (name, slug, icon, image)
        VALUES (${categoryData.name}, ${categoryData.slug}, ${categoryData.icon}, ${categoryData.image})
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          icon = EXCLUDED.icon,
          image = EXCLUDED.image
      `;
    }
    console.log(`   ✓ ${devCategories.length} categorias copiadas`);

    // Busca categorias de prod para mapear IDs
    const prodCategories = await prodSql`SELECT * FROM categories`;
    const categoryIdMap = new Map();
    devCategories.forEach(devCat => {
      const prodCat = prodCategories.find((p: any) => p.slug === devCat.slug);
      if (prodCat) {
        categoryIdMap.set(devCat.id, prodCat.id);
      }
    });

    // ==========================================
    // 2. COPIAR PRODUTOS
    // ==========================================
    console.log('\n📦 Copiando produtos...');
    const devProducts = await db.select().from(products);
    console.log(`   Encontrados ${devProducts.length} produtos no DEV`);

    let productsCount = 0;
    for (const product of devProducts) {
      const { id, categoryId, createdAt, updatedAt, ...productData } = product;
      const mappedCategoryId = categoryIdMap.get(categoryId) || categoryId;

      // Converte array de imagens para formato PostgreSQL text[]
      const imagesArray = `{${productData.images.map((img: string) => `"${img.replace(/"/g, '\\"')}"`).join(',')}}`;
      
      await prodSql`
        INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
        VALUES (
          ${productData.sku},
          ${productData.name},
          ${productData.description},
          ${productData.packaging},
          ${mappedCategoryId},
          ${productData.featured},
          ${productData.status},
          ${imagesArray}::text[]
        )
        ON CONFLICT (sku) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          packaging = EXCLUDED.packaging,
          category_id = EXCLUDED.category_id,
          featured = EXCLUDED.featured,
          status = EXCLUDED.status,
          images = EXCLUDED.images
      `;

      productsCount++;
      if (productsCount % 50 === 0) {
        console.log(`   ✓ ${productsCount} produtos copiados...`);
      }
    }
    console.log(`   ✓ ${productsCount} produtos copiados`);

    // ==========================================
    // 3. COPIAR USUÁRIOS ADMIN
    // ==========================================
    console.log('\n👤 Copiando usuários admin...');
    const devAdminUsers = await db.select().from(adminUsers);
    console.log(`   Encontrados ${devAdminUsers.length} usuários no DEV`);

    for (const user of devAdminUsers) {
      const { id, createdAt, ...userData } = user;

      await prodSql`
        INSERT INTO admin_users (name, email, password, role, phone, company)
        VALUES (
          ${userData.name},
          ${userData.email},
          ${userData.password},
          ${userData.role},
          ${userData.phone},
          ${userData.company}
        )
        ON CONFLICT (email) DO UPDATE SET
          name = EXCLUDED.name,
          password = EXCLUDED.password,
          role = EXCLUDED.role,
          phone = EXCLUDED.phone,
          company = EXCLUDED.company
      `;
    }
    console.log(`   ✓ ${devAdminUsers.length} usuários copiados`);

    // ==========================================
    // 4. COPIAR BANNERS
    // ==========================================
    console.log('\n🎨 Copiando banners...');
    const devBanners = await db.select().from(banners);
    console.log(`   Encontrados ${devBanners.length} banners no DEV`);

    for (const banner of devBanners) {
      const { id, createdAt, ...bannerData } = banner;

      await prodSql`
        INSERT INTO banners (desktop_image, mobile_image, link_url, "order", active)
        VALUES (
          ${bannerData.desktopImage},
          ${bannerData.mobileImage},
          ${bannerData.linkUrl},
          ${bannerData.order},
          ${bannerData.active}
        )
        ON CONFLICT DO NOTHING
      `;
    }
    console.log(`   ✓ ${devBanners.length} banners copiados`);

    console.log('\n✨ Cópia concluída com sucesso!');
    console.log('📊 Resumo:');
    console.log(`   - Categorias: ${devCategories.length}`);
    console.log(`   - Produtos: ${devProducts.length}`);
    console.log(`   - Usuários: ${devAdminUsers.length}`);
    console.log(`   - Banners: ${devBanners.length}`);
    console.log('\n🎉 Banco de produção atualizado!');

  } catch (error) {
    console.error('❌ Erro ao copiar dados:', error);
    process.exit(1);
  }
}

copyDevToProduction()
  .then(() => {
    console.log('\n✅ Script finalizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erro fatal:', error);
    process.exit(1);
  });
