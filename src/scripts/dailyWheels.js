let weekData = [];

const dailySVG = d3
  .select("#daily>.visuals-sec>.charts")
  .append("svg")
  .attr("height", 100)
  .attr("width", 550)
  .attr("transform", `translate(0,${-25})`)
  .attr("id", "dailySVG");

let stepsDailyWheels = d3.select("#dailySVG").append("g");
let pointsDailyWheels = d3.select("#dailySVG").append("g");
const defaultDailyWheels = d3.select("#dailySVG").append("g");

const pieStepsSmall = d3
  .pie()
  .sort(null)
  .value((d) => d.steps);

const piePointsSmall = d3
  .pie()
  .sort(null)
  .value((d) => d.points);

const arcPathInnerSmall = d3
  .arc()
  .outerRadius(25)
  .innerRadius(20)
  .cornerRadius(20);

const arcPathOuterSmall = d3
  .arc()
  .outerRadius(35)
  .innerRadius(30)
  .cornerRadius(20);

let getWeeklyStats = (data) => {
  let days = ["S", "M", "T", "W", "T", "F", "S"];
  let d = new Date();
  //   let month = d.getMonth() + 1;
  //   let date =
  //     Math.floor(d.getDate() / 10) == 0 ? "0" + d.getDate() : d.getDate();
  //   let year = d.getFullYear();
  //   let day = d.getDay();

  let oneDayInMilli = 24 * 60 * 60 * 1000;

  //   let weekData = [];

  for (let i = 6; i >= 0; i--) {
    let cd = new Date(d.getTime() - oneDayInMilli * i);
    let currDate = `${cd.getMonth() + 1}/${
      Math.floor(cd.getDate() / 10) == 0 ? "0" + cd.getDate() : cd.getDate()
    }/${cd.getFullYear()}`;
    let found = true;
    data.forEach((item) => {
      if (item.date === currDate) {
        weekData.push([
          {
            day: days[cd.getDay()],
            date: item.date,
            steps: item.steps,
            duration: item.duration,
          },
          {
            day: days[cd.getDay()],
            date: "goal",
            steps:
              goalsDB[0].steps - item.steps < 0
                ? 0
                : goalsDB[0].steps - item.steps,
            duration: item.duration,
          },
        ]);
        
        found = false;
        return;
      }
    });
    if (found) {
      weekData.push([
        {
          day: days[cd.getDay()],
          date: currDate,
          steps: 500,
          duration: 0,
        },
        {
          day: days[cd.getDay()],
          date: "goal",
          steps: 9500,
          duration: 0,
        },
      ]);
    }
  }
};

let buildDefaultDailyWheels = () => {
  const paths = defaultDailyWheels
    .selectAll("path")

    .data(pieStepsSmall([{ steps: 10000 }]));

  //   paths.exit().transition().duration(700).attrTween("d", arcTweenExit).remove();
  let cx = 35;
  for (let c = 1; c <= 7; c++) {
    paths
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", (d) => arcPathInnerSmall(d))
      .attr("fill", "#00004d")
      .attr("transform", `translate(${cx},${35})`)
      .attr("opacity", "0.2");

    paths
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", (d) => arcPathOuterSmall(d))
      .attr("fill", "#00b359")
      .attr("transform", `translate(${cx},${35})`)
      .attr("opacity", "0.3");

    cx += 80;
  }
};

let buildDailyStepsWheels = (data) => {
  // weekData.forEach
  let cx = 35;
  for (let i = 0; i < weekData.length; i++) {
    stepsDailyWheels = d3
      .select("#dailySVG")
      .append("g")
      .attr("transform", `translate(${cx},${35})`);
    let paths = stepsDailyWheels
      .selectAll("path")
      .data(pieStepsSmall(weekData[i]));

    cx += 80;
    paths
      .enter()
      .append("path")

      .attr("class", "arc")
      .attr("d", (d) => arcPathInnerSmall(d)) // transitioning from 0 to end
      .attr("fill", (d) => {
        if (d.data.date === "goal") {
          return "#FF";
        }
        return "#00005a";
      })
      .attr("z-index", "1000")
      .attr("opacity", (d) => {
        if (d.data.date === "goal") {
          return "0";
        }
        return "1";
      })
      .transition()
      .duration(1000)
      .attrTween("d", (d) => arcTweenEnterInnerSmall(d));
  }
};

let buildDailyPointsWheels = (data) => {
//   console.log(weekData);
  // weekData.forEach
  let cx = 35;
  let count = 0;
  for (let i = 0; i < weekData.length; i++) {
    let currData = weekData[i];
    let heartPoints = getHeartPoints(currData);

    if(heartPoints < 0){
        heartPoints = 5;
    }
    else if(heartPoints > 100){
        count++;
        heartPoints = 100;
    }
    // Matric -> 1 step -> 0.04 points
    let pointsData = [];
    pointsData.push({
      points: heartPoints,
      date: currData[0].date,
    });
    pointsData.push({
      points: 100 - heartPoints,
      date: currData[1].date,
    });

    pointsDailyWheels = d3
      .select("#dailySVG")
      .append("g")
      .attr("transform", `translate(${cx},${35})`);
    let paths = pointsDailyWheels
      .selectAll("path")
      .data(piePointsSmall(pointsData));

    cx += 80;
    paths
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", (d) => arcPathOuterSmall(d)) // transitioning from 0 to end
      .attr("fill", (d) => {
        if (d.data.date === "goal") {
          return "#FF";
        }
        return "#00b359";
      })
      .attr("z-index", "1000")
      .attr("opacity", (d) => {
        if (d.data.date === "goal") {
          return "0";
        }
        return "1";
      })
      .transition()
      .duration(1000)
      .attrTween("d", (d) => arcTweenEnterOuterSmall(d));
  }


  let target = document.querySelector("#daily .target-sec div");
  target.innerText = `${count}/7`;
};

let updateWeekDays = (data) =>{
    // console.log(weekData)
    let x = 30;
    for(let i=0;i<weekData.length;i++){
        let daysGroup = d3.select("#dailySVG").append("g").attr("transform", `translate(${x},${90})`);

        daysGroup.append('text').text(weekData[i][0].day).style('font-weight', () => { 
            if(i==6) return '700'
            return '490' 
        });
        x+= 80;
    }
}

let updateDailyWheels = (data) => {
  getWeeklyStats(data);

  buildDailyStepsWheels(data);
  
  buildDailyPointsWheels(data);
  buildDefaultDailyWheels();
  updateWeekDays(data);
};

const arcTweenEnterInnerSmall = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle);

  return function (t) {
    // console.table(t , i(t), d.startAngle);
    d.endAngle = i(t);
    return arcPathInnerSmall(d);
  };
};

const arcTweenEnterOuterSmall = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle);

  return function (t) {
    // console.table(t , i(t), d.startAngle);
    d.endAngle = i(t);
    return arcPathOuterSmall(d);
  };
};
