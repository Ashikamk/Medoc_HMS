
var i = 1;
var editflag = 0;
var qtyflag = 0;
var copyflag = 0;
var LOcQty = 0;

$(document).ready(function () {


    $("#Comments").keypress(function (e) {
        if (e.which == 35) {
            $("#Comments").val($("#Comments").val()+'-');
            return false;
        }

    });
    
   
    deptload();
    GetDepartment();
    var decimail = 2;
    var a = '0.00';
    $('#GrandTotal').val(a);
    $('#ToLocation').focus();
    serialnoload();
    AccountLoad(1);
    loadlocation(0,0);
   // $('#Location').prop('disabled', true);
   // $('#Location').css('background-color', 'white');
    $('#txttotal').css('background-color', 'white');
    $('#GrandTotal').css('background-color', 'white');
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)

    });

    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserDepartmentGetandGets",
        data: data,
        success: function (result) {
            $("#UserDepartments").empty();
            DeptSelect = "<option value=0>-All-</option>";
            for (var j = 0; j < result.oList.length; j++) {
                DeptSelect += "<option value='" + result.oList[j].DepartmentId + "'name='" + result.oList[j].DepartmentName + "'>" + result.oList[j].DepartmentName + "</option>";
            }
            $("#UserDepartments").append(DeptSelect);
        }
    });

    $('#btnok').click(function () {
        // PrintthisBillWindows('LOCATIONTRANSFER', i, 'MAIN');
        PrintthisBill(0);
        alertpopuprefresh();
        formrefresh();
    });
    $('#btncnclalrt').click(function () {
        alertpopuprefresh();
        formrefresh();
    });

    $("#btnokalert1").focus(function (e) {
        $("#btnokalert1").removeClass("btn btn-outline-primary");
        $("#btnokalert1").addClass("btn btn-primary");
    });

    $("#btnokalert1").focusout(function (e) {
        $("#btnokalert1").removeClass("btn btn-primary");
        $("#btnokalert1").addClass("btn btn-outline-primary");
    });

    $('#btndelete').click(function (e) {                     

        if ($('#TRNo').val() == '') {
            warningshow('Please Enter transfer Number', 'TRNo');
        }
        else {
            if ($('#tblLocationTransfer tr td').length == 0) {
                Showalerts(3, $('#TRNo').val());
            }
            else {
                $('#confirm').show();
                $('#confirmOk').focus();
                $('#Confirmflag').val('cancel'); $('#ConfirmRowId').val(0);
                $('#confirmmessage').text('Do you want to Cancel the Transfer?');
            }
        }

    });

    $('#TRDate,#ViewFromDate,#ViewToDate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }

    });
    $("#btnok").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncnclalrt").focus();
        }
    });
    $("#btncnclalrt").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnok").focus();
        }
    });
    $('#txtquantity').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtrate').select();
        }
    });

    $('#txtrate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnadd').focus();
        }
    });
    $("#txtotp").keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#otpremarks").focus();
        }
    });
    $("#otpremarks").keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#btnotpsave").focus();
        }
    });

    $("#btncnclsave").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btndivdelete").focus();
        }
    });
    $("#btndivdelete").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncnclsave").focus();
        }
    });
    $("#btnotpsave").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnotpcancel").focus();
        }
    });
    $("#btnotpcancel").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btnotpsave").focus();
        }
    });
    $("#cancelotp").keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#cancelotpremarks").focus();
        }
    });
    $("#cancelotpremarks").keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#btncnclsave").focus();
        }
    });
    $('#TRNo').keyup(function (e) {
        e.preventDefault();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (entrkey == 8) {
            cleartext();
        }
    });
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

});

function deptload() {
    var data = {};
    data.DepartmentId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            $("#Deptcode").val(result.oList[0].DepartmentCode);
            $('#Deptid').val(ERPDeptId);
        }
    });
}
function GetDepartment() {
    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserDepartmentGetandGets",
        data: data,
        success: function (result) {
            $("#User").val(result.oList[0].User);

        }
    });
}



function serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../../Common/SlNoGetandGets",
        data: srlno,
        success: function (result) {
            getslno(result.oList);
        }
    });
}

function getslno(result) {
    //for (var k = 0; k < result.length; k++) {
    //}
    $('#TRNo').val(result[0].trNo);
    JsBarcode("#barcode1",ERPDeptId + '-' + $('#TRNo').val());
}
var LocationSelect = "";

function UnitLoad(result) {
    $("#select_unit0").empty();
    UnitSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "' name=" + result[i].UnitName + ">" + result[i].UnitName + "</option>"
    }
    $("#select_unit0").append(UnitSelect);
}

function loadlocation(FromLocation,ToLocation) {

    var datafd = {};
    datafd.LocationId = 0;
    datafd.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserLocationGetandGets",
        data: datafd,
        success: function (result) {
            LocationLoadUser(result.oList,FromLocation);
        }
    });



    var data4 = {};
    data4.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data4: data4,
        success: function (result) {
            LocationLoad(result.oList,ToLocation);
        }

    });
}

function LocationLoadUser(result, FromLocation) {
    if (copyflag != 1) { $("#LocationHide").empty(); }
    $("#Location").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {

        LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";

    }
    if (copyflag == 1) {
        $("#Location").append(LocationSelect);
        $("#Location").val(FromLocation);
    }
    else {
        $("#Location").append(LocnSelect);
        $("#LocationHide").append(LocnSelect);
        $('#Location').val(UserLocationId);

    }
}
function LocationLoad(result,ToLocation) {
    $("#ToLocation").empty();
    LocationSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocationSelect += "<option value='" + result[i].LocationId + "' name=" + result[i].LocationName + ">" + result[i].LocationName + "</option>";
    }
    $("#ToLocation").append(LocationSelect);
    if (copyflag == 1) {
        $("#ToLocation").val(ToLocation);
    }
}


function checkpdcttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#ProductId0').val(0);
        $('#select_unit0').val(0);
        $('#txtquantity').val('');
        $('#txttotal').val('');
        $('#txtrate').val('');
        productpopuprefresh();
    }
}
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}
function AccountLoad(flag) {
    var accno = {};
    accno.DeptId = ERPDeptId;
    accno.flag = flag;

    $.ajax({
        type: "POST",
        url: "../../inventory/AccountNoGetandGets",
        data: accno,
        success: function (result) {
            getacno(result.oList);
        }
    });
}
function getacno(result) {
    for (var k = 0; k < result.length; k++) {

        $('#DebitAccount').val(result[k].AccCode);
        $('#hiddendebit').val(result[k].AccountId);
        $('#CreditAccount').val(result[k].CAccCode);
        $('#hiddenCredit').val(result[k].CAccountId);
        $('#txtdacnt').val(result[k].DAccountDescription);
        $('#txtcacnt').val(result[k].AccountDescription);
    }
}

//total=qty*rate
function tot() {
    var qty = parseInt($('#txtquantity').val() || 0);
    var rate = parseFloat($('#txtrate').val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var total = parseFloat(qty * rate).toFixed(Decimal);
    $('#txttotal').val(parseFloat(total).toFixed(Decimal));
}
function tot_row(RowId) {
    if (parseInt($('#txtqnty' + RowId).val() || 0) > parseInt($('#hiddenqty' + RowId).val() || 0)) {
        warningshow(' Available Quantity Is ' + $('#hiddenqty' + RowId).val(), 'txtqnty' + RowId);
        $('#txtqnty' + RowId).val($('#hiddenqty' + RowId).val())
    }
    var qty = parseInt($('#txtqnty' + RowId).val() || 0);
    var rate = parseFloat($('#rate' + RowId).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var total = parseFloat(qty * rate).toFixed(Decimal);
    $('#tamnt' + RowId).val(parseFloat(total).toFixed(Decimal));
}
//product add into grid

function GetBin(Id, ItemId) {
    var data = {};
    data.ItemId = ItemId;
    $.ajax({
        type: "POST",
        url: "../Master/ItemGetandGets",
        data: data,
        success: function (result) {
            LocId = $('#Location' + Id).val();
            ItemBinGet(result, Id, LocId);
        }
    });
}


//Load Stock Qty When Location Change in Multiple Product Selection List for Qty Checking 
function ItemBinGet(result, id, LocId) {

    if (result.length > 0)
        var bins = '';
    if (LocId == 1) { if (result[0].Bin_A != '') { bins = bins + result[0].Bin_A; } }
    else if (LocId == 2) { if (result[0].Bin_B != '') { bins = bins + result[0].Bin_B; } }
    else if (LocId == 3) { if (result[0].Bin_C != '') { bins = bins + result[0].Bin_C; } }
    else if (LocId == 4) { if (result[0].Bin_D != '') { bins = bins + result[0].Bin_D; } }
    else if (LocId == 5) { if (result[0].Bin_E != '') { bins = bins + result[0].Bin_E; } }
    else if (LocId == 6) { if (result[0].Bin_F != '') { bins = bins + result[0].Bin_F; } }
    else if (LocId == 7) { if (result[0].Bin_G != '') { bins = bins + result[0].Bin_G; } }
    else if (LocId == 8) { if (result[0].Bin_H != '') { bins = bins + result[0].Bin_H; } }
        $("#PopUpDetailbin").text(bins);
}



function productadd() {
    var bins = '';
    var rowcount = $('#tblLocationTransfer tr').length;
    var ProductFlag = 0;
    for (p = 1; p <= i; p++) {
        if ($('#ProductId' + p).val() == $("#ProductId0").val()) {
            ProductFlag = 1;
        }
    }
    var slno = parseInt($('#slnotxt').val())
    if ($.trim($('#txtproduct0').val()) == "") {
        warningshow('Please Select Product', 'txtproduct0');
        return false;
    }
    else if ($('#Location').val() == ($('#ToLocation').val())) {
        warningshow('From Location and To Location Cannot be same', 'ToLocationIn');
        return false;
    }
    else if ($("#ProductId0").val() == 0) {
        warningshow('Please Enter a Valid Product', 'txtproduct0');
    }
    else if ($.trim($('#txtquantity').val()) == "") {
        warningshow('Please Select Quantity', 'txtquantity');
        return false;
    }
    else if ($.trim($('#txtquantity').val()) == 0) {
        warningshow('Quantity cannot be Zero', 'txtquantity');
        $('#txtquantity').val('');
        return false;
    }
    //else if ($.trim($('#txtrate').val()) == 0) {
    //    warningshow('Rate cannot be Zero', 'txtrate');
    //    $('#txtrate').val('');
    //    return false;
    //}
    else if ($.trim($('#select_unit0').val()) == '0') {
        warningshow('Please select Unit', 'select_unit0');
        return false;
    }
    else if ($.trim($('#ProductId0').val() == 0) && (qtyflag == 1)) {
        warningshow('Not Enough Stock!', 'ProductId0');
        return false;
    }
    //else if ($.trim($('#txtrate').val()) == '') {
    //    warningshow('Rate Cannot Be Null', 'txtrate');
    //    return false;
    //}
    //else if ($.trim($('#txttotal').val()) == 0) {
    //    warningshow('Enter Valid Rate', 'txtrate');
    //    $('#txtrate').select();
    //    return false;
    //}
    else {
        if (rowcount == 0) {
            i = 1;
        }
        if (ProductFlag == 1) {
            var Res = confirm('Product Already Added! Do You Want to Continue');
            if (Res == false) {
                ClearProductRow();
                return false;
            }
        }
        if ($("#PopUpDetailbin").text() != '')
            bins = $("#PopUpDetailbin").text();
        //alert('bins'+bins)
        var slno = parseInt(i)
        var Count = $('#tblLocationTransfer tr').length;
        var serialNo = rowcount + 1;
        var ProdRowEdit = "<tr id=" + 'row' + slno + " class= jsgrid-row >" +
                "<td  id=" + 'td' + slno + " class= jsgrid-cell  style= width:3%;text-align:center >"
                 + serialNo + "<input type='hidden' id='SlNo" + slno + "' value=" + Count + "></td>" +
                 "<td class= 'jsgrid-cell jsgrid-align-left'  style='width:15%;text-align:center' ><input type='hidden' id='ProductId" + slno + "' value='" + $('#ProductId0').val() + "'/> <input typ='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
                 + $("#txtproduct0").val() + "'>  </td>" +
                 "<td class= 'jsgrid-cell jsgrid-align-left'  style='width:20%;text-align:center' display='none;'> <input type='text' class='form-control'  disabled  style='background-color:white;height:30px;' id='txtdesc" + slno + "' value='"
                 + $("#Description").val() + "'> </td>" +
                 "<td class= 'jsgrid-cell jsgrid-align-left' style='width:5%;' ><select id=" + 'select_unit' + slno + " class='form-control' disabled=disabled style='background-color:white;height:30px;' >"
                 + UnitSelect + "</select></td>" +
                 "<td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:5%;' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;'  onkeyup='tot_row(" + slno + ")' onkeypress='return isNumber1(event)' id='txtqnty" + slno + "' value='"
                 + parseInt($('#txtquantity').val()||0) + "'><input type='hidden' id='hiddenqty" + slno + "' value='" + LOcQty + "'/>  </td>" +
                 "<td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;' ><input typ='text' class='form-control text-right' disabled=disabled style='background-color:white;height:30px;' onkeyup='tot_row(" + slno + ")'  onkeypress='isNumbercheck(event,this)'  id='rate" + slno + "' value="
                 + parseFloat($('#txtrate').val() || 0).toFixed(Decimal) + "></td>" +
                 "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:6%;' ><input typ='text' class='form-control text-right' disabled=disabled  style='background-color:white;height:30px;background-color:white'readonly onkeyup=''   id='tamnt" + slno + "' value="
                 + parseFloat($('#txttotal').val() || 0).toFixed(Decimal) + "><input style='display:none' id=" + 'Bin' + slno + " value='" + bins + "'></td>" +
                 "<td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:3%;' ><input class= 'jsgrid-button jsgrid-edit-button' onclick='Editrow(" + slno + ")' id='Edit' type=button title=Edit ><input class= 'jsgrid-button jsgrid-delete-button'  type= button id='delete' title= Delete onclick='rowdelete(" + slno + ")' ></td>" +
                 "<td id='Update"
                 + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:3%;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit'></tr>";

        $('#tblLocationTransfer').append(ProdRowEdit);
        $('#select_unit' + slno).val($('#select_unit0').val());
        ClearProductRow();
        grandtotal(slno);
        i++;
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        productpopuprefresh();
        $("#txtproduct0").focus();
    }
}




function checkquantity() {
    if (parseInt($('#txtquantity').val()) > parseInt($('#hiddenquantitycheck').val())) {
        $('#txtquantity').val('');
        warningshow(' Available Stock is:' + $('#hiddenquantitycheck').val() + '');
    }
}
//floating point
function isNumber(evt, Id) {
    $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
    if (e.which != 8 && e.which != 0 && (e.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
        warningshow('Digits Only')
        return false;
    }
}

//allow decimal
function isNumber1(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    else {
        return true;

    }
}
function Editrow(RowId) {
    editflag = editflag + 1;
    $('#row' + RowId).children('td,th').css('background-color', 'rgb(232,226,226)');
    $('#Edit' + RowId).hide();
    $('#Update' + RowId).show();
    desc = $('#txtdesc' + RowId).val();
    select_unit = $('#select_unit' + RowId).val();
    qty = $('#txtqnty' + RowId).val();
    rate = $('#rate' + RowId).val();
    total = $('#tamnt' + RowId).val();
    $('#select_unit' + RowId).prop('disabled', false);
    $('#txtqnty' + RowId).prop('disabled', false);
    $('#rate' + RowId).prop('disabled', false);
    //$('#tamnt' + RowId).prop('disabled', false);
    grandtotal(i);
}

function Updaterow(RowId) {
    var c = parseFloat($('#rate' + RowId).val());
    $('#rate' + RowId).val(isNaN(c) ? 0 : c);

    if ($('#txtqnty' + RowId).val() == '0') {
        warningshow('Quantity cannot be Zero', 'txtqnty' + RowId);
        return false;
    }
    else if ($('#txtqnty' + RowId).val() == '') {
        warningshow('Please Enter Quantity', 'txtqnty' + RowId);
        return false;
    }
    //else if ($('#rate' + RowId).val() == '0') {
    //    warningshow('Price cannot be Zero', 'rate' + RowId);
    //    $('#rate' + RowId).select();
    //    return false;
    //}
    //else if ($('#rate' + RowId).val() == '') {
    //    warningshow('Please Enter Price', 'rate' + RowId);
    //    $('#rate' + RowId).select();
    //    return false;
    //}
    else if ($('#select_unit' + RowId).val() == 0) {
        warningshow('Please select Unit', 'select_unit' + RowId);
        return false;
    }
    else {
        editflag = editflag - 1;
        $('#row' + RowId).children('td,th').css('background-color', 'white');
        $('#Update' + RowId).hide();
        $('#Edit' + RowId).show();
        grandtotal(RowId);
        $('#txtdesc' + RowId).prop('disabled', true);
        $('#select_unit' + RowId).prop('disabled', true);
        //$('#quantity_' + RowId).prop('disabled', true);
        $('#txtqnty' + RowId).prop('disabled', true);
        $('#rate' + RowId).prop('disabled', true);
        $('#tamnt' + RowId).prop('disabled', true);
        var ratenum = parseFloat($("#rate" + RowId).val() || 0);
        $("#rate" + RowId).val(ratenum.toFixed(Decimal));
        grandtotal(i);
    }
}

function CancelEditrow(RowId) {
    editflag = editflag - 1;
    $('#row' + RowId).children('td,th').css('background-color', 'white');
    $('#Update' + RowId).hide();
    $('#Edit' + RowId).show();
    $('#txtdesc' + RowId).val(desc);
    $('#select_unit' + RowId).val(select_unit);
    $('#txtqnty' + RowId).val(qty);
    $('#rate' + RowId).val(rate);
    $('#tamnt' + RowId).val(total);
    $('#txtdesc' + RowId).prop('disabled', true);
    $('#select_unit' + RowId).prop('disabled', true);
    //$('#quantity_' + RowId).prop('disabled', true);
    $('#txtqnty' + RowId).prop('disabled', true);
    $('#rate' + RowId).prop('disabled', true);
    $('#tamnt' + RowId).prop('disabled', true);
    grandtotal(i);
}

function ClearProductRow() {
    $('#txtproduct0').val('');
    $('#txtquantity').val('');
    $('#txtrate').val('');
    $('#ProductId').val('');
    $('#txttotal').val('');
    $('#select_unit0').val('0');
    $('#GrandTotal').val('');
    $('#ProductId0').val('');
    $('#hiddenquantitycheck').val('0');
}
function rowdelete(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('delete'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want to Delete this Record?');
}

function ConfirmboxResult(Result, status, rowid) {
 if (Result == 'true' && status == 'update') {
    transactionupdate();
   }
 else  if (Result == 'true' && status == 'delete') {
        deleterow(rowid)
    }
    else  if (Result == 'true' && status == 'save') {
        transactionsave();
    }
    else if (Result == 'true' && status == 'createnew') {
        formrefresh();
    }
  
    else if (Result == 'true' && status == 'cancel') {
        $('#CancelOTPDiv').show();
        $('#cancelotp,#cancelotpremarks').prop('disabled', false);
        $('#cancelotp,#cancelotpremarks').val('');
        $('#cancelotp').focus();

    }
    else if (Result == 'true' && status == 'copy') {
        copyflag = 1;
        for (c = 1; c <= i; c++) {
            $('#row' + c).remove();
            enablecopy(0,0);
        }
    }
   
    $('#confirm').fadeOut();
}


function deleterow(RowId) {
    var sllno = 1;
    var rowslno = parseInt(sllno);
    $('#row' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#txtprd' + j).val() != undefined) {
            $('#td' + j).text(sllno);
            sllno++;
        }
    }
    $('#txttotal').val('');
    grandtotal(i)
    $('#txtproduct0').focus();
}



function formrefresh() {
    $('#confirmOk').prop("disabled", false);

    if (editflag != 0) {
        warningshow('You are in Edit Mode');
    }
    else {
        deptload();
        GetDepartment();
        copyflag = 0;
        $('#btnsubmit').show();
        //$('#btnlist').show();
        $('#btnprint').hide();
        $('#TRNo').prop('disabled', true);
        $('#btnsubmit').prop('disabled', false);
        $('#btnlist').prop('disabled', false);
        $('#TRDate').prop('disabled', false);
        $('#ToLocation').prop('disabled', false);
        $('#DebitAccount').prop('disabled', false);
        $('#Comments').prop('disabled', false);
        $('#CreditAccount').prop('disabled', false);
        $('#txtproduct0').prop('disabled', false);
        $('#select_unit0').prop('disabled', false);
        $('#txtquantity').prop('disabled', false);
        $('#txtrate').prop('disabled', false);
        $('#DebitAccount').val('');
        $('#STONo').val('');
        $('#ToLocation').val('0');
        $('#DebitAccount').val('');
        $('#CreditAccount').val('');
        $('#Comments').val('');
        $('#GrandTotal').val('');
        $('#hiddendebit').val('');
        $('#txtdacnt').val('');
        $('#txtcacnt').val('');
        $('#hiddenCredit').val('');
        $('#TRNoCopy').val('');
        productpopuprefresh();
        $('#btnaddprd').prop('disabled', false);
        $('#btnadd').prop('disabled', false);
        $('#txttotal').css("background-color", 'white');
        $('#TRDate').css("background-color", 'white');
        $('#Location').prop('disabled', false);
        //$('#Location').css('background-color', 'white');
        $('#GrandTotal').css("background-color", 'white');
        $('#hiddenquantitycheck').val('0');
        $('#btndelete,#btnsaveedit,#btnedit').hide();
        var a = '0.00';
        $('#GrandTotal').val(a);
        $("#tblLocationTransfer tr").remove();
        serialnoload();
        AccountLoad(1);
        loadlocation(0,0);
        $('#Location').val(UserLocationId);
        $('#TRDate').val(CurDate);
        $('#ToLocation').focus();
        $('#tour1').fadeOut();
        $('#NoofQty').val(0);
        ClearProductRow();
    }
}
//new
function createnew() {
    if (editflag != 0) {
        warningshow('You Are In Edit Mode');
    }
    else {
        var rowcount = document.getElementById('tblLocationTransfer').rows.length;
        if (rowcount > 0 && copyflag == 0) {
            $('#Confirmflag').val('createnew'), $('#ConfirmRowId').val(1)
            $('#confirmmessage').text('Data Will be Lost.Do you want to Continue?')
            $('#confirm').show();
            $('#confirmOk').focus();
        }
        else {
            formrefresh();
            $('#btnsubmit').show();
            //$('#btnlist').show();
            $('#btnprint').hide();
            $('#btnedit').hide();
            $('#btndelete').hide();
            $('#btnsaveedit').hide();
        }
    }

}
//find grand total of items in grid
function grandtotal(slno) {
    var grandtot = 0; var NOQty = 0;
    $('#NoofQty').val(0)
    $('#GrandTotal').val('');
    for (var i = 1; i <= slno; i++) {
        grandtot = grandtot + parseFloat($('#tamnt' + i).val() || 0);
        NOQty += parseInt($('#txtqnty' + i).val() || 0);

    }
    $('#GrandTotal').val(grandtot.toFixed(Decimal));
    $('#NoofQty').val(NOQty)
}
//list product details in popup
var custstats = "Last Selling Price";


function CustPrdctLoad(result) {
    $('#PopUpDetailbin').text('');
    for (var n = 0; n < result.length; n++) {
       
        var bins = '';
        if ($('#ToLocation').val() == 1) { if (result[n].Bin_A != '') { bins = bins + result[n].Bin_A; } }
        else if ($('#ToLocation').val() == 2) { if (result[n].Bin_B != '') { bins = bins + result[n].Bin_B; } }
        else if ($('#ToLocation').val() == 3) { if (result[n].Bin_C != '') { bins = bins + result[n].Bin_C; } }
        else if ($('#ToLocation').val() == 4) { if (result[n].Bin_D != '') { bins = bins + result[n].Bin_D; } }
        else if ($('#ToLocation').val() == 5) { if (result[n].Bin_E != '') { bins = bins + result[n].Bin_E; } }
        else if ($('#ToLocation').val() == 6) { if (result[n].Bin_F != '') { bins = bins + result[n].Bin_F; } }
        else if ($('#ToLocation').val() == 7) { if (result[n].Bin_G != '') { bins = bins + result[n].Bin_G; } }
        else if ($('#ToLocation').val() == 8) { if (result[n].Bin_H != '') { bins = bins + result[n].Bin_H; } }

        //alert('ToLocation' + $('#ToLocation').val())
       


        var custstat;
        if (result[n].LastSellingPrice == 0) {
            custstat = "LSP";
        }
        else {
            custstat = "LSP";
        }
        $('#productpopupdiv').show();
        $('#prodheader').text('Location Stock Details');
        $('#productdiv').show();
        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");
        var strr3 = strr2.replace(/,/gi, "&nbsp;");

         var ProdRow = "<tr class='jsgrid-row' id='pdctrow'>" +
           "<td style='border:none;font-weight:500;font-size:150%' class='text-left'><b>" + $("#Description").val() + "</b></td>" +
           "<td style='border:none;font-weight:500' class='text-left'><table width='100%'><tr><td style='border:none;font-weight:500' class='text-left'><b>C : </b>" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>LP : </b>" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>" + custstat + " : </b>" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>Stock : </b>" + (result[n].Sumtotqty || 0) + "</td>" + "</tr></table></td></tr>" +
           "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr2 + "</td ></tr>";

         if (bins != "") {
             $('#PopUpDetailbin').text(bins);
            
         }

        $('#tblproductdetails').append(ProdRow);
        $('#tbllocqty').attr('border', '1');
        $('#tbllocqty').attr('bordercolor', 'white');
       // alert( $('#PopUpDetailbin').text())
    }

}
function productpopuprefresh() {
    $('#productpopupdiv').hide();
    $('#pdctrow').remove();
    $('#pdctrow1').remove();
    $('#custlsp').hide();
}

$(document).keydown(function (e) {
    if (e.altKey && e.keyCode == 83) {                        //Alt+S
        SaveAndUpdate(1)
    }
    else if (e.altKey && e.keyCode == 76) {                 //Alt+L        
        enablenobox()
    }
    else if (e.altKey && e.keyCode == 67) {                  //Alt+C
        createnew();
    }
    else if (e.keyCode == 27) {                           //esc    
        $('#productpopupdiv,#purchaseViewForm,#CancelOTPDiv,#OTPDiv').hide();
    }
});

function SaveAndUpdate(Flag) {
    rowcount = $('#tblLocationTransfer tr').length;
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
    }
    else if (copyflag == 1) {
        return false;
    }
    else if ($('#Location').val() == 0 || $('#Location').val() == '' || $('#Location').val() == undefined || $('#Location').val() == null) {
        warningshow('Please Select From Location', 'Location');
        return false;
    }
    else if ($('#ToLocation').val() == 0 || $('#ToLocation').val() == '' || $('#ToLocation').val() == undefined || $('#ToLocation').val() == null) {
        warningshow('Please Select To Location', 'ToLocation');
        return false;
    }
    else if (($('#DebitAccount').val() != '') && ($('#hiddendebit').val() == 0)) {
        warningshow('Please Select A Valid Debit Account', 'DebitAccount');
        return false;
    }
    else if (($('#CreditAccount').val() != '') && ($('#hiddenCredit').val() == 0)) {
        warningshow('Please Select A Valid Credit Account', 'CreditAccount');
        return false;
    }
    else if ($('#DebitAccount').val() == '') {
        warningshow('Please Select A  Debit Account', 'DebitAccount');
        return false;
    }
    else if ($('#CreditAccount').val() == "") {
        warningshow('Please Select A Credit Account', 'CreditAccount');
        return false;
    }
    else if ($('#Location').val() == ($('#ToLocation').val())) {
        warningshow('From Location and To Location Cannot be same', 'ToLocationIn');
        return false;
    }
    else if (rowcount == 0) {
        warningshow('No Products Added', 'txtproduct0');
        return false;
    }
       
    else {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('save'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('');
        $('#confirmmessage').append('Location Transfer <br> from ' + ($('#Location option:selected').html()) + ' to ' + ($('#ToLocation option:selected').html()) + '<br>' + ' Do you want to save ?');
    }
}


function transactionsave()
{
    $('#Loadingsave').show();
    $('#btnsubmit').prop("disabled", true);
    //$('#confirmOk').prop("disabled", true);

    var oArray = new Array();
    for (var k = 1; k < i; k++) {
        var ProductId = parseInt($('#ProductId' + k).val() || 0);
        var Description = $('#txtdesc' + k).val();
        var UnitId = $('#select_unit' + k).val();
        var Quantity = $('#txtqnty' + k).val();
        var Price = $('#rate' + k).val();
        var Total = $('#tamnt' + k).val();
        var FromLocation = $('#Location').val();
        var ToLocation = $('#ToLocation').val();
        var trNo = $('#TRNo').val();
        var TRDate = $('#TRDate').val();
        var DebitAccount = $('#hiddendebit').val();
        var CreditAccount = $('#hiddenCredit').val();
        var Comments = $('#Comments').val();
        var UId = ERPUserId;
        var DeptId = ERPDeptId;
        DelFlag = 1;




        if (ProductId != 0) {
            oArray.push({
                'ProductId': ProductId,
                'Description': Description,
                'UnitId': UnitId,
                'Quantity': Quantity,
                'Price': Price,
                'Total': Total,
                'trNo': trNo,
                'FromLocation': FromLocation,
                'ToLocation': ToLocation,
                'TRDate': TRDate,
                'DebitAccount': DebitAccount,
                'CreditAccount': CreditAccount,
                'Comments': Comments,
                'UId': UId,
                'DeptId': DeptId,
                'DelFlag': DelFlag
            })
        }
    }
    if (oArray != "") {
        var data = { 'StockTransferOutModel': oArray };
        $.ajax({
            type: "POST",
            url: "../../inventory/LocationTransferInsert",
            data: data,
            success: function (result) {
                $('#Loadingsave').hide();
               
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var Billno = result.oList[i].trNo;
                    $('#btnsubmit').prop("disabled", false);
                    JsBarcode("#barcode1",ERPDeptId + '-' + Billno);
                    if (status != 0) {
                        Showalerts(status, Billno);
                    }
                    else {
                        $('#tblAlert1 tr').remove();
                        $('#alertpopup1').show();
                        $('#alertdiv1').show();
                        var Prod1 =
                            "<tr class='jsgrid-row'><td colspan=3><h2 class='red'>Not enough quantity on hand!</h2></td></tr>" +
                            "<tr class='jsgrid-row'><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>ProductCode</b></td><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>Description</b></td><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>Quantity</b></td></tr>";
                        $('#tblAlert1').append(Prod1);

                        for (var i = 0; i < result.oList.length; i++) {
                            var Prod ="<tr class='jsgrid-row'>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>" + result.oList[i].ProductCode + "</b></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>" + result.oList[i].ProductDescr + "</b></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>" + result.oList[i].Quantity + "</b></td></tr>";
                            $('#tblAlert1').append(Prod);
                            $('#btnokalert1').focus();  
                        }
                    }
                }
            }
        });
    }
}

function UpdateLocationTransfer() {
    rowcount = $('#tblLocationTransfer tr').length;
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
    }
  
    else if ($('#Location').val() == 0 || $('#Location').val() == '' || $('#Location').val() == undefined || $('#Location').val() == null) {
        warningshow('Please Select From Location', 'Location');
        return false;
    }
    
    else if ($('#ToLocation').val() == 0 || $('#ToLocation').val() == '' || $('#ToLocation').val() == undefined || $('#ToLocation').val() == null) {
        warningshow('Please Select To Location', 'ToLocation');
        return false;
    }
    else if (($('#DebitAccount').val() != '') && ($('#hiddendebit').val() == 0)) {
        warningshow('Please Select A Valid Debit Account', 'DebitAccount');
        return false;
    }
    else if (($('#CreditAccount').val() != '') && ($('#hiddenCredit').val() == 0)) {
        warningshow('Please Select A Valid Credit Account', 'CreditAccount');
        return false;
    }
    else if ($('#DebitAccount').val() == '') {
        warningshow('Please Select A  Debit Account', 'DebitAccount');
        return false;
    }
    else if ($('#CreditAccount').val() == "") {
        warningshow('Please Select A Credit Account', 'CreditAccount');
        return false;
    }
    else if ($('#Location').val() == ($('#ToLocation').val())) {
        warningshow('From Location and To Location Cannot be same', 'ToLocationIn');
        return false;
    }
    else if (rowcount == 0) {
        warningshow('No Products Added', 'txtproduct0');
        return false;
    }

    else {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('update'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('');
        $('#confirmmessage').append('Location Transfer <br> from ' + ($('#Location option:selected').html()) + ' to ' + ($('#ToLocation option:selected').html()) + '<br>' + ' Do you want to Update ?');
    }
}

function transactionupdate() {
    $('#Loadingsave').show();
    $('#btnsaveedit').prop("disabled", true);
   // $('#confirmOk').prop("disabled", true);

    var oArray = new Array();
    for (var k = 1; k < i; k++) {
        var ProductId = parseInt($('#ProductId' + k).val() || 0);
        var Description = $('#txtdesc' + k).val();
        var UnitId = $('#select_unit' + k).val();
        var Quantity = $('#txtqnty' + k).val();
        var Price = $('#rate' + k).val();
        var Total = $('#tamnt' + k).val();
        var FromLocation = $('#Location').val();
        var ToLocation = $('#ToLocation').val();
        var trNo = $('#TRNo').val();
        var TRDate = $('#TRDate').val();
        var DebitAccount = $('#hiddendebit').val();
        var CreditAccount = $('#hiddenCredit').val();
        var Comments = $('#Comments').val();
        var UId = ERPUserId;
        var DeptId = ERPDeptId;
        DelFlag = 1;




        if (ProductId != 0) {
            oArray.push({
                'ProductId': ProductId,
                'Description': Description,
                'UnitId': UnitId,
                'Quantity': Quantity,
                'Price': Price,
                'Total': Total,
                'trNo': trNo,
                'FromLocation': FromLocation,
                'ToLocation': ToLocation,
                'TRDate': TRDate,
                'DebitAccount': DebitAccount,
                'CreditAccount': CreditAccount,
                'Comments': Comments,
                'UId': UId,
                'DeptId': DeptId,
                'DelFlag': DelFlag
            })
        }
    }
    if (oArray != "") {
        var data = { 'StockTransferOutModel': oArray };
        $.ajax({
            type: "POST",
            url: "../../inventory/LocationTransferUpdate",
            data: data,
            success: function (result) {
                $('#Loadingsave').hide();
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var Billno = result.oList[i].trNo;
                    $('#btnsaveedit').prop("disabled", false);
                    JsBarcode("#barcode1",ERPDeptId + '-' + Billno);
                    if (status != 0) {
                        Showalerts(status, Billno);
                    }
                    else {
                        //$('#tblAlert tr').remove();
                        //$('#alertpopup').show();
                        //$('#alertdiv').show();
                        //for (var i = 0; i < result.oList.length; i++) {
                        //    var Prod =
                        //         "<tr class='jsgrid-row'><td colspan=3><h2>Not enough quantity on hand!</h2></td></tr>" +
                        //    "<tr class='jsgrid-row'><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</td><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</td><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Quantity</td></tr>" +
                        //    "<tr class='jsgrid-row'>" +
                        //    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ProductCode + "</td>" +
                        //    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ProductDescr + "</td>" +
                        //    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Quantity + "</td></tr>";
                        //    $('#tblAlert').append(Prod);
                        //    $('#btntermssave').focus();
                        //}
                        $('#tblAlert1 tr').remove();
                        $('#alertpopup1').show();
                        $('#alertdiv1').show();
                        var Prod1 =
                            "<tr class='jsgrid-row'><td colspan=3><h2 class='red'>Not enough quantity on hand!</h2></td></tr>" +
                            "<tr class='jsgrid-row'><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>ProductCode</b></td><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>Description</b></td><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>Quantity</b></td></tr>";
                        $('#tblAlert1').append(Prod1);

                        for (var i = 0; i < result.oList.length; i++) {
                            var Prod = "<tr class='jsgrid-row'>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>" + result.oList[i].ProductCode + "</b></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>" + result.oList[i].ProductDescr + "</b></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'><b>" + result.oList[i].Quantity + "</b></td></tr>";
                            $('#tblAlert1').append(Prod);
                            $('#btnokalert1').focus();
                        }
                    }
                }
            }
        });
    }
}



function CheckCancelTransfer() {
    if ($.trim($('#cancelotp').val()) == '') {
        warningshow('Enter OTP', 'cancelotp');
    }
    else if ($.trim($('#cancelotpremarks').val()) == '') {
        warningshow('Enter Remarks', 'cancelotpremarks');
    }
    else {
        var data = {};
        data.UserId = ERPUserId;
        data.OTP = $("#cancelotp").val();
        data.Remarks = $('#cancelotpremarks').val();
        data.Operation = 'Location Transfer- OTP - Cancel , Transfer No :' + $('#TRNo').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Home/OTPCheckforUser",
            data: data,
            success: function (result) {
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    OTPCancelCheck(status)
                }
            }
        });
    }
}

function OTPCancelCheck(status) {
    if (status == 1) {
        Cancel();
    }
    else {
        warningshow('Invalid OTP', 'cancelotp');
        $("#cancelotp").select();
    }
}

function CheckEditTransfer() {
    if ($.trim($('#txtotp').val()) == '') {
        warningshow('Enter OTP', 'txtotp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var data = {};
        data.UserId = ERPUserId;
        data.OTP = $("#txtotp").val();
        data.Remarks = $('#otpremarks').val();
        data.Operation = 'Location Transfer- OTP - Edit , Transfer No :' + $('#TRNo').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Home/OTPCheckforUser",
            data: data,
            success: function (result) {
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    OTPCheck(status)
                }
            }
        });
    }
}

function OTPCheck(status) {
    if (status == 1) {
        EditTransfer();
    }
    else {
        warningshow('Invalid OTP', 'txtotp');
        $("#txtotp").select();
    }
}




function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
}

function Showalerts(Status, Billno) {
    if (Status == 1) {
        $('#TRNoCopy').val(Billno);
        $('#alertpopup').show();
        $('#alertdiv').show();
        $('#savealert').text('');
        $('#savealert').append('<b>Transfer No : ' + Billno + '</b><br> Saved Successfully!<br>Do you want to print this Transfer?');
        $('#btnok').focus();
    }
    else if (Status == 2) {
        $('#TRNoCopy').val(Billno);                                                               
        $('#alertpopup').show();
        $('#alertdiv').show();
        $('#savealert').text('');
        $('#savealert').append('<b>Transfer No : ' + Billno + '</b><br> Updated Successfully!<br>Do you want to print this Transfer?');
        $('#btnok').focus();
         
    }

     else if (Status == 3) {
         
         $('#cancelmsg').text('');
         $('#canceldiv').show();
         $('#cancelmsg').append('Transfer Number : ' + Billno + ' not valid');
         $('#btncancel').focus();
    }
     else if (Status == 4) {
       
        $('#cancelmsg').text('');
        $('#canceldiv').show();
        $('#cancelmsg').append('<b>Transfer Number : ' + Billno + '</b><br> Cancelled!');
        $('#btncancel').focus();
    }
}

function returnpopclose() {
    
        $('#cancelmsg').text(''); $('#canceldiv').hide(); $('#ToLocation').focus(); $('#ToLocation').select();

}
function Tbldelete() {
    $('#tblLocationTransfer tr').remove();
    i = 1;
    // $('#txtproduct0').focus();
}
//copy
function enablenobox() {
    var rowcount = $('#tblLocationTransfer tr').length;
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
        return false;
    }
    else if (rowcount > 0 && copyflag == 0) {
        $('#Confirmflag').val('copy'), $('#ConfirmRowId').val(1)
        $('#confirmmessage').text('Data Will be Lost.Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').focus();
    }
    else if (rowcount == 0) {
        enablecopy(0,0);
       
    }

}

function enablecopy(FromLocation,ToLocation) {
    copyflag = 1;
    loadlocation(FromLocation,ToLocation);
    $('#tour1').fadeIn();   
    $('#btnsubmit').hide();
    $('#btnlist').hide();

  

    $('#ToLocation').val(0);
    $('#DebitAccount').val('');
    $('#CreditAccount').val('');
    $('#txtdacnt').val('');
    $('#txtcacnt').val('');
    $('.form-control').prop("disabled", true);
    $('#TRNo').prop('disabled', false);
    $('#btnaddprd').prop('disabled', true);
    $('#btnadd').prop('disabled', true);
    $('#txttotal').prop('disabled', true);
    $('#GrandTotal').prop('disabled', true);
    $('#txttotal').css("background-color", '#ECEFF1');
    $('#GrandTotal').css("background-color", '#ECEFF1');
    //$('#Location').css('background-color', '#ECEFF1');
    //$('#Location').css('background-color', 'white');
    var a = '0.00';
    $('#GrandTotal').val(a);
    $('#TRNo').select();
    $("#Deptcode").val('');
    $("#Deptid").val('');
    $("#User").val('');

}
//copy into grid

function LocationTransferGet(result) {
   
    $('#LocationHide').val(result[0].FromLocation);
    if ($('#LocationHide').val() != null && $('#LocationHide').val() != '' && $('#LocationHide').val() != undefined)
    {
        $('#btnedit').show();
        $('#btndelete').show();
    }
    else {
        $('#btnedit').hide();
        $('#btndelete').hide();
    }
    $('#btnsubmit').prop('disabled', true);
    $('#Location').prop('disabled', true);
    $('#TRDate').prop('disabled', true);
    $('#ToLocation').prop('disabled', true);
    $('#DebitAccount').prop('disabled', true);
    $('#Comments').prop('disabled', true);
    $('#CreditAccount').prop('disabled', true);
    $('#txtproduct0').prop('disabled', true);
    $('#select_unit0').prop('disabled', true);
    $('#txtquantity').prop('disabled', true);
    $('#txtrate').prop('disabled', true);
    $('#btnprint').show();
    
    $('#txtprd').val(result[0].ItemCode);
    $('#select_unit').val(result[0].UnitId);

    $('#Deptid').val(result[0].DeptId);
    $('#Deptcode').val(result[0].Comments);
    $('#User').val(result[0].User);
    var Unit = result[0].UnitId;
    var description = result[0].Description;
    var rowcount = $('#tblLocationTransfer tr').length;
    if (rowcount == 0) {
        i = 1;
    }
    for (var m = 0; m < result.length; m++) {
       
        var bins = '';
        //alert(result[m].ToLocation)
        if (result[m].ToLocation == 1) {
            if (result[m].BinA != '') { bins = bins + result[m].BinA; }
        }
        else if (result[m].ToLocation == 2) {
            if (result[m].BinB != '') { bins = bins + result[m].BinB; }
        }
        else if (result[m].ToLocation == 3) {
            if (result[m].BinC != '') { bins = bins + result[m].BinC; }
        }
        else if (result[m].ToLocation == 4) {
            if (result[m].BinD != '') { bins = bins + result[m].BinD; }
        }
        else if (result[m].ToLocation == 5) {
            if (result[m].BinE != '') { bins = bins + result[m].BinE; }
        }
        else if (result[m].ToLocation == 6) {
            if (result[m].BinF != '') { bins = bins + result[n].BinF; }
        }
        else if (result[m].ToLocation == 7) {
            if (result[m].BinG != '') { bins = bins + result[m].BinG; }
        }
        else if (result[m].ToLocation == 8) {
            if (result[m].BinH != '') { bins = bins + result[m].BinH; }

        }
        
        var slno = parseInt(i);
        var ProdRow = "<tr id=" + 'row' + slno + " class= jsgrid-row >" +
           "<td  id=" + 'td' + slno + " class= jsgrid-cell  style= width:3%;text-align:center >"
          + slno + "<input type='hidden' id='SlNo" + slno + "' value=" + slno + "></td>" +
          "<td class= 'jsgrid-cell jsgrid-align-left'  style='width:15%;text-align:left' ><input type='hidden' id='ProductId" + slno + "' value='" + result[m].ProductId + "'/> <input typ='text' class='form-control text-left' disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
          + result[m].ItemCode + "'>  </td>" +
          "<td class= 'jsgrid-cell jsgrid-align-left'  style='width:20%;text-align:left' display='none;'> <input type='text' class='form-control text-left'  disabled  style='background-color:white;height:30px;' id='txtdesc" + slno + "' value='"
          + result[m].Description + "'> </td>" +
          "<td class= jsgrid-cell jsgrid-align-center  style='width:5%;' text-align-center><select id=" + 'select_unit' + slno + " class='form-control' disabled=disabled style='background-color:white;height:30px;' value='"
          + result[m].UnitId + "'>" + UnitSelect + "</td>" +
          "<td class= 'jsgrid-cell jsgrid-align-center'  style='width:5%;' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;'  id='txtqnty" + slno + "' value='"
          + parseInt(result[m].Quantity||0) + "' onkeyup='tot_row(" + slno + ")'  onkeypress='return isNumber1(event)'><input type='hidden' id='hiddenqty" + slno + "' value='" + parseInt(result[m].Qty||0) + "'/> </td>" +
          "<td class= 'jsgrid-cell jsgrid-align-right'  style='width:6%;' ><input typ='text' class='form-control text-right' disabled=disabled style='background-color:white;height:30px;' onkeyup='tot_row(" + slno + ")'  onkeypress='isNumbercheck(event,this)'  id='rate" + slno + "' value="
          + (result[m].Price.toFixed(Decimal)) + "></td>" +
          "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-right'  style='width:6%;' ><input typ='text' class='form-control text-right' disabled=disabled  style='background-color:white;height:30px;background-color:white'readonly onkeyup=''   id='tamnt" + slno + "' value="
          + (result[m].Total.toFixed(Decimal)) + "><input style='display:none' id=" + 'Bin' + slno + " value='" + bins + "'></td>" +
          "<td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='background-color:white;width:3%;' ><input class= 'jsgrid-button jsgrid-edit-button editgridtr' style='display:none;'  onclick='Editrow(" + slno + ")' id='Edit' type=button title=Edit ><input class= 'jsgrid-button jsgrid-delete-button deletegridtr'  style='display:none;' type= button id='delete' title= Delete onclick='rowdelete(" + slno + ")' ></td>" +
          "<td id='Update"
       + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='background-color:white;width:3%;display:none;'><input class='jsgrid-button  disabled jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title=Update style='' ><input class='jsgrid-button jsgrid-cancel-edit-button' style='' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit' value='' >"+
       "</tr>";
        $('#tblLocationTransfer').append(ProdRow);
        $('#select_unit' + slno).val(result[m].UnitId);
        grandtotal(slno);
        $('#ToLocation').val(result[m].ToLocation);
        $('#Location').val(result[m].FromLocation);
        i++;
       
    }
}

function cleartext()
{
   
    $("#tblLocationTransfer tr").remove();
    $('#ToLocation').val('0');
    $('#DebitAccount').val('');
    $('#CreditAccount').val('');
    $('#Comments').val('');
    $('#GrandTotal').val('');
    $('#Location').val(UserLocationId);
}

   
function alertpopuprefresh(e) {
    $('#alertpopup').hide();
    $('#alertdiv').hide();

}
 

function Cancel() {
    $('#CancelOTPDiv').hide();
    $('#cancelotp,#cancelotpremarks').val('');
    var data = {};
    data.TransactionNo = $('#TRNo').val();
    data.DeptId = ERPDeptId;
    data.UId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../inventory/LocationTransferCancel",
        data: data,
        success: function (result) {
            Tbldelete();
            formrefresh();
            var status = result.oList[0].Status;
            var trno = result.oList[0].TransactionNo;
            Showalerts(status, trno);

        }
    });
}

var updateflag = 0;
function EditTransfer() {
    var CurrLocation = $("#Location").val();
    $("#Location").empty();
    $("#Location").append(LocnSelect);
    $("#Location").val(CurrLocation);
    $('#OTPDiv').hide();
    $('#txtotp').val('')
    if ($('#tblLocationTransfer tr').length >= 1) {
        updateflag = 1;
        $('.jsgrid-button').prop("disabled", false);
        $('#btnedit').hide();
        $('#btnprint').hide();

        $('#btnsaveedit').show();
        $('#copybill').hide();
        $('#btndelete').hide();
        $('#btnwrk').hide();
        $('#bill').show();
        $('.form-control,.btn-outline-primary').prop("disabled", false);
        $('#TRNo').prop("disabled", true);
        $('.deletegridtr').show();
        $('.editgridtr').show();
        var ln = parseInt($('#tblLocationTransfer tr').length);
        for (var id = 1; id <= ln; id++) {
            $('#txtprd' + id).prop('disabled', true);
            $('#txtdesc' + id).prop('disabled', true);
            $('#select_unit' + id).prop('disabled', true);
            $('#txtqnty' + id).prop('disabled', true);
            $('#rate' + id).prop('disabled', true);
            $('#tamnt' + id).prop('disabled', true);
            grandtotal(id); 
        }
        $('#NoofQty,#Location,#ToLocation').prop('disabled', true);
        $('#txttotal').css("background-color", 'WHITE');
       
        $('#txtproduct0').focus();

      
    }
    else {
        warningshow('Plaease select Transfer No', 'TRNo');
    }

}
function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Date') {
                $(this).html('<input type="text" class="form-control"  style="width:120px"  placeholder="' + title + '"/>')
            }
            else {
                $(this).html('<input type="text" class="form-control"   placeholder="' + title + '"/>')
            }
    });

    var table = null;

    if (Type == 'Single') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            //"order": false,
        });

    }
    else if (Type == 'Multiple') {

        table = $('#' + tablename).DataTable({
            dom: 'tir',
            orderCellsTop: true,
            "order": [],
            "pageLength": -1
        });


    }
    table.columns().every(function (index) {
        $('#' + tablename + ' thead tr:eq(1) th:eq(' + index + ') input').on('keyup change', function () {
            table.column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
        });
    });
}


function disable_datatable(tablename) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        return;
    }
}