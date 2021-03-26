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
function loading_table(id, columnOrder=0, MyOrder, myTitle, mypaging=false) {
    if (MyOrder) {
        $(id).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                {extend: 'excel', title: myTitle},
            ],
            scrollCollapse: false,
            paging:         mypaging,
            order: [[ columnOrder, MyOrder ]]
        });
    } else {
        $(id).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                {extend: 'excel', title: myTitle},
            ],
            scrollCollapse: false,
            paging: mypaging,
            ordering: false
        });
    }
   
} 
function callForm (myUrl, modalId, tableId, myLocation, datePiker=false) {
    $.ajax({
        method: "GET",
        url: myUrl,
    }).done(function( msg ) {
        event.preventDefault();
        
        $(document.getElementById(modalId)).empty().append(msg);
        $('.chosen-select-width').chosen({ width:"100%", search_contains: true });
        if (datePiker) {
            var disabledDays = datePiker;
            $("#my_date_picker").datepicker({
                dateFormat: "yyyy-mm-dd",
                language: 'en',
                todayButton: new Date($("#startDateValue").val()),
                // range: true,
                // toggleSelected: true,
                minDate: new Date($("#startDateValue").val()),// Now can select only dates, which goes after today
                onRenderCell: function (date, cellType) {
                    if (cellType == 'day') {
                        var day = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2),
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
                        $("#date_due").val(splitDate[1]);
                        $("#my_date_picker").val(splitDate[0]);
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
                if (data !== "") {
                    
                    var msg = JSON.parse(data);
                    toastr[msg.type](msg.msg);
                } else {
                    window.location.replace(myLocation);
                }
            });
        });
    });
}
function remove_content(id){
    if ( $(document.getElementById(id)).is(":visible") ) {
        $(document.getElementById(id)).hide();
    } else {
        $(document.getElementById(id)).show();
    }
}

