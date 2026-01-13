/**
 * ExampleComponent
 *
 * Demonstrates React state management with interactive buttons and info cards.
 * Shows counter functionality with improved UX and accessibility.
 *
 * @param title - Optional title for the component section
 *
 * @example
 * ```tsx
 * <ExampleComponent title="Componentes React" />
 * ```
 */

import { useState, useCallback } from 'react';

interface ExampleComponentProps {
  title?: string;
}

const ExampleComponent = ({ title = 'Componentes React' }: ExampleComponentProps) => {
  const [count, setCount] = useState(0);

  // Increment counter with useCallback for optimization
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

      {/* Buttons Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={handleIncrement}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Incrementar contador"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Botão Primário</span>
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20">
            {count}
          </span>
        </button>

        <button
          className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          aria-label="Botão secundário"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Botão Secundário</span>
        </button>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div
          className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg"
          title="React com Tailwind CSS para estilização"
        >
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className="font-bold text-lg">Box 1</span>
          </div>
          <p className="text-sm opacity-90">React + Tailwind</p>
        </div>

        <div
          className="group bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg"
          title="TypeScript para type safety"
        >
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-bold text-lg">Box 2</span>
          </div>
          <p className="text-sm opacity-90">TypeScript</p>
        </div>

        <div
          className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white p-5 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg"
          title="Vite para build rápido"
        >
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-bold text-lg">Box 3</span>
          </div>
          <p className="text-sm opacity-90">Vite</p>
        </div>
      </div>

      {/* Counter Display */}
      <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <p className="text-sm text-gray-700 font-medium">
          Contador:{' '}
          <span className="inline-block font-bold text-indigo-600 text-lg ml-2 tabular-nums">
            {count}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Clique no botão primário para incrementar
        </p>
      </div>
    </div>
  );
};

export default ExampleComponent;
