$(document).ready(function () {
    Defaultfocus();



    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

  

});//Document Close

function Defaultfocus() {
    $('#DesignationCode').focus();
}


function SaveAndUpdate(Flag) {
    if ($('#DesignationCode').val() == "") {
        warningshow('Please Enter Code', 'DesignationCode');
    }
  
    else {
        var data = {};   //array
        data.DesignationId = $('#DesignationId').val();;
        data.DesignationCode = $('#DesignationCode').val();
        data.DesignationDescription = $('#DesignationDescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/DesignationInsertandUpdate",
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
    $('#DesignationCode').val('');
    $('#DesignationDescription').val('');
    $('#DesignationCode').focus();
    $('#DesignationId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowDesignationlist(result) {
    disable_datatable('tbldesignation');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=10%>Code</th><th width=60%>Description</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].DesignationCode + '</td><td>' + result[i].DesignationDescription + '</td><td align=center><a onclick="GetRows(' + result[i].DesignationId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tbldesignation').html(responseText + '</tbody>');
    //$('#tbldesignation').DataTable();
    datatableWithsearch1('tbldesignation');
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

function ShowDesignationGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#DesignationCode').val(result[i].DesignationCode);
        $('#DesignationDescription').val(result[i].DesignationDescription);
        $('#DesignationCode').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(DesignationId) {
    $('#DesignationId').val(DesignationId)
    var data = {};
    data.DesignationId = DesignationId;
    $.ajax({
        type: "POST",
        url: "../Master/DesignationGetandGets",
        data: data,
        success: function (result) {
            if (DesignationId == 0)
                ShowDesignationlist(result.oList);
            else
                ShowDesignationGet(result.oList);

        }
    });

}




