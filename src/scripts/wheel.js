let dims = { height: 300, width: 300 };
const center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

let svg = d3
  .select(".chart")
  .append("svg")
  .attr("height", dims.height)
  .attr("width", dims.width);

let stepsWheel = d3
  .select("svg")
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

const pie = d3
  .pie()
  .sort(null)
  .value((d) => d.steps);

const arcPath = d3.arc().outerRadius(100).innerRadius(90);

let updateWheels = (data) => {
  let d = new Date();

  let found = false;
  let currData = {};
  let currDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  for (let i = 0; i < data.length; i++) {
    console.log(currDate, data[i].date);
    if (currDate === data[i].date) {
      console.log("Same day steps found");
      currData = data[i];
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("Same day steps not found");
    return;
  }
  //     // Join updated data to the elements
  const paths = stepsWheel.selectAll("path").data(pie([currData]));

  //   paths.exit().transition().duration(700).attrTween("d", arcTweenExit).remove();

  paths
    .attr("class", "arc")
    .attr("d", (d) => {
      console.log(d);
      return arcPath(d);
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", "dark blue");

  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", (d) => {
      console.log(d);
      return arcPath(d);
    }) // transitioning from 0 to end
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", "dark blue");
  //   .attr("class", (d) => `${d.data.cost}`)
  //   .transition()
  //   .duration(700)
  //   .attrTween("d", (d) => arcTweenEnter(d));
};

updateWheels(db);
