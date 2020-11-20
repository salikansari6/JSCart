class LocalDB {

    //  Key for the cart row in database
    DB_KEY_PRODUCT = "DB_KEY_PRODUCT"

    //  Adds the item to the database
    addItem(item) {
        var itemListString = localStorage.getItem(this.DB_KEY_PRODUCT)
        var itemList = JSON.parse(itemListString)
        if (itemList == null) {
            itemList = new Array(item)
        } else {
            itemList.push(item)
        }
        localStorage.setItem(this.DB_KEY_PRODUCT, JSON.stringify(itemList))
        return itemList
    }

    // Removes the item from database
    removeItem(item) {
        var isProductInCart = false
        var itemListString = localStorage.getItem(this.DB_KEY_PRODUCT)
        var itemList = JSON.parse(itemListString)
        if (itemList != null) {
            var index = 0
            while (index < itemList.length) {
                if (itemList[index].id == item.id) {
                    itemList.splice(index, 1)
                    isProductInCart = true
                    break
                } else {
                    ++index
                }
            }

            if (!isProductInCart) {
                throw "Product not present in the cart!"
            }

            localStorage.setItem(this.DB_KEY_PRODUCT, JSON.stringify(itemList))
            return itemList
        }
    }

    //  Removes all items from database
    removeAll() {
        localStorage.clear()
    }

    //  Retrieves all items from database
    getAllItems() {
        var itemList = localStorage.getItem(this.DB_KEY_PRODUCT)
        if (itemList == null) {
            return new Array()
        }
        return JSON.parse(itemList)
    }

}