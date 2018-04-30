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

            for(let d=0; d<data.length; d++){
                let item = "s"+d;
                schoolist[item] = data[d];
            }
            res.render('privateColleges', schoolist);
            console.log(data);
            console.log(schoolist.schoolist1);
        }
    });
});

module.exports = router;
