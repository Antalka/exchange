// List Of avaible currency
var listOfCountries = [
    {
        name : "Euro",
        currency : "EUR",
        sign: "€"
    },
    {
        name : "Australian Dollar",
        currency : "AUD",
        sign: "$"
    },
    {
        name : "Bulgarian Lev",
        currency : "BGN",
        sign: "лв"
    },
    {
        name : "Brazilian Real",
        currency : "BRL",
        sign: "R$"
    },
    {
        name : "Canadian Dollar",
        currency : "CAD",
        sign: "$"
    },
    {
        name : "Chinese Yuan",
        currency : "CNY",
        sign: "¥"
    },
    {
        name : "Croatian Kuna",
        currency : "HRK",
        sign: "kn"
    },
    {
        name : "Czech Koruna",
        currency : "CZK",
        sign: "Kč"
    },
    {
        name : "Danish Krone",
        currency : "DKK",
        sign: "kr"
    },
    {
        name : "British Pound",
        currency : "GBP",
        sign: "£"
    },
    {
        name : "Hong Kong Dollar",
        currency : "HKD",
        sign: "$"
    },
    {
        name : "Hungarian Forint",
        currency : "HUF",
        sign: "Ft"
    },
    {
        name : "Indian Rupee",
        currency : "INR",
        sign: "₹"
    },
    {
        name : "Indonesian Rupiah",
        currency : "IDR",
        sign: "Rp"
    },
    {
        name : "Israeli Shekel",
        currency : "ILS",
        sign: "₪"
    },
    {
        name : "Japanese Yen",
        currency : "JPY",
        sign: "¥"
    },
    {
        name : "Malaysian Ringgit",
        currency : "MYR",
        sign: "RM"
    },
    {
        name : "Mexican Peso",
        currency : "MXN",
        sign: "$"
    },
    {
        name : "New Zealand Dollar",
        currency : "NZD",
        sign: "$"
    },
    {
        name : "Norwegian Krone",
        currency : "NOK",
        sign: "Kr"
    },
    {
        name : "Polish Zloty",
        currency : "PLN",
        sign: "zł"
    },
    {
        name : "Romanian Leu",
        currency : "RON",
        sign: "lei"
    },
    {
        name : "Russian Ruble",
        currency : "RUB",
        sign: "₽"
    },
    {
        name : "Singapore Dollar",
        currency : "SGD",
        sign: "$"
    },
    {
        name : "South African Rand",
        currency : "ZAR",
        sign: "R"
    },
    {
        name : "South Korean Won",
        currency : "KRW",
        sign: "₩"
    },
    {
        name : "Swedish Krona",
        currency : "SEK",
        sign: "kr"
    },
    {
        name : "Swiss Franc",
        currency : "CHF",
        sign: "Fr"
    },
    {
        name : "Thai Baht",
        currency : "THB",
        sign: "฿"
    },
    {
        name : "Philippine Peso",
        currency : "PHP",
        sign: "₱"
    },
    {
        name : "Turkish Lira",
        currency : "TRY",
        sign: "₺"
    },
    {
        name : "American Dollar",
        currency : "USD",
        sign: "$"
    }
]

//FUNCTION TO LOAD A LIST WITH CURRENCY
function loadList() {
    $.each(listOfCountries, function(i, val ) {
        var j = val.currency;
        $(".list").append( '<a onclick="selectItem()"><div id = "'+j.toLowerCase()+'" class = "cardList"><div class = "flagList"><img src="images/'+j.toLowerCase()+'.svg"></img></div><div class = "details">'+ val.currency   +" - "+ val.name +'</div></div></a>')
    })
    $(".listMain").fadeIn("slow");
    $( "#rates" ).fadeTo( "slow" , 0);
    
}         

//FUNCTION TO ADD NEW CARDS AND HIDE THE LIST
function hideList(){
    i = 0;
    $(".selected").each(function(){
        $.ajax({
            url: 'http://api.exchangeratesapi.io/v1/' + endpoint + '?access_key=' + access_key +'&symbols='+this.id.toUpperCase()+'',
            dataType: 'jsonp',
            success: function(json) {
                
            $.each( json.rates, function( currencyName, val ) {
                origin = listOfCountries.find(x => x.currency === ''+currencyName+'').name;
                sign = listOfCountries.find(x => x.currency === ''+currencyName+'').sign;
                baseValue =  $("#base").val();
                // WITCH CURRENCY ARE SELECTED IT WILL BE ADDED TO THE CARD LIST
                $("#cards").append(
                    '<div id = "card'+currencyName+'" class = "card"><div class = "flag"><img src="images/'+currencyName.toLowerCase()+'.svg"></img></div><div class = "description">'+sign+' <input id = "valueChanged'+currencyName+'"  type="text"></input><span class = "desc">'+currencyName+' - '+origin+'</span><span class = "desc">1 '+json.base +'= <span id="multiplier'+i+'">'+val +"</span> <span id = 'currencyName"+i+"'>"+ currencyName+'</span></span></div><div class = "close"><a class = "deleteButton" onclick = "deleteElement()">X</a></div></div>');
                    $("#valueChanged"+currencyName).val(baseValue*val) ;
                });
                i++;     
            }
        })
    });
    // HIDEING THE BACKGROUND WHEN THE LIST IS SHOWN
    $(".listMain").fadeOut("slow", function(){
        $(".list").empty();
    });
    $( "#rates" ).fadeTo( "slow" , 1);

}

// SELECTING WITCH CURRENTY WILL BE ADDED
function selectItem() {
    $(".cardList").click(
        function(){
        $(this).addClass("selected");
    });
    $(".selected").click(
        function(){
        $(this).removeClass("selected");
    });
}

// DELETE A CARD FROM LISTED CARDS
function deleteElement() {
    $(".card").click(
        
        function(){
            $(this).addClass("removed");
            $(".removed").remove();
    });
}

// EVENT TO CHANGE VALUE WHEN A NEW CARD IS ADDED
function myChange() {
        baseValue =  $("#base").val();
        i=0;
    $(".description").each(function(){
        multiplier =  $("#multiplier"+i).text();;
        currencyName =  $("#currencyName"+i).text();
        i++;
        $("#valueChanged"+currencyName).val(baseValue*multiplier)
    })
}

// CLOSE THE CURRENCY LIST IS THE CLICK IS OUTSIDE
$(document).click((event) => {
    if (!$(event.target).closest('.listMain').length && $('.listMain').css('opacity') == '1') {
      hideList();
    }        
});