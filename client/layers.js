//General TO DOs:
//  1. Get plugin working for extracting coordinate data from screen clicks & manipulating lines & polygons



//Function TO DOs:
//  1.  Create some more functions for generalizing further the creation of various icons? 

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
 
 // _plotter = function (coordsList, options) {
  // options = _.extend({}, options);
  // return L.Polyline.Plotter(_.map(coordsList, function (coords) {
    // return unproject(coords); 
  // }), options);
// };
 
 
//Function scales icons and their centering point. Applies to images & divs
var scaleIcon = function(scale, myiconSize, iconAnchorSize){
            j = Math.round(myiconSize[0]*scale);
            k = Math.round(myiconSize[1]*scale);
            l = Math.round(iconAnchorSize[0]*scale);
            m = Math.round(iconAnchorSize[1]*scale);
  return  [ scaledIconSize = [j, k],
            scaledAnchorSize = [l, m]
            ];
};
   
 
var prepareLayers = function () {
  //--------Other Icons----------
  //TO DO:
  //  1. Create arrow icons for labels to indicate tension & pendulum traverses? Keeping sizing could be tricky
  //  2. Create animated marker to travel up route?
  
  //--------Belay Icons----------
  //Belay coordinates in image
  var belayCoords = new Array();
      belayCoords[0] = [4162, 6600];
      belayCoords[1] = [4080, 6230];
      belayCoords[2] = [4050, 5940];
      belayCoords[3] = [3986, 5460];
      belayCoords[4] = [4026, 5232];
      belayCoords[5] = [3892, 4844];
      belayCoords[6] = [3890, 4380];
      belayCoords[7] = [4026, 4048];
      belayCoords[8] = [4182, 3872];
      belayCoords[9] = [4284, 3736];
      belayCoords[10] = [4426, 3580];
      belayCoords[11] = [4630, 3144];
      belayCoords[12] = [4652, 2838];
      belayCoords[13] = [4664, 2646];
      belayCoords[14] = [4746, 2370];
      belayCoords[15] = [4918, 1990];
      belayCoords[16] = [5212, 1828];  //Big Sandy
      belayCoords[17] = [5226, 1530];
      belayCoords[18] = [5270, 1250];
      belayCoords[19] = [5308, 1016];
      belayCoords[20] = [5104, 884];
      belayCoords[21] = [4966, 760];
      belayCoords[22] = [4840, 574];                   
    
    //Belay Icon formation types for different zoom levels
    var myiconSize = [100, 70];     //Original icon size
    var iconAnchorSize = [20, 50];    //Original icon anchor location within icon
    
    var myIconBelay = new Array();  //For zoom < 17
      var data = scaleIcon(0.25, myiconSize, iconAnchorSize);
      for (i=0; i <= belayCoords.length-1; i++){
      myIconBelay[i] = L.icon({
        iconUrl: '../public/images/marker-icon-belay' + (i + 1) + '.png',
        iconSize: [scaledIconSize[0],scaledIconSize[1]],
        iconAnchor: [scaledAnchorSize[0],scaledAnchorSize[1]],
        className: 'myIconBelay' + (i + 1)
      });
      }

    var myIconBelayLarge = new Array();   //For zoom >= 17
      var data = scaleIcon(0.5, myiconSize, iconAnchorSize);
      for (i=0; i <= belayCoords.length-1; i++){
      myIconBelayLarge[i] = L.icon({
        iconUrl: '../public/images/marker-icon-belay' + (i + 1) + '.png',
        iconSize: [scaledIconSize[0],scaledIconSize[1]],
        iconAnchor: [scaledAnchorSize[0],scaledAnchorSize[1]],
        className: 'myIconBelay' + (i + 1)
      });
      }

    //Constructing all belay markers w/ position
    var belays = new Array();
    for (i=0; i <= belayCoords.length-1; i++){
      belays[i] = _marker(belayCoords[i], {icon:myIconBelay[i], clickable:false, title:'Belay ' + (i + 1)});
    }
    
    //Adds all belay markers to one layer
    var belaysLayer = L.layerGroup(belays).addTo(map);
  
    //Scales all markers depending on level of zoom
    map.on('zoomend', function(e){
      var zoomLevel = map.getZoom();
      if (zoomLevel < 17){ 
        for (i=0; i <= belayCoords.length-1; i++){
        belays[i].setIcon(myIconBelay[i]);
        }
      }
      if (zoomLevel >= 17){
        for (i=0; i <= belayCoords.length-1; i++){
        belays[i].setIcon(myIconBelayLarge[i]);
        }
      }
    });  
  
  //--------Labels Icons----------
  //TO DO: 
  //  1. Finish constructing array with the following components
  //    1a. Coordinate
  //    1b. Anchor adjustment where necessary. Maybe make variable and then replace on an as-needed basis?
  //    1c. Label text
  
    //Defining label coordinates, anchor offset, and text
    var myLabels = new Array();
        myLabels[0] = new Array([7000, 4500], [9,25], 'Mooo! I say! Moo!');
        myLabels[1] = new Array([5000, 3600], [9,25], 'Here I am again!');
    
    //Label Icon formation types for different labels
    var myDivIcon = new Array(); 
    for (i=0; i <= myLabels.length-1; i++){
        myDivIcon[i] = L.divIcon({
          className: 'my-div-icon', 
          iconSize: null, //'null' allows div to be resized in CSS. Otherwise, CSS sizing is overwritten by JS.
          iconAnchor: myLabels[i][1], //offset from top left corner
          html: myLabels[i][2]});
    }
   
    //Constructing all label markers w/ position
    var labels = new Array();
    for (i=0; i <= myLabels.length-1; i++){
      labels[i] = _marker(myLabels[i][0], {icon:myDivIcon[i], clickable:false});
    }
    
    //Adds all label icons to one layer 
    var labelsLayer = L.layerGroup(labels).addTo(map);
    
    //Size changes with zoom
    map.on('zoomend', function(e){
      var zoomLevel = map.getZoom();
      switch(zoomLevel){
      case 18:
        $(".my-div-icon").css({
          "font-size":"20px",
          "line-height":"20px"
        });
        break;
      case 17:      
        $(".my-div-icon").css({
          "font-size":"10px",
          "line-height":"10px"
        });
        break;
      case 16:
        $(".my-div-icon").css({
          "display":"inline",
          "font-size":"10px",
          "line-height":"10px"
        });
        break;
      default:
        $(".my-div-icon").css({
          "display":"none"
        });
      break;
      }
      });
      
      //This is needed to make the label reappear upon layer unhide
      map.on('overlayadd', function(e){
        var zoomLevel = map.getZoom();
        switch(zoomLevel){
        case 18:
          $(".my-div-icon").css({
            "display":"inline",
            "font-size":"20px",
            "line-height":"20px",
          });
          break;
        case 17:      
          $(".my-div-icon").css({
            "display":"inline",
            "font-size":"10px",
            "line-height":"10px",
          });
          break;
        case 16:
          $(".my-div-icon").css({
            "display":"inline",
            "font-size":"10px",
            "line-height":"10px",
          });
          break;
        }
      });
  
  //--------Photo Icons----------
  // TO DO:
  //    1. Resolve whether to use small photo thumbnails w popup vs. smaller generic icon w/ popup
  //      1a. Ideal is to have a smaller generic icon that turns into a photo thumbnail upon mouseover, with icon title as caption
  //      1b. Another option is to use the smaller generic icon on faraway view, that changes thumbnail on the closest zooms
  //    2. Resolve whether to have popup clickable photo open in new tab, or how to enlarge image
  //    3. Spiderfier icons overlap too much. Any way to increase the spread?
  //    4. Any way to track which photo has been clicked, and change the photo CSS to indicate this?
  //    5. Should I switch icons when doing Spiderfy & unSpiderfy?
  //    6. Create arrays for list of photos including Corresponding photo location in image
  //    7. Fine tune CSS changes upon zoom. See labels code
  
  //---Initialize Spiderfier
  var Spiderfier = new OverlappingMarkerSpiderfier(map, {nearbyDistance: 50});
  
  //Prepare PopUps
    // Open in new tab
  //pop1 is temp until ready to hook up array
  var pop1 = "<h2>Pitch n</h2><a href=\"https://picasaweb.google.com/lh/photo/w2fL5fz4UoRzfWOUqeK9ldMTjNZETYmyPJy0liipFm0?feat=directlink\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-OPNp3bc7_G0/UibOVAjw6aI/AAAAAAACohs/bTELWpH-wLs/s300/2013-08-11%2520-%2520158a%2520-%2520Half%2520Dome%2520NWRR%2520-%2520IMG_2586.jpg\" /></a><br><b><i>P13, P14, and P15 (5.7, 5.7-5.9, 5.9) chimney pitches that I would link in one 230' pitch with our 70m rope. Good thing chimneys are easy to climb in the dark!</i></b>";
 
  var sizeLarge = 2000
  var size = 300
  var pop = new Array();
      pop[0] = "<a href=\"https://lh3.googleusercontent.com/-TogP3rHtDYs/UibIVUOXMkI/AAAAAAACoAA/HJG6P_UKXc0/s" + sizeLarge + "/2013-08-10%252520-%252520056%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2507.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-TogP3rHtDYs/UibIVUOXMkI/AAAAAAACoAA/HJG6P_UKXc0/s" + size + "/2013-08-10%252520-%252520056%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2507.jpg\" /></a><br><b><i>Cool OW right start to the Direct North Face of Half Dome. </i></b>";
      pop[1] = "<a href=\"https://lh5.googleusercontent.com/-SWbphwG2jus/UibIbgacdnI/AAAAAAACoAk/zEgZreGIMQ0/s" + sizeLarge + "/2013-08-10%252520-%252520057%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2508.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-SWbphwG2jus/UibIbgacdnI/AAAAAAACoAk/zEgZreGIMQ0/s" + size + "/2013-08-10%252520-%252520057%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2508.jpg\" /></a><br><b><i>Cool OW left start to the Direct North Face of Half Dome. </i></b>";
      pop[2] = "<a href=\"https://lh3.googleusercontent.com/-CMtw6p2In3E/UibI72UlPnI/AAAAAAACoEM/DLHSua-AKSo/s" + sizeLarge + "/2013-08-10%252520-%252520066%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2518.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-CMtw6p2In3E/UibI72UlPnI/AAAAAAACoEM/DLHSua-AKSo/s" + size + "/2013-08-10%252520-%252520066%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2518.jpg\" /></a><br><b><i>Looking across the N Face at sunset. A cl. 4 route ascends that gully as a more interesting way to start Snake Dike. </i></b>";
      pop[3] = "<a href=\"https://lh6.googleusercontent.com/-FA6L1Z3o-_U/UibJGtqtVZI/AAAAAAACoFc/S0QRKh9OfVw/s" + sizeLarge + "/2013-08-10%252520-%252520068%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2520.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-FA6L1Z3o-_U/UibJGtqtVZI/AAAAAAACoFc/S0QRKh9OfVw/s" + size + "/2013-08-10%252520-%252520068%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2520.jpg\" /></a><br><b><i>Approaching Final Exam (5.10d) </i></b>";
      pop[4] = "<a href=\"https://lh6.googleusercontent.com/-ImJEpaPhrlE/UibJKFlfN7I/AAAAAAACoF0/FfgfR7Um8Io/s" + sizeLarge + "/2013-08-10%252520-%252520069%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2521.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-ImJEpaPhrlE/UibJKFlfN7I/AAAAAAACoF0/FfgfR7Um8Io/s" + size + "/2013-08-10%252520-%252520069%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2521.jpg\" /></a><br><b><i>The great chimney systems of the NWRR of Half Dome. </i></b>";
      pop[5] = "<a href=\"https://lh5.googleusercontent.com/-cE0AYTiudqk/UibJUw6Pq_I/AAAAAAACoG4/AwnbQyOD6mU/s" + sizeLarge + "/2013-08-10%252520-%252520069c%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2521.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-cE0AYTiudqk/UibJUw6Pq_I/AAAAAAACoG4/AwnbQyOD6mU/s" + size + "/2013-08-10%252520-%252520069c%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2521.jpg\" /></a><br><b><i>The Visor, with climbers on the aid pitches beneath. </i></b>";
      pop[6] = "<a href=\"https://lh5.googleusercontent.com/-ywW2gh8wn1E/UibJidVFUjI/AAAAAAACoIU/JInSGxnm-Ec/s" + sizeLarge + "/2013-08-10%252520-%252520071%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2530.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-ywW2gh8wn1E/UibJidVFUjI/AAAAAAACoIU/JInSGxnm-Ec/s" + size + "/2013-08-10%252520-%252520071%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2530.jpg\" /></a><br><b><i>The sweet crack and corner of Final Exam (5.10d) </i></b>";
      pop[7] = "<a href=\"https://lh3.googleusercontent.com/-pGNptZSR9a8/UibJtMXUH0I/AAAAAAACoJU/rYY3kdB-RM0/s" + sizeLarge + "/2013-08-10%252520-%252520082%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000217.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-pGNptZSR9a8/UibJtMXUH0I/AAAAAAACoJU/rYY3kdB-RM0/s" + size + "/2013-08-10%252520-%252520082%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000217.jpg\" /></a><br><b><i>Ongoing innovation in climbing hardware, over-communication of route beta and the ever-growing wave of amateurs wanting to call themselves \"big wall climbers\" brings with it a long list of repercussions. In many ways, Half Dome and El Cap have become the Mt Everests of the rock climbing world. At times, I felt sad returning to Half Dome and seeing the human footprint, like visiting a powerful and majestic animal confined by chains in a petting zoo. There is no glory here. I've found many of the five-star/classic routes so sought after to be completely lacking of passion. Still, there are times when the sun hits just right and your eyes connects and you feel the mystery and adventure that once was. (by Nic Risser) </i></b>";
      pop[8] = "<a href=\"https://lh5.googleusercontent.com/-lGmlkoUKcHU/UibJv5ufFDI/AAAAAAACoJs/ObN9p-BLiBk/s" + sizeLarge + "/2013-08-10%252520-%252520086%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2532.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-lGmlkoUKcHU/UibJv5ufFDI/AAAAAAACoJs/ObN9p-BLiBk/s" + size + "/2013-08-10%252520-%252520086%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2532.jpg\" /></a><br><b><i>Looking up from our bivy spot at the looming north face of Half Dome under alpenglow. </i></b>";
      pop[9] = "<a href=\"https://lh5.googleusercontent.com/-tp5fuY8JWnk/UibJ5xhTysI/AAAAAAACoKs/H98olX4C0x8/s" + sizeLarge + "/2013-08-10%252520-%252520090%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2534.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-tp5fuY8JWnk/UibJ5xhTysI/AAAAAAACoKs/H98olX4C0x8/s" + size + "/2013-08-10%252520-%252520090%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2534.jpg\" /></a><br><b><i>Nic leading P1 under headlamp as it got dark. I followed in the dark on this fun 5.10c pitch, which we fixed for jugging the next morning. (5.10c or C1) </i></b>";
      pop[10] = "<a href=\"https://lh5.googleusercontent.com/-DsLAvH6B-dg/UibKBWrhLII/AAAAAAACoLU/TPuc7YL5mRU/s" + sizeLarge + "/2013-08-10%252520-%252520092%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2539.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-DsLAvH6B-dg/UibKBWrhLII/AAAAAAACoLU/TPuc7YL5mRU/s" + size + "/2013-08-10%252520-%252520092%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2539.jpg\" /></a><br><b><i>Nic and the nighttime horror of canned tuna without a fork or spoon! </i></b>";
      pop[11] = "<a href=\"https://lh6.googleusercontent.com/-LBPNpTMa59A/UibKHd4uw2I/AAAAAAACoME/oCasmrKG1dc/s" + sizeLarge + "/2013-08-11%252520-%252520094%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2542.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-LBPNpTMa59A/UibKHd4uw2I/AAAAAAACoME/oCasmrKG1dc/s" + size + "/2013-08-11%252520-%252520094%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2542.jpg\" /></a><br><b><i>Nic atop P1. Jenny Abegg, Steph Abegg's sister, is leading P2. </i></b>";
      pop[12] = "<a href=\"https://lh4.googleusercontent.com/-TxXgfand_fw/UibKTc-ILgI/AAAAAAACoNE/8FH5HhILwpI/s" + sizeLarge + "/2013-08-11%252520-%252520096%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2544.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-TxXgfand_fw/UibKTc-ILgI/AAAAAAACoNE/8FH5HhILwpI/s" + size + "/2013-08-11%252520-%252520096%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2544.jpg\" /></a><br><b><i>Nic leading the 5.9 crux on P2. The crux is pulling the roof to get into the stem box. </i></b>";
      pop[13] = "<a href=\"https://lh3.googleusercontent.com/-cUowpdym4EU/UibKYjOa3DI/AAAAAAACoNY/PET6uy-yKao/s" + sizeLarge + "/2013-08-11%252520-%252520097%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2545.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-cUowpdym4EU/UibKYjOa3DI/AAAAAAACoNY/PET6uy-yKao/s" + size + "/2013-08-11%252520-%252520097%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2545.jpg\" /></a><br><b><i>Nic leading the 5.9 crux on P2. The crux is pulling the roof to get into the stem box. </i></b>";
      pop[14] = "<a href=\"https://lh3.googleusercontent.com/-Osdu9i3bKPs/UibKcpsq4vI/AAAAAAACoN0/hOfQI7IFJJU/s" + sizeLarge + "/2013-08-11%252520-%252520098%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000223.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-Osdu9i3bKPs/UibKcpsq4vI/AAAAAAACoN0/hOfQI7IFJJU/s" + size + "/2013-08-11%252520-%252520098%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000223.jpg\" /></a><br><b><i>We ran into Steph Abegg's sister, Jenni, on the climb! They were doing the route in a day. (by Nic Risser) </i></b>";
      pop[15] = "<a href=\"https://lh6.googleusercontent.com/-hj13bErz6uo/UibKkn6pnvI/AAAAAAACoOQ/3cBBRRUkzlk/s" + sizeLarge + "/2013-08-11%252520-%252520100%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2547.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-hj13bErz6uo/UibKkn6pnvI/AAAAAAACoOQ/3cBBRRUkzlk/s" + size + "/2013-08-11%252520-%252520100%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2547.jpg\" /></a><br><b><i>Following Nic up P2-3, which we linked. (5.9 and 5.8) </i></b>";
      pop[16] = "<a href=\"https://lh6.googleusercontent.com/-Hd3cBNAogps/UibKsTZCnjI/AAAAAAACoO4/nyOGPbSaN-Q/s" + sizeLarge + "/2013-08-11%252520-%252520101%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2549.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-Hd3cBNAogps/UibKsTZCnjI/AAAAAAACoO4/nyOGPbSaN-Q/s" + size + "/2013-08-11%252520-%252520101%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2549.jpg\" /></a><br><b><i>The 5.11 roof on P4 (5.9+ C1). Nic wanted to lead this rather than aid it. Technically he got it clean, but he fell out/pumped out when trying to place gear, which was very difficult in that awkward corner. </i></b>";
      pop[17] = "<a href=\"https://lh3.googleusercontent.com/-dP33tN2jipI/UibK034lVNI/AAAAAAACoPU/BzSTVC3bCLY/s" + sizeLarge + "/2013-08-11%252520-%252520107%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2550.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-dP33tN2jipI/UibK034lVNI/AAAAAAACoPU/BzSTVC3bCLY/s" + size + "/2013-08-11%252520-%252520107%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2550.jpg\" /></a><br><b><i>Following P4-5 (5.9+ C1, and 5.9) </i></b>";
      pop[18] = "<a href=\"https://lh5.googleusercontent.com/-7vR4cWTOeVQ/UibK86BvjfI/AAAAAAACoP0/q4Eg5HRjKFY/s" + sizeLarge + "/2013-08-11%252520-%252520108%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2551.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-7vR4cWTOeVQ/UibK86BvjfI/AAAAAAACoP0/q4Eg5HRjKFY/s" + size + "/2013-08-11%252520-%252520108%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2551.jpg\" /></a><br><b><i>Following P4-5, at the bolt ladder. (5.9+ C1, and 5.9) </i></b>";
      pop[19] = "<a href=\"https://lh5.googleusercontent.com/-qn3RbKdsY9s/UibLEeeBSGI/AAAAAAACoQM/0Dan9d1En2s/s" + sizeLarge + "/2013-08-11%252520-%252520109%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2552.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-qn3RbKdsY9s/UibLEeeBSGI/AAAAAAACoQM/0Dan9d1En2s/s" + size + "/2013-08-11%252520-%252520109%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2552.jpg\" /></a><br><b><i>Looking at P6 (5.9). Kind of mungy and uninspiring. </i></b>";
      pop[20] = "<a href=\"https://lh5.googleusercontent.com/-pI3aY4z9t_A/UibLRxgX7kI/AAAAAAACoRE/wu-PViL-NdE/s" + sizeLarge + "/2013-08-11%252520-%252520111%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2554.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-pI3aY4z9t_A/UibLRxgX7kI/AAAAAAACoRE/wu-PViL-NdE/s" + size + "/2013-08-11%252520-%252520111%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2554.jpg\" /></a><br><b><i>Looking up P7 (5.8). Even more mungy and uninspiring. Rock gets rotten and grassy as well. </i></b>";
      pop[21] = "<a href=\"https://lh5.googleusercontent.com/-2oONoZ5W3A4/UibLdZexapI/AAAAAAACoRs/dy09XZ1ZiAs/s" + sizeLarge + "/2013-08-11%252520-%252520113%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2556.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-2oONoZ5W3A4/UibLdZexapI/AAAAAAACoRs/dy09XZ1ZiAs/s" + size + "/2013-08-11%252520-%252520113%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2556.jpg\" /></a><br><b><i>Following up P7 (5.8). </i></b>";
      pop[22] = "<a href=\"https://lh4.googleusercontent.com/-oPQ9EFxVqyE/UibLk1FC_0I/AAAAAAACoSE/oai5G8hON94/s" + sizeLarge + "/2013-08-11%252520-%252520114%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2557.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-oPQ9EFxVqyE/UibLk1FC_0I/AAAAAAACoSE/oai5G8hON94/s" + size + "/2013-08-11%252520-%252520114%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2557.jpg\" /></a><br><b><i>Following up P7 (5.8). </i></b>";
      pop[23] = "<a href=\"https://lh6.googleusercontent.com/-htgVBbXj0z4/UibLopN5A0I/AAAAAAACoSg/ZT2fJxGNe2k/s" + sizeLarge + "/2013-08-11%252520-%252520115%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2559.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-htgVBbXj0z4/UibLopN5A0I/AAAAAAACoSg/ZT2fJxGNe2k/s" + size + "/2013-08-11%252520-%252520115%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2559.jpg\" /></a><br><b><i>Looking over to the huge chimneys that we will climb later today, with the Visor above. </i></b>";
      pop[24] = "<a href=\"https://lh4.googleusercontent.com/-w2pOgz6e6ck/UibL85RSiFI/AAAAAAACoUQ/gRPi-UttWLI/s" + sizeLarge + "/2013-08-11%252520-%252520119%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2563.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-w2pOgz6e6ck/UibL85RSiFI/AAAAAAACoUQ/gRPi-UttWLI/s" + size + "/2013-08-11%252520-%252520119%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2563.jpg\" /></a><br><b><i>Wall Nut ejoying the views as we gain elevation. </i></b>";
      pop[25] = "<a href=\"https://lh6.googleusercontent.com/-ZtFdgS0xsyk/UibMHc52R2I/AAAAAAACoVM/xpXFa4HkgvM/s" + sizeLarge + "/2013-08-11%252520-%252520122%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000230.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-ZtFdgS0xsyk/UibMHc52R2I/AAAAAAACoVM/xpXFa4HkgvM/s" + size + "/2013-08-11%252520-%252520122%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000230.jpg\" /></a><br><b><i>Following the lower angle terrain of P8-9, which we easily linked (5.8, and  cl. 4). (by Nic Risser) </i></b>";
      pop[26] = "<a href=\"https://lh5.googleusercontent.com/-pFF2TherGUc/UibMNRYJIXI/AAAAAAACoVw/ZyJEJpGzhf0/s" + sizeLarge + "/2013-08-11%252520-%252520123%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2565.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-pFF2TherGUc/UibMNRYJIXI/AAAAAAACoVw/ZyJEJpGzhf0/s" + size + "/2013-08-11%252520-%252520123%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2565.jpg\" /></a><br><b><i>Following up P8-9, which we easily linked. It is mostly 4th class, with one short easy 5.8 bit. (5.8, and  cl. 4) </i></b>";
      pop[27] = "<a href=\"https://lh6.googleusercontent.com/-Txj3fFqCXEc/UibMZFrHevI/AAAAAAACoWo/XZvaW_hJKNQ/s" + sizeLarge + "/2013-08-11%252520-%252520126%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2566.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-Txj3fFqCXEc/UibMZFrHevI/AAAAAAACoWo/XZvaW_hJKNQ/s" + size + "/2013-08-11%252520-%252520126%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2566.jpg\" /></a><br><b><i>Looking up the P10 bolt ladder. The bolts were a bit far apart, but doable. (C1) </i></b>";
      pop[28] = "<a href=\"https://lh5.googleusercontent.com/-r9PSGpaSVs8/UibMfChGjvI/AAAAAAACoXM/-j9SlJtuepc/s" + sizeLarge + "/2013-08-11%252520-%252520127%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2567.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-r9PSGpaSVs8/UibMfChGjvI/AAAAAAACoXM/-j9SlJtuepc/s" + size + "/2013-08-11%252520-%252520127%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2567.jpg\" /></a><br><b><i>Nic enjoying the increased exposure at the P10 belay. It is finally starting to feel like we are getting somewhere! </i></b>";
      pop[29] = "<a href=\"https://lh3.googleusercontent.com/-OpKe1fEjSq8/UibMj4k5A_I/AAAAAAACoX0/J9MTMOsXMng/s" + sizeLarge + "/2013-08-11%252520-%252520128%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2568.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-OpKe1fEjSq8/UibMj4k5A_I/AAAAAAACoX0/J9MTMOsXMng/s" + size + "/2013-08-11%252520-%252520128%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2568.jpg\" /></a><br><b><i>Looking down P10 from near the top of the bolt ladder and beginning of the tension traverse. (C1) </i></b>";
      pop[30] = "<a href=\"https://lh4.googleusercontent.com/-SdDjWV4GIzE/UibMoYxoVJI/AAAAAAACoYU/xS7_qlr-LPM/s" + sizeLarge + "/2013-08-11%252520-%252520129%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2569.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-SdDjWV4GIzE/UibMoYxoVJI/AAAAAAACoYU/xS7_qlr-LPM/s" + size + "/2013-08-11%252520-%252520129%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2569.jpg\" /></a><br><b><i>The view one sees from the tension traverse. It was quite tough to get over there statically and you'd face a big swing while face climbing on sloping holds, so unfortunately I backed off and let Nic get through this sections. </i></b>";
      pop[31] = "<a href=\"https://lh6.googleusercontent.com/-jJ6qqc2EozM/UibMu1C0Y0I/AAAAAAACoYs/9Rb8h2oZkZI/s" + sizeLarge + "/2013-08-11%252520-%252520130%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000233.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-jJ6qqc2EozM/UibMu1C0Y0I/AAAAAAACoYs/9Rb8h2oZkZI/s" + size + "/2013-08-11%252520-%252520130%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000233.jpg\" /></a><br><b><i>Following the bolt ladder. I couldn't get the tension traverse to work, so gave the finish up to Nic to work out. (by Nic Risser) </i></b>";
      pop[32] = "<a href=\"https://lh5.googleusercontent.com/-w80pu9F-smk/UibM1fQl9zI/AAAAAAACoZI/JROhHXt6H18/s" + sizeLarge + "/2013-08-11%252520-%252520135%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000238.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-w80pu9F-smk/UibM1fQl9zI/AAAAAAACoZI/JROhHXt6H18/s" + size + "/2013-08-11%252520-%252520135%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000238.jpg\" /></a><br><b><i>Mark gets ready to lower out as we near the Robbins Traverse. (by Nic Risser) </i></b>";
      pop[33] = "<a href=\"https://lh3.googleusercontent.com/-ztwaULiB8Vk/UibNAwX5hkI/AAAAAAACoaM/rHW5tIldj5U/s" + sizeLarge + "/2013-08-11%252520-%252520139%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2570.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-ztwaULiB8Vk/UibNAwX5hkI/AAAAAAACoaM/rHW5tIldj5U/s" + size + "/2013-08-11%252520-%252520139%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2570.jpg\" /></a><br><b><i>Nic leading out on P11 toward the Robbins Traverse (5.9-5.10). This is very exposed! The crux is higher up and is in no way 5.8. I'd agree with the 5.10b opinion and would call it the free crux of the route for me. </i></b>";
      pop[34] = "<a href=\"https://lh5.googleusercontent.com/-h_MSXUOf8KY/UibNReU148I/AAAAAAACobc/2zp6FYCdWvE/s" + sizeLarge + "/2013-08-11%252520-%252520142%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2571.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-h_MSXUOf8KY/UibNReU148I/AAAAAAACobc/2zp6FYCdWvE/s" + size + "/2013-08-11%252520-%252520142%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2571.jpg\" /></a><br><b><i>Reaching the tough crux of the Robbins Traverse (P11, 5.9-5.10). You go to the right and make a very thin and physical step left on very slick rock. This part felt like 5.10b face, and goes at C2. Fortunately there is a fixed nut on that little roof. </i></b>";
      pop[35] = "<a href=\"https://lh5.googleusercontent.com/-0JkBwVcV4gE/UibNZBh6bII/AAAAAAACocA/Acy19Nuv_FY/s" + sizeLarge + "/2013-08-11%252520-%252520143%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000244.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-0JkBwVcV4gE/UibNZBh6bII/AAAAAAACocA/Acy19Nuv_FY/s" + size + "/2013-08-11%252520-%252520143%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000244.jpg\" /></a><br><b><i>Following the Robbins Traverse (P11, 5.9-5.10). (by Nic Risser) </i></b>";
      pop[36] = "<a href=\"https://lh5.googleusercontent.com/-cx7qrFIUmdc/UibNgknAX-I/AAAAAAACocY/ll-wF-P0AvQ/s" + sizeLarge + "/2013-08-11%252520-%252520145%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2572.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-cx7qrFIUmdc/UibNgknAX-I/AAAAAAACocY/ll-wF-P0AvQ/s" + size + "/2013-08-11%252520-%252520145%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2572.jpg\" /></a><br><b><i>The final ledge traverse on P11. Good spot for some warm sun and a lunch break! The chimney pitches are beyond. </i></b>";
      pop[37] = "<a href=\"https://lh4.googleusercontent.com/-ikZ6T-WKBO8/UibNkKsJqdI/AAAAAAACocw/mikXF9jxQG0/s" + sizeLarge + "/2013-08-11%252520-%252520146%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2573.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-ikZ6T-WKBO8/UibNkKsJqdI/AAAAAAACocw/mikXF9jxQG0/s" + size + "/2013-08-11%252520-%252520146%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2573.jpg\" /></a><br><b><i>Leading into the P12 5.6 chimney. This part is VERY easy. </i></b>";
      pop[38] = "<a href=\"https://lh5.googleusercontent.com/-YjXwLvBTWeU/UibNujyIB3I/AAAAAAACods/vWU5iklBBoc/s" + sizeLarge + "/2013-08-11%252520-%252520149%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2578.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-YjXwLvBTWeU/UibNujyIB3I/AAAAAAACods/vWU5iklBBoc/s" + size + "/2013-08-11%252520-%252520149%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2578.jpg\" /></a><br><b><i>Nic enjoying the afternoon sun while I lead the P12 chimneys and aid corner. </i></b>";
      pop[39] = "<a href=\"https://lh4.googleusercontent.com/-IBYX8Cj9pLY/UibNznUPaFI/AAAAAAACoeM/FeL5y3bEUeM/s" + sizeLarge + "/2013-08-11%252520-%252520151%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2577.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-IBYX8Cj9pLY/UibNznUPaFI/AAAAAAACoeM/FeL5y3bEUeM/s" + size + "/2013-08-11%252520-%252520151%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2577.jpg\" /></a><br><b><i>The easy 5.6 chimney on P12. </i></b>";
      pop[40] = "<a href=\"https://lh3.googleusercontent.com/-iOx605fZmKw/UibN24HJJNI/AAAAAAACoew/8xEmMO8jH_M/s" + sizeLarge + "/2013-08-11%252520-%252520152%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2580.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-iOx605fZmKw/UibN24HJJNI/AAAAAAACoew/8xEmMO8jH_M/s" + size + "/2013-08-11%252520-%252520152%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2580.jpg\" /></a><br><b><i>The step over into the 5.11-C1 corner was not trivial! It was not too secure and a fall would land one hard on the chimney chockstones, so I explored the 5.9 squeeze to 5.10 crack tunnel through option first. </i></b>";
      pop[41] = "<a href=\"https://lh3.googleusercontent.com/-4P0YinyfD9o/UibN8VI72PI/AAAAAAACofU/SiEEwitRe5U/s" + sizeLarge + "/2013-08-11%252520-%252520153%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2581.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-4P0YinyfD9o/UibN8VI72PI/AAAAAAACofU/SiEEwitRe5U/s" + size + "/2013-08-11%252520-%252520153%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2581.jpg\" /></a><br><b><i>Looking deep into the 5.9 squeeze. </i></b>";
      pop[42] = "<a href=\"https://lh4.googleusercontent.com/-WUkZfyjvhdE/UibOBnK_tZI/AAAAAAACofk/GrlQXRBsDH8/s" + sizeLarge + "/2013-08-11%252520-%252520154%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2582.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-WUkZfyjvhdE/UibOBnK_tZI/AAAAAAACofk/GrlQXRBsDH8/s" + size + "/2013-08-11%252520-%252520154%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2582.jpg\" /></a><br><b><i>Looking up into the 5.9 squeeze. Unfortunately the tunnel-through would not work with the follower's pack, so I had to back off and figure out how to get safely into the aid corner. </i></b>";
      pop[43] = "<a href=\"https://lh4.googleusercontent.com/-LUroh32_oRo/UibOEk0vGVI/AAAAAAACof8/ZUi8WeOIJvo/s" + sizeLarge + "/2013-08-11%252520-%252520156%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2584.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-LUroh32_oRo/UibOEk0vGVI/AAAAAAACof8/ZUi8WeOIJvo/s" + size + "/2013-08-11%252520-%252520156%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2584.jpg\" /></a><br><b><i>After placing gear high in an expanding flake, and doing some big stemming, I found it all right to get here. Now to free climb, then french free, then aid! Unfortunately I used up the sizes I needed earlier as ST called for larger cams on this section. Doh! </i></b>";
      pop[44] = "<a href=\"https://lh6.googleusercontent.com/-U-9TncLV0wY/UibOMEZnSeI/AAAAAAACogw/TNBwe3MQA1E/s" + sizeLarge + "/2013-08-11%252520-%252520157%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2585.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-U-9TncLV0wY/UibOMEZnSeI/AAAAAAACogw/TNBwe3MQA1E/s" + size + "/2013-08-11%252520-%252520157%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2585.jpg\" /></a><br><b><i>Looking down P12 after the tension traversse and final bit of unprotected 5.7 wide. Looks like I took way too long. </i></b>";
      pop[45] = "<a href=\"https://lh3.googleusercontent.com/-OPNp3bc7_G0/UibOVAjw6aI/AAAAAAACohs/bTELWpH-wLs/s" + sizeLarge + "/2013-08-11%252520-%252520158a%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2586.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-OPNp3bc7_G0/UibOVAjw6aI/AAAAAAACohs/bTELWpH-wLs/s" + size + "/2013-08-11%252520-%252520158a%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2586.jpg\" /></a><br><b><i>P13, P14, and P15 (5.7, 5.7-5.9, 5.9) chimney pitches that I would link in one 230' pitch with our 70m rope. Good thing chimneys are easy to climb in the dark! </i></b>";
      pop[46] = "<a href=\"https://lh4.googleusercontent.com/-ICheV8dTfgc/UibOdDlp0bI/AAAAAAACojI/MERHMaYr-_8/s" + sizeLarge + "/2013-08-12%252520-%252520161%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2592.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-ICheV8dTfgc/UibOdDlp0bI/AAAAAAACojI/MERHMaYr-_8/s" + size + "/2013-08-12%252520-%252520161%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2592.jpg\" /></a><br><b><i>Rootbeer and smashed cupcakes! In this state we decided to forgo lighting candles . . . </i></b>";
      pop[47] = "<a href=\"https://lh5.googleusercontent.com/-yTKpq_Nb370/UibOfsVoMOI/AAAAAAACojg/sViC2RZuJmc/s" + sizeLarge + "/2013-08-12%252520-%252520162%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2593.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-yTKpq_Nb370/UibOfsVoMOI/AAAAAAACojg/sViC2RZuJmc/s" + size + "/2013-08-12%252520-%252520162%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2593.jpg\" /></a><br><b><i>30th Birthday party atop Big Sandy Ledge! (by Nic Risser) </i></b>";
      pop[48] = "<a href=\"https://lh4.googleusercontent.com/-1agkspaq16o/UibOyEkV37I/AAAAAAAColM/AKgdoHMtwNs/s" + sizeLarge + "/2013-08-12%252520-%252520166%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2598.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-1agkspaq16o/UibOyEkV37I/AAAAAAAColM/AKgdoHMtwNs/s" + size + "/2013-08-12%252520-%252520166%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2598.jpg\" /></a><br><b><i>Signs of life from the ledge below. </i></b>";
      pop[49] = "<a href=\"https://lh5.googleusercontent.com/--SOkYhauGSs/UibO_sH0QZI/AAAAAAAComg/8iEJ_ihQ9FQ/s" + sizeLarge + "/2013-08-12%252520-%252520169%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000248.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/--SOkYhauGSs/UibO_sH0QZI/AAAAAAAComg/8iEJ_ihQ9FQ/s" + size + "/2013-08-12%252520-%252520169%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000248.jpg\" /></a><br><b><i>Climb on! </i></b>";
      pop[50] = "<a href=\"https://lh4.googleusercontent.com/-g3kSWfaR1Xw/UibPHNFxINI/AAAAAAAConA/7blvg5u-h_k/s" + sizeLarge + "/2013-08-12%252520-%252520171%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2601.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-g3kSWfaR1Xw/UibPHNFxINI/AAAAAAAConA/7blvg5u-h_k/s" + size + "/2013-08-12%252520-%252520171%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2601.jpg\" /></a><br><b><i>Nic leading P18 (C1). I should have led this pitch, but the exposure of the wall was getting to me. </i></b>";
      pop[51] = "<a href=\"https://lh5.googleusercontent.com/-rcea82NylvI/UibPSTVZzbI/AAAAAAACooA/EojfhApYhes/s" + sizeLarge + "/2013-08-12%252520-%252520173%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2604.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-rcea82NylvI/UibPSTVZzbI/AAAAAAACooA/EojfhApYhes/s" + size + "/2013-08-12%252520-%252520173%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2604.jpg\" /></a><br><b><i>Nic leading P18 (C1) nearly to the tension traverse tat. </i></b>";
      pop[52] = "<a href=\"https://lh4.googleusercontent.com/-VdiJvfnEvqk/UibPcDJhm-I/AAAAAAACoo4/ldij4s9kagA/s" + sizeLarge + "/2013-08-12%252520-%252520176%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000250.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-VdiJvfnEvqk/UibPcDJhm-I/AAAAAAACoo4/ldij4s9kagA/s" + size + "/2013-08-12%252520-%252520176%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000250.jpg\" /></a><br><b><i>Looking down to Mark on Big Sandy Ledge. (by Nic Risser) </i></b>";
      pop[53] = "<a href=\"https://lh4.googleusercontent.com/-Qj0Ipuywxzg/UibPhx9G6XI/AAAAAAACopY/JNjY3Pz89Wg/s" + sizeLarge + "/2013-08-12%252520-%252520178%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000252.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-Qj0Ipuywxzg/UibPhx9G6XI/AAAAAAACopY/JNjY3Pz89Wg/s" + size + "/2013-08-12%252520-%252520178%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000252.jpg\" /></a><br><b><i>Mark jugging P18, nostrils flared in determination to ignore the exposure. (by Nic Risser) </i></b>";
      pop[54] = "<a href=\"https://lh5.googleusercontent.com/-ReLvM1j9ARs/UibPnJtK3II/AAAAAAACopw/IkKfu_f08Tc/s" + sizeLarge + "/2013-08-12%252520-%252520180%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2606.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-ReLvM1j9ARs/UibPnJtK3II/AAAAAAACopw/IkKfu_f08Tc/s" + size + "/2013-08-12%252520-%252520180%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2606.jpg\" /></a><br><b><i>Jugging P19 (5.10b or C1) and P20 (C1), which Nic linked, freeing P19. Rope drag made P20 slow enough that this was probably slower than breaking up pitches. </i></b>";
      pop[55] = "<a href=\"https://lh6.googleusercontent.com/-H0-c6zITAQ4/UibPqQ4G_rI/AAAAAAACoqY/VmYSEIJP6A0/s" + sizeLarge + "/2013-08-12%252520-%252520181%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2607.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-H0-c6zITAQ4/UibPqQ4G_rI/AAAAAAACoqY/VmYSEIJP6A0/s" + size + "/2013-08-12%252520-%252520181%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2607.jpg\" /></a><br><b><i>Jugging up the final corner of P20 (C1). </i></b>";
      pop[56] = "<a href=\"https://lh5.googleusercontent.com/-ZP0dtb5_YT0/UibPsocwY9I/AAAAAAACorQ/0RfWtRBzCc8/s" + sizeLarge + "/2013-08-12%252520-%252520182%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000254.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-ZP0dtb5_YT0/UibPsocwY9I/AAAAAAACorQ/0RfWtRBzCc8/s" + size + "/2013-08-12%252520-%252520182%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000254.jpg\" /></a><br><b><i>Mark jugging P20, nostrils flared in determination to ignore the exposure. (by Nic Risser) </i></b>";
      pop[57] = "<a href=\"https://lh5.googleusercontent.com/-R_TEAhD_B4c/UibP1ip41DI/AAAAAAACosI/6ZYgbIESxFM/s" + sizeLarge + "/2013-08-12%252520-%252520188%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2609.jpg\" target=\"_blank\"><img src=\"https://lh5.googleusercontent.com/-R_TEAhD_B4c/UibP1ip41DI/AAAAAAACosI/6ZYgbIESxFM/s" + size + "/2013-08-12%252520-%252520188%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2609.jpg\" /></a><br><b><i>Thank God Ledge awaits (P21, 5.9). I should have also led this pitch, but exposure and serious food poisoning left me feeling less up to the task. Quite thrilling to follow! </i></b>";
      pop[58] = "<a href=\"https://lh4.googleusercontent.com/-8Wx678uFNCo/UibP4-UG7SI/AAAAAAACoso/xOVvRnCKYzQ/s" + sizeLarge + "/2013-08-12%252520-%252520190%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2611.jpg\" target=\"_blank\"><img src=\"https://lh4.googleusercontent.com/-8Wx678uFNCo/UibP4-UG7SI/AAAAAAACoso/xOVvRnCKYzQ/s" + size + "/2013-08-12%252520-%252520190%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2611.jpg\" /></a><br><b><i>Nic at the start of the bolt ladder on P23 (C1+, two tension traverses requiring lower-outs to follow). He found the cam hook to be invaluable on this pitch. </i></b>";
      pop[59] = "<a href=\"https://lh3.googleusercontent.com/-IGp7ousDnlU/UibP792F_oI/AAAAAAACotA/OnWLx2967GA/s" + sizeLarge + "/2013-08-12%252520-%252520191%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2613.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-IGp7ousDnlU/UibP792F_oI/AAAAAAACotA/OnWLx2967GA/s" + size + "/2013-08-12%252520-%252520191%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2613.jpg\" /></a><br><b><i>Following P23 (C1+), just before the second lower-out. </i></b>";
      pop[60] = "<a href=\"https://lh6.googleusercontent.com/-MtS7C5GRVlg/UibQA0mAwdI/AAAAAAACotg/yOWKqfW48-U/s" + sizeLarge + "/2013-08-12%252520-%252520192%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2614.jpg\" target=\"_blank\"><img src=\"https://lh6.googleusercontent.com/-MtS7C5GRVlg/UibQA0mAwdI/AAAAAAACotg/yOWKqfW48-U/s" + size + "/2013-08-12%252520-%252520192%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2614.jpg\" /></a><br><b><i>Nic leading P24 (5.7), on easy terrain. The 5.7 slab crux is right off the belay for a couple of moves and not too bad. </i></b>";
      pop[61] = "<a href=\"https://lh3.googleusercontent.com/-jzNEfzUo7Zg/UibQJqs2hYI/AAAAAAACouI/cxLKJhTRF3w/s" + sizeLarge + "/2013-08-12%252520-%252520194%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2616.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-jzNEfzUo7Zg/UibQJqs2hYI/AAAAAAACouI/cxLKJhTRF3w/s" + size + "/2013-08-12%252520-%252520194%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2616.jpg\" /></a><br><b><i>Wall Nut atop Half Dome after ascending the Northwest Regular Route! Ascenders and alpine aiders came in handy. </i></b>";
      pop[62] = "<a href=\"https://lh3.googleusercontent.com/-lIukoA17hrk/UibQP4WtZZI/AAAAAAACovQ/8EPMAkCaxS8/s" + sizeLarge + "/2013-08-12%252520-%252520199%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000263.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-lIukoA17hrk/UibQP4WtZZI/AAAAAAACovQ/8EPMAkCaxS8/s" + size + "/2013-08-12%252520-%252520199%252520-%252520Half%252520Dome%252520NWRR%252520-%252520P1000263.jpg\" /></a><br><b><i>Me and Nic atop Half Dome after climbing the Northwest Regular Route. (by Nic Risser) </i></b>";
      pop[63] = "<a href=\"https://lh3.googleusercontent.com/-qLfx-e3oj_Y/UibQW4cZvOI/AAAAAAACowQ/zDP5rnU3FPw/s" + sizeLarge + "/2013-08-12%252520-%252520209%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2620.jpg\" target=\"_blank\"><img src=\"https://lh3.googleusercontent.com/-qLfx-e3oj_Y/UibQW4cZvOI/AAAAAAACowQ/zDP5rnU3FPw/s" + size + "/2013-08-12%252520-%252520209%252520-%252520Half%252520Dome%252520NWRR%252520-%252520IMG_2620.jpg\" /></a><br><b><i>Nic descending the Cables at sunset. Similar to my experience of climbing Snake Dike, this was one of the more unsettling parts of the climb. </i></b>";


  //Photo coordinates in image
  var photoCoords = new Array();
      photoCoords[0] = [5255, 1850];
      photoCoords[1] = [5255, 1850];
      photoCoords[2] = [5255, 1850];
      photoCoords[3] = [5255, 1850];
      photoCoords[4] = [5255, 1850];
      photoCoords[5] = [5255, 1850];
      photoCoords[6] = [5255, 1850];
      photoCoords[7] = [5255, 1850];
      photoCoords[8] = [5255, 1850];
      photoCoords[9] = [5260, 1800];
                 
    
    //Belay Icon formation types for different zoom levels
    // var myiconSize = [66, 66];     //Original icon size
    // var iconAnchorSize = [33, 33];    //Original icon anchor location within icon
    
    // var myIconPhoto = new Array();  //For zoom < 17
      // var data = scaleIcon(0.25, myiconSize, iconAnchorSize);
      // for (i=0; i <= photoCoords.length-1; i++){
      // myIconPhoto[i] = L.icon({
        // iconUrl: '../public/images/marker-icon-photo.png',
        // iconSize: [scaledIconSize[0],scaledIconSize[1]],
        // iconAnchor: [scaledAnchorSize[0],scaledAnchorSize[1]],
        // className: 'myIconPhoto' + (i + 1)
      // });
      // }

    //Constructing all photo markers w/ position
    // var photos = new Array();
    // for (i=0; i <= photoCoords.length-1; i++){
      // photos[i] = _marker(photoCoords[i], {icon:myIconPhoto[i]}).bindPopup(pop1);
       // Spiderfier.addMarker(photos[i]);
    // }
    
    //Defining label coordinates, anchor offset, and text
    var size = 50
    var iconAnchorSize = [25, 25];    //Original icon anchor location within icon
    var myPhotos = new Array();
        myPhotos[0] = new Array([5255, 1850], iconAnchorSize, '<img src="https://lh5.googleusercontent.com/-yTKpq_Nb370/UibOfsVoMOI/AAAAAAACojg/sViC2RZuJmc/s' + size + '/2013-08-12%20-%20162%20-%20Half%20Dome%20NWRR%20-%20IMG_2593.jpg" />');
        myPhotos[1] = new Array([5255, 1850], iconAnchorSize, '<img src="https://lh3.googleusercontent.com/-DcRpVvD5s30/UibOrLjwT6I/AAAAAAACokY/8IsQu8zmAsE/s' + size + '/2013-08-12%20-%20164%20-%20Half%20Dome%20NWRR%20-%20IMG_2597.jpg" />');
        myPhotos[2] = new Array([5255, 1850], iconAnchorSize, '<img src="https://lh4.googleusercontent.com/-1agkspaq16o/UibOyEkV37I/AAAAAAAColM/AKgdoHMtwNs/s' + size + '/2013-08-12%20-%20166%20-%20Half%20Dome%20NWRR%20-%20IMG_2598.jpg" />');
        myPhotos[3] = new Array([5255, 1850], iconAnchorSize, '<img src="https://lh5.googleusercontent.com/--SOkYhauGSs/UibO_sH0QZI/AAAAAAAComg/8iEJ_ihQ9FQ/s' + size + '/2013-08-12%20-%20169%20-%20Half%20Dome%20NWRR%20-%20P1000248.jpg" />');
        myPhotos[4] = new Array([5255, 1850], iconAnchorSize, '<img src="https://lh4.googleusercontent.com/-g3kSWfaR1Xw/UibPHNFxINI/AAAAAAAConA/7blvg5u-h_k/s' + size + '/2013-08-12%20-%20171%20-%20Half%20Dome%20NWRR%20-%20IMG_2601.jpg" />');
        myPhotos[5] = new Array([5255, 1850], iconAnchorSize, '<img src="https://lh5.googleusercontent.com/-rcea82NylvI/UibPSTVZzbI/AAAAAAACooA/EojfhApYhes/s' + size + '/2013-08-12%20-%20173%20-%20Half%20Dome%20NWRR%20-%20IMG_2604.jpg" />');
        myPhotos[6] = new Array([5255, 1850], iconAnchorSize, '<img src="https://lh4.googleusercontent.com/-ICheV8dTfgc/UibOdDlp0bI/AAAAAAACojI/MERHMaYr-_8/s' + size + '/2013-08-12%20-%20161%20-%20Half%20Dome%20NWRR%20-%20IMG_2592.jpg" />');
        myPhotos[7] = new Array([5255, 1850], iconAnchorSize, '<img src="https://lh5.googleusercontent.com/-Unz3e9zO5kM/UibOal74xfI/AAAAAAACoio/_T72l_ubKME/s' + size + '/2013-08-12%20-%20160%20-%20Half%20Dome%20NWRR%20-%20IMG_2590.jpg" />');
        myPhotos[8] = new Array([5255, 1850], iconAnchorSize, '<img src="https://lh3.googleusercontent.com/-hpq1OEB-Yu0/UibOkfpzgWI/AAAAAAACoj4/RCsUQs4ZCEo/s' + size + '/2013-08-12%20-%20163%20-%20Half%20Dome%20NWRR%20-%20IMG_2596.jpg" />');
        myPhotos[9] = new Array([5260, 1800], iconAnchorSize, '<img src="https://lh3.googleusercontent.com/-K6Yn2q-yJk8/UibO6DJ802I/AAAAAAAComA/PpfZxHJBV-M/s' + size + '/2013-08-12%20-%20168%20-%20Half%20Dome%20NWRR%20-%20P1000247.jpg" />');
    
    //Label Icon formation types for different labels
    var myPhotoIcon = new Array(); 
    for (i=0; i <= myPhotos.length-1; i++){
        myPhotoIcon[i] = L.divIcon({
          className: 'my-div-icon-photo', 
          iconSize: null, //'null' allows div to be resized in CSS. Otherwise, CSS sizing is overwritten by JS.
          iconAnchor: myPhotos[i][1], 
          html: myPhotos[i][2]});
    }
    
    var myPhotoIconHover = new Array(); 
    for (i=0; i <= myPhotos.length-1; i++){
        myPhotoIconHover[i] = L.divIcon({
          className: 'my-div-icon-photo-hover ', 
          iconSize: [35, 50], //'null' allows div to be resized in CSS. Otherwise, CSS sizing is overwritten by JS.
          iconAnchor: myPhotos[i][1], 
          // html: '<img src=/"https://shop.aph.org/wcsstore/APHConsumerDirect/images/catalog/products_large/1-07516-00_APH_Techno_Ball.jpg/" />'});
          html: '<img src=/"../public/images/editmarker.png" />'});
    }

    var myPhotoIconClick = new Array(); 
    for (i=0; i <= myPhotos.length-1; i++){
        myPhotoIconClick[i] = L.divIcon({
          className: 'my-div-icon-photo-click', 
          iconSize: null, //'null' allows div to be resized in CSS. Otherwise, CSS sizing is overwritten by JS.
          iconAnchor: myPhotos[i][1], 
          html: myPhotos[i][2]});
    }
   
    //Constructing all label markers w/ position
    var photos = new Array();
    for (i=0; i <= myPhotos.length-1; i++){
      // photos[i] = _marker(myPhotos[i][0], {icon:myPhotoIcon[i], title:'Rootbeer and smashed cupcakes! In this state we decided to forgo lighting candles . . .'}).bindPopup(pop1);
      photos[i] = _marker(myPhotos[i][0], {icon:myPhotoIcon[i]}).bindPopup(pop[i]);
      Spiderfier.addMarker(photos[i]);
    }
    
    //--- Change icon on click
    //I like this effect
    //For some reason this only works when defined explicitly, rather than in a loop
    // for (i=0; i <= myPhotos.length-1; i++){
      // photos[i].on('click', function(e){
        // photos[i].setIcon(myPhotoIconClick[i]);
      // });
    // }
      
      photos[0].on('click', function(e){
        photos[0].setIcon(myPhotoIconClick[0])
      });
      photos[1].on('click', function(e){
        photos[1].setIcon(myPhotoIconClick[1])
      });
      photos[2].on('click', function(e){
        photos[2].setIcon(myPhotoIconClick[2])
      });
      photos[3].on('click', function(e){
        photos[3].setIcon(myPhotoIconClick[3])
      });
      photos[4].on('click', function(e){
        photos[4].setIcon(myPhotoIconClick[4])
      });
      photos[5].on('click', function(e){
        photos[5].setIcon(myPhotoIconClick[5])
      });
      photos[6].on('click', function(e){
        photos[6].setIcon(myPhotoIconClick[6])
      });
      photos[7].on('click', function(e){
        photos[7].setIcon(myPhotoIconClick[7])
      });
      photos[8].on('click', function(e){
        photos[8].setIcon(myPhotoIconClick[8])
      });
      photos[9].on('click', function(e){
        photos[9].setIcon(myPhotoIconClick[9])
      });

      //--- Change icon on hover
      // For some reason it only loads a blank image, and then fails to resize on the mouseout, although the html is loaded
      // photos[0].on('mouseover', function(e){
        // photos[0].setIcon(myPhotoIconHover[0]);
      // });
      // photos[1].on('mouseover', function(e){
        // photos[1].setIcon(myPhotoIconHover[1]);
      // });
      // photos[2].on('mouseover', function(e){
        // photos[2].setIcon(myPhotoIconHover[2]);
      // });
      // photos[3].on('mouseover', function(e){
        // photos[3].setIcon(myPhotoIconHover[3]);
      // });
      // photos[4].on('mouseover', function(e){
        // photos[4].setIcon(myPhotoIconHover[4]);
      // });
      // photos[5].on('mouseover', function(e){
        // photos[5].setIcon(myPhotoIconHover[5]);
      // });
      // photos[6].on('mouseover', function(e){
        // photos[6].setIcon(myPhotoIconHover[6]);
      // });
      // photos[7].on('mouseover', function(e){
        // photos[7].setIcon(myPhotoIconHover[7]);
      // });
      // photos[8].on('mouseover', function(e){
        // photos[8].setIcon(myPhotoIconHover[8]);
      // });
      // photos[9].on('mouseover', function(e){
        // photos[9].setIcon(myPhotoIconHover[9]);
      // });
      // photos[9].on('mouseout', function(e){
        // photos[9].setIcon(myPhotoIcon[9]);
      // });


      
    var currentPhoto = new Array
    for (var i = 0; i < photos.length; i++) {
        var currentPhoto = photos[i];
        // currentPhoto.on('click', photos[i].setIcon(myPhotoIconClick[i]));
        // currentPhoto.on('mouseover', currentPhoto.setIcon(myPhotoIconHover[i]));
        
        // https://groups.google.com/forum/#!topic/leaflet-js/9tyvCzqFB1M
        // http://jsfiddle.net/jcocoder/YzhwZ/2/
        //---Works for mouseover popup, but a delay would be nice
        // currentPhoto.on('mouseover', currentPhoto.openPopup.bind(currentPhoto));
        // currentPhoto.on('mouseout',  currentPhoto.closePopup);
        
        //---Attempt to add Timer using JQuery. Works for alert but not popup. If I use whole popup event call again, it will work the next time I mouseover the element.
        // var timer;
        // currentPhoto.addEventListener('mouseover', function(e) {
            // timer = setTimeout(function() {
                // currentPhoto.openPopup.bind(currentPhoto);  
                // alert('Hi there'); 
            // }, 2000);
        // }, true);
        // currentPhoto.addEventListener('mouseout', function(e) {
            // currentPhoto.closePopup;
            // clearTimeout(timer);
        // }, true); 
        
        //---Attempt to add Timer using JavasScript. Breaks map
        // var delay = function(currentPhoto, callback) {
          // var timeout = null;
          // currentPhoto.onmouseover = function() {
                // timeout = setTimeout(callback, 1000);
          // };
          // currentPhoto.onmouseout = function() {
          // clearTimeout(timeout);
          // }
        // };
        // delay(currentPhoto, function(){
          // currentPhoto.openPopup.bind(currentPhoto);
        // };
        // currentPhoto.on('mouseout',  currentPhoto.closePopup);
    };
        
      
        
    
      
    //Adds all belay markers to one layer
    var photosLayer = L.layerGroup(photos).addTo(map);
  
  Spiderfier.addListener('spiderfy', function(markers) {
    // for (var i = 0, len = markers.length; i < len; i ++) markers[i].setIcon(new lightIcon());    //Assigns a new icon to the 'spiderfied' icons upon expansion
    map.closePopup();   // This prevents the popup from initiating upon the first click to spiderfy
  });
  
  // Spiderfier.addListener('unspiderfy', function(markers) {
    // for (var i = 0, len = markers.length; i < len; i ++) markers[i].setIcon(new darkIcon());     //Assigns original icon to the 'spiderfied' icons upon closure
  // });

  
  //--------Polygons----------
  //TO DO:
  //  1. Create remaining polygons
  //  2. Create shared options object?
  
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
  
  
  //--------Prepare Polylines--------
  //TO DO:
  //  1.  Death Slabs Approach?
  //  2.  Cables Approach?
  //  3.  Route line segments colored & patterned for climbing difficulty & tension traverse?  
  
  
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
  // Only add '.addTo(map)' to the control instantiation and not the symbol definition if it is desired 
  // to leave the symbol invisible upon load
    var route = L.layerGroup([
      routeNWRR
    ]).addTo(map);

    var features = L.layerGroup([
      Visor1,
      Visor2
    ]).addTo(map);
 
  //--------Prepare Layer Controls--------
  //TO DO:
  //  1.  Would be nice to not have the baseMaps listing, or at least get the radio button automatically selected
  var baseMaps = {
  "Half Dome NW Face": map
  };
  
  var overlayMaps = {
  "Belays": belaysLayer,
  "Northwest Regular Route": routeNWRR,
  "Photos": photosLayer,
  "Labels": labelsLayer,
  "Features": features
  };

  //Layers Control
  L.control.layers(baseMaps,overlayMaps).addTo(map);
  
  //======Attempts at getting drawing plugins to work
  
  //----Plotter----Unsuccessful. Tried altering .js script
  // var plottedPolyline = L.Polyline.Plotter([
  // var plottedPolyline = _polyline.Plotter([
        // [unproject(500), unproject(500)],
        // [unproject(3000), unproject(1000)],
        // [unproject(2000), unproject(2000)]
        //---
        // [unproject(500, 500)],
        // [unproject(3000, 1000)],
        // [unproject(2000, 2000)]
        //--
        // unproject([500, 500]),
        // unproject([3000, 1000]),
        // unproject([2000, 2000])
        //---
        // unproject([500, 500],
                  // [3000, 1000],
                  // [2000, 2000])
    // ],{
        // weight: 5
    // }).addTo(map);
    
      // var plottedPolyline = _plotter([
                  // [500, 500],
                  // [3000, 1000],
                  // [2000, 2000]
    // ],{
        // weight: 5
    // }).addTo(map);
  
  //---Leaflet Draw
  //Works! Now to extract the data ...
  var drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);

		var drawControl = new L.Control.Draw({
			draw: {
				position: 'topleft',
				polygon: {
					title: 'Draw a sexy polygon!',
					allowIntersection: false,
					drawError: {
						color: '#b00b00',
						timeout: 1000
					},
					shapeOptions: {
						color: '#bada55'
					},
					showArea: true
				},
				polyline: {
					metric: false
				},
				circle: {
					shapeOptions: {
						color: '#662d91'
					}
				}
			},
			edit: {
				featureGroup: drawnItems
			}
		});
		map.addControl(drawControl);

		map.on('draw:created', function (e) {
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {
				layer.bindPopup('A popup!');
			}

			drawnItems.addLayer(layer);
		});
  
  
};

//------------ Perhaps use for roughly showing bolts for bolt ladders & TT anchors?      
 // var circle = _circle([4000, 1000], 10, {
   // color: 'red',
   // weight: 2,
   // fillColor: '#f03',
   // fillOpacity: 0.5
  // }).addTo(map).bindPopup(pop1);


// var zoomLevel = map.getZoom();
      // alert(zoomLevel);
     
  // =========

   // map.on('zoomend', function(e){
      // var zoomLevel = map.getZoom();
      // alert(zoomLevel);
      // };
      
      
    // This is for possibly having div icons with numbers for the belays
    // var myDivIconBelay = L.divIcon({
        // className: 'my-div-icon-belay', 
        //iconSize: new L.Point(700, 400),
        //iconSize: [20, 20],
        // iconSize: null, //'null' allows div to be resized in CSS. Otherwise, CSS sizing is overwritten by JS.
        // iconAnchor: [9, 25], //offset from top left corner
        // html:'1'});
    // var myDivIconBelayTest = _marker([4162+100, 6600+100], {icon:myDivIconBelay}).addTo(map);   

  //=======Spiderfy
    //Adds Popup to icon
      // var popups = new Array();
      // for (i=0; i <= myPhotos.length-1; i++){
        // popups[i] = new L.Popup({closeButton: false, offset: new L.Point(0.5, -24)});
        // Spiderfier.addListener('click', function(photos) {
          // popups[i].setContent(photos[i].desc);
          // popups[i].setLatLng(photos[i].getLatLng());
          // map.openPopup(popups[i]);
        // });
      // }
    
    //Would be nice to allow double-click of particular icon to bring up popup?
    // myPhotoIconPop.on('dbclick', function(e) {
      // alert('double clicked!');
    // });
        