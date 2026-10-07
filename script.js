/* =========================================
   SAMPLE CAR DATA
========================================= */

const defaultCars = [
    {
        id: 1,
        brand: "Toyota",
        model: "Fortuner",
        year: 2022,
        mileage: 32000,
        fuel: "Diesel",
        transmission: "Automatic",
        ownership: "1st Owner",
        color: "White",
        originalPrice: 4200000,
        price: 3650000,
        negotiable: "Yes",
        city: "Kochi",
        state: "Kerala",
        description: "Excellent condition. Full service history.",
        image: ""
    },

    {
        id: 2,
        brand: "Honda",
        model: "City",
        year: 2021,
        mileage: 28000,
        fuel: "Petrol",
        transmission: "Automatic",
        ownership: "1st Owner",
        color: "Red",
        originalPrice: 1650000,
        price: 1320000,
        negotiable: "Yes",
        city: "Trivandrum",
        state: "Kerala",
        description: "Well maintained family car.",
        image: ""
    },

    {
        id: 3,
        brand: "Hyundai",
        model: "Creta",
        year: 2023,
        mileage: 18000,
        fuel: "Petrol",
        transmission: "Automatic",
        ownership: "1st Owner",
        color: "Black",
        originalPrice: 1950000,
        price: 1740000,
        negotiable: "No",
        city: "Kozhikode",
        state: "Kerala",
        description: "Low mileage and excellent condition.",
        image: ""
    }
];


/* =========================================
   LOAD CAR DATA
========================================= */

let cars = JSON.parse(
    localStorage.getItem("autoMarketCars")
);

if (!cars || !Array.isArray(cars) || cars.length === 0) {
    cars = defaultCars;
    saveCars();
}


/* =========================================
   SAVE DATA
========================================= */

function saveCars() {
    localStorage.setItem(
        "autoMarketCars",
        JSON.stringify(cars)
    );
}


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price || 0);

}


/* =========================================
   DISPLAY CARS
========================================= */

function displayCars(list = cars) {

    const container =
        document.getElementById("carsContainer");

    const noCars =
        document.getElementById("noCars");

    const count =
        document.getElementById("carCount");

    container.innerHTML = "";

    count.textContent =
        `${list.length} car${list.length !== 1 ? "s" : ""} available`;


    if (list.length === 0) {

        noCars.classList.remove("hidden");

        return;

    }

    noCars.classList.add("hidden");


    list.forEach(car => {

        const card =
            document.createElement("div");

        card.className = "car-card";


        const imageHTML = car.image
            ? `<img src="${car.image}" alt="${escapeHTML(car.brand)} ${escapeHTML(car.model)}">`
            : `<i class="fa-solid fa-car-side"></i>`;


        card.innerHTML = `

            <div class="car-image">
                ${imageHTML}
            </div>

            <div class="car-content">

                <div class="car-title">

                    <h3>
                        ${escapeHTML(car.brand)}
                        ${escapeHTML(car.model)}
                    </h3>

                    <button
                        class="favorite"
                        onclick="toggleFavorite(this)"
                    >
                        <i class="fa-regular fa-heart"></i>
                    </button>

                </div>


                <div class="car-price">
                    ${formatPrice(car.price)}
                </div>


                <div class="car-details">

                    <div class="car-detail">
                        <i class="fa-solid fa-calendar"></i>
                        ${car.year}
                    </div>

                    <div class="car-detail">
                        <i class="fa-solid fa-gauge"></i>
                        ${Number(car.mileage).toLocaleString("en-IN")} km
                    </div>

                    <div class="car-detail">
                        <i class="fa-solid fa-gas-pump"></i>
                        ${escapeHTML(car.fuel)}
                    </div>

                    <div class="car-detail">
                        <i class="fa-solid fa-gears"></i>
                        ${escapeHTML(car.transmission)}
                    </div>

                </div>


                <div class="car-location">
                    <i class="fa-solid fa-location-dot"></i>

                    ${escapeHTML(car.city)}
                    ${car.state ? ", " + escapeHTML(car.state) : ""}
                </div>


                <div class="car-footer">

                    <button
                        class="view-btn"
                        onclick="viewCar(${car.id})"
                    >
                        View Details
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteCar(${car.id})"
                        title="Delete listing"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>
        `;


        container.appendChild(card);

    });

}


/* =========================================
   SEARCH / FILTER
========================================= */

function filterCars() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const fuel =
        document
            .getElementById("fuelFilter")
            .value;


    const transmission =
        document
            .getElementById("transmissionFilter")
            .value;


    const filtered =
        cars.filter(car => {

            const text =
                `${car.brand} ${car.model}`
                .toLowerCase();


            const matchesSearch =
                !search ||
                text.includes(search);


            const matchesFuel =
                !fuel ||
                car.fuel === fuel;


            const matchesTransmission =
                !transmission ||
                car.transmission === transmission;


            return (
                matchesSearch &&
                matchesFuel &&
                matchesTransmission
            );

        });


    displayCars(filtered);
}


/* =========================================
   DELETE CAR
========================================= */

function deleteCar(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this listing?"
        );


    if (!confirmed) {
        return;
    }


    cars =
        cars.filter(car => car.id !== id);


    saveCars();

    displayCars();
}


/* =========================================
   VIEW CAR
========================================= */

function viewCar(id) {

    const car =
        cars.find(car => car.id === id);


    if (!car) {
        return;
    }


    const details = `

${car.brand} ${car.model}

Price: ${formatPrice(car.price)}

Year: ${car.year}

Mileage: ${Number(car.mileage).toLocaleString("en-IN")} km

Fuel: ${car.fuel}

Transmission: ${car.transmission}

Ownership: ${car.ownership}

Color: ${car.color || "Not specified"}

Location: ${car.city}, ${car.state || ""}

Negotiable: ${car.negotiable}

Description:
${car.description || "No description provided."}

    `;


    alert(details);

}


/* =========================================
   FAVORITE
========================================= */

function toggleFavorite(button) {

    button.classList.toggle("active");

    const icon =
        button.querySelector("i");


    if (button.classList.contains("active")) {

        icon.classList.remove(
            "fa-regular"
        );

        icon.classList.add(
            "fa-solid"
        );

    } else {

        icon.classList.remove(
            "fa-solid"
        );

        icon.classList.add(
            "fa-regular"
        );

    }

}


/* =========================================
   IMAGE PREVIEW
========================================= */

let uploadedImage = "";


function previewImage(event) {

    const file =
        event.target.files[0];


    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        alert("Please select an image file.");

        return;
    }


    const reader =
        new FileReader();


    reader.onload = function(e) {

        uploadedImage =
            e.target.result;


        const preview =
            document.getElementById(
                "imagePreview"
            );


        preview.innerHTML = `
            <img
                src="${uploadedImage}"
                alt="Car preview"
            >
        `;


        updateLivePreviewImage();

    };


    reader.readAsDataURL(file);
}


/* =========================================
   UPDATE PREVIEW IMAGE
========================================= */

function updateLivePreviewImage() {

    const previewImage =
        document.querySelector(
            ".preview-image"
        );


    if (uploadedImage) {

        previewImage.innerHTML = `
            <img
                src="${uploadedImage}"
                alt="Car preview"
            >
        `;

    } else {

        previewImage.innerHTML = `
            <i class="fa-solid fa-car"></i>
        `;

    }

}


/* =========================================
   CALCULATE SAVINGS
========================================= */

function calculateSavings() {

    const original =
        Number(
            document.getElementById(
                "originalPrice"
            ).value
        );


    const selling =
        Number(
            document.getElementById(
                "price"
            ).value
        );


    const box =
        document.getElementById(
            "savingsBox"
        );


    const text =
        document.getElementById(
            "savingsText"
        );


    if (
        original > 0 &&
        selling > 0 &&
        original > selling
    ) {

        const savings =
            original - selling;


        const percentage =
            Math.round(
                (savings / original) * 100
            );


        text.textContent =
            `Save ${formatPrice(savings)} (${percentage}% below original price)`;


        box.classList.remove("hidden");

    } else {

        box.classList.add("hidden");

    }

}


/* =========================================
   LIVE FORM PREVIEW
========================================= */

function updateLivePreview() {

    const brand =
        document.getElementById("brand").value
        || "Your";


    const model =
        document.getElementById("model").value
        || "Car";


    const year =
        document.getElementById("year").value
        || "Year";


    const mileage =
        document.getElementById("mileage").value;


    const fuel =
        document.getElementById("fuel").value
        || "Fuel";


    const transmission =
        document.getElementById("transmission").value
        || "Transmission";


    const price =
        document.getElementById("price").value;


    document.getElementById(
        "previewName"
    ).textContent =
        `${brand} ${model}`;


    document.getElementById(
        "previewYear"
    ).textContent =
        year;


    document.getElementById(
        "previewMileage"
    ).textContent =
        mileage
            ? `${Number(mileage).toLocaleString("en-IN")} km`
            : "KM";


    document.getElementById(
        "previewFuel"
    ).textContent =
        fuel;


    document.getElementById(
        "previewTransmission"
    ).textContent =
        transmission;


    document.getElementById(
        "previewPrice"
    ).textContent =
        price
            ? formatPrice(price)
            : "₹0";

}


/* =========================================
   FORM SUBMISSION
========================================= */

document
    .getElementById("carForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const newCar = {

                id:
                    Date.now(),

                brand:
                    document.getElementById(
                        "brand"
                    ).value.trim(),

                model:
                    document.getElementById(
                        "model"
                    ).value.trim(),

                year:
                    Number(
                        document.getElementById(
                            "year"
                        ).value
                    ),

                mileage:
                    Number(
                        document.getElementById(
                            "mileage"
                        ).value
                    ),

                fuel:
                    document.getElementById(
                        "fuel"
                    ).value,

                transmission:
                    document.getElementById(
                        "transmission"
                    ).value,

                ownership:
                    document.getElementById(
                        "ownership"
                    ).value,

                color:
                    document.getElementById(
                        "color"
                    ).value.trim(),

                originalPrice:
                    Number(
                        document.getElementById(
                            "originalPrice"
                        ).value
                    ) || 0,

                price:
                    Number(
                        document.getElementById(
                            "price"
                        ).value
                    ),

                negotiable:
                    document.getElementById(
                        "negotiable"
                    ).value,

                city:
                    document.getElementById(
                        "city"
                    ).value.trim(),

                state:
                    document.getElementById(
                        "state"
                    ).value.trim(),

                description:
                    document.getElementById(
                        "description"
                    ).value.trim(),

                image:
                    uploadedImage

            };


            cars.unshift(newCar);

            saveCars();

            displayCars();


            document
                .getElementById("carForm")
                .reset();


            uploadedImage = "";

            document.getElementById(
                "imagePreview"
            ).innerHTML = "";


            updateLivePreview();

            updateLivePreviewImage();

            calculateSavings();


            document
                .getElementById("successModal")
                .classList.add("show");


            document
                .getElementById("cars")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =========================================
   INPUT LISTENERS
========================================= */

const previewInputs = [
    "brand",
    "model",
    "year",
    "mileage",
    "fuel",
    "transmission",
    "price"
];


previewInputs.forEach(id => {

    const element =
        document.getElementById(id);


    element.addEventListener(
        "input",
        updateLivePreview
    );


    element.addEventListener(
        "change",
        updateLivePreview
    );

});


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    document
        .getElementById("successModal")
        .classList.remove("show");


    document
        .getElementById("cars")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   SCROLL TO SELL
========================================= */

function scrollToSell() {

    document
        .getElementById("sell")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   INITIALIZE
========================================= */

displayCars();

updateLivePreview();

updateLivePreviewImage();

