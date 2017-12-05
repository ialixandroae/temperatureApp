require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/VectorTileLayer",
        "esri/Basemap",
        "esri/widgets/Search",
        "app/getTemperature",
        "app/getLocation",
        "dojo/on",
        "dojo/dom",
        "dojo/domReady!"
    ],
    function(Map, MapView, VectorTileLayer, Basemap, Search,
        getTemperature, getLocation, on, dom) {

        //Creare obiect temperature
        const temperatureObj = getTemperature;

        //Creare obiect locatie
        const location = getLocation;

        //Create Search widget
        var searchWidget = new Search({
            view: mapView,
            popupEnabled: true,
            popupOpenOnSelect: true
        });

        //Creare obiect Item pentru basemap
        const vtlItem = new VectorTileLayer({
            url: "http://www.arcgis.com/sharing/rest/content/items/2557730096db4d2fa3e64980d431c29e/resources/styles/root.json?f=pjson"
        });

        //Creare obiect basemap
        const vectorBasemap = new Basemap({
            baseLayers: [vtlItem],
            title: "Custom Basemap",
            id: "myBasemap"
        });

        // Creare obiect map/harta
        var map = new Map({
            basemap: vectorBasemap
        });

        // Creare view harta si definire proprietati
        var mapView = new MapView({
            container: "map", // Reference to the scene div created in step 5
            map: map, // Reference to the map object created before the scene
            zoom: 8, // Sets zoom level based on level of detail (LOD)
            center: [26.10, 44.44], // Sets center point of view using longitude,latitude
            constraints: {
                rotationEnabled: false
            }
        });

        mapView.ui.add(searchWidget, {
            position: "top-left",
            index: 0,
        });

        searchWidget.on("select-result", function(event) {
            var searchLocation = event["result"]["feature"];
            var searchRes = event["result"]["feature"]["attributes"]["Match_addr"];
            // console.log(searchLocation);
            var lat = searchLocation["geometry"]["latitude"].toFixed(3);
            var long = searchLocation["geometry"]["longitude"].toFixed(3);

            mapView.goTo(searchLocation);

            mapView.popup.dockOptions = {
                // Disable the dock button so users cannot undock the popup
                buttonEnabled: false
            };
            mapView.popup.open({
                title: "Coordinates: [" + String(long) + ", " + String(lat) + "]",
                content: searchRes,
                location: searchLocation["geometry"]
            });
            temperatureObj.getTemperature(searchRes);
        });

        temperatureObj.getTemperature("Bucharest");
        location.getLocation(mapView, searchWidget);
    });