"use strict";

// Import the other modules
import "/src/style.css";
import "/src/js/cart.js";
import "/src/js/products.js";
import "/src/js/modal-window.js";

// "fetch()" API to fetch the data from "data.json"
const productsData = async () => {
  try {
    // fetch data from the "data.json" file
    const response = await fetch(`/data.json`);

    // Verifying if the request actually succeeded before proceeding
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status}`);
    }

    // Parse the raw JSON text into a JavaScript Array of product objects
    const products = await response.json();

    // Inspecting the result that we have received, by using console.log()
    console.log(`Products loaded:`, products);

    // Initialize Cart Event Listeners before rendering anything on the page
    // initCart();

    // Render all product cards into the DOM
    renderProducts(products);
  } catch (error) {
    // Show a user-friendly error message in the UI, during the production
    console.error(`App initialization failed:`, error);
  }
};

// Call the function
productsData();
