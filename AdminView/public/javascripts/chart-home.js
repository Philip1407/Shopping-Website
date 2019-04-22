var ctx = document.getElementById("barChart").getContext('2d');
  var myChart = new Chart(ctx, { 
    type: 'bar',    
    options: {
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    color: '#eee'
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: '#eee'
                },
                ticks: {
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                    // OR //
                    beginAtZero: true   // minimum value will be 0.
                }
            }]
        },
    },
    data: {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
        datasets: [
            {
                label: "Doanh thu (triệu)",
                backgroundColor: [
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7'
                ],
                hoverBackgroundColor: [
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7'
                ],
                borderColor: [
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7',
                    '#44b2d7'
                ],
                borderWidth: 1,
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    }
});
