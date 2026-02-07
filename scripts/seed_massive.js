const axios = require('axios');
const mongoose = require('mongoose');

const API_URL = process.env.API_URL || 'http://localhost:5001/api';
const LANDLORD_EMAIL = 'rajesh@landlord.com';
const LANDLORD_PASSWORD = 'landlord123';

const cities = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune'];
const propertyTypes = ['apartment', 'house', 'villa', 'pg'];
const amenitiesList = ['wifi', 'parking', 'gym', 'security', 'power_backup', 'garden', 'lift'];
const imagesList = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'
];

const titles = [
    'Luxury Apartment', 'Cozy Studio', 'Spacious Villa', 'Modern Loft', 'Student PG',
    'Family Home', 'Executive Suite', 'Penthouse', 'Garden View Flat', 'City Center Stay'
];

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

// Generate 250 properties
async function seedMassive() {
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

        const totalProperties = 250;
        console.log(`Starting to seed ${totalProperties} properties...`);

        // Create promises in batches to avoid overwhelming the server
        const batchSize = 10;
        for (let i = 0; i < totalProperties; i += batchSize) {
            const batchPromises = [];
            for (let j = 0; j < batchSize && i + j < totalProperties; j++) {
                const city = getRandomItem(cities);
                const type = getRandomItem(propertyTypes);
                const title = `${getRandomItem(titles)} in ${city}`;

                const propData = {
                    title: title,
                    description: `Experience the best living in ${city}. This ${type} offers modern amenities and great connectivity.`,
                    propertyType: type,
                    address: {
                        street: `${Math.floor(Math.random() * 999) + 1} Main Road`,
                        city: city,
                        state: 'India',
                        pincode: '560001'
                    },
                    amenities: getRandomSubarray(amenitiesList, 3),
                    images: [getRandomItem(imagesList)],
                    views: Math.floor(Math.random() * 50000) // Random views for sorting
                };

                // We also need to add 'views' to the payload, but the controller might filter it out if not expecting it in body.
                // Since Mongoose create() takes the object, it usually allows fields in schema.
                // However, createProperty controller might pick specific fields or pass req.body directly.
                // Checked controller: `const property = await Property.create(req.body);` - It passes req.body!
                // So passing 'views' here should work.

                batchPromises.push(axios.post(`${API_URL}/properties`, propData, config));
            }

            await Promise.all(batchPromises);
            console.log(`Seeded ${Math.min(i + batchSize, totalProperties)}/${totalProperties} properties`);
        }

        console.log('Massive seeding completed!');

    } catch (error) {
        console.error('Seeding failed:', error.message);
        if (error.response) console.error(error.response.data);
    }
}

seedMassive();
