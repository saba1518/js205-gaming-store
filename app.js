const products = [
    {
        id: 13,
        title: "NVIDIA RTX 3060 12GB",
        category: "GPU",
        price: 249,
        image: "images/7577-7599-removebg-preview.png",
        description: "12GB graphics card for gaming."
    },
    {
        id: 14,
        title: "NVIDIA RTX 4060 Ti",
        category: "GPU",
        price: 379,
        image: "images/images-removebg-preview.png",
        description: "Graphics card for smooth gaming."
    },
    {
        id: 15,
        title: "NVIDIA RTX 4070 Ti",
        category: "GPU",
        price: 699,
        image: "https://unsplash.com",
        description: "High-performance gaming graphics."
    },
    {
        id: 16,
        title: "AMD Radeon RX 7600",
        category: "GPU",
        price: 269,
        image: "https://unsplash.com",
        description: "Graphics card for 1080p gaming."
    },
    {
        id: 17,
        title: "AMD Radeon RX 7800 XT",
        category: "GPU",
        price: 499,
        image: "https://unsplash.com",
        description: "Powerful graphics for gaming."
    },
    {
        id: 18,
        title: "Intel Core i5-12400F",
        category: "CPU",
        price: 129,
        image: "images/Gemini_Generated_Image_3jpbie3jpbie3jpb-removebg-preview.png",
        description: "Six-core Intel desktop processor."
    },
    {
        id: 19,
        title: "Intel Core i7-12700K",
        category: "CPU",
        price: 249,
        image: "https://unsplash.com",
        description: "Powerful processor for gaming and work."
    },
    {
        id: 20,
        title: "AMD Ryzen 5 7600",
        category: "CPU",
        price: 189,
        image: "https://unsplash.com",
        description: "Modern AMD gaming processor."
    },
    {
        id: 21,
        title: "AMD Ryzen 9 7900X",
        category: "CPU",
        price: 329,
        image: "https://unsplash.com",
        description: "High-performance processor."
    },
    {
        id: 22,
        title: "Corsair Vengeance 64GB",
        category: "RAM",
        price: 149,
        image: "https://unsplash.com",
        description: "64GB memory for demanding applications."
    },
    {
        id: 23,
        title: "Kingston Fury 16GB DDR5",
        category: "RAM",
        price: 49,
        image: "https://unsplash.com",
        description: "Fast DDR5 desktop memory."
    },
    {
        id: 24,
        title: "G.Skill Trident Z 32GB",
        category: "RAM",
        price: 99,
        image: "https://unsplash.com",
        description: "DDR5 memory for gaming builds."
    },
    {
        id: 25,
        title: "Samsung 980 Pro 1TB",
        category: "SSD",
        price: 99,
        image: "https://unsplash.com",
        description: "Fast PCIe NVMe storage."
    },
    {
        id: 26,
        title: "Crucial P3 Plus 2TB",
        category: "SSD",
        price: 119,
        image: "images/Crucial P3 Plus 2TB.png",
        description: "Large-capacity NVMe SSD."
    },
    {
        id: 27,
        title: "WD Blue 1TB SSD",
        category: "SSD",
        price: 69,
        image: "https://unsplash.com",
        description: "Storage for files and games."
    },
    {
        id: 28,
        title: "ASUS TUF B550-PLUS",
        category: "Motherboard",
        price: 139,
        image: "https://unsplash.com",
        description: "AMD AM4 gaming motherboard."
    },
    {
        id: 29,
        title: "Gigabyte B650 Gaming X",
        category: "Motherboard",
        price: 189,
        image: "https://unsplash.com",
        description: "AM5 motherboard for Ryzen CPUs."
    },
    {
        id: 30,
        title: "MSI PRO Z790-P",
        category: "Motherboard",
        price: 199,
        image: "https://unsplash.com",
        description: "Intel motherboard for desktop PCs."
    },
    {
        id: 31,
        title: "EVGA 850W Gold PSU",
        category: "PSU",
        price: 129,
        image: "https://unsplash.com",
        description: "850W power supply for gaming PCs."
    },
    {
        id: 32,
        title: "Corsair RM750e",
        category: "PSU",
        price: 109,
        image: "https://unsplash.com",
        description: "750W power supply."
    },
    {
        id: 33,
        title: "DeepCool AK400",
        category: "Cooler",
        price: 39,
        image: "https://unsplash.com",
        description: "Air cooler for desktop processors."
    },
    {
        id: 34,
        title: "Cooler Master Hyper 212",
        category: "Cooler",
        price: 49,
        image: "https://unsplash.com",
        description: "CPU air cooling solution."
    },
    {
        id: 35,
        title: "NZXT Kraken 240",
        category: "Cooler",
        price: 129,
        image: "https://unsplash.com",
        description: "240mm liquid CPU cooler."
    },
    {
        id: 36,
        title: "NZXT H5 Flow Case",
        category: "Case",
        price: 89,
        image: "https://unsplash.com",
        description: "Airflow-focused PC case."
    },
    {
        id: 37,
        title: "Corsair 4000D Airflow",
        category: "Case",
        price: 104,
        image: "https://unsplash.com",
        description: "Mid-tower case with good airflow."
    },
    {
        id: 38,
        title: "Lian Li Lancool 216",
        category: "Case",
        price: 109,
        image: "https://unsplash.com",
        description: "Gaming PC case with large fans."
    },
    {
        id: 39,
        title: "Seagate Barracuda 2TB",
        category: "HDD",
        price: 59,
        image: "https://unsplash.com",
        description: "2TB high-capacity desktop storage drive."
    },
    {
        id: 40,
        title: "Arctic P12 Fan",
        category: "Fans",
        price: 12,
        image: "https://unsplash.com",
        description: "120mm high-performance case fan."
    }
];
const productsContainer = document.getElementById("products-container");

function showProducts() {
    productsContainer.innerHTML = "";

    products.forEach(function (product) {
        productsContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button>Add to Cart</button>
            </div>
        `;
    });
}

showProducts();