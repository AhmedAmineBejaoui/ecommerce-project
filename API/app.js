let products = [];
let categories = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 1;
const productsPerPage = 6;


// Charger les produits depuis l'API
function loadProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      products = data;
      categories = [...new Set(data.map(product => product.category))];
      populateCategoryFilter();
      paginateProducts();
    })
    .catch(error => console.error('Erreur lors du chargement des produits :', error));
}

// Mise à jour du compteur du panier
function updateCartCount() {
  const cartItemsCount = document.getElementById('cart-items-count');
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  cartItemsCount.textContent = totalItems;
}

// Ajouter un produit au panier
function addToCart(product) {
  const existingProduct = cart.find(p => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Afficher les produits
function displayProducts(productsToDisplay) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // fara8 el  liste
  productsToDisplay.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');

    const title = document.createElement('h3');
    title.textContent = product.title;
    productItem.appendChild(title);

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    productItem.appendChild(img);

    const description = document.createElement('p');
    description.textContent = product.description;
    productItem.appendChild(description);

    const price = document.createElement('span');
    price.textContent = `TND${product.price}`;
    productItem.appendChild(price);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Ajouter au panier';
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.onclick = () => addToCart(product);
    productItem.appendChild(addToCartButton);

    productList.appendChild(productItem);
  });
}



// Filtrer les produits
function filterProducts() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const selectedCategory = document.getElementById('category-filter').value;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  paginateProducts(filteredProducts);
}

// Ajouter les catégories au filtre
function populateCategoryFilter() {
  const categoryFilter = document.getElementById('category-filter');
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Pagination des produits
function paginateProducts(filteredProducts = products) {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToDisplay = filteredProducts.slice(start, end);

  displayProducts(productsToDisplay);

  // Mise à jour des boutons de pagination
  document.getElementById('current-page').textContent = `Page ${currentPage}`;
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = end >= filteredProducts.length;
}

// Changer de page
function changePage(direction) {
  if (direction === 'next') {
    currentPage++;
  } else if (direction === 'prev') {
    currentPage--;
  }
  paginateProducts();
}

// Initialiser
loadProducts();
updateCartCount();
