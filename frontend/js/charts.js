let labels1 = ['Chocolate', 'Vanilla', 'Strawberry', 'Lemon', 'Halvah'];
let data1 = [69, 31,100, 50, 20];
let colors1 = ['#343a40', '#FFFFFF', '#dc3545', '#ffc107', '#CFD4D8'];

let myDoughnutChart = document.getElementById("myChart").getContext('2d');

let chart1 = new Chart(myDoughnutChart, {
    type: 'pie',
    data: {
        labels: labels1,
        datasets: [ {
            data: data1,
            backgroundColor: colors1
        }]
    },
    options: {
        title: {
            text: "Total Flavors?",
            display: true
        }
    }
});
