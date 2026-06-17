$(document).ready(function () {
    Defaultfocus();

        
    $('.form-control').attr('autocomplete', 'off');

    $("#btnsubmit").click(function (e) {
            SaveAndUpdate(1)
        });

       

    });//Document Close

function Defaultfocus() {
    $('#txtgrpcode').focus();
}

function CodeName()
{ 
    if ($('#GrpId').val() == 0)
    {       
        $('#txtgrpname').val($('#txtgrpcode').val());
    } 
}

function SaveAndUpdate(Flag) {
    if ($('#txtgrpcode').val() == "") {
        warningshow('Please Enter Code', 'txtgrpcode');
    }      
    else if ($('#txtgrpname').val() == "") {
        warningshow('Please Enter Name', 'txtgrpname');
    }
    else {
        $('#btnsubmit').prop('disabled', true);
        var data = {};   //array
        data.GrpId = $('#GrpId').val();;
        data.GrpName = $('#txtgrpname').val();
        data.GrpCode = $('#txtgrpcode').val();
        data.GrpDescription = $('#txtgrpdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/GroupInsertandUpdate",
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
    $('#txtgrpname').val('');
    $('#txtgrpcode').val('');
    $('#txtgrpdesc').val('');
    $('#txtgrpcode').focus();
    $('#GrpId').val(0);
    $('#btndelete').hide();
}
function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if(value==1)                                   
        formrefresh();
}

function ShowGrouplist(result) {
    disable_datatable('tblgroup');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=6%>Code</th><th width=35%>Name</th><th width=35%>Description</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].GrpCode + '</td><td>' + result[i].GrpName + '</td><td>' + result[i].GrpDescription + '</td><td align=center><a onclick="GetRows(' + result[i].GrpId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblgroup').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Code</th><th>Name</th><th>Description</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblgroup');
}
function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}

function ShowGroupGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#txtgrpname').val(result[i].GrpName);
        $('#txtgrpcode').val(result[i].GrpCode);
        $('#txtgrpdesc').val(result[i].GrpDescription);   
    }

    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txtgrpcode').focus();
}



//Get List and Single Row from table

function GetRows(GrpId) {
    $('#GrpId').val(GrpId)
    var data = {};
    data.GrpId = GrpId;
    $.ajax({
        type: "POST",
        url: "../Master/GroupGetandGets",
        data: data,
        success: function (result) {
            if (GrpId == 0)
                ShowGrouplist(result.oList);
            else
                ShowGroupGet(result.oList);

        }
    });

}

function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Code' || title == 'Name' || title == 'Description')
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

function disable_datatable(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}
