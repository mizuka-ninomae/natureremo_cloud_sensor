const Request = require ("request");
let   num     = null;
let   te_val, hu_val, li_val, mo_val;

class NatureRemoSensor {
  constructor (access_token, dev_name, callback) {
    const options = {
      url: `https://api.nature.global/1/devices`,
      method: `GET`,
      headers: {
        Accept: `application/json`,
        Authorization: `Bearer ${access_token}`
      }
    }

    Request (options, function (error, response, body) {
      let obj   = JSON.parse (body);
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
        if (obj[num].firmware_version.startsWith ("Remo-mini")) {
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
        callback (error, value, response)
        return;
      }
    })
  }
}

if (require.main === module) {
  new NatureRemoSensor (process.argv[2], process.argv[3], function (error, value, response) {
    console.log (error);
//    console.log (response);
    console.log (value);
  });
}
else {
  module.exports = NatureRemoSensor;
}
