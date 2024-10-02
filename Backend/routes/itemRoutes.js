// itemRoutes.js
import express from 'express';
import { Item } from '../models/itemModel.js'; // Adjust the import based on your structure

const router = express.Router();

// DELETE request to delete an item by ID
router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await Item.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE request to delete all items (Optional)
router.delete('/', async (req, res) => {
    try {
        await Item.deleteMany({});
        res.status(200).json({ message: 'All items deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
