import getProductIdInPage from "./getProductIdInPage.js";
import { loadProducts } from "../index/setProducts.js";
import errorMesage from "../product/errorMesage.js";
import saveCart from "../product/saveCart.js";
import buttonMinusPlusCart from "./buttonMinusPlusCart.js";

export default function goToProductToCart() {
    let dataId = getProductIdInPage();
    dataId = Number(dataId);

    const productsScroll = document.querySelector(".products-scroll");

    const productDetails = document.querySelector(".products-details");
    const inputProductQtdInit = productDetails.querySelector(".product-qtd");
    const btnAddToCart = productDetails.querySelector(".add-to-cart");
    
    inputProductQtdInit.addEventListener("input", getInputProductQtdValue);

    async function changeStockProduct() {
            const dataProducts = await loadProducts();
            const product = dataProducts.find((product) => product.id === dataId);
    
            if (!product) {
                console.error("Produto não encontrado.");
                return null;
            };
        
            if (!isNaN(getInputProductQtdValue())) {
                product.stock -= parseInt(getInputProductQtdValue());
                product.quantityChosen = parseInt(getInputProductQtdValue());
                return product;
            } else {
                errorMesage("Adicione pelo menos um produto!");
                return null;
            };
    };

    async function createElementsProduct() {
        const currentProduct = await changeStockProduct();
        saveCart(currentProduct);

        if (!productsScroll) {
            console.error("Elemento .products-scroll não encontrado!");
            return;
        };


        if (Number(inputProductQtdInit.value) === 0) {
            console.error("Adicione pelo menos um produto!");
            return;
        };

        const itemProduct = document.createElement("article");
        itemProduct.classList.add("shopping-cart__items__product");

        const itemProductImg = document.createElement("img");
        itemProductImg.classList.add("shopping-cart__items__product__img");
        itemProductImg.setAttribute("src", currentProduct.image);
        itemProductImg.setAttribute("alt", currentProduct.title);

        const divProductDetails = document.createElement("div");
        divProductDetails.classList.add("shopping-cart__items__product__details");

        const productDetailsName = document.createElement("h3");
        productDetailsName.classList.add("shopping-cart__items__product__details__name")
        productDetailsName.innerText = currentProduct.title;

        const productDetailsPrice = document.createElement("span");
        productDetailsPrice.classList.add("shopping-cart__items__product__details__price");
        const inputProductQtd = getInputProductQtdValue();
        productDetailsPrice.innerText = `R$ ${(currentProduct.price * inputProductQtd).toFixed(2)}`;

        const shoppingCartTotal = document.querySelector(".shopping-cart-total");
        shoppingCartTotal.innerText = productDetailsPrice.innerText;
        
        const divProductDetailsQtd = document.createElement("div");
        divProductDetailsQtd.classList.add("shopping-cart__items__product__details__qtd");

        const iconMinus = document.createElement("i");
        iconMinus.classList.add("ph", "ph-minus", "icon", "icon--qtd", "product-minus");

        const productQtd = document.createElement("input");
        productQtd.classList.add("product-qtd");
        productQtd.setAttribute("type", "number");
        productQtd.value = getInputProductQtdValue();
        
        const iconPlus = document.createElement("i");
        iconPlus.classList.add("ph", "ph-plus", "icon", "icon--qtd", "product-plus");

        productsScroll.appendChild(itemProduct);
        if (itemProduct) {
            const epCartEmpty = document.querySelector("p")
            if (epCartEmpty) epCartEmpty.remove();    
        };
        itemProduct.appendChild(itemProductImg);
        itemProduct.appendChild(divProductDetails);
        divProductDetails.appendChild(productDetailsName);
        divProductDetails.appendChild(productDetailsPrice);
        divProductDetails.appendChild(divProductDetailsQtd);
        divProductDetailsQtd.appendChild(iconMinus);
        divProductDetailsQtd.appendChild(productQtd);
        divProductDetailsQtd.appendChild(iconPlus);
    };

    btnAddToCart.addEventListener("click", async () => {
        await createElementsProduct();
        saveCart();
        buttonMinusPlusCart();
    }); 
};

export function getInputProductQtdValue() {
    const productDetails = document.querySelector(".products-details");
    const inputProductQtd = productDetails.querySelector(".product-qtd");

    if (!inputProductQtd) return 0;

    const qtd = Number(inputProductQtd.value);

    return qtd;
};