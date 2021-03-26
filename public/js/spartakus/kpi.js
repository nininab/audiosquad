function top_panel(){
	$(document).ready(function(){
			if($("#global_vib").hide()){
					$("#activate_global_vib").on('click',function(){
							$("#global_vib").toggle();
					});
			}
			$("#select-area").chosen();
			$("#select-technology").chosen();
});
}
function csv_button(){
document.getElementById("exportcsv").onclick = function exportcsv() {
	const rows = [];
	var labels = "";
	var values = "";
	myChartbar.data.labels.forEach(function(item,index) {
	labels += "," + item;
	});
	rows.push(labels);

	myChartbar.data.datasets.forEach(function(item,index) {
			values = item.label + ",";
			values += item.data.join(",");
			rows.push(values);
	});
	let csvContent = "data:text/csv;charset=utf-8,";
	rows.forEach(function(row){
	csvContent += row + "\r\n"; // add carriage return
	});
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "export.csv");
	document.body.appendChild(link); // Required for FF

	link.click(); // This will download the data file named "my_data.csv".
	}
}
function test(globalhealth, pdmhealth, areaname){
var table = null;
		$(document).ready(function(){
			function initTable(data) {
				if (table) {
						table.destroy();
						$('#pdm_evolution').empty();
				}
				table = $('#pdm_evolution').DataTable({
										dom: '<"html5buttons"B>lTfgitp',
										buttons: [
											{extend: 'copy', text: 'copy'},
											{extend: 'excel', title: 'AssetHealth'},
											{extend: 'pdf', title: 'AssetHealth'}
										],
										"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, 'all']],
										"pageLength": 10,
					"data": get_table_dataset(data),
					"columns": get_table_column(data)
				});
			}
			area_t = areaname;
			$('#select-technology').chosen();
			$('#select-area').chosen();
			$(".chosen-container").css({"width": "auto"});
			$(".chosen-container").css({"min-width": "175px"});
			$('li.search-field input[type="text"]').css({"width": "auto"});
			function update_trend_title() {
				if ($('#select-area').val() == 'plant') {
					$('#linecharttitle').text('plant');
					$('#linechartsubtitle').text('');
				} else {
					$('#linecharttitle').text('area_evo');
					selected_area = $("#select-area option:selected").text();
					$('#linechartsubtitle').text(selected_area);
				}

			}
			initTable(table_data(globalhealth));
			drawLineChart(filter_global_parameter(globalhealth));
			drawBarChart(filter_pdm_parameter(pdmhealth));
			$('#select-technology').on('change', function() {
				initTable(table_data(globalhealth));
				updateLineChart(filter_global_parameter(globalhealth));
				updateBarChart(filter_pdm_parameter(pdmhealth));
				// console.log(globalhealth);
			});

			document.getElementById("exportcsv").onclick = function exportcsv() {
				const rows = [];
				var labels = "";
				var values = "";
				myChartbar.data.labels.forEach(function(item,index) {
					labels += "," + item;
				});
				rows.push(labels);

				myChartbar.data.datasets.forEach(function(item,index) {
						values = item.label + ",";
						values += item.data.join(",");
						rows.push(values);
				});

				let csvContent = "data:text/csv;charset=utf-8,";
				rows.forEach(function(row){
					csvContent += row + "\r\n"; // add carriage return
				});
				var encodedUri = encodeURI(csvContent);
				var link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "export.csv");
				document.body.appendChild(link); // Required for FF

				link.click(); // This will download the data file named "my_data.csv".
			}
			$('#select-area').on('change', function() {
				update_trend_title();
				initTable(table_data(globalhealth));
				updateLineChart(filter_global_parameter(globalhealth));
				updateBarChart(filter_pdm_parameter(pdmhealth));
			});
		});
}



/* <script>
      var table = null;
      $(document).ready(function(){
        function initTable(data) {
          if (table) {
              table.destroy();
              $('#pdm_evolution').empty();
          }
          table = $('#pdm_evolution').DataTable({
            <?php if ($_SESSION['lang']=="fr") { ?>
                      "language": {
                        "url": "/js/plugins/dataTables/datatables.french.lang"
                      },
            <?php } ?>
                      dom: '<"html5buttons"B>lTfgitp',
                      buttons: [
                        {extend: 'copy', text: <?php echo '"' . $lang['dt_copy'] . '"';?>},
                        {extend: 'excel', title: 'AssetHealth'},
                        {extend: 'pdf', title: 'AssetHealth'}
                      ],
                      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, <?php echo '"' . $lang['dt_all'] . '"';?>]],
                      "pageLength": 10,
            "data": get_table_dataset(data),
            "columns": get_table_column(data)
          });
        }
        area_t = <?php echo '"' . $lang['area'] . '"'; ?>;
        $('#select-technology').chosen();
        $('#select-area').chosen();
        $(".chosen-container").css({"width": "auto"});
        $(".chosen-container").css({"min-width": "175px"});
        $('li.search-field input[type="text"]').css({"width": "auto"});
        function update_trend_title() {
          if ($('#select-area').val() == 'plant') {
            $('#linecharttitle').text(<?php echo '"'.$translate['plant_evol'].'"'; ?>);
            $('#linechartsubtitle').text('');
          } else {
            $('#linecharttitle').text(<?php echo '"'.$translate['area_evol'] .'"'; ?>);
            selected_area = $("#select-area option:selected").text();
            $('#linechartsubtitle').text(selected_area);
          }

        }
        initTable(table_data(globalhealth));
        drawLineChart(filter_global_parameter(globalhealth));
        drawBarChart(filter_pdm_parameter(pdmhealth));
        $('#select-technology').on('change', function() {
          initTable(table_data(globalhealth));
          updateLineChart(filter_global_parameter(globalhealth));
          updateBarChart(filter_pdm_parameter(pdmhealth));
        });

        document.getElementById("exportcsv").onclick = function exportcsv() {
          const rows = [];
          var labels = "";
          var values = "";
          myChartbar.data.labels.forEach(function(item,index) {
            labels += "," + item;
          });
          rows.push(labels);

          myChartbar.data.datasets.forEach(function(item,index) {
              values = item.label + ",";
              values += item.data.join(",");
              rows.push(values);
          });

          let csvContent = "data:text/csv;charset=utf-8,";
          rows.forEach(function(row){
            csvContent += row + "\r\n"; // add carriage return
          });
          var encodedUri = encodeURI(csvContent);
          var link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "export.csv");
          document.body.appendChild(link); // Required for FF

          link.click(); // This will download the data file named "my_data.csv".
        }
        $('#select-area').on('change', function() {
          update_trend_title();
          initTable(table_data(globalhealth));
          updateLineChart(filter_global_parameter(globalhealth));
          updateBarChart(filter_pdm_parameter(pdmhealth));
        });
      });
    </script>


	<!--YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN-->
  <!--YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN-->
  <!--YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN YOANN-->
  <?php if (($_SESSION['client']['id']==25 OR $_SESSION['client']['id']==14) && $_SESSION['dbname'] == 'laurentide') { ?>
	  <script>
	$(document).ready(function(){
		$("#activate_global_vib").click(function(){
			$("#global_vib").toggle();
		});
	});
	</script>



	<script>

	var ctx1 = document.getElementById("myChartline_global_vib");
	var myChartline_global_vib = new Chart(ctx1, {
		type: 'line',
		data: {
		labels: [ <?php echo '"' . implode('","', array_column($glob_vib_months, 'short_result_date')) . '"'; ?>],
    datasets: [
      <?php foreach ($glob_vib_trend as $area => $value) {
		$color_trend=rand(1, 254).','.rand(1, 254).','.rand(1, 254);
	  ?>
        {
        label: "<?php echo $area;?>",
        fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(<?php echo $color_trend;?>,0.4)",
				borderColor: "rgba(<?php echo $color_trend;?>,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(<?php echo $color_trend;?>,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(<?php echo $color_trend;?>,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
        data: [ <?php echo implode(',',array_values($value)); ?> ]
      }, <?php } ?>
        {
        label: "<?php echo $translate['total_plant'];?>",
        fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(175,192,192,0.4)",
				borderColor: "rgba(175,192,192,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(175,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(175,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
        data: [<?php echo implode(',',array_values($glob_vib_trend['total_plant'])); ?> ]
        }]
	},
	options: {
		responsive:true,
		scale: {
			ticks: {
				beginAtZero: true,
				max: 100,
				min: 0,
				stepSize: 25
			}
		},
		legend: {
			display: true,
			labels: {
				fontColor: 'rgb(100,100,100)',
				fontSize: 12
			}
		},
		title: {
				display: true,
				text: '<?php echo $translate['global_title'];?>'
			}
    }
	});
	</script>
	<?php } ?>


	<script>
        $(document).ready(function(){
			$('#dataTables-complete').DataTable({
        <?php if ($_SESSION['lang']=="fr") { ?>
                  "language": {
                    "url": "/js/plugins/dataTables/datatables.french.lang"
                  },
        <?php } ?>
                  dom: '<"html5buttons"B>lTfgitp',
                  buttons: [
                    {extend: 'copy', text: <?php echo '"' . $lang['dt_copy'] . '"';?>},
                    {extend: 'excel', title: 'CompletedAlarms'},
                    {extend: 'pdf', title: 'CompletedAlarms'}
                  ],
                  "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, <?php echo '"' . $lang['dt_all'] . '"';?>]],
                  "pageLength": 10
        });
        $('#table_global_vib').DataTable({
          <?php if ($_SESSION['lang']=="fr") { ?>
                    "language": {
                      "url": "/js/plugins/dataTables/datatables.french.lang"
                    },
          <?php } ?>
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                      {extend: 'copy', text: <?php echo '"' . $lang['dt_copy'] . '"';?>},
                      {extend: 'excel', title: 'GlobalVib'},
                      {extend: 'pdf', title: 'GlobalVib'}
                    ],
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, <?php echo '"' . $lang['dt_all'] . '"';?>]],
                    "pageLength": 10
              });
          });
    </script>

	<!-- ChartJS-->
    <script src="../../js/plugins/chartJs/Chartv2.min.js"></script>
    <?php foreach ($umonths as $month) {
            foreach ($tech as $pdm) {
              if (!isset($savings[$pdm][$month])) {
                $savings[$pdm][$month] = 0;
              }
            }
          }?>
	<script>
	var ctx2 = document.getElementById("myChartbar_savings");
	var myChartbar = new Chart(ctx2, {
		type: 'bar',
		data: {
		labels: [<?php echo '"'.implode('","', $umonths).'"'; ?>],
			datasets: [
      <?php for($i=0;$i<count($tech);$i++) { ?>
        {
  			  type: 'bar',
  			  label: '<?php echo $lang[get_full_tech_name($tech[$i])];?>',
  			  backgroundColor: "<?php echo get_tech_color($tech[$i]);?>",
  			  data: [<?php echo implode(',',array_values($savings[$tech[$i]])); ?>]
			  } <?php if ($i!==count($tech)) { echo ',';}
      } ?>
      ]
		  },
		  options: {
			scales: {
			  xAxes: [{
				stacked: true,
				ticks: {
				  beginAtZero: true
				}
			  }],
			  yAxes: [{
				stacked: true,
				ticks: {
				  beginAtZero: true
				}
			  }]
			}
		  }
		});
	</script>
	<!--BAD ACTORS FAILURE CODES-->
	<!--BAD ACTORS FAILURE CODES-->
	<!--BAD ACTORS FAILURE CODES-->
	<!--BAD ACTORS FAILURE CODES-->
	<script>
	new Chart(document.getElementById("bar-chart-horizontal"), {
		type: 'horizontalBar',
		data: {
		  labels: [<?php echo '"' . implode('","', array_keys($failure['total'])) . '"';?>],
		  datasets: [
			{
			  label: "Occurences",
			  backgroundColor: "rgba(28,120,192,0.7)",
			  data: [<?php echo '"' . implode('","', array_values($failure['total'])) . '"';?>]
			}
		  ]
		},
		options: {
		  legend: { display: false },
		  title: {
			display: true,
			text: '<?php echo $translate['select_tech'];?>'
		  }
		}
	});
	</script>
	<script>
  <?php foreach($tech as $pdm) {
    if (isset($failure[$pdm])) { ?>
	new Chart(document.getElementById("bar-chart-horizontal_<?php echo $pdm;?>"), {
		type: 'horizontalBar',
		data: {
		  labels: [<?php echo '"' . implode('","', array_keys($failure[$pdm])) . '"';?>],
		  datasets: [
			{
			  label: "Occurences",
			  backgroundColor: "rgba(28,120,192,0.7)",
			  data: [<?php echo '"' . implode('","', array_values($failure[$pdm])) . '"';?>]
			}
		  ]
		},
		options: {
		  legend: { display: false },
		  title: {
			display: true,
			text: '<?php echo $lang[get_full_tech_name($pdm)];?>'
		  }
		}
	});
  <?php }
  } ?>


	//bad actors
	new Chart(document.getElementById("bar-chart-badactors"), {
		type: 'bar',
		data: {
		  labels: [<?php echo '"' . implode('","', array_keys($badasset)) . '"';?>],
		  datasets: [{
			  label: "Occurences",
			  backgroundColor: "rgba(28,120,192,0.7)",
			  data: [<?php echo '"' . implode('","', array_values($badasset)) . '"';?>]
			}]
		},
		options: {
		  legend: { display: false },
		  title: {
			display: true,
			text: '<?php echo $translate['bad_actors_title_graph_vertical']; ?>'
		  },
		  scales: {
                yAxes: [{
					display: true,
					ticks: {
						beginAtZero: true,
					}
				}]
            }
		}
	});

  new Chart(document.getElementById("bar-chart-opened_total"), {
		type: 'bar',
		data: {
		  labels: [<?php echo '"' . implode('","', array_column($open_alert, 'alert_date')) . '"';?>],
		  datasets: [
			{
			  label:"Occurences",
			backgroundColor: "rgba(248,172,89,0.6)",
			  data: [<?php echo '"' . implode('","', array_column($open_alert, 'total')) . '"';?>]
			}
		  ]
		},
		options: {
		  legend: { display: false },
		  title: {
			display: true,
			text: '<?php echo $translate['total_opened_graph']; ?>'
		  },
		  scales: {
                yAxes: [{
					display: true,
					ticks: {
						beginAtZero: true,
					}
				}]
            }
		}
	});
  //completion time
	new Chart(document.getElementById("bar-chart-completion_time"), {
		type: 'line',
		data: {
		  labels: [<?php echo '"' . implode('","', array_keys($completion_time)) . '"';?>],
		  datasets: [
			{
			  label: "<?php echo $translate['mean_time_complete_label']; ?>",
			  fill: true,
			lineTension: 0.2,
			backgroundColor: "rgba(75,192,192,0.4)",
			borderColor: "rgba(75,192,192,1)",
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "rgba(75,192,192,1)",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 5,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(75,192,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			  data: [<?php echo '"' . implode('","', array_values($completion_time)) . '"';?>]
			}
		  ]
		},
		options: {
		  legend: { display: false },
		  title: {
			display: true,
			text: '<?php echo $translate['mean_time_complete_graph']; ?>'
		  },
		  scales: {
                yAxes: [{
					display: true,
					ticks: {
						beginAtZero: true,
					}
				}]
            }
		}
	});
  //completion total
  new Chart(document.getElementById("bar-chart-completion_total"), {
    type: 'bar',
    data: {
      labels: [<?php echo '"' . implode('","', array_keys($completion_total)) . '"';?>],
      datasets: [
      {
        label:"Occurences",
      backgroundColor: "rgba(75,192,192,0.8)",
        data: [<?php echo '"' . implode('","', array_values($completion_total)) . '"';?>]
      }
      ]
    },
    options: {
      legend: { display: false },
      title: {
      display: true,
      text: '<?php echo $translate['total_complete_graph']; ?>'
      },
      scales: {
                yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
          }
        }]
            }
    }
  });
	</script>

	<script>
	$(document).ready(function(){
		$("#bad_actors_all_techno").click(function(){
			$("#bar-chart-horizontal").toggle();
			$("#bad_actors_all_techno").toggleClass("btn-primary btn-default");
		});
		$("#bad_actors_vib").click(function(){
			$("#bar-chart-horizontal_vib").toggle();
			$("#bad_actors_vib").toggleClass("btn-default btn-primary");
		});
		$("#bad_actors_oil").click(function(){
			$("#bar-chart-horizontal_oil").toggle();
			$("#bad_actors_oil").toggleClass("btn-default btn-primary");
		});
		$("#bad_actors_thermo").click(function(){
			$("#bar-chart-horizontal_thermo").toggle();
			$("#bad_actors_thermo").toggleClass("btn-default btn-primary");
		});
		$("#bad_actors_us").click(function(){
			$("#bar-chart-horizontal_us").toggle();
			$("#bad_actors_us").toggleClass("btn-default btn-primary");
		});
	}); */