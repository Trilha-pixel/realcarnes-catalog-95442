import { useEffect } from 'react';
import { useMockData } from '@/contexts/MockDataContext';

/**
 * Componente de diagnóstico para debug
 * Adicione este componente temporariamente na página de produtos para ver informações de debug
 */
export const ProductDiagnostics = () => {
  const { getProducts, categories } = useMockData();
  
  useEffect(() => {
    const allProducts = getProducts();
    
    console.log('\n========================================');
    console.log('🔍 DIAGNÓSTICO DE PRODUTOS');
    console.log('========================================');
    console.log('📊 Total de produtos carregados:', allProducts.length);
    console.log('\n📁 Produtos por categoria:');
    
    categories.forEach(cat => {
      const catProducts = allProducts.filter(p => p.category === cat.slug);
      console.log(`  ${cat.icon} ${cat.name}:`, catProducts.length, 'produtos');
    });
    
    console.log('\n🏷️ Primeiros 5 produtos:');
    allProducts.slice(0, 5).forEach(p => {
      console.log(`  - ${p.name} (SKU: ${p.sku})`);
    });
    
    if (allProducts.length > 0) {
      console.log('\n✅ Produtos carregados com sucesso!');
    } else {
      console.log('\n❌ ERRO: Nenhum produto carregado!');
      console.log('Verifique o arquivo productGenerator.ts');
    }
    console.log('========================================\n');
  }, [getProducts, categories]);
  
  return null; // Este componente não renderiza nada
};

