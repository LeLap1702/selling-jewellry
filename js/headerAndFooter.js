var URL_API = "https://61bc10dad8542f001782454a.mockapi.io/";

var tblAccounts = "accounts";
var tblProducts = "products";
var tblBills = "bills";

function callAPI(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${URL_API}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

document.getElementById('headerSection').innerHTML = `
<div class="menu">
<nav class="nav_menu">
    <a href="/"><img class="logo" src="../assets/images/img/logo1.png" alt="logo"></a>
    <div><ul class="main_menu">
            <li><a href="index.html"><b>home</b></a></li>
            <li><a href=""><b>about us</b></a></li>
            <li><a href=""><b>new arrivals</b></a></li>
            <li>
                <a href="menu.html"><b>products</b> <i class="fas fa-angle-down">   </i></a>
                <ul class="sub_menu">
                    <li><a href="">necklace</a></li>
                    <li><a href="">bracelet</a></li>
                    <li><a href="">anklet</a></li>
                    <li><a href="">ring</a></li>
                    <li><a href="">earring</a></li>
                </ul>
            </li>
            <li><a href=""><b>size chart</b></a></li>
            <li>
                <a href=""><b>contact</b> <i class="fas fa-angle-down"></i></a>
                <ul class="sub_menu">
                    <li><a href="">store</a></li>
                    <li><a href="">facebook</a></li>
                    <li><a href="">instagram</a></li>
                </ul>
            </li>
        </ul>
    </div>                
   <div class="icon_menu">
<button type="button" id="userBtn" onclick="disPlayUserOption()"> <i class="bi bi-person"></i>
<ul class="sub_user_option">
<div id="before_login" >
    <li  onclick="displayLoginModal()"><ion-icon name="log-in-outline"></ion-icon>Login / Sign up</li>
</div>
<div id="after_login">
    <li onclick = "history()"><ion-icon name="time-outline"></ion-icon>History</li>
    <li onclick="logout()"><ion-icon name="log-out-outline"></ion-icon>Log out</li>
</div>
</ul>
</button>
<label for="nav_input" class="search_btn"><i id="bi1" class="bi bi-search"></i></label> 
<button> <label onclick="loadProducts()" for="nav_cart"><i class="bi bi-cart2"></i></label></button>
</div>
<!-- Login modal -->
        <div id="loginContainer" class="loginContainer">
            <div class="loginBody animate">
                <div class="loginTitle">
                    <h2>Login Form</h2>
                    <button id="closeLogin">&times;</button>
                </div>
                <div class="loginContent">
                    <div class="group-button-modal">
                        <button id="loginButton">Login</button>
                        <button id="signupButton">Sign up</button>
                    </div>

                    <div id="loginDepartment">
                        <form class="loginForm">
                        
                            <div class="group-input-login">
                            <label for="checkboxAdmin">Login as Admin <input type="checkbox" id="checkboxAdmin"></label> 
                            
                            </div>
                            <div class="group-input-login">
                                <label for="userName">User name</label>
                                <input type="text" id="usesrName" placeholder="User name">
                            </div>
                            <div class="invalid" id="invalidUserLog">

                            </div>
                            <div class="group-input-login">
                                <label for="passWord">PassWord</label>
                                <input type="password" id="passWord" placeholder="Password">
                                <button type="button" id="see" onclick="seePassword('see','passWord')">
                                <ion-icon name="eye-outline"></ion-icon>
                            </button>
                            </div>
                            <div class="invalid" id="invalidPwdLog">

                            </div>
                        </form>
                        <div id="forgot">
                            <a href="#forgot" onclick="fogot()">Forgot password?</a>
                        </div>
                        <button id="loginAdd" type="button" onclick="login()">Login</button>
                    </div>
                    <div id="signUpDepartment">
                        <div class="group-input-signup">
                            <label for="email">Email</label>
                            <input type="email" id="email" placeholder="Email">
                        </div>
                        <div class="invalid" id="invalidEmail">

                        </div>

                        <div class="group-input-signup">
                            <label for="phoneNumber">Phone number</label>
                            <input type="phone" id="phoneNumber" placeholder="Phone number">
                        </div>
                        <div class="invalid" id="invalidPhoneSign">

                        </div>
                        <div class="group-input-signup">
                            <label for="userNameSignUp">User name</label>
                            <input type="text" id="userNameSignUp" placeholder="User name">
                        </div>
                        <div class="invalid" id="invalidUserSign">

                        </div>
                        <div class="group-input-signup">
                            <label for="pwdSignup">Password</label>
                            <input type="password" id="pwdSignup" placeholder="Password">
                            <button type="button" id="seeSignUp" onclick="seePassword('seeSignUp','pwdSignup')">
                                <ion-icon name="eye-outline"></ion-icon>
                            </button>
                        </div>
                        <div class="invalid" id="invalidPwdSign">

                        </div>
                        <button id="signUpBtn" type="button" onclick="signUp()">Sign up</button>
                    </div>
                </div>
                <div class="fogotContent">
                    <div class="group-input-fogot">
                        <label for="emailOrUserNameFogot">Email / User name</label>
                        <input type="email" id="emailOrUserNameFogot" placeholder="Enter email or user name ">
                        <button id="sendEmailForgot" type="button" onclick="sendEmail()">Send email</button>
                    </div>
                    <div id="afterSendEmail">
                    <div class="group-input-fogot">
                        <label for="fogotCode">Cofirm code</label>
                        <input type="text" id="fogotCode" placeholder="Confirm code">
                    </div>
                    <div class="group-input-fogot">
                        <label for="newPassword1">New password</label>
                        <input type="password" id="newPassword1" placeholder="New password">
                        <button type="button" id="seeNewPwd1" onclick="seePassword('seeNewPwd1','newPassword1')">
                                <ion-icon name="eye-outline"></ion-icon>
                            </button>
                    </div>
                    <div class="group-input-fogot">
                        <label for="newPassword2">Confirm password</label>
                        <input type="password" id="newPassword2" placeholder="Enter password again">
                        <button type="button" id="seeNewPwd2" onclick="seePassword('seeNewPwd2','newPassword2')">
                                <ion-icon name="eye-outline"></ion-icon>
                            </button>
                    </div>
                    <button id="confirmFogotBtn" type="button" >Change password</button>
                    </div>
                </div>



            </div>
        </div>
        
    <label for="nav_line" class="line3">
        <div></div>
        <div></div>
        <div></div>
    </label>
    <input type="checkbox" hidden class="nav_input_line" id="nav_line">
    <label for="nav_line" class="nav_overlay_line"></label>
    <div class="lineRespon">
        <p class="">MENU <label for="nav_line" id="close"><i class="bi bi-x-circle-fill"></i></label></p>
        <div><ul class="right_menu">
            <li><a href="index.html"><b>home</b></a></li>
            <li><a href=""><b>about us</b></a></li>
            <li><a href=""><b>new arrivals</b></a></li>
            <li>
                <a href="menu.html"><b>products</b> <i class="fas fa-angle-down">   </i></a>
                <ul class="right_sub_menu">
                    <li><a href="">necklace</a></li>
                    <li><a href="">bracelet</a></li>
                    <li><a href="">anklet</a></li>
                    <li><a href="">ring</a></li>
                    <li><a href="">earring</a></li>
                </ul>
            </li>
            <li><a href=""><b>size chart</b></a></li>
            <li>
                <a href=""><b>contact</b> <i class="fas fa-angle-down"></i></a>
                <ul class="right_sub_menu">
                    <li><a href="">store</a></li>
                    <li><a href="">facebook</a></li>
                    <li><a href="">instagram</a></li>
                </ul>
            </li>
        </ul>
    </div>
    </div>
    <!-- SEARCH -->
    <input type="checkbox" hidden name="" class="nav_input_search" id="nav_input">
    <label for="nav_input" class="nav_overlay_search"></label>
    <div class="search" id="search-id">
        <div class="search_into">
            <p>SEARCH <label for="nav_input" id="close"><i class="bi bi-x-circle-fill"></i></label></p>
        <p class="Psearch"><input id="searchInput" type="text" placeholder="Search products.." onkeyup="searchPro()"><button id="buttonSearch"><i class="bi bi-search"></i></button></p>
        <div id="searchProName">
            <div id="userSearch"></div>
            <div id="listSearchProName"></div>
        </div>
        </div>
    </div>
    <!-- CART -->
    <input type="checkbox" hidden class="nav_input_cart" id = "nav_cart">
    <label for="nav_cart" class="nav_overlay_cart"></label>
    <div class="cart" id="cart-id">
        <div class="cart_into">
            <p class="">CART <label for="nav_cart" id="close"><i class="bi bi-x-circle-fill"></i></label></p></p>    
        </div>
        <div class="cartDetails">
            <div class="containPro">
                <!-- <table id="tableProView">
                    <tbody>
                        <tr>
                            <td class="imgProCart"></td>
                            <td class="infProCart"></td>
                        </tr>
                    </tbody>
                </table>
                <hr> -->
                <table id="tableCartView">
                    <tbody>
                        <tr>
                            <td><p>There is nothing on the cart right now</p></td>
                        </tr>
                    </tbody>
                </table>
                <hr>
                <table id="tableTotal">
                    <tbody>
                        <tr>
                            <td class="textTotalRight">TOTAL:</td>
                            <td class="texttotalLeft"></td>
                        </tr>
                    </tbody>
                </table>
                <table id="tableButton">
                    <tr>
                        <td><a href="./cart.html"><button id="cart_btn">VIEW SHOPPING CART</button></a></td>
                        <td><button id="goPayment" onclick="goPayment()">PAYMENT</button></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</nav>
</div> 
<div class="hollow"></div>
`;


var footer = `
<div class="content_banner">
<div class="banner_img">
    <h2>2LTU LUXURY</h2>
    <hr>
    <div id="group-banner">
        <img src="https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/tiffany-victoriaearrings-23954168_997901_ED_M-23954168_1028075_SV_1.jpg?hei=480&wid=480" alt="">
        <img src="https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/tiffany-tt1-ring-67796659_1013904_ED_M-67796659_1012020_SV_1_M.jpg?hei=480&wid=480" alt="">
        <img src="https://media.tiffany.com/is/image/tiffanydm/holiday-OnFig-Bracelet2-alt2?$tile$&wid=1488&hei=1488" alt="">
        <img src="https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/palomas-graffitilove-pendant-26189993_928743_ED_M-33476744_1029633_SV_1.jpg?hei=480&wid=480" alt="">
        <img src="https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/palomas-graffitilove-ring-60571422_1031022_ED_M-60571422_1031023_SV_1_M.jpg?hei=480&wid=480" alt="">
        <img src="https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/tiffany-victoriaearrings-38050982_1031018_ED-38050982_1031019_SV_1.jpg?hei=480&wid=480" alt="">
    </div>
</div>
</div>
<div class="footer">
<div></div>
<div class="slogan">
    <h3>2ltu Luxury</h3>
    <p>2LTU Luxury Jewelry is a pioneer in the field of jewelry accessories specializing in necklaces, rings, bracelets with a variety of materials designed according to the shop's own style. Established in 2000, Luxury Jewelry has provided millions
        of products to all Vietnamese and foreign customers with the desire to bring the best value to users.</p>
    <img class="logo" src="../assets/images/img/logo1.png" alt="">
    <p class="slogan_icon"><a href="https://www.youtube.com/watch?v=X1vfCsJ6hAU"><i class="fab fa-facebook"></i></a> <a href=""><i class="fab fa-instagram"></i></a></p>
</div>
<div class="menu_footer">
    <h3>Main menu</h3>
    <p>- home</p>
    <p>- About us</p>
    <p>- new arrivals</p>
    <p>- products</p>
    <p>- size chart</p>
    <p>- contact</p>
</div>
<div class="contact_information">
    <h3>contact information</h3>
    <p>- Address: 101B,Le Huu Trac, Son Tra, Da Nang, Viet Nam</p>
    <p>- Phone number: 1900633513</p>
    <p>- Email: luxury2ltu@gmail.com</p>
    <p>- Facebook: 2ltu Luxury</p>
    <p>- Instagram: 2ltu_luxury</p>
</div>
<div class="fanpage">
    <h3>fanpage</h3>
    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v12.0" nonce="MP37wf4a"></script>
    <div class="fb-page " data-href="https://www.facebook.com/Y-&#xca;-U-&#x110;-&#x1a0;-N-P-H-&#x1af;-&#x1a0;-N-G-302869896864999/" data-tabs="timeline" data-width="300px" data-height="250px" data-small-header="false" data-adapt-container-width="true" data-hide-cover="true"
        data-show-facepile="true">
        <blockquote cite="https://www.facebook.com/Y-&#xca;-U-&#x110;-&#x1a0;-N-P-H-&#x1af;-&#x1a0;-N-G-302869896864999/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Y-&#xca;-U-&#x110;-&#x1a0;-N-P-H-&#x1af;-&#x1a0;-N-G-302869896864999/">2LTU Luxury</a></blockquote>
    </div>
</div>
</div>
<hr>
<div>
<p class="end">Copyright © 2021 2LTU Luxury. Powered by Haravan</p>
</div>`;

var check = document.getElementById('footerSection');
if (!check.hasAttribute("class")) {
    check.innerHTML = footer;
}


function goPayment() {
    var accountId = localStorage.getItem('accountId');
    if (accountId == 0) {
        document.getElementById('goPayment').disabled = true;
        return;
    }
    window.location.assign("payment.html");
}

function loadProducts() {
    var accountId = localStorage.getItem('accountId');
    if (accountId == 0) {
        htmlf = `
        <tr>
        <td>
        <img class="empty-cart" src="../assets/images/empty-cart.png">
            <p>There is nothing on the cart right now</p>
        </td>
        </tr>`;
        document.getElementById('tableCartView').innerHTML = htmlf;
        return;
    }
    callAPI(`${tblAccounts}/${accountId}/userInfo/${accountId}`, "GET", null).then((res) => {
        var userInfoArr = res.data;

        var productsFiled = document.getElementById('tableCartView');
        var htmlf = "";
        var total = 0;
        if (userInfoArr.cart.length == 0) {
            htmlf = `
                <tr>
                <td>
                <img class="empty-cart" src="../assets/images/empty-cart.png">
                    <p>There is nothing on the cart right now</p>
                </td>
                </tr>`;
            productsFiled.innerHTML = htmlf;
        } else {
            for (let i = 0; i < userInfoArr.cart.length; i++) {
                callAPI(tblProducts, "GET", null).then((res) => {
                    var products = res.data;
                    for (var y = 0; y < products.length; y++) {
                        if (products[y].id == userInfoArr.cart[i].idItem) {
                            total += (userInfoArr.cart[i].amount) * (products[y].price);
                            htmlf += `
                                <tr id="pro(${i})">
                                <td class="cardInCart">
                                    <div class="imagepro" > <img src="${products[y].images[0]}"></div> 
                                    <div class="textBlock">
                                        <div class="namepro">${products[y].name}</div>
                                        <div class="textBottom">
                                            <div class="amountpro">${userInfoArr.cart[i].amount}</div>
                                            <div class="pricepro">$${products[y].price}</div>
                                        </div>
                                    </div>
                                    <button onclick="deleted(${i})" class="trash">
                                    <ion-icon name="trash-outline"></ion-icon>
                                    </button>
                                </td>
                                </tr>
                                `;
                        }
                    }
                    productsFiled.innerHTML = htmlf;
                    document.getElementById('texttotalLeft').innerHTML = "$" + total;
                })
            }

        }
    })

}

function deleted(index) {
    var accountId = localStorage.getItem('accountId');
    callAPI(`${tblAccounts}/${accountId}/userInfo/${accountId}`, "GET", null).then((res) => {
        var userInfoArr = res.data;
        userInfoArr.cart.splice(index, 1);
        callAPI(`${tblAccounts}/${accountId}/userInfo/${accountId}`, "PUT", userInfoArr).then((res) => {
            loadProducts();
        })
    })
}


// Hàm SEARCH
function dataSearch(images, name, id) {
    return `
    <div class="proSearch"> 
    <div class="image-search"> <img src="${images[0]}"> </div>
    <div class="name-search">${name}</div>
    <button class="searchViewDetail" type="button" onclick="viewDetail(${id})">View detail</button>
    </div>
    `;

}

function viewDetail(id) {
    localStorage.setItem("indexTemp", JSON.stringify(id));
    window.location.assign("../html/productDetail.html");
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

var input = document.getElementById("searchInput")

function searchPro() {
    searchView();
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


// LOGIN-JS


// Every single load page
window.onload = function() {
    var history = localStorage.getItem("history");
    var accountId = localStorage.getItem("accountId");
    if (accountId == 0) {
        displayLoginModal();
    }
    callAPI(tblAccounts, "GET", null).then((res) => {
        var accounts = res.data;

        if (accounts.length == 0) {
            console.log("no account")
            localStorage.setItem("accountId", JSON.stringify(0));
            displayLoginModal();
        }
    })
    if (history == "yes") {
        onloadHistoryPage();
    }
}


function disPlayUserOption() {
    var userOption = document.querySelector(".sub_user_option");
    var accountId = localStorage.getItem("accountId");
    var afterLogin = document.getElementById('after_login');
    var beforeLogin = document.getElementById('before_login');

    if (userOption.style.display == "block") {
        userOption.style.display = "none"
    } else {
        userOption.style.display = "block";
    }
    if (accountId == 0) {
        afterLogin.style.display = "none";
        beforeLogin.style.display = "block";
    } else {
        afterLogin.style.display = "block";
        beforeLogin.style.display = "none";
    }
}

function logout() {
    if (confirm("Are you sure you want to  log out?") == true) {
        localStorage.setItem("accountId", JSON.stringify(0));
        window.location.assign("index.html")
        console.log("logout");
    } else {
        console.log("Not logout")
    }
}


function displayLoginModal() {
    var modal = document.getElementById('loginContainer');
    var closeModal = document.getElementById('closeLogin');

    var logDepartment = document.getElementById('loginDepartment');
    var signUpDepartment = document.getElementById('signUpDepartment');

    var logbtn = document.getElementById('loginButton');
    var signUpbtn = document.getElementById('signupButton');

    logbtn.onclick = function() {
        logDepartment.style.display = "block";
        signUpDepartment.style.display = "none";
        document.getElementsByClassName('fogotContent')[0].style.display = "none";

    }

    signUpbtn.onclick = function() {
        logDepartment.style.display = "none";
        signUpDepartment.style.display = "block";
        document.getElementsByClassName('fogotContent')[0].style.display = "none";
        // signUpValidation();
    }

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

// See password
function seePassword(idBtn, idType) {
    var seeBTn = document.getElementById(idBtn);
    var typePass = document.getElementById(idType);
    if (typePass.type == "password") {
        typePass.type = "text";
        seeBTn.innerHTML = '<ion-icon name="eye-off-outline"></ion-icon>';
    } else {
        typePass.type = "password";
        seeBTn.innerHTML = '<ion-icon name="eye-outline"></ion-icon>';
    }
}

// Sign up function 
function signUp() {
    var userName = document.getElementById('userNameSignUp').value;
    var pwdUser = document.getElementById('pwdSignup').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var email = document.getElementById('email').value;

    if (!checkBlankPhone() + !checkBlankUserName() + !checkPassword() + !checkEmail()) return
    callAPI(tblAccounts, "GET", null).then((res) => {
        var accountArr = res.data;
        for (var account of accountArr) {
            if (email == account.email) {
                document.getElementById('invalidEmail').innerHTML = "Email addess is already exist!";
                return;
            }
            if (phoneNumber == account.phone) {
                document.getElementById('invalidPhoneSign').innerHTML = "Phone number is already exist!";
                return;
            }
            if (userName == account.userName) {
                document.getElementById('invalidUserSign').innerHTML = "User name is already exist!";
                return;
            }
        }
        var accountId = accountArr.length + 1;
        console.log(accountId)

        var anAccount = {
            id: accountId,
            userName: userName,
            password: pwdUser,
            phone: phoneNumber,
            email: email

        }
        var anUserInfo = {
            id: accountId,
            accountId: accountId,
            fullName: "unknown",
            address: {},
            cart: [],
        }
        callAPI(tblAccounts, "POST", anAccount);
        setTimeout(function() {
            axios.post(`https://61bc10dad8542f001782454a.mockapi.io/${tblAccounts}/${accountId}/userInfo`, anUserInfo);
        }, 1000)
        alert("Sign up success!");
        resetInvalidSign();
    })
}


// Reset invalid 
function resetInvalidSign() {
    document.getElementById('userNameSignUp').value = "";
    document.getElementById('pwdSignup').value = "";
    document.getElementById('phoneNumber').value = "";
    document.getElementById('email').value = "";

    document.getElementById('invalidUserSign').value = "";
    document.getElementById('invalidPwdSign').value = "";
    document.getElementById('invalidPhoneSign').value = "";
    document.getElementById('invalidEmail').value = "";


}

// Validation sign up data
function checkEmail() {
    var email = document.getElementById('email').value;
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email == "") {
        document.getElementById('invalidEmail').innerHTML = "Emai address must be filled out!";
        return false;
    }
    if (!email.match(pattern)) {
        document.getElementById('invalidEmail').innerHTML = "Please enter valid email address!";
        return false;
    }
    document.getElementById('invalidEmail').innerHTML = "";
    return true;
}

function checkBlankUserName() {
    var userName = document.getElementById("userNameSignUp").value
    if (userName == '') {
        document.getElementById('invalidUserSign').innerHTML = "User name must be filled out!";
        return false
    }
    document.getElementById('invalidUserSign').innerHTML = "";
    return true;
}

function checkPassword() {
    var password = document.getElementById("pwdSignup").value
    if (password == '') {
        document.getElementById('invalidPwdSign').innerHTML = "Password must be filled out!";
        return false;
    }
    if (password.length < 4) {
        document.getElementById('invalidPwdSign').innerHTML = "Password must have more 4 charscters!";
        return false
    }
    document.getElementById('invalidPwdSign').innerHTML = "";
    return true
}

function checkBlankPhone() {
    var phone = document.getElementById("phoneNumber").value
    if (phone == '') {
        document.getElementById('invalidPhoneSign').innerHTML = "User name must be filled out!";
        return false
    }
    if (isNaN(phone)) {
        document.getElementById('invalidPhoneSign').innerHTML = "Phone number must be digital";
        return false
    }
    document.getElementById('invalidPhoneSign').innerHTML = "";
    return true
}


// Login function 
function login() {
    callAPI(tblAccounts, "GET", null).then((res) => {
        accounts = res.data;
        var checkbox = document.getElementById('checkboxAdmin');
        var userName = document.getElementById('usesrName').value;
        var passWord = document.getElementById('passWord').value;

        if (checkbox.checked == true) {
            axios.get(`https://61d15dfcda87830017e591f9.mockapi.io/adminAccounts`).then((res) => {
                var datas = res.data;
                console.log(datas[0].username)
                for (let i = 0; i < datas.length; i++) {
                    if ((datas[i].username == userName || datas[i].email == userName) && passWord == datas[i].password) {
                        window.location.assign("admin.html");
                    } else {
                        alert("User name or password is not correct!")
                    }
                }
            })
            return;
        }
        for (let i = 0; i < accounts.length; i++) {
            if ((accounts[i].userName == userName || accounts[i].email == userName) && accounts[i].password == passWord) {
                alert("Login success!");

                // var anAccount = {
                //     userName: userName,
                //     password: passWord,
                //     phone: accounts[i].phone,
                //     details: []
                // }
                // callAPI(`${tblAccounts}/${accounts[i].id}`, "PUT", anAccount);
                localStorage.setItem("accountId", JSON.stringify(parseInt(accounts[i].id)));
                userName = document.getElementById('usesrName').value = "";
                passWord = document.getElementById('passWord').value = "";
                document.getElementById('loginContainer').style.display = "none";
                window.location.assign("index.html");
                return;
            }
        }
        alert("The user name or password is not correct!")
    })
}

// FOGOT PASSWORD
function fogot() {
    document.getElementsByClassName('fogotContent')[0].style.display = "block";
    document.getElementById('loginDepartment').style.display = "none";
}

function sendEmail() {
    (function() {
        emailjs.init("user_QOzGxKzm9C6rZYG1jgLQH");
    })();

    var number = Math.floor(Math.random() * 99) + 10;
    callAPI(tblAccounts, "GET", null).then((res) => {
        var accounts = res.data;
        var emailOrUserName = document.getElementById('emailOrUserNameFogot').value;
        var check = 0;
        for (let i = 0; i < accounts.length; i++) {
            if (emailOrUserName == accounts[i].email || emailOrUserName == accounts[i].userName) {
                check = 1;
                const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)] + alphabet[Math.floor(Math.random() * alphabet.length)] + number + alphabet[Math.floor(Math.random() * alphabet.length)] + alphabet[Math.floor(Math.random() * alphabet.length)]
                var temPrams = {
                    to_name: accounts[i].userName,
                    to_mail: accounts[i].email,
                    randomCharacter: randomCharacter
                }
                emailjs.send('service_oc749lp', 'template_6t2r5fu', temPrams)
                    .then(function(res) {
                        console.log("success", res.status);
                    })
                document.getElementById('afterSendEmail').style.display = "block";
                document.getElementById('emailOrUserNameFogot').value = "";

                document.getElementById('confirmFogotBtn').addEventListener('click', function() {
                    endFogot(randomCharacter, accounts[i].email);
                    return;
                })
            }
        }
        if (check == 0) {
            alert("Email or user is not exist!");
        }

    })

}

function endFogot(code, emailAddress) {
    callAPI(tblAccounts, "GET", null).then((res) => {
        var accounts = res.data;
        var accountId;
        var fogotCode = document.getElementById('fogotCode').value;
        if (fogotCode.match(code)) {
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].email == emailAddress) {
                    accountId = accounts[i].id;
                }
            }
            changePassword(accountId)
        } else {
            alert("Confirm code is not correct!")

        }
    })
}

function changePassword(accountId) {
    callAPI(`${tblAccounts}/${accountId}`, "GET", null).then((res) => {
        var accounts = res.data;

        var newPassword1 = document.getElementById('newPassword1');
        var newPassword2 = document.getElementById('newPassword2');

        if (newPassword1.value == "" || newPassword2.value == "") {
            alert("Please fill it out the blank");
            return;
        }
        if (newPassword1.value == newPassword2.value) {
            if (newPassword1.value == accounts.password) {
                alert("The password is the same as the old password!")
                return;
            }
            accounts.password = newPassword1.value;
            callAPI(`${tblAccounts}/${accountId}`, "PUT", accounts).then((res) => {
                alert("Change password successful!");
                document.getElementById('fogotCode').value = "";
                document.getElementById('newPassword1').value = "";
                document.getElementById('newPassword2').value = "";
                document.getElementsByClassName('fogotContent')[0].style.display = "none";
                document.getElementById('loginContainer').style.display = "block"
            })
        } else {
            alert("The passwords do not match!");
        }
    })
}

// HISTORY-JS

function history() {
    localStorage.setItem("history", "yes");
    window.location.assign("history.html")
}

function onloadHistoryPage() {
    callAPI(tblProducts, "GET", null).then((res) => {
        var products = res.data;
        callAPI(tblBills, "GET", null).then((res) => {
            var bills = res.data;
            var accountId = localStorage.getItem('accountId');

            var htmlf = "";
            var numerical = 0;
            var check = 0;
            for (let i = 0; i < bills.length; i++) {
                var totalPrice = 0;
                if (bills[i].accountId == accountId) {
                    check = 1;
                    for (let itemCart of bills[i].productInfo.cart) {
                        for (let j = 0; j < products.length; j++) {
                            if (products[j].id == itemCart.idItem) {
                                totalPrice += itemCart.amount * products[j].price;
                            }
                        }
                    }
                    numerical += 1;
                    htmlf += `
                <tr>
                    <td>${numerical}</td>
                    <td>${bills[i].productInfo.fullName}</td>
                    <td>${bills[i].productInfo.address.addressDetailed} - ${bills[i].productInfo.address.commune} - ${bills[i].productInfo.address.district} - ${bills[i].productInfo.address.province}</td>
                    <td>${bills[i].productInfo.date.time} - ${bills[i].productInfo.date.date}</td>
                    <td>$${bills[i].productInfo.shipmentFee}</td>
                    <td>$${totalPrice}</td>
                    <td><button type="button" class="seeOrderDetail" onclick="orderDetail(${bills[i].id})"><ion-icon id="orderDetail${bills[i].id}" name="information-circle-outline"></ion-icon></button></td>
                </tr>
                `
                }
            }
            if (check == 1) {
                document.getElementById('displayHistory').innerHTML = htmlf;
            } else {
                document.querySelector('.historyContent').innerHTML = `You have not purchased any products yet`
            }

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
