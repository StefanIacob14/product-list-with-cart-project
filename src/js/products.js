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
      <!-- Responsive Product Image, using "<picture></picture> HTML element -->
      <!-- Tells the browser which image to download, before it downloads anything -->
      <picture>
        <!-- Desktop - 1024px and above -->
        <source
          media ="(min-width: 1024px)"
          srcset="${images[product.image.desktop]}"
        />

        <!-- Tablet - 640px and above -->
        <source
          media="(min-width: 640px)"
          srcset="${images[product.image.tablet]}"
        />

        <!-- Mobile - default, no media query needed -->
        <img
          id="product-card-image"
          src="${images[product.image.mobile]}"
          alt="${product.name}"
          class="size-full rounded-xl border-2 border-transparent md:border-4"
        />
      </picture>

      <button
        class="add-to-cart-btn group/button absolute bottom-0 left-1/2 -translate-x-1/2
        translate-y-1/2 bg-white border border-red-600
        text-sm font-semibold px-5 py-2 rounded-full hover:text-white hover:border-red-800
        hover:bg-red-800 transition-all duration-200 cursor-pointer
        md:text-3xl md:py-5 md:px-8 lg:text-xl lg:px-5 lg:py-3
        ">
          <div class="flex items-center gap-2 md:gap-4 lg:gap-3">
            <img
              src="${icons[`/src/assets/icons/icon-add-to-cart.svg`]}"
              alt="Add to Cart"
              class="md:size-10 lg:size-7 group-hover/button:brightness-1000
              transition-all duration-200"
            />
            <span>Add to Cart</span>
          </div>
      </button>

      <div
        class="quantity-btn hidden absolute bottom-0 left-1/2 -translate-x-1/2
        translate-y-1/2 bg-red-800 text-sm font-semibold
        px-5 py-2 rounded-full text-white md:text-3xl md:py-5 md:px-8
        lg:px-5 lg:py-3">
          <div class="flex items-center gap-7.5 md:gap-17 lg:gap-11">
            <button
              class="decrement-quantity-btn border border-white rounded-full flex
              items-center justify-center cursor-pointer md:size-10 md:border-2 lg:size-7">
                <img
                  src="${icons[`/src/assets/icons/icon-decrement-quantity.svg`]}"
                  alt="Decrease ${product.name} quantity"
                  class="md:size-4"
                />
            </button>

            <span class="quantity-display md:text-4xl lg:text-xl pointer-events-none"></span>

            <button
              class="increment-quantity-btn border border-white rounded-full flex
              items-center justify-center cursor-pointer md:size-10 md:border-2 lg:size-7">
                <img
                  src="${icons[`/src/assets/icons/icon-increment-quantity.svg`]}"
                  alt="Increase ${product.name} quantity"
                  class="md:size-4"
                />
            </button>
          </div>
      </div>
    </div>

    <div class="flex flex-col gap-1 my-8 pointer-events-none md:gap-4 md:my-14 lg:my-10 lg:gap-2">
      <p class="text-sm text-gray-400 md:text-[1.4rem] lg:text-lg">${product.category}</p>
      <h3 class="font-bold text-gray-800 md:text-3xl lg:text-xl">${product.name}</h3>
      <p class="text-red-700 font-semibold md:text-3xl lg:text-xl">$${product.price.toFixed(2)}</p>
    </div>
  `;

  // Add "Add to Cart" button's Event Listener, after setting innerHTML
  const addToCartBtn = article.querySelector(`.add-to-cart-btn`);
  const quantityBtn = article.querySelector(`.quantity-btn`);

  // Select the "Quantity Display" button's HTML elements
  const decrementBtn = article.querySelector(`.decrement-quantity-btn`);
  const quantityDisplay = article.querySelector(`.quantity-display`);
  const incrementBtn = article.querySelector(`.increment-quantity-btn`);

  addToCartBtn.addEventListener(`click`, () => {
    // "add-to-cart" button's function that insert a new object in the "cartState" array
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[product.image.thumbnail],
    });

    // Display the desire product's quantity for the Cart
    const existingItem = arrayProductReference(product.id);
    quantityDisplay.textContent = existingItem.quantity;

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
  // Increment button Event Listener + quantity display
  incrementBtn.addEventListener(`click`, () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[product.image.thumbnail],
    });

    // Display the Cart product's quantity, after clicking the increment button
    const currentItem = arrayProductReference(product.id);
    quantityDisplay.textContent = currentItem.quantity;
  });

  // Decrement button Event Listener + quantity display
  decrementBtn.addEventListener(`click`, () => {
    removeFromCart(product.id);

    // Display the Cart product's quantity, after clicking the decrement button
    const currentItem = arrayProductReference(product.id);

    // The "null" Guard - for the last item in the Cart that is completely erased
    // Because the "arrayProductReference" cannot find any Reference in the
    // "cartState.items" array, it will return "null"
    // This "null" result will break the code, and an error will appear in the Console
    if (currentItem) {
      // If the item still exist in the Cart, update the quantity display
      quantityDisplay.textContent = currentItem.quantity;
    }
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
