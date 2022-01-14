var URL_API = "https://61bc10dad8542f001782454a.mockapi.io/";
var tblAccounts = "accounts";
var tblUserInfo = "userInfo";
var tblBills = "bills";
var tblProducts = "products";

var accountId = localStorage.getItem("accountId");
var checkShipment = 1;
var shipmentFee = 2;

// const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var current = new Date();
var day = current.getDate();
var month = current.getMonth();
var year = current.getFullYear();
var time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
var date = `${day}/${month + 1}/${year}`;

current = {
    time: time,
    date: date
}



function callAPI(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${URL_API}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

// When the user doesn't login
function displayLogin() {
    if (accountId == 0) {
        window.location.assign("menu.html");
    } else {
        alert("You have already login!");
    }
}

// Payment method
function bank() {
    document.getElementById('infor').style.display = 'block';
    shipmentFee = 1;
    checkShipment = 0;
}

// Payment method
function remove() {
    document.getElementById('infor').style.display = 'none'
    checkShipment = 0;
}

function setUpEvents() {
    document.getElementById('billSection').style.display = "none"
    callAPI(tblAccounts, "GET", null).then((res) => {
        var accounts = res.data;

        if (accounts.length == 0) {
            console.log("no account")
            localStorage.setItem("accountId", JSON.stringify(0));
        } else {
            callAPI(`${tblAccounts}/${accountId}`, "GET", null).then((res) => {
                var accounts = res.data;
                document.getElementById("txtEmail").value = accounts.email;
                document.getElementById("txtPhone").value = accounts.phone;
            })
            callAPI(`${tblAccounts}/${accountId}/${tblUserInfo}/${accountId}`, "GET", null).then((res) => {
                var userInfoArr = res.data;

                if (userInfoArr.address.addressDetailed == undefined) {
                    document.getElementById('txtProvince').value = "";
                    document.getElementById('txtDistrict').value = "";
                    document.getElementById('txtCommune').value = "";
                    document.getElementById('txtAddressDetailed').value = "";
                    document.getElementById('txtFullname').value = ""
                } else {
                    document.getElementById('txtProvince').value = userInfoArr.address.province;
                    document.getElementById('txtDistrict').value = userInfoArr.address.district;
                    document.getElementById('txtCommune').value = userInfoArr.address.commune;
                    document.getElementById('txtAddressDetailed').value = userInfoArr.address.commune;
                    document.getElementById('txtFullname').value = userInfoArr.fullName;
                }

            })
        }
    })
}
// Every single load page
window.onload = setUpEvents();

// When click complete order
function setdata() {
    if (accountId == 0) {
        alert("Please login before purchasing!");
        return;
    }
    callAPI(`${tblAccounts}/${accountId}/${tblUserInfo}/${accountId}`, "GET", null).then((res) => {
        var userInfo = res.data;
        var fullName = document.getElementById("txtFullname").value;
        var email = document.getElementById("txtEmail").value;
        var phone = document.getElementById("txtPhone").value;
        var address = document.getElementById("txtAddressDetailed").value;
        var province = document.getElementById("txtProvince").value;
        var district = document.getElementById("txtDistrict").value;
        var commune = document.getElementById("txtCommune").value;
        var objAddress = {
            "addressDetailed": address,
            "province": province,
            "district": district,
            "commune": commune,
        }

        if (checkShipment == 1) {
            alert("Please choose the payment method!");
            return;
        }

        if (!commune || !fullName || !email || !phone || !address || !province || !district || !commune) {
            alert("Please fill out all information before purchasing!");
            return;
        }

        if (payMentBuyNow(fullName, phone, objAddress, current, email, shipmentFee, accountId)) {
            return;
        }

        var objUserInfo = {
            fullName: fullName,
            address: objAddress,
            cart: userInfo.cart,
        }
        callAPI(`${tblAccounts}/${accountId}/${tblUserInfo}/${accountId}`, "PUT", objUserInfo).then((res) => {
            console.log("Putted!");
        })

        postBill(fullName, phone, objAddress, current, email, shipmentFee, accountId, userInfo.cart);

    })
}


// Payment for buy now

function payMentBuyNow(fullName, phone, objAddress, current, email, shipmentFee, accountId) {
    var x = JSON.parse(localStorage.getItem("single"));
    var data = JSON.parse(JSON.stringify(x));

    if (data.confirm == "yes") {
        var aCart = [{
            idItem: data.id,
            amount: data.amount,
        }]
        postBill(fullName, phone, objAddress, current, email, shipmentFee, accountId, aCart);
        return true;
    } else {
        return false;
    }

}
// Show bill

function postBill(fullName, phone, address, date, email, shipmentFee, accountId, cart) {

    var anObjBill = {
        accountId: accountId,
        productInfo: {
            fullName: fullName,
            phone: phone,
            address: address,
            date: date,
            email: email,
            shipmentFee: shipmentFee,
            cart: cart
        }
    }
    callAPI(tblBills, "POST", anObjBill).then((res) => {
        showBill();
    })
}

function disabledInput() {
    document.getElementById("customerName").disabled = true;
    document.getElementById('customerPhoneNumber').disabled = true;
    document.getElementById('customerAddress').disabled = true;
    document.getElementById('orderDate').disabled = true;
}

function showBill() {
    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("billSection").style.display = "block";

    callAPI(tblBills, "GET", null).then((res) => {
        var bills = res.data;

        for (let i = bills.length - 1; i >= 0; i--) {
            if (bills[i].accountId == accountId) {
                document.getElementById('customerName').value = bills[i].productInfo.fullName;
                document.getElementById('customerPhoneNumber').value = bills[i].productInfo.phone;
                document.getElementById('customerAddress').value = bills[i].productInfo.address.addressDetailed + " - " +
                    bills[i].productInfo.address.province + " - " + bills[i].productInfo.address.district + " - " + bills[i].productInfo.address.commune;
                document.getElementById('orderDate').value = bills[i].productInfo.date.time + " - " + bills[i].productInfo.date.date;
                document.getElementById('displayShipmentFee').innerHTML = bills[i].productInfo.shipmentFee;
                disabledInput();
                console.log(bills[i].productInfo.cart)
                callAPI(tblProducts, "GET", null).then((res) => {
                    var products = res.data;
                    var htmlf = "";
                    var totalf = 0;

                    var x = JSON.parse(localStorage.getItem("single"));
                    var data = JSON.parse(JSON.stringify(x));

                    for (pro of products) {

                        if (data.confirm == "no") {
                            for (let itemCart = 0; itemCart < bills[i].productInfo.cart.length; itemCart++) {

                                if (pro.id == bills[i].productInfo.cart[itemCart].idItem) {
                                    var total = bills[i].productInfo.cart[itemCart].amount * pro.price;
                                    var html = `
                                    <tr>
                                        <th>${pro.id}</th>
                                        <th>${pro.name}</th>
                                        <th><img src = "${pro.images[0]}"</th>
                                        <th>$${pro.price}</th>
                                        <th>${bills[i].productInfo.cart[itemCart].amount}</th>
                                        <th>$${total}</th>
                                    </tr>
                                    `;
                                    htmlf += html;
                                    totalf += total
                                    break;
                                }
                            }
                        } else {
                            if (pro.id == data.id) {
                                var total = data.amount * pro.price;
                                var html = `
                                    <tr>
                                        <th>${data.id}</th>
                                        <th>${pro.name}</th>
                                        <th><img src = "${pro.images[0]}"</th>
                                        <th>$${pro.price}</th>
                                        <th>${data.amount}</th>
                                        <th>$${total}</th>
                                    </tr>
                                    `;
                                totalf += total;
                                htmlf += html;
                            }
                        }
                    }
                    document.getElementById('billProducts').innerHTML = htmlf;
                    document.getElementById('displayTotal').innerHTML = totalf
                    localStorage.setItem("totalPrice", totalf);
                })
                return;
            }
        }

    })
}

function end() {
    callAPI(`${tblAccounts}/${accountId}/userInfo/${accountId}`, "GET", null).then((res) => {
        var userInfo = res.data;
        userInfo.cart.length = 0;
        callAPI(`${tblAccounts}/${accountId}/userInfo/${accountId}`, "PUT", userInfo).then((res) => {
            senEmail();
            alert("Your order has been successfully placed!")
            document.getElementById('waitConfirm').style.display = "block";
            setTimeout(function() { window.location.assign("index.html") }, 5000)
        })
    })
}

function senEmail() {
    var totalPrice = localStorage.getItem("totalPrice");
    (function() {
        emailjs.init("user_QOzGxKzm9C6rZYG1jgLQH");
    })();

    callAPI(tblBills, "GET", null).then((res) => {
        var bills = res.data;
        var temPrams = {
            to_name: bills[bills.length - 1].productInfo.fullName,
            to_phone: bills[bills.length - 1].productInfo.phone,
            to_mail: bills[bills.length - 1].productInfo.email,
            address: bills[bills.length - 1].productInfo.address.addressDetailed + " - " +
                bills[bills.length - 1].productInfo.address.province + " - " +
                bills[bills.length - 1].productInfo.address.district + " - " +
                bills[bills.length - 1].productInfo.address.commune,
            shipment_fee: "$" + bills[bills.length - 1].productInfo.shipmentFee,
            order_date: bills[bills.length - 1].productInfo.date.time + " - " + bills[bills.length - 1].productInfo.date.date,
            total: "$" + totalPrice,
        };
        emailjs.send('service_oc749lp', 'template_ch3m28r', temPrams)
            .then(function(res) {
                console.log("success", res.status);
            })
    })
}