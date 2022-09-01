// import styles from './index.less'

interface IProp {
  imageList: Array<any>;
}

const HomePage: React.FC<IProp> = ({ imageList }) => {
  return (
    <div id="main">
      <div id="display">
        <ul>
          {imageList.map((item) => {
            return (
              <li key={item.id}>
                <img src={item.src} />
              </li>
            );
          })}
        </ul>
        <ol id=""></ol>
        <div id="arrow">
          <span id="left" title="前一张"></span>
          <span id="right" title="后一张"></span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
