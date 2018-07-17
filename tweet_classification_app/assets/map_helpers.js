// connecting to socket.io to get data from sim

var outer = io.sails.connect();
var inner = io.sails.connect();

var collection_code;
var class_labels;
var damage_labels;
var sentiment_labels;
var image_existence_labels;
var total_labels;

var query_code = '';


//Accordions are the collapsible and expandable categories in green

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


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
  extraClasses: 'green-marker',
  prefix: 'fa'
});

// Yellow color marker
var myIcon2 = L.ExtraMarkers.icon({
  icon: 'fa-circle-o',
  iconShape: 'circle',
  markerColor: 'yellow',
  extraClasses: 'yellow-marker',
  prefix: 'fa'
});

// Red color marker
var myIcon3 = L.ExtraMarkers.icon({
  icon: 'fa-circle-o',
  iconShape: 'circle',
  markerColor: 'red',
  extraClasses: 'red-marker',
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

// setting the map with different properties + different layers
var map = L.map('map', {
  center: [20.0, 5.0],
  minZoom: 2,
  zoom: 2,
  layers: [streets, mcg],
  worldCopyJump: true,
});


L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c'],
}).addTo(map);

L.control.layers(baseLayers, overlays).addTo(map);

function data(collection_code, class_labels, damage_labels, sentiment_labels, image_existence_labels){
  collection_code = collection_code;
  class_labels = class_labels;
  damage_labels =  damage_labels;
  sentiment_labels = sentiment_labels;
  image_existence_labels = image_existence_labels;
  total_labels = class_labels.length+damage_labels.length+sentiment_labels.length+image_existence_labels.length;
}
function Action(el) {

  my_window = window.open('http://localhost:1337/sim/add', '', 'width=,height=,resizable=no');
  windoww = my_window;
  my_window.focus();

  if (el.value === "Start")
    el.value = "Stop";
  else
    el.value = "Start";

}

function fillupAccordions(){
  
    if(total_labels != 0){

      if(damage_labels.length!=0){

        //<!-- severitymaster is the id of the div tag under the Severity category button.-->

          dyrender('severitymaster', 'severity', '');

        //<!-- Creating the checkboxes and labels dynamically for severity -->
          for(i in damage_labels){

            var slc1 = document.getElementById('severity');
            var ele = damage_labels[i];
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.align = "left";
            checkbox.className = "severity";
            checkbox.value = ele;
            slc1.appendChild(checkbox);
            var label = document.createElement('label')
            label.htmlFor = ele;
            label.align = "left";
            label.setAttribute('style', 'color:#000000;');
            var te = ele;
            // if there is no severity, do not display anything
            if (ele == "null" && damage_labels.length == 1) {
              te = "";
              checkbox.style.display = 'none';
              var x = document.getElementById("damage_slider");
              x.innerHTML = "";
            }

            if (ele == 'null') {
              te = 'Unknown';
            }
            else if (ele == 'None') {
              te = 'Zero';
            } else if (ele == 'Severe') {
              te = 'High';
            }
            label.appendChild(document.createTextNode(te + ' ' + 'Severity'));
            slc1.appendChild(label);
            slc1.appendChild(document.createElement("br"));
            checkbox.setAttribute("onClick", "task(event);");

          }


          var slid1 = document.getElementById('damage_slider_container');
          var slid1in = document.createElement('input');
          slid1in.type = "range"
          slid1in.className = "slider";
          slid1in.id = "myRange";
          slid1in.min = "0";
          slid1in.max = "1";
          slid1in.step = "0.0001";
          slid1in.value = "0"
          var slid1inp = document.createElement('p');
          slid1inp.className = "paralign";
          var slid1inspan = document.createElement('span');
          slid1inspan.className = "smallbutton";
          slid1inspan.id = "demon";
          slid1inp.appendChild(slid1inspan);
          slid1.appendChild(slid1in);
          slid1.appendChild(slid1inp);


       }

      if(class_labels.length!=0){

        //<!-- aidrmaster is the id of the div tag under the AIDR Label category button.-->
        dyrender('aidrmaster', 'aidr', '');

          for(i in class_labels){
            //<!-- Creating the checkboxes and labels dynamically for aidr-->
            var slc2 = document.getElementById('aidr');
            var ele = class_labels[i];
            var check = labelize(ele);
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "aidr";
            checkbox.value = ele;
            slc2.appendChild(checkbox);
            var label = document.createElement('label')
            label.setAttribute('style', 'color:#000000;');
            label.htmlFor = ele;

            // if there is no aidr, do not display anything
            if (ele == "null" && class_labels.length == 1) {
              checkbox.style.display = 'none';
              var x = document.getElementById("class_slider");
              x.innerHTML = "";
            };

            label.appendChild(document.createTextNode(check.replace(/_/g, ' ')));
            slc2.appendChild(label);
            slc2.appendChild(document.createElement("br"));
            checkbox.setAttribute("onClick", "task(event);");
          }

          var slid2 = document.getElementById('class_slider_container');
          var slid2in = document.createElement('input');
          slid2in.type = "range"
          slid2in.className = "slider";
          slid2in.id = "myRange1";
          slid2in.min = "0";
          slid2in.max = "1";
          slid2in.step = "0.0001";
          slid2in.value = "0"
          var slid2inp = document.createElement('p');
          slid2inp.className = "paralign";
          var slid2inspan = document.createElement('span');
          slid2inspan.className = "smallbutton";
          slid2inspan.id = "demon1";
          slid2inp.appendChild(slid2inspan);
          slid2.appendChild(slid2in);
          slid2.appendChild(slid2inp);
      }

      if(sentiment_labels.length!=0){

        //<!-- sentimentmaster is the id of the div tag under the Sentiment category button.-->
        dyrender('sentimentmaster', 'sentiment', '');


        for(i in sentiment_labels){
          //<!-- Creating the checkboxes and labels dynamically for sentiment -->

            var slc3 = document.getElementById('sentiment');
            var ele = sentiment_labels[i];
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "sentiment";
            checkbox.value = ele;
            slc3.appendChild(checkbox);
            var label = document.createElement('label')
            label.htmlFor = ele;
            label.setAttribute('style', 'color:#000000;');
            te = ele;
            // if there is no aidr, do not display anything
            if (ele == "null" && sentiment_labels.length == 1) {
              te = "";
              checkbox.style.display = 'none';
              var x = document.getElementById("sentiment_slider");
              x.innerHTML = "";
            }
            label.appendChild(document.createTextNode(te));
            slc3.appendChild(label);
            slc3.appendChild(document.createElement("br"));
            checkbox.setAttribute("onClick", "task(event);");

         }

          var slid3 = document.getElementById('sentiment_slider_container');
          var slid3in = document.createElement('input');
          slid3in.type = "range"
          slid3in.className = "slider";
          slid3in.id = "myRange2";
          slid3in.min = "0";
          slid3in.max = "1";
          slid3in.step = "0.0001";
          slid3in.value = "0"
          var slid3inp = document.createElement('p');
          slid3inp.className = "paralign";
          var slid3inspan = document.createElement('span');
          slid3inspan.className = "smallbutton";
          slid3inspan.id = "demon2";
          slid3inp.appendChild(slid3inspan);
          slid3.appendChild(slid3in);
          slid3.appendChild(slid3inp);

      }

      if(image_existence_labels.length!=0){
        //<!-- imagemaster is the id of the div tag under the Image category button.-->
          dyrender('imagemaster', 'image', '');
        for(i in image_existence_labels){
          //<!-- Creating the checkboxes and labels dynamically for sentiment -->
            var slc4 = document.getElementById("image");
            var ele = image_existence_labels[i];
            var check =labelize(ele);
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "image";
            checkbox.value = ele;
            slc4.appendChild(checkbox);
            var label = document.createElement('label')
            label.htmlFor = ele;
            label.setAttribute('style', 'color:#000000;');
            label.appendChild(document.createTextNode(check));
            slc4.appendChild(label);
            slc4.appendChild(document.createElement("br"));
            checkbox.setAttribute("onClick", "task(event);");
         }
       }

     }

    //<!-- Slider  -->

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demon");
    output.innerHTML = slider.value;
    slider.oninput = function() {
      output.innerHTML = this.value;
    }
    slider.onmouseup = function() {
      task(event);
    }
    var slider1 = document.getElementById("myRange1");
    var output1 = document.getElementById("demon1");
    output1.innerHTML = slider1.value;
    slider1.oninput = function() {
      output1.innerHTML = this.value;
    }
    slider1.onmouseup = function() {
      task(event);
    }
    var slider2 = document.getElementById("myRange2");
    var output2 = document.getElementById("demon2");
    output2.innerHTML = slider2.value;
    slider2.oninput = function() {
      output2.innerHTML = this.value;
    }
    slider2.onmouseup = function() {
      task(event);
    }
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


function lazyChecker(category, label){
  if(category == 'sentiment'){
    label = labelize(label);
    return sentiment_labels.indexOf(label) > -1;
  } else if (category == 'class'){
    label = unlabelize(label);
    return class_labels.indexOf(label) > -1;
  }
}

function lazyMarkers(class_label, sentiment_label){
  var awesome_icon = 'fa-circle-o';
  var awesome_color = '#494949';
  if(lazyChecker('class', unlabelize(class_label))){
    awesome_icon = iconpicker(class_label);
  }
  if (lazyChecker('sentiment', unlabelize(sentiment_label))){
    awesome_color = colorpicker(sentiment_label);
  }
  //marker
  var lazyIcon = L.ExtraMarkers.icon({
    icon: awesome_icon,
    iconShape: 'circle',
    markerColor: awesome_color,
    prefix: 'fa'
  });
  return lazyIcon;
}

function colorpicker(sentiment_label){

  sentiment_label = sentiment_label.toLowerCase();
  if(sentiment_label == 'neutral'){
    return 'yellow';
  } else if(sentiment_label == 'positive'){
    return 'green';
  } else if (sentiment_label == 'negative'){
    return 'red';
  } else {
    return 'dimgray'
  }
}

function iconpicker(class_label){
  class_label = unlabelize(class_label);
  if(class_label == 'relevant_information'){
    return 'fa-thumbs-up';
  } else if(class_label == 'personal'){
    return 'fa-user';
  } else if (class_label == 'injured_or_dead_people'){
    return 'fa-medkit';
  } else if (class_label == 'infrastructure_and_utilities_damage'){
    return 'fa-building';
  } else if (class_label == 'caution_and_advice'){
    return 'fa-exclamation-triangle';
  } else if (class_label == 'affected_individual'){
    return 'fa-diagnoses';
  } else if (class_label == 'not_related_or_irrelevant'){
    return 'fa-question-circle';
  } else if (class_label == 'donation_and_volunteering'){
    return 'fa-people-carry';
  } else if (class_label == 'sympathy_and_support'){
    return 'fa-hands-helping';
  } else return 'fa-circle-o'

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
