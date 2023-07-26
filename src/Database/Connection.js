import mongoose from "mongoose";

class Connect {

  constructor() {
    this.connected = false;
    this.connection = null;
  }

  async connect() {
    if (!this.connected) {
      try {
        this.connection = await mongoose.connect(process.env.MongoDB_URL);
        this.connected = true;
        console.log("Connected to MongoDB!");
      } catch (err) {
        console.log("Error connecting to MongoDB!", err);
      }
    }
    return this.connection;
  }
}

const singletonConnection = new Connect();

(async function Connection() {
  await singletonConnection.connect();
})();