import MongoClient from "mongodb";

const DATABASE_NAME = "SportsShop";
console.log("Starting connection process...");

const database = {
  _dbClient: null,
  connect: async function (url) {
    const client = await MongoClient.connect(url, {
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successful connection to MongoDB");
    this._dbClient = client;
  },

  getConnection: function () {
    if (!this._dbClient) {
      console.log("You need to call .connect() first");
      process.exit(1);
    }
    return this._dbClient.db(DATABASE_NAME);
  },
};
export default database;
export { database };
