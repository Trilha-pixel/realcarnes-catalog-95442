import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChefHat, Clock, Users, Utensils } from "lucide-react";

const Recipes = () => {
  // Mock recipes data
  const recipes = [
    {
      id: 1,
      title: "Picanha na Brasa",
      description: "Aprenda a preparar uma deliciosa picanha na brasa com o ponto perfeito.",
      prepTime: "30 min",
      servings: "6 pessoas",
      difficulty: "Médio",
    },
    {
      id: 2,
      title: "Filé Mignon ao Molho Madeira",
      description: "Receita clássica de filé mignon com molho madeira e cogumelos frescos.",
      prepTime: "45 min",
      servings: "4 pessoas",
      difficulty: "Médio",
    },
    {
      id: 3,
      title: "Costela Assada no Forno",
      description: "Costela suculenta assada lentamente no forno com temperos especiais.",
      prepTime: "3 horas",
      servings: "8 pessoas",
      difficulty: "Fácil",
    },
    {
      id: 4,
      title: "Frango Grelhado Marinado",
      description: "Peito de frango grelhado com marinada de ervas e limão.",
      prepTime: "40 min",
      servings: "4 pessoas",
      difficulty: "Fácil",
    },
    {
      id: 5,
      title: "Lombo Suíno ao Alho",
      description: "Lombo suíno assado com crosta de alho e ervas aromáticas.",
      prepTime: "1 hora",
      servings: "6 pessoas",
      difficulty: "Médio",
    },
    {
      id: 6,
      title: "Hambúrguer Gourmet Caseiro",
      description: "Hambúrguer artesanal com blend especial de carnes nobres.",
      prepTime: "25 min",
      servings: "4 pessoas",
      difficulty: "Fácil",
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
              <ChefHat className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Receitas
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/90 text-center max-w-3xl mx-auto">
              Inspire-se com nossas receitas especiais preparadas por chefs profissionais
            </p>
          </div>
        </section>

        {/* Recipes Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <article key={recipe.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Utensils className="w-16 h-16 text-primary/30" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {recipe.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {recipe.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.prepTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChefHat className="w-4 h-4" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Tips Section */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-muted/50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Dicas do Chef
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Retire a carne da geladeira 30 minutos antes de preparar para alcançar a temperatura ambiente.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Use sempre uma tábua de corte adequada e higienizada para manipular carnes cruas.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Para carnes grelhadas, pré-aqueça bem a grelha antes de colocar os cortes.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Deixe a carne descansar por alguns minutos após o preparo para redistribuir os sucos.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Use um termômetro de carne para garantir o ponto perfeito, especialmente em cortes nobres.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Recipes;
