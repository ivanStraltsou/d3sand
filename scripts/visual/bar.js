var d3 = require('d3');

exports.init = function(url) {
  var width = 700,
    height = 500;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

  d3.tsv("data.tsv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.name; }).sort());
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    var bar = chart.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + x(d.name) + ",0)"; });

    bar.append("rect")
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x.rangeBand());

    bar.append("text")
      .attr("x", x.rangeBand() / 2)
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.name; });
  });

  function type(d) {
    d.value = float(d.value);

    return d;
  }

  function float(value) {
    return parseFloat(value, 10);
  }

};

