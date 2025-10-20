import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockDataProvider } from "./contexts/MockDataContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import QuoteList from "./pages/QuoteList";
import QuoteSuccess from "./pages/QuoteSuccess";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import BannerManagement from "./pages/admin/BannerManagement";
import UserManagement from "./pages/admin/UserManagement";
import QuoteManagementAdmin from "./pages/admin/QuoteManagementAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <MockDataProvider>
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
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
        </AdminAuthProvider>
      </MockDataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
