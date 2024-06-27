import {useRef, useState, useEffect} from 'react';

const useMeasure = count => {
  const refs = useRef([...Array(count)].map(() => React.createRef()));
  const [measures, setMeasures] = useState([...Array(count)].map(() => ({})));

  useEffect(() => {
    const measureElements = () => {
      refs.current.forEach((ref, index) => {
        if (ref.current) {
          ref.current.measure((x, y, width, height, pageX, pageY) => {
            const startX = pageX;
            const startY = pageY;
            console.log(pageY);
            const endX = pageX + width;
            const endY = pageY + height;
            console.log({startX, startY, endX, endY});
            setMeasures(prevMeasures => {
              const newMeasures = [...prevMeasures];
              newMeasures[index] = {startX, startY, endX, endY};
              return newMeasures;
            });
          });
        }
      });
    };

    // Measure the elements after a short delay to ensure they are fully rendered
    const timeoutId = setTimeout(measureElements, 0);

    return () => clearTimeout(timeoutId);
  }, [refs.current]);

  return [refs, measures];
};

export default useMeasure;
