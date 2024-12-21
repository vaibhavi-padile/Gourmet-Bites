
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.style.top = '-60px'; // Adjust this value based on the navbar height
        } else {
            // Scrolling up
            navbar.style.top = '0';
        }
        lastScrollTop = scrollTop;
    });

    
// script.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});


    let cart = [];

    function updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = ''; // Clear the current cart display

        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price;
        });

        document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    }

    function addToCart(event) {
        const dishElement = event.target.closest('.dish');
        const itemId = dishElement.getAttribute('data-id');
        const itemName = dishElement.getAttribute('data-name');
        const itemPrice = parseFloat(dishElement.getAttribute('data-price'));

        // Check if the item is already in the cart
        const existingItem = cart.find(item => item.id === itemId);

        if (existingItem) {
            alert('This item is already in the cart');
        } else {
            cart.push({ id: itemId, name: itemName, price: itemPrice });
            updateCartDisplay();
        }
    }

    function removeFromCart(event) {
        const itemId = event.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== itemId);
        updateCartDisplay();
    }

    // Event listeners for adding to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Event delegation for removing from cart
    document.querySelector('.cart-items').addEventListener('click', event => {
        if (event.target.classList.contains('remove-btn')) {
            removeFromCart(event);
        }
    });