import { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useRef } from 'react';
import { points, paths } from './mock';

import icon1 from '../../assets/map/icon1.svg';
import icon2 from '../../assets/map/icon2.svg';
import icon3 from '../../assets/map/icon3.svg';
const amapKey = 'e164633fbf4b202816aebfc4fd04750e';

const CustomTable = () => {
  let map = useRef(null);
  let lineGroup = useRef(null);

  // 添加点
  function addPoint(AMap, pointData) {
    const points = Array.isArray(pointData) ? pointData : [pointData];
    const pointMarkers = [];
    points.forEach((item) => {
      let image = null;
      if (item.icon.image === '环保屋') {
        image = icon1;
      } else if (item.icon.image === '中转站') {
        image = icon2;
      } else {
        image = icon3;
      }
      const icon = new AMap.Icon({
        size: new AMap.Size(30, 30), // 图标尺寸
        image: image, // Icon的图像
      });

      const p = item.position;
      const marker = new AMap.Marker({
        position: new AMap.LngLat(p[0], p[1]),
        icon: icon,
        offset: new AMap.Pixel(-15, -15),
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

  function findControlPoint(AMap, path) {
    console.log('传入的坐标');
    console.log(path);
    const c = [];
    // 获取zoom
    const zoom = map.current.getZoom();
    // 将传入的坐标转化为像素点
    const p1 = path[0];
    const p2 = path[1];

    const lnglat1 = new AMap.LngLat(p1[0], p1[1]);
    const lnglat2 = new AMap.LngLat(p2[0], p2[1]);
    const pixel1 = map.current.lngLatToPixel(lnglat1, zoom);
    const pixel2 = map.current.lngLatToPixel(lnglat2, zoom);

    console.log('像素点坐标');
    console.log('pixel1', pixel1);
    console.log('pixel2', pixel2);

    // 求控制点
    // 设控制点距离中心点距离
    // 垂直中心点斜率
    const d = {
      x: pixel2.x - pixel1.x,
      y: pixel2.y - pixel1.y,
    };

    console.log('d=========');
    console.log(d);

    const lengthSqr = d.x * d.x + d.y * d.y;
    const m = {
      x: (pixel2.x - pixel1.x) / 2,
      y: (pixel2.y - pixel1.y) / 2,
    };

    console.log('m=========');
    console.log(m);

    const perpK = -d.x / d.y;
    const ratioDistanceControlLengthSqr = 30;
    const controlDSqr = lengthSqr / ratioDistanceControlLengthSqr;
    const p3dX = Math.sqrt(controlDSqr / (Math.pow(perpK, 2) + 1));
    const p3dY = perpK * p3dX;
    const p3 = {
      x: p3dX + m.x,
      y: p3dY + m.y,
    };

    console.log('P3=========');
    console.log(p3);

    const finalP3 = {
      x: p3.x + pixel1.x,
      y: p3.y + pixel2.y,
    };

    console.log('控制点坐标');
    console.log(finalP3);

    // 将计算好的像素点转化为经纬度
    const lnglatC = map.current.pixelToLngLat(finalP3, zoom);
    console.log('经纬度坐标');
    console.log(lnglatC);

    return lnglatC;
  }

  // 添加曲线
  function addBezierCurvel(AMap, pathData) {
    const paths = Array.isArray(pathData) ? pathData : [pathData];
    const bezierCurves = [];
    findControlPoint(AMap, paths[0].path);
    paths.forEach((item) => {
      const p = item.path;
      const control = findControlPoint(AMap, paths[0].path);
      const bezierCurve = new AMap.BezierCurve({
        path: [p[0], [control.lng, control.lat, ...p[1]]],
        showDir: true,
        strokeColor: '#4DE27F',
        strokeWeight: 1.5,
      });
      bezierCurves.push(bezierCurve);
    });
    lineGroup.current = new AMap.OverlayGroup(bezierCurves.slice(0, 1));
    return lineGroup.current;
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
      map.current.add(addPoint(AMap, points));
      // 地图添加折现
      // map.current.add(addPolyline(AMap, paths));
      // 曲线实现
      map.current.on('zoomend', () => {
        if (lineGroup.current) {
          map.current.remove(lineGroup.current);
        }
        map.current.add(addBezierCurvel(AMap, paths));
      });
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
      <span className={styles.title}>高德地图使用: </span>
      <div className={styles.table}>
        <div id="mapId" style={{ width: 1100, height: 800 }}></div>
      </div>
    </PageContainer>
  );
};

export default CustomTable;
