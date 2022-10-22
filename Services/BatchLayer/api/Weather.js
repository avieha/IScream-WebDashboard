// const axios = require("axios").default;
// require('dotenv').config({ path: require('find-config')('.env') })
//
// // const getweather = (date) => {
// //     let fromDate = "2022-08-10" // new Date(date);
// //     let toDate = "2022-09-10" // new Date(date);
//     // toDate.setDate(toDate.getDate() - 7);
//
//     // fromDate = fromDate.toLocaleDateString("en-CA");
//     // toDate = toDate.toLocaleDateString("en-CA");
//     // let arr = [];
//     console.log("here")
//     return new Promise((resolve, reject) => {
//         let arr = [];
//         console.log("I'm here");
//         let fromDate = '2022-05-09' // new Date(date);
//         let toDate = '2022-09-10' // new Date(date);
//         let cityName = 'Ashdod';
//
//         axios.get(
//                 `https://api.weatherbit.io/v2.0/history/daily?city=${cityName}&country=IL
//                 &state=Israel&start_date=${fromDate}&end_date=${toDate}&key=${process.env.WEATHER_API_KEY}`
//             )
//             .then(async function (res) {
//                 const wdates = res.data.data[0].temp;
//                 if (wdates < 20) {
//                     console.log("cold")
//                 }
//                 else {
//                     console.log("hot")
//                 }
//                 console.log(wdates);
//                 return wdates;
//                 // const eventsArr = Object.entries(wdates);
//                 // eventsArr.forEach((wd) => {
//
//                     // return wd[1].events.forEach((event) => {
//                     //
//                     //     if(event.split(' ')[0] !=="Parashat"){
//                     //         return arr.push(event);
//                     //     }
//                     // })
//                 });
//
//
//             //     if(arr[0]) return resolve(true)
//             //     return resolve(false);
//             // })
//             // .catch((error) => {
//             //     console.log(error);
//             //     reject(error);
//             // });
//     });
// // };
//
// // module.exports = {
// //     getweather
// // };



module.exports = (date) => {
    let dateObj = new Date(date)
    let r = Math.floor(Math.random() * 100) + 1;

    switch(dateObj.getMonth()){

        case 11:
        case 0:
        case 1:
            if(r>=60)
                return "קר מאוד"
            else if(r<60 && r>=50)
                return "נעים"
            else
                return "קר"

        case 2:
        case 3:
        case 4:
            if(r>=70)
                return "חם"
            else if(r<70 && r>=50)
                return "קר"
            else
                return "נעים"
        case 5:
        case 6:
        case 7:
            if(r>=60)
                return "חם מאוד"
            else if(r<60 && r>=50)
                return "נעים"
            else
                return "חם"


        case 8:
        case 9:
        case 10:
            if(r>=70)
                return "קר"
            else if(r<70 && r>=50)
                return "חם"
            else
                return "נעים"


        default:
            break;
    }
}