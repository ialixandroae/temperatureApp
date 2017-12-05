define([
    "dojo/_base/declare"
], function(
    declare
) {
    var picture = {
        getPicture: function(location) {
            $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
                    tags: location,
                    tagmode: "any",
                    format: "json"
                },
                function(data) {
                    var rnd = Math.floor(Math.random() * data.items.length);

                    var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");

                    $('.col').css('background-image', "linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8)), url('" + image_src + "')");

                });
        }
    };
    return picture;
});
