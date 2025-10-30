# Royal Alimentos - B2B Food Distribution Platform

## Overview
Royal Alimentos is a B2B e-commerce platform designed for premium meat and food distribution. It functions as a digital catalog, enabling restaurants, hotels, and food distributors to browse products, create quote lists, and submit purchase requests. The platform operates on a lead generation model, where customer-submitted quote requests are processed by a sales team, rather than facilitating direct online transactions. The project encompasses a public-facing product catalog and a comprehensive admin panel for content and order management.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
The platform features a professional, corporate design suitable for the food distribution business.
- **Color Palette**: Primary Navy Blue (#1E3A5F) and accent Vivid Red (#F50000).
- **Typography**: Montserrat for headings, Roboto for body text.
- **Header**: Gray background with a transparent Royal Alimentos logo and a red contact bar.
- **Promotional Banners**: Custom images for homepage carousel.
- **Component Library**: shadcn/ui built on Radix UI, styled with Tailwind CSS.

### Technical Implementations
- **Frontend**: React 18.3+ with TypeScript, bundled with Vite, and React Router for navigation.
- **Backend**: Express.js API server.
- **State Management**: React Context API for global state (e.g., `CartContext`, `AuthContext`) and TanStack Query (React Query) for server state management and data fetching.
- **Authentication**:
    - **Customer**: Mock authentication with localStorage persistence (development only, not production-ready).
    - **Admin**: Role-based access control (`Admin`, `Vendedor`) with protected routes and session management via API.
    - **Security Notes**: Production deployment requires password hashing, JWT/session tokens, HTTPS enforcement, CSRF protection, and rate limiting.
- **Admin Panel (CMS)**: Provides full CRUD operations for:
    - Products (rich text editor, image management, categorization, featured flagging)
    - Categories (icons, images, slug generation)
    - Banners (desktop/mobile images, links, ordering)
    - Quote Requests (status tracking, customer info, product lists)
    - User Management (admin user CRUD, role assignment)
- **Data Import System**: A web-based interface (`/admin/import-data`) and API endpoint (`/api/import-production-data`) for importing production data (categories, products, users, banners, quotes) with upsert logic, ID mapping, and transactional safety.

### System Design Choices
- **Development Environment**: Vite dev server (port 5000) and Express API server (port 5001), with Vite proxying `/api/*` requests to the Express backend.
- **Production Deployment**: `npm run build` generates static files, `npm start` serves static files and API via Express on port 5000 with SPA fallback.
- **Database Schema**: Drizzle ORM defines tables for `categories`, `products`, `admin_users`, `banners`, `quote_requests`, and `quote_items`.

## External Dependencies

- **Database**: PostgreSQL via Neon integration, using Drizzle ORM.
- **UI & Component Libraries**:
    - `@radix-ui/*`: Headless UI primitives.
    - `lucide-react`: Icon library.
    - `embla-carousel-react`: Carousel component.
    - `shadcn/ui`: Pre-built components.
    - `tailwindcss`: CSS framework.
- **Form & Validation**:
    - `react-hook-form`: Form state management.
    - `zod`: Runtime type checking and validation.
- **Utilities**:
    - `sonner`: Toast notifications.
    - `vaul`: Drawer component.
    - `class-variance-authority`, `clsx`, `tailwind-merge`: Class manipulation.
- **Development Tools**: TypeScript, ESLint, PostCSS, Autoprefixer.
- **Deployment**: Configured for Replit hosting (.repl.co, .replit.dev domains).
- **Asset Management**: Static images imported from `src/assets/`.
## Recent Changes

### October 30, 2025 - Production Data Import Fix
**Issue**: Import endpoint was failing in production with 404 error because `database-export.json` file was not included in Replit deployment.

**Solution Implemented**:
1. Modified `/api/import-production-data` endpoint to accept data via POST body as primary method
2. Moved `database-export.json` to `src/data/` so Vite bundles it with frontend code
3. Updated `/admin/import-data` page to import JSON and send via POST request
4. Endpoint now has fallback to read file if POST body is empty
5. **Result**: Import system works reliably in all deployment environments without file dependency

**Technical Details**:
- Frontend bundles 211KB JSON file at build time
- Data sent directly from browser to API (no server file access needed)
- Maintains backward compatibility with file-based import as fallback

## Migration Progress

### ✅ Completed - Backend & Admin Panel
All pages migrated from MockDataContext to real PostgreSQL API.

**Public Pages:**
- ✅ Home, Products, Category, ProductDetail, QuoteList

**Admin Pages:**
- ✅ Dashboard, ProductManagement, CategoryManagement, BannerManagement, UserManagement, QuoteManagementAdmin

## 📥 Production Data Import System

### Overview
Complete database import system for transferring development data to production via web interface.

### Components Created
**API Endpoint:** `/api/import-production-data` (POST)
- Location: `server/routes.ts`
- **Accepts data via POST body** (primary method - no file dependency!)
- Fallback: Reads `database-export.json` if no POST data
- Imports all data: categories, products, users, banners, quotes
- Uses upsert logic to prevent duplicates
- Maps IDs between related tables automatically

**Admin Page:** `/admin/import-data`
- Location: `src/pages/admin/ImportData.tsx`
- Imports JSON data: `src/data/database-export.json` (bundled with Vite)
- Sends data directly via POST (no server file dependency)
- Visual interface with import button
- Shows progress and results in real-time
- Displays detailed summary after completion

**Data Files:**
- `src/data/database-export.json` (211 KB): Bundled with frontend, included in deployment
- `database-export.json` (root): Optional fallback for direct server access
- Scripts: `server/export-database.ts`, `server/import-database.ts`

### Usage Workflow
1. Deploy project to production (Publish button)
2. Access `/admin/import-data` on **production site**
3. Click "Iniciar Importação" button
4. Wait 30-60 seconds for completion
5. Verify site has all data (categories, products, banners)

### Import Process
The endpoint performs these steps in order:
1. **Receive Data** - Accepts JSON via POST body from frontend
2. **Categories** (6 items) - Creates or updates by slug
3. **Products** (476 items) - Creates or updates by SKU
4. **Admin Users** (3 items) - Creates or updates by email
5. **Banners** (4 items) - Deletes old, inserts new
6. **Quote Requests + Items** - Creates with mapped IDs

### Technical Implementation
- **Frontend**: Imports `src/data/database-export.json` at build time (Vite bundles it)
- **Data Transfer**: Sends 211KB JSON via POST request body
- **Backend**: Receives data from POST body (no file system dependency)
- **Deployment**: Data always available since it's bundled with frontend code

### Safety Features
- ✅ Non-destructive: Uses ON CONFLICT DO UPDATE
- ✅ No duplicates: Matches by unique keys (slug, SKU, email)
- ✅ Transactional: All or nothing
- ✅ ID mapping: Correctly relates foreign keys
- ✅ No file dependency: Works in any deployment environment

### Files Involved
- `server/routes.ts` - Import endpoint (accepts POST body)
- `src/pages/admin/ImportData.tsx` - UI that sends data via POST
- `src/data/database-export.json` - Data source (bundled with frontend)
- `src/App.tsx` - Route registration
- `COMO_IMPORTAR_PARA_PRODUCAO.md` - Detailed user instructions
