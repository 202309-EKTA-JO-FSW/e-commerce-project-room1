const mongoose = require('mongoose')

const Customer = require('../models/customer')
const ShopItem = require('../models/shop-item')

const getAllCustomers = async (req, res) => {
    const customers = await Customer.find({});
    res.json(customers)
}

const addCustomer = async (req, res) => {
    const customerDetails = req.body
    const customer = await Customer.create(customerDetails)
    res.json(customer)
}

const filterShopItems = async (req, res) => {
    const { genre, price } = req.body
    let query = {}
    if (genre && price) {
        if (price.min && price.max) {
            query = { genre: genre, price: { $gte: price.min, $lte: price.max } };
            } else {
            query = { genre: genre, price: price  };
        }

    } else if ( genre && !price) {
            query = { genre: genre }

    } else if ( !genre && price) {
        if (price.min && price.max) {
            query = { price: { $gte: price.min, $lte: price.max } };
            } else {
            query = { price: price };
        }
    } else {
            res.status(400).json({ message: 'Enter a valid query' })
        }
    try { 
        const filteredItem = await ShopItem.find( query )
        res.status(200).json(filteredItem)
    } catch (err) {
        res.status(422).json({ message: 'Error finding an item', error: err.message})
    }
}

const searchShopItems = async (req, res) => {
    try {
     const search = req.query
     
     let query = {}
     if (search.title) {
         query.title = { $regex: search.title }
     }
     if (search.description) {
         query.description = { $regex: search.description }
     }
     if (search.genre) {
        query.genre = search.genre
    }
     const searchResults = await ShopItem.find(query)
     res.status(200).json({ message: 'Search Results', items: searchResults });
    } catch (err) {
     res.status(422).json({ message: 'Error searching for items', error: err.message });
    }
 }

 const getCart = async (req, res) => {
    const customerId = req.params.customerId
    const customer = await Customer.findById(customerId).populate('cart.shopItems')
    const cartItems = customer.cart.shopItems;
    res.json(cartItems)
 }

 const addToCart = async (req, res) => {
    const customerId = req.params.customerId
    const { itemId, quantity } = req.body

    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(422).json({ message: 'Customer not found' });
        }

        const item = await ShopItem.findOne({ itemId })    
        if (!item) {
            return res.status(422).json({ message: 'Item not found' })
        }
        if (item.quantity === 0) {
            return res.status(422).json({ message: 'Item is unavailable' })
        }
        if (item.quantity < quantity) {
            return res.status(422).json({ message: 'Insufficient amount in store' })
        }

        await ShopItem.findByIdAndUpdate(itemId, { $inc: { count: -quantity } }, { new: true } )

        customer.cart.shopItems.push({itemId, quantity})
        await customer.save()

        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (err) {
        res.status(422).json({ message: 'Error adding an item', error: err.message });
    }
}

const checkout = async (req, res) => {
    const customerId = req.params.customerId;

    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(422).json({ message: 'Customer not found' });
        }

        let total = 0;
        for (const item of customer.cart.shopItems) {
            const { itemId, quantity } = item;

            const shopItem = await ShopItem.findById(itemId);
            if (!shopItem) {
                return res.status(422).json({ message: 'Item not found' });
            }

            if (shopItem.availableCount < quantity) {
                return res.status(422).json({ message: 'Insufficient available count for item: ' + shopItem.title });
            }

            shopItem.availableCount -= quantity;
            await shopItem.save(); 

            total += shopItem.price * quantity;
        }

        const order = {
            items: customer.cart.shopItems,
            total: total
        };

        customer.cart.shopItems = [];
        await customer.save();

        res.status(200).json({ message: 'Order created successfully', order });
    } catch (err) {
        res.status(422).json({ message: 'Error creating order', error: err.message });
    }
};

const getSingleItem = async (req, res) => {
    const { id } = req.params
    try {
        const shopItem = await ShopItem.findById(id)
        if (!shopItem) {
            return res.status(422).json({ message: 'Item not found' })
        }
        res.status(200).json(shopItem)
    } catch (err) {
        res.status(422).json({ message: 'Error finding the item', error: err.message });
    }
}


module.exports = { getAllCustomers, addCustomer, filterShopItems, searchShopItems, getCart, addToCart, checkout, getSingleItem }