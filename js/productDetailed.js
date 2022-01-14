const urlApiProduct = "https://61bc10dad8542f001782454a.mockapi.io/products";

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


async function operationOnFetch(urlApi, method, data = {}) {
    const response = await fetch(urlApi, {
        method: method, // just POST, PUT, DELETE, no GET
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function getData(urlApi) { // to GET
    return await fetch(urlApi).then(res => res.json())
}

async function getProducts(id, apiUrl) {
    let data = await getData(apiUrl)

    for (const datum of data) {
        if (id === datum.id) {
            return datum
        }
    }
}
async function renderProductImages(id, urlApiProduct) {
    let product = await getProducts(id, urlApiProduct)
    let html = document.querySelector('.u-product--detailed')
    html.innerHTML +=
        `<div class="u-product--detailed--left">
        <ul class="u-product__thumb-gallery">
            <li class="u-gallery__item demo cursor" style="background: url('${product.images[1]}') no-repeat center center; background-size: cover;" onclick="slide(this.style.background)"></li>
            <li class="u-gallery__item demo cursor" style="background: url('${product.images[0]}') no-repeat center center; background-size: cover;" onclick="slide(this.style.background)"></li>
            <li class="u-gallery__item demo cursor" style="background: url('${product.images[2]}') no-repeat center center; background-size: cover;" onclick="slide(this.style.background)"></li>
            <li class="u-gallery__item demo cursor" style="background: url('${product.images[3]}') no-repeat center center; background-size: cover;" onclick="slide(this.style.background)"></li>
        </ul>
        <div style="background: url('${product.images[0]}');    background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;" class="u-product__img-display">
        </div>
    </div>
    <div class="u-product--detailed--right">
        <h1 class="u-pdr__heading">
            ${product.name}
        </h1>
        <div class="uline"></div>
        <div class="u-pdr__price">
            ${product.price}$
        </div>
        <div class="uline"></div>
        <div class="u-pdr__control-amount">
            <button onclick="upDownAmount(-1)">-</button>
            <input id="u-amount" value="1" type="number">
            <button onclick="upDownAmount(1)" >+</button>
        </div>
        <div class="u-btns">
            <button class="u-add-to-cart btn--5 button-mat" onclick="addToCart(${id})">add to cart</button>
            <button class="u-buy-now btn--5 button-mat" onclick="buyNow(${id})">buy now</button>
        </div>
    </div>`

    var b = `${product.name}`
    document.getElementById('product__title').innerHTML = b

}

window.onload = async() => {
    var indexTemp = localStorage.getItem("indexTemp");
    var sigle = {
        confirm: "no"
    }
    localStorage.setItem("single", JSON.stringify(sigle))
    await renderProductImages(indexTemp, urlApiProduct);
    displayProducts(indexTemp, urlApiProduct);
}

function slide(back) {
    document.querySelector(".u-product__img-display").style.background = back
}

function upDownAmount(i) {
    let amount = document.getElementById('u-amount').value
    if (amount <= 1 && i < 0) {
        return
    }
    amount = parseInt(amount)
    amount += parseInt(i)
    document.getElementById('u-amount').value = amount
}

// function addToCart(idItem) {
//     let idUser = localStorage.getItem("accountId");
//     if (idUser == 0) {
//         alert("Please login before add to cart!");
//         return;
//     }
//     callAPI(`${tblAccounts}/${idUser}/userInfo/${idUser}`, "GET", null).then((res) => {
//         var userInfoArr = res.data;
//         console.log(userInfoArr)

//         for (let i = 0; i < userInfoArr.cart.length; i++) {
//             if (userInfoArr.cart[i].idItem == idItem) {
//                 alert("This product is already exists!");
//                 return;
//             }
//         }
//         var item = {
//             idItem: idItem,
//             amount: parseInt(document.getElementById("u-amount").value)
//         }
//         userInfoArr.cart.push(item)
//         callAPI(`${tblAccounts}/${idUser}/userInfo/${idUser}`, "PUT", userInfoArr);
//         alert("Added!")
//         loadProducts();
//     })
// }

async function addToCart(idItem) {
    let idUser = localStorage.getItem("accountId"); //get from local storage
    if (idUser == 0) {
        alert("You must login before!");
        return;
    }
    let userApi = `https://61bc10dad8542f001782454a.mockapi.io/accounts/${idUser}/userInfo/${idUser}`
    let user = await getData(userApi)
    for (let itemCart of user.cart) {
        if (itemCart.idItem == idItem) {
            alert("This product is already exists on your cart!")
            return;
        }
    }
    let itemInCart = {
        id: user.cart.length + 1,
        idItem: idItem,
        amount: parseInt(document.getElementById("u-amount").value)
    }
    user.cart.push(itemInCart)
    await operationOnFetch(userApi, 'PUT', user)
    alert("Added!")
    loadProducts();
}


// Buy now
function buyNow(id) {
    let idUser = localStorage.getItem("accountId"); //get from local storage
    if (idUser == 0) {
        alert("You must login before!");
        return;
    }
    var single = {
        id: id,
        amount: parseInt(document.getElementById("u-amount").value),
        confirm: "yes"
    }
    localStorage.setItem("single", JSON.stringify(single))
    window.location = "payment.html";
}


// Related products

async function displayProducts(id, apiUrl) {

    let product = await getProducts(id, apiUrl)
    var type = product.type;

    let data = await getData(apiUrl)
    var htmlf = "";
    for (const datum of data) {
        if (type === datum.type && datum.id != id) {
            var html = `
            <div class="card"> 
            <div class="image-top"> <img src="${datum.images[0]}"> </div>
            <div class="product-name">${datum.name}</div>
            <div class="product-price">${datum.price} </div>
            <button type="button" class="addToCard" onclick="viewDetail(${datum.id})">View details</button>
            </div>
            `;
            htmlf += html;
        }
    }
    document.getElementById('relatedProducts').innerHTML = htmlf;

}

function viewDetail(index) {
    localStorage.setItem("indexTemp", JSON.stringify(index));
    window.location.assign("productDetail.html");
}