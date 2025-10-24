import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Building2, Target, Award, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
              A Empresa
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-center max-w-3xl mx-auto">
              Conheça a história e os valores da Royal Alimentos
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-foreground mb-6">Nossa História</h2>
                <p className="text-muted-foreground mb-6">
                  A Royal Alimentos é uma distribuidora consolidada no mercado de alimentos 
                  congelados e refrigerados, oferecendo produtos de alta qualidade para 
                  clientes que buscam excelência e confiabilidade em cada compra.
                </p>
                <p className="text-muted-foreground mb-8">
                  Com anos de experiência no setor, construímos uma reputação sólida baseada 
                  na qualidade dos nossos produtos, no atendimento personalizado e na 
                  transparência em todas as nossas operações.
                </p>
              </div>

              {/* Values Grid */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Missão</h3>
                    <p className="text-muted-foreground">
                      Fornecer carnes de qualidade superior com excelência no atendimento 
                      e compromisso com a satisfação do cliente.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Visão</h3>
                    <p className="text-muted-foreground">
                      Ser referência nacional no mercado de carnes premium, reconhecida 
                      pela qualidade e confiabilidade.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Valores</h3>
                    <p className="text-muted-foreground">
                      Qualidade, transparência, compromisso com o cliente e respeito 
                      ao meio ambiente em todas as nossas operações.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Equipe</h3>
                    <p className="text-muted-foreground">
                      Profissionais experientes e qualificados, prontos para oferecer 
                      o melhor atendimento e consultoria especializada.
                    </p>
                  </div>
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

export default About;
