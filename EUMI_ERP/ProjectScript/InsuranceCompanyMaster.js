$(document).ready(function () {
    Defaultfocus();


    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });



});//Document Close
function Defaultfocus() {
    $('#InsurancecmpyCode').focus();
}
function CodeName() {
    if ($('#InsurancecmpyId').val() == 0) {
        $('#InsurancecmpyName').val($('#InsurancecmpyCode').val())
    }
}
function SaveAndUpdate(Flag) {

    if ($('#InsurancecmpyCode').val() == "") {
        warningshow('Please Enter Code', 'InsurancecmpyCode');
    }
    if ($('#InsurancecmpyCode').val() == '0') {
        warningshow('Please Enter Valid Code', 'InsurancecmpyCode');
    }
    else if ($('#InsurancecmpyName').val() == "") {
        warningshow('Please Enter Name', 'InsurancecmpyName');
    }
    else if ($('#Benefits').val() == "") {
        warningshow('Please Enter Benefits', 'Benefits');
    }
    else {
        var data = {};   //array
        data.InsuranceCompanyId = $('#InsuranceCompanyId').val();;
        data.InsuranceCompanyName = $('#InsurancecmpyName').val();
        data.InsuranceCompanyCode = $('#InsurancecmpyCode').val();
        data.InsuranceCompanyDescription = $('#Description').val();
        data.Benefits = $('#Benefits').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/InsuranceCompanyInsertandUpdate",
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
    $('#InsurancecmpyName').val('');
    $('#InsurancecmpyCode').val('');
    $('#Description').val('');
    $('#Benefits').val('');
    $('#InsurancecmpyCode').focus();
    $('#InsuranceCompanyId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function GetRows(InsuranceCompanyId) {
    $('#InsuranceCompanyId').val(InsuranceCompanyId)
    var data = {};
    data.InsuranceCompanyId = InsuranceCompanyId;
    $.ajax({
        type: "POST",
        url: "../Master/InsuranceCompanymasterGetandGets",
        data: data,
        success: function (result) {
            if (InsuranceCompanyId == 0)
                ShowInsuranceCompanylist(result.oList);
            else
                ShowInsuranceCompanyGet(result.oList);

        }
    });

}

function ShowInsuranceCompanylist(result) {
    disable_datatable('tblinsuranceCompany');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=10%>Code</th><th width=30%>Name</th><th width=10%>Benefits</th><th width=40%>Description</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].InsuranceCompanyCode + '</td><td>' + result[i].InsuranceCompanyName + '</td><td>' + result[i].Benefits + '</td><td>' + result[i].InsuranceCompanyDescription + '</td><td align=center><a onclick="GetRows(' + result[i].InsuranceCompanyId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblinsuranceCompany').html(responseText + '</tbody>');
    // $('#tblinsuranceCompany').DataTable();
    datatableWithsearch1('tblinsuranceCompany');
}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');

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
                    exportOptions: { columns: [0, 1, 2, 3,4] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3,4] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3,4] }
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
    //table.columns().every(function () {
    //    var that = this;
    //    $('input', this.footer()).on('keyup change', function () {
    //        if (that.search() !== this.value) {
    //            that
    //                .search(this.value)
    //                .draw();
    //        }
    //    });
    //});
}

function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}

function ShowInsuranceCompanyGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#InsurancecmpyName').val(result[i].InsuranceCompanyName);
        $('#InsurancecmpyCode').val(result[i].InsuranceCompanyCode);
        $('#Benefits').val(result[i].Benefits);
        $('#Description').val(result[i].InsuranceCompanyDescription);
        $('#InsurancecmpyCode').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}
