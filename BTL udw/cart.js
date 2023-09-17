let carts = document.querySelectorAll("div > a.add-cart");


for (let i =0;i < carts.length;i++)
{
    carts[i].addEventListener('click',()=> {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = sessionStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('li>a.cart>span').textContent = productNumbers;
    }
}
function cartNumbers(product){
    let productsNumbers = sessionStorage.getItem('cartNumbers');
    productsNumbers = parseInt(productsNumbers);
    if (productsNumbers ){
        sessionStorage.setItem('cartNumbers',productsNumbers + 1);
        document.querySelector('li>a.cart>span').textContent = productsNumbers + 1;
    }
    else {
        sessionStorage.setItem('cartNumbers',1)
        document.querySelector('li>a.cart>span').textContent = 1;
    }
    setItems(product);
}

function setItems(product)
{
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null)
    {
        if (cartItems[product.tag] == undefined)
        {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; 
    }
    else 
    {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    sessionStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = sessionStorage.getItem('totalCost');
    if (cartCost != null)
    {
        cartCost = parseInt(cartCost);
        sessionStorage.setItem("totalCost",cartCost +product.price);
    }
    else {
        sessionStorage.setItem("totalCost",product.price);
    }
}

function displayCart(){
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = sessionStorage.getItem('totalCost');
    if (cartItems && productContainer)
    {
        productContainer.innerHTML='';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
            <div class="product-detail">
                <ion-icon id="delItem" name="close-circle-outline"></ion-icon>
                <img src = ${item.img}>
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                ${item.inCart* item.price}  
            </div>
            </div>
            `
        });

        productContainer.innerHTML +=`
            <div class="basketTotalContainer">
                <h4 class="basketTotalTittle">
                    Thành tiền: 
                </h4 class="basketTotal">
                    ${cartCost}
                <h4>
        `;
    }
}


removeFromCart();
onLoadCartNumbers();
displayCart();


// xu li click xoa san pham
function hanldeClickRemove() {
    var productList = document.querySelectorAll(".product");
    var removeIconList = document.querySelectorAll("#delItem");
    for (let i = 0 ;i < removeIconList.length;i++)
    {
        removeIconList[i].addEventListener('click', ()=> {
            var currentName = productList[i].children[0].querySelector("span").innerText;      
            removeFromCart(currentName)
        })
    }
}

// giam so luong xuong 1
function decAmountInCart() {
    let productsNumbers = sessionStorage.getItem('cartNumbers');
    productsNumbers = parseInt(productsNumbers);
    document.querySelector('li>a.cart>span').textContent = productsNumbers - 1;
    sessionStorage.setItem('cartNumbers',productsNumbers - 1);
}

// xoa san pham
function removeFromCart(name) {
    if(name) {
        let productsJSON = sessionStorage.getItem('productsInCart');
        let products = Object.values(JSON.parse(productsJSON));
        let cartCost = sessionStorage.getItem('totalCost');
        console.log(name)
    
        var newProducts = products.filter(item => {
            console.log(item.inCart)
            if(item.name == name) {
                if(item.inCart >=2) {
                    item.inCart  -= 1;                                          // giam so luong neu hien tai lon hon 2
                    cartCost = parseInt(cartCost);
                    sessionStorage.setItem("totalCost",cartCost - item.price);  // giam total cost
                    return true;
                }
                else {
                    cartCost = parseInt(cartCost);
                    sessionStorage.setItem("totalCost",cartCost - item.price);
                    return false
                };
            }
            else 
                return true;
        })
        decAmountInCart();
        displayCart();
        sessionStorage.setItem("productsInCart",JSON.stringify(newProducts));
        // alert("Xoa san pham thanh cong");
        // location.reload();
    }
}
hanldeClickRemove();