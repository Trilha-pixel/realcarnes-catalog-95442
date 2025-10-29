import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que rola a página para o topo sempre que a rota muda
 * Funciona em desktop e mobile
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Função que força scroll para o topo com múltiplos métodos
    const scrollToTop = () => {
      // Método 1: window.scrollTo
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Instantâneo, sem animação
      });
      
      // Método 2: document.documentElement (para garantia em alguns browsers)
      document.documentElement.scrollTop = 0;
      
      // Método 3: document.body (fallback)
      document.body.scrollTop = 0;
      
      // Método 4: Para casos onde há scroll em containers específicos
      const scrollContainers = document.querySelectorAll('[data-scroll-container]');
      scrollContainers.forEach(container => {
        container.scrollTop = 0;
      });
    };
    
    // Executa imediatamente
    scrollToTop();
    
    // Usa requestAnimationFrame para garantir que aconteça após o render
    requestAnimationFrame(() => {
      scrollToTop();
    });
    
    // Executa múltiplas vezes para garantir que funciona mesmo com imagens carregando
    const timeouts = [
      setTimeout(scrollToTop, 10),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100),
      setTimeout(scrollToTop, 200)
    ];
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [pathname]);

  return null;
}

