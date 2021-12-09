import {useState} from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    // If replace is true, set history to replace the current mode
    setMode(newMode);

    if (!replace) {
      setHistory(prev => [...prev, newMode]);
    }
  };

  const back = () => {
    setHistory(prev => {
      const historyClone = [...prev];
      if (historyClone.length === 1) {
        return historyClone;
      }

      const mode = historyClone.pop();
      setMode(historyClone[historyClone.length - 1]);
      return historyClone;
    });
  };

  return {mode, transition, back};
};

export default useVisualMode;
