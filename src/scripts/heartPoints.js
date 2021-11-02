let getHeartPoints = (currData) => {
  // Algorithm -> average steps of previous 10 days
  // calculate total growth and give rewards on a scale of 0-25%
  let d = new Date();
  let prevDate = new Date(d.getTime() - 24 * 10 * 60 * 60 * 1000);
  let prevDay = prevDate.getDate();
  let prevMonth = prevDate.getMonth();
  let prevYear = prevDate.getFullYear();

  // (`${prevDay}/${prevMonth + 1}/${prevYear - 100}`)
  let totalSteps = 0;
  for (let j = 0; j < stepsDB.length - 1; j++) {
    for (let i = 0; i < 10; i++) {
      if (`${prevMonth + 1}/${prevDay + i}/${prevYear}` === stepsDB[j].date) {
        totalSteps += stepsDB[j].steps;
        // console.log(`${prevMonth + 1}/${prevDay + i}/${prevYear}`);
      }
    }
  }

  // totalSteps += 5000;
  let avgSteps = totalSteps / 10;
  let diffRatio = ((currData[0].steps - avgSteps) / avgSteps) * 100;
  if (diffRatio < 0) {
    diffRatio = -0.1;
  } else if (((currData[0].steps / 10000) * 100) + diffRatio > 100) {
    if (diffRatio > 0.75) {
      diffRatio = 0.2;
    }
  }
  let heartPoints = (currData[0].steps / 10000 + diffRatio) * 100;
  // console.log(currData, diffRatio, heartPoints)


  
  return parseInt(((currData[0].steps / 10000) * 100) + 10);
};
