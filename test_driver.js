const NatureRemoSensor = require('natureremo_cloud_sensor');
let   access_token     = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

let remo_sensor = new NatureRemoSensor(access_token, function (error, value, stderr) {
  console.log (value);
  console.log (error);
  console.log (stderr);
});
