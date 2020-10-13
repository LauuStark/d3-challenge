// @TODO: YOUR CODE HERE!

// 1. Define SVG area dimensions
var svgWidth = 1000;
var svgHeight = 800;

// 2. Define chart margins and dimensions 
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 100,
    left: 100
  };

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// 3. Select where the scatter plot will be printed in HTML, and dimensions stated above
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// 4. Create and append group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// 5. Load data from provided csv
d3.csv("/assets/data/data.csv").then(function(hData) {
    // Confirm data has been loaded
    console.log(hData);
    // Convert numeric data to numbers
    hData.forEach(function(data) {
        data.healthcare = +data.healthcare,
        data.poverty = +data.poverty;
    });

    // 6. Create scale functions
    var xLinearScale = d3.scaleLinear()
    //.domain([8, d3.max(hData, d => d.poverty)])
        .domain([8, 22])
        .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(hData, d => d.healthcare)])
        .range([chartHeight, 0]);

    // 7. Create Axis functions

        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

    //yLinearScale xLinearScale

    // 8. Append axes to chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // 9. Create circles for scatterplot
    var circlesGroup = chartGroup.selectAll("circle")
        .data(hData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "grey");
        //.text(textEl)

    // 10. Create and append text

    //var textEl = circlesGroup.append('text')
        //.text(d => d.abbr)
        //.attr('dx', d => xLinearScale(d.poverty))
        //.attr('dy', d => yLinearScale(d.healthcare))
        //.classed("txt", true)
        //.attr("font-color", "white")

    // 11. Initialze and create tool tip and mouseover and mouseout event listeners
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.state}<br>Poverty Rate: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
        });

    chartGroup.call(toolTip);

    circlesGroup.on("click", function(data) {
        toolTip.show(data,this);
    }).on("mouseout", function(data, index) {
        toolTip.hide(data);
    });


    // 12. Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2 + 50))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
    }).catch(function(error) {
        console.log(error);
    })













