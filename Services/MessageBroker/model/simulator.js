const rookout = require('rookout') // Plugging rookout to view real time logs
const mySql = require("../../BatchLayer/model/mySql");
const redis = require("../../StreamLayer/model/redis");


//for rookout
rookout.start({
  token: '784b2e2f966e134fa887d044d7d238c930d0e364a4ef5ea5108bb6f6abecc56f',labels:
      {env: 'dev'}})

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