class Cart {

    constructor() {
        this.localDB = new LocalDB()
        this.productList = new Array()
    }

    //  Called whenever product in the cart upadtes
    setOnCartUpdateListener(listener) {
        this.callback = listener
        this.getCart()
    }

    //  Adds the product to the cart
    addToCart(product) {
        if (product == null) {
            throw "Invalid Product type"
        }
        this.productList = this.localDB.addItem(product)
        this.callback(this.productList)
    }

    //  Removes the prodcut from the cart
    removeFromCart(product) {
        if (product == null) {
            throw "Invalid Product type"
        }
        this.productList = this.localDB.removeItem(product)
        this.callback(this.productList)
    }

    //  Removes all products from the cart
    clearCart() {
        this.localDB.removeAll()
        this.productList = new Array()
        this.callback(this.productList)
    }

    //  Returns the list of all products available in cart
    getCart() {
        this.productList = this.localDB.getAllItems()
        this.callback(this.productList)
    }

}