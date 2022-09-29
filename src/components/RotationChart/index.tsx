// @ts-nocheck
import { useEffect, useState } from 'react';
import styles from './index.less';

interface IProp {
  imageList: Array<any>;
}

function useInterval(cb, interval) {
  useEffect(() => {
    const start = new Date().getTime();

    const I = setInterval(() => {
      cb(new Date().getTime() - start);
    }, interval);

    return () => clearInterval(I);
  }, []);
}

function useSlider(N, speed = 1000) {
  const [slider, setSlider] = useState(0);

  useInterval((diff) => {
    console.log('diff', diff);
    console.log(Math.floor(diff / speed) % N);
    setSlider(() => Math.floor(diff / speed) % N);
  }, 300);

  return slider;
}

const HomePage: React.FC<IProp> = ({ imageList }) => {
  const DEFAULT_WIDTH = 600;
  const slider = useSlider(imageList.length);
  return (
    <div className={styles.scroller}>
      <div
        className={styles.inner}
        style={{
          width: `${imageList.length * DEFAULT_WIDTH}px`,
          transform: `translateX(-${(100 * slider) / imageList.length}%`,
        }}
      >
        {imageList.map((item) => {
          return (
            <img
              key={item.id}
              src={item.src}
              style={{ width: DEFAULT_WIDTH }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
