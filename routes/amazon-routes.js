amazon = require('amazon-affiliate-api');
var db = require("../models");

var search = amazon.createClient({
    awsId: "AKIAI6WBUE3QV3KGDEAA",
    awsSecret: "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",
    awsTag: "mobilead0046f-20"
});


// search.itemSearch({


//     //keyword will come from the user input, will change to the class/id when ready

//     keywords: product,
//     responseGroup: 'ItemAttributes,Images'
// }).then(function (results) {
//     console.log("---------------")

//     if (results.Items.Item.length > 10) {
//         var items = $("<div>")

//         for (var i = 0; i < 11; i++) {
//             console.log("Product Name: " + results.Items.Item[i].ItemAttributes.Title);
//             console.log("Product Type: " + results.Items.Item[i].ItemAttributes.ProductTypeName);
//             console.log("Amazon Link: " + results.Items.Item[i].DetailPageURL);
//             console.log("ASIN #: " + results.Items.Item[i].ASIN);
//             console.log("Image: " + results.Items.Item[i].LargeImage.URL);
//             console.log("---------------")

//             $(items).append("Product Name: " + results.Items.Item[i].ItemAttributes.Title)
//             $(items).append("Product Type: " + results.Items.Item[i].ItemAttributes.ProductTypeName)
//             $(items).append("Amazon Link: " + results.Items.Item[i].DetailPageURL)
//             $(items).append("ASIN #: " + results.Items.Item[i].ASIN)
//             $(items).append("Image: <img src='" + results.Items.Item[i].LargeImage.URL + "'/>")

//             //id will be changed to the search result div id
//             $(".results").append(items);
//         };
//     }
//     else {

//         var items = $("<div>")

//         for (var i = 0; i < results.Items.Item.length; i++) {
//             console.log("Product Name: " + results.Items.Item[i].ItemAttributes.Title);
//             console.log("Product Type: " + results.Items.Item[i].ItemAttributes.ProductTypeName);
//             console.log("Amazon Link: " + results.Items.Item[i].DetailPageURL);
//             console.log("ASIN #: " + results.Items.Item[i].ASIN);
//             console.log("Image: " + results.Items.Item[i].LargeImage.URL);
//             console.log("---------------")

//             $(items).append("Product Name: " + results.Items.Item[i].ItemAttributes.Title)
//             $(items).append("Product Type: " + results.Items.Item[i].ItemAttributes.ProductTypeName)
//             $(items).append("Amazon Link: " + results.Items.Item[i].DetailPageURL)
//             $(items).append("ASIN #: " + results.Items.Item[i].ASIN)
//             $(items).append("Image: <img src='" + results.Items.Item[i].LargeImage.URL + "'/>") 

//             //id will be changed to the search result div id
//             $(".results").append(items);
//         };

//     }


// }).catch(function (err) {
//     console.log(err);
// });

module.exports = function(app) {
    app.post("/api/search", function(req, res) {
        
        console.log(req.body.name);
        var keyword = req.body.name;
        
        search.itemSearch({
            
            //keyword will come from the user input, will change to the class/id when ready                
            keywords: keyword,
            responseGroup: 'ItemAttributes,Images'
        }).then(function (results) {
            console.log("---------------")
            res.json(results);
            
        }).catch(function (err) {
            console.log(err);
        });    
    });

    app.post("/api/list/:id/", function(req, res){
        console.log("list/id", req.params.id);        

        db.List.create({
            title: req.body.title,
            description: req.body.description,
            UserId: req.params.id
        }).then(function(req2) {
           
            console.log(req2.dataValues.id)
            res.json(req2.dataValues.id);
        })

        
    })

    app.post("/api/item/:name/", function(req, res){
        console.log(req.params.name); 
        console.log(req.body);

        db.Item.create({
            asin: req.body.asin,
            name: req.body.name,
            url: req.body.url,
            image: req.body.image,
            ListId: req.body.ListId
        })
        res.send(req.body.asin)
    })

    app.delete("/api/item/:name", function(req, res) {
        db.Item.destroy({
          where: {
            name: req.params.name
          }
        }).then(function(dbItem) {
          res.json(dbItem);
        });
      });

      app.get("/api/view", function(req, res) {
        db.Item.findAll({}).then(function(dbItem) {
          res.json(dbItem);
        });
      });

}



//module.exports = search;
