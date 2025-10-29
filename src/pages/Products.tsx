import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductDiagnostics } from '@/components/ProductDiagnostics';
import { useMockData } from '@/contexts/MockDataContext';

const ITEMS_PER_PAGE = 24;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts, categories, searchProducts } = useMockData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    if (categoria) {
      setSelectedCategory(categoria);
    }
  }, [searchParams]);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Scroll to top when page changes (apenas dentro da mesma categoria)
  useEffect(() => {
    if (currentPage > 1) {
      // Scroll suave apenas para navegação de paginação
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const allProducts = useMemo(() => {
    return searchQuery ? searchProducts(searchQuery) : getProducts();
  }, [searchQuery, getProducts, searchProducts]);

  // Count products by category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProducts.length };
    categories.forEach(cat => {
      counts[cat.slug] = allProducts.filter(p => p.category === cat.slug).length;
    });
    return counts;
  }, [allProducts, categories]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return allProducts;
    }
    return allProducts.filter(p => p.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

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
      <ProductDiagnostics />
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

        {/* Search Bar */}
        <section className="border-b bg-background sticky top-16 z-40">
          <div className="container px-4 py-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar produtos por nome, SKU ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Category Tabs & Products */}
        <section className="py-8">
          <div className="container px-4">
            <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
              {/* Category Tabs */}
              <div className="mb-8 border-b">
                <TabsList className="w-full justify-start h-auto p-0 bg-transparent overflow-x-auto flex-nowrap">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">🏪</span>
                      <span>Todos</span>
                      <Badge variant="secondary" className="ml-1">{productCounts.all}</Badge>
                    </span>
                  </TabsTrigger>
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category.id}
                      value={category.slug}
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 whitespace-nowrap"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-2xl">{category.icon}</span>
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="ml-1">{productCounts[category.slug] || 0}</Badge>
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Content for Each Tab */}
              <TabsContent value={selectedCategory} className="mt-0">
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
                    {/* Product Count & Pagination Info */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                      <p className="text-muted-foreground">
                        Exibindo <span className="font-semibold">{paginatedProducts.length}</span> de{' '}
                        <span className="font-semibold">{filteredProducts.length}</span>{' '}
                        {filteredProducts.length === 1 ? 'produto' : 'produtos'}
                      </p>
                      {totalPages > 1 && (
                        <p className="text-sm text-muted-foreground">
                          Página {currentPage} de {totalPages}
                        </p>
                      )}
                    </div>
                    
                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                      {paginatedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Anterior
                        </Button>
                        
                        <div className="flex gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className="w-10"
                              >
                                {pageNum}
                              </Button>
                            );
                          })}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Próxima
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
