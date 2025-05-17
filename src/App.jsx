import { useApp } from './context/AppContext';
import CriteriaForm from './components/CriteriaForm';
import AlternativeForm from './components/AlternativeForm';
import Results from './components/Results';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';

function App() {
  const { currentSection, setCurrentSection, resetData, addCriterion, addAlternative } = useApp();

  return (
    <div className="min-h-screen bg-dark text-gray-100">
      {/* Header */}
      <header className="bg-dark-lighter border-b border-miku/20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-auto py-3">
            <div className="flex items-center">
              <h1 className="font-poppins font-extrabold text-xl sm:text-2xl md:text-3xl tracking-wide text-miku flex items-center">
                <span className="text-miku">DSS</span>
                <span className="text-white hidden sm:inline">Profile Matching</span>
                <span className="text-white sm:hidden">-PM</span>
              </h1>
            </div>
            <button
              onClick={resetData}
              className="px-3 py-2 text-xs sm:text-sm text-miku-accent hover:text-miku-accent/80"
            >
              Reset Data
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-dark-lighter/50 border-b border-miku/10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4 h-auto sm:h-12 py-2 sm:py-0">
            <button
              onClick={() => setCurrentSection('criteria')}
              className={`px-3 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                currentSection === 'criteria'
                  ? 'border-miku text-miku'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Kriteria
            </button>
            <button
              onClick={() => setCurrentSection('alternatives')}
              className={`px-3 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                currentSection === 'alternatives'
                  ? 'border-miku text-miku'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Kandidat
            </button>
            <button
              onClick={() => setCurrentSection('results')}
              className={`px-3 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                currentSection === 'results'
                  ? 'border-miku text-miku'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Hasil
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8">
        {currentSection === 'criteria' && <CriteriaForm />}
        {currentSection === 'alternatives' && <AlternativeForm />}
        {currentSection === 'results' && <Results />}
      </main>

      {/* Floating Action Buttons */}
      {currentSection === 'criteria' && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={addCriterion}
          className="fixed bottom-6 right-6 p-4 bg-miku-dark hover:bg-miku text-white rounded-full shadow-lg z-50 flex items-center justify-center"
          style={{ boxShadow: '0 4px 12px rgba(57, 208, 255, 0.3)' }}
        >
          <PlusIcon className="w-6 h-6" />
        </motion.button>
      )}

      {currentSection === 'alternatives' && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={addAlternative}
          className="fixed bottom-6 right-6 p-4 bg-miku-dark hover:bg-miku text-white rounded-full shadow-lg z-50 flex items-center justify-center"
          style={{ boxShadow: '0 4px 12px rgba(57, 208, 255, 0.3)' }}
        >
          <PlusIcon className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}

export default App; 