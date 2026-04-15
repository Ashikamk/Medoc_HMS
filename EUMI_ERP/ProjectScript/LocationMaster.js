$(document).ready(function () {
    Defaultfocus();
   
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

   

});//Document Close


function Defaultfocus()
{
    $('#LocationCode').focus();
}
function CodeName() {
    if ($('#LocationId').val() == 0) {
        $('#LocationName').val($('#LocationCode').val())
    }
}

function SaveAndUpdate(Flag) {
    if ($('#LocationCode').val() == "") {
        warningshow('Please Enter Code', 'LocationCode');
    }
    else if ($('#LocationName').val() == "") {
        warningshow('Please Enter Name', 'LocationName');
    }
    else {
        if ($('#select_status').prop("checked"))
            var s = 1;
        else
            var s = 0;

        var data = {};   //array
        data.LocationId = $('#LocationId').val();;
        data.LocationName = $('#LocationName').val();
        data.LocationCode = $('#LocationCode').val();
        data.LocationDescription = $('#LocationDescription').val();
        data.DelFlag = Flag;
        data.NegativeBillingFlag = s;
        $.ajax({
            type: "POST",
            url: "../Master/LocationInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                }
            }
        });

    }


}




function formrefresh() {
    $('#LocationName').val('');
    $('#LocationCode').val('');
    $('#LocationDescription').val('');
    $('#LocationCode').focus();
    $('#LocationId').val(0);
    $('#btndelete').hide();
    $('#select_status').prop("checked", false);
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if(value==1)
    formrefresh();
}


function ShowLocationlist(result) {
    disable_datatable('tbllocation');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=6%>Code</th><th width=35%>Name</th><th width=35%>Description</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].LocationCode + '</td><td>' + result[i].LocationName + '</td><td>' + result[i].LocationDescription + '</td><td align=center><a onclick="GetRows(' + result[i].LocationId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tbllocation').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Code</th><th>Name</th><th>Description</th><th>Edit</th></tr> </tfoot>');
    datatableWithsearch1('tbllocation');
}
function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}

function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Code' || title == 'Name' || title == 'Description')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
    });


    //var table = null;
    //if (download) {
    //    if (!title || !tableButtonContainerId) { console.log("download table need title and button container"); }

        // AddColumnSelectionButton(tableButtonContainerId, tablename)

        table = $('#' + tablename).DataTable({
            dom: 'Blfrtip',
            dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-1'i><'col-sm-11'p>>",
            buttons: []
        });
        new $.fn.dataTable.Buttons(table, {
            buttons: [
            {
                extend: 'collection',
                text: 'Export',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3] }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3] }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3] }
                    }
                ]
            },
            //'colvis'
            ]
        });
        table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
        $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
    //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
        //    var column = table.column($(this).attr('data-em-col'));
        //    console.log($(this).attr('data-em-col'));
        //    console.log(column);
        //    column.visible($(this).prop("checked"));
        //});
    //} else {
    //    table = $('#' + tablename).DataTable();
    //}
    table.columns().every(function () {
        var that = this;
        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });
}

function ShowLocationGet(result) {
    if (result[0].NegativeBillingFlag == 1)
        $('#select_status').prop("checked", true);
    else
        $('#select_status').prop("checked", false);
    for (var i = 0; i < result.length; i++) {
        $('#LocationName').val(result[i].LocationName);
        $('#LocationCode').val(result[i].LocationCode);
        $('#LocationDescription').val(result[i].LocationDescription);
        $('#LocationCode').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(LocationId) {
    $('#LocationId').val(LocationId)
    var data = {};
    data.LocationId = LocationId;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            if (LocationId == 0)
                ShowLocationlist(result.oList);
            else
                ShowLocationGet(result.oList);

        }
    });

}
function disable_datatable(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}




