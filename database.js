// Local Database simulation storing initial home appliance items
const initialProducts = [
    { id: 1, name: 'Smart Inverter Split AC 1.5Ton', category: 'cooling', price: 450, image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=600&q=80', desc: 'Energy efficient dual inverter compressor with fast cooling.' },
    { id: 2, name: 'Double Door Frost-Free Refrigerator', category: 'kitchen', price: 650, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', desc: 'Spacious storage with smart cooling and multi-airflow tech.' },
    { id: 3, name: 'Front Load Automatic Washing Machine', category: 'laundry', price: 520, image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80', desc: 'Steam wash technology with 99% allergen removal capability.' },
    { id: 4, name: 'Convection Microwave Oven 28L', category: 'kitchen', price: 180, image: 'https://images.unsplash.com/photo-1585515320310-2598148338e4?auto=format&fit=crop&w=600&q=80', desc: 'Multi-cooking modes with touch control panel and grill features.' },
    { id: 5, name: 'High-Suction Robotic Vacuum Cleaner', category: 'cleaning', price: 300, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80', desc: 'Smart mapping, auto-recharge, and deep carpet cleaning support.' },
    { id: 6, name: 'Tower Air Purifier with HEPA Filter', category: 'cooling', price: 220, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80', desc: 'Real-time air quality indicator removing 99.97% microscopic particles.' }
];

// Initialize LocalStorage Database if empty
function initializeDatabase() {
    if (!localStorage.getItem('appliances_db')) {
        localStorage.setItem('appliances_db', JSON.stringify(initialProducts));
    }
    if (!localStorage.getItem('cart_db')) {
        localStorage.setItem('cart_db', JSON.stringify([]));
    }
}

function getProducts() {
    return JSON.parse(localStorage.getItem('appliances_db'));
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart_db'));
}

function saveCart(cart) {
    localStorage.setItem('cart_db', JSON.stringify(cart));
}