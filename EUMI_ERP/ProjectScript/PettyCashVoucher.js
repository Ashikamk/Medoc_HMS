
var decimal = Decimal;
var editflag = 0;

function AccountTypeLoad(result) {
    $("#AccountType").empty();
    $("#AccountType").append();
    for (var i = 0; i < result.length; i++) {
        $("#AccountType").append("<option name='" + result[i].AccountTypeCode + "' value='" + result[i].AccountTypeId + "'>" + result[i].AccountTypeName + "</option>");
        $("#CreditAc").val($("#AccountType").find("option:selected").attr("name"));
        $('#CreditAcId').val($("#AccountType").val());
    }
}
function AccTypeChange(AccountTypeId) {
    $('#CreditAc').val($('#' + AccountTypeId).find("option:selected").attr("name"));
    $('#CreditAcId').val($('#' + AccountTypeId).find("option:selected").attr("value"));
    $("#Bank").val('0');
    $("#ChequeNo").val('');
    $("#ChequeDate").val('');
}

var BaseCurrency = 0;
function CurrencyLoad(result) {
    $("#Currency,#PCurrency").empty();
    CurrencySelect = "";
    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {
            BaseCurrency = result[i].BaseCurrencyId;
        }
        CurrencySelect += "<option  name='" + result[i].CurrencyRate + "' value='" + result[i].Id + "'>" + result[i].CurrencyName + "</option>"
    }
    $("#Currency,#PCurrency").append(CurrencySelect);
    $('#Currency,#PCurrency').val(BaseCurrency);
    $('#Rate,#PRate').val($('#Currency,#PCurrency').find("option:selected").attr("name"));
}
function CurrencyChange(Id) {
    $('#Rate,#PRate').val($('#' + Id).find("option:selected").attr("name"));
    var fcamt = parseFloat($('#GAmount').val() || 0) / parseFloat($('#PRate').val() || 0);    
    $('#PFCAmount').val(fcamt.toFixed(decimal));
    var fcamtmain = parseFloat($('#Amount').val() || 0) / parseFloat($('#Rate').val() || 0);
    $('#FCAmount').val(fcamtmain.toFixed(decimal));
}
function CalculateFC() {
    var fcamt = parseFloat($('#Amount').val() || 0) / parseFloat($('#Rate').val() || 0);
    fcamt = isNaN(fcamt) ? 0 : fcamt;
    $('#FCAmount').val(fcamt.toFixed(decimal));
    var pfcamt = parseFloat($('#GAmount').val() || 0) / parseFloat($('#PRate').val() || 0);
    pfcamt = isNaN(pfcamt) ? 0 : pfcamt;
    $('#PFCAmount').val(pfcamt.toFixed(decimal));
    $('#BaseAmt').val($('#Amount').val());
    ClearRow();
    $('#AccountName').val('');
    $('#supplierId0').val('');
    $('#VEDescription').val('');
    $('#GAmount').val('');
    $('#ReferenceNo').val('');
}
function CalculateAmount() {
    var amt = parseFloat($("#FCAmount").val() || 0) * parseFloat($("#Rate").val() || 0);
    amt = isNaN(amt) ? 0 : amt;
    $("#Amount").val(amt.toFixed(decimal));
    $("#BaseAmt").val(amt.toFixed(decimal));
    var pamt = parseFloat($("#PFCAmount").val() || 0) * parseFloat($("#PRate").val() || 0);
    pamt = isNaN(pamt) ? 0 : pamt;
    $("#GAmount").val(pamt.toFixed(decimal));
    //CheckAmount();
}

function CostCenterLoad(result) {
    $("#CostCenterCode,#PCostCenterCode").empty();
    CostCenterName = "<option value='0'>Select</option>";
    for (var i = 0; i < result.length; i++) {
        CostCenterName += "<option  value='" + result[i].CostCenterId + "' name='" + result[i].CostCenterName + "'>" + result[i].CostCenterName + "</option>";
    }
    $("#CostCenterCode,#PCostCenterCode").append(CostCenterName);
}

function BankLoad(result) {
    $("#Bank,#PBank").empty();
    Bank = "<option value='0'>Select</option>";
    for (var i = 0; i < result.length; i++) {
        Bank += "<option value='" + result[i].BankId + "'name=" + result[i].BankName + "'>" + result[i].BankName + "</option>";
    }
    $("#Bank,#PBank").append(Bank);
}

function TaxLoad(result) {
    $("#TaxGroup").empty();
    TaxGroup = "<option value='0'>Select</option>";
    for (var i = 0; i < result.length; i++) {
        TaxGroup += "<option value='" + result[i].TaxId + "' name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>";
        $('#TaxPer').val($("#TaxGroup").find("option:selected").attr("name"));
    }
    $("#TaxGroup").append(TaxGroup);
}
function TaxChange(Id) {
    $('#TaxPer').val($('#' + Id).find("option:selected").attr("name"));
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
    for (var k = 0; k < result.length; k++) {
        $('#VoucherNo').val(result[k].PC);
    }
}

//Date Picker Function
$(function () {
    $('#VoucherDate,#ChequeDate,#PChequeDate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
});

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

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

function Showalerts(Status) {
    
    if (Status == 1) {
        formrefresh();
        swal('Bill Settled Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    
}

$(document).ready(function () {    
    serialnoload();
    AccountLoad();
    $('#AccountType').focus();
    $('#Credit').val(0);
    $('#Debit').val(0);
    $('#Diff').val(0);
    $('#Total').val(0);
    $('#VoucherDate').val(CurDate);
    $('#ChequeDate').val('');

    $("#CreditAc").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            var data = {};
            data.AccCode = $("#CreditAc").val();
            $.ajax({
                url: '../AccountsErp/AccSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '-2',
                            label: item.AccCode,
                            label1: item.AccDescription,
                            Acc_Id: item.AccId,
                            headers: ["Account Code", "Account Name"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,

        select: function (event, ui) {
            $('#CreditAc').val(ui.item.label);
            $('#CreditAcId').val(ui.item.Acc_Id);
            $('#Amount').focus();
        },
    });

    $("#AccountName").autocomplete({
        source: function (request, response) {
            var data = {};
            data.AccCode = $("#AccountName").val();
            $.ajax({
                url: '../AccountsErp/AccSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '-2',
                            label: item.AccDescription,
                            label1: item.AccCode,
                            AccountName: item.AccDescription,
                            AccCode: item.AccCode,
                            AccountId: item.AccId,
                            //CurrencyId: item.CurrencyId,
                            headers: ["Account Name", "Account Code"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#AccountName').val(ui.item.label)
            $('#AccCode').val(ui.item.label1)
            $('#supplierId0').val(ui.item.AccountId)
            //$('#Currency').val(ui.item.CurrencyId)
            //$("#Rate").val($("#Currency").find("option:selected").attr("name"));
            $('#VEDescription').focus();
        },
    });

    $("#JobDesc").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            var data = {};
            data.JobCode = $("#JobDesc").val();
            $.ajax({
                url: '../SalesInvoice/JobSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '-2',
                            label: item.JobCode,
                            label1: item.Description,
                            ProjectJobId: item.ProjectJobId,
                            headers: ["Job Code", "Description"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#JobCode').val(ui.item.ProjectJobId);
            $('#Amount').focus();
        },
    });

    $("#PJobDesc").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            var data = {};
            data.JobCode = $("#PJobDesc").val();
            $.ajax({
                url: '../SalesInvoice/JobSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '-2',
                            label: item.JobCode,
                            label1: item.Description,
                            ProjectJobId: item.ProjectJobId,
                            headers: ["Job Code", "Description"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#PJobCode').val(ui.item.ProjectJobId);
            $('#PCostCenterCode').focus();
        },
    });

    $("#PDCAccount").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            var data = {};
            data.AccCode = $("#PDCAccount").val();
            $.ajax({
                url: '../AccountsErp/AccSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '-2',
                            label: item.AccCode,
                            label1: item.AccDescription,
                            Acc_Id: item.AccId,
                            headers: ["Account Code", "Account Name"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,

        select: function (event, ui) {
            $('#PDCAccount').val(ui.item.label);
            $('#PDCAccountId').val(ui.item.Acc_Id);
            $('#btnaddtogrid').focus();
        },
    });

    $("#TaxAcc").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            var data = {};
            data.AccCode = $("#TaxAcc").val();
            $.ajax({
                url: '../AccountsErp/AccSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '-2',
                            label: item.AccCode,
                            label1: item.AccDescription,
                            Acc_Id: item.AccId,
                            headers: ["Account Code", "Account Name"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,

        select: function (event, ui) {
            $('#TaxAcc').val(ui.item.label);
            $('#TaxAccName').val(ui.item.label1);
            $('#TaxAccId').val(ui.item.Acc_Id);
        },
    });

    $("#AccountType").change(function (e) {
        var selectedvalue = $("#AccountType").find("option:selected").text();
        if (selectedvalue == 'Cash Account') {
            $("#ChequeDate").prop('disabled', 'disabled');
            $("#ChequeDate").val('');
            $("#ChequeNo").prop('disabled', 'disabled');
            $("#ChequeNo").val('');
            $("#Bank").prop('disabled', 'disabled');
            $("#Bank").val('0');
        }
        else {
            $("#Bank").val('0');
            $("#ChequeDate").prop("disabled", false);
            $("#ChequeDate").val(CurDate);
            $("#ChequeNo").prop("disabled", false);
            $("#Bank").prop('disabled', false);
        }
    });

    var data1 = {};
    data1.AccountTypeId = 0;
    data1.DeptId = ERPDeptId;
    data1.flag = 1;
    $.ajax({
        type: "POST",
        url: "../Master/AccountTypeGetandGets",
        data: data1,
        success: function (result) {
            AccountTypeLoad(result.oList);
        }
    });
    var data2 = {};
    data2.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data: data2,
        success: function (result) {
            CurrencyLoad(result.oList);
        }
    });
    var data3 = {};
    data3.CostCenterId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CostCenterGetandGets",
        data: data3,
        success: function (result) {
            CostCenterLoad(result.oList);
        }
    });
    var data4 = {};
    data4.BankId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/BankGetandGets",
        data: data4,
        success: function (result) {
            BankLoad(result.oList);
        }
    });
    var data5 = {};
    data5.TaxId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TaxGetandGets",
        data: data5,
        success: function (result) {
            TaxLoad(result.oList);
        }
    });

    $("#AccountType").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($("#AccountType").find("option:selected").text() == 'Cash Account') {
                $("#Amount").focus();
            }
            else {
                $("#ChequeNo").focus();
            }
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
            $('#CostCenterCode').focus();
            e.preventDefault();
        }
    });
    $("#CostCenterCode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#JobDesc').focus();
            e.preventDefault();
        }
    });
    $("#Amount").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#Amount').val() != 0) {                
                $('#VType').focus();
                e.preventDefault();
            }
            else {
                warningshow('Please enter Amount', 'Amount');
                return false;
            }
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
            if ($('#Rate').val() != 0) {
                $('#FCAmount').focus();
                e.preventDefault();
            }
            else {
                warningshow('Please enter Rate', 'Rate');
                return false;
            }
        }
    });
    $("#FCAmount").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {            
            if ($('#FCAmount').val() != 0) {                
                $('#VType').focus();
                e.preventDefault();                
            }
            else {
                warningshow('Please enter FCAmount', 'FCAmount');
                return false;
            }
        }
    });
    $("#VType").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#AccountName').focus();
            e.preventDefault();            
        }
    });
    $("#VEDescription").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#GAmount').select();
            $('#GAmount').focus();
            e.preventDefault();
        }
    });
    $("#GAmount").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {            
            if ($('#GAmount').val() != 0) {
                $('#ReferenceNo').focus();
                e.preventDefault();
            }
            else {
                warningshow('Please enter Amount', 'GAmount');
                return false;
            }
        }
    });
    $("#ReferenceNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#JobandTax').focus();
            e.preventDefault();
        }
    });
    $("#JobandTax").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnadd').focus();
            e.preventDefault();
        }
    });
    $("#PCostCenterCode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#PCurrency').focus();
            e.preventDefault();
        }
    });
    $("#PCurrency").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#PRate').focus();
            e.preventDefault();
        }
    });
    $("#PRate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {            
            if ($('#PRate').val() != 0) {
                $('#PFCAmount').focus();
                e.preventDefault();
            }
            else {
                warningshow('Please enter Rate', 'PRate');
                return false;
            }
        }
    });
    $("#PFCAmount").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {            
            if ($('#PFCAmount').val() != 0) {
                $('#PBank').focus();
                e.preventDefault();
            }
            else {
                warningshow('Please enter FCAmount', 'PFCAmount');
                return false;
            }
        }
    });
    $("#PBank").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#PChequeNo').focus();
            e.preventDefault();
        }
    });
    $("#PChequeNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#PChequeDate').focus();
            e.preventDefault();
        }
    });
    $("#PChequeDate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#PDCAccount').focus();
            e.preventDefault();
        }
    }); 
    $("#TaxGroup").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#TaxPer').focus();
            e.preventDefault();
        }
    });
    $("#TaxPer").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#TaxPer').val() != 0) {
                $('#TRN').focus();
                e.preventDefault();
            }
            else {
                warningshow('Please enter Tax Rate', 'TaxPer');
                return false;
            }
        }
    });
    $("#TRN").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnaddtogridtax').focus();
            e.preventDefault();
        }
    });

    $("#btnsubmit").click(function (e) {
        
        if ($('#AccountType').val() == 0) {
            warningshow('Please Select Account Type', 'AccountType');
        }
        else if ($.trim($('#Amount').val()) == 0) {
            warningshow('Please add Amount', 'Amount');
            return false;
        }
        else if ($('#CreditAcId').val() == 0) {
            warningshow('Please Select A Valid Account', 'CreditAc');
            return false;
        }
        else if ($('#JobCode').val() == 0 && $('#JobDesc').val()!='') {
            warningshow('Please Select A Valid JobCode', 'JobDesc');
            return false;
        }
        else if ($.trim($('#slnotxt').val()) == "1") {
            warningshow('Please add Voucher Details', 'btnadd');
            return false;
        }
        else if (editflag != 0) {
            warningshow('Please Cancel Edit Mode');
            return false;
        }
        else if ($('#DCDiff').val() != 0) {
            warningshow('Debit & Credit are not tally');
            return false;
        }
        else if ($('#Diff').val() != 0) {
            warningshow('Base Amount & Total Amount are not tally');
            return false;
        }

        else {
            var Count = parseInt($('#slnotxt').val());
            var oArray = new Array();

            var VType = 'D';
            var VoucherNo = $('#VoucherNo').val();
            if ($('#ChequeDate').attr('disabled') == 'disabled') {
                var ChequeDate = 0;
                var BankId = 0;
                var ChequeNo = 0;
            }
            else {
                var ChequeDate = $('#ChequeDate').val();
                var BankId = $('#Bank').val();
                var ChequeNo = $('#ChequeNo').val();
            }
            var VoucherDate = $('#VoucherDate').val();
            var AccCode = $('#CreditAc').val();
            var AccountId = $('#CreditAcId').val();            
            var CostCenterId = $('#CostCenterCode').val();
            var ProjectJobId = $('#JobCode').val();
            var Amount = $('#Amount').val();
            var CurrencyId = $('#Currency').val();
            var CurrencyRate = $('#Rate').val();
            var FCAmount = $('#FCAmount').val();
            DelFlag = 1;
            var UserId = ERPUserId;
            var DeptId = ERPDeptId;
            var VoucherTypePrefix = "PC";
            if ($('#AccountType').find("option:selected").text() == 'PDC Received') {
                var PDCAccountId = $('#AccCode').val();
                var PDCStatus = 'O';
            }
            else {
                var PDCAccountId = 0;
                var PDCStatus = 0;
            }
            var VoucherTypeId = 0;
            var BillSerId = 0;
            var ReferenceNo = 0;
            var VoucherEntryDescription = 0;
            var Advance = 0;
            var AdvanceAmount = 0;
            var TransVoucherNo = 0;

            oArray.push({
                'VType': VType,
                'VoucherTypeId': VoucherTypeId,
                'VoucherDate': VoucherDate,
                'VoucherNo': VoucherNo,
                'VoucherTypePrefix': VoucherTypePrefix,
                'ReferenceNo': ReferenceNo,
                'ProjectJobId': ProjectJobId,
                'CostCenterId': CostCenterId,
                'CurrencyId': CurrencyId,
                'CurrencyRate': CurrencyRate,
                'FCAmount': FCAmount,
                'BankId': BankId,
                'ChequeNo': ChequeNo,
                'ChequeDate': ChequeDate,
                'BillSerId': BillSerId,
                'AccountId': AccountId,
                'AccCode': AccCode,
                'VoucherEntryDescription': VoucherEntryDescription,
                'Amount': Amount,
                'DelFlag': DelFlag,
                'UserId': UserId,
                'DeptId': DeptId,
                'Advance': Advance,
                'AdvanceAmount': AdvanceAmount,
                'TransVoucherNo': TransVoucherNo,
                'PDCAccountId': PDCAccountId,
                'PDCStatus': PDCStatus,
            })



            for (var i = 1; i < Count; i++) {
                if ($('#GVType' + i).val() == 'Debit') {
                    var VType = 'D';
                }
                else {
                    var VType = 'C';
                }
                var VoucherNo = $('#VoucherNo').val();
                var CurrId = $('#CurrencyId'+i).val();
                if (typeof CurrId == "undefined") {
                    var CurrencyId = 1;
                    var CurrencyRate = 1.000;
                    var FCAmount = $('#GTAmount' + i).val();
                    var ChequeDate = 0;
                    var ChequeNo = 0;
                    var BankId = 0;
                    var PDCAccountId = 0;
                    var PDCStatus = 0;
                }
                else {                    
                    var CurrencyId = $('#CurrencyId' + i).val();
                    var CurrencyRate = $('#GRate' + i).text();
                    var FCAmount = $('#GFCAmount' + i).text();
                    var ChequeDate = $('#GChequeDate' + i).text();
                    var ChequeNo = $('#GChequeNo' + i).text();
                    var BankId = $('#BankId' + i).text();

                    if ($('#GPDCAccount' + i).text() != "") {
                        var PDCAccountId = $('#GPDCAccount' + i).text();
                        var PDCStatus = 'O';
                    }
                    else {
                        var PDCAccountId = 0;
                        var PDCStatus = 0;
                    }                    
                }
                var VoucherDate = $('#VoucherDate').val();
                var AccCode = $('#GAccCode' + i).text();
                var AccountId = $('#supplierId' + i).val();
                var CostCenterId = $('#GCostCenterName' + i).val();
                var ProjectJobId = $('#GPJobDesc' + i).val();
                var Amount = $('#GTAmount' + i).val();
                DelFlag = 1;
                var UserId = ERPUserId;
                var DeptId = ERPDeptId;
                var VoucherTypePrefix = "PC";
                var VoucherTypeId = 0;
                var BillSerId = 0;
                if ($('#GReferenceNo' + i).text()=='') {
                    var ReferenceNo = 0;
                }
                else {
                    var ReferenceNo = $('#GReferenceNo' + i).text();
                }
                if ($('#VoucherEntryDescription' + i).text()=='') {
                    var VoucherEntryDescription = 0;
                }
                else {
                    var VoucherEntryDescription = $('#VoucherEntryDescription' + i).text();
                }
                
                var Advance = 0;
                var AdvanceAmount = 0;
                var TransVoucherNo = 0;          


            oArray.push({
                'VType': VType,
                'VoucherTypeId': VoucherTypeId,
                'VoucherDate': VoucherDate,
                'VoucherNo': VoucherNo,
                'VoucherTypePrefix': VoucherTypePrefix,
                'ReferenceNo': ReferenceNo,
                'ProjectJobId': ProjectJobId,
                'CostCenterId': CostCenterId,
                'CurrencyId': CurrencyId,
                'CurrencyRate': CurrencyRate,
                'FCAmount': FCAmount,
                'BankId': BankId,
                'ChequeNo': ChequeNo,
                'ChequeDate': ChequeDate,
                'BillSerId': BillSerId,
                'AccountId': AccountId,
                'AccCode': AccCode,
                'VoucherEntryDescription': VoucherEntryDescription,
                'Amount': Amount,
                'DelFlag': DelFlag,
                'UserId': UserId,
                'DeptId': DeptId,
                'Advance': Advance,
                'AdvanceAmount': AdvanceAmount,
                'TransVoucherNo': TransVoucherNo,
                'PDCAccountId': PDCAccountId,
                'PDCStatus': PDCStatus,                
            })
            }
        }        
        if (oArray != "") {
            var data = { 'PettyCashModel': oArray };            
            $.ajax({          
          type: "POST",
          url: "../AccountsErp/PettyCashTableInsert",
          data: data,
          success: function (result) {
              for (var i = 0; i <= result.oList.length; i++) {
                  var status = result.oList[i].Status;
                  Showalerts(status);
                  formrefresh();
                  serialnoload();
                  AccountLoad();
              }
          }
      });
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
        $('#Popup').hide();
    }
});

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
    for (var k = 0; k < result.length; k++) {
        $('#VoucherNo').val(result[k].PettyCash);
    }
}

function AccountLoad() {
    
    var flag;
    var accno = {};
    accno.DeptId = ERPDeptId;
    accno.flag = 1;

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
        $('#TaxAcc').val(result[k].TaxAcc);
        $('#TaxAccId').val(result[k].TaxAccId);
        $('#TaxAccName').val(result[k].TaxAccName);
    }
}

function AddToGrid() {
    var slno = parseInt($('#slnotxt').val())
    if ($.trim($('#AccountName').val()) == "") {
        warningshow('Please Select Account', 'AccountName');
        return false;
    }
    if ($('#supplierId0').val() == "" ||$('#supplierId0').val() ==0) {
        warningshow('Please Select Account', 'AccountName');
        return false;
    }
    if ($.trim($('#Amount').val()) == "" ||$('#Amount').val() == 0) {
        warningshow('Please enter Amount', 'Amount');
        return false;
    }
    if ($.trim($('#GAmount').val()) == ""||$('#GAmount').val() == 0) {
        warningshow('Please enter Amount', 'GAmount');
        return false;
    }
    var no = $('#tblpettycash tr').length;

    var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell style='text-align:center' >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center'> <select id=" + 'GVType' + slno + " class='form-control' disabled style='height:35px;background-color:white'><option>Credit</option><option>Debit</option></select> </td><td class= jsgrid-cell  style= 'text-align:center' id=" + 'GAccCode' + slno + " >" + $("#AccCode").val() + "</td><td class= 'jsgrid-cell jsgrid-align-center' id=" + 'AccountId' + slno + ">" + ($.trim($("#AccountName").val())) + "<input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' id=" + 'VoucherEntryDescription' + slno + ">" + ($.trim($("#VEDescription").val())) + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'><input type='text' class='form-control' readonly='readonly' style='height:35px;background-color:white;border:none' id=" + 'GTAmount' + slno + " value=" + ($.trim($("#GAmount").val())) + " onkeyup='CheckGAmount(" + slno + ")'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' id=" + 'GReferenceNo' + slno + ">" + ($.trim($("#ReferenceNo").val())) + "</td><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id=" + 'update_' + slno + " class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' id=" + 'update' + slno + " type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td></tr>";
    $('#tblpettycash').append(VoucherRow);    
    $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));    
    var i = $('#slnotxt').val();
    $('#hiddenrow').val(i);    

    $('#GVType' + slno).val($("#VType option:selected").text());
    $('#AccountId' + slno).val($('#AccountName').val());    
    CalculateSum();
    gridrefresh();
}

function GetJob() {
    $('#tdJobCode,#thJobCode').show();
    $('#tdCostCode,#thCostCode').show();
    $("#tblpettycash").width("100%");
    $('#thFC,#thFCAmount,#thBank,#thPDCAc,#tdFC').show();
    var slno = parseInt($('#slnotxt').val());
    var cost = 0;
    var bank = 0;
    var curr = 0;
    if ($('#PCostCenterCode').val() == 0) {
        cost = '';
        var costcd = 0;
    }
    else {
        cost = $('#PCostCenterCode option:selected').text();
        var costcd = $('#PCostCenterCode option:selected').val();
    }
    if ($('#PBank').val() == 0) {
        bank = '';
        var bankid = 0;
    }
    else {
        bank = $('#PBank option:selected').text();
        var bankid = $('#PBank option:selected').val();
    }
    if ($('#PCurrency').val() == 0) {
        curr = '';
        var currid = 0;
    }
    else {
        curr = $('#PCurrency option:selected').text();
        var currid = $('#PCurrency option:selected').val();
    }

    var no = $('#tblpettycash tr').length;

    var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style='text-align:center' >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center'> <select id=" + 'GVType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option>Credit</option><option>Debit</option></select></td><td class= jsgrid-cell  style= 'text-align:center' id=" + 'GAccCode' + slno + " >" + $("#AccCode").val() + "</td><td class= 'jsgrid-cell jsgrid-align-center' id=" + 'AccountId' + slno + ">" + ($.trim($("#AccountName").val())) + "<input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:270px;' id=" + 'VoucherEntryDescription' + slno + ">" + ($.trim($("#VEDescription").val())) + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:180px;'><input type='text' class='form-control' readonly='readonly' style='height:35px;background-color:white;border:none' id=" + 'GTAmount' + slno + " value=" + ($.trim($("#GAmount").val())) + " onkeyup='CheckGAmount(" + slno + ")'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:220px;' id=" + 'GReferenceNo' + slno + ">" + ($.trim($("#ReferenceNo").val())) + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= 'width: 150px;'>" + ($("#PJobDesc").val()) + "<input type='text' style='display:none' id=" + 'GPJobDesc' + slno + " value=" + ($("#PJobCode").val()) + " > </td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= 'width: 15px;'>" + cost + " <input type='text' style='display:none' value=" + costcd + " id=" + 'GCostCenterName' + slno + "> </td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 150px;'> " + curr + " <input type='text' id=" + 'CurrencyId' + slno + " style='display:none' value=" + currid + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= 'width: 150px;' id=" + 'GRate' + slno + " >" + ($.trim($("#PRate").val())) + "</td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= 'width: 150px;' id=" + 'GFCAmount' + slno + ">" + $("#PFCAmount").val() + "</td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= 'width: 150px;' > " + bank + "<input type='text' style='display:none' id=" + 'BankId' + slno + " value=" + bankid + "></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= 'width: 150px;' id=" + 'GChequeNo' + slno + ">" + ($.trim($("#PChequeNo").val())) + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= 'width: 150px;' id=" + 'GChequeDate' + slno + " >" + $("#PChequeDate").val() + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= 'width: 100px;' id=" + 'GPDCAccount' + slno + " > " + ($.trim($("#PDCAccount").val())) + " </td><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' id=" + 'update' + slno + " type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td></tr>";
    $('#tblpettycash').append(VoucherRow);
    $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
    var i = $('#slnotxt').val();
    $('#hiddenrow').val(i);
    $('#GVType' + slno).val($("#VType option:selected").text());
    $('#AccountId' + slno).val($('#AccountName').val());
    CalculateSum();
    $('#Popup').hide();
    gridrefresh();
}

function GetTax() {
    if ($('#TaxGroup').val() == 0) {         
        warningshow('Please Select TaxGroup', 'TaxGroup');       
        return false;
    }
    else {

        if ($("#Inclusive").is(":checked")) {
            var slno = parseInt($('#slnotxt').val());
            var TaxAmt = 0;
            var TaxPer = 0;
            TaxAmt = (parseFloat($('#GAmount').val() || 0) * 100) / (100 + (parseFloat($('#TaxPer').val() || 0)));
            TaxPer = parseFloat($('#GAmount').val() || 0) - TaxAmt;
            $('#TaxAmount').val(TaxPer.toFixed(decimal));

            var no = $('#tblpettycash tr').length;
            var VoucherRowMain = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'GVType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option>Credit</option><option>Debit</option></select> </td><td class= jsgrid-cell  style= width:50px;text-align:center id=" + 'GAccCode' + slno + " >" + $("#AccCode").val() + "</td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px' id=" + 'AccountId' + slno + ">" + ($.trim($("#AccountName").val())) + "<input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px' id=" + 'VoucherEntryDescription' + slno + ">" + ($.trim($("#VEDescription").val())) + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' readonly='readonly' style='height:35px;background-color:white;border:none' id=" + 'GTAmount' + slno + " value=" + TaxAmt.toFixed(decimal) + " onkeyup='CheckGAmount(" + slno + ")'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px' id=" + 'GReferenceNo' + slno + ">" + ($.trim($("#ReferenceNo").val())) + "</td><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' id=" + 'update' + slno + " type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td></tr>";
            $('#tblpettycash').append(VoucherRowMain);
            $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
            $('#GVType' + slno).val($("#VType option:selected").text());
            slno = parseInt($('#slnotxt').val());

            var no = $('#tblpettycash tr').length;
            var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'GVType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option>Credit</option><option>Debit</option></select> </td><td class= jsgrid-cell  style= width:50px;text-align:center id=" + 'GAccCode' + slno + "  >" + $("#TaxAcc").val() + "</td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px' id=" + 'AccountId' + slno + ">" + $("#TaxAccName").val() + "<input type='text' style='display:none;border:none' value=" + $("#TaxAccId").val() + " id=" + 'supplierId' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px' id=" + 'VoucherEntryDescription' + slno + ">" + ($.trim($("#VEDescription").val())) + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' readonly='readonly' style='height:35px;background-color:white;border:none' id=" + 'GTAmount' + slno + " value=" + ($.trim($("#TaxAmount").val())) + " onkeyup='CheckGAmount(" + slno + ")'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px' id=" + 'GReferenceNo' + slno + ">" + ($.trim($("#TRN").val())) + "</td><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' id=" + 'update' + slno + " title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td></tr>";
            $('#tblpettycash').append(VoucherRow);
            $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
            var i = $('#slnotxt').val();
            $('#hiddenrow').val(i);

            $('#GVType' + slno).val($("#VType option:selected").text());
            $('#AccountId' + slno).val($('#TaxAccName').val());
            CalculateSum();
            $('#Popup').hide();
            gridrefresh();
        }

        else {
            if ($('#GAmount').val() == $('#Amount').val()) {
                warningshow('BillAmount Exceeded');
                return false;
            }
            else {
            
            var slno = parseInt($('#slnotxt').val());
            var TaxAmt = 0;
            var TaxPer = 0;
            TaxAmt = (parseFloat($('#GAmount').val() || 0) * 100) / (100 + (parseFloat($('#TaxPer').val() || 0)));
            TaxPer = parseFloat($('#GAmount').val() || 0) - TaxAmt;
            $('#TaxAmount').val(TaxPer.toFixed(decimal));
            
            var no = $('#tblpettycash tr').length;
            var VoucherRowMain = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'GVType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option>Credit</option><option>Debit</option></select> </td><td class= jsgrid-cell  style= width:50px;text-align:center id=" + 'GAccCode' + slno + "  >" + $("#AccCode").val() + "</td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px' id=" + 'AccountId' + slno + ">" + ($.trim($("#AccountName").val())) + "<input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px' id=" + 'VoucherEntryDescription' + slno + ">" + ($.trim($("#VEDescription").val())) + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' readonly='readonly' style='height:35px;background-color:white;border:none' id=" + 'GTAmount' + slno + " value=" + ($.trim($("#GAmount").val())) + " onkeyup='CheckGAmount(" + slno + ")'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px' id=" + 'GReferenceNo' + slno + ">" + ($.trim($("#ReferenceNo").val())) + "</td><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' id=" + 'update' + slno + " type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td></tr>";
            $('#tblpettycash').append(VoucherRowMain);
            $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
            $('#GVType' + slno).val($("#VType option:selected").text());
            slno = parseInt($('#slnotxt').val());
            
            var no = $('#tblpettycash tr').length;
            var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'GVType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option>Credit</option><option>Debit</option></select> </td><td class= jsgrid-cell  style= width:50px;text-align:center id=" + 'GAccCode' + slno + "  >" + $("#TaxAcc").val() + "</td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px' id=" + 'AccountId' + slno + ">" + $("#TaxAccName").val() + "<input type='text' style='display:none;border:none' value=" + $("#TaxAccId").val() + " id=" + 'supplierId' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px' id=" + 'VoucherEntryDescription' + slno + ">" + ($.trim($("#VEDescription").val())) + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' readonly='readonly' style='height:35px;background-color:white;border:none' id=" + 'GTAmount' + slno + " value=" + ($.trim($("#TaxAmount").val())) + " onkeyup='CheckGAmount(" + slno + ")'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px' id=" + 'GReferenceNo' + slno + ">" + ($.trim($("#TRN").val())) + "</td><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' id=" + 'update' + slno + " title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td></tr>";
            $('#tblpettycash').append(VoucherRow);
            $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
            var i = $('#slnotxt').val();
            $('#hiddenrow').val(i);

            $('#GVType' + slno).val($("#VType option:selected").text());
            $('#AccountId' + slno).val($('#TaxAccName').val());
            CalculateSum();
            $('#Popup').hide();
            gridrefresh();
                }
        }        
    }
    $('#tab1').click();   
}

function AccountClear() {
    $('#supplierId0').val(0);
}
function CrAccountClear() {
    $('#CreditAcId').val(0);
}
function JobClear() {    
    $('#JobCode').val(0);
}

function gridrefresh() {    
    $('#AccountName').val('');
    $('#supplierId0').val('');
    $('#VEDescription').val('');
    $('#GAmount').val('');
    $('#ReferenceNo').val('');
    if ($('#VType').val() == 'Debit') {
        $('#VType').val('Credit');
    }
    else {
        $('#VType').val('Debit');
    }
    $('#VType').focus();
    $('#PJobDesc').val('');
    $('#PJobCode').val('0');
    $('#PCostCenterCode').val('0');
    $('#PCurrency').val(BaseCurrency);
    $('#PRate').val($('#PCurrency').find("option:selected").attr("name"));
    $('#PFCAmount').val('');
    $('#PChequeNo').val('');
    $('#PChequeDate').val(CurDate);
    $('#PBank').val('0');
    $('#PDCAccount').val('');
    $('#PDCAccountId').val('0');
    $('#TaxGroup').val('0');
    $('#TaxPer').val('');
    $('#TRN').val('');
    $('#Inclusive').prop("checked", true);
}

function ClearRow() {
    for (var k = 1; k < ($('#slnotxt').val()) ; k++) {
        $('#row' + k).remove();
    }
    $('#slnotxt').val('1');
    $('#Debit').val(0);
    $('#Credit').val(0);
    $('#Diff').val(0);
    $('#Total').val(0);
}

function formrefresh() {
    
    $('#VoucherDate').val(CurDate);
    $("#AccountType").val(1);
    $("#CreditAc").val($("#AccountType").find("option:selected").attr("name"));
    $('#CreditAcId').val($("#AccountType").find("option:selected").attr("value"));
    $('#ChequeNo').val('');
    $('#ChequeDate').val('');
    $('#Bank').val('0');
    $('#CostCenterCode').val('0');
    $('#JobDesc').val('');
    $('#Amount').val('');
    $('#BaseAmt').val('');
    $('#Currency').val(BaseCurrency);    
    $('#Rate').val($('#Currency').find("option:selected").attr("name"));
    $('#FCAmount').val('');
    ClearRow();
    $('#thJobCode,#thCostCode').hide();
    $('#thFC,#thFCAmount,#thBank,#thPDCAc').hide();    
    gridrefresh();
    $("#ChequeDate").prop('disabled', 'disabled');
    $("#ChequeNo").prop('disabled', 'disabled');
    $("#Bank").prop('disabled', 'disabled');
    $('#AccountType').focus();    
}

function ShowJobandTax() {
    AccountLoad();
    var slno = parseInt($('#slnotxt').val())
    if ($.trim($('#AccountName').val()) == "") {
        warningshow('Please Select Account', 'AccountName');
        return false;
    }
    else if ($('#supplierId0').val() == ""||$('#supplierId0').val() ==0) {
        warningshow('Please Select A Valid Account', 'AccountName');
        return false;
    }
    else if ($.trim($('#GAmount').val()) == "" || $('#GAmount').val()==0) {
        warningshow('Please enter Amount', 'GAmount');
        return false;
    }
    else if ($.trim($('#Amount').val()) == "" || $('#Amount').val()==0) {
        warningshow('Please enter Amount', 'Amount');
        return false;
    }
    else {
        $('#Popup').show(); 
        $('#JobAndFC').show();
        $('#PFCAmount').val($('#GAmount').val());
        $('#PJobDesc').focus();


    }
}

function Editrow(RowId) {
    editflag = editflag + 1;
    $('#edit_' + RowId).hide();
    $('#update_' + RowId).show();
    $('#GVType' + RowId).focus();
    Amt = $('#GTAmount' + RowId).val();
    vtype = $('#GVType' + RowId).val();

    $('#GVType' + RowId).prop('disabled', false);
    //$('#GVType' + RowId).css("border", "1px solid #F0F6F6");
    $('#GVType' + RowId).focus();
    $('#GTAmount' + RowId).prop('readonly', false);
    $('#GTAmount' + RowId).css("border", "1px solid #F0F6F6");    
    $('#Credit').val(0);
    $('#Debit').val(0);
    $('#Diff').val(0);
    $('#Total').val(0);

    $('#GVType' + RowId).keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#GTAmount' + RowId).select();
            e.preventDefault();
        }
    });
    $('#GTAmount' + RowId).keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#update' + RowId).select();
            e.preventDefault();
        }
    });
}

function CancelEditRow(RowId) {
    editflag = editflag - 1;
    $('#edit_' + RowId).show();
    $('#update_' + RowId).hide();

    $('#GVType' + RowId).val(vtype);
    $('#GVType' + RowId).prop('disabled', true);
    $('#GTAmount' + RowId).val(Amt);
    $('#GFCAmount' + RowId).text(Amt);
    $('#GTAmount' + RowId).prop('readonly', true);
    $('#GTAmount' + RowId).css("border", "0");    
    CalculateSum();
}

function UpdateRow(RowId) {
    editflag = editflag - 1;
    if ($('#GTAmount' + RowId).val() == ""||$('#GTAmount' + RowId).val() ==0) {
        warningshow('Please enter amount', 'GTAmount' + RowId);
        return false
    }
    else {        

        $('#update_' + RowId).hide();
        $('#edit_' + RowId).show();

        $('#GVType' + RowId).prop('disabled', true);
        $('#GTAmount' + RowId).prop('readonly', true);
        $('#GTAmount' + RowId).css("border", "0");
        CalculateSum();
        $('#VType').focus();
    }
}

function rowdelete(RowId) {
    var sllno = 1;
    var h = $('#hiddenrow').val();
    var Res = confirm("Do You Want Delete this record?")
    if (Res == true) {
        
        var amt = $('#GTAmount' + RowId).val();
        if ($('#GVType' + RowId).val() == 'Debit') {
            var deb = 0;
            deb = $('#Debit').val() - amt;
            $('#Debit').val(deb.toFixed(decimal));
        }
        else {
            var cre = 0;
            cre = $('#Credit').val() - amt;
            $('#Credit').val(cre.toFixed(decimal));
        }
        var total = parseFloat($('#Credit').val() || 0) + parseFloat($('#Debit').val() || 0);
        $('#Total').val(total.toFixed(decimal));

        var diff = parseFloat($('#Amount').val() || 0) - parseFloat($('#Total').val() || 0);
        $('#Diff').val(diff.toFixed(decimal));

        dcdiff = parseFloat($('#Debit').val() || 0) - parseFloat($('#Credit').val() || 0);
        $('#DCDiff').val(dcdiff.toFixed(decimal));

        $('#BaseAmt').val(diff.toFixed(decimal));

        $('#row' + RowId).remove();
    }
    for (var j = 1; j <= h - 1; j++) {
            if ($('#AccountId' + j).val() != undefined) {
                $('#td' + j).text(sllno);
                sllno++;
            }
    }
    $('#VType').focus();
}

function CalculateSum() {
    var deb = 0;
    var cre = 0;
    var diff = 0;
    var total = 0;
    var bamt = 0;
    var dcdiff = 0;

    for (var j = 1; j <= $('#slnotxt').val() ; j++) {
        if ($('#GVType' + j).val() == 'Debit') {
            deb = deb + parseFloat($('#GTAmount' + j).val() || 0)
            $('#Debit').val(deb.toFixed(decimal));
        }
        else {
            cre = cre + parseFloat($('#GTAmount' + j).val() || 0)
            $('#Credit').val(cre.toFixed(decimal));
        }
    }
    total = parseFloat($('#Credit').val() || 0) + parseFloat($('#Debit').val() || 0);
    $('#Total').val(total.toFixed(decimal));

    diff = parseFloat($('#Amount').val() || 0) - parseFloat($('#Total').val() || 0);
    $('#Diff').val(diff.toFixed(decimal));

    dcdiff = parseFloat($('#Debit').val() || 0) - parseFloat($('#Credit').val() || 0);
    $('#DCDiff').val(dcdiff.toFixed(decimal));

    $('#BaseAmt').val(diff.toFixed(decimal));
}

function CheckAmount() {    

    if (parseFloat($('#BaseAmt').val()) < parseFloat($('#GAmount').val())) {
        warningshow('Amount Exceeded', 'GAmount');
        $('#GAmount').val(''); 
        $('#PFCAmount').val('');
    }
}

function CheckGAmount(Id) {
    var amount = parseFloat($('#Amount').val() || 0);
    var fcamount = 0;

    if (amount >= $('#GTAmount' + Id).val()) {        
        amount = amount - parseFloat($('#GTAmount' + Id).val() || 0);
        $('#BaseAmt').val(amount.toFixed(decimal));
        var sumchange = 0;
        for (var i = 1; i <= $('#slnotxt').val() ; i++) {
            sumchange = sumchange + parseFloat($('#GTAmount' + i).val() || 0);
            fcamount = parseFloat($('#GTAmount' + i).val() || 0) / parseFloat($('#GRate' + i).text() || 0)
            $('#GFCAmount' + i).text(fcamount.toFixed(decimal));
        }        
        $('#BaseAmt').val(parseFloat($('#Amount').val() || 0) - sumchange.toFixed(decimal));        

    if ($('#BaseAmt').val() < 0) {
        warningshow('BillAmount Exceeded');
        $('#GTAmount' + Id).val('');
        var sumchange = 0;        
        for (var i = 1; i <= $('#slnotxt').val() ; i++) {
            sumchange = sumchange + parseFloat($('#GTAmount' + i).val() || 0);
            fcamount = parseFloat($('#GTAmount' + i).val() || 0) / parseFloat($('#GRate' + i).text() || 0)
            $('#GFCAmount' + i).text(fcamount.toFixed(decimal));
        }
        $('#BaseAmt').val(parseFloat($('#Amount').val() || 0) - sumchange.toFixed(decimal));
        }        
    }
        
    else {
        warningshow('BillAmount Exceeded');
        $('#GTAmount' + Id).val('');             
        var sumchange = 0;
        for (var i = 1; i <= $('#slnotxt').val() ; i++) {
            sumchange = sumchange + parseFloat($('#GTAmount' + i).val() || 0);
            fcamount = parseFloat($('#GTAmount' + i).val() || 0) / parseFloat($('#GRate' + i).text() || 0)
            $('#GFCAmount' + i).text(fcamount.toFixed(decimal));
        }
        $('#BaseAmt').val(parseFloat($('#Amount').val() || 0) - sumchange.toFixed(decimal));
    }
}
