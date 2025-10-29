import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/useCategories';
import type { Category } from '../../../shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';

const CategoryManagement = () => {
  const { data: categories = [], isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: '',
    image: '',
  });

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        icon: category.icon || '',
        image: category.image || '',
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        icon: '',
        image: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'O nome da categoria é obrigatório',
      });
      return;
    }

    const slug = formData.slug || generateSlug(formData.name);

    const categoryData: any = {
      name: formData.name,
      slug,
      icon: formData.icon,
      image: formData.image,
    };

    try {
      if (editingCategory) {
        await updateCategory.mutateAsync({
          id: editingCategory.id,
          data: categoryData,
        });
        toast({
          title: 'Categoria atualizada!',
          description: 'As alterações foram salvas com sucesso.',
        });
      } else {
        await createCategory.mutateAsync(categoryData);
        toast({
          title: 'Categoria criada!',
          description: 'A nova categoria foi adicionada.',
        });
      }
      handleCloseDialog();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar a categoria.',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await deleteCategory.mutateAsync(id);
        toast({
          title: 'Categoria excluída',
          description: 'A categoria foi removida.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível excluir a categoria.',
        });
      }
    }
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gerenciar Categorias</h1>
            <p className="text-muted-foreground mt-2">
              Organize o catálogo em categorias
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Categoria
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Ícone</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nenhuma categoria encontrada
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {category.image ? (
                        <img 
                          src={category.image} 
                          alt={category.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                          Sem imagem
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-2xl">{category.icon}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(category.id)}
                          disabled={deleteCategory.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Category Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados da categoria
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                {/* Preview da Imagem */}
                {formData.image && (
                  <div className="space-y-2">
                    <Label>Preview da Imagem</Label>
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = '';
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        name: e.target.value,
                        slug: generateSlug(e.target.value)
                      });
                    }}
                    placeholder="Nome da categoria"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="categoria-exemplo"
                  />
                  <p className="text-xs text-muted-foreground">
                    Gerado automaticamente a partir do nome
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Ícone (Emoji)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="🥩"
                    maxLength={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL da Imagem *</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Cole aqui a URL completa da imagem (deve começar com https://)
                  </p>
                  <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded border">
                    <p className="font-semibold mb-1">💡 Dica: Onde obter URLs de imagens</p>
                    <ul className="space-y-1 ml-4 list-disc">
                      <li>Imagens do Google: Clique com botão direito → "Copiar endereço da imagem"</li>
                      <li>Unsplash: Use imagens gratuitas de alta qualidade</li>
                      <li>ImgBB: Faça upload e copie o link direto</li>
                    </ul>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createCategory.isPending || updateCategory.isPending}>
                  {(createCategory.isPending || updateCategory.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingCategory ? 'Salvar Alterações' : 'Criar Categoria'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default CategoryManagement;
