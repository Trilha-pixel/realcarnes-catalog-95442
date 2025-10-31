import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import QuoteList from "./pages/QuoteList";
import QuoteSuccess from "./pages/QuoteSuccess";
import About from "./pages/About";
import Suppliers from "./pages/Suppliers";
import ServiceArea from "./pages/ServiceArea";
import Recipes from "./pages/Recipes";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import BannerManagement from "./pages/admin/BannerManagement";
import UserManagement from "./pages/admin/UserManagement";
import QuoteManagementAdmin from "./pages/admin/QuoteManagementAdmin";
import NotFound from "./pages/NotFound";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <ScrollToTop />
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/empresa" element={<About />} />
              <Route path="/fornecedores" element={<Suppliers />} />
              <Route path="/area-de-atendimento" element={<ServiceArea />} />
              <Route path="/receitas" element={<Recipes />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/categoria/:slug" element={<Category />} />
              <Route path="/produto/:id" element={<ProductDetail />} />
              <Route path="/orcamento" element={<QuoteList />} />
              <Route path="/orcamento/sucesso" element={<QuoteSuccess />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/solicitacoes" element={<QuoteManagementAdmin />} />
              <Route path="/admin/solicitacoes/:id" element={<QuoteManagementAdmin />} />
              <Route path="/admin/produtos" element={<ProductManagement />} />
              <Route path="/admin/categorias" element={<CategoryManagement />} />
              <Route path="/admin/banners" element={<BannerManagement />} />
              <Route path="/admin/usuarios" element={<UserManagement />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AdminAuthProvider>
  </AuthProvider>
</QueryClientProvider>
);

export default App;
