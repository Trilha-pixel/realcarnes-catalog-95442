// Script para IMPORTAR dados para o banco (DEV ou PROD)
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';

async function importDatabase() {
  console.log('📥 IMPORTANDO dados para o banco...\n');

  // Conecta ao banco atual (DEV ou PROD dependendo de onde você executar)
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL não encontrada');
    process.exit(1);
  }

  console.log('✅ Conectando ao banco...');
  const sql = neon(databaseUrl);

  try {
    // ==========================================
    // LER ARQUIVO JSON
    // ==========================================
    console.log('📁 Lendo arquivo database-export.json...');
    const data = JSON.parse(readFileSync('database-export.json', 'utf-8'));
    console.log('   ✓ Arquivo carregado');

    // ==========================================
    // LIMPAR TABELAS (OPCIONAL - COMENTADO POR SEGURANÇA)
    // ==========================================
    // Descomente as linhas abaixo se quiser LIMPAR as tabelas antes de importar
    // console.log('\n🗑️  Limpando tabelas...');
    // await sql`TRUNCATE TABLE quote_items CASCADE`;
    // await sql`TRUNCATE TABLE quote_requests CASCADE`;
    // await sql`TRUNCATE TABLE products CASCADE`;
    // await sql`TRUNCATE TABLE banners CASCADE`;
    // await sql`TRUNCATE TABLE admin_users CASCADE`;
    // await sql`TRUNCATE TABLE categories CASCADE`;
    // console.log('   ✓ Tabelas limpas');

    // ==========================================
    // IMPORTAR CATEGORIAS
    // ==========================================
    console.log('\n📦 Importando categorias...');
    for (const category of data.categories) {
      const { id, ...cat } = category;
      await sql`
        INSERT INTO categories (name, slug, icon, image)
        VALUES (${cat.name}, ${cat.slug}, ${cat.icon}, ${cat.image})
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          icon = EXCLUDED.icon,
          image = EXCLUDED.image
      `;
    }
    console.log(`   ✓ ${data.categories.length} categorias importadas`);

    // Busca categorias para mapear IDs
    const categoriesInDb = await sql`SELECT * FROM categories`;
    const categoryIdMap = new Map();
    data.categories.forEach((devCat: any) => {
      const dbCat = categoriesInDb.find((c: any) => c.slug === devCat.slug);
      if (dbCat) {
        categoryIdMap.set(devCat.id, dbCat.id);
      }
    });

    // ==========================================
    // IMPORTAR PRODUTOS
    // ==========================================
    console.log('📦 Importando produtos...');
    let productsCount = 0;
    for (const product of data.products) {
      const { id, categoryId, createdAt, updatedAt, ...prod } = product;
      const mappedCategoryId = categoryIdMap.get(categoryId) || categoryId;

      // Converte array de imagens para formato PostgreSQL text[]
      const imagesArray = `{${prod.images.map((img: string) => `"${img.replace(/"/g, '\\"')}"`).join(',')}}`;

      await sql`
        INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
        VALUES (
          ${prod.sku},
          ${prod.name},
          ${prod.description},
          ${prod.packaging},
          ${mappedCategoryId},
          ${prod.featured},
          ${prod.status},
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
        console.log(`   ✓ ${productsCount} produtos importados...`);
      }
    }
    console.log(`   ✓ ${productsCount} produtos importados`);

    // Busca produtos para mapear IDs
    const productsInDb = await sql`SELECT * FROM products`;
    const productIdMap = new Map();
    data.products.forEach((devProd: any) => {
      const dbProd = productsInDb.find((p: any) => p.sku === devProd.sku);
      if (dbProd) {
        productIdMap.set(devProd.id, dbProd.id);
      }
    });

    // ==========================================
    // IMPORTAR USUÁRIOS
    // ==========================================
    console.log('👤 Importando usuários...');
    for (const user of data.adminUsers) {
      const { id, createdAt, ...usr } = user;

      await sql`
        INSERT INTO admin_users (name, email, password, role, phone, company)
        VALUES (
          ${usr.name},
          ${usr.email},
          ${usr.password},
          ${usr.role},
          ${usr.phone},
          ${usr.company}
        )
        ON CONFLICT (email) DO UPDATE SET
          name = EXCLUDED.name,
          password = EXCLUDED.password,
          role = EXCLUDED.role,
          phone = EXCLUDED.phone,
          company = EXCLUDED.company
      `;
    }
    console.log(`   ✓ ${data.adminUsers.length} usuários importados`);

    // ==========================================
    // IMPORTAR BANNERS
    // ==========================================
    console.log('🎨 Importando banners...');
    
    // Primeiro, limpa banners existentes para evitar conflitos de ordem
    await sql`DELETE FROM banners`;
    
    for (const banner of data.banners) {
      const { id, createdAt, ...bnr } = banner;

      await sql`
        INSERT INTO banners (desktop_image, mobile_image, link_url, "order", active)
        VALUES (
          ${bnr.desktopImage},
          ${bnr.mobileImage},
          ${bnr.linkUrl},
          ${bnr.order},
          ${bnr.active}
        )
      `;
    }
    console.log(`   ✓ ${data.banners.length} banners importados`);

    // ==========================================
    // IMPORTAR QUOTE REQUESTS
    // ==========================================
    console.log('📋 Importando quote requests...');
    for (const quote of data.quoteRequests) {
      const { id, createdAt, ...qr } = quote;

      const result = await sql`
        INSERT INTO quote_requests (customer_name, customer_company, customer_cnpj, customer_email, customer_phone, status, created_at)
        VALUES (
          ${qr.customerName},
          ${qr.customerCompany},
          ${qr.customerCnpj},
          ${qr.customerEmail},
          ${qr.customerPhone},
          ${qr.status},
          ${createdAt}
        )
        RETURNING id
      `;

      // Mapeia o ID antigo para o novo
      if (result && result[0]) {
        const newQuoteId = result[0].id;

        // Importa os itens desta quote
        const quoteItemsForThisQuote = data.quoteItems.filter((item: any) => item.quoteRequestId === id);
        
        for (const item of quoteItemsForThisQuote) {
          const { id: itemId, quoteRequestId, productId, ...qi } = item;
          const mappedProductId = productIdMap.get(productId) || productId;

          await sql`
            INSERT INTO quote_items (quote_request_id, product_id, product_name, product_sku, quantity)
            VALUES (
              ${newQuoteId},
              ${mappedProductId},
              ${qi.productName},
              ${qi.productSku},
              ${qi.quantity}
            )
          `;
        }
      }
    }
    console.log(`   ✓ ${data.quoteRequests.length} quote requests importados`);
    console.log(`   ✓ ${data.quoteItems.length} quote items importados`);

    console.log('\n✨ Importação concluída com sucesso!');
    console.log('📊 Resumo:');
    console.log(`   - Categorias: ${data.categories.length}`);
    console.log(`   - Produtos: ${data.products.length}`);
    console.log(`   - Usuários: ${data.adminUsers.length}`);
    console.log(`   - Banners: ${data.banners.length}`);
    console.log(`   - Quote Requests: ${data.quoteRequests.length}`);
    console.log(`   - Quote Items: ${data.quoteItems.length}`);

  } catch (error) {
    console.error('❌ Erro ao importar dados:', error);
    process.exit(1);
  }
}

importDatabase()
  .then(() => {
    console.log('\n✅ Script de importação finalizado!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erro fatal:', error);
    process.exit(1);
  });
