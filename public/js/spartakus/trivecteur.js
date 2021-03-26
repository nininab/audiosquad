function getLabelsRadar(DataTable)
{
    var labels = [];
    DataTable.columns().header().each(function(value, index, api) {
        if ($(value).hasClass('wear_stat') || $(value).hasClass('cont_stat') || $(value).hasClass('chem_stat')) {
            labels.push($(value).text());
        }
    });
    return labels;
}
function getDatasetsRadar(DataTable, rowindex)
{
    
    var datasets = [];
    var data = [];
    var scalesteps = 20;
    var lim = {"levels":[
        {"mindata": 0, "maxdata": 0, "maxtrend": 20, "color": "26,179,148"},
        {"mindata": 1, "maxdata": 20, "maxtrend": 40, "color": "35,198,200"},
        {"mindata": 21, "maxdata": 40, "maxtrend": 60, "color": "250,224,60"},
        {"mindata": 41, "maxdata": 70, "maxtrend": 80, "color": "248,172,89"},
        {"mindata": 71, "maxdata": 100, "maxtrend": 100, "color": "237,85,101"}
    ]};
    
    var row = DataTable.row(rowindex).nodes()["0"].cells;
    $(row).each(function(){
        if ($(this).hasClass("wear_stat") || $(this).hasClass('cont_stat') || $(this).hasClass('chem_stat')) {
            data.push($(this).text());
        }
    });
    
    var index = 0;  
    var maxdata = Math.max.apply(null, data);
    
    var trenddata = [];
    var qtydatasets;
    var i;
    var j;
    for (i = 0; i < data.length; i++) {
        index = 0;
        //If value = -1
        if (parseInt(data[i]) <= 0) {
            switch (parseInt(data[i])) {
                case 0:
                trenddata.push(scalesteps);
                break;
            default:
                trenddata.push(0);
                break;
        }
        } else {
        for (j = 0; j < lim.levels.length; j++) {
            if (lim.levels[j].mindata <= maxdata && maxdata <= lim.levels[j].maxdata) {
            qtydatasets = index;
            }
            if (lim.levels[j].mindata <= parseInt(data[i]) && parseInt(data[i]) <= lim.levels[j].maxdata) {
            trenddata.push(lim.levels[j].maxtrend);
            break;
            }
            index++;
        }
        }
    }
    if (maxdata == 0) {
        qtydatasets = 1;
    }
    for (i = 0; i <= qtydatasets; i++) {
        var val = [];
        for (j = 0; j < 3; j++) {
        val.push(Math.min(lim.levels[i].maxtrend, trenddata[j]));
        }
        datasets.push({
            label: qtydatasets == i ? "Trivecteur" : '"Dataset-' + i +'"',
            borderColor: qtydatasets == i ? "rgba(0,0,0,1)" : "rgba(0,0,0,0)",
            backgroundColor: 'rgba(' + lim.levels[i].color + ',1)',
            borderWidth: 0,
            data: val,
            fill: '-1'
        });
    }
    
    return datasets;
}
function drawRadarChart(DataTable, rowindex)
{
    var trivector = document.getElementById("Trivector");
    myTrivectorChart = new Chart(trivector, {
        type: 'radar',
        data: data = {
            labels: getLabelsRadar(DataTable),
            datasets: getDatasetsRadar(DataTable, rowindex)
        },
        options: {
        responsive:true,
        elements: {
            point: {
                radius: 0
            }
        },
        plugins: {
            filler: {
                propagate: true
            }
        },
        scale: {
            ticks: {
                backdropColor : "rgba(255,255,255,0)",
                userCallback: function(value, index, values) {
                    return "";
                },
                beginAtZero: true,
                max: 120,
                min: 0,
                stepSize: 20,
            },
            pointLabels: {
                fontColor: 'rgb(103,106,108)',
                fontSize: 13
            }
        },
        legend: {
            display: false,
        },
        tooltips: {
            enabled: false
        }
        }
    });
}
function updateRadarChart(DataTable, rowindex) {
  myTrivectorChart.data.labels = getLabelsRadar(DataTable);
  myTrivectorChart.data.datasets = getDatasetsRadar(DataTable, rowindex);
  myTrivectorChart.update();
}