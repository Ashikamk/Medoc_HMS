$(document).ready(function () {
    Defaultfocus();



    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

});//Document Close


function Defaultfocus() {
    $('#Code').focus();
}



function SaveAndUpdate(Flag) {
    if ($('#Code').val() == "") {
        warningshow('Please Enter Code', 'Code');
    }
    else {
        var data = {};   //array
        data.PremiseId = $('#PremiseId').val();;
        data.PremiseCode = $('#Code').val();
        data.PremiseDescription = $('#Description').val();
        data.PremiseRemarks = $('#Remarks').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Realestate/PremiseInsertandUpdate",
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
    $('#Remarks').val('');
    $('#Code').val('');
    $('#Description').val('');
    $('#Code').focus();
    $('#PremiseId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}


function ShowPremiselist(result) {
    disable_datatable('tblcategory');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1% ;align=center>Sl#</th><th width=6%>Code</th><th width=35%>Description</th><th width=35%>Remarks</th><th width=3% align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].PremiseCode + '</td><td>' + result[i].PremiseDescription + '</td><td>' + result[i].PremiseRemarks + '</td><td align=center><a onclick="GetRows(' + result[i].PremiseId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblcategory').html(responseText + '</tbody><tfoot><tr><th align=center>Sl#</th><th>Code</th><th>Description</th><th>Remarks</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblcategory');
}

var oTable = $("#tblcategory").dataTable({
    // Your other options here...
    "bAutoWidth": true
});
function ShowPremiseGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#Remarks').val(result[i].PremiseRemarks);
        $('#Code').val(result[i].PremiseCode);
        $('#Description').val(result[i].PremiseDescription);
        $('#Code').focus();

    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(PremiseId) {
    $('#PremiseId').val(PremiseId)
    var data = {};
    data.PremiseId = PremiseId;
    $.ajax({
        type: "POST",
        url: "../Realestate/PremiseGetandGets",
        data: data,
        success: function (result) {
            if (PremiseId == 0)
                ShowPremiselist(result.oList);
            else
                ShowPremiseGet(result.oList);

        }
    });

}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Serial#' && title != ' ' && title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        }
        if (title == 'Code') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Name') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Description') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
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



