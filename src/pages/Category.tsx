import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  
  const [searchQuery, setSearchQuery] = useState('');

  const category = categories.find(c => c.slug === slug);
  const categoryProducts = products.filter(p => p.categoryId === category?.id);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return categoryProducts;
    
    return categoryProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, categoryProducts]);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl text-muted-foreground">Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Categoria não encontrada</h1>
            <Button asChild>
              <Link to="/produtos">Ver todos os produtos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Category Header */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage: `url(${category.image})`,
            }}
          />
          
          <div className="container px-4 relative z-10">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/produtos">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para produtos
              </Link>
            </Button>

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-6xl">{category.icon}</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  {category.name}
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                Explore nossa seleção premium de {category.name.toLowerCase()}
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="border-b bg-background sticky top-16 z-40">
          <div className="container px-4 py-4">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`Buscar em ${category.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container px-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  Nenhum produto encontrado nesta categoria
                </p>
                <Button 
                  onClick={() => setSearchQuery('')}
                  variant="outline"
                >
                  Limpar Busca
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
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

export default Category;
