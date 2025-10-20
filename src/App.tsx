import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockDataProvider } from "./contexts/MockDataContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import QuoteList from "./pages/QuoteList";
import QuoteSuccess from "./pages/QuoteSuccess";
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuoteManagement from "./pages/admin/QuoteManagement";
import QuoteDetail from "./pages/admin/QuoteDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <MockDataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/produto/:id" element={<ProductDetail />} />
              <Route path="/orcamento" element={<QuoteList />} />
              <Route path="/orcamento/sucesso" element={<QuoteSuccess />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/orcamentos" element={<QuoteManagement />} />
              <Route path="/admin/orcamentos/:id" element={<QuoteDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MockDataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
