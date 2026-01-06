import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © 2025 Kanbino. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#terms" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacidade
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
