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
const ModalWindowState = () => {
  overlayElem.classList.toggle(`invisible`);
  modalWindow.classList.toggle(`invisible`);
};

confirmBtn.addEventListener(`click`, () => {
  ModalWindowState();
});

startNewOrderBtn.addEventListener(`click`, () => {
  ModalWindowState();
});
