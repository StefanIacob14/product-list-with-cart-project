"use strict";

// IMPORT ASSETS from "src" folder
// Import icons from "src" folder
const icons = import.meta.glob(`/src/assets/icons/*.svg`, {
  eager: true,
  import: `default`,
});

// Import images from "src" folder
const images = import.meta.glob(`/src/assets/images/image-*.jpg`, {
  eager: true,
  import: `default`,
});

// "fetch()" API
const dataJSON = async () => {
  try {
    const response = await fetch(`/data.json`);

    if (!response.ok) {
      console.log(`Response status: ${response.status}`);
    }

    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};
dataJSON();

// VARIABLES & FUNCTIONS
// Variables
const emptyCartImg = document.getElementById(`empty-cart-img`);
const confModalIcon = document.getElementById(`icon-order-confirmed`);

// Functions

// APPLICATION
// Cart Section
emptyCartImg.src = icons[`/src/assets/icons/illustration-empty-cart.svg`];

// Confirmation Modal Window
confModalIcon.src = icons[`/src/assets/icons/icon-order-confirmed.svg`];
