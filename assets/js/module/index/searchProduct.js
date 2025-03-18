export default function searchProducts() {
    const articleProducts = document.querySelectorAll(".product");
    const search = document.getElementById("search");
    const iconSearch = document.querySelector(".icon--search");

    const searchContent = () => {
        const searchValue = search.value.toLowerCase();
    
        articleProducts.forEach(articleProduct => {
            const productDescriptionTitle = articleProduct.querySelector(".product__description__title").innerText.toLowerCase();
            if (productDescriptionTitle.indexOf(searchValue) !== -1) {
            articleProduct.style.display = "flex";
            } else {
                articleProduct.style.display = "none";
            };
        });
    };

    iconSearch.addEventListener("click", searchContent);
    search.addEventListener("input", searchContent);
};