const axios = require("axios").default;



let date = new Date("2021-02-26");

let toDate = new Date(date);
toDate.setDate(toDate.getDate() + 7);



date = date.toLocaleDateString('en-CA')
toDate = toDate.toLocaleDateString('en-CA')



return new Promise((resolve, reject) => {
    // Make a request for a user with a given ID
    axios
      .get(
        `https://www.hebcal.com/converter?cfg=json&start=${date}&end=${toDate}&g2h=1`
      )
      .then(async function (res) {
        const  {hdates } = res.data 
        const eventsArr = Object.entries(hdates)
        console.log(eventsArr);


        eventsArr.forEach((hd) => {
             console.log(hd[1].events);
            // console.log(hd[0]);
        });
        //  console.log(res.data.hdates);        
      });
  });






