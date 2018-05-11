const redis = require('redis');
const express = require('express');
const router = express.Router();


let client  = redis.createClient();

//Redis Client
client.on('connect',function(){
    console.log("Connected to redis... on users route");
});

/* GET users listing. */


router.get('/addcollege',function (req, res, next){
    res.render('addcollege');
});

router.get('/addFavoriteCollege',function (req, res, next){
    res.render('addFavoriteCollege');
});

router.get('/addToDatabase',function (req, res, next){
    res.render('addToDatabase');
});

router.get('/addCourse',function (req, res, next){
    res.render('addCourse');
});

router.post('/addCourse', function(req, res, next){

    let college = req.body.college;
    let course = req.body.course;
    let key = college+":"+course;
    client.hmset(key,
     [
        'college', college,
        'course', course
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

router.get('/goto/:id',function (req, res){
    let id = req.params.id;
    client.keys(id+':*',function(err,data){
        if(err){
            console.log(id);
            res.render('index',{
                error: 'event does not exist',
                title: 'NO!'
            });
        }
        else{
            console.log(req.params.id);
            let courselist = {};

            for(let d=0; d<data.length; d++){
                let item = "c"+d;
                courselist[item] = data[d];
            }

            res.render('coursesAtCollege', courselist);

        }
    })
});

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
            res.render('myFavoriteCollege', schoolist);
            console.log(data);
            console.log(schoolist.schoolist1);
        }
    });
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
