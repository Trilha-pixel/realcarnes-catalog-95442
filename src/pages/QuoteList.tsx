import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const customerSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  company: z.string().trim().min(1, 'Empresa é obrigatória').max(100, 'Nome da empresa muito longo'),
  cnpj: z.string().trim().min(14, 'CNPJ inválido').max(18, 'CNPJ inválido'),
  email: z.string().trim().email('E-mail inválido').max(255, 'E-mail muito longo'),
  phone: z.string().trim().min(10, 'Telefone inválido').max(20, 'Telefone inválido'),
});

const QuoteList = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity,
    clearCart
  } = useCart();

  const [customerData, setCustomerData] = useState({
    name: '',
    company: '',
    cnpj: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: typeof customerData) => {
      const response = await apiRequest('/api/quotes', {
        method: 'POST',
        body: JSON.stringify({
          customerName: data.name,
          customerCompany: data.company,
          customerCnpj: data.cnpj,
          customerEmail: data.email,
          customerPhone: data.phone,
          status: 'novo',
          items: cart.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            productSku: item.product.sku,
            quantity: item.quantity,
          })),
        }),
      });
      return response;
    },
    onSuccess: (data) => {
      clearCart();
      toast.success('Orçamento solicitado com sucesso!', {
        description: `Número do pedido: ${data.id}`,
      });
      navigate('/orcamento/sucesso', { state: { quoteId: data.id } });
    },
    onError: () => {
      toast.error('Erro ao enviar orçamento. Tente novamente.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('Adicione produtos à lista antes de solicitar orçamento');
      return;
    }

    try {
      customerSchema.parse(customerData);
      setErrors({});
      submitQuoteMutation.mutate(customerData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error('Por favor, corrija os erros no formulário');
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        <div className="container px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/produtos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuar comprando
            </Link>
          </Button>

          <h1 className="text-4xl font-bold mb-8">Lista de Orçamento</h1>

          {cart.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-xl text-muted-foreground mb-6">
                  Sua lista está vazia
                </p>
                <Button asChild>
                  <Link to="/produtos">
                    Ver Produtos
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Produtos Selecionados ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={item.product.id}>
                        {index > 0 && <Separator />}
                        <div className="flex gap-4 py-4">
                          <Link 
                            to={`/produto/${item.product.id}`}
                            className="flex-shrink-0"
                          >
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                            />
                          </Link>
                          
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={`/produto/${item.product.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              <h3 className="font-semibold mb-1">{item.product.name}</h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-2">
                              Código: {item.product.sku}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.product.packaging}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="h-8 w-8"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="h-8 w-8"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                removeFromCart(item.product.id);
                                toast.info('Produto removido da lista');
                              }}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remover
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Seus Dados para Contato</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          value={customerData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="company">Empresa *</Label>
                        <Input
                          id="company"
                          value={customerData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className={errors.company ? 'border-destructive' : ''}
                        />
                        {errors.company && (
                          <p className="text-sm text-destructive mt-1">{errors.company}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="cnpj">CNPJ *</Label>
                        <Input
                          id="cnpj"
                          value={customerData.cnpj}
                          onChange={(e) => handleInputChange('cnpj', formatCNPJ(e.target.value))}
                          placeholder="00.000.000/0000-00"
                          className={errors.cnpj ? 'border-destructive' : ''}
                        />
                        {errors.cnpj && (
                          <p className="text-sm text-destructive mt-1">{errors.cnpj}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Telefone / WhatsApp *</Label>
                        <Input
                          id="phone"
                          value={customerData.phone}
                          onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                          placeholder="(00) 00000-0000"
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <Separator />

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Nossa equipe comercial entrará em contato em até 24 horas com os preços e condições comerciais.
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-primary hover:bg-primary-hover"
                        disabled={submitQuoteMutation.isPending}
                        data-testid="button-submit-quote"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        {submitQuoteMutation.isPending ? 'Enviando...' : 'Solicitar Orçamento'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QuoteList;
