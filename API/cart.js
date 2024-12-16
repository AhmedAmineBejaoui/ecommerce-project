// n3abou el panier ml localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// el DOM
const cartList = document.getElementById('cart-list');
const totalPriceElement = document.getElementById('total-price');
const cartItemsCount = document.getElementById('cart-items-count'); // Compteur des articles dans le panier

// Affichage produits du panier
function displayCart() {
  cartList.innerHTML = ''; // nfar8ou liste mta3 panier
  let total = 0;

  cart.forEach((product, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    cartItem.appendChild(img);

    const details = document.createElement('div');
    details.classList.add('details');

    const title = document.createElement('h3');
    title.textContent = product.title;
    details.appendChild(title);

    const price = document.createElement('span');
    price.textContent = `TND${product.price.toFixed(2)}`;
    details.appendChild(price);

    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity');

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = product.quantity || 1;
    quantityInput.min = 1;
    quantityInput.addEventListener('change', (e) => updateQuantity(e, index));
    quantityContainer.appendChild(quantityInput);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Retirer';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = () => removeFromCart(index);
    quantityContainer.appendChild(removeButton);

    details.appendChild(quantityContainer);
    cartItem.appendChild(details);

    cartList.appendChild(cartItem);

    total += product.price * (product.quantity || 1);
  });

  totalPriceElement.textContent = `TND ${total.toFixed(2)}`;
  updateCartCount(); // nbadlou el compteur a chaque modification
}

// Fonction bch  nbadlou el compteur d'articles fl panier
function updateCartCount() {
  const totalItems = cart.reduce((acc, product) => acc + (product.quantity || 1), 0);
  cartItemsCount.textContent = totalItems;
}

// Fonction bch tfassa5 produit
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Fonction bch nbadlou quantite mta3 el produit
function updateQuantity(event, index) {
  const newQuantity = parseInt(event.target.value);
  if (newQuantity < 1) return; // el quantite ma lazmch tkoun a9al mn 1

  cart[index].quantity = newQuantity;
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// fonction bch tt3ada ll casa

function checkout() {
  const checkoutMessageElement = document.getElementById('checkout-message');
  
  if (cart.length === 0) {
    checkoutMessageElement.textContent = 'Votre panier est vide. Vous ne pouvez pas procéder à la caisse.';
    checkoutMessageElement.style.display = 'block'; //  message d'erreur
    return;
  }
  
  checkoutMessageElement.textContent = 'Redirection vers la page de confirmation...';
  checkoutMessageElement.style.display = 'block'; //  message de redirection
  
  // tab9a testanna  2 secondes
  setTimeout(() => {
    window.location.href = 'confirmation.html';
  }, 2000);
}


// Affichage initial ll panier
displayCart();
