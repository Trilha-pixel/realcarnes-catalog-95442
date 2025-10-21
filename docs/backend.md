# Plano de Implementação do Backend

## 1. Introdução e Objetivo

Este documento descreve o plano para a construção e integração de um backend robusto para a aplicação de e-commerce, substituindo a atual camada de dados mockados. O objetivo é criar uma API RESTful que servirá o frontend, gerenciará os dados em um banco de dados PostgreSQL e implementará a lógica de negócio necessária.

## 2. Tecnologias (Stack)

Para manter a consistência com o ecossistema JavaScript/TypeScript do frontend, o backend será desenvolvido com:

*   **Ambiente de Execução**: Node.js
*   **Framework**: Express.js para a criação do servidor e das rotas da API.
*   **Linguagem**: TypeScript para garantir a tipagem e a escalabilidade do código.
*   **Banco de Dados**: PostgreSQL, conforme solicitado.
*   **ORM**: Prisma para a modelagem dos dados, migrações e acesso ao banco de dados.
*   **Autenticação**: JWT (JSON Web Tokens) para proteger as rotas do painel administrativo.
*   **Validação de Dados**: Zod (já presente no projeto) para validar os dados de entrada das requisições.
*   **Gerenciador de Pacotes**: NPM ou Yarn.

## 3. Estrutura do Projeto

O código do backend será organizado em um novo diretório `backend/` na raiz do projeto para manter a separação de responsabilidades com o frontend.

```
/backend
|-- /prisma
|   |-- schema.prisma
|   |-- migrations/
|-- /src
|   |-- /config
|   |-- /controllers
|   |-- /middlewares
|   |-- /routes
|   |-- /services
|   |-- /utils
|   |-- server.ts
|-- .env
|-- package.json
|-- tsconfig.json
```

## 4. Fases de Implementação

### Fase 1: Configuração do Ambiente e Banco de Dados

1.  **Inicialização do Projeto**:
    *   Criar o diretório `backend/`.
    *   Inicializar um novo projeto Node.js com `npm init`.
    *   Configurar o TypeScript (`tsconfig.json`).
2.  **Instalação de Dependências**:
    *   `express`, `cors`, `dotenv`.
    *   `prisma`, `@prisma/client`, `pg`.
    *   Dependências de desenvolvimento: `typescript`, `ts-node`, `nodemon`, `@types/*`.
3.  **Configuração do Prisma**:
    *   Executar `npx prisma init` para configurar o Prisma e a conexão com o PostgreSQL.
    *   Definir os modelos de dados no `schema.prisma` com base nas funcionalidades do `docs/plan.md` (Produtos, Categorias, Usuários, Orçamentos, Banners).
4.  **Migração do Banco de Dados**:
    *   Executar `npx prisma migrate dev` para criar as tabelas no banco de dados PostgreSQL com base no schema.

### Fase 2: Desenvolvimento da API (Endpoints Públicos)

Criar as rotas, controllers e services para as funcionalidades que não exigem autenticação.

*   **Produtos**:
    *   `GET /products`: Listar todos os produtos (com filtros e paginação).
    *   `GET /products/:id`: Obter detalhes de um produto específico.
*   **Categorias**:
    *   `GET /categories`: Listar todas as categorias.
*   **Banners**:
    *   `GET /banners`: Listar banners da página inicial.
*   **Orçamentos**:
    *   `POST /quotes`: Enviar uma nova solicitação de orçamento.

### Fase 3: Desenvolvimento da API (Endpoints Administrativos)

Implementar a lógica de autenticação e os endpoints para o painel de gerenciamento.

1.  **Autenticação**:
    *   `POST /admin/login`: Endpoint para login de administradores, retornando um token JWT.
    *   Criar um middleware de autenticação (`authMiddleware`) para verificar o token JWT em rotas protegidas.
2.  **Endpoints CRUD (Create, Read, Update, Delete)**:
    *   `GET, POST, PUT, DELETE /admin/products`: Gerenciamento de produtos.
    *   `GET, POST, PUT, DELETE /admin/categories`: Gerenciamento de categorias.
    *   `GET, POST, PUT, DELETE /admin/banners`: Gerenciamento de banners.
    *   `GET, PUT /admin/quotes`: Visualização e atualização de status dos orçamentos.
    *   `GET, POST, PUT, DELETE /admin/users`: Gerenciamento de usuários administrativos.

### Fase 4: Integração com o Frontend

Modificar a aplicação React para consumir a nova API.

1.  **Configuração do Ambiente**:
    *   Configurar um proxy no `vite.config.ts` para facilitar as chamadas à API durante o desenvolvimento.
2.  **Substituição dos Dados Mock**:
    *   Remover o `MockDataContext` e toda a lógica de dados estáticos.
3.  **Criação dos Serviços da API**:
    *   Implementar funções (ou hooks como `useQuery` e `useMutation` do TanStack Query) para realizar as chamadas `fetch` ou `axios` aos endpoints do backend.
4.  **Atualização dos Componentes**:
    *   Conectar todas as páginas e componentes (`Home`, `Products`, `ProductDetail`, `Admin`, etc.) para usar os dados vindos da API.
    *   Implementar o tratamento de estados de carregamento (`loading`) e erro (`error`).
    *   Integrar o fluxo de login do painel administrativo com o endpoint de autenticação.

### Fase 5: Funcionalidades Adicionais e Finalização

1.  **Envio de E-mails**:
    *   Integrar uma biblioteca como `Nodemailer` ao serviço de criação de orçamentos para disparar os e-mails de notificação (`[PENDENTE - BACKEND]` no `plan.md`).
2.  **Validação e Segurança**:
    *   Aplicar validação com Zod em todas as rotas para garantir a integridade dos dados.
    *   Revisar as configurações de CORS e outras medidas de segurança básicas.
3.  **Documentação da API**:
    *   (Opcional, mas recomendado) Gerar documentação da API usando ferramentas como Swagger ou OpenAPI.
4.  **Variáveis de Ambiente**:
    *   Garantir que todas as informações sensíveis (conexão com o banco, segredo do JWT) estejam em variáveis de ambiente (`.env`).
