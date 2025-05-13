$(document).ready(function() {
  $('input:checkbox').change(function() {
    if ($(this).is(':checked')) {
      //store the Amenity ID in a variable
      const amenities = [];
      let amenity_id = $(this).attr('data-name');
      amenities.push(amenity_id);
      $('.amenities h4').append(...amenities);
    } else {
      //remove the Amenity ID from the variable
      const index = amenities.indexOf(amenity_id);
      amenities.slice(index, 1);
    }
  });
});
