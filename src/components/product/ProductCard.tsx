import { Link } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/contexts/MockDataContext';
import { useMockData } from '@/contexts/MockDataContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToQuoteCart, getCategoryBySlug } = useMockData();
  const category = getCategoryBySlug(product.category);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToQuoteCart(product);
    toast.success('Produto adicionado à lista de orçamento!', {
      description: product.name,
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-medium transition-all duration-300">
      <Link to={`/produto/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <Badge className="absolute top-3 right-3 bg-gold hover:bg-gold-hover text-gold-foreground">
              Destaque
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/produto/${product.id}`}>
          <div className="mb-2">
            <p className="text-xs text-muted-foreground mb-1">
              {category?.icon} {category?.name} • {product.sku}
            </p>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/produto/${product.id}`}>
            Ver Detalhes
          </Link>
        </Button>
        <Button 
          onClick={handleAddToCart}
          className="flex-1 bg-primary hover:bg-primary-hover"
        >
          <ClipboardList className="h-4 w-4 mr-2" />
          Adicionar à Cotação
        </Button>
      </CardFooter>
    </Card>
  );
};
