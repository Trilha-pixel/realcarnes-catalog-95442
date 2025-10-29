import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminUsers, useCreateAdminUser, useUpdateAdminUser, useDeleteAdminUser } from '@/hooks/useAdminUsers';
import type { AdminUser } from '../../../shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';

const UserManagement = () => {
  const { data: users = [], isLoading } = useAdminUsers();
  const createAdminUser = useCreateAdminUser();
  const updateAdminUser = useUpdateAdminUser();
  const deleteAdminUser = useDeleteAdminUser();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'vendedor' as 'admin' | 'vendedor' | 'cliente',
    phone: '',
    company: '',
  });

  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'vendedor' | 'cliente'>('all');

  const handleOpenDialog = (user?: AdminUser) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role as 'admin' | 'vendedor' | 'cliente',
        phone: user.phone || '',
        company: user.company || '',
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'vendedor',
        phone: '',
        company: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
      });
      return;
    }

    if (!editingUser && !formData.password) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'A senha é obrigatória para novos usuários',
      });
      return;
    }

    const userData: any = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone || null,
      company: formData.company || null,
    };

    if (formData.password) {
      userData.password = formData.password;
    }

    try {
      if (editingUser) {
        await updateAdminUser.mutateAsync({
          id: editingUser.id,
          data: userData,
        });
        toast({
          title: 'Usuário atualizado!',
          description: 'As alterações foram salvas com sucesso.',
        });
      } else {
        await createAdminUser.mutateAsync(userData);
        toast({
          title: 'Usuário criado!',
          description: 'O novo usuário foi adicionado.',
        });
      }
      handleCloseDialog();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o usuário.',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteAdminUser.mutateAsync(id);
        toast({
          title: 'Usuário excluído',
          description: 'O usuário foi removido.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível excluir o usuário.',
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
            <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>
            <p className="text-muted-foreground mt-2">
              Administradores, vendedores e clientes cadastrados no sistema
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        <div className="flex gap-2">
          <Button 
            variant={roleFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('all')}
          >
            Todos ({users.length})
          </Button>
          <Button 
            variant={roleFilter === 'admin' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('admin')}
          >
            Admins ({users.filter(u => u.role === 'admin').length})
          </Button>
          <Button 
            variant={roleFilter === 'vendedor' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('vendedor')}
          >
            Vendedores ({users.filter(u => u.role === 'vendedor').length})
          </Button>
          <Button 
            variant={roleFilter === 'cliente' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('cliente')}
          >
            Clientes ({users.filter(u => u.role === 'cliente').length})
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone/Empresa</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.filter(u => roleFilter === 'all' || u.role === roleFilter).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              ) : (
                users.filter(u => roleFilter === 'all' || u.role === roleFilter).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.phone && <div>{user.phone}</div>}
                      {user.company && <div>{user.company}</div>}
                      {!user.phone && !user.company && <span className="text-muted-foreground/50">-</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        user.role === 'admin' ? 'default' : 
                        user.role === 'vendedor' ? 'secondary' : 
                        'outline'
                      }>
                        {user.role === 'admin' ? 'Admin' : user.role === 'vendedor' ? 'Vendedor' : 'Cliente'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(user.id)}
                          disabled={deleteAdminUser.isPending}
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

        {/* User Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados do usuário administrador
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="usuario@royalalimentos.com.br"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha {!editingUser && '*'}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingUser ? 'Deixe em branco para manter' : 'Digite a senha'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Tipo de Usuário *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value as 'admin' | 'vendedor' | 'cliente' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="vendedor">Vendedor</SelectItem>
                      <SelectItem value="cliente">Cliente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 98765-4321"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createAdminUser.isPending || updateAdminUser.isPending}>
                  {(createAdminUser.isPending || updateAdminUser.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
