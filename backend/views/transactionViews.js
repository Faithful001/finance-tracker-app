const express = require('express')

const {getTransaction, getTransactions, createTransaction, deleteTransaction, deleteTransactions, updateTransaction} = require('../controllers.js/transactionControllers')


const router = express.Router();


router.get('/', getTransactions)

router.get('/:id', getTransaction)

router.post('/', createTransaction)

router.delete('/:id', deleteTransaction)

router.delete('/', deleteTransactions)

router.patch('/:id', updateTransaction)


module.exports = router;
