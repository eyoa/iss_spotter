// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request(`https://api.ipify.org?format=json`);

};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(geoJSON) {
  const coords = JSON.parse(geoJSON);
  const lat = coords.latitude;
  const lon = coords.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(result => {
      const data = JSON.parse(result).response;
      return data;
    });

};

module.exports = {nextISSTimesForMyLocation};