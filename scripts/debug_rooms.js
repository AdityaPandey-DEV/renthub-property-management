const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5001/api';

async function debugRooms() {
    try {
        console.log(`Checking rooms at: ${API_URL}`);

        // 1. Fetch rooms as they appear in the list
        console.log('Fetching /rooms (default)...');
        const res = await axios.get(`${API_URL}/rooms`);

        console.log('--- API Response ---');
        console.log(`Success: ${res.data.success}`);
        console.log(`Count: ${res.data.count}`);
        console.log(`Total: ${res.data.total}`);
        console.log(`Pages: ${res.data.pages}`);
        console.log(`Data Length: ${res.data.data.length}`);

        if (res.data.data.length > 0) {
            console.log('--- Sample Room 1 ---');
            const room = res.data.data[0];
            console.log(`ID: ${room._id}`);
            console.log(`Room Number: ${room.roomNumber}`);
            console.log(`Status: ${room.status}`);
            console.log(`Property Populated? ${!!room.property}`);
            if (room.property) {
                console.log(`Property ID: ${room.property._id}`);
                console.log(`Property Title: ${room.property.title}`);
                console.log(`Property Active: ${room.property.isActive}`);
            } else {
                console.log('Property is NULL');
            }
        }

    } catch (error) {
        console.error('Debug failed:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

debugRooms();
