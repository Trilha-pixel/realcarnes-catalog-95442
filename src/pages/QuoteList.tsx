import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, Send, ShoppingCart } from 'lucide-react';
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

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

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
      const response = await apiRequest('/quotes', {
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

  const handleNextStep = () => {
    if (cart.length === 0) {
      toast.error('Adicione produtos à lista antes de continuar');
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <Button variant="ghost" asChild className="mb-6" data-testid="button-back-products">
            <Link to="/produtos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuar comprando
            </Link>
          </Button>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  1
                </div>
                <span className="font-semibold hidden sm:inline">Produtos</span>
              </div>
              
              <div className="w-16 h-1 bg-muted">
                <div className={`h-full transition-all duration-300 ${currentStep === 2 ? 'bg-primary w-full' : 'bg-transparent w-0'}`}></div>
              </div>
              
              <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <span className="font-semibold hidden sm:inline">Dados de Contato</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-8">
            {currentStep === 1 ? 'Lista de Orçamento' : 'Seus Dados para Contato'}
          </h1>

          {cart.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground mb-6">
                  Sua lista está vazia
                </p>
                <Button asChild data-testid="button-view-products">
                  <Link to="/produtos">
                    Ver Produtos
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* ETAPA 1: PRODUTOS */}
              {currentStep === 1 && (
                <div className="max-w-4xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Produtos Selecionados ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {cart.map((item, index) => (
                        <div key={item.product.id}>
                          {index > 0 && <Separator />}
                          <div className="flex gap-4 py-4" data-testid={`cart-item-${item.product.id}`}>
                            <Link 
                              to={`/produto/${item.product.id}`}
                              className="flex-shrink-0"
                            >
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                                data-testid={`img-product-${item.product.id}`}
                              />
                            </Link>
                            
                            <div className="flex-1 min-w-0">
                              <Link 
                                to={`/produto/${item.product.id}`}
                                className="hover:text-primary transition-colors"
                              >
                                <h3 className="font-semibold mb-1" data-testid={`text-product-name-${item.product.id}`}>
                                  {item.product.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-muted-foreground mb-2" data-testid={`text-product-sku-${item.product.id}`}>
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
                                  data-testid={`button-decrease-${item.product.id}`}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-12 text-center text-sm font-medium" data-testid={`text-quantity-${item.product.id}`}>
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="h-8 w-8"
                                  data-testid={`button-increase-${item.product.id}`}
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
                                data-testid={`button-remove-${item.product.id}`}
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

                  <div className="mt-8 flex justify-end">
                    <Button 
                      size="lg" 
                      onClick={handleNextStep}
                      className="bg-primary hover:bg-primary-hover"
                      data-testid="button-next-step"
                    >
                      Avançar para Dados de Contato
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* ETAPA 2: FORMULÁRIO DE CONTATO */}
              {currentStep === 2 && (
                <div className="max-w-2xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preencha seus dados</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Nossa equipe comercial entrará em contato em até 24 horas com os preços e condições comerciais.
                      </p>
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
                            data-testid="input-name"
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
                            data-testid="input-company"
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
                            data-testid="input-cnpj"
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
                            data-testid="input-email"
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
                            data-testid="input-phone"
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                          )}
                        </div>

                        <Separator className="my-6" />

                        <div className="flex gap-4">
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={handlePreviousStep}
                            className="flex-1"
                            data-testid="button-previous-step"
                          >
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Voltar
                          </Button>
                          
                          <Button 
                            type="submit" 
                            className="flex-1 bg-primary hover:bg-primary-hover"
                            disabled={submitQuoteMutation.isPending}
                            data-testid="button-submit-quote"
                          >
                            <Send className="h-5 w-5 mr-2" />
                            {submitQuoteMutation.isPending ? 'Enviando...' : 'Solicitar Orçamento'}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Summary Card */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total de itens:</span>
                          <span className="font-semibold">{totalItems}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Produtos diferentes:</span>
                          <span className="font-semibold">{cart.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QuoteList;
