//changeitems();
//changeitems1();
//changeitems2();
//changeitems3();


$(document).ready(function () {
    loadfunctions();
});

$(document).keydown(function (e) {
    if (e.keyCode == 27) {                  //ESC       :   Popup Close
        popuprefresh();
    }
});
function GetTax() {
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

function TaxLoad(result) {
    $("#importpurchasetax,#ExportSalesTax").empty();
    TaxSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "'name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>";
    }
    $("#importpurchasetax,#ExportSalesTax").append(TaxSelect);
}


function AreaLoad(result) {
    $("#area").empty();
    //$("#area").append("<option value='0'>-All-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#area").append("<option value='" + result[i].AreaId + "'>" + result[i].AreaCode + "</option>");
    }
  
}

function GetDepartment1(id) {
    var data = {};
    data.DeptId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            DepartmentLoad1(result.oList, id);


        }
    });
}

function DepartmentLoad1(result, a) {
    $("#dept").empty();
    for (var i = 0; i < result.length; i++) {
        $("#dept").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }
    //changeitems();
}


function GetDepartment2(id) {
    var data = {};
    data.DeptId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            DepartmentLoad2(result.oList, id);


        }
    });
}

function DepartmentLoad2(result, a) {
    $("#dept2").empty();
    for (var i = 0; i < result.length; i++) {
        $("#dept2").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }
    //changeitems1();
}
function GetDepartment3(id) {
    var data = {};
    data.DeptId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            DepartmentLoad3(result.oList, id);


        }
    });
}
function DepartmentLoad3(result, a) {
    $("#dept3").empty();
    for (var i = 0; i < result.length; i++) {
        $("#dept3").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }
    //changeitems2();
}

function DepartmentLoad4(result, a) {
    $("#dept4").empty();
    for (var i = 0; i < result.length; i++) {
        $("#dept4").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }
    //changeitems3();
}
function GetDepartment4(id) {
    var data = {};
    data.DeptId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            DepartmentLoad4(result.oList, id);


        }
    });
}

function DepartmentLoad5(result, a) {
    $("#dept5").empty();
    for (var i = 0; i < result.length; i++) {
        $("#dept5").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }
    //changeitems3();
}
function GetDepartment5(id) {
    var data = {};
    data.DeptId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            DepartmentLoad5(result.oList, id);


        }
    });
}

function DepartmentLoad9(result, a) {
    $("#dept9").empty();
    for (var i = 0; i < result.length; i++) {
        $("#dept9").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }
}
function GetDepartment9(id) {
    var data = {};
    data.DeptId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            DepartmentLoad9(result.oList, id);


        }
    });
}
function BusinessTypeLoad(result) {
    $("#businesstype").empty();
    //$("#businesstype").append("<option value='0'>-All-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#businesstype").append("<option value='" + result[i].BusinessTypeId + "'>" + result[i].BusinessType + "</option>");
    }
}

function CurrencyLoad(result) {

    $("#currency").empty();
    //$("#currency").append("<option value='0'>--Select Currency--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#currency").append("<option value='" + result[i].Id + "' name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");

    }
}


function popuprefresh() {
    $('#popupdiv').hide();
    $("#tab1").click();
}


function changeitems() {
    var srlno = {};    
    srlno.DeptId = $('#dept').val();

    $.ajax({
        type: "POST",
        url: "../Company/CompanyItemSlNoGetandGets",
        data: srlno,
        success: function (result) {
            if (result.oList.length == 0) {
                $('#salesorder').val('1');
                $('#QUOT').val('1');
                $('#CENQ').val('1');
                $('#purchinvno').val('1');
                $('#BatchSlno').val('1');
                $('#purchaseEnq').val('1');
                $('#purchorderno').val('1');
                $('#mrvno').val('1');
                $('#salesreturnno').val('1');
                $('#purchreturnno').val('1');
                $('#prodno').val('1');
                $('#stocktransin').val('1');
                $('#stocktransout').val('1');
                $('#matissueno').val('1');
                $('#matreceivedno').val('1');
                $('#matreqno').val('1');
                $('#jv').val('1');
                $('#rv').val('1');
                $('#pv').val('1');
                $('#dv').val('1');
                $('#cv').val('1');
                $('#cn').val('1');
                $('#dn').val('1');
                $('#ct').val('1');
                $('#tv').val('1');
                $('#av').val('1');
                $('#openingv').val('1');
                $('#Invopv').val('1');
                $('#PurchasenonInv').val('1');
                $('#SalesnonInv').val('1');
                $('#InvStockTransfer').val('1');
                $('#PDCPTV').val('1');
                $('#delorder').val('1');
                $('#pc').val('1');
                $('#pkl').val('1');
                $('#MRVPurchase').val('1');
                $('#PVTNo').val('1');
                $('#StockAdjNo').val('1');
                $('#PurchaseImportNo').val('1');
                $('#ContainerImportNo').val('1');
                $('#BOQNo').val('1');
                $('#OpenStockEntryNo').val('1');
                $('#LocationTransferNo').val('1');
                $('#PackingHistoryNo').val('1');
                $('#ElectronicsProductionNo').val('1');
                $('#ContraNo').val('1');
                $('#PettyCashPrint').val('1');
                $('#PurchasePerforma').val('1');
                $('#DailyTnNo').val('1');
                $('#ContractNo').val('1');
                $('#ToolsManagementNo').val('1');
                $('#ProjectMaterialReturnNo').val('1');
                $('#PackingListNo').val('1');
                $('#BOQNo').val('1');
            }
            else
            {
                getslno(result.oList);
            }
            GetPrintDefault();
        }
    });

}


function changeitems1() {
    var srlno = {};    
    srlno.DeptId = $('#dept2').val();

    $.ajax({
        type: "POST",
        url: "../Company/CompanyItemSlNoGetandGets",
        data: srlno,
        success: function (result) {
            if (result.oList.length == 0) {
                 $('#customer').val('1');
                  $('#supplier').val('1');
                  $('#pdcr').val('1');
                 $('#pdci').val('1');
                 $('#cash').val('1');
                 $('#bank').val('1');
                 $('#expenses').val('1');
            }
            else {
                getslno(result.oList);
            }
        }
    });
}


function changeitems2() {
    var srlno = {};
    srlno.DeptId = $('#dept3').val();

    $.ajax({
        type: "POST",
        url: "../Company/CompanyItemSlNoGetandGets",
        data: srlno,
        success: function (result) {
            if (result.oList.length == 0) {
                $('#glcash').val('1');
                $('#glbank').val('1');
                $('#cashsale').val('1');
                $('#creditsale').val('1');
                $('#creditcard').val('1');
                $('#cashcust').val('1');
                $('#cosac').val('1');
                $('#pcntrlac').val('1');
                $('#purchlocal').val('1');
                $('#purchimport').val('1');
                $('#sreturnac').val('1');
                $('#preturnac').val('1');
                $('#discountac').val('1');
                $('#pdcrcvd').val('1');
                $('#pdcissd').val('1');
                $('#stroutdr').val('1');
                $('#stroutcr').val('1');
                $('#strindr').val('1');
                $('#strincr').val('1');
                $('#scntrolac').val('1');
                $('#sih').val('1');
                $('#salpac').val('1');
                $('#chequeac').val('1');
                $('#othercost').val('1');
                $('#roundoff').val('1');
                $('#vccaccount').val('1');
                $('#pettycashaccount').val('1');
                $('#locationtransferaccount').val('1');
            }
            else {
                getslno(result.oList);
            }
        }
    });
}

function changeitems3() {
    var srlno = {};
    srlno.DeptId = $('#dept4').val();

    $.ajax({
        type: "POST",
        url: "../Company/CompanyItemSlNoGetandGets",
        data: srlno,
        success: function (result) {
            if (result.oList.length == 0) {
                $('#salesaccount').val('1');
                $('#purchaseaccount').val('1');
                $('#salesreturnaccount').val('1');
                $('#purchasereturnaccount').val('1');
                $('#expenseaccount').val('1');
            }
            else {
                getslno(result.oList);
            }
        }
    });
}

function changeitems4() {
    var srlno = {};
    srlno.DeptId = $('#dept5').val();

    $.ajax({
        type: "POST",
        url: "../Company/CompanyItemSlNoGetandGets",
        data: srlno,
        success: function (result) {
            if (result.oList.length == 0) {
                $('#Delivery').val('1');
                $('#Shipping').val('1');
                $('#DealerFee').val('1');
                $('#StorageFee').val('1');
                $('#LoadingFee').val('1');
                $('#LateFee').val('1');
                $('#Insurance').val('1');
                $('#AddService').val('1');
                $('#OtherCost1').val('1');
                $('#OtherCost2').val('1');
                $('#OtherCost3').val('1');
                $('#OtherCost4').val('1');
            }
            else {
                getslno(result.oList);
            }
        }
    });
}

function changeitems9() {
    var srlno = {};
    srlno.DeptId = $('#dept9').val();

    $.ajax({
        type: "POST",
        url: "../Company/CompanyItemSlNoGetandGets",
        data: srlno,
        success: function (result) {
            if (result.oList.length == 0) {
                $('#DCompanyName').val('');
                $('#DAddress').val('');
                $('#DPhoneNo').val('');
                $('#DEmail').val('');
                $('#DFax').val('');
                $('#DTRNNo').val('');
            }
            else {
                getslno(result.oList);
            }
        }
    });
}

function loadfunctions() {
    var data7 = {};
    data7.BusinessTypeId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/BusinessTypeGetandGets",
        data: data7,
        success: function (result) {
            BusinessTypeLoad(result.oList);

        }
    });
    var data5 = {};
    data5.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data: data5,
        success: function (result) {
            CurrencyLoad(result.oList);

        }
    });

    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGetandGets",
        data: data,
        success: function (result) {
            AreaLoad(result.oList);

        }
    });


    var data2 = {};
    data2.TaxId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TaxGetandGets",
        data: data2,
        success: function (result) {
            TaxLoad(result.oList);


        }
    });

    GetPrintDefault();

}

function GetPrintDefault() {
    
    var data = {};
    data.BillType = 'Sales';
    data.PrintType = '';
    data.Id = 1;
    data.DeptId = $('#dept').val();
    $.ajax({
        type: "POST",
        url: "../Company/PrintTypeGets",
        data: data,
        success: function (result) {
            PrintDefaultTypeGets(result.oList, 'SalesPrint');


        }
    });

    var data = {};
    data.BillType = 'SalesReturn';
    data.PrintType = '';
    data.Id = 1;
    data.DeptId = $('#dept').val();
    $.ajax({
        type: "POST",
        url: "../Company/PrintTypeGets",
        data: data,
        success: function (result) {
            PrintDefaultTypeGets(result.oList, 'SalesReturnPrint');


        }
    });

    var data = {};
    data.BillType = 'LabBill';
    data.PrintType = '';
    data.Id = 1;
    data.DeptId = $('#dept').val();
    $.ajax({
        type: "POST",
        url: "../Company/PrintTypeGets",
        data: data,
        success: function (result) {
            PrintDefaultTypeGets(result.oList, 'LabBillPrint');


        }
    });

    var data = {};
    data.BillType = 'IPBill';
    data.PrintType = '';
    data.Id = 1;
    data.DeptId = $('#dept').val();
    $.ajax({
        type: "POST",
        url: "../Company/PrintTypeGets",
        data: data,
        success: function (result) {
            PrintDefaultTypeGets(result.oList, 'IPBillPrint');


        }
    });

    var data = {};
    data.BillType = 'Discharge';
    data.PrintType = '';
    data.Id = 1;
    data.DeptId = $('#dept').val();
    $.ajax({
        type: "POST",
        url: "../Company/PrintTypeGets",
        data: data,
        success: function (result) {
            PrintDefaultTypeGets(result.oList, 'DischargePrint');
        }
    });

    var data = {};
    data.BillType = 'Voucher';
    data.PrintType = '';
    data.Id = 1;
    data.DeptId = $('#dept').val();
    $.ajax({
        type: "POST",
        url: "../Company/PrintTypeGets",
        data: data,
        success: function (result) {
            PrintDefaultTypeGets(result.oList, 'VoucherPrint');


        }
    });

    var data = {};
    data.BillType = 'Quotation';
    data.PrintType = '';
    data.Id = 1;
    data.DeptId = $('#dept').val();
    $.ajax({
        type: "POST",
        url: "../Company/PrintTypeGets",
        data: data,
        success: function (result) {
            PrintDefaultTypeGets(result.oList, 'QuotationPrint');


        }
    });

    var data = {};
    data.BillType = 'COLOUR';
    data.PrintType = '';
    data.Id = 1;
    data.DeptId = $('#dept').val();
    $.ajax({
        type: "POST",
        url: "../Company/PrintTypeGets",
        data: data,
        success: function (result) {
          
            if (result.oList.length > 0) {
                var Colour = result.oList[0].PrintFormat
                var PrintColour = Colour.split('#')
                $('#PrintColor').val(PrintColour[1]);
                $('#PrintColor').css("background-color", Colour);
                $('#PrintColor').css("color", 'white');
            }
            


        }
    });

}


$(function () {

    GetRows(1);
    Defaultfocus();
    serialnoload(); 
    GetDepartment1(0);
    GetDepartment2(0);
    GetDepartment3(0);
    GetDepartment4(0);
    GetDepartment5(0);
    GetDepartment9(0);
    $("#salesorder,#QUOT,#CENQ,#purchinvno,#purchaseEnq,#purchorderno,#mrvno,#salesreturnno,#purchreturnno,#prodno,#stocktransin,#stocktransout,#matissueno,#matreceivedno,#matreqno,#jv,#rv,#pv,#dv,#cv,#cn,#dn,#ct,#tv,#av,#openingv,#Invopv,#PurchasenonInv,#SalesnonInv,#InvStockTransfer,#PDCPTV,#delorder,#pc,#pkl,#BatchSlno,#MRVPurchase,#PVTNo,#StockAdjNo,#PurchaseImportNo,#ContainerImportNo,#BOQNo,#OpenStockEntryNo,#LocationTransferNo,#PackingHistoryNo,#ElectronicsProductionNo,#ContraNo,#PettyCashPrint,#PurchasePerforma,#DailyTnNo,#ContractNo,#ToolsManagementNo,#ProjectMaterialReturnNo,#PackingListNo,#customer,#supplier,#pdcr,#pdci,#cash,#bank,#expenses,#Delivery,#Shipping,#DealerFee,#StorageFee,#LoadingFee,#LateFee,#Insurance,#AddService,#OtherCost1,#OtherCost2,#OtherCost3,#OtherCost4,#DPhoneNo").keypress(function (e) {

        if (e.which != 8 && e.which != 0 && e.which != 40 && e.which != 41 && e.which != 45 && e.which != 32 && e.which != 43 && e.which != 44 && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only', 'salesorder', 'QUOT', 'CENQ', 'purchinvno', 'purchaseEnq', 'purchorderno', 'mrvno', 'salesreturnno', 'purchreturnno', 'prodno', 'stocktransin', 'stocktransout', 'matissueno', 'matreceivedno', 'matreqno', 'jv', 'rv', 'pv', 'dv', 'cv', 'cn', 'dn', 'ct', 'tv', 'av', 'openingv', 'Invopv', 'PurchasenonInv', 'SalesnonInv', 'InvStockTransfer', 'PDCPTV', 'delorder', 'pc', 'pkl', 'BatchSlno', 'MRVPurchase', 'PVTNo', 'StockAdjNo', 'PurchaseImportNo', 'ContainerImportNo', 'BOQNo', 'OpenStockEntryNo', 'LocationTransferNo', 'PackingHistoryNo', 'ElectronicsProductionNo', 'ContraNo', 'PettyCashPrint', 'PurchasePerforma', 'DailyTnNo', 'ContractNo', 'ToolsManagementNo', 'ProjectMaterialReturnNo', 'PackingListNo', 'customer', 'supplier', 'pdcr', 'pdci', 'cash', 'bank', 'expenses', 'Delivery', 'Shipping', 'DealerFee', 'StorageFee', 'LoadingFee', 'LateFee', 'Insurance', 'AddService', 'OtherCost1', 'OtherCost2', 'OtherCost3', 'OtherCost4', 'DPhoneNo')
            return false;
        }

    });
 
    $("#fax,#DFax").keypress(function (e) {

        if (e.which != 8 && e.which != 0 && e.which != 40 && e.which != 41 && e.which != 45 && e.which != 32 && e.which != 43 && e.which != 44 && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only', 'fax', 'DFax')
            return false;
        }

    });
    $("#decimal").keypress(function (e) {

        if (e.which != 8 && e.which != 0 && e.which != 40 && e.which != 41 && e.which != 45 && e.which != 32 && e.which != 43 && e.which != 44 && (e.which < 48 || e.which > 51)) {
            warningshow('Digits Only', 'decimal')
            return false;
        }

    });

    $("#email,#DEmail").keypress(function (e) {
        
        if (e.which == 37) {  //Avoid %
            warningshow('Not Allowed', 'email', 'DEmail')
            return false;
        }

    });
  
    $("#companyname,#DCompanyName").keypress(function (e) {

        if (e.which == 37) {  //Avoid %
            warningshow('Not Allowed','companyname','DCompanyName')
            return false;
        }

    });
    $("#companycode").keypress(function (e) {

        if (e.which == 37) {  //Avoid %
            warningshow('Not Allowed', 'companycode')
            return false;
        }

    });

    $("#address,#DAddress").keypress(function (e) {

        if (e.which == 37) {   //Avoid %
            warningshow('Not Allowed', 'address', 'DAddress')
            return false;
        }

    });

    $("#btnsubmit").click(function (e) {
       if ($('#email').val() != "") {
        var Email = $('#email').val();
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        if (!re.test(Email)) {
            warningshow('Invalid Email ID', 'email')
            return false
        }
        SaveAndUpdate(1)
       }
       else {
           warningshow('Invalid Email ID', 'email')
       }
    });

    $("#btnsubmit9").click(function (e) {
        if ($('#DEmail').val() != "") {
            var Email = $('#DEmail').val();
            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
            if (!re.test(Email)) {
                warningshow('Invalid Email ID', 'DEmail')
                return false;
            }
        }
    });
    $("#btnsubmit9").click(function (e) {
        SaveAndUpdate9(1);
    });
    $("#btnsubmit2").click(function (e) {
        SaveAndUpdate2(1)
    });

    $("#btnsubmit3").click(function (e) {
        SaveAndUpdate3(1)
    });

    $("#btnsubmit4").click(function (e) {
        SaveAndUpdate4(1)
    });
    $("#btnsubmit5").click(function (e) {
        SaveAndUpdate5(1)
    });
    $("#btnsubmit6").click(function (e) {
        SaveAndUpdate6(1)
    });
    $("#btnsubmit7").click(function (e) {
        SaveAndUpdate(1)
    });
   
    $("#btnsubmit10").click(function (e) {
        SaveAndUpdatePrint();
    });

    $("#btnsubmit11").click(function (e) {
        SaveAndUpdate11(1);
    });

    $("#phonenum").keypress(function (e) {

        if (e.which != 8 && e.which != 0 && e.which != 40 && e.which != 41 && e.which != 45 && e.which != 32 && e.which != 43 && e.which != 44 && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only', 'phonenum')
            return false;
        }

    });

    $('#fromdate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $('#todate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 12, new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $('#protdate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });


    $('#salesaccount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#SalesAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'salesaccount');
                $('#salesaccount').select();
            }
            else { $('#purchaseaccount').focus(); }
        }
        else {
            $('#SalesAccCode').val(0);
        }
    });
    $('#purchaseaccount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#PurchaseAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'purchaseaccount');
                $('#purchaseaccount').select();
            }
            else { $('#salesreturnaccount').focus(); }
        }
        else {
            $('#PurchaseAccCode').val(0);
        }
    });
    $('#salesreturnaccount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#SalesReturnTaxAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'salesreturnaccount');
                $('#salesreturnaccount').select();
            }
            else { $('#purchasereturnaccount').focus(); }
        }
        else {
            $('#SalesReturnTaxAccCode').val(0);
        }
    });
    $('#purchasereturnaccount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#PurchaseReturnTaxAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'purchasereturnaccount');
                $('#purchasereturnaccount').select();
            }
            else { $('#expenseaccount').focus(); }
        }
        else {
            $('#PurchaseReturnTaxAccCode').val(0);
        }
    });
    $('#expenseaccount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#ExpenseTaxAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'expenseaccount');
                $('#expenseaccount').select();
            }
            else { $('#importpurchasetax').focus(); }
        }
        else {
            $('#ExpenseTaxAccCode').val(0);
        }
    });
   





    $('#Delivery').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#DeliveryAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'Delivery');
                $('#Delivery').select();
            }
            else { $('#Shipping').focus(); }
        }
        else {
            $('#DeliveryAccCode').val(0);
        }
    });
    $('#Shipping').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#ShippingAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'Shipping');
                $('#Shipping').select();
            }
            else { $('#DealerFee').focus(); }
        }
        else {
            $('#ShippingAccCode').val(0);
        }
    });
    $('#DealerFee').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#DealerFeeAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'DealerFee');
                $('#DealerFee').select();
            }
            else { $('#StorageFee').focus(); }
        }
        else {
            $('#DealerFeeAccCode').val(0);
        }
    });
    $('#StorageFee').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#StorageFeeAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'StorageFee');
                $('#StorageFee').select();
            }
            else { $('#LoadingFee').focus(); }
        }
        else {
            $('#StorageFeeAccCode').val(0);
        }
    });

    $('#LoadingFee').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#LoadingFeeAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'LoadingFee');
                $('#LoadingFee').select();
            }
            else { $('#LateFee').focus(); }
        }
        else {
            $('#LoadingFeeAccCode').val(0);
        }
    });

    $('#LateFee').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#LateFeeAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'LateFee');
                $('#LateFee').select();
            }
            else { $('#Insurance').focus(); }
        }
        else {
            $('#LateFeeAccCode').val(0);
        }
    });
    $('#Insurance').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#InsuranceAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'Insurance');
                $('#Insurance').select();
            }
            else { $('#AddService').focus(); }
        }
        else {
            $('#InsuranceAccCode').val(0);
        }
    });

    $('#AddService').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#AddServiceAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'AddService');
                $('#AddService').select();
            }
            else { $('#OtherCost1').focus(); }
        }
        else {
            $('#AddServiceAccCode').val(0);
        }
    });

    $('#OtherCost1').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#OtherCost1AccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'OtherCost1');
                $('#OtherCost1').select();
            }
            else { $('#OtherCost2').focus(); }
        }
        else {
            $('#OtherCost1AccCode').val(0);
        }
    });


    $('#OtherCost2').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#OtherCost2AccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'OtherCost2');
                $('#OtherCost2').select();
            }
            else { $('#OtherCost3').focus(); }
        }
        else {
            $('#OtherCost2AccCode').val(0);
        }
    });

    $('#OtherCost3').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#OtherCost3AccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'OtherCost3');
                $('#OtherCost3').select();
            }
            else { $('#OtherCost4').focus(); }
        }
        else {
            $('#OtherCost3AccCode').val(0);
        }
    });

    $('#OtherCost4').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#OtherCost4AccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'OtherCost4');
                $('#OtherCost4').select();
            }
            else { $('#dept5').focus(); }
        }
        else {
            $('#OtherCost4AccCode').val(0);
        }
    });



    $('#glcash').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#CashAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'glcash');
                $('#glcash').select();
            }
            else { $('#glbank').focus(); }
        }
        else {
            $('#CashAccCode').val(0);
        }
    });
    $('#glbank').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#BankAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'glbank');
                $('#glbank').select();
            }
            else { $('#cashsale').focus(); }
        }
        else {
            $('#BankAccCode').val(0);
        }
    });
    $('#cashsale').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#CashSaleAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'cashsale');
                $('#cashsale').select();
            }
            else { $('#creditsale').focus(); }
        }
        else {
            $('#CashSaleAccCode').val(0);
        }
    });
    $('#creditsale').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#CreditSaleAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'creditsale');
                $('#creditsale').select();
            }
            else { $('#creditcard').focus(); }
        }
        else {
            $('#CreditSaleAccCode').val(0);
        }
    });
    $('#creditcard').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#CreditCardAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'creditcard');
                $('#creditcard').select();
            }
            else { $('#cashcust').focus(); }
        }
        else {
            $('#CreditCardAccCode').val(0);
        }
    });
    $('#cashcust').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#CashCustomerAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'cashcust');
                $('#cashcust').select();
            }
            else { $('#cosac').focus(); }
        }
        else {
            $('#CashCustomerAccCode').val(0);
        }
    });
    $('#cosac').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#COSAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'cosac');
                $('#cosac').select();
            }
            else { $('#pcntrlac').focus(); }
        }
        else {
            $('#COSAccCode').val(0);
        }
    });
    $('#pcntrlac').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#PCAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'pcntrlac');
                $('#pcntrlac').select();
            }
            else { $('#purchlocal').focus(); }
        }
        else {
            $('#PCAccCode').val(0);
        }
    });
    $('#purchlocal').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#PLAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'purchlocal');
                $('#purchlocal').select();
            }
            else { $('#purchimport').focus(); }
        }
        else {
            $('#PLAccCode').val(0);
        }
      });
      
    $('#purchimport').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#PIAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'purchimport');
                  $('#purchimport').select();
              }
              else { $('#sreturnac').focus(); }
          }
          else {
              $('#PIAccCode').val(0);
          }
      });
    $('#sreturnac').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#SRAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'sreturnac');
                  $('#sreturnac').select();
              }
              else { $('#preturnac').focus(); }
          }
          else {
              $('#SRAccCode').val(0);
          }
      });
    $('#preturnac').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#PRAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'preturnac');
                  $('#preturnac').select();
              }
              else { $('#discountac').focus(); }
          }
          else {
              $('#PRAccCode').val(0);
          }
      });
    $('#discountac').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#DiscountAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'discountac');
                  $('#discountac').select();
              }
              else { $('#pdcrcvd').focus(); }
          }
          else {
              $('#DiscountAccCode').val(0);
          }
      });
    $('#pdcrcvd').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#PDCRAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'pdcrcvd');
                  $('#pdcrcvd').select();
              }
              else { $('#pdcissd').focus(); }
          }
          else {
              $('#PDCRAccCode').val(0);
          }
      });
    $('#pdcissd').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#PDCIAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'pdcissd');
                  $('#pdcissd').select();
              }
              else { $('#stroutdr').focus(); }
          }
          else {
              $('#PDCIAccCode').val(0);
          }
      });
    $('#stroutdr').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#STODAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'stroutdr');
                  $('#stroutdr').select();
              }
              else { $('#stroutcr').focus(); }
          }
          else {
              $('#STODAccCode').val(0);
          }
      });
    $('#stroutcr').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#STOCAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'stroutcr');
                  $('#stroutcr').select();
              }
              else { $('#strindr').focus(); }
          }
          else {
              $('#STOCAccCode').val(0);
          }
      });
    $('#strindr').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#STIDAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'strindr');
                  $('#strindr').select();
              }
              else { $('#strincr').focus(); }
          }
          else {
              $('#STIDAccCode').val(0);
          }
      });
    $('#strincr').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#STICAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'strincr');
                  $('#strincr').select();
              }
              else { $('#scntrolac').focus(); }
          }
          else {
              $('#STICAccCode').val(0);
          }
      });
    $('#scntrolac').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#SCAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'scntrolac');
                  $('#scntrolac').select();
              }
              else { $('#sih').focus(); }
          }
          else {
              $('#SCAccCode').val(0);
          }
      });
    $('#sih').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#SIHAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'sih');
                  $('#sih').select();
              }
              else { $('#salpac').focus(); }
          }
          else {
              $('#SIHAccCode').val(0);
          }
      });
    $('#salpac').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#SPAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'salpac');
                  $('#salpac').select();
              }
              else { $('#chequeac').focus(); }
          }
          else {
              $('#SPAccCode').val(0);
          }
      });
    $('#chequeac').keydown(function (e) {
       var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
       if (key == 13) {
           e.preventDefault();
           if ($('#ChequeAccCode').val() == '0') {
               warningshow('Please Enter Valid Account', 'chequeac');
               $('#chequeac').select();
           }
           else { $('#othercost').focus(); }
       }
       else {
           $('#ChequeAccCode').val(0);
       }
   });
    $('#othercost').keydown(function (e) {
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          if (key == 13) {
              e.preventDefault();
              if ($('#OCAccCode').val() == '0') {
                  warningshow('Please Enter Valid Account', 'othercost');
                  $('#othercost').select();
              }
              else { $('#roundoff').focus(); }
          }
          else {
              $('#OCAccCode').val(0);
          }
    });
    $('#roundoff').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#roundoffAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'roundoff');
                $('#roundoff').select();
            }
            else { $('#vccaccount').focus(); }
        }
        else {
            $('#roundoffAccCode').val(0);
        }
    });
    $('#vccaccount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#vccaccountAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'vccaccount');
                $('#vccaccount').select();
            }
            else { $('#pettycashaccount').focus(); }
        }
        else {
            $('#vccaccountAccCode').val(0);
        }
    });
    $('#pettycashaccount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#pettycashaccountAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'pettycashaccount');
                $('#pettycashaccount').select();
            }
            else { $('#locationtransferaccount').focus(); }
        }
        else {
            $('#pettycashaccountAccCode').val(0);
        }
    });
    $('#locationtransferaccount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#locationtransferaccountAccCode').val() == '0') {
                warningshow('Please Enter Valid Account', 'locationtransferaccount');
                $('#locationtransferaccount').select();
            }
            else { $('#btnsubmit4').focus(); }
        }
        else {
            $('#locationtransferaccountAccCode').val(0);
        }
    });
    
});



function Defaultfocus() {
    $('#companycode').focus();

}


function SaveAndUpdate(Flag) {
   
    if ($('#companycode').val() == "") {
        warningshow('Please Enter Company Code', 'companycode');
    }
    else if ($('#companyname').val() == "") {
        warningshow('Please Enter Company Name', 'companyname');
    }
    else if ($('#currency').val() == 0 || $('#currency').val() == '' || $('#currency').val() == undefined) {
        warningshow('Please Select Base Currency', 'currency');
    }

    else {
        var data = {};   //array)
        data.CmpnyId = $('#CmpnyId').val();
        data.CompanyCode = $('#companycode').val();
        data.CompanyName = $('#companyname').val();
        data.Address = $('#address').val();
        data.PhoneNo = $('#phonenum').val();
        data.Email = $('#email').val();
        data.Fax = $('#fax').val();
        data.PeriodFrom = $('#fromdate').val();
        data.PeriodTo = $('#todate').val();
        data.ProtectionDate = $('#protdate').val();
        data.CurrencyId = $('#currency').val();
        data.Decimals = $('#decimal').val();
        data.TRNNo = $('#TRNNo').val();
        data.Area = $('#area').val();
        data.BusinessType = $('#businesstype').val();
        data.BankName = $('#CompanyBank').val();
        data.AccountNo = $('#AccountNo').val();
        data.IBANNo = $('#IBANNo').val();
        data.SwiftCode = $('#SwiftCode').val();
        data.PurchaseSlnoType = $('#PurchaseSlno').val();
        data.MRVType = $('#MRVType').val();
        data.PostingAllowCmpny = $('#PostingAllow').val();
        data.AutoLocationTransfer = $('#AutoLocationTransfer').val();
        data.PurchaseOrderApproval = $('#PurchaseOrderApproval').val();
        data.WorkAfterSales = $('#WorkAfterSales').val();
        data.DelFlag = Flag;
        data.SalesBillSeries = $('#SalesBillSeries').val();
        data.TaxType = $('#TaxType').val();
        data.IPTaxZero = $('#IPTaxZero').val();
        $.ajax({
            type: "POST",
            url: "../Company/CompanyDetailsInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var CmpnyId = result.oList[0].CmpnyId;
                    if (status == 1|| status==2) {
                        fnImageSave(CmpnyId);
                       
                    }
                    Showalerts(status);
                }
            }
        });

    }

}
       

function SaveAndUpdate2(Flag) {
   
    if ($('#salesorder').val() == 0 || $('#salesorder').val() == '')
    {
        warningshow('Please Enter Valid Data', 'salesorder');
        $('#salesorder').select();
    }
    else if ($('#QUOT').val() == 0 || $('#QUOT').val() == '') {
        warningshow('Please Enter Valid Data', 'QUOT');
        $('#QUOT').select();
    }
    else if ($('#CENQ').val() == 0 || $('#CENQ').val() == '') {
        warningshow('Please Enter Valid Data', 'CENQ');
        $('#CENQ').select(); 
    }
    else if ($('#purchinvno').val() == 0 || $('#purchinvno').val() == '') {
        warningshow('Please Enter Valid Data', 'purchinvno');
        $('#purchinvno').select();
    }
    else if ($('#BatchSlno').val() == 0 || $('#BatchSlno').val() == '') {
        warningshow('Please Enter Valid Data', 'BatchSlno');
        $('#BatchSlno').select();
    }
    else if ($('#purchaseEnq').val() == 0 || $('#purchaseEnq').val() == '') {
        warningshow('Please Enter Valid Data', 'purchaseEnq');
        $('#purchaseEnq').select();
    }
    else if ($('#purchorderno').val() == 0 || $('#purchorderno').val() == '') {
        warningshow('Please Enter Valid Data', 'purchorderno');
        $('#purchorderno').select();
    }
    else if ($('#mrvno').val() == 0 || $('#mrvno').val() == '') {
        warningshow('Please Enter Batch Number', 'mrvno');
        $('#mrvno').select();
    }
    else if ($('#salesreturnno').val() == 0 || $('#salesreturnno').val() == '') {
        warningshow('Please Enter Valid Data', 'salesreturnno');
        $('#salesreturnno').select();
    }
    else if ($('#purchreturnno').val() == 0 || $('#purchreturnno').val() == '') {
        warningshow('Please Enter Valid Data', 'purchreturnno');
        $('#purchreturnno').select();
    } 
    else if ($('#prodno').val() == 0 || $('#prodno').val() == '') {
        warningshow('Please Enter Valid Data', 'prodno');
        $('#prodno').select(); 
    }
    else if ($('#stocktransin').val() == 0 || $('#stocktransin').val() == '') {
        warningshow('Please Enter Valid Data', 'stocktransin');
        $('#stocktransin').select();
    }
    else if ($('#stocktransout').val() == 0 || $('#stocktransout').val() == '') {
        warningshow('Please Enter Valid Data', 'stocktransout');
        $('#stocktransout').select(); 
    }
    else if ($('#matissueno').val() == 0 || $('#matissueno').val() == '') {
        warningshow('Please Enter Valid Data', 'matissueno');
        $('#matissueno').select();       
    }
    else if ($('#matreceivedno').val() == 0 || $('#matreceivedno').val() == '') {
        warningshow('Please Enter Valid Datar', 'matreceivedno');
        $('#matreceivedno').select();
    }
    else if ($('#matreqno').val() == 0 || $('#matreqno').val() == '') {
        warningshow('Please Enter Valid Datar', 'matreqno');
        $('#matreqno').select();
    }
    else if ($('#jv').val() == 0 || $('#jv').val() == '') {
        warningshow('Please Enter Valid Data', 'jv');
        $('#jv').select(); 
    }
    else if ($('#rv').val() == 0 || $('#rv').val() == '') {
        warningshow('Please Enter Valid Data', 'rv');
        $('#rv').select();
    }
    else if ($('#pv').val() == 0 || $('#pv').val() == '') {
        warningshow('Please Enter Valid Data', 'pv');
        $('#pv').select();
    }
    else if ($('#dv').val() == 0 || $('#dv').val() == '') {
        warningshow('Please Enter Valid Data', 'dv');
        $('#dv').select();
    }
    else if ($('#cv').val() == 0 || $('#cv').val() == '') {
        warningshow('Please Enter Valid Data', 'cv');
        $('#cv').select();
    }
    else if ($('#cn').val() == 0 || $('#cn').val() == '') {
        warningshow('Please Enter Valid Data', 'cn'); 
        $('#cn').select();
    }
    else if ($('#dn').val() == 0 || $('#dn').val() == '') {
        warningshow('Please Enter Valid Data', 'dn');
        $('#dn').select();
    }
    else if ($('#ct').val() == 0 || $('#ct').val() == '') {
        warningshow('Please Enter Valid Data', 'ct');
        $('#ct').select();
    }
    else if ($('#tv').val() == 0 || $('#tv').val() == '') {
        warningshow('Please Enter Valid Data', 'tv');
        $('#tv').select();
    }
    else if ($('#av').val() == 0 || $('#av').val() == '') {
        warningshow('Please Enter Valid Data', 'av');
        $('#av').select();
    }
    else if ($('#openingv').val() == 0 || $('#openingv').val() == '') {
        warningshow('Please Enter Valid Data', 'openingv');
        $('#openingv').select();
    }
    else if ($('#Invopv').val() == 0 || $('#Invopv').val() == '') {
        warningshow('Please Enter Valid Data', 'Invopv');
        $('#Invopv').select();
    }
    else if ($('#PurchasenonInv').val() == 0 || $('#PurchasenonInv').val() == '') {
        warningshow('Please Enter Valid Data', 'PurchasenonInv');
        $('#PurchasenonInv').select();
    }
    else if ($('#SalesnonInv').val() == 0 || $('#SalesnonInv').val() == '') {
        warningshow('Please Enter Valid Data', 'SalesnonInv');
        $('#SalesnonInv').select();
    }
    else if ($('#InvStockTransfer').val() == 0 || $('#InvStockTransfer').val() == '') {
        warningshow('Please Enter Valid Data', 'InvStockTransfer');
        $('#InvStockTransfer').select();
    }
    else if ($('#PDCPTV').val() == 0 || $('#PDCPTV').val() == '') {
        warningshow('Please Enter Valid Data', 'PDCPTV');
        $('#PDCPTV').select();
    }

    else if ($('#delorder').val() == 0 || $('#delorder').val() == '') {
        warningshow('Please Enter Valid Data', 'delorder');
        $('#delorder').select();
    }
    else if ($('#pc').val() == 0 || $('#pc').val() == '') {
        warningshow('Please Enter Valid Data', 'pc');
        $('#pc').select(); 
    }
    else if ($('#pkl').val() == 0 || $('#pkl').val() == '') {
        warningshow('Please Enter Valid Data', 'pkl'); 
        $('#pkl').select();
    }
    else if ($('#MRVPurchase').val() == 0 || $('#MRVPurchase').val() == '') {
        warningshow('Please Enter Valid Data', 'MRVPurchase');
        $('#MRVPurchase').select();
    }
    else if ($('#PVTNo').val() == 0 || $('#PVTNo').val() == '') {
        warningshow('Please Enter Valid Data', 'PVTNo');
        $('#PVTNo').select();
    }

    else if ($('#StockAdjNo').val() == 0 || $('#StockAdjNo').val() == '') {
        warningshow('Please Enter Valid Data', 'StockAdjNo');
        $('#StockAdjNo').select();
    }

    else if ($('#StockAdjNo').val() == 0 || $('#StockAdjNo').val() == '') {
        warningshow('Please Enter Valid Data', 'StockAdjNo');
        $('#StockAdjNo').select();
    }
    else if ($('#PurchaseImportNo').val() == 0 || $('#PurchaseImportNo').val() == '') {
        warningshow('Please Enter Valid Data', 'PurchaseImportNo');
        $('#PurchaseImportNo').select();
    }
    else if ($('#ContainerImportNo').val() == 0 || $('#ContainerImportNo').val() == '') {
        warningshow('Please Enter Valid Data', 'ContainerImportNo');
        $('#ContainerImportNo').select();
    }
    else if ($('#BOQNo').val() == 0 || $('#BOQNo').val() == '') {
        warningshow('Please Enter Valid Data', 'BOQNo'); 
        $('#BOQNo').select();
    }
    else if ($('#OpenStockEntryNo').val() == 0 || $('#OpenStockEntryNo').val() == '') {
        warningshow('Please Enter Valid Data', 'OpenStockEntryNo');
        $('#OpenStockEntryNo').select();
    }
    else if ($('#LocationTransferNo').val() == 0 || $('#LocationTransferNo').val() == '') {
        warningshow('Please Enter Valid Data', 'LocationTransferNo');
        $('#LocationTransferNo').select();
    }
    else if ($('#PackingHistoryNo').val() == 0 || $('#PackingHistoryNo').val() == '') {
        warningshow('Please Enter Valid Data', 'PackingHistoryNo');
        $('#PackingHistoryNo').select();
    }
    else if ($('#ElectronicsProductionNo').val() == 0 || $('#ElectronicsProductionNo').val() == '') {
        warningshow('Please Enter Valid Data', 'ElectronicsProductionNo');
        $('#ElectronicsProductionNo').select();
    }
    else if ($('#ContraNo').val() == 0 || $('#ContraNo').val() == '') {
        warningshow('Please Enter Valid Data', 'ContraNo');
        $('#ContraNo').select();
    }
    else if ($('#PettyCashPrint').val() == 0 || $('#PettyCashPrint').val() == '') {
        warningshow('Please Enter Valid Data', 'PettyCashPrint');
        $('#PettyCashPrint').select();
    }
    else if ($('#PurchasePerforma').val() == 0 || $('#PurchasePerforma').val() == '') {
        warningshow('Please Enter Valid Data', 'PurchasePerforma');
        $('#PurchasePerforma').select();
    }
    else if ($('#DailyTnNo').val() == 0 || $('#DailyTnNo').val() == '') {
        warningshow('Please Enter Valid Data', 'DailyTnNo');
        $('#DailyTnNo').select();
    }
    else if ($('#ContractNo').val() == 0 || $('#ContractNo').val() == '') {
        warningshow('Please Enter Valid Data', 'ContractNo');
        $('#ContractNo').select();
    }
    else if ($('#ToolsManagementNo').val() == 0 || $('#ToolsManagementNo').val() == '') {
        warningshow('Please Enter Valid Data', 'ToolsManagementNo');
        $('#ToolsManagementNo').select();
    }
    //else if ($('#ProjectMaterialReturnNo').val() == 0 || $('#ProjectMaterialReturnNo').val() == '') {
    //    warningshow('Please Enter Valid Data', 'ProjectMaterialReturnNo');
    //    $('#ProjectMaterialReturnNo').select();
    //}
    //else if ($('#PackingListNo').val() == 0 || $('#PackingListNo').val() == '') {
    //    warningshow('Please Enter Valid Data', 'PackingListNo');
    //    $('#PackingListNo').select();
    //}
    
    else {
     var data = {};
    data.CompanyId = $('#CompanyId').val();
    data.DeptId = $('#dept').val();
    data.SalesOrder = $('#salesorder').val();
    data.Quot = $('#QUOT').val();
    data.CENQ = $('#CENQ').val();
    data.PurchaseNum = $('#purchinvno').val();
    data.BatchaSlno = $('#BatchSlno').val();
    data.PurchaseEnquiry = $('#purchaseEnq').val();
    data.PurchOrder = $('#purchorderno').val();
    data.MRVNUM = $('#mrvno').val();
    data.SRNo = $('#salesreturnno').val();
    data.PRNo = $('#purchreturnno').val();
    data.ProductionNum = $('#prodno').val();
    data.StockTransferIn = $('#stocktransin').val();
    data.StockTransferOut = $('#stocktransout').val();
    data.MI = $('#matissueno').val();
    data.MReceived = $('#matreceivedno').val();
    data.MRequistion = $('#matreqno').val();
    data.JV = $('#jv').val();
    data.RV = $('#rv').val();
    data.PV = $('#pv').val();
    data.DV = $('#dv').val();
    data.CV = $('#cv').val();
    data.CNV = $('#cn').val();
    data.DNV = $('#dn').val();
    data.ChequeTransfer = $('#ct').val();
    data.TV = $('#tv').val();
    data.AV = $('#av').val();
    data.OP = $('#openingv').val();
    data.IONo = $('#Invopv').val();
    data.SNNo = $('#SalesnonInv').val();
    data.IINo = $('#InvStockTransfer').val();
    data.CBNo = $('#PDCPTV').val();
    data.PNNo = $('#PurchasenonInv').val();
    data.DeliveryOrder = $('#delorder').val();
    data.PC = $('#pc').val();
    data.PKL = $('#pkl').val();
    data.MRVPurchase = $('#MRVPurchase').val();
    data.PVTNo = $('#PVTNo').val();
    data.StockAdjNo = $('#StockAdjNo').val();
    data.PurchaseImportNo = $('#PurchaseImportNo').val();
    data.ContainerImportNo = $('#ContainerImportNo').val();
    data.BOQNo = $('#BOQNo').val();
    data.OpenStockEntryNo = $('#OpenStockEntryNo').val();
    data.LocationTransferNo = $('#LocationTransferNo').val();
    data.PackingHistoryNo = $('#PackingHistoryNo').val();
    data.ElectronicsProductionNo = $('#ElectronicsProductionNo').val();
    data.ContraNo = $('#ContraNo').val();
    data.PettyCashPrint = $('#PettyCashPrint').val();
    data.PurchasePerforma = $('#PurchasePerforma').val();
    data.DailyTnNo = $('#DailyTnNo').val();
    data.ContractNo = $('#ContractNo').val();
    data.ToolsManagementNo = $('#ToolsManagementNo').val();
    data.ProjectMaterialReturnNo = $('#ProjectMaterialReturnNo').val();
    data.PackingListNo = $('#PackingListNo').val();
    data.DelFlag = Flag;
    $.ajax({
        type: "POST",
        url: "../Company/CompanyDetailsInsertandUpdate2",
        data: data,
        success: function (result) {
            for (var i = 0; i <= result.oList.length; i++) {
                var status = result.oList[i].Status;
                Showalerts2(status);
            }
        }
    });
}
}



    
function SaveAndUpdate3(Flag) {
    if ($('#customer').val() == 0 || $('#customer').val() == '') {
        warningshow('Please Enter Valid Data', 'customer');
        $('#customer').select();
    }
    else if ($('#supplier').val() == 0 || $('#supplier').val() == '') {
        warningshow('Please Enter Valid Data', 'supplier');
        $('#supplier').select();
    }
    else if ($('#pdcr').val() == 0 || $('#pdcr').val() == '') {
        warningshow('Please Enter Valid Data', 'pdcr');
        $('#pdcr').select();
    }
    else if ($('#pdci').val() == 0 || $('#pdci').val() == '') {
        warningshow('Please Enter Valid Data', 'pdci');
        $('#pdci').select();
    }
    else if ($('#cash').val() == 0 || $('#cash').val() == '') {
        warningshow('Please Enter Valid Data', 'cash');
        $('#cash').select();
    }
    else if ($('#bank').val() == 0 || $('#bank').val() == '') {
        warningshow('Please Enter Valid Data', 'bank');
        $('#bank').select();
    }
    else if ($('#expenses').val() == 0 || $('#expenses').val() == '') {
        warningshow('Please Enter Valid Data', 'expenses');
        $('#expenses').select();
    }
    else {
        var data = {};
        data.CompanyId = $('#CompanyId').val();
        data.DeptId = $('#dept2').val();
        data.CustomerId = $('#customer').val();
        data.SupplierId = $('#supplier').val();
        data.PDCR = $('#pdcr').val();
        data.PDCI = $('#pdci').val();
        data.Cash = $('#cash').val();
        data.BankId = $('#bank').val();
        data.Expenses = $('#expenses').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Company/CompanyDetailsInsertandUpdate3",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts3(status);
                }
            }
        });
    }
}
function SaveAndUpdate4(Flag) {
    if ($('#glcash').val() == 0 || $('#glcash').val() == '') {
        warningshow('Please Enter Valid Data', 'glcash');
        $('#glcash').select();
    }
    else if ($('#glbank').val() == 0 || $('#glbank').val() == '') {
        warningshow('Please Enter Valid Data', 'glbank');
        $('#glbank').select();
    }
    else if ($('#cashsale').val() == 0 || $('#cashsale').val() == '') {
        warningshow('Please Enter Valid Data', 'cashsale');
        $('#cashsale').select();
    }
    else if ($('#creditsale').val() == 0 || $('#creditsale').val() == '') {
        warningshow('Please Enter Valid Data', 'creditsale');
        $('#creditsale').select();
    }
    else if ($('#creditcard').val() == 0 || $('#creditcard').val() == '') {
        warningshow('Please Enter Valid Data', 'creditcard');
        $('#creditcard').select();
    }
    else if ($('#cashcust').val() == 0 || $('#cashcust').val() == '') {
        warningshow('Please Enter Valid Data', 'cashcust');
        $('#cashcust').select();
    }
    else if ($('#cosac').val() == 0 || $('#cosac').val() == '') {
        warningshow('Please Enter Valid Data', 'cosac');
        $('#cosac').select();
    }
    else if ($('#pcntrlac').val() == 0 || $('#pcntrlac').val() == '') {
        warningshow('Please Enter Valid Data', 'pcntrlac');
        $('#pcntrlac').select();
    }

    else if ($('#purchlocal').val() == 0 || $('#purchlocal').val() == '') {
        warningshow('Please Enter Valid Data', 'purchlocal');
        $('#purchlocal').select();
    }
    else if ($('#purchimport').val() == 0 || $('#purchimport').val() == '') {
        warningshow('Please Enter Valid Data', 'purchimport');
        $('#purchimport').select();
    }
    else if ($('#sreturnac').val() == 0 || $('#sreturnac').val() == '') {
        warningshow('Please Enter Valid Data', 'sreturnac');
        $('#sreturnac').select();
    }
    else if ($('#preturnac').val() == 0 || $('#preturnac').val() == '') {
        warningshow('Please Enter Valid Data', 'preturnac');
        $('#preturnac').select();
    }
    else if ($('#discountac').val() == 0 || $('#discountac').val() == '') {
        warningshow('Please Enter Valid Data', 'discountac');
        $('#discountac').select();
    }
    else if ($('#pdcrcvd').val() == 0 || $('#pdcrcvd').val() == '') {
        warningshow('Please Enter Valid Data', 'pdcrcvd');
        $('#pdcrcvd').select();
    }
    else if ($('#pdcissd').val() == 0 || $('#pdcissd').val() == '') {
        warningshow('Please Enter Valid Data', 'pdcissd');
        $('#pdcissd').select();
    }
    else if ($('#stroutdr').val() == 0 || $('#stroutdr').val() == '') {
        warningshow('Please Enter Valid Data', 'stroutdr');
        $('#stroutdr').select();
    }
    else if ($('#stroutcr').val() == 0 || $('#stroutcr').val() == '') {
        warningshow('Please Enter Valid Data', 'stroutcr');
        $('#stroutcr').select();
    }
    else if ($('#strindr').val() == 0 || $('#strindr').val() == '') {
        warningshow('Please Enter Valid Data', 'strindr');
        $('#strindr').select();
    }
    else if ($('#strincr').val() == 0 || $('#strincr').val() == '') {
        warningshow('Please Enter Valid Data', 'strincr');
        $('#strincr').select();
    }
    //else if ($('#scntrolac').val() == 0 || $('#scntrolac').val() == '') {
    //    warningshow('Please Enter Valid Data', 'scntrolac');
    //    $('#scntrolac').select();
    //}
    else if ($('#sih').val() == 0 || $('#sih').val() == '') {
        warningshow('Please Enter Valid Data', 'sih');
        $('#sih').select();
    }
    else if ($('#salpac').val() == 0 || $('#salpac').val() == '') {
        warningshow('Please Enter Valid Data', 'salpac');
        $('#salpac').select();
    }
    //else if ($('#chequeac').val() == 0 || $('#chequeac').val() == '') {
    //    warningshow('Please Enter Valid Data', 'chequeac');
    //    $('#chequeac').select();
    //}
    else if ($('#othercost').val() == 0 || $('#othercost').val() == '') {
        warningshow('Please Enter Valid Data', 'othercost');
        $('#othercost').select();
    }
    else if ($('#roundoff').val() == 0 || $('#roundoff').val() == '') {
        warningshow('Please Enter Valid Data', 'roundoff');
        $('#roundoff').select();
    }
    else if ($('#roundoff').val() == 0 || $('#roundoff').val() == '') {
        warningshow('Please Enter Valid Data', 'roundoff');
        $('#roundoff').select();
    }
    else if ($('#pettycashaccount').val() == 0 || $('#pettycashaccount').val() == '') {
        warningshow('Please Enter Valid Data', 'pettycashaccount');
        $('#pettycashaccount').select();
    }
    else {
        var data = {};
        data.CompanyId = $('#CompanyId').val();
        data.DeptId = $('#dept3').val();
        data.GICash = $('#glcash').val();
        data.GIBank = $('#glbank').val();
        data.CashSale = $('#cashsale').val();
        data.CreditSale = $('#creditsale').val();
        data.CreditCard = $('#creditcard').val();
        data.CashCust = $('#cashcust').val();
        data.COGSAC = $('#cosac').val();
        data.PControlAC = $('#pcntrlac').val();
        data.PurchaseLocal = $('#purchlocal').val();
        data.PurcahseImport = $('#purchimport').val();
        data.SReturnAC = $('#sreturnac').val();
        data.PReturnAC = $('#preturnac').val();
        data.DiscountAC = $('#discountac').val();
        data.PDCReceived = $('#pdcrcvd').val();
        data.PDCIssued = $('#pdcissd').val();
        data.STrOutDr = $('#stroutdr').val();
        data.STrOutCr = $('#stroutcr').val();
        data.STrInDr = $('#strindr').val();
        data.STrInCr = $('#strincr').val();
        data.StockControlAC = $('#scntrolac').val();
        data.StockInHand = $('#sih').val();
        data.SalPayableAC = $('#salpac').val();
        data.ChequeAC = $('#chequeac').val();
        data.OtherCost = $('#othercost').val();
        data.Roundoff = $('#roundoff').val();        
        data.PettyCashAccount = $('#pettycashaccount').val();       
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Company/CompanyDetailsInsertandUpdate4",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts4(status);
                }
            }
        });
    }
}



function SaveAndUpdate5(Flag) {
    if ($('#salesaccount').val() == 0 || $('#salesaccount').val() == '') {
        warningshow('Please Enter Valid Data', 'salesaccount');
        $('#salesaccount').select();
    }
    else if ($('#purchaseaccount').val() == 0 || $('#purchaseaccount').val() == '') {
        warningshow('Please Enter Valid Data', 'purchaseaccount');
        $('#purchaseaccount').select();
    }
    else if ($('#salesreturnaccount').val() == 0 || $('#salesreturnaccount').val() == '') {
        warningshow('Please Enter Valid Data', 'salesreturnaccount');
        $('#salesreturnaccount').select();
    }
    else if ($('#purchasereturnaccount').val() == 0 || $('#purchasereturnaccount').val() == '') {
        warningshow('Please Enter Valid Data', 'purchasereturnaccount');
        $('#purchasereturnaccount').select();
    }
    else if ($('#expenseaccount').val() == 0 || $('#expenseaccount').val() == '') {
        warningshow('Please Enter Valid Data', 'expenseaccount');
        $('#expenseaccount').select();
    }
    else {
        console.log('5')
        var data = {};
        data.CompanyId = $('#CompanyId').val();
        data.DeptId = $('#dept4').val();
        data.SalesAccount = $('#salesaccount').val();
        data.PurchaseAccount = $('#purchaseaccount').val();
        data.SalesReturnAccount = $('#salesreturnaccount').val();
        data.PurchaseReturnAccount = $('#purchasereturnaccount').val();
        data.ExpenseAccount = $('#expenseaccount').val();
        data.ImportPurchaseAccount = $('#importpurchasetax').val();
        data.ExportSalesTax = $('#ExportSalesTax').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Company/CompanyDetailsInsertandUpdate5",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts5(status);
                }
            }
        });
    }
}


function SaveAndUpdate6(Flag) {
    if ($('#Delivery').val() == 0 || $('#Delivery').val() == '') {
        warningshow('Please Enter Valid Data', 'Delivery');
        $('#Delivery').select();
    }
    else if ($('#Shipping').val() == 0 || $('#Shipping').val() == '') {
        warningshow('Please Enter Valid Data', 'Shipping');
        $('#Shipping').select();
    }
    else if ($('#DealerFee').val() == 0 || $('#DealerFee').val() == '') {
        warningshow('Please Enter Valid Data', 'DealerFee');
        $('#DealerFee').select();
    }
    else if ($('#StorageFee').val() == 0 || $('#StorageFee').val() == '') {
        warningshow('Please Enter Valid Data', 'StorageFee');
        $('#StorageFee').select();
    }
    else if ($('#LoadingFee').val() == 0 || $('#LoadingFee').val() == '') {
        warningshow('Please Enter Valid Data', 'LoadingFee');
        $('#LoadingFee').select();
    }
    else if ($('#LateFee').val() == 0 || $('#LateFee').val() == '') {
        warningshow('Please Enter Valid Data', 'LateFee');
        $('#LateFee').select();
    }
    else if ($('#Insurance').val() == 0 || $('#Insurance').val() == '') {
        warningshow('Please Enter Valid Data', 'Insurance');
        $('#Insurance').select();
    }
    else if ($('#AddService').val() == 0 || $('#AddService').val() == '') {
        warningshow('Please Enter Valid Data', 'AddService');
        $('#AddService').select();
    }
    else if ($('#OtherCost1').val() == 0 || $('#OtherCost1').val() == '') {
        warningshow('Please Enter Valid Data', 'OtherCost1');
        $('#OtherCost1').select();
    }
    else if ($('#OtherCost2').val() == 0 || $('#OtherCost2').val() == '') {
        warningshow('Please Enter Valid Data', 'OtherCost2');
        $('#OtherCost2').select();
    }
    else if ($('#OtherCost3').val() == 0 || $('#OtherCost3').val() == '') {
        warningshow('Please Enter Valid Data', 'v');
        $('#OtherCost3').select();
    }
    else if ($('#OtherCost4').val() == 0 || $('#OtherCost4').val() == '') {
        warningshow('Please Enter Valid Data', 'OtherCost4');
        $('#OtherCost4').select();
    }
    else if ($('#vccaccount').val() == 0 || $('#vccaccount').val() == '') {
        warningshow('Please Enter Valid Data', 'vccaccount');
        $('#vccaccount').select();
    }
    else if ($('#locationtransferaccount').val() == 0 || $('#locationtransferaccount').val() == '') {
        warningshow('Please Enter Valid Data', 'locationtransferaccount');
        $('#locationtransferaccount').select();
    }



    else {
        var data = {};
        data.CompanyId = $('#CompanyId').val();
        data.DeptId = $('#dept5').val();
        data.Delivery = $('#Delivery').val();
        data.Shipping = $('#Shipping').val();
        data.DealerFee = $('#DealerFee').val();
        data.StorageFee = $('#StorageFee').val();
        data.LoadingFee = $('#LoadingFee').val();
        data.LateFee = $('#LateFee').val();
        data.Insurance = $('#Insurance').val();
        data.AdditionalService = $('#AddService').val();
        data.OtherCost1 = $('#OtherCost1').val();
        data.OtherCost2 = $('#OtherCost2').val();
        data.OtherCost3 = $('#OtherCost3').val();
        data.OtherCost4 = $('#OtherCost4').val();
        data.VCCAccount = $('#vccaccount').val();
        data.LocationTransferAccount = $('#locationtransferaccount').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Company/CompanyDetailsInsertandUpdate6",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts6(status);
                }
            }
        });
    }
}


function SaveAndUpdate9(Flag) {
    if ($('#DCompanyName').val() == '') {
        warningshow('Please Enter CompanyName', 'DCompanyName');
        $('#DCompanyName').select();
    }

    else {
        var data = {};
        data.CompanyId = $('#CompanyId').val();
        data.DeptId = $('#dept9').val();
        data.DCompanyname = $('#DCompanyName').val();
        data.DAddress = $('#DAddress').val();
        data.DPhoneNo = $('#DPhoneNo').val();
        data.DEmail = $('#DEmail').val();
        data.DFax = $('#DFax').val();
        data.DTRNNo = $('#DTRNNo').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Company/CompanyDetailsInsertandUpdate9",
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


function SaveAndUpdate11(Flag) {
   
    if ($('#BillNo').val() == 0 || $('#BillNo').val() == '') {
        warningshow('Please Enter Valid Data', 'BillNo');
        $('#BillNo').select();
    }   
    else if ($('#RevisitNo').val() == 0 || $('#RevisitNo').val() == '') {
        warningshow('Please Enter Valid Data', 'RevisitNo');
        $('#RevisitNo').select();
    }
    else if ($('#IPNo').val() == 0 || $('#IPNo').val() == '') {
        warningshow('Please Enter Valid Data', 'IPNo');
        $('#IPNo').select();
    }
   else if ($('#LabBillAccount').val() == 0 || $('#LabBillAccount').val() == '') {
        warningshow('Please Enter Valid Data', 'LabBillAccount');
        $('#LabBillAccount').select();
    }
    else {
      
        var data = {};
        data.CompanyId = $('#CompanyId').val();
        data.DeptId = $('#dept').val();
        data.LabAccount = $('#LabBillAccount').val();
        data.RevisitNo = $('#RevisitNo').val();
        data.IPNo = $('#IPNo').val();
        data.BillNo = $('#BillNo').val();
        $.ajax({
            type: "POST",
            url: "../Company/HMS_CompanyDetailsInsertandUpdate4", 
            data: data,
            success: function (result) {
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts5(status);
                }
            }
        });
    }
}


function formrefresh() {
    serialnoload();
    $('#companycode').val('');
    $('#companyname').val('');
    $('#address').val('');
    $('#phonenum').val('');
    $('#email').val('');
    $('#fax').val('');
    //$('#fromdate').val(CurDate);
    //$('#todate').val(CurDate);
   // $('#protdate').val(CurDate);
     $('#currency').val('');
     $('#decimal').val('');
     $('#TRNNo').val('');
     $('#area').val('');
     $('#businesstype').val('');
     $('#CompanyBank').val('');
     $('#AccountNo').val('');
     $('#IBANNo').val('');
     $('#SwiftCode').val('');
     $('#PurchaseSlno').val('');
     $('#MRVType').val('');
     $('#PostingAllow').val('');
     $('#SalesBillSeries').val('');
     $('#AutoLocationTransfer').val('');
     $('#PurchaseOrderApproval').val('');
     $('#WorkAfterSales').val('');
     //$('#PrintColor').val('');
     $('#btndelete').hide();
     var d = new Date();
     $('#myImg').attr('src', "../app-assets/img/CompanyLogo.png?" + d.getTime());
    $('#LogoImage').val('');
    $('#companycode').focus();
    //$('#CmpnyId').val(0);
    $('#Warningpopup').fadeOut();
    $('.swal-button swal-button--confirm').focus();
    GetRows(1);
}

function refresh() {
    serialnoload();

   // $('#dept').val('1');
    $('#salesorder').val('');
    $('#QUOT').val('');
    $('#CENQ').val('');
    $('#purchinvno').val('');
    $('#BatchSlno').val('');
    $('#purchaseEnq').val('');
    $('#purchorderno').val('');
    $('#mrvno').val('');
    $('#salesreturnno').val('');
    $('#purchreturnno').val('');
    $('#prodno').val('');
    $('#stocktransin').val('');
    $('#stocktransout').val('');
    $('#matissueno').val('');
    $('#matreceivedno').val('');
    $('#matreqno').val('');
    $('#jv').val('');
    $('#rv').val('');
    $('#pv').val('');
    $('#dv').val('');
    $('#cv').val('');
    $('#cn').val('');
    $('#dn').val('');
    $('#ct').val('');
    $('#tv').val('');
    $('#av').val('');
    $('#openingv').val('');
    $('#Invopv').val('');
    $('#PurchasenonInv').val('');
    $('#SalesnonInv').val('');
    $('#InvStockTransfer').val('');
    $('#PDCPTV').val('');
    $('#delorder').val('');
    $('#pc').val('');
    $('#pkl').val('');
    $('#pkl').val('');
    $('#MRVPurchase').val('');
    $('#PVTNo').val('');
    $('#StockAdjNo').val('');
    $('#PurchaseImportNo').val('');
    $('#ContainerImportNo').val('');
    $('#BOQNo').val('');
    $('#OpenStockEntryNo').val('');
    $('#LocationTransferNo').val('');
    $('#PackingHistoryNo').val('');
    $('#ElectronicsProductionNo').val('');
    $('#ContraNo').val('');
    $('#PettyCashPrint').val('');
    $('#PurchasePerforma').val('');
    $('#DailyTnNo').val('');
    $('#ContractNo').val('');
    $('#ToolsManagementNo').val('');
    $('#ProjectMaterialReturnNo').val('');
    $('#PackingListNo').val('');
    $('#CompanyId').val(0);
    $('#Warningpopup').fadeOut();
    $('.swal-button swal-button--confirm').focus();
    $("#tab1").click();
}
function refresh2() {
    serialnoload();
 //   $('#dept2').val('1');
    $('#customer').val('');
    $('#supplier').val('');
    $('#pdcr').val('');
    $('#pdci').val('');
    $('#cash').val('');
    $('#bank').val('');
    $('#expenses').val('');
    $('#CompanyId').val(0);
    $('#Warningpopup').fadeOut();
    $('.swal-button swal-button--confirm').focus();
    $("#tab1").click();
}
function refresh3() {
    serialnoload();
    //$('#dept3').val('1');
    $('#glcash').val('');
    $('#glbank').val('');
    $('#cashsale').val('');
    $('#creditsale').val('');
    $('#creditcard').val('');
    $('#cashcust').val('');
    $('#cosac').val('');
    $('#pcntrlac').val('');
    $('#purchlocal').val('');
    $('#purchimport').val('');
    $('#sreturnac').val('');
    $('#preturnac').val('');
    $('#discountac').val('');
    $('#pdcrcvd').val('');
    $('#pdcissd').val('');
    $('#stroutdr').val('');
    $('#stroutcr').val('');
    $('#strindr').val('');
    $('#strincr').val('');
    $('#scntrolac').val('');
    $('#sih').val('');
    $('#salpac').val('');
    $('#chequeac').val('');
    $('#othercost').val('');
    $('#roundoff').val('');
    $('#vccaccount').val('');
    $('#pettycashaccount').val('');
    $('#locationtransferaccount').val('');
    $('#companycode').focus();
    $('#CompanyId').val(0);
    $('#Warningpopup').fadeOut();
    $('.swal-button swal-button--confirm').focus();
    $("#tab1").click();
}

function formrefresh5()
{
    serialnoload();
 //   $('#dept4').val('1');
    $('#salesaccount').val('');
    //$('#SalesAccCode').val(0);
    $('#purchaseaccount').val('');
    //$('#PurchaseAccCode').val(0);
    $('#salesreturnaccount').val('');
    //$('#SalesReturnTaxAccCode').val(0);
    $('#purchasereturnaccount').val('');
    //$('#PurchaseReturnTaxAccCode').val(0);
    $('#expenseaccount').val('');
    //$('#ExpenseTaxAccCode').val(0);
    $('#importpurchasetax').val('');
    $('#ExportSalesTax').val('');
    $('#companycode').focus();
    $('#CompanyId').val(0);
    $('#Warningpopup').fadeOut();
    $('.swal-button swal-button--confirm').focus();
    $("#tab1").click();
}


function formrefresh6() {
    serialnoload();

    $('#Delivery').val('');
    $('#Shipping').val('');
    $('#DealerFee').val('');
    $('#StorageFee').val('');
    $('#LoadingFee').val('');
    $('#LateFee').val('');
    $('#Insurance').val('');
    $('#AddService').val('');
    $('#OtherCost1').val('');
    $('#OtherCost2').val('');
    $('#OtherCost3').val('');
    $('#OtherCost4').val('');
    $('#companycode').focus();
    $('#CompanyId').val(0);
    $('#Warningpopup').fadeOut();
    $('.swal-button swal-button--confirm').focus();
    $("#tab1").click();
}
function formrefresh9() {
    serialnoload();

    $('#DCompanyName').val('');
    $('#DAddress').val('');
    $('#DPhoneNo').val('');
    $('#DEmail').val('');
    $('#DFax').val('');
    $('#DTRNNo').val('');
    $('#CompanyId').val(0);
    $('#Warningpopup').fadeOut();
    $('.swal-button swal-button--confirm').focus();
    $("#tab1").click();
}
function serialnoload() {
    var srlno = {};
    srlno.DeptId = 1;

    $.ajax({
        type: "POST",
        url: "../Company/CompanyItemSlNoGetandGets",
        data: srlno,
        success: function (result) {

            getslno(result.oList);
         
        }
    });

   
    GetSlnum(0);
}

function GetSlnum(flg)
{
    var DepId;
    if (flg == 0)
        DepId = 1;
    else if (flg == 1) 
        DepId = $("#dept").val();
    var srln = {};
    if (flg == 0)
        srln.DeptId = 1;
    else
        srln.DeptId = DepId;
    $.ajax({
        type: "POST",
        url: "../Company/CompanyItemSlNoGetandGetsNew",
        data: srln,
        success: function (result) {
            HMSgetslno(result.oList);
        }
    });
}

function HMSgetslno(result) {
    var rsl = '';
    if (result.length == 0) { rsl = 1; }

    $('#CompanyId').val(rsl);
    $('#dept').val(rsl);
    $('#LabBillAccount').val(rsl);
    $('#RevisitNo').val(rsl);
    $('#IPNo').val(rsl);
    $('#BillNo').val(rsl);

    for (var k = 0; k < result.length; k++) {
        $('#CompanyId').val(result[k].CompanyId);
        $('#dept').val(result[k].DeptId);
        $('#LabBillAccount').val(result[k].LabAccount);
        $('#RevisitNo').val(result[k].RevisitNo);
        $('#IPNo').val(result[k].IPNo);
        $('#BillNo').val(result[k].BillNo);       
    }
}


function getslno(result) {
    for (var k = 0; k < result.length; k++) {

        $('#CompanyId').val(result[k].CompanyId);
            $('#dept').val(result[k].DeptId);
            $('#salesorder').val(result[k].SalesOrder);
            $('#QUOT').val(result[k].Quot);
            $('#CENQ').val(result[k].CENQ);
            $('#purchinvno').val(result[k].PurchaseNum);
            $('#BatchSlno').val(result[k].BatchaSlno);
            $('#mrvno').val(result[k].MRVNUM);
            $('#salesreturnno').val(result[k].SRNo);
            $('#purchreturnno').val(result[k].PRNo);
            $('#purchaseEnq').val(result[k].PurchaseEnquiry);
            $('#purchorderno').val(result[k].PurchOrder);
            $('#prodno').val(result[k].ProductionNum);
            $('#stocktransin').val(result[k].StockTransferIn);
            $('#stocktransout').val(result[k].StockTransferOut);
            $('#matissueno').val(result[k].MI);
            $('#matreceivedno').val(result[k].MReceived);
            $('#matreqno').val(result[k].MRequistion);
            $('#jv').val(result[k].JV);
            $('#rv').val(result[k].RV);
            $('#pv').val(result[k].PV);
            $('#dv').val(result[k].DV);
            $('#cv').val(result[k].CV);
            $('#cn').val(result[k].CNV);
            $('#dn').val(result[k].DNV);
            $('#ct').val(result[k].ChequeTransfer);
            $('#tv').val(result[k].TV);
            $('#av').val(result[k].AV);
            $('#openingv').val(result[k].OP);
            $('#Invopv').val(result[k].IONo);
            $('#PurchasenonInv').val(result[k].PNNo);
            $('#SalesnonInv').val(result[k].SNNo);
            $('#InvStockTransfer').val(result[k].IINo);
            $('#PDCPTV').val(result[k].CBNo);
            $('#delorder').val(result[k].DeliveryOrder);
            $('#pc').val(result[k].PC);
            $('#pkl').val(result[k].PKL);
            $('#MRVPurchase').val(result[k].MRVPurchase);
            $('#PVTNo').val(result[k].PVTNo);
            $('#StockAdjNo').val(result[k].StockAdjNo);
            $('#PurchaseImportNo').val(result[k].PurchaseImportNo);
            $('#ContainerImportNo').val(result[k].ContainerImportNo);
            $('#BOQNo').val(result[k].BOQNo);
            $('#OpenStockEntryNo').val(result[k].OpenStockEntryNo);
            $('#LocationTransferNo').val(result[k].LocationTransferNo);
            $('#PackingHistoryNo').val(result[k].PackingHistoryNo);
            $('#ElectronicsProductionNo').val(result[k].ElectronicsProductionNo);
            $('#ContraNo').val(result[k].ContraNo);
            $('#PettyCashPrint').val(result[k].PettyCashPrint);
            $('#PurchasePerforma').val(result[k].PurchasePerforma);
            $('#DailyTnNo').val(result[k].DailyTnNo);
            $('#ContractNo').val(result[k].ContractNo);
            $('#ToolsManagementNo').val(result[k].ToolsManagementNo);
            $('#ProjectMaterialReturnNo').val(result[k].ProjectMaterialReturnNo);
            $('#PackingListNo').val(result[k].PackingListNo);
            
            $('#dept2').val(result[k].DeptId);
            $('#customer').val(result[k].CustomerId);
            $('#supplier').val(result[k].SupplierId);
            $('#pdcr').val(result[k].PDCR);
            $('#pdci').val(result[k].PDCI);
            $('#cash').val(result[k].Cash);
            $('#bank').val(result[k].BankId);
            $('#expenses').val(result[k].Expenses);

            $('#dept3').val(result[k].DeptId);
            $('#glcash').val(result[k].GICash);
            $('#glbank').val(result[k].GIBank);
            $('#cashsale').val(result[k].CashSale);
            $('#creditsale').val(result[k].CreditSale);
            $('#creditcard').val(result[k].CreditCard);
            $('#cashcust').val(result[k].CashCust);
            $('#cosac').val(result[k].COGSAC);
            $('#pcntrlac').val(result[k].PControlAC);
            $('#purchlocal').val(result[k].PurchaseLocal);
            $('#purchimport').val(result[k].PurcahseImport);
            $('#sreturnac').val(result[k].SReturnAC);
            $('#preturnac').val(result[k].PReturnAC);
            $('#discountac').val(result[k].DiscountAC);
            $('#pdcrcvd').val(result[k].PDCReceived);
            $('#pdcissd').val(result[k].PDCIssued);
            $('#stroutdr').val(result[k].STrOutDr);
            $('#stroutcr').val(result[k].STrOutCr);
            $('#strindr').val(result[k].STrInDr);
            $('#strincr').val(result[k].STrInCr);
            $('#scntrolac').val(result[k].StockControlAC);
            $('#sih').val(result[k].StockInHand);
            $('#salpac').val(result[k].SalPayableAC);
            $('#chequeac').val(result[k].ChequeAC);
            $('#othercost').val(result[k].OtherCost);
            $('#roundoff').val(result[k].Roundoff);
            $('#vccaccount').val(result[k].VCCAccount);
            $('#pettycashaccount').val(result[k].PettyCashAccount);
            $('#locationtransferaccount').val(result[k].LocationTransferAccount);
            
            $('#dept4').val(result[k].DeptId);
            $('#salesaccount').val(result[k].SalesAccount);
            $('#purchaseaccount').val(result[k].PurchaseAccount);
            $('#salesreturnaccount').val(result[k].SalesReturnAccount);
            $('#purchasereturnaccount').val(result[k].PurchaseReturnAccount);
            $('#expenseaccount').val(result[k].ExpenseAccount);
            $('#importpurchasetax').val(result[k].ImportPurchaseAccount);
            $('#ExportSalesTax').val(result[k].ExportSalesTax);
            

            $('#dept5').val(result[k].DeptId);
            $('#Delivery').val(result[k].Delivery);
            $('#Shipping').val(result[k].Shipping);
            $('#DealerFee').val(result[k].DealerFee);
            $('#StorageFee').val(result[k].StorageFee);
            $('#LoadingFee').val(result[k].LoadingFee);
            $('#LateFee').val(result[k].LateFee);
            $('#Insurance').val(result[k].Insurance);
            $('#AddService').val(result[k].AdditionalService);
            $('#OtherCost1').val(result[k].OtherCost1);
            $('#OtherCost2').val(result[k].OtherCost2);
            $('#OtherCost3').val(result[k].OtherCost3);
            $('#OtherCost4').val(result[k].OtherCost4);


            $('#dept9').val(result[k].DeptId);
            $('#DCompanyName').val(result[k].DCompanyName);
            $('#DAddress').val(result[k].DAddress);
            $('#DPhoneNo').val(result[k].DPhoneNo);
            $('#DEmail').val(result[k].DEmail);
            $('#DFax').val(result[k].DFax);
            $('#DTRNNo').val(result[k].DTRNNo);
        }    
}
function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
       formrefresh();
    refresh();
    refresh2();
    refresh3();
    formrefresh5();
    formrefresh6();
    formrefresh9();
}
    
function ShowCompanylist(result) {
    disable_datatable('tblcompany');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=15px>Slno</th><th>Code</th><th>Name</th><th>Address</th><th>Phone Number</th><th>Email</th><th>Fax</th><th width=15px>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td>' + slno + '</td><td>' + result[i].CompanyCode + '</td><td>' + result[i].CompanyName + '</td><td>' + result[i].Address + '</td><td>' + result[i].PhoneNo + '</td><td>' + result[i].Email + '</td><td>' + result[i].Fax + '</td><td><a onclick="GetRows(' + result[i].CmpnyId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblcompany').html(responseText + '</tbody><tfoot><tr><th>Slno</th><th>Code</th><th>Name</th><th>Address</th><th>Phone Number</th><th>Email</th><th>Fax</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch('tblcompany');
}

function ShowCompanyGet(result) {
    
    for (var i = 0; i < result.length; i++) {
        $('#CmpnyId').val(result[i].CmpnyId)
        $('#companycode').val(result[i].CompanyCode);
        $('#companyname').val(result[i].CompanyName);
        $('#address').val(result[i].Address);
        $('#phonenum').val(result[i].PhoneNo);
        $('#email').val(result[i].Email);
        $('#fax').val(result[i].Fax);
        $('#fromdate').val(result[i].PeriodFrom);
        $('#todate').val(result[i].PeriodTo);
        $('#protdate').val(result[i].ProtectionDate);
        $('#currency').val(result[i].CurrencyId);
        $('#decimal').val(result[i].Decimals);
        $('#TRNNo').val(result[i].TRNNo);
        $('#area').val(result[i].Area);
        $('#businesstype').val(result[i].BusinessType);
        $('#CompanyBank').val(result[i].BankName);
        $('#AccountNo').val(result[i].AccountNo);
        $('#IBANNo').val(result[i].IBANNo);
        $('#SwiftCode').val(result[i].SwiftCode);
        $('#PurchaseSlno').val(result[i].PurchaseSlnoType);
        $('#MRVType').val(result[i].MRVType);
        $('#PostingAllow').val(result[i].PostingAllowCmpny);
        $('#SalesBillSeries').val(result[i].SalesBillSeries);
        $('#AutoLocationTransfer').val(result[i].AutoLocationTransfer);
        $('#PurchaseOrderApproval').val(result[i].PurchaseOrderApproval);
        $('#WorkAfterSales').val(result[i].WorkAfterSales);
        //var Colour = result[i].PrintColor
        $('#TaxType').val(result[i].TaxType); 
        $('#IPTaxZero').val(result[i].IPTaxZero);
        
        var d = new Date();
        $('#myImg').attr('src', "../app-assets/img/CompanyLogo.png?" + d.getTime());
        $('#companycode').focus();

    }
    //var PrintColour = Colour.split('#')
    //$('#PrintColor').val(PrintColour[1]);
    //$('#PrintColor').css("background-color", Colour);
    //$('#PrintColor').css("color", 'white');

    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(CmpnyId) {
    //$('#CmpnyId').val(CmpnyId)
    var data = {};
    data.CmpnyId = CmpnyId;
    $.ajax({
        type: "POST",
        url: "../Company/CompanyDetailsGetandGets",
        data: data,
        success: function (result) {
            if (CmpnyId == 0)
                ShowCompanylist(result.oList);
            else
                ShowCompanyGet(result.oList);

        }
    });

}





    function Addpopupwindow(Id) {
        $("#popupdiv").css("margin-top", '0px');

        $('#detailspopup').hide(); $('#detailspopup').hide();


        $('#popupdiv').show();


        if (Id == 1) {
            $('#myheader').text('System Settings & Control Panel');
            $('#detailspopup').show();
            //$('#txt_code').focus();

        }
        GetPrintDefault();
    }

function fnImageSave(imageName) {

    var formData = new FormData();
    var totalFiles = document.getElementById("LogoImage").files.length;
    var browsedFile = document.getElementById("LogoImage").files[0];
    var ImageId = "0";
    if ((imageName != "" && totalFiles != 0)) {

        if (browsedFile.type.match('image.*')) {
            formData.append("FileUpload", browsedFile);
            formData.append("ImageName", imageName);
            formData.append("UniqueId", ImageId);
            $.ajax({
                type: "POST",
                url: '/Master/UploadCompanyLogo',
                data: formData,
                dataType: "html",
                contentType: false,
                processData: false,
                success: function (result) {
                    var d = new Date();

                    $('#myImg').attr('src', "../app-assets/img/CompanyLogo.png?" + d.getTime());
                    $('#ComapnyImage,#ComapnyImageDashbpard').attr('src', "../app-assets/img/CompanyLogo.png?" + d.getTime());
                }
            });
        }
    }
    else {
        return;
    }
}


$(function () {
    $("#LogoImage").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});



function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
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


}

function Showalerts2(Status) {  
  if(Status == 1) {
      //refresh();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
       
    }
  else if (Status == 2) {
      //refresh();
      swal('Data Updated Successfully', "", "success");
      $('.swal-button swal-button--confirm').focus();

  }


}
function Showalerts3(Status) {  
    if (Status == 1) {
        //refresh2();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 2) {
       // refresh2();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
   


}
function Showalerts4(Status) {  
    if (Status == 1) {
       // refresh3();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 2) {
        //refresh3();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
   

}


function Showalerts5(Status) {
    if (Status == 1) {
       // formrefresh5();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 2) {
        //formrefresh5();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
}

function Showalerts6(Status) {
    if (Status == 1) {
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 2) {
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
}