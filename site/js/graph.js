//Chart.defaults.global.legend.labels.usePointStyle = true;
new Chart(document.getElementById("myChart"), {
  type: 'line',
  data: {
    labels: ["0:00","1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
    datasets: [{ 
      data: [ 0, 5, 0, 5, 10, 15, 15, 25, 30, 50, 60, 65, 60,75, 70, 85, 80, 90, 100,60, 40, 20, 15, 10],
      label: "Monday",
      borderColor: "#3e95cd",
      fill: false
    }, { 
      data: [ 0, 0, 0, 5, 10, 15, 15, 25, 30, 50, 60, 65, 60,75, 70, 85, 80, 90, 100,60, 40, 20, 15, 10],
      label: "Tuesday",
      borderColor: "#8e5ea2",
      fill: false
    }, { 
      data: [ 5, 5, 0, 5, 10, 15, 15, 25, 30, 50, 60, 65, 60,75, 70, 85, 80, 90, 100,60, 40, 20, 15, 10],
      label: "Wednesday",
      borderColor: "#3cba9f",
      fill: false
    }, { 
      data: [ 5, 5, 0, 5, 10, 15, 15, 25, 30, 50, 60, 65, 60,75, 70, 85, 80, 90, 100,60, 40, 20, 15, 10],
      label: "Thursday",
      borderColor: "#e8c3b9",
      fill: false
    }, { 
      data: [ 5, 5, 0, 5, 10, 15, 15, 25, 30, 50, 60, 65, 60,75, 70, 85, 80, 90, 100,60, 40, 20, 15, 10],
      label: "Friday",
      borderColor: "violet",
      fill: false
    }, { 
      data: [ 0, 0, 0, 5, 5, 10, 15, 20, 25, 25, 35, 50, 45,40, 40, 40, 30, 25, 30,35, 25, 20, 10, 5],
      label: "Saturday",
      borderColor: "tomato",
      fill: false
    }, { 
      data: [ 0, 0, 0, 0, 5, 5, 10, 15, 20, 25, 30, 40, 30, 35, 30, 30, 25, 20, 20,20, 10, 15, 10, 5],
      label: "Sunday",
      borderColor: "#c45850",
      fill: false
    }
    ]
  },

  options: {
    title:{
      display:true,
      fontSize: 16,
      padding: 10,
      text: 'Percentage of fullness by hour'
    },
    legend: {
    	display: true,
    	position:'bottom',
    	padding:150,
      onHover: function(e) {
      	e.target.style.cursor = 'pointer';
      },
      labels:{
        boxWidth:12,
      //  usePointStyle: true
      },

    },
    scales:
    {
      xAxes: [{ scaleLabel:{ display: true, labelString: 'Hour of day'}}],
      yAxes: [{ scaleLabel:{ display: true, labelString: 'Percetage'}}]

    }

  }
});

