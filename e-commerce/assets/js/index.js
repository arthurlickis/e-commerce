import setProducts from "./module/index/setProducts.js";
import searchProducts from "./module/index/searchProduct.js";
import filterProducts from "./module/index/filterProducts.js";
import getDataIdProduct from "./module/index/getDataIdProduct.js";
import checkProductLocalStorage from "./module/product/checkProductLocalStorage.js";
import showShoppingCart from "./module/product/showShoppingCart.js";
import buttonMinusPlusCart from "./module/product/buttonMinusPlusCart.js";
import cleanShoppingCart from "./module/product/cleanShoppingCart.js";

(async function() {
    await setProducts();
    searchProducts();
    filterProducts();
    getDataIdProduct();
    showShoppingCart();
    checkProductLocalStorage();
    buttonMinusPlusCart();
    cleanShoppingCart();
})();