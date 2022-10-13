const mySql = require("../../BatchLayer/model/mySql");
const redis = require("../../StreamLayer/model/redis");

const generatePurchase = async () => {
  let tastes, quantity, city;

  //MYSQL
  try {
    const randomCityId = Math.floor(Math.random() * 100);

    await mySql.createSqlConnection();
    city = await mySql.getCityById(randomCityId);
  } catch (error) {
    return console.error(`error with mysql: ${error}`);
  }

  //REDIS
  try {
    await redis.createRedisConnection();
    const cityInfo = await redis.get(city);
    tastes = Object.keys(cityInfo);
    quantity = Object.values(cityInfo);
  } catch (error) {
    return console.error(`error with redis: ${error}`);
  }

  const randomTaste = Math.floor(Math.random() * tastes.length);
  const randomQuantity = Math.floor(Math.random() * 10) + 1;

  if (quantity[randomTaste] >= randomQuantity) {
    
    console.log(
      `Purchase is OK - City: ${city} ${tastes[randomTaste]} with ${randomQuantity}KG`
    );
  } else {
    console.log(`Not enough quantity of ${tastes[randomTaste]} in ${city}`);
  }
};

module.exports = {
  generatePurchase,
};