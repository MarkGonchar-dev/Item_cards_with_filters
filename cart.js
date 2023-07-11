
const container = document.getElementById("container");

const cartKey = "cart";

refreshItems();

function refreshItems() {
    const products = JSON.parse(localStorage.getItem(cartKey));

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const element = document.createElement("div");
        container.appendChild(element);
        element.setAttribute("class", "card");

        const image = document.createElement("div");
        element.appendChild(image);
        let len = parseFloat(product["images"].length);
        let url = product["images"][Math.max(Math.round(Math.random() * len - 1), 0)];
        image.setAttribute("class", "image");
        image.style.backgroundImage = "url('" + url + "')";

        const title = document.createElement("p");
        element.appendChild(title);
        title.innerText = product["title"];
        title.setAttribute("class", "title");

        const pricetag = document.createElement("p");
        element.appendChild(pricetag);
        pricetag.innerText = "$ " + product["price"];
        pricetag.setAttribute("class", "pricetag");
    }
}

function showShop() {
    window.location = "index.html";
}
