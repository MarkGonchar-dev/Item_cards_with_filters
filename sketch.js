
const rangeInput = document.getElementById("myRange");
const container = document.getElementById("container");
const categoriesContainer = document.getElementById("categories");

const cartKey = "cart";

rangeInput.addEventListener("change", function() {
    const rangeValue = rangeInput.value;
    refreshItems(rangeValue);
});

let categories = [];
let selectedCategories = [];

fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(json => {
    for (let i = 0; i < json["products"].length; i++) {
        const product = json["products"][i];
        const category = product.category;
        if (!categories.includes(category)) {
            const element = document.createElement("button");
            categoriesContainer.appendChild(element);
            element.innerText = category;
            element.setAttribute("class", "category");
            element.addEventListener("click", () => toggleCategory(category));

            categories.push(category);
            selectedCategories.push(category);
        }
    }
});

refreshItems(Infinity);
refreshCategories();

function refreshCategories() {
    while (categoriesContainer.firstChild) {
        categoriesContainer.removeChild(categoriesContainer.lastChild);
    }
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const element = document.createElement("button");
        categoriesContainer.appendChild(element);
        element.innerText = category;
        element.addEventListener("click", () => toggleCategory(category));

        let scString = selectedCategories.includes(category) ? " selectedCategory" : "";
        element.setAttribute("class", "category" + scString);
    }
}

function toggleCategory(category) {
    let newFilters = selectedCategories.slice();
    if (newFilters.includes(category)) {
      let index = newFilters.indexOf(category);
      if (index >= 0)
        newFilters.splice(index, 1);
    } else {
      newFilters.push(category);
    }
    selectedCategories = newFilters;
    console.log(selectedCategories);
    refreshCategories();
    refreshItems(rangeInput.value);
}

function refreshItems(rangeValue) {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(json => {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }

        for (let i = 0; i < json["products"].length; i++) {
            const product = json["products"][i];

            if (product["price"] > rangeValue || !selectedCategories.includes(product["category"])) continue;

            const element = document.createElement("div");
            container.appendChild(element);
            element.setAttribute("class", "card");

            const image = document.createElement("div");
            element.appendChild(image);
            let len = parseFloat(product["images"].length);
            let url = product["images"][Math.max(Math.round(Math.random() * len - 1), 0)];
            image.setAttribute("class", "image");
            image.style.backgroundImage = "url('" + url + "')";

            const addToCart = document.createElement("button");
            element.appendChild(addToCart);
            addToCart.setAttribute("class", "addtocart");

            const addToCart_icon = document.createElement("div");
            addToCart.appendChild(addToCart_icon);
            addToCart_icon.setAttribute("class", "addtocart-icon");

            addToCart.addEventListener("click", () => {
                if (localStorage.getItem(cartKey) === null) {
                    let newCart = [product];
                    localStorage.setItem(cartKey, JSON.stringify(newCart));
                } else {
                    let newCart = JSON.parse(localStorage.getItem(cartKey));
                    if (newCart.find(e => e["id"] === product["id"])) {
                        let index = newCart.findIndex(e => e["id"] === product["id"]);
                        newCart.splice(index, 1);
                        localStorage.setItem(cartKey, JSON.stringify(newCart));
                    } else {
                        newCart.push(product);
                        localStorage.setItem(cartKey, JSON.stringify(newCart));
                    }
                }
            });

            const title = document.createElement("p");
            element.appendChild(title);
            title.innerText = product["title"];
            title.setAttribute("class", "title");

            const pricetag = document.createElement("p");
            element.appendChild(pricetag);
            pricetag.innerText = "$ " + product["price"];
            pricetag.setAttribute("class", "pricetag");
        }
    });
}

function showCart() {
    window.location = "cart.html";
}
