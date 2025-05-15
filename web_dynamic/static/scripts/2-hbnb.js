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
    url: 'http://localhost:5000/api/v1/status/',
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
