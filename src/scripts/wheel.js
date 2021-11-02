// let dims = { height: 300, width: 300 };
// const center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

let defaultWheels = d3
  .select("svg")
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

let stepsWheel = d3
  .select("svg")
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

let pointsWheel = d3
  .select("svg")
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

const pieSteps = d3
  .pie()
  .sort(null)
  .value((d) => d.steps);

const piePoints = d3
  .pie()
  .sort(null)
  .value((d) => d.points);

const arcPathInner = d3.arc().outerRadius(95).innerRadius(85).cornerRadius(20);
const arcPathOuter = d3
  .arc()
  .outerRadius(115)
  .innerRadius(105)
  .cornerRadius(20);

let buildDefaultWheels = () => {
  const paths = defaultWheels
    .selectAll("path")
    .data(pieSteps([{ steps: 10000 }]));

  //   paths.exit().transition().duration(700).attrTween("d", arcTweenExit).remove();

  paths
    .attr("class", "arc")
    .attr("d", (d) => arcPathInner(d))
    .attr("fill", "#00004d")
    .attr("opacity", "0.2");

  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", (d) => arcPathInner(d))
    .attr("fill", "#00004d")
    .attr("opacity", "0.2");

  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", (d) => arcPathOuter(d))
    .attr("fill", "#00b359")
    .attr("opacity", "0.3");
};

let updateWheels = (data) => {
  let d = new Date();

  let found = false;
  let currData = [];
  let currDate = `${d.getMonth() + 1}/${
    Math.floor(d.getDate() / 10) == 0 ? "0" + d.getDate() : d.getDate()
  }/${d.getFullYear()}`;
  let duration;
  for (let i = 0; i < data.length; i++) {
    if (currDate === data[i].date) {
      // console.log("Same day steps found");
      currData.push(data[i]);
      duration = data[i].duration;
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("Same day steps not found");
    return;
  }
  // console.log(currData[0]);
  currData.push({ steps: goalsDB[0].steps - currData[0].steps, date: "goal" });

  // console.log(currData[0].steps);
  let paths = stepsWheel.selectAll("path").data(pieSteps(currData));

  //   paths.exit().transition().duration(700).attrTween("d", arcTweenExit).remove();

  paths
    .attr("class", "arc")
    .attr("d", (d) => arcPathInner(d))
    .attr("fill", (d) => {
      if (d.data.date === "goal") {
        return "FF";
      }
      return "#00005a";
    })
    .attr("opacity", (d) => {
      if (d.data.date === "goal") {
        return "0";
      }
      return "1";
    })
    .transition()
    .duration(1000)
    .attrTween("d", (d) => arcTweenEnterInner(d));

  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", (d) => arcPathInner(d)) // transitioning from 0 to end
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
    .attrTween("d", (d) => arcTweenEnterInner(d));

  updatePointsWheel(currData);
  updateMainStats(currData[0].steps, duration);

  updateDailyWheels(data);

};

let updateMainStats = (steps, duration) => {
  let calories = steps * 0.04;
  // console.log(calories, steps, duration);
  let stats = document.querySelector(".summary-details");
  stats.children[0].children[0].innerText = calories;
  stats.children[1].children[0].innerText =
    Math.round(steps * 0.00076219512 * 10) / 10;
  stats.children[2].children[0].innerText = duration;
  console.log();
};

let updatePointsWheel = (currData) => {
  let heartPoints = getHeartPoints(currData);
  updateCounters(currData[0].steps, heartPoints);
  // Matric -> 1 step -> 0.04 points
  let pointsData = [];
  pointsData.push({
    points: heartPoints,
    date: currData[0].date,
  });
  pointsData.push({
    points: 100 - pointsData[0].points,
    date: currData[1].date,
  });
  // points WHEEL

  let paths = pointsWheel.selectAll("path").data(piePoints(pointsData));

  paths
    .attr("class", "arc")
    .attr("d", (d) => arcPathOuter(d))
    .attr("fill", (d) => {
      if (d.data.date === "goal") {
        return "FF";
      }
      return "#00b359";
    })
    .attr("opacity", (d) => {
      if (d.data.date === "goal") {
        return "0";
      }
      return "1";
    })
    .transition()
    .duration(1000)
    .attrTween("d", (d) => arcTweenEnterOuter(d));

  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", (d) => arcPathOuter(d)) // transitioning from 0 to end
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
    .attrTween("d", (d) => arcTweenEnterOuter(d));
};

buildDefaultWheels();
updateWheels(stepsDB);

const arcTweenEnterInner = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle);

  return function (t) {
    // console.table(t , i(t), d.startAngle);
    d.endAngle = i(t);
    return arcPathInner(d);
  };
};

const arcTweenEnterOuter = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle);

  return function (t) {
    // console.table(t , i(t), d.startAngle);
    d.endAngle = i(t);
    return arcPathOuter(d);
  };
};


updateWeeklyBar();
updateDailyBars();
updateEnergyBars();