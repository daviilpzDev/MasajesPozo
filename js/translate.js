const translations = {
    '': '',
    'Remove': 'Eliminar',
    'Search': 'Buscar',
    'Beyond Genetics': 'Más allá de la genética',
    'Payment method:': 'Método de pago:',
    'Add to cart': 'Añadir al carrito',
    'Cryptocurrencies': 'Criptomonedas',
    'Bank account': 'Cuenta bancaria',
    'Quantity:': 'Cantidad:',
    'Shipping Address:': 'Dirección de envío:',
    'More info: (Optional)': 'Más info: (Opcional)',
    'Buy now': 'Comprar ya',
    'Dose': 'Dosis',
    'Price': 'Precio',
    'All products': 'Todos los productos',
    'Products of GH SPAIN': 'Productos de GH SPAIN',
    'Products of Deus Medical': 'Productos de Deus Medical',
    'Other products': 'Otros productos',
    'Your Cart': 'Tu Cesta',
    'Proceed to checkout': 'Proceder al pago',
    'Previous': 'Anterior',
    'Next': 'Siguiente',
    'Contact with us:': 'Contáctanos:',
    'Secure payments:': 'Pagos seguros:',
    'More info:': 'Más información:',
    'GH SPAIN | All rights reserved ©2023': 'GH SPAIN | Todos los derechos reservados ©2023',
};
const elementsToTranslate = document.querySelectorAll('[data-translate]');
let isTranslated = getCookie('isTranslated') === 'true';
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}
function getCookie(name) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim().split('='));
    const cookie = cookies.find(cookie => cookie[0] === name);
    return cookie ? decodeURIComponent(cookie[1]) : null;
}
function applyTranslation() {
    elementsToTranslate.forEach(element => {
        const originalText = element.getAttribute('data-translate');
        const translatedText = translations[originalText];
        if (isTranslated && translatedText) {
            element.textContent = translatedText;
        } else {
            element.textContent = originalText;
        }
    });
    updateButtonText();
}
function toggleTranslation() {
    isTranslated = !isTranslated;
    setCookie('isTranslated', isTranslated ? 'true' : 'false', 30);
    applyTranslation();
}
function updateButtonText() {
    const translateButton = document.querySelector('.translateButton');
    if (isTranslated) {
        translateButton.textContent = 'ES';
    } else {
        translateButton.textContent = 'EN';
    }
    const translateButtonMobile = document.querySelector('.menuUsercontent .translateButton');
    if (isTranslated) {
        translateButtonMobile.textContent = 'ES';
    } else {
        translateButtonMobile.textContent = 'EN';
    }
}
applyTranslation();
const translateButton = document.querySelector('.translateButton');
translateButton.addEventListener('click', toggleTranslation);
const translateButtonUserMenu = document.querySelector('.menuUsercontent .translateButton');
translateButtonUserMenu.addEventListener('click', toggleTranslation);
