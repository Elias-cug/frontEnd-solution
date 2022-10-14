function rad(d) {
  return (d * Math.PI) / 180.0;
}

export function getDistance(lon1, lat1, lon2, lat2) {
  let radLat1 = rad(lat1);
  let radLat2 = rad(lat2);
  let a = radLat1 - radLat2;
  let b = rad(lon1) - rad(lon2);
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );

  //赤道半径(单位m)
  let EARTH_RADIUS = 6371000;
  s = s * EARTH_RADIUS;
  //单位m
  s = Math.round(s * 10000) / 10000;
  //m转为km保留三个小数
  return new DecimalFormat('0.000').format(s / 1000);
}

function getPath(AMap, path) {
  const coord1 = new AMap.LngLat(path[0][0], path[0][1]);
  const coord2 = new AMap.LngLat(path[1][0], path[1][1]);

  //points
  // const p1 = map.getProjection().fromLatLngToPoint(coord1);
  // const p2 = map.getProjection().fromLatLngToPoint(coord2);

  //distance between points
  // const d = new google.maps.Point(p2.x - p1.x, p2.y - p1.y);
  // const lengthSqr = d.x * d.x + d.y * d.y;
  //middle point
  // const m = new google.maps.Point(d.x / 2, d.y / 2);
  //slope of perpendicular line
  // const perpK = -d.x / d.y;
  //distance to control point
  // const ratioDistanceControlLengthSqr = 9;
  // const controlDSqr = lengthSqr / ratioDistanceControlLengthSqr;
  // const p3dX = Math.sqrt(controlDSqr / (Math.pow(perpK, 2) + 1));
  // const p3dY = perpK * p3dX;
  //control point
  // const p3 = new google.maps.Point(m.x - p3dX, m.y - p3dY);
  //curve path
  // const path = "M 0 0 q " + p3.x + " " + p3.y + " " + d.x + " " + d.y;
  //calc scale
  // const zoom = map.getZoom();
  // const scale = 1 / (Math.pow(2, -zoom));
}
