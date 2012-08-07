var Engine = require('ql.io-engine');
var engine = new Engine({
    tables : __dirname + '/../tables',
    config: __dirname + '/../config/dev.json'
});

var script = "create table geocoder " +
             "  on select get from 'http://maps.googleapis.com/maps/api/geocode/json?address={address}&sensor=true' " +
             "     resultset 'results.geometry.location'" +
             "select lat as lattitude, lng as longitude from geocoder where address='Mt. Everest'";

engine.execute(script, function(emitter){
   emitter.on("end", function(err, res){
       console.log(err);
       console.log(res);
   });
});
