import { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import useMap from '../../hooks/map/useMap';

const CustomTable = () => {
  const mapEle = document.getElementById('mapId');
  const { init } = useMap({ mapId: mapEle });
  useEffect(() => {
    // init()
  });
  return (
    <PageContainer ghost>
      <span className={styles.title}>高德地图使用：</span>
      <div className={styles.table}>
        <div id="mapId" style={{ width: 800, height: 800 }}></div>
      </div>
    </PageContainer>
  );
};

export default CustomTable;
