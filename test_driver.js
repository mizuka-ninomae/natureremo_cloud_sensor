const NatureRemoSensor = require('natureremo_sensor_cloud');
let   access_token     = "gagLNUEyEgNKPgvsyr0PvZ3vZLGgmhsiSzZprnjrHPY.6YA1fdN5oVsNPMETkQNsnjx5yTHc0yj9h2148T5sdIk";

let remo_sensor = new NatureRemoSensor(access_token, {mo: false}, function (error, value, stderr) {
  console.log (value);
  console.log (error);
  console.log (stderr);
});
