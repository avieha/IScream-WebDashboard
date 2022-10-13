const mysql = require("mysql");
const mySqlConfig = require("../../config/mySql.config");
let connection;

const createSqlConnection = () => {
  return new Promise((resolve, reject) => {
    connection = mysql.createConnection(mySqlConfig);
    connection.connect((err) => {
      if (err) return reject(err);

      console.log("sql is connected");
      return resolve();
    });
  });
};

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) return reject({ error });
      return resolve(results);
    });
  });
};

const getCityById = (id) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT cityName FROM ice_scream_db.branches_info WHERE id = ${id};`;
    connection.query(query, (error, results, fields) => {
      if (error) return reject({ error });
      return resolve(results[0].cityName);
    });
  });
};

module.exports = { createSqlConnection, executeQuery, getCityById };
