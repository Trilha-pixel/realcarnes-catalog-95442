import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { useCategories } from '@/hooks/useCategories';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { useBanners } from '@/hooks/useBanners';
import heroPicanhaImage from '@/assets/hero-picanha.jpg';
import qualityPremiumImg from '@/assets/benefits/quality-premium.jpg';
import foodSafetyImg from '@/assets/benefits/food-safety.jpg';
import fastDeliveryImg from '@/assets/benefits/fast-delivery.jpg';

const Home = () => {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: allProducts = [], isLoading: productsLoading } = useFeaturedProducts();
  const { data: banners = [], isLoading: bannersLoading } = useBanners(true);

  const featuredProducts = allProducts.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Banner Carousel */}
        {!bannersLoading && banners.length > 0 && (
          <section className="relative">
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {banners.map((banner) => (
                  <CarouselItem key={banner.id}>
                    <Link to={banner.linkUrl || '/produtos'} data-testid={`banner-link-${banner.id}`}>
                      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
                        {/* Desktop Image */}
                        <img
                          src={banner.desktopImage}
                          alt={`Banner ${banner.id}`}
                          className="hidden md:block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Mobile Image */}
                        <img
                          src={banner.mobileImage}
                          alt={`Banner ${banner.id}`}
                          className="md:hidden w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 h-12 w-12 bg-white/90 hover:bg-white border-none shadow-lg" data-testid="carousel-prev" />
              <CarouselNext className="right-4 h-12 w-12 bg-white/90 hover:bg-white border-none shadow-lg" data-testid="carousel-next" />
            </Carousel>
          </section>
        )}

        {/* Categories Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nossas <span className="text-primary">Categorias</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore nossa seleção premium de carnes e produtos especiais
              </p>
            </div>
            
            {categoriesLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-muted rounded-lg h-48" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map(category => (
                  <Link key={category.id} to={`/categoria/${category.slug}`} data-testid={`category-link-${category.slug}`}>
                    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group">
                      <CardContent className="p-0">
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="font-semibold text-lg" data-testid={`category-name-${category.slug}`}>{category.name}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Produtos em <span className="text-primary">Destaque</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Confira nossa seleção especial de produtos premium
              </p>
            </div>

            {productsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-muted rounded-lg h-96" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild size="lg" className="gap-2" data-testid="button-view-all-products">
                <Link to="/produtos">
                  Ver Todos os Produtos
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Hero CTA Section */}
        <section className="relative py-24 bg-primary text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroPicanhaImage})` }}
          />
          <div className="container px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Solicite seu Orçamento
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Atendimento especializado para seu negócio. Solicite já seu orçamento personalizado.
              </p>
              <Button asChild size="lg" variant="secondary" className="gap-2" data-testid="button-request-quote">
                <Link to="/produtos">
                  Solicitar Orçamento
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Por que escolher a <span className="text-primary">Royal Alimentos</span>?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover:shadow-medium transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={qualityPremiumImg} alt="Qualidade Premium" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Qualidade Premium</h3>
                  <p className="text-muted-foreground">
                    Produtos selecionados com rigoroso controle de qualidade e certificações sanitárias
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-medium transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={foodSafetyImg} alt="Segurança Alimentar" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Segurança Alimentar</h3>
                  <p className="text-muted-foreground">
                    Armazenamento e transporte com controle rigoroso de temperatura e higiene
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-medium transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={fastDeliveryImg} alt="Entrega Ágil" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Entrega Ágil</h3>
                  <p className="text-muted-foreground">
                    Logística eficiente para garantir produtos frescos no prazo combinado
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
