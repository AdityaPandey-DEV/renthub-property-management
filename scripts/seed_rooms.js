const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5001/api';
const LANDLORD_EMAIL = 'rajesh@landlord.com';
const LANDLORD_PASSWORD = 'landlord123';

const roomTypes = ['single', 'double', 'triple'];
const amenitiesList = ['wifi', 'ac', 'tv', 'attached_bathroom', 'balcony', 'study_table'];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSubarray(arr, size) {
    const shuffled = arr.slice(0);
    let i = arr.length;
    let temp, index;
    while (i--) {
        index = Math.floor(Math.random() * (i + 1));
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

async function seedRooms() {
    try {
        console.log(`Using API URL: ${API_URL}`);

        // 1. Login
        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: LANDLORD_EMAIL,
            password: LANDLORD_PASSWORD
        });
        const token = loginRes.data.token;
        console.log('Login successful.');

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        // 2. Fetch all properties
        console.log('Fetching properties...');
        // We need to fetch all properties. The API paginates, so we might need to loop or request a large limit.
        // Let's try to fetch a large number.
        const propsRes = await axios.get(`${API_URL}/properties?limit=1000`, config);
        const properties = propsRes.data.data;
        console.log(`Found ${properties.length} properties.`);

        // 3. Filter properties with 0 rooms (or just add rooms to all for robust demo)
        // Since we want to ensure "Top Picks" have rooms, and they are sorted by views, we should prioritize them?
        // But we don't know which ones have high views easily.
        // Let's just iterate through all and check if they have rooms.
        // Actually, the keys might not have 'rooms' populated.
        // So we will just iterate and try to add a room if we want.

        let roomsAdded = 0;
        const batchSize = 10;

        for (let i = 0; i < properties.length; i += batchSize) {
            const batchPromises = [];
            for (let j = 0; j < batchSize && i + j < properties.length; j++) {
                const property = properties[i + j];

                // Randomly decide how many rooms to add (3-8)
                const numRooms = Math.floor(Math.random() * 6) + 3;

                for (let k = 0; k < numRooms; k++) {
                    const status = Math.random() < 0.7 ? 'vacant' : (Math.random() < 0.9 ? 'occupied' : 'maintenance');
                    const roomData = {
                        property: property._id,
                        roomNumber: `${Math.floor(Math.random() * 100) + 100}-${String.fromCharCode(65 + k)}`,
                        floor: Math.floor(Math.random() * 5) + 1,
                        roomType: getRandomItem(roomTypes),
                        rent: Math.floor(Math.random() * 15000) + 5000,
                        deposit: Math.floor(Math.random() * 50000) + 10000,
                        amenities: getRandomSubarray(amenitiesList, 3),
                        images: [property.images[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80'],
                        area: Math.floor(Math.random() * 300) + 100,
                        description: 'A comfortable room with great amenities.',
                        status: status
                    };
                    batchPromises.push(axios.post(`${API_URL}/rooms`, roomData, config));
                    roomsAdded++;
                }
            }

            await Promise.allSettled(batchPromises); // Use allSettled to ignore errors (e.g., duplicate room number)
            console.log(`Processed ${Math.min(i + batchSize, properties.length)}/${properties.length} properties.`);
        }

        console.log(`Successfully added approx ${roomsAdded} rooms.`);

    } catch (error) {
        console.error('Seeding rooms failed:', error.message);
        if (error.response) console.error(error.response.data);
    }
}

seedRooms();
