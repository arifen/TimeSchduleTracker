/**
 * Created by arifen on 3/10/17.
 */
 var express = require('express');
 var router = express.Router();

 var monk = require('monk');
 var db = monk('localhost:27017/timeTracker');

 router.get('/',function(req,res){
    var Collection = db.get('timeevent');
    Collection.find({},function(err,timeevent){
        if(err) throw  err;
        res.json(timeevent);
    });
 });
router.post('/', function(req, res){
    var collection = db.get('timeevent');
    collection.insert({
        userid: '1234',
        event: req.body.event,
        date:new Date(),
    }, function(err, timeevent){
        if (err) throw err;

        res.json(timeevent);
    });
});

router.get('/:id',function(req, res){
    var collection = db.get('timeevent');
    collection.findOne({_id:req.params.id},function(err, timeevent){
        if(err) throw err;
        res.json(timeevent);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('timeevent');
    collection.remove({ _id: req.params.id }, function(err, timeevent){
        if (err) throw err;

        res.json(timeevent);
    });
});
router.put('/:id',function(req,res){
    var collection = db.get('timeevent');
    collection.update(
                    {_id: req.params.id},
                    {
                        $set: {event: req.body.event,
                            date:new Date()}
                    },
                    function(err,timeevent){
                        if(err) throw err;
                        res.json(timeevent)
                    });
});
module.exports = router;
