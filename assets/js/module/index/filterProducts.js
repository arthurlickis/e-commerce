export default function filterProducts() {
    const products = document.querySelector(".products");
    const articleProducts = document.querySelectorAll(".product");
    const inputAttributesCategory = document.querySelectorAll("[category]");

    document.addEventListener("change", () => {
        articleProducts.forEach(articleProduct => {
            articleProduct.style.display = "none";
        });

        const selectedCategories = [];
        inputAttributesCategory.forEach(inputAttributeCategory => {
            if (inputAttributeCategory.checked) {
                const currentAttributeCategory = inputAttributeCategory.getAttribute("category");
                selectedCategories.push(currentAttributeCategory);
            };
        });

        let found = false;
        articleProducts.forEach(articleProduct => {
            const productCategory = articleProduct.getAttribute("product-category");
            if (selectedCategories.includes(productCategory)) {
                articleProduct.style.display = "flex";
                found = true;
            };
            if (selectedCategories[0] === "reset") {
                articleProducts.forEach(articleProduct => {
                    articleProduct.style.display = "flex";
                    found = true;
                });
            };
        });

        const pErroExistente = document.querySelector(".error");
        if (pErroExistente) {
            pErroExistente.remove();
        };

        if (!found) {
            const pErro = document.createElement("p");
            pErro.classList.add("error");
            pErro.style.textAlign = "center";
            pErro.innerText = "Nenhum item foi encontrado!";
            products.appendChild(pErro);
        };
    });
};