let dims = { height: 300, width: 300 };
const center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

let svg = d3
  .select(".chart")
  .append("svg")
  .attr("height", dims.height)
  .attr("width", dims.width);

let counters = d3.select("svg").append("g").attr("class", "main-counters")
// .style('margin-right', '100')
// .style('display', 'flex')
// .style('flex-direction', 'coloumn')
// .style('align-items', ' center')
// .style('position', 'absolute')
.attr("transform", `translate(${center.x}, ${center.y})`)

let pointsCounter = d3
  .select(".main-counters")
  .append("text")
  .attr("id", "points-counter") 
  .style("font-size", 65)
  .attr("transform", `translate(${-35}, ${0})`);

let stepsCounter = d3
  .select(".main-counters")
  .append("text")
  .attr("id", "steps-counter")
  .style("font-size", 25)
  .style('font-weight', 600)
  .attr("transform", `translate(${-30}, ${30})`);

let updateCounters = (steps, heartPoints) => {
  d3.select("#steps-counter")
    .style('fill', '#00005a')
    .transition()
    .tween("text", () => {
      const interpolator = d3.interpolateNumber(0, steps);
      return function (t) {
        d3.select(this).text(Math.round(interpolator(t)));
      };
    })
    .duration(1000);

  d3.select("#points-counter")
  .style('fill', '#00b359')
    .transition()
    .tween("text", () => {
      const interpolator = d3.interpolateNumber(0, heartPoints);
      return function (t) {
        d3.select(this).text(Math.round(interpolator(t)));
      };
    })
    .duration(1000);
};
