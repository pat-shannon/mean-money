const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware")
const FinancialAdvisorController = require("../controllers/financialAdvice")

router.get('/financial-advice', authenticateToken, FinancialAdvisorController.getFinancialAdvice);

module.exports = router;