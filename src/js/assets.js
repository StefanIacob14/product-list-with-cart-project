"use strict";

// Import ICONS from "src" folder
export const icons = import.meta.glob(`/src/assets/icons/*.svg`, {
  eager: true,
  import: `default`,
});

// Import IMAGES from "src" folder
export const images = import.meta.glob(`/src/assets/images/image-*.jpg`, {
  eager: true,
  import: `default`,
});
