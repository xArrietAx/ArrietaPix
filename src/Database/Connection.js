import mongoose from "mongoose";

(async function Connection() {
  await mongoose
    .connect(process.env.MongoDB_URL)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch(err => {
      console.log("Error connecting to MongoDB!", err);
    });
})();