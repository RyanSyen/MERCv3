const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyA0QL42AMqAczuQPxLzLY5yyZ40hfxBiT0',
    authDomain: 'fyp-my108-351404.firebaseapp.com',
    projectId: 'fyp-my108-351404'
  });
  
var db = firebase.firestore();

var products = [
    {
        "id": 1000,
        "logo": "discountedProducts/addidas-shoes/logo.png",
        "name": "ADDIDAS GAZE ZX",
        "description": "Built on the innovative spirit of the ZX design code, they have a full-length Boost midsole wrapped in translucent tooling. Suede overlays and reflective details accent the mesh upper for style that shines.",
        "image0": "discountedProducts/addidas-shoes/blue.png",
        "image1": "discountedProducts/addidas-shoes/transparent-bg/blue.png",
        "image2": "discountedProducts/addidas-shoes/transparent-bg/pink.png",
        "image3": "discountedProducts/addidas-shoes/transparent-bg/yellow.png",
        "oldPrice": 580,
        "discountedPrice": 399,
        "category": "shoes",
        "stock0": 10,
        "stock1": 15,
        "stock2": 12,
        "rating": 5,
        "sold": 49,
        "color0": "blue",
        "color1": "pink",
        "color2": "yellow",
        "type": "discounted"
    },{
        "id": 1001,
        "logo": "discountedProducts/jbl-headphones/logo.png",
        "name": "JBL TUNE 750BTNC",
        "description": "Built on the innovative spirit of the ZX design code, they have a full-length Boost midsole wrapped in translucent tooling. Suede overlays and reflective details accent the mesh upper for style that shines.",
        "image0": "discountedProducts/jbl-headphones/transparent-bg/jbl-black.png",
        "image1": "discountedProducts/jbl-headphones/transparent-bg/jbl-black.png",
        "image2": "discountedProducts/jbl-headphones/transparent-bg/jbl-blue.png",
        "image3": "discountedProducts/jbl-headphones/transparent-bg/jbl-white.png",
        "oldPrice": 400,
        "discountedPrice": 359,
        "category": "mobile",
        "stock0": 10,
        "stock1": 15,
        "stock2": 12,
        "rating": 5,
        "sold": 200,
        "color0": "black",
        "color1": "blue",
        "color2": "white",
        "type": "discounted"
    },{
        "id": 1002,
        "logo": "discountedProducts/samsung-s22/samsung.png",
        "name": "Galaxy S22 Ultra",
        "description": "Introducing Samsung Galaxy S22 Ultra 5G with a built-in S pen, Nightography camera, and longer battery life. The Samsung Galaxy S22 5G is powered by a Qualcomm SM8450 Snapdragon 8 Gen 1 (4 nm) CPU processor with 8GB RAM, 128GB ROM.",
        "image0": "discountedProducts/samsung-s22/burgundy.png",
        "image1": "discountedProducts/samsung-s22/burgundy.png",
        "image2": "discountedProducts/samsung-s22/green.png",
        "image3": "discountedProducts/samsung-s22/white.png",
        "oldPrice": 5099,
        "discountedPrice": 4890,
        "category": "mobile",
        "stock0": 10,
        "stock1": 15,
        "stock2": 12,
        "rating": 5,
        "sold": 175,
        "variant0": "128 GB | 8 GB",
        "price0": "4890",
        "variant1": "256 GB | 12 GB",
        "price1": "5290",
        "variant2": "512 GB | 12 GB",
        "price2": "5690",
        "color0": "burgundy",
        "color1": "green",
        "color2": "white",
        "type": "discounted"
    }
]

products.forEach(function(obj) {
    db.collection("products").add({
        id: obj.id,
        name: obj.name,
        description: obj.description,
        price: obj.price,
        type: obj.type
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});