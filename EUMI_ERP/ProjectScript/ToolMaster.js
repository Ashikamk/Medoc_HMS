$(document).ready(function () {
    Defaultfocus();
    GroupPageLoad();
    CategoryPageLoad();
    UnitpageLoad();
    $('#Code').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#ToolDesc').focus();
        }
    });
    $('#ToolDesc').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Pcs').focus();
        }
    });
    $('#Pcs').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#group').focus();
        }
    });
    $('#group').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#category').focus();
        }
    });
    $('#category').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#ToolQty').focus();
        }
    });
    $('#ToolQty').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#OtherDetails').focus();
        }
    });
    $('#OtherDetails').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmit').focus();
        }
    });
    $('#unitname').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#unitdesc').focus();
        }
    });
    $('#unitdesc').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnunitsave').focus();
        }
    });
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

});


function Defaultfocus() {
    $('#Code').focus();
}
function UnitpageLoad() {
    var data = {};
    data.UnitId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/UnitGetandGets",
        data: data,
        success: function (result) {
            UnitLoad(result.oList);
        }
    });
}
function UnitLoad(result) {
    var data = '<option value=0>Select</option>';
    $("#Pcs").empty();
    $("#Pcs").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Pcs").append("<option value='" + result[i].UnitId + "'>" + result[i].UnitName + "</option>");
        data += "<option value='" + result[i].UnitId + "'>" + result[i].UnitName + "</option>"
    }
  
}

function GroupPageLoad() {
    var data1 = {};
    data1.GrpId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/GroupGetandGets",
        data: data1,
        success: function (result) {
            GroupLoad(result.oList);
        }
    });
}



function CategoryPageLoad() {
    var data2 = {};
    data2.CategoryId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CategoryGetandGets",
        data: data2,
        success: function (result) {
            CategoryLoad(result.oList);
        }
    });
}
function GroupLoad(result) {
    $("#group").empty();
    $("#group").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {

        $("#group").append("<option value='" + result[i].GrpId + "'>" + result[i].GrpName + "</option>");
    }
    $("#grp").empty();
    $("#grp").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {

        $("#grp").append("<option value='" + result[i].GrpId + "'>" + result[i].GrpName + "</option>");
    }
}



function CategoryLoad(result) {
    $("#category").empty();
    $("#category").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {

        $("#category").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }
    $("#cat").empty();
    $("#cat").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {

        $("#cat").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }
}

function Addpopupwindow(Id) {
    $('#groupdiv,#categorydiv,#unitdiv').hide();
    $('#popupdiv').show();

    if (Id == 0) {
        $('#myheader').text('Unit Master');
        $('#unitdiv').show();
        $('#unitname').focus();

    }
 else if (Id == 1) {
        $('#myheader').text('Group Master');
        $('#groupdiv').show();
        $('#groupcode').focus();
    }

    else if (Id == 3) {
        $('#myheader').text('Category Master');
        $('#categorydiv').show();
        $('#catcode').focus();
    }
    else {
        //console.log('Invalid')

    }
}
function formrefresh() {
    $('#popupdiv').hide();
    $('#groupcode').val(''); $('#groupdesc').val(''); $('#groupname').val('');
    $('#grp').val(0); $('#sbgroupname').val(''); $('#sbgroupdesc').val('');
    $('#catcode').val(''); $('#catname').val(''); $('#catdesc').val('');
    $('#cat').val(0); $('#sbcatname').val(''); $('#sbcatdesc').val('');
    $('#unitname').val(''); $('#unitdesc').val('');

}

function SaveGroup(Flag) {
    if ($.trim($('#groupcode').val()) == "") {
        warningshow('Please Enter Group Code', 'groupcode');
    }
    else if ($.trim($('#groupname').val()) == "") {
        warningshow('Please Enter Group Name', 'groupname');
    }
    else {
        var data = {};
        data.GrpId = 0;
        data.GrpName = $('#groupname').val();
        data.GrpCode = $('#groupcode').val();
        data.GrpDescription = $('#groupdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/GroupInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    GroupPageLoad();
                    $('#group').focus();
                }
            }
        });
    }
}

function SaveUnit(Flag) {
    if ($.trim($('#unitname').val()) == "") {
        warningshow('Please Enter Unit Name', 'unitname');
    }
    else {
        var data = {};
        data.UnitId = 0;
        data.UnitName = $('#unitname').val();
        data.UnitDescription = $('#unitdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/UnitInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    UnitpageLoad();
                    $('#unit').focus();
                }
            }
        });

    }
}


function SaveCategory(Flag) {
    if ($('#catcode').val() == "") {
        warningshow('Please Enter Category Code', 'catcode');
    }
    else if ($('#catname').val() == "") {
        warningshow('Please Enter Category Name', 'catname');
    }
    else {
        var data = {};   //array
        data.CategoryId = 0;
        data.CategoryName = $('#catname').val();
        data.CategoryCode = $('#catcode').val();
        data.CategoryDescription = $('#catdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/CategoryInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    CategoryPageLoad();
                    $('#category').focus();
                }
            }
        });

    }
}

function SaveAndUpdate(Flag) {
    if ($('#Code').val() == "") {
        warningshow('Please Enter Code', 'Code');
    }
    else if ($('#ToolDesc').val() == "") {
        warningshow('Please Enter Description', 'ToolDesc');
    }
    else if ($('#category').val() == "") {
        warningshow('Please Select Category', 'category');
    }
    else if ($('#group').val() == "") {
        warningshow('Please Select Group', 'group');
    }
    else if ($('#ToolQty').val() == "") {
        warningshow('Please Enter Description', 'ToolQty');
    }
    else {
        var data = {};   //array
        data.ToolId = $('#ToolId').val();;
        data.Code = $('#Code').val();
        data.ToolDesc = $('#ToolDesc').val();
        data.category = $('#category').val();
        data.group = $('#group').val();
        data.Pcs = $('#Pcs').val();
        data.ToolQty = $('#ToolQty').val();
        data.OtherDetails = $('#OtherDetails').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/ToolsInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    thisformrefresh();
                }
            }
        });

    }


}




function thisformrefresh() {
    Defaultfocus();
    GroupPageLoad();
    CategoryPageLoad();
    UnitpageLoad();
    $('#Code').val('');
    $('#ToolDesc').val('');
    $('#group').val(0);
    $('#category').val(0);
    $('#ToolId').val(0);
    $('#Pcs').val(0);
    $('#ToolQty').val('');
    $('#OtherDetails').val('');
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}


function ShowToolslist(result) {
    disable_datatable('tblcategory');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1% ;align=center>Sl#</th><th>Code</th><th>Description</th><th>Category</th><th>Group</th><th width=3% >Qty.</th><th width=3% align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].Code + '</td><td>' + result[i].ToolDesc + '</td><td>' + result[i].CategoryName + '</td><td>' + result[i].GroupName + '</td><td align=center>' + result[i].ToolQty + '</td><td align=center><a onclick="GetRows(' + result[i].ToolId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblcategory').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Code</th><th>Description</th><th>Category</th><th>Group</th><th>Qty.</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblcategory');
}

//var oTable = $("#tblcategory").dataTable({
//    // Your other options here...
//    "bAutoWidth": true
//});
function ShowToolsGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#Code').val(result[i].Code);
        $('#ToolDesc').val(result[i].ToolDesc);
        $('#category').val(result[i].category);
        $('#group').val(result[i].group);
        $('#Pcs').val(result[i].Pcs);
        $('#ToolQty').val(result[i].ToolQty);
        $('#OtherDetails').val(result[i].OtherDetails);
        $('#Code').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}
function DeleteToolMaster() {
    $('#Confirmflag').val('delete'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to Delete?')
    $('#confirm').show();
    $('#confirmOk').focus();
}
function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'delete') {

        SaveAndUpdate(0);
    }

    $('#confirm').fadeOut();

}



function GetRows(ToolId) {
    $('#ToolId').val(ToolId)
    var data = {};
    data.ToolId = ToolId;
    $.ajax({
        type: "POST",
        url: "../Master/ToolsGetandGets",
        data: data,
        success: function (result) {
            if (ToolId == 0)
                ShowToolslist(result.oList);
            else
                ShowToolsGet(result.oList);

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

        if (title == 'Category') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Description') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Group') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Qty.') {
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
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3,4,5] }
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
    thisformrefresh();
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



//Show Warnig Popup right top
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}
//Numeric Only Text Boxes without Decimal Point
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
    else if (Status == 5) {
        formrefresh();
        swal('Data Cancelled', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 6) {
        formrefresh();
        swal('Data Transfer', "", "success");
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
