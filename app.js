// 🛍️ GEAR MARKET

const LIMIT = 12;

let products = [];
let categories = [];
let selectedCategory = "all";
let currentPage = 1;
let searchText = "";
let sortType = "default";
let totalProducts = 0;

// 🛒 კალათის წამოღება
let cart = [];

try {
    cart = JSON.parse(localStorage.getItem("gearMarketCart")) || [];
} catch (error) {
    cart = [];
}


// 🗂️ მთავარი კატეგორიები
const categoryGroups = [
    {
        name: "💻 Electronics",
        categories: ["smartphones", "laptops", "tablets", "mobile-accessories"]
    },
    {
        name: "🚗 Cars",
        categories: ["vehicle", "motorcycle"]
    },
    {
        name: "🍎 Food",
        categories: ["groceries"]
    },
    {
        name: "👕 Clothes",
        categories: [
            "mens-shirts",
            "womens-dresses",
            "womens-bags",
            "mens-watches",
            "womens-jewellery",
            "tops"
        ]
    },
    {
        name: "👟 Shoes",
        categories: ["mens-shoes", "womens-shoes"]
    }
];


// 📌 HTML ელემენტები
const productsContainer = document.getElementById("products-container");
const categoryList = document.getElementById("category-list");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const emptyMessage = document.getElementById("empty-message");
const productCount = document.getElementById("product-count");
const activeCategory = document.getElementById("active-category");

const previousButton = document.getElementById("previous-page");
const nextButton = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");

const cartButton = document.getElementById("cart-button");
const cartDropdown = document.getElementById("cart-dropdown");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");

const checkoutForm = document.getElementById("checkout-form");
const checkoutButton = document.getElementById("checkout-button");
const formMessage = document.getElementById("form-message");


// ↕️ დალაგების პარამეტრები
function getSortSettings() {
    if (sortType === "low-high") {
        return { sortBy: "price", order: "asc" };
    }

    if (sortType === "high-low") {
        return { sortBy: "price", order: "desc" };
    }

    if (sortType === "name-a-z") {
        return { sortBy: "title", order: "asc" };
    }

    if (sortType === "name-z-a") {
        return { sortBy: "title", order: "desc" };
    }

    return { sortBy: "", order: "" };
}


// ↕️ პროდუქტების დალაგება
function sortProducts(productList) {
    const result = [...productList];

    if (sortType === "low-high") {
        result.sort(function(a, b) {
            return a.price - b.price;
        });
    }

    if (sortType === "high-low") {
        result.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    if (sortType === "name-a-z") {
        result.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
    }

    if (sortType === "name-z-a") {
        result.sort(function(a, b) {
            return b.title.localeCompare(a.title);
        });
    }

    return result;
}


// 📦 პროდუქტების წამოღება
async function loadProducts() {
    try {
        loading.hidden = false;
        errorMessage.hidden = true;
        emptyMessage.hidden = true;
        productsContainer.innerHTML = "";

        const skip = (currentPage - 1) * LIMIT;
        let data;

        // 🔍 თუ მომხმარებელი ეძებს პროდუქტს
        if (searchText) {
            if (selectedCategory === "all") {
                data = await searchProducts(searchText, 0, 0);

                const sortedProducts = sortProducts(data.products);

                totalProducts = sortedProducts.length;

                products = sortedProducts.slice(skip, skip + LIMIT);
            } else {
                data = await loadGroupProducts(skip);
                products = data.products;
                totalProducts = data.total;
            }
        }

        // 🗂️ თუ კონკრეტული კატეგორიაა არჩეული
        else if (selectedCategory !== "all") {
            data = await loadGroupProducts(skip);

            products = data.products;
            totalProducts = data.total;
        }

        // 🛍️ ყველა პროდუქტი
        else {
            const sort = getSortSettings();

            data = await getProducts(
                LIMIT,
                skip,
                sort.sortBy,
                sort.order
            );

            products = data.products;
            totalProducts = data.total;
        }

        loading.hidden = true;

        showProducts();
        updatePagination();
        updateProductCount();

    } catch (error) {
        loading.hidden = true;
        errorMessage.hidden = false;

        errorMessage.innerHTML = `
            ❌ Products could not be loaded.
            <button id="retry-button" type="button">Try Again</button>
        `;

        document.getElementById("retry-button").onclick = loadProducts;
    }
}


// 🗂️ რამდენიმე კატეგორიის პროდუქტების გაერთიანება
async function loadGroupProducts(skip) {
    let allProducts = [];

    for (const category of selectedCategory) {
        const data = await getCategoryProducts(category, 0, 0);

        allProducts = allProducts.concat(data.products);
    }

    // 🔍 კატეგორიაში ძებნა
    if (searchText) {
        allProducts = allProducts.filter(function(product) {
            return (
                product.title.toLowerCase().includes(searchText) ||
                product.description.toLowerCase().includes(searchText)
            );
        });
    }

    // ↕️ დალაგება
    allProducts = sortProducts(allProducts);

    const total = allProducts.length;
    const pageProducts = allProducts.slice(skip, skip + LIMIT);

    return {
        products: pageProducts,
        total: total
    };
}


// 🗂️ კატეგორიების ჩვენება
async function loadCategories() {
    try {
        categories = await getCategories();

        categoryList.innerHTML = "";

        const allButton = document.createElement("button");
        allButton.type = "button";
        allButton.className = "category-button active";
        allButton.textContent = "🛍️ All Products";

        allButton.onclick = function() {
            selectedCategory = "all";
            currentPage = 1;

            setActiveCategory(allButton, "All Products");
            loadProducts();
        };

        categoryList.appendChild(allButton);

        categoryGroups.forEach(function(group) {
            const validCategories = group.categories.filter(function(category) {
                return categories.includes(category);
            });

            if (validCategories.length === 0) {
                return;
            }

            const button = document.createElement("button");
            button.type = "button";
            button.className = "category-button";
            button.textContent = group.name;

            button.onclick = function() {
                selectedCategory = validCategories;
                currentPage = 1;

                setActiveCategory(button, group.name);
                loadProducts();
            };

            categoryList.appendChild(button);
        });

    } catch (error) {
        categoryList.textContent = "❌ Categories could not be loaded.";
    }
}


// 🟦 აქტიური კატეგორიის შეცვლა
function setActiveCategory(button, name) {
    document.querySelectorAll(".category-button").forEach(function(item) {
        item.classList.remove("active");
    });

    button.classList.add("active");
    activeCategory.textContent = name;
}


// 🛍️ პროდუქტების ჩვენება
function showProducts() {
    productsContainer.innerHTML = "";

    emptyMessage.hidden = products.length !== 0;

    products.forEach(function(product) {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.thumbnail}"
                alt="${product.title}"
                class="product-image"
            >

            <h3>${product.title}</h3>

            <p class="category">
                📂 ${product.category}
            </p>

            <p class="price">
                💲${product.price}
            </p>

            <button class="details-button" type="button">
                👁️ View Details
            </button>

            <button class="add-to-cart-button" type="button">
                🛒 Add to Cart
            </button>
        `;

        // 👁️ View Details ღილაკი
        card.querySelector(".details-button").addEventListener("click", function(event) {
            event.stopPropagation();
            showProductDetails(product.id);
        });

        // 🛒 კალათაში დამატება
        card.querySelector(".add-to-cart-button").addEventListener("click", function(event) {
            event.stopPropagation();
            addToCart(product);
        });

        // 👆 თვითონ პროდუქტზე დაჭერაც ხსნის დეტალებს
        card.addEventListener("click", function() {
            showProductDetails(product.id);
        });

        productsContainer.appendChild(card);
    });
}


// 🔢 პროდუქტების რაოდენობა
function updateProductCount() {
    productCount.textContent = "🛍️ " + totalProducts + " products";
}


// 📄 გვერდების ღილაკები
function updatePagination() {
    const totalPages = Math.max(1, Math.ceil(totalProducts / LIMIT));

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage >= totalPages;

    pageInfo.textContent = "📄 Page " + currentPage + " of " + totalPages;
}


// 🔍 ძებნა
searchInput.addEventListener("input", function() {
    searchText = searchInput.value.toLowerCase().trim();

    currentPage = 1;
    loadProducts();
});


// ↕️ დალაგება
sortSelect.addEventListener("change", function() {
    sortType = sortSelect.value;

    currentPage = 1;
    loadProducts();
});


// ⬅️ წინა გვერდი
previousButton.addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        loadProducts();
    }
});


// ➡️ შემდეგი გვერდი
nextButton.addEventListener("click", function() {
    const totalPages = Math.ceil(totalProducts / LIMIT);

    if (currentPage < totalPages) {
        currentPage++;
        loadProducts();
    }
});


// 🎨 დეტალების ფანჯრის სტილები
function addDetailsStyles() {
    if (document.getElementById("details-styles")) {
        return;
    }

    const style = document.createElement("style");
    style.id = "details-styles";

    style.textContent = `
        .product-details {
            position: fixed;
            inset: 0;
            z-index: 1000;
            background: rgba(0, 0, 0, 0.65);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            overflow-y: auto;
        }

        .product-details[hidden] {
            display: none;
        }

        .details-content {
            position: relative;
            background: white;
            color: #222;
            width: 100%;
            max-width: 650px;
            max-height: 90vh;
            overflow-y: auto;
            padding: 25px;
            border-radius: 14px;
        }

        .details-content img {
            display: block;
            width: 100%;
            max-height: 260px;
            object-fit: contain;
            margin: 15px auto;
        }

        .details-content h2 {
            margin-top: 10px;
        }

        .details-content p {
            line-height: 1.5;
        }

        #close-details {
            display: block;
            margin-left: auto;
            padding: 9px 14px;
            border: none;
            border-radius: 7px;
            cursor: pointer;
        }

        .product-review {
            border-top: 1px solid #ddd;
            padding: 10px 0;
        }

        #details-add-cart {
            width: 100%;
            padding: 12px;
            margin-top: 15px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
    `;

    document.head.appendChild(style);
}


// 👁️ პროდუქტის დეტალები და Reviews
async function showProductDetails(id) {
    try {
        addDetailsStyles();

        let details = document.getElementById("product-details");

        if (!details) {
            details = document.createElement("div");
            details.id = "product-details";
            details.className = "product-details";
            document.body.appendChild(details);
        }

        details.hidden = false;
        details.innerHTML = `
            <div class="details-content">
                <p>⏳ Loading product details...</p>
            </div>
        `;

        const product = await getProduct(id);

        let reviewsHTML = "<p>No reviews available.</p>";

        if (product.reviews && product.reviews.length > 0) {
            reviewsHTML = product.reviews.map(function(review) {
                return `
                    <div class="product-review">
                        <p>⭐ ${review.rating}/5</p>
                        <p>${review.comment}</p>
                        <small>${review.reviewerName}</small>
                    </div>
                `;
            }).join("");
        }

        details.innerHTML = `
            <div class="details-content">
                <button id="close-details" type="button">
                    ❌ Close
                </button>

                <img src="${product.thumbnail}" alt="${product.title}">

                <h2>${product.title}</h2>

                <p>${product.description}</p>

                <p>📂 Category: ${product.category}</p>

                <p>💲 Price: $${product.price}</p>

                <p>⭐ Rating: ${product.rating}/5</p>

                <p>📦 Stock: ${product.stock}</p>

                <h3>Customer Reviews</h3>

                ${reviewsHTML}

                <button id="details-add-cart" type="button">
                    🛒 Add to Cart
                </button>
            </div>
        `;

        // ❌ დახურვის ღილაკი
        document.getElementById("close-details").onclick = function() {
            details.hidden = true;
        };

        // 🛒 დეტალებიდან კალათაში დამატება
        document.getElementById("details-add-cart").onclick = function() {
            addToCart(product);
            details.hidden = true;
        };

        // ფონზე დაჭერით დახურვა
        details.onclick = function(event) {
            if (event.target === details) {
                details.hidden = true;
            }
        };

    } catch (error) {
        alert("❌ Product details could not be loaded.");

        const details = document.getElementById("product-details");

        if (details) {
            details.hidden = true;
        }
    }
}


// ➕ კალათაში დამატება
function addToCart(product) {
    const existingProduct = cart.find(function(item) {
        return item.id === product.id;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}


// 🗑️ კალათიდან წაშლა
function removeFromCart(id) {
    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    saveCart();
    renderCart();
}


// 🔢 რაოდენობის შეცვლა
function changeQuantity(id, amount) {
    const item = cart.find(function(product) {
        return product.id === id;
    });

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        saveCart();
        renderCart();
    }
}


// 💾 კალათის შენახვა
function saveCart() {
    localStorage.setItem("gearMarketCart", JSON.stringify(cart));
}


// 🛒 კალათის ჩვენება
function renderCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add products to start shopping.</p>
            </div>
        `;
    }

    cart.forEach(function(item) {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}">

            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>$${item.price}</p>

                <div class="quantity-controls">
                    <button class="minus-button" type="button">−</button>

                    <span>${item.quantity}</span>

                    <button class="plus-button" type="button">+</button>
                </div>
            </div>

            <div class="cart-item-right">
                <strong>$${(item.price * item.quantity).toFixed(2)}</strong>

                <button class="remove-button" type="button">
                    🗑️ Remove
                </button>
            </div>
        `;

        cartItem.querySelector(".minus-button").onclick = function() {
            changeQuantity(item.id, -1);
        };

        cartItem.querySelector(".plus-button").onclick = function() {
            changeQuantity(item.id, 1);
        };

        cartItem.querySelector(".remove-button").onclick = function() {
            removeFromCart(item.id);
        };

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = count;
    cartSubtotal.textContent = "$" + total.toFixed(2);
    cartTotal.textContent = "$" + total.toFixed(2);
}


// 🛒 კალათის გახსნა
cartButton.addEventListener("click", function() {
    cartDropdown.hidden = false;
    cartButton.setAttribute("aria-expanded", "true");
});


// ❌ კალათის დახურვა
closeCart.addEventListener("click", function() {
    cartDropdown.hidden = true;
    cartButton.setAttribute("aria-expanded", "false");
});


// ➡️ Checkout-ზე გადასვლა
checkoutButton.addEventListener("click", function() {
    cartDropdown.hidden = true;
    cartButton.setAttribute("aria-expanded", "false");

    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
});


// 📦 შეკვეთის გაგზავნა
checkoutForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        formMessage.textContent = "🛒 Your cart is empty.";
        return;
    }

    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
    }

    const name = checkoutForm.elements["name"].value.trim();
    const email = checkoutForm.elements["email"].value.trim();
    const phone = checkoutForm.elements["phone"].value.trim();
    const address = checkoutForm.elements["address"].value.trim();

    if (name.length < 2 || address.length < 5) {
        formMessage.textContent = "⚠️ Please enter valid details.";
        return;
    }

    if (!/^[0-9+\s()-]{7,20}$/.test(phone)) {
        formMessage.textContent = "⚠️ Please enter a valid phone number.";
        return;
    }

    const order = {
        userId: 1,
        products: cart.map(function(item) {
            return {
                id: item.id,
                quantity: item.quantity
            };
        })
    };

    try {
        checkoutButton.disabled = true;
        checkoutButton.textContent = "⏳ Sending...";

        await sendOrder(order);

        formMessage.textContent = "✅ Your order was sent successfully!";

        cart = [];
        saveCart();
        renderCart();
        checkoutForm.reset();

    } catch (error) {
        formMessage.textContent = "❌ Something went wrong. Please try again.";

    } finally {
        checkoutButton.disabled = false;
        checkoutButton.textContent = "Proceed to Checkout →";
    }
});


// 🚀 ვებსაიტის დაწყება
async function startApp() {
    renderCart();

    await loadCategories();
    await loadProducts();
}

startApp();