const mongoose = require('mongoose');
const Property = require('../server/models/Property');
const Room = require('../server/models/Room');
const User = require('../server/models/User'); // In case we need it, but likely not
require('dotenv').config({ path: '../server/.env' });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://adityapandeydevin_db_user:VDbyHpZw6yXc1K70@cluster0.obmddnh.mongodb.net/renthub?retryWrites=true&w=majority';

const roomTypes = ['single', 'double', 'triple', 'dormitory'];
const amenitiesList = ['wifi', 'ac', 'tv', 'attached_bathroom', 'balcony', 'study_table', 'geyser', 'security'];

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

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Connection failed:', err.message);
        process.exit(1);
    }
};

const populateRooms = async () => {
    await connectDB();

    try {
        console.log('Fetching all properties...');
        const properties = await Property.find({});
        console.log(`Found ${properties.length} properties.`);

        // Find existing rooms to avoid duplicates if necessary, but we'll trust the "0 rooms" check mostly
        // Or we can just add rooms if totalRooms is 0.

        let processed = 0;
        let added = 0;

        for (const property of properties) {
            // Check if property has rooms
            const roomCount = await Room.countDocuments({ property: property._id });

            if (roomCount > 0 && property.totalRooms === roomCount) {
                // Property has rooms and count matches
                continue;
            }

            if (roomCount > 0 && property.totalRooms !== roomCount) {
                // Sync count
                property.totalRooms = roomCount;
                property.availableRooms = await Room.countDocuments({ property: property._id, status: 'vacant' });
                await property.save();
                continue;
            }

            // If roomCount is 0, add rooms!
            const numRoomsToAdd = Math.floor(Math.random() * 3) + 1; // 1 to 3 rooms

            for (let k = 0; k < numRoomsToAdd; k++) {
                const roomData = {
                    property: property._id,
                    roomNumber: `${Math.floor(Math.random() * 100) + 100}-${String.fromCharCode(65 + k)}`,
                    roomType: getRandomItem(roomTypes),
                    rent: Math.floor(Math.random() * 15000) + 5000,
                    deposit: Math.floor(Math.random() * 50000) + 10000,
                    amenities: getRandomSubarray(amenitiesList, 4),
                    images: [
                        property.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
                        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=80'
                    ],
                    area: Math.floor(Math.random() * 300) + 100,
                    description: 'A cozy room with modern amenities.',
                    status: 'vacant'
                };

                await Room.create(roomData);
                added++;
            }

            // Update property counts
            const total = await Room.countDocuments({ property: property._id });
            const available = await Room.countDocuments({ property: property._id, status: 'vacant' });

            property.totalRooms = total;
            property.availableRooms = available;
            await property.save();

            processed++;
            if (processed % 50 === 0) console.log(`Processed ${processed} properties...`);
        }

        console.log(`DONE. Added ${added} rooms to ${processed} properties.`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
};

populateRooms();
