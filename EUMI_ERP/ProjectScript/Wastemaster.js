$(document).ready(function () {
    Defaultfocus();
    $('.form-control').attr('autocomplete', 'off');
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });


});//Document Close

function Defaultfocus() {
    $('#wastetype1').focus();
}
function Check() {

    var st = $('#select_status').prop('checked');
    $('input[type=checkbox]').prop('checked', st);
}

function SaveAndUpdate(Flag) {

    if ($('#wastetype1').val() == "") {
        warningshow('Please Enter Waste Type1', 'wastetype1');
    }


    else {
        $('#btnsubmit').prop('disabled', true);
        var data = {};   //array
        data.wasteId = $('#wasteId').val();
        data.wastetype1 = $.trim($('#wastetype1').val());
        data.wastetype2 = ($('#wastetype2').val());
        data.wastetype3 = ($('#wastetype3').val());
        data.wastetype4 = ($('#wastetype4').val());
        data.wastetype5 = ($('#wastetype5').val());
        data.PayRate = 0;
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;
        data.DelFlag = Flag;


        $.ajax({
            type: "POST",
            url: "../Master/WasteInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;

                    Showalerts(status);
                    $('#btnsubmit').prop('disabled', false);
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

    $('#wastetype1').val('');
    $('#wastetype2').val('');
    $('#wastetype3').val('');
    $('#wastetype4').val('');
    $('#wastetype5').val('');
    $('#wastetype1').focus();
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
    disable_datatable('tblWaste');
    var responseText = "<thead><tr><th width=1%;text-align:center>Sl#</th><th >Waste Type1</th><th>Waste Type2</th><th>Waste Type3</th><th>Waste Type4</th><th>Waste Type5</th><th >Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td style="text-align:center">' + slno + '</td><td>' + result[i].wastetype1 + '</td><td>' + result[i].wastetype2 + '</td><td>' + result[i].wastetype3 + '</td><td>' + result[i].wastetype4 + '</td><td>' + result[i].wastetype5 + '</td><td onclick="GetRows(' + result[i].wasteId + ')" align=center bgcolor="#00ffff "><a>' + Editbutton + '</a></td></tr>';
    }
    $('#tblWaste').html(responseText + '</tbody> <tfoot> <tr><th style="text-align:center"> </th><th>WasteType1</th><th>WasteType2</th><th>WasteType3</th><th>WasteType4</th><th>WasteType5</th><th> </th></tr></tfoot>');
    datatableWithsearch1('tblWaste');
}

//ShowTermGet
function ShowTermGet(result) {
    var Payment = 0;
    for (var i = 0; i < result.length; i++) {
        $("#wasteId").val(result[i].wasteId);
        $('#wastetype1').val(result[i].wastetype1);
        $('#wastetype2').val(result[i].wastetype2);
        $('#wastetype3').val(result[i].wastetype3);
        $('#wastetype4').val(result[i].wastetype4);
        $('#wastetype5').val(result[i].wastetype5);


        $('#Entry').show();
        $('#listing').hide();
        $('#btndelete').show();
        $('#wastetype1').focus();
    }
}



//Get List and Single Row from table

function GetRows(wasteId) {

    $('#wasteId').val(wasteId)
    var data = {};
    data.wasteId = wasteId;
    $.ajax({
        type: "POST",
        url: "../Master/WasteGetandGets",
        data: data,
        success: function (result) {
            if (wasteId == 0)
                ShowTermlist(result);//make form related function name dont copy paok
            else
                ShowTermGet(result);

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
                    exportOptions: { columns: [0, 1, 2] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2] }
                }
            ]
        },
        //'colvis'
        ],
        "columnDefs": [
                  { "width": "0%", "targets": 0 },
                  { "width": "50%", "targets": 1 },
                  { "width": "50%", "targets": 2 },
                  { "width": "0%", "targets": 3 },

        ],
    });

    table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
    $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");

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




