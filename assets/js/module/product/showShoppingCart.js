export default function showShoppingCart() {
    const shoppingCartItems = document.querySelector(".shopping-cart__items");
    const btnOpenShoppingCart = document.getElementById("shopping-cart");
    const btnCloseShoppingCart = document.getElementById("close-shopping-cart");

    shoppingCartItems.style.right = "-200%";

    btnOpenShoppingCart.addEventListener("click", () => {
        shoppingCartItems.style.right = "0";
        document.body.classList.add("open-cart");
    });
    
    btnCloseShoppingCart.addEventListener("click", () => {
        shoppingCartItems.style.right = "-200%";
        document.body.classList.remove("open-cart");
    });

    setInterval(() => {
        const dataProducts = JSON.parse(localStorage.getItem("cart"));
    
        const btnGoCheckout = document.querySelector(".go-checkout");
        const btnRemoveAll = document.querySelector(".remove-all");
    
        if (!dataProducts || dataProducts.length === 0) {
            btnGoCheckout.style.pointerEvents = "none";
            btnRemoveAll.style.pointerEvents = "none";
            btnRemoveAll.disabled = true;
        } else {
            btnGoCheckout.style.pointerEvents = "auto";
            btnRemoveAll.style.pointerEvents = "auto";
            btnRemoveAll.disabled = false;
        }
    }, 1000);
};