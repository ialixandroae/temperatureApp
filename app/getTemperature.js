define(['dojo/_base/declare', './getPicture'], function (declare, getPicture) {
  var temperature = {
    getTemperature: function (cityParam, lat, long) {
      //Create getPicture object
      const picture = getPicture;
      var queryURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m`;

      $.getJSON(queryURL, function (data) {
        var temp = data['current']['temperature_2m'];
        var tempDate = data['current']['time'].split('T')[0];

        const date = `<p id="date">${tempDate}</p>`;
        const temperatureText = `<p id="tempText">The temperature in ${cityParam} is </p>`;
        const temperatureValue = `${temp}° C`;
        $('.col').empty();
        $('.col').append(
          '<p id="title">CLICK THE MAP TO CHECK THE WEATHER</p>'
        );
        $('.col').append('<br>');
        $('.col').append(temperatureText);
        $('.col').append('<br>');
        $('.col').append(`<p id="tempValue">${temperatureValue}</p>`);
        $('.col').append('<br>');
        $('.col').append(date);
        picture.getPicture(cityParam);
      });
    },
  };
  return temperature;
});
