let updateEnergyBars = () => {
    let energySVG = d3
      .select("#energy>.visuals-sec>.charts")
      .append("svg")
      .attr("height", 120)
      .attr("width", 550)
      .attr("transform", `translate(50,${-45})`)
      .attr("id", "energySVG");
  
    let x = 0;
    // for (let i = 0; i < weekData.length; i++) {
    //   let energyBar = energySVG.append("g");
    //   rects = energyBar.selectAll("rect").data([1, 1]);
  
    //   rects.exit().remove();
    //   rects
    //     .enter()
    //     .append("rect")
    //     .attr("fill", "#0000a5")
    //     .attr("rx", 6)
    //     .attr("ry", 6)
    //     .attr("width", 40)
    //     .attr("height", 100)
    //     .attr("x", x)
    //     .attr("opacity", 0.2);
  
    //   x += 70;
    // }
    // x = 0;
    for (let i = 0; i < weekData.length; i++) {
      let energyBar = energySVG.append("g");
      rects = energyBar.selectAll("rect").data([1, 1]);
  
      rects.exit().remove();
      rects
        .enter()
        .append("rect")
        .attr("fill", "#4169E1")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("width", 40)
        .attr("x", x)
        .attr("y", 100)
        .transition()
        .duration(1000)
        .attr("y", 100 - ((weekData[i][0].steps * 0.04) / (10000 * 0.04)) * 100)
        .attr("height", ((weekData[i][0].steps * 0.04) / (10000 * 0.04)) * 100);
  
      x += 70;  
    }
    // console.log(weekData);
  
    let target = document.querySelector("#energy .target-sec div");
      target.innerHTML = `${weekData[6][0].steps * 0.04}<span> Cal</span>`;
   
      updateWeekDaysBarE();
  };
  
  
  let updateWeekDaysBarE = () =>{
      // console.log(weekData)
      let x = 15;
      for(let i=0;i<weekData.length;i++){
          let daysGroup = d3.select("#energySVG").append("g").attr("transform", `translate(${x},${120})`);
  
          daysGroup.append('text').text(weekData[i][0].day).style('font-weight', () => { 
              if(i==6) return '700'
              return '490' 
          });
          x+= 70;
      }
  }
  