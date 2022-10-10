import { useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

const amapKey = 'e164633fbf4b202816aebfc4fd04750e';

export default function useMap({ mapId }) {
  const init = function (AMapCls) {
    new AMapCls.Map(mapId);
  };

  useEffect(() => {
    AMapLoader.load({
      key: amapKey,
      version: '2.0',
      Loca: {
        version: '2.0.0',
      },
    }).then(init);
  }, []);

  return { init };
}
