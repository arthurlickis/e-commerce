export default function saveCart(product) {
    if (product === undefined || product === null) return;

    let savedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    savedProducts.push(product);
    
    localStorage.setItem('cart', JSON.stringify(savedProducts));
};