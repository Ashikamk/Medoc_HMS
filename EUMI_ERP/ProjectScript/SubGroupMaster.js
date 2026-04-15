$(document).ready(function () {
    Defaultfocus();

    var data = {};                                       //dropdownbind
    data.GrpId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/GroupGetandGets",
        data: data,
        success: function (result) {
            GroupLoad(result.oList);


        }
    });

    $('#select_name').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtname').focus();
            e.preventDefault();
        }
    });
   
    $('#txtname').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtsbgrpdesc').focus();
            e.preventDefault();
        }
    });
    $('#txtsbgrpdesc').keypress(function (e) {
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

 

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

   

});//Document Close

function GroupLoad(result) {
    $("#select_name").empty();
    //$("#select_name").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_name").append("<option value='" + result[i].GrpId + "'>" + result[i].GrpName + "</option>");
    }
}

function Defaultfocus() {
    $('#select_name').focus();

}


function SaveAndUpdate(Flag) {
    if ($('#txtname').val() == 0) {
        warningshow('Please Enter Medicine Group', 'select_name');
    }
    else if ($('#txtsbgrpdesc').val() == "") {
        warningshow('Please Enter Brand Name', 'txtname');
    }
    else {
        $('#btnsubmit').prop('disabled', true);
        var data = {};   //array
        data.SbgrpId = $('#SbgrpId').val();;
        data.GroupId = $('#select_name').val();
        data.SbgrpName = $('#txtname').val();
        data.SbgrpDescription = $('#txtsbgrpdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/SubGroupInsertandUpdate",
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
    $('#select_name').val('0');
    $('#txtname').val('');
    $('#txtsbgrpdesc').val('');
    $('#select_name').focus();
    $('#SbgrpId').val(0);
    $('#btndelete').hide();
}



function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}
function ShowSubgrouplist(result) {
    disable_datatable('tblsubgroup');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%;align=center;>Sl#</th><th width=10%>Group Name</th><th width=10%> Name</th><th width=35%> Brand</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].GrpNames + '</td><td>' + result[i].SbgrpName + '</td><td>' + result[i].SbgrpDescription + '</td><td align=center><a onclick="GetRows(' + result[i].SbgrpId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblsubgroup').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Group Name</th><th> Name</th><th>Brand</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblsubgroup');
}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Group Name' || title == 'Subgroup Name' || title == 'Description')
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

function ShowSubgroupGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#select_name').val(result[i].GroupId);
        $('#txtname').val(result[i].SbgrpName);
        $('#txtsbgrpdesc').val(result[i].SbgrpDescription);      
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#select_name').focus();
}



//Get List and Single Row from table

function GetRows(SbgrpId) {
   
    $('#SbgrpId').val(SbgrpId)
    var data = {};
    data.SbgrpId = SbgrpId;
    $.ajax({
        type: "POST",
        url: "../Master/SubGroupGetandGets",
        data: data,
        success: function (result) {
            if (SbgrpId == 0)
                ShowSubgrouplist(result.oList); 
            else
                ShowSubgroupGet(result.oList);

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





