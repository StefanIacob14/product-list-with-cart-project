"use strict";

// Import the other modules
import { icons } from "/src/js/assets.js";
import { modalWindowEvent } from "/src/js/modal-window.js";

// Render the carbon-neutral icon
export const renderCarbonNeutralIcon = () => {
  const element = document.getElementById(`carbon-neutral-icon`);
  if (element) {
    element.src = icons[`/src/assets/icons/icon-carbon-neutral.svg`];
  }
};

// THE CART STATE - rule: always update this object first, then re-render the UI
// NEVER manipulate the DOM without going through state first
const cartState = {
  items: [], // Array of: { id, name, price, quantity, image }
};

// PRIVATE FUNCTIONS (functions used by the cart element)
// Function to rebuild the entire Cart UI, based on the "cartState" object
const renderCart = () => {
  // Select the Cart elements
  const cartItemsEl = document.getElementById(`cart-items`);
  const cartCountEl = document.getElementById(`cart-count`);
  const cartFooterEl = document.getElementById(`cart-footer`);
  const cartTotalEl = document.getElementById(`cart-total`);

  // Derive values from state - never store these separately
  const totalItems = cartState.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalPrice = cartState.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Update the item count in the Cart Heading
  cartCountEl.textContent = totalItems;

  // Toggle the order total + confirm button
  cartFooterEl.classList.toggle(`hidden`, cartState.items.length === 0);

  // Rebuild the Cart items list
  if (cartState.items.length === 0) {
    cartItemsEl.innerHTML = `
      <li class="text-center text-gray-400 py-8">
        Your added items will appear here
      </li>
    `;
  } else {
    // Using ".map()" method to transform each Cart item into an HTML string
    // Using ".join('')" method to merge the Array into one single string
    cartItemsEl.innerHTML = cartState.items
      .map(
        (item) => `
      <li class="flex items-center justify-between py-3">
        <div>
          <p class="font-semibold text-sm">${item.name}</p>
          <p class="text-sm text-gray-400 mt-1">
            <span class="text-red-600 font-bold">${item.guantity}x</span>
            <span class="mx-2">${item.price.toFixed(2)}$</span>
            <span class="font-semibold text-gray-700">
              ${(item.price * item.quantity).toFixed(2)}$
            </span>
          </p>
        </div>
        <button class="remove-btn w-5 h-5 rounded-full border-2 border-gray-400
        text-gray-400 hover:border-red-600 hover:text-red-600 flex items-center
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

  // Render the cart total price
  cartTotalEl.textContent = `${totalPrice.toFixed(2)}$`;
};

// Populates and display the Confirmation Modal, when user use the "confirm Order" button
const modalWindow = () => {
  // If the Cart is empty, don't show Modal Window
  if (cartState.items.length === 0) return;

  // Selecting Modal Window elements
  const modalOverlay = document.getElementById(`overlay`);
  const modalItemsEl = document.getElementById(`modal-items`);
  const modalTotalEl = document.getElementById(`modal-total`);

  const totalPrice = cartState.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Build the order summary list inside the Modal Window
  modalItemsEl.innerHTML = cartState.items
    .map(
      (item) => `
    <li class="flex items-center gap-4 py-3">
      <img
        src="${item.image}"
        alt="${item.name}"
        class="w-12 h-12 rounded-md object-cover"
      />
      <div class="flex-1">
        <p class="font-semibold text-sm">${item.name}</p>
        <p class="text-sm text-gray-400">
          <span class="text-red-600 font-bold">${item.quantity}x</span>
          <span class="ml-2">${item.price.toFixed(2)}$</span>
        </p>
      </div>
      <p class="font-bold">${(item.price * item.quantity).toFixed(2)}$</p>
    </li>`,
    )
    .join("");

  // Display Modal Window total price
  modalTotalEl.textContent = `${totalPrice.toFixed(2)}$`;

  // Render Modal Window
  modalWindowEvent();
};

// Reset the application to its initial state
const resetOrder = () => {
  // Clear the "cartState" variable
  cartState.items = [];

  // Rebuild the empty cart UI
  renderCart();

  // Hide the Modal Window
  modalWindowEvent();
};

// GENERAL FUNCTIONS (functions used by the other modules)
// Cart element related Event Listeners
export const initCart = () => {
  // Add the Cart element Event Listeners (appear and disappear)
  document
    .getElementById(`cart-confirm-button`)
    .addEventListener(`click`, modalWindow);
  document
    .getElementById(`start-new-order-button`)
    .addEventListener(`click`, resetOrder);

  // Render the initial empty cart state
  renderCart();
};

// Function to add a product to the Cart, or increments its quantity if already present
export const addToCart = (product) => {
  // Checking if the product is already in the Cart
  const existingItem = cartState.items.find((item) => item.id === product.id);

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

// Function to remove a product from the Cart
export const removeFromCart = (productId) => {
  // Using "filter()" to return a new Array, without the removed item
  cartState.items = cartState.items.filter((item) => item.id !== productId);

  // Cart State has changed - rebuild the Cart UI
  renderCart();
};
