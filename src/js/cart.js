"use strict";

import { icons } from "/src/js/assets.js";

export const renderCarbonNeutralIcon = () => {
  const element = document.getElementById(`carbon-neutral-icon`);
  if (element) {
    element.src = icons[`/src/assets/icons/icon-carbon-neutral.svg`];
  }
};

renderCarbonNeutralIcon();
