$(document).ready(function () {
    Defaultfocus();

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });





});//Document Close


function Defaultfocus() {
    $('#txtcode').focus();
}



function SaveAndUpdate(Flag) {
    if ($('#txtcode').val() == "") {
        warningshow('Please Enter Code', 'txtcode');
    }
    else if ($('#txtname').val() == "") {
        warningshow('Please Enter Name', 'txtname');
    }
    else {
        var data = {};   //array
        data.AreaGrpId = $('#AreaGrpId').val();;
        data.GroupName = $('#txtname').val();
        data.AreaCode = $('#txtcode').val();
        data.Description = $('#txtdescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/AreaGroupInsertandUpdate",
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
    $('#txtname').val('');
    $('#txtcode').val('');
    $('#txtdescription').val('');
    $('#txtcode').focus();
    $('#AreaGrpId').val(0);
    $('#select_areagroup').val(0);
    $('#btndelete').hide();
    $('#Warningpopup').fadeOut();
    $('.swal-button swal-button--confirm').focus();

}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    $('#txtname').focus();
    if (value == 1)
        formrefresh();
}

function ShowArealist(result) {
    disable_datatable('tblArea');

    $('#Entry').hide();
    $('#listing').show();
    $('#btnnew').show();
    var responseText = "<thead><tr><th width=1% ; align=center>Sl#</th><th width=6%>Code</th><th width=35%>Name</th><th width=35%>Description</th><th width=3% align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center >' + slno + '</td><td>' + result[i].AreaCode + '</td><td>' + result[i].AreaName + '</td><td>' + result[i].Description + '</td><td align=center><a onclick="GetRows(' + result[i].AreaGrpId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblArea').html(responseText + '</tbody> <tfoot> <tr><th>Sl#</th><th>Code</th><th>Name</th><th>Description</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblArea');
}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Serial#' && title != ' ' && title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        }
        if (title == 'Code') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:70%" />');
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

function ShowAreaGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#txtname').val(result[i].AreaName);
        $('#txtcode').val(result[i].AreaCode);
        $('#txtdescription').val(result[i].Description);
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#Warningpopup').fadeOut();
    $('#txtcode').focus();

}



//Get List and Single Row from table

function GetRows(AreaGrpId) {
    $('#Warningpopup').fadeOut();
    $('#AreaGrpId').val(AreaGrpId)
    var data = {};
    data.AreaGrpId = AreaGrpId;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGroupGetandGets",
        data: data,
        success: function (result) {
            if (AreaGrpId == 0)
                ShowArealist(result.oList);
            else
                ShowAreaGet(result.oList);

        }
    });

}








