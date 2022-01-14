var URL_API = "https://61bc10dad8542f001782454a.mockapi.io";
var tblProducts = "products";
var tblAccounts = "accounts";

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

function data(images, name, price, index) {
    return `
    <div class="card"> 
    <div class="image-home"> <img src="${images[0]}"> </div>
    <div class="product-name-home">${name}</div>
    <div class="product-price-home">${price} </div>
    <button type="button" class="addToCard" onclick="viewDetail(${index})">View details</button>
    </div>
    `;

}

function showNecklaceArrival() {
    callAPI(tblProducts, "GET", null).then((res) => {
        products = res.data;
        var htmlf = "";
        for (let i = 0; i < products.length; i++) {
            var html = data(products[i].images, products[i].name, products[i].price, products[i].id);
            htmlf += html;
            if (i == 3) {
                break;
            }
        }
        document.getElementById("displayPro1-left").innerHTML = htmlf;

    })
}
showNecklaceArrival();

function showRingArrival() {
    callAPI(tblProducts, "GET", null).then((res) => {
        products = res.data;
        var htmlf = "";
        for (let i = 39; i < products.length; i++) {
            var html = data(products[i].images, products[i].name, products[i].price, products[i].id);
            htmlf += html;
            if (i == 43) {
                break;
            }
        }
        document.getElementById("displayPro2-bottom").innerHTML = htmlf;

    })
}
showRingArrival();

// Hàm SEARCH
function dataSearch(images, name, id) {
    return `
    <div class="proSearch"> 
    <div class="image-search"> <img src="${images[0]}"> </div>
    <div class="name-search">${name}</div>
    <button class="searchViewDetail" onclick="viewDetail(${id})">View detail</button>
    </div>
    `;

}

function searchView() {
    callAPI(tblProducts, "GET", null).then((res) => {
        products = res.data;
        var listPro = "";
        for (let i = 0; i < products.length; i++) {
            var html = dataSearch(products[i].images, products[i].name, products[i].id);
            listPro += html;
        }
        document.getElementById("listSearchProName").innerHTML = listPro;

    })
}
searchView();

var input = document.getElementById("searchInput")

function searchPro(name) {
    callAPI(tblProducts, "GET", null).then((res) => {
        products = res.data;
        var htmlf = "";
        var check = 0;
        var enter = input.value.toUpperCase();
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.toUpperCase().includes(enter)) {
                var html = dataSearch(products[i].images, products[i].name, products[i].id);
                check = 1;
                htmlf += html;
            }

        }
        if (check == 0) {
            htmlf = `<p class = "hollow">Sorry, your search didn\'t match with our product! Please check your keywords <3 </p>`;
            // Display when the category don't have any item.
        }
        document.getElementById("userSearch").innerHTML = htmlf;
    })
}