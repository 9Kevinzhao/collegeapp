const redis = require('redis');
const express = require('express');
const router = express.Router();


let client  = redis.createClient();

//Redis Client
client.on('connect',function(){
    console.log("Connected to redis... on users route");
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('myFavoriteCollege');
});
router.get('/addcollege',function (req, res, next){
    res.render('addcollege');
});
router.post('/addcollege', function(req, res, next){

    let category = req.body.category;
    let collegeName = req.body.name;
    client.hmset(collegeName,
     [
        'category', category,
        'collegeName', collegeName
    ],function(err,reply){
        if(err){
            console.log(err);
        }
        else{
            console.log(reply);
            res.redirect('/');
        }
    }
    );
});


router.post('/search/',function (req, res, next){
  let id=req.body.name;
  client.hgetall(id,function(err,obj){
    if(!obj){
      res.render('index',{
        error: 'event does not exist',
      });
    }
    else{
      console.log(obj);
      res.render('display',{
          college:obj
      })
    }
  })
});



module.exports = router;
