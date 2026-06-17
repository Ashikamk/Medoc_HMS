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

    else {
        $('#btnsubmit').prop('disabled', true);
        var data = {};   //array
        data.DosageId = $('#DosageId').val();
        data.DosageCode = $.trim($('#txtcode').val());
        data.DosageName = $.trim($('#txtname').val());
        data.DelFlag = Flag;

        $.ajax({
            type: "POST",
            url: "../Master/DosageInsertandUpdate",
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
  
    $('#txtname').val('');
    $('#txtcode').val('');
    $('#txtcode').focus();
    $('#DosageId').val(0);
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
    disable_datatable('tbldosage');
    var responseText = "<thead><tr><th width=1%;text-align:center>Sl#</th><th >Code</th><th  >Name</th><th >Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td style="text-align:center">' + slno + '</td><td>' + result[i].DosageCode + '</td><td>' + result[i].DosageName + '</td><td onclick="GetRows(' + result[i].DosageId + ')" align=center bgcolor="#00ffff "><a>' + Editbutton + '</a></td></tr>';
    }
    $('#tbldosage').html(responseText + '</tbody> <tfoot> <tr><th style="text-align:center"> </th><th>Code</th><th>Name</th><th> </th></tr></tfoot>');
    datatableWithsearch1('tbldosage');
}


function ShowTermGet(result) {
    for (var i = 0; i < result.length; i++) {
        $("#DosageId").val(result[i].DosageId);
        $('#txtname').val(result[i].DosageName);
        $('#txtcode').val(result[i].DosageCode);

    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txtcode').focus();
}



//Get List and Single Row from table

function GetRows(DosageId) {

    $('#DosageId').val(DosageId)
    var data = {};
    data.DosageId = DosageId;
    $.ajax({
        type: "POST",
        url: "../Master/DosageGetandGets",
        data: data,
        success: function (result) {
            if (DosageId == 0)
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




