import { PageContainer } from '@ant-design/pro-components';
import Table from '../../components/Table';
import styles from './index.less';

const CustomTable = () => {
  const getRandom = function () {
    return (Math.random() * 1000).toFixed(0);
  };
  const columns = [
    {
      dataIndex: 'name',
      title: '街道名称',
    },
    {
      dataIndex: 'personCount',
      title: '居民总数',
    },
    {
      dataIndex: 'signCount',
      title: '累计注册数',
    },
    {
      dataIndex: 'signRate',
      title: '累计注册率',
    },
    {
      dataIndex: 'personScore',
      title: '居民累计积分',
    },
    {
      dataIndex: 'changeScore',
      title: '累计兑换积分',
    },
    {
      dataIndex: 'changeRate',
      title: '累计兑换率',
    },
  ];
  const datasource = [
    {
      name: '长安街道',
      personCount: getRandom(),
      signCount: getRandom(),
      signRate: '100%',
      personScore: 553,
      changeScore: 331,
      changeRate: '80%',
    },
    {
      name: '长安街道',
      personCount: getRandom(),
      signCount: getRandom(),
      signRate: '100%',
      personScore: 553,
      changeScore: 331,
      changeRate: '80%',
    },
    {
      name: '长安街道',
      personCount: getRandom(),
      signCount: getRandom(),
      signRate: '100%',
      personScore: 553,
      changeScore: 331,
      changeRate: '80%',
    },
    {
      name: '长安街道',
      personCount: getRandom(),
      signCount: getRandom(),
      signRate: '100%',
      personScore: 553,
      changeScore: 331,
      changeRate: '80%',
    },
    {
      name: '长安街道',
      personCount: getRandom(),
      signCount: getRandom(),
      signRate: '100%',
      personScore: 553,
      changeScore: 331,
      changeRate: '80%',
    },
    {
      name: '长安街道',
      personCount: getRandom(),
      signCount: getRandom(),
      signRate: '100%',
      personScore: 553,
      changeScore: 331,
      changeRate: '80%',
    },
    {
      name: '长安街道',
      personCount: getRandom(),
      signCount: getRandom(),
      signRate: '100%',
      personScore: 553,
      changeScore: 331,
      changeRate: '80%',
    },
    {
      name: '长安街道',
      personCount: getRandom(),
      signCount: getRandom(),
      signRate: '100%',
      personScore: 553,
      changeScore: 331,
      changeRate: '80%',
    },
    {
      name: '长安街道',
      personCount: getRandom(),
      signCount: getRandom(),
      signRate: '100%',
      personScore: 553,
      changeScore: 331,
      changeRate: '80%',
    },
    {
      name: '长安街道',
      personCount: getRandom(),
      signCount: getRandom(),
      signRate: '100%',
      personScore: 553,
      changeScore: 331,
      changeRate: '80%',
    },
  ];

  return (
    <PageContainer ghost>
      <span className={styles.title}>自定义表格：</span>
      <div className={styles.table}>
        <Table columns={columns} datasource={datasource} />
      </div>
    </PageContainer>
  );
};

export default CustomTable;
