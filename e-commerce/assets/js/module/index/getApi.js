export default async function getApi () {
    const body = document.querySelector("body")
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        products.map(product => product.stock = 20)
        return products;
    } catch (e) {
        body.innerHTML = "Não foi possível consultar os dados, tente novamente!";
        return [];
    };
};