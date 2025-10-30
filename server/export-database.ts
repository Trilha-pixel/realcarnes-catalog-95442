// Script para EXPORTAR todos os dados do banco de desenvolvimento
import { db } from './db';
import { categories, products, adminUsers, banners, quoteRequests, quoteItems } from '../shared/schema';
import { writeFileSync } from 'fs';

async function exportDatabase() {
  console.log('📤 EXPORTANDO dados do banco de desenvolvimento...\n');

  try {
    const data: any = {};

    // ==========================================
    // EXPORTAR CATEGORIAS
    // ==========================================
    console.log('📦 Exportando categorias...');
    data.categories = await db.select().from(categories);
    console.log(`   ✓ ${data.categories.length} categorias exportadas`);

    // ==========================================
    // EXPORTAR PRODUTOS
    // ==========================================
    console.log('📦 Exportando produtos...');
    data.products = await db.select().from(products);
    console.log(`   ✓ ${data.products.length} produtos exportados`);

    // ==========================================
    // EXPORTAR USUÁRIOS
    // ==========================================
    console.log('👤 Exportando usuários...');
    data.adminUsers = await db.select().from(adminUsers);
    console.log(`   ✓ ${data.adminUsers.length} usuários exportados`);

    // ==========================================
    // EXPORTAR BANNERS
    // ==========================================
    console.log('🎨 Exportando banners...');
    data.banners = await db.select().from(banners);
    console.log(`   ✓ ${data.banners.length} banners exportados`);

    // ==========================================
    // EXPORTAR QUOTE REQUESTS
    // ==========================================
    console.log('📋 Exportando quote requests...');
    data.quoteRequests = await db.select().from(quoteRequests);
    console.log(`   ✓ ${data.quoteRequests.length} quote requests exportados`);

    // ==========================================
    // EXPORTAR QUOTE ITEMS
    // ==========================================
    console.log('📄 Exportando quote items...');
    data.quoteItems = await db.select().from(quoteItems);
    console.log(`   ✓ ${data.quoteItems.length} quote items exportados`);

    // ==========================================
    // SALVAR EM ARQUIVO JSON
    // ==========================================
    const filename = 'database-export.json';
    writeFileSync(filename, JSON.stringify(data, null, 2));

    console.log('\n✨ Exportação concluída com sucesso!');
    console.log('📊 Resumo:');
    console.log(`   - Categorias: ${data.categories.length}`);
    console.log(`   - Produtos: ${data.products.length}`);
    console.log(`   - Usuários: ${data.adminUsers.length}`);
    console.log(`   - Banners: ${data.banners.length}`);
    console.log(`   - Quote Requests: ${data.quoteRequests.length}`);
    console.log(`   - Quote Items: ${data.quoteItems.length}`);
    console.log(`\n📁 Arquivo salvo: ${filename}`);
    console.log(`   Tamanho: ${(Buffer.byteLength(JSON.stringify(data)) / 1024 / 1024).toFixed(2)} MB`);

  } catch (error) {
    console.error('❌ Erro ao exportar dados:', error);
    process.exit(1);
  }
}

exportDatabase()
  .then(() => {
    console.log('\n✅ Script de exportação finalizado!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erro fatal:', error);
    process.exit(1);
  });
