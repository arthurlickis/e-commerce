import getProductIdInPage from "./getProductIdInPage.js";
import { loadProducts } from "../index/setProducts.js";
import saveCart from "./saveCart.js";

export default async function showProductDetails() {
    const dataId = Number(getProductIdInPage());
    
    const dataProducts = await loadProducts();
    const productDetails = document.querySelector(".products-details");

    function showProduct(dataId) {
        dataProducts.forEach(dataProduct => {
            if (dataProduct.id === dataId) {
                document.title = dataProduct.title;
                // history.replaceState(null, "", dataProduct.title); 

                const backImg = document.createElement("div");
                backImg.classList.add("product-details__back-img");

                const img = document.createElement("img");
                img.classList.add("products-details__img");
                img.setAttribute("src", dataProduct.image);
                img.setAttribute("alt", dataProduct.title);

                const description = document.createElement("div");
                description.classList.add("product-details__description");
                description.setAttribute("maxStock", dataProduct.stock);

                const descriptionTitle = document.createElement("h1");
                descriptionTitle.classList.add("title");
                descriptionTitle.innerText = dataProduct.title;

                const descriptionPrice = document.createElement("span");
                descriptionPrice.classList.add("product__description__price")
                descriptionPrice.innerText = `R$ ${(dataProduct.price).toFixed(2)}`;
                
                const descriptionStock = document.createElement("span");
                descriptionStock.classList.add("product-details__description__avaliable");
                if (dataProduct.stock > 0) {
                    descriptionStock.innerText = "Disponível";
                } else {
                    descriptionStock.innerText = "Esgotado";
                };

                const descriptionAbout = document.createElement("p");
                descriptionAbout.classList.add("product-details__description__about");
                descriptionAbout.innerText = dataProduct.description;

                const productDivQtd = document.createElement("div");
                productDivQtd.classList.add("shopping-cart__items__product__details__qtd");

                const iconMinus = document.createElement("i");
                iconMinus.classList.add("ph", "ph-minus", "icon", "icon--qtd", "product-minus");


                const productQtd = document.createElement("input");
                productQtd.classList.add("product-qtd");
                productQtd.setAttribute("type", "number");
                productQtd.setAttribute("value", 0);
                
                const iconPlus = document.createElement("i");
                iconPlus.classList.add("ph", "ph-plus", "icon", "icon--qtd", "product-plus");


                const btnAddToCart = document.createElement("button");
                btnAddToCart.classList.add("go-checkout", "add-to-cart");
                btnAddToCart.innerText = "Adicionar ao carrinho";
                btnAddToCart.disabled = true;

                productDetails.appendChild(backImg);
                backImg.appendChild(img);
                productDetails.appendChild(description);
                description.appendChild(descriptionTitle);
                description.appendChild(descriptionPrice);
                description.appendChild(descriptionStock);
                description.appendChild(descriptionAbout);
                productDetails.appendChild(productDivQtd);
                productDivQtd.appendChild(iconMinus);
                productDivQtd.appendChild(productQtd);
                productDivQtd.appendChild(iconPlus);
                productDetails.appendChild(btnAddToCart);

                saveCart();
            };
        });
    };
    return showProduct(dataId);
};