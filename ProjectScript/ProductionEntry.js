var i = 1;
var editflag = 0; var copyflag = 0;
var itemflag = 0;
var x = 1;
var FlagCostEdit = 0; var Decimal = Decimal;
$(document).ready(function () {
    serialnoload();
    AccountLoad(2); crncyload();
    $('#ProductionItem').focus();
    $('#totcredit').val('0.00');
    $('#totdebit').val('0.00');
    $('#costdiff').val('0.00');
    $('#totcreditFC').val('0.00');
    $('#totdebitFC').val('0.00');
    $('#costdiffFC').val('0.00');
    $('#totcreditFC').val('0.00');
    $('#grandtotal').val('0.00');
    $('#costperitem').val('0.00');
    $('#totothercost').val('0.00');
    $('#totalcostFC').val('0.00');
    $('#totprodcost').val('0.00');
    $('#debitamountFC').val('0.00');
    $('#creditamountFC').val('0.00');
    $('#amountFC').val('0.00');
    $('#rategrid').val('0.00');
    $('#totothercostFC').val('0.00');    
    $('#ProNo').prop('disabled', true);
    $('#txttotal').prop('disabled', true);
    $('#txttotal').css('background-color', 'white');
    $('#ProNo').css('background-color', 'white');
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

    var data4 = {};
    data4.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data4: data4,
        success: function (result) {
            LocationLoad(result.oList);
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
    
    $('#date').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });

    $('#ProNo').keyup(function (e) {
        e.preventDefault();
        $('#tour1').fadeOut();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (entrkey == 8) {
            checkProtextempty();
        }
    });

    $('#DebitAccount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if (($('#DebitAccount').val() != '') && ($('#hiddendebit').val() == 0)) {
                $('#DebitAccount').val('');
                warningshow('Please Select A Valid Debit Account', 'DebitAccount');
                return false;
            }
            else {
                $('#CreditAccount').focus();
            }
        }
    });

    $('#CreditAccount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if (($('#CreditAccount').val() != '') && ($('#hiddencredit').val() == 0)) {
                $('#CreditAccount').val('');
                $('#CreditAccount').focus();
                warningshow('Please Select A Valid Credit Account', 'CreditAccount');
                return false;
            }
            else {
                $('#ProductionItem').focus();
            }
        }
    });

    $('#ProductionItem').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if (($('#ProductionItem').val() != '') && ($('#hiddenitemId').val() == 0)) {
                warningshow('Please Select A Valid Item', 'ProductionItem');
                $('#ProductionItem').val('');
                return false;
            }                
            else {
                $('#ProductionQty').focus();
            }
        }      
    });

    $('#ProductionBatch').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#ExpiryDate').focus();
        }
    });
    $('#ExpiryDate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#ProductionQty').focus();
        }
    });

    $('#ProdLocation').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#ItemMrp').focus();
        }
    });
    $('#ItemMrp').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Sellrate').focus();
        }
    });

    $('#Sellrate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtproduct0').focus();
        }
    });

    
    $('#amountFC').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#othercostaddbtn').focus();
        }
    });
    $('#AccountType').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#account').focus();
        }
    });
    $('#account').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#accountdescription').focus();
        }
        else
        {
            $('#hiddenAcountId').val(0);
        }
    });

    $('#accountdescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Othercost').focus();
        }
    });

    $('#Othercost').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Currencygrid').focus();
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
    $('#Currencygrid').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#rategrid').focus();
        }
    });
    $('#rategrid').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#amountFC').focus();
        }
    });

    $('#ProductionQty').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($.trim($('#ProductionQty').val()) == '0') {                
                warningshow(' Production  Quantity Cannot Be Zero', 'ProductionQty');
                $('#ProductionQty').val('');
                return false;
            }
            else
            {
                $('#ProdLocation').focus();
            }           
        }
    });
    $('#txtproduct0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($.trim($('#ProductId0').val() == 0) && (qtyflag == 1)) {
                warningshow('Not Stock!', 'ProductId0');
                $('#txtproduct0').select();
                return false;
            }
        }
    });
    $('#select_jobno').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtproduct0').focus();
        }
    });
});
//currency load
function crncyload()
{
    var data2 = {};
    data2.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data2: data2,
        success: function (result) {
            CurrencyLoad(result.oList);
        }
    });
}


//account number load
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
        $('#hiddencredit').val(result[k].CAccountId);
        $('#txtDacnt').val(result[k].DAccountDescription);
        $('#txtCacnt').val(result[k].AccountDescription);
    }
}

//insert into grid in main form
var i = 1;
function productadd() {
    rowcount = $('#tblProductionEntry tr').length;
    var ProductFlag = 0;   
    for (p = 1; p <= i; p++) {
        if ($('#ProductId' + p).val() == $("#ProductId0").val()) {
            ProductFlag = 1;
        }
    }
    var slno = parseInt(i)
    if ($.trim($('#ProdLocation').val()) == '0') {
        warningshow('Please Select Location', 'ProdLocation');
        return false;
    }    
   else if ($.trim($('#txtproduct0').val()) == "") {
        warningshow('Please Select Product', 'txtproduct0');
        return false;
   }
   else if ($.trim($('#ProductId0').val() == 0) && (qtyflag == 1)) {
       warningshow('Not Stock!', 'ProductId0');
       return false;
   }
    else if ($("#ProductId0").val() == 0) {
        warningshow('Please Enter a Valid Product', 'txtproduct0');
        $('#txtproduct0').select();
        return false;
    }
    else if ($.trim($('#Batch0').val()) == "") {
        warningshow('Please Select Batch', 'Batch0');
        return false;
    }
    else if (($('#BatchSNO0').val()||0) == 0) {
        warningshow('Please Select a valid Batch', 'ProductId0');
        return false;
    }
   else if ($.trim($('#txtquantity').val()) == "") {       
        warningshow('Please Select Quantity', 'txtquantity');
        return false;
   }
   else if ($.trim($('#txtrate').val()) == "") {
       warningshow('Please Select Rate', 'txtrate');
       return false;
   }
   else if ($.trim($('#select_unitProd').val()) =='0') {
       warningshow('Please Select Unit', 'select_unitProd');
       return false;
   }
   else if ($.trim($('#txtrate').val()) == '0') {
       warningshow('Rate Cannot Be Zero', 'txtrate');
       $('#txtrate').select();
       return false;
   }
   else if ($.trim($('#txtquantity').val()) == 0) {
       warningshow('Quantity Cannot be Zero', 'txtquantity');
       $('#txtquantity').select();
       return false;
   }
   else if ($.trim($('#txttotal').val()) == 0) {
       warningshow('Enter Valid Amount', '');
       $('#txtrate').select();
       return false;
   }
   else if ($('#hiddenitemId').val() == $('#ProductId0').val()) {
       warningshow('Production Item and Purchasing Item Cannot be same', 'ProductId0');
       $("#txtproduct0").val('');
       $("#txtquantity").val('');
       $("#txtrate").val('');
       return false;
   }
   

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
        var slno = parseInt(i)
        var Count = $('#tblProductionEntry tr').length;
        var serialNo = rowcount + 1;
        var ProdRow = "<tr  id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:4%;text-align:center >"
            + serialNo + "<input type='hidden' id='SlNo" + slno + "' value=" + Count + "></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;text-align:center' ><input type='hidden' id='ProductId" + slno + "' value='" + $('#ProductId0').val() + "'/> <input type='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
            + $("#txtproduct0").val() + "'></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:20%;text-align:center' display='none;'> <input type='text' class='form-control'  disabled  style='background-color:white;height:30px;' id='txtdesc" + slno + "' value='"
           + $("#Description").val() + "'> <td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:15%;text-align:center' ><input type='hidden' id='BatchSNO" + slno + "' value='" + $("#BatchSNO0").val() + "'/> <input type='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;' id='Batch" + slno + "' value='"
           + $("#Batch0").val() + "'></td> </td> <td class= jsgrid-cell jsgrid-align-center  style= 'width:6%;text-align:center'> <select id=" + 'select_unit' + slno + " class='form-control' disabled=disabled style='background-color:white;height:30px;' >"
           + UnitSelect + "</select></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;'  onkeyup='tot_row(" + slno + ")' onkeypress='return isNumber1(event)' id='txtqnty" + slno + "' value='"
           + parseInt($('#txtquantity').val()) + "'><input type='hidden' id='hiddenqty" + slno + "' value='" + parseInt($('#hiddenquantitycheck').val()) + "'/> </td><td class= 'jsgrid-cell jsgrid-align-right'  style= 'width: 6%;' ><input typ='text' class='form-control text-right' disabled=disabled style='background-color:white;height:30px;' onkeyup='tot_row(" + slno + ")'  onkeypress='isNumbercheck(event,this)'  id='rate" + slno + "' value="
           + parseFloat($('#txtrate').val() || 0).toFixed(Decimal) + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-right'  style='width:6%;' ><input typ='text' class='form-control text-right' disabled=disabled  style='background-color:white;height:30px;background-color:white'readonly onkeyup=''   id='tamnt" + slno + "' value="
           + parseFloat($('#txttotal').val() || 0).toFixed(Decimal) + "></td><td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width:4%; ><input class= 'jsgrid-button jsgrid-edit-button' onclick='Editrow(" + slno + ")' id='Edit' type=button title=Edit ><input class= 'jsgrid-button jsgrid-delete-button'  type= button id='delete' title= Delete onclick='rowdelete(" + slno + ")' ></td><td id='Update"
           + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title=Update style='' ><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit'  ></tr>";
        $('#tblProductionEntry').append(ProdRow);
        $('#select_unit' + slno).val($('#select_unitProd').val());
        grandtotal(slno);
        i++;
        ClearProductRow();
        productpopuprefresh();
        totprodcostcalc();
        TotalCostFC();    
        CostperItem();
        $('#ProdLocation').prop('disabled', true);
        $('#txtproduct0').focus();       
   }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
}
//find grand total in grid

function grandtotal(slno) {
    var grandtot = 0;
    $('#grandtotal').val('');
    for (var i = 1; i <= slno; i++) {
        grandtot = grandtot + parseFloat($('#tamnt' + i).val() || 0);
    }
    $('#grandtotal').val(grandtot.toFixed(Decimal));
    hiddenmaterialtotcalc()
}

// find total of material total in base currency and store in hiddenfield
function hiddenmaterialtotcalc()
{
    var materialtotbase = 0;
    if ($('#Rate').val() != 0)
    {
        var rt = $('#Rate').val();
        var grandtot = $('#grandtotal').val();
        materialtotbase = materialtotbase + (rt * grandtot);
        $('#hiddenmaterialtot').val(materialtotbase.toFixed(Decimal));
    }
}
//find total amount
function tot() {
    var qty = parseFloat($('#txtquantity').val() || 0);
    var rate = parseFloat($('#txtrate').val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var total = parseFloat(qty * rate);
    $('#txttotal').val(parseFloat(total).toFixed(Decimal));
}
//finding total in mainform grid
function tot_row(RowId) {
    if (parseFloat($('#txtqnty' + RowId).val() || 0) > parseFloat($('#hiddenqty' + RowId).val() || 0)) {
        warningshow(' Available Quantity Is' + $('#hiddenqty' + RowId).val(), 'txtqnty' + RowId);
        $('#txtqnty' + RowId).val($('#hiddenqty' + RowId).val())
    }
    var qty = parseFloat($('#txtqnty' + RowId).val() || 0);
    var rate = parseFloat($('#rate' + RowId).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var total = parseFloat(qty * rate).toFixed(Decimal);
    $('#tamnt' + RowId).val(total).toFixed(Decimal);

}

//edit grid in main form
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
    $('#tamnt' + RowId).prop('disabled', false);
    $('#select_unit' + RowId).focus();
    grandtotal(i);
}
//delete in main form grid
function rowdelete(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('delete'); $('#ConfirmRowId').val(RowId);   
}

function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'delete') {
        deleterow(rowid)
    }
    else if (Result == 'true' && status == 'createnew') {
        formrefresh();
    }
    else if (Result == 'true' && status == 'deletecostrow') {
        Costdelete(rowid)
    }
    else if (Result == 'true' && status == 'copy') {
        copyflag = 1;
        for (c = 1; c <= i; c++) {
            $('#row' + c).remove();
            enablecopy();
        }
    }
    $('#confirm').fadeOut();
}
function enablecopy() {
    copyflag = 1;
    $('#tour1').fadeIn();
    $('#btnsubmit').hide();
    $('#btnlist').hide();
    $('#ProNo').select();
    $('.form-control').prop("disabled", true);
    $('#ProNo').prop('disabled', false);
    $('#itemadd').prop('disabled', true);
    $('#btnadd').prop('disabled', true);
    $('#btnadditem').prop('disabled', true);
    $('#txttotal').prop('disabled', true);
    $('#GrandTotal').prop('disabled', true);
    $('#btncrncysave').prop('disabled', true);
    $('#othercostaddbtn').prop('disabled', true);
    $('#txtproduct0').prop('disabled', true);
    //$('#btntrnsfr').prop('disabled', true);
    $('#txtproduct0').css("background-color", '#ECEFF1');
    $('#ProNo').focus();
    $('#txttotal').css("background-color", '#ECEFF1');
    $('#GrandTotal').css("background-color", '#ECEFF1');
    $('#btnprint').show();
    //$('#Location').css('background-color', 'white');
    var a = '0.00';
    $('#GrandTotal').val(a);
    $('#BatchSNO0').val('');
    $('#hiddenquantitycheck').val(0);
    $("#Batch0").val('');
    $('#ProductionBatch').val('');
    $('#ExpiryDate').val('');
    $('#ItemMrp').val('');
    $('#Sellrate').val('');
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
    grandtotal(i);
    hiddenmaterialtotcalc(), totprodcostcalc(), TotalCostFC(), CostperItem();
    $('#txtproduct0').focus();
}
function Costdelete(RowId)
{
    var slno = 1;
    var rowslno = parseInt(slno);  
        $('#costrow_' + RowId).remove();
        for (var j = 1; j <= x - 1; j++) {
            if ($('#acc_' + j).val() != undefined) {
                $('#costtd_' + j).text(slno);
                slno++;
            }
        }    
    $('#acctype').focus();
    CalcCreditandDebitdiffrence(i);
    CalcCreditandDebitdiffrenceFC(i);
}


//update grid in main form
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
    else  if ($('#rate' + RowId).val() == '0') {
        warningshow('Price cannot be Zero', 'rate' + RowId);
        return false;
    }
    else if ($('#rate' + RowId).val() == '') {
        warningshow('Please Enter Price', 'rate' + RowId);
        return false;
    }
    else if ($('#select_unit' + RowId).val() == 0) {
        warningshow('Please Select Unit', 'select_unit' + RowId);
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
        $('#txtqnty' + RowId).prop('disabled', true);
        $('#rate' + RowId).prop('disabled', true);
        $('#tamnt' + RowId).prop('disabled', true);
        var ratenum = parseFloat($("#rate" + RowId).val() || 0);
        $("#rate" + RowId).val(ratenum.toFixed(Decimal));
        grandtotal(i);
        hiddenmaterialtotcalc(), totprodcostcalc(), TotalCostFC(), CostperItem();
    }
}
//cancel editing gridrow in mainform

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
    $('#txtqnty' + RowId).prop('disabled', true);
    $('#rate' + RowId).prop('disabled', true);
    $('#tamnt' + RowId).prop('disabled', true);
    grandtotal(i);
}

function LocationLoad(result) {
    $("#ProdLocation").empty();
    $("#ProdLocation").append("<option value='0'>Select Location</option>");
    for (var i = 0; i < result.length; i++) {
        $("#ProdLocation").append("<option value='" + result[i].LocationId + "'>" + result[i].LocationName + "</option>");
    }
    $('#ProdLocation').val(UserLocationId);
}

function UnitLoad(result) {
    $("#select_unitProd").empty();
    UnitSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "' name=" + result[i].UnitName + ">" + result[i].UnitName + "</option>"
    }
    $("#select_unitProd").append(UnitSelect);    
}


function CurrencyLoad(result) {
    $("#FC,#Currencygrid").empty();
    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {
            var BaseCurrency = result[i].BaseCurrencyId;
        }
    }
    CurrencySelect = "<option value=0>-----Select-------</option>";  
    for (var i = 0; i < result.length; i++) {
        CurrencySelect+= "<option  name='" + result[i].CurrencyRate + "' value='" + result[i].Id + "'>" + result[i].CurrencyName + "</option>"
    }
    $("#FC,#Currencygrid").append(CurrencySelect);
    $('#Currencygrid').val(BaseCurrency);
    $('#FC').val(BaseCurrency);
    $('#rategrid').val($('#Currencygrid').find("option:selected").attr("name"));
    $('#Rate').val($('#FC').find("option:selected").attr("name"));
}
   
function CurrencyChange(Id) {
    $('#Rate').val($('#' + Id).find("option:selected").attr("name"));
}
function CurrencyChangegrid(Id) {
    $('#rategrid').val($('#' + Id).find("option:selected").attr("name"));
}
//clearing row after inserting into grid
function ClearProductRow() {
    $('#accountdescription').val('Other Cost Against Production EntryNo : ' + $('#ProNo').val())
    $('#txtproduct0').val('');
    $('#ProductId0').val('');
    $('#select_unitProd').val();
    $('#txtquantity').val('');
    $('#txtrate').val('');
    $('#ProductId').val('');
    $('#txttotal').val('');
    $('#select_unitProd').val('0');
    $('#hiddenquantitycheck').val('0');   
}
//for validating valid product
function checkpdcttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#ProductId0').val(0);
        $('#select_unitProd').val(0);
        $('#txtrate').val('');
        $('#txtquantity').val('');
        $('#txttotal').val('');
        $('#BatchSNO0').val('');
        $('#hiddenquantitycheck').val(0);
        $("#Batch0").val('');
        productpopuprefresh();
    }
}


//validating item
function checkitemtextempty(evt) {
    if (evt != 13 && evt != 9) {
        $('#hiddenitemId').val(0);
    }
}
function checkjobno()
{    
   $('#ProjectJobId').val(0);    
}

//show popup-other cost details
function othercostpopupshow() {    
        $('#Othercostpopup').show();
        $('#OtherCostheader').text('Other Cost');
        $('#OtherCostdiv').show();
        $('#account').focus();
        $('#Othercost').keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                e.preventDefault();
                $('#Currencygrid').focus();
            }
        });            
}
//close othercost details popup
function othercostpopupclose() {
        $('#Othercostpopup').hide();
        $('#OtherCostdiv').hide();
        $('#totothercost').val('0.00');
        totprodcostcalc();
        CostperItem();
        TotalCostFC();
}


function othercostpopupclosecopy() {    
        $('#Othercostpopup').hide();
        $('#OtherCostdiv').hide();
    }


function popupformrefresh() {   
    $("#tblOtherCost tr").remove();
    $('#totcredit').val('0.00');
    $('#totdebit').val('0.00');
    $('#costdiff').val('0.00');
}
//find costperItem

function CostperItem() {
    if ($('#ProductionQty').val() != ''&&$('#ProductionQty').val() !=0)
    {
        var cost = 0;
        $('#costperitem').val(0);
        var tot = ($('#ProductionQty').val()||0);
        if (tot >= 0) {
            var grangtot = $('#totprodcost').val();
            cost = parseFloat(grangtot / tot).toFixed(Decimal);
            $('#costperitem').val(cost);
        }
    }
    else if ($('#ProductionQty').val()=='0')
    {
        warningshow(' Production Quantity Cannot Be Zero ', 'ProductionQty');
        $('#costperitem').val('0.00');
        $('#ProductionQty').val('');       
    }
    else if ($('#ProductionQty').val() == 0) {
        $('#costperitem').val('0.00');
    }
}


//clear product when change location
function checklocationtextempty() {
    $('#ProductId0').val(0);
    $('#select_unitProd').val('0');
    $('#txtrate').val('');
    $('#txttotal').val('');
    $('#txtproduct0').val('');
}


//allow decimal with 2
function isNumberwithdecimal(evt, Id) {
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
function isNumbercheck(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;
}

var x = 1;
//add item into grid in othercost Popup form

function OtherCostAdd() {
    if ($.trim($('#account').val()) == "") {
        warningshow('Please Enter Account', 'account');
        return false;
    }
    else if ($.trim($('#hiddenAcountId').val()) == 0) {
        warningshow('Please Enter Valid Account', 'account');
        return false;
    }
    else if ($.trim($('#Othercost').val()) == "" || $.trim($('#Othercost').val()) == 0) {
        warningshow('Please Enter Amount', 'Othercost');
        return false;
    }
    else if ($.trim($('#rategrid').val()) == "" || $.trim($('#rategrid').val()) == 0) {
        warningshow('Please Enter Rate', 'rategrid');
        return false;
    }
    else if ($.trim($('#Currencygrid').val()) == '0') {
        warningshow('Please Select Currency', 'Currencygrid');
        return false;
    }
    else if ($.trim($('#amountFC').val()) == '0' && $.trim($('#Othercost').val()=='.')) {
        warningshow('Please Enter Amount', 'Othercost');
        return false;
    }
    else if ($.trim($('#amountFC').val()) == '0') {
        warningshow('Please Enter Rate', 'rategrid');
        return false;
    }
    else {
        if ($('#AccountType').val() == 'D') {
            $('#debitamount').val($('#Othercost').val())
            $('#debitamountFC').val($('#amountFC').val())
            $('#creditamount').val(0);
            $('#creditamountFC').val(0);            
        }
        else {
            $('#creditamount').val($("#Othercost").val())
            $('#creditamountFC').val($("#amountFC").val())
            $('#debitamount').val(0)
            $('#debitamountFC').val(0)          
        }
    }
        var no = $('#tblOtherCost tr').length + 1;
        var tid = parseInt(x)            
        var OtherCostRow = "<tr class='jsgrid-row' id='costrow_" + tid + "'><td id='costtd_" + tid + "' class='jsgrid-cell'  style='width:46px;text-align:center'>"
                 + no + "<input type='hidden' id='costsl_" + tid + "' value='" + tid + "'></td><td id='col_1' class='jsgrid-cell jsgrid-align-left'  style='width:186px;' ><input type='hidden' id='accid_" + tid + "' value='" + $('#hiddenAcountId').val() + "'><input type='text' id='acc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                 + $('#account').val() + "'></td><td id='col_2' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:224px;' ><input type='text' id='accdesc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                 + $('#accountdescription').val() + "'></td><td class= 'jsgrid-cell jsgrid-align-left' style='width:100px;' ><select id=" + 'select_currency' + tid + " class='form-control' disabled=disabled  onchange='selectdefaultrate(" + tid + ")' style='background-color:white;height:30px;' >"
                 + CurrencySelect + "</select></td><td id='col_2' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:101px;' ><input type='text' id='rate_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' onkeypress='isNumbercheck(event, this)' onkeyup='CalcFCAmountgrid(" + tid + ")'  value='"
                 + parseFloat($('#rategrid').val() || 0) + "'></td><input type='hidden' id='' class='form-control'></td><td id='col_3' class='jsgrid-cell'  style='width:99px;' > <select id='acctype_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' ><option value='C'>Credit</option><option value='D'>Debit</option></select></td><input type='hidden' id='' class='form-control'></td><td id='col_4' class='jsgrid-cell jsgrid-align-center'  style='width:102px;' ><input type='text' id='CreditAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' onkeyup='CalcFCAmountgrid(" + tid + ")' value='"
                 + parseFloat($('#creditamount').val() || 0).toFixed(Decimal) + "'></td><td id='col_5' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='DebitAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' onkeypress='isNumbercheck(event, this)'  onkeyup='CalcFCAmountgrid(" + tid + ")'   value='"
                 + parseFloat($('#debitamount').val() || 0).toFixed(Decimal) + "'></td><td id='col_4' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='CreditAmountFC" + tid + "' class='form-control' disabled style='height:30px;background-color:white' onkeypress='isNumbercheck(event, this)'  onkeyup='CalcBaseAmountgrid(" + tid + ")' value='"
                 + parseFloat($('#creditamountFC').val() || 0).toFixed(Decimal) + "'></td><td id='col_5' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='DebitAmountFC" + tid + "' class='form-control' disabled style='height:30px;background-color:white' onkeypress='isNumbercheck(event, this)' onkeyup='CalcBaseAmountgrid(" + tid + ")'  value='"
                 + parseFloat($('#debitamountFC').val() || 0).toFixed(Decimal) + "'></td><td id='CostEditRow_" + tid + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='CostEditrow(" + tid + ")'><input class='jsgrid-button jsgrid-delete-button'  type='button' onclick='CostDeleterow(" + tid + ")'  title=Delete ></td><td id='CostUpdaterow_" + tid + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='CostUpdaterow(" + tid + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CostCancelEditrow(" + tid + ")'></td></tr>";
        $('#tblOtherCost').append(OtherCostRow);
        $('#acctype_' + tid).val($('#AccountType').val());
        $('#select_currency' + tid).val($('#Currencygrid').val());       
        x++;
        CalcCreditandDebitdiffrence();
        CalcCreditandDebitdiffrenceFC();       
        ClearCostRow();
        $('#account').focus();
}

//curresponding rate of currency in grid
function selectdefaultrate(Id)
{
    $('#rate_' + +Id).val($('#select_currency' + Id).find("option:selected").attr("name"));
    CalcFCAmountgrid(Id);
}
//clear inpopup after adding product
function ClearCostRow()
{
    $('#account').val('');
    $('#accountdescription').val('');
    $('#Othercost').val('');
    $('#creditamount').val('');
    $('#debitamount').val('');
    $('#Othercost').val('');
    $('#amountFC').val('0.00');
    $('#accountdescription').val('Other Cost Against ProductionEntry No: ' + $('#ProNo').val())
    if($('#AccountType').val()=='C')
    {
        $('#AccountType').val('D');
    }
    else if($('#AccountType').val()=='D')
    {
        $('#AccountType').val('C');
    }
}

//claculate diffrence of basecurrency
function CalcCreditandDebitdiffrence()
{
    var totcredit = 0;
    var totdebit = 0;
    var diffrence=0;
    for (m = 0; m < x; m++) {
        totcredit = totcredit +parseFloat($('#CreditAmount_' + m).val()||0);
        totdebit = totdebit + parseFloat($('#DebitAmount_' + m).val() || 0);
        diffrence = totcredit - totdebit;
    }
    $('#totcredit').val((totcredit).toFixed(Decimal));
    $('#totdebit').val((totdebit).toFixed(Decimal));
    $('#costdiff').val((diffrence).toFixed(Decimal));

}
//calculating diffrence of FC in Popup form
function CalcCreditandDebitdiffrenceFC() {
    var totcredit = 0;
    var totdebit = 0;
    var diffrence = 0;
    for (m = 0; m < x; m++) {
        totcredit = totcredit + parseFloat($('#CreditAmountFC' + m).val() || 0);
        totdebit = totdebit + parseFloat($('#DebitAmountFC' + m).val() || 0);
        diffrence = totcredit - totdebit;
    }
    $('#totcreditFC').val((totcredit).toFixed(Decimal));
    $('#totdebitFC').val((totdebit).toFixed(Decimal));
    $('#costdiffFC').val((diffrence).toFixed(Decimal));

}
//editing grid in popup
function CostEditrow(RowId) {
    FlagCostEdit = FlagCostEdit + 1;
    $('#costrow_' + RowId).children('td, th').css('background-color', 'rgb(232, 226, 226)');
    Account = $('#accdesc_' + RowId).val();
    AccType = $('#acctype_' + RowId).val();
    CreditAmt = $('#CreditAmount_' + RowId).val();
    DebitAmt = $('#DebitAmount_' + RowId).val();
    DebitamntFC = $('#DebitAmountFC' + RowId).val();
    CreditamntFC = $('#CreditAmountFC' + RowId).val();
     Rate = parseFloat($('#rate_' + RowId).val()); 
     currency = $('#select_currency' + RowId).val();
     des = $('#accdesc_' + RowId).val();
    $('#CostEditRow_' + RowId).hide();
    $('#CostUpdaterow_' + RowId).show();
    $('#accdesc_' + RowId).prop('disabled', false);
    $('#acctype_' + RowId).prop('disabled', false);
    $('#CreditAmount_' + RowId).prop('disabled', false);
    $('#DebitAmount_' + RowId).prop('disabled', false);
    $('#CreditAmountFC' + RowId).prop('disabled', false);
    $('#DebitAmountFC' + RowId).prop('disabled', false);
    $('#rate_' + RowId).prop('disabled', false);
    $('#select_currency' + RowId).prop('disabled', false);
    $('#accdesc_' + RowId).focus();
    CalcCreditandDebitdiffrenceFC();
    CalcCreditandDebitdiffrence();
}

//update grid in popup
function CostUpdaterow(RowId) {
    var Rate = parseFloat($('#rate_' + RowId).val());
    $('#rate_' + RowId).val(isNaN(Rate) ? 0 : Rate);
    var a = parseFloat($('#DebitAmount_' + RowId).val());
    var b = parseFloat($('#CreditAmount_' + RowId).val());
    var m = parseFloat($('#DebitAmountFC' + RowId).val());
    var n = parseFloat($('#CreditAmountFC' + RowId).val());
    var d = parseFloat($('#CreditAmountFC' + RowId).val());
    var c = parseFloat($('#DebitAmountFC' + RowId).val());
    if ($('#acctype_' + RowId).val() == 'C' && a != 0) {
        warningshow('Debit Amount Should be 0 For Credit Account', 'DebitAmount_' + RowId);
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'D' && b != 0) {
        warningshow('Credit Amount Should be 0 For Debit Account', 'CreditAmount_' + RowId);
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'C' && (b == 0 || $('#CreditAmount_' + RowId).val() == '')) {
        warningshow('Enter Credit Amount', 'CreditAmount_' + RowId);
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'D' && (a == 0 || $('#DebitAmount_' + RowId).val() == '')) {
        warningshow('Enter Debit Amount', 'DebitAmount_' + RowId);
        return false;
    }   
    else if ($('#acctype_' + RowId).val() == 'C' && m != 0) {
        warningshow('DebitFC Amount Should be 0 For Credit', 'DebitAmountFC' + RowId);
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'D' && n != 0) {
        warningshow('Credit Amount Should be 0 For Debit', 'CreditAmountFC' + RowId);
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'C' && (d == 0 || $('#CreditAmountFC' + RowId).val() == '')) {
        warningshow('Enter Credit Rate', 'rate_' + RowId);
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'D' && (c == 0 || $('#DebitAmountFC' + RowId).val() == '')) {
        warningshow('Enter Debit Rate', 'rate_' + RowId);
        return false;
    }
    else {
        $('#CostUpdaterow_' + RowId).hide();
        $('#CostEditRow_' + RowId).show();
        FlagCostEdit = FlagCostEdit - 1;
        $('#costrow_' + RowId).children('td, th').css('background-color', 'white');
        $('#accdesc_' + RowId).prop('disabled', true);
        $('#acctype_' + RowId).prop('disabled', true);
        $('#CreditAmount_' + RowId).prop('disabled', true);
        $('#DebitAmount_' + RowId).prop('disabled', true);
        $('#CreditAmountFC' + RowId).prop('disabled', true);
        $('#DebitAmountFC' + RowId).prop('disabled', true);
        $('#rate_' + RowId).prop('disabled', true);
        $('#select_currency' + RowId).prop('disabled', true);
        var creditamt = parseFloat($("#CreditAmount_" + RowId).val());
        $("#CreditAmount_" + RowId).val(creditamt.toFixed(Decimal));
        var debitamt = parseFloat($("#DebitAmount_" + RowId).val());
        $("#DebitAmount_" + RowId).val(debitamt.toFixed(Decimal));
        CalcCreditandDebitdiffrence();
        CalcCreditandDebitdiffrenceFC();
        Account = ""; AccType = ""; CreditAmt = ""; DebitAmt = "";
    }
}


//cancel edit in grid
function CostCancelEditrow(RowId) {
    FlagCostEdit = FlagCostEdit - 1;
    $('#costrow_' + RowId).children('td, th').css('background-color', 'white');
    $('#accdesc_' + RowId).val(Account);
    $('#acctype_' + RowId).val(AccType);
    $('#CreditAmount_' + RowId).val(CreditAmt);
    $('#DebitAmount_' + RowId).val(DebitAmt);
    $('#CreditAmountFC' + RowId).val(CreditamntFC);
    $('#DebitAmountFC' + RowId).val(DebitamntFC);
    $('#rate_' + RowId).val(Rate); 
    $('#select_currency' + RowId).val(currency);
    $('#accdesc_' + RowId).val(des);
    CalcCreditandDebitdiffrenceFC();
    CalcCreditandDebitdiffrence();
    $('#accdesc_' + RowId).prop('disabled', true);
    $('#acctype_' + RowId).prop('disabled', true);
    $('#CreditAmount_' + RowId).prop('disabled', true);
    $('#DebitAmount_' + RowId).prop('disabled', true);
    $('#CreditAmountFC' + RowId).prop('disabled', true);
    $('#DebitAmountFC' + RowId).prop('disabled', true);
    $('#rate_' + RowId).prop('disabled', true);
    $('#select_currency' + RowId).prop('disabled', true);
    $('#CostUpdaterow_' + RowId).hide();
    $('#CostEditRow_' + RowId).show();
    Account = ""; AccType = ""; CreditAmt = ""; DebitAmt = "";
}
//deleting grid in popup
function CostDeleterow(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('deletecostrow'); $('#ConfirmRowId').val(RowId);    
}
//calculating othercost and add in main form
function SaveOtherCost() {
    rowcount = $('#tblOtherCost tr').length;
    if ($('#costdiff').val() != 0) {
        warningshow('Debit Amount and Credit Amount is not Tally');
        return false;
    }
    else if (rowcount  == 0) {
        warningshow('No Datas Added');
        return false;
    }
   else if ($('#costdiffFC').val() != 0) {
        warningshow('FC Debit Amount and FC Credit Amount is not Tally');
        return false;
    }
    else if (FlagCostEdit != 0) {
        warningshow('Edit Mode! Please Update');
        return false;
    } 
    else if ($.trim($('#Currencygrid').val()) == '0') {
        warningshow('Please Select Currency', 'Currencygrid');
        return false;
    }
    else {      
        $('#totothercost').val($('#totdebit').val());
        $('#totothercostFC').val($('#totdebitFC').val());
        $('#Othercostpopup').hide();
        $('#OtherCostdiv').hide();
        totprodcostcalc();
        CostperItem();
        TotalCostFC();
    }
}

//base amount/rate=FC
function CalcFCAmount()
{
    if ($('#rategrid').val() == '') {
        $('#amountFC').val(0);
    }
   else if ($('#rategrid').val() > 0)
    {
         var FCamnt = 0;
        if ($('#Currencygrid').val() != 0) {
            var amnt = parseFloat($('#Othercost').val() || 0);
            amnt = isNaN(amnt) ? 0 : amnt;
            var rate = parseFloat($('#rategrid').val() || 0);
            rate = isNaN(rate) ? 0 : rate;
            var FCamnt = FCamnt + parseFloat((amnt / rate).toFixed(Decimal));
            $('#amountFC').val(FCamnt)
        }
    }   
 }


//calculating FC amount in othercost popup
function CalcFCAmountgrid(Id) {
    if ($('#rate_' + Id).val() == '') {
        $('#DebitAmountFC' + Id).val(0);
        $('#CreditAmountFC' + Id).val(0);
    }
   else if ($('#rate_' + Id).val() > 0)
    {
        if ($('#rate_' + Id).val() != '' && $('#CreditAmount_' + Id).val() != '') {
            var FCamnt = 0;
            if ($('#select_currency' + Id).val() != 0 && $('#acctype_' + Id).val() == 'C') {
                var amnt = parseFloat($('#CreditAmount_' + Id).val() || 0);
                amnt = isNaN(amnt) ? 0 : amnt;
                var rate = parseFloat($('#rate_' + Id).val() || 0);
                rate = isNaN(rate) ? 0 : rate;
                var FCamnt = FCamnt + parseFloat((amnt / rate).toFixed(Decimal));
                FCamnt = isNaN(FCamnt) ? 0 : FCamnt;
                $('#CreditAmountFC' + Id).val(FCamnt)
            }
            else if ($('#select_currency' + Id).val() != 0 && $('#acctype_' + Id).val() == 'D') {
                var amnt = parseFloat($('#DebitAmount_' + Id).val() || 0);
                amnt = isNaN(amnt) ? 0 : amnt;
                var rate = parseFloat($('#rate_' + Id).val() || 0);
                rate = isNaN(rate) ? 0 : rate;
                var FCamnt = FCamnt + parseFloat((amnt / rate).toFixed(Decimal));
                FCamnt = isNaN(FCamnt) ? 0 : FCamnt;
                $('#DebitAmountFC' + Id).val(FCamnt)
            }
        }
    }
    
}

//base amount in popupp
function CalcBaseAmount() {
    var Baseamnt = 0;
    var amnt = parseFloat($('#amountFC').val() || 0);
    amnt = isNaN(amnt) ? 0 : amnt;
    var rate = parseFloat($('#rategrid').val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var Baseamnt = Baseamnt + parseFloat((amnt * rate).toFixed(Decimal));
    $('#Othercost').val(Baseamnt)
}
//base amount in grid
function CalcBaseAmountgrid(Id) {
    var Baseamnt = 0;
    if ($('#select_currency' + Id).val() != 0 && $('#acctype_' + Id).val() == 'C') {
        var amnt = parseFloat($('#CreditAmountFC' + Id).val() || 0);
        amnt = isNaN(amnt) ? 0 : amnt;
        var rate = parseFloat($('#rate_' + Id).val() || 0)
        rate = isNaN(rate) ? 0 : rate;
        var Baseamnt = Baseamnt + parseFloat((amnt * rate).toFixed(Decimal));
        $('#CreditAmount_' + Id).val(Baseamnt)
    }
    else if ($('#select_currency' + Id).val() != 0 && $('#acctype_' + Id).val() == 'D')
    {
        var amnt = parseFloat($('#DebitAmountFC' + Id).val() || 0);
        amnt = isNaN(amnt) ? 0 : amnt;
        var rate = parseFloat($('#rate_' + Id).val() || 0);
        rate = isNaN(rate) ? 0 : rate;
        var Baseamnt = Baseamnt + parseFloat((amnt * rate).toFixed(Decimal));
        $('#DebitAmount_' + Id).val(Baseamnt)
    }
}

//in main form_total prodcost/rate
function TotalCostFC() {
    var totcostfc = 0;
    if ($('#Rate').val() != 0)
    {
        var totProdcost = parseFloat($('#totprodcost').val() || 0);
        var rates = parseFloat($('#Rate').val() || 0)
        rates = isNaN(rates) ? 0 : rates;
        var totcostfc = totcostfc + parseFloat((totProdcost / rates).toFixed(Decimal));
        $('#totalcostFC').val(totcostfc.toFixed(Decimal));
    }
    if ($('#Rate').val() == 0) {
        $('#totalcostFC').val('0.00');
        $('#costperitem').val('0.00');
        $('#totprodcost').val('0.00');
    }
}

function showFCRow()
{
    $('#calcFC').show();
}

//tot prodcost=othertot cost+base currency in grid(hiddentotal of material)
function totprodcostcalc()
{
    var totcost = 0;
    var costfc = parseFloat($('#hiddenmaterialtot').val() || 0);
    var baseothercost = parseFloat($('#totothercost').val() || 0);
    var totcost = totcost + parseFloat((costfc + baseothercost).toFixed(Decimal));
    $('#totprodcost').val(totcost.toFixed(Decimal))
}

function checkDebitAccounttextempty(evt) {  
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddendebit').val(0);
        $('#txtDacnt').val('');
    }
}

function checkCreditAccounttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddencredit').val(0);
        $('#txtCacnt').val('');
    }
    
}




$(document).keydown(function (e) {
    if (e.altKey && e.keyCode == 83) {                        //Alt+S
        SaveAndUpdate(1)
    }
    else if (e.altKey && e.keyCode == 76) {                 //Alt+L        
        enablenobox();
    }
    else if (e.altKey && e.keyCode == 67) {                  //Alt+C
        createnew();
    }
    else if (e.keyCode == 27) {                           //esc
        productpopuprefresh();

        othercostpopupclose();       
    }
});

//save


function SaveAndUpdate(Flag) {
    rowcount = $('#tblProductionEntry tr').length;
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
    }
    else if ($('#ProdLocation').val() == 0) {
        warningshow('Please Select  Location', 'ProdLocation');
        return false;
    }
    //else if ($('#FC').val() == 0) {
    //    warningshow('Please Select Currency', 'FC');
    //    return false;
    //}
    //else if (($('#DebitAccount').val() != '') && ($('#hiddendebit').val() == 0)) {
    //    warningshow('Please Select A Valid Debit Account', 'DebitAccount');
    //    return false;
    //}
    //else if (($('#CreditAccount').val() != '') && ($('#hiddencredit').val() == 0)) {
    //    warningshow('Please Select A Valid Credit Account', 'CreditAccount');
    //    return false;
    //}
    else if (($('#ProductionItem').val() != '') && ($('#hiddenitemId').val() == 0)) {
        warningshow('Please Select A Valid Item', 'ProductionItem');
        return false;
    }
    //else if ($('#DebitAccount').val() == '') {
    //    warningshow('Please Select A  Debit Account', 'DebitAccount');
    //    return false;
    //}
    //else if ($('#CreditAccount').val() == "") {
    //    warningshow('Please Select A Credit Account', 'CreditAccount');
    //    return false;
    //}
    else if ($.trim($('#ProductionQty').val()) == '') {

        warningshow('Please Enter Production  Quantity', 'ProductionQty');
        return false;
    }
    else if ($('#ProductionItem').val() == "") {
        warningshow('Please Select A Item', 'ProductionItem');
        return false;
    }    
    else if ($('#FC').val() == '0') {
        warningshow('Please Select A Currency', 'FC');
        return false;
    }
    else if ($('#Rate').val() == "" || $('#Rate').val() == 0) {
        warningshow('Please Enter FC Rate', 'Rate');
        return false;
    }
    else if (($('#select_jobno').val() != '') && ($('#ProjectJobId').val() == '0')) {
        warningshow('Please Select A Job Code', 'select_jobno');
        return false;
    }
    else if (rowcount == 0) {
        warningshow('No Products Added', 'txtproduct0');
        return false;
    }
    else {       
        $('#btnsubmit').prop("disabled", true);
        var oArray = new Array();
        for (var k = 1; k < i; k++) {
            var ProductId = $('#ProductId' + k).val();
            var ItemCode = $('#txtprd' + k).val();
            var ItemDescription = $('#txtdesc' + k).val();
            var UnitId = $('#select_unit' + k).val();
            var Quantity = $('#txtqnty' + k).val();
            var Price = $('#rate' + k).val();
            var Total = $('#tamnt' + k).val();
            var Location = $('#ProdLocation').val();
            var Currency = $('#FC').val();
            var ProEntryNo = $('#ProNo').val();
            var ProEntryDate = $('#date').val();
            var DebitAccount = $('#hiddendebit').val();
            var CreditAccount = $('#hiddencredit').val();
            var ProductionItemId = $('#hiddenitemId').val();           
            var Rate = $('#Rate').val();
            var ProductionQuantity = $('#ProductionQty').val();
            var CostPerItem = $('#costperitem').val();
            var TotalCostFC = $('#totalcostFC').val();
            var TotalProdCost = $('#totprodcost').val();
            var MaterialTotal = $('#grandtotal').val();
            var Remarks = $('#Remarks').val();
            var TotalOtherCost = $('#totothercost').val();
            var ProjectJobId = $('#ProjectJobId').val();
            var UserId = ERPUserId;
            var DeptId = ERPDeptId;
            DelFlag = 1;
            var ProductionBatch = $('#ProductionBatch').val();
            var ExpiryDate = $('#ExpiryDate').val();
            var ItemMrp = $('#ItemMrp').val();
            var Sellrate = $('#Sellrate').val();
            var Batch = $('#Batch' + k).val();
            var BatchSNO = $('#BatchSNO' + k).val();
            var Status = '';

            if (typeof (ItemDescription != "undefined")) {
                oArray.push({
                    'ProductId': ProductId,
                    'ItemCode': ItemCode,
                    'ItemDescription': ItemDescription,
                    'UnitId': UnitId,
                    'Quantity': Quantity,
                    'Price': Price,
                    'Total': Total,
                    'Location': Location,
                    'Currency': Currency,
                    'ProEntryNo': ProEntryNo,
                    'ProEntryDate': ProEntryDate,
                    'DebitAccount': DebitAccount,
                    'CreditAccount': CreditAccount,
                    'ProductionItemId': ProductionItemId,
                    'Rate': Rate,
                    'ProductionQuantity': ProductionQuantity,
                    'CostPerItem': CostPerItem,
                    'TotalCostFC': TotalCostFC,
                    'TotalProdCost': TotalProdCost,
                    'MaterialTotal': MaterialTotal,
                    'Remarks': Remarks,
                    'TotalOtherCost': TotalOtherCost,
                    'ProjectJobId': ProjectJobId,
                    'UserId': UserId,
                    'DeptId': DeptId,
                    'DelFlag': DelFlag,
                    'ProductionBatch': ProductionBatch,
                    'ExpiryDate': ExpiryDate,
                    'ItemMrp': ItemMrp,
                    'Sellrate': Sellrate,
                    'Batch': Batch,
                    'BatchSNO': BatchSNO,
                    'Status': Status,

                })
            }
        }
        if (oArray != "") {
            var data = { 'ProductionEntryInsertModel': oArray };
            $.ajax({
                type: "POST",
                url: "../../ProductionEntry/ProductionEntryInsertandUpdate",
                data: data,
                success: function (result) {
                    for (var i = 0; i <= result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        var pronum = result.oList[i].ProEntryNo;
                        if (status == 1) {
                            var bArray = new Array();
                            for (var l = 1; l < x; l++) {
                                var OCId = 0;
                                var Pronum = pronum;
                                var ProDate = ProEntryDate;
                                var PayType = $('#acctype_' + l).val();
                                var AccId = $('#accid_' + l).val();
                                var Description = $('#accdesc_' + l).val();
                                var CurrencyId = $('#select_currency' + l).val();
                                var CurrencyRate = $('#rate_' + l).val();
                                if ($('#acctype_' + l).val() == 'C') {
                                    var OCAmount = parseFloat($('#CreditAmount_' + l).val());
                                    var OCFCAmount = parseFloat($('#CreditAmountFC' + l).val());
                                }
                                else if ($('#acctype_' + l).val() == 'D') {
                                    var OCAmount = parseFloat($('#DebitAmount_' + l).val());
                                    var OCFCAmount = parseFloat($('#DebitAmountFC' + l).val());
                                }
                                var DelFlag = 1;
                                if (!(typeof AccId == "undefined")) {
                                    bArray.push({
                                        'OCId': OCId,
                                        'Pronum': Pronum,
                                        'ProDate': ProDate,
                                        'PayType': PayType,
                                        'AccId': AccId,
                                        'Description': Description,
                                        'OCAmount': OCAmount,               //BaseCurrency
                                        'OCFCAmount': OCFCAmount,           //ForeignCurrency                                       
                                        'CurrencyId': CurrencyId,
                                        'CurrencyRate': CurrencyRate,
                                        'UserId': ERPUserId,
                                        'DepartmentId': ERPDeptId,
                                        'DeleteFlag': DelFlag
                                    })
                                }
                            }
                            if (bArray != "") {
                                var data = { 'ProductionEntryInsertModel': bArray };
                                $.ajax({
                                    type: "POST",
                                    url: "../../ProductionEntry/OtherCostInsertandUpdate",
                                    data: data,
                                    success: function (result) {
                                        $('#btnsubmit').prop("disabled", false);
                                        if (status != 0) {
                                            Showalerts(status, pronum);
                                            formrefresh();
                                        }
                                        else {
                                            $('#tblAlert tr').remove();
                                            $('#alertpopup').show();
                                            $('#alertdiv').show();
                                            var Prod1 = "<tr class='jsgrid-row'><td colspan=4><h2 style='color:#FF586B'>Not enough quantity on Stock!</h2></td></tr>" +
                                                 "<tr class='jsgrid-row' style='color:#607D8B'><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Quantity</th></tr>";
                                            $('#tblAlert').append(Prod1);
                                            for (var i = 0; i <= result.oList.length; i++) {
                                                var Prod =
                                                "<tr class='jsgrid-row'>" +
                                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ItemCode + "</td>" +
                                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ItemName + "</td>" +
                                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Quantity + "</td></tr>";
                                                $('#tblAlert').append(Prod);
                                                $('#btntermssave').focus();
                                            }
                                        }
                                    }
                                });
                            }
                            else {
                                $('#btnsubmit').prop("disabled", false);
                                if (status != 0) {
                                    Showalerts(status, pronum);
                                    formrefresh();
                                }
                                else
                                {
                                    $('#tblAlert tr').remove();
                                    $('#alertpopup').show();
                                    $('#alertdiv').show();
                                    for (var i = 0; i <= result.oList.length; i++) {
                                        var Prod =
                                             "<tr class='jsgrid-row'><td colspan=3><h2>Not enough quantity on hand!</h2></td></tr>" +
                                        "<tr class='jsgrid-row'><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</td><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</td><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Quantity</td></tr>" +
                                        "<tr class='jsgrid-row'>" +
                                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ItemCode + "</td>" +
                                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ItemDescription + "</td>" +
                                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Quantity + "</td></tr>";
                                        $('#tblAlert').append(Prod);
                                    }
                                }
                            }
                        }
                        else {
                            $('#btnsubmit').prop("disabled", false);
                            if (status != 0) {
                                Showalerts(status, pronum);
                                formrefresh();
                            }
                            else
                            {
                                $('#tblAlert tr').remove();
                                $('#alertpopup').show();
                                $('#alertdiv').show();
                                for (var i = 0; i <= result.oList.length; i++) {
                                    var Prod =
                                         "<tr class='jsgrid-row'><td colspan=3><h2>Not enough quantity on hand!</h2></td></tr>" +
                                    "<tr class='jsgrid-row'><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</td><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</td><td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Quantity</td></tr>" +
                                    "<tr class='jsgrid-row'>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ItemCode + "</td>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ItemDescription + "</td>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Quantity + "</td></tr>";
                                    $('#tblAlert').append(Prod);
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}



//show alerts
function Showalerts(status, pronum) {
    if (status == 1) {       
        swal('Production Entry Number: ' + pronum, " Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
}
//refersh form
function formrefresh()
{
   
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
    }
    else {
      
        var a = '0.00';
        copyflag = 0;
        $('#DebitAccount').val('');
        $('#CreditAccount').val('');
        $('#Rate').val($('#FC').find("option:selected").attr("name"));
        $('#ProductionItem').val('');
        $('#ProdLocation').val('');
        $('#ProductionQty').val('');
        $('#grandtotal').val(a);
        $('#totothercost').val(a);
        $('#costperitem').val(a);
        $('#totalcostFC').val(a);
        $('#totprodcost').val(a);
        $('#Remarks').val('');
        $('#hiddenitemId').val('');
        $('#select_jobno').val('');
        $('#ProjectJobId').val('');
        $('#ProdLocation').val('0');
        $('#hiddenquantitycheck').val('0');
       
        serialnoload();
        AccountLoad(2);
        $("#tblProductionEntry tr").remove();
        $("#tblOtherCost tr").remove();
        $('#btnsubmit').show();
        $('#btnlist').show();
        $('#ProNo').select();
        $('.form-control').prop("disabled", false);
        $('#ProNo').prop('disabled', true);
        $('#itemadd').prop('disabled', false);
        $('#btnadd').prop('disabled', false);
        $('#btnadditem').prop('disabled', false);
        $('#txttotal').prop('disabled', false);
        $('#GrandTotal').prop('disabled', false);
        $('#btncrncysave').prop('disabled', false);
        $('#othercostaddbtn').prop('disabled', false);
       // $('#btntrnsfr').prop('disabled', false);
        $('#txtproduct0').prop('disabled', false);
        $('#txtproduct0').css("background-color", 'white');
        $('#txttotal').prop('disabled', true);
        $('#txttotal').css("background-color", 'white');
        popupformrefresh();
        productpopuprefresh();
        crncyload();
        $('#ProdLocation').val(UserLocationId);
       // $('#ProdLocation').focus();
        $('#btnprint').hide();
        $('#txtproduct0').val('');
        $('#txtquantity').val('');
        $('#txtrate').val('');
        $('#select_unitProd').val('0');
        $('#txttotal').val('0.00');
        $('#BatchSNO0').val('');
        $('#hiddenquantitycheck').val(0);
        $("#Batch0").val('');
        $('#ProductionBatch').val('');
        $('#ExpiryDate').val('');
        $('#ItemMrp').val('');
        $('#Sellrate').val('');
        $('#ProductionItem').focus();
    }
}
//default generation of Production Entry No
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
    var x = result[0].ProdEntryNo;
    if (x == 0) {
        $('#confirmff,#keyboardff').show();
    }
    else {
        $('#ProNo').val(result[0].ProdEntryNo);
        $('#accountdescription').val('Other Cost Against Production EntryNo: ' + result[0].ProdEntryNo);
    }   
}
//warning show common
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}
//copy

function enablenobox() {
    var rowcount = document.getElementById('tblProductionEntry').rows.length;
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
        return false;
    }
    else if (rowcount > 0) {
        $('#Confirmflag').val('copy'), $('#ConfirmRowId').val(1)
        $('#confirmmessage').text('Data Will be Lost.Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').focus();
    }
    else if (rowcount == 0) {
        enablecopy();
    }   
}

function createnew() {
    if (editflag != 0) {
        warningshow('You Are In Edit Mode');
    }
    else {
        var rowcount = document.getElementById('tblProductionEntry').rows.length;
        if (rowcount > 0 && copyflag == 0) {
            $('#Confirmflag').val('createnew'), $('#ConfirmRowId').val(1)
            $('#confirmmessage').text('Data Will be Lost.Do you want to Continue?')
            $('#confirm').show();
            $('#confirmOk').focus();
        }
        else  {
            formrefresh();
            $('#tour1').fadeOut();
        }        
    }
}
//copy grid
function ProductionEntryGet(result) {   
    var rowcount = document.getElementById('tblProductionEntry').rows.length;
    if (rowcount == 0) {
        i = 1;
    }    
    for (var m = 0; m <= result.length; m++) {
        var slno = parseInt(i);
       
        var ProdRow = "<tr  id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:4%;text-align:center >"
           + slno + "<input type='hidden' id='SlNo" + slno + "' value=" + slno + "></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;text-align:center' ><input type='hidden' id='ProductId" + slno + "' value='" + 0+ "'/> <input type='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
           + result[m].ItemCode +  "'></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:20%;text-align:center' display='none;'> <input type='text' class='form-control'  disabled  style='background-color:white;height:30px;' id='txtdesc" + slno + "' value='"
          + result[m].ItemDescription + "'> </td> <td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:15%;text-align:center' ><input type='hidden' id='BatchSNO" + slno + "' value='" + result[m].BatchSNO + "'/> <input type='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;' id='Batch" + slno + "' value='"
           + result[m].Batch + "'></td> <td class= jsgrid-cell jsgrid-align-center  style='width:6%; text-align:center'> <select id=" + 'select_unit' + slno + " class='form-control' disabled=disabled style='background-color:white;height:30px;' >"
          + UnitSelect + "</select></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;'  onkeyup='tot_row(" + slno + ")' onkeypress='return isNumber1(event)' id='txtqnty" + slno + "' value='"
          + result[m].Quantity + "'><input type='hidden' id='hiddenqty" + slno + "' value='" + parseInt($('#txtquantity').val()) + "'/> </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;' onkeyup='tot_row(" + slno + ")'  onkeypress='isNumbercheck(event,this)'  id='rate" + slno + "' value="
          + (result[m].Price.toFixed(Decimal)) + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:6%;' ><input typ='text' class='form-control text-center' disabled=disabled  style='background-color:white;height:30px;background-color:white'readonly onkeyup=''   id='tamnt" + slno + "' value="
          + (result[m].Total.toFixed(Decimal)) + "><td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style= width:4%; ><input class= 'jsgrid-button jsgrid-edit-button' onclick='Editrow(" + slno + ")' style='display:none;' id='Edit' type=button title=Edit ><input class= 'jsgrid-button jsgrid-delete-button' style='display:none;'  type= button id='delete' title= Delete onclick='rowdelete(" + slno + ")' ></td><td id='Update"
           + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title=Update style='' ><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit'  ></td>";
        $('#tblProductionEntry').append(ProdRow);
        $('#select_unit' + slno).val(result[m].UnitId);
        grandtotal(slno);
        i++;
    }
}

//copy in popup grid
function OtherCostGet(result) {
    $('#accountdescription').val('')
    var rowcount = document.getElementById('tblOtherCost').rows.length;
    if (rowcount == 0) {
        x = 1;
    }
    for (var m = 0; m <= result.length; m++) 
        {
        var tid = parseInt(x);
        if (result[m].VType == 'C') {
            var baseamntC = (result[m].BaseAmount.toFixed(Decimal));
            var baseamntD = 0.00;
            var baseamntFCD = 0.00;
            var baseamntFCC = (result[m].FCAmount.toFixed(Decimal));
        }
        else if (result[m].VType == 'D') {

            var baseamntD = (result[m].BaseAmount.toFixed(Decimal));
            var baseamntC = 0.00;
            var baseamntFCD = (result[m].FCAmount.toFixed(Decimal));
            var baseamntFCC = 0.00;
        }
        var OtherCostRow = "<tr class='jsgrid-row' id='costrow_" + tid + "'><td id='costtd_" + tid + "' class='jsgrid-cell'  style='width:50px;text-align:center'>"
                + tid + "<input type='hidden' id='costsl_" + tid + "' value='" + tid + "'></td><td id='col_1' class='jsgrid-cell jsgrid-align-left'  style='width:200px;' ><input type='hidden' id='accid_" + tid + "' value='" + result[m].AccId + "'><input type='text' id='acc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                + result[m].Acc_Description + "'></td><td id='col_2' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:200px;' ><input type='text' id='accdesc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                + result[m].VDescription + "'></td><td class= 'jsgrid-cell jsgrid-align-left' style='width:150px;' ><select id=" + 'select_currency' + tid + " class='form-control' disabled=disabled   style='background-color:white;height:30px;' >"
                + CurrencySelect + "</select></td><td id='col_2' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><input type='text' id='rate_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumbercheck(event, this)' onkeyup='CalcBaseAmountgrid(" + tid + ")'  value='"
                + $('#rategrid').val() + "'></td><input type='hidden' id='' class='form-control'></td><td id='col_3' class='jsgrid-cell'  style='width:100px;' > <select id='acctype_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' ><option value='C'>Credit</option><option value='D'>Debit</option></select></td><input type='hidden' id='' class='form-control'></td><td id='col_4' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='CreditAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' onkeyup='CalcFCAmountgrid(" + tid + ")' value='"
                + result[m].CurrencyRate + "'></td><td id='col_5' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='DebitAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumbercheck(event, this)'  onkeyup='CalcFCAmountgrid(" + tid + ")'   value='"
                + baseamntC + "'></td><td id='col_4' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='CreditAmountFC" + tid + "' class='form-control' disabled style='height:30px;background-color:white' onkeypress='isNumbercheck(event, this)'   onkeyup='CalcBaseAmountgrid(" + tid + ")' value='"
                + baseamntD + "'></td><td id='col_5' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='DebitAmountFC" + tid + "' class='form-control' disabled style='height:30px;background-color:white'   onkeypress='isNumbercheck(event, this)'  onkeyup='CalcBaseAmountgrid(" + tid + ")'  value='"
                + baseamntFCD + "'></td><td id='col_5' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='CreditAmountFC" + tid + "' class='form-control' disabled style='height:30px;background-color:white' onkeypress='isNumbercheck(event, this)'   onkeyup='CalcBaseAmountgrid(" + tid + ")'  value='"
                 + baseamntFCC + "'></td>";
        $('#tblOtherCost').append(OtherCostRow);
        $('#acctype_' + tid).val($('#AccountType').val());
        $('#select_currency' + tid).val($('#Currencygrid').val());
        x++;       
    }
}
//clear when searching another number in copy
function checkProtextempty() {
    $('#tour1').fadeOut();
    $('#DebitAccount').val('');
    $('#CreditAccount').val('');
    $('#ProductionQty').val('');
    $('#ProdLocation').val('1');
    $('#totprodcost').val('0.00');
    $('#ProductionItem').val('');
    $('#totalcostFC').val('0.00');
    $('#costperitem').val('0.00');
    $('#totalcostFC').val('0.00');
    $('#totothercost').val('0.00');
    $('#grandtotal').val('0.00');
    $("#tblProductionEntry tr").remove();
    $("#tblOtherCost tr").remove();
}
//check quantity
function checkquantity() {
    if (parseInt($('#txtquantity').val()) > parseInt($('#hiddenquantitycheck').val())) {
        $('#txtquantity').val('');
        warningshow(' Available Stock is:' + $('#hiddenquantitycheck').val() + '');
    }
}





//for product list popup
var custstats = "Last Selling Price";
function CustPrdctLoad(result) {
    for (var n = 0; n < result.length; n++) {
        var custstat;
        if (result[n].LastSellingPrice == 0) {
            custstat = "Last Selling Price";
        }
        else {
            custstat = result[n].custstats;
        }
        $('#productpopupdiv').show();
        $('#prodheader').text('Location Stock Details');
        $('#productdiv').show();
        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");
        var strr3 = strr2.replace(/,/gi, "&nbsp;");
        //var m = strr2.length;      
        var ProdRow =
              "<tr class='jsgrid-row' id='pdctrow'>" +
              "<td style='border:none;'><b>Average Cost :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + " style='height:30px;background-color:white;border:none'></td>" +
              "<td style='border:none;'><b>Last Purchase Cost :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + " style='background-color:white;height:30px;border:none'></td>" +
              "<td style='border:none;'><b>" + custstat + " :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "  style='background-color:white;height:30px;border:none'></td>" +
              "<td style='border:none;'><b>Total Stock :</b> <input type='text' disabled='' class='text-center' value=" + (result[n].Sumtotqty || 0) + " style='background-color:white;height:30px;border:none'></td>" +
              "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input style='height:30px' class='jsgrid-button jsgrid-update-button' id='Update' type='button' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' style='height:30px' type='button' id='canceledit'  title='Cancel edit'></td></tr>" +
              "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr3 + "</td ></tr>";
        $('#tblproductdetails').append(ProdRow);
    }
}
function productpopuprefresh() {
    $('#productpopupdiv').hide();
    $('#pdctrow').remove();
    $('#pdctrow1').remove();
    $('#custlsp').hide();
}

function alertpopuprefresh(e) {
    $('#alertpopup').hide();
    $('#alertdiv').hide();

}
function Printfunction()
{
    var AmountinWords = convertNumberToWords($('#totprodcost').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td><td align=right><h2>Production Entry</h2></td></tr> <tr><td></td><td align=right><h3></h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td colspan=8><hr></td></tr><tr><td>#</td><td>Code</td><td>Description</td><td>Unit</td><td>Qty</td><td align=right>Rate</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= 10; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtprd' + Id).length) {

            myWindow.document.write('<tr><td>' + Id + '</td><td>' + $('#txtprd' + Id).val() + '</td><td>' + $('#txtdesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtqnty' + Id).val() + '</td><td align=right>' + $('#rate' + Id).val() + '</td> <td align=right>' + $('#rate' + Id).val() + '</td></tr>');
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=7></td></tr>');
        }

    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#totprodcost').text() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>Company Name</td></tr><tr><td colspan=8>Tel:+971-4-1111111</td></tr><tr><td colspan=8>Fax:+971-4-1111111</td></tr><tr><td colspan=8>Email:commail@mail.com</td></tr><tr><td colspan=8>PO.BOX:6666</td></tr>');
    myWindow.print();
}
