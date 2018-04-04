

$(document).on("click", ".searchBtn",function () {
event.preventDefault();
    var product = {
        name: $("#searchBar").val().trim()
    }

    $.post("api/search", product, function (data) {
        console.log(data)
    }).then(function (results) {
        console.log(results);

        if (results.Items.Item.length > 10) {
                    var items = $("<div>")
            
                    for (var i = 0; i < 11; i++) {
                        console.log("Product Name: " + results.Items.Item[i].ItemAttributes.Title);
                        console.log("Amazon Link: " + results.Items.Item[i].DetailPageURL);
                        console.log("ASIN #: " + results.Items.Item[i].ASIN);
                        console.log("Image: " + results.Items.Item[i].LargeImage.URL);
                        console.log("---------------")
            
                        $(items).append("<tr><td><img class='responsive-img' src='" + results.Items.Item[i].MediumImage.URL + "'/></td>")
                        $(items).append("<td>" + results.Items.Item[i].ItemAttributes.Title + "</td>")
                        // $(items).append("<td> ASIN #: " + results.Items.Item[i].ASIN + "</td>")
                        $(items).append("<a class='btn-floating btn-large waves-effect waves-light red modal-action modal-close' id='add' data-asin='" + results.Items.Item[i].ASIN + 
                        "' data-name='" + results.Items.Item[i].ItemAttributes.Title + 
                        "' data-url='" + results.Items.Item[i].DetailPageURL +
                        "' data-image='" + results.Items.Item[i].LargeImage.URL +
                        "'><i class='material-icons'>add</i></a></tr>")
            
                        //id will be changed to the search result div id
                        $(".results").append(items);
                    };
                }
                else {

                    
                    // var items = $("<tbody>")
            
                    // for (var i = 0; i < results.Items.Item.length; i++) {
                    //     console.log("Product Name: " + results.Items.Item[i].ItemAttributes.Title);
                    //     console.log("Amazon Link: " + results.Items.Item[i].DetailPageURL);
                    //     console.log("ASIN #: " + results.Items.Item[i].ASIN);
                    //     console.log("Image: " + results.Items.Item[i].LargeImage.URL);
                    //     console.log("---------------")
            
                    //     $(items).append("<tr><td> <img class='responsive-img' src='" + results.Items.Item[i].MediumImage.URL + "'/></td>")
                    //     $(items).append("<td>" + results.Items.Item[i].ItemAttributes.Title + "</td>")
                    //     // $(items).append("<td> ASIN #: " + results.Items.Item[i].ASIN + "</td>")
                    //     $(items).append("<a class='btn-floating btn-large waves-effect waves-light red modal-action modal-close' id='add' data-asin='" + results.Items.Item[i].ASIN + 
                    //     "' data-name='" + results.Items.Item[i].ItemAttributes.Title + 
                    //     "' data-url='" + results.Items.Item[i].DetailPageURL +
                    //     "' data-image='" + results.Items.Item[i].LargeImage.URL +
                    //     "'><i class='material-icons'>add</i></a></tr>")
            
                    //     //id will be changed to the search result div id
                    //     $(".results").append(items);
                    // };
                    var resultHtml = "";

                    for (var i = 0; i < results.Items.Item.length; i++) {
                        resultHtml += "<tr>";
                        resultHtml += "<td> <img class='responsive-img image-result' src='" + results.Items.Item[i].MediumImage.URL + "'/></td>";
                        resultHtml += "<td id='title-result'>" + results.Items.Item[i].ItemAttributes.Title + "</td>";
                        resultHtml += "<td><a class='modal-action modal-close btn-floating btn-small waves-effect waves-light cyan' id='add' data-asin='" + results.Items.Item[i].ASIN + 
                        "' data-name='" + results.Items.Item[i].ItemAttributes.Title + 
                        "' data-url='" + results.Items.Item[i].DetailPageURL +
                        "' data-image='" + results.Items.Item[i].LargeImage.URL +
                        "'><i class='material-icons'>add</i></a></td>";
                        resultHtml += "</tr>";
                        
                    };
                    console.log(resultHtml);
                    $(".results").append(resultHtml);
                }
    }
    )

});




var cart = [];
var listId;
var number = 1;

$(document).on("click", "#add", function() {
    $(".results").empty();
    var newItem = {
        asin: $(this).data("asin"),
        name: $(this).data("name"),
        image: $(this).data("image"),
        url: $(this).data("url"),
        ListId: listId
    }
    $(".addItem").append("<p id='added-header'>Product # " + number + ":</p>");
    $(".addItem").append("<p id='added-title'>" + newItem.name + "</p>");
    $(".addItem").append('<div class="added-desc input-field col s12"><textarea id="textarea1" class="materialize-textarea"></textarea><label for="textarea1">Product #' + number + ' Description</label></div>');

    number ++;

    console.log(newItem);

    $.post("/api/item/" + newItem.ListId, newItem).then(function(data){
        console.log("this is add " + data)
    })

    
})


$(document).on("click", "#create", function() {
    var id = window.localStorage.getItem("profileID");
    var total = {
        title: $("#title").val().trim(),
        description: $("#textarea1").val().trim()

    }
    $(".title").html("<p id='title-header'>Title:</p>");
    $(".title").append("<p id='user-title'>" + total.title + "</p>");
    $(".description").html("<p id='desc-header'>Description:</p>");
    $(".description").append("<p id='user-desc'>" + total.description + "</p>");
    $("#product-search").empty();
    $("#product-search").html("<div class='input-field col s6'><input id='searchBar' type='text' class='validate'><label for='searchBar'>Product Search</label></div>");
    $("#product-search").append("<div data-target='modal1' class='btn modal-trigger searchBtn cyan'>Search</div>")




    $.post("/api/list/" + id, total).then(function(data){
        console.log("this is create " + data)
        listId = data;
    })

})


