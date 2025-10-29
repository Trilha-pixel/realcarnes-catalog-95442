import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useQuoteRequests, useUpdateQuoteStatus } from '@/hooks/useQuotes';
import type { QuoteRequest, QuoteItem } from '../../../shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Eye, Loader2 } from 'lucide-react';

type QuoteStatus = 'novo' | 'em_atendimento' | 'finalizado';

type QuoteRequestWithItems = QuoteRequest & {
  items?: QuoteItem[];
};

const QuoteManagementAdmin = () => {
  const navigate = useNavigate();
  const { data: allQuotes = [], isLoading } = useQuoteRequests();
  const updateQuoteStatus = useUpdateQuoteStatus();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequestWithItems | null>(null);
  const [newStatus, setNewStatus] = useState<QuoteStatus>('novo');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredQuotes = allQuotes.filter(quote => {
    const matchesSearch = 
      quote.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.customerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.id.toString().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenDialog = (quote: QuoteRequestWithItems) => {
    setSelectedQuote(quote);
    setNewStatus(quote.status as QuoteStatus);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedQuote(null);
  };

  const handleUpdateStatus = async () => {
    if (selectedQuote && newStatus !== selectedQuote.status) {
      try {
        await updateQuoteStatus.mutateAsync({
          id: selectedQuote.id,
          status: newStatus,
        });
        toast({
          title: 'Status atualizado!',
          description: `O status foi alterado para "${getStatusLabel(newStatus)}".`,
        });
        handleCloseDialog();
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível atualizar o status.',
        });
      }
    } else {
      handleCloseDialog();
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      'novo': 'destructive',
      'em_atendimento': 'default',
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
      'em_atendimento': 'Em Atendimento',
      'finalizado': 'Finalizado',
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

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
              <SelectItem value="em_atendimento">Em Atendimento</SelectItem>
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
                    <TableCell className="font-medium">#{quote.id}</TableCell>
                    <TableCell>{new Date(quote.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{quote.customerName}</TableCell>
                    <TableCell>{quote.customerCompany}</TableCell>
                    <TableCell>{getStatusBadge(quote.status)}</TableCell>
                    <TableCell>{quote.items?.length || 0} produto(s)</TableCell>
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
              <DialogTitle>Detalhes da Solicitação #{selectedQuote?.id}</DialogTitle>
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
                      <p className="font-medium">{selectedQuote.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Empresa</p>
                      <p className="font-medium">{selectedQuote.customerCompany}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CNPJ</p>
                      <p className="font-medium">{selectedQuote.customerCnpj}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedQuote.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-medium">{selectedQuote.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data da Solicitação</p>
                      <p className="font-medium">
                        {new Date(selectedQuote.createdAt).toLocaleDateString('pt-BR')}
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
                      {selectedQuote.items && selectedQuote.items.length > 0 ? (
                        selectedQuote.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.productName}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {item.productSku}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.quantity} cx
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            Nenhum item encontrado
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                {/* Status Management */}
                <div>
                  <h3 className="font-semibold mb-3">Gerenciar Status</h3>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status da Solicitação</Label>
                    <Select value={newStatus} onValueChange={(value) => setNewStatus(value as QuoteStatus)}>
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="novo">Novo</SelectItem>
                        <SelectItem value="em_atendimento">Em Atendimento</SelectItem>
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
              <Button type="button" onClick={handleUpdateStatus} disabled={updateQuoteStatus.isPending}>
                {updateQuoteStatus.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
