var unproject = function (coords) {
  return map.unproject(coords, map.getMaxZoom());
};

_marker = function (coords, options) {
  options = _.extend({icon: myIcon}, options);
  return L.marker(unproject(coords), options);
};


// _markerDiv = function (coords, options) {
 // options = _.extend({icon: myIcon}, options);
  // return L.marker(unproject(coords), options);
// };

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

// var setup = function (){
 // var zoomLevel = map.getZoom();
 // var _iconSizeX = 30*(1+(18-zoomLevel)), _iconSizeY = 36;
 // var _iconSize = [_iconSizeX, _iconSizeY];

   // map.on('zoomend', function(e){
      // var zoomLevel = map.getZoom();
      // var _iconSizeX = 30*(1+(18-zoomLevel)), _iconSizeY = 36;
      // var _iconSize = [_iconSizeX, _iconSizeY];
      // prepareLayers();
      // });
 // };
 
var prepareLayers = function () {
 // var zoomLevel = map.getZoom();
 // var _iconSizeX = 30*(1+(18-zoomLevel)), _iconSizeY = 36;
 
 // var _iconSize = [_iconSizeX, _iconSizeY];
  // alert(zoomLevel);
  // map.on('zoomend', function(e){
      // var zoomLevel = map.getZoom();
      // var _iconSizeX = 30*(1+(18-zoomLevel)), _iconSizeY = 36;
      // alert(_iconSizeX);
      // alert(_iconSizeY);
      // var _iconSize = [_iconSizeX, _iconSizeY];
      // alert(zoomLevel);
      // return belays.addTo(map);
      // });


  //Prepare PopUps
  var pop1 = "<h2>Pitch n</h2><a href=\"https://picasaweb.google.com/lh/photo/w2fL5fz4UoRzfWOUqeK9ldMTjNZETYmyPJy0liipFm0?feat=directlink\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-OPNp3bc7_G0/UibOVAjw6aI/AAAAAAACohs/bTELWpH-wLs/s300/2013-08-11%2520-%2520158a%2520-%2520Half%2520Dome%2520NWRR%2520-%2520IMG_2586.jpg\" /></a><br><b><i>P13, P14, and P15 (5.7, 5.7-5.9, 5.9) chimney pitches that I would link in one 230' pitch with our 70m rope. Good thing chimneys are easy to climb in the dark!</i></b>";
 
  //Prepare Markers  
    // Settings for IconBelay in its original size
    // iconSize: [60, 73],
    // iconAnchor: [19, 51],
 
 
// Need to figure out how to make belay icon object
// Simplifies code for many icons, especially changes
// Should write code to resize icons depending on zoom level, which would be done much more easily by changing classes!

  var _iconSizeX = 30;
  var _iconSizeY = 36;
  var _iconSize = [_iconSizeX, _iconSizeY];

  myIconBelay1 = L.icon({
    iconUrl: '../public/images/marker-icon-belay1.png',
    iconSize: _iconSize,
    iconAnchor: [9, 25],
    className: 'myIconbelay1'
  });
  
  //--------Belay Icons----------
  
  // Creating belay icons from belay icon object. Not working but kept for now.
  // var myIconBelay1 = new BelayIcon({iconUrl: '../public/images/marker-icon-belay1.png'});
      //myIconBelay2 = new BelayIcon({iconUrl: '../public/images/marker-icon-belay2.png'});
  
  
  // var marker = _marker([8000, 4000]).addTo(map).bindPopup(pop1);  
  
  
  
  // Belay should be able to be combined into a loop function to define it, 
  // ideally automatically scaled to whatever size of a coordinate storage array the user writes, with a pair of coordinates for each icon
  // with a check such that if there is no corresponding myIconBelay & pop #, that a default or highest # one is used

  // for (var i=0; i<Belay.length, i++){
    // var iconBelay = "myIconBelay" + i
    // var Belay = "belay" + i
    
    // var Belay1 = _marker([4162, 6600], {icon:iconBelay}).addTo(map).bindPopup(pop1)
  // }
   
  // var belay1 = _marker([4162, 6600], {icon:myIconBelay1}).addTo(map).bindPopup(pop1),
      // belay2 = _marker([2000, 2000], {icon:myIconBelay2}).addTo(map).bindPopup(pop2),
      // belay3 = _marker([2000, 2000], {icon:myIconBelay3}).addTo(map).bindPopup(pop3),
      // belay4 = _marker([2000, 2000], {icon:myIconBelay4}).addTo(map).bindPopup(pop4),
      // belay5 = _marker([2000, 2000], {icon:myIconBelay5}).addTo(map).bindPopup(pop5),
      // belay6 = _marker([2000, 2000], {icon:myIconBelay6}).addTo(map).bindPopup(pop6),
      // belay7 = _marker([2000, 2000], {icon:myIconBelay7}).addTo(map).bindPopup(pop7),
      // belay8 = _marker([2000, 2000], {icon:myIconBelay8}).addTo(map).bindPopup(pop8),
      // belay9 = _marker([2000, 2000], {icon:myIconBelay9}).addTo(map).bindPopup(pop9),
      // belay10 = _marker([2000, 2000], {icon:myIconBelay10}).addTo(map).bindPopup(pop10),
      // belay11 = _marker([2000, 2000], {icon:myIconBelay11}).addTo(map).bindPopup(pop11),
      // belay12 = _marker([2000, 2000], {icon:myIconBelay12}).addTo(map).bindPopup(pop12),
      // belay13 = _marker([2000, 2000], {icon:myIconBelay13}).addTo(map).bindPopup(pop13),
      // belay14 = _marker([2000, 2000], {icon:myIconBelay14}).addTo(map).bindPopup(pop14),
      // belay15 = _marker([2000, 2000], {icon:myIconBelay15}).addTo(map).bindPopup(pop15),
      // belay16 = _marker([2000, 2000], {icon:myIconBelay16}).addTo(map).bindPopup(pop16),
      // belay17 = _marker([2000, 2000], {icon:myIconBelay17}).addTo(map).bindPopup(pop17),
      // belay18 = _marker([2000, 2000], {icon:myIconBelay18}).addTo(map).bindPopup(pop18),
      // belay19 = _marker([2000, 2000], {icon:myIconBelay19}).addTo(map).bindPopup(pop19),
      // belay20 = _marker([2000, 2000], {icon:myIconBelay20}).addTo(map).bindPopup(pop20),
      // belay21 = _marker([2000, 2000], {icon:myIconBelay21}).addTo(map).bindPopup(pop21),
      // belay22 = _marker([2000, 2000], {icon:myIconBelay22}).addTo(map).bindPopup(pop22),
      // belay23 = _marker([2000, 2000], {icon:myIconBelay23}).addTo(map).bindPopup(pop23),
      // belay24 = _marker([2000, 2000], {icon:myIconBelay24}).addTo(map).bindPopup(pop24),
      // belay25 = _marker([2000, 2000], {icon:myIconBelay25}).addTo(map).bindPopup(pop25);
 
  var belay1 = _marker([4162, 6600], {icon:myIconBelay1, title:'P1'}).bindPopup(pop1),
      belay2 = _marker([4080, 6240], {icon:myIconBelay1}).bindPopup(pop1),
      belay3 = _marker([4040, 5950], {icon:myIconBelay1}).bindPopup(pop1),
      belay4 = _marker([3986, 5460], {icon:myIconBelay1}).bindPopup(pop1),
      belay5 = _marker([4026, 5232], {icon:myIconBelay1}).bindPopup(pop1),
      belay6 = _marker([3892, 4844], {icon:myIconBelay1}).bindPopup(pop1),
      belay7 = _marker([3890, 4380], {icon:myIconBelay1}).bindPopup(pop1),
      belay8 = _marker([4026, 4048], {icon:myIconBelay1}).bindPopup(pop1),
      belay9 = _marker([4182, 3872], {icon:myIconBelay1}).bindPopup(pop1),
      belay10 = _marker([4284, 3736], {icon:myIconBelay1}).bindPopup(pop1),
      belay11 = _marker([4426, 3580], {icon:myIconBelay1}).bindPopup(pop1),
      belay12 = _marker([4630, 3144], {icon:myIconBelay1}).bindPopup(pop1),
      belay13 = _marker([4652, 2838], {icon:myIconBelay1}).bindPopup(pop1),
      belay14 = _marker([4664, 2646], {icon:myIconBelay1}).bindPopup(pop1),
      belay15 = _marker([4746, 2370], {icon:myIconBelay1}).bindPopup(pop1),
      belay16 = _marker([4918, 1990], {icon:myIconBelay1}).bindPopup(pop1),
      belay17 = _marker([5212, 1828], {icon:myIconBelay1}).bindPopup(pop1),  //Big Sandy
      belay18 = _marker([5226, 1530], {icon:myIconBelay1}).bindPopup(pop1),
      belay19 = _marker([5270, 1250], {icon:myIconBelay1}).bindPopup(pop1),
      belay20 = _marker([5308, 1016], {icon:myIconBelay1}).bindPopup(pop1),
      belay21 = _marker([5104, 884], {icon:myIconBelay1}).bindPopup(pop1),
      belay22 = _marker([4966, 760], {icon:myIconBelay1}).bindPopup(pop1),
      belay23 = _marker([4840, 574], {icon:myIconBelay1}).bindPopup(pop1);
 
 
 
 
 // Only add '.addTo(map)' to the control instantiation and not the symbol definition if it is desired 
 // to leave the symbol invisible upon load
 
 //Prepare Circles
  // _circlePhoto = _circle([4000, 1000], 10, {
   // color: 'red',
   // weight: 2,
   // fillColor: '#f03',
   // fillOpacity: 0.5
  // });
  
  var circle = _circle([4000, 1000], 10, {
   color: 'red',
   weight: 2,
   fillColor: '#f03',
   fillOpacity: 0.5
  }).addTo(map).bindPopup(pop1);

  //Prepare Polygons
  
  //Thank God Ledge
  
  //The Zig Zags
  
  
  //The Visor
 
  var Visor1 = _polygon([
  [4995.59913482336, 441.506941522929],
  [4975.58471521269, 627.846024400506],
  [5047.6366258111, 651.889777029871],
  [5063.64816149964, 691.962698078812],
  [5179.73179524153, 679.940821764129],
  [5217.7591925018, 764.093955966906],
  [5331.84138428262, 758.083017809566],
  [5423.90771449171, 752.072079652224],
  [5483.95097332372, 784.130416491376],
  [5626.05335255948, 774.112186229141],
  [5700.10670511896, 730.031973075306],
  [5806.18312905552, 732.035619127753],
  [5850.21485219899, 746.061141494882],
  [5880.236481615, 812.181461225636],
  [5946.28406633021, 828.210629645213],
  [6014.33309300649, 828.210629645213],
  [6072.37490987743, 864.276258589259],
  [6156.43547224225, 874.294488851494],
  [6274.52054794521, 902.345533585753],
  [6404.61427541456, 892.327303323518],
  [6560.72674837779, 858.265320431919],
  [6708.83345349676, 816.188753330529],
  [6772.8795962509, 782.126770438929],
  [6840.92862292718, 738.046557285094],
  [6848.93439077145, 705.988220445941],
  [6718.84066330209, 695.969990183706],
  [6640.78442682048, 722.017388865518],
  [6432.6344628695, 728.028327022859],
  [6310.54650324441, 722.017388865518],
  [6080.3806777217, 663.911653344552],
  [5934.27541456381, 655.897069134764],
  [5774.16005767844, 605.805917823587],
  [5620.04902667628, 573.747580984435],
  [5533.9870223504, 565.732996774646],
  [5415.90194664744, 533.674659935494],
  [5241.77649603461, 517.645491515918],
  [5139.70295602019, 475.568924414529],
  [5089.66690699351, 447.517879680271],
  [5081.66113914924, 445.514233627822],
  [5073.65537130498, 443.510587575376],
  [4995.59913482336, 441.506941522929]
  ], {
  color: 'black',
  weight: 2,
  opacity: 0.5,
  fillColor: '#ffff66',
  fillOpacity: 0.25,
  }).addTo(map);

  var Visor2 = _polygon([
  [5812.18745493872, 673.929883606788],
  [5852.21629416006, 726.024680970411],
  [5880.236481615, 812.181461225636],
  [5946.28406633021, 828.210629645213],
  [6014.33309300649, 828.210629645213],
  [6072.37490987743, 864.276258589259],
  [6156.43547224225, 874.294488851494],
  [6274.52054794521, 902.345533585753],
  [6404.61427541456, 892.327303323518],
  [6560.72674837779, 858.265320431919],
  [6708.83345349676, 816.188753330529],
  [6772.8795962509, 782.126770438929],
  [6840.92862292718, 738.046557285094],
  [6848.93439077145, 705.988220445941],
  [6718.84066330209, 695.969990183706],
  [6640.78442682048, 722.017388865518],
  [6432.6344628695, 728.028327022859],
  [6310.54650324441, 722.017388865518],
  [6080.3806777217, 663.911653344552],
  [5934.27541456381, 655.897069134764],
  [5774.16005767844, 605.805917823587],
  [5812.18745493872, 673.929883606788]
  ], {
  color: 'black',
  weight: 2,
  opacity: 0.5,
  fillColor: 'ffff66',
  fillOpacity: 0.25,
  }).addTo(map);
  
  //Big Sandy
  
  
  // The Chimneys
  
  
  //Prepare Labels
  //use DivIcons for labels http://leafletjs.com/reference.html#divicon
      var myDivTxt = 'Mooo! I say! Moo!'

      var myDivIcon = L.divIcon({
          className: 'my-div-icon', 
          //iconSize: new L.Point(700, 400),
          //iconSize: [20, 20],
          iconSize: null, //'null' allows div to be resized in CSS. Otherwise, CSS sizing is overwritten by JS.
          // iconAnchor: [9, 25], //offset from top left corner
          html:myDivTxt});

      // L.marker(unproject([7000, 4500]), {icon:myDivIcon}).addTo(map);
      var myDivIconMoo = _marker([7000, 4500], {icon:myDivIcon}).addTo(map);
  
  //Prepare Polylines
  //Note: For now, the best method for generating large arrays for complex polylines is follows:
      // 1. Draw a vector path in Adobe Photoshop over the original, full size image.
      // 2. Select 'Image>Image Rotation>Flip Canvas Vertical' to invert the line. This is important as the y-coordinate system is inverse in Photoshop to Leaflet.
      // 3. Export the path to an Adobe Illustrator *.ai file
      // 4. Open the *.ai file in any text editor 
      // 5. Do a global find and replace of '.0000 1' to '.0000],' and '.0000' to '.0000,'
      // 6. Manually change '.0000 M' to '.0000],'
      // 7. Import text file into Excel, as the coordinates are in points and need to be converted to pixels
      // 8. Convert the points to pixels in Excel, and append "[", ",", & "]," characters with the two columns with converted values into a new column.
      // 9. Copy the column and paste it as an array within a polyline variable defined below.
  
  var routeNWRR = _polyline([
  [4164, 7144],
  [4159.99711607787, 7094.91067171505],
  [4153.99279019466, 7056.84139671855],
  [4132.97764960346, 7025.78488290562],
  [4131.97692862292, 6989.71925396158],
  [4122.97043979813, 6958.66274014865],
  [4127.97404470079, 6930.61169541439],
  [4136.9805335256, 6900.55700462768],
  [4140.98341744773, 6860.48408357874],
  [4137.98125450613, 6815.40204739868],
  [4137.98125450613, 6752.2871967466],
  [4132.97764960346, 6670.13770859627],
  [4148.989185292, 6644.09030991446],
  [4165.00072098053, 6608.02468097041],
  [4134.97909156453, 6602.01374281307],
  [4134.97909156453, 6554.92806058056],
  [4136.9805335256, 6503.83508624316],
  [4137.98125450613, 6433.70747440752],
  [4135.97981254506, 6371.59444678166],
  [4132.97764960346, 6323.50694152293],
  [4124.97188175919, 6293.45225073622],
  [4107.95962509012, 6275.4194362642],
  [4090.94736842105, 6248.37021455616],
  [4106.95890410959, 6230.33740008414],
  [4096.95169430425, 6195.27359416632],
  [4078.93871665465, 6141.17515075024],
  [4069.93222782985, 6090.08217641285],
  [4069.93222782985, 6048.00560931146],
  [4061.92645998558, 6010.93815734119],
  [4050.91852919971, 5969.86341326602],
  [4041.91204037491, 5931.79413826953],
  [4047.91636625811, 5905.74673958771],
  [4056.92285508291, 5888.71574814192],
  [4061.92645998558, 5876.69387182723],
  [4067.93078586878, 5851.64829617164],
  [4066.93006488825, 5829.60818959473],
  [4068.93150684932, 5800.55532183424],
  [4064.92862292718, 5773.50610012621],
  [4059.92501802451, 5749.46234749684],
  [4059.92501802451, 5720.40947973636],
  [4056.92285508291, 5683.34202776609],
  [4053.92069214131, 5634.25269948114],
  [4040.91131939438, 5606.20165474688],
  [4033.90627253064, 5580.15425606507],
  [4019.89617880317, 5549.09774225214],
  [4010.88968997837, 5505.0175290983],
  [3997.88031723144, 5482.97742252139],
  [3981.8687815429, 5466.94825410181],
  [3975.8644556597, 5445.90997055111],
  [3956.85075702956, 5420.86439489553],
  [3956.85075702956, 5391.81152713504],
  [3963.8558038933, 5350.73678305988],
  [3979.86733958183, 5315.67297714206],
  [3992.87671232877, 5269.58911793577],
  [3998.88103821197, 5256.56541859487],
  [4025.90050468637, 5244.54354228018],
  [4021.89762076424, 5212.48520544103],
  [4017.89473684211, 5172.41228439209],
  [4011.8904109589, 5136.34665544804],
  [4003.88464311464, 5102.28467255644],
  [3999.8817591925, 5075.23545084841],
  [3993.8774333093, 5027.14794558968],
  [3992.87671232877, 4999.09690085542],
  [3981.8687815429, 4965.03491796382],
  [3966.8579668349, 4936.98387322956],
  [3965.85724585436, 4909.93465152152],
  [3920.82480173035, 4892.90366007573],
  [3887.80100937275, 4851.82891600056],
  [3875.79235760635, 4792.72135745337],
  [3844.77000720981, 4753.65025943065],
  [3844.77000720981, 4709.57004627682],
  [3824.75558759913, 4656.47342588697],
  [3787.72891131939, 4580.33487589398],
  [3779.72314347513, 4548.27653905483],
  [3767.71449170872, 4497.18356471743],
  [3802.7397260274, 4460.11611274716],
  [3817.7505407354, 4427.05595288178],
  [3834.76279740447, 4406.01766933109],
  [3857.77937995674, 4399.00490814752],
  [3895.80677721702, 4393.99579301641],
  [3946.84354722423, 4387.98485485907],
  [3984.8709444845, 4368.95021736082],
  [4018.89545782264, 4340.89917262656],
  [4014.8925739005, 4294.81531342028],
  [4011.8904109589, 4250.73510026644],
  [4027.90194664744, 4222.68405553218],
  [4034.90699351118, 4199.64212592904],
  [4019.89617880317, 4166.58196606367],
  [4012.89113193944, 4124.50539896228],
  [4016.89401586157, 4077.41971672977],
  [4044.91420331651, 4036.34497265461],
  [4089.94664744052, 4040.3522647595],
  [4129.97548666186, 4036.34497265461],
  [4165.00072098053, 4005.28845884168],
  [4213.03532804614, 3995.27022857944],
  [4239.05407354001, 3980.24288318608],
  [4250.06200432588, 3949.18636937316],
  [4227.04542177361, 3933.15720095358],
  [4216.03749098774, 3908.11162529799],
  [4204.02883922134, 3889.07698779975],
  [4184.01441961067, 3873.04781938017],
  [4184.01441961067, 3843.99495161969],
  [4189.01802451334, 3814.94208385921],
  [4196.02307137707, 3779.87827794138],
  [4201.02667627974, 3751.82723320712],
  [4213.03532804614, 3713.75795821063],
  [4253.06416726748, 3776.87280886271],
  [4272.07786589762, 3752.82905623335],
  [4281.08435472242, 3735.79806478755],
  [4304.10093727469, 3751.82723320712],
  [4319.1117519827, 3747.81994110223],
  [4338.12545061283, 3746.81811807601],
  [4352.1355443403, 3745.81629504978],
  [4372.14996395097, 3717.76525031552],
  [4378.15428983417, 3701.73608189595],
  [4389.16222062004, 3685.70691347637],
  [4397.16798846431, 3667.67409900435],
  [4399.16943042538, 3648.6394615061],
  [4386.16005767844, 3632.61029308652],
  [4379.15501081471, 3614.5774786145],
  [4413.17952415285, 3598.54831019492],
  [4441.19971160779, 3585.52461085402],
  [4466.21773612113, 3576.50820361801],
  [4483.22999279019, 3560.47903519843],
  [4516.2537851478, 3540.44257467396],
  [4544.27397260274, 3488.34777731033],
  [4548.27685652487, 3440.26027205161],
  [4556.28262436914, 3405.19646613378],
  [4587.30497476568, 3307.01780956388],
  [4601.31506849315, 3211.84462207264],
  [4623.33093006489, 3180.78810825971],
  [4643.34534967556, 3124.68601879119],
  [4648.34895457823, 3062.57299116533],
  [4646.34751261716, 2994.44902538213],
  [4646.34751261716, 2927.32688262516],
  [4648.34895457823, 2877.23573131398],
  [4652.35183850036, 2837.16281026504],
  [4663.35976928623, 2802.09900434722],
  [4653.35255948089, 2762.02608329827],
  [4648.34895457823, 2714.94040106577],
  [4666.36193222783, 2663.84742672837],
  [4680.3720259553, 2628.78362081055],
  [4678.37058399423, 2572.68153134203],
  [4687.37707281903, 2545.63230963399],
  [4686.3763518385, 2503.5557425326],
  [4702.38788752704, 2464.48464450989],
  [4721.40158615717, 2434.42995372318],
  [4721.40158615717, 2420.40443135605],
  [4733.41023792358, 2405.3770859627],
  [4761.43042537852, 2370.31328004487],
  [4787.44917087239, 2342.26223531062],
  [4811.46647440519, 2307.19842939279],
  [4850.494592646, 2228.05441032113],
  [4870.50901225667, 2194.99425045576],
  [4880.516222062, 2162.9359136166],
  [4897.52847873107, 2118.85570046277],
  [4900.53064167268, 2081.7882484925],
  [4912.53929343908, 1987.61688402749],
  [4927.55010814708, 1989.62053007993],
  [4931.55299206922, 2017.67157481419],
  [4953.56885364095, 2025.68615902398],
  [4973.58327325162, 2029.69345112887],
  [4997.60057678443, 2042.71715046978],
  [5010.60994953136, 2066.76090309914],
  [5028.62292718097, 2080.78642546627],
  [5049.63806777217, 2081.7882484925],
  [5050.6387887527, 2016.66975178797],
  [5071.65392934391, 2004.64787547329],
  [5079.65969718818, 1972.58953863413],
  [5083.66258111031, 1936.52390969009],
  [5098.67339581831, 1914.48380311317],
  [5114.68493150685, 1898.45463469359],
  [5131.69718817592, 1878.41817416912],
  [5153.71304974766, 1858.38171364465],
  [5186.73684210526, 1851.36895246109],
  [5212.75558759914, 1841.35072219885],
  [5219.76063446287, 1820.31243864816],
  [5211.7548666186, 1797.27050904501],
  [5201.74765681327, 1774.22857944187],
  [5188.73828406633, 1725.13925115692],
  [5180.73251622206, 1693.08091431777],
  [5178.731074261, 1667.03351563596],
  [5185.73612112473, 1634.9751787968],
  [5189.73900504686, 1612.93507221988],
  [5193.741888969, 1591.89678866919],
  [5194.74260994953, 1573.86397419717],
  [5196.7440519106, 1553.8275136727],
  [5215.75775054074, 1545.81292946291],
  [5229.76784426821, 1536.7965222269],
  [5224.76423936554, 1518.76370775487],
  [5219.76063446287, 1501.73271630907],
  [5222.76279740447, 1482.69807881083],
  [5231.76928622927, 1453.64521105034],
  [5241.77649603461, 1448.63609591923],
  [5242.77721701514, 1421.58687421119],
  [5246.78010093728, 1397.54312158183],
  [5259.78947368421, 1364.48296171645],
  [5275.80100937275, 1334.42827092974],
  [5285.80821917808, 1310.38451830038],
  [5279.80389329488, 1277.324358435],
  [5276.80173035328, 1249.27331370074],
  [5283.80677721702, 1224.22773804515],
  [5290.81182408075, 1191.16757817978],
  [5296.81614996395, 1164.11835647174],
  [5299.81831290555, 1147.08736502594],
  [5308.82480173035, 1139.07278081615],
  [5315.82984859409, 1117.03267423924],
  [5324.83633741889, 1102.00532884588],
  [5332.84210526316, 1083.97251437386],
  [5327.83850036049, 1065.93969990184],
  [5321.83417447729, 1044.90141635114],
  [5311.82696467195, 1033.88136306268],
  [5310.82624369142, 1013.84490253821],
  [5314.82912761356, 998.81755714486],
  [5303.82119682769, 990.802972935072],
  [5273.79956741168, 991.804795961296],
  [5245.77937995674, 992.806618987519],
  [5221.76207642394, 999.819380171084],
  [5189.73900504686, 997.815734118637],
  [5165.72170151406, 995.81208806619],
  [5133.69863013699, 992.806618987519],
  [5119.68853640952, 987.797503856402],
  [5108.68060562365, 983.790211751508],
  [5110.68204758472, 969.764689384378],
  [5123.69142033165, 945.720936755013],
  [5131.69718817592, 929.691768335437],
  [5119.68853640952, 917.669892020754],
  [5113.68421052632, 896.63160847006],
  [5100.67483777938, 882.606086102931],
  [5086.66474405191, 892.624316365166],
  [5079.65969718818, 873.589678866919],
  [5072.65465032444, 843.534988080213],
  [5056.64311463591, 751.367269667648],
  [5009.60922855083, 848.544103211331],
  [5003.60490266763, 769.400084139672],
  [4961.57462148522, 791.440190716589],
  [4953.56885364095, 764.390969008554],
  [4946.56380677722, 730.328986116954],
  [4931.55299206922, 717.305286776048],
  [4896.52775775054, 712.29617164493],
  [4867.50684931507, 722.314401907166],
  [4836.48449891853, 731.330809143178],
  [4812.46719538573, 734.336278221848],
  [4794.45421773612, 717.305286776048],
  [4817.47080028839, 687.250595989342],
  [4829.47945205479, 664.208666386201],
  [4837.48521989906, 636.157621651942],
  [4838.4859408796, 619.126630206142],
  [4834.48305695746, 618.124807179919],
  [4830.48017303533, 617.122984153695],
  [4820.47296322999, 612.113869022577],
  [4821.47368421053, 590.07376244566],
  [4839.48666186013, 581.057355209648],
  [4865.505407354, 571.039124947413],
  [4881.51694304254, 560.019071658954],
  [4895.52703677001, 536.977142055813],
  [4918.54361932228, 529.964380872248],
  [4924.54794520548, 516.940681531342],
  [4950.56669069935, 514.937035478895],
  [4962.57534246575, 498.907867059318],
  [4975.58471521269, 491.895105875754],
  [4981.58904109589, 475.865937456177],
  [4997.60057678443, 464.845884167718],
  [5008.6085075703, 453.82583087926]
  ]);
  
  //Prepare Layer Groups
    var route = L.layerGroup([
      routeNWRR
    ]).addTo(map);

    var belays = L.layerGroup([
      belay1,
      belay2,
      belay3,
      belay4,
      belay5,
      belay6,
      belay7,
      belay8,
      belay9,
      belay10,
      belay11,
      belay12,
      belay13,
      belay14,
      belay15,
      belay16,
      belay17,
      belay18,
      belay19,
      belay20,
      belay21,
      belay22,
      belay23
    ]).addTo(map);
  
    var photos = L.layerGroup([
      circle
    ]).addTo(map);
  
    var labels = L.layerGroup([
      myDivIconMoo
    ]).addTo(map);

    var features = L.layerGroup([
      Visor1,
      Visor2
    ]).addTo(map);
 
  //Prepare Layer Controls
  var baseMaps = {
  "Half Dome NW Face": map
  };
  
  var overlayMaps = {
  "Belays": belays,
  "Northwest Regular Route": routeNWRR,
  "Photos": photos,
  "Labels": labels,
  "Features": features
  };
  
  L.control.layers(baseMaps,overlayMaps).addTo(map);
  L.control.fullscreen({ position: 'topleft', title: 'Show me the fullscreen !' }).addTo(map); 

//Donny, it would be interesting to see if we could alter this to give scale in pixels, 
// or allow us to define a custom units scale in the picture
 L.control.scale().addTo(map);   
 

//Resizing layers based on zoom level

//So far I can return the correct zoom level, and change the _iconSize variables based on the level, 
// but the icons don't seem to be updating
 // var zoomLevel = map.getZoom();
  ////alert(zoomLevel);
  // map.on('zoomend', function(e){
      // var zoomLevel = map.getZoom();
      // var _iconSizeX = 30*(1+(18-zoomLevel)), _iconSizeY = 36;
      ////alert(_iconSizeX);
      ////alert(_iconSizeY);
      // var _iconSize = [_iconSizeX, _iconSizeY];
      ////alert(zoomLevel);
      // return belays.addTo(map);
      // });
};