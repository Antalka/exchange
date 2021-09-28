// set endpoint and your access key
endpoint = 'latest'
access_key = '8688f02d310aab599ddc4782d5baf470';

// get the most recent exchange rates via the "latest" endpoint:
$(document).ready(function(){ 
        $.ajax({
           url: 'http://api.exchangeratesapi.io/v1/' + endpoint + '?access_key=' + access_key +'&symbols=EUR',
           dataType: 'jsonp',
            success: function(json) {

                //exchange rata data is stored in json.rates
                $.each( json.rates, function( i, val ) {
                    $("h2").empty();
                    $("h2").append(json.date);
                    //Append the card list with the base currency
                    $("#cards").append(
                        '<div id="baseCountry" class = "card"><div class = "flag"><img src="images/'+i.toLowerCase()+'.svg"></img></div><div class = "description">€ <input class= "changeListener" id = "base" onchange = "myChange()" type="text"></input><span class = "desc">EUR - Euro</span><span class = "desc">1 '+json.base +'= '+val +" "+ i+'</span></div></div>');
                  });  
            }
        }); 
});
