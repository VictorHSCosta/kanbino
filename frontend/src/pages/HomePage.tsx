import React from 'react';

// TODO: Integrar com sistema de autenticação real
// TODO: Receber nome do usuário via props ou context
const USUARIO_NOME = "João Silva";

interface HomePageProps {
  // Props vazias para expansão futura
}

/**
 * HomePage - Tela inicial simples com mensagem de boas-vindas
 *
 * Exibe "Bem-vindo" seguido do nome do usuário mockado.
 * Componente temporário até implementação da autenticação real.
 */
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Bem-vindo, {USUARIO_NOME}
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
