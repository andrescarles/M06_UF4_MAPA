//MAPA
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.transform([2.1589900, 41.3887900], 'EPSG:4326', 'EPSG:3857'),
        zoom: 13
    })
});


//POPUP
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});
map.addOverlay(overlay);

closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};




function punto() {
    //CLEAN LAYERS
    map.getLayers().forEach(function(layer) {
        if (layer instanceof ol.layer.Vector) {
            map.removeLayer(layer);
        }
    });

    //VARIABLES MAPS
    var nombre = document.getElementById("nombre").value;
    var latitud = parseFloat(document.getElementById("latitud").value);
    var longitud = parseFloat(document.getElementById("longitud").value);
    //MARCADOR
    var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([latitud, longitud]))
                })
            ]
        })
    });
    map.addLayer(layer);
    //MOSTRAR POPUP CON INFORMACION
    map.on('singleclick', function(event) {
        if (map.hasFeatureAtPixel(event.pixel) === true) {
            var coordinate = event.coordinate;
            content.innerHTML = `<b> ${nombre}</b>`;
            overlay.setPosition(coordinate);
        } else {
            overlay.setPosition(undefined);
            closer.blur();
        }
    });
}