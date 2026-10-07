// Database of Vehicles
const cars = [
    {
        id: 1,
        brand: 'Lamborghini',
        model: 'Huracán LP 610-4',
        year: 2018,
        price: '₹ 3,15,00,000',
        km: '15,000 km',
        type: 'Petrol',
        transmission: 'Automatic',
        engine: '5.2L V10',
        acceleration: '3.2s',
        image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        brand: 'Ferrari',
        model: '488 GTB',
        year: 2019,
        price: '₹ 3,65,00,000',
        km: '9,500 km',
        type: 'Petrol',
        transmission: 'Automatic',
        engine: '3.9L Twin-Turbo V8',
        acceleration: '3.0s',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        brand: 'Aston Martin',
        model: 'DB11 V12',
        year: 2017,
        price: '₹ 2,59,00,000',
        km: '4,700 km',
        type: 'Petrol',
        transmission: 'Automatic',
        engine: '5.2L Twin-Turbo V12',
        acceleration: '3.9s',
        image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        brand: 'Ford',
        model: 'Mustang GT',
        year: 2018,
        price: '₹ 64,75,000',
        km: '22,000 km',
        type: 'Petrol',
        transmission: 'Automatic',
        engine: '5.0L V8',
        acceleration: '4.5s',
        image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42a5?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        brand: 'Jaguar',
        model: 'F-Type R',
        year: 2021,
        price: '₹ 98,00,000',
        km: '11,200 km',
        type: 'Petrol',
        transmission: 'Automatic',
        engine: '5.0L Supercharged V8',
        acceleration: '3.5s',
        image: 'https://images.unsplash.com/photo-1549111816-d3b76cf6b8f3?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 6,
        brand: 'BMW',
        model: '5 Series 530i M Sport',
        year: 2022,
        price: '₹ 67,00,000',
        km: '18,500 km',
        type: 'Petrol',
        transmission: 'Automatic',
        engine: '2.0L Turbo I4',
        acceleration: '6.1s',
        image: 'https://images.unsplash.com/photo-1555353540-64fd3b382025?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 7,
        brand: 'Toyota',
        model: 'Land Cruiser LC300',
        year: 2023,
        price: '₹ 2,10,00,000',
        km: '14,000 km',
        type: 'Diesel',
        transmission: 'Automatic',
        engine: '3.3L Twin-Turbo V6',
        acceleration: '6.7s',
        image: 'https://images.unsplash.com/photo-1593055428613-33e1457193f9?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 8,
        brand: 'Lamborghini',
        model: 'Urus Twin-Turbo',
        year: 2019,
        price: '₹ 3,50,00,000',
        km: '28,000 km',
        type: 'Petrol',
        transmission: 'Automatic',
        engine: '4.0L Twin-Turbo V8',
        acceleration: '3.6s',
        image: 'https://images.unsplash.com/photo-1662993012975-ebce01e389e8?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 9,
        brand: 'Ferrari',
        model: 'Portofino',
        year: 2020,
        price: '₹ 3,25,00,000',
        km: '13,000 km',
        type: 'Petrol',
        transmission: 'Automatic',
        engine: '3.9L Twin-Turbo V8',
        acceleration: '3.5s',
        image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80'
    }
];

// DOM Elements
const carGrid = document.getElementById('carGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

// Modal Elements
const modal = document.getElementById('carModal');
const closeBtn = document.querySelector('.close-btn');

// Render Cars Function
function displayCars(carArray) {
    carGrid.innerHTML = '';
    
    if (carArray.length === 0) {
        carGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No vehicles found matching your criteria.</p>';
        return;
    }

    carArray.forEach(car => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${car.image}" alt="${car.brand} ${car.model}">
            <div class="card-content">
                <p class="card-brand">${car.brand}</p>
                <h3 class="card-title">${car.year} ${car.model}</h3>
                <div class="card-specs">
                    <span>${car.km}</span>
                    <span>${car.type}</span>
                    <span>${car.transmission}</span>
                </div>
                <p class="card-price">${car.price}</p>
                <button class="btn view-details-btn" data-id="${car.id}">View Details</button>
            </div>
        `;
        carGrid.appendChild(card);
    });

    // Re-attach event listeners to new buttons
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const carId = parseInt(e.target.getAttribute('data-id'));
            openModal(carId);
        });
    });
}

// Initial Load
displayCars(cars);

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCars = cars.filter(car => 
        car.model.toLowerCase().includes(searchTerm) || 
        car.brand.toLowerCase().includes(searchTerm)
    );
    
    // Reset category buttons when searching
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-brand="All"]').classList.add('active');
    
    displayCars(filteredCars);
});

// Category Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Handle active state styling
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // Clear search input when clicking a filter
        searchInput.value = '';

        const selectedBrand = e.target.getAttribute('data-brand');
        
        if (selectedBrand === 'All') {
            displayCars(cars);
        } else {
            const filteredCars = cars.filter(car => car.brand === selectedBrand);
            displayCars(filteredCars);
        }
    });
});

// Modal Functionality
function openModal(id) {
    const car = cars.find(c => c.id === id);
    
    document.getElementById('modalImg').src = car.image;
    document.getElementById('modalTitle').textContent = `${car.year} ${car.brand} ${car.model}`;
    document.getElementById('modalPrice').textContent = car.price;
    document.getElementById('modalEngine').textContent = car.engine;
    document.getElementById('modalAcc').textContent = car.acceleration;
    document.getElementById('modalKm').textContent = car.km;
    document.getElementById('modalFuel').textContent = car.type;
    document.getElementById('modalTrans').textContent = car.transmission;
    document.getElementById('modalYear').textContent = car.year;

    modal.style.display = 'flex';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
