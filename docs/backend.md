Documento de Requisitos de Produto (PRD): E-commerce Real Carnes (MVP) BACKEND < -
1. Introdução e Visão Geral ... (sem alteração) ...
2. Público-Alvo ... (sem alteração) ...
3. Fluxo Principal do Usuário (Cliente) ... (sem alteração) ...
4. Requisitos Funcionais do MVP (Features)
4.1. Módulo Público (O que o cliente vê) ... (sem alteração) ...

4.2. Módulo Administrativo (CMS) - Detalhado
Esta seção detalha todas as funcionalidades da área /admin, que será o Centro de Controle do Site (CMS). O acesso é restrito a usuários internos.
4.2.1. Autenticação
Tela de Login (/admin/login): Campos de "E-mail" e "Senha".
Lógica de Mock: Para o MVP, a autenticação será simulada. O frontend irá aceitar um usuário e senha estáticos (ex: admin@realcarnes.com.br / admin123). Se os dados baterem, o usuário é "logado" e pode ver as telas do admin.
4.2.2. Dashboard (Página Inicial do Admin)
Visão geral com estatísticas (widgets) dos dados mock:
Widget: "Novas Solicitações de Orçamento" (contagem de orçamentos com status "Novo").
Widget: "Total de Produtos Cadastrados".
Widget: "Total de Categorias".
Atalho: "Ver Últimas Solicitações".
4.2.3. Gerenciamento de Solicitações de Orçamento
Listagem (Tabela): Exibe todas as solicitações recebidas.
Colunas: Data, Nome do Cliente, Empresa, Status (Novo, Em Atendimento, Finalizado).
Ações: Visualizar, Mudar Status.
Tela de Detalhe: Ao clicar em "Visualizar", o admin vê:
Dados completos do cliente (Nome, Empresa, CNPJ, E-mail, Telefone).
Lista de produtos solicitados (Produto, SKU, Quantidade).
Ação: Mudar o status da solicitação.
4.2.4. Gerenciamento de Catálogo
Produtos (CRUD Completo):
Listagem (Tabela): Imagem, Nome, SKU, Categoria, Status (Ativo/Inativo).
Formulário (Criar/Editar):
Campos: Nome, SKU, Descrição (editor de texto rico), Informações de Embalagem (texto simples), Categoria (dropdown selecionado das categorias cadastradas), Status.
Upload de Mídia: Links URL de imagem ( exemplo: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb2Qltwwrje9Xn8bpmcqYvqOoMuAoRwNH-UA&s ) .
Flag (Checkbox): "Marcar como Destaque" (para aparecer na homepage).
Categorias (CRUD Simples):
Listagem (Tabela): Nome.
Formulário (Criar/Editar): Campo de "Nome da Categoria".
4.2.5. Gerenciamento de Conteúdo do Site (Personalização)
Banners da Homepage:
Interface para gerenciar os banners rotativos.
Listagem: Imagem (miniatura), Link de destino.
Formulário (Criar/Editar): Upload de imagem (desktop), Upload de imagem (mobile - opcional), Link de destino.
Ação: Reordenar os banners (arrastar e soltar).
Usuários Administradores:
Interface para gerenciar quem pode acessar o painel /admin.
Listagem (Tabela): Nome, E-mail, Nível (Admin, Vendedor).
Formulário (Criar/Editar): Nome, E-mail, Senha, Nível (dropdown).
4.3. Notificações ... (sem alteração) ...
5. Requisitos Não Funcionais ... (sem alteração) ...
6. Design e Identidade Visual ... (sem alteração) ...

7. ESTRUTURA DO BACKEND FICTÍCIO (MOCK API)
Esta seção define as estruturas de dados (em formato JSON) que o frontend irá consumir para popular todas as telas, simulando uma API real. Estes dados serão estáticos (armazenados em arquivos .json ou .js dentro do projeto frontend).
7.1. mock_usuarios_admin.json (Para simular login e gerenciar usuários)
JSON
[
  {
    "id": 1,
    "nome": "Admin Master",
    "email": "admin@realcarnes.com.br",
    "senha_mock": "admin123",
    "nivel": "admin"
  },
  {
    "id": 2,
    "nome": "Felipe Vendedor",
    "email": "vendedor@realcarnes.com.br",
    "senha_mock": "vendas123",
    "nivel": "vendedor"
  }
]


7.2. mock_categorias.json (Para listar no menu e no admin)
JSON
[
  { "id": 101, "nome": "Bovinos", "slug": "bovinos" },
  { "id": 102, "nome": "Aves", "slug": "aves" },
  { "id": 103, "nome": "Suínos", "slug": "suinos" },
  { "id": 104, "nome": "Congelados", "slug": "congelados" }
]


7.3. mock_produtos.json (O catálogo principal)
JSON
[
  {
    "id": 1001,
    "sku": "RC-P1001",
    "nome": "Picanha Real Gold (Peça)",
    "descricao": "O corte mais nobre e desejado. A Picanha Real Gold possui uma capa de gordura uniforme que garante maciez e sabor inigualável para o seu churrasco.",
    "especificacoes": "Caixa: Aprox. 18 kg | 12 a 15 peças por caixa",
    "categoria_id": 101,
    "is_destaque": true,
    "status": "ativo",
    "imagens": [
      "https://placehold.co/800x600/b02a37/white?text=Picanha+1",
      "https://placehold.co/800x600/b02a37/white?text=Picanha+2"
    ]
  },
  {
    "id": 1002,
    "sku": "RC-A1002",
    "nome": "Peito de Frango (IQF)",
    "descricao": "Peito de frango em cubos, congelado individualmente (IQF) para facilitar o porcionamento. Perfeito para restaurantes e cozinhas industriais.",
    "especificacoes": "Caixa: 20 kg | 4 pacotes de 5 kg",
    "categoria_id": 102,
    "is_destaque": true,
    "status": "ativo",
    "imagens": [
      "https://placehold.co/800x600/b02a37/white?text=Frango+1"
    ]
  },
  {
    "id": 1003,
    "sku": "RC-S1003",
    "nome": "Costela Suína (Ripa)",
    "descricao": "Costelinha suína em ripa, ideal para assados e barbecue. Carne macia e de alta qualidade.",
    "especificacoes": "Caixa: 15 kg | 8 a 10 peças por caixa",
    "categoria_id": 103,
    "is_destaque": false,
    "status": "ativo",
    "imagens": [
      "https://placehold.co/800x600/b02a37/white?text=Costela+Suina"
    ]
  }
]


7.4. mock_banners_home.json (Para o carrossel da homepage)
JSON
[
  {
    "id": 1,
    "imagem_desktop": "https://placehold.co/1400x450/b02a37/white?text=Banner+Oferta+Picanha",
    "imagem_mobile": "https://placehold.co/800x600/b02a37/white?text=Banner+Picanha+Mobile",
    "link_url": "/produto/1001"
  },
  {
    "id": 2,
    "imagem_desktop": "https://placehold.co/1400x450/e0a800/white?text=Banner+Linha+Aves",
    "imagem_mobile": "https://placehold.co/800x600/e0a800/white?text=Banner+Aves+Mobile",
    "link_url": "/categoria/aves"
  }
]


7.5. mock_solicitacoes_orcamento.json (Para o painel admin)
JSON
[
  {
    "id": 9001,
    "data": "2025-10-20T14:30:00Z",
    "status": "novo",
    "cliente_nome": "João Silva",
    "cliente_empresa": "Restaurante Sabor & Arte",
    "cliente_cnpj": "12.345.678/0001-99",
    "cliente_email": "compras@saborearte.com",
    "cliente_telefone": "11988887777",
    "itens_solicitados": [
      { "produto_id": 1001, "produto_nome": "Picanha Real Gold (Peça)", "quantidade": 2 },
      { "produto_id": 1003, "produto_nome": "Costela Suína (Ripa)", "quantidade": 5 }
    ]
  },
  {
    "id": 9002,
    "data": "2025-10-19T10:15:00Z",
    "status": "em_atendimento",
    "cliente_nome": "Maria Souza",
    "cliente_empresa": "Mercado Central",
    "cliente_cnpj": "98.765.432/0001-11",
    "cliente_email": "maria.souza@mercadocentral.com",
    "cliente_telefone": "21977776666",
    "itens_solicitados": [
      { "produto_id": 1002, "produto_nome": "Peito de Frango (IQF)", "quantidade": 10 }
    ]
  }
]
