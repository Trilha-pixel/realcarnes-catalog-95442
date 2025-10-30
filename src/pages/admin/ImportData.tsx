import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Database, Loader2 } from "lucide-react";
import databaseExport from "@/data/database-export.json";

export default function ImportData() {
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async () => {
    setIsImporting(true);
    setError(null);
    setResult(null);

    try {
      // Enviar os dados diretamente via POST
      const response = await fetch("/api/import-production-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(databaseExport),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Erro ao importar dados");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Importar Dados para Produção
          </CardTitle>
          <CardDescription>
            Importa todos os dados do arquivo database-export.json para o banco de dados atual.
            Use esta funcionalidade após fazer deploy para copiar os dados de desenvolvimento para produção.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Aviso */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>ATENÇÃO:</strong> Esta ação vai importar:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Todas as categorias</li>
                <li>Todos os produtos (476 itens)</li>
                <li>Todos os usuários admin</li>
                <li>Todos os banners</li>
                <li>Todas as cotações (quotes)</li>
              </ul>
              <p className="mt-2 text-sm">
                Produtos e categorias existentes serão atualizados. Banners existentes serão substituídos.
              </p>
            </AlertDescription>
          </Alert>

          {/* Botão de Importação */}
          <div className="flex justify-center">
            <Button
              onClick={handleImport}
              disabled={isImporting}
              size="lg"
              className="w-full max-w-md"
              data-testid="button-import-data"
            >
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importando dados...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Iniciar Importação
                </>
              )}
            </Button>
          </div>

          {/* Resultado da Importação */}
          {result && (
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <p className="font-semibold text-green-900 mb-3">✅ Importação concluída com sucesso!</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
                  <div>📦 Categorias: <strong>{result.results.categories}</strong></div>
                  <div>🛍️ Produtos: <strong>{result.results.products}</strong></div>
                  <div>👤 Usuários: <strong>{result.results.adminUsers}</strong></div>
                  <div>🎨 Banners: <strong>{result.results.banners}</strong></div>
                  <div>📋 Cotações: <strong>{result.results.quoteRequests}</strong></div>
                  <div>📄 Itens: <strong>{result.results.quoteItems}</strong></div>
                </div>
                <p className="mt-3 text-sm">
                  <strong>Próximos passos:</strong> Acesse o site publicado para verificar se todos os dados aparecem corretamente.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Erro */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <p className="font-semibold mb-2">Erro ao importar dados:</p>
                <p className="text-sm">{error}</p>
                <p className="text-sm mt-2">
                  Certifique-se de que o arquivo <code>database-export.json</code> existe na raiz do projeto.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Instruções */}
          <div className="border-t pt-6 space-y-3 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Como usar:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Certifique-se de que o arquivo <code className="bg-muted px-1 py-0.5 rounded">database-export.json</code> existe no projeto</li>
              <li>Faça deploy do projeto (Publish)</li>
              <li>Acesse esta página no site publicado: <code className="bg-muted px-1 py-0.5 rounded">/admin/import-data</code></li>
              <li>Clique no botão "Iniciar Importação"</li>
              <li>Aguarde a conclusão (pode levar alguns segundos)</li>
              <li>Verifique o site publicado para confirmar que os dados foram importados</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
