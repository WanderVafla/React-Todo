import { useState } from 'react';

export function useFilter(ObjectEnum: object) {
  const values = Object.values(ObjectEnum);
  const countMax = values.length - 1;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const increment = () =>
    setCurrentIndex((prevIndex) => {
      console.log(`hookState ${prevIndex}`);
      if (prevIndex >= countMax) {
        return 0;
      }
      return prevIndex + 1;
    });

  return [values[currentIndex], increment] as const;
}
