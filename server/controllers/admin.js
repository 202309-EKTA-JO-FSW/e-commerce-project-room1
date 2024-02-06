const Admin = require('../models/admin')
const ShopItem = require('../models/shop-item')

const addNewShopItem = async (req, res) => {
    const shopItem = req.body
    try {
        const newItem = await ShopItem.create(shopItem)
        res.status(201).json({message:'Item Added Successfully!', newItem})
    } catch (err) {
        res.status(422).json({ message: 'Error Adding Item', error: err.message})
    }
}

const deleteShopItem = async (req, res) => {
    const { id } = req.params
    try {
        await ShopItem.findByIdAndRemove(id)
        res.status(200).json({message: 'Item Deleted Successfully!'})
    } catch (err) {
        res.status(422).json({message: 'Error Deleting Item', error: err.message})
    }
}

const updateShopItem = async (req, res) => {
    const { id } = req.params
    const itemDetails = req.body
    try {
        const updateItem = await ShopItem.findByIdAndUpdate(id, itemDetails, {new: true} )
        res.status(200).json({message: 'Item Updated Successfully!', updateItem})
    } catch (err) {
        res.status(422).json({message: 'Error Updating Item', err: err.message})
    }
}

const searchShopItems = async (req, res) => {
   try {
    const search = req.query
    
    let query = {}
    if (search.title) {
        query.title = { $regex: new RegExp(search.title, 'i') }
    }
    if (search.description) {
        query.description = { $regex: new RegExp(search.description, 'i') }
    }
    if (search.genre) {
        query.genre = Array.isArray(searchParams.genre)
                ? { $in: searchParams.genre }
                : searchParams.genre;
        }
    const searchResults = await ShopItem.find(query)
    res.status(200).json({ message: 'Search Results', items: searchResults });
} catch (err) {
    res.status(422).json({ message: 'Error searching for items', error: err.message });
}
}

module.exports = { addNewShopItem, deleteShopItem, updateShopItem, searchShopItems }