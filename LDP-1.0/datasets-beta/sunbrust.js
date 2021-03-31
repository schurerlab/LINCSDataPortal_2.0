/**
 * Created by akoleti on 3/4/16.
 */
app.controller('SunburstCtrl',function($scope,$routeParams){

    var width = 600,
        height = 500,
        radius = (Math.min(width, height) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.sqrt()
        .range([0, radius]);

    var color = d3.scale.category20c();

    var partition = d3.layout.partition()
        .value(function(d) { return d.size; });

    var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class","col-md-10 col-md-offset-1")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    d3.json("http://dev3.ccs.miami.edu:8080/geneinfo/kinomescan-fetcher?id=LDS-1008", function(error, root) {
        if (error) throw error;

        svg.selectAll("text")
            .data(partition.nodes(root))
            .attr("class","col-md-10 col-md-offset-1")
            .enter()
            .append("path")
            .attr("d", arc)
            .text(function(d) { return d.text; })
            .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
            .text(function(d) { return d.text; })
            .on("click", click)
            .append("title")
            .text(function(d) { return d.name + "\n" + formatNumber(d.value); });
    });

    function click(d) {
        svg.transition()
            .duration(750)
            .tween("scale", function() {
                var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                    yd = d3.interpolate(y.domain(), [d.y, 1]),
                    yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
                return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
            })
            .selectAll("path")
            .attr("class","col-md-10 col-md-offset-1")
            .attrTween("d", function(d) { return function() { return arc(d); }; });
    }

    d3.select(self.frameElement).style("height", height + "px");

})
