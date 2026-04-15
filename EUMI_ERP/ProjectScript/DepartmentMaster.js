$(document).ready(function () {
    Defaultfocus();



    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });



});//Document Close

function Defaultfocus() {
    $('#DepartmentCode').focus();

}
function CodeName() {
    if ($('#DepartmentId').val() == 0) {
        $('#DepartmentName').val($('#DepartmentCode').val())
    }
}




function SaveAndUpdate(Flag) {
    if ($('#DepartmentCode').val() == "") {
        warningshow('Please Enter Code', 'DepartmentCode');
    }
    else if ($('#DepartmentName').val() == "") {
        warningshow('Please Enter Name', 'DepartmentName');
    }
    else {
        var data = {};   //array
        data.DepartmentId = $('#DepartmentId').val();;
        data.DepartmentName = $('#DepartmentName').val();
        data.DepartmentCode = $('#DepartmentCode').val();
        data.DepartmentDescription = $('#DepartmentDescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/DepartmentInsertandUpdate",
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
    $('#DepartmentName').val('');
    $('#DepartmentCode').val('');
    $('#DepartmentDescription').val('');
    $('#DepartmentCode').focus();
    $('#DepartmentId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowDepartmentlist(result) {
    disable_datatable('tbldepartment');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1% ;align=center>Sl#</th><th  width=5%>Code</th><th width=35%>Name</th><th width=45%>Description</th><th width=3% align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].DepartmentCode + '</td><td>' + result[i].DepartmentName + '</td><td>' + result[i].DepartmentDescription + '</td><td align=center><a onclick="GetRows(' + result[i].DepartmentId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tbldepartment').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Code</th><th>Name</th><th>Description</th><th width=3% align=center>Edit</th></tr></tfoot>');
    datatableWithsearch1('tbldepartment');
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
    var table = null;
    table = $('#' + tablename).DataTable({
        dom: 'Blfrtip',
        dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-1'i><'col-sm-11'p>>",
        buttons: [],
        //"columnDefs": [

        //     { "width": "17%", "targets": 2 },
        //     { "width": "18%", "targets": 3 },
        //      { "width": "15%", "targets": 4 },
        //        { "width": "15%", "targets": 5 },
        //          { "width": "10%", "targets": 6 },
        //           { "width": "10%", "targets": 7 },

        //]

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
       // 'colvis'
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

function ShowDepartmentGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#DepartmentName').val(result[i].DepartmentName);
        $('#DepartmentCode').val(result[i].DepartmentCode);
        $('#DepartmentDescription').val(result[i].DepartmentDescription);
        $('#DepartmentCode').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(DepartmentId) {
    $('#DepartmentId').val(DepartmentId)
    var data = {};
    data.DepartmentId = DepartmentId;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            if (DepartmentId == 0)
                ShowDepartmentlist(result.oList);
            else
                ShowDepartmentGet(result.oList);

        }
    });

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

