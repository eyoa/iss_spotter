/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = `https://api.ipify.org?format=json`;
  request(url, (err, response, body) => {
    if (err) {
      callback(err);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });

};

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (err, response, body) => {
    if (err) {
      callback(err);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when loking for geolocation. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const locObj = JSON.parse(body);
    const {latitude, longitude} = locObj;
    const geoLoc = {latitude, longitude};
    
    callback(null, geoLoc);

  });

};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const lat = coords.latitude;
  const lon = coords.longitude;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`;
  request(url, (err, response, body) => {
    if (err) {
      callback(err);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Error with getting iss flyover times. response ${body}`;
      callback(Error(msg));

    }
    const data = JSON.parse(body).response;
    callback(null, data);

  });
};


// iss.js

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      callback(err);
      return;
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        callback(err);
        return;
      }
      fetchISSFlyOverTimes(coords, (err, data) =>{
        if (err) {
          callback(err);
          return;
        }

        callback(null, data);
      });
    });
  });
};

module.exports = {nextISSTimesForMyLocation};