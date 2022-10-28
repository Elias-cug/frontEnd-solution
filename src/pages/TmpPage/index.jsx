import { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';

function TopSubItem() {}

function TopItem() {
  return (
    <div>
      {/* title */}
      <div></div>
      {/* subItems */}
      <div></div>
    </div>
  );
}

const TmpPage = () => {
  useEffect(() => {}, []);
  return (
    <PageContainer ghost>
      <div>
        {/* top */}
        <div>
          <TopItem />
          <TopItem />
        </div>
      </div>
    </PageContainer>
  );
};

export default TmpPage;
