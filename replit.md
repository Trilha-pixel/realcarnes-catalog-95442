# Royal Alimentos - B2B Food Distribution Platform

## Overview

Royal Alimentos is a B2B e-commerce platform for premium meat and food distribution. The application serves as a digital catalog where restaurants, hotels, and food distributors can browse products, build quote lists, and submit purchase requests. The platform operates on a lead generation model rather than direct online transactions - customers select products and request quotes, which are then processed by the sales team.

Built with React, TypeScript, and Vite, the application features a public-facing catalog for customers and a comprehensive admin panel (CMS) for managing products, categories, banners, and quote requests. The project uses Lovable.dev for rapid development and deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**October 31, 2024**
- ✅ Fixed 413 Payload Too Large error by increasing Express body parser limit to 50MB (CSV bulk import support)
- ✅ Fixed ProductCard button overflow issue - Complete text with smaller font and line breaks
  - Button displays full text "Adicionar à Cotação" with smaller font (text-xs)
  - Text wraps to multiple lines if needed (leading-tight for compact spacing)
  - Mobile: Buttons stacked vertically (flex-col)
  - Desktop: Buttons side-by-side (flex-row)
  - Height adjusts automatically (h-auto) to accommodate text
  - Icon with flex-shrink-0 prevents compression

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18.3+ with TypeScript for type safety
- Vite as the build tool and dev server, configured for Replit hosting:
  - Port 5000 (host: 0.0.0.0)
  - allowedHosts: true (permits all Replit domains: .replit.dev, .repl.co)
  - HMR configured for Replit proxy (wss:// protocol on port 443)
- React Router for client-side routing with separate routes for public pages and admin panel
- Component-based architecture with clear separation between layout, UI, and feature components

**UI Component System**
- shadcn/ui components built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for styling with custom color system based on Royal Alimentos brand identity
- **Color Palette**: Navy Blue (#1E3A5F / HSL 223 58% 26%) as primary, Vivid Red (#F50000 / HSL 0 85% 50%) as secondary/accent
- Custom design tokens defined in index.css following brand guidelines
- **Typography**: Montserrat (bold, 700-900 weight) for headings, Roboto (300-700 weight) for body text
- **Header Design**: Gray background (bg-muted/50) with transparent Royal Alimentos logo, red contact bar above
- **Promotional Banners**: Custom promotional images for homepage carousel (OFERTÃO DA CARNE, OFERTA DA SEMANA)
- Professional, corporate design reflecting the frozen and refrigerated food distribution business

**State Management**
- React Context API for global state:
  - `CartContext`: Manages quote cart state (shared across components, persisted in localStorage)
  - `AuthContext`: Handles customer authentication (mock implementation)
  - `AdminAuthContext`: Manages admin user sessions via API
  - `MockDataContext`: ⚠️ DEPRECATED - Still used by some pages, being phased out
- TanStack Query (React Query): Manages server state, caching, and data fetching
- Local component state with React hooks

**Routing Structure**
- Public routes: Home, Products, Categories, Product Details, Quote List, About, Contact, etc.
- Admin routes (all under `/admin`): Login, Dashboard, Product Management, Category Management, Banner Management, User Management, Quote Management
- 404 handling with NotFound component

### Data Layer

**Backend API & Database (PostgreSQL)** ✅ 
The application now uses a complete backend with PostgreSQL database:

- **Database**: PostgreSQL via Neon integration with Drizzle ORM
- **Backend**: Express.js API server (port 5001)
- **Frontend**: Vite dev server (port 5000) with proxy to backend API
- **Schemas**: Defined in `shared/schema.ts` using Drizzle
- **Tables**: categories, products, admin_users, banners, quote_requests, quote_items
- **Storage Layer**: `server/storage.ts` with DatabaseStorage class
- **API Routes**: RESTful endpoints in `server/routes.ts`

**Data Models (Drizzle Schema)**
- **Product**: id, sku, name, description, images[], categoryId, packaging, featured, status
- **Category**: id, name, slug, icon, image
- **QuoteRequest**: id, customerName, customerCompany, customerCnpj, customerEmail, customerPhone, status, createdAt
- **QuoteItem**: id, quoteRequestId, productId, productName, productSku, quantity
- **Banner**: id, desktopImage, mobileImage, linkUrl, order, active
- **AdminUser**: id, name, email, password, role (admin/vendedor)

**Frontend Data Fetching**
- **React Query (TanStack Query)**: Manages API data fetching and caching
- **Custom Hooks**: `useCategories`, `useProducts`, `useBanners`, `useQuotes`, `useAdminUsers`
- **CartContext**: Shared context for quote cart state (localStorage + React Context)
- **API Client**: `src/lib/queryClient.ts` with `apiRequest` helper function
- **Migration Status**: Home page migrated, remaining pages still use MockDataContext

### Authentication & Authorization

**Customer Authentication**
- Mock login/register system storing users in memory and localStorage
- Simple email/password validation
- Session persistence via localStorage
- No real security implementation (MVP only)

**Admin Authentication**
- Separate admin context with role-based access (Admin, Vendedor/Salesperson)
- Protected routes requiring authentication
- Admin layout wrapper checking auth status
- Logout functionality clearing session

**Authentication System (Updated - Using PostgreSQL)**
- **Public Authentication**: 
  - Customer registration via `/api/auth/register` endpoint
  - Customer login via `/api/auth/login` endpoint
  - Passwords stored plain (⚠️ needs hashing for production)
  - Auto-login after registration
  - Session persistence via localStorage
- **Admin Authentication**: 
  - Admin login via `/api/admin/login` endpoint
  - Role-based access control
- **User Roles in Database**: 
  - `admin`: Full system access (create products, manage users, etc.)
  - `vendedor`: Sales team with quote management access
  - `cliente`: Public customers registered through the site
- **Database Storage**: All users (admin, vendedor, cliente) stored in `admin_users` table with fields: id, name, email, password, role, phone, company, createdAt

**Security Notes for Production**
Current implementation needs improvements for production:
- ❌ Passwords stored in plain text - need bcrypt/argon2 hashing
- ❌ No JWT or session tokens - need proper session management
- ❌ No HTTPS enforcement
- ❌ No CSRF protection
- ❌ No rate limiting on auth endpoints

### Admin Panel (CMS)

The `/admin` section provides complete content management:

**Dashboard**
- Statistics widgets (quote count, product count, category count)
- Quick access to recent quotes
- Overview of system status

**Product Management**
- Full CRUD operations
- Rich text editor for descriptions
- Image URL management (currently uses hardcoded imports)
- Category assignment
- Featured product flagging
- SKU and packaging info

**Category Management**
- Simple CRUD for product categories
- Icon and image association
- Slug generation for URLs

**Banner Management**
- Homepage carousel banner control
- Separate desktop/mobile images
- Link destinations
- Ordering/reordering capability

**Quote Request Management**
- View all customer quote submissions
- Status tracking (Novo, Em Atendimento, Finalizado)
- Customer contact information
- Product lists with quantities

**User Management**
- Admin user CRUD
- Role assignment (Admin vs Vendedor)
- Access control levels

### External Dependencies

**UI & Component Libraries**
- @radix-ui/* (v1.x): Headless UI primitives for accessibility
- lucide-react: Icon library
- embla-carousel-react: Homepage banner carousel
- react-day-picker + date-fns: Date handling
- cmdk: Command palette component
- class-variance-authority + clsx: Utility classes
- next-themes: Dark mode support (configured but not heavily used)

**Form & Validation**
- react-hook-form: Form state management
- @hookform/resolvers: Schema validation
- zod: Runtime type checking and validation (used in quote submission)

**Utilities**
- tailwind-merge: Tailwind class merging
- sonner: Toast notifications
- vaul: Drawer component

**Development Tools**
- TypeScript with relaxed config (strict: false) for rapid development
- ESLint with React hooks plugin
- Lovable-tagger: Development-mode component tagging
- PostCSS + Autoprefixer

**Asset Management**
- Static images imported from `src/assets/` directory
- Product images, category images, brand logos
- Currently no CDN or external image hosting
- Image optimization not implemented

**Deployment & Hosting**
- Configured for Replit hosting (.repl.co, .replit.dev domains)

**Development Mode:**
- Frontend: Vite dev server on port 5000
- Backend: Express API server on port 5001
- Two workflows: "Start application" (Vite), "Backend API" (Express)
- Vite proxy: `/api/*` requests forwarded to Express backend
- HMR configured for Replit's proxy setup

**Production Deployment:**
- Build: `npm run build` (Vite compiles to `dist/`)
- Run: `npm start` (Express serves static files + API on port 5000)
- Deployment target: Autoscale (Replit)
- Express serves:
  - Static frontend files from `dist/`
  - Product images from `public/produtos/`
  - API endpoints under `/api/*`
  - SPA fallback for client-side routing

**Database Details**
- Provider: Neon (PostgreSQL cloud)
- ORM: Drizzle with type-safe queries
- Seeded Data: 6 categories, 6 products, 2 admin users, 2 banners, 1 sample quote
- Admin Credentials: admin@royalalimentos.com.br / admin123, vendedor@royalalimentos.com.br / vendas123
- Connection: Environment variables (DATABASE_URL, PGHOST, etc.)

**Future Integration Points**
Planned integrations:
- Email service: For quote notifications (SendGrid, AWS SES, etc.)
- File storage: For product image uploads (AWS S3, Cloudinary, etc.)
- Analytics: User behavior tracking
- Payment gateway: If transitioning from quotes to direct sales

## Migration Progress (Mock → Real API)

### ✅ Completed - Backend & Admin Panel
**Backend Infrastructure:**
- Backend API with all REST endpoints
- Database schema and seeded data (PostgreSQL via Neon)
- Custom React Query hooks for all resources (useProducts, useCategories, useBanners, useQuotes, useAdminUsers)
- CartContext for shared cart state
- Quote API endpoint (returns items array for each quote)
- Vite proxy configuration

**Public Pages:**
- Home page (uses API)
- Header component (uses CartContext)
- ProductCard component (uses CartContext)

**Admin Authentication:**
- AdminAuthContext (uses API login with async/await fix)
- AdminLogin (async authentication with redirect)
- AdminLayout (updated to use API schema fields: name, role)

**Admin Panel - All Pages Migrated to API:** ✅
- ✅ Dashboard (useProducts, useCategories, useQuoteRequests with loading states)
- ✅ ProductManagement (full CRUD with useProducts mutations)
- ✅ CategoryManagement (full CRUD with useCategories mutations)
- ✅ BannerManagement (full CRUD with useBanners mutations)
- ✅ UserManagement (full CRUD with useAdminUsers mutations)
- ✅ QuoteManagementAdmin (view & update status with useQuotes mutations)

### ✅ Migration Complete - All Pages Using API
**All pages have been successfully migrated from MockDataContext to real API:**

**Public Pages Migrated:**
- ✅ Home page (products, banners, categories)
- ✅ Products page (product listing with search, category filters, pagination)
- ✅ Category page (filtered products by category)
- ✅ ProductDetail page (single product view with related products)
- ✅ QuoteList page (cart/checkout with API quote submission)

**Admin Pages:**
- ✅ Dashboard (useProducts, useCategories, useQuoteRequests)
- ✅ ProductManagement (full CRUD)
- ✅ CategoryManagement (full CRUD)
- ✅ BannerManagement (full CRUD)
- ✅ UserManagement (full CRUD)
- ✅ QuoteManagementAdmin (view & update status)

**Migration Complete:** ✅ All pages now use PostgreSQL database via API hooks (useProducts, useCategories, useBanners, useQuotes, useAdminUsers, CartContext)