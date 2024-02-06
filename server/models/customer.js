const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    shopItems: [ 
        {  
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ShopItem'
            },
            quantity: {
                type: Number,
                default: 0
            }

        }
    ]
})

const orderSchema = new mongoose.Schema({
    shopItems: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ShopItem'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]        
})

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: cartSchema,
        default: {},
        required: true
    },
    order: {
        type: orderSchema,
        default: {},
        required: true
    },
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer