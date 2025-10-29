// Royal Alimentos - Database Storage Interface
// Reference: blueprint:javascript_database integration

import { db } from "./db";
import { eq, desc, asc, like, and } from "drizzle-orm";
import {
  categories,
  products,
  adminUsers,
  banners,
  quoteRequests,
  quoteItems,
  type Category,
  type Product,
  type AdminUser,
  type Banner,
  type QuoteRequest,
  type QuoteItem,
  type InsertCategory,
  type InsertProduct,
  type InsertAdminUser,
  type InsertBanner,
  type InsertQuoteRequest,
  type InsertQuoteItem,
} from "@shared/schema";

// ==========================================
// INTERFACE DE STORAGE
// ==========================================
export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, updates: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;

  // Products
  getProducts(filters?: { categoryId?: number; featured?: boolean; search?: string }): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySku(sku: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Admin Users
  getAdminUsers(): Promise<AdminUser[]>;
  getAdminUserById(id: number): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminUser(id: number, updates: Partial<InsertAdminUser>): Promise<AdminUser | undefined>;
  deleteAdminUser(id: number): Promise<boolean>;

  // Banners
  getBanners(): Promise<Banner[]>;
  getBannerById(id: number): Promise<Banner | undefined>;
  createBanner(banner: InsertBanner): Promise<Banner>;
  updateBanner(id: number, updates: Partial<InsertBanner>): Promise<Banner | undefined>;
  deleteBanner(id: number): Promise<boolean>;
  reorderBanners(orderedIds: number[]): Promise<boolean>;

  // Quote Requests
  getQuoteRequests(filters?: { status?: string }): Promise<QuoteRequest[]>;
  getQuoteRequestById(id: number): Promise<QuoteRequest | undefined>;
  createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest>;
  updateQuoteRequestStatus(id: number, status: string): Promise<QuoteRequest | undefined>;
  deleteQuoteRequest(id: number): Promise<boolean>;

  // Quote Items
  getQuoteItemsByRequestId(quoteRequestId: number): Promise<QuoteItem[]>;
  createQuoteItem(item: InsertQuoteItem): Promise<QuoteItem>;
  deleteQuoteItemsByRequestId(quoteRequestId: number): Promise<boolean>;
}

// ==========================================
// DATABASE STORAGE IMPLEMENTATION
// ==========================================
export class DatabaseStorage implements IStorage {
  // ==========================================
  // CATEGORIES
  // ==========================================
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(asc(categories.name));
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async updateCategory(id: number, updates: Partial<InsertCategory>): Promise<Category | undefined> {
    const [updated] = await db.update(categories).set(updates).where(eq(categories.id, id)).returning();
    return updated || undefined;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==========================================
  // PRODUCTS
  // ==========================================
  async getProducts(filters?: { categoryId?: number; featured?: boolean; search?: string }): Promise<Product[]> {
    let query = db.select().from(products);

    const conditions = [];
    if (filters?.categoryId) {
      conditions.push(eq(products.categoryId, filters.categoryId));
    }
    if (filters?.featured !== undefined) {
      conditions.push(eq(products.featured, filters.featured));
    }
    if (filters?.search) {
      conditions.push(
        like(products.name, `%${filters.search}%`)
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    return await query.orderBy(desc(products.createdAt));
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductBySku(sku: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.sku, sku));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db.update(products).set({ ...updates, updatedAt: new Date() }).where(eq(products.id, id)).returning();
    return updated || undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==========================================
  // ADMIN USERS
  // ==========================================
  async getAdminUsers(): Promise<AdminUser[]> {
    return await db.select().from(adminUsers).orderBy(asc(adminUsers.name));
  }

  async getAdminUserById(id: number): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return user || undefined;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return user || undefined;
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const [newUser] = await db.insert(adminUsers).values(user).returning();
    return newUser;
  }

  async updateAdminUser(id: number, updates: Partial<InsertAdminUser>): Promise<AdminUser | undefined> {
    const [updated] = await db.update(adminUsers).set(updates).where(eq(adminUsers.id, id)).returning();
    return updated || undefined;
  }

  async deleteAdminUser(id: number): Promise<boolean> {
    const result = await db.delete(adminUsers).where(eq(adminUsers.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==========================================
  // BANNERS
  // ==========================================
  async getBanners(): Promise<Banner[]> {
    return await db.select().from(banners).where(eq(banners.active, true)).orderBy(asc(banners.order));
  }

  async getBannerById(id: number): Promise<Banner | undefined> {
    const [banner] = await db.select().from(banners).where(eq(banners.id, id));
    return banner || undefined;
  }

  async createBanner(banner: InsertBanner): Promise<Banner> {
    const [newBanner] = await db.insert(banners).values(banner).returning();
    return newBanner;
  }

  async updateBanner(id: number, updates: Partial<InsertBanner>): Promise<Banner | undefined> {
    const [updated] = await db.update(banners).set(updates).where(eq(banners.id, id)).returning();
    return updated || undefined;
  }

  async deleteBanner(id: number): Promise<boolean> {
    const result = await db.delete(banners).where(eq(banners.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async reorderBanners(orderedIds: number[]): Promise<boolean> {
    try {
      for (let i = 0; i < orderedIds.length; i++) {
        await db.update(banners).set({ order: i }).where(eq(banners.id, orderedIds[i]));
      }
      return true;
    } catch (error) {
      console.error("Error reordering banners:", error);
      return false;
    }
  }

  // ==========================================
  // QUOTE REQUESTS
  // ==========================================
  async getQuoteRequests(filters?: { status?: string }): Promise<QuoteRequest[]> {
    let query = db.select().from(quoteRequests);

    if (filters?.status) {
      query = query.where(eq(quoteRequests.status, filters.status));
    }

    return await query.orderBy(desc(quoteRequests.createdAt));
  }

  async getQuoteRequestById(id: number): Promise<QuoteRequest | undefined> {
    const [quote] = await db.select().from(quoteRequests).where(eq(quoteRequests.id, id));
    return quote || undefined;
  }

  async createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest> {
    const [newQuote] = await db.insert(quoteRequests).values(quote).returning();
    return newQuote;
  }

  async updateQuoteRequestStatus(id: number, status: string): Promise<QuoteRequest | undefined> {
    const [updated] = await db.update(quoteRequests).set({ status, updatedAt: new Date() }).where(eq(quoteRequests.id, id)).returning();
    return updated || undefined;
  }

  async deleteQuoteRequest(id: number): Promise<boolean> {
    const result = await db.delete(quoteRequests).where(eq(quoteRequests.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ==========================================
  // QUOTE ITEMS
  // ==========================================
  async getQuoteItemsByRequestId(quoteRequestId: number): Promise<QuoteItem[]> {
    return await db.select().from(quoteItems).where(eq(quoteItems.quoteRequestId, quoteRequestId));
  }

  async createQuoteItem(item: InsertQuoteItem): Promise<QuoteItem> {
    const [newItem] = await db.insert(quoteItems).values(item).returning();
    return newItem;
  }

  async deleteQuoteItemsByRequestId(quoteRequestId: number): Promise<boolean> {
    const result = await db.delete(quoteItems).where(eq(quoteItems.quoteRequestId, quoteRequestId));
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

// ==========================================
// EXPORT STORAGE INSTANCE
// ==========================================
export const storage = new DatabaseStorage();
