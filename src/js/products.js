"use strict";

// Import the other modules
import { images, icons } from "/src/js/assets.js";
import { CARD_ACTIVE_BORDER, CARD_DEFAULT_BORDER } from "/src/js/constants.js";
import {
  addToCart,
  removeFromCart,
  arrayProductReference,
} from "/src/js/cart.js";

// Create HTML Card Elements, with JavaScript
export const createProductCard = (product) => {
  // Using ".createElement()" and ".innerHTML" for creating an HTML Element in the DOM
  const article = document.createElement(`article`);
  article.dataset.id = product.id;
  article.className = `flex flex-col`;

  // Using ".innerHTML" with template literals for writing strings cleanly
  article.innerHTML = `
    <div class="relative">
      <img
        id="product-card-image"
        src="${images[product.image.mobile]}"
        alt="${product.name}"
        class="size-full rounded-xl border-2 border-transparent"
      />

      <button
        class="add-to-cart-btn absolute bottom-0 left-1/2 -translate-x-1/2
        translate-y-1/2 bg-white border border-red-600
        text-sm font-semibold px-5 py-2 rounded-full hover:text-red-600
        ">
          <div class="flex items-center gap-2">
            <img
              src="${icons[`/src/assets/icons/icon-add-to-cart.svg`]}"
              alt="Add to Cart"
            />
            <span>Add to Cart</span>
          </div>
      </button>

      <div
        class="quantity-btn hidden absolute bottom-0 left-1/2 -translate-x-1/2
        translate-y-1/2 bg-red-800 text-sm font-semibold
        px-5 py-2 rounded-full">
          <div class="flex items-center gap-7.5">
            <button
              class="decrement-quantity-btn border border-white rounded-full p-1 py-2">
                <img
                  src="${icons[`/src/assets/icons/icon-decrement-quantity.svg`]}"
                  alt="Decrease ${product.name} quantity"
                />
            </button>

            <span class="quantity-display text-white">1</span>

            <button
              class="increment-quantity-btn border border-white rounded-full p-1">
                <img
                  src="${icons[`/src/assets/icons/icon-increment-quantity.svg`]}"
                  alt="Increase ${product.name} quantity"
                />
            </button>
          </div>
      </div>
    </div>

    <div class="flex flex-col gap-1 my-8">
      <p class="text-sm text-gray-400">${product.category}</p>
      <h3 class="font-bold text-gray-800">${product.name}</h3>
      <p class="text-red-700 font-semibold">$${product.price.toFixed(2)}</p>
    </div>
  `;

  // Add "Add to Cart" button's Event Listener, after setting innerHTML
  const addToCartBtn = article.querySelector(`.add-to-cart-btn`);
  const quantityBtn = article.querySelector(`.quantity-btn`);

  addToCartBtn.addEventListener(`click`, () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[product.image.thumbnail],
    });

    // Selected product's image has a border, indicates that is in the Cart
    article
      .querySelector(`#product-card-image`)
      .classList.remove(CARD_DEFAULT_BORDER);
    article
      .querySelector(`#product-card-image`)
      .classList.add(CARD_ACTIVE_BORDER);

    // Change between "Add to Cart" button and "Quantity Display" button
    addToCartBtn.classList.add(`hidden`);
    quantityBtn.classList.remove(`hidden`);
  });

  // Add "Quantity Display" button's Event Listener, after setting innerHTML
  // Select the "Quantity Display" button's HTML elements
  const decrementBtn = article.querySelector(`.decrement-quantity-btn`);
  const quantityDisplay = article.querySelector(`.quantity-display`);
  const incrementBtn = article.querySelector(`.increment-quantity-btn`);

  // Increment button Event Listener + quantity display
  incrementBtn.addEventListener(`click`, () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[product.image.thumbnail],
    });

    const currentItem = arrayProductReference(product.id);
    quantityDisplay.textContent = currentItem.quantity;
  });

  // Decrement button Event Listener + quantity display
  decrementBtn.addEventListener(`click`, () => {
    removeFromCart(product.id);

    const currentItem = arrayProductReference(product.id);
    quantityDisplay.textContent = currentItem.quantity;
  });

  return article;
};

// Loop through the "products" Array and RENDER a card for each one into the Product Grid
export const renderProducts = (products) => {
  // Select the Grid Element from the application("index.html")
  const productsGrid = document.getElementById(`product-grid`);

  // For each product in the Array, create a card and add it to the grid
  products.forEach((product) => {
    // Create a variable for the "createProductCard" function
    const card = createProductCard(product);

    // Input the Card Elements ("card") into the application grid element ("productsGrid"), using ".appendChild()" method
    productsGrid.appendChild(card);
  });
};
