class ProductRepository {

    productCount = 4

    //  List of product images
    productImageList = [
        "./img/products/nvidia_1660.png",
        "./img/products/nvidia_2070.png",
        "./img/products/nvidia_2080.png",
        "./img/products/nvidia_3080.png"
    ]

    //  List of product titles
    productTitleList = [
        "Nvidia 1660 Super",
        "Nvidia 2070 Super",
        "Nvidia 2080 ti",
        "Nvidia 3080"
    ]

    //  List of product prices
    productPriceList = [
        25000,
        37000,
        60000,
        120000
    ]

    //  Returns the list of all available products
    getAllProducts() {
        var productList = new Array()
        var product = null
        for(var index=0; index<this.productCount; index++) {
            var id = index + 1
            product = new Product(id, this.productTitleList[index], this.productImageList[index], this.productPriceList[index])
            productList.push(product)
        }
        return productList
    }

}