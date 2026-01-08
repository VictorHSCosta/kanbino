/**
 * Navbar Component
 * Simple navigation bar for the application
 */

interface NavbarProps {
  currentView: 'home' | 'pricing';
  onViewChange: (view: 'home' | 'pricing') => void;
}

function Navbar({ currentView, onViewChange }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Kanbino</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => onViewChange('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'home'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onViewChange('pricing')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'pricing'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Planos
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
