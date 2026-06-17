$(document).ready(function () {
    Defaultfocus();



    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

    

});//Document Close

function Defaultfocus() {
    $('#Prefix').focus();

}



function SaveAndUpdate(Flag) {
    if ($('#Prefix').val() == "") {
        warningshow('Please Enter Prefix', 'Prefix');
    }

    else {
        var data = {};   //array
        data.VoucherTypeId = $('#VoucherTypeId').val();;
        data.Prefix = $('#Prefix').val();
        data.Description = $('#Description').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/VoucherTypeInsertandUpdate",
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
    $('#Prefix').val('');
    $('#Description').val('');
    $('#Prefix').focus();
    $('#VoucherTypeId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowVoucherTypelist(result) {
    disable_datatable('tblvouchertype');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr width=1%><th align=center>Sl#</th><th width=10%>Prefix</th><th width=72%>Description</th><th width=10%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].Prefix + '</td><td>' + result[i].Description + '</td><td align=center><a onclick="GetRows(' + result[i].VoucherTypeId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblvouchertype').html(responseText + '</tbody>');
    //$('#tblvouchertype').DataTable();
    datatableWithsearch1('tblvouchertype');
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

function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}

function ShowVoucherTypeGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#Prefix').val(result[i].Prefix);
        $('#Description').val(result[i].Description);
        $('#Prefix').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(VoucherTypeId) {
    $('#VoucherTypeId').val(VoucherTypeId)
    var data = {};
    data.VoucherTypeId = VoucherTypeId;
    $.ajax({
        type: "POST",
        url: "../Master/VoucherTypeGetandGets",
        data: data,
        success: function (result) {
            if (VoucherTypeId == 0)
                ShowVoucherTypelist(result.oList);
            else
                ShowVoucherTypeGet(result.oList);

        }
    });

}




