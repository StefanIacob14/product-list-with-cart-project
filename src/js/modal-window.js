"use strict";

import { icons } from "/src/js/assets.js";

// Modal Confirmation Icon
document.getElementById(`icon-order-confirmed`).src =
  icons[`/src/assets/icons/icon-order-confirmed.svg`];

// Variables
const overlayElem = document.getElementById(`overlay`);
const modalWindow = document.getElementById(`modal-window`);

// Functions
export const modalWindowState = () => {
  overlayElem.classList.toggle(`hidden`);
  modalWindow.classList.toggle(`hidden`);
};
