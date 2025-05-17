import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, StarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FaChartLine } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { useRef, useEffect } from 'react';

const CriteriaForm = () => {
  const {
    criteria,
    addCriterion,
    updateCriterion,
    updateCriterionOption,
    addCriterionOption,
    removeCriterionOption,
    removeCriterion
  } = useApp();

  const lastCriterionRef = useRef(null);

  const handleAddCriterion = () => {
    addCriterion();
    // Scroll to the new criterion after it's added
    setTimeout(() => {
      lastCriterionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
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
          <FaChartLine className="w-6 h-6 text-miku" />
          <div>
            <h2 className="text-lg md:text-xl font-bold text-miku">Kriteria</h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">Maksimal 8 kriteria</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddCriterion}
          className="mt-2 md:mt-0 px-4 py-2 bg-miku-dark hover:bg-miku text-white rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center gap-2 shadow-lg w-full md:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Kriteria
        </motion.button>
      </div>

      <div className="space-y-4">
        {criteria.map((criterion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-lighter p-6 rounded-lg border border-miku/10 hover:border-miku/20 transition-colors"
            ref={index === criteria.length - 1 ? lastCriterionRef : null}
          >
            <div className="space-y-4">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                    <MdDriveFileRenameOutline className="w-4 h-4 text-miku-accent" />
                    Nama Kriteria
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={criterion.name}
                      onChange={(e) => updateCriterion(index, 'name', e.target.value)}
                      placeholder="Contoh: Harga"
                      className="w-full px-3 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeCriterion(index)}
                      className="px-3 py-2 text-miku-accent hover:text-miku-accent-dark transition-colors self-end"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                    <StarIcon className="w-4 h-4 text-miku-accent" />
                    Jenis Faktor
                  </label>
                  <select
                    value={criterion.factorType}
                    onChange={(e) => updateCriterion(index, 'factorType', e.target.value)}
                    className="w-full px-3 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                  >
                    <option value="core">Core Factor (60%)</option>
                    <option value="secondary">Secondary Factor (40%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4 text-miku-accent" />
                    Nilai Standar
                  </label>
                  <input
                    type="number"
                    value={criterion.standardValue}
                    onChange={(e) => updateCriterion(index, 'standardValue', parseInt(e.target.value))}
                    min="1"
                    max="9"
                    className="w-full px-3 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                    <FaChartLine className="w-4 h-4 text-miku-accent" />
                    Skala Penilaian
                  </label>
                  <select
                    value={criterion.scoreType}
                    onChange={(e) => updateCriterion(index, 'scoreType', e.target.value)}
                    className="w-full px-3 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                  >
                    <option value="number">Angka (Range)</option>
                    <option value="options">Pilihan</option>
                  </select>
                </div>
              </div>

              {/* Skala Penilaian */}
              {criterion.scoreType === 'number' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Nilai Minimum</label>
                    <input
                      type="number"
                      value={criterion.min}
                      onChange={(e) => updateCriterion(index, 'min', parseInt(e.target.value))}
                      min="1"
                      max={criterion.max || 10}
                      className="w-full px-3 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Nilai Maksimum</label>
                    <input
                      type="number"
                      value={criterion.max}
                      onChange={(e) => updateCriterion(index, 'max', parseInt(e.target.value))}
                      min={criterion.min || 1}
                      max="100"
                      className="w-full px-3 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                    />
                  </div>
                </div>
              )}
              {criterion.scoreType === 'options' && (
                <div className="space-y-2">
                  {criterion.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={opt.name}
                        onChange={(e) => updateCriterionOption(index, optIdx, 'name', e.target.value)}
                        placeholder={`Label Pilihan ${optIdx + 1}`}
                        className="flex-1 min-w-0 px-3 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                      />
                      <input
                        type="number"
                        value={opt.value}
                        onChange={(e) => updateCriterionOption(index, optIdx, 'value', parseInt(e.target.value))}
                        placeholder="Nilai"
                        className="w-16 px-2 py-2 bg-dark border border-miku/20 rounded-lg text-white focus:outline-none focus:border-miku"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeCriterionOption(index, optIdx)}
                        className="shrink-0 px-2 py-2 text-miku-accent hover:text-miku-accent-dark transition-colors"
                        disabled={criterion.options.length <= 1}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </motion.button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addCriterionOption(index)}
                    className="mt-1 px-3 py-1 bg-miku-accent/20 hover:bg-miku-accent/40 text-miku-accent rounded text-xs font-medium"
                  >
                    Tambah Pilihan
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {criteria.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-400 flex flex-col items-center gap-4"
          >
            <FaChartLine className="w-12 h-12 text-miku-accent" />
            <p>Belum ada kriteria. Klik "Tambah Kriteria" untuk menambahkan.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CriteriaForm;