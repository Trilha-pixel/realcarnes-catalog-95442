import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useMockData, Banner } from '@/contexts/MockDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';

const BannerManagement = () => {
  const { getBanners, createBanner, updateBanner, deleteBanner } = useMockData();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  
  const [formData, setFormData] = useState({
    imagem_desktop: '',
    imagem_mobile: '',
    link_url: '',
  });

  const banners = getBanners();

  const handleOpenDialog = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        imagem_desktop: banner.imagem_desktop,
        imagem_mobile: banner.imagem_mobile,
        link_url: banner.link_url,
      });
    } else {
      setEditingBanner(null);
      setFormData({
        imagem_desktop: '',
        imagem_mobile: '',
        link_url: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBanner(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.imagem_desktop || !formData.link_url) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
      });
      return;
    }

    const bannerData = {
      imagem_desktop: formData.imagem_desktop,
      imagem_mobile: formData.imagem_mobile || formData.imagem_desktop,
      link_url: formData.link_url,
    };

    if (editingBanner) {
      updateBanner(editingBanner.id, bannerData);
      toast({
        title: 'Banner atualizado!',
        description: 'As alterações foram salvas com sucesso.',
      });
    } else {
      createBanner(bannerData);
      toast({
        title: 'Banner criado!',
        description: 'O novo banner foi adicionado.',
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este banner?')) {
      deleteBanner(id);
      toast({
        title: 'Banner excluído',
        description: 'O banner foi removido.',
      });
    }
  };

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
                        src={banner.imagem_desktop}
                        alt="Banner preview"
                        className="h-16 w-40 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {banner.link_url}
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
                  <Label htmlFor="imagem_desktop">URL da Imagem Desktop *</Label>
                  <Input
                    id="imagem_desktop"
                    value={formData.imagem_desktop}
                    onChange={(e) => setFormData({ ...formData, imagem_desktop: e.target.value })}
                    placeholder="https://exemplo.com/banner-desktop.jpg"
                  />
                  {formData.imagem_desktop && (
                    <img
                      src={formData.imagem_desktop}
                      alt="Preview Desktop"
                      className="w-full h-32 object-cover rounded mt-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imagem_mobile">URL da Imagem Mobile</Label>
                  <Input
                    id="imagem_mobile"
                    value={formData.imagem_mobile}
                    onChange={(e) => setFormData({ ...formData, imagem_mobile: e.target.value })}
                    placeholder="https://exemplo.com/banner-mobile.jpg (opcional)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Se não informado, será usada a imagem desktop
                  </p>
                  {formData.imagem_mobile && (
                    <img
                      src={formData.imagem_mobile}
                      alt="Preview Mobile"
                      className="w-64 h-32 object-cover rounded mt-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link_url">Link de Destino *</Label>
                  <Input
                    id="link_url"
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                    placeholder="/produtos ou /produto/123"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit">
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
