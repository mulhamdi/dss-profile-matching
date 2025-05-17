import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, UserIcon } from '@heroicons/react/24/outline';
import { FaUsers, FaStar } from 'react-icons/fa';
import { useRef } from 'react';

const AlternativeForm = () => {
  const { alternatives, criteria, addAlternative, updateAlternative, updateAlternativeScore, removeAlternative, setAlternatives } = useApp();
  const lastAlternativeRef = useRef(null);

  const handleAddAlternative = () => {
    addAlternative();
    // Scroll to the new alternative after it's added
    setTimeout(() => {
      lastAlternativeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Update score for number type
  const handleNumberScoreChange = (altIdx, critIdx, value) => {
    setAlternatives((prev) => {
      const updated = [...prev];
      updated[altIdx] = { ...updated[altIdx] };
      updated[altIdx].scores = [...updated[altIdx].scores];
      updated[altIdx].scores[critIdx] = { value: value === '' ? '' : Number(value) };
      return updated;
    });
  };

  // Update score for options type
  const handleOptionScoreChange = (altIdx, critIdx, selectedIdx) => {
    setAlternatives((prev) => {
      const updated = [...prev];
      updated[altIdx] = { ...updated[altIdx] };
      updated[altIdx].scores = [...updated[altIdx].scores];
      updated[altIdx].scores[critIdx] = { selectedSubCriterion: selectedIdx };
      return updated;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 relative min-h-[calc(100vh-8rem)]"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0 mb-2">
        <div className="flex items-center gap-3">
          <FaUsers className="w-6 h-6 text-miku" />
          <div>
            <h2 className="text-lg md:text-xl font-bold text-miku">Kandidat</h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">Maksimal 16 kandidat</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddAlternative}
          className="mt-2 md:mt-0 px-4 py-2 bg-miku-dark hover:bg-miku text-white rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center gap-2 shadow-lg w-full md:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Kandidat
        </motion.button>
      </div>

      <div className="space-y-4">
        {alternatives.map((alternative, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-lighter p-6 rounded-lg border border-miku/10 hover:border-miku/20 transition-colors"
            ref={index === alternatives.length - 1 ? lastAlternativeRef : null}
          >
            <div className="space-y-4">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-miku-accent" />
                    Nama Kandidat
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={alternative.name}
                      onChange={(e) => updateAlternative(index, 'name', e.target.value)}
                      placeholder="Contoh: PT. ABC"
                      className="w-full px-3 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeAlternative(index)}
                      className="px-3 py-2 text-miku-accent hover:text-miku-accent-dark transition-colors self-end"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm text-gray-400 flex items-center gap-2">
                  <FaStar className="w-4 h-4 text-miku-accent" />
                  Nilai Kriteria
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {criteria.map((criterion, critIndex) => (
                    <div key={critIndex} className="space-y-2">
                      <label className="block text-sm text-gray-400">{criterion.name}</label>
                      {criterion.scoreType === 'number' ? (
                        <input
                          type="number"
                          value={alternative.scores[critIndex]?.value ?? ''}
                          min={criterion.min}
                          max={criterion.max}
                          onChange={e => handleNumberScoreChange(index, critIndex, e.target.value)}
                          placeholder={`Nilai (${criterion.min} - ${criterion.max})`}
                          className="w-full px-3 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                        />
                      ) : (
                        <select
                          value={alternative.scores[critIndex]?.selectedSubCriterion ?? ''}
                          onChange={e => handleOptionScoreChange(index, critIndex, parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                        >
                          <option value="">Pilih nilai</option>
                          {criterion.options.map((opt, subIndex) => (
                            <option key={subIndex} value={subIndex}>
                              {opt.name} ({opt.value})
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {alternatives.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-400 flex flex-col items-center gap-4"
          >
            <FaUsers className="w-12 h-12 text-miku-accent" />
            <p>Belum ada kandidat. Klik "Tambah Kandidat" untuk menambahkan.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AlternativeForm;