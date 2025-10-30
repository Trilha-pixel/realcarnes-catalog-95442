// Royal Alimentos - API Routes
// Reference: blueprint:javascript_database integration

import type { Express } from "express";
import { storage } from "./storage";
import {
  insertCategorySchema,
  insertProductSchema,
  insertAdminUserSchema,
  insertBannerSchema,
  insertQuoteRequestSchema,
  insertQuoteItemSchema,
} from "@shared/schema";

export function registerRoutes(app: Express) {
  // ==========================================
  // CATEGORIES ROUTES
  // ==========================================
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const category = await storage.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.get("/api/categories/slug/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).json({ error: "Invalid category data" });
    }
  });

  app.patch("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const category = await storage.updateCategory(id, req.body);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(400).json({ error: "Failed to update category" });
    }
  });

  app.delete("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteCategory(id);
      if (!success) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  // ==========================================
  // PRODUCTS ROUTES
  // ==========================================
  app.get("/api/products", async (req, res) => {
    try {
      const filters: any = {};
      if (req.query.categoryId) filters.categoryId = parseInt(req.query.categoryId as string);
      if (req.query.featured !== undefined) filters.featured = req.query.featured === "true";
      if (req.query.search) filters.search = req.query.search as string;

      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/products/sku/:sku", async (req, res) => {
    try {
      const product = await storage.getProductBySku(req.params.sku);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.patch("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.updateProduct(id, req.body);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(400).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProduct(id);
      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // ==========================================
  // ADMIN USERS ROUTES
  // ==========================================
  app.get("/api/admin/users", async (req, res) => {
    try {
      const users = await storage.getAdminUsers();
      // Remove passwords from response
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getAdminUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/users", async (req, res) => {
    try {
      const validatedData = insertAdminUserSchema.parse(req.body);
      const user = await storage.createAdminUser(validatedData);
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating admin user:", error);
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.patch("/api/admin/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.updateAdminUser(id, req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating admin user:", error);
      res.status(400).json({ error: "Failed to update user" });
    }
  });

  app.delete("/api/admin/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAdminUser(id);
      if (!success) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting admin user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // ==========================================
  // PUBLIC AUTH ROUTES (Cliente Registration & Login)
  // ==========================================
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, password, phone, company } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getAdminUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "Email já cadastrado" });
      }
      
      // Create new client user
      const validatedData = insertAdminUserSchema.parse({
        name,
        email,
        password,
        phone: phone || null,
        company: company || null,
        role: "cliente",
      });
      
      const user = await storage.createAdminUser(validatedData);
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(400).json({ error: "Erro ao criar cadastro" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getAdminUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Email ou senha incorretos" });
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  });

  // ==========================================
  // BANNERS ROUTES
  // ==========================================
  app.get("/api/banners", async (req, res) => {
    try {
      const banners = await storage.getBanners();
      res.json(banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
      res.status(500).json({ error: "Failed to fetch banners" });
    }
  });

  app.post("/api/banners", async (req, res) => {
    try {
      const validatedData = insertBannerSchema.parse(req.body);
      const banner = await storage.createBanner(validatedData);
      res.status(201).json(banner);
    } catch (error) {
      console.error("Error creating banner:", error);
      res.status(400).json({ error: "Invalid banner data" });
    }
  });

  app.patch("/api/banners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const banner = await storage.updateBanner(id, req.body);
      if (!banner) {
        return res.status(404).json({ error: "Banner not found" });
      }
      res.json(banner);
    } catch (error) {
      console.error("Error updating banner:", error);
      res.status(400).json({ error: "Failed to update banner" });
    }
  });

  app.delete("/api/banners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBanner(id);
      if (!success) {
        return res.status(404).json({ error: "Banner not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting banner:", error);
      res.status(500).json({ error: "Failed to delete banner" });
    }
  });

  app.post("/api/banners/reorder", async (req, res) => {
    try {
      const { orderedIds } = req.body;
      const success = await storage.reorderBanners(orderedIds);
      if (!success) {
        return res.status(400).json({ error: "Failed to reorder banners" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error reordering banners:", error);
      res.status(500).json({ error: "Failed to reorder banners" });
    }
  });

  // ==========================================
  // QUOTE REQUESTS ROUTES
  // ==========================================
  app.get("/api/quotes", async (req, res) => {
    try {
      const filters: any = {};
      if (req.query.status) filters.status = req.query.status as string;

      const quotes = await storage.getQuoteRequests(filters);
      
      // Include items for each quote
      const quotesWithItems = await Promise.all(
        quotes.map(async (quote) => {
          const items = await storage.getQuoteItemsByRequestId(quote.id);
          return { ...quote, items };
        })
      );
      
      res.json(quotesWithItems);
    } catch (error) {
      console.error("Error fetching quote requests:", error);
      res.status(500).json({ error: "Failed to fetch quote requests" });
    }
  });

  app.get("/api/quotes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const quote = await storage.getQuoteRequestById(id);
      if (!quote) {
        return res.status(404).json({ error: "Quote request not found" });
      }
      
      // Get quote items
      const items = await storage.getQuoteItemsByRequestId(id);
      res.json({ ...quote, items });
    } catch (error) {
      console.error("Error fetching quote request:", error);
      res.status(500).json({ error: "Failed to fetch quote request" });
    }
  });

  app.post("/api/quotes", async (req, res) => {
    try {
      const { items, ...quoteData } = req.body;
      
      // Validate quote data
      const validatedQuote = insertQuoteRequestSchema.parse(quoteData);
      const quote = await storage.createQuoteRequest(validatedQuote);
      
      // Create quote items
      if (items && Array.isArray(items)) {
        for (const item of items) {
          const validatedItem = insertQuoteItemSchema.parse({
            ...item,
            quoteRequestId: quote.id,
          });
          await storage.createQuoteItem(validatedItem);
        }
      }
      
      res.status(201).json(quote);
    } catch (error) {
      console.error("Error creating quote request:", error);
      res.status(400).json({ error: "Invalid quote data" });
    }
  });

  app.patch("/api/quotes/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      const quote = await storage.updateQuoteRequestStatus(id, status);
      if (!quote) {
        return res.status(404).json({ error: "Quote request not found" });
      }
      res.json(quote);
    } catch (error) {
      console.error("Error updating quote status:", error);
      res.status(400).json({ error: "Failed to update quote status" });
    }
  });

  app.delete("/api/quotes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Delete quote items first
      await storage.deleteQuoteItemsByRequestId(id);
      
      // Delete quote request
      const success = await storage.deleteQuoteRequest(id);
      if (!success) {
        return res.status(404).json({ error: "Quote request not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting quote request:", error);
      res.status(500).json({ error: "Failed to delete quote request" });
    }
  });

  // ==========================================
  // IMPORT PRODUCTION DATA
  // ==========================================
  app.post("/api/import-production-data", async (req, res) => {
    try {
      // Importar dados do arquivo JSON exportado
      const fs = await import('fs');
      const path = await import('path');
      
      console.log('📥 Starting data import...');
      
      // Ler arquivo JSON exportado
      const exportFilePath = path.join(process.cwd(), 'database-export.json');
      
      if (!fs.existsSync(exportFilePath)) {
        return res.status(404).json({ 
          error: 'Arquivo database-export.json não encontrado. Execute o script de exportação primeiro.' 
        });
      }
      
      const data = JSON.parse(fs.readFileSync(exportFilePath, 'utf-8'));
      const results: any = {
        categories: 0,
        products: 0,
        adminUsers: 0,
        banners: 0,
        quoteRequests: 0,
        quoteItems: 0,
      };

      // 1. IMPORTAR CATEGORIAS
      console.log('📦 Importando categorias...');
      const categoryIdMap = new Map();
      
      for (const cat of data.categories) {
        const { id, ...categoryData } = cat;
        try {
          // Tenta criar ou buscar categoria existente
          let category = await storage.getCategoryBySlug(categoryData.slug);
          if (!category) {
            category = await storage.createCategory(categoryData);
          } else {
            category = await storage.updateCategory(category.id, categoryData);
          }
          categoryIdMap.set(id, category.id);
          results.categories++;
        } catch (err) {
          console.error(`Erro ao importar categoria ${categoryData.name}:`, err);
        }
      }

      // 2. IMPORTAR PRODUTOS
      console.log('📦 Importando produtos...');
      const productIdMap = new Map();
      
      for (const prod of data.products) {
        const { id, categoryId, createdAt, updatedAt, ...productData } = prod;
        const mappedCategoryId = categoryIdMap.get(categoryId) || categoryId;
        
        try {
          // Tenta buscar produto existente pelo SKU
          const existingProduct = await storage.getProductBySku(productData.sku);
          let product;
          
          if (!existingProduct) {
            product = await storage.createProduct({
              ...productData,
              categoryId: mappedCategoryId,
            });
          } else {
            product = await storage.updateProduct(existingProduct.id, {
              ...productData,
              categoryId: mappedCategoryId,
            });
          }
          
          productIdMap.set(id, product.id);
          results.products++;
          
          if (results.products % 50 === 0) {
            console.log(`   ✓ ${results.products} produtos importados...`);
          }
        } catch (err) {
          console.error(`Erro ao importar produto ${productData.sku}:`, err);
        }
      }

      // 3. IMPORTAR USUÁRIOS
      console.log('👤 Importando usuários...');
      for (const user of data.adminUsers) {
        const { id, createdAt, ...userData } = user;
        
        try {
          const existingUser = await storage.getAdminUserByEmail(userData.email);
          if (!existingUser) {
            await storage.createAdminUser(userData);
          } else {
            await storage.updateAdminUser(existingUser.id, userData);
          }
          results.adminUsers++;
        } catch (err) {
          console.error(`Erro ao importar usuário ${userData.email}:`, err);
        }
      }

      // 4. IMPORTAR BANNERS
      console.log('🎨 Importando banners...');
      // Limpa banners existentes
      const existingBanners = await storage.getBanners();
      for (const banner of existingBanners) {
        await storage.deleteBanner(banner.id);
      }
      
      for (const banner of data.banners) {
        const { id, createdAt, ...bannerData } = banner;
        
        try {
          await storage.createBanner(bannerData);
          results.banners++;
        } catch (err) {
          console.error(`Erro ao importar banner:`, err);
        }
      }

      // 5. IMPORTAR QUOTE REQUESTS E ITEMS (OPCIONAL - PULA SE DER ERRO)
      console.log('📋 Importando quote requests...');
      try {
        for (const quote of data.quoteRequests || []) {
          const { id, createdAt, ...quoteData } = quote;
          
          try {
            const newQuote = await storage.createQuoteRequest(quoteData);
            results.quoteRequests++;
            
            // Importar items desta quote
            const quoteItemsForThisQuote = (data.quoteItems || []).filter((item: any) => item.quoteRequestId === id);
            
            for (const item of quoteItemsForThisQuote) {
              const { id: itemId, quoteRequestId, productId, ...itemData } = item;
              const mappedProductId = productIdMap.get(productId) || productId;
              
              try {
                await storage.createQuoteItem({
                  ...itemData,
                  quoteRequestId: newQuote.id,
                  productId: mappedProductId,
                });
                results.quoteItems++;
              } catch (err) {
                console.error(`Erro ao importar quote item:`, err);
              }
            }
          } catch (err) {
            console.error(`Erro ao importar quote request (pulado):`, err);
          }
        }
      } catch (err) {
        console.log('⚠️ Quotes não importadas (não essencial)');
      }

      console.log('✨ Importação concluída!');
      res.json({
        success: true,
        message: 'Dados importados com sucesso!',
        results,
      });
    } catch (error) {
      console.error("Erro ao importar dados:", error);
      res.status(500).json({ 
        error: "Falha ao importar dados", 
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // ==========================================
  // HEALTH CHECK
  // ==========================================
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Royal Alimentos API is running" });
  });
}
