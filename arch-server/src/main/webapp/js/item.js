(function poll() {
    $.ajax({
        url: "/item",
        type: "GET",
        ifModified: true,
        success: function(item) {
            //console.log(data);
            if(item != null)
            {
				if(item.approach != null)
				{
					$('#approach').text(item.approach)
				}

				if(item.leave != null)
				{
					$('#leave').text(item.leave)
				}

				if(item.data != null)
				{
					$('#data').empty()
					for (var i = 0; i < item.data.length; i++)
					{
						$('#data').append('<div>').append(item.data[i]).append('</div>');
                    }
				}

				if(item.height != null)
				{
					$('#data').append('<div>').append(item.height).append('</div>');
				}

				if(window.location.pathname.endsWith(item.direction +".html"))
				{
					if(item.state == "approaching" || item.state == "engagement")
					{
	                    $('#approach').css('opacity', '1');
				        $('#leave').css('opacity', '0');
	                    $('#data').css('opacity', '0');
					}
					else
					{
	                    $('#approach').css('opacity', '0');
			            $('#leave').css('opacity', '0');
	                    $('#data').css('opacity', '0');
					}
				}
				else if(item.state == "under")
                {
                   	$('#approach').css('opacity', '0');
                    $('#leave').css('opacity', '1');
                    $('#data').css('opacity', '1');
                }
                else
                {
                	$('#approach').css('opacity', '0');
                    $('#leave').css('opacity', '0');
                	$('#data').css('opacity', '0');
				}
			}
        },
        dataType: "json",
        complete: setTimeout(function() {poll()}, 100),
        timeout: 200
    });
})();

$(document).keypress(function(e)
{
    switch(e.which) {
        case 122:
            $('#approach').css('opacity', '0');
            $('#leave').css('opacity', '0');
            $('#data').css('opacity', '0');
            break;

        case 120:
            $('#approach').css('opacity', '1');
            $('#leave').css('opacity', '0');
            $('#data').css('opacity', '0');
            break;

        case 99:
            $('#approach').css('opacity', '0');
            $('#leave').css('opacity', '1');
            $('#data').css('opacity', '1');
            break;
        }
    });
