import errorMesage from "./errorMesage.js";

export default function buttonMinusPlus() {
    const details = document.querySelector(".shopping-cart__items__product__details__qtd");
    const inputProductQtd = document.querySelector(".product-qtd");
    const btnProductMinus = document.querySelector(".product-minus");
    const btnProductPlus = document.querySelector(".product-plus");
    const btnAddToCart = document.querySelector(".add-to-cart");
    const productDetailsDescription = document.querySelector(".product-details__description");
    const stockMax = Number(productDetailsDescription.getAttribute("maxStock"));

    inputProductQtd.addEventListener("input", checkValueInput);
    btnProductMinus.addEventListener("click", removeValueInput);
    btnProductPlus.addEventListener("click", addValueInput);

    function checkValueInput() {
        let currentValue = Number(inputProductQtd.value);
        if (currentValue < 0) {
            inputProductQtd.value = 0;
            errorMesage("Apenas valores positivos!", details);
        } else {
            inputProductQtd.value = currentValue;
            const pError = document.querySelector(".error");
            if (pError) pError.remove();
            btnAddToCart.disabled = false;
        }

        if (currentValue > stockMax) {
            inputProductQtd.value = stockMax;
            errorMesage("Quantidade maior que o disponível!", details);
        } else {
            inputProductQtd.value = currentValue;
            const pError = document.querySelector(".error");
            if (pError) pError.remove();
            btnAddToCart.disabled = false;
        };
    };

    function removeValueInput() {
        let currentValue = Number(inputProductQtd.value);
        currentValue--;

        if (currentValue <= 0) {
            inputProductQtd.value = 0;
            errorMesage("Apenas valores positivos!", details);
        } else {
            inputProductQtd.value = currentValue;
            const pError = document.querySelector(".error");
            if (pError) pError.remove();
            btnAddToCart.disabled = false;
        };
    };

    function addValueInput() {
        let currentValue = Number(inputProductQtd.value);
        currentValue++;

        if (currentValue > stockMax) {
            inputProductQtd.value = stockMax;
            errorMesage("Quantidade maior que o disponível!", details);
        } else {
            inputProductQtd.value = currentValue;
            const pError = document.querySelector(".error");
            if (pError) pError.remove();
            btnAddToCart.disabled = false;
        };
    };
};