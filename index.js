// index.js
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const {fetchISSFlyOverTimes} = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const time of passTimes) {
    let riseTime = time.risetime;
    let dur = time.duration;
    let riseDate = new Date(riseTime * 1000);
    console.log(`Next pass at ${riseDate} for ${dur} seconds!`);
    
  }

};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// const ip = '162.222.82.24';
// fetchCoordsByIP(ip, (err, coord) => {
//   if (err) {
//     console.log("It didn't work!" , err);
//     return;
//   }
    
//   console.log('It worked! Geolocation is' , coord);

// });

// const coord = { latitude: 43.7593, longitude: -79.5224 };
// // const coord = { latitude: 93, longitude: 'bob' };

// fetchISSFlyOverTimes(coord, (err, data) => {
//   if (err) {
//     console.log("It didn't work!" , err);
//     return;
//   } else {
//     console.log('It worked! passing times needs format is' , data);
//   }
// });
