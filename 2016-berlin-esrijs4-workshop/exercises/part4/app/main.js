require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/core/watchUtils",
  "esri/views/MapView",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "dojo/on"
],
function(Map, FeatureLayer, watchUtils, MapView, QueryTask, Query, on) {
  var url = 'http://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Major_Cities/FeatureServer/0';
  var map = new Map({
    basemap: "topo"
  });
  var fLayer = new FeatureLayer({url:url});
  map.add(fLayer);
  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.182, 33.913],
    scale: 836023
  });

  // Counter label has id "cityCount"
  
  function updateCount(layerView) {
    // Query the features in the layerView
    // Display the count in the counter element
  }
  
  var query = new Query();
  var qTask = new QueryTask({url:url});
  
  view.whenLayerView(fLayer)
  .then(function(layerView) {
    query.geometry = view.extent;
    // get the initial count
    qTask.executeForCount(query).then(function(count) {
      // update the count of features in the counter
    });
    watchUtils.whenTrue(view, 'stationary', function() {
      // update tghe count
    });
    watchUtils.whenFalse(view, 'stationary', function() {
      // set count text to "working" or similar
    });
  });

});