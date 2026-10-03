// Run initialization on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDatabase();
    renderProducts(getProducts());
    updateCartBadge();
});

// Render Product Grid dynamically
const productGrid = document.getElementById('product-grid');

function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    if(productsToRender.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">No appliances found.</p>`;
        return;
    }

    productsToRender.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${prod.image}" alt="${prod.name}" class="product-img">
            <div class="product-info">
                <h3>${prod.name}</h3>
                <p>${prod.desc}</p>
            </div>
            <div class="product-footer">
                <span class="product-price">$${prod.price}</span>
                <button class="add-to-cart" onclick="addToCart(${prod.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Category Filters
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const category = e.target.getAttribute('data-filter');
        const allProducts = getProducts();

        if(category === 'all') {
            renderProducts(allProducts);
        } else {
            const filtered = allProducts.filter(p => p.category === category);
            renderProducts(filtered);
        }
    });
});

// Search functionality
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const allProducts = getProducts();
    const searched = allProducts.filter(p => p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term));
    renderProducts(searched);
});

// Cart functionality & Database persistence
const cartBtn = document.getElementById('cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');

cartBtn.addEventListener('click', () => {
    renderCartDrawer();
    cartOverlay.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartOverlay.classList.remove('open');
});

function addToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    let cart = getCart();

    const existingIndex = cart.findIndex(item => item.id === productId);
    if(existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    saveCart(cart);
    updateCartBadge();
    alert(`Added ${product.name} to your order list!`);
}

function updateCartBadge() {
    let cart = getCart();
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;
}

function renderCartDrawer() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    let cart = getCart();

    cartItemsContainer.innerHTML = '';
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:30px;">Your cart is empty.</p>`;
        cartTotalPrice.innerText = '$0.00';
        return;
    }

    let totalSum = 0;
    cart.forEach((item, index) => {
        totalSum += item.price * item.quantity;
        const row = document.createElement('div');
        row.classList.add('cart-item-row');
        row.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <i class="fas fa-trash" style="color:#ef4444; cursor:pointer;" onclick="removeFromCart(${index})"></i>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotalPrice.innerText = `$${totalSum.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCartDrawer();
    updateCartBadge();
}

// Checkout simulation handler
document.getElementById('checkout-btn').addEventListener('click', () => {
    let cart = getCart();
    if(cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed successfully! Thank you for shopping with Aura Appliances.');
    saveCart([]);
    renderCartDrawer();
    updateCartBadge();
    cartOverlay.classList.remove('open');
});