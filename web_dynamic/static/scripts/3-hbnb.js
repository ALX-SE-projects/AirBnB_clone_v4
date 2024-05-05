$(()=>{
    const amenities = {};
    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
        amenities[$(this).parent().data('id')] = $(this).parent().data('name');
        } else {
        delete amenities[$(this).parent().data('id')];
        }
        const names = Object.values(amenities).join(', ');
        $('.amenities h4').text("Amenities: " + names);
        if (names === '') {
        $('.amenities h4').html('&nbsp;');
        }
    }
    );

    $.getJSON("http://0.0.0.0:5001/api/v1/status/", (data)=>{
        if (data.status === "OK")
            $('div#api_status').addClass('available');
        else
            $('div#api_status').removeClass('available');
    });

    $.post({
		url: `${HOST}/api/v1/places_search`,
		data: JSON.stringify({}),
		headers: {
			"Content-Type": "application/json",
		},
		success: (data) => {
			data.forEach((place) =>
				$("section.places").append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
			</div>
			<div class="description">
			${place.description}
			</div>
				</article>`
				)
			);
		},
		dataType: "json",
	});
});
