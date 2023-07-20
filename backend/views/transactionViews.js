const express = require("express");

const {
  getTransaction,
  getTransactions,
  createTransaction,
  deleteTransaction,
  deleteTransactions,
  updateTransaction,
} = require("../controllers/transactionControllers");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all routes
router.use(requireAuth);

router.get("/", getTransactions);

router.get("/:id", getTransaction);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.delete("/", deleteTransactions);

router.patch("/:id", updateTransaction);

module.exports = router;
