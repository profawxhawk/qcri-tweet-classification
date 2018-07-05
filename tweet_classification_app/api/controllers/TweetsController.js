// my code //


// module.exports = {
//     filteror:function(req,res){
//         function strtodict(text){
//       var dict={};
//       var list=[];
//     for(var i=0;i<text.length;i++){
//         if(text.charAt(i)=='{'){
//             i++;
//             var str='';
//             while(text.charAt(i)!=':'){
//                 str+=text.charAt(i);
//                 i++;
//             }
//         if(text.charAt(i)==':'){
//             i++;
//             if(text.charAt(i)=='\"'){
//             i++;
//             var str1='';
//             while(text.charAt(i)!='\"'){
//                 str1+=text.charAt(i);
//                 i++;
//             }
//             dict[str]=str1;
//             list=list.concat(dict);
//             dict={};
//         }
//         }
//         }
//     }
//     return list;   
// }
// var a=req.param('q1');
// var b=req.param('q2');
// var c=req.param('q3');
// var d=req.param('q4');
// var listy1=strtodict(a);
// var listy2=strtodict(b);
// var listy3=strtodict(c);
// var dict1={};
// var dict2={};
// var dict3={};
// var dict4={};
// var dictimage={}
// var prev=[];
// dict1['$or']=listy1;
// dict2['$or']=listy2;
// dict3['$or']=listy3;
// var listy4=[];
// for(i=0;i<listy1.length;i++){
//         prev.push(listy1[i]['image_damage_class']);
    
// }
// for(i=0;i<listy2.length;i++){
//         prev.push(listy2[i]['aidr_class_label']);
    
// }
// for(i=0;i<listy3.length;i++){
//         prev.push(listy3[i]['sentiment']);
    
// }

// if(dict1['$or'].length!==0){
//     listy4.push(dict1);
// }
// if(dict2['$or'].length!==0){
//     listy4.push(dict2);
// }
// if(dict3['$or'].length!==0){
//     listy4.push(dict3);
// }

// if(d=="yes"){
//     dictimage['$or']=[{"image_physical_location": { $nin: [''] } }];
//     listy4.push(dictimage);
//     prev.push('yes')
// }
// else if(d=="no"){
//     dictimage['$or']=[{"image_physical_location":""}];
//     listy4.push(dictimage);
//     prev.push('no')
// }
// else if(d=="both1"){
//     dictimage['$or']=[{"image_physical_location":""},{"image_physical_location": { $nin: [''] } }];
//     listy4.push(dictimage);
//     prev.push('both1')
// }
// else if(d=="both2"){
//     prev.push('both2')
// }
// dict4['$and']=listy4;
// var model;
// if(req.param('q6')==1){
//     model=Sim;
// }
// else if(req.param('q6')==2){
    
// }
// else if(req.param('q6')==3){
    
// }
//         model.find().where(dict4).sort({"updated_at":-1}).limit(100).exec(function(err,sim){
//             if(err){
//                 res.send(500,{error: 'Database Error'});
//             }
//             if(req.param('q5')==0){
//             res.send({sim:sim});
//         }
//         else if(req.param('q5')==1){
//             res.send({sim:sim});
//         }
//         });

//     // coodeeee ///

//        //  if (req.param('q7')==0){
//        // Sim.find().where(dict4).exec(function(err,sim){
//        //     if(err){
//        //         res.send(500,{error: 'Database Error'});
//        //     }
//        //     if(sim.length!=0){
//        //     Sim.find({},{createdAt:1}).limit(1).sort({createdAt:-1}).exec(function(err,createtime){
//        //     if(err){
//        //         res.send(500,{error: 'Database error'});
//        //     }
//        //     var createtime1 = createtime[0].createdAt;
//        //     sim[0].createtime=createtime1;
//        //     res.send({sim:sim});
//        // });
//        // }
//        // else{
//        //     res.send({sim:sim});
//        // }
           
//        // });}
//        // else if (req.param('q7')==1){
//        //     if(req.param('q8')!=''){
//        //     var createtime3 = new Date(req.param('q8')).toISOString();
//        //     time['$or']=[{"createdAt":{$gt:createtime3}}];
//        //     listy4.push(time);
//        // }
//        //     dict5['$and']=listy4;
//        //     Sim.find().where(dict5).exec(function(err,sim){
//        //     if(err){
//        //         res.send(500,{error: 'Database Error'});
//        //     }
//        //     if(sim.length!=0){
//        //     Sim.find({},{createdAt:1}).limit(1).sort({createdAt:-1}).exec(function(err,createtime){
//        //     if(err){
//        //         res.send(500,{error: 'Database error'});
//        //     }
//        //     var createtime2 = createtime[0].createdAt;
//        //     sim[0].createtime=createtime2;
//        //     console.log(sim.length);
//        //     res.send({sim:sim});
//        // });
//        // }
//        // else{
//        //     res.send({sim:sim});
//        // }
//        // });
//        // }

//        // end of code ///
        
//     },
//     mainf:function(req,res){
//         if(req.param('q1')==1){
//             var respose=[];
//             Sim.native(function(err,coll){
//             coll.distinct("image_damage_class", function(err,result){
//                     respose.push(Number(req.param('q1')));
//                     respose.push(result.length);
//                  for(var i=0;i<result.length;i++){
//                     if(result[i]==''){
//                         respose.push('null');
//                     }
//                     else{
                        
//                     respose.push(result[i]);
//                  }
//                  }
//                  coll.distinct("aidr_class_label", function(err,result1){
//                  respose.push(result1.length);
//                  for(var i=0;i<result1.length;i++){
//                     if(result1[i]==''){
//                         respose.push('null');
//                     }
//                     else{
//                     respose.push(result1[i]);
//                  }
//                  }
//                  coll.distinct("sentiment", function(err,result2){
//                  respose.push(result2.length);
//                  for(var i=0;i<result2.length;i++){
//                     if(result2[i]==''){
//                         respose.push('null');
//                     }
//                     else{
//                     respose.push(result2[i]);
//                  }
//                  }
//                  coll.distinct("image_physical_location", function(err,result3){
//                     respose.push(2);
//                 respose.push('no');
//                 respose.push('yes');
//                res.view('map',{respose:respose});
//             });
//             });
//             });
//             });

//         });
            
//         }
//     },


//         list: function(req,res){

//             const aggregateArray = [
//       { $match: { "code":"170826213907_hurricane_harvey_2017"}  } ,
//     {$group:{"_id": {"longitude": "$longitude", "latitude": "$latitude", "image_damage_class": "$image_damage_class", "image_physical_location":"$image_physical_location", "tweet_text": "$tweet_text", "sentiment": "$sentiment", "aidr_class_label": "$aidr_class_label"}}},
//     { $sample: { size: 1 } },
//     {$limit:1}
// ];


// Tweets.native(function(err, prodCollection) {
//   if (err) {
//     "there is an error";
//   } else {
//     prodCollection
//       .aggregate(aggregateArray)
//       .toArray((err, results) => {
//         if (err) {
//           "there is an error";
//         }

//         var str = JSON.stringify(results[0]);
//         str= str.slice(8,-2);

    
//         var array = str.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/g);

// // console.log("latitude-->" + array[0].slice(12, -1));
// // console.log("longitude-->" + array[1].slice(11, -1));
//         console.log("image_damage_class-->" + array[2].slice(22, -1));
//         console.log("image_physical_location-->" + array[3].slice(27, -1));
//         console.log("tweet_text-->" + array[4].slice(14, -1));
//         console.log("sentiment-->" + array[5].slice(13, -1));
//         console.log("aidr_class_label-->" + array[6].slice(20, -1));


//         // sails.config.myconf.lat=array[0].slice(12, -1);
//         // sails.config.myconf.long=array[1].slice(11, -1);
//         sails.config.myconf.damage=array[2].slice(22, -1);
//         sails.config.myconf.location=array[3].slice(27, -1);
//         sails.config.myconf.tweet=array[4].slice(14, -1);
//         sails.config.myconf.senti=array[5].slice(13, -1);
//         sails.config.myconf.classlabel=array[6].slice(20, -1);
       
//        return str;
//       });
//   }
// });
//     }

    

// };

module.exports = {
  findcoll:function(req,res){
    
          
       Tweets.native(function(err1,coll){
        if(err1){
              res.send(500,{error: 'Database error'});
        }
        else{
        coll.distinct("code", function(err2,resu){
           if(err2){
                res.send(500,{error: 'Database error'});
            }
          else{
                console.log(resu);
                res.send({resu:resu});

          }
        });
      }
      });

       

  },
  filteror:function(req,res){
    function strtodict(text){
      var dict={};
      var list=[];
  for(var i=0;i<text.length;i++){
      if(text.charAt(i)=='{'){
          i++;
          var str='';
          while(text.charAt(i)!=':'){
              str+=text.charAt(i);
                i++;
            }
      if(text.charAt(i)==':'){
          i++;
            if(text.charAt(i)=='\"'){
            i++;
            var str1='';
            while(text.charAt(i)!='\"'){
              str1+=text.charAt(i);
                i++;
            }
            dict[str]=str1;
            list=list.concat(dict);
            dict={};
        }
        }
        }
    }
    return list;   
}
var a=req.param('q1');
var b=req.param('q2');
var c=req.param('q3');
var d=req.param('q4');
var listy1=strtodict(a);
var listy2=strtodict(b);
var listy3=strtodict(c);
var dict1={};
var dict2={};
var dict3={};
var dict4={};
var dict5={};
var dictimage={};
var time={}
var prev=[];
dict1['$or']=listy1;
dict2['$or']=listy2;
dict3['$or']=listy3;
var listy4=[];
if(dict1['$or'].length!==0){
  listy4.push(dict1);
}
if(dict2['$or'].length!==0){
  listy4.push(dict2);
}
if(dict3['$or'].length!==0){
  listy4.push(dict3);
}

if(d=="yes"){
  dictimage['$or']=[{"image_physical_location": { $nin: [''] } }];
  listy4.push(dictimage);
  prev.push('yes')
}
else if(d=="no"){
  dictimage['$or']=[{"image_physical_location":""}];
  listy4.push(dictimage);
  prev.push('no')
}
else if(d=="both1"){
  dictimage['$or']=[{"image_physical_location":""},{"image_physical_location": { $nin: [''] } }];
  listy4.push(dictimage);
  prev.push('both1')
}
else if(d=="both2"){
  prev.push('both2')
}
dictimage1={};
dictimage1['$or']=[{"code":req.param('q9')}];
listy4.push(dictimage1);
t={};
t1={};
t2={};
console.log(req.param('q10'))
if(req.param('q10')!=0){
 var k1 = parseFloat(req.param('q10'));
 t['$or']=[{"image_damage_class_conf":{$gt:(k1-0.1),$lt : (k1+0.1)}}];
 listy4.push(t);
 console.log(k1)
 console.log('k1')
}
if(req.param('q11')!=0){
 var k2 = parseFloat(req.param('q11'));
 t1['$or']=[{"aidr_class_label_conf":{$gt:(k2-0.1),$lt : (k2+0.1)}}];
 listy4.push(t1);
}
if(req.param('q12')!=0){
 var k3 = parseFloat(req.param('q12'));
 t2['$or']=[{"sentiment_conf":{$gt:(k3-0.1),$lt : (k3+0.1)}}];
 listy4.push(t2);
}
dict4['$and']=listy4;
    if (req.param('q7')==0){
        Sim.find().where(dict4).exec(function(err,sim){
             console.log(sim.length)
            if(err){
                res.send(500,{error: 'Database Error'});
            }
            if(sim.length!=0){
            Sim.find({},{createdAt:1}).limit(1).sort({createdAt:-1}).exec(function(err,createtime){
            if(err){
                res.send(500,{error: 'Database error'});
            }
            var createtime1 = createtime[0].createdAt;
            sim[0].createtime=createtime1;
            res.send({sim:sim});
        });
        }
        else{
            res.send({sim:sim});
        }
            
        });}
        else if (req.param('q7')==1){
            if(req.param('q8')!=''&&req.param('q8')!='xyz'){
            var createtime3 = new Date(req.param('q8')).toISOString();
            time['$or']=[{"createdAt":{$gt:createtime3}}];
            listy4.push(time);
        }
        console.log(listy4)
            dict5['$and']=listy4;
            Sim.find().where(dict5).exec(function(err,sim){
            if(err){
                res.send(500,{error: 'Database Error'});
            }
            if(sim.length!=0){
            Sim.find({},{createdAt:1}).limit(1).sort({createdAt:-1}).exec(function(err,createtime){
            if(err){
                res.send(500,{error: 'Database error'});
            }
            var createtime2 = createtime[0].createdAt;
            sim[0].createtime=createtime2;
            console.log(sim.length);
            res.send({sim:sim});
        });
        }
        else{
            res.send({sim:sim});
        }
        });
        }
        },


      
    mainf:function(req,res){
           sails.config.myconf.collectioncode=req.param('code');
           //sails.config.myconf.image="/queenslandkey.png";
            var respose=[];
             console.log(req.param('code'));
             respose.push((req.param('code')));
            Sim.native(function(err,coll){
            coll.distinct("image_damage_class",{"code" :req.param('code') },function(err,result){
                    respose.push(result.length);
                 for(var i=0;i<result.length;i++){
                    if(result[i]==''){
                        respose.push('null');
                        sails.config.myconf.displayseverity=" ";
                    }
                    else{
                        
                    respose.push(result[i]);
                    sails.config.myconf.displayseverity="Severity: ";
                 }
                 }
                 coll.distinct("aidr_class_label",{"code" :req.param('code') }, function(err,result1){
                 respose.push(result1.length);
                 for(var i=0;i<result1.length;i++){
                    if(result1[i]==''){
                        respose.push('null');
                        sails.config.myconf.displayaidr=" ";
                    }
                    else{
                    respose.push(result1[i]);
                    sails.config.myconf.displayaidr="Humanitarian Category: ";
                 }
                 }
                 coll.distinct("sentiment",{"code" :req.param('code') }, function(err,result2){
                 respose.push(result2.length);
                 for(var i=0;i<result2.length;i++){
                    if(result2[i]==''){
                        respose.push('null');
                        sails.config.myconf.displaysentiment=" ";
                    }
                    else{
                    respose.push(result2[i]);
                    sails.config.myconf.displaysentiment="Sentiment: ";
                 }
                 }
                  coll.distinct("image_physical_location",{"code" :req.param('code') }, function(err,result3){
                  console.log('j');
                 if(result3.length==0){
                  respose.push(0);
                  respose.push(result.length+result1.length+result2.length);
                 }
                else{
                respose.push(2);
                respose.push('no');
                respose.push('yes');
                respose.push(result.length+result1.length+result2.length+2);
              }
                 
                console.log(respose)
               res.view('map',{respose:respose});
            });
            });
            });
            });

        });
            
        
 
    
  },

  // map:function(req,res){
  //   var prev=[];
  //   Sim.find({}).exec(function(err,sim){
  //     if(err){
  //       res.send(500,{error: 'Database Error'});
  //     }

  //   res.view('map', {sim:sim,prev:prev});
  // });
  // },

 list: function(req,res){

            const aggregateArray = [
      { $match: { "code":sails.config.myconf.collectioncode}  } ,
    {$group:{"_id": {"tweet_text": "$tweet_text", "latitude": "$latitude", "longitude": "$longitude"}}},
    { $sample: { size: 1 } },
    {$limit:1}
];


Tweets.native(function(err, prodCollection) {
  if (err) {
    "there is an error";
  } else {
    prodCollection
      .aggregate(aggregateArray)
      .toArray((err, results) => {
        if (err) {
          "there is an error";
        }

        var str = JSON.stringify(results[0]);
        str= str.slice(8,-2);

        // var str2 = JSON.stringify(results[1]);
        // str2= str.slice(8,-2);
        // console.log("latitude lloks like: " + str2);

    
        var array = str.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/g);


        // console.log("image_damage_class-->" + array[2].slice(22, -1));
        // console.log("image_physical_location-->" + array[3].slice(27, -1));
        console.log("tweet_text-->" + array[0].slice(14, -1));
        console.log("latitude--> "+ array[1].slice(11)); // actually longitude
        console.log("longitude--> "+ array[2].slice(12)); // actually latitude
        // console.log("sentiment-->" + array[5].slice(13, -1));
        // console.log("aidr_class_label-->" + array[6].slice(20, -1));

        // sails.config.myconf.damage=array[2].slice(22, -1);
        // sails.config.myconf.location=array[3].slice(27, -1);
        sails.config.myconf.tweet=array[0].slice(14, -1);
        sails.config.myconf.long=array[2].slice(12);
        sails.config.myconf.lat=array[1].slice(11);
        // sails.config.myconf.senti=array[5].slice(13, -1);
        // sails.config.myconf.classlabel=array[6].slice(20, -1);
       
       return str;
      });
  }
});
}
    

};


