/**
/**
 * Created by akoleti on 3/8/16.
 */
app.controller('WordCloudCtrl',function($scope,$routeParams,$http,ViewService,$timeout){

    $scope.spinner = true;

    $timeout(function() {
        $scope.spinner = false;
    },1000);

    var id = $routeParams.id;
    $scope.epName = $routeParams.epName;
    if($scope.epName==undefined) {
        setTimeout(function () {
            $scope.wordEpName = ViewService;
            $scope.epName = $scope.wordEpName.datasetinfo["endpoints"].toString()
            wordcloud();
        }, 100);
    }else{
        wordcloud()
    }
    setTimeout(function () {
        $scope.epMessage = "The size of the words is based on the endpoint " +$scope.epName;
    }, 1000);

    function wordcloud(){


        var url = "/dcic/api/chart-feeder?id="+id+"&epName="+$scope.epName+"&charttype=wordcloud";


        d3.json(url, function(error, data) {
            var fill = d3.scale.category20();
            d3.layout.cloud().size([1000, 1000])

                .words(data)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
            function draw(words) {
                d3.select("#Wordcloud").append("svg")
                    .attr("width", 1000)
                    .attr("height", 1000)
                    .append("g")
                    .attr("transform", "translate(500,500)")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .attr("class","titip-top")
                    .style("fill", function(d, i) { return fill(i); })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) { return d.text; })
                    .append("title")
                    .text(function(d) {
                        return d.size;
                    });
            }
        })
    }
});

