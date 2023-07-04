
const rangeInput = document.getElementById("myRange");
const container = document.getElementById("container");
const categoriesContainer = document.getElementById("categories");

rangeInput.addEventListener("change", function() {
    const rangeValue = rangeInput.value;
    refreshItems(rangeValue);
});

let categories = [];

fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(json => {
    for (let i = 0; i < json["products"].length; i++) {
        const product = json["products"][i];
        const category = product.category;
        if (!categories.includes(category)) {
            const element = document.createElement("p");
            categoriesContainer.appendChild(element);
            element.innerText = category;

            categories.push(category);
        }
    }
});

refreshItems(Infinity);

function refreshItems(rangeValue) {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(json => {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
        for (let i = 0; i < json["products"].length; i++) {
            const product = json["products"][i];
            if (product["price"] <= rangeValue) {
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
    });
}
