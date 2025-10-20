import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useMockData, QuoteRequest } from '@/contexts/MockDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Eye } from 'lucide-react';

const QuoteManagementAdmin = () => {
  const navigate = useNavigate();
  const { getQuoteRequests, updateQuoteStatus } = useMockData();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [newStatus, setNewStatus] = useState<QuoteRequest['status']>('novo');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const allQuotes = getQuoteRequests();
  
  const filteredQuotes = allQuotes.filter(quote => {
    const matchesSearch = 
      quote.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenDialog = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setNewStatus(quote.status);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedQuote(null);
  };

  const handleUpdateStatus = () => {
    if (selectedQuote && newStatus !== selectedQuote.status) {
      updateQuoteStatus(selectedQuote.id, newStatus);
      toast({
        title: 'Status atualizado!',
        description: `O status foi alterado para "${getStatusLabel(newStatus)}".`,
      });
      handleCloseDialog();
    } else {
      handleCloseDialog();
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      'novo': 'destructive',
      'em-atendimento': 'default',
      'finalizado': 'secondary',
    };
    
    return (
      <Badge variant={variants[status] || 'default'}>
        {getStatusLabel(status)}
      </Badge>
    );
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'novo': 'Novo',
      'em-atendimento': 'Em Atendimento',
      'finalizado': 'Finalizado',
    };
    return labels[status] || status;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Solicitações</h1>
          <p className="text-muted-foreground mt-2">
            Visualize e gerencie todas as solicitações de orçamento
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Buscar por cliente, empresa ou ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="novo">Novo</SelectItem>
              <SelectItem value="em-atendimento">Em Atendimento</SelectItem>
              <SelectItem value="finalizado">Finalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Nenhuma solicitação encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">{quote.id}</TableCell>
                    <TableCell>{new Date(quote.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{quote.customer.name}</TableCell>
                    <TableCell>{quote.customer.company}</TableCell>
                    <TableCell>{getStatusBadge(quote.status)}</TableCell>
                    <TableCell>{quote.items.length} produto(s)</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(quote)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Quote Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes da Solicitação {selectedQuote?.id}</DialogTitle>
              <DialogDescription>
                Informações completas do pedido de orçamento
              </DialogDescription>
            </DialogHeader>
            
            {selectedQuote && (
              <div className="space-y-6 py-4">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-3">Dados do Cliente</h3>
                  <div className="grid grid-cols-2 gap-4 bg-muted p-4 rounded-md">
                    <div>
                      <p className="text-sm text-muted-foreground">Nome</p>
                      <p className="font-medium">{selectedQuote.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Empresa</p>
                      <p className="font-medium">{selectedQuote.customer.company}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CNPJ</p>
                      <p className="font-medium">{selectedQuote.customer.cnpj}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedQuote.customer.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-medium">{selectedQuote.customer.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data da Solicitação</p>
                      <p className="font-medium">
                        {new Date(selectedQuote.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Products */}
                <div>
                  <h3 className="font-semibold mb-3">Produtos Solicitados</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedQuote.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {item.product.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {item.product.sku}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity} cx
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                {/* Status Management */}
                <div>
                  <h3 className="font-semibold mb-3">Gerenciar Status</h3>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status da Solicitação</Label>
                    <Select value={newStatus} onValueChange={(value) => setNewStatus(value as QuoteRequest['status'])}>
                      <SelectTrigger id="status">
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
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Fechar
              </Button>
              <Button type="button" onClick={handleUpdateStatus}>
                Atualizar Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default QuoteManagementAdmin;
