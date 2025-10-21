import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Truck, Clock, Phone } from "lucide-react";

const ServiceArea = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
              Área de Atendimento
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-center max-w-3xl mx-auto">
              Entregamos qualidade em toda a região
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Onde Atendemos
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  A Real Carnes atende toda a região metropolitana com entregas 
                  rápidas e seguras, mantendo a qualidade dos produtos do 
                  armazém até a sua porta.
                </p>
              </div>

              {/* Service Features */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Cobertura Regional
                    </h3>
                    <p className="text-muted-foreground">
                      Atendemos toda a região metropolitana do Rio de Janeiro 
                      e municípios vizinhos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Truck className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Entrega Refrigerada
                    </h3>
                    <p className="text-muted-foreground">
                      Frota própria com veículos refrigerados para garantir 
                      a qualidade dos produtos durante o transporte.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Horários Flexíveis
                    </h3>
                    <p className="text-muted-foreground">
                      Entregas programadas de acordo com a necessidade do cliente, 
                      de segunda a sábado.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Atendimento Personalizado
                    </h3>
                    <p className="text-muted-foreground">
                      Equipe dedicada para tirar dúvidas sobre entregas 
                      e agendar pedidos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cities/Regions */}
              <div className="bg-card p-8 rounded-lg border mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Principais Regiões Atendidas
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Rio de Janeiro (Capital)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Niterói
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      São Gonçalo
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Duque de Caxias
                    </li>
                  </ul>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Nova Iguaçu
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Belford Roxo
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Itaboraí
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      E outras regiões
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Box */}
              <div className="bg-gradient-cta p-8 rounded-lg text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Consulte Disponibilidade na Sua Região
                </h3>
                <p className="mb-6">
                  Entre em contato conosco para verificar se atendemos sua localidade 
                  e conhecer nossas condições especiais de entrega.
                </p>
                <div className="flex flex-col gap-2">
                  <p className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <strong>(21) 2671-8074</strong>
                  </p>
                  <p className="text-white/90">
                    Segunda a Sexta: 8h às 18h<br />
                    Sábado: 8h às 13h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceArea;
