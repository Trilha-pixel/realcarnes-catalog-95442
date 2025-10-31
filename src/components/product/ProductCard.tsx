import { Link } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '../../../shared/schema';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
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
            <p className="text-xs text-muted-foreground mb-1" data-testid={`product-sku-${product.id}`}>
              {product.sku}
            </p>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors" data-testid={`product-name-${product.id}`}>
              {product.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
        <Button asChild variant="outline" className="w-full sm:flex-1" data-testid={`button-details-${product.id}`}>
          <Link to={`/produto/${product.id}`}>
            Ver Detalhes
          </Link>
        </Button>
        <Button 
          onClick={handleAddToCart}
          className="w-full sm:flex-1 bg-primary hover:bg-primary-hover whitespace-nowrap"
          data-testid={`button-add-cart-${product.id}`}
        >
          <ClipboardList className="h-4 w-4 mr-2 flex-shrink-0" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
};
