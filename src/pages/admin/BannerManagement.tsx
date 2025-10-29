import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useBanners, useCreateBanner, useUpdateBanner, useDeleteBanner } from '@/hooks/useBanners';
import type { Banner } from '../../../shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, GripVertical, Loader2 } from 'lucide-react';

const BannerManagement = () => {
  const { data: banners = [], isLoading } = useBanners(false); // Get all banners, not just active ones
  const createBanner = useCreateBanner();
  const updateBanner = useUpdateBanner();
  const deleteBanner = useDeleteBanner();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  
  const [formData, setFormData] = useState({
    desktopImage: '',
    mobileImage: '',
    linkUrl: '',
  });

  const handleOpenDialog = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        desktopImage: banner.desktopImage,
        mobileImage: banner.mobileImage,
        linkUrl: banner.linkUrl || '',
      });
    } else {
      setEditingBanner(null);
      setFormData({
        desktopImage: '',
        mobileImage: '',
        linkUrl: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBanner(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.desktopImage || !formData.linkUrl) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
      });
      return;
    }

    const bannerData: any = {
      desktopImage: formData.desktopImage,
      mobileImage: formData.mobileImage || formData.desktopImage,
      linkUrl: formData.linkUrl,
      order: editingBanner?.order ?? banners.length,
      active: true,
    };

    try {
      if (editingBanner) {
        await updateBanner.mutateAsync({
          id: editingBanner.id,
          data: bannerData,
        });
        toast({
          title: 'Banner atualizado!',
          description: 'As alterações foram salvas com sucesso.',
        });
      } else {
        await createBanner.mutateAsync(bannerData);
        toast({
          title: 'Banner criado!',
          description: 'O novo banner foi adicionado.',
        });
      }
      handleCloseDialog();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o banner.',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este banner?')) {
      try {
        await deleteBanner.mutateAsync(id);
        toast({
          title: 'Banner excluído',
          description: 'O banner foi removido.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível excluir o banner.',
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
            <h1 className="text-3xl font-bold">Gerenciar Banners</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie os banners da página inicial
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Banner
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Ordem</TableHead>
                <TableHead>Preview Desktop</TableHead>
                <TableHead>Link de Destino</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Nenhum banner encontrado
                  </TableCell>
                </TableRow>
              ) : (
                banners.map((banner, index) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <img
                        src={banner.desktopImage}
                        alt="Banner preview"
                        className="h-16 w-40 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {banner.linkUrl || '(sem link)'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(banner)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(banner.id)}
                          disabled={deleteBanner.isPending}
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

        {/* Banner Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? 'Editar Banner' : 'Novo Banner'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados do banner
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="desktopImage">URL da Imagem Desktop *</Label>
                  <Input
                    id="desktopImage"
                    value={formData.desktopImage}
                    onChange={(e) => setFormData({ ...formData, desktopImage: e.target.value })}
                    placeholder="https://exemplo.com/banner-desktop.jpg"
                  />
                  {formData.desktopImage && (
                    <img
                      src={formData.desktopImage}
                      alt="Preview Desktop"
                      className="w-full h-32 object-cover rounded mt-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileImage">URL da Imagem Mobile</Label>
                  <Input
                    id="mobileImage"
                    value={formData.mobileImage}
                    onChange={(e) => setFormData({ ...formData, mobileImage: e.target.value })}
                    placeholder="https://exemplo.com/banner-mobile.jpg (opcional)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Se não informado, será usada a imagem desktop
                  </p>
                  {formData.mobileImage && (
                    <img
                      src={formData.mobileImage}
                      alt="Preview Mobile"
                      className="w-64 h-32 object-cover rounded mt-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkUrl">Link de Destino *</Label>
                  <Input
                    id="linkUrl"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    placeholder="/produtos ou /produto/123"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createBanner.isPending || updateBanner.isPending}>
                  {(createBanner.isPending || updateBanner.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingBanner ? 'Salvar Alterações' : 'Criar Banner'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default BannerManagement;
