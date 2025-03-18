import showProductDetails from "./module/product/showProductDetails.js";
import showShoppingCart from "./module/product/showShoppingCart.js";
import goProductToCart from "./module/product/goProductToCart.js";
import buttonMinusPlus from "./module/product/buttonMinusPlus.js";
import checkProductLocalStorage from "./module/product/checkProductLocalStorage.js";
import buttonMinusPlusCart from "./module/product/buttonMinusPlusCart.js"
import cleanShoppingCart from "./module/product/cleanShoppingCart.js";

(async function(){
    await showProductDetails();
    showShoppingCart();
    goProductToCart();
    buttonMinusPlus();
    checkProductLocalStorage();
    buttonMinusPlusCart();
    cleanShoppingCart();
})();