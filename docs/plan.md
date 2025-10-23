Documento de Requisitos de Produto (PRD): E-commerce de Alimentos (MVP)
1. Introdução e Visão Geral
Este documento descreve os requisitos para o Mínimo Produto Viável (MVP) de uma plataforma web de catálogo de produtos alimentícios resfriados e congelados. O objetivo é criar um canal digital onde clientes (principalmente B2B, como restaurantes, mercados e distribuidores) possam navegar pelo portfólio de produtos, montar uma lista de interesse e enviá-la como uma solicitação de orçamento para a equipe de vendas.
O projeto é inspirado na funcionalidade e apresentação do site friboionline.com.br, mas focado na funcionalidade essencial de catálogo e geração de leads, sem transação financeira online.
2. Público-Alvo
Clientes: Proprietários e compradores de restaurantes, hotéis, supermercados, açougues, distribuidores e outros estabelecimentos do setor alimentício.
Usuário Interno: Equipe comercial/vendas, responsável por receber e processar as solicitações de orçamento.
3. Fluxo Principal do Usuário
O cliente acessa o site.
Navega pelos produtos através de categorias, busca ou banners promocionais na página inicial.
Clica em um produto para ver mais detalhes (descrição, código, informações de embalagem, etc.), sem preço visível.
Adiciona os produtos de interesse à sua "Lista de Orçamento" (similar a uma lista de desejos).
Ao finalizar a seleção, acessa a lista, revisa os itens e clica em "Solicitar Orçamento".
Preenche um formulário simples com seus dados de contato (Nome, Empresa, CNPJ, E-mail, Telefone/WhatsApp).
A plataforma envia um e-mail de notificação com a lista e os dados do cliente para a equipe comercial e uma confirmação para o cliente.
A equipe comercial entra em contato com o cliente para negociar preços, frete e fechar o pedido.
4. Requisitos Funcionais do MVP (Features)
4.1. Módulo Público (O que o cliente vê)
- **Página Inicial (Homepage):** (Concluído)
  - Banner principal rotativo para destaques e promoções.
  - Atalhos visuais para as principais categorias de produtos (ex: Bovinos, Aves, Congelados, Resfriados).
  - Seção de "Produtos em Destaque" ou "Mais Navegados".
  - Cabeçalho com logo, menu de categorias, campo de busca e link para a "Lista de Orçamento".
  - Rodapé com informações institucionais (Sobre Nós, Contato, Políticas).
- **Página de Categoria/Busca (Listagem de Produtos):** (Concluído)
  - Grid de produtos com imagem, nome e código.
  - Filtros básicos (ex: por categoria, por marca se houver).
  - Botão "Ver Produto" ou "Adicionar à Lista" em cada item.
- **Página de Detalhes do Produto:** (Concluído)
  - Galeria de imagens do produto.
  - Nome do produto, código, descrição detalhada.
  - Especificações técnicas (ex: "Caixa: 15 kg a 18 kg, 17 a 19 peças por caixa").
  - Botão em destaque: "Adicionar à Lista de Orçamento".
- **Lista de Orçamento:** (Concluído)
  - Página que resume todos os produtos adicionados pelo cliente.
  - Permite remover itens e ajustar a quantidade (ex: nº de caixas).
  - Formulário de contato para envio da solicitação.
  - Botão principal: "Finalizar e Solicitar Orçamento".
- **Página de Sucesso do Orçamento:** (Concluído)
  - Exibe uma mensagem de sucesso após o envio do orçamento.
- **Página de Contato:** (Concluído)
  - Formulário para contato direto com a empresa.
- **Página Sobre:** (Concluído)
  - Informações sobre a empresa.
- **Página de Fornecedores:** (Concluído)
  - Lista de fornecedores.
- **Página da Área de Atuação:** (Concluído)
  - Informações sobre a área de atuação da empresa.
- **Blog:** (Concluído)
  - Página para postagens de blog.
- **Receitas:** (Concluído)
  - Página para postagens de receitas.
4.2. Módulo Administrativo (O que a sua equipe usa)
- **Painel de Controle (Dashboard):** (Concluído)
  - Acesso via login e senha.
  - Visão geral das últimas solicitações de orçamento recebidas.
- **Gerenciamento de Produtos:** (Concluído)
  - Criar, editar e excluir produtos.
  - Campos: Nome, Código (SKU), Descrição, Imagens, Categoria, Informações de Embalagem.
- **Gerenciamento de Categorias:** (Concluído)
  - Criar, editar e excluir categorias de produtos.
- **Visualização de Orçamentos:** (Concluído)
  - Lista de todas as solicitações recebidas, ordenadas por data.
  - Detalhes de cada solicitação: dados do cliente e lista de produtos/quantidades solicitadas.
  - Status simples (ex: "Novo", "Em Atendimento", "Finalizado") para organização da equipe.
- **Gerenciamento de Usuários:** (NOVO - Concluído)
  - Criar, editar e excluir usuários administradores.
- **Gerenciamento de Banners:** (NOVO - Concluído)
  - Adicionar, editar e remover banners da página inicial.
- **Login Administrativo:** (Concluído)
  - Página de login para a área administrativa.
4.3. Notificações
- **E-mail para a Equipe Comercial:** (Pendente)
  - Disparado automaticamente quando um cliente envia uma solicitação. O e-mail deve conter todos os dados do cliente e a lista completa de produtos.
- **E-mail para o Cliente:** (Pendente)
  - E-mail de confirmação simples, agradecendo pelo contato e informando que a equipe comercial responderá em breve.
5. Requisitos Não Funcionais
- **Design Responsivo:** (Concluído)
  - O site deve funcionar perfeitamente em desktops, tablets e smartphones.
- **Performance:** (Concluído)
  - Carregamento rápido das páginas, especialmente as imagens dos produtos.
- **Segurança:** (Pendente)
  - Proteção básica para o painel administrativo e para os dados dos clientes enviados via formulário.
- **Usabilidade:** (Concluído)
  - Navegação intuitiva e um processo de solicitação de orçamento claro e sem atritos.
6. Design e Identidade Visual (NOVO)
- **Logotipo:** (Concluído)
  - Utilizar a marca "Real Carnes" fornecida.
- **Paleta de Cores:** (Concluído)
  - O design do site deverá seguir a identidade visual estabelecida pelo logotipo. As cores principais a serem utilizadas na interface são:
    - Cor Primária (Destaques, botões, links): Vermelho, extraído do fundo do logo.
    - Cor Secundária (Detalhes, ícones, elementos gráficos): Dourado/Amarelo, extraído da coroa e contornos.
    - Cores de Base (Fundo, texto): Branco, tons de cinza claro para fundos de seção e um cinza escuro/preto para textos, garantindo legibilidade e contraste.
