# 📦 Como Importar Produtos via CSV

## 🚀 Funcionalidade Criada

Foi criado um **botão de importação CSV** na página de gerenciamento de produtos do admin que permite importar centenas de produtos de uma só vez!

## 📍 Localização

**URL:** `https://royalalimentos.replit.app/admin/produtos`

**Botão:** "Importar CSV" (ao lado do botão "Novo Produto")

## 📝 Formato do CSV

O arquivo CSV deve ter as seguintes colunas:

```csv
id,sku,name,description,packaging,category_id,featured,status,images,created_at,updated_at
```

### Explicação dos Campos:

- **id**: Pode ser qualquer número (será ignorado, o sistema cria IDs automáticos)
- **sku**: Código único do produto (OBRIGATÓRIO)
- **name**: Nome do produto (OBRIGATÓRIO)
- **description**: Descrição completa do produto
- **packaging**: Informação da embalagem (ex: "Caixa com 10kg")
- **category_id**: ID da categoria (1=Bovinos, 2=Suínos, 3=Aves, 4=Congelados, 5=Resfriados, 6=Especiais)
- **featured**: Se é produto destaque (true ou false)
- **status**: Status do produto (active ou inactive)
- **images**: URLs das imagens em formato JSON array (ex: `["url1","url2"]`)
- **created_at**: Data de criação (pode ser qualquer data)
- **updated_at**: Data de atualização (pode ser qualquer data)

## 📋 Processo de Importação

1. **Faça login** no admin com:
   - Email: `admin@royalalimentos.com.br`
   - Senha: `admin123`

2. **Acesse** a página de produtos:
   - Clique em "Produtos" no menu lateral

3. **Clique** no botão "Importar CSV"

4. **Selecione** seu arquivo CSV

5. **Aguarde** o processamento:
   - O sistema mostra o progresso
   - Produtos com SKU existente são atualizados
   - Produtos novos são criados

6. **Verifique** os resultados:
   - O sistema mostra quantos foram importados
   - Quantos foram atualizados
   - Quantos tiveram erros

## 🎯 Arquivo de Exemplo

Criamos um arquivo de exemplo em:
`/public/exemplo-produtos.csv`

Você pode baixá-lo em:
`https://royalalimentos.replit.app/exemplo-produtos.csv`

## ✨ Características do Sistema

- **Importação em Massa**: Processa centenas de produtos de uma vez
- **Atualização Inteligente**: Se o SKU já existe, atualiza o produto
- **Feedback Visual**: Mostra progresso durante importação
- **Tratamento de Erros**: Continua importação mesmo se alguns produtos falharem
- **Parser Robusto**: Lida com vírgulas e aspas dentro dos campos

## 🔧 Detalhes Técnicos

### Frontend
- **Arquivo**: `src/pages/admin/ProductManagement.tsx`
- **Parser CSV**: Implementado diretamente no componente
- **Validação**: Verifica formato antes de enviar

### Backend
- **Endpoint**: `POST /api/products/bulk-import`
- **Arquivo**: `server/routes.ts`
- **Lógica**: Upsert (cria ou atualiza) baseado no SKU

## 📊 Exemplo de CSV Válido

```csv
id,sku,name,description,packaging,category_id,featured,status,images,created_at,updated_at
1,TESTE-001,Picanha Premium,Corte nobre para churrasco,Caixa 15kg,1,true,active,"[""https://exemplo.com/picanha.jpg""]",2025-10-31,2025-10-31
2,TESTE-002,Frango Inteiro,Frango caipira de qualidade,Unidade 2kg,3,false,active,"[""https://exemplo.com/frango.jpg""]",2025-10-31,2025-10-31
```

## ⚠️ Dicas Importantes

1. **Sempre use aspas duplas** para campos com vírgulas
2. **O campo images** deve ser um array JSON válido
3. **SKUs duplicados** no mesmo arquivo serão processados apenas uma vez
4. **Categorias**: Use os IDs corretos (1-6)
5. **Featured**: Use exatamente "true" ou "false" (minúsculas)

## 🎉 Pronto!

Agora você pode importar todos os 476 produtos de uma vez usando o arquivo CSV que você tem!

Basta ajustar o formato do seu arquivo seguindo o padrão acima e fazer o upload.