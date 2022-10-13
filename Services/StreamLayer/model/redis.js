const redis = require("redis");
let publisher;

const createRedisConnection = () => {
  return new Promise((resolve, reject) => {
      if (publisher) return resolve();
      publisher = redis.createClient();
      publisher.connect();
      publisher.on("connect",  () => {
          console.log("redis is connected");
          return resolve();
      });
      publisher.on("error", () => {
          console.log("redis connection error");
          return reject()
      });
  });
};


const flushRedisDB = () => {
    publisher.flushAll();
}

const exist = (cityName) => {
    return publisher.exists(cityName);
}

const set = (cityName,value) => {
    return publisher.set(cityName,value)
}

const get = (cityName) => {
    // return publisher.get(cityName)
    return new Promise((resolve,reject) => {
        publisher.get(cityName).then((res) => {
            return resolve(JSON.parse(res))
        }).catch((err) => {
          return reject(err);
        })
    });
}

module.exports = {
  createRedisConnection,
  flushRedisDB,
  exist,
  set,
  get
};
