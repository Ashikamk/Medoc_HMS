$(document).ready(function () {
    Defaultfocus();
    $('.form-control').attr('autocomplete', 'off');
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });


});//Document Close

function Defaultfocus() {
    $('#txtname').focus();
}

function SaveAndUpdate(Flag) {
    if ($('#txtname').val() == "") {
        warningshow('Please Enter Terms', 'txtname');
    }

    else if ($('#txtterms').val() == "") {
        warningshow('Please Enter Days', 'txtterms');
    }
    else {
        $('#btnsubmit').prop('disabled', true);
        var data = {};   //array
        data.TermsId = $('#TermsId').val();;
        data.Terms = $('#txtterms').val();
        data.TermsDescription = $('#txtname').val();
        data.DelFlag = Flag;

        $.ajax({
            type: "POST",
            url: "../Master/TermsInsertandUpdate",
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

function isNumberInt(evt, selectedvalue) {
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
    $('#txtterms').val('');
    $('#txtname').val('');
    $('#txtname').focus();
    $('#TermsId').val(0);
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
    disable_datatable('tblTerms');
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th  width=35%>Name</th><th width=7%>Days</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].TermsDescription + '</td><td>' + result[i].Terms + '</td><td onclick="GetRows(' + result[i].TermsId + ')" align=center width=10px><a>' + Editbutton + '</a></td></tr>';
    }
    $('#tblTerms').html(responseText + '</tbody> <tfoot> <tr><th>Sl#</th><th>Name</th><th>Days</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblTerms');
}

function ShowTermGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#txtterms').val(result[i].Terms);
        $('#txtname').val(result[i].TermsDescription);
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txtname').focus();
}



//Get List and Single Row from table

function GetRows(TermsId) {

    $('#TermsId').val(TermsId)
    var data = {};
    data.TermsId = TermsId;
    $.ajax({
        type: "POST",
        url: "../Master/TermsGetandGets",
        data: data,
        success: function (result) {
            if (TermsId == 0)
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
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Key')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        //if (title == 'Sl#')
        //    $(this).html('<input type="text" placeholder="' + title + '" style="width:10%" />');
        if (title == 'Name')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        else if (title == 'Days')
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



