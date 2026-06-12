
$(document).ready(function () {
    Defaultfocus();


    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

    $('.form-control').attr('autocomplete', 'off');

});//Document Close

function Defaultfocus() {
    $('#txtunit').focus();
}


function SaveAndUpdate(Flag) {
    if ($.trim($("#txtunit").val()) == '') {
        warningshow('Please Enter Name', 'txtunit');
    }
    else {
        $('#btnsubmit').prop('disabled', true);
        var data = {};
        data.UnitId = $('#UnitId').val();;
        data.UnitName = $('#txtunit').val();
        data.UnitDescription = $('#txtdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/UnitInsertandUpdate",
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

function formrefresh() {
    $('#txtunit').val('');
    $('#txtdesc').val('');
    $('#txtunit').focus();
    $('#UnitId').val(0);
    $('#btndelete').hide();
}
function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowUnitlist(result) {
    disable_datatable('tblunit');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=30px>Sl#</th><th>Name</th><th>Description</th><th width=15px;align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td  align=center>' + slno + '</td><td>' + result[i].UnitName + '</td><td>' + result[i].UnitDescription + '</td><td align=center><a onclick="GetRows(' + result[i].UnitId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblunit').html(responseText + '</tbody>');
    //$('#tblunit').DataTable();
    datatableWithsearch1('tblunit');

}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Serial#' && title != ' ' && title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        }

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
        ]
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

function ShowUnitGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#txtunit').val(result[i].UnitName);
        $('#txtdesc').val(result[i].UnitDescription);
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txtunit').focus();
}

function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}


//Get List and Single Row from table

function GetRows(UnitId) {
    $('#UnitId').val(UnitId)
    var data = {};
    data.UnitId = UnitId;
    $.ajax({
        type: "POST",
        url: "../Master/UnitGetandGets",
        data: data,
        success: function (result) {
            if (UnitId == 0)
                ShowUnitlist(result.oList);
            else
                ShowUnitGet(result.oList);

        }
    });

}



