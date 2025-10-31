import { useState, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import type { Product } from '../../../shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Star, Loader2, Upload, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { queryClient } from '@/lib/queryClient';

const ProductManagement = () => {
  const { data: products = [], isLoading: isLoadingProducts } = useProducts();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState<{ current: number; total: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    packaging: '',
    categoryId: '',
    featured: false,
    imageUrl: '',
    status: 'active' as 'active' | 'inactive',
  });
  
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        sku: product.sku,
        description: product.description || '',
        packaging: product.packaging || '',
        categoryId: product.categoryId.toString(),
        featured: product.featured,
        imageUrl: product.images[0] || '',
        status: (product.status || 'active') as 'active' | 'inactive',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        sku: '',
        description: '',
        packaging: '',
        categoryId: '',
        featured: false,
        imageUrl: '',
        status: 'active' as 'active' | 'inactive',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sku || !formData.categoryId) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
      });
      return;
    }

    const productData: any = {
      name: formData.name,
      sku: formData.sku,
      description: formData.description,
      packaging: formData.packaging,
      categoryId: parseInt(formData.categoryId),
      featured: formData.featured,
      images: formData.imageUrl ? [formData.imageUrl] : [],
      status: formData.status as 'active' | 'inactive',
    };

    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({
          id: editingProduct.id,
          data: productData,
        });
        toast({
          title: 'Produto atualizado!',
          description: 'As alterações foram salvas com sucesso.',
        });
      } else {
        await createProduct.mutateAsync(productData);
        toast({
          title: 'Produto criado!',
          description: 'O novo produto foi adicionado ao catálogo.',
        });
      }
      handleCloseDialog();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o produto.',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduct.mutateAsync(id);
        toast({
          title: 'Produto excluído',
          description: 'O produto foi removido do catálogo.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível excluir o produto.',
        });
      }
    }
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        
        if (char === '"' && lines[i][j-1] !== '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.replace(/^"|"$/g, '').replace(/""/g, '"'));
          current = '';
        } else {
          current += char;
        }
      }
      
      values.push(current.replace(/^"|"$/g, '').replace(/""/g, '"'));
      
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      
      data.push(row);
    }
    
    return data;
  };

  const handleCSVImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportProgress(null);

    try {
      const text = await file.text();
      const csvData = parseCSV(text);
      
      setImportProgress({ current: 0, total: csvData.length });

      // Preparar dados para importação
      const productsToImport = csvData.map(row => ({
        sku: row.sku || '',
        name: row.name || '',
        description: row.description || '',
        packaging: row.packaging || '',
        categoryId: parseInt(row.category_id) || 1,
        featured: row.featured === 'true',
        status: (row.status || 'active') as 'active' | 'inactive',
        images: (() => {
          try {
            // Se o campo images já for um array JSON válido
            if (row.images && row.images.startsWith('[')) {
              return JSON.parse(row.images);
            }
            // Se for uma URL simples
            return row.images ? [row.images] : [];
          } catch {
            return [];
          }
        })(),
      }));

      // Enviar para o servidor
      const response = await fetch('/api/products/bulk-import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: productsToImport }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao importar produtos: ${response.status}`);
      }

      const result = await response.json();

      // Invalidar cache para recarregar produtos
      await queryClient.invalidateQueries({ queryKey: ['/api/products'] });

      toast({
        title: 'Importação concluída!',
        description: `${result.imported} produtos importados, ${result.updated} atualizados, ${result.errors} erros.`,
      });

      setImportProgress(null);
    } catch (error) {
      console.error('Erro ao importar CSV:', error);
      toast({
        variant: 'destructive',
        title: 'Erro na importação',
        description: 'Não foi possível importar o arquivo CSV. Verifique o formato.',
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (isLoadingProducts || isLoadingCategories) {
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Gerenciar Produtos</h1>
            <p className="text-muted-foreground mt-2">
              Adicione, edite ou remova produtos do catálogo
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={() => handleOpenDialog()} className="flex-1 sm:flex-none">
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              variant="outline"
              disabled={isImporting}
              className="flex-1 sm:flex-none"
            >
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Importar CSV
                </>
              )}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleCSVImport}
              className="hidden"
              data-testid="csv-file-input"
            />
          </div>
        </div>

        {importProgress && (
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              Importando produtos: {importProgress.current} de {importProgress.total}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-4">
          <Input
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[60px]">Imagem</TableHead>
                <TableHead className="min-w-[150px]">Nome</TableHead>
                <TableHead className="min-w-[100px] hidden sm:table-cell">SKU</TableHead>
                <TableHead className="min-w-[120px] hidden md:table-cell">Categoria</TableHead>
                <TableHead className="min-w-[80px] hidden lg:table-cell">Destaque</TableHead>
                <TableHead className="text-right min-w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Nenhum produto encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground sm:hidden">{product.sku}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{product.sku}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">
                        {categories.find(c => c.id === product.categoryId)?.name || 'Sem categoria'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {product.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1 sm:gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(product)}
                          className="h-8 w-8 sm:h-10 sm:w-10"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          className="h-8 w-8 sm:h-10 sm:w-10"
                          disabled={deleteProduct.isPending}
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Product Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados do produto abaixo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nome do produto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="RC-P1001"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descrição detalhada do produto"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="packaging">Informações de Embalagem</Label>
                  <Input
                    id="packaging"
                    value={formData.packaging}
                    onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                    placeholder="Caixa: 12 kg a 15 kg, 8 a 10 peças por caixa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL da Imagem</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded mt-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, featured: checked as boolean })
                    }
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Marcar como produto destaque (aparece na homepage)
                  </Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createProduct.isPending || updateProduct.isPending}>
                  {(createProduct.isPending || updateProduct.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;
