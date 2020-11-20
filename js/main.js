document.addEventListener("DOMContentLoaded", () => {

    var productRepository = new ProductRepository()
    var productList = new Array()

    // DOM Elements
    var dCartTotal = document.getElementById("cart_total")
    var dProductListing = document.getElementById("product-listing")
    var dCartMenu = document.getElementById("cart-menu")

    var cart = new Cart()
    cart.setOnCartUpdateListener(onUpdateCart)

    // Updates the product list and syncs it with UI
    function onUpdateCart(updatedProductList) {
        productList = updatedProductList
        renderCartMenu(productList)
    }

    // Refreshes the cart menu with updated product list
    function renderCartMenu(productList) {
        var idList = []
        for(var index=0; index<productList.length; index++) {
            idList.push(productList[index].id)
        }

        var productsWithQuantity = getProductWithQuantity(productList, idList)
        dCartTotal.innerHTML = productList.length
        dCartMenu.innerHTML = ''
        var cartTotalPrice = getProductTotal(productList)
        if (productsWithQuantity.length > 0) {
            var product = null
            for (var index = 0; index < productsWithQuantity.length; index++) {
                product = productsWithQuantity[index]
                dCartMenu.innerHTML += `
                <a class="dropdown-item" href="#">
                <img src="${product.imageURL}" alt="" width="30" height="30">${product.name} (${product.quantity})</a>
                <span> </span>
                `
            }
            dCartMenu.innerHTML += `
            <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Total : ₹ ${cartTotalPrice}/-</a>        
            `
            return
        }
    }

    //  Returns the total price of products in cart
    function getProductTotal(productList) {
        console.log(productList)
        var totalPrice = 0;
        for (var index=0; index<productList.length; index++) {
            totalPrice += productList[index].price
        }
        return totalPrice
    }

    // Returns the unique products with their total quantity
    function getProductWithQuantity(productList, idList) {
        var productsWithQuantity = []
        
        var uniqueIdList = getUniqueProductIds(idList)
        for(var index=0; index<uniqueIdList.length; index++) {
            var productCounter = 0
            var tempProduct = null
            for (var subIndex=0; subIndex<productList.length; subIndex++) {
                if (productList[subIndex].id === uniqueIdList[index]) {
                    productCounter++
                    tempProduct = productList[subIndex]
                }
            }
            tempProduct["quantity"] = productCounter
            productsWithQuantity.push(tempProduct)
        }

        console.log(productsWithQuantity)
        return productsWithQuantity
    }

    // Returns an array of unique products in cart
    function getUniqueProductIds(idList) {
        var uniqueIdList = null
        if (idList != null) {
            uniqueIdList = new Set(idList)
        }
        return [...uniqueIdList]
    }

    // Retrieve all available products from repository and renders the product listing UI
    var productListToRender = productRepository.getAllProducts()
    productListToRender.forEach((product, index) => {
        dProductListing.innerHTML += `
            <div class="card col ml-2">
            <img class="card-img-top mt-2 mx-auto product-thumbnail" src="${product.imageURL}" alt="">
            <h5 class="mx-auto card-title">${product.name}</h5>
            <p class="mx-auto card-text">Rs. ${product.price}/-</p>
            <div class="row mb-2 mx-auto">
                <div class="col">
                    <button class="btn btn-primary" onclick="onClickAddToCart(${product.id})">+</button>
                </div>
                <div class="col">
                    <button href="#" class="btn btn-primary" onclick="onClickRemoveFromCart(${product.id})">-</button>
                </div>
            </div>
        </div>`
    })


    //Input Event Listeners
    this.onClickAddToCart = (productID) => {
        console.log(`Product with ID: ${productID}`)

        var productToBeAdded = getProductByID(productListToRender, productID)

        if (productToBeAdded == null) {
            alert(`Product with ID : ${productID} cannot be found.`)
            return
        }

        cart.addToCart(productToBeAdded)

    }

    this.onClickRemoveFromCart = (productID) => {
        if (productList.length < 1) {
            alert("Cart is already empty")
            return
        }

        var productToBeRemoved = getProductByID(productListToRender, productID)
        if (productToBeRemoved != null) {
            try {
                cart.removeFromCart(productToBeRemoved)
                return
            } catch (ex) {
                alert(ex)
            }
        }
    }

    // Returns a product from the list with matching ID
    function getProductByID(productList, productID) {
        var productToBeSearched = null
        for (var index = 0; index < productList.length; index++) {
            if (productID === productList[index].getID()) {
                productToBeSearched = productList[index]
                break
            }
        }
        return productToBeSearched
    }
})