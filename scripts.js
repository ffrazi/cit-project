// Cart functionality code (from previous response)
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.btn-primary');
    
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const productCard = e.target.closest('.card');
            const productTitle = productCard.querySelector('.card-title').textContent;
            const productImage = productCard.querySelector('.card-img-top').src;
            const productPrice = productCard.querySelector('.card-text').textContent.trim(); // Assuming price is in a <p> tag with class 'card-text'
            const product = { title: productTitle, image: productImage, price: productPrice };
            addToCart(product);
        });
    });
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.querySelector('#cartCount');
        cartCount.textContent = cart.length;
    }

    updateCartCount();

    if (document.body.classList.contains('cart-page')) {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item', 'd-flex', 'align-items-center', 'mb-3');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="me-3" width="100">
                    <div class="cart-item-details">
                        <p class="mb-0"><strong>${item.title}</strong></p>
                        <p class="text-muted mb-0">Price: ${item.price}</p>
                    </div>
                    <button class="remove-item btn btn-danger ms-auto">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);
        
                cartItem.querySelector('.remove-item').addEventListener('click', function () {
                    const index = cart.indexOf(item);
                    if (index > -1) {
                        cart.splice(index, 1);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartCount();
                        cartItem.remove();
                    }
                });
            });
        }
        if (cart.length > 0) {
            const totalPrice = cart.reduce((sum, item) => {
                const price = parseFloat(item.price.replace('$', '')); // Assuming price starts with '$'
                return sum + price;
            }, 0);
        
            const totalPriceElement = document.createElement('p');
            totalPriceElement.classList.add('text-end', 'fw-bold');
            totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
            cartItemsContainer.appendChild(totalPriceElement);
        }
        
        
    }
});

// Scroll to Top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.onscroll = function () {
    const scrollBtn = document.getElementById('scrollBtn');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
};

// Initialize Carousel
const carouselElement = document.querySelector('#carouselExampleIndicators');
const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 3000,
    ride: 'carousel'
});

// Handle category image click
document.querySelectorAll('.category-img').forEach((categoryImg) => {
    categoryImg.addEventListener('click', function () {
        alert(`Redirecting to the category: ${categoryImg.alt}`);
    });
});
