import {useState} from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    //if replace is true, replace the current mode to newMode and update the history state array
    if (replace) {
      setMode(newMode);
      const historyClone = [...history];
      historyClone.pop();
      historyClone.push(newMode);
      return setHistory(historyClone);
    }

    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
  };

  const back = () => {
    if (history.length === 1) {
      return history;
    }
    const historyClone = [...history];
    historyClone.pop();
    const prevItem = historyClone[historyClone.length - 1];
    setMode(prevItem);
    setHistory(historyClone);
  };

  return {mode, transition, back};
};

export default useVisualMode;

// setHistory(prev => {
//   const historyClone = [...prev];
//   if (historyClone.length === 1) {
//     return historyClone;
//   }

//   const mode = historyClone.pop();
//   setMode(historyClone[historyClone.length - 1]);
//   return historyClone;
// });
