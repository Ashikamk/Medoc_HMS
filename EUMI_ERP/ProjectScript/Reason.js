$(document).ready(function () {
    Defaultfocus();
    $('.form-control').attr('autocomplete', 'off');
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });


});//Document Close

function Defaultfocus() {
    $('#txt').focus();
}


function SaveAndUpdate(Flag) {

    if ($('#txt').val() == "") {
        warningshow('Please Enter Reason', 'txt');
    }

    else if ($('#txtdesc').val() == "") {
        warningshow('Please Enter Description', 'txtdesc');
    }

    else {
        $('#btnsubmit').prop('disabled', true);
        var data = {};   //array
        data.ReasonId = $('#ReasonId').val();
        data.Reasons = $.trim($('#txt').val());
        data.ReasonDes = $.trim($('#txtdesc').val());
        data.DelFlag = Flag;

        $.ajax({
            type: "POST",
            url: "../Master/ReasonInsertandUpdate",
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
  
    $('#txt').val('');
    $('#txtdesc').val('');
    $('#txt').focus();
    $('#ReasonId').val(0);
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
    disable_datatable('tblreason');
    var responseText = "<thead><tr><th width=1%;text-align:center>Sl#</th><th>Reason</th><th>Description</th><th >Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td style="text-align:center">' + slno + '</td><td>' + result[i].Reasons + '</td><td>' + result[i].ReasonDes + '</td><td onclick="GetRows(' + result[i].ReasonId + ')" align=center bgcolor="#00ffff "><a>' + Editbutton + '</a></td></tr>';
    }
    $('#tblreason').html(responseText + '</tbody> <tfoot> <tr><th style="text-align:center"> </th><th>Reason</th><th>Description</th><th> </th></tr></tfoot>');
    datatableWithsearch1('tblreason');
}


function ShowTermGet(result) {
    for (var i = 0; i < result.length; i++) {
        $("#ReasonId").val(result[i].ReasonId);
        $('#txt').val(result[i].Reasons);
        $('#txtdesc').val(result[i].ReasonDes);

    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txtcode').focus();
}



//Get List and Single Row from table

function GetRows(ReasonId) {

    $('#ReasonId').val(ReasonId)
    var data = {};
    data.ReasonId = ReasonId;
    $.ajax({
        type: "POST",
        url: "../Master/ReasonGetandGets",
        data: data,
        success: function (result) {
            if (ReasonId == 0)
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




