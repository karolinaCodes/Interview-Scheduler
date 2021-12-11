import {useState} from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    //if replace is true, replace the current mode to newMode and update the history state array
    if (replace) {
      setMode(newMode);
      return setHistory(prev => {
        const historyClone = [...prev];
        historyClone.pop();
        historyClone.push(newMode);
        return historyClone;
      });
    }

    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
  };

  //goes back to previous mode in history state
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
