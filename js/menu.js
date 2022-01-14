var URL_API = "https://61bc10dad8542f001782454a.mockapi.io/";
var tblProducts = "products";
var tblAccounts = "accounts";
var tblBills = "bills";

var accounts = [];
var products = [];


function callAPI(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${URL_API}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}


// Check radio input
function check() {
    var radios = document.getElementsByName('choosePrice');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            var val = radios[i].value;
        }
    }
    showThroughPriceFilter(val);
}

// Create single product card 
function data(images, name, price, id) {
    return `
    <div class="card"> 
    <div class="image-top"> <img src="${images[0]}"> </div>
    <div class="product-name">${name}</div>
    <div class="product-price">${price} </div>
    <button type="button" class="viewDetail" onclick="viewDetail(${id})">View details</button>
    </div>
    `;

}

function showAllType() {
    display();
    callAPI(tblProducts, "GET", null).then((res) => {
        products = res.data;
        var htmlf = "";
        for (let i = 0; i < products.length; i++) {
            var html = data(products[i].images, products[i].name, products[i].price, products[i].id);
            htmlf += html;
        }
        document.getElementById("displayProducts").innerHTML = htmlf;
        document.getElementById('titleCatogory').innerHTML = "All products";
    })
}

function showThroughType(type) {
    callAPI(tblProducts, "GET", null).then((res) => {
        products = res.data;
        var htmlf = "";
        var check = 0;
        for (let i = 0; i < products.length; i++) {
            if (products[i].type == type) {
                var html = data(products[i].images, products[i].name, products[i].price, products[i].id);
                check = 1;
                htmlf += html;
            }
        }
        if (check == 0) {
            htmlf = `<p class = "nothing">Sorry, this category is currently sold out! Please come back next time <3 </p>`;
            // Display when the category don't have any item.
        }
        document.getElementById("displayProducts").innerHTML = htmlf;
    })
}

// Show thought the price filter
function showThroughPriceFilter(price) {
    callAPI(tblProducts, "GET", null).then((res) => {
        products = res.data;
        var htmlf = "";
        var list = price.split("-");
        list.push('999999999');
        for (let i = 0; i < products.length; i++) {
            if (products[i].price >= parseFloat(list[0]) && products[i].price <= parseFloat(list[1])) {
                var html = data(products[i].images, products[i].name, products[i].price, products[i].id);
                htmlf += html;
            }

        }

        document.getElementById("displayProducts").innerHTML = htmlf;
        document.getElementById("titleCatogory").innerHTML = "All products";
        document.getElementById("categoryTittle").innerHTML = "All products";
    })
}


// Display products tile and indexing when click  
function display() {
    var list = document.querySelectorAll('.categoryItem');
    list.forEach((e) => {
        e.addEventListener('click', function() {
            var name = e.getAttribute("value");
            document.getElementById("titleCatogory").innerHTML = name;
            document.getElementById('categoryTittle').innerHTML = name;
            showThroughType(name.toLowerCase());
        })
    })
}


// Get data when click add to card
function viewDetail(id) {
    localStorage.setItem("indexTemp", JSON.stringify(id));
    window.location.assign("../html/productDetail.html");
}

showAllType();