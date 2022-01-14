const URL_API = "https://61bc10dad8542f001782454a.mockapi.io/";
const tblProducts = "products";
const tblAccounts = "accounts";
const tblBills = "bills";

var products = [];

var current = new Date();
var day = current.getDate();
var month = current.getMonth();
var year = current.getFullYear();
var time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
current = `${day}/${month + 1}/${year}`;


function callAPI(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${URL_API}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

function create() {

    var createBtn = document.getElementById('create');
    var formField = document.getElementsByClassName('allForm')[0];
    createBtn.onclick = function() {
        formField.style.display = "block"
    }
}

function show() {
    callAPI(tblProducts, "GET", null).then((res) => {
        products = res.data;
        // console.log(products);
        var htmlf = "";
        for (let i = 0; i < products.length; i++) {
            var html = `
            <tr>
            <td >${products[i].id}</td>
            <td >${products[i].type}</td>
            <td>${products[i].name}</td>
            <td class="priceProductsShow">${products[i].price}</td>
            <td><img class="images" src="${products[i].images[0]}"></td>
            <td> <button type="button"> <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="edit(${i})"> </i> </button></td>
            <td> <button type="button"> <i class="fa fa-trash-o" aria-hidden="true" onclick="deleted(${i})"></i> </button> </td> </tr>
            `;


            htmlf += html;
        }
        document.getElementById("products").innerHTML = htmlf;
    })
}

var id;

function add() {
    callAPI(tblProducts, "GET", null).then((res) => {
        products = res.data;

        id = products.length + 1;
        var name = document.getElementById("name").value;
        var price = document.getElementById("price").value;

        var getListUrl = document.getElementById('urlImage');
        var list = getListUrl.querySelectorAll('input');

        var image = [];
        for (let i = 0; i < 4; i++) {
            image.push(list[i].value);
            console.log(image);
        }
        var type = document.getElementById("type").value;

        console.log(image);
        if (name | price | image) {
            var aProduct = {
                name: name,
                images: image,
                price: price,
                id: id,
                type: type
            }

            callAPI(tblProducts, "POST", aProduct);
            // console.log(products.length);
            console.log("added!")
            show();
            reset();
        } else {
            reset();
        }
    })
}

function reset() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("type").value = "";
    var getListUrl = document.getElementById('urlImage');
    var list = getListUrl.querySelectorAll('input');
    for (let i = 0; i < 4; i++) {
        list[i].value = "";
    }
}

function deleted(index) {
    var cf = confirm("Are you sure?");
    if (cf == true) {
        callAPI(tblProducts, "GET", null).then((res) => {
            products = res.data;
            // console.log(products[index].id);
            callAPI(`${tblProducts}/${products[index].id}`, "DELETE", null).then((res) => {
                console.log("deleted!")
                show();
            }).catch((err) => {
                console.log(err);
            });
        })
    }

}

function edit(index) {
    callAPI(tblProducts, "GET", null).then((res) => {
        document.querySelector(".group-form-hide").style.display = "block";
        products = res.data;
        document.getElementById("nameedit").value = products[index].name;
        document.getElementById("priceedit").value = products[index].price;
        document.getElementById("typeedit").value = products[index].type;
        var getListUrl = document.getElementById('urlImageedit');
        var list = getListUrl.querySelectorAll('input');
        for (let i = 0; i < list.length; i++) {
            list[i].value = products[index].images[i];
        }

        document.getElementById("edit").innerHTML = `<button type="button" onclick="editcf(${index})">save</button>`;
        document.documentElement.scrollTop = 0;
    })
}

function editcf(index) {
    console.log(index);
    var name = document.getElementById("nameedit").value;
    var price = document.getElementById("priceedit").value;
    var type = document.getElementById("typeedit").value;
    var image = [];
    var getListUrl = document.getElementById('urlImageedit');
    var list = getListUrl.querySelectorAll('input');
    for (let i = 0; i < list.length; i++) {
        image.push(list[i].value);
    }

    if (name | price | image) {
        var aProduct = {
            name: name,
            images: image,
            price: price,
            type: type
        }
        console.log(products[index].id);
        callAPI(`${tblProducts}/${products[index].id}`, "PUT", aProduct).then((res) => {
            resetEdit();
            show();
            console.log("edited!");
        })
    }
}

function resetEdit() {
    document.getElementById("priceedit").value = "";
    document.getElementById("nameedit").value = "";
    var getListUrl = document.getElementById('urlImageedit');
    var list = getListUrl.querySelectorAll('input');
    for (let i = 0; i < list.length; i++) {
        list[i].value = "";
    }

}

function manageClick() {
    var list = document.querySelectorAll('.manageClick');
    list[0].onclick = function() {
        document.getElementById('manageProducts').style.display = "none";
        document.getElementById('manageCustomer').style.display = "block";
        document.getElementById('manageBills').style.display = "none";
        document.getElementById('manageOrderDate').style.display = "none";
        document.getElementById('manageCustomerDetail').style.display = "none";
        showCustomers();
    }

    list[1].onclick = function() {
        create()
        reset();
        resetEdit();
        document.getElementById('manageCustomer').style.display = "none"
        document.getElementById('manageProducts').style.display = "block";
        document.getElementById('manageOrderDate').style.display = "none";
        document.getElementById('manageCustomerDetail').style.display = "none";
        document.getElementById('manageBills').style.display = "none";
        document.getElementsByClassName('allForm')[0].style.display = "none";
        show();

    }

    list[2].onclick = function() {
        document.getElementById('manageOrderDate').style.display = "none";
        document.getElementById('manageProducts').style.display = "none"
        document.getElementById('manageBills').style.display = "block";
        document.getElementById('manageCustomerDetail').style.display = "none";
        document.getElementById('manageCustomer').style.display = "none";
        showBills();
    }

    list[3].onclick = function() {
        document.getElementById('manageCustomer').style.display = "none"
        document.getElementById('manageOrderDate').style.display = "block";
        document.getElementById('manageProducts').style.display = "none";
        document.getElementById('manageCustomerDetail').style.display = "none";
        document.getElementById('manageBills').style.display = "none";
        showOrdersDay();

    }

}

function updateQuantity() {
    callAPI(tblProducts, "GET", null).then((res) => {
        products = res.data;
        document.getElementById('qty-pro').innerHTML = products.length;
    })
    callAPI(tblAccounts, "GET", null).then((res) => {
        var accounts = res.data;
        document.getElementById('qty-cus').innerHTML = accounts.length;
    })
    callAPI(tblBills, "GET", null).then((res) => {
        var bills = res.data;
        document.getElementById('qty-bill').innerHTML = bills.length;
    })
    callAPI(tblBills, "GET", null).then((res) => {
        var bills = res.data;
        var qtyOrderDay = 0;
        for (let aBill of bills) {
            if (aBill.productInfo.date.date == current) {
                qtyOrderDay += 1;
            }
        }
        document.getElementById("qty-order-day").innerHTML = qtyOrderDay;
    })
}


// back to top button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    var btn = document.getElementById("backTop");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showCustomers() {
    callAPI(tblAccounts, "GET", null).then((res) => {
        var accounts = res.data
        var customerField = document.getElementById('customers');
        var htmlf = "";
        var numerical = 0;
        for (let i = 0; i < accounts.length; i++) {
            numerical += 1;
            var html = `
            <tr>
                <td>${numerical}</td>
                <td>${accounts[i].userName}</td>
                <td>${accounts[i].phone}</td>
                <td>${accounts[i].email}</td>
                <td><button class="moreDetail" type="button" onclick = "detailCustomer(${accounts[i].id})"><ion-icon name="file-tray-stacked-outline"></ion-icon> More detail</button></td>
            </tr>
            `;
            htmlf += html;
        }
        customerField.innerHTML = htmlf;
    })
}


function detailCustomer(id) {
    callAPI(tblBills, "GET", null).then((res) => {
        var bills = res.data;
        callAPI(tblProducts, "GET", null).then((res) => {
            var products = res.data;
            var numerical = 0;
            var html = "";
            for (let i = 0; i < bills.length; i++) {
                var totalPrice = 0;
                if (bills[i].accountId == id) {
                    numerical += 1;
                    var htmlCart = "";
                    var num = 0
                    for (let z = 0; z < bills[i].productInfo.cart.length; z++) {
                        for (let j = 0; j < products.length; j++) {
                            if (products[j].id == bills[i].productInfo.cart[z].idItem) {
                                totalPrice += bills[i].productInfo.cart[z].amount * products[j].price;
                                num += 1
                                htmlCart += `
                                <tr>
                                    <td>${num}</td>
                                    <td>${products[j].name}</td>
                                    <td>${bills[i].productInfo.cart[z].amount}</td>
                                    <td>$${products[j].price * bills[i].productInfo.cart[z].amount}</td>
                                </tr>
                                `;
                            }
                        }
                    }
                    html += `
                    <tr>
                        <td>${numerical}</td>
                        <td>${bills[i].accountId}</td>
                        <td>${bills[i].productInfo.fullName}</td>
                        <td><table>
                            <thead>
                                <tr>
                                    <th>Numerical</th>
                                    <th>Name product</th>
                                    <th>Quantity product</th>
                                    <th>Total price</th>
                                </tr>
                            </thead> 
                            <tbody>${htmlCart}</tbody>   
                        </table></td>
                        <td>$${totalPrice}</td>
                        <td>${bills[i].productInfo.address.addressDetailed} - ${bills[i].productInfo.address.commune} - ${bills[i].productInfo.address.district} - ${bills[i].productInfo.address.province}</td>
                    </tr>`;
                }
            }

            document.getElementById('customersDetail').innerHTML = html;
        })
    })
    document.getElementById('manageCustomerDetail').style.display = "block";
    document.getElementById('manageCustomer').style.display = "none";
}

function showBills() { //====================================================
    callAPI(tblBills, "GET", null).then((res) => {
        var bills = res.data;
        var billField = document.getElementById('bills');
        callAPI(tblProducts, "GET", null).then((res) => {
            var products = res.data;
            var htmlf = "";
            var numerical = 0;
            for (let i = 0; i < bills.length; i++) {
                var totalPrice = 0;
                for (let x = 0; x < bills[i].productInfo.cart.length; x++) {
                    for (let z = 0; z < products.length; z++) {
                        if (products[z].id == bills[i].productInfo.cart[x].idItem) {
                            totalPrice += products[z].price * bills[i].productInfo.cart[x].amount;
                        }
                    }
                }
                numerical += 1;
                var html = `
                            <tr>
                                <td>${numerical}</td>
                                <td>${bills[i].id}</td>
                                <td>${bills[i].productInfo.date.time} - ${bills[i].productInfo.date.date}</td>
                                <td>${bills[i].productInfo.fullName}</td>
                                <td>$${totalPrice}</td>
                                <td>${bills[i].productInfo.shipmentFee}</td>
                                <td>${bills[i].productInfo.address.addressDetailed} - ${bills[i].productInfo.address.commune} - ${bills[i].productInfo.address.district} - ${bills[i].productInfo.address.province}</td>
                                <td><button class="btnViewDetail" onclick="orderDetail(${bills[i].id})"><ion-icon name="information-circle-outline"></ion-icon></button></td>
                            </tr>
                            `
                htmlf += html;

            }
            billField.innerHTML = htmlf;
        })
    })
}

function orderDetail(id) {
    openSeeOrderDetail()
    callAPI(tblProducts, "GET", null).then((res) => {
        var products = res.data;
        callAPI(tblBills, "GET", null).then((res) => {
            var bills = res.data;

            for (let i = 0; i < bills.length; i++) {
                if (bills[i].id == id) {
                    var html = "";
                    var numerical = 0;
                    for (let itemCart of bills[i].productInfo.cart) {
                        numerical += 1;
                        for (let j = 0; j < products.length; j++) {
                            if (itemCart.idItem == products[j].id) {
                                html += `
                                <tr>
                                    <td>${numerical}</td>
                                    <td>${products[j].name}</td>
                                    <td>${itemCart.amount}</td>
                                    <td>$${products[j].price }</td>
                                    <td class="imageSeeOrderDetail"><img class="imageVisible" src="${products[j].images[0]}"><img class="imageInvisible animate" src="${products[j].images[0]}"></td>
                                </tr>`;
                                break;
                            }
                        }
                    }
                    document.getElementById('displaySeeOrder').innerHTML = html;
                }
            }
        })
    })
}

function openSeeOrderDetail() {
    var modal = document.getElementById('seeOrderDetail');
    var closeModal = document.getElementById('closeSeeOrderDetail');
    modal.style.display = "block";
    closeModal.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


function showOrdersDay() { //=========================================+++++++++++++++
    callAPI(tblBills, "GET", null).then((res) => {
        var bills = res.data;
        callAPI(tblProducts, "GET", null).then((res) => {
            var htmlf = "";
            var numerical = 0;
            for (let aBill of bills) {
                if (aBill.productInfo.date.date == current) {
                    var products = res.data;
                    var total = 0;
                    for (let i = 0; i < aBill.productInfo.cart.length; i++) {
                        for (let pro of products) {
                            if (pro.id == aBill.productInfo.cart[i].idItem) {
                                total += pro.price * aBill.productInfo.cart[i].amount;
                            }
                        }
                    }
                    numerical += 1;
                    var html = `
                    <tr>
                        <td>${numerical}</td>
                        <td>${aBill.id}</td>
                        <td>${aBill.productInfo.fullName}</td>
                        <td>${aBill.productInfo.phone}</td>
                        <td>${aBill.productInfo.email}</td>
                        <td>${aBill.productInfo.date.time} - ${aBill.productInfo.date.date}</td>
                        <td>$${total}</td>
                    </tr>`

                    htmlf += html;
                }

            }
            document.getElementById("orderDate").innerHTML = htmlf
        })
    })
}
updateQuantity();
manageClick();