const { MongoClient, ObjectId,ServerApiVersion  } = require('mongodb');
const moment =  require('moment');
const ccxt = require ('ccxt')
const connectionUrl = "mongodb+srv://chinhtruc1907:S4ayEaNuBNpYZNam@cluster0.hmaj5dt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'cryto';

const exchange = new ccxt.binance()
let db;
async function writeOther(collection) {
     setInterval(async function () { 
let data = await exchange.fetchOrderBook("BTC/USDT")
        data['timestamp'] = moment().utc().format()
        data['datetime'] = moment().utc().valueOf();
    collection.insertOne(data)

    },1000*60*10)
    
   
}
const init = async () => {
    try {
        const client = await MongoClient.connect(connectionUrl,{
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          } );
        db = client.db(dbName);
        let collection = db.collection('Bid_Ask');
        writeOther(collection)
        console.log("Connected successfully to server");
    } catch (error) {
        console.error("Error connecting to server:", error);
    }
};



const getBidAsk = async (item) => {
    try {
      const collection = await db.collection('Bid_Ask');
      const items = await collection.find({createdAt:{$gte:Number(item.start),$lt: Number(item.end)}}).toArray()
      return items
  } catch (error) {
      console.error("Error retrieving items:", error);
      throw error;
  }
};



module.exports = { init,getBidAsk };
