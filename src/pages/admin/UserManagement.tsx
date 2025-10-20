import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useMockData, AdminUser } from '@/contexts/MockDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

const UserManagement = () => {
  const { getAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } = useMockData();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha_mock: '',
    nivel: 'vendedor' as 'admin' | 'vendedor',
  });

  const users = getAdminUsers();

  const handleOpenDialog = (user?: AdminUser) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nome: user.nome,
        email: user.email,
        senha_mock: '',
        nivel: user.nivel,
      });
    } else {
      setEditingUser(null);
      setFormData({
        nome: '',
        email: '',
        senha_mock: '',
        nivel: 'vendedor',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
      });
      return;
    }

    if (!editingUser && !formData.senha_mock) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'A senha é obrigatória para novos usuários',
      });
      return;
    }

    const userData: any = {
      nome: formData.nome,
      email: formData.email,
      nivel: formData.nivel,
    };

    if (formData.senha_mock) {
      userData.senha_mock = formData.senha_mock;
    }

    if (editingUser) {
      updateAdminUser(editingUser.id, userData);
      toast({
        title: 'Usuário atualizado!',
        description: 'As alterações foram salvas com sucesso.',
      });
    } else {
      createAdminUser(userData);
      toast({
        title: 'Usuário criado!',
        description: 'O novo usuário foi adicionado.',
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      deleteAdminUser(id);
      toast({
        title: 'Usuário excluído',
        description: 'O usuário foi removido.',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gerenciar Usuários Admin</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie os usuários com acesso ao painel administrativo
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.nome}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.nivel === 'admin' ? 'default' : 'secondary'}>
                        {user.nivel === 'admin' ? 'Administrador' : 'Vendedor'}
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
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
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
                    placeholder="usuario@realcarnes.com.br"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha">Senha {!editingUser && '*'}</Label>
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha_mock}
                    onChange={(e) => setFormData({ ...formData, senha_mock: e.target.value })}
                    placeholder={editingUser ? 'Deixe em branco para manter' : 'Digite a senha'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nivel">Nível de Acesso *</Label>
                  <Select
                    value={formData.nivel}
                    onValueChange={(value) => setFormData({ ...formData, nivel: value as 'admin' | 'vendedor' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="vendedor">Vendedor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit">
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
