# Plano de Implementação do Backend

Este documento descreve o plano para criar o backend da aplicação de e-commerce, substituindo os dados mock por uma API real com um banco de dados PostgreSQL.

## 1. Configuração do Projeto Backend

- **1.1. Estrutura de Diretórios:**
  - Criar um diretório `backend` na raiz do projeto para isolar o código do servidor.
- **1.2. Inicialização e Dependências:**
  - Dentro de `backend`, inicializar um novo projeto Node.js com `npm init -y`.
  - Instalar as dependências principais:
    - `express`: Para criar o servidor e as rotas da API.
    - `pg`: Driver para conectar com o banco de dados PostgreSQL.
    - `cors`: Para habilitar requisições entre o frontend e o backend.
    - `dotenv`: Para gerenciar variáveis de ambiente (como senhas e portas).
    - `jsonwebtoken`: Para autenticação de usuários administradores.
    - `bcryptjs`: Para criptografar senhas.
  - Instalar as dependências de desenvolvimento:
    - `nodemon`: Para reiniciar o servidor automaticamente durante o desenvolvimento.
- **1.3. Script de Início:**
  - Configurar um script `dev` no `package.json` do backend para iniciar o servidor com `nodemon`.

## 2. Configuração do Banco de Dados

- **2.1. Banco de Dados:**
  - Utilizar PostgreSQL.
  - Criar um banco de dados chamado `real_carnes_db`.
- **2.2. Schema do Banco de Dados:**
  - Definir e criar as seguintes tabelas:
    - `produtos`: Para armazenar os detalhes dos produtos.
    - `categorias`: Para agrupar os produtos.
    - `pedidos_orcamento`: Para armazenar os pedidos de orçamento enviados pelos clientes.
    - `itens_pedido_orcamento`: Para os produtos dentro de cada pedido.
    - `usuarios_admin`: Para os administradores do sistema.
    - `banners`: Para os banners da página inicial.
- **2.3. Migrations (Opcional, mas recomendado):**
  - Utilizar uma ferramenta como `node-pg-migrate` para gerenciar as alterações no schema do banco de dados de forma versionada.

## 3. Desenvolvimento da API

- **3.1. Estrutura da API:**
  - Organizar o código em rotas, controladores e modelos para manter a separação de responsabilidades.
- **3.2. Endpoints da API (CRUD):**
  - **Produtos:**
    - `GET /api/produtos`: Listar todos os produtos com filtros por categoria.
    - `GET /api/produtos/:id`: Obter detalhes de um produto específico.
    - `POST /api/produtos`: (Admin) Criar um novo produto.
    - `PUT /api/produtos/:id`: (Admin) Atualizar um produto.
    - `DELETE /api/produtos/:id`: (Admin) Deletar um produto.
  - **Categorias:**
    - `GET /api/categorias`: Listar todas as categorias.
    - `POST /api/categorias`: (Admin) Criar uma nova categoria.
    - `PUT /api/categorias/:id`: (Admin) Atualizar uma categoria.
  - **Pedidos de Orçamento:**
    - `POST /api/pedidos-orcamento`: Criar um novo pedido de orçamento.
    - `GET /api/pedidos-orcamento`: (Admin) Listar todos os pedidos.
    - `GET /api/pedidos-orcamento/:id`: (Admin) Obter detalhes de um pedido.
  - **Banners:**
    - `GET /api/banners`: Listar todos os banners.
    - `POST /api/banners`: (Admin) Adicionar um novo banner.
    - `DELETE /api/banners/:id`: (Admin) Remover um banner.
- **3.3. Autenticação:**
  - Criar um endpoint `POST /api/admin/login` para autenticar usuários administradores.
  - Proteger as rotas de administração com um middleware que verifica o token JWT.

## 4. Integração com o Frontend

- **4.1. Remoção dos Dados Mock:**
  - Remover o `MockDataContext` e todos os seus usos.
- **4.2. Requisições à API:**
  - Utilizar `fetch` ou `axios` para fazer as chamadas à nova API a partir dos componentes React.
  - Configurar um proxy no `vite.config.ts` para facilitar as requisições durante o desenvolvimento e evitar problemas de CORS.
- **4.3. Gerenciamento de Estado:**
  - Utilizar `react-query` (que já está no projeto) para gerenciar o estado dos dados, cache, e o estado de carregamento/erro das requisições.
- **4.4. Formulários:**
  - Conectar os formulários de contato e de pedido de orçamento para enviar os dados para a API.

## 5. Próximos Passos e Melhorias

- **5.1. Validação:**
  - Implementar validação de dados tanto no frontend (com `zod`) quanto no backend para garantir a integridade dos dados.
- **5.2. Testes:**
  - Criar testes unitários e de integração para a API.
- **5.3. Deploy:**
  - Criar um plano para o deploy do backend e do banco de dados.
