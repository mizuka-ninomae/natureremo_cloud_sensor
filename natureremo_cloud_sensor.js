const exec = require ("child_process").exec;
let   url  = `"https://api.nature.global/1/devices"`;
let   num  = null;
let   te_val, hu_val, li_val, mo_val;

class NatureRemoSensor {
  constructor (access_token, dev_name, callback) {
    let cmd = `curl -X GET ${url} -H "accept":"application/json" -k --header "Authorization":"Bearer ${access_token}"`;
    exec (cmd, function (error, stdout, stderr) {
      let obj   = JSON.parse (stdout);
      if (dev_name == null) {
        num = 0;
      }
      else {
        for (let i in obj) {
          if (dev_name == obj[i].name) {
            num = i;
            break;
          }
        }
      }
      if (num == null) {
        throw new Error('Device Name not found')
      }
      else {
        if (obj[num].firmware_version.startsWith("Remo-mini")) {
          te_val = obj[num].newest_events.te.val;
          hu_val = null;
          li_val = null;
          mo_val = null;
        }
        else {
          te_val = obj[num].newest_events.te.val;
          hu_val = obj[num].newest_events.hu.val;
          li_val = obj[num].newest_events.il.val;
          mo_val = obj[num].newest_events.mo.val;
        }
        let value = {te: te_val, hu: hu_val, li: li_val, mo: mo_val};
        callback (error, value, stderr)
        return;
      }
    })
  }
}

if (require.main === module) {
  new NatureRemoSensor (process.argv[2], process.argv[3], function(error, value, stderr) {
    console.log (value);
    console.log (error);
    console.log (stderr);
  });
}
else {
  module.exports = NatureRemoSensor;
}
