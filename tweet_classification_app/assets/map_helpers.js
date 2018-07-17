// connecting to socket.io to get data from sim

var sockets = {
  outer: io.sails.connect(),
  inner: io.sails.connect(),
};

var packet = {
  collection_code: '',
  class_labels: '',
  damage_labels: '',
  sentiment_labels: '',
  image_existence_labels: '',
  total_labels: 0,
};

var locals = {
  display_sentiment: '',
  display_aidr: '',
  display_severity: '',
  query_code: '',
};

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

function localizer(sentiment_tag, severity_tag, aidr_tag){
  locals.display_sentiment= sentiment_tag;
  locals.display_aidr= severity_tag;
  locals.display_severity= aidr_tag;
}


function data(collection_code, class_labels, damage_labels, sentiment_labels, image_existence_labels){
  packet.collection_code = collection_code;
  packet.class_labels = class_labels;
  packet.damage_labels =  damage_labels;
  packet.sentiment_labels = sentiment_labels;
  packet.image_existence_labels = image_existence_labels;
  packet.total_labels = class_labels.length+damage_labels.length+sentiment_labels.length+image_existence_labels.length;
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

    if(packet.total_labels != 0){

      if(packet.damage_labels.length!=0){

        //<!-- severitymaster is the id of the div tag under the Severity category button.-->

          dyrender('severitymaster', 'severity', '');

        //<!-- Creating the checkboxes and labels dynamically for severity -->
          for(i in packet.damage_labels){

            var slc1 = document.getElementById('severity');
            var ele = packet.damage_labels[i];
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
            if (ele == "null" && packet.damage_labels.length == 1) {
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

      if(packet.class_labels.length!=0){

        //<!-- aidrmaster is the id of the div tag under the AIDR Label category button.-->
        dyrender('aidrmaster', 'aidr', '');

          for(i in packet.class_labels){
            //<!-- Creating the checkboxes and labels dynamically for aidr-->
            var slc2 = document.getElementById('aidr');
            var ele = packet.class_labels[i];
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
            if (ele == "null" && packet.class_labels.length == 1) {
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

      if(packet.sentiment_labels.length!=0){

        //<!-- sentimentmaster is the id of the div tag under the Sentiment category button.-->
        dyrender('sentimentmaster', 'sentiment', '');


        for(i in packet.sentiment_labels){
          //<!-- Creating the checkboxes and labels dynamically for sentiment -->

            var slc3 = document.getElementById('sentiment');
            var ele = packet.sentiment_labels[i];
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
            if (ele == "null" && packet.sentiment_labels.length == 1) {
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

      if(packet.image_existence_labels.length!=0){
        //<!-- imagemaster is the id of the div tag under the Image category button.-->
          dyrender('imagemaster', 'image', '');
        for(i in packet.image_existence_labels){
          //<!-- Creating the checkboxes and labels dynamically for sentiment -->
            var slc4 = document.getElementById("image");
            var ele = packet.image_existence_labels[i];
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
    return packet.sentiment_labels.indexOf(label) > -1;
  } else if (category == 'class'){
    label = unlabelize(label);
    return packet.class_labels.indexOf(label) > -1;
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



function get1(qu, flag) {

  sockets.outer.get(qu, function(resData, jwres) {
    mcg.clearLayers();
    map.addLayer(mcg);
    for (let j = 0; j < resData.sim.length; j++) {

      let latitude = resData.sim[j].latitude;
      let longitude = resData.sim[j].longitude;
      let text1 = resData.sim[j].tweet_text;
      let img = resData.sim[j].image_physical_location;
      let aidr = resData.sim[j].aidr_class_label;
      let sentiment = resData.sim[j].sentiment;
      let severity = resData.sim[j].image_damage_class;
      // this takes the url part fo tweet text and makes it a hyperlink


      var a = linkify(text1);
      var senti = '';
      let aid = '';
      aid = labelize(aidr);
      let marker_icon = lazyMarkers(aid, sentiment);
      // in the database, the records that are null for severity, we set it to unknown, and those which say None we set it to Zero
      if (severity == '') {
        severity = "Unknown";
      }
      if (severity == 'None') {
        severity = "Zero";
      }

      var popup = L.popup();
      // popoup for markers with an image
      function onMapClick() {
        popup
          .setLatLng([longitude, latitude])
          .setContent('<p>' + a + '</p>' + "<a target='" + '_blank' + "' href='" + img + "'><img class='size'  src='" + img + "'/></a>" + '<p>' + '<b>' + locals.display_aidr + '</b>' + aid + '</p>' + '<p>' + '<b>' +
            locals.display_sentiment + '</b>' + sentiment + '</p>' + '<p>' + '<b>' + locals.display_severity + '</b>' + severity + '</p>')
          .addTo(map);
      }
      // popoup for markers without an image
      function onMapClick2() {
        popup
          .setLatLng([longitude, latitude])
          .setContent('<p>' + a + '</p>' + '<p>' + '<b>' + locals.display_aidr + '</b>' + aid + '</p>' + '<p>' + '<b>' + locals.display_sentiment + '</b>' + sentiment + '</p>' + '<p>' + '<b>' +
            locals.display_severity + '</b>' + severity + '</p>')
          .addTo(map);
      }
      // for each severity there are two cases- with and without image. Here we are just creating the marker and adding it to a markerGroup
      if (severity == ('None')) {
        if (img == '') {
          little = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little.on('click', onMapClick2);

        } else {
          little1 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little1.on('click', onMapClick);

        }
      } else if (severity == 'Mild') {
        if (img == '') {
          little2 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little2.on('click', onMapClick2);

        } else {
          little3 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little3.on('click', onMapClick);

        }
      } else if (severity == 'Severe') {
        if (img == '') {
          little4 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little4.on('click', onMapClick2);
        } else {

          little5 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little5.on('click', onMapClick);
        }
      } else if (severity == 'Minor') {
        if (img == '') {
          little41 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little41.on('click', onMapClick2);
        } else {

          little51 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little51.on('click', onMapClick);
        }
      } else if (severity == 'Moderate') {
        if (img == '') {
          little42 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little42.on('click', onMapClick2);
        } else {

          little52 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little52.on('click', onMapClick);
        }
      } else if (severity == 'Major') {
        if (img == '') {
          little43 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little43.on('click', onMapClick2);
        } else {

          little53 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little53.on('click', onMapClick);
        }
      } else {
        if (img == '') {
          little6 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little6.on('click', onMapClick2);

        } else {
          little7 = new L.marker([longitude, latitude], {
            icon: marker_icon
          }).addTo(mcg);
          little7.on('click', onMapClick);

        }
      }
    }
    // this is to ensure the querying is done for new markers only
    if (resData.sim.length != 0) {
      let createtime1 = resData.sim[0].createtime;
      let vep = locals.query_code;
      var n = vep.indexOf("q8");
      var res = vep.replace(vep.substring(n + 3), createtime1);
      locals.query_code = res;
    }
    if (flag == 0) {

      setInterval(
        function() {
          sockets.inner.get(locals.query_code, function(resData1, jwres) {
            for (let i = 0; i < resData1.sim.length; i++) {
              let latii = resData1.sim[i].latitude
              let longi = resData1.sim[i].longitude
              let text1i = resData1.sim[i].tweet_text
              let imgi = resData1.sim[i].image_physical_location
              let aidri = resData1.sim[i].aidr_class_label
              let sentimenti = resData1.sim[i].sentiment
              let severityi = resData1.sim[i].image_damage_class
              let txt1 = text1i;
              let ai = '<a href="' + linkify(txt1) + '" target="' + '_blank' + '"">' + linkify(txt1) + '</a>';
              let sentii = '';
              let aidi = '';
              aidi = labelize(aidri);
              var popup1 = L.popup();
              let marker_icon = lazyMarkers(aid, sentiment);
              // same as onMapClick function
              function onMapClick1() {
                popup1
                  .setLatLng([longi, latii])
                  .setContent('<p>' + ai + '</p>' + "<a target='" + '_blank' + "' href='" + imgi + "'><img class='size'  src='" + imgi + "'/></a>" + '<p>' + '<b>' + locals.display_aidr + '</b>' + aidi + '</p>' +
                    '<p>' + '<b>' + locals.display_sentiment + '</b>' + sentimenti + '</p>' + '<p>' + '<b>' + locals.display_severity + '</b>' + severityi + '</p>')
                  .addTo(map);
              }
              // same as onMapClick2 function
              function onMapClick21() {
                popup1
                  .setLatLng([longi, latii])
                  .setContent('<p>' + ai + '</p>' + '<p>' + '<b>' + locals.display_aidr + '</b>' + aidi + '</p>' + '<p>' + '<b>' + locals.display_sentiment + '</b>' + sentimenti + '</p>' +
                    '<p>' + '<b>' + locals.display_severity + '</b>' + severityi + '</p>')
                  .addTo(map);
              }
              // same process here with markeres created for image and without image
              if (severityi == ('None')) {
                if (imgi == '') {
                  littlei = new L.marker([longi, latii], {
                  icon: marker_icon
                  }).addTo(mcg);
                  littlei.on('click', onMapClick21);

                } else {
                  little1i = new L.marker([longi, latii], {
                  icon: marker_icon
                  }).addTo(mcg);
                  little1i.on('click', onMapClick1);

                }
              } else if (severityi == 'Mild') {
                if (imgi == '') {
                  little2i = new L.marker([longi, latii], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little2i.on('click', onMapClick21);

                } else {
                  little3i = new L.marker([longi, latii], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little3i.on('click', onMapClick1);

                }
              } else if (severityi == 'Severe') {
                if (imgi == '') {
                  little4i = new L.marker([longi, latii], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little4i.on('click', onMapClick21);
                } else {

                  little5i = new L.marker([longi, latii], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little5i.on('click', onMapClick1);
                }
              } else if (severity == 'Minor') {
                if (img == '') {
                  little41 = new L.marker([long, lati], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little41.on('click', onMapClick2);
                } else {

                  little51 = new L.marker([long, lati], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little51.on('click', onMapClick);
                }
              } else if (severity == 'Moderate') {
                if (img == '') {
                  little42 = new L.marker([long, lati], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little42.on('click', onMapClick2);
                } else {

                  little52 = new L.marker([long, lati], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little52.on('click', onMapClick);
                }
              } else if (severity == 'Major') {
                if (img == '') {
                  little43 = new L.marker([long, lati], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little43.on('click', onMapClick2);
                } else {

                  little53 = new L.marker([long, lati], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little53.on('click', onMapClick);
                }
              } else {
                if (imgi == '') {
                  little6i = new L.marker([longi, latii], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little6i.on('click', onMapClick21);

                } else {
                  little7i = new L.marker([longi, latii], {
                    icon: marker_icon
                  }).addTo(mcg);
                  little7i.on('click', onMapClick1);

                }
              }
            }
            // ensure querying is done on new markers onle
            if (resData1.sim.length != 0) {
              let createtime2 = resData1.sim[0].createtime;
              let vep1 = locals.query_code;
              var n1 = vep1.indexOf("q8");
              var res1 = vep1.replace(vep1.substring(n1 + 3), createtime2);
              locals.query_code = res1;
            }
          });
        }, 5000);
      // every 5 seconds the realtime aspect is done (e.g. refresh page 5 seconds wihtout any blinking)
    }
  });
}




// <!-- Load the slider  -->

// <!-- For aidr, sentiment and image damage class, we find which checboxes are checked so that we can query appropriately -->
// <!-- These are stored in str, str2, str3 -->
// <!-- Then an appropriate query is written - query1, query2 and query3 -->
// <!-- for image, query4 is written directly -->

function task(e) {
  var checks = document.getElementsByClassName('severity');
  var str = '';
  if (locals.display_severity == "Severity: " || locals.display_severity == " ") {
    for (i = 0; i < packet.damage_labels.length; i++) {

      if (checks[i].checked === true) {
        str += checks[i].value + " ";
      }

    }
  }
  if (str != '') {
    str = str.trim();
    str = str.split(' ');
  }
  var checks2 = document.getElementsByClassName('aidr');
  var str2 = '';
  if (locals.display_aidr == "Humanitarian Category: " || locals.display_aidr == " ") {
    for (j = 0; j < packet.class_labels.length; j++) {
      if (checks2[j].checked === true) {
        str2 += checks2[j].value + " ";
      }

    }
  }
  if (str2 != '') {
    str2 = str2.trim();
    str2 = str2.split(' ');
  }
  var checks3 = document.getElementsByClassName('sentiment');
  var str3 = '';
  if (locals.display_sentiment == "Sentiment: " || locals.display_sentiment == " ") {
    for (k = 0; k < packet.sentiment_labels.length; k++) {

      if (checks3[k].checked === true) {
        str3 += checks3[k].value + " ";
      }
    }
  }
  if (str3 != '') {
    str3 = str3.trim();
    str3 = str3.split(' ');
  }
  query4 = '';
  var checks4 = document.getElementsByClassName('image');
  if (checks4[0].checked == true && checks4[1].checked == false) {
    query4 = "no";
  } else if (checks4[1].checked == true && checks4[0].checked == false) {
    query4 = "yes";
  } else if (checks4[1].checked == true && checks4[0].checked == true) {
    query4 = "both1";
  } else if (checks4[1].checked == false && checks4[0].checked == false) {
    query4 = "both2";
  }
  var idc = {
    'null': false,
    'None': false,
    'Mild': false,
    'Severe': false
  };
  query = '';
  query1 = '';
  query2 = '';
  query3 = '';
  for (l = 0; l < str.length; l++) {
    if (str[l] == "null") {
      idc[str[l]] = true;
      query += '{image_damage_class:' + '\"' + '\"' + '}';
      query1 += '{image_damage_class:' + '\"' + '\"' + '}';
    } else {
      idc[str[l]] = true;
      query += '{image_damage_class:' + '\"' + str[l] + '\"' + '}';
      query1 += '{image_damage_class:' + '\"' + str[l] + '\"' + '}';
    }
  }
  for (m = 0; m < str2.length; m++) {
    query += '{aidr_class_label:' + '\"' + str2[m] + '\"' + '}';
    query2 += '{aidr_class_label:' + '\"' + str2[m] + '\"' + '}';
  }
  var sen = {
    'Positive': false,
    'Negative': false,
    'Neutral': false
  };
  for (n = 0; n < str3.length; n++) {
    query += '{sentiment:' + '\"' + str3[n] + '\"' + '}';
    query3 += '{sentiment:' + '\"' + str3[n] + '\"' + '}';
  }

  // Then all the querying are combined and sent to the controller.
  // Remember: Across different categories it is an "AND" cosntion, and within a category it is an "OR" condition
  var qu = '/tweets/filteror?q1=' + query1 + '&q2=' + query2 + '&q3=' + query3 + '&q4=' + query4 + '&q5=' + 0 + '&q7=' + 0 + '&q9=' + collection_code + '&q10=' + document.getElementById("demon").innerHTML +
    '&q11=' + document.getElementById("demon1").innerHTML + '&q12=' + document.getElementById("demon2").innerHTML + '&q8=' + 'xyz';
  locals.query_code = '/tweets/filteror?q1=' + query1 + '&q2=' + query2 + '&q3=' + query3 + '&q4=' + query4 + '&q5=' + 1 + '&q7=' + 1 + '&q9=' + collection_code + '&q10=' + document.getElementById("demon").innerHTML +
    '&q11=' + document.getElementById("demon1").innerHTML + '&q12=' + document.getElementById("demon2").innerHTML + '&q8=' + 'xyz';
  get1(qu, 0);
}

window.onload = function() {
  get1('/tweets/filteror?q1=' + '' + '&q2=' + '' + '&q3=' + '' + '&q4=' + '' + '&q5=' + 0 + '&q7=' + 0 + '&q9=' + collection_code + '&q10=' + document.getElementById("demon").innerHTML + '&q11=' + document
    .getElementById("demon1").innerHTML + '&q12=' + document.getElementById("demon2").innerHTML + '&q8=' + 'xyz', 1);
}
