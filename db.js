const { MongoClient, ObjectId } = require('mongodb');
const moment =  require('moment');

const connectionUrl = "mongodb://boygl34:dxGbsAFhKHwYHPcnM@SG-galaxycluster-38726.servers.mongodirector.com:27017,SG-galaxycluster-38727.servers.mongodirector.com:27017/dichvutvt-meteorapp-com?replicaSet=RS-galaxycluster-0&ssl=true";
const dbName = 'dichvutvt-meteorapp-com';

let db;

const init = async () => {
    try {
        const client = await MongoClient.connect(connectionUrl, { useNewUrlParser: true,sslValidate: false });
        db = client.db(dbName);
        console.log("Connected successfully to server");
    } catch (error) {
        console.error("Error connecting to server:", error);
    }
};

const getItems = async (item) => {
    try {
        const collection = db.collection('Xe_Trong_Xuong');
        const result = await collection.find({}).toArray();
        return result;
    } catch (error) {
        console.error("Error inserting item:", error);
        throw error;
    }
};

const updateItems = async (id,database) => {
    try {
        const collection = db.collection('Xe_Trong_Xuong');
        const  result = await collection.updateOne({ _id: ObjectId(id) }, { $set: { database } });
        return result;
    } catch (error) {
        console.error("Error retrieving items:", error);
        throw error;
    }
};
const getItemsGX = async (item) => {
    try {
      const collection = await db.collection('Giao_Xe');
      const items = await collection.find({createdAt:{$gte:Number(item.start),$lt: Number(item.end)}}).toArray()
      console.log("Retrieved items successfully:",items);
      return items
  } catch (error) {
      console.error("Error retrieving items:", error);
      throw error;
  }
};

const updateQuantity = async (id, quantity) => {
    try {
        const collection = db.collection('Xe_Trong_Xuong');
        const result = await collection.updateOne({ _id: ObjectId(id) }, { $inc: { quantity } });
        console.log("Updated quantity successfully:", result.modifiedCount);
        return result;
    } catch (error) {
        console.error("Error updating quantity:", error);
        throw error;
    }
};

module.exports = { init, getItems, updateItems,getItemsGX };
