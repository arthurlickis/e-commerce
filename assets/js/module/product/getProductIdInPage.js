export default function getProductIdInPage() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
};