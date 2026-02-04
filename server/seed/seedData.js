require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Property = require('../models/Property');
const Room = require('../models/Room');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Property.deleteMany({});
        await Room.deleteMany({});

        console.log('Cleared existing data...');

        // Create Users
        const users = await User.create([
            {
                name: 'Admin User',
                email: 'admin@renthub.com',
                password: 'admin123',
                phone: '9876543210',
                role: 'admin',
                isVerified: true
            },
            {
                name: 'Rajesh Kumar',
                email: 'rajesh@landlord.com',
                password: 'landlord123',
                phone: '9876543211',
                role: 'landlord',
                isVerified: true,
                address: {
                    street: '123 MG Road',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pincode: '560001'
                }
            },
            {
                name: 'Priya Sharma',
                email: 'priya@landlord.com',
                password: 'landlord123',
                phone: '9876543212',
                role: 'landlord',
                isVerified: true,
                address: {
                    street: '456 Park Street',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400001'
                }
            },
            {
                name: 'Amit Patel',
                email: 'amit@tenant.com',
                password: 'tenant123',
                phone: '9876543213',
                role: 'tenant',
                isVerified: true,
                address: {
                    street: '789 Lake View',
                    city: 'Delhi',
                    state: 'Delhi',
                    pincode: '110001'
                }
            },
            {
                name: 'Sneha Reddy',
                email: 'sneha@tenant.com',
                password: 'tenant123',
                phone: '9876543214',
                role: 'tenant',
                isVerified: true,
                address: {
                    street: '321 Green Avenue',
                    city: 'Hyderabad',
                    state: 'Telangana',
                    pincode: '500001'
                }
            }
        ]);

        console.log('Created users...');

        const landlord1 = users.find(u => u.email === 'rajesh@landlord.com');
        const landlord2 = users.find(u => u.email === 'priya@landlord.com');

        // Create Properties
        const properties = await Property.create([
            {
                owner: landlord1._id,
                title: 'Sunrise Apartments',
                description: 'Modern apartment complex in the heart of Bangalore with excellent connectivity and world-class amenities. Perfect for young professionals.',
                propertyType: 'apartment',
                address: {
                    street: '45 Koramangala 5th Block',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pincode: '560095',
                    coordinates: { lat: 12.9352, lng: 77.6245 }
                },
                amenities: ['wifi', 'parking', 'security', 'gym', 'power_backup', 'lift', 'cctv'],
                images: ['/uploads/property1.jpg'],
                totalRooms: 4,
                availableRooms: 3,
                isActive: true
            },
            {
                owner: landlord1._id,
                title: 'Green Valley PG',
                description: 'Comfortable PG accommodation for students and working professionals. Homely food and clean environment.',
                propertyType: 'pg',
                address: {
                    street: '78 HSR Layout',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pincode: '560102',
                    coordinates: { lat: 12.9116, lng: 77.6389 }
                },
                amenities: ['wifi', 'laundry', 'security', 'water_supply', 'power_backup'],
                images: ['/uploads/property2.jpg'],
                totalRooms: 6,
                availableRooms: 4,
                isActive: true
            },
            {
                owner: landlord2._id,
                title: 'Sea View Residency',
                description: 'Premium apartment with stunning sea views. Located in one of Mumbai most sought-after neighborhoods.',
                propertyType: 'apartment',
                address: {
                    street: '12 Marine Drive',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400020',
                    coordinates: { lat: 18.9442, lng: 72.8232 }
                },
                amenities: ['wifi', 'parking', 'security', 'gym', 'power_backup', 'lift', 'cctv', 'ac', 'furnished'],
                images: ['/uploads/property3.jpg'],
                totalRooms: 3,
                availableRooms: 2,
                isActive: true
            },
            {
                owner: landlord2._id,
                title: 'Metro Heights',
                description: 'Affordable housing near metro station. Ideal for daily commuters with easy access to all parts of the city.',
                propertyType: 'apartment',
                address: {
                    street: '34 Andheri East',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400069',
                    coordinates: { lat: 19.1197, lng: 72.8464 }
                },
                amenities: ['wifi', 'parking', 'security', 'water_supply', 'lift'],
                images: ['/uploads/property4.jpg'],
                totalRooms: 5,
                availableRooms: 3,
                isActive: true
            }
        ]);

        console.log('Created properties...');

        // Create Rooms
        const rooms = await Room.create([
            // Sunrise Apartments rooms
            {
                property: properties[0]._id,
                roomNumber: 'A-101',
                roomType: 'single',
                rent: 15000,
                deposit: 30000,
                area: 300,
                amenities: ['attached_bathroom', 'ac', 'wardrobe', 'bed', 'table'],
                status: 'vacant',
                description: 'Cozy single room with attached bathroom and AC.'
            },
            {
                property: properties[0]._id,
                roomNumber: 'A-102',
                roomType: 'double',
                rent: 22000,
                deposit: 44000,
                area: 450,
                amenities: ['attached_bathroom', 'balcony', 'ac', 'wardrobe', 'bed', 'table', 'tv'],
                status: 'vacant',
                description: 'Spacious double room with balcony and TV.'
            },
            {
                property: properties[0]._id,
                roomNumber: 'A-103',
                roomType: 'double',
                rent: 25000,
                deposit: 50000,
                area: 500,
                amenities: ['attached_bathroom', 'balcony', 'ac', 'wardrobe', 'bed', 'table', 'tv', 'geyser'],
                status: 'occupied',
                description: 'Premium double room with all amenities.'
            },
            {
                property: properties[0]._id,
                roomNumber: 'A-104',
                roomType: 'single',
                rent: 12000,
                deposit: 24000,
                area: 250,
                amenities: ['attached_bathroom', 'fan', 'wardrobe', 'bed'],
                status: 'vacant',
                description: 'Budget-friendly single room.'
            },
            // Green Valley PG rooms
            {
                property: properties[1]._id,
                roomNumber: 'PG-1',
                roomType: 'single',
                rent: 8000,
                deposit: 16000,
                area: 120,
                amenities: ['fan', 'bed', 'table', 'chair'],
                status: 'vacant',
                description: 'Simple and clean single occupancy room.'
            },
            {
                property: properties[1]._id,
                roomNumber: 'PG-2',
                roomType: 'double',
                rent: 6000,
                deposit: 12000,
                area: 180,
                amenities: ['fan', 'bed', 'table'],
                status: 'vacant',
                description: 'Shared room for two with essentials.'
            },
            {
                property: properties[1]._id,
                roomNumber: 'PG-3',
                roomType: 'triple',
                rent: 4500,
                deposit: 9000,
                area: 220,
                amenities: ['fan', 'bed'],
                status: 'vacant',
                description: 'Triple sharing for budget-conscious tenants.'
            },
            {
                property: properties[1]._id,
                roomNumber: 'PG-4',
                roomType: 'dormitory',
                rent: 3500,
                deposit: 7000,
                area: 300,
                amenities: ['fan', 'bed'],
                status: 'vacant',
                description: 'Dormitory style accommodation.'
            },
            // Sea View Residency rooms
            {
                property: properties[2]._id,
                roomNumber: 'SV-1A',
                roomType: 'double',
                rent: 45000,
                deposit: 90000,
                area: 600,
                amenities: ['attached_bathroom', 'balcony', 'ac', 'wardrobe', 'bed', 'table', 'tv', 'geyser', 'wifi'],
                status: 'vacant',
                description: 'Luxurious sea-facing room with premium furnishings.'
            },
            {
                property: properties[2]._id,
                roomNumber: 'SV-1B',
                roomType: 'double',
                rent: 40000,
                deposit: 80000,
                area: 550,
                amenities: ['attached_bathroom', 'ac', 'wardrobe', 'bed', 'table', 'tv', 'geyser'],
                status: 'occupied',
                description: 'Well-appointed room with city view.'
            },
            {
                property: properties[2]._id,
                roomNumber: 'SV-2A',
                roomType: 'single',
                rent: 35000,
                deposit: 70000,
                area: 400,
                amenities: ['attached_bathroom', 'ac', 'wardrobe', 'bed', 'table', 'geyser'],
                status: 'vacant',
                description: 'Elegant single room for professionals.'
            },
            // Metro Heights rooms
            {
                property: properties[3]._id,
                roomNumber: 'M-101',
                roomType: 'single',
                rent: 12000,
                deposit: 24000,
                area: 280,
                amenities: ['attached_bathroom', 'ac', 'wardrobe', 'bed', 'table'],
                status: 'vacant',
                description: 'Convenient single room near metro.'
            },
            {
                property: properties[3]._id,
                roomNumber: 'M-102',
                roomType: 'double',
                rent: 18000,
                deposit: 36000,
                area: 400,
                amenities: ['attached_bathroom', 'balcony', 'ac', 'wardrobe', 'bed', 'table'],
                status: 'vacant',
                description: 'Spacious double room with balcony.'
            },
            {
                property: properties[3]._id,
                roomNumber: 'M-103',
                roomType: 'double',
                rent: 20000,
                deposit: 40000,
                area: 450,
                amenities: ['attached_bathroom', 'balcony', 'ac', 'wardrobe', 'bed', 'table', 'tv'],
                status: 'occupied',
                description: 'Premium double room with TV.'
            },
            {
                property: properties[3]._id,
                roomNumber: 'M-104',
                roomType: 'single',
                rent: 10000,
                deposit: 20000,
                area: 220,
                amenities: ['attached_bathroom', 'fan', 'wardrobe', 'bed'],
                status: 'vacant',
                description: 'Affordable single room option.'
            }
        ]);

        console.log('Created rooms...');

        console.log(`
    ╔═══════════════════════════════════════════════════════════╗
    ║              🎉 Seed Data Created Successfully!           ║
    ╠═══════════════════════════════════════════════════════════╣
    ║  Users Created:      5                                    ║
    ║  Properties Created: 4                                    ║
    ║  Rooms Created:      15                                   ║
    ╠═══════════════════════════════════════════════════════════╣
    ║  Demo Accounts:                                           ║
    ║  ─────────────                                            ║
    ║  Admin:    admin@renthub.com / admin123                   ║
    ║  Landlord: rajesh@landlord.com / landlord123              ║
    ║  Landlord: priya@landlord.com / landlord123               ║
    ║  Tenant:   amit@tenant.com / tenant123                    ║
    ║  Tenant:   sneha@tenant.com / tenant123                   ║
    ╚═══════════════════════════════════════════════════════════╝
    `);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
