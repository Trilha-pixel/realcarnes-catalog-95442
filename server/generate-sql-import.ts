// Script para gerar SQL puro de importação que pode ser executado diretamente no banco de produção
import { readFileSync, writeFileSync } from 'fs';

function escapeSqlString(str: string | null | undefined): string {
  if (str === null || str === undefined) {
    return 'NULL';
  }
  return `'${str.replace(/'/g, "''")}'`;
}

function generateSqlImport() {
  console.log('📝 Gerando script SQL de importação...\n');

  try {
    // Lê o arquivo JSON exportado
    const data = JSON.parse(readFileSync('database-export.json', 'utf-8'));
    
    let sql = `-- ==========================================
-- SCRIPT DE IMPORTAÇÃO AUTOMÁTICO
-- Royal Alimentos - Database Import
-- ==========================================
-- ATENÇÃO: Execute este script no banco de PRODUÇÃO
-- ==========================================

BEGIN;

`;

    // ==========================================
    // CATEGORIAS
    // ==========================================
    sql += `\n-- ==========================================\n`;
    sql += `-- IMPORTAR CATEGORIAS (${data.categories.length} registros)\n`;
    sql += `-- ==========================================\n\n`;

    for (const cat of data.categories) {
      sql += `INSERT INTO categories (name, slug, icon, image)
VALUES (${escapeSqlString(cat.name)}, ${escapeSqlString(cat.slug)}, ${escapeSqlString(cat.icon)}, ${escapeSqlString(cat.image)})
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  image = EXCLUDED.image;\n\n`;
    }

    // ==========================================
    // PRODUTOS
    // ==========================================
    sql += `\n-- ==========================================\n`;
    sql += `-- IMPORTAR PRODUTOS (${data.products.length} registros)\n`;
    sql += `-- ==========================================\n\n`;

    let count = 0;
    for (const prod of data.products) {
      // Busca o ID da categoria pelo slug
      const category = data.categories.find((c: any) => c.id === prod.categoryId);
      const categorySlug = category ? category.slug : 'bovinos';

      // Formata o array de imagens para PostgreSQL
      const imagesArray = `ARRAY[${prod.images.map((img: string) => escapeSqlString(img)).join(', ')}]`;

      sql += `INSERT INTO products (sku, name, description, packaging, category_id, featured, status, images)
VALUES (
  ${escapeSqlString(prod.sku)},
  ${escapeSqlString(prod.name)},
  ${escapeSqlString(prod.description)},
  ${escapeSqlString(prod.packaging)},
  (SELECT id FROM categories WHERE slug = ${escapeSqlString(categorySlug)}),
  ${prod.featured},
  ${escapeSqlString(prod.status)},
  ${imagesArray}::text[]
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  packaging = EXCLUDED.packaging,
  category_id = EXCLUDED.category_id,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images;\n\n`;

      count++;
      if (count % 50 === 0) {
        console.log(`   ✓ ${count} produtos processados...`);
      }
    }

    // ==========================================
    // USUÁRIOS
    // ==========================================
    sql += `\n-- ==========================================\n`;
    sql += `-- IMPORTAR USUÁRIOS (${data.adminUsers.length} registros)\n`;
    sql += `-- ==========================================\n\n`;

    for (const user of data.adminUsers) {
      sql += `INSERT INTO admin_users (name, email, password, role, phone, company)
VALUES (
  ${escapeSqlString(user.name)},
  ${escapeSqlString(user.email)},
  ${escapeSqlString(user.password)},
  ${escapeSqlString(user.role)},
  ${escapeSqlString(user.phone)},
  ${escapeSqlString(user.company)}
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  phone = EXCLUDED.phone,
  company = EXCLUDED.company;\n\n`;
    }

    // ==========================================
    // BANNERS
    // ==========================================
    sql += `\n-- ==========================================\n`;
    sql += `-- IMPORTAR BANNERS (${data.banners.length} registros)\n`;
    sql += `-- ==========================================\n\n`;

    // Limpa banners existentes primeiro
    sql += `DELETE FROM banners;\n\n`;

    for (const banner of data.banners) {
      sql += `INSERT INTO banners (desktop_image, mobile_image, link_url, "order", active)
VALUES (
  ${escapeSqlString(banner.desktopImage)},
  ${escapeSqlString(banner.mobileImage)},
  ${escapeSqlString(banner.linkUrl)},
  ${banner.order},
  ${banner.active}
);\n\n`;
    }

    // ==========================================
    // QUOTE REQUESTS E ITEMS
    // ==========================================
    sql += `\n-- ==========================================\n`;
    sql += `-- IMPORTAR QUOTE REQUESTS (${data.quoteRequests.length} registros)\n`;
    sql += `-- ==========================================\n\n`;

    sql += `-- Limpa quotes existentes\n`;
    sql += `DELETE FROM quote_items;\n`;
    sql += `DELETE FROM quote_requests;\n\n`;

    for (const quote of data.quoteRequests) {
      sql += `-- Quote Request ID Original: ${quote.id}\n`;
      sql += `INSERT INTO quote_requests (customer_name, customer_company, customer_cnpj, customer_email, customer_phone, status, created_at)
VALUES (
  ${escapeSqlString(quote.customerName)},
  ${escapeSqlString(quote.customerCompany)},
  ${escapeSqlString(quote.customerCnpj)},
  ${escapeSqlString(quote.customerEmail)},
  ${escapeSqlString(quote.customerPhone)},
  ${escapeSqlString(quote.status)},
  ${escapeSqlString(quote.createdAt)}
);\n\n`;

      // Busca os itens desta quote
      const quoteItems = data.quoteItems.filter((item: any) => item.quoteRequestId === quote.id);
      
      if (quoteItems.length > 0) {
        sql += `-- Itens da quote\n`;
        for (const item of quoteItems) {
          sql += `INSERT INTO quote_items (quote_request_id, product_id, product_name, product_sku, quantity)
VALUES (
  (SELECT id FROM quote_requests WHERE customer_email = ${escapeSqlString(quote.customerEmail)} AND created_at = ${escapeSqlString(quote.createdAt)} LIMIT 1),
  (SELECT id FROM products WHERE sku = ${escapeSqlString(item.productSku)}),
  ${escapeSqlString(item.productName)},
  ${escapeSqlString(item.productSku)},
  ${item.quantity}
);\n\n`;
        }
      }
    }

    sql += `\nCOMMIT;

-- ==========================================
-- IMPORTAÇÃO CONCLUÍDA!
-- ==========================================
-- Categorias: ${data.categories.length}
-- Produtos: ${data.products.length}
-- Usuários: ${data.adminUsers.length}
-- Banners: ${data.banners.length}
-- Quote Requests: ${data.quoteRequests.length}
-- Quote Items: ${data.quoteItems.length}
-- ==========================================
`;

    // Salva o arquivo SQL
    const filename = 'import-production.sql';
    writeFileSync(filename, sql);

    console.log('✨ Script SQL gerado com sucesso!');
    console.log(`📁 Arquivo: ${filename}`);
    console.log(`   Tamanho: ${(Buffer.byteLength(sql) / 1024).toFixed(2)} KB`);
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('   1. Abra o Replit Database Console (Production)');
    console.log('   2. Copie o conteúdo do arquivo import-production.sql');
    console.log('   3. Cole no console SQL');
    console.log('   4. Execute o script');
    console.log('\n✅ Todos os dados serão importados para produção!');

  } catch (error) {
    console.error('❌ Erro ao gerar SQL:', error);
    process.exit(1);
  }
}

generateSqlImport();
