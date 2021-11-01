let updateWeeklyBar = () => {
  let weeklySVG = d3
    .select("#weekly>.visuals-sec>.charts")
    .append("svg")
    .attr("height", 10)
    .attr("width", 550)
    .attr("transform", `translate(50,${5.7})`)
    .attr("id", "weeklySVG");

  let weeklyBar = weeklySVG.append("g");

  let defaultBar = weeklyBar.append("g");

  let rects = defaultBar.selectAll("rect").data([1]);

  rects.exit().remove();

  rects
    .enter()
    .append("rect")
    .attr("fill", "#00b359")
    .attr("height", 10)
    .attr("width", 500)
    .attr("opacity", 0.2)
    .attr("rx", 6)
    .attr("ry", 6);
  rects = weeklyBar
    .selectAll("rect")
    .data([totalWeekPoints, 500 - totalWeekPoints]);

    
  rects.exit().remove();
  rects
    .enter()
    .append("rect")
    .attr("fill", "#00b359")
    .attr("height", 10)
    .attr("rx", 6)
    .attr("ry", 6)
    .transition()
    .duration(1000)
    .attr("width", (totalWeekPoints > 500)?500:totalWeekPoints)

  
    let target = document.querySelector("#weekly .target-sec div");
    target.innerText = `${totalWeekPoints} of 500`;
};


