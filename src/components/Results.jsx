import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FaChartBar } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Results = () => {
  const { calculateResults, criteria } = useApp();
  const results = calculateResults();

  const formatGap = (gap) => {
    if (gap === 0) return '0';
    return gap > 0 ? `+${gap}` : `${gap}`;
  };

  const chartData = results.map(result => ({
    name: result.name,
    score: result.score
  }));

  // Get criterion names by type
  const coreCriteria = criteria.filter(c => c.factorType === 'core');
  const secondaryCriteria = criteria.filter(c => c.factorType === 'secondary');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FaChartBar className="w-6 h-6 text-miku" />
          <h2 className="text-xl font-bold text-miku">Hasil Perhitungan</h2>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="bg-dark-lighter p-6 rounded-lg border border-miku/10">
          <div className="h-[300px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                  cursor={{ fill: 'rgba(57, 208, 255, 0.1)' }}
                  itemStyle={{ color: '#F3F4F6' }}
                />
                <Bar dataKey="score" fill="#39D0FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark p-6 rounded-lg border border-miku/10"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-miku">{result.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Ranking:</span>
                    <span className="text-lg font-bold text-miku">{index + 1}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-400">Core Factor (60%)</h4>
                    <div className="space-y-2">
                      {result.cfScores.map((score, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">{coreCriteria[i]?.name}</span>
                          <span className="text-white">{score.toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center text-sm font-medium pt-2 border-t border-gray-700">
                        <span className="text-gray-400">Rata-rata CF</span>
                        <span className="text-miku">{result.cf.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-400">Secondary Factor (40%)</h4>
                    <div className="space-y-2">
                      {result.sfScores.map((score, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">{secondaryCriteria[i]?.name}</span>
                          <span className="text-white">{score.toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center text-sm font-medium pt-2 border-t border-gray-700">
                        <span className="text-gray-400">Rata-rata SF</span>
                        <span className="text-miku">{result.sf.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-medium text-gray-400">Detail Perhitungan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Nilai Mentah</span>
                        <span className="text-white">{result.rawScores.join(', ')}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">GAP</span>
                        <span className="text-white">{result.gaps.map(formatGap).join(', ')}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Bobot</span>
                        <span className="text-white">{result.weightedScores.map(score => score.toFixed(2)).join(', ')}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Core Factor (60%)</span>
                        <span className="text-miku">{(result.cf * 0.6).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Secondary Factor (40%)</span>
                        <span className="text-miku">{(result.sf * 0.4).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-medium pt-2 border-t border-gray-700">
                        <span className="text-gray-400">Total Nilai</span>
                        <span className="text-miku">{result.score.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-400 flex flex-col items-center gap-4"
        >
          <FaChartBar className="w-12 h-12 text-miku-accent" />
          <p>Belum ada hasil perhitungan. Silakan lengkapi data kriteria dan kandidat terlebih dahulu.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Results; 