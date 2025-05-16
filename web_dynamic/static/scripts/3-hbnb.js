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
      if (places.length === 0) {
        // no places to render
        $('<article></article>').appendTo('section.places');
        $('<div></div>').addClass('title_box').appendTo('article');
        $('<div>No places!</div>').appendTo('div.title_box');
      } else if (textStatus === 'success' && places.length > 0) {
        // loop through the response
        for (const place of places) {
          const new_article = $('<article></article>').appendTo($('section.places'));
          const new_div = $('<div></div>').addClass('title_box').appendTo(new_article);
          $(`<h2>${place.name}</h2>`).appendTo(new_div);
          $(`<div>${place.price_by_night}</div>`).addClass('price_by_night').appendTo(new_div);
          // create an info. div element
          const info_div = $('<div></div>').addClass('information').appendTo(new_article);
          const guest_div = $(`<div>${place.max_guest} Guest${place.max_guest > 1 ? 's': ''}</div>`).addClass('max_guest').appendTo(info_div);
          const room_div = $(`<div>${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's': ''}</div>`).addClass('number_rooms').appendTo(info_div);
          const bath_div = $(`<div>${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>`).addClass('number_bathrooms').appendTo(info_div);
        }
      } else {
        console.error('an error occured');
      }
    }
  });
});
