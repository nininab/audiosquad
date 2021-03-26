function doughnut_chart1(chart) { 
    new Chart(document.getElementById(chart.id),{
    type:"doughnut",
    data:{
      labels:["",""],
      datasets:[{
        label:"",
        borderColor: "#fff",
        borderWidth: 2,
        data:[chart.data,chart.left],
        backgroundColor:[chart.color,"#dedede"]
      }]
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel;
          }
        }
      },
      percentageInnerCutout: 75,
      animation: {
        duration: 1000,
        easing: "easeOutBounce",
        animateRotate: true,
        animateScale: false
      }
    }
  });
}
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
function drawResultChart(chart) {
new Chart(document.getElementById("lineChart"),{
    type:"line",
    data: chart = {
        
      labels: Object.values(chart.labels),
      datasets: [
        {label: "uptime",
        backgroundColor: chart.backgroundColor,
        borderColor: chart.borderColor,
        borderWidth: 3,
        fill: true,
        lineTension: 0.4,
        pointBackgroundColor: chart.pointBackgroundColor,
        pointborderColor: "#fff",
        pointborderWidth: 1,
        pointRadius: 3,
        pointHitRadius: 20,
        pointHoverBackgroundColor: "rgba(220,220,220,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        data: chart.data
        }
      ,{
        label: "maturity",
        backgroundColor: chart.background2,
        borderColor: chart.borderColor2,
        borderWidth: 3,
        fill: true,
        lineTension: 0.4,
        pointBackgroundColor: "#fff",
        pointborderColor: "#fff",
        pointborderWidth: 1,
        pointRadius: 3,
        pointHitRadius: 20,
        pointHoverBackgroundColor: chart.pointHoverBorderColor2,
        pointHoverBorderColor: "rgba(220,220,220,1)",
        data: chart.data2
      }]
    },
    options: {
      responsive:true,
      scales: {
        yAxes: [{
          id: 'y-axis-1',
          type: 'linear',
          position: 'left',
          ticks: {
            min: 0,
            max: 100,
            stepSize:20
          }
        }]
      },
      legend: {
        display: false,
      }
    }
  });
}
function create_modal_chart_config() {
  $('#modChart').on('shown.bs.modal',function(event) {
    var link = $(event.relatedTarget);
    var source = link.attr("data-source").split(",");
    var title = link.html();
    var table = link.parents("table");
    var labels = [];
  $('#'+table.attr('id')+'>thead>tr>th').each(function(index,value){
      if(index>0){labels.push($(value).html());}
    });
    var target = [];
    $.each(labels, function(index,value){
      target.push(link.attr("data-target-source"));
    });
    var modal = $(this);
    var canvas = modal.find(".modal-body canvas");
    modal.find(".modal-title").html(title);
    new Chart(canvas[0],{
      type:"line",
      data:{
        labels: labels,
        datasets: [{
          label: "",
          backgroundColor: "rgba(200,200,200,0.5)",
          borderColor: "rgba(200,200,200,0.7)",
          borderWidth: 3,
          fill: true,
          lineTension: 0.4,
          pointBackgroundColor: "rgba(200,200,200,1)",
          pointborderColor: "#fff",
          pointborderWidth: 1,
          pointRadius: 3,
          pointHitRadius: 20,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(200,200,200,1)",
          data: source
        }]
      },
      options: {
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        responsive:true,
        scales: {
          yAxes: [{
            id: "y-axis-1",
            type: "linear",
            position: "left",
            ticks: {
              min: 0,
              max: 100,
              stepSize:20
            }
          }]
        },
        legend: {
          display: false,
        }
      }
    });
  }).on("hidden.bs.modal",function(event){
    var modal = $(this);
    var canvas = modal.find(".modal-body canvas");
    canvas.attr("width","550px").attr("height","400px");
    $(this).data("bs.modal", null);
  });
}