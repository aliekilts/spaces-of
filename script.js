// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map', {
  center: [40.692380, -73.950943],
  zoom: 14
  
});

L.tileLayer('https://api.mapbox.com/styles/v1/aliekilts/cjnvyullm3sz62sn0dkd0qb17/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWxpZWtpbHRzIiwiYSI6ImNqbnZ4aHQ0ajBlN2MzcmtnNmpxdGR3Y3oifQ.-chMOMhxGcQ4mN0yORcBGA', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'default_public',
  username: 'alisonkilts'
});

// Initialze source data
var commentsource = new carto.source.Dataset('soa_comments');

// Create style for the data
var commentstyle = new carto.style.CartoCSS(`
  #layer {
  marker-width: 10;
  marker-fill: #ffe400;
  marker-fill-opacity: 1;
  marker-allow-overlap: true;
  marker-line-width: 0;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}

`);

// Add style to the data
var commentlayer = new carto.layer.Layer(commentsource, commentstyle);

// Add the data to the map as a layer
client.addLayer(commentlayer);



// Initialze source data
var source = new carto.source.Dataset('avoided_areas');

// Create style for the data
var style = new carto.style.CartoCSS(`
  #layer {
    polygon-fill: #FF6347;
  }
`);

// Add style to the data
var layer = new carto.layer.Layer(source, style);

// Add the data to the map as a layer
client.addLayer(layer);



// Initialze source data
var redlinesource = new carto.source.Dataset('avoided_routes');

// Create style for the data
var redlinestyle = new carto.style.CartoCSS(`
  #layer {
    line-color: #FF6347;
    line-width: 3;
  }
`);

// Add style to the data
var redlinelayer = new carto.layer.Layer(redlinesource, redlinestyle);

// Add the data to the map as a layer
client.addLayer(redlinelayer);



// Initialze source data
var greenlinesource = new carto.source.Dataset('biked_routes');

// Create style for the data
var greenlinestyle = new carto.style.CartoCSS(`
  #layer {
    line-color: #18ae07;
    line-width: 3;
  }
`);

// Add style to the data
var greenlinelayer = new carto.layer.Layer(greenlinesource, greenlinestyle);

// Add the data to the map as a layer
client.addLayer(greenlinelayer);



// Initialze source data
var bluelinesource = new carto.source.Dataset('walked_routes');

// Create style for the data
var bluelinestyle = new carto.style.CartoCSS(`
  #layer {
    line-color: #139cd7;
    line-width: 3;
  }
`);

// Add style to the data
var bluelinelayer = new carto.layer.Layer(bluelinesource, bluelinestyle);

// Add the data to the map as a layer
client.addLayer(bluelinelayer);

client.getLeafletLayer().addTo(map);



/*
 * Listen for changes on the layer picker
 */

// Step 1: Find the checkbox by class. If you are using a different class, change this.
var element = document.querySelector('.comments-checkbox');

// Step 2: Add an event listener to the checkbox. We will run some code whenever the button is clicked.
element.addEventListener('change', function (e) {
  // Sometimes it helps to log messages, here we log to let us know the button was clicked. You can see this if you open developer tools and look at the console.
  console.log('Comments was clicked', e.target.checked);
  
  if (e.target.checked) {
    source.setQuery("SELECT * FROM soa_comments");
  }
});