import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { useMockData } from '@/contexts/MockDataContext';
import heroPicanhaImage from '@/assets/hero-picanha.jpg';
import qualityPremiumImg from '@/assets/benefits/quality-premium.jpg';
import foodSafetyImg from '@/assets/benefits/food-safety.jpg';
import fastDeliveryImg from '@/assets/benefits/fast-delivery.jpg';

const Home = () => {
  const { getProducts, categories, getBanners } = useMockData();
  const allProducts = getProducts();
  console.log('🏠 Home - Total produtos disponíveis:', allProducts.length);
  const featuredProducts = getProducts(undefined, true).slice(0, 6);
  const banners = getBanners();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Banner Carousel */}
        {banners.length > 0 && (
          <section className="relative">
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {banners.map((banner) => (
                  <CarouselItem key={banner.id}>
                    <Link to={banner.link_url}>
                      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
                        {/* Desktop Image */}
                        <img
                          src={banner.imagem_desktop}
                          alt={`Banner ${banner.id}`}
                          className="hidden md:block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Mobile Image */}
                        <img
                          src={banner.imagem_mobile}
                          alt={`Banner ${banner.id}`}
                          className="md:hidden w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 h-12 w-12 bg-white/90 hover:bg-white border-none shadow-lg" />
              <CarouselNext className="right-4 h-12 w-12 bg-white/90 hover:bg-white border-none shadow-lg" />
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
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(category => (
                <Link key={category.id} to={`/categoria/${category.slug}`}>
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
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
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
                Seleção especial dos nossos produtos mais procurados
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/produtos">
                  Ver Todos os Produtos
                  <ArrowRight className="ml-2 h-5 w-5" />
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
                Por que escolher a <span className="text-accent">Royal Alimentos</span>?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary transition-colors overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={qualityPremiumImg} 
                      alt="Qualidade Premium"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Qualidade Premium</h3>
                  <p className="text-muted-foreground">
                    Produtos selecionados e certificados, garantindo a melhor qualidade para seu negócio.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={foodSafetyImg} 
                      alt="Segurança Alimentar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Segurança Alimentar</h3>
                  <p className="text-muted-foreground">
                    Rigorosos padrões de qualidade e processos certificados em toda cadeia produtiva.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={fastDeliveryImg} 
                      alt="Entrega Ágil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Entrega Ágil</h3>
                  <p className="text-muted-foreground">
                    Logística eficiente e entregas programadas para atender às necessidades do seu negócio.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-28 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroPicanhaImage})`,
            }}
          />
          {/* Overlay escuro para melhorar legibilidade */}
          <div className="absolute inset-0 bg-black/70 z-10" />
          
          <div className="container relative z-20 px-4 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-poppins text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' }}>
                Pronto para elevar a qualidade do seu negócio?
              </h2>
              <p className="font-poppins text-lg md:text-xl text-white max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                Solicite um orçamento personalizado e descubra como podemos ajudar seu negócio.
              </p>
              <div className="pt-4">
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-red-600 hover:bg-red-700 text-white font-poppins font-bold text-lg h-16 px-12 rounded-lg shadow-2xl transition-all duration-300 hover:shadow-[0_8px_25px_rgba(220,38,38,0.4)] hover:scale-105 border-0"
                >
                  <Link to="/orcamento">
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
