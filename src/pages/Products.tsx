import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { useMockData } from '@/contexts/MockDataContext';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts, categories, searchProducts } = useMockData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'all');

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    if (categoria) {
      setSelectedCategory(categoria);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let products = searchQuery 
      ? searchProducts(searchQuery) 
      : getProducts();

    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory);
    }

    return products;
  }, [searchQuery, selectedCategory, getProducts, searchProducts]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: value });
    }
  };

  const activeCategory = categories.find(c => c.slug === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary via-primary to-primary/90 py-16 md:py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-poppins">
                {activeCategory ? activeCategory.name : 'Nossos Produtos'}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-poppins font-light">
                Explore nosso catálogo completo de carnes premium e produtos especiais para o seu negócio
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b bg-background sticky top-16 z-40">
          <div className="container px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container px-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  Nenhum produto encontrado
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSearchParams({});
                  }}
                  variant="outline"
                >
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
