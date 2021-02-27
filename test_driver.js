const NatureRemoSensor = require('natureremo_cloud_sensor');
let   access_token     = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

let remo_sensor = new NatureRemoSensor(access_token, {mo: false}, function (error, value, stderr) {
  console.log (value);
  console.log (error);
  console.log (stderr);
});
