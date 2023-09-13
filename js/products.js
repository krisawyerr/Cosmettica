/* CART */
import {cart, addToCart} from '/js/cart.js';

/* PRODUCTS LIST */
import {products} from '/js/productslist.js'

updateCartQuantityDisplay();

let productsHTML = "";
products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            "${product.name}"
            </div>

            <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
            <select>
                <option selected value="0">Select Quantity</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            </div>

            <button class="add-to-cart-button js-add-to-cart" data-product-id=${product.id}>
            Add to Cart
            </button>
        </div>
    `;
})
document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;


document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        let productId = button.dataset.productId;
        let productContainer = button.closest('.product-container');
        let selectElement = productContainer.querySelector('select');
        let quantity = parseInt(selectElement.value);
        addToCart(productId, quantity);
        updateCartQuantityDisplay();
    });
});
function updateCartQuantityDisplay() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = 'Cart : ' + cartQuantity;
    
}