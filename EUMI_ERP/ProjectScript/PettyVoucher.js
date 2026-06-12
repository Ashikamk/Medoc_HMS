var decimal = Decimal;
var editflag = 0;
$(document).ready(function () {
    $('#Date').val(CurDate);
    Defaultfocus();
    VoucherTypecall();
    AccountLoad();
    GetTax(0);
    $('#btnokPV').click(function () {
        PrintthisBill();
        alertpopuprefresh();
        formrefresh();
    });
    $('#btncnclalrtPV').click(function () {
        alertpopuprefresh();
        formrefresh();
    });
    $("#VoucherType").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#VoucherDate').focus();
            e.preventDefault();
        }
    });
    $("#VoucherDate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_type').focus();
            e.preventDefault();
        }
    });
    $("#select_type").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#BankAccount').focus();
            e.preventDefault();
        }
    });
    $("#select_type").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Type').focus();
            e.preventDefault();
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
            $('#Date').focus();
            e.preventDefault();
        }
    });
    $("#Date").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Bank').focus();
            e.preventDefault();
        }
    });
    $("#Bank").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#BankAccount').focus();
            e.preventDefault();
        }
    });
    $("#BankAccount").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Remarks').focus();
            e.preventDefault();
        }
    });
    $("#Remarks").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#VType').focus();
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
                    $('#btnadd').focus();
                    e.preventDefault();
                }
            });
    var data6 = {};
    //data6.BankId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/BankGetandGets",
        data: data6,
        success: function (result) {
            BankLoad(result.oList);

        }
    });
    $('#Credittxt').val('0.00');
    $('#Debittxt').val('0.00');
    $('#Differencetxt').val('0.00');
    $('#Acbal').val("0.00");
    $('#VoucherDate').daterangepicker({
        minDate: new Date('1/1/2000'),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }

    });
    $('#btnadd').click(function () {
        VoucherEntryAdd();
    });

    $("#btnsubmit").click(function (e) {
      
        if ($('#select_type').val() == 0) {
            warningshow('Please Select Account Type', 'select_type');
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

            $("#btnsubmit").prop('disabled', true);

            var Count = parseInt($('#slnotxt').val());
            var oArray = new Array();
            for (var i = 1; i < Count; i++) {


                var VoucherType = $('#VoucherType').val();
                var VTypePrefix = 'PC';
                var VoucherNo = $('#VoucherNo').val();
                var VoucherDate = $('#VoucherDate').val();
                var AccId = $('#supplierId' + i).val();
                var AccCode = $('#AccCode' + i).val();
                var CreditAccount = $('#BankAccount').val();
                var CurrencyId = '1';
                var CurrencyRate = '1';
                var CurrDtTime = '';
                var FCAmount = $('#Amount' + i).val();
                var TrxType = $('#Type').val();
                var ChequeNo = $('#ChequeNo').val();
                var Date = $('#Date').val();
                var Bank = $('#Bank').val();
                var VType = $('#VType' + i).val();
                var VoucherEntryDescription = $('#VoucherEntryDescription' + i).val();
                var Amount = $('#Amount' + i).val();
                var TaxNo = $('#TaxNo' + i).val();
                var ReferenceNo = $('#ReferenceNo' + i).val();
                var UserId = ERPUserId;
                var DeptId = ERPDeptId;

                if (!(typeof ReferenceNo == "undefined")) {
                    oArray.push({
                        'VoucherType': VoucherType,
                        'VTypePrefix': VTypePrefix,
                        'VoucherNo': VoucherNo,
                        'VoucherDate': VoucherDate,
                        'AccId': AccId,
                        'AccCode': AccCode,
                        'CreditAccount': CreditAccount,
                        'CurrencyId': CurrencyId,
                        'CurrencyRate': CurrencyRate,
                        'CurrDtTime': CurrDtTime,
                        'FCAmount': FCAmount,
                        'TrxType': TrxType,
                        'ChequeNo': ChequeNo,
                        'Date': Date,
                        'Bank': Bank,
                        'VType': VType,
                        'VoucherEntryDescription': VoucherEntryDescription,
                        'Amount': Amount,
                        'TaxNo': TaxNo,
                        'ReferenceNo': ReferenceNo,
                        'UserId': UserId,
                        'DeptId': DeptId,

                    })
                }
            }

        }

      

        if (oArray != "") {

            var data = { 'VoucherEntryModel': oArray };
            $.ajax(
      {
          type: "POST",
          url: "../AccountsErp/PCVoucherTableInsert",
          data: data,
          success: function (result) { 
              var status = result.oList[0].Status;
             
             
              Showalerts(status);
             // $("#btnsubmit").prop('disabled', false);
          }
      });
        }
    });

    });

function VoucherTypecall()
{
    var data1 = {};
    data1.VoucherTypeId = 0;
    $.ajax({
        type: "POST",
        url: "../AccountsErp/PettyVoucherTypeGetandGets",
        data: data1,
        success: function (result) {
            VoucherTypeLoad(result.oList);          
        }
    });


    var data2 = {};
    data2.DeptId = ERPDeptId
    $.ajax({
        type: "POST",
        url: "../AccountsErp/VoucherNoGetandGets",
        data: data2,
        success: function (result) {
          
            $('#VoucherNo').val(result.oList[0].PettyCash);
        }
    });
}

function VoucherTypeLoad(result) {
    //console.log(result)
    $("#VoucherType").empty();  
    VoucherType1 = "<option value='" + result[0].VoucherTypeId + "'name=" + result[0].Description + ">" + result[0].Description + "</option>"; 
    $("#VoucherType").append(VoucherType1);
    
}
function BankLoad(result) {
    $("#Bank").empty();
    $("#Bank").append("<option value='0'>Select</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Bank").append("<option value='" + result[i].BankId + "'>" + result[i].BankName + "</option>");
      
    }
}
function AccountLoad() {
    var flag;
    var accno = {};
    accno.DeptId = ERPDeptId;
    accno.flag = 1;

    $.ajax({
        type: "POST",
        url: "../AccountsErp/PCAccNoGetandGets",
        data: accno,
        success: function (result) {
            getacno(result.oList);
               
        }
    });
}

function getacno(result) {

        $('#BankAccount').val(result[0].TaxAcc);
        $('#BankAccountId').val(result[0].TaxAccId);
        $('#BankAccountName').val(result[0].TaxAccName); 
}
var bankcodecheck;
var pdcrcodecheck;
var pdcicodecheck;
function VoucherEntryAdd() {
    var amto = parseFloat($('#Amount').val() || 0);  
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
    if (($('#supplierId0').val() == bankcodecheck || $('#supplierId0').val() == pdcrcodecheck || $('#supplierId0').val() == pdcicodecheck) && chek == 0) {
        Addpopupwindow(2);
        return false;
    }
    var no = $('#tblvoucherentry tr').length;
    var amt = 0;
    amt = parseFloat($("#Amount").val());
    var billid = $('#billid').val();

    if (($('#thJobCode').is(":hidden") && $('#thFC').is(":hidden")) || rowchk == 0) {
        var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "> </td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option value=Credit >Credit</option><option value=Debit>Debit</option></select> </td><td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'><input type='hidden' id=" + 'Emp' + slno + "  value=" + $("#EmployeeId0").val() + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " value='" + $("#AccountName").val() + "'> <input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + $("#VoucherEntryDescription").val() + "'></td><td class= jsgrid-cell  style= width:50px;text-align:center >" + $("#VoucherDate").val() + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + amt.toFixed(decimal) + " onkeyup='EditGirdAmount()'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " value=" + ($.trim($("#TaxNo").val())) + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value='" + ($("#ReferenceNo").val()) + "'><input style=display:none type=text  id=" + 'RefbillNo' + slno + " value=" + billid + "></td></tr>";
    }
    else if ($('#thJobCode').is(":visible") && $('#thFC').is(":visible") && rowchk == 1) {
        var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row >"+
            "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' >" +
            "<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'>" +
            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td>" +
            "<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' >" +
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'>" +
            "<input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td>" +
            "<td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option value=Debit>Debit</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " value='" + $("#AccountName").val() + "'> " +
            "<input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " />" +
            "<input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'>" +
            " <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + $("#VoucherEntryDescription").val() + "'></td>" +
            "<td class= jsgrid-cell  style= width:50px;text-align:center >" + $("#VoucherDate").val() + "</td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'>" +
            "<input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' onkeypress='isNumber(event, this)' id=" + 'Amount' + slno + " value=" + parseFloat(amt).toFixed(decimal) + "   ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " value=" + ($.trim($("#TaxNo").val())) + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value='" + ($("#ReferenceNo").val()) + "'></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno + " > " + JobCode + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " >" + CostCenterName + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> <select id=" + 'CurrencyId' + slno + " class='form-control' disabled=disabled style='height:35px;background-color:white' onchange='CurrencyChangeGrid(" + slno + ")'> " + CurrencySelect + "</select></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'Rate' + slno + " value= " + ($.trim($("#Rate").val())) + " ></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' onkeyup=CalculateAmountRow() class='form-control' disabled style='height:35px;background-color:white' id=" + 'FCAmount' + slno + " value= " + ($.trim($("#AmountFC").val())) + " ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select class='form-control'  disabled style='height:35px;background-color:white' id=" + 'trxtype' + slno + " ><option value=0>-Select-</option><option value=1>CHQ</option><option value=2>NEFT</option><option value=3>RTGS</option><option value=4>IMPS</option><option value=5>ATM</option><option value=6>Others</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'BankId' + slno + " > " + Bank + "</select></td>" + 
            "<td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'ChequeNo' + slno + " value= " + ($.trim($("#ChequeNo").val())) + " ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'ChequeDate' + slno + " value= " + ($.trim($("#ChequeDate").val())) + " ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;>" +
            " <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'PDCAccount' + slno + " value= " + ($.trim($("#PDCAccount").val())) + " >" +
            "<input type=text style=display:none  id=" + 'RefbillNo' + slno + " value=" + billid + "></td></tr>";

    }
    $('#tblvoucherentry').append(VoucherRow);
    $('#billid').val(0)
    $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
    $('#trxtype' + slno).val($('#trxtype').val());
    $('#VType' + slno).val($("#VType").val());
   // $('#AccCode' + slno).val($('#AccountName').val());
    $('#ProjectJobId' + slno).val($('#JobCode').val());
    $('#CostCenterId' + slno).val($('#CostCenterName').val());
    $('#CurrencyId' + slno).val($('#Currency').val());
     //$('#BankId' + slno).val($('#Bank').val());
    if ($('#Currency').val() == 0) {
        $('#CurrencyId' + slno).val(1);
        $('#Rate' + slno).val('1');
        $('#FCAmount' + slno).val($('#Amount').val());
    }
   
    calccrdr();
   


}

function calccrdr()
{
    var i = $('#slnotxt').val();
    $('#hiddenrow').val(i);
    var deb = 0;
    var cre = 0;
    var diff = 0;

    if ($('#tblvoucherentry tr').length == 1) {
        $('#Debittxt').val('0.00');
        $('#Credittxt').val('0.00');
    }

    else
    {
   for (var j = 1; j < $('#slnotxt').val() ; j++) {
        if ($('#VType' + j).val() == 'Debit') {
            deb = deb + parseFloat($('#Amount' + j).val() || 0)
            $('#Debittxt').val(deb.toFixed(decimal));
            cre = cre + parseFloat($('#Amount' + j).val() || 0)
            $('#Credittxt').val(cre.toFixed(decimal));
        }
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
        $('#VoucherEntryDescription').val('');
        $('#Amount').val('');
        $('#TaxNo').val('');
    }
    else {
        $('#VoucherEntryDescription').val(desc);
        $('#Amount').val(amt);
        $('#TaxNo').val(txno);
    }
    

   
}


function GetTax(Id) {
    var data = {};
    data.TaxId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TaxGetandGets",
        data: data,
        success: function (result) {
            TaxLoad(result.oList);
        }
    });
}

function TaxLoad(result,Id) {
    var TaxId;
    $("#TAXPER").empty();
    for (var i = 0; i < result.length; i++) {
        if (result[i].TaxId != 0) {
             TaxId = result[i].TaxId;
        }
    }
    $("#TAXPER").append("<option value='0'>-Select Tax-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#TAXPER").append("<option value='" + result[i].TaxId + "' name='" + result[i].Acc_Desc + "'>" + result[i].TaxName + "</option>");
        $("#taxhidden").append("<option value='" + result[i].TaxId + "' name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>");
        $("#TAXAccountid").append("<option value='" + result[i].TaxId + "' name='" + result[i].TaxableAccountpurchase + "'>" + result[i].TaxName + "</option>");
        $("#purchasetaxid").append("<option value='" + result[i].TaxId + "' name='" + result[i].PurchaseTaxableId + "'>" + result[i].TaxName + "</option>");
    }

   
    $('#TAXPER').val(TaxId);
    $('#taxhidden').val(TaxId);
    $('#TAXAccountid').val(TaxId);
    $('#purchasetaxid').val(TaxId);
    $('#TAXAccount').val($('#TAXPER').find("option:selected").attr("name"));
}

function AccountChange(Id) {
    $('#taxhidden').val($('#TAXPER').val());
    $('#TAXAccountid').val($('#TAXPER').val())
    $('#purchasetaxid').val($('#TAXPER').val())
    $('#TAXAccount').val($('#TAXPER').find("option:selected").attr("name"));
    TypeChange();
}

function VATPOPUP()
{
    if ($.trim($('#AccountName').val()) == "") {
        warningshow('Please Select Account', 'AccountName');
        return false;
    }
    if ($.trim($('#Amount').val()) == 0) {
        warningshow('Please Add Amount', 'Amount');
        return false;
    }
    $('#TAXPER').val(0);
    $('#PopupVAT').show();
    $('#VAT').show();
    $('#VATForm').show();
}


function TypeChange() {

    if ($('#type').val() == 0) {
        var amt = 0;
        
        var rate = parseFloat($('#taxhidden').find("option:selected").attr("name") || 0); 
        amt = (($('#Amount').val() * rate) / 100)
        $("#TaxAmount").val(amt.toFixed(decimal));
    }
    else
    {
        $("#TaxAmount").val(parseFloat($('#taxhidden').find("option:selected").attr("name") || 0).toFixed(decimal));
    }
}


function Add()
{
    $('#PopupVAT').hide();
   
    VATadd();
}
function VATadd() {
  
    var slno = parseInt($('#slnotxt').val())
    var slno1 = parseInt(slno) + 1;

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
 
    var no = $('#tblvoucherentry tr').length;
    
    var billid = $('#billid').val();


    if ($('#type').val() == 0) {
        var taxamt = 0;
        var amnt = 0;
        var rate = parseFloat($('#taxhidden option:selected').attr("name") || 0);
        taxamt = (($('#Amount').val() * rate) / 100)   // tax amount

        amnt = parseFloat(parseFloat(($('#Amount').val()) - parseFloat(taxamt))); //Amount

    }
    else {
        var taxamt = 0;
        var amnt = 0;
        var rate = parseFloat($('#taxhidden option:selected').attr("name") || 0);
        taxamt = (($('#Amount').val() * rate) / 100); // tax amount

        amnt = parseFloat(parseFloat(($('#Amount').val()) || 0)); //Amount
    }
   
   
        var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row >" +
            "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' >" +
            "<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'>" +
            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td>" +
            "<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' >" +
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'>" +
            "<input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td>" +
            "<td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option value=Debit>Debit</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none;width:300px' id=" + 'AccountId' + slno + " value=" + $("#AccountName").val() + "> " +
            "<input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " />" +
            "<input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'>" +
            " <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + $("#VoucherEntryDescription").val() + "'></td>" +
            "<td class= jsgrid-cell  style= width:50px;text-align:center >" + $("#VoucherDate").val() + "</td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'>" +
            "<input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' onkeypress='isNumber(event, this)' id=" + 'Amount' + slno + " value=" + parseFloat(amnt).toFixed(decimal) + "   ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno + " value=" + ($.trim($("#TaxNo").val())) + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value='" + ($("#ReferenceNo").val()) + "'></td></tr>"+
           
            "<tr id=" + 'row' + slno1 + " class= jsgrid-row >" +
            "<td id='edit_" + slno1 + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' >" +
            "<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno1 + ")'>" +
            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno1 + ")'  title= Delete ></td>" +
            "<td id='update_" + slno1 + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' >" +
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno1 + ")'>" +
            "<input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno1 + ")' type='button' title='Cancel edit'></td>" +
            "<td id=" + 'td' + slno1 + " class= jsgrid-cell  style= width:50px;text-align:center >" + slno1 + "</td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno1 + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno1 + " class='form-control' disabled style='height:35px;background-color:white' ><option value=Debit>Debit</option></select></td>" +
            "<td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> " +
            "<input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none;width:300px' id=" + 'AccountId' + slno1 + " value=" + $("#TAXAccount").val() + "> " +
            "<input type='text' style='display:none;border:none' value=" + $('#purchasetaxid').find("option:selected").attr("name") + " id=" + 'supplierId' + slno1 + " />" +
            "<input type='text' style='display:none;border:none' value=" + $('#TAXAccountid').find("option:selected").attr("name") + " id=" + 'AccCode' + slno1 + " /></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'>" +
            " <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno1 + " value='" + $("#VoucherEntryDescription").val() + "'></td>" +
            "<td class= jsgrid-cell  style= width:50px;text-align:center >" + $("#VoucherDate").val() + "</td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'>" +
            "<input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' onkeypress='isNumber(event, this)' id=" + 'Amount' + slno1 + " value=" + parseFloat(taxamt).toFixed(decimal) + "   ></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'TaxNo' + slno1 + " value=" + ($.trim($("#TaxNo").val())) + "></td>" +
            "<td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno1 + " value='" + ($("#ReferenceNo").val()) + "'></td></tr>";
   
        $('#tblvoucherentry').append(VoucherRow);
    $('#billid').val(0)
    $('#slnotxt').val((parseInt(slno1) + 1));
    $('#trxtype' + slno).val($('#trxtype').val());
    $('#VType' + slno).val($("#VType").val());
  

    
    $('#AccountName').val('');
    $('#VoucherEntryDescription').val('');
    $('#Amount').val('');
    $('#TaxNo').val('');
    $('#ReferenceNo').val('');


    calccrdr();
    closepopup();
}


function closepopup()
{
    $("#TAXPER").val('0');
    $("#TAXAccount").val('');
    $("#type").val('0');
    $("#TaxAmount").val('');
}
function Addpopupwindow(Id) {
    if ($.trim($('#AccountName').val()) == "") {
        warningshow('Please Select Account', 'AccountName');
        return false;
    }
    if ($.trim($('#supplierId0').val()) == 0) {
        warningshow('Please Select a Valid Account', 'AccountName');
        return false;
    }
    if ($.trim($('#Amount').val()) == 0) {
        warningshow('Please Add Amount', 'Amount');
        return false;
    }
    else {
        $('#PendingInv').hide();
        $('#JobAndFC').hide();
        $('#Popup').show();

        if (Id == 1) {
            $('#MyHeader').text('Pending Invoice');
            $('#PendingInv').show();
        }
        else if (Id == 2) {
            $('#MyHeader').text('Job & FC');
            $('#JobAndFC').show();
            $('#JobCode').focus();
            $('#AmountCon').val($('#Amount').val());
            $('#Rate').val($('#Currency').find("option:selected").attr("name"));
            $('#trxtype').val(0);

            $('#PDCAccount').val('');
            $('#ChequeDate').val(CurDate);
            
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
                    $('#Currency').focus();
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
                    $('#trxtype').focus();
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
                    $('#btnaddtogrid').focus();
                    e.preventDefault();
                }
            });
         
            
        }
    }
   
}

function Defaultfocus() {
    $('#VoucherType').focus();
}
$(document).keydown(function (e) {
    if (e.altKey && e.keyCode == 83) {//Alt+S      
        if ($("#btnsubmit").is(":disabled") == false) {
            $("#btnsubmit").click();
        }
        
    }
    else if (e.altKey && e.keyCode == 82) {                 //Alt+R        
        window.open('../AccountsReport/AccountsReport')
    }
    else if (e.altKey && e.keyCode == 67) {                  //Alt+C
        formrefresh();
    }
    else if (e.keyCode == 27) {                           //esc
        $('#Popup').hide();
        $('#PopupVAT').hide();
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

function Clear() {
    if ($('#slnotxt').val() <= 2) {
        formrefresh();
    }
    else {
        var result = confirm("Do you want to Continue?")
        if (result == true)
            formrefresh();
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
    //$('#ChequeNo').val('');
    $('#ChequeDate').val('');
    //$('#Bank').val('0');
    $('#Acbal').val('0.00');
    $('#PDCAccount').val('');
   
    $('#VType').focus();
}

function GridRemove() {
    for (var k = 1; k < ($('#slnotxt').val()) ; k++) {
        $('#row' + k).remove();
    }
}
function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
}
function Showalerts(Status) {
    $('#savealert').html('');
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    if (Status == 1) {
        //formrefresh();
        //swal('Data Saved Successfully', "", "success");
       // $('.swal-button swal-button--confirm').focus();
        $('#alertpopup').show();
        $('#alertdiv').show();
        $('#savealert').append('Saved Successfully!<br>Do you want to print this bill?');
        $('#btnokPV').focus();
  
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
$("#VoucherType").keydown(function (e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 13) {

        $('#VoucherDate').focus();
        e.preventDefault();
    }
});
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

//$("#VType").keydown(function (e) {
//    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
//    if (key == 13) {

//        $('#AccountName').focus();
//        e.preventDefault();
//    }
//});
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
function CalcFCAmount() {
    var fcamt = parseFloat($('#Amount').val() || 0) / parseFloat($('#Rate').val() || 0);
    fcamt = isNaN(fcamt) ? 0 : fcamt;
    $('#FCAmount').val(fcamt.toFixed(decimal));
    $('#AmountFC').val(fcamt.toFixed(decimal));
}

function formrefresh() {
    if (editflag != 0) {
        warningshow('Please cancel Edit Mode');
        return false;
    }
    else {
        VoucherTypecall();
        AccountLoad();
        $("#btnsubmit").show();
        //$("#btncopy").show();
        $('#VoucherNo').prop('disabled', false);
        $('#VoucherDate').prop('disabled', false);
        $("#btnprint").hide();
        $('#btncopy').prop('disabled', false);
        $('#select_type').val('0');
        $('#Remarks').val('');
        $('#TransferVoucherNo').prop('disabled', false);
        salaryflag = 0;
        ppoo = 0;
        $('#Employee').val('');
        $('#EmpCode').val('');
        $('#EmployeeId0').val('');
        $("#btnsubmit").prop('disabled', false);
        $('#Employee').prop('disabled', true);
        $('#TransferVoucherNo').val('');
        $('#VoucherDate').val(CurDate);
        $('#TransferSalary').val(CurDate);
        $('#Type').val('0')
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
        for (var k = 1; k < ($('#slnotxt').val()) ; k++) {
            $('#row' + k).remove();
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
        
    }
}
function Editrow(RowId) {

    editflag = editflag + 1;
    $('#row' + RowId).children('td,th').css('background-color', 'rgb(232,226,226)');
    $('#edit_' + RowId).hide();
    $('#update_' + RowId).show();
    vtype = $('#VType' + RowId).val();
    ved = $('#VoucherEntryDescription' + RowId).val();
    amt = $('#Amount' + RowId).val();
    bid = $('#Bank' + RowId).val();
    cno = $('#ChequeNo' + RowId).val();
    cdt = $('#Date' + RowId).val();
    txno = $('#TaxNo' + RowId).val();
    refno = $('#ReferenceNo' + RowId).val();
    invdt = $('#VoucherDate' + RowId).val();
    debt = $('#Debittxt' + RowId).val();
    cret = $('#Credittxt' + RowId).val();
    //var debt = 0;
    //var cret = 0;
    //var difference = 0;
    //debt = debt + parseFloat($('#Amount' + RowId).val() || 0)
    //cret = cret + parseFloat($('#Amount' + RowId).val() || 0)
    difference = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
    //$('#VType' + RowId).prop('disabled', false);
    $('#VoucherEntryDescription' + RowId).prop('disabled', false);
    $('#Amount' + RowId).prop('disabled', false);
    $('#Bank' + RowId).prop('disabled', false);
    $('#ChequeNo' + RowId).prop('disabled', false);
    $('#Date' + RowId).prop('disabled', false);
    $('#VoucherDate' + RowId).prop('disabled', false);
    $('#TaxNo' + RowId).prop('disabled', false);
    $('#ReferenceNo' + RowId).prop('disabled', false);
    $('#Debittxt' + RowId).prop('disabled', false);
    $('#Credittxt' + RowId).prop('disabled', false);
}


function CancelEditRow(RowId) {

    editflag = editflag - 1;
    $('#row' + RowId).children('td,th').css('background-color', 'white');
    $('#VType' + RowId).val(vtype);
    $('#VoucherEntryDescription' + RowId).val(ved);
    $('#Amount' + RowId).val(amt);
    $('#Bank' + RowId).val(bid);
    $('#ChequeNo' + RowId).val(cno);
    $('#Date' + RowId).val(cdt);
    $('#TaxNo' + RowId).val(txno);
    $('#ReferenceNo' + RowId).val(refno);
    $('#VoucherDate' + RowId).val(invdt);    
    $('#Debittxt' + RowId).val(debt);
    $('#Credittxt' + RowId).val(cret);
    $('#Differencetxt').val(difference.toFixed(decimal));
    $('#VType' + RowId).prop('disabled', true);
    $('#AccountId' + RowId).prop('disabled', true);
    $('#VoucherEntryDescription' + RowId).prop('disabled', true);
    $('#Amount' + RowId).prop('disabled', true);
    $('#Bank' + RowId).prop('disabled', true);
    $('#ChequeNo' + RowId).prop('disabled', true);
    $('#Date' + RowId).prop('disabled', true);
    $('#TaxNo' + RowId).prop('disabled', true);
    $('#ReferenceNo' + RowId).prop('disabled', true);
    $('#VoucherDate' + RowId).prop('disabled', true);
    $('#Debittxt' + RowId).prop('disabled', true);
    $('#Credittxt' + RowId).prop('disabled', true);
    $('#edit_' + RowId).show();
    $('#update_' + RowId).hide();
}

function UpdateRow(RowId) {
    editflag = editflag - 1;
    $('#row' + RowId).children('td,th').css('background-color', 'white');
    if ($('#Amount' + RowId).val() == "") {
        warningshow('Please enter amount', 'Amount' + RowId);
        return false
    }

    else {
        var amt1 = $('#Amount' + RowId).val();
        $('#update_' + RowId).hide();
        $('#edit_' + RowId).show();
        $('#VType' + RowId).prop('disabled', true);
        $('#VoucherEntryDescription' + RowId).prop('disabled', true);
        $('#Amount' + RowId).prop('disabled', true);
        $('#Bank' + RowId).prop('disabled', true);
        $('#ChequeNo' + RowId).prop('disabled', true);
        $('#Date' + RowId).prop('disabled', true);
        $('#TaxNo' + RowId).prop('disabled', true);
        $('#ReferenceNo' + RowId).prop('disabled', true);
        $('#VoucherDate' + RowId).prop('disabled', true);
        $('#Debittxt' + RowId).prop('disabled', true);
        $('#Credittxt' + RowId).prop('disabled', true);
        $('#Amount' + RowId).val(amt1.toFixed(decimal));
        calccrdr();
    }
}

function rowdelete(RowId) {
    var sllno = 1;
    var h = $('#hiddenrow').val();
    var Res = confirm("Do You Want Delete this record?")
    if (Res == true) {         
        $('#row' + RowId).remove();
        for (var j = 1; j <= h - 1; j++) {
            if ($('#AccountId' + j).val() != undefined) {
                $('#td' + j).text(sllno);
                sllno++;
            }
        }
        calccrdr();
    }
}



