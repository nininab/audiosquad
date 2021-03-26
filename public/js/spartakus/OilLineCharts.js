function getDatasetsOilLine(DataTable, name) {
    
    var datasets = [];
    var colors = [];
    var allval = [];
    var i;
    var col;
    var colorpalet = [
        "26,179,148", //Green
        "35,198,200", //Blue
        "250,224,60", //Yellow
        "248,172,89", //Orange
        "237,85,101" //red
    ];
    if (name) {
        for (i = 0; i < colorpalet.length; i++) {
            colors.push({
                backgroundColor: 'rgba(' + colorpalet[i] + ',0.4)',
                borderColor: 'rgba(' + colorpalet[i] + ',1)',
                pointBorderColor: 'rgba(' + colorpalet[i] + ',1)',
                pointHoverBackgroundColor: 'rgba(' + colorpalet[i] + ',1)',
            });
        }
        for (i = 0; i < name.length; i++) {
            
            DataTable.columns().header().each(function(value, index, api) {
                if ($(value).hasClass(name[i].toUpperCase())) {
                    col = DataTable.column($(value)).index();
                }
            });
            var val = DataTable.column(col).data();
            if (name[i] == "PC_R2") {
                name[i] = "ISO > 4";
            }
            if (name[i] == "PC_R5") {
                name[i] = "ISO > 6";
            }
            if (name[i] == "PC_R15") {
                name[i] = "ISO > 14";
            }
            for (v=0; v<val.length; v++) {
                if (val[v].includes("&lt;")) {
                    val[v]= 0;
                }
                
            }

            val.reverse();
            datasets.push(
            {
            label: name[i],
            fill: false,
            lineTension: 0.1,
            backgroundColor: colors[i].backgroundColor,
            borderColor: colors[i].borderColor,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: colors[i].pointBorderColor,
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: colors[i].pointHoverBackgroundColor,
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: val
            });
        }
    }
    return datasets;
}
function get_scales(DataTable, listtotrend) {
    var datasets = getDatasetsOilLine(DataTable, listtotrend);
    var max = 0;
    var min = 0;
    var allval = [];
    var vals = datasets.map(function(value,index) { return value['data']; });
    for (id in vals) {
        for (i = 0; i < vals[id].length; i++) {
        val = parseFloat(vals[id][i]);
        if (allval.indexOf(val) == -1 && !isNaN(parseInt(val, 10))) {
            allval.push(val);
        }
        }
    }
    for (i = 0; i < allval.length; i++) {
        if (allval[i] > max) {
            max = allval[i] + 0.1 * allval[i];
        }
        if (allval[i] < min) {
            min = allval[i] - 0.1 * allval[i];
        }
    }
    var stepsize = (max-min)/5;
    var scales =
    {
        yAxes: [{
            id: 'y-axis-1',
            type: 'linear',
            position: 'left',
            ticks: {
                min: min,
                max: max,
                stepSize:stepsize
            }
        }]
    };
    return scales;
}
function update_scales(datasets) {
    if (datasets.length > 0 ) {
        for (i=0;i<datasets.length;i++) {
            if (datasets[i].label == "PC_R2") {
                datasets[i].label = "ISO > 4";
            }
            if (datasets[i].label == "PC_R5") {
                datasets[i].label = "ISO > 6";
            }
            if (datasets[i].label == "PC_R15") {
                datasets[i].label = "ISO > 14";
            }
        }
    }
    
  var max = 0;
  var min = 0;
  var allval = [];
  var scales =[]
  var vals = datasets.map(function(value,index) { return value['data']; });
  for (id in vals) {
    for (i = 0; i < vals[id].length; i++) {
      val = parseFloat(vals[id][i]);
      if (allval.indexOf(val) == -1) {
        allval.push(val);
      }
    }
  }
  for (i = 0; i < allval.length; i++) {
    if (allval[i] > max) {
      max = allval[i] + 0.1 * allval[i];
    }
    if (allval[i] < min) {
      min = allval[i] - 0.1 * allval[i];
    }
  }
  var stepsize = (max-min)/5;
  scales['min'] = min;
  scales['max'] = max;
  scales['stepsize'] = stepsize;
  return scales;
}
function drawLineChart(DataTable, listtotrend, charts, chartName) {
    var ctx = document.getElementById(chartName);
    charts[chartName] = new Chart(ctx, {
        type: 'line',
        data: data = {
            labels: DataTable.column(0).data().toArray().reverse(),
            datasets: getDatasetsOilLine(DataTable, listtotrend)      
        },
        options: {
            responsive:true,
            scales: get_scales(DataTable, listtotrend),
            legend: {
            display: true,
            labels: {
                fontColor: 'rgb(100,100,100)',
                fontSize: 12
            }
            }
        }
    });
    
    scales = update_scales(charts[chartName].data.datasets);
}
function updatelineChart(DataTable, listtotrend, charts, chartName) {
    charts[chartName].data.datasets = getDatasetsOilLine(DataTable, listtotrend);

    scales = update_scales(charts[chartName].data.datasets);
    charts[chartName].options.scales.yAxes["0"].ticks.max = scales['max'];
    charts[chartName].options.scales.yAxes["0"].ticks.min = scales['min'];
    charts[chartName].options.scales.yAxes["0"].ticks.stepSize = scales['stepsize'];
    charts[chartName].update();
  
}

