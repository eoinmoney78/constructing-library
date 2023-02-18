const { MongoClient, ObjectId } = require("mongodb");

class Library {
    constructor(dbUrl, dbName, collName) {
        this.dbUrl = dbUrl;
        this.dbName = dbName;
        this.collName = collName;
        this.dbClient;
    }

    async client() {
        console.log(`Connecting to ${this.dbUrl}...`)
        this.dbClient = await MongoClient.connect(this.dbUrl)
        console.log("Connected to database.");
        return this.dbClient;
    }

    async test() {
        const client = await this.client()
        client.close()
    }

    async collection() {
        const client = await this.client();
        const db = client.db(this.dbName);
        const collection = db.collection(this.collName);
        return collection;
    }



    async allBooks() {
        const collection = await this.collection();
        const cursor = await collection.find({});
        return cursor.toArray();
    }
    async findOneBook(id) {
        const docId = new ObjectId(id);
        const collection = await this.collection();
        return collection.findOne({ _id: docId });
    }
    async findManyBooks(query) {
        const collection = await this.collection();
        return collection.find(query);
    }
    async addBook(info) {
        const collection = await this.collection();
        const result = await collection.insertOne(info);
        console.log(`Book successfully added with _id: ${result.insertedId}`);
    }

    async changeBook(id, newInfo) {
        const mongoId = ObjectId(id);
        const infoObj = { $set: newInfo };
        const collection = await this.collection();
        await collection.updateOne({ _id: mongoId }, infoObj);
        console.log(`Book with ID ${id} was successfully updated.`);
    }

    async removeBook(id) {
        const mongoId = ObjectId(id);
        const collection = await this.collection();
        await collection.deleteOne({ _id: mongoId });
        console.log(`Book with ID ${id} successfully removed.`);
    }


}

module.exports = Library;
