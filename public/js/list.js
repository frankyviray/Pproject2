


$(document).on("load", function() {
    
    $.get("/api/view", function(data) {
        console.log(data);

        //area where the list will be displayed
        $("#list").empty();

        var listDiv = $("<div>")

        for (var i = 0; i < data.length; i++) {

            $(items).append("Product Name: " + data[i].name)
            $(items).append("Amazon Link: " + data[i].url)
            $(items).append("ASIN #: " + data[i].asin)
            $(items).append("Image: <img src='" + data[i].image + "'/>")

            $("#list").append(listDiv);
        }        
    })
})

$("#delete").on("click", )