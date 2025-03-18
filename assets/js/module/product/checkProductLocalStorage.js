export default function checkProductLocalStorage() {
    const productsScroll = document.querySelector(".products-scroll");
    const dataProducts = JSON.parse(localStorage.getItem("cart"));

    if (dataProducts !== null) {
        const epCartEmpty = document.querySelector("p")
        if (epCartEmpty) epCartEmpty.remove();    
    };

    if (dataProducts) {
        dataProducts.forEach(currentProduct => {
            if (!productsScroll) {
                console.error("Elemento .products-scroll não encontrado!");
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
            productDetailsPrice.innerText = `R$ ${(currentProduct.price * currentProduct.quantityChosen).toFixed(2)}`;
            
            
            const shoppingCartTotal = document.querySelector(".shopping-cart-total");
            shoppingCartTotal.innerText = productDetailsPrice.innerText;
            
            const divProductDetailsQtd = document.createElement("div");
            divProductDetailsQtd.classList.add("shopping-cart__items__product__details__qtd");
            
            const iconMinus = document.createElement("i");
            iconMinus.classList.add("ph", "ph-minus", "icon", "icon--qtd", "product-minus");
            
            const productQtd = document.createElement("input");
            productQtd.classList.add("product-qtd");
            productQtd.setAttribute("type", "number");
            productQtd.value = currentProduct.quantityChosen;
            if (productQtd.value === "") productQtd.value = currentProduct.quantityChosen;
            
            const iconPlus = document.createElement("i");
            iconPlus.classList.add("ph", "ph-plus", "icon", "icon--qtd", "product-plus");
            
            productsScroll.appendChild(itemProduct);
            itemProduct.appendChild(itemProductImg);
            itemProduct.appendChild(divProductDetails);
            divProductDetails.appendChild(productDetailsName);
            divProductDetails.appendChild(productDetailsPrice);
            divProductDetails.appendChild(divProductDetailsQtd);
            divProductDetailsQtd.appendChild(iconMinus);
            divProductDetailsQtd.appendChild(productQtd);
            divProductDetailsQtd.appendChild(iconPlus);
        
        });
    };
};