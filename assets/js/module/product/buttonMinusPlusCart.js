import errorMesage from "./errorMesage.js";

export default function buttonMinusPlusCart() {
    const cartItems = document.querySelector(".shopping-cart__items");
    const itemsProduct = document.querySelectorAll(".shopping-cart__items__product");
    if (itemsProduct.length === 0) return;

    const btnGoCheckout = cartItems.querySelector(".go-checkout");
 
    const dataProducts = JSON.parse(localStorage.getItem("cart")) || [];
    itemsProduct.forEach((itemProduct, index) => {
        const inputProductQtd = itemProduct.querySelector(".product-qtd");
        const btnProductMinus = itemProduct.querySelector(".product-minus");
        const btnProductPlus = itemProduct.querySelector(".product-plus");
        const valueProductSpan = itemProduct.querySelector(".shopping-cart__items__product__details__price");
        const errorContainer = itemProduct.querySelector(".shopping-cart__items__product__details"); 

        if (!dataProducts[index]) return;
       
        const stockMax = dataProducts[index].stock;
        const priceUnit = dataProducts[index].price;
        itemProduct.setAttribute("maxStock", stockMax);

        updateValue(valueProductSpan, priceUnit, Number(inputProductQtd.value));

        inputProductQtd.addEventListener("input", () => checkValueInput(inputProductQtd, stockMax, priceUnit, valueProductSpan, errorContainer));
        btnProductMinus.addEventListener("click", () => removeValueInput(inputProductQtd, stockMax, priceUnit, valueProductSpan, errorContainer));
        btnProductPlus.addEventListener("click", () => addValueInput(inputProductQtd, stockMax, priceUnit, valueProductSpan, errorContainer));
    });

    function checkValueInput(inputProductQtd, stockMax, priceUnit, valueProductSpan, errorContainer) {
        let currentQuantity = Number(inputProductQtd.value);

        if (currentQuantity < 0) {
            currentQuantity = 0;
            errorMesage("Apenas valores positivos!", errorContainer);
            btnGoCheckout.style.pointerEvents = "none";  
        } else if (currentQuantity > stockMax) {
            currentQuantity = stockMax;
            errorMesage("Quantidade maior que o disponível!", errorContainer); 
            btnGoCheckout.style.pointerEvents = "none";
        } else {
            removeErrorMessage(errorContainer);
        };

        inputProductQtd.value = currentQuantity;
        updateValue(valueProductSpan, priceUnit, currentQuantity);
    };

    function removeErrorMessage(errorContainer) {
        const pError = errorContainer.querySelector(".error");
        if (pError) pError.remove();
        btnGoCheckout.removeAttribute("style");
    };

    function removeValueInput(inputProductQtd, stockMax, priceUnit, valueProductSpan, errorContainer) {
        let currentQuantity = Number(inputProductQtd.value);
        currentQuantity = Math.max(0, currentQuantity - 1);
        
        inputProductQtd.value = currentQuantity;
        updateValue(valueProductSpan, priceUnit, currentQuantity);

        if (currentQuantity === 0) {
            errorMesage("Adicione pelo menos um produto!", errorContainer);
            btnGoCheckout.style.pointerEvents = "none";
        };
        if (currentQuantity > 0 && currentQuantity < stockMax) {
            btnGoCheckout.style.pointerEvents = "none";
            removeErrorMessage(errorContainer);};
    };

    function addValueInput(inputProductQtd, stockMax, priceUnit, valueProductSpan, errorContainer) {
        let currentQuantity = Number(inputProductQtd.value);
        if (currentQuantity > stockMax) errorMesage("Quantidade maior que o disponível!", errorContainer);
        currentQuantity = Math.min(stockMax, currentQuantity + 1);
        
        inputProductQtd.value = currentQuantity;
        updateValue(valueProductSpan, priceUnit, currentQuantity);

        if (currentQuantity > 0) {
            btnGoCheckout.style.pointerEvents = "none";
            removeErrorMessage(errorContainer);};
    };

    function updateValue(valueProductSpan, priceUnit, currentQuantity) {
        const total = document.querySelector(".shopping-cart-total");
        if (!total) return;
    
        const productPrice = priceUnit * currentQuantity;
        valueProductSpan.innerText = `R$ ${productPrice.toFixed(2)}`;
    
        const newTotal = updateTotal();
        localStorage.setItem("cartTotal", newTotal);
        
        document.dispatchEvent(new CustomEvent("cartTotalUpdated", {
            detail: { total: newTotal }
        }));

        total.innerText = `R$ ${newTotal.toFixed(2)}`;
    };
    
    function updateTotal() {
        const productsScroll = document.querySelector(".products-scroll");
        const _priceProductsSpan = productsScroll.querySelectorAll(".shopping-cart__items__product__details__price");
        
        const arrPriceProductsSpan = [..._priceProductsSpan].map(priceProduct => Number(priceProduct.innerText.replace("R$", "").trim()));
        
        const total = arrPriceProductsSpan.reduce((acc, price) => acc + price, 0);
        return total;
    };
};