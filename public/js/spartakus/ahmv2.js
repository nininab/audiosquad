function create_knob(){
    $(function($) {
      $(".knob").knob({
          draw : function () {
          if(this.$.data("skin") == "tron") {
            this.cursorExt = 0.3;
            var a = this.arc(this.cv)
            , pa
            , r = 1;
            this.g.lineWidth = this.lineWidth;
            if (this.o.displayPrevious) {
              pa = this.arc(this.v);
              this.g.beginPath();
              this.g.strokeStyle = this.pColor;
              this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
              this.g.stroke();
            };
            this.g.beginPath();
            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
            this.g.stroke();
            this.g.lineWidth = 2;
            this.g.beginPath();
            this.g.strokeStyle = this.o.fgColor;
            this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
            this.g.stroke();
            return false;
          }
        }
      });
    });
}
function drawLineChart(chart) {
    var ctx1 = document.getElementById("myChartline");
    myChartline = new Chart(ctx1, {
        type: 'line',
        data: chart = {
            labels: Object.values(chart.labels),
            datasets: [{
                label: chart.label,
                fill: true,
                lineTension: 0.4,
                backgroundColor: chart.backgroundColor,
                borderColor: chart.borderColor,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: chart.pointBorderColor,
                pointBackgroundColor: chart.pointBackgroundColor,
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: chart.pointHoverBackgroundColor,
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 20,
                yAxisID: 'A',
                data: chart.data
                }, {
                    label: chart.label2,
                    fill: true,
                    lineTension: 0.4,
                    backgroundColor: "rgba(58, 128, 182, 0.45)",
                    borderColor: "rgba(74, 146, 191, 1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(74, 146, 191, 1)",
                    pointBackgroundColor: "rgba(53, 146, 191, 1)",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(74, 146, 191, 1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 20,
                    yAxisID: 'B',
                    data: chart.data2
                }
                // , {
                //     label: "id for ajax redir",
                //     data: chart.data_id,
                //     backgroundColor: "rgba(255,255,255,0)",
                //     type: "line"
                // }, {
                //     label: "Non mesuré",
                //     data: chart.data_idNM,
                //     backgroundColor: "rgba(25,25,25,0.8)"
                    
                // }
            ]
        },
        options: {
            responsive:true,
            scales: {
                yAxes: [{
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        min: 0,
                        max:100,
                        stepSize:20
                    }
                },{
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    display:false,
                    ticks: {
                        min: 0,
                        max:chart.max,
                        stepSize:chart.step,
                        
                    }
                }]
                // , xAxes: [{
                //     barPercentage: chart.barpercent,
                //     ticks: {
                //         fontSize: 1
                //     }
                // }]
            },
            legend: {
                display: true,
                position:'bottom' ,
                labels: {
                    fontColor: 'rgb(100,100,100)',
                    fontSize: 12,
                    fullWidth: true
                }
            }
        }
    });
}
