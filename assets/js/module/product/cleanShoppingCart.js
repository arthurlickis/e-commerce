export default function cleanShoppingCart() {
    const btnRemoveAllCart = document.querySelector(".remove-all");
    const productsScroll = document.querySelector(".products-scroll");

    btnRemoveAllCart.addEventListener("click", () => {
        productsScroll.innerHTML = "";
        const emptyError = document.createElement("p");
        emptyError.classList.add("cart-empty");
        emptyError.innerText = "O carrinho está vazio! Adicione pelo menos um produto.";
        productsScroll.appendChild(emptyError)
        localStorage.removeItem("cart");
    });
};