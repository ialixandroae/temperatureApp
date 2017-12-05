define([
    "dojo/_base/declare",
    "./getPicture"
], function(
    declare,
    getPicture
) {
    var temperature = {
        getTemperature: function(cityParam) {

            //Create getPicture object
            const picture = getPicture;

            var queryURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + cityParam + "%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

            $.getJSON(queryURL, function(data) {

                var results = data.query.results;
                var firstResult = results.channel.item.condition;
                

                var temp = firstResult.temp
                var text = firstResult.text
                var tempDate = results.channel.item.pubDate
                

                const date = `<p id="date">${tempDate}</p>`;
                const temperatureText = `<p id="tempText">The temperature in ${cityParam} is </p>`;
                const temperatureValue = `${temp}° C`;
                $('.col').empty();
                $('.col').append('<p id="title">CLICK THE MAP TO CHECK THE WEATHER</p>');
                $('.col').append('<br>');
                $('.col').append(temperatureText);
                $('.col').append('<br>');
                $('.col').append(`<p id="tempValue">${temperatureValue}</p>`)
                $('.col').append('<br>');
                $('.col').append(date);
                picture.getPicture(cityParam);
            });
        }
    }
    return temperature;
});