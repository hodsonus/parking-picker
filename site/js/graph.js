//Chart.defaults.global.legend.labels.usePointStyle = true;
var barchart = new Chart(document.getElementById("myChart"), {
  type: 'bar',
  data: {
        labels: ["12:00am", "1:00am", "2:00am", "3:00am", "4:00am", "5:00am"
                , "6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am"
                , "12:00am", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm"
                , "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm", "11:00pm"],
        datasets: [{
            label: 'Fullness',
            data: [],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderWidth: 1
        }]
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

