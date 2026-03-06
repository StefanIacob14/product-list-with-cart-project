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
export const modalWindowState = () => {
  overlayElem.classList.toggle(`hidden`);
  modalWindow.classList.toggle(`hidden`);
};
