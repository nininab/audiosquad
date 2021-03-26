function CallBlockId (selection, myUrl, content, parameter1=false) {
    
    $(selection).chosen({
        width: "100%",
        no_results_text: "Oops, nothing found!",
        search_contains: true
    }).on('change', function(){ 
        myUrl = (parameter1) ? myUrl + "?" + parameter1 + "=" + $(selection).val() : myUrl;
        $.ajax({
            method: "GET",
            url: myUrl,
            success: function(msg){
                $(content).html(msg);
            }
        });
        myUrl = '';
    });
}
function form_add_images (myUrl=false) {
    $.ajax({
        method: "GET",
        url: myUrl,
    }).done(function( msg ) {
        $('#modal-auto').empty().append(msg);
        $('#modal-auto').modal('show');
        $("#form_add_images").validate();
        $('#form_add_images').submit(function(event) {
            var form = $(this);
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize()
            });
        });
    });
}
function form_add_files (myUrl=false) {
    $.ajax({
        method: "GET",
        url: myUrl,
    }).done(function( msg ) {
        $('#modal-auto').empty().append(msg);
        $('#modal-auto').modal('show');
        $("#form_add_files").validate();
        $('#form_add_files').submit(function() {
            var form = $(this);
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize()
            });
        });
    });
}
function click_image (src, href) {
    $("#modalImage").attr("src", src);
    $("#btn_delete_img").attr("href", href);
}
function loading_table(id, columnOrder=0, MyOrder, myTitle, mypaging=false, displayLength=false) {
    displayLength = (displayLength) ? displayLength : 10;

    if (MyOrder) {
        $(id).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                {extend: 'excel', title: myTitle}
            ],
            scrollCollapse: false,
            paging:         mypaging,
            order: [[ columnOrder, MyOrder ]],
            displayLength: displayLength
        });
        
    } else {
        $(id).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                {extend: 'excel', title: myTitle},
                {extend: 'csv'}
            ],
            scrollCollapse: false,
            paging: mypaging,
            ordering: false,
            displayLength: displayLength
        });
    }
   
} 
function callForm (myUrl, modalId, tableId, myLocation, datePiker=false, $extra=false) {
    $.ajax({
        method: "GET",
        url: myUrl,
    }).done(function( msg ) {
        event.preventDefault();
        
        $(document.getElementById(modalId)).empty().append(msg);
        $('.chosen-select-width').chosen({ width:"100%", search_contains: true });
        if ($extra) {
            eval($extra);
        }
        
        if (datePiker) {
            var disabledDays = datePiker;
            // console.log($("#my_date_picker").val().search("to"));
            
            if ($("#startDateValue").val().search("to")) {
                newsplitDate = $("#startDateValue").val().split(" to ");
                mysplitDate = newsplitDate[0];
            } else {
                mysplitDate = $("#startDateValue").val();
            }
            // console.log(mysplitDate);
            $("#my_date_picker").datepicker({
                dateFormat: "yyyy-mm-dd",
                language: 'en',
                todayButton: new Date(mysplitDate),
                // range: true,
                // toggleSelected: true,
                minDate: new Date($("#startDateValue").val()),// Now can select only dates, which goes after today
                onRenderCell: function (date, cellType) {
                    if (cellType == 'day') {
                        var day = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
                        isDisabled = disabledDays.indexOf(day) != -1;
                        
                        if (isDisabled == false) {
                            return {
                                disabled: isDisabled,
                                classes: 'bold'
                            }
                        } else {
                            return {
                                disabled: isDisabled
                            }
                        }
                        
                    }
                }
                ,
                onSelect: function(dateText, inst) {
                    if (dateText.indexOf(",") != -1) {
                        var splitDate = dateText.split(",");
                       
                        $("#my_date_picker").val(splitDate[0] + " to " + splitDate[1]);
                        if (document.getElementById("pick_up").checked == true || document.getElementById("is_delivery").checked == true) {
                            $(document.getElementById("mybutton")).prop('disabled', false);
                        }
                       
                    } else {
                        $(document.getElementById("mybutton")).prop('disabled', true);
                    }
                }
            });
            $("#my_date_picker").data('datepicker');
            $('.datepicker').css('z-index',9999);
            $('.datepicker').css('color', '#00a5d6');
        }
        
        $(document.getElementById(modalId)).modal('show');
        $(document.getElementById(tableId)).validate();
        $(document.getElementById(tableId)).submit(function(event) {
            event.preventDefault(); // Prevent the form from submitting via the browser
            var form = $(this);
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize()
            }).done(function( data ) {
                data = data.replace(/\s/g, '');
                if (data !== "") {
                    console.log(data);
                    var msg = JSON.parse(data);
                    toastr[msg.type](msg.msg);
                } else {
                    window.location.replace(myLocation);
                }
            });
        });
    });
}
function callFormWithChanges (myUrl, modalId, tableId, $extra=false) {
    $.ajax({
        method: "GET",
        url: myUrl,
    }).done(function( msg ) {
        event.preventDefault();
        
        $(document.getElementById(modalId)).empty().append(msg);
        $('.chosen-select-width').chosen({ width:"100%", search_contains: true });
        if ($extra) {
            eval($extra);
        }
        
        $(document.getElementById(modalId)).modal('show');
        $(document.getElementById(tableId)).validate();
        $(document.getElementById(tableId)).submit(function(event) {
            
        });
    });
}
function callFormNupdate (myUrl, idcontent) {
    $.ajax({
        method: "GET",
        url: myUrl,
    }).done(function( msg ) {
        if (msg !== "") {
            $(document.getElementById(idcontent)).html(msg);
            $('.chosen-select-width').chosen({ width:"100%", search_contains: true });
        }
    });
}
function callFormWTpreventDefault (myUrl, modalId, FormId=false,$extra=false) {
    $.ajax({
        method: "GET",
        url: myUrl,
    }).done(function( msg ) {
       
        $(document.getElementById(modalId)).empty().append(msg);
        $('.chosen-select-width').chosen({ width:"100%", search_contains: true });
        if ($extra) {
            eval($extra);
        }
        $(document.getElementById(modalId)).modal('show');
        
    });
}
function callFormNoValidation (myUrl, modalId, tableId) {
    $.ajax({
        method: "GET",
        url: myUrl,
    }).done(function( msg ) {
        event.preventDefault();
        $(document.getElementById(modalId)).empty().append(msg);
        $('.chosen-select-width').chosen({ width:"100%", search_contains: true });
        $(document.getElementById(modalId)).modal('show');
        $(document.getElementById(tableId)).validate();
    });
}
function remove_content(id) {
    if ( $(document.getElementById(id)).is(":visible") ) {
        $(document.getElementById(id)).hide();
        $(".delete_image_content").hide();
        
    } else {
        $(document.getElementById(id)).show();
        $(".delete_image_content").show();
    }
}
function api_doughnut(MyData, id, MyOption) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    myRadarChart = new Chart(ctx, {
        type: 'doughnut',
        data: MyData
        ,
        options: MyOption
    });
}
function DisplayButtonByCbx (Idbtn, ClassCbx, IdSelectAll) {
    if ($(document.getElementById(Idbtn)).is(":visible")) {
        if ($(ClassCbx + ':checkbox:checked').length == 0) {
            document.getElementById(Idbtn).style.display = "none";
            document.getElementById(IdSelectAll).checked = false;
        }
    } else {
        if ($(ClassCbx + ':checkbox:checked').length > 0) {
            document.getElementById(Idbtn).style.display = "inline-block";
            document.getElementById(IdSelectAll).checked = true;
            
        }
    }
}
function CheckedBbxWithSelectAll(IdSelectAll, IdBtn, ClassNameCbx) {
    if (document.getElementById(IdSelectAll).checked == true) {
        $(document.getElementsByClassName(ClassNameCbx)).each(function() {
            this.checked = true;
        });
        document.getElementById(IdBtn).style.display = "inline-block";
    } else {
        $(document.getElementsByClassName(ClassNameCbx)).each(function() {
            this.checked = false;
        });
        document.getElementById(IdBtn).style.display = "none";
    }
}
function ChangeItemByclicking (item_id, myurl, extra) {
    $.ajax({
        method: "GET",
        url: myurl,
        success: function(msg){
            $(document.getElementById(item_id)).html(msg);
            if (extra) {
                eval(extra);
            }
        }
    });
}
function toast_success (mess) {
    setTimeout(function() {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 2000
        };
        toastr.success(mess);
    }, 300);
}
function change_selected_url (url, id_element=false) {
    if (id_element) {
        url = url + $(document.getElementById(id_element)).val();
    }
    window.location.replace(url);
}
function onchange_show_content (id, idtoshow) {
    if ( $(document.getElementById(id)).val() == 1) {
        $(document.getElementById(idtoshow)).show();  
    } else {
        $(document.getElementById(idtoshow)).hide();
    }
}
function header_fix(headerId) {
    window.onscroll = function() {myFunction()};

    var header = document.getElementById(headerId);
    var sticky = header.offsetTop;
    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}
function GenerateAnyChart (myId, myType, myLabels, myDatasets, myOptions) {
    var canvas = document.getElementById(myId);
    var ctx1 = canvas.getContext("2d");
    var myBarChart = new Chart(ctx1, {
        type: myType,
        data: chart = {
            labels: Object.values(myLabels),
            datasets: myDatasets
        },
        options: myOptions[0]
    });
    return myBarChart;
}
function showSlidesByClassName() {
    // var slideIndex = sessionStorage.getItem("index");
    // var i;
    // var slides = document.getElementsByClassName("mySlidesUpdate");
    
    // for (i = 0; i < slides.length; i++) {
    //   slides[i].style.display = "none"; 
    // }
    // slideIndex++;
    // if (slideIndex > slides.length) {slideIndex = 1} 
    // sessionStorage.setItem("index", slideIndex);
    // slides[slideIndex-1].style.display = "block"; 
    
    // // if (typeof sessionStorage.getItem("spacemodalindex") !== "undefined" && sessionStorage.getItem("spacemodalindex") == slideIndex) {
    // //     space_modal ("update_modal_body");
    // // } else {
    // //     remove_space_modal ("update_modal_body");
    // // }
    
    
    // setTimeout(showSlidesByClassName, 10000); // Change image every 2 seconds
}
function space_modal (id) {
    document.getElementById(id).style.width = "1000px";
    document.getElementById(id).style.right = "200px";
}
function remove_space_modal (id) {
    document.getElementById(id).style.width = "";
    document.getElementById(id).style.right = "";
}
function HTMLdecodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}
function CheckboxSelectAll (id) {
    // $('#'+id).click(function() {
        if (document.getElementById(id).checked) {
            $(':checkbox').each(function() {
                this.checked = true;
            });
        } else {
            $(':checkbox').each(function() {
                this.checked = false;
            });
        }
    // });
}
function change_dimension_affix_lg () {
    if ($('#affix_lg').is(":visible")) {
        $("#affix_lg").hide();
        $("#affix_xs").show();
        $(".affix_lg").height(30);
        $(".affix_lg").width(200);
    } else {
        $("#affix_xs").hide();
        $("#affix_lg").show();
        $(".affix_lg").height(300);
        $(".affix_lg").width(500);
    }
    
    
}
function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
} 
function drag_over(event) { 
    event.preventDefault(); 
    return false; 
} 
function drop_content(event) { 
    var offset = event.dataTransfer.getData("text/plain").split(',');
    var dm = document.getElementById('dragme');
    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    return false;
} 
if ($(document.getElementById('dragme')).length > 0) {
    console.log("exist");
    var dm = document.getElementById('dragme'); 
    dm.addEventListener('dragstart',drag_start,false); 
    document.body.addEventListener('dragover',drag_over,false); 
    document.body.addEventListener('drop',drop_content,false); 
}
function GetSpartakusUpdates (upvs) {
    $.ajax({
        method: "GET",
        url: "/controls/UpdateSpartakus.php?" + upvs,
    }).done(function( msg ) {
        if (msg !== "") {
            $("#modal-auto").empty().append(msg);
            $("#modal-auto").modal("show");
        }
    });
}
function UpdateUsersPopup (upvs) {
    $.ajax({
        method: "GET",
        url: "/controls/UpdateSpartakus.php?" + upvs,
    }).done(function( msg ) {
        $("#modal-auto").modal("hide");
        toastr["success"](msg);
    });
}
