var express = require('express');
var router = express.Router();
var redis = require('redis');


let client  = redis.createClient();


router.get('/',function(req, res, next){

    client.keys('*', function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let schoolist = {};
            let c=-1
            for(let d=0; d<data.length; d++){
              if(!data[d].includes(":")){
                //console.log(client.hget(data[d],category))
                c++;
                let item = "s"+c;
                schoolist[item] = data[d];
              }
            }
            res.render('privateColleges', schoolist);
            console.log(data);
            console.log(schoolist.schoolist1);
        }
    });
});

module.exports = router;
