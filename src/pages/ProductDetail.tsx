import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Package, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useMockData } from '@/contexts/MockDataContext';
import { toast } from 'sonner';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, addToQuoteCart, getCategoryBySlug, getProducts } = useMockData();
  
  const product = getProductById(id || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
            <Button asChild>
              <Link to="/produtos">Ver todos os produtos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const category = getCategoryBySlug(product.category);
  const relatedProducts = getProducts(product.category).filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToQuoteCart(product, quantity);
    toast.success('Produto adicionado à lista de orçamento!', {
      description: `${quantity}x ${product.name}`,
      action: {
        label: 'Ver Lista',
        onClick: () => navigate('/orcamento'),
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container px-4 py-4">
            <Button variant="ghost" asChild className="mb-2">
              <Link to="/produtos">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para produtos
              </Link>
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="container px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Images */}
              <div>
                <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4 shadow-medium">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? 'border-primary shadow-soft'
                            : 'border-transparent hover:border-muted-foreground'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-sm">
                      {category?.icon} {category?.name}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      <Tag className="h-3 w-3 mr-1" />
                      {product.sku}
                    </Badge>
                    {product.featured && (
                      <Badge className="bg-gold hover:bg-gold-hover text-gold-foreground">
                        Destaque
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Embalagem e Especificações</h3>
                        <p className="text-muted-foreground">{product.packaging}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Adicionar à Lista de Orçamento</h3>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <label className="text-sm font-medium">Quantidade (caixas):</label>
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="h-10 w-10"
                        >
                          -
                        </Button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-16 text-center border-x bg-transparent outline-none"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setQuantity(quantity + 1)}
                          className="h-10 w-10"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button 
                        onClick={handleAddToCart}
                        size="lg"
                        className="w-full bg-primary hover:bg-primary-hover"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Adicionar à Lista
                      </Button>
                      
                      <Button 
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full"
                      >
                        <Link to="/orcamento">
                          Ver Lista de Orçamento
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      <strong>Importante:</strong> Os preços serão informados pela nossa equipe comercial após análise do seu pedido.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-20">
                <h2 className="text-3xl font-bold mb-8">Produtos Relacionados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map(relatedProduct => (
                    <Card key={relatedProduct.id} className="group overflow-hidden hover:shadow-medium transition-all">
                      <Link to={`/produto/${relatedProduct.id}`}>
                        <div className="aspect-square overflow-hidden bg-muted">
                          <img
                            src={relatedProduct.images[0]}
                            alt={relatedProduct.name}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground mb-1">{relatedProduct.sku}</p>
                          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedProduct.name}
                          </h3>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
