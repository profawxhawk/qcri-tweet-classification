// my code 

var TweetsController = require('./TweetsController');

// module.exports = {


// 	add:function(req,res){

// 		var sample_long;
// 		var sample_lat;
// 		var aidr_class_label;
// 		var sentiment;
// 		var image_damage_class;
// 		var url;
// 		var tweet_text;
// 		// var collection_code;
// 		// var twitterdata =[];
// 		function timer() 
// 		{
// 	      return nIntervId1 = setInterval(generate, 500);
// 	    }

// 	    function getRandomIntInclusive(min, max) {

//   return (Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
// }

// 			// LATITUDE -90 to +90
// 			// LONGITUDE -180 to + 180
// 		function generate() {

// 	    	sample_long = getRandomIntInclusive(-180, 180);
// 	    	sample_lat = getRandomIntInclusive(-90, 90);

// 	    	var image_damage_class1 = ['','None','Mild','Severe'];
// 	    	var sentiment1 = ['Neutral','Positive','Negative'];
// 	    	var aidr_class_label1 = ['affected_individual','infrastructure_and_utilities_damage','sympathy_and_support','caution_and_advice','donation_and_volunteering','relevant_information','injured_or_dead_people','personal','not_related_or_irrelevant']

// 	    	function randomGenerate(myArray){
// 	    		var rand = myArray[Math.floor(Math.random() * myArray.length)];
// 	    		return rand;
// 	    	};

// console.log("sommeee ..." + TweetsController.string);
// console.log("printing ..." + TweetsController.list());
// // console.log("latitude looks like this  " + sails.config.myconf.lat);
// // console.log("longitude looks like this  " + sails.config.myconf.long);
// // console.log("longitiude" + sample_long);
// // console.log("latitude" + sample_lat);
//  console.log("tweet text looks like this  " + sails.config.myconf.tweet);
//   // console.log("class label looks like this  " + sails.config.myconf.classlabel);
//   // console.log("sentiment looks like this  " + sails.config.myconf.senti);
//   // console.log("image damage looks like this  " + sails.config.myconf.damage);
//   // console.log("url looks like this  " + sails.config.myconf.location);



// 	    	function makeid() {
// 				var text = "";
// 				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// 				for (var i = 0; i < 50; i++){
// 				  text += possible.charAt(Math.floor(Math.random() * possible.length));
// 				}

// 				return text;
// 				};


// 	    	image_damage_class = randomGenerate(image_damage_class1);
// 	    	sentiment = randomGenerate(sentiment1);
// 	    	aidr_class_label = randomGenerate(aidr_class_label1);
// 	    	url='';
// 	    	// tweet_text = makeid() + " https:/google.com";

// 	    		// sample_long = sails.config.myconf.long + 0;
// 	    		// sample_lat = sails.config.myconf.lat + 0;
// 	    	tweet_text = sails.config.myconf.tweet + " ";
// 	    	console.log("tweet text for database: " + tweet_text);
// 			// aidr_class_label = sails.config.myconf.classlabel+  " ";
// 			// console.log("aidr class label for database: " + aidr_class_label);
// 			// sentiment = sails.config.myconf.senti+  " ";
// 			// console.log("sentiment for database: " + sentiment);
// 			//  image_damage_class = sails.config.myconf.damage+  " ";
// 			//  console.log("image damage class for database: " + image_damage_class);
// 			// url = sails.config.myconf.location+  " ";
// 			// console.log("url for database: " + url);




// 	    	Sim.create({longitude:sample_long , latitude:sample_lat , image_damage_class:image_damage_class,sentiment:sentiment,aidr_class_label:aidr_class_label,tweet_text:tweet_text,image_physical_location:url }).exec(function(err){
// 				if(err){
// 				res.send(500, {error : 'Database error'});
// 				}
// 				sails.log.info("Insertion complete");
// 			});

			
// 		}
		
// 	var timer = timer();
// 	}
	
// };



module.exports = {
	add:function(req,res){

		var sample_long;
		var sample_lat;
		var aidr_class_label;
		var sentiment;
		var image_damage_class;
		var url;
		var tweet_text;
		var twitterdata =[];
		function timer() 
		{
	      return nIntervId1 = setInterval(generate, 500);
	    }

function getRandom(min, max) {

  return (Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

			
		function generate() {
	    	//sample_long = getRandom(-180, 180);
	    	//sample_lat = getRandom(-90, 90);

	    	if (sails.config.myconf.collectioncode == "3345134690_Queensland_flood_2013"){
           var image_damage_class1 = ['Minor','Moderate','Major'];
          // var image_damage_class1 =[''];
            var aidr_class_label1 = ['infrastructure_damage','loss_of_livestock','waterborne_diseases','injured_people','dead_people','crop_destruction']
            // var aidr_class_label1 =[''];
            var sentiment1 = [''];
            // var sentiment1 = ['Neutral', 'Positive'];
            var url1=['','','','','','','https://i.redd.it/f3677ffd3qk01.jpg', "http://www.abc.net.au/news/image/8399856-3x2-940x627.jpg", "https://bethheadland.files.wordpress.com/2013/05/url.jpeg", "", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz4mBDHVyK5gtye2dgaNYoc4s47XqCW5WsH0H9T-N2yab388c1DQ"]

           }
	    	else if (sails.config.myconf.collectioncode == "170826213907_hurricane_harvey_2017"){
        var image_damage_class1 = ['','None','Mild','Severe'];
           var sentiment1 = ['Neutral','Positive','Negative'];
           var aidr_class_label1 = ['affected_individual','infrastructure_and_utilities_damage','sympathy_and_support','caution_and_advice','donation_and_volunteering','relevant_information','injured_or_dead_people','personal','not_related_or_irrelevant']
        var url1=['','','','','','','http://scdev5.qcri.org/aidr/data_image/harvey/4_9_2017/904654095239098368_0.jpg', "http://scdev5.qcri.org/aidr/data_image/harvey/5_9_2017/904934121268539392_0.jpg", "http://scdev5.qcri.org/aidr/data_image/harvey/6_9_2017/905231720395415552_0.jpg", "http://scdev5.qcri.org/aidr/data_image/harvey/4_9_2017/904572757907611648_0.jpg", "http://scdev5.qcri.org/aidr/data_image/harvey/16_9_2017/908874352141012993_0.jpg"]
            
}

			// var latlong= sails.config.myconf.array;
			// console.log("length of whole thing" +  sails.config.myconf.array.length);
			// var rand = getRandomIntInclusive(0, sails.config.myconf.array.length -1);
	    	// console.log("lat long array:" + sails.config.myconf.array[rand]["lat"] + sails.config.myconf.array[rand]["long"]);


	    	function randomGenerate(myArray){
	    		var rand = myArray[Math.floor(Math.random() * myArray.length)];
	    		return rand;
	    	};
//console.log("sommeee ..." + TweetsController.string);
console.log("printing ..." + TweetsController.list());
 //console.log("tweet text looks like this  " + sails.config.myconf.tweet);



	     	function makeid() {
				 var text = "";
				 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				 for (var i = 0; i < 50; i++)
				   text += possible.charAt(Math.floor(Math.random() * possible.length));

				 return text;
				 };
		    k1=(Math.random() * (1.0 - 0.0) + 0.0);
            k2=(Math.random() * (1.0 - 0.0) + 0.0);
            k3=(Math.random() * (1.0 - 0.0) + 0.0);
	    	image_damage_class = randomGenerate(image_damage_class1);
	    	sentiment = randomGenerate(sentiment1);
	    	aidr_class_label = randomGenerate(aidr_class_label1);
	    	tweet_text = sails.config.myconf.tweet+ '';
	    	sample_long = sails.config.myconf.long + '';
	    	sample_lat = sails.config.myconf.lat + '';
            console.log();
	    	code = sails.config.myconf.collectioncode;
	    	url = randomGenerate(url1);

	    	Sim.create({longitude:sample_long , latitude:sample_lat , image_damage_class:image_damage_class,sentiment:sentiment,aidr_class_label:aidr_class_label,tweet_text:tweet_text,image_physical_location:url,code:code,image_damage_class_conf:k1,aidr_class_label_conf:k2,sentiment_conf:k3 }).exec(function(err){
				if(err){
				res.send(500, {error : 'Database error'});
				}
				sails.log.info("Insertion complete");
			});

			
		}
		
	var timer = timer();
	}
	
};

