

document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    loadCartItems();

    // Cambiar imagen de la cabecera cada 5 segundos
    let headerImages = ["images/header1.jpg", "images/header2.jpg", "images/header3.jpg"];
    let currentImageIndex = 0;
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % headerImages.length;
        document.querySelector(".header-image").src = headerImages[currentImageIndex];
    }, 5000);
});

function showDetails(itemId) {
    let details = {
        1: "El BMW 520d es parte de la serie 5 de BMW, conocida por combinar lujo con dinamismo y eficiencia. Equipado con un motor diésel de 2.0 litros, ofrece un equilibrio notable entre potencia y economía de combustible. La transmisión automática de 4 puertas (4P) asegura una experiencia de conducción suave y cómoda, ideal para viajes largos o uso diario en la ciudad.",
        2: "El BMW X5 es conocido por su robustez y elegancia, siendo un referente en el segmento de SUVs premium. La versión 3.0 xDrive 35i está equipada con un motor de gasolina de 3.0 litros que proporciona una potencia impresionante y un rendimiento ágil gracias al sistema de tracción integral xDrive, ideal tanto para carreteras pavimentadas como para aventuras todoterreno moderadas.",
        3: "El BMW 640 forma parte de la serie 6 de BMW, conocida por su diseño deportivo y refinado. Disponible en varias configuraciones, incluyendo cupé y convertible, el 640 ofrece una experiencia de conducción emocionante respaldada por motores potentes y tecnología de vanguardia.",
        4: "El BMW X6 ha establecido un estándar en el segmento de SUVs deportivos, con su diseño coupé que combina la robustez de un SUV con la elegancia de un coupé deportivo. "
    };
    document.getElementById("modal-text").innerText = details[itemId];
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function addToCart(event, itemName, price) {
    event.stopPropagation();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${itemName} ha sido agregado al carrito.`);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <p>${item.name} (${item.quantity}) - $${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });
    document.getElementById("cart-total").innerText = `Total: $${total}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

function toggleCart() {
    let cart = document.getElementById("cart");
    loadCartItems(); // Cargar los ítems del carrito cada vez que se muestre
    cart.style.display = cart.style.display === "block" ? "none" : "block";
}

function checkout() {
    alert("¡Gracias por tu compra!");
    localStorage.removeItem("cart");
    updateCartCount();
    loadCartItems();
    toggleCart();
}

function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    if (name === "" || email === "" || message === "") {
        alert("Todos los campos son obligatorios.");
        return false;
    }
    alert("¡Gracias por tu mensaje!");
    return true;
}

function filterProducts() {
    let category = document.getElementById("category").value;
    let products = document.querySelectorAll(".gallery-item");
    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}