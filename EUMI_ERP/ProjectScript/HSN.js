$(document).ready(function () {
    Defaultfocus();
    $('.form-control').attr('autocomplete', 'off');
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });


});//Document Close

function Defaultfocus() {
    $('#hns_code').focus();
}

function SaveAndUpdate(Flag) {

    if ($('#hns_code').val() == "") {
        warningshow('Please Enter Code', 'hns_code');
    }

    else if ($('#hns_name').val() == "") {
        warningshow('Please Enter Name', 'hns_name');
    }
    else if ($('#hns_tax').val() == "") {
        warningshow('Please Enter Tax', 'hns_tax');
    }
    else {
        $('#btnsubmit').prop('disabled', true);
        var data = {};   //array
        data.HSNId = $('#HSNId').val();
        data.Name = $.trim($('#hns_name').val());
        data.Code = $.trim($('#hns_code').val());
        data.TaxRate = $.trim($('#hns_tax').val());
        data.DelFlag = Flag;

        $.ajax({
            type: "POST",
            url: "../Master/HSNInsertandUpdate",
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
    $('#hns_tax').val('');
    $('#hns_name').val('');
    $('#hns_code').val('');
    $('#hns_code').focus();
    $('#HSNId').val(0);
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
    disable_datatable('tblHSN');
    var responseText = "<thead><tr><th width=1%;align='center'>Sl#</th><th >Name</th><th>Code</th><th  style='text-align:right;'>TaxRate</th><th >Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].Name + '</td><td>' + result[i].Code + '</td><td align="right">' + (result[i].TaxRate) + '</td><td onclick="GetRows(' + result[i].HSNId + ')" align=center width=10px bgcolor="#00ffff "><a>' + Editbutton + '</a></td></tr>';
    }
    $('#tblHSN').html(responseText + '</tbody> <tfoot> <tr><th> </th><th>Name</th><th>Code</th><th> </th><th> </th></tr></tfoot>');
    datatableWithsearch1('tblHSN');
}


function ShowTermGet(result) {
    for (var i = 0; i < result.length; i++) {
        $("#HSNId").val(result[i].HSNId);
        $('#hns_name').val(result[i].Name);
        $('#hns_code').val(result[i].Code);
        $('#hns_tax').val(result[i].TaxRate);

    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txtname').focus();
}



//Get List and Single Row from table

function GetRows(HSNId) {

    $('#HSNId').val(HSNId)
    var data = {};
    data.HSNId = HSNId;
    $.ajax({
        type: "POST",
        url: "../Master/HSNGetandGets",
        data: data,
        success: function (result) {
            if (HSNId == 0)
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
                    exportOptions: { columns: [0, 1, 2,3] }
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



