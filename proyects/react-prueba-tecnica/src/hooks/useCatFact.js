import { useEffect, useState } from "react";
import { getRandomFact } from "../service/fact";

export function useCatFact() {
  const [fact, setFact] = useState();

  const getRandomFactAndUpdateState = async () => {
    const newFact = await getRandomFact();
    setFact(newFact);
  };

  useEffect(() => {
    getRandomFactAndUpdateState();
  }, []);

  return { fact, getRandomFactAndUpdateState };
}
