//VType - Credit:C/Debit:D
var decimal = Decimal;
var editflag = 0;
var CopyFlag = 0;
var count = 0;



$(document).keydown(function (e) {
    var x = event.keyCode;
    
     if (e.altKey && e.keyCode == 80) {                        //Alt+P       
        CheckPrevDataAvail();

     }

});
var extra = 0;
function AccTypeChange(Id) {
    $('#AccountTypeCode').val($('#' + Id).find("option:selected").attr("name"));
    extra = $('#' + Id).find("option:selected").data('foo');
}
function AccountTypeLoad(result) {
    $("#AccountType").empty();
    //$("#AccountType").append("<option value='0'>Select</option>");
    for (var i = 0; i < result.length; i++) {
        $("#AccountType").append("<option name='" + result[i].AccountTypeCode + "' value='" + result[i].Id + "' data-foo='" + result[i].AccountTypeId + "'>" + result[i].AccountTypeName + "</option>");
    }
}
function VoucherTypeLoad(result) {   
    $("#VoucherType").empty();
    VoucherType = "<option value='0'>Select</option>";
    for (var i = 0; i <= 5; i++) {
        VoucherType += "<option value='" + result[i].VoucherTypeId + "'name=" + result[i].Description + ">" + result[i].Description + "</option>";
    }
    VoucherType += "<option value='" + result[10].VoucherTypeId + "'name=" + result[10].Description + ">" + result[10].Description + "</option>";
    VoucherType += "<option value='" + result[11].VoucherTypeId + "'name=" + result[11].Description + ">" + result[11].Description + "</option>";
    VoucherType += "<option value='" + result[12].VoucherTypeId + "'name=" + result[12].Description + ">" + result[12].Description + "</option>";
    VoucherType += "<option value='" + result[16].VoucherTypeId + "'name=" + result[16].Description + ">" + result[16].Description + "</option>";
    VoucherType += "<option value='" + result[17].VoucherTypeId + "'name=" + result[17].Description + ">" + result[17].Description + "</option>";


    $("#VoucherType").append(VoucherType);    
}
if ((usermenu1.indexOf("M302") != -1))
{
    $("#btnDepreciation").show();
}


var bankcodecheck;
var pdcrcodecheck;
var pdcicodecheck;

function AccountCheck(result) {
    bankcodecheck = result[1].AccountTypeId;
    pdcicodecheck = result[2].AccountTypeId;
}
function AccountCheck1(result) {
    pdcrcodecheck = result[2].AccountTypeId;
}
function ProjectJobLoad(result) {
    $("#JobCode").empty();
    JobCode = "<option value='0' name=''>Select</option>";
    for (var i = 0; i < result.length; i++) {
        JobCode += "<option value='" + result[i].ProjectJobId + "'name=" + result[i].JobCode + ">" + result[i].JobCode + "</option>";
    }
    $("#JobCode").append(JobCode);
}
function CostCenterLoad(result) {
    $("#CostCenterName").empty();
    CostCenterName = "<option value='0' name=''>Select</option>";
    for (var i = 0; i < result.length; i++) {
        CostCenterName += "<option  value='" + result[i].CostCenterId + "' name='" + result[i].CostCenterCode + "'>" + result[i].CostCenterCode + "</option>";
    }
    $("#CostCenterName").append(CostCenterName);
}

var BaseCurrency = 0;
function CurrencyLoad(result) {
    $("#Currency").empty();
    CurrencySelect = "<option value=0 name=''>Select</option>";
    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {
          BaseCurrency = result[i].BaseCurrencyId; 
        }
        CurrencySelect += "<option  name='" + result[i].CurrencyRate + "' value='" + result[i].Id + "'>" + result[i].CurrencyName + "</option>"
    } 
    $("#Currency").append(CurrencySelect);
    $('#Currency').val(FCCurrencyId); 
    $("#Rate").val($("#Currency").find("option:selected").attr("name"));
}
function BankLoad(result) {
    $("#Bank").empty();
    Bank = "<option value='0' name=''>Select</option>";
    for (var i = 0; i < result.length; i++) {
        Bank += "<option value='" + result[i].BankId + "'name=" + result[i].BankName + "'>" + result[i].BankName + "</option>";
    }
    $("#Bank").append(Bank);
}

$(document).keydown(function (e) {
    var x = event.keyCode;
  
    if (e.altKey && x == 65) {                        //Alt+A        

        $('#btnadd').click();
    }
  
});

function CustEmpty() {
    $('#supplierId0').val('');

    $(document).keydown(function (e) {
        var x = event.keyCode;       
        if ((x == 115) ) {                                     //F4           
     
            Addpopupwindow(2);
        }      
       else if (e.altKey && x == 66) {                        //Alt+B           
            $('#Employee').prop('disabled', false);
            $('#Employee').focus();
        }
        else if (x == 27) {                                          
            $('#btnaddtogrid').focus();
        }
    });
}
function EmpEmpty() {
    $('#EmployeeId0').val('');
}

function CurrencyChange(Id) {
    $('#Rate').val($('#' + Id).find("option:selected").attr("name"));
    var fcamt = parseFloat($('#Amount').val() || 0) / parseFloat($('#Rate').val() || 0);
    $('#FCAmount').val(fcamt.toFixed(decimal));
    $('#AmountFC').val(fcamt.toFixed(decimal));
}

function CurrencyChangeGrid(Id) {
    var fcamt = 0;
    $('#Rate' + Id).val($('#CurrencyId' + Id).find("option:selected").attr("name"));
    var fcamt = parseFloat($('#Amount'+Id).val() || 0) / parseFloat($('#Rate'+Id).val() || 0);
    $('#FCAmount'+Id).val(fcamt.toFixed(decimal));
}

function CalcFCAmount() {
    var fcamt = parseFloat($('#Amount').val() || 0) / parseFloat($('#Rate').val() || 0);
    fcamt = isNaN(fcamt) ? 0 : fcamt;
    $('#FCAmount').val(fcamt.toFixed(decimal));
    $('#AmountFC').val(fcamt.toFixed(decimal));
}

function CalAmount() {
    var fc = parseFloat($("#FCAmount").val() || 0) * parseFloat($("#Rate").val() || 0);
    fc = isNaN(fc) ? 0 : fc;
    $("#AmountCon").val(fc.toFixed(decimal));
    $("#AmountFC").val($("#FCAmount").val());
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


function getslno(result) {

    var vouchertype = $("#VoucherType option:selected").text();
  

    for (var k = 0; k < result.length; k++) {
        if (vouchertype == 'JV - Journal Voucher') {
            $('#VoucherNo').val(result[k].VoNo);
        }
        else if (vouchertype == 'RV - Receipt Voucher') {
            $('#VoucherNo').val(result[k].RVNo);
        }
        else if (vouchertype == 'PV - Payment Voucher') {
            $('#VoucherNo').val(result[k].PVNo);
        }
        else if (vouchertype == 'TV - Transfer Voucher') {
            $('#VoucherNo').val(result[k].TVNo);
        }        
        else if (vouchertype == 'PC- Petty Cash Voucher') {
         
            $('#VoucherNo').val(result[k].PettyCash);
        }
        else if (vouchertype == 'CV - Contra Voucher') {
            $('#VoucherNo').val(result[k].Contra);
        }
        else if (vouchertype == 'AV - Adjustment Voucher') {
            $('#VoucherNo').val(result[k].AVNo);
        }

        


        else if (vouchertype == 'BPV - Bank Payment Voucher') {
            $('#VoucherNo').val(result[k].OPNo);
        }
        else if (vouchertype == 'BRV - Bank Receipt Voucher') {

            $('#VoucherNo').val(result[k].IONo);
        }


        //else if (vouchertype == 'OP - Opening Voucher') {
        //    $('#VoucherNo').val(result[k].OPNo);
        //}
        //else if (vouchertype == 'IO - Inventory Opening Voucher') {

        //    $('#VoucherNo').val(result[k].IONo);
        //}
        else if (vouchertype == 'SN - Sales Non Inventory Voucher') {
            $('#VoucherNo').val(result[k].SNNo);
        }
        else if (vouchertype == 'II - Inventory Stock Transfer Voucher') {
            $('#VoucherNo').val(result[k].IINo);
        }
        
        else if (vouchertype == 'CN - Credit Note Voucher') {

            $('#VoucherNo').val(result[k].CNNo);
        }
        else if (vouchertype == 'DN - Debit Note Voucher') {
            $('#VoucherNo').val(result[k].DNNo);
        }
        else if (vouchertype == 'CB - PDC Payable Transfer Voucher') {

            $('#VoucherNo').val(result[k].CBNo);
        }
        else if (vouchertype == 'PN - Purchase Non Inventory Voucher') {
            $('#VoucherNo').val(result[k].PNNo);
        }
        //else if (vouchertype == 'DV - Debit Voucher') {

        //    $('#VoucherNo').val(result[k].DVNo);
        //}
        //else if (vouchertype == 'CV - Credit Voucher') {
        //    $('#VoucherNo').val(result[k].CVNo);
        //}

        else {
            $('#VoucherNo').val('0');
        }
    }
}

function VoucherNoGets(result, Flag) {

    CopyFlag = 1;
    $('#Del').hide();
    GridRemove();
    if (result.length==0) {
        warningshow('Invalid Voucher No');
        $('#TransferVoucherNo').val('');
        $('#VType').prop('disabled', false);
        $('#AccountName').prop('disabled', false);
        $('#AccountNamebtn').prop('disabled', false);
        $('#VoucherEntryDescription').prop('disabled', false);
        $('#Amount').prop('disabled', false);
        $('#TaxNo').prop('disabled', false);
        $('#btnadd').prop('disabled', false);
        $('#JobandFC').prop('disabled', false);
        $('#InvoiceSettlement').prop('disabled', false);        
        $('#TransferVoucherNo').focus();
        $('#VoucherNoPrint').val('');
    }
    else {

        if (Flag == 1) {    //Transfer

            serialnoload();
            $("#VoucherType,#VoucherDate").prop("disabled", false);
            $('#VoucherNoPrint').val($('#VoucherNo').val());
        }      


        
        $('#tdJobCode,#thJobCode,#tdCostCode,#thCostCode,#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc,#tdFC,#Del').show();
        $("#tblvoucherentry").width("100%");      
    
      for (var n = 0; n < result.length; n++) {
        var slno = parseInt(n + 1);
        if (result[n].VType == 'D') { var VoType = 'Debit'; } else { var VoType = 'Credit'; }
        $('#VoucherDate').val(result[0].VoucherDate)
        var VoucherRow = "<tr id=" + 'row' + slno + "  onclick=rowbgcolor(" + slno + ")>" +
            "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' >"+
            //"<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'>"+
            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ><i class='fa fa-trash fa-lg OnlyInCopy' aria-hidden='true' style='display:none;'></i></td>" +
            "<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' >"+
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'>"+
            "<input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td>"+
            "<td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + slno + "</td>"+
            "<td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td>"+
            "<td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " onchange='EditGirdAmount()' class='form-control checktransfer' disabled style='height:35px;background-color:white' onfocusin=ChangeBackGroundColor('1','" + 'VType' + slno + "') onkeydown=Focusnextgrid(event,'VT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'VType' + slno + "')>" +
            "<option value=Credit>Credit</option><option value=Debit>Debit</option></select></td>"+
            "<td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'>"+
            "<input type='hidden' id=" + 'Emp' + slno + "  value='0'></td>"+
            "<td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'>"+
            "<input type='text' class='form-control checktransfer' disabled style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " onkeypress='AccountAutoCompleteGrid(" + slno + ")' value='" + result[n].AccountName + "'  onfocusin=ChangeBackGroundColor('1','" + 'AccountId' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'AccountId' + slno + "') >" +
            "<input type='text' style='display:none;border:none' value='" + result[n].AccountId + "' id=" + 'supplierId' + slno + " />"+
            "<input type='text' style='display:none;border:none' value='" + result[n].AccCode + "' id=" + 'AccCode' + slno + " /></td>"+
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'>"+
            "<input type='text' class='form-control checktransfer' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + result[n].VoucherEntryDescription + "' onkeydown=Focusnextgrid(event,'AD'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'VoucherEntryDescription' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'VoucherEntryDescription' + slno + "') ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px'><input type='text' class='form-control checktransfer INVDATECHANGE' disabled style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno + " value='" + result[n].InvoDate + "' onfocusin=ChangeBackGroundColor('1','" + 'InvoDate' + slno + "') onkeydown=Focusnextgrid(event,'D'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'InvoDate' + slno + "')  /></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'>"+
            "<input type='text' class='form-control checktransfer' onkeypress='isNumber(event, this)' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value='" + (result[n].Amount).toFixed(decimal) + "' onkeyup='EditGirdAmount()' onkeydown=Focusnextgrid(event,'A'," + slno + ") onkeyup='EditGirdAmount()' onfocusin=ChangeBackGroundColor('1','" + 'Amount' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Amount' + slno + "') ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'>"+
            "<input type='text' class='form-control checktransfer' disabled style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " value='" + result[n].TaxNo + "' onfocusin=ChangeBackGroundColor('1','" + 'TaxNo' + slno + "') onkeydown=Focusnextgrid(event,'T'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'TaxNo' + slno + "') ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'>"+
            "<input type='text' onkeypress='isNumberInt(event, this)' class='form-control checktransfer' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value='" + result[n].ReferenceNo + "' onkeydown=Focusnextgrid(event,'R'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'ReferenceNo' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'ReferenceNo' + slno + "') >" +
            "<input style=display:none type=text  id=" + 'RefbillNo' + slno + " value='0'></td>"+
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> <select id=" + 'CurrencyId' + slno + " class='form-control checktransfer' disabled style='height:35px;background-color:white' onchange='CurrencyChangeGrid(" + slno + ")' onfocusin=ChangeBackGroundColor('1','" + 'CurrencyId' + slno + "') onkeydown=Focusnextgrid(event,'FX'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CurrencyId' + slno + "')> " + CurrencySelect + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control checktransfer' disabled style='height:35px;background-color:white' id=" + 'Rate' + slno + " value= '" + (result[n].CurrencyRate).toFixed(decimal) + "' onfocusin=ChangeBackGroundColor('1','" + 'Rate' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Rate' + slno + "') onkeydown=Focusnextgrid(event,'FXR'," + slno + ")  ></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' onkeypress='isNumber(event, this)' onkeyup=CalculateAmountRow() class='form-control checktransfer' disabled style='height:35px;background-color:white' id=" + 'FCAmount' + slno + " value= '" + parseFloat(result[n].FCAmount).toFixed(decimal) + "' onfocusin=ChangeBackGroundColor('1','" + 'FCAmount' + slno + "') onkeydown=Focusnextgrid(event,'FCA'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'FCAmount' + slno + "') ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            "<select type='text' class='form-control checktransfer' disabled style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'ProjectJobId' + slno + "') onkeydown=Focusnextgrid(event,'J'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ProjectJobId' + slno + "')> " + JobCode + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control checktransfer' disabled style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'CostCenterId' + slno + "') onkeydown=Focusnextgrid(event,'CC'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CostCenterId' + slno + "')>" + CostCenterName + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select class='form-control checktransfer'  disabled style='height:35px;background-color:white' id=" + 'trxtype' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'trxtype' + slno + "') onkeydown=Focusnextgrid(event,'TRXT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'trxtype' + slno + "')><option value='0' name=''>-Select-</option><option value=1>CHQ</option><option value=2>NEFT</option><option value=3>RTGS</option><option value=4>IMPS</option><option value=5>ATM</option><option value=6>Others</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control checktransfer' disabled style='height:35px;background-color:white' id=" + 'BankId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'BankId' + slno + "') onkeydown=Focusnextgrid(event,'BNK'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'BankId' + slno + "')> " + Bank + "</select></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control checktransfer' disabled style='height:35px;background-color:white' id=" + 'ChequeNo' + slno + " value= '" + result[n].ChequeNo + "' onfocusin=ChangeBackGroundColor('1','" + 'ChequeNo' + slno + "') onkeydown=Focusnextgrid(event,'CQ'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeNo' + slno + "') ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control checktransfer' disabled style='height:35px;background-color:white' id=" + 'ChequeDate' + slno + " value= '" + result[n].ChequeDate + "' onfocusin=ChangeBackGroundColor('1','" + 'ChequeDate' + slno + "') onkeydown=Focusnextgrid(event,'CQD'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeDate' + slno + "')></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control checktransfer' disabled style='height:35px;background-color:white' id=" + 'PDCAccount' + slno + " onkeypress='PDCAccountAutoComplete(" + slno + ")' value= '" + result[n].PDCAccount + "' onfocusin=ChangeBackGroundColor('1','" + 'PDCAccount' + slno + "') onkeydown=Focusnextgrid(event,'PDCA'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'PDCAccount' + slno + "')  ></td></tr>";
        $('#tblvoucherentry').append(VoucherRow);
        $('#VType' + slno).val(VoType);
        $('#ProjectJobId' + slno).val(result[n].ProjectJobId);
        $('#CostCenterId' + slno).val(result[n].CostCenterId);
        $('#CurrencyId' + slno).val(result[n].CurrencyId);
        $('#trxtype' + slno).val(result[n].TrxType);
        $('#BankId' + slno).val(result[n].BankId);
        $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
      }

      if (Flag == 0) {    //Copy

          $('#VoucherNoPrint').val(result[0].VoucherNo);
          $('.jsgrid-button').hide();
          $('.OnlyInCopy').show();
      }
      else {
          $('.jsgrid-button').show();
          $('.checktransfer').prop("disabled", false);
      }
    }
    var deb = 0;
    var cre = 0;
    var diff = 0;
    for (var j = 1; j < $('#slnotxt').val() ; j++) {
        if ($('#VType' + j).val() == 'Debit') {
            deb = deb + parseFloat($('#Amount' + j).val() || 0)
            $('#Debittxt').val(deb.toFixed(decimal));
        }
        else {
            cre = cre + parseFloat($('#Amount' + j).val() || 0)
            $('#Credittxt').val(cre.toFixed(decimal));
        }
    }
    diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
    $('#Differencetxt').val(diff.toFixed(decimal));
}


function rowbgcolor(Id) {
 
    var a;
    try {
        a = $('#tblvoucherentry > tbody > tr:last-child()').attr('id').match(/\d+/)[0];
    }
    catch (err) {
        a = 1;
    }
  
    for (var c = 1; c <= a; c++) {
        $('#row' + c).css('background-color', '');
    }
   
    if (Id != 0) {
        $('#row' + Id).css('background-color', '#ffcccc');
    }
}

var rowchk = 0;
var chek = 0;
var ppoo = 0;
var salaryflag = 0;
$(document).ready(function () {
    if ((usermenu1.indexOf("M305") != -1)) {
        $('#VEViewFiles').show();
    }
    AccountLoad();
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

        //if (selectedvalue == 3)
        //{
        //    $("#PDCAccount").val($('#DefaultPdcAccCode').val());
        //    $('#PDCAccountId').val($('#DefaultPdcAccId').val());
        //}
        //else {
        //    $("#PDCAccount").val('');
        //    $('#PDCAccountId').val(0);
        //}

    });
  
   
    $('#TransferSalary').val(CurDate);
    var chek = 0;
    var rowchk = 0;
   // var salaryflag = 0;
  //  var ppoo = 0;
    //$("#TransferVoucherNo").keydown(function (e) {
     
    //    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    //    if (key == 13) {            
    //        $('#VType').prop('disabled', true);
    //        $('#AccountName').prop('disabled', true);
    //        $('#AccountNamebtn').prop('disabled', true);
    //        $('#VoucherEntryDescription').prop('disabled', true);
    //        $('#Amount').prop('disabled', true);
    //        $('#TaxNo').prop('disabled', true);
    //        $('#ReferenceNo').prop('disabled', true);
    //        $('#btnadd').prop('disabled', true);
    //        $('#JobandFC').prop('disabled', true);
    //        $('#InvoiceSettlement').prop('disabled', true);
    //        $('#thJobCode,#thCostCode').hide();
    //        $('#empname').hide();
    //        $('#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc').hide();
    //        e.preventDefault();
            
    //        var VoucherNo = $('#TransferVoucherNo').val();
    //        var VoucherTypeId = $("#VoucherType").val();
    //       // $('#VoucherNo').val(VoucherNo);
    //        var srlno = {};
    //        srlno.DeptId = VoucherNo;
    //        srlno.VType = VoucherTypeId;
    //        $.ajax({
    //            type: "POST",
    //            url: "../AccountsErp/VoucherEntryGetandGetss",
    //            data: srlno,
    //            success: function (result) {
    //                VoucherNoGets(result.oList);
    //               // serialnoload();
    //                $('#btnsubmit').focus();
    //            }
    //        });
    //    }

    //});
  
    $('#btncopy').click(function () {
        CopyFlag = 1;
       
        var rowCount = document.getElementById('tblvoucherentry').rows.length;
        if (rowCount == 1) {
            $("#balancelabel").hide();
            $("#Acbal1").hide();
            $("#btnsubmit").hide();
            $('#TransferVoucherNo').prop('disabled', false);
            $('#TransferVoucherNo').hide();
            $('#TransferVoucherNoCopy').prop('disabled', false);
            $('#TransferVoucherNoCopy').val('');
            $('#TransferVoucherNoCopy').show();
            $('#TransferVoucherNoCopy').focus();
            $('#Transfernolabel').text('Search Vou#');
            $('#VEfileUpload').hide();
            $('#btnuploadVEfiles').hide();
            if ((usermenu1.indexOf("M305") != -1)) {
                $('#VEViewFiles').show();
            }
        }
        else {
            $("#confirmOk").prop("disabled", false);
            $('#Confirmflag').val('copy'), $('#ConfirmRowId').val(1)
            $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
            $('#confirm').show();
            $('#confirmOk').focus();

        }
    });

    $('#btnokVE').click(function () {
        PrintthisBill();
        alertpopuprefresh();
        formrefresh();
    });
    $('#btncnclalrtVE').click(function () {
        alertpopuprefresh();
        formrefresh();
        //  Tbldelete();
    });

    $('#hiddenrow').val('');
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    var data1 = {};
    data1.VoucherTypeId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/VoucherTypeGetandGets",
        data: data1,
        success: function (result) {
            VoucherTypeLoad(result.oList);
        }
    });

    //serialnoload();
    $('#Credittxt').val('0.00');
    $('#Debittxt').val('0.00');
    $('#Differencetxt').val('0.00');
    $('#Acbal').val("0.00");
    Defaultfocus();


    $('#btnadd').click(function () {
        VoucherEntryAdd();      
    });
    var data2 = {};
    data2.AccountTypeId = 0;
    data2.DeptId = ERPDeptId;
    data2.flag = 2;
    $.ajax({
        type: "POST",
        url: "../Master/AccountTypeGetandGets",
        data: data2,
        success: function (result) {
            AccountCheck(result.oList);
        }
    });
    var data0 = {};
    data0.AccountTypeId = 0;
    data0.DeptId = ERPDeptId;
    data0.flag = 1;
    $.ajax({
        type: "POST",
        url: "../Master/AccountTypeGetandGets",
        data: data0,
        success: function (result) {
            AccountCheck1(result.oList);
        }
    });
    var data3 = {};
    data3.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data: data3,
        success: function (result) {
            CurrencyLoad(result.oList);
        }
    });

    var data4 = {};
    data4.ProjectJobId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/ProjectJobGetandGets",
        data: data4,
        success: function (result) {
            ProjectJobLoad(result.oList);

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


    if (getQueryString('vno') != null) {
        $('#TransferVoucherNo').val(getQueryString('vno'))
        var vno = {};
        vno.VoucherNo = getQueryString('vno');

        $.ajax({
            type: "POST",
            url: "../AccountsErp/TVoucherNoGetandGets",
            data: vno,
            success: function (result) {
                VoucherNoGets(result.oList,0);
            }
        });
    }
    else {
        Defaultfocus();
        serialnoload();
    }



    $("#btnsubmit").click(function (e) {
        savevoucher();
       
    });
    

    

    $("#VoucherType").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {

            $('#VoucherDate').focus();
            e.preventDefault();
        }
    });
    //$("#Employee").keydown(function (e) {
    //    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    //    if (key == 13) {
    //        $('#VType').focus();
    //        e.preventDefault();
    //    }
    //});
    $("#VoucherDate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
         
            if (ppoo == 1) {
                $('#Amount').focus();
            }
            else {
                $('#VType').focus();
            }
          
            e.preventDefault();
        }
    });

    $("#VType").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
          
            $('#AccountName').focus();
            e.preventDefault();
        }
    });
    $("#AccountName").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#VoucherEntryDescription').focus();
            e.preventDefault();
        }
    });
    $("#VoucherEntryDescription").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Amount').focus();
            $('#Amount').select();
            e.preventDefault();
        }
    });
    $("#Amount").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#TaxNo').focus();            
            e.preventDefault();
        }
    });
    $("#TaxNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#ReferenceNo').focus();
            e.preventDefault();
        }
    });
    $("#ReferenceNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#JobandFC').focus();
            e.preventDefault();
        }
    });
    $("#JobandFC").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnadd').focus();
            e.preventDefault();
        }
    });
    $("#InvoiceSettlement").keydown(function (e) {       
            $('#btnadd').focus();              
    }); 

    $('#VoucherDate,#TransferSalary,#ChequeDate').daterangepicker({
        minDate: new Date('1/1/2000'),

        //maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }

    });
});

$(document).keydown(function (e) {
    if (e.altKey && e.keyCode == 83) {                        //Alt+S        
        $("#btnsubmit").click();
    }
    else if (e.altKey && e.keyCode == 82) {                 //Alt+R        
        window.open('../AccountsReport/AccountsReport')
    }
    else if (e.altKey && e.keyCode == 67) {                  //Alt+C
        formrefresh();
    }
    else if (e.keyCode == 27) {                           //esc
        CloseGridMultiple();
        $('#PayRollDiv').hide();
        $('#DepreciationDiv').hide();
        $('#VEDocument').hide();
        $('#popupdiv').hide();
        if ($('#Description').val() != '') {
            var newdd = $('#desc').val();
        }
        else
        {
            var newdd =null;
        }
        $('#VoucherEntryDescription').val(newdd);
        $('#VoucherEntryDescription').focus();
        $('#VoucherEntryDescription').select();
    }
});

function savevoucher() {

    if ($('#VoucherType').val() == 0) {
        //  alert(salaryflag)

        warningshow('Please Select Voucher Type', 'VoucherType');
        return false;
    }

    else if ($.trim($('#slnotxt').val()) == "1") {
        warningshow('Please add Voucher Details', 'btnadd');
        return false;
    }
    else if (editflag != 0) {
        warningshow('Please cancel Edit Mode');
        return false;
    }
    else if ($('#Differencetxt').val() != 0) {
        warningshow('Debit & Credit are not tally');
        return false;
    }
    else {

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('save'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do You Want To Save The Voucher?');
    }

}


function savevcr()
{

    $("#btnsubmit,#confirmOk").prop('disabled', 'disabled');

    var Count = parseInt($('#slnotxt').val());
    var oArray = new Array();
    for (var i = 1; i <= Count; i++) {

        var VoucherTypeId = $('#VoucherType').val();
        if (salaryflag == 1) {
            var VoucherDate = $('#InvoDate' + i).val();

        }
        else {
            var VoucherDate = $('#VoucherDate').val();

        }
     
        var VoucherNo = $('#VoucherNo').val();

        var TransferVoucherNo = $('#TransferVoucherNo').val();
        if ($('#VType' + i).val() == 'Debit') {
            var VType = 'D';
        }
        else {
            var VType = 'C';
        }

        if (($('#Employee').val()) == '') {
            if (salaryflag == 1) {
                var empId = $('#Emp' + i).val();

            }
            else {
                var empId = 0;
            }
            //////


        }
        else {
            var empId = $('#Emp' + i).val();//$('#EmployeeId0').val();


        }

        var AccountId = $('#supplierId' + i).val();
        var AccCode = $('#AccCode' + i).val();
        if ($('#BillSerNo' + i).text() == 0) {
            var BillSerId = 0;
        }
        else {
            var BillSerId = $('#BillSerNo' + i).text();
        }
        var VoucherEntryDescription = $('#VoucherEntryDescription' + i).val();
        var TaxNo = $('#TaxNo' + i).val();
        var TrxType = $('#trxtype' + i).val();
        var Amount = $('#Amount' + i).val();
        if ($('#ReferenceNo' + i).val() == "") {
            var ReferenceNo = 0;
        }
        else {
            var ReferenceNo = $('#ReferenceNo' + i).val();
        }

        var DelFlag = $('#RefbillNo' + i).val();


        var ProjectJobId = $('#ProjectJobId' + i).val();
        var CostCenterId = $('#CostCenterId' + i).val();
        var AssetId = $('#NewAssetId' + i).val();
        var CurrId = $('#CurrencyId' + i).val();
        if (typeof CurrId == "undefined" || CurrId == 0) {
            var CurrencyId = 1;
            var CurrencyRate = 1.000;
            var FCAmount = $('#Amount' + i).val();
            var ChequeDate = 0;
            var ChequeNo = 0;
            var BankId = 0;
            var PDCAccount = 0;
            var PDCStatus = 0;
        }
        else {
            var CurrencyId = $('#CurrencyId' + i).val();
            var CurrencyRate = $('#Rate' + i).val();
            var FCAmount = $('#FCAmount' + i).val();
            if ($('#ChequeDate' + i).val() == "") {
                var ChequeDate = 0;
            }
            else {
                var ChequeDate = $('#ChequeDate' + i).val();;
            }
            var ChequeNo = $('#ChequeNo' + i).val();
            var BankId = $('#BankId' + i).val();
            var PDCAccount = $('#PDCAccount' + i).val();
            if ($('#PDCAccount' + i).val() == "") {
                var PDCStatus = 0;
            }
            else {
                var PDCStatus = 'O';
            }
        }

        var UserId = ERPUserId;
        var DeptId = ERPDeptId;
        if (VoucherTypeId == 1) {
            var VoucherTypePrefix = "JV";
        }
        else if (VoucherTypeId == 2) {
            var VoucherTypePrefix = "RV";
        }
        else if (VoucherTypeId == 3) {
            var VoucherTypePrefix = "PV";
        }
        else if (VoucherTypeId == 4) {
            var VoucherTypePrefix = "PC";
        }
        else if (VoucherTypeId == 5) {
            var VoucherTypePrefix = "CV";
        }
        else if (VoucherTypeId == 6) {
            var VoucherTypePrefix = "AV";
        }
        else if (VoucherTypeId == 7) {
            var VoucherTypePrefix = "OP";
        }
        else if (VoucherTypeId == 8) {
            var VoucherTypePrefix = "IO";
        }
        else if (VoucherTypeId == 9) {
            var VoucherTypePrefix = "SN";
        }
        else if (VoucherTypeId == 10) {
            var VoucherTypePrefix = "II";
        }
        else if (VoucherTypeId == 11) {
            var VoucherTypePrefix = "TV";
        }
        else if (VoucherTypeId == 12) {
            var VoucherTypePrefix = "CN";
        }
        else if (VoucherTypeId == 13) {
            var VoucherTypePrefix = "DN";
        }
        else if (VoucherTypeId == 14) {
            var VoucherTypePrefix = "CB";
        }
        else if (VoucherTypeId == 15) {
            var VoucherTypePrefix = "PN";
        }
        else if (VoucherTypeId == 18) {
            var VoucherTypePrefix = "BRV";
        }
        else if (VoucherTypeId == 17) {
            var VoucherTypePrefix = "BPV";
        }
        var Advance = 'False';
        var AdvanceAmount = 0.000;

        if (!(typeof ReferenceNo == "undefined")) {
            oArray.push({
                'VoucherTypeId': VoucherTypeId,
                'VoucherNo': VoucherNo,
                'TransferVoucherNo': TransferVoucherNo,
                'VoucherTypeId': VoucherTypeId,
                'VoucherDate': VoucherDate,
                'BillSerId': BillSerId,
                'VType': VType,
                'AccountId': AccountId,
                'AccCode': AccCode,
                'VoucherEntryDescription': VoucherEntryDescription,

                'Amount': Amount,
                'ReferenceNo': ReferenceNo,
                'ProjectJobId': ProjectJobId,
                'CostCenterId': CostCenterId,
                'CurrencyId': CurrencyId,
                'CurrencyRate': CurrencyRate,
                'BankId': BankId,
                'ChequeNo': ChequeNo,
                'ChequeDate': ChequeDate,
                'PDCAccount': PDCAccount,
                'PDCStatus': PDCStatus,
                'FCAmount': FCAmount,
                'DelFlag': DelFlag,
                'UserId': UserId,
                'DeptId': DeptId,
                'VoucherTypePrefix': VoucherTypePrefix,
                'Advance': Advance,
                'AdvanceAmount': AdvanceAmount,
                'TaxNo': TaxNo,
                'TrxType': TrxType,
                'empId': empId,
                'AssetId': AssetId,
            })
        }
    }


    if (oArray != "") {
        var data = { 'VoucherEntryModel': oArray };
        $.ajax(
  {
      type: "POST",
      url: "../AccountsErp/VoucherEntryTableInsert",
      data: data,
      success: function (result) {
          
              var status = result.oList[0].Status;
              $('#VoucherNoPrint').val(result.oList[0].VoucherNo);
              var VoucherNo = result.oList[0].VoucherNo;
              var DeptId = result.oList[0].DeptId;
              var VoucherType = result.oList[0].VoucherType;
              $('#VEfileUploadValue').val(VoucherNo);
              $('#VEVoucherType').val(VoucherType);
              if (status == 1) {
                  if (document.getElementById('VEfileUpload').files.length > 0) {
                      CreateFolder();
                      Showalerts(status, VoucherNo, VoucherType);
                  }
                  else {
                      Showalerts(status,VoucherNo, VoucherType);
                  }
              }
              else {
                  Showalerts(status, VoucherNo,VoucherType);
              }
      }
  });
    }
}

function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'save') {
        savevcr();
    }
    else if (Result == 'true' && status == 'PrevDataAvail') {
        LoadTempUnsavedVoucher();
    }
    else if (Result == 'true' && status == 'createnew') {
        $('.form-control').prop('disabled', false);
        $('.jsgrid-button').prop('disabled', false);
            formrefresh();
    }
    else if (Result == 'true' && status == 'copy') {
        $('.form-control').prop('disabled', false);
        $('.jsgrid-button').prop('disabled', false);
        formrefresh();
        $("#btnsubmit").hide();
        $('#TransferVoucherNo').prop('disabled', false);
        $('#TransferVoucherNo').hide();
        $('#TransferVoucherNoCopy').prop('disabled', false);
        $('#TransferVoucherNoCopy').val('');
        $('#TransferVoucherNoCopy').show();
        $('#TransferVoucherNoCopy').focus();
        $('#Transfernolabel').text('Search Vou#');
    }
    else if (Result == 'true' && status == 'VEFiles') {
        OKUploadVEFiles();
    }
    else if (Result == 'false' && status == 'copy') {
        CopyFlag = 0;
    }
    $('#confirm').fadeOut();
}



function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}
function Defaultfocus() {
    $('#VoucherType').focus();
}

function Expandtbl() {
    if ($('#Bank').is(":visible"))
        $("#tblvoucherentry").width("100%");
    else
        $("#tblvoucherentry").width("2500px");
}


function formrefresh() {
    CopyFlag = 0;
    $('#Transfernolabel').text('Transfer#')
    if (editflag != 0) {
        warningshow('Please cancel Edit Mode');
        return false;
    }
    else {
        //USEDCARS
        $('#vouchersaveno').val('');
       // AccountLoad();
        $("#btnsubmit").show();
        $("#btncopy").show();
        $('#VoucherNo').prop('disabled', false);
        $('#VoucherDate').prop('disabled', false);
        $("#btnprint").hide();
        $('#btncopy').prop('disabled', false);


        $('#TransferVoucherNo').prop('disabled', false);
        salaryflag=0;
        ppoo = 0;
        $('#Employee').val('');
        $('#EmpCode').val('');
        $('#EmployeeId0').val('');
        $("#btnsubmit,#confirmOk").prop('disabled', false);
        $('#Employee').prop('disabled', true);
        $('#TransferVoucherNo').val('');
        $('#TransferVoucherNo').show();
        $('#TransferVoucherNoCopy').hide();
        $('#VoucherDate').val(CurDate);
        $('#TransferSalary').val(CurDate);
        
        $('#Acbal1').val('0.0');
        $('#VoucherType').val('0');
        $('#VoucherNo').val('0');
        $('#VType').val('Debit');
        $('#AccountName').val('');
        $('#supplierId0').val('');
        $('#VoucherEntryDescription').val('');
         $('#TaxNo').val('');
        $('#Amount').val('');
        $('#ReferenceNo').val('');
        $('#JobCode').val('0');
        $('#CostCenterName').val('0');
        $('#Currency').val(BaseCurrency);
        $("#Rate").val($("#Currency").find("option:selected").attr("name"));
        $('#FCAmount').val('');
        $('#trxtype').val(0);
        $('#ChequeNo').val('');
        $('#ChequeDate').val('');
        $('#Bank').val('0');
        $('#PDCAccount').val('');
        $('#VoucherEntryId').val(0);
        $('#hiddenrow').val('');
        $('#btndelete').hide();
        $('#VoucherType').focus();
        for (var k = 1; k <= ($('#slnotxt').val()) ; k++) {
            $('#row' + k).remove();
            $('#AssetId' + k).val('');
            $('#NewAssetId' + k).val('');
        }
        $('#slnotxt').val('1');
        $('#thJobCode,#thCostCode').hide();
        $('#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc').hide();
        $('#empname').hide();
        $('#Credittxt').val('0.00');
        $('#Debittxt').val('0.00');
        $('#Differencetxt').val('0.00');
        $('#Acbal').val("0.00");
        $("#tblvoucherentry").width("100%");
        $('#VType').prop('disabled', false);
        $('#AccountName').prop('disabled', false);
        $('#AccountNamebtn').prop('disabled', false);
        $('#VoucherEntryDescription').prop('disabled', false);
        $('#VoucherEntryDescription').prop('disabled', false);
        $('#Amount').prop('disabled', false);
        $('#btnadd').prop('disabled', false);
        $('#JobandFC').prop('disabled', false);
        $('#InvoiceSettlement').prop('disabled', false);
        $('#Del').show();
        serialnoload();
        $('#AccountType').val('1');
        $('#Type').val('0');
        $("#Type").prop('disabled', 'disabled');
        $("#ChequeDate").prop('disabled', 'disabled');
        $("#ChequeDate").val('');
        $("#ChequeNo").prop('disabled', 'disabled');
        $("#Bank").prop('disabled', 'disabled');
      
        //$('#VEViewFiles').hide();
        $('#VEfileUpload').show();
        $('#btnuploadVEfiles').show();
        $("#balancelabel").show();
        $("#Acbal1").show();
        
    }
}

function Clear() {
    //if ($('#slnotxt').val() <2) {
    //    formrefresh();
    //    $('#VoucherType').prop('disabled', false);
    //    $('#TaxNo').prop('disabled', false);
    //    $('#ReferenceNo').prop('disabled', false);
    //}
    //else {
    //    var result = confirm("Do you want to Continue?")
    //    if (result == true)
    //        formrefresh();
    //    $('#VoucherType').prop('disabled', false);
    //    $('#TaxNo').prop('disabled', false);
    //    $('#ReferenceNo').prop('disabled', false);
    //}

    var rowCount = document.getElementById('tblvoucherentry').rows.length;
    if (rowCount == 1 || CopyFlag == 1) {
        $('.form-control').prop('disabled', false);
        $('.jsgrid-button').prop('disabled', false);
        formrefresh();
        CopyFlag = 0;
    }
    else {
        $("#confirmOk").prop("disabled", false);
        $('#Confirmflag').val('createnew'), $('#ConfirmRowId').val(1)
        $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').focus();
    }

}

function gridrefresh() {
    $('#AccountName').val('');
    $('#supplierId0').val('');
    $('#VoucherEntryDescription').val('');
    $('#TaxNo').val('');
    $('#Amount').val('');
    $('#ReferenceNo').val('');
    $('#JobCode').val('0');
    $('#CostCenterName').val('0');
    $('#Currency').val(BaseCurrency);
    $("#Rate").val($("#Currency").find("option:selected").attr("name"));
    $('#FCAmount').val('');
    $('#trxtype').val(0)
    $('#ChequeNo').val('');
    $('#ChequeDate').val('');
    $('#Bank').val('0');
    $('#Acbal').val('0.00');
    $('#PDCAccount').val('');
    if ($('#VType').val() == 'Debit') {
        $('#VType').val('Credit');
    }
    else {
        $('#VType').val('Debit');
    }
    $('#VType').focus();
}

function GridRemove() {
    for (var k = 1; k < ($('#slnotxt').val()) ; k++) {
        $('#row' + k).remove();
    }
}

function ChangeBackGroundColor(Type, Id) {
    if (Type == 0) {
        $('#' + Id).css("background-color", "white")
    }
    else if (Type == 1) {
        $('#' + Id).css("background-color", "#58dbe4")
    }
}

function Editrow(RowId) {
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else {
        editflag = editflag + 1;
        //$('#row' + RowId).children('td,th').css('background-color', 'rgb(232,226,226)');
        //$('#edit_' + RowId).hide();
        //$('#update_' + RowId).show();
        vtype = $('#VType' + RowId).val();
        ved = $('#VoucherEntryDescription' + RowId).val();
        amt = $('#Amount' + RowId).val();
        pjid = $('#ProjectJobId' + RowId).val();
        ccid = $('#CostCenterId' + RowId).val();
        cid = $('#CurrencyId' + RowId).val();
        rt = $('#Rate' + RowId).val();
        fca = $('#FCAmount' + RowId).val();
        trx = $('#trxtype' + RowId).val();
        bid = $('#BankId' + RowId).val();
        cno = $('#ChequeNo' + RowId).val();
        cdt = $('#ChequeDate' + RowId).val();
        EDITREFNO = $('#ReferenceNo' + RowId).val();
        EDITPDCACCNO = $('#PDCAccount' + RowId).val();
        EDITVTYPE = $('#VType' + RowId).val();
        EDITACCOUNTDESC = $("#AccountId" + RowId).val();
        EDITACCOUNTCODE = $("#AccCode" + RowId).val();
        EDITACCOUNTID = $("#supplierId" + RowId).val();
        
        $('#VType' + RowId).prop('disabled', false); 
        $('#VoucherEntryDescription' + RowId).prop('disabled', false);
        $('#Amount' + RowId).prop('disabled', false);
        $('#TaxNo' + RowId).prop('disabled', false);
        $('#ProjectJobId' + RowId).prop('disabled', false);
        $('#CostCenterId' + RowId).prop('disabled', false);
        $('#CurrencyId' + RowId).prop('disabled', false);
        $('#Rate' + RowId).prop('disabled', false);
        $('#FCAmount' + RowId).prop('disabled', false);
        $('#trxtype' + RowId).prop('disabled', false);
        $('#BankId' + RowId).prop('disabled', false);
        $('#ChequeNo' + RowId).prop('disabled', false);
        $('#ChequeDate' + RowId).prop('disabled', false);
        $('#ReferenceNo' + RowId).prop('disabled', false);
        $('#PDCAccount' + RowId).prop('disabled', false);
        $('#VType' + RowId).prop('disabled', false);
        $("#AccountId" + RowId).prop('disabled', false);
        $('#row' + RowId).children('td, th').css('background-color', '#ffcccc');

    }
}


function CancelEditRow(RowId) {

    editflag = editflag - 1;
    $('#row' + RowId).children('td,th').css('background-color', 'white');
    $('#VType' + RowId).val(vtype);
    $('#VoucherEntryDescription' + RowId).val(ved);
    $('#Amount' + RowId).val(amt);
    $('#ProjectJobId' + RowId).val(pjid);
    $('#CostCenterId' + RowId).val(ccid);
    $('#CurrencyId' + RowId).val(cid);
    $('#Rate' + RowId).val(rt);
    $('#FCAmount' + RowId).val(fca);
    $('#trxtype'+RowId).val(trx)
    $('#BankId' + RowId).val(bid);
    $('#ChequeNo' + RowId).val(cno);
    $('#ChequeDate' + RowId).val(cdt);

    $('#ReferenceNo' + RowId).val(EDITREFNO);
    $('#PDCAccount' + RowId).val(EDITPDCACCNO);
    $('#VType' + RowId).val(EDITVTYPE);
    $("#AccountId" + RowId).val(EDITACCOUNTDESC);
    $("#AccCode" + RowId).val(EDITACCOUNTCODE);
    $("#supplierId" + RowId).val(EDITACCOUNTID);

    $('#VType' + RowId).prop('disabled', true);
    $('#AccountId' + RowId).prop('disabled', true);
    $('#VoucherEntryDescription' + RowId).prop('disabled', true);
    $('#Amount' + RowId).prop('disabled', true);
    $('#TaxNo' + RowId).prop('disabled', true);
    $('#ProjectJobId' + RowId).prop('disabled', true);
    $('#CostCenterId' + RowId).prop('disabled', true);
    $('#CurrencyId' + RowId).prop('disabled', true);
    $('#Rate' + RowId).prop('disabled', true);
    $('#FCAmount' + RowId).prop('disabled', true);
    $('#trxtype' + RowId).prop('disabled', true);
    $('#BankId' + RowId).prop('disabled', true);
    $('#ChequeNo' + RowId).prop('disabled', true);
    $('#ChequeDate' + RowId).prop('disabled', true);
    $('#ReferenceNo' + RowId).prop('disabled', true);
    $('#PDCAccount' + RowId).prop('disabled', true);
    $('#VType' + RowId).prop('disabled', true);
    $("#AccountId" + RowId).prop('disabled', true);
    $('#edit_' + RowId).show();
    $('#update_' + RowId).hide();
    CalcCreditAndDebit();
}

function UpdateRow(RowId) {
    editflag = editflag - 1;
    $('#row' + RowId).children('td,th').css('background-color', 'white');
    if (parseFloat($('#Amount' + RowId).val() || 0) == 0) {
        warningshow('Please enter amount', 'Amount' + RowId);
        return false
    }

    else {
        $('#update_' + RowId).hide();
        $('#edit_' + RowId).show();
        //$('#VType' + RowId).prop('disabled', true);
        //$('#VoucherEntryDescription' + RowId).prop('disabled', true);
        //$('#Amount' + RowId).prop('disabled', true);
        //$('#ProjectJobId' + RowId).prop('disabled', true);
        //$('#CostCenterId' + RowId).prop('disabled', true);
        //$('#CurrencyId' + RowId).prop('disabled', true);
        //$('#Rate' + RowId).prop('disabled', true);
        //$('#FCAmount' + RowId).prop('disabled', true);
        //$('#BankId' + RowId).prop('disabled', true);
        //$('#ChequeNo' + RowId).prop('disabled', true);
        //$('#ChequeDate' + RowId).prop('disabled', true);
        //$('#ReferenceNo' + RowId).prop('disabled', true);
        //$('#PDCAccount' + RowId).prop('disabled', true);
        //$('#VType' + RowId).prop('disabled', true);
        //$("#AccountId" + RowId).prop('disabled', true);
        CalcCreditAndDebit();
        VoucherTempSave();
        $('#row' + RowId).children('td, th').css('background-color', '');
    }
}

function CalcCreditAndDebit() {
    var deb = 0;
    var cre = 0;
    var diff = 0;

    for (var j = 1; j < $('#slnotxt').val() ; j++) {

        var s = $('#VType' + j).val()
        if ($('#VType' + j).val() == 'Debit') {

            deb = deb + parseFloat($('#Amount' + j).val() || 0)
            $('#Amount' + j).val(parseFloat($('#Amount' + j).val() || 0).toFixed(decimal));
            fc = parseFloat($('#Amount' + j).val() || 0) / parseFloat($('#Rate' + j).val() || 0)
            $('#FCAmount' + j).val(fc.toFixed(decimal));
        }
        else {

            cre = cre + parseFloat($('#Amount' + j).val() || 0);
            $('#Amount' + j).val(parseFloat($('#Amount' + j).val() || 0).toFixed(decimal));
            fc = parseFloat($('#Amount' + j).val() || 0) / parseFloat($('#Rate' + j).val() || 0)
            $('#FCAmount' + j).val(fc.toFixed(decimal));
        }
    }
    $('#Debittxt').val(deb.toFixed(decimal));
    $('#Credittxt').val(cre.toFixed(decimal));
    diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
    $('#Differencetxt').val(diff.toFixed(decimal));
}
function rowdelete(RowId) {
    var sllno = 1;
    var h = $('#hiddenrow').val();

   

    var Res = confirm("Do You Want Delete this record?")
    if (Res == true) {
        var amt = $('#Amount' + RowId).val();
        if ($('#VType' + RowId).val() == 'Debit') {
            var deb = 0;
            deb = parseFloat($('#Debittxt').val()) - amt;
            $('#Debittxt').val(deb.toFixed(decimal));
            var diff = 0;
            diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
            $('#Differencetxt').val(diff.toFixed(decimal));
        }
        else {
            var cre = 0;
            cre = parseFloat($('#Credittxt').val()) - amt;
            $('#Credittxt').val(cre.toFixed(decimal));
            var diff = 0;
            diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
            $('#Differencetxt').val(diff.toFixed(decimal));
        }
        $('#row' + RowId).remove();
        VoucherTempSave();
        for (var j = 1; j <= h - 1; j++) {            
            if ($('#AccountId' + j).val() != undefined) {
                $('#td' + j).text(sllno);
                sllno++;                
            }            
        }
        CalcCreditAndDebit();
    }
  
    var rowCount = document.getElementById('tblvoucherentry').rows.length;
    
    if(rowCount==1)
    {
        gridrefresh();
    }
    
}

function VoucherEntryAdd() {
    $('#tdJobCode,#thJobCode').show();
    $('#tdCostCode,#thCostCode').show();
    $("#tblvoucherentry").width("100%");
    $('#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc,#tdFC').show();
  var amto = parseFloat($('#Amount').val() || 0);
   // balload();


    var slno = parseInt($('#slnotxt').val())    
    if ($.trim($('#AccountName').val()) == "") {
        warningshow('Please Select Account', 'AccountName');
        return false;
    }
    if ($('#supplierId0').val() == "") {
        warningshow('Please Select A Vaild Account', 'AccountName');
        return false;
    }
    if ($.trim($('#Amount').val()) == "") {
        warningshow('Please enter Amount', 'Amount');
        return false;
    }
    //if ($('#VType').val() == 'Credit' && amto > balo && $('#supplierId0').val() == bankcodecheck) {
    //    warningshow('Not Enough Balance In Bank Account', 'btnadd');
    //    return false;
    //}
    if (( $('#supplierId0').val() == pdcrcodecheck || $('#supplierId0').val() == pdcicodecheck) && chek == 0)       //$('#supplierId0').val() == bankcodecheck ||
    {
        Addpopupwindow(2);
        return false;
    }
    var no = $('#tblvoucherentry tr').length;
    var amt = 0;
    amt = parseFloat($("#Amount").val());


    var billid = $('#billid').val();
  
    if (($('#thJobCode').is(":hidden") && $('#thFC').is(":hidden")) || rowchk == 0) {
//      var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "> </td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option value=Credit >Credit</option><option value=Debit>Debit</option></select> </td><td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'><input type='hidden' id=" + 'Emp' + slno + "  value=" + $("#EmployeeId0").val() + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " value=" + ($.trim($("#AccountName").val())) + "> <input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + $("#VoucherEntryDescription").val() + "'></td><td class= jsgrid-cell  style= width:50px;text-align:center >" + $("#VoucherDate").val() + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + parseFloat(amt).toFixed(decimal) + " onkeyup='EditGirdAmount()'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " value=" + ($.trim($("#TaxNo").val())) + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value='" + ($("#ReferenceNo").val()) + "'><input style=display:none type=text  id=" + 'RefbillNo' + slno + " value=" + billid + "></td></tr>";

        var VoucherRow = "<tr id=" + 'row' + slno + " class='jsgrid-row' onfocusin='Editrow(" + slno + ")'  onfocusout='UpdateRow(" + slno + ")'>" +
            "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' >" +
            //"<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'>" +
            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td>" +
            "<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' >" +
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'>" +
            "<input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td>" +
            "<td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;>" +
            " <select id=" + 'VType' + slno + " onchange='EditGirdAmount()' class='form-control'  style='height:35px;background-color:white' onfocusin=ChangeBackGroundColor('1','" + 'VType' + slno + "') onkeydown=Focusnextgrid(event,'VT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'VType' + slno + "')><option value=Credit>Credit</option><option value=Debit>Debit</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'>" +
            "<input type='hidden' id=" + 'Emp' + slno + "  value=" + $("#EmployeeId0").val() + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " onkeypress='AccountAutoCompleteGrid(" + slno + ")' onkeydown=Focusnextgrid(event,'AN'," + slno + ")  onfocusin=ChangeBackGroundColor('1','" + 'AccountId' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'AccountId' + slno + "') value=" + ($.trim($("#AccountName").val())) + ">" +
            " <input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " />" +
            "<input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'>" +
            " <input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " onkeydown=Focusnextgrid(event,'AD'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'VoucherEntryDescription' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'VoucherEntryDescription' + slno + "') value='" + $("#VoucherEntryDescription").val() + "'></td>" +
            "<td class= jsgrid-cell  style= width:50px;text-align:center ><input type='text' class='form-control INVDATECHANGE' onfocusin=ChangeBackGroundColor('1','" + 'InvoDate' + slno + "') onkeydown=Focusnextgrid(event,'D'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'InvoDate' + slno + "') style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno + " value='" + $("#VoucherDate").val() + "'></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'>" +
            "<input type='text' class='form-control' onkeypress='isNumber(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " onkeydown=Focusnextgrid(event,'A'," + slno + ") onkeyup='EditGirdAmount()' onfocusin=ChangeBackGroundColor('1','" + 'Amount' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Amount' + slno + "') value=" + parseFloat(amt).toFixed(decimal) + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'TaxNo' + slno + "') onkeydown=Focusnextgrid(event,'T'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'TaxNo' + slno + "') value=" + ($.trim($("#TaxNo").val())) + " ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control' onkeypress='isNumberInt(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " onkeydown=Focusnextgrid(event,'R'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'ReferenceNo' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'ReferenceNo' + slno + "') value='" + ($("#ReferenceNo").val()) + "'><input style=display:none type=text  id=" + 'RefbillNo' + slno + " value=" + billid + "></td>" +
           
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> " +
            "<select id=" + 'CurrencyId' + slno + " class='form-control'  style='height:35px;background-color:white' onchange='CurrencyChangeGrid(" + slno + ")' onfocusin=ChangeBackGroundColor('1','" + 'CurrencyId' + slno + "') onkeydown=Focusnextgrid(event,'FX'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CurrencyId' + slno + "')> " + CurrencySelect + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'Rate' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'Rate' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Rate' + slno + "') onkeydown=Focusnextgrid(event,'FXR'," + slno + ") value= " + ($.trim($("#Rate").val())) + "></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' onkeypress='isNumber(event, this)' onkeyup=CalculateAmountRow() class='form-control'  style='height:35px;background-color:white' id=" + 'FCAmount' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'FCAmount' + slno + "') onkeydown=Focusnextgrid(event,'FCA'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'FCAmount' + slno + "') value= " + ($.trim($("#AmountFC").val())) + "></td>" +

             "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<select type='text' class='form-control'  style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'ProjectJobId' + slno + "') onkeydown=Focusnextgrid(event,'J'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ProjectJobId' + slno + "')> " + JobCode + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'CostCenterId' + slno + "') onkeydown=Focusnextgrid(event,'CC'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CostCenterId' + slno + "')>" + CostCenterName + "</select></td>" +

            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            " <select class='form-control' style='height:35px;background-color:white' id=" + 'trxtype' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'trxtype' + slno + "') onkeydown=Focusnextgrid(event,'TRXT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'trxtype' + slno + "')><option value=0>-Select-</option><option value=1>CHQ</option><option value=2>NEFT</option><option value=3>RTGS</option><option value=4>IMPS</option><option value=5>ATM</option><option value=6>Others</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            " <select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'BankId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'BankId' + slno + "') onkeydown=Focusnextgrid(event,'BNK'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'BankId' + slno + "')> " + Bank + "</select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeNo' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'ChequeNo' + slno + "') onkeydown=Focusnextgrid(event,'CQ'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeNo' + slno + "') value=" + ($.trim($("#ChequeNo").val())) + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeDate' + slno + " value='' onfocusin=ChangeBackGroundColor('1','" + 'ChequeDate' + slno + "') onkeydown=Focusnextgrid(event,'CQD'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeDate' + slno + "')></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'PDCAccount' + slno + " onkeypress='PDCAccountAutoComplete(" + slno + ")' onfocusin=ChangeBackGroundColor('1','" + 'PDCAccount' + slno + "') onkeydown=Focusnextgrid(event,'PDCA'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'PDCAccount' + slno + "')  value=" + ($.trim($("#PDCAccount").val())) + "></td>" +
            "</tr>";


    }
    else if ($('#thJobCode').is(":visible") && $('#thFC').is(":visible") && rowchk == 1) {
        //var VoucherRow = "<tr  id=" + 'row' + slno + " class= jsgrid-row onfocusin='Editrow(" + slno + ")'  onfocusout='UpdateRow(" + slno + ")'>" +
                var VoucherRow = "<tr id=" + 'row' + slno + " class='jsgrid-row' onfocusin='Editrow(" + slno + ")'  onfocusout='UpdateRow(" + slno + ")'>" +
        "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' >" +
           // "<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'>" +
            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td>" +
            "<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' >" +
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'>" +
            "<input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td>" +
            "<td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td>" + 
            "<td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> " +
            "<select id=" + 'VType' + slno + " onchange='EditGirdAmount()' class='form-control'  style='height:35px;background-color:white' onfocusin=ChangeBackGroundColor('1','" + 'VType' + slno + "') onkeydown=Focusnextgrid(event,'VT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'VType' + slno + "')><option value=Credit>Credit</option><option value=Debit>Debit</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'><input type='hidden' id=" + 'Emp' + slno + "  value=" + $("#EmployeeId0").val() + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'>" +
            "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " onkeypress='AccountAutoCompleteGrid(" + slno + ")' onkeydown=Focusnextgrid(event,'AN'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'AccountId' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'AccountId' + slno + "') value=" + ($.trim($("#AccountName").val())) + "> " +
            "<input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " />" +
            "<input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'VoucherEntryDescription' + slno + "')  onkeydown=Focusnextgrid(event,'AD'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'VoucherEntryDescription' + slno + "') value='" + $("#VoucherEntryDescription").val() + "'></td>" +
            "<td class= jsgrid-cell  style= width:50px;text-align:center ><input type='text' class='form-control INVDATECHANGE' onfocusin=ChangeBackGroundColor('1','" + 'InvoDate' + slno + "')  onkeydown=Focusnextgrid(event,'D'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'InvoDate' + slno + "') style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno + " value='" + $("#VoucherDate").val() + "'></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'>" +
            "<input type='text' class='form-control' onkeypress='isNumber(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " onkeydown=Focusnextgrid(event,'A'," + slno + ") onkeyup='EditGirdAmount()' onfocusin=ChangeBackGroundColor('1','" + 'Amount' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Amount' + slno + "') value=" + parseFloat(amt).toFixed(decimal) + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'TaxNo' + slno + "') onkeydown=Focusnextgrid(event,'T'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'TaxNo' + slno + "')  value=" + ($.trim($("#TaxNo").val())) + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control' onkeypress='isNumberInt(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'ReferenceNo' + slno + "') onkeydown=Focusnextgrid(event,'R'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ReferenceNo' + slno + "') value='" + ($("#ReferenceNo").val()) + "'></td>" +
          
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> " +
            "<select id=" + 'CurrencyId' + slno + " class='form-control'  style='height:35px;background-color:white' onchange='CurrencyChangeGrid(" + slno + ")' onfocusin=ChangeBackGroundColor('1','" + 'CurrencyId' + slno + "') onkeydown=Focusnextgrid(event,'FX'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CurrencyId' + slno + "')> " + CurrencySelect + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            " <input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'Rate' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'Rate' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Rate' + slno + "') onkeydown=Focusnextgrid(event,'FXR'," + slno + ") value= " + ($.trim($("#Rate").val())) + "></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' onkeypress='isNumber(event, this)' onkeyup=CalculateAmountRow() class='form-control'  style='height:35px;background-color:white' id=" + 'FCAmount' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'FCAmount' + slno + "') onkeydown=Focusnextgrid(event,'FCA'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'FCAmount' + slno + "') value= " + ($.trim($("#AmountFC").val())) + "></td>" +

              "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<select type='text' class='form-control'  style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'ProjectJobId' + slno + "') onkeydown=Focusnextgrid(event,'J'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ProjectJobId' + slno + "')> " + JobCode + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            " <select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'CostCenterId' + slno + "') onkeydown=Focusnextgrid(event,'CC'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CostCenterId' + slno + "')>" + CostCenterName + "</select></td>" +

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            " <select class='form-control'   style='height:35px;background-color:white' id=" + 'trxtype' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'trxtype' + slno + "')  onkeydown=Focusnextgrid(event,'TRXT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'trxtype' + slno + "')><option value=0>-Select-</option><option value=1>CHQ</option><option value=2>NEFT</option><option value=3>RTGS</option><option value=4>IMPS</option><option value=5>ATM</option><option value=6>Others</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'BankId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'BankId' + slno + "')  onkeydown=Focusnextgrid(event,'BNK'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'BankId' + slno + "')> " + Bank + "</select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeNo' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'ChequeNo' + slno + "') onkeydown=Focusnextgrid(event,'CQ'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeNo' + slno + "') value= " + ($.trim($("#ChequeNo").val())) + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeDate' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'ChequeDate' + slno + "')  onkeydown=Focusnextgrid(event,'CQD'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeDate' + slno + "')  value= " + ($.trim($("#ChequeDate").val())) + " ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'PDCAccount' + slno + " onkeypress='PDCAccountAutoComplete(" + slno + ")'  onkeydown=Focusnextgrid(event,'PDCA'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'PDCAccount' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'PDCAccount' + slno + "') value= " + ($.trim($("#PDCAccount").val())) + "><input type=text style=display:none  id=" + 'RefbillNo' + slno + " value=" + billid + "></td></tr>";
    }
    $('#tblvoucherentry').append(VoucherRow);
    $('#billid').val(0)
    
 
  
  
    $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
    $('#trxtype' + slno).val($('#trxtype').val());
    $('#trxtype' + slno).val($('#Type').val());
    $('#ChequeDate' + slno).val($('#ChequeDate').val());
    $('#VType' + slno).val($("#VType").val()); 
    $('#AccountId' + slno).val($('#AccountName').val());
    $('#ProjectJobId' + slno).val($('#JobCode').val());
    $('#CostCenterId' + slno).val($('#CostCenterName').val());
    $('#CurrencyId' + slno).val($('#Currency').val());
    if ($('#Currency').val()==0) {
        $('#CurrencyId' + slno).val(1);
        $('#Rate' + slno).val('1');
        $('#FCAmount' + slno).val($('#Amount').val());
    }    
    $('#BankId' + slno).val($('#Bank').val());
    var i = $('#slnotxt').val();
    $('#hiddenrow').val(i);
    var deb = 0;
    var cre = 0;
    var diff = 0;
    for (var j = 1; j < $('#slnotxt').val() ; j++) {
        if ($('#VType' + j).val()=='Debit') {
            deb = deb + parseFloat($('#Amount' + j).val() || 0)
            $('#Debittxt').val(deb.toFixed(decimal));
        }
        else {
            cre = cre + parseFloat($('#Amount' + j).val() || 0)
            $('#Credittxt').val(cre.toFixed(decimal));
        }
    }
    diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
    $('#Differencetxt').val(diff.toFixed(decimal));
    var desc = $('#VoucherEntryDescription').val();
    var amt = $('#Amount').val();
    var txno = $('#TaxNo').val();
    gridrefresh();
    var ddif = $('#Differencetxt').val();
    if (ddif == 0)
    {
        $('#VoucherEntryDescription').val(desc);
        $('#Amount').val('');
        $('#TaxNo').val('');
    }
    else
    {
        $('#VoucherEntryDescription').val(desc);
        $('#Amount').val(amt);
        $('#TaxNo').val(txno);
    }
   
    VoucherTempSave();
}



function Focusnextgrid(e, col, Id) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (key == 39) {              // Right Arrow

        if (col == 'AN' && Id == 0) {
            e.preventDefault();
            $('#VoucherEntryDescription').focus();
            $('#VoucherEntryDescription').select();
        }
        else if (col == 'AD' && Id == 0) {
            e.preventDefault();
            $('#Amount').focus();
            $('#Amount').select();
        }
        else if (col == 'A' && Id == 0) {
            e.preventDefault();
            $('#TaxNo').focus();
        }
        else if (col == 'T' && Id == 0) {
            e.preventDefault();
            $('#ReferenceNo').focus();
        }
        else if (col == 'R' && Id == 0) {
            e.preventDefault();
            $('#btnadd').focus();
        }


        else if (col == 'VT' && Id != 0) {
            e.preventDefault();
            $('#VoucherEntryDescription' + Id).focus();
        }
        else if (col == 'AD' && Id != 0) {
            e.preventDefault();
            $('#InvoDate' + Id).focus();
        }
        else if (col == 'D' && Id != 0) {
            e.preventDefault();
            $('#Amount' + Id).focus();
        }
        else if (col == 'A' && Id != 0) {
            e.preventDefault();
            $('#TaxNo' + Id).focus();
        }
        else if (col == 'T' && Id != 0) {
            e.preventDefault();
            $('#ReferenceNo' + Id).focus();
            $('#ReferenceNo' + Id).select();
        }
        else if (col == 'R' && Id != 0) {
            e.preventDefault();            
            $('#CurrencyId' + Id).focus();           
        }
        else if (col == 'J' && Id != 0) {
            e.preventDefault();
            $('#CostCenterId' + Id).focus();
            $('#CostCenterId' + Id).select();
        }
        else if (col == 'CC' && Id != 0) {
            e.preventDefault();
            $('#trxtype' + Id).focus();
            $('#trxtype' + Id).select();
        }
        else if (col == 'FX' && Id != 0) {
            e.preventDefault();
            $('#Rate' + Id).focus();
            $('#Rate' + Id).select();
        }
        else if (col == 'FXR' && Id != 0) {
            e.preventDefault();
            $('#FCAmount' + Id).focus();
            $('#FCAmount' + Id).select();
        }
        else if (col == 'FCA' && Id != 0) {
            e.preventDefault();
            $('#ProjectJobId' + Id).focus();
            $('#ProjectJobId' + Id).select();           
        }
        else if (col == 'TRXT' && Id != 0) {
            e.preventDefault();
            $('#BankId' + Id).focus();
            $('#BankId' + Id).select();
        }
        else if (col == 'BNK' && Id != 0) {
            e.preventDefault();
            $('#ChequeNo' + Id).focus();
            $('#ChequeNo' + Id).select();
        }
        else if (col == 'CQ' && Id != 0) {
            e.preventDefault();
            $('#ChequeDate' + Id).focus();
            $('#ChequeDate' + Id).select();
        }
        else if (col == 'JC' && Id == 0) {
            $('#Rate').focus();
            e.preventDefault();

            // $('#Rate').select();
        }
        else if (col == 'JR' && Id == 0) {
            $('#FCAmount').focus();
            //$('#FCAmount').select();
            e.preventDefault();

            $('#FCAmount').select();
        }
        else if (col == 'JA' && Id == 0) {
            e.preventDefault();
            $('#AccountType').focus();
           
            // $('#Banklb').select();
        }
        else if (col == 'JAT' && Id == 0) {
            e.preventDefault();
                $('#PDCAccount').focus();
        }
        else if (col == 'JTT' && Id == 0) {
            e.preventDefault();
            $('#ChequeNo').focus();
            
        }
        else if (col == 'JB' && Id == 0) {
            e.preventDefault();
            $('#PDCAccount').focus();
            
            //  $('#ChequeNo').select();
        }
        else if (col == 'JCQ' && Id == 0) {
            e.preventDefault();
            $('#ChequeDate').select();
            $('#ChequeDate').focus();
          
        }
        else if (col == 'JCQD' && Id == 0) {
            $('#Bank').focus();
            //  $('#JobCodelb').select();
            e.preventDefault();
        }

        else if (col == 'JPDC' && Id == 0) {
            e.preventDefault();
            $('#JobCode').focus();
          
            // $('#btnaddtogrid').select();
        }
        else if (col == 'JCO' && Id == 0) {
            e.preventDefault();
            $('#CostCenterName').focus();
            
            //
        } else if (col == 'JCST' && Id == 0) {
            e.preventDefault();
            $('#btnaddtogrid').focus();
           
            //
        }
    }
    else if (key == 37) {              // Left Arrow

        if (col == 'B' && Id == 0) {
            e.preventDefault();
            $('#ReferenceNo').focus();
        }
        else if (col == 'R' && Id == 0) {
            e.preventDefault();
            $('#TaxNo').focus();
        }
        else if (col == 'T' && Id == 0) {
            e.preventDefault();
            $('#Amount').focus();
            $('#Amount').select();
        }
        else if (col == 'A' && Id == 0) {
            e.preventDefault();
            $('#VoucherEntryDescription').focus();
            $('#VoucherEntryDescription').select();
        }
        else if (col == 'AD' && Id == 0) {
            e.preventDefault();
            $('#AccountName').focus();
        }

        else if (col == 'AD' && Id != 0) {
            e.preventDefault();
            $('#VType' + Id).focus();
            $('#VType' + Id).select();
        }
        else if (col == 'D' && Id != 0) {
            e.preventDefault();
            $('#VoucherEntryDescription' + Id).focus();
            $('#VoucherEntryDescription' + Id).select();
        }
        else if (col == 'A' && Id != 0) {
            e.preventDefault();
            $('#InvoDate' + Id).focus();
            $('#InvoDate' + Id).select();
        }
        else if (col == 'T' && Id != 0) {
            e.preventDefault();
            $('#Amount' + Id).focus();
            $('#Amount' + Id).select();
        }
        else if (col == 'R' && Id != 0) {
            e.preventDefault();
            $('#TaxNo' + Id).focus();
            $('#TaxNo' + Id).select();
        }
        else if (col == 'J' && Id != 0) {
            e.preventDefault();
            $('#FCAmount' + Id).focus();
            $('#FCAmount' + Id).select();
            
        }
        else if (col == 'CC' && Id != 0) {
            e.preventDefault();
            $('#ProjectJobId' + Id).focus();
            $('#ProjectJobId' + Id).select();
        }
        else if (col == 'FX' && Id != 0) {
            e.preventDefault();
            $('#ReferenceNo' + Id).focus();
            $('#ReferenceNo' + Id).select();
           
        }
        else if (col == 'FXR' && Id != 0) {
            e.preventDefault();
            $('#CurrencyId' + Id).focus();
            $('#CurrencyId' + Id).select();
        }

        else if (col == 'FCA' && Id != 0) {
            e.preventDefault();
            $('#Rate' + Id).focus();
            $('#Rate' + Id).select();
        }

        else if (col == 'TRXT' && Id != 0) {
            e.preventDefault();
            $('#CostCenterId' + Id).focus();
            $('#CostCenterId' + Id).select();
        }
        else if (col == 'BNK' && Id != 0) {
            e.preventDefault();
            $('#trxtype' + Id).focus();
            $('#trxtype' + Id).select();
        }
        else if (col == 'CQ' && Id != 0) {
            e.preventDefault();
            $('#BankId' + Id).focus();
            $('#BankId' + Id).select();
        }
        else if (col == 'CQD' && Id != 0) {
            e.preventDefault();
            $('#ChequeNo' + Id).focus();
            $('#ChequeNo' + Id).select();
        }
        else if (col == 'JR' && Id == 0) {
            e.preventDefault();
            $('#Currency').focus();
            // $('#FCAmount').select();
        }
        else if (col == 'JA' && Id == 0) {
            e.preventDefault();
            $('#Rate').focus();
            // $('#Banklb').select();
        }
        else if (col == 'JB' && Id == 0) {
            e.preventDefault();
            $('#FCAmount').focus();
            // $('#ChequeNo').select();
        }
        else if (col == 'JCQ' && Id == 0) {
            e.preventDefault();
            $('#Type').focus();
            //$('#ChequeDate').select();
        }
        else if (col == 'JCQD' && Id == 0) {
            e.preventDefault();
            $('#ChequeNo').focus();
            // $('#JobCodelb').select();
        }
        else if (col == 'JPDC' && Id == 0) {
            $('#ChequeDate').select();
            $('#ChequeDate').focus();
            e.preventDefault();
        }
        else if (col == 'JCO' && Id == 0) {
            e.preventDefault();
            $('#PDCAccount').focus();
            //$('#PDCAccount').select();
        }
        else if (col == 'JCST' && Id == 0) {
            e.preventDefault();
            $('#JobCode').focus();
            //$('#btnaddtogrid').select();
        }
        else if (col == 'JADD' && Id == 0) {
            e.preventDefault();
            $('#CostCenterName').focus();
            //$('#btnaddtogrid').select();
        }

    }

    else if (key == 40 && Id != 0)          // Down Arrow
    {
        e.preventDefault();
        var nextID = Id;
        try {
            nextID = ($('#VoucherEntryDescription' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0];
        }
        catch (err) {
            nextID = Id;
        }


        if (col == 'VT') {
            $('#VType' + nextID).focus();
            $('#VType' + nextID).select();
        }
        else if (col == 'AD') {
            $('#VoucherEntryDescription' + nextID).focus();
            $('#VoucherEntryDescription' + nextID).select();
        }
        else if (col == 'D') {
            $('#InvoDate' + nextID).focus();
            $('#InvoDate' + nextID).select();
        }
        else if (col == 'A') {
            $('#Amount' + nextID).focus();
            $('#Amount' + nextID).select();
        }
        else if (col == 'T') {
            $('#TaxNo' + nextID).focus();
            $('#TaxNo' + nextID).select();
        }
        else if (col == 'R') {
            $('#ReferenceNo' + nextID).focus();
            $('#ReferenceNo' + nextID).select();
        }
        else if (col == 'J') {
            $('#ProjectJobId' + nextID).focus();
            $('#ProjectJobId' + nextID).select();
        }
        else if (col == 'CC') {
            $('#CostCenterId' + nextID).focus();
            $('#CostCenterId' + nextID).select();
        }
        else if (col == 'FX') {
            $('#CurrencyId' + nextID).focus();
            $('#CurrencyId' + nextID).select();
        }
        else if (col == 'FCA') {
            $('#FCAmount' + nextID).focus();
            $('#FCAmount' + nextID).select();
        }
        else if (col == 'FXR') {
            $('#Rate' + nextID).focus();
            $('#Rate' + nextID).select();
        }
        else if (col == 'TRXT') {
            $('#trxtype' + nextID).focus();
            $('#trxtype' + nextID).select();
        }
        else if (col == 'BNK') {
            $('#BankId' + nextID).focus();
            $('#BankId' + nextID).select();
        }
        else if (col == 'CQ') {
            $('#ChequeNo' + nextID).focus();
            $('#ChequeNo' + nextID).select();
        }
        else if (col == 'CQD') {
            $('#ChequeDate' + nextID).focus();
            $('#ChequeDate' + nextID).select();
        }
        //else if (col == 'PDCA') {
        //    $('#PDCAccount' + nextID).focus();
        //    $('#PDCAccount' + nextID).select();
        //}
    }
    else if (key == 38 && Id != 0) {           // Up Arrow
        e.preventDefault();
        var nextID = Id;
        try {
            nextID = ($('#VoucherEntryDescription' + Id).closest('tr').prev('tr').attr('id')).match(/\d+/)[0];
        }
        catch (err) {
            nextID = Id;
        }

        if (col == 'VT') {
            $('#VType' + nextID).focus();
            $('#VType' + nextID).select();
        }
        else if (col == 'AD') {
            $('#VoucherEntryDescription' + nextID).focus();
            $('#VoucherEntryDescription' + nextID).select();
        }
        else if (col == 'D') {
            $('#InvoDate' + nextID).focus();
            $('#InvoDate' + nextID).select();
        }
        else if (col == 'A') {
            $('#Amount' + nextID).focus();
            $('#Amount' + nextID).select();
        }
        else if (col == 'T') {
            $('#TaxNo' + nextID).focus();
            $('#TaxNo' + nextID).select();
        }
        else if (col == 'R') {
            $('#ReferenceNo' + nextID).focus();
            $('#ReferenceNo' + nextID).select();
        }
        else if (col == 'J') {
            $('#ProjectJobId' + nextID).focus();
            $('#ProjectJobId' + nextID).select();
        }
        else if (col == 'CC') {
            $('#CostCenterId' + nextID).focus();
            $('#CostCenterId' + nextID).select();
        }
        else if (col == 'FX') {
            $('#CurrencyId' + nextID).focus();
            $('#CurrencyId' + nextID).select();
        }
        else if (col == 'FCA') {
            $('#FCAmount' + nextID).focus();
            $('#FCAmount' + nextID).select();
        }
        else if (col == 'FXR') {
            $('#Rate' + nextID).focus();
            $('#Rate' + nextID).select();
        }
        else if (col == 'TRXT') {
            $('#trxtype' + nextID).focus();
            $('#trxtype' + nextID).select();
        }
        else if (col == 'BNK') {
            $('#BankId' + nextID).focus();
            $('#BankId' + nextID).select();
        }
        else if (col == 'CQ') {
            $('#ChequeNo' + nextID).focus();
            $('#ChequeNo' + nextID).select();
        }
        else if (col == 'CQD') {
            $('#ChequeDate' + nextID).focus();
            $('#ChequeDate' + nextID).select();
        }
        //else if (col == 'PDCA') {
        //    $('#PDCAccount' + nextID).focus();
        //    $('#PDCAccount' + nextID).select();
        //}
    }
    else if (key == 38 && Id == 0) {
        e.preventDefault();
        var nextID = Id;
        try {
            nextID = ($('#VoucherEntryDescription' + Id).closest('tr').prev('tr').attr('id')).match(/\d+/)[0];
        }
        catch (err) {
            nextID = Id;
        }

         if (col == 'AD') {
             $('#popupdiv').show();
             var qq = $('#VoucherEntryDescription').val();
             $('#Description').val(qq);
             $('#Description').focus();
             $('#Description').select();
        }
    }
}

function desc()
{
    if ($('#Description').val() != '') {
        var ss = $('#Description').val();
        $('#desc').val(ss);
    }
    else
    {
        $('#desc').val('');
    }
}


function CalcDebit() {    
    var DebitTotal = 0;
    var CreditTotal = 0;
    var Difference = 0;
    for (var j = 1; j < $('#slnotxt').val() ; j++) {
        if ($('#VType' + j).val() == 'Debit') {            
            var DebitTotal = parseFloat($('#Debittxt').val());            
            DebitTotal = parseFloat(DebitTotal) + parseFloat($('#Amount' + j).val() || 0);
            $('#Debittxt').val(DebitTotal.toFixed(decimal));
        }
        else if ($('#VType' + j).val() == 'Credit') {
            var CreditTotal = parseFloat($('#Credittxt').val());
            CreditTotal = parseFloat(CreditTotal) + parseFloat($('#Amount' + j).val() || 0);
            $('#Credittxt').val(CreditTotal.toFixed(decimal));
        }
        Difference = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
        $('#Differencetxt').val(Difference.toFixed(decimal));
    }
}

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


function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
}
//USEDCARS
function Showalerts(Status,VoucherNo, VoucherType) {
    $('#savealert').html('');
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    if (Status == 1) {
       
        if (VoucherBillType == 'NOPRINT') {
            formrefresh();
             swal('VOCNo : ' + VoucherType + '-' + VoucherNo + ' ', "Saved Successfully", "success");
             $('.swal-button swal-button--confirm').focus();
            
        }
        else {
            $('#vouchersaveno').val(VoucherNo);
            $('#alertpopup').show();
            $('#alertdiv').show();
            $('#savealert').append('<b>VOCNo : ' + VoucherType + '-' + VoucherNo + '</b><br> Saved Successfully!<br>Do you want to print this Voucher?');
            $('#btnokVE').focus();
        }
       
    }
    else if (Status == 2) {

        if (VoucherBillType == 'NOPRINT') {
            formrefresh();
            swal('VOCNo : ' + VoucherType + '-' + VoucherNo + ' ', "Saved Successfully", "success");
            $('.swal-button swal-button--confirm').focus();
            
        }
        else {
            
            formrefresh();
            $('#vouchersaveno').val(VoucherNo);
            swal('<b>VOCNo : ' + VoucherType + '-' + VoucherNo + '</b><br>Data Updated Successfully', "", "success");
            $('.swal-button swal-button--confirm').focus();
        }
    }
    else if (Status == 3) {
        formrefresh();
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();


    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

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

function GetList(Id) {
    //warningshow('Please use the individual form for settlement');
    if (!$('#supplierId0').val() > 0) {
        warningshow('Please Select The Account', 'AccountName');
    }
    else {
        $('#JobAndFC').hide();
        $('#Popup').show();
        $('#PendingInv').show();
        $('#MyHeader').text('Pending Invoice');
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
}
var l = 0;
function ShowInvList(result) {
    var sum = 0;
    $('#BaseAmount').val($('#Amount').val());
    $('#RowGet').val = '';
    $('#modelheader').text('Pending Invoice');
    $('#add').hide();
    $('#View').show();
    $('#iconForm').show(); 
    var responseText = "<thead><tr><th class='custom-control' ><center><input type='checkbox' onchange='SelectAllPendingInvoice()' id= 'CheckAllPendingInvoice'></center></th><th style=display:none>Slno</th><th style='display:none'>BillNo</th><th>InvNo</th><th>Account Name</th><th>Inv Date</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr><td align=center class="custom-control" style=width="10px" ><input type="checkbox"  name="Checkkkk"  id= ' + 'SlNoCheck' + slno + ' onclick="SumChange(' + slno + ')"  "custom-control-input cz-bg-image-display"></td><td style=display:none>' + slno + '</td><td style="display:none" id=' + 'BillSerNo' + slno + '>' + result[l].BillSerNo + '</td><td width=100px id=' + 'InvoNo' + slno + '>' + result[l].InvoNo + '</td><td id=' + 'AccountName' + slno + '>' + result[l].AccountName + '</td><td width=100px id=' + 'InvoDate' + slno + '>' + result[l].InvoDate + '</td><td width=100px align=right  id=' + 'PAmount' + slno + '>' + (result[l].Amount).toFixed(2) + '</td><td style="display:none" id=' + 'Vid' + slno + '>' + result[l].VEntryId + '</td> </tr>';
    }
    $('#PendingInvoicelist').html(responseText + '</tbody>');
    $('#RowGet').val(result.length);    
    $('#btnview').focus();
    $('#txtRowCount').val(slno);
    $('#Sum').val(sum.toFixed(decimal));
}


function SelectAllPendingInvoice() {
    for (var e = 1; e <= $('#RowGet').val() ; e++) {
        if ($("#CheckAllPendingInvoice").prop("checked")) {
            $("#SlNoCheck" + e).prop("checked", true);
        }
        else {
            $("#SlNoCheck" + e).prop("checked", false);
        }

    }


}



function AddtoGridMultiple() {

    $('#tdJobCode,#thJobCode').show();
    $('#tdCostCode,#thCostCode').show();
    $("#tblvoucherentry").width("100%");
    $('#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc,#tdFC').show();
    
    $('#Currency').val(1);
    $("#Rate").val(1);

    var ID = 0;
    var no = $('#PendingInvoicelist tr').length;
    for (var m = 1; m <= no; m++) {
        if ($("#SlNoCheck" + m).is(":checked")) {

        var slno = parseInt($('#slnotxt').val())
       
        var notbl = $('#tblvoucherentry tr').length;

            var VoucherRow = "<tr id=" + 'row' + slno + " class='jsgrid-row' onfocusin='Editrow(" + slno + ")'  onfocusout='UpdateRow(" + slno + ")'>" +
    "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' >" +
       // "<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'>" +
        "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td>" +
        "<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' >" +
        "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'>" +
        "<input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td>" +
        "<td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + notbl + "</td>" +
        "<td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td>" +
        "<td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> " +
        "<select id=" + 'VType' + slno + " onchange='EditGirdAmount()' class='form-control'  style='height:35px;background-color:white' onfocusin=ChangeBackGroundColor('1','" + 'VType' + slno + "') onkeydown=Focusnextgrid(event,'VT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'VType' + slno + "')><option value=Credit>Credit</option><option value=Debit>Debit</option></select></td>" +
        "<td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'><input type='hidden' id=" + 'Emp' + slno + "  value="
        + $("#EmployeeId0").val() + "></td>" +
        "<td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'>" +
        "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " onkeypress='AccountAutoCompleteGrid(" + slno + ")' onkeydown=Focusnextgrid(event,'AN'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'AccountId' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'AccountId' + slno + "') value="
        + ($.trim($("#AccountName").val())) + "> " +
        "<input type='text' style='display:none;border:none' value="
        + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " />" +
        "<input type='text' style='display:none;border:none' value="
        + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td>" +
        "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> " +
        "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'VoucherEntryDescription' + slno + "')  onkeydown=Focusnextgrid(event,'AD'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'VoucherEntryDescription' + slno + "') value='Settled Against Bill : "
        + $('#InvoNo' + m).text() + "'></td>" +
        "<td class= jsgrid-cell  style= width:50px;text-align:center ><input type='text' class='form-control INVDATECHANGE' onfocusin=ChangeBackGroundColor('1','" + 'InvoDate' + slno + "')  onkeydown=Focusnextgrid(event,'D'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'InvoDate' + slno + "') style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno + " value='"
        + $("#VoucherDate").val() + "'></td>" +
        "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'>" +
        "<input type='text' class='form-control' onkeypress='isNumber(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " onkeydown=Focusnextgrid(event,'A'," + slno + ") onkeyup='EditGirdAmount()' onfocusin=ChangeBackGroundColor('1','" + 'Amount' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Amount' + slno + "') value="
        + parseFloat($("#PAmount"+m).text()).toFixed(decimal) + "></td>" +
        "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
        "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'TaxNo' + slno + "') onkeydown=Focusnextgrid(event,'T'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'TaxNo' + slno + "')  value="
        + ($.trim($("#TaxNo").val())) + "></td>" +
        "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
        "<input type='text' class='form-control' onkeypress='isNumberInt(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'ReferenceNo' + slno + "') onkeydown=Focusnextgrid(event,'R'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ReferenceNo' + slno + "') value='"
        + ($('#InvoNo' + m).text()) + "'></td>" +
       
        "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> " +
        "<select id=" + 'CurrencyId' + slno + " class='form-control'  style='height:35px;background-color:white' onchange='CurrencyChangeGrid(" + slno + ")' onfocusin=ChangeBackGroundColor('1','" + 'CurrencyId' + slno + "') onkeydown=Focusnextgrid(event,'FX'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CurrencyId' + slno + "')> "
        + CurrencySelect + "</select></td>" +
        "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
        " <input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'Rate' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'Rate' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Rate' + slno + "') onkeydown=Focusnextgrid(event,'FXR'," + slno + ") value= "
        + ($.trim($("#Rate").val())) + "></td>" +
        "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
        "<input type='text' onkeypress='isNumber(event, this)' onkeyup=CalculateAmountRow() class='form-control'  style='height:35px;background-color:white' id=" + 'FCAmount' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'FCAmount' + slno + "') onkeydown=Focusnextgrid(event,'FCA'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'FCAmount' + slno + "') value= "
        + parseFloat($("#PAmount" + m).text()).toFixed(decimal) + "></td>" +

         "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
        "<select type='text' class='form-control'  style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'ProjectJobId' + slno + "') onkeydown=Focusnextgrid(event,'J'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ProjectJobId' + slno + "')> "
        + JobCode + "</select></td>" +
        "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
        " <select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'CostCenterId' + slno + "') onkeydown=Focusnextgrid(event,'CC'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CostCenterId' + slno + "')>"
        + CostCenterName + "</select></td>" +


        "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
        " <select class='form-control'   style='height:35px;background-color:white' id=" + 'trxtype' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'trxtype' + slno + "')  onkeydown=Focusnextgrid(event,'TRXT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'trxtype' + slno + "')><option value=0>-Select-</option><option value=1>CHQ</option><option value=2>NEFT</option><option value=3>RTGS</option><option value=4>IMPS</option><option value=5>ATM</option><option value=6>Others</option></select></td>" +
        "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
        "<select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'BankId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'BankId' + slno + "')  onkeydown=Focusnextgrid(event,'BNK'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'BankId' + slno + "')> "
        + Bank + "</select></td>" +
        "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
        "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeNo' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'ChequeNo' + slno + "') onkeydown=Focusnextgrid(event,'CQ'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeNo' + slno + "') value=''></td>" +
        "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
        "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeDate' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'ChequeDate' + slno + "')  onkeydown=Focusnextgrid(event,'CQD'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeDate' + slno + "')  value=''></td>" +
        "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
        "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'PDCAccount' + slno + " onkeypress='PDCAccountAutoComplete(" + slno + ")'  onkeydown=Focusnextgrid(event,'PDCA'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'PDCAccount' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'PDCAccount' + slno + "') value= ''><input type=text style=display:none  id=" + 'RefbillNo' + slno + " value="
        + $('#Vid' + m).text() + "></td></tr>";


            $('#tblvoucherentry').append(VoucherRow);

            $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
            $('#VType' + slno).val($("#VType").val());
            $('#AccountId' + slno).val($('#AccountName').val());
            $('#CurrencyId' + slno).val($('#Currency').val());

            var i = $('#slnotxt').val();
            $('#hiddenrow').val(i);
        }
    }
        var deb = 0;
        var cre = 0;
        var diff = 0;
        for (var j = 1; j < $('#slnotxt').val() ; j++) {
            if ($('#VType' + j).val() == 'Debit') {
                deb = deb + parseFloat($('#Amount' + j).val() || 0)
                $('#Debittxt').val(deb.toFixed(decimal));
            }
            else {
                cre = cre + parseFloat($('#Amount' + j).val() || 0)
                $('#Credittxt').val(cre.toFixed(decimal));
            }
        }
        diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
        $('#Differencetxt').val(diff.toFixed(decimal));
        var desc = $('#VoucherEntryDescription').val();
        var amt = $('#Amount').val();
        var txno = $('#TaxNo').val();
        gridrefresh();
        var ddif = $('#Differencetxt').val();
        if (ddif == 0) {
            $('#VoucherEntryDescription').val(desc);
            $('#Amount').val('');
            $('#TaxNo').val('');
        }
        else {
            $('#VoucherEntryDescription').val(desc);
            $('#Amount').val(amt);
            $('#TaxNo').val(txno);
        }
        $('#Popup').hide();
        VoucherTempSave();
        $('#PendingInvoicelist tr').remove();
}


function CloseGridMultiple() {
    $('#Popup').hide();
    $('#PendingInvoicelist tr').remove();
}


function SumChange(Id) {

//    var sumchange = 0;
//    var bala = 0;
//    if ($("#SlNoCheck" + Id).is(":checked")) {
//        if (parseFloat($('#BaseAmount').val() || 0) >= parseFloat($('#PAmount' + Id).text()) || 0) {
//            sumchange = parseFloat($('#Sum').val()) + parseFloat($('#PAmount' + Id).text() || 0);
//            bala = $('#BaseAmount').val() - $('#PAmount' + Id).text();
//            $('#BaseAmount').val(bala.toFixed(decimal));
//            $('#Sum').val(parseFloat(sumchange.toFixed(decimal)));
//        }
//        else  {
//            document.getElementById("SlNoCheck" + Id).checked = false;
//            warningshow('Amount Exceeded');
//        }
//    }
//    else {
//        bala = parseFloat($('#BaseAmount').val()||0) +  parseFloat($('#PAmount' + Id).text()||0);
//        $('#BaseAmount').val(bala.toFixed(decimal));
//        sumchange = parseFloat($('#Sum').val()) - parseFloat($('#PAmount' + Id).text() || 0);
//        $('#Sum').val(parseFloat(sumchange.toFixed(decimal)));
//    }
}

function Addpopupwindow(Id) {    
    if ($.trim($('#AccountName').val()) == "") {
        warningshow('Please Select Account', 'AccountName');
        return false;
    }
   else if ($.trim($('#supplierId0').val()) == 0) {
        warningshow('Please Select a Valid Account', 'AccountName');
        return false;
    }
    //if ($.trim($('#Amount').val()) == 0) {
    //    warningshow('Please Add Amount', 'Amount');
    //    return false;
    //}
    else {        
    $('#PendingInv').hide();
    $('#JobAndFC').hide();
    $('#Popup').show();

    if (Id == 1) {        
        $('#MyHeader').text('Pending Invoice');
        $('#PendingInv').show();
    }
    else if (Id == 2) {
        $('#Currency').val(FCCurrencyId);
        $("#Rate").val($("#Currency").find("option:selected").attr("name"));
        $('#MyHeader').text('Job & FC');
        $('#JobAndFC').show();
        $('#Currency').focus();
        $('#AmountCon').val($('#Amount').val());
        $('#Rate').val($('#Currency').find("option:selected").attr("name"));
        $('#trxtype').val(1);
        
        $('#PDCAccount').val('');
        $('#ChequeDate').val('');
        $("#JobCode").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#CostCenterName').focus();
                e.preventDefault();
            }
        });
        $("#CostCenterName").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#PDCAccount').focus();
                e.preventDefault();
            }
        });
        $("#PDCAccount").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#btnaddtogrid').focus();
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
               $('#FCAmount').select();
            }
        });
        $("#FCAmount").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#AccountType').focus();
                e.preventDefault();
            }
        });
        $("#trxtype").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#Bank').focus();
                e.preventDefault();
            }
        });
        $("#Bank").keydown(function (e) {
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
                $('#JobCode').focus();
                e.preventDefault();
            }
        });
    }
    }
    CalcFCAmount();
}

function GetJob() {
    if ($('#PDCAccountId').val() == '' && $('#PDCAccount').val() != '') {
        warningshow('Please Select A Valid Account', 'PDCAccount');
        return false;
    }
    else if ($('#Rate').val() == '' || $('#Rate').val() == 0) {
        warningshow('Please enter Rate', 'Rate');
        return false;
    }
    else if ($('#FCAmount').val() == '' || $('#FCAmount').val() == 0) {
        warningshow('Please enter FCAmount', 'FCAmount');
        $("#FCAmount").select();
        return false;
    }
    else if (($("#AccountType").val() == 2 || $("#AccountType").val() == 3) && $('#Type').val() == 0) {

        warningshow('Please Select Transaction Type', 'Type');
    }
    else if (($("#AccountType").val() == 2 || $("#AccountType").val() == 3) && $('#ChequeNo').val() == '') {
        warningshow('Please Enter ChequeNo', 'ChequeNo');
    }
    else if (($("#AccountType").val() == 2 || $("#AccountType").val() == 3) && $('#Bank').val() == 0) {
        warningshow('Please Select Bank', 'Bank');
    }
    else if (($("#AccountType").val() == 3) && $('#PDCAccountId').val() == 0) {
        warningshow('Please Select PDC Account', 'PDCAccount');
    }
    else {
         $('#tdJobCode,#thJobCode').show();
         $('#tdCostCode,#thCostCode').show();
         $("#tblvoucherentry").width("100%");
         $('#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc,#tdFC').show();
         $('#Amount').val($('#AmountCon').val());
        // $('#FCAmount').val('');
         chek = 1;
         rowchk = 1;
         VoucherEntryAdd();
         chek = 0;
         rowchk = 0;
         $('#Popup').hide();
    }   
}


function AddtoGrid() {
    var ID = 0;
    var no = $('#PendingInvoicelist tr').length;
    for (var m = 1; m <= no; m++) {
        if ($("#SlNoCheck" + m).is(":checked")) {

            $('#ReferenceNo').val($('#InvoNo' + m).text() )
            $('#billid').val($('#Vid' + m).text());
            $('#VoucherEntryDescription').val($('#AccountName' + m).text());
            $('#Amount').val('')
            $('#Amount').focus();
            $('#Amount').select();
            $('#Popup').hide();

            return false;
        }
    }
}



//Pending Invoice
//function AddtoGrid() {

//    if ($.trim($('#AccountName').val()) == "") {
//        warningshow('Please Select Account', 'AccountName');
//        return false;
//    }
//   else if ($.trim($('#supplierId0').val()) == 0) {
//        warningshow('Please Select Account', 'AccountName');
//        return false;
//   }
//    else{
//        var row = $('#RowGet').val();
//        var slno = parseInt($('#slnotxt').val())
//        var VType = $('#VType :selected').text();
//        var VoucherEntryDescription = $('#VoucherEntryDescription').val();
      

//        for (var m = 1; m <= row; m++) {

//            if ($("#SlNoCheck" + m).is(":checked")) {
//                if ($('#BillSerNo' + m).text()==0) {
//                    var BillSerNo = 0;
//                }
//                else {
//                    var BillSerNo = $('#BillSerNo' + m).text();
//                }                
//                var InvoNo = $('#InvoNo' + m).text();
//                var AccountName = $('#AccountName' + m).text();
//                var InvoDate = $('#InvoDate' + m).text();
//                var Amount = $('#PAmount' + m).text();
//                $('#Popup').hide();
//                var slno = parseInt($('#slnotxt').val());

//                var no = $('#tblvoucherentry tr').length;
//                if ($('#thJobCode').is(":hidden") && $('#thFC').is(":hidden")) {
//                    var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= jsgrid-cell  style= width:50px;text-align:center;display:none value='0'>" + BillSerNo + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:150px'> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option>Credit</option><option>Debit</option></select></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " value=" + AccountName + "> <input type='text' style='display:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value=" + VoucherEntryDescription + "></td><td class= jsgrid-cell  style= width:50px;text-align:center >" + InvoDate + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + Amount + " onkeyup='EditGirdAmount()'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value=" + InvoNo + "></td><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td></tr>";
//                }
//                else if ($('#thJobCode').is(":visible") && $('#thFC').is(":visible")) {
//                    var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= jsgrid-cell  style= width:50px;text-align:center;display:none value='0'>" + BillSerNo + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:150px'> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option>Credit</option><option>Debit</option></select></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " value=" + AccountName + "> <input type='text' style='display:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value=" + VoucherEntryDescription + "></td><td class= jsgrid-cell  style= width:50px;text-align:center >" + InvoDate + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + Amount + " onkeyup='EditGirdAmount()'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value=" + InvoNo + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno + " > " + JobCode + "</select></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " >" + CostCenterName + "</select></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> <select id=" + 'CurrencyId' + slno + " class='form-control' disabled=disabled style='height:35px;background-color:white' > " + CurrencySelect + "</select></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'Rate' + slno + " value= " + ($.trim($("#Rate").val())) + " ></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' onkeyup=CalculateAmountRow() class='form-control' disabled style='height:35px;background-color:white' id=" + 'FCAmount' + slno + " value= " + ($.trim($("#AmountFC").val())) + " ></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'BankId' + slno + " > " + Bank + "</select></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'ChequeNo' + slno + " value= " + ($.trim($("#ChequeNo").val())) + " ></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'ChequeDate' + slno + " value= " + ($.trim($("#ChequeDate").val())) + " ></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'PDCAccount' + slno + " value= " + ($.trim($("#PDCAccount").val())) + " ></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width: 35px;' > <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'ProjectJobId' + slno + " > " + JobCode + "</select></td><td style='display:none' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " > " + CostCenterName + "</select></td><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td></tr>";
//                }
//                $('#tblvoucherentry').append(VoucherRow);
//                $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
//                $('#VType' + slno).val($("#VType option:selected").text());
//                $('#ProjectJobId' + slno).val($('#JobCode').val());
//                $('#CostCenterId' + slno).val($('#CostCenterName').val());
//                $('#CurrencyId' + slno).val($('#Currency').val());
//                $('#trxtype' + slno).val($('#trxtype').val());
//                if ($('#Currency').val() == 0) {
//                    $('#CurrencyId' + slno).val(1);
//                    $('#Rate' + slno).val('1');
//                    $('#FCAmount' + slno).val($('#Amount').val());
//                }
//                $('#BankId' + slno).val($('#Bank').val());
//            }   
//        }       
//        $('#hiddenrow').val(parseInt($('#slnotxt').val()));
//        if ($('#VType :selected').text() == 'Debit') {
//            var sm = $('#Sum').val();
//            var deb = 0;
//            deb = parseFloat($('#Debittxt').val()) + parseFloat(sm);
//            $('#Debittxt').val(deb.toFixed(decimal));
//        }
//        else {
//            var sm = $('#Sum').val();
//            var cre = 0;
//            cre = parseFloat($('#Credittxt').val()) + parseFloat(sm);
//            $('#Credittxt').val(cre.toFixed(decimal))
//        }
//        var diff = 0;
//        diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
//        $('#Differencetxt').val(diff.toFixed(decimal));
//        gridrefresh();
//   }
//}


function SelectAll() {
    var sm = 0;
    var row = $('#RowGet').val();
    var flag = $("#SlNoHeadCheck").is(":checked");
    for (var i = 1; i <= row; i++) {
        document.getElementById("SlNoCheck" + i).checked = flag;
        sm=sm+parseFloat($('#PAmount' + i).text());
        $('#Sum').val(sm.toFixed(decimal));        
        if ($('#Sum').val() > $('#BaseAmount').val()) {
            document.getElementById("SlNoCheck" + i).checked = false;
            warningshow('Amount Exceeded');            
        }
    }
    if (flag == false) {
        $('#Sum').val(0);
    }
}

function EditGirdAmount() {
    var count = $('#slnotxt').val();
    var deb = 0;
    var cre = 0;
    var diff = 0;
    var fc = 0;
    for (var j = 1; j < $('#slnotxt').val() ; j++) {

        $('#FCAmount' + j).val(0);
        
        if ($('#VType' + j).val() == 'Debit') {
            deb = deb + parseFloat($('#Amount' + j).val() || 0);
            fc = parseFloat($('#Amount' + j).val() || 0) / parseFloat($('#Rate' + j).val() || 0)
            $('#FCAmount' + j).val(fc.toFixed(decimal));
        }
        else {
            cre = cre + parseFloat($('#Amount' + j).val() || 0)
            fc = parseFloat($('#Amount' + j).val() || 0) / parseFloat($('#Rate' + j).val() || 0)
            $('#FCAmount' + j).val(fc.toFixed(decimal));
    }
    $('#Debittxt').val(deb.toFixed(decimal));
    $('#Credittxt').val(cre.toFixed(decimal));

    
}
   
    diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
    $('#Differencetxt').val(diff.toFixed(decimal));
}

function CalculateAmountRow() {
    var count = $('#slnotxt').val();
    var deb = 0;
    var cre = 0;
    var diff = 0;
    var amt = 0;
    for (var j = 1; j < $('#slnotxt').val() ; j++) {
        if ($('#VType' + j).val() == 'Debit') {            
            amt = parseFloat($('#FCAmount' + j).val() || 0) * parseFloat($('#Rate' + j).val() || 0)
            $('#Amount' + j).val(amt.toFixed(decimal));
            deb = deb + parseFloat($('#Amount' + j).val() || 0)
            $('#Debittxt').val(deb.toFixed(decimal));
        }
        else {            
            amt = parseFloat($('#FCAmount' + j).val() || 0) * parseFloat($('#Rate' + j).val() || 0)
            $('#Amount' + j).val(amt.toFixed(decimal));
            cre = cre + parseFloat($('#Amount' + j).val() || 0)
            $('#Credittxt').val(cre.toFixed(decimal));
        }
    }
    diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
    $('#Differencetxt').val(diff.toFixed(decimal));
}
var balo = 0;

function balload() {
    var BankAccount = $('#AccCode').val();
  
    var data = {};
    data.BankAccount = BankAccount;

    $.ajax({
        type: "POST",
        url: "../../AccountsErp/BankbalGetandGets",
        data: data,
        success: function (result) {



            balo = 0;

            balo = result.oList[0].bal;
            balo1 = result.oList[0].bal;

            if (balo < 0)
            {
                balo = balo * -1;
                $('#Acbal1').val(balo.toFixed(decimal)+' CR');
            }
            else
            {
                $('#Acbal1').val(balo.toFixed(decimal) + ' DR');
            }
     
           

            $('#Acbal').val(balo1.toFixed(decimal));

           // $('#Popup1').show();
            $('#btnclose').focus();





        }
    });
}
$("#Transfersal").click(function (e) {

    var TransferDate = $('#TransferSalary').val();
    var DeptId = ERPDeptId;
            var srlno = {};
            srlno.DeptId = DeptId;
            srlno.TransferDate = TransferDate;
            $.ajax({
                type: "POST",
                url: "../AccountsErp/SalaryGetandGets",
                data: srlno,
                success: function (result) {
                   
                    if ((result.oList.length) > 0)
                    {
                        SalaryGets(result.oList);
                        $('#btnsubmit').focus();
                    }
                    else
                    {
                        warningshow(' No Pending PayRolls For This Month ', '');
                    }
                   
                   
                }
            });

});

function SalaryGets(result) {
    // alert(salaryflag)
    $('#VType').prop('disabled', true);
    $('#AccountName').prop('disabled', true);
    $('#AccountNamebtn').prop('disabled', true);
    $('#VoucherEntryDescription').prop('disabled', true);
    $('#Amount').prop('disabled', true);
    $('#TaxNo').prop('disabled', true);
    $('#btnadd').prop('disabled', true);
    $('#JobandFC').prop('disabled', true);
    $('#InvoiceSettlement').prop('disabled', true);
    $('#TransferVoucherNo').prop('disabled', true);
    salaryflag = 1;
  
    GridRemove();
    gridrefresh();
  
    $('#empname').show();
   // $('#emp').show();
   
    $('#tdJobCode,#thJobCode').hide();
    $('#tdCostCode,#thCostCode').hide();
    $("#tblvoucherentry").width("100%");
    $('#thFC,#thFCAmount,#thBank,#thPDCAc,#tdFC,#typetrx').hide();
    $('#Amount').val($('#AmountCon').val());
    $('#FCAmount').val('');
 
  
   
   
    for (var l = 0; l < result.length; l++) {

        var Dt = result[l].VoucherDate;
        someDate = new Date(Dt.slice(6, 10) + '-' + Dt.slice(3, 5) + '-' + Dt.slice(0, 2));
    
  var month = new Array();
  month[0] = "JANUARY";
  month[1] = "FEBRUARY";
  month[2] = "MARCH";
  month[3] = "APRIL";
  month[4] = "MAY";
  month[5] = "JUNE";
  month[6] = "JULY";
  month[7] = "AUGUST";
  month[8] = "SEPTEMBER";
  month[9] = "OCTOBER";
  month[10] = "NOVEMBER";
  month[11] = "DECEMBER";

  var d = someDate;
  var month1 = month[d.getMonth()];
      
       
        var no = $('#tblvoucherentry tr').length;
        var amt = 0;
        amt = parseFloat($("#Amount").val());
     
        var slno = parseInt($('#slnotxt').val())
      
      
      //  if ($('#thJobCode').is(":visible") && $('#thFC').is(":visible")) {
         
        
        var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " onchange='EditGirdAmount()' class='form-control' disabled style='height:35px;background-color:white' ><option value=Credit>Credit</option><option value=Debit>Debit</option></select></td><td class= 'jsgrid-cell jsgrid-align-center'  style= display:none; width: 35px;><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Emp' + slno + " value=" + result[l].empId + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' value=" + "'" + result[l].EmpName + "'" + " id=" + 'EmpName' + slno + "/></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' value=" + "'" + result[l].AccountName + "'" + " id=" + 'AccountId' + slno + "/> <input type='text' style='display:none;border:none' value=" + result[l].AccountId + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + result[l].AccCode + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + result[l].VoucherEntryDescription + "'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno + " value='" + result[l].VoucherDate + "'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' onkeypress='isNumber(event, this)' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + result[l].Amount + " onkeyup='EditGirdAmount()'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " value=" + result[l].TaxNo + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' onkeypress='isNumberInt(event, this)' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value=" + result[l].ReferenceNo + "></td></tr>";


          

       // }
        $('#tblvoucherentry').append(VoucherRow);
        $('#TaxNo' + slno).val('0');
        $('#ReferenceNo' + slno).val('0');

        
        if (result[l].VType == 'D') {
        $('#VType' + slno).val('Debit');
        $('#VoucherEntryDescription' + slno).val((result[l].EmpName)+'SALARY PAID MONTH OF '+month1 );
        }
        else {
            $('#VType' + slno).val('Credit');
           
            //  var fag = 1;
            $('#VoucherEntryDescription' + slno).val('ADVANCE PAID BY ' + (result[l].EmpName));
            $('#ReferenceNo' + slno).val(result[l].empId);
        }
      
       
      //  $('#ProjectJobId' + slno).val(result[l].ProjectJobId);
      
      //  $('#CostCenterId' + slno).val(result[l].CostCenterId);
     //   $('#CurrencyId' + slno).val(result[l].CurrencyId);
      
      //  if ($('#Currency').val() == 0) {
        //    $('#CurrencyId' + slno).val(1);
        //    $('#Rate' + slno).val('1');
        //    $('#FCAmount' + slno).val($('#Amount').val());
        //}
     
        //$('#BankId' + slno).val(result[l].BankId);
        //$('#trxtype' + slno).val(result[l].TrxType);
        //////////////
        $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));

         var no = $('#tblvoucherentry tr').length;
        var amt = 0;
        amt = parseFloat($("#Amount").val());

        var slno = parseInt($('#slnotxt').val())
        //////////////
       
        var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option value=Credit>Credit</option><option value=Debit>Debit</option></select></td><td  class= 'jsgrid-cell jsgrid-align-center'  style= display:none; width: 35px;><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Emp' + slno + " value=" + result[l].empId + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' value=" + "'" + result[l].EmpName + "'" + " id=" + 'EmpName' + slno + "/></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' value=" + "'" + result[l].PayName + "'" + " id=" + 'AccountId' + slno + "/> <input type='text' style='display:none;border:none' value=" + result[l].PayId + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + result[l].Payable + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + result[l].VoucherEntryDescription + "'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno + " value='" + result[l].VoucherDate + "'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + result[l].Amount + " onkeyup='EditGirdAmount()'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " value=" + result[l].TaxNo + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value=" + result[l].ReferenceNo + "></td></tr>";
        $('#tblvoucherentry').append(VoucherRow);

        $('#TaxNo' + slno).val('0');
        $('#ReferenceNo' + slno).val('0');

         if (result[l].VType == 'D') {
       // $('#VType' + slno).val('Debit');
             $('#VoucherEntryDescription' + slno).val((result[l].EmpName) + 'SALARY PAID MONTH OF ' + month1);
        }
        else {
          //  $('#VType' + slno).val('Credit');
             //  var fag = 1;
            $('#VType' + slno).val('Debit');
            $('#VoucherEntryDescription' + slno).val('ADVANCE PAID BY' + (result[l].EmpName));
            $('#InvoDate' + slno).val($('#VoucherDate').val());
            // $('#ReferenceNo' + slno).val(result[l].empId);

         }

      
       // $('#VoucherEntryDescription' + slno).val('Salary Paid');

        $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
      
       
    }
    var i = $('#slnotxt').val();
    $('#hiddenrow').val(i);
    var deb = 0;
    var cre = 0;
    var diff = 0;
    
    for (var j = 1; j < $('#slnotxt').val() ; j++) {
      
      
        var s = $('#VType' + j).val()




        if ($('#VType' + j).val() == 'Debit') {

            deb = deb + parseFloat($('#Amount' + j).val() || 0)
            $('#Debittxt').val(deb.toFixed(decimal));
        }
        else {
            cre = cre + parseFloat($('#Amount' + j).val() || 0)
            $('#Credittxt').val(cre.toFixed(decimal));
        }
    }
    diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
    $('#Differencetxt').val(diff.toFixed(decimal));
    gridrefresh();
  

}

function ChangeGridDate() {
    if (salaryflag != 1) {
        $('.INVDATECHANGE').val($('#VoucherDate').val());
    }
}




function VoucherTempSave() {
    var Count = parseInt($('#slnotxt').val());
    var oArray = new Array();
    for (var i = 1; i < Count; i++) {

        var VoucherTypeId = $('#VoucherType').val();
        if (salaryflag == 1) { var VoucherDate = $('#InvoDate' + i).val();}
        else {var VoucherDate = $('#VoucherDate').val();}
        var VoucherNo = $('#VoucherNo').val();
        var TransferVoucherNo = $('#TransferVoucherNo').val();
        if ($('#VType' + i).val() == 'Debit') {var VType = 'D';}
        else {var VType = 'C';}

        if (($('#Employee').val()) == '') {
            if (salaryflag == 1) {var empId = $('#Emp' + i).val();}
            else {var empId = 0;}
        }
        else {var empId = $('#Emp' + i).val();}

        var AccountId = $('#supplierId' + i).val();
        var AccCode = $('#AccCode' + i).val();
        if ($('#BillSerNo' + i).text() == 0) {var BillSerId = 0;}
        else {var BillSerId = $('#BillSerNo' + i).text();}
        var VoucherEntryDescription = $('#VoucherEntryDescription' + i).val();
        var TaxNo = $('#TaxNo' + i).val();
        var TrxType = $('#trxtype' + i).val();
        var Amount = $('#Amount' + i).val();
        if ($('#ReferenceNo' + i).val() == "") {var ReferenceNo = 0;}
        else {var ReferenceNo = $('#ReferenceNo' + i).val();}
        var DelFlag = $('#RefbillNo' + i).val();
        var ProjectJobId = $('#ProjectJobId' + i).val();
        var CostCenterId = $('#CostCenterId' + i).val();
        var CurrId = $('#CurrencyId' + i).val();
        if (typeof CurrId == "undefined" || CurrId == 0) {
            var CurrencyId = 1;
            var CurrencyRate = 1.000;
            var FCAmount = $('#Amount' + i).val();
            var ChequeDate = 0;
            var ChequeNo = 0;
            var BankId = 0;
            var PDCAccount = 0;
            var PDCStatus = 0;
        }
        else {
            var CurrencyId = $('#CurrencyId' + i).val();
            var CurrencyRate = $('#Rate' + i).val();
            var FCAmount = $('#FCAmount' + i).val();
            if ($('#ChequeDate' + i).val() == "") {var ChequeDate = 0;}
            else {var ChequeDate = $('#ChequeDate' + i).val();;}
            var ChequeNo = $('#ChequeNo' + i).val();
            var BankId = $('#BankId' + i).val();
            var PDCAccount = $('#PDCAccount' + i).val();
            if ($('#PDCAccount' + i).val() == "") {var PDCStatus = 0;}
            else {var PDCStatus = 'O';}
        }

        var UserId = ERPUserId;
        var DeptId = ERPDeptId;
        if (VoucherTypeId == 1) {var VoucherTypePrefix = "JV";}
        else if (VoucherTypeId == 2) {var VoucherTypePrefix = "RV";}
        else if (VoucherTypeId == 3) {var VoucherTypePrefix = "PV";}
        else if (VoucherTypeId == 4) {var VoucherTypePrefix = "PC";}
        else if (VoucherTypeId == 5) {var VoucherTypePrefix = "CV";}
        else if (VoucherTypeId == 6) {var VoucherTypePrefix = "AV";}
        else if (VoucherTypeId == 7) {var VoucherTypePrefix = "OP";}
        else if (VoucherTypeId == 8) {var VoucherTypePrefix = "IO";}
        else if (VoucherTypeId == 9) {var VoucherTypePrefix = "SN";}
        else if (VoucherTypeId == 10) {var VoucherTypePrefix = "II";}
        else if (VoucherTypeId == 11) {var VoucherTypePrefix = "TV";}
        else if (VoucherTypeId == 12) {var VoucherTypePrefix = "CN";}
        else if (VoucherTypeId == 13) {var VoucherTypePrefix = "DN";}
        else if (VoucherTypeId == 14) {var VoucherTypePrefix = "CB";}
        else if (VoucherTypeId == 15) {var VoucherTypePrefix = "PN";}
        else if (VoucherTypeId == 18) {var VoucherTypePrefix = "BRV";}
        else if (VoucherTypeId == 17) {var VoucherTypePrefix = "BPV";}
        var Advance = 'False';
        var AdvanceAmount = 0.000;

        if (!(typeof ReferenceNo == "undefined")) {
            oArray.push({
                'VoucherTypeId': VoucherTypeId,
                'VoucherNo': VoucherNo,
                'TransferVoucherNo': TransferVoucherNo,
                'VoucherTypeId': VoucherTypeId,
                'VoucherDate': VoucherDate,
                'BillSerId': BillSerId,
                'VType': VType,
                'AccountId': AccountId,
                'AccCode': AccCode,
                'VoucherEntryDescription': VoucherEntryDescription,
                'Amount': Amount,
                'ReferenceNo': ReferenceNo,
                'ProjectJobId': ProjectJobId,
                'CostCenterId': CostCenterId,
                'CurrencyId': CurrencyId,
                'CurrencyRate': CurrencyRate,
                'BankId': BankId,
                'ChequeNo': ChequeNo,
                'ChequeDate': ChequeDate,
                'PDCAccount': PDCAccount,
                'PDCStatus': PDCStatus,
                'FCAmount': FCAmount,
                'DelFlag': DelFlag,
                'UserId': UserId,
                'DeptId': DeptId,
                'VoucherTypePrefix': VoucherTypePrefix,
                'Advance': Advance,
                'AdvanceAmount': AdvanceAmount,
                'TaxNo': TaxNo,
                'TrxType': TrxType,
                'empId': empId,
            })
        }
    }


    if (oArray != "") {
        var data = { 'VoucherEntryModel': oArray };
        $.ajax({
          type: "POST",
          url: "../AccountsErp/VoucherEntryTempInsert",
          data: data,
          success: function (result) {}});
    }
}


function CheckPrevDataAvail() {

    var datam = {};
    datam.UserId = ERPUserId;
    datam.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../AccountsErp/VoucherTempSaveAvail",
        data: datam,
        success: function (result) {

            if (result.oList[0].Status == 1) {
                $("#confirmOk").prop("disabled", false);
                $('#confirm').show();
                $('#confirmOk').focus();
                $('#Confirmflag').val('PrevDataAvail'); $('#ConfirmRowId').val(0);
                $('#confirmmessage').text('Previous Data Available !! Do You Want to Load?');
            }           


        }
    });

}



function LoadTempUnsavedVoucher() {

    var datam = {};
    datam.UserId = ERPUserId;
    datam.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../AccountsErp/VoucherEntryTempGets",
        data: datam,
        success: function (result) {
            
            AppendTempSavedVoucher(result.oList)


        }
    });

}


function AppendTempSavedVoucher(result) {
    $('#tdJobCode,#thJobCode').show();
    $('#tdCostCode,#thCostCode').show();
    $("#tblvoucherentry").width("100%");
    $('#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc,#tdFC').show();
    

    $("#VoucherType").val(result[0].VoucherTypeId)
    $("#VoucherNo").val(result[0].VoucherNo)
    $("#TransferVoucher").val(result[0].TransferVoucherNo)
    $("#VoucherDate").val(result[0].VoucherDate)
    serialnoload();

    for (var i = 0; i < result.length; i++) {
        var slno = i + 1;

         var VoucherRow  = "<tr id=" + 'row' + slno + " class='jsgrid-row' onfocusin='Editrow(" + slno + ")'  onfocusout='UpdateRow(" + slno + ")'>" +
           "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' >" +
           "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td>" +
           "<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' >" +
           "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'>" +
           "<input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td>" +
           "<td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + slno + "</td>" +
           "<td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='"
           + result[i].BillSerId + "' id=" + 'BillSerNo' + slno + "></td>" +
           "<td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;>" +
           " <select id=" + 'VType' + slno + " onchange='EditGirdAmount()' class='form-control'  style='height:35px;background-color:white' onfocusin=ChangeBackGroundColor('1','" + 'VType' + slno + "') onkeydown=Focusnextgrid(event,'VT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'VType' + slno + "')>" +
           "<option value=Credit>Credit</option><option value=Debit>Debit</option></select></td>" +
           "<td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'>" +
           "<input type='hidden' id=" + 'Emp' + slno + "  value="

           + result[i].empId + "></td>" +

           "<td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> " +
           "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " onkeypress='AccountAutoCompleteGrid(" + slno + ")' onkeydown=Focusnextgrid(event,'AN'," + slno + ")  onfocusin=ChangeBackGroundColor('1','" + 'AccountId' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'AccountId' + slno + "') value='"

           + result[i].AccountName + "'>" +

           " <input type='text' style='display:none;border:none' value="

           + result[i].AccountId + " id=" + 'supplierId' + slno + " />" +

           "<input type='text' style='display:none;border:none' value="

           + result[i].AccCode + " id=" + 'AccCode' + slno + " /></td>" +

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'>" +
           " <input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " onkeydown=Focusnextgrid(event,'AD'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'VoucherEntryDescription' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'VoucherEntryDescription' + slno + "') value='"

           + result[i].Description + "'></td>" +

           "<td class= jsgrid-cell  style= width:50px;text-align:center ><input type='text' class='form-control INVDATECHANGE' onfocusin=ChangeBackGroundColor('1','" + 'InvoDate' + slno + "') onkeydown=Focusnextgrid(event,'D'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'InvoDate' + slno + "') style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno + " value='"

           + result[i].VoucherDate + "'></td>" +

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'>" +
           "<input type='text' class='form-control' onkeypress='isNumber(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " onkeydown=Focusnextgrid(event,'A'," + slno + ") onkeyup='EditGirdAmount()' onfocusin=ChangeBackGroundColor('1','" + 'Amount' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Amount' + slno + "') value="

           + parseFloat(result[i].Amount).toFixed(decimal) + "></td>" +

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
           "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'TaxNo' + slno + "') onkeydown=Focusnextgrid(event,'T'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'TaxNo' + slno + "') value="

           + result[i].TaxNo + " ></td>" +

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
           "<input type='text' class='form-control' onkeypress='isNumberInt(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " onkeydown=Focusnextgrid(event,'R'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'ReferenceNo' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'ReferenceNo' + slno + "') value='"

           + result[i].ReferenceNo + "'><input style=display:none type=text  id=" + 'RefbillNo' + slno + " value="

           + result[i].DelFlag + "></td>" +

        

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> " +
           "<select id=" + 'CurrencyId' + slno + " class='form-control'  style='height:35px;background-color:white' onchange='CurrencyChangeGrid(" + slno + ")' onfocusin=ChangeBackGroundColor('1','" + 'CurrencyId' + slno + "') onkeydown=Focusnextgrid(event,'FX'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CurrencyId' + slno + "')> "

           + CurrencySelect + "</select></td>" +

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
           "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'Rate' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'Rate' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Rate' + slno + "') onkeydown=Focusnextgrid(event,'FXR'," + slno + ") value= "

           + result[i].CurrencyRate + "></td>" +

           "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
           "<input type='text' onkeypress='isNumber(event, this)' onkeyup=CalculateAmountRow() class='form-control'  style='height:35px;background-color:white' id=" + 'FCAmount' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'FCAmount' + slno + "') onkeydown=Focusnextgrid(event,'FCA'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'FCAmount' + slno + "') value= "

           + parseFloat(result[i].FCAmount).toFixed(decimal) + "></td>" +


           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
           "<select type='text' class='form-control'  style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'ProjectJobId' + slno + "') onkeydown=Focusnextgrid(event,'J'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ProjectJobId' + slno + "')> "

           + JobCode + "</select></td>" +

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
           "<select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'CostCenterId' + slno + "') onkeydown=Focusnextgrid(event,'CC'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CostCenterId' + slno + "')>"

           + CostCenterName + "</select></td>" +

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
           " <select class='form-control' style='height:35px;background-color:white' id=" + 'trxtype' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'trxtype' + slno + "') onkeydown=Focusnextgrid(event,'TRXT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'trxtype' + slno + "')>"+
           "<option value=0>-Select-</option><option value=1>CHQ</option><option value=2>NEFT</option><option value=3>RTGS</option><option value=4>IMPS</option><option value=5>ATM</option><option value=6>Others</option></select></td>" +
           "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
           " <select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'BankId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'BankId' + slno + "') onkeydown=Focusnextgrid(event,'BNK'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'BankId' + slno + "')> "

           + Bank + "</select></td>" +

           "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
           "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeNo' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'ChequeNo' + slno + "') onkeydown=Focusnextgrid(event,'CQ'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeNo' + slno + "') value="

           + result[i].ChequeNo + "></td>" +

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
           "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeDate' + slno + " value='' onfocusin=ChangeBackGroundColor('1','" + 'ChequeDate' + slno + "') onkeydown=Focusnextgrid(event,'CQD'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeDate' + slno + "') value='"

            + result[i].ChequeDate + "'></td>" +

           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
           "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'PDCAccount' + slno + " onkeypress='PDCAccountAutoComplete(" + slno + ")' onfocusin=ChangeBackGroundColor('1','" + 'PDCAccount' + slno + "') onkeydown=Focusnextgrid(event,'PDCA'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'PDCAccount' + slno + "')  value="

           + result[i].PDCAccount + "></td>" +

           "</tr>";

         $('#tblvoucherentry').append(VoucherRow);

         if (result[i].VType == 'D') {
             $('#VType' + slno).val('Debit');
         }
         else {
             $('#VType' + slno).val('Credit');
         }

         $('#trxtype' + slno).val(result[i].TrxType);
         
         $('#ProjectJobId' + slno).val(result[i].ProjectJobId);
         $('#CostCenterId' + slno).val(result[i].CostCenterId);
         $('#CurrencyId' + slno).val(result[i].CurrencyId);
         $('#BankId' + slno).val(result[i].BankId);

       


    }
    $('#billid').val(0)
    $('#slnotxt').val(result.length+1);
    $('#hiddenrow').val(result.length + 1);
    CalcCreditAndDebit();
}

function TransferALL() {
    var data = {};
    data.AssetId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AssetRegisterGetandGets",
        data: data,
        success: function (result) {
                ShowAssetRegisterlist(result.oList);
        }
    });
}

function ShowAssetRegisterlist(result) {

    $('#DepreciationDiv').show();
    $('#MRSub').show();
    disable_datatable('tblDepreciation');
    var responseText = "<thead><tr><th>Sl#</th><th>Code</th><th>Description</th><th>Pur.Value</th><th>Depreciated Value</th><th>Depreciated%</th><th>Debit A/C</th><th>Credit A/C</th><th>Add</th></tr>" +
                              "<tr><th> </th><th>Code</th><th>Description</th><th>Pur.Value</th><th>Depreciated Value</th><th>Depreciated%</th><th>Debit A/C</th><th>Credit A/C</th><th> </th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        responseText += '<tr id=' + "row" + slno + '>' +
                    '<td style="width:90px;">' + slno + '<input type=hidden id=' + 'AssetId' + slno + ' value=' + result[l].AssetId + '></td>' +
                    '<td id=' + 'DepreciationCode' + slno + '>' + result[l].Code + '</td>' +
                    '<td id=' + 'DepreciationDescription' + slno + '>' + result[l].Description + ' </td>' +
                    '<td id=' + 'Purvalue' + slno + ' align=right>' + parseFloat(result[l].Purvalue).toFixed(Decimal) + '</td>' +
                    '<td id=' + 'Depreciatedvalue' + slno + ' align=right>' + parseFloat(result[l].Depreciatedvalue).toFixed(Decimal) + '</td>' +
                    '<td id=' + 'Depreciatedperc' + slno + ' align=right>' + parseFloat(result[l].Depreciatedperc).toFixed(Decimal) + '</td>' +
                    '<td id=' + 'AccountDebit' + slno + '>' + result[l].DebitDesc + '<input type=hidden id=' + 'AccountDebitCode' + slno + ' value=' + result[l].AccountDebit + '><input type=hidden id=' + 'AccountDebitId' + slno + ' value=' + result[l].AccountDebitId + '></td>' +
                    '<td id=' + 'AccountCredit' + slno + '>' + result[l].CreditDesc + '<input type=hidden id=' + 'AccountCreditCode' + slno + ' value=' + result[l].AccountCredit + '><input type=hidden id=' + 'AccountCreditId' + slno + ' value=' + result[l].AccountCreditId + '></td>' +
                    '<td style="text-align:center"><a onclick="AddDepr(' + slno + ')">' + Addbutton + '</a></td></tr>';
    }

    $('#tblDepreciation').html(responseText + '</tbody>');
    datatableWithsearch('tblDepreciation', 'SingleMR');

}

function AddDepr(RowNo) {
   
    $('#DepreciationDiv').hide();

    $('#tdJobCode,#thJobCode').show();
    $('#tdCostCode,#thCostCode').show();
    $("#tblvoucherentry").width("100%");
    $('#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc,#tdFC').show();
   
    if ($('#tblvoucherentry tr').length!=0)
    {
        $('#tblvoucherentry tr td').remove();
       
    }
    var no = $('#tblvoucherentry tr').length;
    var slno = 1
    var slno1 = parseInt(slno) + 1;

    var Amount = 0;
    if ($('#Depreciatedvalue' + RowNo).text() == 0)
    {
        var PV = parseFloat($('#Purvalue' + RowNo).text()).toFixed(Decimal);
        var DPer = parseFloat($('#Depreciatedperc' + RowNo).text()).toFixed(Decimal);
        Amount = (parseFloat(PV).toFixed(Decimal) * parseFloat(DPer).toFixed(Decimal)) / 100;
        TotalAmount = parseFloat(Amount||0).toFixed(Decimal);
    }
    else if ($('#Depreciatedvalue' + RowNo).text() > 0)
    {
        var DV = parseFloat($('#Depreciatedvalue' + RowNo).text()).toFixed(Decimal);
        var DPer = parseFloat($('#Depreciatedperc' + RowNo).text()).toFixed(Decimal);
        Amount = (parseFloat(DV).toFixed(Decimal) * parseFloat(DPer).toFixed(Decimal)) / 100;
        TotalAmount = parseFloat(Amount||0).toFixed(Decimal);
    }


    var VoucherRow = "<tr id=" + 'row' + slno + " class='jsgrid-row' onfocusin='Editrow(" + slno + ")'  onfocusout='UpdateRow(" + slno + ")'>" +
            "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' >" +
            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td>" +
            "<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' >" +
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'>" +
            "<input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td>" +
            "<td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + 1 + "</td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;>" +
            " <select id=" + 'VType' + slno + " onchange='EditGirdAmount()' class='form-control'  style='height:35px;background-color:white' onfocusin=ChangeBackGroundColor('1','" + 'VType' + slno + "') onkeydown=Focusnextgrid(event,'VT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'VType' + slno + "')><option value=Debit>Debit</option></select></td>" +

            "<td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'>" +
            "<input type='hidden' id=" + 'Emp' + slno + "  value=" + $("#EmployeeId0").val() + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> " +

            "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " onkeypress='AccountAutoCompleteGrid(" + slno + ")' onkeydown=Focusnextgrid(event,'AN'," + slno + ")  onfocusin=ChangeBackGroundColor('1','" + 'AccountId' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'AccountId' + slno + "') value='" + $("#AccountDebit" + RowNo).text() + "' value='" + $("#AccountDebit" + RowNo).text() + "'>" +
            " <input type='text' style='display:none;border:none' value=" + $("#AccountDebitId" + RowNo).val() + " id=" + 'supplierId' + slno + " />" +
            " <input type='text' style='display:none;border:none' value=" + $("#AssetId" + RowNo).val() + " id=" + 'NewAssetId' + slno + " />" +
            "<input type='text' style='display:none;border:none' value=" + $("#AccountDebitCode" + RowNo).val() + "  id=" + 'AccCode' + slno + " /></td>" +

            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'>" +
            " <input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " onkeydown=Focusnextgrid(event,'AD'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'VoucherEntryDescription' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'VoucherEntryDescription' + slno + "') value='" + $("#VoucherEntryDescription").val() + "'></td>" +
            "<td class= jsgrid-cell  style= width:50px;text-align:center ><input type='text' class='form-control INVDATECHANGE' onfocusin=ChangeBackGroundColor('1','" + 'InvoDate' + slno + "') onkeydown=Focusnextgrid(event,'D'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'InvoDate' + slno + "') style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno + " value='" + $("#VoucherDate").val() + "'></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'>" +
            "<input type='text' class='form-control' onkeypress='isNumber(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " onkeydown=Focusnextgrid(event,'A'," + slno + ") onkeyup='EditGirdAmount()' onfocusin=ChangeBackGroundColor('1','" + 'Amount' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Amount' + slno + "') value='" + TotalAmount + "'></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'TaxNo' + slno + "') onkeydown=Focusnextgrid(event,'T'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'TaxNo' + slno + "') value=" + ($.trim($("#TaxNo").val())) + " ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control' onkeypress='isNumberInt(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " onkeydown=Focusnextgrid(event,'R'," + slno + ") onfocusin=ChangeBackGroundColor('1','" + 'ReferenceNo' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'ReferenceNo' + slno + "') value='" + ($("#ReferenceNo").val()) + "'><input style=display:none type=text  id=" + 'RefbillNo' + slno + " value=" + billid + "></td>" +

        
           "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> " +
            "<select id=" + 'CurrencyId' + slno + " class='form-control'  style='height:35px;background-color:white' onchange='CurrencyChangeGrid(" + slno + ")' onfocusin=ChangeBackGroundColor('1','" + 'CurrencyId' + slno + "') onkeydown=Focusnextgrid(event,'FX'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CurrencyId' + slno + "')> " + CurrencySelect + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'Rate' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'Rate' + slno + "') onfocusout=ChangeBackGroundColor('0','" + 'Rate' + slno + "') onkeydown=Focusnextgrid(event,'FXR'," + slno + ") value= " + ($.trim($("#Rate").val())) + "></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' onkeypress='isNumber(event, this)' onkeyup=CalculateAmountRow() class='form-control'  style='height:35px;background-color:white' id=" + 'FCAmount' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'FCAmount' + slno + "') onkeydown=Focusnextgrid(event,'FCA'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'FCAmount' + slno + "') value= " + TotalAmount + "></td>" +

             "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<select type='text' class='form-control'  style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'ProjectJobId' + slno + "') onkeydown=Focusnextgrid(event,'J'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ProjectJobId' + slno + "')> " + JobCode + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'CostCenterId' + slno + "') onkeydown=Focusnextgrid(event,'CC'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'CostCenterId' + slno + "')>" + CostCenterName + "</select></td>" +

            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            " <select class='form-control' style='height:35px;background-color:white' id=" + 'trxtype' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'trxtype' + slno + "') onkeydown=Focusnextgrid(event,'TRXT'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'trxtype' + slno + "')><option value=0>-Select-</option><option value=1>CHQ</option><option value=2>NEFT</option><option value=3>RTGS</option><option value=4>IMPS</option><option value=5>ATM</option><option value=6>Others</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            " <select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'BankId' + slno + " onfocusin=ChangeBackGroundColor('1','" + 'BankId' + slno + "') onkeydown=Focusnextgrid(event,'BNK'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'BankId' + slno + "')> " + Bank + "</select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeNo' + slno + "  onfocusin=ChangeBackGroundColor('1','" + 'ChequeNo' + slno + "') onkeydown=Focusnextgrid(event,'CQ'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeNo' + slno + "') value=" + ($.trim($("#ChequeNo").val())) + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeDate' + slno + " value='' onfocusin=ChangeBackGroundColor('1','" + 'ChequeDate' + slno + "') onkeydown=Focusnextgrid(event,'CQD'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeDate' + slno + "')></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'PDCAccount' + slno + " onkeypress='PDCAccountAutoComplete(" + slno + ")' onfocusin=ChangeBackGroundColor('1','" + 'PDCAccount' + slno + "') onkeydown=Focusnextgrid(event,'PDCA'," + slno + ") onfocusout=ChangeBackGroundColor('0','" + 'PDCAccount' + slno + "')  value=" + ($.trim($("#PDCAccount").val())) + "></td>" +
            "</tr>" +


           "<tr id=" + 'row' + slno1 + " class='jsgrid-row' onfocusin='Editrow(" + slno1 + ")'  onfocusout='UpdateRow(" + slno1 + ")'>" +
            "<td id='edit_" + slno1 + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' >" +

            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno1 + ")'  title= Delete ></td>" +
            "<td id='update_" + slno1 + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' >" +
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno1 + ")'>" +
            "<input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno1 + ")' type='button' title='Cancel edit'></td>" +
            "<td id=" + 'td' + slno1 + " class= jsgrid-cell  style= width:50px;text-align:center >" + 2 + "</td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno1 + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;>" +

            " <select id=" + 'VType' + slno1 + " onchange='EditGirdAmount()' class='form-control'  style='height:35px;background-color:white' onfocusin=ChangeBackGroundColor('1','" + 'VType' + slno1 + "') onkeydown=Focusnextgrid(event,'VT'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'VType' + slno1 + "')><option value=Credit>Credit</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'>" +
            "<input type='hidden' id=" + 'Emp' + slno1 + "  value=" + $("#EmployeeId0").val() + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno1 + " onkeypress='AccountAutoCompleteGrid(" + slno1 + ")' onkeydown=Focusnextgrid(event,'AN'," + slno1 + ")  onfocusin=ChangeBackGroundColor('1','" + 'AccountId' + slno1 + "') onfocusout=ChangeBackGroundColor('0','" + 'AccountId' + slno1 + "') value=" + ($("#AccountCredit" + RowNo).text()) + ">" +
            " <input type='text' style='display:none;border:none' value=" + $("#AccountCreditId" + RowNo).val() + " id=" + 'supplierId' + slno1 + " />" +
            " <input type='text' style='display:none;border:none' value=" + $("#AssetId" + RowNo).val() + " id=" + 'NewAssetId' + slno1 + " />" +
            "<input type='text' style='display:none;border:none' value=" + $("#AccountCreditCode" + RowNo).val() + "  id=" + 'AccCode' + slno1 + " /></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'>" +
            " <input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno1 + " onkeydown=Focusnextgrid(event,'AD'," + slno1 + ") onfocusin=ChangeBackGroundColor('1','" + 'VoucherEntryDescription' + slno1 + "') onfocusout=ChangeBackGroundColor('0','" + 'VoucherEntryDescription' + slno1 + "') value='" + $("#VoucherEntryDescription").val() + "'></td>" +
            "<td class= jsgrid-cell  style= width:50px;text-align:center ><input type='text' class='form-control INVDATECHANGE' onfocusin=ChangeBackGroundColor('1','" + 'InvoDate' + slno1 + "') onkeydown=Focusnextgrid(event,'D'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'InvoDate' + slno1 + "') style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno1 + " value='" + $("#VoucherDate").val() + "'></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'>" +
            "<input type='text' class='form-control' onkeypress='isNumber(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno1 + " onkeydown=Focusnextgrid(event,'A'," + slno1 + ") onkeyup='EditGirdAmount()' onfocusin=ChangeBackGroundColor('1','" + 'Amount' + slno1 + "') onfocusout=ChangeBackGroundColor('0','" + 'Amount' + slno1 + "') value='" + TotalAmount + "'></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno1 + " onfocusin=ChangeBackGroundColor('1','" + 'TaxNo' + slno1 + "') onkeydown=Focusnextgrid(event,'T'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'TaxNo' + slno1 + "') value=" + ($.trim($("#TaxNo").val())) + " ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control' onkeypress='isNumberInt(event, this)'  style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno1 + " onkeydown=Focusnextgrid(event,'R'," + slno1 + ") onfocusin=ChangeBackGroundColor('1','" + 'ReferenceNo' + slno1 + "') onfocusout=ChangeBackGroundColor('0','" + 'ReferenceNo' + slno1 + "') value='" + ($("#ReferenceNo").val()) + "'><input style=display:none type=text  id=" + 'RefbillNo' + slno1 + " value=" + billid + "></td>" +

          "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> " +
            "<select id=" + 'CurrencyId' + slno1 + " class='form-control'  style='height:35px;background-color:white' onchange='CurrencyChangeGrid(" + slno1 + ")' onfocusin=ChangeBackGroundColor('1','" + 'CurrencyId' + slno1 + "') onkeydown=Focusnextgrid(event,'FX'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'CurrencyId' + slno1 + "')> " + CurrencySelect + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'Rate' + slno1 + "  onfocusin=ChangeBackGroundColor('1','" + 'Rate' + slno1 + "') onfocusout=ChangeBackGroundColor('0','" + 'Rate' + slno1 + "') onkeydown=Focusnextgrid(event,'FXR'," + slno1 + ") value= " + ($.trim($("#Rate").val())) + "></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' onkeypress='isNumber(event, this)' onkeyup=CalculateAmountRow() class='form-control'  style='height:35px;background-color:white' id=" + 'FCAmount' + slno1 + "  onfocusin=ChangeBackGroundColor('1','" + 'FCAmount' + slno1 + "') onkeydown=Focusnextgrid(event,'FCA'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'FCAmount' + slno1 + "') value= " + TotalAmount + "></td>" +

             "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<select type='text' class='form-control'  style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno1 + " onfocusin=ChangeBackGroundColor('1','" + 'ProjectJobId' + slno1 + "') onkeydown=Focusnextgrid(event,'J'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'ProjectJobId' + slno1 + "')> " + JobCode + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'CostCenterId' + slno1 + " onfocusin=ChangeBackGroundColor('1','" + 'CostCenterId' + slno1 + "') onkeydown=Focusnextgrid(event,'CC'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'CostCenterId' + slno1 + "')>" + CostCenterName + "</select></td>" +

            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            " <select class='form-control' style='height:35px;background-color:white' id=" + 'trxtype' + slno1 + " onfocusin=ChangeBackGroundColor('1','" + 'trxtype' + slno1 + "') onkeydown=Focusnextgrid(event,'TRXT'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'trxtype' + slno1 + "')><option value=0>-Select-</option><option value=1>CHQ</option><option value=2>NEFT</option><option value=3>RTGS</option><option value=4>IMPS</option><option value=5>ATM</option><option value=6>Others</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            " <select type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'BankId' + slno1 + " onfocusin=ChangeBackGroundColor('1','" + 'BankId' + slno1 + "') onkeydown=Focusnextgrid(event,'BNK'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'BankId' + slno1 + "')> " + Bank + "</select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeNo' + slno1 + "  onfocusin=ChangeBackGroundColor('1','" + 'ChequeNo' + slno1 + "') onkeydown=Focusnextgrid(event,'CQ'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeNo' + slno1 + "') value=" + ($.trim($("#ChequeNo").val())) + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'ChequeDate' + slno1 + " value='' onfocusin=ChangeBackGroundColor('1','" + 'ChequeDate' + slno1 + "') onkeydown=Focusnextgrid(event,'CQD'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'ChequeDate' + slno1 + "')></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> " +
            "<input type='text' class='form-control'  style='height:35px;background-color:white' id=" + 'PDCAccount' + slno1 + " onkeypress='PDCAccountAutoComplete(" + slno1 + ")' onfocusin=ChangeBackGroundColor('1','" + 'PDCAccount' + slno1 + "') onkeydown=Focusnextgrid(event,'PDCA'," + slno1 + ") onfocusout=ChangeBackGroundColor('0','" + 'PDCAccount' + slno1 + "')  value=" + ($.trim($("#PDCAccount").val())) + "></td>" +
            "</tr>";


    $('#tblvoucherentry').append(VoucherRow);
    $('#billid').val(0)

    $('#slnotxt').val((parseInt(slno1) + 1));
    //$('#trxtype' + slno).val($('#trxtype').val());
   // $('#VType' + slno).val($("#VType").val());
   // $('#AccountId' + slno).val($('#AccountName').val());
    $('#ProjectJobId' + slno).val($('#JobCode').val());
    $('#CostCenterId' + slno).val($('#CostCenterName').val());
    $('#CurrencyId' + slno).val($('#Currency').val());
    $('#CurrencyId' + slno1).val($('#Currency').val());
    //if ($('#Currency').val() == 0) {
    //    $('#CurrencyId' + slno).val(1);
    //    $('#Rate' + slno).val('1');
    //    //$('#FCAmount' + slno).val($('#Amount').val());
    //}
    $('#BankId' + slno).val($('#Bank').val());
    var i = $('#slnotxt').val();
    $('#hiddenrow').val(i);
    var deb = 0;
    var cre = 0;
    var diff = 0;

    for (var j = 1; j <= $('#slnotxt').val() ; j++) {
        if ($('#VType' + j).val() == 'Debit') {
            deb = deb + parseFloat($('#Amount' + j).val() || 0)
            $('#Debittxt').val(deb.toFixed(decimal));
       
        }
        else if ($('#VType' + j).val() == 'Credit')
        {
            cre = cre + parseFloat($('#Amount' + j).val() || 0)
            $('#Credittxt').val(cre.toFixed(decimal));
        }
    }
    diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
    $('#Differencetxt').val(diff.toFixed(decimal));
    var desc = $('#VoucherEntryDescription').val();
    var amt = $('#Amount').val();
    var txno = $('#TaxNo').val();
    gridrefresh();
    var ddif = $('#Differencetxt').val();
    if (ddif == 0) {
        $('#VoucherEntryDescription').val(desc);
        $('#Amount').val('');
        $('#TaxNo').val('');
    }
    else {
        $('#VoucherEntryDescription').val(desc);
        $('#Amount').val(amt);
        $('#TaxNo').val(txno);
    }
    VoucherTempSave();
}

function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Date' || title == 'Currency' || title == 'OrderNo' || title == 'SerialNo' || title == 'InvoiceNo') {
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
    else if (Type == 'MultiplePurchaseT') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "10%", "targets": 0 },
                { "width": "15%", "targets": 2 },
            ],
            orderCellsTop: true,
            "order": [],
            //  "pageLength": -1,
            autoWidth: false
        });

    }
    else if (Type == 'MultipleSalesT') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "8%", "targets": 0 },
                 { "width": "8%", "targets": 1 },
                  { "width": "6%", "targets": 3 },
                   { "width": "7%", "targets": 4 },
                    { "width": "10%", "targets": 5 },
                     { "width": "20%", "targets": 6 },
                      { "width": "12%", "targets": 7 },
            ],
            orderCellsTop: true,
            "order": [],
            // "pageLength": -1
        });


    }
    else if (Type == 'SingleMR') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            "columnDefs": [
                                { "width": "5%", "targets": 0 },
                                { "width": "20%", "targets": 1 },
                                { "width": "20%", "targets": 2 },
                                { "width": "10%", "targets": 3 },
                                { "width": "10%", "targets": 4 },
                                { "width": "10%", "targets": 5 },
                                { "width": "15%", "targets": 6 },
                                { "width": "20%", "targets": 7 },
            ],
        });

    }
    else if (Type == 'MultipleAllTransaction') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "10%", "targets": 5 },
                { "width": "12%", "targets": 6 },
                { "width": "10%", "targets": 13 },
            ],
            orderCellsTop: true,
            "order": [],
            //"pageLength": -1,
            autoWidth: false
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

function AccountLoad() {
    var flag;
    var accno = {};
    accno.DeptId = ERPDeptId;
    accno.flag = 2;

    $.ajax({
        type: "POST",
        url: "../AccountsErp/AccountNoGetandGets",
        data: accno,
        success: function (result) {
            getacno(result.oList);
        }
    });
}

function getacno(result) {
    for (var k = 0; k < result.length; k++) {
        if (k == 0) {
            $('#DefaultPdcAccCode').val(result[k].TaxAcc);
            $('#DefaultPdcAccId').val(result[k].TaxAccId);
        }        
    }
}