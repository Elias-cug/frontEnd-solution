import { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useRef } from 'react';
import { points, paths } from './mock';
import { getDistance } from './';
const amapKey = 'e164633fbf4b202816aebfc4fd04750e';

const CustomTable = () => {
  let map = useRef(null);

  // 添加点
  function addPoint(AMap, pointData) {
    const points = Array.isArray(pointData) ? pointData : [pointData];
    const pointMarkers = [];
    points.forEach((item) => {
      const p = item.position;
      const marker = new AMap.Marker({
        position: new AMap.LngLat(p[0], p[1]),
      });
      pointMarkers.push(marker);
    });
    return pointMarkers;
  }

  // 添加折线
  function addPolyline(AMap, pathData) {
    const paths = Array.isArray(pathData) ? pathData : [pathData];
    const polylines = [];
    paths.forEach((item) => {
      const p = item.path;
      const polyline = new AMap.Polyline({
        path: [
          new AMap.LngLat(p[0][0], p[0][1]),
          new AMap.LngLat(p[1][0], p[1][1]),
        ],
      });
      polylines.push(polyline);
    });
    const overlayGroup = new AMap.OverlayGroup(polylines);
    overlayGroup.setOptions({
      showDir: true,
      strokeColor: '#4DE27F',
      strokeWeight: 1.5,
    });
    return overlayGroup;
  }

  // 添加曲线
  function addBezierCurvel(AMap, pathData) {
    const paths = Array.isArray(pathData) ? pathData : [pathData];
    const bezierCurves = [];
    paths.forEach((item) => {
      const p = item.path;
      const bezierCurve = new AMap.BezierCurve({
        path: [
          p[0],
          [
            (p[0][0] + p[1][0] + Math.random() * 0.01) / 2,
            (p[0][1] + p[1][1] + Math.random() * 0.01) / 2,
            ...p[1],
          ],
        ],
        showDir: true,
        strokeColor: '#4DE27F',
        strokeWeight: 1.5,
      });
      bezierCurves.push(bezierCurve);
    });
    return bezierCurves;
  }

  useEffect(() => {
    const mapId = document.getElementById('mapId');
    const init = function (AMap) {
      if (!AMap) return;
      map.current = new AMap.Map(mapId, {
        zoom: 10,
        center: [123.499114, 41.886487],
        mapStyle: 'amap://styles/darkblue',
      });
      // 地图添加点
      // map.current.add(addPoint(AMap, points));
      // 地图添加折现
      // map.current.add(addPolyline(AMap, paths));
      // 曲线实现
      map.current.add(addBezierCurvel(AMap, paths));
    };

    AMapLoader.load({
      key: amapKey,
      version: '2.0',
      Loca: {
        version: '2.0.0',
      },
    }).then(init);
  }, []);
  return (
    <PageContainer ghost>
      <span className={styles.title}>高德地图使用：</span>
      <div className={styles.table}>
        <div id="mapId" style={{ width: 1100, height: 800 }}></div>
      </div>
    </PageContainer>
  );
};

export default CustomTable;
