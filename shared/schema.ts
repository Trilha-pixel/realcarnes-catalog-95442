// Royal Alimentos Database Schema
// Reference: blueprint:javascript_database integration

import { pgTable, serial, varchar, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ==========================================
// CATEGORIAS
// ==========================================
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  icon: varchar("icon", { length: 50 }),
  image: text("image"),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const selectCategorySchema = createSelectSchema(categories);
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// ==========================================
// PRODUTOS
// ==========================================
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  packaging: text("packaging").notNull(),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  featured: boolean("featured").notNull().default(false),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  images: text("images").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  quoteItems: many(quoteItems),
}));

export const insertProductSchema = createInsertSchema(products).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});
export const selectProductSchema = createSelectSchema(products);
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// ==========================================
// USUÁRIOS (Admin, Vendedor e Clientes)
// ==========================================
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("cliente"), // admin, vendedor ou cliente
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({ 
  id: true, 
  createdAt: true 
});
export const selectAdminUserSchema = createSelectSchema(adminUsers);
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

// ==========================================
// BANNERS
// ==========================================
export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  desktopImage: text("desktop_image").notNull(),
  mobileImage: text("mobile_image").notNull(),
  linkUrl: varchar("link_url", { length: 500 }),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBannerSchema = createInsertSchema(banners).omit({ 
  id: true, 
  createdAt: true 
});
export const selectBannerSchema = createSelectSchema(banners);
export type InsertBanner = z.infer<typeof insertBannerSchema>;
export type Banner = typeof banners.$inferSelect;

// ==========================================
// SOLICITAÇÕES DE ORÇAMENTO
// ==========================================
export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerCompany: varchar("customer_company", { length: 255 }).notNull(),
  customerCnpj: varchar("customer_cnpj", { length: 20 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("novo"), // novo, em_atendimento, finalizado
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const quoteRequestsRelations = relations(quoteRequests, ({ many }) => ({
  items: many(quoteItems),
}));

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});
export const selectQuoteRequestSchema = createSelectSchema(quoteRequests);
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;

// ==========================================
// ITENS DAS SOLICITAÇÕES DE ORÇAMENTO
// ==========================================
export const quoteItems = pgTable("quote_items", {
  id: serial("id").primaryKey(),
  quoteRequestId: integer("quote_request_id").notNull().references(() => quoteRequests.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull().references(() => products.id),
  productName: varchar("product_name", { length: 255 }).notNull(),
  productSku: varchar("product_sku", { length: 100 }).notNull(),
  quantity: integer("quantity").notNull(),
});

export const quoteItemsRelations = relations(quoteItems, ({ one }) => ({
  quoteRequest: one(quoteRequests, {
    fields: [quoteItems.quoteRequestId],
    references: [quoteRequests.id],
  }),
  product: one(products, {
    fields: [quoteItems.productId],
    references: [products.id],
  }),
}));

export const insertQuoteItemSchema = createInsertSchema(quoteItems).omit({ id: true });
export const selectQuoteItemSchema = createSelectSchema(quoteItems);
export type InsertQuoteItem = z.infer<typeof insertQuoteItemSchema>;
export type QuoteItem = typeof quoteItems.$inferSelect;
