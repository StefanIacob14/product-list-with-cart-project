"use strict";

// Import the other modules
import { icons, images } from "/src/js/assets.js";
import { CARD_DEFAULT_BORDER, CARD_ACTIVE_BORDER } from "/src/js/constants.js";
import { modalWindow } from "/src/js/modal-window.js";

// Render the carbon-neutral icon
export const renderCarbonNeutralIcon = () => {
  const element = document.getElementById(`carbon-neutral-icon`);
  if (element) {
    element.src = icons[`/src/assets/icons/icon-carbon-neutral.svg`];
  }
};

// THE CART STATE - variable where we will input our Cart Element DATA
// NEVER manipulate the DOM without going through state first
export const cartState = {
  items: [], // Array of: { id, name, price, quantity, image }
};

// Dynamically update the Cart UI, based on the "cartState" object
export const renderCart = () => {
  // Select the Cart elements from the application ("index.html")
  const cartItemsEl = document.getElementById(`cart-items`);
  const cartCountEl = document.getElementById(`cart-count`);
  const cartFooterEl = document.getElementById(`cart-footer`);
  const cartTotalEl = document.getElementById(`cart-total`);

  // Create the "totalItems" variable and use the ".reduce()" Array method to calculate the products number in the "items" Array
  const totalItems = cartState.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  // Update the "cartCountEl" variable in the Cart Heading UI
  cartCountEl.textContent = totalItems;

  // Toggle the Order Total + Confirm Button Cart UI elements, if the "items" Array doesn't have a product
  // the second parameter ("cartState.items.length === 0") shows whether the "hidden" property should be included in the "index.html"
  cartFooterEl.classList.toggle(`hidden`, cartState.items.length === 0);

  // Dynamically Populate the "cartItemsEl" variable
  if (cartState.items.length === 0) {
    // If the "items" Array doesn't have any product, Cart UI will show just an image and a message
    cartItemsEl.className = `justify-self-center`;
    cartItemsEl.innerHTML = `
      <img
        src="${icons[`/src/assets/icons/illustration-empty-cart.svg`]}"
        alt="Empty Cart"
        class="justify-self-center mt-5"
      />
      <li class="text-center text-[0.9rem] text-red-950/50 font-semibold py-5">
        Your added items will appear here
      </li>
    `;
  } else {
    // If the "items" Array has a product, or "cartState.items.length === 0" is false, then the products should RENDER inside the Cart element
    // Using the ".map()" Array method to transform each Cart item into an HTML string
    // Using the ".join('')" Array method to merge the Array into one single string
    cartItemsEl.innerHTML = cartState.items
      .map(
        (item) => `
      <li class="flex items-center justify-between gap-7 py-3 border-b-2 border-b-red-100/70">
        <div class="flex gap-5">
          <img
            src="${item.image}"
            alt="${item.name}"
            class="size-12 rounded-xl"
          />
          <div>
            <p class="font-semibold text-sm">${item.name}</p>
            <p class="text-sm text-gray-400 mt-1">
              <span class="text-red-600 font-bold">${item.quantity}x</span>
              <span class="mx-2">$${item.price.toFixed(2)}</span>
              <span class="font-semibold text-gray-700">
                $${(item.price * item.quantity).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <button class="remove-btn w-5 h-5 rounded-full border-2 border-gray-400
        text-gray-400 hover:border-red-600 hover:text-red-600 flex items-start
        justify-center text-xs font-bold transition-colors" data-id="${item.id}"
        aria-label="Remove ${item.name}">x</button>
      </li>`,
      )
      .join("");

    // Add Event Listener for the remove button
    cartItemsEl.querySelectorAll(`.remove-btn`).forEach((btn) => {
      btn.addEventListener(`click`, () => removeFromCart(btn.dataset.id));
    });
  }

  // Create the "totalPrice" variable and use the ".reduce()" Array method to calculate the total price of the products in the "items" Array
  const totalPrice = cartState.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Update the "cartTotalEl" variable and render the Cart Element total price
  cartTotalEl.textContent = `$${totalPrice.toFixed(2)}`;
};

// Cart Element UI Interactivity
export const initCart = () => {
  // Render the initial empty Cart element
  renderCart();

  // Cart element "Confirm Order" button's Event Listener
  document
    .getElementById(`cart-confirm-button`)
    .addEventListener(`click`, modalWindow);
};

// Function to add a product to the Cart, or increments its quantity if already present
export const addToCart = (product) => {
  // Checking if the product is already in the Cart, using the ".find()" Array method for REFERENCE
  const existingItem = cartState.items.find((item) => item.id === product.id);

  // Implement the "addToCart" function logic
  if (existingItem) {
    // If it's already in the Cart - increase the quantity
    existingItem.quantity += 1;
  } else {
    // If it's a New Item - add it to the array with a starting quantity of 1, using The Spread Operator
    cartState.items.push({ ...product, quantity: 1 });
  }

  // Cart State has changed - rebuild the Cart UI
  renderCart();
};

// Function for "removeFromCart", to find a product card by its "data-id" and update its border
// This is how "cart.js" file communicates with "products.js" file, without using "Import"
const updateCardBorder = (productId) => {
  // Find the article element from "product.js" that has "data-id" matching the "productId"
  const productCard = document.querySelector(`article[data-id="${productId}"]`);

  // If the card doesn't exist, stop here
  if (!productCard) return;

  // Selecting the card's product image
  const cardImage = productCard.querySelector(`#product-card-image`);

  // If the image doesn't exist, stop here
  if (!cardImage) return;

  // Remove the image border if we delete the product from the Cart
  cardImage.classList.add(CARD_DEFAULT_BORDER);
  cardImage.classList.remove(CARD_ACTIVE_BORDER);
};

// Function for "removeFormCart" to switch between the "Add to Cart" button and the "Quantity Display" button
const productCardBtnSwitch = (productId) => {
  // Find the article element from the "product.js" file, based of the "productId"
  const productCard = document.querySelector(`article[data-id="${productId}"]`);

  // If the product card doesn't exist, stop here
  if (!productCard) return;

  // Switch off the "Quantity Display" button
  const addToCartBtn = productCard.querySelector(`.add-to-cart-btn`);
  const quantityBtn = productCard.querySelector(`.quantity-btn`);

  // addToCartBtn.classList.remove(`hidden`);
  quantityBtn.classList.add(`hidden`);
  addToCartBtn.classList.remove(`hidden`);
};

// Function to delete a product from the Cart Element
export const removeFromCart = (productId) => {
  // Checking if the product is in the Cart, using ".find()" Array method for REFERENCE
  // Or, in this case, Selecting the product in the "cartState.items" Array
  const existingItem = cartState.items.find(
    (item) => item.id === Number(productId),
  );

  // Implement "removeFromCart" function logic
  if (existingItem.quantity > 1) {
    // If the product is in the Cart more than 1, decrease the quantity by 1
    existingItem.quantity -= 1;
  } else {
    // If the product is in the Cart just once, delete the product
    // ".filter()" Array method returns a new Array, with products that have passed
    cartState.items = cartState.items.filter(
      (item) => item.id !== Number(productId),
    );

    // "updateCardBorder" function for the product's image border
    updateCardBorder(Number(productId));

    // "productCardBtnSwitch" function for product's card buttons switch
    productCardBtnSwitch(Number(productId));
  }

  // "cartState" has changed, so render the Cart Element again
  renderCart();
};

// Function that extract the product's quantity from the Cart
// This function allow "product.js" to read a product quantity directly from the "cartState.items" Array
export const arrayProductReference = (productId) => {
  return cartState.items.find((item) => item.id === Number(productId));
};
