import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Navigation = () => {
  const { currentSection, setCurrentSection } = useApp();

  const navItems = [
    { id: 'criteria', label: 'Kriteria' },
    { id: 'alternatives', label: 'Alternatif' },
    { id: 'results', label: 'Hasil' },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-dark-lighter border-b border-miku/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0"
          >
            <h1 className="text-2xl font-display font-bold text-miku">
              DSS Profile Matching
            </h1>
          </motion.div>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSection(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentSection === item.id
                    ? 'bg-miku text-white'
                    : 'text-gray-300 hover:bg-dark hover:text-white'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 