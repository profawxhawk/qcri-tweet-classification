// connecting to socket.io to get data from sim

var outer = io.sails.connect();
var inner = io.sails.connect();


// this is required for the map to be displayed
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
  '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
// street and satellite view from mapbox
var streets = L.tileLayer(mbUrl, {
  id: 'mapbox.streets',
  attribution: mbAttr
});
var satellite = L.tileLayer(mbUrl, {
  id: 'mapbox.streets-satellite',
  attribution: mbAttr
});

// Green  marker
var myIcon = L.ExtraMarkers.icon({
  icon: 'fa-circle-o',
  iconShape: 'circle',
  markerColor: 'green',
  prefix: 'fa'
});

// Yellow color marker
var myIcon2 = L.ExtraMarkers.icon({
  icon: 'fa-circle-o',
  iconShape: 'circle',
  markerColor: 'yellow',
  prefix: 'fa'
});
// Red color marker
var myIcon3 = L.ExtraMarkers.icon({
  icon: 'fa-circle-o',
  iconShape: 'circle',
  markerColor: 'red',
  prefix: 'fa'
});

var mcg = L.markerClusterGroup();


var baseLayers = {
  "Streets": streets,
  "Satellite": satellite
};
var overlays = {
  "Markers": mcg
};

// Start button enables the simulator

var windoww = "";

function Action(el) {

  my_window = window.open('http://localhost:1337/sim/add', '', 'width=,height=,resizable=no');
  windoww = my_window;
  my_window.focus();

  if (el.value === "Start")
    el.value = "Stop";
  else
    el.value = "Start";

}



function labelize(str) {
  str = str.split("_").join(" ");
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    if (splitStr[i] != "and" && splitStr[i] != "or") {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
  }
  return splitStr.join(' ');
}

function unlabelize(str) {
  str = str.split(" ").join("_");
  return str.toLowerCase();
}

// open the navigation bar
function openNav() {
  $("#SpanHeader").toggleClass("Black");
  $("#SpanHeader2").toggleClass("Black");
  document.getElementById("myNav").style.width = "30%";

}
// close the navigation bar
function closeNav() {
  $("#SpanHeader").removeClass("Black");
  $("#SpanHeader2").toggleClass("Black");
  document.getElementById("myNav").style.width = "0%";
}

function linkify(tweet) {
  var link_index = tweet.lastIndexOf('https://');
  var tweet_words = tweet.substring(link_index);
  tweet_words = tweet_words.split(" ");
  var link = tweet_words[0].replace(/['"]+/g, '');
  return link;
}


function dyrender(s1, s2, s3) {
  var num = document.getElementById(s1);
  var td = document.createElement('td');
  var tr = document.createElement('tr');
  var h4 = document.createElement('h4');
  var div = document.createElement('div');
  div.id = s2;
  var txt = document.createTextNode(s3);
  h4.appendChild(txt);
  td.appendChild(h4);
  tr.appendChild(td);
  num.appendChild(tr);
  td = document.createElement('td');
  tr = document.createElement('tr');
  td.appendChild(div);
  tr.appendChild(td);
  num.appendChild(tr);
  td = document.createElement('td');
  tr = document.createElement('tr');
  td.appendChild(document.createTextNode('\u00A0'));
  tr.appendChild(td);
  num.appendChild(tr);
}
