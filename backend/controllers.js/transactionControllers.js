const mongoose = require('mongoose')
const Transaction = require('../models/transactionModel')

//get all transactions
const getTransactions = async(req, res)=>{
    const transactions = await Transaction.find({}).sort({createdAt: -1});
    res.status(200).json(transactions)
}

//get a single transaction
const getTransaction = async(req, res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "No such transaction"})
    }

    const transaction = await Transaction.findById(id)
    if(!transaction){
        return res.status(404).json({error: "No such transaction"})
    }
    res.status(200).json({transaction})
}

//create new transaction
const createTransaction = async(req, res)=>{
    const {description, specification, amount} = req.body;
    try{
        const transaction = await Transaction.create({description, specification, amount})
        res.status(200).json(transaction)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

//delete a transaction
const deleteTransaction = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "No such transaction"})
    }
    const transaction = await Transaction.findOneAndDelete({_id: id})
    if(!transaction){
        return res.status(404).json({error: "No such transaction"})
    }
    return res.status(200).json(transaction)
}

//delete all transactions
const deleteTransactions = async(req, res)=>{
    const transactions = await Transaction.deleteMany()
    try{
        if (transactions.deletedCount === 0){
            return res.status(400).json({err: "No transaction to delete"})
        }
        return res.status(200).json(transactions)
    }catch(err){
        return res.status(500).json(err, {err: "Server error"})
    }
}

// update a workout
const updateTransaction = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such transaction'})
    }
    const transaction = await Transaction.findOneAndUpdate({_id: id}, {...req.body})
    if(!transaction){
        res.status(404).json({error: "No such transaction"})
    }
    res.status(200).json(transaction)
}



module.exports = {getTransactions, getTransaction, createTransaction, deleteTransaction, deleteTransactions, updateTransaction}