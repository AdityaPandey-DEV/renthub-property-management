const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5001/api';
const LANDLORD_EMAIL = 'rajesh@landlord.com';
const LANDLORD_PASSWORD = 'landlord123';

const roomTypes = ['single', 'double', 'triple', 'dormitory'];
// Corrected amenities list based on model enum
const amenitiesList = ['wifi', 'ac', 'tv', 'attached_bathroom', 'balcony', 'table', 'geyser', 'wardrobe', 'bed', 'chair', 'fan'];

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

async function fixMissingRooms() {
    try {
        console.log(`Checking properties at: ${API_URL}`);

        // 1. Login
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: LANDLORD_EMAIL,
            password: LANDLORD_PASSWORD
        });
        const token = loginRes.data.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log('Logged in.');

        // 2. Fetch all properties
        console.log('Fetching all properties...');
        const propsRes = await axios.get(`${API_URL}/properties?limit=2000`, config);
        const properties = propsRes.data.data;
        console.log(`Total properties found: ${properties.length}`);

        // 3. Fetch all rooms
        console.log('Fetching all rooms...');
        const roomsRes = await axios.get(`${API_URL}/rooms?limit=5000`, config);
        const rooms = roomsRes.data.data;
        console.log(`Total rooms found: ${rooms.length}`);

        const propertyIdsWithRooms = new Set(rooms.map(r => r.property?._id || r.property));

        const propertiesWithoutRooms = properties.filter(p => !propertyIdsWithRooms.has(p._id));

        console.log(`Properties with 0 rooms: ${propertiesWithoutRooms.length}`);

        if (propertiesWithoutRooms.length === 0) {
            console.log('All properties have at least one room!');
            return;
        }

        console.log(`Adding rooms to ${propertiesWithoutRooms.length} properties...`);

        let roomsAdded = 0;
        const batchSize = 10;

        for (let i = 0; i < propertiesWithoutRooms.length; i += batchSize) {
            const batchPromises = [];
            for (let j = 0; j < batchSize && i + j < propertiesWithoutRooms.length; j++) {
                const property = propertiesWithoutRooms[i + j];

                // Add 1-2 rooms
                const numRooms = Math.floor(Math.random() * 2) + 1;

                for (let k = 0; k < numRooms; k++) {
                    const roomData = {
                        propertyId: property._id, // CORRECTED FIELD NAME
                        roomNumber: `${Math.floor(Math.random() * 100) + 100}-${String.fromCharCode(65 + k)}`,
                        floor: Math.floor(Math.random() * 5) + 1,
                        roomType: getRandomItem(roomTypes),
                        rent: Math.floor(Math.random() * 15000) + 5000,
                        deposit: Math.floor(Math.random() * 50000) + 10000,
                        amenities: getRandomSubarray(amenitiesList, 4),
                        images: [
                            property.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
                            'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=80'
                        ],
                        area: Math.floor(Math.random() * 300) + 100,
                        description: 'A cozy room with modern amenities.'
                    };
                    batchPromises.push(axios.post(`${API_URL}/rooms`, roomData, config));
                }
            }

            const results = await Promise.allSettled(batchPromises);

            results.forEach(result => {
                if (result.status === 'fulfilled') {
                    roomsAdded++;
                } else {
                    console.error('Failed to add room:', result.reason?.response?.data || result.reason?.message);
                }
            });

            console.log(`Processed ${Math.min(i + batchSize, propertiesWithoutRooms.length)}/${propertiesWithoutRooms.length} (Added: ${roomsAdded})`);
        }

        console.log(`DONE. Successfully added ${roomsAdded} rooms.`);

    } catch (error) {
        console.error('Fix failed:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

fixMissingRooms();
