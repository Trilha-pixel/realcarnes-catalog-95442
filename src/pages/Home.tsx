import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { useMockData } from '@/contexts/MockDataContext';
import heroImage from '@/assets/hero-meat.jpg';
import premiumMeatCtaImage from '@/assets/banners/premium-meat-cta.jpg';
import qualityPremiumImg from '@/assets/benefits/quality-premium.jpg';
import foodSafetyImg from '@/assets/benefits/food-safety.jpg';
import fastDeliveryImg from '@/assets/benefits/fast-delivery.jpg';

const Home = () => {
  const { getProducts, categories } = useMockData();
  const featuredProducts = getProducts(undefined, true).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
          />
          
          <div className="container relative z-20 px-4 text-center text-white">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
              <h1 className="font-poppins text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
                Qualidade Premium em
                <span className="block text-gold font-bold mt-2">Carnes Nobres</span>
              </h1>
              <p className="font-poppins text-lg md:text-xl text-white/85 max-w-2xl mx-auto font-light leading-relaxed">
                Fornecedor especializado para restaurantes, hotéis e distribuidores. 
                Excelência do campo à sua mesa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button 
                  size="lg" 
                  asChild 
                  variant="outline" 
                  className="border-2 border-gold text-gold bg-black/30 hover:bg-gold hover:text-gold-foreground backdrop-blur-sm font-poppins font-medium text-base h-14 px-10 transition-all duration-300"
                >
                  <Link to="/produtos">
                    Explorar Catálogo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="border-2 border-white/80 text-white bg-black/30 hover:bg-white hover:text-foreground backdrop-blur-sm font-poppins font-medium text-base h-14 px-10 transition-all duration-300"
                >
                  <Link to="/orcamento">
                    Solicitar Orçamento
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-white/70">
              <span className="font-poppins text-xs uppercase tracking-wider">Role para baixo</span>
              <ArrowRight className="h-5 w-5 rotate-90" />
            </div>
          </div>
        </section>

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
                <Link key={category.id} to={`/produtos?categoria=${category.slug}`}>
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
                Por que escolher a <span className="text-primary">Real Carnes</span>?
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${premiumMeatCtaImage})`,
            }}
          />
          
          <div className="container relative z-20 px-4 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-poppins text-4xl md:text-5xl font-semibold leading-tight">
                Pronto para elevar a qualidade do seu negócio?
              </h2>
              <p className="font-poppins text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                Solicite um orçamento personalizado e descubra como podemos ajudar seu negócio.
              </p>
              <div className="pt-4">
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-gold hover:bg-gold-hover text-gold-foreground font-poppins font-semibold text-base h-14 px-12 shadow-gold transition-all duration-300 hover:shadow-[0_6px_20px_hsl(38_75%_58%/0.35)] hover:scale-105"
                >
                  <Link to="/orcamento">
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-5 w-5" />
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
