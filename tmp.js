/* eslint-disable */
function initialize() {
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  var map = new google.maps.Map(
    document.getElementById('map-canvas'),
    mapOptions,
  );

  var coord1 = new google.maps.LatLng(49.165876, -123.152446);
  var coord2 = new google.maps.LatLng(25.786328, -80.193694);
  var bounds = new google.maps.LatLngBounds();
  bounds.extend(coord1);
  bounds.extend(coord2);
  map.fitBounds(bounds);

  pLineOpt = {
    path: [coord1, coord2],
    strokeWeight: 4,
    strokeOpacity: 0,
    map: map,
  };

  pLine = new google.maps.Polyline(pLineOpt);

  var markers = [
    new google.maps.Marker({
      position: coord1,
      map: map,
    }),
    new google.maps.Marker({
      position: coord2,
      map: map,
    }),
  ];

  google.maps.event.addListener(map, 'zoom_changed', function () {
    //points
    var p1 = map.getProjection().fromLatLngToPoint(coord1);
    var p2 = map.getProjection().fromLatLngToPoint(coord2);
    //distance between points
    var d = new google.maps.Point(p2.x - p1.x, p2.y - p1.y);
    var lengthSqr = d.x * d.x + d.y * d.y;
    //middle point
    var m = new google.maps.Point(d.x / 2, d.y / 2);
    //slope of perpendicular line
    var perpK = -d.x / d.y;
    //distance to control point
    var ratioDistanceControlLengthSqr = 9;
    var controlDSqr = lengthSqr / ratioDistanceControlLengthSqr;
    var p3dX = Math.sqrt(controlDSqr / (Math.pow(perpK, 2) + 1));
    var p3dY = perpK * p3dX;
    //control point
    var p3 = new google.maps.Point(m.x - p3dX, m.y - p3dY);
    //curve path
    var path = 'M 0 0 q ' + p3.x + ' ' + p3.y + ' ' + d.x + ' ' + d.y;
    //calc scale
    var zoom = map.getZoom();
    var scale = 1 / Math.pow(2, -zoom);

    var icon = {
      path: path,
      scale: scale,
      strokeWeight: 3,
      strokeOpacity: 1,
    };

    pLineOpt.icons = [
      {
        fixedRotation: true,
        icon: icon,
        offset: '0',
      },
    ];
    pLine.setOptions(pLineOpt);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
