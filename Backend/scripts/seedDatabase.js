import mongoose from 'mongoose';
import { Item } from '../models/itemModel.js'; // Correct the path and ensure .js is included

async function insertData() {
    await mongoose.connect('mongodb://localhost:27017/oldDatabaseName', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Sample data to insert
    const newItem = new Item({
        name: "Tharun Raman",
        email: "tharunraman10@gmail.com",
        phoneno: "1234567890",
        title: "Lost Wallet",
        description: "Black leather wallet containing important cards.",
        image: "https://github.com/tharun977/Lost-And-Found/blob/main/assets/281540423-7b68e817-1a62-4dfb-835f-6008379f752d.png",
    });

    await newItem.save();
    console.log("New item saved.");
    await mongoose.disconnect();
}

insertData().catch(console.error);
