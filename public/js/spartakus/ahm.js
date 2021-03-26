function generateDataSetsFromTableforLine(chart) {
    var datasets = [];
    var values = [];
    for (date in chart) {
      values.push(date);
    }
      datasets.push(
      {
        label: chart.label,
        labels: chart.labels,
        fill: true,
        lineTension: 0.4,
        backgroundColor: chart.backgroundColor,
        borderColor: chart.borderColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderWidth: 3,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: chart.pointBorderColor,
        pointBackgroundColor: chart.pointBackgroundColor,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: chart.pointHoverBorderColor,
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 20,
        data: chart.data
      });
    return datasets;
  }
  function drawResultChart(chart) {
    var canvas = document.getElementById(chart.id);
    var lrc = canvas.getContext("2d");
    lineResultChart = new Chart(lrc, {
      type: 'line',
      data: chart = {
       labels: Object.values(chart.labels),
       datasets: generateDataSetsFromTableforLine(chart)
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
              max:100,
              stepSize:20
            }
          }]
        },
        legend: {
          display: false,
          labels: {
            fontColor: 'rgb(100,100,100)',
            fontSize: 12
          }
        }
      }
    });
  }
  
  function updateLineChart(chart) {
    lineResultChart.chart.labels = Object.keys(labels);
    lineResultChart.chart.datasets = generateDataSetsFromTableforLine(chart);
    lineResultChart.update();
  }
  function doughnut_chart(chart) { 
    new Chart(document.getElementById("doughnutResultChart"),{
    type:"doughnut",
    data:{
      labels:["",""],
      datasets:[{
        label:"",
        borderColor: "#fff",
        borderWidth: 2,
        data:[chart.data,chart.left],
        backgroundColor:[chart.backgroundColor,"#dedede"]
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
function send_comment(str) {
    event.preventDefault();
    if (str == "") {
        document.getElementById("comments_list").innerHTML = "";
        return;
    } else { 
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("comments_list").innerHTML = this.responseText;
            }
        };
  
        params = "comment=" + document.querySelector("#comment").value
        
        xmlhttp.open("POST","controls/add_comment_ajax.php?result="+str,true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(params)
    }
  }
  $(function() {
    $("#event_selector").change(function(){
        $(".events_selection").hide();
        $("#" + $(this).val()).show();
        });
    });
    function in_progress_(str, res) {
        event.preventDefault();
        if (str == "") {
            document.getElementById("comments_alerts_list").innerHTML = "";
            return;
        } else { 
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("comments_alerts_list").innerHTML = this.responseText;
                    document.getElementById("notif_in_progress_" + res).style.display = "initial";
                    document.getElementById("actions_options").style.display = "none";
                    document.getElementById("in_prog_success").style.display = "initial";
                    document.getElementsByClassName("acknowledged").style.display = "none";
                }
            };
        
            params = "action_taken=" + document.querySelector("#action_taken").value
            
            xmlhttp.open("POST","controls/inprogress_action_ajax.php?"+str,true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send(params)
        }
    }
function selectbtn(){
$(document).ready(function(){
    if ($('#selection1').val() < "1" || $('#selection2').val() < "1" || $('#selection3').val() < "1") {
      $('#alert').hide();
      $('#btn_choix_alt').show();
    } else {
      $('#alert').hide();
      $('#btn_choix_alt').hide();
    }
    var pdm_status_val = $('#selection').val();
    if(pdm_status_val == 0){
      $('#alert').hide();
      $('#btn_choix_alt').hide();
    }
    if(pdm_status_val == 1){
      $('#alert').hide();
      $('#btn_choix_alt').show();
    }
    if(pdm_status_val > 1){
      $('#alert').show();
      $('#btn_choix_alt').hide();
    }
    var pdm_status = {0: ' 100 %', 1: ' 95 % ', 2: ' 75 % ', 3: ' 50 % ', 4: ' 25 % '};
    var pdm_color = {0: 'primary', 1: 'info', 2: 'newcolor', 3: 'warning', 4: 'danger'};
    $('#selection').on('change', function() {
      $('#pdm_result_perc').text(pdm_status[$('#selection').val()]);
      $('#pdm_badge').switchClass('btn-' + pdm_color[pdm_status_val], 'btn-' + pdm_color[$('#selection').val()], 400, "easeInOutQuad" );
      pdm_status_val = $('#selection').val();
          if ($(this).val() > "0") {
                $('#warning').show();
            } else {
                $('#warning').hide();
            }
            
              if(pdm_status_val > 1){
                $('#alert').show();
                $('#btn_choix_alt').hide();
              }
              if(pdm_status_val == 1){
                $('#alert').hide();
                $('#btn_choix_alt').show();
              }
              if(pdm_status_val == 0){
                $('#alert').hide();
                $('#btn_choix_alt').hide();
              }
          
    });
    $('#selection1').on('change', function() {
      if ($('#selection1').val() < "1" || $('#selection2').val() < "1" || $('#selection3').val() < "1") {
        $('#btn_choix_alt').show();
      } else {
        $('#btn_choix_alt').hide();
        $('#alert').hide();
      }
    });
    $('#selection2').on('change', function() {
      if ($('#selection1').val() < "1" || $('#selection2').val() < "1" || $('#selection3').val() < "1") {
        $('#btn_choix_alt').show();
      } else {
        $('#btn_choix_alt').hide();
        $('#alert').hide();
      }
    });
    $('#selection3').on('change', function() {
      if ($('#selection1').val() < "1" || $('#selection2').val() < "1" || $('#selection3').val() < "1") {
        $('#btn_choix_alt').show();
      } else {
        $('#btn_choix_alt').hide();
        $('#alert').hide();
      }
    });
  });

  $( "#btn_choix_alt" ).on('click', function() {
    if($('#alert').is(":visible")){
      $('#alert').hide();
    }else{
      $('#alert').show();
    }
    
  });
}
function change_checkboxWithValue(){
    $(document).ready(function(){
		$("#failure_codes1").chosen({ 
            		width: "100%",
            		no_results_text: "Oops, nothing found!",
            		search_contains: true
            		}).change(function(){
			$("#observations1 label").hide()
   			$(".observations1_"+$(this).val()).show();

        });
    });
    $(document).ready(function(){
		$("#failure_codes2").chosen({ 
            width: "100%",
            no_results_text: "Oops, nothing found!",
            search_contains: true
            }).change(function(){
			$("#observations2 label").hide()
   			$(".observations2_"+$(this).val()).show();

		});
	});
	$(document).ready(function(){
		$("#failure_codes3").chosen({ 
            width: "100%",
            no_results_text: "Oops, nothing found!",
            search_contains: true
            }).change(function(){
			$("#observations3 label").hide()
   			$(".observations3_"+$(this).val()).show();

		});
	});
	$(document).ready(function(){
		$("#failure_codes1").chosen({ 
            width: "100%",
            no_results_text: "Oops, nothing found!",
            search_contains: true
            }).change(function(){
			$("#recommendations1 label").hide()
   			$(".recommendations1_"+$(this).val()).show();

		});
	});
	$(document).ready(function(){
		$("#failure_codes2").chosen({ 
            width: "100%",
            no_results_text: "Oops, nothing found!",
            search_contains: true
            }).change(function(){
			$("#recommendations2 label").hide()
   			$(".recommendations2_"+$(this).val()).show();

		});
	});
	$(document).ready(function(){
		$("#failure_codes3").chosen({ 
            width: "100%",
            no_results_text: "Oops, nothing found!",
            search_contains: true
            }).change(function(){
			$("#recommendations3 label").hide()
   			$(".recommendations3_"+$(this).val()).show();

		});
	});
}

function change_checkboxNoValue(){
  $(document).ready(function(){
  $("#obs1 label").hide();
  $("#obs2 label").hide();
  $("#obs3 label").hide();
  $("#failure_codes1").chosen({ 
              width: "100%",
              no_results_text: "Oops, nothing found!",
              search_contains: true
              }).change(function(){
    $("#obs1 label").hide()
       $(".obs1_"+$(this).val()).show();

      });
  });
  $(document).ready(function(){
  $("#failure_codes2").chosen({ 
          width: "100%",
          no_results_text: "Oops, nothing found!",
          search_contains: true
          }).change(function(){
    $("#obs2 label").hide()
       $(".obs2_"+$(this).val()).show();

  });
});
$(document).ready(function(){
  $("#failure_codes3").chosen({ 
          width: "100%",
          no_results_text: "Oops, nothing found!",
          search_contains: true
          }).change(function(){
    $("#obs3 label").hide()
       $(".obs3_"+$(this).val()).show();

  });
});
$(document).ready(function(){
  $("#rec1 label").hide();
  $("#rec2 label").hide();
  $("#rec3 label").hide();
  $("#failure_codes1").chosen({ 
          width: "100%",
          no_results_text: "Oops, nothing found!",
          search_contains: true
          }).change(function(){
    $("#rec1 label").hide()
       $(".rec1_"+$(this).val()).show();

  });
});
$(document).ready(function(){
  $("#failure_codes2").chosen({ 
          width: "100%",
          no_results_text: "Oops, nothing found!",
          search_contains: true
          }).change(function(){
    $("#rec2 label").hide()
       $(".rec2_"+$(this).val()).show();

  });
});
$(document).ready(function(){
  $("#failure_codes3").chosen({ 
          width: "100%",
          no_results_text: "Oops, nothing found!",
          search_contains: true
          }).change(function(){
    $("#rec3 label").hide()
       $(".rec3_"+$(this).val()).show();

  });
});
}
// function chosen_selector(){
//     var config = {
//         '.chosen-select'           : {},
//         '.chosen-select-deselect'  : {allow_single_deselect:true},
//         '.chosen-select-no-single' : {disable_search_threshold:10},
//         '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
//         '.chosen-select-width'     : {width:"95%"},
//         '.chosen-select-nosearch'  : {disable_search:true}
//         }
//     for (var selector in config) {
//         $(selector).chosen(config[selector]);
//     }
// }






// //SCRIPT ACKNOWLEDGE CHANGE
// echo '
// <script>
// $(document).ready(function(){
// $(".acknowledged").on("change", function postinput3(){
//     $.ajax({ 
//         url: "controls/edit_acknowledged_ajax.php?result='.$_GET['result'].'",
//         type: "get"
//     }).done(function(responseData) {
//         console.log("Done: ", responseData);
//         document.getElementsByClassName("checkbox acknowledged_'.$_GET['result'].'")[0].innerHTML = responseData;';
//         //pour éviter les erreurs de jquery, il faut un deuxième checkbox pour les résultats
//         if ($affich_data['action_status']=="open") {echo '
//         document.getElementsByClassName("checkbox acknowledged_'.$_GET['result'].'")[1].innerHTML = responseData;';} echo '
//         $("#acknowledged_check").show();
//     }).fail(function() {
//         console.log("Failed");
//         $("#acknowledged_no_check").show();
//     });
// });
// }); 
// </script>';

// //SCRIPT WO CHANGE
// echo '
// <script>
// $(document).ready(function(){
// $(".wo_number").on("change", function postinput(){
//     var wo_number = $(this).val(); // this.value
//     $.ajax({ 
//         url: "controls/edit_wo_ajax.php?alert='.$affich_data['id_alert'].'",
//         data: { wo_number: wo_number },
//         type: "post"
//     }).done(function(responseData) {
//         console.log("Done: ", responseData);
//         document.getElementsByClassName("wo_'.$_GET['result'].'")[0].innerHTML = responseData;';
//         //pour éviter les erreurs de jquery, il faut un deuxième checkbox pour les résultats
//         if ($affich_data['acknowledged']==0) {echo '
//         document.getElementsByClassName("wo_'.$_GET['result'].'")[1].innerHTML = responseData;';} echo '
//         $("#wo_number_check").show();
//     }).fail(function() {
//         console.log("Failed");
//         $("#wo_number_no_check").show();
//     });
// });
// }); 
// </script>';

// //SCRIPT COST CHANGE
// echo '
// <script>
// $(document).ready(function(){
// $(".cost").on("change", function postinput2(){
//     var cost = $(this).val(); // this.value
//     $.ajax({ 
//         url: "controls/edit_cost_ajax.php?alert='.$affich_data['id_alert'].'&result='.$_GET['result'].'&pdm='.$affich_data['pdm'].'&component='.$affich_data['id_component'].'",
//         data: { cost: cost },
//         type: "post"
//     }).done(function(responseData) {
//         console.log("Done: ", responseData);
//         $("#cost_check").show();
//     }).fail(function() {
//         console.log("Failed");
//         $("#cost_no_check").show();
//     });
// });
// }); 
// </script>';

// //SCRIPT SELECT ACTION
// echo '
// <script>
// $(function() {
// $("#event_selector").change(function(){
// $(".events_selection").hide();
// $("#" + $(this).val()).show();
// });
// });
// </script>';

// //IN PROGRESS
// echo '
// <script>
// function in_progress_(str) {
// event.preventDefault();
// if (str == "") {
//     document.getElementById("comments_alerts_list").innerHTML = "";
//     return;
// } else { 
//     if (window.XMLHttpRequest) {
//         // code for IE7+, Firefox, Chrome, Opera, Safari
//         xmlhttp = new XMLHttpRequest();
//     } else {
//         // code for IE6, IE5
//         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("comments_alerts_list").innerHTML = this.responseText;
//             document.getElementById("notif_in_progress_'.$_GET['result'].'").style.display = "initial";
//             document.getElementById("actions_options").style.display = "none";
//             document.getElementById("in_prog_success").style.display = "initial";
//             document.getElementsByClassName("acknowledged").style.display = "none";
//         }
//     };

//     params = "action_taken=" + document.querySelector("#action_taken").value
    
//     xmlhttp.open("POST","controls/inprogress_action_ajax.php?result='.$_GET['result'].'&pdm='.$affich_data['pdm'].'&component='.$affich_data['id_component'].'&alert="+str,true);
//     xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xmlhttp.send(params)
// }
// }
// </script>';



// }
// }

// ?> */