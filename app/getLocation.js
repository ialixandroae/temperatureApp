define([
    "dojo/_base/declare",
    "esri/tasks/Locator",
    "./getTemperature"
], function(
    declare,
    Locator,
    getTemperature
) {
    var location = {
        getLocation: function(view, searchWidget) {

            //Create getTemperature object
            const temp = getTemperature;

            var locatorTask = new Locator({
                url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
            });

            view.on("click", function(event) {
                view.popup.close();
                searchWidget.clear();
                event.stopPropagation(); // overwrite default click-for-popup behavior

                // Get the coordinates of the click on the view
                var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
                var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

                view.popup.dockOptions = {
                    // Disable the dock button so users cannot undock the popup
                    buttonEnabled: false
                };

                view.popup.open({
                    // Set the popup's title to the coordinates of the location
                    title: "Coordinates: [" + lon + ", " + lat + "]",
                    location: event.mapPoint // Set the location of the popup to the clicked location
                });

                // Display the popup
                // Execute a reverse geocode using the clicked location
                locatorTask.locationToAddress(event.mapPoint).then(function(
                    response) {
                    // If an address is successfully found, show it in the popup's content
                    view.popup.content = response.address;
                    temp.getTemperature(response.address);
                    // console.log(response.address)
                }).otherwise(function(err) {
                    // If the promise fails and no result is found, show a generic message
                    view.popup.content =
                        "No address was found for this location";
                });
            });
        }
    };
    return location;
});