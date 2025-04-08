import getApi from "./getApi.js";

let productsData = [];

export async function loadProducts() {
    if (productsData.length === 0) {
        productsData = await getApi();
    };
    return productsData;
};

export default async function setProducts() {
    const objDados = await getApi();
    
    const products = document.querySelector(".products");

    const productElements = objDados.map(obj => {
        const product = document.createElement("article")
        product.classList.add("product");
        product.setAttribute("product-category", obj.category);
        product.setAttribute("data-id", obj.id);
        
        const productImg = document.createElement("img")
        productImg.classList.add("product__img");
        productImg.setAttribute("src", obj.image);
        productImg.setAttribute("alt", obj.title);
        
        const productDescription = document.createElement("div")
        productDescription.classList.add("product__description");
        
        const productDescriptionTitle = document.createElement("h2")
        productDescriptionTitle.classList.add("product__description__title");
        productDescriptionTitle.innerText = obj.title;
        
        const productDescriptionResume = document.createElement("p")
        productDescriptionResume.classList.add("product__description__resume");
        productDescriptionResume.innerText = obj.description;

        const productDescriptionPrice = document.createElement("p")
        productDescriptionPrice.classList.add("product__description__price");
        productDescriptionPrice.innerText = `R$ ${(obj.price).toFixed(2)}`;

        const seeMore = document.createElement("button")
        seeMore.classList.add("see-more");
        seeMore.setAttribute("href", "product.html");
        seeMore.innerText = "Ver detalhes";

        products.appendChild(product);
        product.appendChild(productImg);
        product.appendChild(productDescription);
        productDescription.appendChild(productDescriptionTitle);
        productDescription.appendChild(productDescriptionResume);
        productDescription.appendChild(productDescriptionPrice);
        product.appendChild(seeMore);

        return product;
    }); 

    return productElements;
};