const mongoose = require('mongoose')
const validator = require('validator')

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
        validate: {
            validator: value => validator.isLength(value, { min: 8, max: 20 }) && validator.isAlphanumeric(value),
            message: 'Username must be between 8 and 20 characters long and does not contain special characters.'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: value => validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 2,
                minSymbols: 0,
                returnScore: false
            }),
            message: 'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, and 2 digits.'
        }
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