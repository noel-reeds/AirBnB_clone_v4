$(document).ready(function () {
  const amenities = {};
  $('input:checkbox').change(function () {
    const amenity_id = $(this).attr('data-id');
    const amenity_name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      // store the Amenity ID in a variable
      amenities[amenity_id] = amenity_name;
    } else {
      // remove the Amenity ID from the variable
      delete amenities[amenity_id];
    }
    const amenity_values = Object.values(amenities);
    $('.amenities h4').text(amenity_values.join(', '));
  });
});

$(document).ready(function () {
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/',
    dataType: 'json',
    success: function (res) {
      console.log(res.status);
      if (res.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
});

$(document).ready(function() {
  $.ajax({
    url: 'http://172.21.68.106:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function(places, textStatus) {
      // creates article tags in sections
      $('<article></article>').appendTo('section.places');
      $('<div></div>').addClass('title_box').appendTo('article');
      if (places.length === 0) {
        // no places to render
        $('<div>No places!</div>').appendTo('div.title_box');
      } else if (textStatus === 'success' && places.length > 0) {
        // loop through the response
        const place = places[0];
        $(`<h2>${place.name}</h2>`).appendTo($('.title_box'));
        $(`<div>${place.price_by_night}</div>`).addClass('price_by_night').appendTo($('.title_box'));
      } else {
        console.error('an error occured');
      }
    }
  });
});
