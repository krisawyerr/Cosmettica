export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: "00013",
        quantity: 2
    }, {
        productId: "00014",
        quantity: 1
    }];
}

export function addToCart(productId, quantity) {
    if (quantity > 0) {
        let matchingItem;

        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            cart.push({
                productId: productId,
                quantity: quantity
            });
        }
        saveToStorage();

    } 
 }

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
    let newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId)
            newCart.push(cartItem);
    });

    cart = newCart;
    saveToStorage();
}


export function countTotalItems() {
    let totalItems = 0;
    cart.forEach((cartItem) => {
        totalItems += cartItem.quantity;
    });
    const itemsCountDiv = document.getElementById('js-items-count');

    itemsCountDiv.querySelector('div').textContent = `Items (${totalItems}):`;    
}
