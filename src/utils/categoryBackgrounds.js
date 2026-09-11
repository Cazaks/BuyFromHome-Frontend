import defaultBackground from "../assets/images/authpage_Image.jpg";

// Add one entry per category as real images become available.
// The key must exactly match the category's name as stored in the
// backend (productCategoryName). Until an entry exists here, that
// category falls back to defaultBackground automatically.
//
// Example, once you have a Grains image:
// import grainsBackground from "../assets/images/category_grains.jpg";
// const categoryBackgrounds = {
//   "Grains & Cereals": grainsBackground,
// };
const categoryBackgrounds = {};

export function getCategoryBackground(categoryName) {
  return categoryBackgrounds[categoryName] || defaultBackground;
}