/* CART */
import {cart, addToCart} from '/js/cart.js';

/* PRODUCTS LIST */
import {products} from '/js/productslist.js'

// Calculate the total quantity of items in the cart
let totalItems = 0;

cart.forEach((cartItem) => {
    totalItems += cartItem.quantity;
});

// Select the div with the id "items-count"
const itemsCountDiv = document.getElementById('items-count');

// Update the text content to display the total quantity of items
itemsCountDiv.querySelector('div').textContent = `Items (${totalItems}):`;

// Update the cart summary HTML (if needed)
// ...

// Update the cart quantity display (if needed)
// ...
