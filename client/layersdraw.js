
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

// _polylineEditor = function (coordsList, options) {
  // options = _.extend({}, options);
  // return L.polyline.PolylineEditor(_.map(coordsList, function (coords) {
    // return unproject(coords); 
  // }), options);
// };


//Initializes the drawing plugin
//var drawCoordinates = [ [45.2750072361, 13.7187695503], [45.2757622049, 13.7198746204], [45.2763963762, 13.7197780609]];
// var polyline = L.Polyline.PolylineEditor([
  // unproject([2000, 1000]),
  // unproject([2000, 2000]),
  // unproject([3000, 2500])
  // ], {maxMarkers: 100}).addTo(map);


var prepareLayers = function () {
  //Prepare PopUps
  var pop1 = "<b>This is a marker</b><br> <a href=\"https://picasaweb.google.com/lh/photo/w2fL5fz4UoRzfWOUqeK9ldMTjNZETYmyPJy0liipFm0?feat=directlink\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-OPNp3bc7_G0/UibOVAjw6aI/AAAAAAACohs/bTELWpH-wLs/s300/2013-08-11%2520-%2520158a%2520-%2520Half%2520Dome%2520NWRR%2520-%2520IMG_2586.jpg\" /></a><br><b><i>P13, P14, and P15 (5.7, 5.7-5.9, 5.9) chimney pitches that I would link in one 230' pitch with our 70m rope. Good thing chimneys are easy to climb in the dark!</i></b>";
  
  //Prepare Markers  
  var marker = _marker([8000, 4000]).addTo(map);
  marker.bindPopup(pop1);
 
 //Prepare Circles
  var circle = _circle([4000, 1000], 200, {
   color: 'red',
   fillColor: '#f03',
   fillOpacity: 0.5
  }).addTo(map);

  //Prepare Polygons
  var polygon = _polygon([
  [5001.509, 1000],
  [5001.503, 2000],
  [6000, 2500]
  ]).addTo(map);

  //Prepare Polylines
  var polyline = _polyline([
  [6000, 6000],
  [8000, 3000],
  [3000, 2500]
  ]).addTo(map);

  var polylineStart = _polyline.polylineEditor([
  [1000, 1000],
  [2000, 2000]
  ]).addTo(map);
  
  
  //Prepare Layer Groups
  
};