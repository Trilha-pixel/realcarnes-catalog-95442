import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Building, CheckCircle, Shield, TrendingUp } from "lucide-react";

const Suppliers = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
              Fornecedores
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-center max-w-3xl mx-auto">
              Trabalhamos com os melhores fornecedores do mercado
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Parceiros de Qualidade
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  A Real Carnes mantém parcerias estratégicas com fornecedores 
                  certificados e reconhecidos pela excelência de seus produtos. 
                  Nossa rigorosa seleção garante que apenas as melhores carnes 
                  cheguem até você.
                </p>
              </div>

              {/* Criteria Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-card p-6 rounded-lg border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Certificações e Qualidade
                  </h3>
                  <p className="text-muted-foreground">
                    Todos os nossos fornecedores possuem certificações sanitárias 
                    e seguem rigorosos padrões de qualidade e segurança alimentar.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Rastreabilidade
                  </h3>
                  <p className="text-muted-foreground">
                    Garantimos rastreabilidade completa de todos os produtos, 
                    desde a origem até a entrega final ao cliente.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Estrutura Moderna
                  </h3>
                  <p className="text-muted-foreground">
                    Nossos parceiros contam com instalações modernas e 
                    tecnologia de ponta para garantir a qualidade dos produtos.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Melhoria Contínua
                  </h3>
                  <p className="text-muted-foreground">
                    Investimento constante em melhorias de processos e 
                    atualização de tecnologias para manter a excelência.
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Seja Nosso Fornecedor
                </h3>
                <p className="text-muted-foreground mb-4">
                  Se sua empresa compartilha dos nossos valores de qualidade e 
                  excelência, entre em contato conosco para conhecer nossos 
                  requisitos e iniciar uma parceria.
                </p>
                <p className="text-muted-foreground">
                  <strong>E-mail:</strong> fornecedores@realcarnes.com.br<br />
                  <strong>Telefone:</strong> (21) 2671-8074
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Suppliers;
