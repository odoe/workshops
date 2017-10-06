require([
  "esri/Map",
  "esri/layers/VectorTileLayer",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/widgets/Home",
  "esri/widgets/Locate",
  "esri/symbols/PictureMarkerSymbol",
  "dojo/domReady!"
], function (
  Map,
  VectorTileLayer,
  MapView,
  Search,
  Home,
  Locate,
  PictureMarkerSymbol
  ) {

    var map = new Map({
      layers: [
        new VectorTileLayer({
          url: "https://www.arcgis.com/sharing/rest/content/items/dbd2dac5fe39429eb69cd657400419a4/resources/styles/root.json"
        })
      ]
    });

    var sym = new PictureMarkerSymbol({
      url: "nba_lakers.png",
      height: "36px",
      width: "36px"
    });

    var view = new MapView({
      center: [-118.174, 34.024],
      zoom: 14,
      container: "viewDiv",
      map: map,
      ui: {
        components: ["zoom", "compass", "attribution"]
      },
      padding: {
        top: 80
      }
    });

    var searchWidget = new Search({
      viewModel: {
        view: view
      }
    });
    searchWidget.startup();

    var homeWidget = new Home({
      viewModel: {
        view: view
      }
    });
    homeWidget.startup();

    var locateWidget = new Locate({
      viewModel: {
        view: view
      }
    });
    locateWidget.startup();

    var action = {
      id: "go-lakers",
      className: "lakers-logo",
      title: "Go Lakers!"
    };

    view.then(function () {
      view.ui.add(searchWidget, "top-right");
      view.ui.add(homeWidget, "top-left");
      view.ui.add(locateWidget, "top-left");

      var source = searchWidget.viewModel.sources.getItemAt(0);
      source.resultSymbol = sym;

      view.popup.actions.push(action);

      view.popup.on('trigger-action', function(e) {
        if (e.action.id === "go-lakers") {
          window.open("http://www.nba.com/lakers/");
        }
      });

    });
  });