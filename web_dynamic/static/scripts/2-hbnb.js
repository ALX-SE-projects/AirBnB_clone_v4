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
});
