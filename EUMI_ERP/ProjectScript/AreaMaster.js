$(document).ready(function () {
    Defaultfocus();
    GetAreaGroupselect(0);

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });



    $('#txtcode').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtname').focus();
            e.preventDefault();
        }
    });
    $('#txtname').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_areagroup').focus();
            e.preventDefault();
        }
    });
    $('#select_areagroup').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtdescription').focus();
            e.preventDefault();
        }
    });

    $('#txtdescription').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnsubmit').focus();
            e.preventDefault();
        }
    });


    $(document).keydown(function (e) {
        $('#Warningpopup').fadeOut();
        if (e.altKey && e.keyCode == 83) {
            SaveAndUpdate(1)
        }
        else if (e.altKey && e.keyCode == 76) {
            GetRows(0)
        }
        else if (e.altKey && e.keyCode == 67) {
            formrefresh();
        }
        else if (e.altKey && e.keyCode == 88) {
            closetable();
        }

    })


    $("#btndelete").click(function (e) {
        $('#confirm').show();
        $('#confirmOk').focus();

    });



});//Document Close



function Defaultfocus() {
    $('#txtcode').focus();
}
function CodeName() {
    if ($('#AreaId').val() == 0) {
        $('#txtname').val($('#txtcode').val())
    }
}



function AreaGroupLoad(result) {
    $("#select_areagroup").empty();
    $("#select_areagroup").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_areagroup").append("<option value='" + result[i].AreaGrpId + "'>" + result[i].AreaName + "</option>");
    }
}


function GetAreaGroupselect(AreaGrpId) {
    var data = {};
    data.AreaGrpId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGroupGetandGets",
        data: data,
        success: function (result) {
            AreaGroupLoad(result.oList);

        }
    });

}







function SaveAndUpdate(Flag) {
    if ($('#txtcode').val() == "") {
        warningshow('Please Enter Code', 'txtcode');
    }
    else if ($('#txtname').val() == "") {
        warningshow('Please Enter Name', 'txtname');
    }
    else if ($('#select_areagroup').val() == "0") {
        warningshow('Please Select Group', 'select_areagroup');
    }
    else {
        var data = {};   //array
        data.AreaId = $('#AreaId').val();;
        data.AreaName = $('#txtname').val();
        data.AreaGrpId = $('#select_areagroup').val();
        data.AreaCode = $('#txtcode').val();
        data.Description = $('#txtdescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/AreaInsertandUpdate",
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
    $('#select_areagroup').val('0');
    $('#txtcode').val('');
    $('#txtdescription').val('');
    $('#txtcode').focus();
    $('#AreaId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowArealist(result) {
    $('#Entry').hide();
    $('#listing').show();
    disable_datatable('tblArea');
    var responseText = "<thead><tr><th  width=1%;align=center>Sl#</th><th width=10%>Code</th><th width=20%>Name</th><th  width=10%>Group Name</th><th width=20%>Description</th><th  width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].AreaCode + '</td><td>' + result[i].AreaName + '</td><td>' + result[i].GroupName + '</td><td>' + result[i].Description + '</td><td onclick="GetRows(' + result[i].AreaId + ')" align=center><a>' + Editbutton + '</a></td></tr>';
    }
    $('#tblArea').html(responseText + '</tbody> <tfoot> <tr><th>Sl#</th><th>Code</th><th>Name</th><th>Group Name</th><th>Description</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblArea');
}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Group Name' || title == 'Code' || title == 'Name' || title == 'Description')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
    });
    

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
        $('#select_areagroup').val(result[i].AreaGrpId);

    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txtcode').focus();
}



//Get List and Single Row from table

function GetRows(AreaId) {
    $('#AreaId').val(AreaId)
    var data = {};
    data.AreaId = AreaId;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGetandGets",
        data: data,
        success: function (result) {
            if (AreaId == 0)
                ShowArealist(result.oList);
            else
                ShowAreaGet(result.oList);

        }
    });

}





function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true') {
        SaveAndUpdate(0)
    }
    $('#confirm').fadeOut();

}


//Show Window Alert Insert,update delete  Modify
function Showalerts(Status) {
    if (Status == 1) {
        formrefresh();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh();
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        formrefresh();
        swal('Cannot Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}
//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

//Show Warnig Popup right top
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
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




