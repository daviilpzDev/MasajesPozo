const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');
fetch('../json/products.json')
  .then(response => response.json())
  .then(data => {
    let selectedProduct = null;
    for (const productType in data) {
      const productsOfType = data[productType];
      selectedProduct = productsOfType.find(product => product.id === productId);
      if (selectedProduct) {
        break;
      }
    }
    if (selectedProduct) {
      document.getElementById("product-title").textContent = selectedProduct.title;
      document.getElementById("product-description").textContent = selectedProduct.description;
      document.getElementById("product-price").textContent = selectedProduct.price;
      document.getElementById("product-dose").textContent = selectedProduct.dose;

      const mainImageContainer = document.getElementById("product-image");
      const thumbnails = [selectedProduct.image, selectedProduct.hoverImage, selectedProduct.analytics];
      function updateMainImage(imageUrl) {
        mainImageContainer.style.backgroundImage = `url('${imageUrl}')`;
      }
      updateMainImage(selectedProduct.image);
      thumbnails.forEach((thumbnailUrl, index) => {
        const thumbnail = document.getElementById(`thumbnail-${index + 1}`);
        thumbnail.style.backgroundImage = `url('${thumbnailUrl}')`;
        thumbnail.addEventListener("click", () => {
          updateMainImage(thumbnailUrl);
        });
      });
    } else {
      console.log('Product not found');
    }
  })
  .catch(error => {
    console.log('Error loading JSON file:', error);
  });
const select = document.getElementById("optionSelect");
const cryptocurrencies = document.getElementById("cryptocurrencies");
const bank = document.getElementById("bank");
const addtocart = document.getElementById("addtocart");
select.addEventListener("change", () => {
  if (select.value === "cryptocurrencies") {
    cryptocurrencies.classList.add("show");
    bank.classList.remove("show");
    addtocart.classList.remove("show");
  } else if (select.value === "bank") {
    bank.classList.add("show");
    addtocart.classList.remove("show");
    cryptocurrencies.classList.remove("show");
  } else if (select.value === "addtocart") {
    addtocart.classList.add("show");
    cryptocurrencies.classList.remove("show");
    bank.classList.remove("show");
  }
});
const addToCartForm = document.querySelector("#addtocart form");
const cartButton = document.querySelector(".icon-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  const cartFromLocalStorage = localStorage.getItem("cart");
  const cart = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
<img src="${item.image}" alt="${item.title}" class="cart-item-image">
<div class="cart-item-details">
  <p class="cart-item-title">${item.title}</p>
  <p class="cart-item-price">${item.price.toFixed(2)}€</p>
  <button type="button" class="remove-button" data-index="${index}">Remove</button>
</div>
`;
    cartItemsContainer.appendChild(cartItem);
    total += parseFloat(item.price) * item.quantity;
  });
  cartTotal.textContent = `${total.toFixed(2)}€`;
}
function showCartNotification() {
  const cartNotification = document.querySelector(".cart-notification");
  cartNotification.style.display = "block";
  setTimeout(() => {
    cartNotification.style.display = "none";
  }, 2000);
}
addToCartForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("product-title").textContent;
  const price = parseFloat(document.getElementById("product-price").textContent);
  const image = document.getElementById("product-image").style.backgroundImage.slice(5, -2);
  const quantity = parseInt(addToCartForm.querySelector("input[name=quantity]").value, 10);
  const cartFromLocalStorage = localStorage.getItem("cart");
  const cart = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
  const existingProductIndex = cart.findIndex((item) => item.title === title);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ title, price, image, quantity });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  addToCartForm.reset();
  addToCartForm.classList.remove("show");
  updateCartUI();
  showCartNotification();
  window.prompt("Product added to cart!");
});
cartButton.addEventListener("click", () => {
  updateCartUI();
});
cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-button")) {
    const index = parseInt(event.target.getAttribute("data-index"), 10);
    const cartFromLocalStorage = localStorage.getItem("cart");
    const cart = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }
});
updateCartUI();
