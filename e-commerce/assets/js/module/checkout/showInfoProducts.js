import CheckInputs from "./checkInputs.js";

export default function showInfoProducts() {
    const nameProduct = document.querySelector(".form-checkout__product__name");
    const quantityProductSpan = document.querySelector(".form-checkout__product__qtd");
    const subtotalProduct = document.querySelector(".form-checkout__product__subtotal");
    const totalProduct = document.querySelector(".form-checkout__product__total");
   
    const objProducts = JSON.parse(localStorage.getItem("cart"));

    objProducts.forEach(objProduct => {
        const title = objProduct.title;
        nameProduct.innerHTML += `${title}<br>`;

        const firstSpaceIndex = title.indexOf(" ");
        quantityProductSpan.innerHTML += `Quantidade: ${objProduct.quantityChosen}x ${(objProduct.title.slice(0, firstSpaceIndex))}...<br>`;
    });


    const total = Number(localStorage.getItem("cartTotal"));
    if (total) {
        subtotalProduct.innerText = `R$ ${total.toFixed(2)}`;
        totalProduct.innerText = `R$ ${total.toFixed(2)}`;
    };

    const inputAddress = document.querySelector(".address");
    inputAddress.addEventListener("input", () => {
        if (inputAddress.value.length > 10) {
            totalProduct.innerText = `R$ ${(total + 20).toFixed(2)}`;
        } else {
            totalProduct.innerText = `R$ ${total.toFixed(2)}`;
        };
    });

    

    const formCheckout = document.querySelector(".form-checkout");

    formCheckout.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const check = new CheckInputs();
        console.log(check.validFormCheckout())
        if (check.validFormCheckout() === false) return;
    
        const msg = document.createElement("p");
        msg.classList.add("title");
        msg.innerText = "Compra realizada com sucesso!";
        totalProduct.appendChild(msg);
  
        setTimeout(() => {
            localStorage.clear();
            window.location.href = 'index.html';
        }, 3000); 
    });
};