var d3 = require('d3');
var width = 400;
var barheight = 30;

exports.init = function(data) {
  var x = d3.scale.linear().range([0, width]);
  var chart = d3.select('#visualContainer').attr('width', width) ;

  x.domain([0, d3.max(data, function(d) { return d.value; })]);

  chart.attr("height", barheight * data.length);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barheight + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", barheight - 1);

  bar.append("text")
      .attr("x", function(d) { return x(d.value) - 3; })
      .attr("y", barheight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.value; });
  
};

