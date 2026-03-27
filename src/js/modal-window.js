"use strict";

import { icons } from "/src/js/assets.js";
import { cartState } from "/src/js/cart.js";

// Modal Confirmation Icon
document.getElementById(`icon-order-confirmed`).src =
  icons[`/src/assets/icons/icon-order-confirmed.svg`];

// Functions
const modalWindowState = () => {
  // Select the Modal Window HTML elements
  const overlayEl = document.getElementById(`overlay`);
  const modalWindowEl = document.getElementById(`modal-window`);

  overlayEl.classList.toggle(`hidden`);
  modalWindowEl.classList.toggle(`hidden`);
};

// Function to reset the application state, after the user confirm its order
const resetOrder = () => {
  // Clear the "cartState" variable
  cartState.items = [];

  // Quickly reload the webpage state, using the "window.location.reload()"
  window.location.reload();
};

// Display the Confirmation Modal Window, after the user press the "Confirm Order" button
export const modalWindow = () => {
  // If the cart is empty, don't show the Modal Window
  if (cartState.items.length === 0) return;

  // Selecting the Modal Window HTML elements
  const modalItemsEl = document.getElementById(`modal-items`);
  const modalTotalEl = document.getElementById(`modal-total`);

  // Create the "totalPrice" variable, where we input the total price for the products
  const totalPrice = cartState.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Display the product list inside the Modal Window
  modalItemsEl.innerHTML = cartState.items
    .map(
      (item) => `
    <li class="flex items-center gap-4 py-3 border-b-2 border-b-red-100/70
    pointer-events-none md:gap-10 md:py-5 lg:gap-6">
      <img
        src="${item.image}"
        alt="${item.name}"
        class="size-12 rounded-xl object-cover md:size-20 lg:size-18"
      />
      <div class="flex-1">
        <p class="font-semibold text-sm md:text-2xl md:mb-2">${item.name}</p>
        <p class="text-sm text-gray-400 md:text-2xl">
          <span class="text-red-600 font-semibold">${item.quantity}x</span>
          <span class="ml-6">$${item.price.toFixed(2)}</span>
        </p>
      </div>
      <p class="font-semibold mr-2 md:text-2xl">$${(item.price * item.quantity).toFixed(2)}</p>
    </li>`,
    )
    .join("");

  // Dynamically update the Modal Window "modalTotalEl" UI element
  modalTotalEl.textContent = `$${totalPrice.toFixed(2)}`;

  // Render Modal Window
  modalWindowState();

  // Modal Window "Start New Order" button's Event Listener
  document
    .getElementById(`start-new-order-button`)
    .addEventListener(`click`, resetOrder);
};
