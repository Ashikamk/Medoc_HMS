$(document).ready(function () {
    Defaultfocus();



    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });



});//Document Close

function Defaultfocus() {
    $('#PriceType').focus();

}



function SaveAndUpdate(Flag) {
    if ($('#PriceType').val() == "") {
        warningshow('Please Enter Price Type', 'PriceType');
    }

    else {
        var data = {};   //array
        data.MultiPriceId = $('#MultiPriceId').val();;
        data.PriceType = $('#PriceType').val();
        data.Description = $('#Description').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/MultiPriceInsertandUpdate",
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
    $('#PriceType').val('');
    $('#Description').val('');
    $('#PriceType').focus();
    $('#MultiPriceId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowMultiPricelist(result) {
    disable_datatable('tblmultiprice');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1% ;align=center>Sl#</th><th width=10% >Price Type</th><th  width=35%>Description</th><th width=3% ; align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].PriceType + '</td><td>' + result[i].Description + '</td><td align=center><a onclick="GetRows(' + result[i].MultiPriceId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblmultiprice').html(responseText + '</tbody>');
    //$('#tblmultiprice').DataTable();
    datatableWithsearch1('tblmultiprice');
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

function ShowMultiPriceGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#PriceType').val(result[i].PriceType);
        $('#Description').val(result[i].Description);
        $('#PriceType').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(MultiPriceId) {
    $('#MultiPriceId').val(MultiPriceId)
    var data = {};
    data.MultiPriceId = MultiPriceId;
    $.ajax({
        type: "POST",
        url: "../Master/MultiPriceGetandGets",
        data: data,
        success: function (result) {
            if (MultiPriceId == 0)
                ShowMultiPricelist(result.oList);
            else
                ShowMultiPriceGet(result.oList);

        }
    });

}




