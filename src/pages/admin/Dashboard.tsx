import AdminLayout from '@/components/admin/AdminLayout';
import { useMockData } from '@/contexts/MockDataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, Package, FolderTree, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { getProducts, getCategories, getQuoteRequests } = useMockData();
  
  const products = getProducts();
  const categories = getCategories();
  const quoteRequests = getQuoteRequests();
  const newQuotes = quoteRequests.filter(q => q.status === 'novo');
  const latestQuotes = quoteRequests.slice(0, 5);

  const stats = [
    {
      title: 'Novas Solicitações',
      value: newQuotes.length,
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Total de Produtos',
      value: products.length,
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total de Categorias',
      value: categories.length,
      icon: FolderTree,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total de Orçamentos',
      value: quoteRequests.length,
      icon: FileText,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      'novo': 'destructive',
      'em-atendimento': 'default',
      'finalizado': 'secondary',
    };
    
    const labels: Record<string, string> = {
      'novo': 'Novo',
      'em-atendimento': 'Em Atendimento',
      'finalizado': 'Finalizado',
    };
    
    return (
      <Badge variant={variants[status] || 'default'}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Visão geral do sistema Real Carnes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Latest Quotes Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>Últimas Solicitações de Orçamento</CardTitle>
              <Button 
                variant="outline"
                onClick={() => navigate('/admin/solicitacoes')}
                className="w-full sm:w-auto"
              >
                Ver Todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[80px]">ID</TableHead>
                    <TableHead className="min-w-[100px]">Data</TableHead>
                    <TableHead className="min-w-[120px]">Cliente</TableHead>
                    <TableHead className="min-w-[120px] hidden sm:table-cell">Empresa</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[80px] hidden md:table-cell">Itens</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latestQuotes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Nenhuma solicitação encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    latestQuotes.map((quote) => (
                      <TableRow 
                        key={quote.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => navigate(`/admin/solicitacoes/${quote.id}`)}
                      >
                        <TableCell className="font-medium">{quote.id}</TableCell>
                        <TableCell>{new Date(quote.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell className="font-medium">{quote.customer.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">{quote.customer.company}</TableCell>
                        <TableCell>{getStatusBadge(quote.status)}</TableCell>
                        <TableCell className="hidden md:table-cell">{quote.items.length} produto(s)</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
