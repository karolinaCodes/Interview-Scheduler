import {useState} from "react";

// manages visual mode of the appointment slot
const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    // if replace is true, replace the current mode to newMode and update the history state array
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

  // go back to previous mode in history stack
  const back = () => {
    setHistory(prev => {
      if (prev.length === 1) {
        return [...prev];
      }
      prev.pop();
      const prevItem = prev[prev.length - 1];
      setMode(prevItem);
      return prev;
      // const historyClone = [...history];
      // historyClone.pop();
      // const prevItem = historyClone[historyClone.length - 1];
      // setMode(prevItem);
      // setHistory(historyClone);

      // if (prev.length === 1) {
      //   return [...prev];
      // }

      // const lastMode = [...prev.slice(0, -1)];
      // setMode(lastMode[lastMode.length - 1]);

      // return lastMode;
    });
  };

  return {mode, transition, back};
};

export default useVisualMode;
