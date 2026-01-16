import React from 'react';

// TODO: Integrar com sistema de autenticação real
// TODO: Receber nome do usuário via props ou context
const USUARIO_NOME = "João Silva";

// TODO: Integrar com sistema de precificação real
const PRECO_FINAL = "R$ 12,00";

interface HomePageProps {
  // Props vazias para expansão futura
}

/**
 * HomePage - Tela inicial simples com mensagem de boas-vindas
 *
 * Exibe "Bem-vindo" seguido do nome do usuário mockado e preço final.
 * Componente temporário até implementação da autenticação real.
 */
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Bem-vindo, {USUARIO_NOME}
        </h1>
        <p className="mt-4 text-2xl font-semibold text-indigo-600">
          {PRECO_FINAL}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
