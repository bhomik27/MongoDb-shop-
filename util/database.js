const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;


const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://bhomikmaheshwari27:wuHG5nZmOGbzTT8E@sharpener.n7hayks.mongodb.net/?retryWrites=true&w=majority&appName=Sharpener')
    .then(client => {
      console.log("connected to MongoDB");
      _db = client.db();
      callback();
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No DB found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;