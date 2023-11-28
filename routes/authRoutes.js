// Router importat direct de la obiectul "express"
// const express = require("express");
// const router = express.Router();

// Router importat destructurat din obiectul "express"
const { Router } = require("express");
const router = Router();

const authController = require("../controllers/authController");

// routes

router.get("/signup", authController.signup_get);

router.post("/signup", authController.signup_post);

router.get("/login", authController.login_get);

router.post("/login", authController.login_post);

module.exports = router;
