const exec = require ("child_process").exec;
let   url  = `"https://api.nature.global/1/devices"`;

class NatureRemoSensor {
  constructor (access_token, callback) {
    let cmd = `curl -X GET ${url} -H "accept":"application/json" -k --header "Authorization":"Bearer ${access_token}"`;
    exec (cmd, function (error, stdout, stderr) {
      let json   = JSON.parse (stdout);
      let te_val = json[0].newest_events.te.val;
      let hu_val = json[0].newest_events.hu.val;
      let li_val = json[0].newest_events.il.val;
      let mo_val = json[0].newest_events.mo.val;

  	  callback (error, JSON.stringify({te: te_val, hu: hu_val, il: li_val, mo: mo_val}), stderr)
    })
  }
}

if (require.main === module) {
  new NatureRemoSensor (process.argv[2], function(error, value, stderr){
    console.log (value);
    console.log (error);
    console.log (stderr);
  });
}
else {
  module.exports = NatureRemoSensor;
}
