<!-- .slide: class="title" -->

## Introduction to the ArcGIS API for JavaScript

Berlin, 2018

<!-- .slide: class="sponsor" -->

---

<!-- .slide: class="agenda" -->

## Format

Demos and short labs

---

## Questions for you

How familiar are you with:

1. ArcGIS Online (maps, data, services, analysis)
2. ArcGIS API for JavaScript

---

<!-- .slide: class="agenda" -->

## Agenda

- Platform
- Data
- Design
- Develop

---

<!-- .slide: class="section" -->

# ArcGIS Platform

---

<div style="width: 100%; display: table;">
    <div style="display: table-row">
    <div style="width: 60%; float: left;"> 
   <h3> Location Intelligence Everywhere </h3>
   <ul>
  <li>SaaS mapping and location platform</li>
  <li>Comprehensive GIS</li>
</ul>
     </div>
    <div style="width: 40%; float: right;"> 
        <img src="images/platform.png" alt="Platform" >
    </div>
    
</div>

---

## ArcGIS Dev Process

---

## Getting set up

1. Sign up for FREE ArcGIS Developer Account
2. Explore some projects on esri.github.io
3. Explore ArcGIS.com

---

<!-- .slide: class="section" -->

# Overview

---

## Overview

- Introduction of 3D and WebScene
- [WebScene Viewer](//www.arcgis.com/home/webscene/viewer.html)
- [SDK](//developers.arcgis.com/javascript/)

---

## Overview

- Portal API
- Better integration of `WebMap` and `WebScene`
 - Place the intelligence of the [arcgis.com map viewer](//www.arcgis.com/home/webmap/viewer.html) in the API
 - Addition of missing components like `GroupLayer`
 - Switching spatial reference
- APIs and Widgets redesign

---

## Overview

- Simplified API
- `WebMap` and `WebScene`, first class citizens
- brings 3D capabilities
- APIs and Widgets redesign
- Common patterns shared with Runtime SDKs

---

## Overview

- Architecture
- Development patterns
  - `Accessor`
  - `Collection`
  - `Promise`
- IE11+ and other modern browsers only
- _IE11 WebGL performance not optimal_

---

# SDK
- Built from scratch
- Simpler, focused samples
- Enhanced user experience
- Improved search functionality
- More guides and code snippets
- [link](https://developers.arcgis.com/javascript/)

---

<!-- .slide: class="section" -->

# Develop

---

## Your first map

```js
const map = new Map({
  basemap: "topo-vector"
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-118.71511,34.09042],
  zoom: 10
});
```

---

## Your first map

- [Create a starter app](https://developers.arcgis.com/labs/javascript/create-a-starter-app/)

---

<!-- .slide: class="section" -->

# API Fundamentals

---

## Building blocks of the API

New core classes to get the job done
- `esri/core/Accessor`
- `esri/core/Collection`

---

## `esri/core/Accessor`

- base class of most of the API
- consistent pattern:
 - getting and setting properties value
 - watching properties change
- unifed object constructor
- computed properties
- autocast

---

## Accessor - Properties watching

- Direct benefits:
 - remove inconsistancies between constructor, getter, setter functions, events
 - one convention everywhere. _"just need to know what properties for a class"_
 - Single object constructor, no more 3+ constructors
 - Leaner SDK: we doc only the properties, the rest is convention

- Changes:
 - no more **_property_**-change events, use `watch()`
 - in 3.x, listen for [`extent-change`](https://developers.arcgis.com/javascript/3/jsapi/map-amd.html#event-extent-change) event.
 - in 4.x `extent` watchers will be called very often

---

## Accessor - Properties watching

```javascript
const map = new Map(...);
const view = new MapView({ map: map });

// watch for view scale updates
view.watch('scale', (newValue, oldValue, property, target) => {
  console.log(newValue, oldValue, property, target);
})

// chain watching
map.watch('basemap.title', (value) => {
  console.log(value);
});
map.basemap = 'topo';
```

---

- watchUtils

<iframe height='600' scrolling='no' title='watchUtils' src='//codepen.io/odoe/embed/preview/oeGmQN/?height=600&theme-id=31222&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/oeGmQN/'>watchUtils</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Accessor - Unified Object Constructor

```js
require([
  'esri/Map',
  'esri/Basemap',
  'esri/core/Collection',
  'esri/layers/TileLayer'
],
function(
  Map,
  Basemap,
  Collection,
  TileLayer
) {
  const map = new Map({
    basemap: new Basemap({
      baseLayers: new Collection([
        new TileLayer({ url: url })
      ])
    })
  });
});
```

---

## Accessor - Autocast

```js
require([
  'esri/Map',
  'esri/layers/TileLayer',
  'esri/views/MapView'
],
function(
  Map,
  TileLayer,
  MapView
) {
  const map = new Map({
    basemap: {
      baseLayers: [
        new TileLayer({ url: url })
      ]
    }
  });

  const view = new MapView({
    map: map,
    container: 'viewDiv',

    extent: {
      xmin: -180, xmax: 180,
      ymin: -80, ymax: -80,
      spatialReference: 4326
    }
  });
});
```

---

## Accessor - Autocast

```js
  // 3.x
  new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
    new Color([255,0,0]), 4),
    new Color([255,255,255,0.25]));

  // 4.x
  {
    type: "simple",
    style: 'square',
    color: 'red',
    size: 10,

    outline: {
      color: 'rgba(255, 255, 255, 0.5)'
      width: 4
    }
  };
```

---

## Accessor - More Autocast

```js
const marker = {
  type: "simple-marker",
  style: 'square',
  color: 'red',
  size: 10,

  outline: {
    color: 'rgba(255, 255, 255, 0.5)'
    width: 4
  }
};

const pointGraphic = new Graphic({
  geometry: {
    type: "point", // autocasts as new Point()
    longitude: -71.2643,
    latitude: 42.0909
  },
  symbol: marker // autocasts as new SimpleMarkerSymbol()
});
```

---

# Pop Quiz!

## [Create Graphics](https://developers.arcgis.com/labs/javascript/display-point-line-and-polygon-graphics/)

---

## Collection

 - Array-_like_ Container
 - in house methods `add` / `remove` ...
 - array methods `forEach` / `map` ...
 - newer array methods `find` / `findIndex`...
 - used for layers, used for layers in Basemap, used for graphics...

```js
const collection = new Collection([1, 2, 3]);
collection.add(5);
collection.addMany([6, 7]);
collection.forEach((item) => {
  console.log(item);
});
const even = collection.filter((item) => {
  return (item % 2) === 0;
});
collection.forEach((item) => {
  console.log(item);
});
```

---

## Collection

 - Emit `"change"` events when something is added/removed/moved

```js
const collection = new Collection([1, 2, 3]);
collection.on("change", (event) => {
  console.log("added", event.added);
  console.log("moved", event.moved);
  console.log("removed", event.removed);
});
collection.add(5);
collection.addMany([6, 7]);
collection.shift();
collection.pop();
```

---

## Collection

 - Autocasting Support

```js
const PointCollection = Collection.ofType(Point);
const pointCollection = new PointCollection();

pointCollection.add([-100,40]);
pointCollection.add({ x: -100, y: 41 });


const point = pointCollection.getItemAt(0);
//point.x = -100; point.y = 40
```

---

## Collection

<iframe height='600' scrolling='no' title='Collection' src='//codepen.io/odoe/embed/preview/MQWLwO/?height=600&theme-id=31222&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/MQWLwO/'>Collection</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Promises

- All asynchronous methods return a promise, no more [events](https://developers.arcgis.com/javascript/jsapi/querytask-amd.html#events)
- The basic pattern looks like this:

```js
  someAsyncFunction()
    .then(resolvedVal => {
      //This is called when the promise resolves
      console.log(resolvedVal);  //logs the value the promise resolves to
    })
    .catch(error => {
      //This function is called when the promise is rejected
      console.error(error);  //logs the error message
    })
```

---

## Promises

- Classes may be Promise
 - Load resources
 - Asychronously initialized `Layer`, `WebMap`, `WebScene`, `View`
 - `view.then()` replaces `map.on('load', ...)`

```js
const map = new Map({...})

view = new SceneView({
  map: map,
  //...
});

view.then(() => {
  // the view is ready to go
});
```

---

## Promises

```js
view.then(() => {
  return view.whenLayerView(map.findLayerById("awesomeLayer"));
})
.then(layerView => {
  return watchUtils.whenFalseOnce(layerView, "updating");
})
.then(({ target: layerView })=> {
  return layerView.queryFeatures();
})
.then(doSomethingWithFeatures)
.catch(errorHandler);
```

---

<!-- .slide: class="section" -->

# Pop Quiz!

## [Query a FeatureLayer](https://developers.arcgis.com/labs/develop/javascript/query-a-feature-layer/)

---

## Loadable

- brings better control, and scheduling of loading resources.
- extension of `esri/core/Promise`
- in 3.x, instanciating a layer loads it. in 4.x, it's an explicit call
- the views automatically loads the map and its layers

---

## Loadables

- `WebMap` / `WebScene` need to load:
 - the portal item
 - the layer module
 - the layer's item
- `MapView` / `SceneView` need to load:
 - the map
 - the layers

---

In a single page application, get a feature from a FeatureLayer from a WebMap without displaying it, ASAP!

```js
  const webmap = new WebMap({
    portalItem: {
      id: 'affa021c51944b5694132b2d61fe1057'
    }
  });

  webmap.load()
    .then(() => {
      return webmap.getLayer('myFeatureLayerId').load();
    })
    .then(featureLayer => {
      return featureLayer.queryFeatures({
        where: 'OBJECTID = 1'
      });
    })
    .then(({ features }) => {
      displayDetails(features[0]);
    })
    .catch(error => {
      console.error(error);
    });
```

---

<!-- .slide: class="section" -->

# [Create a 2D Map](https://developers.arcgis.com/labs/javascript/add-layers-to-a-map/index.html)
 - Same exercise as before
 - Watch for view center to change

---

<!-- .slide: class="section" -->

# Map and View architecture

---


## Map and View architecture

- One of the starting point of 4: bring 3D
- Completely different rendering system
- Isolate the 2D rendering from the 3D one

---

## Map and View architecture

![Map&View](images/api-diagram-0b.png)

---

## Map and View architecture

![Map&View](images/api-diagram-1.png)

---

## Map and View architecture

![Map&View](images/api-diagram-2.png)

---

## MapView and SceneView - multiple views

```js
  const map = new Map({
    basemap: 'topo',
    layers: [
      new ArcGISDynamicLayer(...)
    ]
  });

  const mapView = new MapView({
    map: map,
    container: 'mapDiv'
  });

  const sceneView = new SceneView({
    map: map,
    container: 'sceneDiv'
  });
```

---

## WebMaps

- Create directly from a WebMap id
- Using new `WebMap` module

---

## WebMaps

```js
const webmap = new WebMap({
  portalItem: {
    id: "2dfaf8bdb45a4dcf8511a849e4583873"
  }
});

const view = new MapView({
  map: webmap,
  container: "viewDiv"
});
```

---

## WebMaps

- Maps are just containers of data
- No display capabilities
- Can load data before it is displayed
- Can have multiple WebMaps, lazy-load as needed

---

## WebMaps

```javascript
const webmap = new WebMap({
  portalItem: {
    id: "f2e9b762544945f390ca4ac3671cfa72"
  }
});

webmap.load().then(function() {
  const layer = webmap.layers.find(x => {
    return x.id.indexOf("Accidental_Deaths") > -1;
  });
  layer.definitionExpression = "Population > 10000"
  const view = new MapView({
    map: webmap,
    container: "viewDiv"
  });
});
```

---

<iframe height='600' scrolling='no' title='WebMap Load' src='//codepen.io/odoe/embed/preview/VEyVbq/?height=600&theme-id=31222&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/VEyVbq/'>WebMap Load</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## WebMaps

```javascript
const webmapids = [
  "e691172598f04ea8881cd2a4adaa45ba",
  "f2e9b762544945f390ca4ac3671cfa72"
];

// create an array of WebMaps
const webmaps = webmapids.map(webmapid =>  {
  return new WebMap({
    portalItem: {
      id: webmapid
    }
  });
});
```

- [sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/sandbox.html?sample=webmap-switch)

---

## [Display a WebMap](https://developers.arcgis.com/labs/javascript/display-a-web-map/)

 - also watch for the view center to change
 - have fun watching for other properties to change
---

## [Display a WebScene](https://developers.arcgis.com/labs/javascript/display-a-web-scene/)

 - also watch for the view camera to change
 - have fun watching for other properties to change

---

## WebScene specific - `slides`

- created with the webscene viewer
- store layers visibility, camera, environment

```js
// slides from webscene's presentation
const slides = scene.presentation.slides;

// create a clickable thumbnails
slides.forEach(slide =>  {
  const thumb = new Slide({
    slide: slide
  });
  thumb.on('click', () => {
    // apply the slide on the view
    slide.applyTo(view);
  });
  slidesDiv.appendChild(thumb.domNode);
});

```

---

## WebScene specificities - `viewingMode`

- visualize `global` or `local` scenes
- `local` scenes are best for projected data and underground display

```js
const view = new SceneView({
  
  viewingMode: 'local',

  clippingArea: {
    xmin: ...
    ymin: ...
    xmin: ...
    ymin: ...
    spatialReference: ...
  },

  map: new WebScene(...)
});

```

- [sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/sandbox.html?sample=scene-local)

---

## Basemap

- full fledge class `esri/Basemap`
- basemap's layers are _not_ part of the `map.layers`, but from `map.basemap`
- contains 2 Collections: `baseLayers`, `referenceLayers`
- can be set with
  - string for esri's basemap
  - or custom Basemap instance
  - in 2D and 3D

---

## Basemap

- `basemap` as a string, creation of the appropriated Basemap instance

```js
const map = new Map({
  basemap: 'topo'
});

map.basemap = 'streets';
```

- `basemap` as an instance of `Basemap`

```js
const map = new Map({/*...*/});

const toner = {
  baseLayers: [
    new WebTiledLayer({
      urlTemplate: '...'
    })
  ]
};

map.basemap = toner;
```

---

- `basemap` is loaded from a `WebMap`

```js
const map = new EsriMap({
  basemap: {
    portalItem: {
      id: "8d91bd39e873417ea21673e0fee87604"
    }
  }
});
```

---

<!-- .slide: class="section" -->

# [Select a Basemap](https://developers.arcgis.com/labs/javascript/select-a-basemap/)

---

# Layers and LayerViews

---

## Layers

- `map.layers` contains operational layers
- `map.allLayers` contains all layers including basemaps
- Similar to `Map` and `View`, `Layer` contains features and how to draw, but rendered with `LayerView`

---

## GraphicsLayer

- Simplest layer to work with
- A "bag-o-graphics"
- Does not support renderers

---

## GraphicsLayer

```js
const graphicsLayer = new GraphicsLayer({
  graphics: [graphic1, graphic2, graphic3]
});

// add a single graphic
graphicsLayer.add(graphic4);
// add an array of graphics
graphicsLayer.addMany([graphic5, graphic6, graphic7]);
```

---

## GraphicsLayer - create a Graphic

```js
const graphic = new Graphic({
  attributes: {
    id: 1,
    city: "Los Angeles"
  },
  geometry: {
    type: "point",
    x: xValue,
    y: yValue
  },
  symbol: {
    type: 'simple-marker',
    style: 'circle',
    color: 'red',
    size: 10,
    outline: {
      color: 'rgba(255, 255, 255, 0.5)'
      width: 4
    }
  },
  popupTemplate: {
    title: "My Awesome Graphic!",
    content: "{*}" // display all fields
  }
});
// add it to graphicsLayer
graphicsLayer.add(graphic);
```

---

## FeatureLayer

- Versatile and widely used in ArcGIS Platform
- Supports renderers
- Can be queried
- WebGL as default

---

## FeatureLayer

```javascript
// Create via URL
const featureLayer = new FeatureLayer({
  url: "http://services6.arcgis.com/m3L8QUZ93HeaQzKv/arcgis/rest/services/BeerAndBurgerJoints/FeatureServer/0"
});
// Create via a Portal item
const featureLayer = new FeatureLayer({
  portalItem: {
    id: "b126510e440744169943fd8ccc9b0c4e"
  }
});
```

---

## FeatureLayer - FeatureCollection

```javascript
const featureLayer = new FeatureLayer({
  objectIdField: "item_id",
  geometryType: "point",
  // Define the fields of the graphics in the FeatureLayer
  fields: [{
    name: "item_id",
    alias: "Item ID",
    type: "oid"
  }, {
    name: "description",
    alias: "Description",
    type: "string"
  }, {
    name: "title",
    alias: "Title",
    type: "string"
  }],
  // Define a renderer for the layer
  renderer: {
    type: "simple",
    symbol: {
      type: 'simple-marker',
      style: 'circle',
      color: 'red',
      size: 10,
      outline: {
        color: 'rgba(255, 255, 255, 0.5)'
        width: 4
      }
    }
  },
  popupTemplate: {
    title: "{title}",
    content: "{description}"
  },
  // This is a collection of Graphics
  source: [graphic1, graphic2, graphic3]
});
```

---

## FeatureLayer - Improved Performance

- WebGL and Optimized Fetching of Data

---

## FeatureLayer - Optimized Fetching of Data

![webgl tiles](./images/featurelayer-webgl-tiles.png)

---

## FeatureLayer - WebGL

- Combined with WebGL, _big boost in performance_
- Display hundres of thousands of features

---

<iframe height='600' scrolling='no' title='WebGL FeatureLayer' src='//codepen.io/odoe/embed/preview/zEOZKz/?height=600&theme-id=31222&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/zEOZKz/'>WebGL FeatureLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## CSVLayer

```js
const url = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv";
urlUtils.addProxyRule({
 urlPrefix: "earthquake.usgs.gov",
 proxyUrl: "/proxy/proxy.php"
});

const csvLayer = new CSVLayer({
 url: url,
 copyright: "USGS Earthquakes"
});
map.add(csvLayer);
```

---

<iframe height='600' scrolling='no' title='CSVLayer' src='//codepen.io/odoe/embed/preview/ZRKaJN/?height=600&theme-id=31222&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/ZRKaJN/'>CSVLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## GroupLayer

- Ability to organize layers
- Can customize layer visibility

---

## GroupLayer

<iframe height='600' scrolling='no' title='WatLayers' src='//codepen.io/odoe/embed/preview/JrdXqe/?height=300&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/JrdXqe/'>WatLayers</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## ImageryLayer

- For displaying Image Services
- Support for [pixel filtering](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-ImageryLayer.html#pixelFilter), [rendering rules](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-ImageryLayer.html#renderingRule), and [mosaic rules](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-ImageryLayer.html#mosaicRule)

---

## ImageryLayer - Simple

```js
const layer = new ImageryLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer",
  format: "jpgpng" // server exports in either jpg or png format
});
```

---

## ImageryLayer - Pixel Filter

```js
function colorize(pixelData) {
  if (pixelData === null || pixelData.pixelBlock === null ||
    pixelData.pixelBlock.pixels === null) {
    return;
  }
  // The pixelBlock stores the values of all pixels visible in the view
  pixelBlock = pixelData.pixelBlock;
  // Get the min and max values of the data in the current view
  minValue = pixelBlock.statistics[0].minValue;
  maxValue = pixelBlock.statistics[0].maxValue;
  // The pixels visible in the view
  const pixels = pixelBlock.pixels;
  // The number of pixels in the pixelBlock
  const numPixels = pixelBlock.width * pixelBlock.height;
  // Calculate the factor by which to determine the red and blue
  // values in the colorized version of the layer
  factor = 255.0 / (maxValue - minValue);
  // Get the pixels containing temperature values in the only band of the data
  const tempBand = pixels[0];
  // Create empty arrays for each of the RGB bands to set on the pixelBlock
  const rBand = [];
  const gBand = [];
  const bBand = [];
  // Loop through all the pixels in the view
  for (i = 0; i < numPixels; i++) {
    // Get the pixel value (the temperature) recorded at the pixel location
    const tempValue = tempBand[i];
    // Calculate the red value based on the factor
    const red = (tempValue - minValue) * factor;
    // Sets a color between blue (coldest) and red (warmest) in each band
    rBand[i] = red;
    gBand[i] = 0;
    bBand[i] = 255 - red;
  }
  // Set the new pixel values on the pixelBlock
  pixelData.pixelBlock.pixels = [rBand, gBand, bBand];
  pixelData.pixelBlock.pixelType = "U8"; // U8 is used for color
}
```

---

## ImageryLayer - Mosaic Rule & Rendering Function

```js
const rf = new RasterFunction({
  functionName: "None" // let's us access temperature value per pixel
});

const dimInfo = []; // Define dimensional definition as array

// Multidimensional information of image service can be viewed at thisService/multiDimensionalInfo
// DEPTH: show only temperatures at sea surface
dimInfo.push(new DimensionalDefinition({
  variableName: "water_temp",
  dimensionName: "StdZ", // Water depth
  values: [0], // Sea surface or 0ft
  isSlice: true
}));
// TIME: only show temperatures for the week of April 7, 2014
dimInfo.push(new DimensionalDefinition({
  variableName: "water_temp",
  dimensionName: "StdTime", // time temp was recorded
  values: [1396828800000], // Week of April 7, 2014
  isSlice: true
}));

const mr = new MosaicRule({
  multidimensionalDefinition: dimInfo
});
```

---

## ImageryLayer - Put it together

```js
const layer = new ImageryLayer({
  url: url,
  renderingRule: rf,
  pixelFilter: colorize,
  mosaicRule: mr,
  // The popup will display the temperature at the clicked location
  popupTemplate: {
    title: "Sea Surface Temperature",
    content: "{Raster.ServicePixelValue}° Celsius"
  }
});
```

---

## MapImageLayer

- Display layers and sublayers from Map Services
- Map Service can export map image given a bounding box
- Simplified API for dynamic layer infos
  - sublayers

---

## MapImageLayer

```javascript
const layer = new MapImageLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
  sublayers: [
  {
    id: 0,
    visible: true
  },
  {
    id: 1,
    visible: true
  },
  {
    id: 2,
    visible: true,
    definitionExpression: "pop2000 > 1000000"
  },
  {
    id: 3,
    visible: false
  }]
});
```

---

## MapImageLayer

<iframe height='600' scrolling='no' title='4.5 - MapImageLayer' src='//codepen.io/odoe/embed/preview/eGVeWY/?height=300&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/eGVeWY/'>4.5 - MapImageLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## MapImageLayer

- Increibly powerful and flexible
- Simplified API makes it easy to use
- Fast for large datasets

---

## TileLayer

- For _cached_ map services
- Faster than `MapImageLayer`
- Not dynamic

---

## TileLayer

```js
const transportationLyr = new TileLayer({
  url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer",
  id: "streets",
  visible: false
});
```

---

## WebTileLayer

- For use with _non-ArcGIS_ Server map tiles
- Define the `level`, `column`, and `row` for map tiles

---

## WebTileLayer

```js
const tiledLayer = new WebTileLayer({
  urlTemplate: "http://{subDomain}.tile.stamen.com/toner/{level}/{col}/{row}.png",
  subDomains: ["a", "b", "c", "d"],
  copyright: "Map tiles by <a href=\"http://stamen.com/\">Stamen Design</a>, " +
    "under <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a>. " +
    "Data by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>, " +
    "under <a href=\"http://creativecommons.org/licenses/by-sa/3.0\">CC BY SA</a>."
});
```

---

<iframe height='=600' scrolling='no' title='WebTileLayer' src='//codepen.io/odoe/embed/preview/boXKjP/?height=600&theme-id=31222&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/boXKjP/'>WebTileLayer</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## VectorTileLayer

- Similar to `WebTileLayer`, but with vector data, not raster data
- Served in `.pbf` format
- Three parts
  - tiles
  - style file
  - index file

---

## VectorTileLayer

- Style file contains URL info for tiles, sprites, and glyphs

```js
const vtlLayer = new VectorTileLayer({
  // URL to the style of vector tiles
  url: "https://www.arcgis.com/sharing/rest/content/items/bf79e422e9454565ae0cbe9553cf6471/resources/styles/root.json"
});
```

---

## LayerViews

- `LayerViews` renders the layers on the view.
- [LayerView](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-LayerView.html) has limited API so far.
- give info about layer rendering
 - 3.x: `Layer.suspended` now `LayerView.suspended` 
- will give access to data displayed on the screen
 - Features
 - Elevation data
- ability to override properties from the layer
 - visibility
 - renderer
 - ...

---

## LayerViews

- access a layerview with [`View.whenLayerView()`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#whenLayerView) 

```js
  const map = new Map({
    basemap: 'topo'
  });
  const mapView = new MapView({
    map: map,
    container: 'mapDiv'
  });

  const layer = new FeatureLayer(...)
  map.add(layer);

  view.whenLayerView(layer)
    .then(layerView => {
      layerView.visible = false
    });
```
- or [`View.allLayerViews`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#allLayerViews) 

---

## LayerViews

- FeatureLayer and LayerViews can be queried
- `featureLayer.queryFeatures()` - query features on the service
- `featureLayerView.queryFeatures()` - query features displayed in the view

---

## LayerViews

```js
view.whenLayerView(fLayer)
.then(function(layerView) {
  const query = new Query();
  query.geometry = view.extent;
  layerView.queryFeatures(q).then(features => {
    // do something with features
  });
});
```

---

<!-- .slide: class="section" -->

## [Query LayerView - Exercise](https://codepen.io/odoe/pen/KXYrQx?editors=0010)

## [Query LayerView - Solution](https://codepen.io/odoe/pen/vJdVpQ?editors=0010)

---

<!-- .slide: class="section" -->

# Widgets and UI

---

## Widgets

- [Out of the box widgets at 4.x](https://developers.arcgis.com/javascript/latest/sample-code/get-started-widgets/index.html):
 - A lot of widgets!
- New design and user experience

---

## Widgets

- Extensibility through:
 - [CSS](https://developers.arcgis.com/javascript/latest/sample-code/styling-simple-theme/index.html), [matching vectortiles](https://ycabon.github.io/presentations/2016-devsummit-discover-4.0-the-next-generation/demos/css-vectortiles/index.html)
 - SASS
 - View Model

---

## Widgets - View Model

- New architecture
- Logic of the widget separated from the representation
- View implementations made in dijit/Accessor
- Views' source code available in the [SDK](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Zoom.html)
- View's can be rewritten in [any framework](demos/widgets/framework/index.html)
- ViewModels can be combined to create [Frankenwidgets](demos/widgets/frankenwidget/index.html)

---

## Drawing and Editing

- Not simply porting 3.x editing tools
- Integrate GeometryEngine
- Create brand new user experience

---

## Sketch ViewModel

<iframe height='600' scrolling='no' title='Sketch' src='//codepen.io/odoe/embed/preview/boJVZx/?height=600&theme-id=31222&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/boJVZx/'>Sketch</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Self-Intersecting Lines

<iframe height='600' scrolling='no' title='Self-Intersecting Line' src='//codepen.io/odoe/embed/preview/GMLpaQ/?height=600&theme-id=31222&default-tab=js,result&embed-version=2&editable=true' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/GMLpaQ/'>Self-Intersecting Line</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## Measure While Drawing

<iframe height='600' scrolling='no' title='Measure While Drawing' src='//codepen.io/odoe/embed/preview/NamGZE/?height=600&theme-id=31222&default-tab=js,result&embed-version=2&editable=true' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/NamGZE/'>Measure While Drawing</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## UI

- Managed overlay to place widgets over the view.
- Well known widgets can be directly added or removed from the view
- Popups are responsive

```js
const view = new MapView({

  ui: {

    padding: {
      top: 16,
      left: 16,
      right: 16,
      bottom: 16
    },

    components: ["zoom", "compass", "attribution"]

  }

});
```

---

## UI

- API to add widgets or any DOM element to the 4 corners of the view

```js
const view = new MapView({
  //...
});

const legend = new Legend({
  //...
});

view.ui.add(legend, "top-left");
```

---

## Popups

- First entry point to detailed data

```js
// basic popup
const featureLayer = new FeatureLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3",
  outFields: ["*"],
  popupTemplate: {
    title: "Name: {STATE_NAME}",
    // bad habit, be more specific
    // to be more performant
    content: "{*}"
  }
});
```

---

## Popups - Fields and Aliases

- First entry point to detailed data

```js
content: [
  {
    type: "fields",
    fieldInfos: [
      {
        fieldName: "POP2000",
        visible: true,
        label: "Population for year 2000",
        format: {
          places: 0,
          digitSeparator: true
        }
      },
      {
        fieldName: "POP2007",
        visible: true,
        label: "Population for year 2007",
        format: {
          places: 0,
          digitSeparator: true
        }
      }  
    ]
  }
]
```

---

## Popups - Fields and Aliases

- Format dates

```js
{
  fieldName: "FAKEDATE",
  visible: true,
  label: "Fake Date Field",
  format: {
    dateFormat: "short-date"
  }
}
```

---

## Popups - Fields and Aliases

- Custom content

```js
const featureLayer = new FeatureLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/2",
  outFields: ["*"],
  popupTemplate: {
    title: "Name: {STATE_NAME}",
    content: `
      <section>
        <h4>{STATE_ABBR}</h4>
        <hr />
        <ul>
          <li>Year 2000 Pop: {POP2000}</li>
          <li>Year 2007 Pop: {POP2007}</li>
          <li>Total Households: {HOUSEHOLDS}</li>
        </ul>
      </section>
    `
  }
});
```

---

## Popups - MediaInfos

- Charts

```js
{
  type: "media",
  mediaInfos: [
    {
      title: "<b>Population</b>",
      type: "column-chart",
      caption: "",
      value: {
        theme: "BlueDusk",
        fields: [ "POP2000", "POP2007" ]
      }
    }
  ]
}
```

---

## Popups - Custom actions

```js
// PopupTemplate
{
  title: '{Name}',
  content: '{*}',
  actions: [{
      id: 'alcohol-details',
      className: 'esri-icon-description',
      title: 'Events'
  }]
}
```

---

## Popups - Custom actions

```js
view.popup.viewModel.on("trigger-action", function(event) {
  const action = event.action;
  if (action.id === "customer-details") {
    const attributes = view.popup.viewModel.selectedFeature.attributes;
    const customerGroup = attributes.CUSTOMER_GROUP;
    esriRequest(customAPIURL, {
      query: {
        group: customerGroup
      },
      responseType: "json"
    })
    .then(function(response ) {
      // parse response data and update popup content
    })
    .otherwise(function() {
      console.log(error);
    });
  }
});
```
---

## Popups - Asynchronous

```js
  const countiesLayer = new FeatureLayer({
    ...
    popupTemplate: {
      title: "County of {NAME}",
      content() {
        return asynchronousMethod();
      }
    }
  });
```

---

<iframe height='600' scrolling='no' title='Popup Content with Promise' src='//codepen.io/odoe/embed/preview/yRvEMW/?height=600&theme-id=31222&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/yRvEMW/'>Popup Content with Promise</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

<!-- .slide: class="section" -->

# [Configure a Popup](https://developers.arcgis.com/labs/develop/javascript/configure-a-popup/)

---

<!-- .slide: class="section" -->

# Scenes

---

## WebScenes

- [Author and Publish Scenes in Pro](http://pro.arcgis.com/en/pro-app/help/mapping/map-authoring/author-a-web-scene.htm)
- Modify Publish Scenes in [SceneViewer](https://www.arcgis.com/home/webscene/viewer.html)

---

## WebScenes

```js
const scene = new WebScene({
  portalItem: {
    id: "082c4fd545104f159db39da11ea1e675"
  }
});

const view = new SceneView({
  map: scene,
  container: "viewDiv"
});
```

---

## SceneView

- Render Scenes
- [Camera](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html#camera)
- [Environment](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html#environment)

---

## Camera

- Specific location (x, y z)
- Pointed in a specific direction
- Tilted at a specific angle
- Specific field of view

---

## Camera

```js
const view = new SceneView({
  map,
  container: "viewDiv",
  camera: {
    position: [7.654, 45.919, 5183],
    tilt: 80
  }
});
// some point in your application, you can update the camera.
view.goTo({
  position: [7.654, 45.919, 7500],
  tilt: 65
});
```

---

## Environment

- defines light characteristics
- stars!

```js
sceneView.environment = {
  atmosphere: {
    quality: 'high'
  },

  starsEnabled: true,

  lighting: {
    directShadowsEnabled: true,
    ambientOcclusionEnabled: true,

    // The time and date for which
    // the sun position and light direction is computed.
    date: new Date("Mon Oct 15 2018")
  }
};
```

- [Sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=sceneview-stars)

---

<!-- .slide: class="section" -->

# [Create a 3D Scene with a Layer](https://developers.arcgis.com/labs/javascript/add-layers-to-a-3d-scene/)

---

<!-- .slide: class="section" -->

# Portal API

---

## Portal API

- [redesigned API](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html)
- access portal information: basemaps, featuring content
- query items, users, groups
- loading items like layers, webmap and webscene
- creating, deleting and updating items

---

## Portal API

```js
const portal = new Portal();

// Setting authMode to immediate signs the user in once loaded
portal.authMode = 'immediate';

// Once loaded, user is signed in
portal.load()
  .then(() => {
    // Create query parameters for the portal search
    const queryParams = new PortalQueryParams({
      query: 'owner:' + portal.user.username,
      sortField: 'numViews',
      sortOrder: 'desc',
      num: 20
    });

    // Query the items based on the queryParams created from portal above
    portal.queryItems(queryParams).then(createGallery);
  });
```

- [demo](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/sandbox.html?sample=portalitem-dragndrop)

---

## Portal API

```js
const promise = Layer.fromPortalItem({
  portalItem: {
    id: '8444e275037549c1acab02d2626daaee',
    portal: {
      url: 'https://myorg.maps.argis.com'
    }
  }
})
.then(layer => {
  // Adds the layer to the map once it loads
  map.add(layer);
})
.otherwise(error => {
  //handle the error
});
```

- [Sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/sandbox.html?sample=layers-portal)

---

<!-- .slide: class="section" -->

# Visualizations

---

## Basic Visualizations

- `SimpleRenderer` for basic visualizations

```js
const citiesRenderer = {
  type: "simple",
  symbol: {
    type: "simple",
    size: 10,
    color: "#FF4000",
    outline: {
      color: [255, 64, 0, 0.4],
      width: 7
    }
  })
};
```

---

- Unique Values

<iframe height='600' scrolling='no' title='unique-values' src='https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=visualization-location-types' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

- Class Breaks

<iframe height='600' scrolling='no' title='class-breaks' src='https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=visualization-classbreaks' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

- SmartMapping Class Breaks

<iframe height='600' scrolling='no' title='smartmapping-class-breaks' src='https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=visualization-sm-classbreaks' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

- SmartMapping Relationship

<iframe height='600' scrolling='no' title='smartmapping-relationship' src='https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=visualization-sm-relationship' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

- Arcade

<iframe height='600' scrolling='no' title='arcade' src='https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=visualization-arcade' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>

---

<!-- .slide: class="section" -->

# [Style a FeatureLayer](https://developers.arcgis.com/labs/develop/javascript/style-a-feature-layer/)

---

<!-- .slide: class="section" -->

# Summary

---

<!-- .slide: class="questions" -->

## Questions?

---


<!-- .slide: class="end" -->
