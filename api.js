
// 🌐 API-ის მისამართი
const API_URL = "https://dummyjson.com";

// 📦 პროდუქტების წამოღება
async function getProducts(limit = 12, skip = 0, sortBy = "", order = "") {
    let url = `${API_URL}/products?limit=${limit}&skip=${skip}`;

    if (sortBy) {
        url += `&sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Products could not be loaded.");
    }

    return await response.json();
}

// 👁️ ერთი პროდუქტის წამოღება ID-ით
async function getProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error("Product could not be loaded.");
    }

    return await response.json();
}

// 🔍 პროდუქტების ძებნა
async function searchProducts(query, limit = 12, skip = 0, sortBy = "", order = "") {
    let url = `${API_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;

    if (sortBy) {
        url += `&sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Search failed.");
    }

    return await response.json();
}

// 🗂️ კატეგორიების წამოღება
async function getCategories() {
    const response = await fetch(`${API_URL}/products/category-list`);

    if (!response.ok) {
        throw new Error("Categories could not be loaded.");
    }

    return await response.json();
}

// 🛍️ კონკრეტული კატეგორიის პროდუქტები
async function getCategoryProducts(category, limit = 0, skip = 0) {
    const response = await fetch(
        `${API_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    );

    if (!response.ok) {
        throw new Error("Category products could not be loaded.");
    }

    return await response.json();
}

// 📦 შეკვეთის გაგზავნა
async function sendOrder(order) {
    const response = await fetch(`${API_URL}/carts/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    if (!response.ok) {
        throw new Error("Order could not be sent.");
    }

    return await response.json();
}
