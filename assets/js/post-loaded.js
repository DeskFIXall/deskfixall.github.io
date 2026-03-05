// Before loaded page
document.addEventListener("DOMContentLoaded", function () {
    let resources = `
    <link rel="stylesheet" href="assets/css/font-awesome.min.css">
    `;
    document.head.insertAdjacentHTML('beforeend', resources);
});