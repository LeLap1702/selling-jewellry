const apiUrl = "https://61bc10dad8542f001782454a.mockapi.io/products"

async function getData(apiUrl) {
    return await fetch(apiUrl).then(res => res.json())
}

async function getProducts(id, apiUrl) {
    let data = await getData(apiUrl)

    for (const datum of data) {
        if (id === datum.id) {
            return datum
        }
    }
}

async function renderCart() {
    let idUser = localStorage.getItem('accountId')
    let userApi = `https://61bc10dad8542f001782454a.mockapi.io/accounts/${idUser}/userInfo/${idUser}`
    let user = await getData(userApi)
    let father = document.getElementById('tt')
    if (idUser == 0 || user.cart.length == 0) {
        var empty = `
                    <div id="empty_cart"> 
                    <img src="../assets/images/empty-cart.png">
                    <p id="emptyText">Your cart is empty!</p>
                    </div>
                    `;
        father.innerHTML = empty;
        return;

    }
    father.innerHTML = "";
    let total = 0;
    for (const datum of user.cart) {
        let product = await getData(apiUrl + '/' + datum.idItem)
        total += (datum.amount * product.price);
        let html =
            `
             <tr id="${datum.id}test">
                        <td class="imgProCart_details">
                            <img src="${product.images[0]}" alt="">
                        </td>
                        <td class="infProCart_details">
                            <p>
                                ${product.name}

                            </p>
                        </td>
                        <td class="quantity">
                            <input type="number" min="1" max="10" value="${datum.amount}" disabled>
                        </td>
                        <td class="pricePro_details">${product.price}$</td>
                        <td class="calculateTotal">
                            Into Money <br>
                            <br>
                            <i onclick="delFromCart(this.id)" id="${datum.id}" class="far fa-trash-alt"></i>
                        </td>
                    </tr>
            `
        father.innerHTML += html

    }
    document.getElementById('total').innerHTML = total + "$";

}

async function delFromCart(idItemInCart) {
    let idUser = localStorage.getItem('accountId')
    document.getElementById(idItemInCart + 'test').style.display = "none"
    let userApi = `https://61bc10dad8542f001782454a.mockapi.io/accounts/${idUser}/userInfo/${idUser}`
    let user = await getData(userApi)
    user.cart.splice(user.cart.findIndex(arr => arr.id === parseInt(idItemInCart)), 1)
    await operationOnFetch(userApi, 'PUT', user)
}

// async function updateAmountProduct(idItemInCarta) {
//     let idItemInCart = idItemInCarta.substring(7)
//     let idUser = localStorage.getItem("key") //get from local storage
//     let userApi = `https://61bc10dad8542f001782454a.mockapi.io/accounts/${idUser}/userInfo/${idUser}`
//     let user = await getData(userApi)
//     let indexItemInCart = user.cart.findIndex(arr => arr.id === parseInt(idItemInCart))
//     user.cart[indexItemInCart].amount = parseInt(newAmount)
//     await operationOnFetch(userApi,'PUT', user)
//
// }


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

function goPayment() {
    window.location.assign("payment.html");
}


renderCart()