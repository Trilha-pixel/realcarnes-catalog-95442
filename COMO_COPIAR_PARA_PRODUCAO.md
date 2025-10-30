# 🚀 Como Copiar Dados do DEV para PRODUÇÃO

## ✅ Passo 1: EXPORTAÇÃO (JÁ CONCLUÍDO!)

O arquivo `database-export.json` foi criado com sucesso contendo:
- ✅ 6 categorias
- ✅ 476 produtos
- ✅ 3 usuários
- ✅ 4 banners
- ✅ 2 quote requests
- ✅ 4 quote items

## 📥 Passo 2: IMPORTAR PARA PRODUÇÃO

### Opção A: Via Replit Database Console (MAIS FÁCIL) ⭐

1. **Abra o painel do Replit Database**
   - No menu lateral esquerdo, clique no ícone de banco de dados
   - Selecione **"Production Database"** no dropdown superior

2. **Acesse o Console SQL**
   - Na aba Production Database, procure por "Console" ou "Query"
   - Você verá um editor SQL onde pode executar comandos

3. **Execute o script de importação**
   - Cole o conteúdo do arquivo abaixo no console SQL
   - Execute linha por linha ou tudo de uma vez

**MAS ATENÇÃO:** A interface do Replit pode não suportar scripts TypeScript diretamente.

### Opção B: Via Shell do Deployment (RECOMENDADO) ⭐⭐⭐

Esta é a forma mais confiável de importar os dados:

1. **Publique seu app** (se ainda não publicou)
   - Clique em "Deploy" no Replit
   - Aguarde o deployment ser publicado

2. **Acesse o Shell do Deployment**
   - No Replit, vá para a seção "Deployments"
   - Clique no deployment ativo
   - Procure por "Shell" ou "Console" na interface do deployment

3. **Faça upload do arquivo JSON**
   - Você precisa copiar o arquivo `database-export.json` para o ambiente de produção
   - No Replit, você pode fazer isso através da interface de arquivos

4. **Execute o script de importação**
   ```bash
   npx tsx server/import-database.ts
   ```

### Opção C: Importação Manual via SQL (ALTERNATIVA)

Se as opções acima não funcionarem, vou gerar um script SQL puro que você pode executar diretamente no banco de produção.

## 🔧 Opção D: Script SQL Automatizado (VAMOS FAZER ISSO!)

Vou criar um script SQL que você pode executar diretamente no banco de produção através da interface do Replit Database.

Execute o comando abaixo no Shell do Replit (ambiente de DESENVOLVIMENTO):

```bash
npx tsx server/generate-sql-import.ts
```

Isso vai gerar um arquivo `import-production.sql` que você pode:
1. Abrir no Replit
2. Copiar o conteúdo
3. Colar no console SQL do banco de produção
4. Executar

---

## ⚠️ IMPORTANTE

- O script usa `ON CONFLICT DO UPDATE`, então não vai duplicar dados
- Produtos com mesmo SKU serão atualizados
- Categorias com mesmo slug serão atualizadas
- Usuários com mesmo email serão atualizados

## 🆘 Precisa de Ajuda?

Se nenhuma dessas opções funcionar, me avise que vou criar uma solução personalizada!
