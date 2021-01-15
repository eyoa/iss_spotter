const {nextISSTimesForMyLocation} = require('./iss_promised');

const printPassTimes = function(passTimes) {
  for (const time of passTimes) {
    let riseTime = time.risetime;
    let dur = time.duration;
    let riseDate = new Date(riseTime * 1000);
    console.log(`Next pass at ${riseDate} for ${dur} seconds!`);
  }
};


nextISSTimesForMyLocation()
  .then((data) => {
    printPassTimes(data);
  })
  .catch(error => {
    console.log("It didn't work!", error.message);
  });