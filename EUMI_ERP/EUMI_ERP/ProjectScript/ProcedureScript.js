$(document).ready(function () {
    Defaultfocus();
    $('.form-control').attr('autocomplete', 'off');
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });


});//Document Close

function Defaultfocus() {
    $('#txtcode').focus();
}

function SaveAndUpdate(Flag) {

    if ($('#txtcode').val() == "") {
        warningshow('Please Enter Code', 'txtcode');
    }

    else if ($('#txtname').val() == "") {
        warningshow('Please Enter Name', 'txtname');
    }
    else if ($('#txtcharge').val() == "") {
        warningshow('Please Enter Charge', 'txtcharge');
    }
    else {
        $('#btnsubmit').prop('disabled', true);
        var data = {};   //array
        data.ProcedureId = $('#ProcedureId').val();
        data.ProcedureCode = $.trim($('#txtcode').val());
        data.Procedurecharge = $.trim($('#txtcharge').val());
        data.ProcedureName = $.trim($('#txtname').val());
        data.DelFlag = Flag;

        $.ajax({
            type: "POST",
            url: "../Master/ProcedureInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    $('#btnsubmit').prop('disabled', false);
                    Showalerts(status);
                }
            }
        });

    }


}

//Numeric Only Text Boxes with Decimal Point

function PisNumber(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}

//Numeric Only Text Boxes without Decimal Point

function PisNumberInt(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}

function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}


function formrefresh() {
    $('#txtcharge').val('');
    $('#txtname').val('');
    $('#txtcode').val('');
    $('#txtcode').focus();
    $('#ProcedureId').val(0);
    $('#btndelete').hide();
    $('#Warningpopup').fadeOut();
    $('.swal-button swal-button--confirm').focus();

}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowTermlist(result) {
    $('#Entry').hide();
    $('#listing').show();
    disable_datatable('tblProcedure');
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=3% >Code</th><th  width=35%>Name</th><th width=7% class='text-right' >Charge</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].ProcedureCode + '</td><td>' + result[i].ProcedureName + '</td><td align=right>' + (result[i].Procedurecharge).toFixed(Decimal) + '</td><td onclick="GetRows(' + result[i].ProcedureId + ')" align=center width=10px bgcolor="#00ffff "><a>' + Editbutton + '</a></td></tr>';
    }
    $('#tblProcedure').html(responseText + '</tbody> <tfoot> <tr><th> </th><th>Code</th><th>Name</th><th> </th><th> </th></tr></tfoot>');
    datatableWithsearch1('tblProcedure');
}

function ShowTermGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#txtcode').val(result[i].ProcedureCode);
        $('#txtname').val(result[i].ProcedureName);
        $('#txtcharge').val(result[i].Procedurecharge);
       
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txtname').focus();
}



//Get List and Single Row from table

function GetRows(ProcedureId) {
 
    $('#ProcedureId').val(ProcedureId)
    var data = {};
    data.ProcedureId = ProcedureId;
    $.ajax({
        type: "POST",
        url: "../Master/ProcedureGetandGets",
        data: data,
        success: function (result) {
            if (ProcedureId == 0)
                ShowTermlist(result.oList);
            else
                ShowTermGet(result.oList);

        }
    });

}

function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width:100%" />');
       
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
        buttons: [],

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
                    exportOptions: { columns: [0, 1, 2,3] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2,3] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2,3] }
                }
            ]
        },
        //'colvis'
        ],
        "columnDefs": [
                  { "width": "0%", "targets": 0 },
                  { "width": "0%", "targets": 1 },
                  { "width": "100%", "targets": 2 },
                  { "width": "0%", "targets": 3 },
                    { "width": "0%", "targets": 4 },

        ],
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
function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
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



