$(document).ready(function () {
    Defaultfocus();
    GroupPageLoad();
    CategoryPageLoad();
    loadlocation();
    $('#date').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }

    });
    $('input').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }
    });
    $('input').keydown(function (e) {
        if (e.which === 13) {
            $(this).closest('td').nextAll().eq(0).find('input').focus().select()
        }
    });
    $('select').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }
    });
    $('#code').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Description').focus();
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
            $('#Purvalue').focus();
        }
    });
    $('#Make').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Depreciatedvalue').focus();
        }
    });
    $('#Comments').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 27) {
            e.preventDefault();
            $('#btnsubmit').select().focus();
        }
    });
    $('#groupdesc').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btngroupsave').focus();
        }
    });
    $('#catdesc').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btncategorysave').focus();
        }
    });
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });
    $("#btncategorysave").focus(function (e) {
        $("#btncategorysave").removeClass("btn btn-outline-primary");
        $("#btncategorysave").addClass("btn btn-primary");
        SaveCategory(1);
    });
    $("#btngroupsave").focus(function (e) {
        $("#btngroupsave").removeClass("btn btn-outline-primary");
        $("#btngroupsave").addClass("btn btn-primary");
        SaveGroup(1);
    });



    $(document).keydown(function (e) {
         if (e.keyCode == 27) {                           //esc
             formrefresh();
             $('#QuantityPrintDiv').hide();
            }
    });
});

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
    $("#group").append("<option value='0'>-Select Group-</option>");
    for (var i = 0; i < result.length; i++) {

        $("#group").append("<option value='" + result[i].GrpId + "'>" + result[i].GrpName + "</option>");
    }
    $("#grp").empty();
    $("#grp").append("<option value='0'>-Select Group-</option>");
    for (var i = 0; i < result.length; i++) {

        $("#grp").append("<option value='" + result[i].GrpId + "'>" + result[i].GrpName + "</option>");
    }
}



function CategoryLoad(result) {
    $("#category").empty();
    $("#category").append("<option value='0'>-Select Category-</option>");
    for (var i = 0; i < result.length; i++) {

        $("#category").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }
    $("#cat").empty();
    $("#cat").append("<option value='0'>-Select Category-</option>");
    for (var i = 0; i < result.length; i++) {

        $("#cat").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }
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

function Defaultfocus() {
    $('#code').focus();
}

var LocnSelect = "";
function loadlocation() {
    var datafd = {};
    datafd.LocationId = 0;
    datafd.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserLocationGetandGets",
        data: datafd,
        success: function (result) {
            LocationLoadUser(result.oList);
        }
    });

}

function LocationLoadUser(result) {
    $("#locn").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
    }

    $("#LocCode").append(LocnSelect);
    $("#LocCode").val(UserLocationId);
    $("#locn").append(LocnSelect);


}



function formrefresh() {
    $('#popupdiv').hide();
    $('#groupcode').val(''); $('#groupdesc').val(''); $('#groupname').val('');
    $('#grp').val(0); $('#sbgroupname').val(''); $('#sbgroupdesc').val('');
    $('#catcode').val(''); $('#catname').val(''); $('#catdesc').val('');
    $('#cat').val(0); $('#sbcatname').val(''); $('#sbcatdesc').val('');

}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function Addpopupwindow(Id) {
    $('#groupdiv,#categorydiv').hide();
    $('#popupdiv').show();

    if (Id == 1) {
        //alert('groupdiv')
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
        console.log('Invalid')

    }
}
function generatebarcode() {
    var Code = $('#code').val(); if ($('#code').val() == '') { Code = 0; } JsBarcode("#barcode1", Code);
}
//Block ' in itemCode and Description

function isSinglqts(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 39) {
        evt.preventDefault();
        //warningshow('Digits Only')
        return false;
    }
    return true;

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
function isNumber(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}
function popuprefresh() {
    $('#popupdiv').hide();
    $('#txtname').val('');
    $('#select_areagroup').val('0');
    $('#txtcode').val('');
    $('#txtdescription').val('');
    $('#AreaId').val(0);
}

function SaveAndUpdate(Flag) {
    if ($('#code').val() == "") {
        warningshow('Please Enter Code', 'code');
    }
    else if ($('#Description').val() == "") {
        warningshow('Please Enter Description', 'Description');
    }
    else if ($('#Serialno').val() == "") {
        warningshow('Please Enter SerialNo', 'Serialno');
    }
    else if ($('#group').val() == "") {
        warningshow('Please Select Group', 'group');
    }
    else if ($('#category').val() == "") {
        warningshow('Please Select Category', 'category');
    }
    else if ($('#Purvalue').val() == "") {
        warningshow('Please Enter PurchaseValue', 'Purvalue');
    }
    else if ($('#locn').val() == "") {
        warningshow('Please Select Location', 'locn');
    }
    else if ($('#manufacturer').val() == "") {
        warningshow('Please Enter Manufactrer', 'manufacturer');
    }
    else if ($('#AccountDebit').val() == "") {
        warningshow('Please Enter Account Debit', 'AccountDebit');
    }
    else if ($('#AccountCredit').val() == "") {
        warningshow('Please Enter  Account Credit', 'AccountCredit');
    }
    else {
        var data = {};   //array
        data.AssetId = $('#AssetId').val();
        data.Code = $('#code').val();
        data.Description = $('#Description').val();
        data.Serialno = $('#Serialno').val();
        data.Group = $('#group').val();
        data.Category = $('#category').val();
        data.Purvalue = $('#Purvalue').val();
        data.Date = $('#date').val();
        data.Location = $('#locn').val();
        data.Year = $('#year').val();
        data.Manufacturer = $('#manufacturer').val();
        data.Make = $('#Make').val();
        data.Depreciatedvalue = $('#Depreciatedvalue').val();
        data.Depreciatedperc = $('#Depreciatedperc').val();
        data.AccountDebit = $('#AccountDebit').val();
        data.AccountCredit = $('#AccountCredit').val();
        data.Comments = $('#Comments').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/AssetRegisterInsertandUpdate",
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
function GetRows(AssetId) {
    $('#Loading').show();
    $('#AssetId').val(AssetId)
    var data = {};
    data.AssetId = AssetId;
    $.ajax({
        type: "POST",
        url: "../Master/AssetRegisterGetandGets",
        data: data,
        success: function (result) {
            if (AssetId == 0)
                ShowAssetRegisterlist(result.oList);
            else
                ShowAssetRegisterGet(result.oList);

        }
    });

}
function ShowAssetRegisterlist(result) {
    disable_datatable('tblasset');
    $('#Loading').hide();
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1% ;align=center>Sl#</th><th>Code</th><th>Description</th><th>Serial No</th><th>Category</th><th>Group</th><th width=3% >Purchase Date</th><th width=5% >Purchase Value</th><th width=3% align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].Code + '</td><td>' + result[i].Description + '</td><td>' + result[i].Serialno + '</td><td>' + result[i].CategoryName + '</td><td>' + result[i].GroupName + '</td><td>' + result[i].Date + '</td><td align=right>' + parseFloat(result[i].Purvalue).toFixed(Decimal) + '</td><td align=center><a onclick="GetRows(' + result[i].AssetId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblasset').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Code</th><th>Description</th><th>Serial No</th><th>Category</th><th>Group</th><th width=3% >Purchase Date</th><th width=5%>Purchase Value</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblasset');
}

function ShowAssetRegisterGet(result) {

    for (var i = 0; i < result.length; i++) {
        $('#AssetId').val(result[i].AssetId);
        $('#code').val(result[i].Code);
        $('#Description').val(result[i].Description);
        $('#Serialno').val(result[i].Serialno);
        $('#group').val(result[i].Group);
        $('#category').val(result[i].Category);
        $('#Purvalue').val(parseFloat(result[i].Purvalue).toFixed(Decimal));
        $('#locn').val(result[i].Location);
        $('#year').val(result[i].Year);
        $('#manufacturer').val(result[i].Manufacturer);
        $('#Make').val(result[i].Make);
        $('#Depreciatedvalue').val(parseFloat(result[i].Depreciatedvalue).toFixed(Decimal));
        $('#Depreciatedperc').val(parseFloat(result[i].Depreciatedperc).toFixed(Decimal));
        $('#AccountDebit').val(result[i].AccountDebit);
        $('#AccountCredit').val(result[i].AccountCredit);
        $('#Comments').val(result[i].Comments);
        generatebarcode();
        $('#Code').focus();
    }
    $('#Loading').hide();
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}
function DeleteAssetRegister() {

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
function QuantityBarcode() {
    $('#PrintQty').val(1);
    $('#QuantityPrintDiv').show();
    $('#PrintQty').focus();
    $('#PrintQty').select();
}
function closetable(){
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').hide();
    Defaultfocus();

}
function PrintBarcodesItemMaster(PrintQuantity) {

    $('#tblBarcode').html('');
    var txt = "<tr><th></th></tr>";
    var Code = $('#code').val();
    var Description = $('#Description').val();


    for (var j = 0; j < PrintQuantity ; j++) {


        txt += '<tr><td>CT~~CD,~CC^~CT~</td></tr>';
        txt += '<tr><td>^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR4,4~SD15^JUS^LRN^CI0^XZ</td></tr>';
        txt += '<tr><td>^XA</td></tr>';
        txt += '<tr><td>^MMT</td></tr>';
        txt += '<tr><td>^PW812</td></tr>';
        txt += '<tr><td>^LL0508</td></tr>';
        txt += '<tr><td>^LS0</td></tr>';
        txt += '<tr><td>^FO320,256^GFA,01536,01536,00024,:Z64:</td></tr>';
        txt += '<tr><td>eJxjYBgFo2DgAfsHCM3DDmT/ATIS6o9/qGdg4IeJMzEwMP8AMg7Y9//4D+QLQMRlQOrBrAIWmYMNDDwSH/oMD+48eILtEQcTQ5uaRYMCDwdQXKb477nyj98//2H/LsPGeKz+74EEGZvjQPMfc/SlKbcpW/AlW/D/6Cue0fC//8c/Bgb547L3/D/zf5eQKTbg/9hTLNnwX/4j0F0STByz+j/zf5LgUFbgYexIkmw4IAE0HugOmetn2HnYDGSKC2SYZdKNGQ/IJB5gYLBgsnjcl8SXZsCT/ICDWeKZMUODRTJQvQHzh+/sx9mPf5A/eED+85/jxoz/BYqBvjBgfPCYuYm5eYN0Y4P8xxltSoz/DYxRQorxAPYQ5G/AIU5ulIyCEQAA715fmQ==:419B</td></tr>';
        txt += '<tr><td>^BY2,3,155^FT103,240^BCN,,Y,N</td></tr>';
        txt += '<tr><td>^FD>:' + Code + '^FS</td></tr>';
        txt += '<tr><td>^FT105,72^A0N,25,21^FH\^FD' + Description + '^FS</td></tr>';
        txt += '<tr><td>^PQ1,0,1,Y^XZ</td></tr>';
        txt += '<tr></tr>'


    }
    $('#tblBarcode').append(txt);
    PrintBarcode();
    $('#QuantityPrintDiv').hide();
}
function PrintBarcode() {
    var titles = [];
    var data = [];
    $('.dataTableA th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableA tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_barcode.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}
function prepCSVRow(arr, columnCount, initial) {
    var row = ''; // this will hold data
    var delimeter = ''; // data slice separator, in excel it's `;`, in usual CSv it's `,`
    var newLine = '\r\n'; // newline separator for CSV row
    function splitArray(_arr, _count) {
        var splitted = [];
        var result = [];
        _arr.forEach(function (item, idx) {
            if ((idx + 1) % _count === 0) {
                splitted.push(item);
                result.push(splitted);
                splitted = [];
            } else {
                splitted.push(item);
            }
        });
        return result;
    }
    var plainArr = splitArray(arr, columnCount);
    plainArr.forEach(function (arrItem) {
        arrItem.forEach(function (item, idx) {
            row += item + ((idx + 1) === arrItem.length ? '' : delimeter);
        });
        row += newLine;
    });
    return initial + row;
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

function SearchItem() {
    $('.form-control').val('');
    $('#btndelete').hide();  
    $('#code').hide();
    $('#searchcode').val('');
    $('#searchcode').show();
    $('#btnsubmit').prop("disabled", true);
    $('#btnsubmit').hide();
    $('#searchbutton').removeClass();
    $('#searchbutton').addClass('btn btn-warning');
    $('#searchcode').focus();

}

function thisformrefresh() {
    Defaultfocus();
    GroupPageLoad();
    CategoryPageLoad();
    loadlocation();
    $('#date').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
   $('#AssetId').val(0);
   $('#code').val('');
   $('#Description').val('');
   $('#Serialno').val('');
   $('#group').val(0);
   $('#category').val(0);
   $('#Purvalue').val('');
   $('#locn').val(0);
   $('#year').val('');
   $('#manufacturer').val('');
   $('#Make').val('');
   $('#Depreciatedvalue').val('');
   $('#Depreciatedperc').val('');
   $('#AccountDebit').val('');
   $('#AccountCredit').val('');
   $('#Comments').val('');
   $('#btndelete').hide();
   generatebarcode();
}


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
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Serial#' && title != ' ' && title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        }
        if (title == 'Code' || title == 'Description' || title == 'Serial No' || title == 'Category' || title == 'Group' || title == 'Purchase Value' || title == 'Purchase Date') {
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
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5] }
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
