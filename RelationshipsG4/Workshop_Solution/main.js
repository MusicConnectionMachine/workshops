//define colours
var colorMap = {
	"Renaissance": "orchid",
	"Barock": "salmon",
	"Classic": "gold",
	"Romantic": "lightgreen",
	"Modern": "lightblue"
};

var rawData = null;

//load data
d3.json("composers.json", function(data){
    rawData = data;
    new ComposerChart(data);
});


function ComposerChart(data){

    var width = 1400;
    var height = 600;
    var margin = 20;

    //create svg
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    //add axis at the bottom of the svg
    svg.append("g")
        .attr("transform", "translate(0, " + (height - margin) + ")")
        .attr("id", "axis");

    this.update = function update(data){

        var rectHeight = 17;
        var rectDistance = 38;
        var fontSize = 11;

        //sort data according to birthdate
        data.sort(function(composer1, composer2){
            return composer1.yearBirth - composer2.yearBirth;
        });

        var min_yearBirth = data.length != 0 ? data[0].yearBirth : 0;

        var max_yearDeath = 0;
        data.forEach(function(composer){
            if(composer.yearDeath > max_yearDeath){
                max_yearDeath = composer.yearDeath;
            }
        });

        //create linear scale for axis and correct positioning of composers
        var scale = d3.scaleLinear()
            .domain([min_yearBirth - 20, max_yearDeath + 20])
            .range([0, width]);

        //create axis and set tick-format
        var axis = d3.axisBottom(scale).tickFormat(d3.format(".0f"));

        d3.select("#axis").transition().duration(500).call(axis);

        //bind data
        var composers = svg.selectAll(".composer")
            .data(data, function(d){return d.name});

        //exit
        //-------------------------------------------------
        composers.exit().remove();

        //enter
        //-------------------------------------------------

        //add groups for composers
        var new_composers = composers.enter()
            .append("g")
            .attr("class", "composer");

        //add rectangle to composer
        new_composers.append("rect");

        new_composers.append("text")
            .text(function(d){
                var nameArray = d.name.split(" ");
                var name = "";
                for(var i=0; i<nameArray.length-1; i++){
                    name += nameArray[i].slice(0,1) + ". ";
                }
                name += nameArray[nameArray.length -1];
                return name;
            })
            .attr("y", function(d,i){return rectHeight/2 + fontSize/2;})
			.attr("x", function(d) { return 3;})
            .style("font-size", fontSize + "px");

        //update (all)
        //--------------------------------------------------------------------
        new_composers.merge(composers).select("rect")
            .attr("width", function(d){return scale(d.yearDeath) - scale(d.yearBirth)})
            .attr("height", rectHeight)
            .style("fill", function(d){return colorMap[d.period]});

        new_composers.merge(composers)
            .transition().duration(500)
            .attr("transform", function(d, i){
                var itemsPerColumn = Math.round((height-3*margin - 0.5*rectDistance)/rectDistance);
                var x = (scale(d.yearBirth));
                var y = (rectDistance * (i%itemsPerColumn) + (((i/itemsPerColumn)%2) * 0.5*rectDistance));
                return "translate(" + x + ", " + y + ")";
            });



        addTooltips(d3.selectAll(".composer"));
    };

    this.legende = new Legende(svg, data, this, height);
    this.update(data);

}

function addTooltips(composers){

    var div = d3.select("body .tooltip");

    //add tooltip (one for all)
    if(div.empty()){
        div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    }

    var body_padding = parseFloat(d3.select("body").style("padding-left"));

    composers.on("mouseover", function(d, index, array){

        div	.html(d.name + "<br/>" + d.yearBirth + "-" + d.yearDeath)
            .style("left", body_padding + array[index].transform.animVal[0].matrix.e + "px")
            .style("top", (array[index].transform.animVal[0].matrix.f - 0) + "px");
        //make tooltip appear
        div.transition()
            .duration(100)
            .style("opacity", 1);


    }).on("mouseout", function(d) {
            //make tooltip disappear
            div.transition()
                .duration(100)
                .style("opacity", 0)
    });
}



function Legende(svg,data, chart, chartHeight){
    var svg = svg;
    var rawData = data;
    var legend_height = 200;
    var margin = 25;
    var fontSize = 10;

    var currentData = data;

    var legend = svg.append("g")
        .attr("class","legend")
        .attr("transform", "translate(" + (margin) + ", " + (chartHeight - legend_height - 3*margin) + ")");

    legend.append("rect")
        .attr("width", 150)
        .attr("height", legend_height)
        .attr("rx", 5)
        .attr("ry", 5);

    var colorArray = [];
    var activityMap = {};
    for(var key in colorMap){
        activityMap[key] = true;
        colorArray.push({key: key, color:colorMap[key]});
    }
    var legendItems = legend.selectAll(".legendItem")
        .data(colorArray)
        .enter()
        .append("circle")
        .attr("class", "legendItem")
        .attr("cy", function(d,i){return i * 35 + margin})
        .attr("cx", margin)
        .attr("r", 7)
        .style("fill", function(d){return d.color})

        //add functionality
        .on("click", function(d){
            var resultData = [];
            if(activityMap[d.key]){
                activityMap[d.key] = false;
                d3.select(this).style("stroke", d.color)
                    .style("fill", "white");
                currentData.forEach(function(composer){
                    if(composer.period != d.key){
                        resultData.push(composer);
                    }
                });
            }else{
                activityMap[d.key] = true;
                d3.select(this).style("fill", d.color)
                    .style("stroke", "white");
                var resultData = currentData;
                rawData.forEach(function(composer){
                    if(composer.period == d.key){
                        resultData.push(composer);
                    }
                });
            }
            currentData = resultData;
            chart.update(resultData);
        });

    var legendTexts = legend.selectAll(".legendText")
        .data(colorArray)
        .enter()
        .append("text")
        .attr("class", "legendText")
        .text(function(d){return d.key})
        .attr("y", function(d,i){return i * 35 + margin + fontSize/2.0})
        .attr("x", 2*margin)
        .style("font-size", fontSize + "px")
}