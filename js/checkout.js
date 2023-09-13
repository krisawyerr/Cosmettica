import {cart, removeFromCart, countTotalItems} from '/js/cart.js';

/* PRODUCTS LIST */
import {products} from '/js/productslist.js';

let cartSummaryHTML = '';


function calcTotalCost() {
    function calculateTotalPrice() {
        let totalPriceCents = 0;
      
    // Iterate through items in the cart and calculate the total price
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const quantity = cartItem.quantity;
    
        const matchingProduct = products.find((product) => product.id === productId);
    
        if (matchingProduct) {
        totalPriceCents += matchingProduct.priceCents * quantity;
        }
    });
    
    return totalPriceCents;
    }
    function formatPriceCents(priceCents) {
    const dollars = Math.floor(priceCents / 100);
    const cents = priceCents % 100;
    return `$${dollars}.${cents.toString().padStart(2, '0')}`;
    }
    function updateTotalPrice() {
    const totalPriceCents = calculateTotalPrice();
    const totalPriceElement = document.querySelector('.payment-summary-money');
    const totalPricePlusShipping = document.querySelector('.pricePlusShipping');
    const totalPriceTax = document.querySelector('.priceTax');
    const totalPriceTotal = document.querySelector('.priceTotal');
    totalPriceElement.textContent = ((totalPriceCents /100).toFixed(2));
    totalPricePlusShipping.textContent = (((totalPriceCents /100) + 4.99).toFixed(2));
    totalPriceTax.textContent = ((((totalPriceCents /100) + 4.99) * 0.1).toFixed(2));
    totalPriceTotal.textContent = ((((totalPriceCents /100) + 4.99) * 1.1).toFixed(2));
    }
    updateTotalPrice();
    document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        updateTotalPrice(); // Update total price when an item is removed
        const container = document.querySelector(`.js-cart-item-${productId}`);
        container.remove();
    });
    });
    document.querySelectorAll('.product-quantity .quantity-label').forEach((label) => {
    label.addEventListener('input', () => {
        const productId = label.closest('.cart-item-container').dataset.productId;
        const quantity = parseInt(label.textContent);
        addToCart(productId, quantity); 
        updateTotalPrice();
    });
    });
    countTotalItems();   
}

calcTotalCost();



cart.forEach((cartItem) => {
    let productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

   cartSummaryHTML += `<div class="cart-item-container js-cart-item-${matchingProduct.id}">
        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    The ${matchingProduct.name}
                </div>
                <div class="product-price">
                $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
            </div>
        </div>
    </div>`;

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML
    
});

document.querySelectorAll('.js-delete-link')
    .forEach ((link) => {
        link.addEventListener('click', () => {
            let productId = link.dataset.productId;
            removeFromCart(productId);

            let container = document.querySelector(`.js-cart-item-${productId}`);
            container.remove();
            location.reload()
        })
    })

countTotalItems();