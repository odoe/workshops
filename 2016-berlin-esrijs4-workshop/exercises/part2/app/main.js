require([
  "esri/Map",
  "esri/views/MapView"
], function(
  Map, MapView
) {
  var map = new Map({
    basemap: "topo"
  });

  var view = new MapView({
    map: map,
    container: "viewDiv",
    center: [10, 53.52],
    zoom: 8
  });

  // wait for the view to load and then
  // watch for view center and extent changes
  // print changes out to DOM element id "resultsDiv"

});