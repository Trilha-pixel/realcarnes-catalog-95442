# Royal Alimentos - B2B Food Distribution Platform

## Overview

Royal Alimentos is a B2B e-commerce platform for premium meat and food distribution. The application serves as a digital catalog where restaurants, hotels, and food distributors can browse products, build quote lists, and submit purchase requests. The platform operates on a lead generation model rather than direct online transactions - customers select products and request quotes, which are then processed by the sales team.

Built with React, TypeScript, and Vite, the application features a public-facing catalog for customers and a comprehensive admin panel (CMS) for managing products, categories, banners, and quote requests. The project uses Lovable.dev for rapid development and deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

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
  - `MockDataContext`: Manages all application data (products, categories, quotes, banners)
  - `AuthContext`: Handles customer authentication (mock implementation)
  - `AdminAuthContext`: Manages admin user sessions
- Local component state with React hooks
- TanStack Query (React Query) for data fetching setup (though currently using mock data)

**Routing Structure**
- Public routes: Home, Products, Categories, Product Details, Quote List, About, Contact, etc.
- Admin routes (all under `/admin`): Login, Dashboard, Product Management, Category Management, Banner Management, User Management, Quote Management
- 404 handling with NotFound component

### Data Layer

**Mock Data Strategy**
The application currently uses a comprehensive mock data system instead of a real database. This architectural decision allows for rapid prototyping and can be easily replaced with real API calls:

- All CRUD operations are simulated in `MockDataContext`
- Data persists in browser localStorage for quote cart and authentication
- Products, categories, and banners are hardcoded with image imports
- Quote requests generate unique IDs and store customer data

**Data Models**
- **Product**: id, name, sku, description, images[], category, packaging, featured flag
- **Category**: id, name, slug, icon, image
- **QuoteRequest**: id, customerData (name, company, cnpj, email, phone), items[], status, createdAt
- **Banner**: id, imagem_desktop, imagem_mobile, link_url, ordem
- **AdminUser**: id, nome, email, nivel (Admin/Vendedor), senha_mock

**Future Database Considerations**
The architecture is designed to easily integrate a database (likely PostgreSQL with Drizzle ORM based on project patterns). Key integration points:
- Replace MockDataContext methods with API calls
- Add backend API routes for CRUD operations
- Implement proper authentication with JWT or sessions
- Add database migrations for schema management

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

**Security Notes**
Current implementation is mock-only. Production requires:
- Secure password hashing
- JWT or session-based auth
- HTTPS enforcement
- CSRF protection
- Rate limiting

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
- Vite dev server on port 5000
- HMR configured for Replit's proxy setup
- Build outputs to `dist/` directory

**Future Integration Points**
Based on docs and architecture, likely future dependencies:
- Database: PostgreSQL with Drizzle ORM
- Email service: For quote notifications (SendGrid, AWS SES, etc.)
- File storage: For product image uploads (AWS S3, Cloudinary, etc.)
- Analytics: User behavior tracking
- Payment gateway: If transitioning from quotes to direct sales