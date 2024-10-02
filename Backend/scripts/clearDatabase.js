import mongoose from 'mongoose';

async function clearDatabase() {
    await mongoose.connect('mongodb://localhost:27017/oldDatabaseName', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let collection of collections) {
        await mongoose.connection.db.dropCollection(collection.name);
    }

    console.log("All collections dropped.");
    await mongoose.disconnect();
}

clearDatabase().catch(console.error);
