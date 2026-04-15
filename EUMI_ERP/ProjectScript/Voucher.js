 
var decimal = Decimal;
var selectadvance = 0;
var CopyFlag = 0;

function AccountTypeLoad(result) {
    $("#AccountType").empty();
    $("#AccountType").append("<option value='0'>Select</option>");   
    for (var i = 0; i < result.length; i++) {
        $("#AccountType").append("<option name='" + result[i].AccountTypeCode + "' value='" + result[i].Id + "' data-foo='" + result[i].AccountTypeId + "'>" + result[i].AccountTypeName + "</option>");
    }
}
var BaseCurrency = 0;
function CurrencyLoad(result) {    
    $("#Currency").empty();
    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {            
            BaseCurrency = result[i].BaseCurrencyId;
        }
        $("#Currency").append("<option  name='" + result[i].CurrencyRate + "' value='" + result[i].Id + "'>" + result[i].CurrencyName + "</option>");
    }
    $('#Currency').val(BaseCurrency);
    $("#Rate").val($("#Currency").find("option:selected").attr("name"));
}
function CostCenterLoad(result) {
    $("#CostCenterCode").empty();
    $("#CostCenterCode").append("<option value='0'>Select</option>");
    for (var i = 0; i < result.length; i++) {
        $("#CostCenterCode").append("<option value='" + result[i].CostCenterId + "'>" + result[i].CostCenterCode + "</option>");
    }
}
function BankLoad(result) {
    $("#Bank").empty();
    $("#Bank").append("<option value='0'>Select</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Bank").append("<option value='" + result[i].BankId + "'>" + result[i].BankName + "</option>");
    }
}
function checkjobempty() {
    $('#PJobCode').val(0);
}
function CustEmpty() {
    $('#supplierId0').val('');
    $('#AccCode').val('');
    $('#PendingInvoices').html('');
    responseText4 = "";
}

function CurrencyChange(Id) { 
    $('#Rate').val($('#' + Id).find("option:selected").attr("name"));
    var fcamt = parseFloat($('#Amount').val() || 0) / parseFloat($('#Rate').val() || 0);
    $('#FCAmount').val(fcamt.toFixed(decimal));        
}

var extra = 0;
function AccTypeChange(Id) {
    $('#AccountTypeCode').val($('#' + Id).find("option:selected").attr("name"));
    extra = $('#' + Id).find("option:selected").data('foo');
}

function serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../AccountsErp/VoucherNoGetandGets",
        data: srlno,
        success: function (result) {
            getslno(result.oList);

        }
    });
}

//Date Picker Function
$(function () {
    $('#VoucherDate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
});

$(function () {
    $('#ChequeDate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth()+6, new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
});


$(document).ready(function () {
    if ((usermenu1.indexOf("M305") != -1)) {
        $('#RVViewFiles').show();
    }
    serialnoload();
    Defaultfocus();    
    $('#Credit').val('0.00');
    $('#Debit').val('0.00');
    $('#Diff').val('0.00');
    $('#VoucherDate').val(CurDate);
    $('#ChequeDate').val('');
    $("#AccountType").change(function (e) {      
        var selectedvalue = $("#AccountType").val();
        if (selectedvalue == 1 || selectedvalue == 0) {
            $("#ChequeDate").prop('disabled', 'disabled');
            $("#ChequeDate").val('');
            $("#ChequeNo").prop('disabled', 'disabled');
            $("#ChequeNo").val('');
            $("#Bank").prop('disabled', 'disabled');
            $("#Bank").val('0');
            $("#Type").prop('disabled', 'disabled');
        }
        else {

            $("#Bank").val('0');
            $("#ChequeDate").prop('disabled', false);
            $("#ChequeDate").val(CurDate);
            $("#ChequeNo").prop('disabled', false);
            $("#Bank").prop('disabled', false);
            $("#Type").prop('disabled', false);
        }
    });

    $('#btncopy').click(function () {
        $("#btnsubmit").hide();
        $('#RVfileUpload').hide();
        $('#btnuploadpurchasefiles').hide();
        $('#VoucherNo').prop('readonly', false); 
        $('#VoucherNo').focus();
        $('#VoucherNo').select();
    });

    //$("#VoucherNo").keydown(function (e) {

    //    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    //    if (key == 13) {
    //        $('#AccountType').prop('disabled', true);
    //        $('#Type').prop('disabled', true);
    //        $('#ChequeNo').prop('disabled', true);
    //        $('#ChequeDate').prop('disabled', true);
    //        $('#Bank').prop('disabled', true);
    //        $('#AccountName').prop('disabled', true);
    //        $('#VoucherDate').prop('disabled', true);
    //        $('#CostCenterCode').prop('disabled', true);
    //        $('#select_jobno').prop('disabled', true);
    //        $('#Amount').prop('disabled', true);
    //        $('#Currency').prop('disabled', true);
    //        $('#Rate').prop('disabled', true);
    //        $('#FCAmount').prop('disabled', true);
    //        e.preventDefault();

    //        var VoucherNo = $('#VoucherNo').val();
    //        var vtype = "RV";
    //        $('#VoucherNo').val(VoucherNo);
    //        var srlno = {};
    //        srlno.VoucherNo = VoucherNo;
    //        srlno.VoucherType = vtype; 
    //        $.ajax({
    //            type: "POST",
    //            url: "../AccountsErp/ReceiptVoucherGetandGets",
    //            data: srlno,
    //            success: function (result) {
    //                VoucherNoGets(result);
    //                // serialnoload();
    //                $('#btnsubmit').focus();
    //            }
    //        });
    //    }

    //});

  

    $("#AccountType").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($("#AccountType").val() == 1 || $("#AccountType").val() == 0) {
                $("#Amount").focus();
            }
            else {
                $("#Type").focus();
            }
        }
    });
     $("#Type").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#ChequeNo').focus();
            e.preventDefault();
        }
    });
    $("#ChequeNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#ChequeDate').focus();
            e.preventDefault();
        }
    });
    $("#ChequeDate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Bank').focus();
            e.preventDefault();
        }
    });
    $("#Bank").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Amount').focus();
            e.preventDefault();
        }
    });

    $("#Amount").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnsubmit').focus();
            e.preventDefault();
        }
    });
    $("#Currency").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Rate').focus();
            e.preventDefault();
        }
    });
    $("#Rate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#FCAmount').focus();
            e.preventDefault();
        }
    });
    $("#FCAmount").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnsubmit').focus();
            e.preventDefault();
        }
    });
    $("#CostCenterCode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_jobno').focus();
            e.preventDefault();
        }
    });
    $("#Advance").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnsubmit').focus();
            e.preventDefault();
        }
    });

    $('#btnok').click(function () {
        PrintthisBill();
        alertpopuprefresh();
        formrefresh();
    });
    $('#onaccountbtnok').click(function () {        
        PrintthisBill();
        $('#onaccountalertpopup').hide();
        $('#Popup').show();
        GetList(0);
    });
    $('#btncnclalrt').click(function () {
        alertpopuprefresh();
        formrefresh();
        //  Tbldelete();
    });
    $('#onaccountbtncnclalrt').click(function () {
       
        $('#onaccountalertpopup').hide();
        $('#Popup').show();
        GetList(0);
    });

    var data2 = {};
    data2.AccountTypeId = 0;
    data2.DeptId = ERPDeptId;
    data2.flag = 1;
    $.ajax({        
        type: "POST",
        url: "../Master/AccountTypeGetandGets",
        data: data2,
        success: function (result) {
            AccountTypeLoad(result.oList);
        }
    });

    var data7 = {};
    data7.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data: data7,
        success: function (result) {
            CurrencyLoad(result.oList);
        }
    });

    var data5 = {};
    data5.CostCenterId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CostCenterGetandGets",
        data: data5,
        success: function (result) {
            CostCenterLoad(result.oList);

        }
    });

    var data6 = {};
    data6.BankId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/BankGetandGets",
        data: data6,
        success: function (result) {
            BankLoad(result.oList);

        }
    });
    $("#AccountName").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {         
            //GetList(0);
            $('#AccountType').focus();
            e.preventDefault();
        }
    });

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1);
       
    });

    $("#btndelete").click(function (e) {
        var Res = confirm("Do You Want Delete this record?")
        if (Res == true)
            SaveAndUpdate(0)
    });

});

//Seriel No Get
function getslno(result) {
    for (var k = 0; k < result.length; k++) {
        $('#VoucherNo').val(result[k].RVNo);
    }
}





function VoucherNoGets(result) {

  
    CopyFlag = 1;
    i = 1;
  //  var Totrecv = 0;
    for (var n = 0; n < result.length; n++) {
        $('#VoucherNo').val(result[n].VoucherNo);
        $('#AccountType').val(result[n].VoucherNo);
        $('#Type').val(result[n].TxnType);
        $('#ChequeNo').val(result[n].ChequeNo);
        $('#ChequeDate').val(result[n].ChequeDate);
        $('#Bank').val(result[n].BankName);
        $('#AccountName').val(result[0].Customer);
        $('#VoucherDate').val(result[n].VoucherDate);
        $('#CostCenterCode').val(result[n].costcenter);
        $('#select_jobno').val(result[n].ProjectJob);
        $('#Currency').val(result[n].CurrencyId);
        $('#Rate').val(result[n].CurrencyRate);
        $('#FCAmount').val(result[n].FCRecAmnt);
        $('#InvoNo').text(result[n].ReferenceNo);
        $('#VEDescription').val(result[n].VoucherEntryDescription);
        $('#InvoDate').val(result[n].VoucherDate);
        $('#RecAmount').val(result[n].RecAmnt);
        $('#BalAmount').val(result[n].BalAmnt);
        $('#GCurrency').val(result[n].CurrencyName);
        $('#GRate').val(result[n].CurrencyRate);
        $('#GFCAmount').val(result[n].FCBaseAmt);
        $('#FCRecAmount').val(result[n].FCRecAmnt);
        $('#BalFCAmount').val(result[n].FCBalAmnt);
        $('#Amount').val(result[n].RecAmnt);
      //  Totrecv = Totrecv + result[n].RecAmnt;

        var id = parseInt(i);
        var ProdRow = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
       
   "<td id=" + 'col' + id + " class='jsgrid-cell' style='width:30px;text-align:center'> <input id='SlNoCheck" + id + "'  type='checkbox' disabled='disabled' checked></td>" +
   "<td id=" + 'col' + id + " class='jsgrid-cell' style='width:50px;text-align:center'>" + (n + 1) + "</td>" +
   "<td class='jsgrid-cell jsgrid-align-right' style='width:100px;text-align:center' id='InvoNo" + id + "'>" + result[n].ReferenceNo + "</td>" +
   "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:250px' id='VEDescription" + id + "'>" + result[n].VoucherEntryDescription + "</td>" +
    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:110px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px;border:none' id='InvoDate" + id + "' value='" + result[n].VoucherDate + "' ></td>" +
    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:150px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px;border:none' id='Amount" + id + "' value='" + result[n].BaseAmt + "' ></td>" +
    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:150px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px;border:none' id='RecAmount" + id + "' value='" + result[n].RecAmnt + "' ></td>" +
    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:150px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px;border:none' id='BalAmount" + id + "' value='" + result[n].BalAmnt + "' ></td>" +
    "<td class='jsgrid-cell jsgrid-align-center' style='width:150px'><input typ='text' class='form-control text-center' disabled id='GCurrency" + id + "' value=" + result[n].CurrencyName + " style='height:30px;background-color:white;border:none'></td>" +
    "<td class='jsgrid-cell jsgrid-align-center' style='width:150px'><input typ='text' class='form-control text-center' disabled id= 'GRate" + id + "' value=" + result[n].CurrencyRate + " style='height:30px;background-color:white;border:none'></td>" +
    "<td class='jsgrid-cell jsgrid-align-center' style='width:150px'><input typ='text' class='form-control text-center' disabled id= 'GFCAmount" + id + "' value=" + result[n].FCBaseAmt + " style='height:30px;background-color:white;border:none'></td>" +
    "<td class='jsgrid-cell jsgrid-align-center' style='width:150px'><input typ='text' class='form-control text-center' disabled id= 'FCRecAmount" + id + "' value=" + result[n].FCRecAmnt + " style='height:30px;background-color:white;border:none'></td>" +
    "<td class='jsgrid-cell jsgrid-align-center' style='width:150px'><input typ='text' class='form-control text-center' disabled id= 'BalFCAmount" + id + "' value=" + result[n].FCBalAmnt + " style='height:30px;background-color:white;border:none'></td></tr>";

        //if (result[n].VoucherType == 'C') {
            $('#PendingInvoices').append(ProdRow);
            i++;
        //}


        $('#AccountType').prop('disabled', true);
        $('#Type').prop('disabled', true);
        $('#ChequeNo').prop('disabled', true);
        $('#ChequeDate').prop('disabled', true);
        $('#Bank').prop('disabled', true);
        $('#AccountName').prop('disabled', true);
        $('#VoucherDate').prop('disabled', true);
        $('#CostCenterCode').prop('disabled', true);
        $('#select_jobno').prop('disabled', true);
        $('#Amount').prop('disabled', true);
        $('#Currency').prop('disabled', true);
        $('#Rate').prop('disabled', true);
        $('#FCAmount').prop('disabled', true);

    }
    
}





function Defaultfocus() {
    $('#AccountName').focus();
}

//Calculating BaseAmount with FC & Rate
function CalculateAmount() {
    var fca = parseFloat($("#FCAmount").val() || 0);
    fca = isNaN(fca) ? 0 : fca;
    var data9 = fca * parseFloat($("#Rate").val()||0);
    $("#Amount").val(data9.toFixed(decimal)||0);    
}

//Rate Keyup function
function CalculateFCAmount(){
    if ($("#Rate").val()>0) {
        var fc = 0;
        var rt = $("#Rate").val();
        rt = isNaN(rt) ? 0 : rt;
        fc = $("#Amount").val() / rt;
        fc = isNaN(fc) ? 0 : fc;
        $("#FCAmount").val(fc.toFixed(decimal));
    }
    else if ($("#Rate").val() == 0) {
        $("#FCAmount").val(0);
    }
    else {
        $("#FCAmount").val(0);
    }
}





function SaveAndUpdate(Flag) {
    if ($('#AccountName').val() == 0) {
        warningshow('Please select Customer', 'AccountName');
    }
    else if ($.trim($('#supplierId0').val()) == 0) {
        warningshow('Please Select a Valid Account', 'AccountName');
    }
    else if ($('#VoucherDate').val() == "") {
        warningshow('Please Enter Voucher Date', 'VoucherDate');
    }
    else if ($('#AccountType').val() == 0) {
        warningshow('Please Enter Account Type', 'AccountType');
    }
   
    else if ($('#Amount').val() == 0) {
        warningshow('Please Enter Voucher Amount', 'Amount');
    }
    else if (($("#AccountType").val() == 2 || $("#AccountType").val() == 3) && $('#Type').val() == 0) {
      
        warningshow('Please Select Transaction Type', 'Type');
    }
    else if (($("#AccountType").val() == 2 || $("#AccountType").val() == 3) && $('#ChequeNo').val()=='') {
        warningshow('Please Enter ChequeNo', 'ChequeNo');
    }
    else if (($("#AccountType").val() == 2 || $("#AccountType").val() == 3) && $('#Bank').val() == 0) {
        warningshow('Please Select Bank', 'Bank');
    }    
    else if (($('#select_jobno').val() != '') && ($('#PJobCode').val() == 0)) {
        warningshow('Please Select a Valid JobCode', 'select_jobno');
    }
    else if (($('#Rate').val() == '') || ($('#Rate').val() == 0)) {
        warningshow('Please enter Rate', 'Rate');
    }
    else if ($('#Diff').val() != 0 && $("#Advance").prop("checked") == false) {
        warningshow('Debit & Credit are not tally, Please check the Advance', 'Advance');        
    }
    else if ($('#Diff').val() <= 0 && $("#Advance").prop("checked") == true) {
        warningshow('Balance Amount is ZERO please uncheck the Advance');
    }

    else {
        $("#confirmOk").prop('disabled', false);
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('save'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do You Want To Save The Voucher?');
       
    }
  



   
  
}


function savesales()
{
    $('#btnsubmit,#confirmOk').prop('disabled', true);

    if ($('#RefNo').val() == '')
        $('#RefNo').val(0) 

    var Count = parseInt($('#txtRowCount').val())
    var oArray = new Array();

    //Common Fildes - Save (Main Row)
    var VoucherTypeId = 2;
    var ProductId = 0;
    var VoucherDate = $('#VoucherDate').val();
    var VoucherNo = $('#VoucherNo').val();
    var ReferenceNo = $('#RefNo').val().substring(0, 40);
    var ProjectJobId = $('#PJobCode').val();
    var CostCenterId = $('#CostCenterCode').val();
    var CurrencyId = $('#Currency').val();
    var CurrencyRate = $('#Rate').val();
    var FCAmount = $('#FCAmount').val();
    var BankId = $('#Bank').val();
    var TxnType = $('#Type').val();
    var ChequeNo = $('#ChequeNo').val();
    if ($('#ChequeDate').attr('readonly') == 'readonly') {
        var ChequeDate = 0;
    }
    else {
        var ChequeDate = $('#ChequeDate').val();
    }

    //Grid Fields - Save (Sub Rows)
    var chklegn = parseInt($('#txtRowCount').val() || 0);
    for (var i = 1; i <= chklegn; i++) {
        if ($("#SlNoCheck" + i).is(":checked")) {
            var VType = 'C';
            var BillSerId = $('#BillSerNo' + i).text();
            var AccountId = $('#supplierId' + i).val();
            var AccCode = $('#AccCode').val();
            var VoucherEntryDescription = $('#VEDescription' + i).text();
            var Amount = $('#RecAmount' + i).val();
            var ReferenceNo = $('#InvoNo' + i).text();
            var FCAmount = $('#FCRecAmount' + i).text();

            DelFlag = $('#Dvid' + i).text();
            var UserId = ERPUserId;
            var DeptId = ERPDeptId;
            var VoucherTypePrefix = "RV";
            var Advance = "False";
            var AdvanceAmount = 0;
            var TransVoucherNo = 0;
            var PDCAccountId = 0;
            var PDCStatus = 0;
            oArray.push({
                'VoucherTypeId': VoucherTypeId,
                'VoucherDate': VoucherDate,
                'VoucherNo': VoucherNo,
                'VType': VType,
                'ReferenceNo': ReferenceNo.substring(0, 40),
                'ProjectJobId': ProjectJobId,
                'CostCenterId': CostCenterId,
                'CurrencyId': CurrencyId,
                'CurrencyRate': CurrencyRate,
                'FCAmount': FCAmount,
                'BankId': BankId,
                'ChequeNo': ChequeNo,
                'ChequeDate': ChequeDate,
                'BillSerId': BillSerId.substring(0, 40),
                'AccountId': AccountId,
                'AccCode': AccCode,
                'VoucherEntryDescription': VoucherEntryDescription,
                'Amount': Amount,

                'DelFlag': DelFlag,
                'UserId': UserId,
                'DeptId': DeptId,
                'VoucherTypePrefix': VoucherTypePrefix,
                'Advance': Advance,
                'AdvanceAmount': AdvanceAmount,
                'TransVoucherNo': TransVoucherNo,
                'PDCAccountId': PDCAccountId,
                'PDCStatus': PDCStatus,
                'TxnType': TxnType,
                'ProductId': ProductId,

            })
        }
    }



    //Main Row
    var VType = 'D';
    if ($('#BSerNo').val() == "") {
        var BillSerId = '0';
    }
    else {
        var BillSerId = $('#BSerNo').val();
    }
    var AccountId = extra;
    var AccCode = $('#AccountTypeCode').val();
    var VoucherEntryDescription = $('#VEDescription').val();
    var Amount = $('#Amount').val();
    var FCAmount = $('#FCAmount').val();
    DelFlag = 1;
    var UserId = ERPUserId;
    var DeptId = ERPDeptId;
    var VoucherTypePrefix = "RV";
    //Save BaseAmount with Advance Amount
    if ($('#Diff').val() != 0 && $("#Advance").is(":checked") && chklegn > 1) {
        var Advance = "True";
        var AdvanceAmount = $('#Diff').val();
        var ReferenceNo = $('#RefNo').val().substring(0, 40);
    }

        //Save Advance Amount ONLY     
    else if ($("#Advance").prop("checked") == false) {
        var Advance = "False";
        var AdvanceAmount = 0;
        var ReferenceNo = $('#RefNo').val().substring(0, 40);
    }

        //Save Main ONLY - without Advance
    else {
        var ReferenceNo = '0';
        var VoucherEntryDescription = 0;
        var Advance = "True";
        var AdvanceAmount = $('#Diff').val();
    }
    var TransVoucherNo = 0;
    if ($('#AccountType').val() == 3) {
        var PDCAccountId = $('#AccCode').val();
        var PDCStatus = 'O';
    }
    else {
        var PDCAccountId = 0;
        var PDCStatus = 0;
    }

    oArray.push({
        'VoucherTypeId': VoucherTypeId,
        'VoucherDate': VoucherDate,
        'VoucherNo': VoucherNo,
        'VType': VType,
        'ReferenceNo': ReferenceNo,
        'ProjectJobId': ProjectJobId,
        'CostCenterId': CostCenterId,
        'CurrencyId': CurrencyId,
        'CurrencyRate': CurrencyRate,
        'FCAmount': FCAmount,
        'BankId': BankId,
        'ChequeNo': ChequeNo,
        'ChequeDate': ChequeDate,
        'BillSerId': BillSerId.substring(0, 40),
        'AccountId': AccountId,
        'AccCode': AccCode,
        'VoucherEntryDescription': VoucherEntryDescription,
        'Amount': Amount,
        'DelFlag': DelFlag,
        'UserId': UserId,
        'DeptId': DeptId,
        'VoucherTypePrefix': VoucherTypePrefix,
        'Advance': Advance,
        'AdvanceAmount': AdvanceAmount,
        'TransVoucherNo': TransVoucherNo,
        'PDCAccountId': PDCAccountId,
        'PDCStatus': PDCStatus,
        'TxnType': TxnType,
        'ProductId': ProductId,
    })

    //Save Advance Row
    if ($("#Advance").is(":checked")) {
        var VType = 'C';
        var AccountId = $('#supplierId0').val();
        var AccCode = $('#AccCode').val();
        var ReferenceNo = 'ON A/C';
        var VoucherEntryDescription = 'Advance';
        var Advance = "False";
        var fc = 0;
        fc = AdvanceAmount / $('#Rate').val();
        var FCAmount = fc.toFixed(decimal);
        var PDCAccountId = 0;
        var PDCStatus = 0;
        var BillSerId = '0';

        oArray.push({
            'VoucherTypeId': VoucherTypeId,
            'VoucherDate': VoucherDate,
            'VoucherNo': VoucherNo,
            'VType': VType,
            'ReferenceNo': ReferenceNo.substring(0, 40),
            'ProjectJobId': ProjectJobId,
            'CostCenterId': CostCenterId,
            'CurrencyId': CurrencyId,
            'CurrencyRate': CurrencyRate,
            'FCAmount': FCAmount,
            'BankId': BankId,
            'ChequeNo': ChequeNo,
            'ChequeDate': ChequeDate,
            'BillSerId': BillSerId.substring(0, 40),
            'AccountId': AccountId,
            'AccCode': AccCode,
            'VoucherEntryDescription': VoucherEntryDescription,
            'Amount': AdvanceAmount,
            'DelFlag': DelFlag,
            'UserId': UserId,
            'DeptId': DeptId,
            'VoucherTypePrefix': VoucherTypePrefix,
            'Advance': Advance,
            'AdvanceAmount': 0,
            'TransVoucherNo': TransVoucherNo,
            'PDCAccountId': PDCAccountId,
            'PDCStatus': PDCStatus,
            'TxnType': TxnType,
            'ProductId': ProductId,
        })
    }

    if (oArray != "") {
        var data = { 'VoucherModel': oArray };
        $.ajax(
  {
      type: "POST",
      url: "../AccountsErp/ReceiptVoucherTableInsert",
      data: data,
      success: function (result) {
          for (var i = 0; i < result.oList.length; i++) {
              var status = result.oList[i].Status;
              var VoucherNo = result.oList[i].VoucherNo;
              var DeptId = result.oList[i].DeptId;
              
              
              if (parseFloat(result.oList[i].BalAmnt || 0)<=0)
                  var BalAmnt = (-1*parseFloat(result.oList[i].BalAmnt || 0)).toFixed(Decimal) + ' Dr.'
              else
                  var BalAmnt = parseFloat(result.oList[i].BalAmnt || 0).toFixed(Decimal) + ' Cr.'

              $("#CurrentBalance").val(BalAmnt);

              $('#RvfileUploadValue').val(VoucherNo);
              if (status == 1) {
                  if (document.getElementById('RVfileUpload').files.length > 0) {
                      CreateFolder();
                      Showalerts(status, VoucherNo);
                  }
                  else {
                      Showalerts(status,VoucherNo);
                  }
              }
              else {
                  Showalerts(status,VoucherNo);
              }
              $('#btnsubmit').prop('disabled', false);
              
             
              // serialnoload();
          }
      }
  });
    }
}




function ConfirmboxResult(Result, status, rowid) {
   if (Result == 'true' && status == 'save') {
       savesales();
    }
   else if (Result == 'true' && status == 'RVFiles') {
       OKUploadRVFiles();
   }
  
    $('#confirm').fadeOut();
}

function AddtoGrid() {
    var BalanceAmountFlag = 0;
    var Res = confirm('Do you Want Settle this Bill ?')
    if (Res) {
        var data = {};
        var no = $('#OnAcc tr').length;
        for (var i = 1; i < no; i++) {
            
            if (document.getElementById('SNoCheckOnAc' + i).checked) {

                if (parseFloat($('#BalAmountAcc' + i).text()) != 0) {
                    BalanceAmountFlag = i;
                }
                var VEntryId = $('#VEIdAcc' + i).text();

                var RecAmount = $('#RecAmountAcc' + i).text();
                var BalAmount = $('#BalAmountAcc' + i).text();

                if (VEntryId != '') {
                    data.VAdvId = VEntryId;
                    data.RecAmountAdv = RecAmount;
                    data.BalAmountAdv = BalAmount;
                }

                $('#VEIdAcc' + i).text('');
                $('#RecAmountAcc' + i).text('');
                $('#BalAmountAcc' + i).text('');
            }
        }
        var n = $('#PendingIn tr').length;
        for (var j = 1; j < n; j++) {
            if ($("#SNCheck" + j).is(":checked")) {
                //console.log(j)
                var InvNo = $('#SetVID' + j).text();
                var RecAmt = $('#RecAmountOnAcc' + j).val();
                var BalAmt = $('#BalAmountOnAcc' + j).text();
                var VDescription = $('#VEDescriptionAcc' + j).text();
                var BillSerNo = 0;

                data.InvNoPend = InvNo;
                data.RecAmountPend = RecAmt;
                data.BalAmountPend = BalAmt;
                data.VDescPend = VDescription;
                data.BillSerNoPend = BillSerNo;

                $('#InvoNoAcc' + j).text('');
                $('#RecAmountOnAcc' + j).val('');
                $('#BalAmountOnAcc' + j).text('');
                $('#VEDescriptionAcc' + j).text('');
                $('#BillSerNoAcc' + j).text('');
            }
        }
        data.UserId = ERPUserId;
        data.DeptId = ERPDeptId;


        if (typeof data.RecAmountPend != "undefined") {

            //console.log(data.VAdvId)
            //console.log(data.InvNoPend)

            $.ajax({
                type: "POST",
                url: "../AccountsErp/AdvanceSettlement",
                data: data,
                success: function (result) {

                    var status = result.oList[0].Status;

                    if (parseFloat(result.oList[0].BalAmnt || 0) <= 0)
                        var BalAmnt = (-1 * parseFloat(result.oList[0].BalAmnt || 0)).toFixed(Decimal) + ' Dr.'
                    else
                        var BalAmnt = parseFloat(result.oList[0].BalAmnt || 0).toFixed(Decimal) + ' Cr.'

                    $("#CurrentBalance").val(BalAmnt);

                    $('#pendingSum').val(0)
                    var CurrVoucherNo = $('#VoucherNo').val();
                    if (BalanceAmountFlag != 0)
                    {

                        $('#Popup').hide();
                        $('#onaccountsavealert').html('');
                        $('#onaccountalertpopup').hide();
                        $('#onaccountalertdiv').hide();
                        if (status == 1) {
                            if (VoucherBillType == 'NOPRINT') {
                                
                                swal('VOCNo : RV-' + CurrVoucherNo + ' ', "Saved Successfully", "success");
                                $('.swal-button swal-button--confirm').focus();
                                //$('#onaccountalertpopup').show();
                                //$('#onaccountalertdiv').show();
                                SumChangeAcc(BalanceAmountFlag);
                                $('#onaccountalertpopup').hide();
                                $('#Popup').show();
                                GetList(0);
                            }
                            else {
                                //USEDCARS
                                $('#VoucherNoMain').val(CurrVoucherNo);
                                $('#onaccountalertpopup').show();
                                $('#onaccountalertdiv').show();
                                $('#onaccountsavealert').append('<b>VOCNo : RV- ' + CurrVoucherNo + '</b><br> Saved Successfully!<br>Do you want to print this bill?');
                                $('#onaccountbtnok').focus();
                                SumChangeAcc(BalanceAmountFlag)
                            }
           
                        }
                    }
                    else {
                      
                        Showalerts(status, CurrVoucherNo);
                        $('#Popup').hide();
                        $('#AccountName').focus();
                        formrefresh();
                        $('#savealert').html('');
                        $('#alertpopup').hide();
                        $('#alertdiv').hide();
                        if (status == 1) {


                            if (VoucherBillType == 'NOPRINT') {

                                swal('VOCNo : RV-' + CurrVoucherNo + ' ', "Saved Successfully", "success");
                                $('.swal-button swal-button--confirm').focus();
                            }
                            else {
                                //USEDCARS
                                $('#VoucherNoMain').val(CurrVoucherNo);
                                $('#alertpopup').show();
                                $('#alertdiv').show();
                                $('#savealert').append('VOCNo :RV- ' + CurrVoucherNo + ' Saved Successfully!<br>Do you want to print this bill?');
                                $('#btnok').focus();
                            }

                            
                        }
                    }



                }
            });
        }
        else {
            warningshow('Please check the Pending Invoice')
            return false;
        }
    }

}

function formrefresh() {
    CopyFlag = 0;
    $('#VoucherNo').prop("readonly", true);
    $("#VoucherNo").val('');
    serialnoload();
   
    $("#btnsubmit").prop('disabled', false);
    $("#btnsubmit").show();
    $("#btncopy").show();
    $("#btnprint").hide();
    $('#VoucherDate').val(CurDate);
    $('#AccountName,#CurrentBalance').val('');
    $('#supplierId0').val('');
    $('#AccCode').val('');
    $('#AccountType').val('0');
    $('#AccountTypeCode').val('');
    $('#Advance').prop("checked", false);
    $('.form-control').prop("disabled", false);
   
    $('#Type').prop("disabled", true);
    $('#PendingInvoices tr').remove();
    $('#PJobCode').val('0');
    $('#select_jobno').val('');
    $('#CostCenterCode').val('0');
    $('#Bank').val('0');
    $('#Amount').val('');
    $('#FCAmount').val('');
    $('#Advance').val('');
    $('#ChequeNo').val('');
    $('#ChequeDate').val('');
    $('#VoucherNoMain').val('');
    $('#btndelete').hide();
    $('#AccountName').focus();
    for (var k = 1; k <= ($('#txtRowCount').val()) ; k++) {
        $('#row' + k).remove();
    }
    $('#txtRowCount').val('');
    $('#txtRowCountChkd').val('');
    $('#Debit').val('0.00');
    $('#Credit').val('0.00');
    $('#Diff').val('0.00');
    $('#RefNo').val('');
    $('#BSerNo').val('');
    $('#VEDescription').val('');
    $('#aabc').val('');
    $('#fcbc').val('');
    $('#Currency').val(BaseCurrency);
    $("#Rate").val($("#Currency").find("option:selected").attr("name"));
    $("#ChequeDate").prop('disabled', 'disabled');
    $("#ChequeDate").val('');
    $("#ChequeNo").prop('disabled', 'disabled');
    $("#Bank").prop('disabled', 'disabled');
    $("#Bank").val('0');
    $("#AccSum").val('');
    $("#pendingSum").val('');
    //$('#RVViewFiles').hide();
    $('#RVfileUpload').show();
    $('#btnuploadpurchasefiles').show();
   
}

function Clear() {
    //if($('#txtRowCount').val()==0){
    //    formrefresh();
    //}
    //else {
        var result = confirm("Do you want to Continue?")
        if (result == true)
            formrefresh();

  // }
}

//Allow floating values
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

//Allow Integers ONLY
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

$(document).keydown(function (e) {
    if (e.altKey && e.keyCode == 83) {                        //Alt+S        
        SaveAndUpdate(1);
    }
    else if (e.altKey && e.keyCode == 82) {                 //Alt+R        
        window.open('../AccountsReport/AccountsReport')
    }
    else if (e.altKey && e.keyCode == 67) {                  //Alt+C
        formrefresh();
    }
    else if (e.keyCode == 27) {                           //esc
        $('#Popup').hide();
        $('#RVDocument').hide();
    }
});


function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

//Get Pending Invoice list to the selected Customer
function GetList(Id) {



    $('#pendingSum').val(0);
    
    var AccountId = $('#supplierId0').val();
    var data = {};
    data.AccountId = AccountId;
    $.ajax({
        type: "POST",
        url: "../../AccountsErp/VoucherEntryGetandGets",
        data: data,
        success: function (result) {
            if (AccountId != 0)
                ShowInvList(result.oList);
        }
    });
}



//var l = 0;
//function ShowInvList(result) {
//    $('#RowGet').val = '';
//    $('#modelheader').text('Pending Invoices');
//    $('#add').hide();
//    $('#View').show();
//    $('#iconForm').show();
//    var responseText = "";
//    for (var l = 0; l < result.length; l++) {
//        //if (result[l].InvoNo == 'ON A/C') {
//        //    BT = result[l].Amount;
//        //    Showalerts(3);
//        //}
//        var slno = parseInt(l + 1);
//        responseText += '<tr id= ' + 'row' + slno + ' class="jsgrid-header-row"><td class= "jsgrid-cell jsgrid-align-center" style="width:30px"><input onclick=SumChange(' + slno + ') type="checkbox" id= ' + 'SlNoCheck' + slno + ' disabled="disabled"></td><td class= "jsgrid-cell jsgrid-align-center" style="width:46px">' + slno + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:50px;display:none" id=' + 'BillSerNo' + slno + '>' + result[l].BillSerNo + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:95px" id=' + 'InvoNo' + slno + '>' + result[l].InvoNo + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:235px" id=' + 'VEDescription' + slno + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:245px;display:none" id=' + 'AccountName' + slno + '>' + result[l].AccountName + ' <input type="text" style="display:none" value= ' + $("#supplierId0").val() + ' id= ' + 'supplierId' + slno + '  /></td><td class= "jsgrid-cell jsgrid-align-center" style="width:105px" id=' + 'InvoDate' + slno + '>' + result[l].InvoDate + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'Amount' + slno + '>' + result[l].Amount + '</td><td class= "jsgrid-cell jsgrid-align-center amountcss" style="width:145px"><input class="recamountcss form-control" type="text" id=' + 'RecAmount' + slno + ' readonly="readonly" style="border:none;background-color:white" onkeyup="ChangeRCAmount(' + slno + ')" onkeypress="isNumber(event,this),Greaterthan(event,' + slno + ')"> </td><td class= "amountcss jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'BalAmount' + slno + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'GCurrency' + slno + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'GRate' + slno + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'GFCAmount' + slno + '></td><td class= "recamountcss jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'FCRecAmount' + slno + '></td></tr>';
//    }
//    $('#PendingInvoices').append(responseText);
//    $('#PendingInvoices').html(responseText + '</tbody>');
//    $('#RowGet').val(result.length)
//    $('#btnview').focus();
//    $('#txtRowCount').val(slno + 1);
//}



function Calculatebalance(Id) {    
    var IvAmount1 = parseFloat($('#AmountOnAcc' + Id).text() || 0)
    var RecevAmount1 = parseFloat($('#RecAmountOnAcc' + Id).val() || 0)
    $('#RecAmountAcc' + selectadvance).text(RecevAmount1.toFixed(2));
    var ADDvancAmount1 = parseFloat($('#AmountAcc').text() || 0)
    $('#RecAmountAcc' + selectadvance).text(RecevAmount1.toFixed(2));    
    $('#BalAmountAcc' + selectadvance).text(parseFloat($('#AmountAcc' + selectadvance).text() - RecevAmount1).toFixed(2));
    balance1 = parseFloat(IvAmount1 - RecevAmount1);
    $('#BalAmountOnAcc' + Id).text(balance1.toFixed(2));
}



//Pending Invoices listing in grid
var l = 0;
var BT = 0;

var responseText4 = "";
function ShowInvList(result) {

  

    $('#RowGet').val = '';
    $('#modelheader').text('Pending Invoices');
    $('#add').hide();
    $('#View').show();
    $('#iconForm').show();
    var responseText = "";
    var responseText2 = "";
    responseText4 = ""
    var slno = 1;
    var slno1 = 1;
    var slno2 = 1;

    var x = 0;


    responseText += "<thead><tr><th></th><th>Date</th><th>Amount</th><th>RecAmt</th><th>Balance</th></tr></thead><tbody>"
    responseText2 += "<thead><tr><th></th><th>InvNo</th><th>Date</th><th>Descriptin</th><th>Amount</th><th>RecAmount</th><th>Balance</th><th>Settle</th></tr></thead><tbody>"
    var DDid1 = 1; var DDid2 = 1; var flag = 0;

    for (var l = 0; l < result.length; l++) {
        $('#OnAcc,#PendingIn,#PendingInvoices').html('');
        if (result[l].InvoNo == 'ON A/C') {
            x = 1;
            BT = (result[l].Amount) * -1;
            $('#Popup').show();
            slno = parseInt(l + 1);
            DDid1
            responseText += '<tr id= ' + 'row' + DDid1 + ' class="jsgrid-header-row"><td class= "jsgrid-cell jsgrid-align-center" style="width:30px"><input type="radio" style="" name="radiobtn" id= ' + 'SNoCheckOnAc' + DDid1 + ' onChange=SumChangeAcc(' + DDid1 + ')></td><td class= "jsgrid-cell jsgrid-align-center" style="width:105px;display:none" id=' + 'VEIdAcc' + DDid1 + '>' + result[l].VEntryId + '</td>        <td class= "jsgrid-cell jsgrid-align-center" style="width:140px">' + result[l].InvoDate + '</td>     <td class= "jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'AmountAcc' + DDid1 + '>' + parseFloat(BT).toFixed(decimal) + '</td><td id=' + 'RecAmountAcc' + DDid1 + '></td><td class= "amountcss jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'BalAmountAcc' + DDid1 + '></tr>';
            $('#RowGet').val(slno);
            DDid1 += 1;
        }
        else {
            slno1 = parseInt(l + 1);
            responseText2 += '<tr id= ' + 'row' + DDid2 + ' class="jsgrid-header-row"><td class= "jsgrid-cell jsgrid-align-center" style="width:105px;display:none" id=' + 'SetVID' + DDid2 + '>' + result[l].VEntryId + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:30px"><input type="checkbox" style="" id= ' + 'SNCheck' + slno1 + ' onclick=CalcAdv(' + DDid2 + ')></td><td class= "jsgrid-cell jsgrid-align-center" style="width:50px;display:none" id=' + 'BillSerNoAcc' + DDid2 + '>' + result[l].BillSerNo + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:80px" id=' + 'InvoNoAcc' + DDid2 + '>' + result[l].InvoNo + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:235px;display:none" id=' + 'VEDescriptionAcc' + DDid2 + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:245px;display:none" id=' + 'AccountNameAcc' + DDid2 + '>' + result[l].AccountName + ' <input type="text" style="display:none" value= ' + $("#supplierId0").val() + ' id= ' + 'supplierIdAcc' + DDid2 + '  /></td><td class= "jsgrid-cell jsgrid-align-center" style="width:90px" id=' + 'InvoDateAcc' + DDid2 + '>' + result[l].InvoDate + '</td>           <td class= "jsgrid-cell jsgrid-align-center" style="width:190px">' + result[l].AccountName + '</td>                                                <td class= "jsgrid-cell jsgrid-align-center" style="width:120px" id=' + 'AmountOnAcc' + DDid2 + '>' + parseFloat(result[l].Amount).toFixed(decimal) + '</td><td class= "jsgrid-cell jsgrid-align-center amountcss" style="width:100px" > <input type=text style=width:100px id=' + 'RecAmountOnAcc' + DDid2 + ' onkeypress="isNumber(event,this)"  disabled onkeyup="Calculatebalance(' + DDid2 + ' )"></td><td class= "amountcss jsgrid-cell jsgrid-align-center" style="width:100px" id=' + 'BalAmountOnAcc' + DDid2 + '></td><td width=20px align=center><button type="button" title="Settle" style="width:70px;height:35px;" id="btnaddtogridInv" class="btn btn-round btn-warning" onclick="AddtoGrid()">Settle</button></td></tr>';
            
            DDid2 += 1;
          
            if (result[l].VoucherTypePrefix == 'OP') {
                var abcc = 1.1;
                slno2 = parseInt(l + 1);
                responseText4 += '<tr id= ' + 'row' + slno2 + ' class="jsgrid-header-row"><td class= "jsgrid-cell jsgrid-align-center" style="width:105px;display:none" id=' + 'Dvid' + slno2 + '>' + result[l].VEntryId + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:30px"><input onclick=SumChange(' + slno2 + ') type="checkbox" id= ' + 'SlNoCheck' + slno2 + ' style="" disabled="disabled"></td><td class= "jsgrid-cell jsgrid-align-center" style="width:46px">' + slno2 + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:50px;display:none" id=' + 'BillSerNo' + slno2 + '>' + result[l].BillSerNo + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:95px" id=' + 'InvoNo' + slno2 + '>' + abcc + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:235px" id=' + 'VEDescription' + slno2 + '>Opening Balance</td><td class= "jsgrid-cell jsgrid-align-center" style="width:245px;display:none" id=' + 'AccountName' + slno2 + '>' + result[l].AccountName + ' <input type="text" style="display:none" value= ' + $("#supplierId0").val() + ' id= ' + 'supplierId' + slno2 + '  /></td><td class= "jsgrid-cell jsgrid-align-center" style="width:105px" id=' + 'InvoDate' + slno2 + '>' + result[l].InvoDate + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'Amount' + slno2 + '>' + parseFloat(result[l].Amount).toFixed(decimal) + '</td><td class= "jsgrid-cell jsgrid-align-center amountcss" style="width:145px"><input class="recamountcss form-control" type="text" id=' + 'RecAmount' + slno2 + ' readonly="readonly" style="border:none;background-color:white" onkeyup="ChangeRCAmount(' + slno2 + ')" onkeypress="isNumber(event,this),Greaterthan(event,' + slno2 + ')"> </td><td class= "amountcss jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'BalAmount' + slno2 + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'GCurrency' + slno2 + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'GRate' + slno2 + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'GFCAmount' + slno2 + '>' + parseFloat(result[l].Amount1).toFixed(decimal) + '</td><td class= "recamountcss jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'FCRecAmount' + slno2 + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'BalFCAmount' + slno2 + '></td></tr>';


            }
            else {
                slno2 = parseInt(l + 1);
                responseText4 += '<tr id= ' + 'row' + slno2 + ' class="jsgrid-header-row"><td class= "jsgrid-cell jsgrid-align-center" style="width:105px;display:none" id=' + 'Dvid' + slno2 + '>' + result[l].VEntryId + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:30px"><input onclick=SumChange(' + slno2 + ') type="checkbox" id= ' + 'SlNoCheck' + slno2 + '  style="" disabled="disabled"></td><td class= "jsgrid-cell jsgrid-align-center" style="width:46px">' + slno2 + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:50px;display:none" id=' + 'BillSerNo' + slno2 + '>' + result[l].BillSerNo + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:95px" id=' + 'InvoNo' + slno2 + '>' + result[l].InvoNo + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:235px" id=' + 'VEDescription' + slno2 + '>' + result[l].AccountName + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:245px;display:none" id=' + 'AccountName' + slno2 + '>' + result[l].AccountName + ' <input type="text" style="display:none" value= ' + $("#supplierId0").val() + ' id= ' + 'supplierId' + slno2 + '  /></td><td class= "jsgrid-cell jsgrid-align-center" style="width:105px" id=' + 'InvoDate' + slno2 + '>' + result[l].InvoDate + '</td><td class= "jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'Amount' + slno2 + '>' + parseFloat(result[l].Amount).toFixed(decimal) + '</td><td class= "jsgrid-cell jsgrid-align-center amountcss" style="width:145px"><input class="recamountcss form-control" type="text" id=' + 'RecAmount' + slno2 + ' readonly="readonly" style="border:none;background-color:white" onkeyup="ChangeRCAmount(' + slno2 + ')" onkeypress="isNumber(event,this),Greaterthan(event,' + slno2 + ')"> </td><td class= "amountcss jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'BalAmount' + slno2 + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:140px" id=' + 'GCurrency' + slno2 + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'GRate' + slno2 + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'GFCAmount' + slno2 + '>' + parseFloat(result[l].Amount1).toFixed(decimal) + '</td><td class= "recamountcss jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'FCRecAmount' + slno2 + '></td><td class= "jsgrid-cell jsgrid-align-center" style="width:145px" id=' + 'BalFCAmount' + slno2 + '></td></tr>';
            }
        }
     
       


    }
    $('#txtRowCount').val(slno2);
    $('#OnAcc,#PendingIn,#PendingInvoices').html('');
    $('#OnAcc').append(responseText);
    $('#PendingIn').append(responseText2);
   
    $('#OnAcc').html(responseText + '</tbody>');
    $('#PendingIn').html(responseText2 + '</tbody>');
    
    //if(x==0)
    //$('#PendingInvoices').html(responseText4 + '</tbody>');
  
      $('#PendingInvoices').append(responseText4);
  //  CalcChkdAmount();
}

function removetick() {
    $('#Debit').val(parseFloat($('#Amount').val() || 0).toFixed(Decimal));
    $('#Credit').val(parseFloat(0).toFixed(Decimal));
    $('#Diff').val(parseFloat($('#Amount').val() || 0).toFixed(Decimal));

    var fcamt = parseFloat($('#Amount').val() || 0) / parseFloat($('#Rate').val() || 0);
    fcamt = isNaN(fcamt) ? 0 : fcamt;
    $('#FCAmount').val(fcamt.toFixed(decimal));

    var bal = 0;
    var balfc = 0;
    $('#aabc').val($('#Amount').val());
    $('#fcbc').val($('#FCAmount').val());
    $('#VEDescription').val('');
    $('#RefNo').val('');
    $('#BSerNo').val('');
    $('#Diff').val($('#aabc').val());

    //Clear all values in Grid
    var Rowlength = $('#txtRowCount').val();
    for (var i = 1; i <= Rowlength; i++) {

        $('#SlNoCheck' + i).prop('checked', false);

        $('#RecAmount' + i).val(0);
        $('#FCRecAmount' + i).val(0);
        bal = parseFloat($('#Amount' + i).text() || 0) - parseFloat($('#RecAmount' + i).val() || 0);
        $('#BalAmount' + i).text(bal.toFixed(decimal));

        balfc = parseFloat($('#GFCAmount' + i).text() || 0) - parseFloat($('#FCRecAmount' + i).val() || 0);      //FCamount Balance Calculation
        $('#BalFCAmount' + i).text(balfc.toFixed(decimal));

        $('#GCurrency' + i).text("");
        $('#GRate' + i).text("");

        $('#FCRecAmount' + i).text('0');
    }
}

function Close() {
    
    $("#AccSum").val('');
    $("#pendingSum").val('');
    $('#OnAcc,#PendingIn,#PendingInvoices').html('');
    $('#PendingInvoices').append(responseText4);
    $('#Popup').hide();
    $('#AccountType').focus();
}

function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
}

function Showalerts(Status, VoucherNo) {
    //alert(VoucherNo)
    $('#Popup').hide();
    $('#savealert').html('');
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    if (Status == 1) {
        $('#VoucherNoMain').val(VoucherNo);
        if (VoucherBillType == 'NOPRINT') {
            formrefresh();
            swal('VOCNo : RV -' + VoucherNo + ' ', "Saved Successfully", "success");
            $('.swal-button swal-button--confirm').focus();
           
        }
        else {
            $('#alertpopup').show();
            $('#alertdiv').show();
            $('#savealert').append('<b>VOCNo : RV -' + VoucherNo + '</b><br> Saved Successfully!<br>Do you want to print this Voucher?');
            $('#btnok').focus();
        }

    }

    else {
        formrefresh();
        swal('You have advance amount', "Do you want to use this?");
        $('.swal-button swal-button--info').focus();
    }
}
//Edit button function - Enables : Checkbox and Inputbox
function EnableGrid() {    
    var bal = 0;
    var balfc = 0;
    $('#Credit').val(0);
    $('#aabc').val($('#Amount').val());
    $('#fcbc').val($('#FCAmount').val());
    $('#VEDescription').val('');
    $('#RefNo').val('');
    $('#BSerNo').val('');
    $('#Diff').val($('#aabc').val());

//Clear all values in Grid
    var Rowlength = $('#txtRowCount').val();
    for (var i = 1; i <= Rowlength; i++) {
        $('#SlNoCheck' + i).prop('disabled', false);
        document.getElementById("SlNoCheck" + i).checked = false;
        //$('#VEDescription' + i).text("");
        $('#RecAmount' + i).val(0);
        $('#FCRecAmount' + i).val(0);
        bal = parseFloat($('#Amount' + i).text() || 0) - parseFloat($('#RecAmount' + i).val() || 0);
        $('#BalAmount' + i).text(bal.toFixed(decimal));

        balfc = parseFloat($('#GFCAmount' + i).text() || 0) - parseFloat($('#FCRecAmount' + i).val() || 0);      //FCamount Balance Calculation
        $('#BalFCAmount' + i).text(balfc.toFixed(decimal));

        $('#GCurrency' + i).text("");
        $('#GRate' + i).text(""); 
       // $('#GFCAmount' + i).text('0');
        $('#FCRecAmount' + i).text('0');
    }
}

//Checkbox in Grid - click function
function SumChange(Id) {

    var bal = 0;
    var credit = 0;
    var diff = 0;    
    if ($("#SlNoCheck" + Id).is(":checked")) {                                                                      
        
        $('#RecAmount' + Id).prop('readonly', false);
        $('#RecAmount' + Id).css("border", "1px solid #F0F6F6");
        $('#RecAmount' + Id).focus();
        //$('#VEDescription' + Id).text('Settled Against InvNo: ' + $('#InvoNo' + Id).text());    
        $('#GCurrency' + Id).text($('#Currency option:selected').text());
        $('#GRate' + Id).text($('#Rate').val());
        var fcamt = 0;
        fcamt = parseFloat($('#Amount' + Id).text() || 0) / parseFloat($('#GRate' + Id).text() || 0);
        $('#GFCAmount' + Id).text(fcamt.toFixed(decimal));

//BaseAmount greaterthan GridAmount & FCAmount greaterthan Grid FCAmount
        if (($('#aabc').val() >= parseFloat($('#Amount' + Id).text() || 0)) && ($('#fcbc').val() >= parseFloat($('#GFCAmount' + Id).text() || 0))) {                                        //GridAmount lessthan of ActualAmount            

       //BaseAmount Calculation
            $('#RecAmount' + Id).val(parseFloat($('#Amount' + Id).text() || 0));
            $('#FCRecAmount' + Id).val(parseFloat($('#GFCAmount' + Id).text() || 0));
            bal = parseFloat($('#aabc').val() || 0) - parseFloat($('#Amount' + Id).text() || 0);
            $('#aabc').val(bal.toFixed(decimal));            
            $('#Diff').val($('#aabc').val());

            var balamt = parseFloat($('#Amount' + Id).text() || 0) - parseFloat($('#RecAmount' + Id).val() || 0);
            $('#BalAmount' + Id).text(balamt.toFixed(decimal));

            var balfc1 = parseFloat($('#GFCAmount' + Id).text() || 0) - parseFloat($('#FCRecAmount' + Id).val() || 0);      //FCamount Balance Calculation
            $('#BalFCAmount' + Id).text(balfc1.toFixed(decimal));

      //GridAmount Calculation
            $('#FCRecAmount' + Id).text(parseFloat($('#GFCAmount' + Id).text() || 0));
            ba = parseFloat($('#fcbc').val() || 0) - parseFloat($('#GFCAmount' + Id).text() || 0);
            $('#fcbc').val(ba.toFixed(decimal));
        }
    
//BaseAmount & GridAmount is ZERO
        else if ($('#aabc,#fcbc').val() == 0) {                                                                           
            warningshow('Amount Exceeded')
            document.getElementById("SlNoCheck" + Id).checked = false;
            //$('#VEDescription' + Id).text("");
            $('#RecAmount' + Id).prop('readonly', true);
            $('#RecAmount' + Id).css("border", "none");

            $('#GCurrency' + Id).text('');
            $('#GRate' + Id).text('');
            $('#GFCAmount' + Id).text(0);
        }

//BaseAmount lessthan GridAmount & FCAmount lessthan Grid FCAmount
        else {                                                                                                      
            $('#RecAmount' + Id).val($('#aabc').val());
            $('#FCRecAmount' + Id).val($('#fcbc').val());
            $('#aabc').val(0);
            var balamt = parseFloat($('#Amount' + Id).text() || 0) - parseFloat($('#RecAmount' + Id).val() || 0);
            $('#BalAmount' + Id).text(balamt.toFixed(decimal));

            var balfc1 = parseFloat($('#GFCAmount' + Id).text() || 0) - parseFloat($('#FCRecAmount' + Id).val() || 0);      //FCamount Balance Calculation
            $('#BalFCAmount' + Id).text(balfc1.toFixed(decimal));

            $('#FCRecAmount' + Id).text($('#fcbc').val());
            $('#fcbc').val(0);
        }        
    }

//Checkbox - Uncheck event   
    else {                                                                                                          
        $('#RecAmount' + Id).prop('readonly', true);
        $('#RecAmount' + Id).css("border", "none");

        $('#GCurrency' + Id).text('');
        $('#GRate' + Id).text('');       
       // $('#GFCAmount' + Id).text(0);

        bal = parseFloat($('#aabc').val() || 0) + parseFloat($('#RecAmount' + Id).val() || 0);
        $('#aabc').val(bal.toFixed(decimal));
        var fba = parseFloat($('#fcbc').val() || 0) + parseFloat($('#FCRecAmount' + Id).text() || 0);
        $('#fcbc').val(fba.toFixed(decimal));

        var crdchng = 0;
        crdchng = credit - $('#RecAmount' + Id).val();
        $('#Credit').val(crdchng.toFixed(decimal));
       // $('#VEDescription' + Id).text('');
        $('#RecAmount' + Id).val(0);
        $('#FCRecAmount' + Id).text(0);

        bala = parseFloat($('#Amount' + Id).text() || 0) - parseFloat($('#RecAmount' + Id).val() || 0);
        $('#BalAmount' + Id).text(bala.toFixed(decimal));

        var balfc2 = parseFloat($('#GFCAmount' + Id).text() || 0) - parseFloat($('#FCRecAmount' + Id).val() || 0);      //FCamount Balance Calculation
        $('#BalFCAmount' + Id).text(balfc2.toFixed(decimal));

        var chkbxlng = $('#PendingInvoices :input[type="checkbox"]:checked').length;
    }

//Calculate Credit, Debit & Diff
    var sumchange = 0;                                                                                                 
    for (var i = 1; i <= $('#txtRowCount').val() ; i++) {
        sumchange = sumchange + parseFloat($('#RecAmount' + i).val() || 0);
    }
    $('#Credit').val(sumchange.toFixed(decimal));
    var diff = parseFloat($('#Debit').val() || 0) - parseFloat($('#Credit').val() || 0);                            
    $('#Diff').val(diff.toFixed(decimal));
    setTimeout(dd, 50);
  
}

//Pending : Comma
function dd()
{ 
    var len = $('#txtRowCount').val();   
    var refno = '';
    var BSNo = '';
    for (var i = 1; i <= len; i++) {  
        
        var x=document.getElementById('SlNoCheck'+i).checked
        if (x == true){
            refno += $('#InvoNo' + i).text() + ',';
            BSNo += $('#BillSerNo' + i).text() + ',';
            }
        $('#RefNo').val(refno);
        $('#BSerNo').val(BSNo);
        $('#VEDescription').val('Settled Against InvNo: ' + $('#RefNo').val());        
    }    
}

//ReceivedAmount in Grid - Keyup Function 
function ChangeRCAmount(Id) {
    
    var amount = $('#Amount').val();
    var fcamount = $('#FCAmount').val();

//GridAmount greaterthan GridReceivedAmount
    if (parseFloat($('#Amount' + Id).text() || 0) >= parseFloat($('#RecAmount' + Id).val() || 0))                    
    {
    
    //BaseAmount in Grid Calculation
        var bal = parseFloat($('#Amount' + Id).text() || 0) - parseFloat($('#RecAmount' + Id).val() || 0);                
        $('#BalAmount' + Id).text(bal.toFixed(decimal));
        $('#Credit').val(parseFloat($('#RecAmount' + Id).val() || 0));
        amount = amount - parseFloat($('#RecAmount' + Id).val() || 0);

    //FCAmount in Grid Calculation
        var fcrec = parseFloat($('#RecAmount' + Id).val() || 0) / parseFloat($('#GRate' + Id).text() || 0);
        $('#FCRecAmount' + Id).text(fcrec.toFixed(decimal));
        fcamount = fcamount - parseFloat($('#FCRecAmount' + Id).text() || 0);

        var balfc = parseFloat($('#GFCAmount' + Id).text() || 0) - parseFloat($('#FCRecAmount' + Id).text() || 0);      //FCamount Balance Calculation
        $('#BalFCAmount' + Id).text(balfc.toFixed(decimal));

        $('#aabc').val(amount.toFixed(decimal));
        $('#fcbc').val(fcamount.toFixed(decimal));
    
    //Difference Calculation
        var diff = $('#Debit').val() - $('#Credit').val();                                                          
        $('#Diff').val(diff.toFixed(decimal));
    
    //Credit & Debit Calculation
        var sumchange = 0;
        var fcsumchange = 0;
        for (var i = 1; i <= $('#txtRowCount').val() ; i++) {                                                           
            sumchange = sumchange + parseFloat($('#RecAmount' + i).val() || 0);
            fcsumchange = fcsumchange + parseFloat($('#FCRecAmount' + i).text() || 0);
        }        
        $('#aabc').val(($('#Amount').val() - sumchange).toFixed(decimal));
        $('#fcbc').val(($('#FCAmount').val() - fcsumchange).toFixed(decimal));        
        $('#Credit').val(sumchange.toFixed(decimal));
        var diff = parseFloat($('#Debit').val()) - parseFloat($('#Credit').val());
        $('#Diff').val(diff.toFixed(decimal));
    
    //Difference lessthan ZERO
        if (diff < 0)                                                                                                      
        {
            warningshow('Amount Exceeded');
            $('#RecAmount' + Id).val(0);
            $('#FCRecAmount' + Id).text(0);
            $('#FCRecAmount' + Id).val(0);
            document.getElementById("SlNoCheck" + Id).checked = false;
            $('#RecAmount' + Id).prop('readonly', true);
            $('#RecAmount' + Id).css("border", "none");
            var bala = parseFloat($('#Amount' + Id).text() || 0) - parseFloat($('#RecAmount' + Id).val() || 0);
            $('#BalAmount' + Id).text(bala.toFixed(decimal));

            var balfc2 = parseFloat($('#GFCAmount' + Id).text() || 0) - parseFloat($('#FCRecAmount' + Id).val() || 0);      //FCamount Balance Calculation
            $('#BalFCAmount' + Id).text(balfc2.toFixed(decimal));

            var sumchange = 0;
            var fcsumchange = 0;
            for (var i = 1; i <= $('#txtRowCount').val() ; i++) {
                sumchange = sumchange + parseFloat($('#RecAmount' + i).val() || 0);
                fcsumchange = fcsumchange + parseFloat($('#FCRecAmount' + i).text() || 0);
            }
            $('#aabc').val($('#Amount').val() - sumchange);
            $('#fcbc').val(($('#FCAmount').val() - fcsumchange).toFixed(decimal));
            $('#Credit').val(sumchange.toFixed(decimal));
            var diff = parseFloat($('#Debit').val() || 0) - parseFloat($('#Credit').val() || 0);
            $('#Diff').val(diff.toFixed(decimal));
        }
    }

//GridAmount lessthan GridReceivedAmount
    else {                                                                                                                  
        warningshow('BillAmount Exceeded');
        $('#RecAmount' + Id).val(0);
        $('#FCRecAmount' + Id).text(0);
        var bala = parseFloat($('#Amount' + Id).text() || 0) - parseFloat($('#RecAmount' + Id).val() || 0);
        $('#BalAmount' + Id).text(bala.toFixed(decimal));

         var balfc2 = parseFloat($('#GFCAmount' + Id).text() || 0) - parseFloat($('#FCRecAmount' + Id).val() || 0);      //FCamount Balance Calculation
        $('#BalFCAmount' + Id).text(balfc2.toFixed(decimal));

    //Sum Calculation
        var sumchange = 0;
        var fcsumchange = 0;
        for (var i = 1; i <= $('#txtRowCount').val() ; i++) {
            sumchange = sumchange + parseFloat($('#RecAmount' + i).val() || 0);
            fcsumchange = fcsumchange + parseFloat($('#FCRecAmount' + i).text() || 0);
        }

    //Debit & Credit Calculation
        $('#aabc').val($('#Amount').val() - sumchange);
        $('#fcbc').val($('#FCAmount').val() - fcsumchange);
        $('#Credit').val(sumchange.toFixed(decimal));
        var diff = parseFloat($('#Debit').val() || 0) - parseFloat($('#Credit').val() || 0);
        $('#Diff').val(diff.toFixed(decimal));
    }
}

//BaseAmount keyup function
function CalAmount() {                                                                                                      
    var fcamt = parseFloat($('#Amount').val() || 0) / parseFloat($('#Rate').val() || 0);
    fcamt = isNaN(fcamt) ? 0 : fcamt;
    $('#FCAmount').val(fcamt.toFixed(decimal));

    var amount = parseFloat($('#Amount').val() || 0);

    var amount1 = parseFloat($('#FCAmount').val() || 0);

    var fcamount = parseFloat($('#FCAmount').val() || 0);
    var Rowlength = $('#txtRowCount').val();
    $('#aabc').val(amount);
    $('#fcbc').val(fcamount);
    $('.recamountcss').val(0);
    $('.amountcss').val(0);

    //Deleting BaseAmount
    for (var j = 1; j <= Rowlength; j++) {                                                                            
        $('#SlNoCheck' + j).prop('disabled', true);
        if (document.getElementById("SlNoCheck" + j)!=null) {
            document.getElementById("SlNoCheck" + j).checked = false;
        }
        //$('#VEDescription' + j).text('');
        $('#GCurrency' + j).text('');
        $('#GRate' + j).text('');
       // $('#GFCAmount' + j).text('0');
        $('#FCRecAmount' + j).text('0');
    }

    //Inserting BaseAmount
    for (var i = 1; i <= Rowlength; i++) {
        var Billamount = parseFloat($('#Amount' + i).text() || 0);
        var FCBillamount = parseFloat($('#GFCAmount' + i).text() || 0);
        if (amount1 > FCBillamount) {
            //  $('#RecAmount' + i).val(Billamount.toFixed(decimal));
            $('#FCRecAmount' + i).val(FCBillamount.toFixed(decimal));

            //amount = parseFloat(amount - Billamount);
            amount1 = parseFloat(amount1 - FCBillamount);
        }

            //BaseAmount greaterthan OR Equalto ZERO
        else if (amount1 >= 0) {
            //$('#RecAmount' + i).val(amount.toFixed(decimal));
            $('#FCRecAmount' + i).val(amount1.toFixed(decimal));
            //amount = parseFloat(amount - Billamount);
            amount1 = parseFloat(amount1 - FCBillamount);
        }

    //BaseAmount greaterthan GridAmount
        if (amount > Billamount) {
            $('#RecAmount' + i).val(Billamount.toFixed(decimal));                      
            amount = parseFloat(amount - Billamount);                    
        }

    //BaseAmount greaterthan OR Equalto ZERO
        else if (amount >= 0) {                                                                                             
            $('#RecAmount' + i).val(amount.toFixed(decimal));            
            amount = parseFloat(amount - Billamount);           
        }

        $('#BalAmount' + i).text(parseFloat(Billamount - $('#RecAmount' + i).val()).toFixed(decimal));

        $('#BalFCAmount' + i).text(parseFloat(FCBillamount - $('#FCRecAmount' + i).val()).toFixed(decimal));  //Balance FCAmount Calculation

        var asmt = parseFloat($('#Amount' + i).text() || 0);
        var ballamunt = parseFloat($('#BalAmount' + i).text() || 0);
        if (asmt != ballamunt)
            document.getElementById("SlNoCheck" + i).checked = true;
    }

    //Assign values to Debit
    var chkbxlng = $('#PendingInvoices :input[type="checkbox"]:checked').length; 
    $('#txtRowCountChkd').val(chkbxlng);
    var amut = parseFloat($('#Amount').val() || 0);    
    $('#Debit').val(amut.toFixed(decimal));
}

//FC Keyup function
function CalFCAmount() {

    var amount = parseFloat($('#Amount').val() || 0);
    var amount1 = parseFloat($('#FCAmount').val() || 0);
    var fcamount = parseFloat($('#FCAmount').val() || 0);
    var Rowlength = $('#txtRowCount').val();

    $('#aabc').val(amount);
    $('#fcbc').val(fcamount);
    $('.recamountcss').val(0);
    $('.amountcss').val(0);

    //Deleting FCAmount
    for (var j = 1; j <= Rowlength; j++) {                                                                             
        $('#SlNoCheck' + j).prop('disabled', true);
        document.getElementById("SlNoCheck" + j).checked = false;
        //$('#VEDescription' + j).text('');
        $('#GCurrency' + j).text('');
        $('#GRate' + j).text('');
       // $('#GFCAmount' + j).text('0');
        $('#FCRecAmount' + j).text('0');
    }

    //Inserting BaseAmount
    for (var i = 1; i <= Rowlength; i++) {                                                                             
        var Billamount = parseFloat($('#Amount' + i).text() || 0);
        var FCBillamount = parseFloat($('#GFCAmount' + i).text() || 0);
        if (amount1 > FCBillamount) {
            //  $('#RecAmount' + i).val(Billamount.toFixed(decimal));
            $('#FCRecAmount' + i).val(FCBillamount.toFixed(decimal));

            //amount = parseFloat(amount - Billamount);
            amount1 = parseFloat(amount1 - FCBillamount);
        }

            //BaseAmount greaterthan OR Equalto ZERO
        else if (amount1 >= 0) {
            //$('#RecAmount' + i).val(amount.toFixed(decimal));
            $('#FCRecAmount' + i).val(amount1.toFixed(decimal));
            //amount = parseFloat(amount - Billamount);
            amount1 = parseFloat(amount1 - FCBillamount);
        }

    //BaseAmount greaterthan GridAmount
        if (amount > Billamount) {                                                                                                     
            $('#RecAmount' + i).val(Billamount.toFixed(decimal));
            amount = parseFloat(amount - Billamount);
        }

    //BaseAmount greaterthan OR Equalto ZERO
        else if (amount >= 0) {                                                                                             
            $('#RecAmount' + i).val(amount.toFixed(decimal));
            amount = parseFloat(amount - Billamount);
        }

        $('#BalAmount' + i).text(parseFloat(Billamount - $('#RecAmount' + i).val()).toFixed(decimal));
        $('#BalFCAmount' + i).text(parseFloat(FCBillamount - $('#FCRecAmount' + i).val()).toFixed(decimal));  //Balance FCAmount Calculation
        var asmt = parseFloat($('#Amount' + i).text() || 0);
        var ballamunt = parseFloat($('#BalAmount' + i).text() || 0);
        if (asmt != ballamunt)
            document.getElementById("SlNoCheck" + i).checked = true;
    }

    //Assign values to Debit
    var chkbxlng = $('#PendingInvoices :input[type="checkbox"]:checked').length;
    $('#txtRowCountChkd').val(chkbxlng);
    $('#Debit').val($('#Amount').val());

   
}

//BaseAmount Keyup function
function CalcChkdAmount() {                                                                                                 
    
    var sumchange = 0;
    var fcamount = parseFloat($('#FCAmount').val() || 0);
    var len = $('#txtRowCountChkd').val();
    var refno = '';
    var BSNo = '';

    //Assigning Invoice No to VEDescription
    for (var i = 1; i <= len; i++) {
        sumchange = sumchange + parseFloat($('#RecAmount' + i).val());
        if (i == len) {
            refno += $('#InvoNo' + i).text();
            BSNo += $('#BillSerNo' + i).text();            
        }
        else {
            refno += $('#InvoNo' + i).text() + ',';
            BSNo += $('#BillSerNo' + i).text() + ',';
        }
        if ($('#InvoNo' + i).text() == '1.1') {
            $('#VEDescription' + i).text("Opening Balance");
        }
        else {
           // $('#VEDescription' + i).text('Settled Against InvNo: ' + $('#InvoNo' + i).text());
        }
       // $('#VEDescription' + i).text('Settled Against InvNo: ' + $('#InvoNo' + i).text());
        $('#GCurrency' + i).text($('#Currency option:selected').text());
        $('#GRate' + i).text($('#Rate').val());
        var fcamt = 0;
        fcamt = parseFloat($('#Amount' + i).text() || 0) / parseFloat($('#GRate' + i).text() || 0);
        $('#GFCAmount' + i).text(fcamt.toFixed(decimal));
        
        var Billfcamount = parseFloat($('#GFCAmount' + i).text() || 0);

    //FCAmount is greaterthan GridFCAmount
        if (fcamount > Billfcamount) {            
            $('#FCRecAmount' + i).text(Billfcamount.toFixed(decimal));
            fcamount = parseFloat(fcamount - Billfcamount);
        }

    //FCAmount greaterthan OR equalto ZERO
        else if (fcamount >= 0) {                                                                                             
            $('#FCRecAmount' + i).text(fcamount.toFixed(decimal));
            fcamount = parseFloat(fcamount - Billfcamount);
        }
    }

    //Credit, Debit & Difference Calculation
    $('#Credit').val(sumchange.toFixed(decimal));
    var diff = $('#Debit').val() - $('#Credit').val();
    $('#Diff').val(diff.toFixed(decimal));
    $('#RefNo').val(refno);
    $('#BSerNo').val(BSNo);
     if ($('#RefNo').val() == '1.1')
    {
        $('#VEDescription').val('Opening Balance');
    }
    else
    {
         $('#VEDescription').val('Settled Against InvNo: ' + $('#RefNo').val());
    }
    $('#VEDescription').val('Settled Against InvNo: ' + $('#RefNo').val());
}

//Advance checkbox check event
function CheckAdvance() {
    if ($('#Diff').val() <= 0) {
        warningshow('Balance Amount is ZERO')
        document.getElementById("Advance").checked = false;
    }
}

function SumChangeAcc(Id) {
    selectadvance = Id;
    if ($("#SNoCheckOnAc" + Id).is(":checked")) {      
        $('#AccSum').val(parseFloat($('#AmountAcc' + Id).text() || 0));
    }
    var n = $('#PendingIn tr').length;
    for (var i = 1; i < n; i++) {
        document.getElementById("SNCheck" + i).checked = false;
        document.getElementById("SNCheck"+i).disabled = false;
        $('#RecAmountOnAcc' + i).val(0);
    }

    var no = $('#OnAcc tr').length;
    for (var i = 1; i <= no; i++) {
        $('#RecAmountAcc' + i).text(0.00);
        $('#BalAmountAcc' + i).text(0.00);
    }

}

function CalcAdv(Id) {

   
   
    //$('#pendingSum').val($('#AmountAcc' + Id).text());
    //alert(Id)
    var balance = 0;
    var onac = 0;
    var rw = $("#RowGet").val();
    var slno = 1;
    if ((parseFloat($('#AccSum').val() || 0) != 0) && ($("#SNCheck" + Id).is(":checked")))
    {
        if (parseFloat($('#AccSum').val()) > parseFloat($('#AmountOnAcc' + Id).text())) {       
            $('#RecAmountOnAcc' + Id).val(parseFloat($('#AmountOnAcc' + Id).text()||0));
            var Val1 = parseFloat($('#pendingSum').val() || 0)
            var CheckAmount = parseFloat($('#RecAmountOnAcc' + Id).val());
            $('#pendingSum').val(parseFloat(Val1 + CheckAmount));
            balance = parseFloat($('#AmountOnAcc' + Id).text() || 0) - parseFloat($('#RecAmountOnAcc' + Id).val() || 0);            
            $('#BalAmountOnAcc' + Id).text(parseFloat(balance.toFixed(decimal)));
            onac = parseFloat($('#AccSum').val() || 0) - parseFloat($('#RecAmountOnAcc' + Id).val() || 0);
            $('#VEDescriptionAcc' + Id).text('OnA/C settled against InvNo: ' + $('#InvoNoAcc' + Id).val());
        }
        else {
            $('#RecAmountOnAcc' + Id).val(parseFloat($('#AccSum').val()||0));
            var Val1 = parseFloat($('#pendingSum').val() || 0)
            var CheckAmount = parseFloat($('#RecAmountOnAcc' + Id).val());
            $('#pendingSum').val(parseFloat(Val1 + CheckAmount));
            balance = parseFloat($('#AmountOnAcc' + Id).text() || 0) - parseFloat($('#RecAmountOnAcc' + Id).val() || 0);
            $('#BalAmountOnAcc' + Id).text(parseFloat(balance.toFixed(decimal)));
            onac = parseFloat($('#AccSum').val() || 0) - parseFloat($('#RecAmountOnAcc' + Id).val() || 0);
            $('#VEDescriptionAcc' + Id).text('OnA/C settled against InvNo: ' + $('#InvoNoAcc' + Id).text());
        }
        var n = $('#PendingIn tr').length;
        for (var i = 1; i < n; i++) {
            if ($("#SNCheck" + i).prop('checked')==false) {
                $("#SNCheck" + i).prop('disabled', 'disabled');
                $("#RecAmountOnAcc" + i).prop('disabled', 'disabled');
                

            }
            else {
                $("#SNCheck" + i).prop('disabled', false);
            }
        }
    }
    else if ($("#SNCheck" + Id).prop('checked')==false) {
        onac = parseFloat($('#AccSum').val() || 0) + parseFloat($('#RecAmountOnAcc' + Id).val() || 0);
        var acc = parseFloat($('#pendingSum').val() || 0) - parseFloat($('#RecAmountOnAcc' + Id).val() || 0);
        $('#RecAmountOnAcc' + Id).val(0);
        $('#BalAmountOnAcc' + Id).text(0);
        $('#pendingSum').val(acc.toFixed(decimal));
        $('#VEDescriptionAcc' + Id).text("");

        var n = $('#PendingIn tr').length;
        for (var i = 1; i < n; i++) {
            $("#SNCheck" + i).prop('disabled', false);
        }
    }
    else
    {
        warningshow('Please select the Advance');
        document.getElementById("SNCheck" + Id).checked = false;        
    }
    $('#AccSum').val(onac.toFixed(decimal));
    var no = $('#OnAcc tr').length;
    for (var i = 1; i <= no; i++) {
        if ($("#SNoCheckOnAc" + i).prop('checked') == true) {            
            $("#RecAmountAcc" + i).text($('#pendingSum').val());
            $("#BalAmountAcc" + i).text($('#AccSum').val());
        }
       
    }

    document.getElementById("RecAmountOnAcc" + Id).disabled = false;
    $('#RecAmountOnAcc' + Id).select();
    $('#RecAmountOnAcc' + Id).focus();
}

