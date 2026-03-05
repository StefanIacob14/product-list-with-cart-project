"use strict";

import { icons } from "/src/js/assets.js";

// Modal Confirmation Icon
document.getElementById(`icon-order-confirmed`).src =
  icons[`/src/assets/icons/icon-order-confirmed.svg`];

// Variables
const confirmBtn = document.getElementById(`cart-confirm-button`);
const overlayElem = document.getElementById(`overlay`);
const modalWindow = document.getElementById(`modal-window`);
const startNewOrderBtn = document.getElementById(`start-new-order-button`);

// Functions
const modalWindowState = () => {
  overlayElem.classList.toggle(`hidden`);
  modalWindow.classList.toggle(`hidden`);
};

export const modalWindowEvent = () => {
  // Cart "Confirm Order" button to open Modal Window
  confirmBtn.addEventListener(`click`, () => {
    modalWindowState();
  });

  // Modal Window "Start New Order" button to close the Modal Window
  startNewOrderBtn.addEventListener(`click`, () => {
    modalWindowState();
  });
};
