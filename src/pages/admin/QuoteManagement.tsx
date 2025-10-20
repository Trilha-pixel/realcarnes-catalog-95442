import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMockData } from '@/contexts/MockDataContext';

const QuoteManagement = () => {
  const navigate = useNavigate();
  const { quoteRequests, updateQuoteStatus } = useMockData();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredQuotes = statusFilter === 'all' 
    ? quoteRequests 
    : quoteRequests.filter(q => q.status === statusFilter);

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
          <Button variant="ghost" asChild className="mb-2">
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Gerenciar Orçamentos</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Solicitações de Orçamento</CardTitle>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="novo">Novos</SelectItem>
                  <SelectItem value="em-atendimento">Em Atendimento</SelectItem>
                  <SelectItem value="finalizado">Finalizados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      Nenhum orçamento encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.id}</TableCell>
                      <TableCell>{new Date(quote.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{quote.customer.name}</TableCell>
                      <TableCell>{quote.customer.company}</TableCell>
                      <TableCell className="font-mono text-sm">{quote.customer.cnpj}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{quote.customer.email}</div>
                          <div className="text-muted-foreground">{quote.customer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{quote.items.length}</TableCell>
                      <TableCell>
                        <Select
                          value={quote.status}
                          onValueChange={(value) => updateQuoteStatus(quote.id, value as any)}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="novo">Novo</SelectItem>
                            <SelectItem value="em-atendimento">Em Atendimento</SelectItem>
                            <SelectItem value="finalizado">Finalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/orcamentos/${quote.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
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

export default QuoteManagement;
