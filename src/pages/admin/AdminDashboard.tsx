import { Link } from 'react-router-dom';
import { Package, ListOrdered, Tag, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMockData } from '@/contexts/MockDataContext';

const AdminDashboard = () => {
  const { products, quoteRequests, categories } = useMockData();
  
  const newQuotes = quoteRequests.filter(q => q.status === 'novo').length;
  const inProgressQuotes = quoteRequests.filter(q => q.status === 'em-atendimento').length;
  
  const recentQuotes = quoteRequests.slice(0, 5);

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

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-40">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Painel Administrativo</h1>
              <p className="text-muted-foreground">Real Carnes</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/">Ver Site</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                {categories.length} categorias
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Orçamentos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{newQuotes}</div>
              <p className="text-xs text-muted-foreground">
                Aguardando atendimento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Atendimento</CardTitle>
              <ListOrdered className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold">{inProgressQuotes}</div>
              <p className="text-xs text-muted-foreground">
                Orçamentos em processo
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Orçamentos</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quoteRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                Todos os períodos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button asChild>
              <Link to="/admin/orcamentos">
                <ListOrdered className="h-4 w-4 mr-2" />
                Ver Orçamentos
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/produtos">
                <Package className="h-4 w-4 mr-2" />
                Gerenciar Produtos
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/categorias">
                <Tag className="h-4 w-4 mr-2" />
                Gerenciar Categorias
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Quotes */}
        <Card>
          <CardHeader>
            <CardTitle>Orçamentos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentQuotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      Nenhum orçamento encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  recentQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.id}</TableCell>
                      <TableCell>{new Date(quote.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{quote.customer.name}</TableCell>
                      <TableCell>{quote.customer.company}</TableCell>
                      <TableCell>{quote.items.length}</TableCell>
                      <TableCell>{getStatusBadge(quote.status)}</TableCell>
                      <TableCell>
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/admin/orcamentos/${quote.id}`}>
                            Ver Detalhes
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
