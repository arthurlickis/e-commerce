import goToProductPage from "./goToProductPage.js";

export default function getDataIdProduct() {
    const BtnsSeeMore = document.querySelectorAll(".see-more")
    
    document.addEventListener("click", (e) => {
        BtnsSeeMore.forEach(BtnSeeMore => {
            if (BtnSeeMore === e.target) {
                const dataId = BtnSeeMore.parentElement.getAttribute("data-id");
                goToProductPage(dataId);
            };
        });
    });
};