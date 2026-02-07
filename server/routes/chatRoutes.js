const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createChat, getUserChats, getMessages, sendMessage } = require('../controllers/chatController');

router.use(protect);

router.post('/', createChat);
router.get('/', getUserChats);
router.get('/:chatId/messages', getMessages);
router.post('/:chatId/messages', sendMessage);

module.exports = router;
