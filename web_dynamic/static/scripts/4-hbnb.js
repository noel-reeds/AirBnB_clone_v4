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
    const selected_amenities = Object.values(amenities);
    $('.amenities h4').text(selected_amenities.join(', '));
    // filter places with amenities selected
    $('button').click(function() {
    $.ajax({
        url: 'http://172.21.68.106:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: '{}',
        success: function(places, textStatus) {
          // check if selected amenities are a subset of place's amenities
          // and populate places with selected amenities
          // but first, retrieve amenities tied to each place and compare
          for (const place of places) {
            $.ajax({
              url : `http://172.21.68.106:5001/api/v1/places/${place.id}/amenities`,
              type: 'GET',
              contentType: 'application/json',
              dataType: 'json',
              success: function(place_amenities, textStatus) {
                if (selected_amenities.every(amenity => place_amenities.includes(amenity))) {
                  //append place with selected amenities
            	  const article = $('<article></article>').appendTo($('section.places'));
          		  const title = $('<div></div>').addClass('title_box').appendTo(article);
                  $(`<h2>${place.name}</h2>`).appendTo(title);
                  $(`<div>${place.price_by_night}</div>`).addClass('price_by_night').appendTo(title);
                  // create an info. div element
                  const info = $('<div></div>').addClass('information').appendTo(article);
                  const guests = $(`<div>${place.max_guest} Guest${place.max_guest > 1 ? 's': ''}</div>`)
                    .addClass('max_guest')
            		.appendTo(info);
          	      const rooms = $(`<div>${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's': ''}</div>`)
            		.addClass('number_rooms')
            		.appendTo(info);
          		  const bathrooms = $(`<div>${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>`)
            		.addClass('number_bathrooms')
            		.appendTo(info);
          		  // create a user
          	  	  const uri = `http://172.21.68.106:5001/api/v1/users/${place.user_id}`;
          		  $.get(uri, function(users) {
            		const user = $(`<div><b>Owner: </b>${users.first_name} ${users.last_name}</div>`)
              	      .addClass('user')
              		  .appendTo(article);
            		const desc = $(`<div>${place.description}<div>`).addClass('description').appendTo(article);
                  });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.error(`Error loading amenities for place ${place.id}:`, textStatus, errorThrown);
            }
          });
          }
        }
        });
    });
  });
});

$(document).ready(function () {
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/',
    dataType: 'json',
    success: function (res) {
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
          const article = $('<article></article>').appendTo($('section.places'));
          const title = $('<div></div>').addClass('title_box').appendTo(article);
          $(`<h2>${place.name}</h2>`).appendTo(title);
          $(`<div>${place.price_by_night}</div>`).addClass('price_by_night').appendTo(title);
          // create an info. div element
          const info = $('<div></div>').addClass('information').appendTo(article);
          const guests = $(`<div>${place.max_guest} Guest${place.max_guest > 1 ? 's': ''}</div>`)
            .addClass('max_guest')
            .appendTo(info);
          const rooms = $(`<div>${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's': ''}</div>`)
            .addClass('number_rooms')
            .appendTo(info);
          const bathrooms = $(`<div>${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>`)
            .addClass('number_bathrooms')
            .appendTo(info);
          // create a user
          const uri = `http://172.21.68.106:5001/api/v1/users/${place.user_id}`;
          $.get(uri, function(users) {
            const user = $(`<div><b>Owner: </b>${users.first_name} ${users.last_name}</div>`)
              .addClass('user')
              .appendTo(article);
            const desc = $(`<div>${place.description}<div>`).addClass('description').appendTo(article);
          });
        }
      } else {
        console.error('an error occured');
      }
    }
  });
});
