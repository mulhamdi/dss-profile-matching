import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Initialize state with data from localStorage
  const [criteria, setCriteria] = useState(() => {
    const savedCriteria = localStorage.getItem('criteria');
    return savedCriteria ? JSON.parse(savedCriteria) : [];
  });
  
  const [alternatives, setAlternatives] = useState(() => {
    const savedAlternatives = localStorage.getItem('alternatives');
    return savedAlternatives ? JSON.parse(savedAlternatives) : [];
  });
  
  const [currentSection, setCurrentSection] = useState('criteria');

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('criteria', JSON.stringify(criteria));
  }, [criteria]);

  useEffect(() => {
    localStorage.setItem('alternatives', JSON.stringify(alternatives));
  }, [alternatives]);

  const addCriterion = () => {
    setCriteria((prev) => [
      ...prev,
      {
        name: '',
        factorType: 'core',
        standardValue: 1,
        scoreType: 'number', // 'number' or 'options'
        min: 1,
        max: 10,
        options: [
          { name: 'Pilihan 1', value: 1 },
          { name: 'Pilihan 2', value: 5 },
          { name: 'Pilihan 3', value: 9 },
        ],
        subCriteria: [], // for compatibility, can be removed later
      },
    ]);
  };

  const updateCriterion = (index, field, value) => {
    setCriteria((prev) =>
      prev.map((c, i) =>
        i === index
          ? {
              ...c,
              [field]: value,
              // Reset options/min/max if scoreType changes
              ...(field === 'scoreType'
                ? value === 'number'
                  ? { min: 1, max: 10, options: [] }
                  : { options: [
                      { name: 'Pilihan 1', value: 1 },
                      { name: 'Pilihan 2', value: 5 },
                      { name: 'Pilihan 3', value: 9 },
                    ], min: undefined, max: undefined }
                : {}),
            }
          : c
      )
    );
  };

  const updateCriterionOption = (critIndex, optIndex, field, value) => {
    setCriteria((prev) =>
      prev.map((c, i) =>
        i === critIndex
          ? {
              ...c,
              options: c.options.map((opt, j) =>
                j === optIndex ? { ...opt, [field]: value } : opt
              ),
            }
          : c
      )
    );
  };

  const addCriterionOption = (critIndex) => {
    setCriteria((prev) =>
      prev.map((c, i) =>
        i === critIndex
          ? { ...c, options: [...c.options, { name: '', value: 1 }] }
          : c
      )
    );
  };

  const removeCriterionOption = (critIndex, optIndex) => {
    setCriteria((prev) =>
      prev.map((c, i) =>
        i === critIndex
          ? { ...c, options: c.options.filter((_, j) => j !== optIndex) }
          : c
      )
    );
  };

  const removeCriterion = (index) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  const addAlternative = () => {
    if (alternatives.length >= 16) {
      alert('Maksimal 16 kandidat!');
      return;
    }
    setAlternatives([...alternatives, {
      name: '',
      scores: criteria.map(() => ({ selectedSubCriterion: null }))
    }]);
  };

  const updateAlternative = (index, field, value) => {
    const newAlternatives = [...alternatives];
    newAlternatives[index] = { ...newAlternatives[index], [field]: value };
    setAlternatives(newAlternatives);
  };

  const updateAlternativeScore = (altIndex, critIndex, subCriterionIndex) => {
    const newAlternatives = [...alternatives];
    newAlternatives[altIndex].scores[critIndex] = {
      selectedSubCriterion: subCriterionIndex
    };
    setAlternatives(newAlternatives);
  };

  const removeAlternative = (index) => {
    setAlternatives(alternatives.filter((_, i) => i !== index));
  };

  const getGapWeight = (gap) => {
    const gapWeights = {
      0: 5,    // Tidak ada selisih (kompetensi sesuai)
      1: 4.5,  // Kompetensi individu kelebihan 1 tingkat
      '-1': 4, // Kompetensi individu kekurangan 1 tingkat
      2: 3.5,  // Kompetensi individu kelebihan 2 tingkat
      '-2': 3, // Kompetensi individu kekurangan 2 tingkat
      3: 2.5,  // Kompetensi individu kelebihan 3 tingkat
      '-3': 2, // Kompetensi individu kekurangan 3 tingkat
      4: 1.5,  // Kompetensi individu kelebihan 4 tingkat
      '-4': 1  // Kompetensi individu kekurangan 4 tingkat
    };
    return gapWeights[gap] || 0;
  };

  const calculateGap = () => {
    return alternatives.map(alternative => {
      return alternative.scores.map((score, critIndex) => {
        const criterion = criteria[critIndex];
        let candidateValue = 0;
        if (criterion.scoreType === 'number') {
          candidateValue = typeof score.value === 'number' ? score.value : 0;
        } else if (criterion.scoreType === 'options') {
          const selectedIdx = score.selectedSubCriterion;
          candidateValue =
            typeof selectedIdx === 'number' && criterion.options[selectedIdx]
              ? criterion.options[selectedIdx].value
              : 0;
        }
        return candidateValue - (criterion.standardValue || 0);
      });
    });
  };

  const calculateResults = () => {
    if (criteria.length === 0 || alternatives.length === 0) {
      return [];
    }

    // 1. Calculate gap
    const gaps = calculateGap();

    // 2. Convert gaps to weights
    const weightedScores = gaps.map(alternativeGaps => {
      return alternativeGaps.map(gap => getGapWeight(gap));
    });

    // 3. Calculate CF and SF
    const cfWeight = 0.6;
    const sfWeight = 0.4;

    const results = alternatives.map((alternative, index) => {
      // Get raw scores
      const rawScores = alternative.scores.map((score, critIndex) => {
        const criterion = criteria[critIndex];
        if (criterion.scoreType === 'number') {
          return typeof score.value === 'number' ? score.value : 0;
        } else if (criterion.scoreType === 'options') {
          const selectedIdx = score.selectedSubCriterion;
          return typeof selectedIdx === 'number' && criterion.options[selectedIdx]
            ? criterion.options[selectedIdx].value
            : 0;
        }
        return 0;
      });

      // Separate scores based on factor type
      const cfScores = weightedScores[index].filter((_, i) => criteria[i].factorType === 'core');
      const sfScores = weightedScores[index].filter((_, i) => criteria[i].factorType === 'secondary');

      // Calculate Core Factor (NCF = Σ NC / Σ IC)
      const cf = cfScores.length > 0 ? cfScores.reduce((sum, score) => sum + score, 0) / cfScores.length : 0;

      // Calculate Secondary Factor (NSF = Σ NS / Σ IS)
      const sf = sfScores.length > 0 ? sfScores.reduce((sum, score) => sum + score, 0) / sfScores.length : 0;

      // Calculate total score (N = (60% * NCF) + (40% * NSF))
      const totalScore = (cf * cfWeight) + (sf * sfWeight);

      return {
        name: alternative.name,
        score: totalScore,
        cf,
        sf,
        gaps: gaps[index],
        weightedScores: weightedScores[index],
        cfScores,
        sfScores,
        rawScores
      };
    });

    // Sort by score in descending order
    return results.sort((a, b) => b.score - a.score);
  };

  const resetData = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data?')) {
      setCriteria([]);
      setAlternatives([]);
      localStorage.removeItem('criteria');
      localStorage.removeItem('alternatives');
    }
  };

  return (
    <AppContext.Provider value={{
      criteria,
      setCriteria,
      addCriterion,
      updateCriterion,
      updateCriterionOption,
      addCriterionOption,
      removeCriterionOption,
      alternatives,
      setAlternatives,
      currentSection,
      setCurrentSection,
      removeCriterion,
      addAlternative,
      updateAlternative,
      updateAlternativeScore,
      removeAlternative,
      calculateResults,
      resetData
    }}>
      {children}
    </AppContext.Provider>
  );
}; 