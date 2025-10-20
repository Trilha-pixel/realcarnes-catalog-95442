import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Building2, Mail, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMockData } from '@/contexts/MockDataContext';

const QuoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getQuoteRequestById, updateQuoteStatus } = useMockData();
  
  const quote = getQuoteRequestById(id || '');

  if (!quote) {
    return (
      <div className="min-h-screen bg-muted/30">
        <header className="border-b bg-background">
          <div className="container px-4 py-4">
            <Button variant="ghost" asChild>
              <Link to="/admin/orcamentos">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
          </div>
        </header>
        <main className="container px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                Orçamento não encontrado
              </p>
              <Button asChild>
                <Link to="/admin/orcamentos">
                  Voltar para lista
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      'novo': 'default',
      'em-atendimento': 'secondary',
      'finalizado': 'outline',
    };
    
    const labels = {
      'novo': 'Novo',
      'em-atendimento': 'Em Atendimento',
      'finalizado': 'Finalizado',
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const totalItems = quote.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-40">
        <div className="container px-4 py-4">
          <Button variant="ghost" asChild className="mb-2">
            <Link to="/admin/orcamentos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Orçamentos
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Orçamento {quote.id}</h1>
              <p className="text-muted-foreground">
                Solicitado em {new Date(quote.date).toLocaleDateString('pt-BR', { 
                  day: '2-digit', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select
                value={quote.status}
                onValueChange={(value) => updateQuoteStatus(quote.id, value as any)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novo">Novo</SelectItem>
                  <SelectItem value="em-atendimento">Em Atendimento</SelectItem>
                  <SelectItem value="finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{quote.customer.name}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Empresa</p>
                    <p className="font-medium">{quote.customer.company}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">CNPJ</p>
                    <p className="font-medium font-mono text-sm">{quote.customer.cnpj}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <a 
                      href={`mailto:${quote.customer.email}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {quote.customer.email}
                    </a>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <a 
                      href={`tel:${quote.customer.phone}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {quote.customer.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total de Itens:</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Produtos Diferentes:</span>
                  <span className="font-semibold">{quote.items.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  {getStatusBadge(quote.status)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Produtos Solicitados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quote.items.map((item, index) => (
                  <div key={item.product.id}>
                    {index > 0 && <Separator />}
                    <div className="flex gap-4 py-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Código: {item.product.sku}
                            </p>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {item.quantity}x
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.product.description}
                        </p>
                        
                        <div className="bg-muted/50 p-3 rounded-md">
                          <p className="text-xs text-muted-foreground font-medium mb-1">
                            Embalagem:
                          </p>
                          <p className="text-sm">{item.product.packaging}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button asChild>
                  <a href={`mailto:${quote.customer.email}?subject=Orçamento ${quote.id} - Real Carnes`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar E-mail
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={`https://wa.me/${quote.customer.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4 mr-2" />
                    Enviar WhatsApp
                  </a>
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  Imprimir
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuoteDetail;
