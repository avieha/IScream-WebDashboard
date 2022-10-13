// const mongo = require("../model/mongo");
// const mysql = require("../model/mySql");
// const getWeather = require("../webServices/getWeather");
// const getHoliday = require("../webServices/getHoliday");
// const parseSeason = require("../utils/parseSeason");
//
// const insertPurchase = async (req, res) => {
//     let { cityName, taste, quantity, date } = req.body;
//     try {
//         // let cityInfo = await mysql.getCityByName(data.cityName);
//         let { cityType, toddlers, kids, adolescent, adults, middleAge, seniors } =
//             await mysql.getCityByName(cityName);
//         let obj = {
//             taste,
//             quantity,
//             day: new Date(date).getDate(),
//             month: new Date(date).getMonth() + 1,
//             year: new Date(date).getFullYear(),
//             cityName,
//             cityType,
//             toddlers,
//             kids,
//             adolescent,
//             adults,
//             middleAge,
//             seniors,
//             season: parseSeason(date),
//             holiday: await getHoliday(date),
//             weathe: await getWeather
//         };
//         return console.log(obj);
//         await mongo.insertPurchase(obj);
//         res.status(200).send("purchase inserted");
//     } catch (error) {
//         console.log(error);
//         res.status(400).send("purchase error");
//     }
// };
//
// const getAllPurchases = async (req, res) => {
//     try {
//         const data = await mongo.getAllPurchases();
//         res.status(200).send(data);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send("error fetching data");
//     }
// };
//
// const deleteAllPurchases = async (req, res) => {
//     try {
//         await mongo.deleteAllPurchases();
//         res.status(200).send("delete OK");
//     } catch (error) {
//         console.log(error);
//         res.status(400).send("error deleting");
//     }
// };
//
// module.exports = {
//     insertPurchase,
//     getAllPurchases,
//     deleteAllPurchases,
// };