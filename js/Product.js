function Product(id, name, imageURL, price) {
    this.id = id
    this.name = name
    this.imageURL = imageURL
    this.price = price
}

Product.prototype.getID = function() {
    return this.id
}

Product.prototype.getName = () => {
    return this.name
}

Product.prototype.getImageURL = () => {
    return this.imageURL
}

Product.prototype.getPrice = () => {
    return this.price
}