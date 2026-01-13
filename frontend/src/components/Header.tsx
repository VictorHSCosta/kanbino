/**
 * Header Component
 *
 * Displays the application header with logo, title, and connection status indicator.
 *
 * @param title - The application title to display
 * @param apiStatus - Current API status text
 * @param isConnected - Whether the backend connection is active
 *
 * @example
 * ```tsx
 * <Header
 *   title="Kanbino"
 *   apiStatus="Conectado ✓"
 *   isConnected={true}
 * />
 * ```
 */

interface HeaderProps {
  title: string;
  apiStatus: string;
  isConnected: boolean;
}

const Header = ({ title, apiStatus, isConnected }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">React + Node.js + Tailwind CSS</p>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <div className="relative">
              <div
                className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <div
                className={`absolute inset-0 w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                } animate-ping opacity-75`}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{apiStatus}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
