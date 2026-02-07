const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5001/api';
const LANDLORD_EMAIL = 'rajesh@landlord.com';
const LANDLORD_PASSWORD = 'landlord123';

const propertyData = {
    title: "Modern Sea View Apartment",
    description: "A spacious and modern apartment with a beautiful sea view. Perfect for professionals.",
    propertyType: "apartment",
    address: {
        street: "123 Marina Beach Road",
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: "600001"
    },
    amenities: ["wifi", "parking", "ac", "security", "gym", "power_backup"],
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"]
};

const roomData = {
    roomNumber: "101",
    roomType: "single",
    rent: 15000,
    deposit: 50000,
    amenities: ["attached_bathroom", "ac", "wifi", "bed", "wardrobe"],
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2338&q=80"]
};

async function seed() {
    try {
        console.log(`Using API URL: ${API_URL}`);

        // 1. Login
        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: LANDLORD_EMAIL,
            password: LANDLORD_PASSWORD
        });
        const token = loginRes.data.token;
        console.log('Login successful. Token received.');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        // 2. Create Property
        console.log('Creating property...');
        const propRes = await axios.post(`${API_URL}/properties`, propertyData, config);
        const propertyId = propRes.data.data.id || propRes.data.data._id;
        console.log(`Property created with ID: ${propertyId}`);

        // 3. Create Room
        console.log('Creating room...');
        const roomPayload = { ...roomData, propertyId };
        const roomRes = await axios.post(`${API_URL}/rooms`, roomPayload, config);
        console.log(`Room created with ID: ${roomRes.data.data.id || roomRes.data.data._id}`);

        console.log('Seeding completed successfully!');
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.status, error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

seed();
