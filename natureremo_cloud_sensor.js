const exec = require("child_process").exec;
let   url  = `"https://api.nature.global/1/devices"`;

class NatureRemoSensor {
  constructor (access_token, {te = true, hu = true, li = true, mo = true}, callback) {
    let   cmd  = `curl -X GET ${url} -H "accept":"application/json" -k --header "Authorization":"Bearer ${access_token}"`;
    exec (cmd, function (error, stdout, stderr) {
      let json          = JSON.parse(stdout);
      let te_val = te ? json[0].newest_events.te.val : null;
      let hu_val = hu ? json[0].newest_events.hu.val : null;
      let li_val = li ? json[0].newest_events.il.val : null;
      let mo_val = mo ? json[0].newest_events.mo.val : null;

  	  callback (error, JSON.stringify({ te: te_val, hu: hu_val, il: li_val, mo: mo_val}), stderr)
    })
  }
}

if (require.main === module) {
  new NatureRemoSensor (process.argv[2], process.argv[3], function(error, value, stderr){
    console.log (value);
    console.log (error);
    console.log (stderr);
  });
}
else {
  module.exports = NatureRemoSensor;
}
