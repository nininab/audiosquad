function exporting_by_area(areaid, afl, adesc){
    $(document).ready(function(){
        $(areaid).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                { extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: afl + ' - ' + adesc},
                {extend: 'pdf', title: afl + ' - ' + adesc}
            ],
            scrollCollapse: false,
            paging:         false,
            order: [[ 3, "asc" ]]
        });
    });
}
function exporting_by_asset(){
    $(document).ready(function(){
        $('.dataTables-example').DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                { extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'Health & operational risk by asset'},
                {extend: 'pdf', title: 'Health & operational risk by asset'},

                {extend: 'print',
                 customize: function (win){
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                }
                }
            ],
            order: [[ 4, "asc" ]]

        });
    });
}