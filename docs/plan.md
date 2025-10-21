# Documento de Requisitos de Produto (PRD): E-commerce de Alimentos (MVP)

## 1. Introdução e Visão Geral

Este documento descreve os requisitos para o Mínimo Produto Viável (MVP) de uma plataforma web de catálogo de produtos alimentícios resfriados e congelados. O objetivo é criar um canal digital onde clientes (principalmente B2B, como restaurantes, mercados e distribuidores) possam navegar pelo portfólio de produtos, montar uma lista de interesse e enviá-la como uma solicitação de orçamento para a equipe de vendas.

O projeto é inspirado na funcionalidade e apresentação do site friboionline.com.br, mas focado na funcionalidade essencial de catálogo e geração de leads, sem transação financeira online.

## 2. Público-Alvo

*   **Clientes**: Proprietários e compradores de restaurantes, hotéis, supermercados, açougues, distribuidores e outros estabelecimentos do setor alimentício.
*   **Usuário Interno**: Equipe comercial/vendas, responsável por receber e processar as solicitações de orçamento.

## 3. Fluxo Principal do Usuário

1.  O cliente acessa o site.
2.  Navega pelos produtos através de categorias, busca ou banners promocionais na página inicial.
3.  Clica em um produto para ver mais detalhes (descrição, código, informações de embalagem, etc.), sem preço visível.
4.  Adiciona os produtos de interesse à sua "Lista de Orçamento" (similar a uma lista de desejos).
5.  Ao finalizar a seleção, acessa a lista, revisa os itens e clica em "Solicitar Orçamento".
6.  Preenche um formulário simples com seus dados de contato (Nome, Empresa, CNPJ, E-mail, Telefone/WhatsApp).
7.  A plataforma envia um e-mail de notificação com a lista e os dados do cliente para a equipe comercial e uma confirmação para o cliente.
8.  A equipe comercial entra em contato com o cliente para negociar preços, frete e fechar o pedido.

## 4. Requisitos Funcionais do MVP (Features)

### 4.1. Módulo Público (O que o cliente vê)

*   **Página Inicial (Homepage)**: `[CONCLUÍDO]`
    *   Banner principal rotativo para destaques e promoções.
    *   Atalhos visuais para as principais categorias de produtos.
    *   Seção de "Produtos em Destaque".
    *   Cabeçalho com logo, menu, busca e link para "Lista de Orçamento".
    *   Rodapé com informações institucionais.
*   **Página de Categoria/Busca (Listagem de Produtos)**: `[CONCLUÍDO]`
    *   Grid de produtos com imagem, nome e código.
    *   Filtros básicos (por categoria).
    *   Botão "Adicionar à Lista" em cada item.
*   **Página de Detalhes do Produto**: `[CONCLUÍDO]`
    *   Galeria de imagens do produto.
    *   Nome, código e descrição detalhada.
    *   Especificações técnicas.
    *   Botão "Adicionar à Lista de Orçamento".
*   **Lista de Orçamento**: `[CONCLUÍDO]`
    *   Página que resume todos os produtos adicionados.
    *   Permite remover itens.
    *   Formulário de contato para envio da solicitação.
    *   Botão "Finalizar e Solicitar Orçamento".
*   **Página de Login do Cliente**: `[CONCLUÍDO]`
    *   Formulário para que clientes recorrentes possam acessar seu histórico.

### 4.2. Módulo Administrativo (O que a sua equipe usa)

*   **Acesso via login e senha**: `[CONCLUÍDO]`
*   **Painel de Controle (Dashboard)**: `[CONCLUÍDO]`
    *   Visão geral das últimas solicitações de orçamento recebidas.
*   **Gerenciamento de Produtos**: `[CONCLUÍDO]`
    *   Criar, editar e excluir produtos (Nome, Código, Descrição, Imagens, Categoria, etc.).
*   **Gerenciamento de Categorias**: `[CONCLUÍDO]`
    *   Criar, editar e excluir categorias de produtos.
*   **Gerenciamento de Banners**: `[CONCLUÍDO]`
    *   Adicionar, editar e remover banners da página inicial.
*   **Visualização de Orçamentos**: `[CONCLUÍDO]`
    *   Lista de todas as solicitações recebidas.
    *   Detalhes de cada solicitação (dados do cliente e produtos).
    *   Status simples (ex: "Novo", "Em Atendimento").
*   **Gerenciamento de Usuários**: `[CONCLUÍDO]`
    *   Criar, editar e remover contas de usuários administrativos.

### 4.3. Notificações

*   **E-mail para a Equipe Comercial**: `[PENDENTE - BACKEND]`
    *   Disparado quando um cliente envia uma solicitação.
*   **E-mail para o Cliente**: `[PENDENTE - BACKEND]`
    *   E-mail de confirmação após o envio da solicitação.

## 5. Requisitos Não Funcionais

*   **Design Responsivo**: `[CONCLUÍDO]`
    *   O site deve funcionar em desktops, tablets e smartphones.
*   **Performance**: `[CONCLUÍDO]`
    *   Carregamento rápido das páginas e imagens.
*   **Segurança**: `[PENDENTE - BACKEND]`
    *   Proteção para o painel administrativo e dados dos clientes.
*   **Usabilidade**: `[CONCLUÍDO]`
    *   Navegação intuitiva e processo de solicitação claro.

## 6. Design e Identidade Visual

*   **Logotipo**: `[CONCLUÍDO]`
    *   Utilizar a marca "Real Carnes".
*   **Paleta de Cores**: `[CONCLUÍDO]`
    *   O design seguirá a identidade visual do logotipo, com cores primárias (vermelho), secundárias (dourado/amarelo) e de base (branco, cinza, preto).
