"use strict";

// Import the other modules
import { images } from "/src/js/assets.js";
import { addToCart } from "/src/js/cart.js";

// HTML Card Elements, built with JavaScript
const createProductCard = (product) => {
  // Using ".createElement()" and ".innerHTML" for creating an HTML Element in the DOM
  const article = document.createElement(`article`);
  article.className = `flex flex-col`;

  // Using ".innerHTML" with template literals for writing strings cleanly
  article.innerHTML = `
    <div class="relative rounded-xl overflow-hidden">
      <img
        src="${images[product.image.mobile]}"
        alt="${product.name}"
        class="size-full"
      />

      <button
        class="add-to-cart-btn absolute bottom-0 left-1/2 -translate-x-1/2
        translate-y-1/2 flex items-center gap-2 bg-white border-2 border-red-600
        text-sm font-semibold px-5 py-2 rounded-full hover:text-red-600
        transition-colors whitespace-nowrap">
          Add to Cart
      </button>
    </div>

    <div class="mt-8 pt-2">
      <p class="text-sm text-gray-400">${product.category}</p>
      <h3 class="font-semibold text-gray-800">${product.name}</h3>
      <p class="text-red-600 font-bold mt-1">$${product.price.toFixed(2)}</p>
    </div>
  `;

  // Event Listener after setting innerHTML
  const addToCartBtn = article.querySelector(`.add-to-cart-btn`);

  addToCartBtn.addEventListener(`click`, () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[product.image.thumbnail],
    });
  });

  return article;
};

// Loop through the "products" Array and render a card for each one into the product grid
export const renderProducts = (products) => {
  // Grid element from the application
  const productsGrid = document.getElementById(`product-grid`);

  // For each product in the Array, create a card and add it to the grid
  products.forEach((product) => {
    const card = createProductCard(product);
    productsGrid.appendChild(card);
  });
};
