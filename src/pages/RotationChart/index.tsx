import { PageContainer } from '@ant-design/pro-components';
import RotationChart from '../../components/RotationChart';
import styles from './index.less';

const HomePage: React.FC = () => {
  const imageList = [
    { id: '1', src: require('@/assets/rotation_chart/1.jpeg') },
    { id: '2', src: require('@/assets/rotation_chart/2.jpeg') },
    { id: '3', src: require('@/assets/rotation_chart/3.jpeg') },
    { id: '4', src: require('@/assets/rotation_chart/4.jpeg') },
  ];
  return (
    <PageContainer ghost>
      <span className={styles.title}>轮播图一：</span>
      <RotationChart imageList={imageList} />
    </PageContainer>
  );
};

export default HomePage;
