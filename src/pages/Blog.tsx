import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Como Escolher a Carne Perfeita para Cada Ocasião",
      excerpt: "Descubra as melhores dicas para selecionar cortes de carne ideais para churrasco, jantar especial ou refeições do dia a dia.",
      author: "Chef Ricardo Silva",
      date: "15 de Março, 2024",
      category: "Dicas",
    },
    {
      id: 2,
      title: "Os Benefícios Nutricionais da Carne Vermelha",
      excerpt: "Entenda por que a carne vermelha, quando consumida com moderação, é uma excelente fonte de proteínas e nutrientes essenciais.",
      author: "Dra. Ana Paula",
      date: "10 de Março, 2024",
      category: "Saúde",
    },
    {
      id: 3,
      title: "Técnicas de Armazenamento para Manter a Qualidade",
      excerpt: "Aprenda as melhores práticas para armazenar carnes e manter sua qualidade, sabor e segurança alimentar.",
      author: "Equipe Real Carnes",
      date: "05 de Março, 2024",
      category: "Dicas",
    },
    {
      id: 4,
      title: "Diferenças Entre Cortes Bovinos Nobres",
      excerpt: "Conheça as características que tornam cada corte único: picanha, filé mignon, contrafilé e muito mais.",
      author: "Chef Ricardo Silva",
      date: "28 de Fevereiro, 2024",
      category: "Conhecimento",
    },
    {
      id: 5,
      title: "Sustentabilidade na Produção de Carnes",
      excerpt: "Como a Real Carnes trabalha com fornecedores comprometidos com práticas sustentáveis e responsáveis.",
      author: "Equipe Real Carnes",
      date: "20 de Fevereiro, 2024",
      category: "Sustentabilidade",
    },
    {
      id: 6,
      title: "Marinadas e Temperos: Guia Completo",
      excerpt: "Descubra combinações perfeitas de temperos e marinadas para realçar o sabor de diferentes tipos de carne.",
      author: "Chef Ricardo Silva",
      date: "15 de Fevereiro, 2024",
      category: "Receitas",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Blog
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/90 text-center max-w-3xl mx-auto">
              Artigos, dicas e novidades sobre o universo das carnes premium
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/30" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        Ler mais
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Section */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="bg-gradient-cta p-8 rounded-lg text-white text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Assine Nossa Newsletter
                </h2>
                <p className="mb-6">
                  Receba as últimas novidades, dicas e receitas direto no seu e-mail.
                </p>
                <div className="flex gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="flex-1 px-4 py-2 rounded-md text-foreground"
                  />
                  <Button variant="secondary" size="lg">
                    Assinar
                  </Button>
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

export default Blog;
