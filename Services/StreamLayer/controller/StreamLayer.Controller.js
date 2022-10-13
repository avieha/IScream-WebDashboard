const db = require("../model/redis");

const reduceInventory = async (req, res) => {
  const { cityName = "אשדוד", taste = "Halvah", quantity = 6 } = req.body;
  try {
    await db.createRedisConnection();
    const value = await db.get(cityName);
    value[taste] -= quantity;
    db.set(cityName, JSON.stringify(value));
    res.status(200).send("approved");
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const addInventory = async (req, res) => {
  try {
    await db.createRedisConnection();
    const value = await db.get(cityName);
    value[taste] += quantity;
    db.set(cityName, JSON.stringify(value));
    res.status(200).send("approved");
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

module.exports = {
  reduceInventory,
  addInventory,
};