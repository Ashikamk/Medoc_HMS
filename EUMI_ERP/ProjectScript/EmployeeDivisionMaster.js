$(document).ready(function () {
    Defaultfocus();
   

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

  

});//Document Close

function Defaultfocus() {
    $('#EmployeeDivisionCode').focus();
}
function CodeName() {
    if ($('#EmployeeDivisionId').val() == 0) {
        $('#EmployeeDivisionName').val($('#EmployeeDivisionCode').val())
    }
}

function SaveAndUpdate(Flag) {
    if ($('#EmployeeDivisionCode').val() == "") {
        warningshow('Please Enter Code', 'EmployeeDivisionCode');
    }
    else if ($('#EmployeeDivisionName').val() == "") {
        warningshow('Please Enter Name', 'EmployeeDivisionName');
    }
    else {
        var data = {};   //array
        data.EmployeeDivisionId = $('#EmployeeDivisionId').val();;
        data.EmployeeDivisionName = $('#EmployeeDivisionName').val();
        data.EmployeeDivisionCode = $('#EmployeeDivisionCode').val();
        data.EmployeeDivisionDescription = $('#EmployeeDivisionDescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/EmployeeDivisionInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    console.log(status)
                    Showalerts(status);
                }
            }
        });

    }


}




function formrefresh() {
    $('#EmployeeDivisionName').val('');
    $('#EmployeeDivisionCode').val('');
    $('#EmployeeDivisionDescription').val('');
    $('#EmployeeDivisionCode').focus();
    $('#EmployeeDivisionId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if(value==1)
    formrefresh();
}

function ShowEmployeeDivisionlist(result) {
    disable_datatable('tblemployeedivision');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th>Code</th><th width=40%>Name</th><th width=50%>Description</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].EmployeeDivisionCode + '</td><td>' + result[i].EmployeeDivisionName + '</td><td>' + result[i].EmployeeDivisionDescription + '</td><td align=center><a onclick="GetRows(' + result[i].EmployeeDivisionId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblemployeedivision').html(responseText + '</tbody>');
    //$('#tblemployeedivision').DataTable();
    datatableWithsearch1('tblemployeedivision');
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
                    exportOptions: { columns: [0, 1, 2,3] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2,3] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2,3] }
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

function ShowEmployeeDivisionGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#EmployeeDivisionName').val(result[i].EmployeeDivisionName);
        $('#EmployeeDivisionCode').val(result[i].EmployeeDivisionCode);
        $('#EmployeeDivisionDescription').val(result[i].EmployeeDivisionDescription);
        $('#EmployeeDivisionCode').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(EmployeeDivisionId) {
    $('#EmployeeDivisionId').val(EmployeeDivisionId)
    var data = {};
    data.EmployeeDivisionId = EmployeeDivisionId;
    $.ajax({
        type: "POST",
        url: "../Master/EmployeeDivisionGetandGets",
        data: data,
        success: function (result) {
            if (EmployeeDivisionId == 0)
                ShowEmployeeDivisionlist(result.oList);
            else
                ShowEmployeeDivisionGet(result.oList);

        }
    });

}




