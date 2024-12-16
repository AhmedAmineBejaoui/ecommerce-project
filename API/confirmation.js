// 3abi el panier ml  localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const orderSummary = document.getElementById('order-summary');
const confirmationForm = document.getElementById('confirmation-form');
const confirmationMessage = document.getElementById('confirmation-message');

// moulaa5es mta3 el commande
function displayOrderSummary() {
  if (cart.length === 0) {
    orderSummary.innerHTML = '<p>Votre panier est vide.</p>';
    return;
  }

  let total = 0;
  const summaryList = document.createElement('ul');
  summaryList.style.listStyleType = 'none';
  summaryList.style.padding = 0;

  cart.forEach(product => {
    const item = document.createElement('li');
    item.style.marginBottom = '10px';
    item.innerHTML = `
      <strong>${product.title}</strong> - ${product.quantity || 1} x TND${product.price.toFixed(2)}
    `;
    summaryList.appendChild(item);
    total += (product.price * (product.quantity || 1));
  });

  orderSummary.innerHTML = '';
  orderSummary.appendChild(summaryList);

  const totalElement = document.createElement('p');
  totalElement.style.marginTop = '20px';
  totalElement.innerHTML = `<strong>Total :</strong> TND${total.toFixed(2)}`;
  orderSummary.appendChild(totalElement);
}

// Gérer la soumission du formulaire
confirmationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const userData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    phone: document.getElementById('phone').value,
    paymentMethod: document.getElementById('payment-method').value,
  };

  // Afficher le message de confirmation
  confirmationMessage.innerHTML = `
    <div>
      Merci pour votre commande, <strong>${userData.name}</strong> !
    </div>
  `;

  // les methodes de paiement
  switch (userData.paymentMethod) {
    case 'credit-card':
      confirmationMessage.innerHTML += `
        <p>Vous serez redirigé vers un formulaire sécurisé pour compléter votre paiement par carte bancaire.</p>
      `;
      // Simuler une redirection
      setTimeout(() => {
        alert("Redirection vers le formulaire de paiement sécurisé...");
      }, 2000);
      break;
    case 'paypal':
      confirmationMessage.innerHTML += `
        <p>Redirection vers PayPal...</p>
      `;
      // Simuler une redirection
      setTimeout(() => {
        alert("Redirection vers PayPal.");
      }, 2000);
      break;
    case 'bank-transfer':
      confirmationMessage.innerHTML += `
        <p>Veuillez effectuer un virement bancaire en utilisant les informations suivantes :</p>
        <ul>
          <li>IBAN : TN59 1234 5678 9012 3456 7890</li>
          <li>Code BIC : BICTNT123</li>
        </ul>
      `;
      break;
    default:
      confirmationMessage.innerHTML += `
        <p>Mode de paiement non valide.</p>
      `;
      break;
  }

  // fara8 el panier
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  orderSummary.innerHTML = '<p>Votre panier est maintenant vide.</p>';
});

// Initialiser la page
displayOrderSummary();
