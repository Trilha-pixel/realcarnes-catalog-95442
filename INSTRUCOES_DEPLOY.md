# 📋 Instruções para Copiar Dados DEV → PROD

## Como Popular o Banco de Produção

Siga estes passos para copiar todos os dados (categorias, produtos, banners, usuários) do banco de desenvolvimento para o banco de produção:

### 1️⃣ Abra o Shell do Replit

No painel inferior do Replit, clique na aba **Shell** ou **Console**.

### 2️⃣ Execute o Script de Cópia

Cole e execute este comando:

```bash
npx tsx server/copy-dev-to-prod.ts
```

### 3️⃣ Aguarde a Conclusão

O script vai copiar:
- ✅ 6 categorias com imagens
- ✅ 476 produtos com todas as fotos
- ✅ Usuários admin e clientes
- ✅ Banners do carrossel

Você verá mensagens como:
```
🚀 Iniciando cópia de dados DEV → PROD...
📦 Copiando categorias...
   ✓ 6 categorias copiadas
📦 Copiando produtos...
   ✓ 50 produtos copiados...
   ✓ 100 produtos copiados...
   ...
   ✓ 476 produtos copiados
✨ Cópia concluída com sucesso!
```

### 4️⃣ Verifique o Site Publicado

Após a cópia, acesse seu site publicado:
- **Site**: https://royalalimentos.replit.app
- **Admin**: https://royalalimentos.replit.app/admin

Login admin:
- Email: `admin@royalalimentos.com.br`
- Senha: `admin123`

## ⚠️ Notas Importantes

- Este script **não apaga** dados existentes, apenas adiciona/atualiza
- Produtos com mesmo SKU serão **atualizados** (não duplicados)
- Categorias com mesmo slug serão **atualizadas**
- Usuários com mesmo email serão **atualizados**
- O script usa `ON CONFLICT` para evitar duplicatas

## 🔄 Para Executar Novamente

Se precisar atualizar a produção com novos dados do dev, basta rodar novamente:

```bash
npx tsx server/copy-dev-to-prod.ts
```

## 🗑️ Limpeza

Após copiar com sucesso, você pode deletar este arquivo e o script:
- `INSTRUCOES_DEPLOY.md` (este arquivo)
- `server/copy-dev-to-prod.ts` (script de cópia)
