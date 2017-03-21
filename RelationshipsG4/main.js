//load data
d3.json("composers.json", function(data){
    new ComposerChart(data);
});


function ComposerChart(data){

    // TODO: create svg

    // TODO: create axis and set tick-format
    // Hint: tickFormat() and d3.format() may be useful here

    // TODO: bind data
    // Hint: sort composers before using them

    // -------------------------------------------------
    // exit
    // -------------------------------------------------
    // TODO: here you can remove composers which are in the exit-selection

    // -------------------------------------------------
    // enter
    // -------------------------------------------------
    // TODO: add new composers for empty nodes in the enter-selection
    // add group element for composers

    // add rectangle to composers and set static attributes and styles

    // add text to composers and set static attributes and styles

    // -------------------------------------------------
    // update (all)
    // -------------------------------------------------
    // TODO: set dynamic attributes


    // -------------------------------------------------
    // Main part is over now, if your solution is already working you can do the optional parts as well:
    // -------------------------------------------------

    // TODO (optional): add tooltips to the composers

    // TODO (optional): create the legend to become a legend :-)

}
