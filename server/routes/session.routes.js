const express = require("express");
const { createSession, getSessionById, getMySessions, deleteSession } = require("../controllers/session.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post('/create', protect, createSession);
router.get('/my-sessions', protect, getMySessions);
router.get('/my-sessions/:id', protect, getSessionById);
router.delete('/my-sessions/:id/delete', protect, deleteSession);


module.exports = router;