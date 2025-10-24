import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Target, Award, Users, Clock, Leaf, Shield, Handshake, Star } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-primary to-primary/90 py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-poppins">
                A Empresa
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-poppins font-light">
                Conheça a história, valores e compromissos da Royal Alimentos
              </p>
            </div>
          </div>
        </section>

        {/* Seção 1: Nossa História */}
        <section className="py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Coluna 1: Texto */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins">
                    Mais de 15 Anos de Excelência em Food Service
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed font-poppins">
                    Desde 2008, a Royal Alimentos é a parceira estratégica preferida de restaurantes, hotéis, 
                    supermercados, açougues e distribuidores. Nascemos com a missão de ir além da simples 
                    distribuição: garantimos um mix de produtos diversificado, com marcas confiáveis e um 
                    padrão de qualidade que seu negócio B2B exige.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed font-poppins">
                    Nossa trajetória é construída sobre a confiança e o compromisso em abastecer o mercado local 
                    com agilidade, segurança e o melhor custo-benefício, entendendo as necessidades específicas 
                    de cada estabelecimento do setor alimentício.
                  </p>
                </div>

                {/* Coluna 2: Imagem */}
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Building2 className="h-16 w-16 text-muted-foreground/40 mx-auto" />
                      <p className="text-muted-foreground/60 font-medium">
                        Foto da Empresa
                      </p>
                      <p className="text-sm text-muted-foreground/40">
                        Em breve
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Nossa Direção */}
        <section className="py-20 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins mb-4">
                  Nossa Direção
                </h2>
                <p className="text-lg text-muted-foreground font-poppins">
                  Missão e visão que guiam nossa jornada
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Card Missão */}
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <Target className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-foreground font-poppins">
                          Nossa Missão
                        </h3>
                        <p className="text-muted-foreground leading-relaxed font-poppins">
                          Garantir a excelência em cada entrega para o setor B2B. Fornecemos alimentos de alta 
                          qualidade para restaurantes, hotéis, supermercados e distribuidores, construindo 
                          relações de confiança e satisfação duradoura com nossos parceiros comerciais.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card Visão */}
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-foreground font-poppins">
                          Nossa Visão
                        </h3>
                        <p className="text-muted-foreground leading-relaxed font-poppins">
                          Ser a distribuidora de alimentos referência no mercado B2B, reconhecida pela 
                          inovação em logística, pontualidade e por ser a parceria estratégica que 
                          impulsiona o crescimento dos estabelecimentos do setor alimentício.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 3: Nossos Pilares */}
        <section className="py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins mb-4">
                  Pilares que Sustentam Nossa Qualidade
                </h2>
                <p className="text-lg text-muted-foreground font-poppins">
                  Os valores fundamentais que orientam cada decisão
                </p>
              </div>

              <Tabs defaultValue="qualidade" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8 h-auto p-1">
                  <TabsTrigger value="qualidade" className="text-xs sm:text-sm font-medium py-2 px-2">
                    Qualidade
                  </TabsTrigger>
                  <TabsTrigger value="compromisso" className="text-xs sm:text-sm font-medium py-2 px-2">
                    Compromisso
                  </TabsTrigger>
                  <TabsTrigger value="excelencia" className="text-xs sm:text-sm font-medium py-2 px-2">
                    Excelência
                  </TabsTrigger>
                  <TabsTrigger value="pontualidade" className="text-xs sm:text-sm font-medium py-2 px-2">
                    Pontualidade
                  </TabsTrigger>
                  <TabsTrigger value="sustentabilidade" className="text-xs sm:text-sm font-medium py-2 px-2 col-span-2 sm:col-span-1">
                    Sustentabilidade
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="qualidade" className="mt-8">
                  <Card>
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                          </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground font-poppins">
                            Qualidade Inegociável
                          </h3>
                          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-poppins">
                            Mais que um valor, é o nosso padrão. Da origem ao seu estabelecimento, 
                            cada produto passa por um rigoroso controle para garantir o frescor, 
                            a procedência e a segurança alimentar que sua cozinha exige.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="compromisso" className="mt-8">
                  <Card>
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Handshake className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                          </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground font-poppins">
                            Parcerias Sólidas
                          </h3>
                          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-poppins">
                            Construímos relações ganha-ganha. Nossas negociações são claras e nosso 
                            compromisso é com o seu sucesso, tratando clientes, colaboradores e 
                            fornecedores com o máximo respeito e ética.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="excelencia" className="mt-8">
                  <Card>
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Star className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                          </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground font-poppins">
                            Atendimento que Resolve
                          </h3>
                          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-poppins">
                            Entendemos a urgência do Food Service. Nosso time é treinado para oferecer 
                            um atendimento ágil, soluções eficientes e um serviço que realmente 
                            entende a sua operação.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pontualidade" className="mt-8">
                  <Card>
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                          </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground font-poppins">
                            Seu Negócio Não Pode Parar
                          </h3>
                          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-poppins">
                            Nossa logística é desenhada para garantir entregas precisas e pontuais. 
                            Sabemos que seu estoque é vital, e nossa pontualidade é a garantia 
                            da sua tranquilidade.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sustentabilidade" className="mt-8">
                  <Card>
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                          </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground font-poppins">
                            Olhar para o Futuro
                          </h3>
                          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-poppins">
                            Respeitamos o ecossistema. Adotamos práticas que otimizam recursos e 
                            promovem um ciclo de negócios saudável, garantindo a qualidade de hoje 
                            e a disponibilidade de amanhã.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
