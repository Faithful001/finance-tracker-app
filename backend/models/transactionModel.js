// const express = require('express')

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TransactionSchema = new Schema ({
    description: {
        type: String,
        required: true
    },
    specification: {
        type: String,
        enum: ['Income', 'Expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const model = mongoose.model("Transaction", TransactionSchema)

module.exports = model