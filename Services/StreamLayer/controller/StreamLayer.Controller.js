const db = require("../model/redis");
const mySql = require("../../BatchLayer/model/mySql");

const reduceInventory = async (cityName, taste, quantity) => {
  return new Promise(async (resolve, reject) => {
    await db.get(cityName)
        .then(async (res) => {
          res[taste] -= +quantity;
          await db.set(cityName, JSON.stringify(res));
          console.log(res);
          console.log("Inventory updated");
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
  });
};

const addInventory = async (req, res) => {
  const { cityName , taste , quantity } = req.body;
  try {
    await db.createRedisConnection(); // check if we need to delete this line
    const value = await db.get(cityName);
    value[taste] += quantity;
    await db.set(cityName, JSON.stringify(value));
    res.status(200).send("approved");
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const getBranchInventory = async (req, res) => {
  let { cityName } = req.body;
  try {
    const value = await db.get(cityName);
    console.log(value);
    res.status(200).send(value);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const getAllInventory = async (req, res) => {
  let branches;
  let Chocolate = 0,Vanilla = 0,Strawberry = 0,Lemon = 0, Halvah = 0
  let sql = `SELECT cityName FROM ice_scream_db.branches_info;`;
  try {
    branches = await mySql.executeQuery(sql)
    for(const branch of branches){
      let element = await db.get(`${branch.cityName}`);
      Chocolate += element.Chocolate;
      Vanilla += element.Vanilla;
      Strawberry += element.Strawberry;
      Lemon += element.Lemon;
      Halvah += element.Halvah;
    }

    const obj = {
      totalChocolate: Chocolate,
      totalVanilla: Vanilla,
      totalStrawberry: Strawberry,
      totalLemon: Lemon,
      totalHalvah: Halvah,
    };
    res.status(200).send(obj);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

module.exports = {
  reduceInventory,
  addInventory,
  getBranchInventory,
  getAllInventory,
};