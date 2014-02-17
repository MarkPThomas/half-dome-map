var unproject = function (coords) {
  return map.unproject(coords, map.getMaxZoom());
};

_marker = function (coords, options) {
  options = _.extend({icon: myIcon}, options);
  return L.marker(unproject(coords), options);
};

_circle = function (center, radius, options) {
  options = _.extend({}, options);
  return L.circle(unproject(center), radius, options);
};

_polygon = function (coordsList, options) {
  options = _.extend({}, options);
  return L.polygon(_.map(coordsList, function (coords) {
    return unproject(coords); 
  }), options);
};

_polyline = function (coordsList, options) {
  options = _.extend({}, options);
  return L.polyline(_.map(coordsList, function (coords) {
    return unproject(coords); 
  }), options);
};

var prepareLayers = function () {
  var marker = _marker([8000, 4000]).addTo(map);
 
  var circle = _circle([4000, 1000], 200, {
   color: 'red',
   fillColor: '#f03',
   fillOpacity: 0.5
  }).addTo(map);

  var polygon = _polygon([
  [5001.509, 1000],
  [5001.503, 2000],
  [6000, 2500]
  ]).addTo(map);

  var polyline = _polyline([
  [2000, 1000],
  [2000, 2000],
  [3000, 2500]
  ]).addTo(map);
};