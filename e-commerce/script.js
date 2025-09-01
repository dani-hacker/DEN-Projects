const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = {};

async function fetchProducts() {
    try {
        const response = await fetch('get_products.php');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productList.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}

function handleAddToCart(event) {
    const { id, name, price } = event.target.dataset;
    const productId = parseInt(id);

    if (cart[productId]) {
        cart[productId].quantity++;
    } else {
        cart[productId] = { id: productId, name, price: parseFloat(price), quantity: 1 };
    }
    updateCart();
}

function handleRemoveFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
    }
    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;
    
    const cartKeys = Object.keys(cart);
    if (cartKeys.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        checkoutBtn.style.display = 'none';
    } else {
        checkoutBtn.style.display = 'block';
        cartKeys.forEach(productId => {
            const item = cart[productId];
            total += item.price * item.quantity;
            count += item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <p>${item.name} (${item.quantity})</p>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-btn" data-id="${productId}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartCountElement.textContent = `(${count})`;
    cartTotalElement.textContent = total.toFixed(2);
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            handleRemoveFromCart(productId);
        });
    });
}

async function simulateCheckout() {
    const orderData = {
        items: Object.values(cart),
        total: parseFloat(cartTotalElement.textContent)
    };

    try {
        const response = await fetch('checkout.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        const result = await response.text();
        alert(result);
        
        cart = {};
        updateCart();
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Checkout failed. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCart();
    checkoutBtn.addEventListener('click', simulateCheckout);
});