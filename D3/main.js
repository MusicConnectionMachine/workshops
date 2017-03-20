//load data
d3.json("composers.json", function(data){
    new ComposerChart(data);
});


function ComposerChart(data){

    // TODO: create svg

    // TODO: add container for axis at the bottom of the svg


    // TODO: create the composer bars
    // Hint: sort composers before using them

    // Hint: find the first date of birth and the last date of death to get for the linear scale for axis and correct positioning of composers

    // TODO: create axis and set tick-format
    // Hint: tickFormat() and d3.format() may be usefull here

    // TODO: call the axis

    // TODO: bind data

    // -------------------------------------------------
    // exit
    // -------------------------------------------------
    // TODO: here you can remove composers which are in the exit-selection

    // -------------------------------------------------
    // enter
    // -------------------------------------------------
    // TODO: add new composers for empty nodes in the enter-selection
    // add groups for composers

    // add rectangle to composers

    // add text to composers

    // -------------------------------------------------
    // update (all)
    // -------------------------------------------------
    // TODO: set attributes


    // -------------------------------------------------
    // Main part is over now, if your solution is already working you can do the optional parts as well:
    // -------------------------------------------------

    // TODO (optional): add tooltips to the composers

    // TODO (optional): create the legend

}