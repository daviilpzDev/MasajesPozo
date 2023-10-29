document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-button");
    function displayCartItems() {
        cartItemsContainer.innerHTML = "";
        const cartFromLocalStorage = localStorage.getItem("cart");
        const cart = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];

        cart.forEach((product, index) => {
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
    <span>${product.title} (x${product.quantity})</span>
    <span>${(product.price * product.quantity).toFixed(2)} €</span>
    <button type="button" class="remove-button" data-index="${index}" data-translate="Remove">Remove</button>
  `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    displayCartItems();
    checkoutButton.addEventListener("click", () => {
        alert("Proceeding to payment...");
    });
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-button")) {
            const index = parseInt(event.target.getAttribute("data-index"), 10);
            const cartFromLocalStorage = localStorage.getItem("cart");
            const cart = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCartItems();
        }
    });
});
