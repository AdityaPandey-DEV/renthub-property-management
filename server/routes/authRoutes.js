const express = require('express');
const { body } = require('express-validator');
const {
    register,
    login,
    getMe,
    updateProfile,
    updatePassword,
    uploadAvatar
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post(
    '/register',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),
        body('role')
            .optional()
            .isIn(['tenant', 'landlord'])
            .withMessage('Role must be tenant or landlord')
    ],
    register
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    login
);

router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put(
    '/password',
    protect,
    [
        body('currentPassword').notEmpty().withMessage('Current password is required'),
        body('newPassword')
            .isLength({ min: 6 })
            .withMessage('New password must be at least 6 characters')
    ],
    updatePassword
);

router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);

module.exports = router;
