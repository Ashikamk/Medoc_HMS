function LocationLoad(result, a) {
    $("#select_locn,#select_location0,#locn_job").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
    }
    $("#select_location0,#select_locn,#locn_job").append(LocnSelect);
    //if (a == 0) {
        $('#select_locn').val(UserLocationId);
        $('#select_location0').val(UserLocationId);
        $('#locn_job').val(UserLocationId);
    //}
    //else {
    //    $('#select_locn').val(a);
    //    $('#select_location0').val(a);
    //}
}
var BaseCurrency;
function CurncyLoad(result, a) {
    $("#select_crncy").empty();
    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {
            BaseCurrency = result[i].BaseCurrencyId;
        }
    }
    $("#select_crncy").append("<option value='0'>--Select--</option>");
    document.getElementById("select_crncy").options[0].disabled = true;
    for (var i = 0; i < result.length; i++) {
        $("#select_crncy").append("<option value='" + result[i].Id + "' name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");
    }
    if (a == 0) {
        $('#select_crncy').val(BaseCurrency);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));

    }
    else {
        $('#select_crncy').val(a);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        for (var m = 1; m <= i; m++) {
            amountcalculation(m);
        }
        CalcGrandTotal(i);
    }
}
function UnitLoad(result) {
    $("#select_unit0,#unit_job").empty();
    UnitSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'name='" + result[i].UnitName + "'>" + result[i].UnitName + "</option>";
    }
    $("#select_unit0,#unit_job").append(UnitSelect);
}

//Load Tax for dropdown and Tax Split Table
function TaxLoad(result) {
    $('#tbltaxsplit td').remove();
    var s = 0;
    DefaultTaxArray = [];
    $("#select_tax0,#tax_job").empty();
    TaxSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "' name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>";
        s = i + 1;
        TaxSplitrow = "<tr class='jsgrid-row' id='" + result[i].TaxId + "'>" +
       "<td class='text-center' style='width:auto;width:30%;border:1px solid #BABFC7;'><input type='hidden' id='mtaxid" + s + "' value='" + result[i].TaxId + "'><input type='hidden' id='splitaxrate_" + result[i].TaxId + "' value='" + result[i].TaxRate + "'> " + result[i].TaxName + "</td>" +
       "<td class='text-center' style='width:auto;width:40%;border:1px solid #BABFC7;'><input type='text' disabled style='background-color:white;border:none;height:30px' class='form-control text-center' id='splittaxable_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittaxable_" + result[i].TaxRate + "' value='0.00' /></td>" +
       "<td class='text-center' style='width:auto;width:40%;border:1px solid #BABFC7;'><input type='text' disabled style='background-color:white;border:none;height:30px' class='form-control text-center' id='splittax_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittax_" + result[i].TaxRate + "' value='0.00' /></td>" +
       "</tr>";
        DefaultTaxArray.push(result[i].TaxRate);
        $('#tbltaxsplit').append(TaxSplitrow);
    }
    $("#select_tax0,#tax_job").append(TaxSelect);
    TaxClear();
    $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"));
    $("#txttaxpercent0").val($("#select_tax0").find("option:selected").attr("name"));
}

//Clear Tax values
function TaxClear() {
    for (var j = 0; j <= DefaultTaxArray.length; j++) {
        var k = DefaultTaxArray[j];
        $('#splittaxable_' + k).val('0.00');
        $('#hiddensplittaxable_' + k).val('0.00');
        $('#splittax_' + k).val('0.00');
        $('#hiddensplittax_' + k).val('0.00');
        $('#splittaxable_' + k).prop("disabled", true);
        $('#hiddensplittaxable_' + k).prop("disabled", true);
        $('#splittax_' + k).prop("disabled", true);
        $('#hiddensplittax_' + k).prop("disabled", true);
    }
}

var UserSalesmanId = 0;
function SalesmanLoad(result, a) {
    $("#select_salesman").empty();
    $("#select_salesman").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_salesman").append("<option value='" + result[i].Id + "'>" + result[i].FirstName + "</option>");
        if (result[i].UserId == ERPUserId)
            UserSalesmanId = result[i].Id;
    }
    if (a == 0) {
        $('#select_salesman').val(UserSalesmanId);
    }
    else {
        $('#select_salesman').val(a);
    }
}

var DefaultArea = 0;
function AreaLoad(result, a) {

    $("#select_place").empty();
    $("#select_place").append("<option value='0'>Place Of Supply</option>");
    for (var i = 0; i < result.length; i++) {
        if (result[i].DefaultArea != 0) {
            DefaultArea = result[i].DefaultArea
        }
        $("#select_place").append("<option value='" + result[i].AreaId + "'>" + result[i].AreaName + "</option>");
    }
    if (a == 0) {
        $('#select_place').val(DefaultArea);
    }
    else {
        $('#select_place').val(a);
    }
}
function Billseriesload(result) {
    if (result.length == 0) {
        $("#addacnttype").show();
    }
    else {
        $("#addacnttype").hide();
        Defaultfocus();
    }
    $("#txtBillseriesId").empty();
    for (var i = 0; i < result.length; i++) {
        $("#txtBillseriesId").append("<option value='" + result[i].id + "' name='" + result[i].CurrentNo + "'>" + result[i].BillDescription + "</option>");
    }
    $('#txtBillSlNo').val(result[0].CurrentNo)
    $('#txtBlSlNo').val(result[0].CurrentNo);
    $('#txtBillSlNocopy').val(result[0].CurrentNo)

}
function BillLoad() {

    var data = {};
    data.id = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/BillSeriesSalesReturnGetandGets",
        data: data,
        success: function (result) {
            Billseriesload(result.oList);
        }
    });
} function TermsLoad(result, a) {
    $("#select_terms").empty();
    $("#select_terms").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_terms").append("<option value='" + result[i].TermsId + "' name='" + result[i].Terms + "'>" + result[i].TermsDescription + "</option>");
    }
    if (a == 0) {
        $('#select_terms').val(0);
    }
    else {
        $('#select_terms').val(a);

    }
}

function crncyload(id) {
    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data: data,
        success: function (result) {
            CurncyLoad(result.oList, id);
        }
    });
}
function placeload(id) {
    var data = {};
    data.AreaId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGetandGets",
        data: data,
        success: function (result) {
            AreaLoad(result.oList, id);
        }
    });
}
function LocnLoad(id) {
    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserLocationGetandGets", 
        data: data,
        success: function (result) {
            LocationLoad(result.oList, id);
        }
    });

}
function Salesman(id) {

    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/SalesmanGetandGets",
        data: data,
        success: function (result) {
            SalesmanLoad(result.oList, id);


        }
    });

}
function Terms(id) {
    var data = {};
    data.TermsId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TermsGetandGets",
        data: data,
        success: function (result) {
            TermsLoad(result.oList, id);
        }
    });

}


var Decimal = Decimal;
var editflag = 0;
var i = 1;





$(document).keydown(function (e) {
    //alert(e.keyCode)
    if ((e.altKey && e.keyCode == 83) && (!$("#addacnttype").is(":visible"))) {                        //Alt+S
        if (copyflag != 1)
            savesalesreturn();
    }
    else if ((e.altKey && e.keyCode == 76) && (!$("#addacnttype").is(":visible"))) {                 //Alt+L        
        if (copyflag != 1)
            GetRows();
    }
    else if ((e.altKey && e.keyCode == 67) && (!$("#addacnttype").is(":visible"))) {                  //Alt+C
        formrefreshconfirm();
    }
    else if (e.keyCode == 27) {
        if (copyflag != 1) {
            productpopuprefresh();

            popuprefresh();

            jobpopuprefresh();
            salestranspopuprefresh();
            CloseEnquiry();

            $('#Revisionpopupdiv,#Revdiv').hide()
        }
    }
    else if ((e.altKey && e.keyCode == 49) && (!$("#addacnttype").is(":visible"))) {                      //Pop Up to Show Sales Transaction Details of Selected Product by pressing Alt+1
        salestranspopuprefresh();
        if ($("#TransPrdtId0").val() != 0) {
            var data = {};
            data.ProductId = $("#TransPrdtId0").val();
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: '../SalesInvoice/SalesTransGetandGets',
                data: data,
                success: function (result) {
                    productpopuprefresh();
                    $('#salestranspopupdiv').show();
                    var ProductDesc = $('#ProductDesc0').val();
                    var product = $('#txtproduct0').val();
                    $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - Transaction Details');
                    $('#salestransdiv').show();
                    $('#txtquantity0').focus();
                    SalesTransLoad(result.oList);
                }
            });
        }

    }
});

//Pop Up for Sales Transactions
function SalesTransLoad(result) {
    console.log(result.length)
    $('#pdtrowcnt').val(result.length);
    for (var n = 0; n <= result.length; n++) {
        $('#pdctrow' + n).remove();
    }
    for (var n = 0; n < result.length; n++) {

        var ProdRow = "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
        "<td > " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
        "<td >" + result[n].InvDate + "                                   </td>" +
        "<td >" + result[n].CustName + "                                   </td>" +
        "<td >" + result[n].ProdQty + "                                   </td>" +
        "<td >" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
        "<td >" + result[n].UnitName + "                                   </td>" +

        "</tr>";

        $('#tblsalestrans').append(ProdRow);

    }
}

//Close Transaction Popup
function salestranspopuprefresh() {
    var pdtrowcnt = $('#pdtrowcnt').val();
    for (var n = 0; n <= pdtrowcnt; n++) {
        $('#pdctrow' + n).remove();
    }
    $('#salestranspopupdiv').hide();
    $('#salestransdiv').hide();
    $('#salesheader').text('Transaction Details')
}


//Save Sales Invoice
function savesalesreturn() {

    var r = parseFloat($('#txtcrncyrate').val());
    $("#txtcrncyrate").val(isNaN(r) ? 0 : r);
    var rowcount = CountRows();
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else if (copyflag == 1) {
        return false;
    }
    else if ($("#select_payterms").val() == 0) {
        warningshow('Please Select Payment Type', 'select_payterms');
    }
    else if ($.trim($("#txtcustomer").val()) == '') {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    else if (($("#txtCustId").val() == 0) && ($("#select_payterms").val() == 2)) {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    else if ($('#select_salesman').val() == 0) {
        warningshow('Please Select Sales Man', 'select_salesman');
    }
    else if ($('#select_place').val() == 0) {
        warningshow('Please Select Place', 'select_place');
    }
    else if ($('#select_crncy').val() == 0 || $('#select_crncy').val() == null) {
        warningshow('Please Select Currency', 'select_crncy');
    }
    else if ($.trim($('#txtcrncyrate').val()) == '' || $.trim($('#txtcrncyrate').val()) == 0) {
        warningshow('Enter Currency Rate', 'txtcrncyrate');
        $('#txtcrncyrate').select();
    }
    else if (($('#select_jobno').val() != '') && ($('#ProjectJobId').val() == 0)) {
        warningshow('Please Select A Valid Job', 'select_jobno');
    }
    else if (rowcount == 0) {
        warningshow('No Products Added!', 'txtproduct0');
    }
    else {
        $('#btnsubmit').prop('disabled', true);
        var gamt = $('#FcGrandTotal').val();
        var gntamt = Math.round(gamt);
        var roundgndtotal = 0;
        if (gamt > gntamt) {
            roundgndtotal = $('#FcGrandTotal').val() - gntamt;
        }
        else {
            roundgndtotal = gntamt - $('#FcGrandTotal').val();
        }
        $('#roundgndtotal').val(roundgndtotal.toFixed(Decimal));

        var fgamt = $('#GrandTotal').val();
        var fcgntamt = Math.round(fgamt);
        var roundfcgndtotal = 0;
        if (fgamt > fcgntamt) {
            roundfcgndtotal = $('#GrandTotal').val() - fcgntamt;
        }
        else {
            roundfcgndtotal = fcgntamt - $('#GrandTotal').val();
        }
        $('#roundfcgndtotal').val(roundfcgndtotal.toFixed(Decimal));


        var oArray = new Array();
        for (var k = 1; k <= i - 1; k++) {

            var ProductId = $('#PrdtId' + k).val();
            var ProductCode = $('#txtproduct' + k).val();
            var ProductDescr = $('#ProductDesc' + k).val();
            var BillSeries = $('#txtBillseriesId').val();
            var ReturnNo = $('#txtBillSlNo').val();
            var UnitId = $('#select_unit' + k).val();
            var UnitName = $('#select_unit' + k).find("option:selected").attr("name");
            var ProdQty = $('#txtquantity' + k).val();
            var ProdRate = $('#txtfcrate' + k).val();
            var FcProdRate = $('#txtrate' + k).val();
            var ProdDisc = $('#txtfcdiscount' + k).val();
            var FcProdDisc = $('#txtdiscount' + k).val();
            var TaxableAmount = $('#txtfctaxableamnt' + k).val();
            var FCTaxableAmount = $('#txttaxableamnt' + k).val();
            var TaxId = $('#select_tax' + k).val();
            var TaxPercent = $('#txttaxpercent' + k).val();
            var TaxAmount = $('#txtfctaxamnt' + k).val();
            var FCTaxAmount = $('#txttaxamnt' + k).val();
            var Amount = $('#txtfcamnt' + k).val();
            var FCAmount = $('#txtamnt' + k).val();
            var LocnId = $('#select_location' + k).val();
            var BatchSNo = 1;
            var Batch = '';
            var PayType = $('#select_payterms').val();
            var LPONumber = ''; 
            var CustId = $('#txtCustId').val();
            var CustName = $('#txtcustomer').val();
            var CustAddress = $('#txtaddress').val();
            var InvDate = $('#txtivdate').val();
            var InvTerms = $('#select_terms').val();
            var DueDate = $('#txtduedate').val();
            var LocId = $('#select_locn').val();
            var SalesManId = $('#select_salesman').val();
            var AreaId = $('#select_place').val();
            var CurrencyId = $('#select_crncy').val();
            var CurrencyRate = $('#txtcrncyrate').val();
            var JobNumber = '';
            var GrandTotal = $('#FcGrandTotal').val();
            var RoundGrandTotal = $('#roundgndtotal').val();
            var FCGrandTotal = $('#GrandTotal').val();
            var RoundFCGrandTotal = $('#roundfcgndtotal').val();
            var TotalDiscount = $('#FcTotalDiscount').val();
            var FCTotalDiscount = $('#TotalDiscount').val();
            var TotalTaxable = $('#FcTotalTaxable').val();
            var FCTotTaxable = $('#TotalTaxable').val();
            var TotalTax = $('#FcTotalTax').val();
            var FCTotTax = $('#TotalTax').val();
            var Remarks = $('#txtmsg').val();
            var DeptId = ERPDeptId;
            var UserId = ERPUserId;
            var DelFlag = 1;
            var BillDiscount = '';
            var AvgCost = $('#AvgCost' + k).val();
            var TotalCost = $('#TotalAvgCost').val();
            var BillSlNo = null;
            var BillSeriesId = null; 

            var Taxable0 = $('#splittaxable_0').val();
            var Tax0 = $('#splittax_0').val();
            var Taxable5 = $('#splittaxable_5').val();
            var Tax5 = $('#splittax_5').val();
            var Taxable12 = $('#splittaxable_12').val();
            var Tax12 = $('#splittax_12').val();
            var Taxable18 = $('#splittaxable_18').val();
            var Tax18 = $('#splittax_18').val();
            var Taxable28 = $('#splittaxable_28').val();
            var Tax28 = $('#splittax_28').val();
            var TaxId1 = $('#mtaxid1').val();
            var TaxId2 = $('#mtaxid2').val();
            var TaxId3 = $('#mtaxid3').val();
            var TaxId4 = $('#mtaxid4').val();
            var TaxId5 = $('#mtaxid5').val();
            var IMEINO = $('#txtproductimei'+k).val();  

            if (ProductCode != undefined) {
                oArray.push({
                    'ProductId': ProductId,
                    'ProductCode': ProductCode,
                    'ProductDescr': ProductDescr,
                    'BillSeries': BillSeries,
                    'ReturnNo': ReturnNo,
                    'UnitId': UnitId,
                    'UnitName': UnitName,
                    'ProdQty': ProdQty,
                    'ProdRate': ProdRate,
                    'FcProdRate': FcProdRate,
                    'ProdDisc': ProdDisc,
                    'FcProdDisc': FcProdDisc,
                    'TaxableAmount': TaxableAmount,
                    'FCTaxableAmount': FCTaxableAmount,
                    'TaxId': TaxId,
                    'TaxPercent': TaxPercent,
                    'TaxAmount': TaxAmount,
                    'FCTaxAmount': FCTaxAmount,
                    'Amount': Amount,
                    'FCAmount': FCAmount,
                    'LocnId': LocnId,
                    'BatchSNo': BatchSNo,
                    'Batch': Batch,
                    'PayType': PayType,
                    'LPONumber': LPONumber,
                    'CustId': CustId,
                    'CustName': CustName,
                    'CustAddress': CustAddress,
                    'InvDate': InvDate,
                    'InvTerms': InvTerms,
                    'DueDate': DueDate,
                    'LocId': LocId,
                    'SalesManId': SalesManId,
                    'AreaId': AreaId,
                    'CurrencyId': CurrencyId,
                    'CurrencyRate': CurrencyRate,
                    'JobNumber': JobNumber,
                    'GrandTotal': GrandTotal,
                    'RoundGrandTotal': RoundGrandTotal,
                    'FCGrandTotal': FCGrandTotal,
                    'RoundFCGrandTotal': RoundFCGrandTotal,
                    'TotalDiscount': TotalDiscount,
                    'FCTotalDiscount': FCTotalDiscount,
                    'TotalTaxable': TotalTaxable,
                    'FCTotTaxable': FCTotTaxable,
                    'TotalTax': TotalTax,
                    'FCTotTax': FCTotTax,
                    'Remarks': Remarks,
                    'DeptId': DeptId,
                    'UserId': UserId,
                    'DelFlag': DelFlag,
                    'BillDiscount': BillDiscount,
                    'AvgCost': AvgCost,
                    'TotalCost': TotalCost,
                    'BillSlNo': BillSlNo,
                    'BillSeriesId': BillSeriesId,

                    'Taxable0': Taxable0,
                    'Tax0': Tax0,
                    'Taxable5': Taxable5,
                    'Tax5': Tax5,
                    'Taxable12': Taxable12,
                    'Tax12': Tax12,
                    'Taxable18': Taxable18,
                    'Tax18': Tax18,
                    'Taxable28': Taxable28,
                    'Tax28': Tax28,
                    'TaxId1': TaxId1,
                    'TaxId2': TaxId2,
                    'TaxId3': TaxId3,
                    'TaxId4': TaxId4,
                    'TaxId5': TaxId5,
                    'IMEINO':IMEINO, 
                })
            }

        }
        if (oArray != "") {

            var data = { 'SalesReturnModel': oArray };
            $.ajax(
        {

            type: "POST",
            url: "../SalesInvoice/SalesReturnMobileInsertandUpdate", 
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var billno = result.oList[i].ReturnNo;
                    $('#ReturnNo').val(result.oList[i].ReturnNo);
                    var billsrs = $('#txtBillseriesId').find("option:selected").text();
                    $('#btnsubmit').prop('disabled', false);
                    Showalerts(status, billsrs, billno);
                    // Tbldelete();                                
                }
            }
        });
        }
    }
}

function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv1').hide();
    $('#savedbillno').val('');
}


//Document Ready
$(document).ready(function () {

    $('.form-control').attr('autocomplete', 'off');
    //$('#btntrnsfr').css("height", '100%');
    //$('#select_transfer').css("height", '100%');
    $('#btnlocn').css("height", '90%');
    $('#select_locn').css("height", '90%');
    $('#btnsales').css("height", '90%');
    $('#select_salesman').css("height", '90%'); 
    //$('#btnsply').css("height", '100%');
    //$('#select_place').css("height", '100%');
    $('#btnterms').css("height", '100%');
    $('#select_terms').css("height", '100%');
    $('#btncrncy').css("height", '100%');
    $('#select_crncy').css("height", '100%');

    crncyload(0);
    placeload(0);
    LocnLoad(0);
    Salesman(0);
 
    BillLoad();
    Terms(0);

    //Print Button Click After Save Bill
    $('#btnok').click(function () { 
        PrintBillSalesMobile(i); 
        alertpopuprefresh();
        formrefresh();
        Tbldelete();
    });

    //Cancel Button Click After Save Bill
    $('#btncnclalrt').click(function () {
        alertpopuprefresh();
        formrefresh();
        Tbldelete();
    });

    $("#btnsubmit").click(function (e) {
        savesalesreturn();
    });

    $("#btnadd").focus(function (e) {
        $("#btnadd").removeClass("btn btn-outline-primary");
        $("#btnadd").addClass("btn btn-primary");
    });

    $("#btnadd").focusout(function () {
        $("#btnadd").removeClass("btn btn-primary");
        $("#btnadd").addClass("btn btn-outline-primary");
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

    $("#btnok").focus(function (e) {
        $("#btnok").removeClass("btn btn-outline-primary");
        $("#btnok").addClass("btn btn-primary");
    });
    $("#btnok").focusout(function (e) {
        $("#btnok").removeClass("btn btn-primary");
        $("#btnok").addClass("btn btn-outline-primary");
    });
    $("#btncnclalrt").focus(function (e) {
        $("#btncnclalrt").removeClass("btn btn-outline-primary");
        $("#btncnclalrt").addClass("btn btn-primary");
    });
    $("#btncnclalrt").focusout(function (e) {
        $("#btncnclalrt").removeClass("btn btn-primary");
        $("#btncnclalrt").addClass("btn btn-outline-primary");
    });

    $("#txtproductimei0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && $("#txtproductimei0").val() == '') {
            e.preventDefault();
            $('#btnadd').focus();
        }
    });

    $("#tax_job").change(function () {
        var selectedValue = $(this).val();
        $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"));
        var x = $('#taxpercentage_job').val();
        CalcJobAmount();
    });


    $('#select_jobno').keypress(function (e) {
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (entrkey == 13) {
            e.preventDefault();
            if (($('#select_jobno').val() != '') && ($('#ProjectJobId').val() == 0)) {
                warningshow('Please Select A Valid Job', 'select_jobno');
                return true;
            }
            else {
                $('#txtproduct0').focus();
            }
        }


    });


    $("#txtproduct0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#PrdtId0').val() != 0) {
                if ($('#select_locn').val() == 0) {
                    warningshow('Press Enter Location', 'select_locn');
                    return false;
                }
               
            }
            else if ($('#PrdtId0').val() == 0 && ($.trim($('#txtproduct0').val()) == 'job' || $.trim($('#txtproduct0').val()) == 'JOB')) {
                addpopupjob(1);
                clearrow();
                $('#productjob').focus();
            }
        }
    });


    $("#productjob").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();

            $('#unit_job').focus();

        }

    });
    $("#unit_job").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#quantity_job').focus();
        }

    });

    $('#quantity_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#txtrate_job").focus();
        }

    });
    $('#txtrate_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#discount_job").focus();
        }

    });
    $('#discount_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#tax_job").focus();
        }

    });
    $('#tax_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnjobsave").focus();
        }

    });



    $('#txt_code,#txt_cname,#txt_rate,#txtname,#select_areagroup,#txtcode,#txtdescription,#LocationName,#LocationCode,#code,#txt_fname,#txt_lname,#txt_amount,#txt_address1,#txt_address2,#txt_address3,#txtdesc').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });

    $('#txt_remark,#txtdescription,#LocationDescription,#txt_contactnumber,#txtterms').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 2).focus();
        }

    });



    $("#txtBillseriesId").change(function () {
        // $('#tour1').hide();
        Tbldelete();
        copyrefresh();
        var selectedValue = $(this).val();
        console.log(selectedValue);
        $("#txtBillSlNo").val($(this).find("option:selected").attr("name"))
        $("#txtBillSlNocopy").val($(this).find("option:selected").attr("name"))
        $('#txtcustomer').focus();

    });



    $('#select_payterms').val(2);


    $("#flip1").click(function () {
        $("#panel1").slideToggle(1);
        $('#txtmsg').focus();
    });



    var input = document.getElementById("btnpdct");
    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            $('#txtquantity0').focus();
        }
    });

    var input1 = document.getElementById("btncst");
    input1.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            $('#select_terms').focus();
        }
    });



    $('#select_payterms').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtivdate').focus(); 
            e.preventDefault();
        }
    });
    $('#select_transfer').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtlpono').focus();
            e.preventDefault();
        }
    });
    $('#txtlpono').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#txtcustomer").focus();
        }

    });



    $('#select_terms').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_locn').focus();
            e.preventDefault();
        }
    });
    $("#select_terms").change(function () {
        var selectedValue = $(this).val();
        getdate();
    });

    $("#select_crncy").keypress(function (e) { 
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtproduct0').focus();
            e.preventDefault();
        }
    });

    $("#txtcrncyrate").keypress(function (e) { 
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtproduct0').focus();
            e.preventDefault();
        }
    });



    $("#select_crncy").change(function () {

        var selectedValue = $(this).val();
        $("#txtcrncyrate").val($(this).find("option:selected").attr("name"))
        for (j = 0; j <= i; j++) {
            amountcalculation(j);
        }
        CalcGrandTotal(i);
    });
    $("#select_unit0").change(function () {
        var selectedValue = $(this).val();
        $("#txtunit").val($(this).find("option:selected").attr("name"))
        $('#txtquantity0').focus();
        if ($(this).find("option:selected").attr("name") == 'FOC') {
            foc = 1;
            $('#txtrate0').val(0);
            amountcalculation(0);
        }
        if ($(this).find("option:selected").attr("name") != 'FOC') {
            foc = 0;
        }

    });
    $("#unit_job").change(function () {
        var selectedValue = $(this).val();
        $("#txtunit").val($(this).find("option:selected").attr("name"))
        if ($(this).find("option:selected").attr("name") == 'FOC') {

            foc = 1;
            $('#txtrate_job').val(0);
            CalcJobAmount();
        }
        if ($(this).find("option:selected").attr("name") != 'FOC') {
            foc = 0;
        }
    });

    $("#select_locn").change(function (e) {

        $('#Warningpopup').fadeOut();
        $('#select_location0,#locn_job').val($('#select_locn').val());
        var selectedValue = $(this).val();
        $("#txtlcn").val($(this).find("option:selected").attr("name"))
        $('#select_location0').prop('disabled', true);       
        $('#txtproduct0').val('');
        $('#ProductDesc0').val('');
        $('#PrdtId0').val('');
        $('#txtproductimei0').val('');
        checkpdcttextempty(this);
    });

    $('#select_locn').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_salesman').focus();
            e.preventDefault();
        }
    });
    $('#select_salesman').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_place').focus();
            e.preventDefault();
        }
    });
    $('#select_place').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_crncy').focus();
            e.preventDefault();
        }
    });




    $('#select_tax0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnadd').focus();
            e.preventDefault();
        }
    });
    $('#select_location0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_unit0').focus();
            e.preventDefault();
        }
    });
    $('#select_unit0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtquantity0').focus();
            e.preventDefault();
        }
    });
    $('#select_tax0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnadd').focus();
            e.preventDefault();
        }
    });

    $('#txtcustomer').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#txtCustId').val() == 0) {
                $('#txtproduct0').focus();
            }
          
            e.preventDefault();
        }
    });
    $('#txtproduct0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && $('#PrdtId0').val() != 0) {
            $('#txtquantity0').focus();
            e.preventDefault();
        }
    });
    $('#txtBillseriesId').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtBillSlNocopy').focus();
            $('#txtBillSlNocopy').select();

            e.preventDefault();
        }
    });
    $('#txtBillSlNocopy').keyup(function (e) {
        e.preventDefault();
        //  $('#tour1').fadeOut();
        $('#Warningpopup').fadeOut();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

        if (entrkey == 8) {
            Tbldelete();
            copyrefresh();
        }


    });

    $("#select_location0").change(function (e) {
        var selectedValue = $(this).val();
        $("#txtlcn").val($(this).find("option:selected").attr("name"))
    });




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


   
    // ------------------------------------------------------------------------------------------------------------Sales Invoice--------------------

    //View Button Click to view product details against an Invoice
    $("#btnview3").click(function (e) {
        var Billsln = '';
        var Billsr = 0;
        var CurncyId = '';
        var row = $('#RowGet8').val();
        var fl = 0;
        var SBlsrs = '';

        var checkboxes = document.getElementsByName('CheckcustSInv');
        for (var k = 0, j = checkboxes.length; k < j; k++) {
            if (checkboxes[k].checked == true) {
                fl++;
            }
        }
        if (fl == 0) {
            warningshow('Select Bill Number');
        }
        else {
            for (var n = 1; n <= row; n++) {
                if ($("#SlNoHdCheckCustSlInv" + n).is(":checked")) {
                    CurncyId = $('#CurncyId' + n).text();
                    SBlsrs = $('#SBlsrs' + n).text();
                    break;
                }
            }
            for (var m = 1; m <= row; m++) {
                if ($("#SlNoHdCheckCustSlInv" + m).is(":checked")) {
                    if ($('#CurncyId' + m).text() != CurncyId) {
                        warningshow('Please Select Sales Invoice with Same Curency!');
                        return false;
                    }
                    else if ($('#SBlsrs' + m).text() != SBlsrs) {
                        warningshow('Please Select Sales Invoice with Same Series No!');
                        return false;
                    }
                    else {
                        if (Billsln == '') {
                            Billsln += $('#SInvcol' + m).text();
                            Billsr = $('#SBlsrs' + m).text();
                        }
                        else {

                            Billsln += ',' + $('#SInvcol' + m).text();
                        }
                    }
                }
            }
            sino = Billsln;
            sisno = Billsr;
            var data = {};
            data.BlSlNo = Billsln;
            data.BlSeriesId = Billsr;
            data.ProductId = 0;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceGetProducts",
                data: data,
                success: function (result) {
                    if (Billsr != 0)
                        ShowItemGetSalesInvoice(result.oList);
                }
            });
        }

    });


    //Button Click to add selected product details to grid from popup table (SalesInvoice table data)
    $("#btnprdtadd3").click(function (e) {
        var row = $('#RowGet9').val();
        var flg = 0;
        $("#tblsalesinvoice tr").remove();
        TaxClear();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('checkitemsi');
            for (var k = 0, j = checkboxes.length; k < j; k++) {
                if (checkboxes[k].checked == true) {
                    flg++;
                }
            }
            if (flg == 0) {
                warningshow('Select Product');
            }
            else {
                if ($("#SlNoCheckSIItem" + m).is(":checked")) {
                    var ProductId = $('#ItemId' + m).val();
                    var Productcode = $('#Productcode' + m).text();
                    var ProductDescr = $('#Des' + m).text();
                    var unitIdgrid = $('#UnitIdgrid' + m).val();
                    var qty = parseInt($('#qty_' + m).val() || 0);
                    var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
                    var avgcst = parseFloat($('#avg_' + m).val() || 0).toFixed(Decimal);
                    var discount = parseFloat($('#dis_' + m).val() || 0).toFixed(Decimal);
                    var taxid = $('#taxid' + m).val();
                    var taxrate = $('#taxrate' + m).val();
                    var taxableamt = parseFloat($('#taxableamt' + m).val() || 0).toFixed(Decimal);
                    var taxamt = parseFloat($('#taxamt_' + m).val() || 0).toFixed(Decimal);
                    var total = parseFloat($('#total_' + m).val() || 0).toFixed(Decimal);
                    var fcrate = parseFloat($('#fcrte_' + m).val() || 0).toFixed(Decimal);
                    var fcdiscount = parseFloat($('#fcdis_' + m).val() || 0).toFixed(Decimal);
                    var fctaxableamt = parseFloat($('#fctaxableamt' + m).val() || 0).toFixed(Decimal);
                    var fctaxamt = parseFloat($('#fctaxamt_' + m).val() || 0).toFixed(Decimal);
                    var fctotal = parseFloat($('#fctotal_' + m).val() || 0).toFixed(Decimal);
                    var orderno = $('#qtnnoRow' + m).text();
                    var Locnid = $('#LocnId' + m).val();
                    var srsno = $('#billseriesno' + m).val();
                    var srlno = $('#billnumber' + m).val();

                    $('#txtSalesNo').val(srlno);
                    $('#txtSalesSrlNo').val(srsno);

                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'Bilseries' + id + " style='display:none' value='" + srsno + "' /><input type='text' id=" + 'Bilnumbr' + id + " style='display:none' value='" + srlno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (avgcst * qty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + avgcst + " style='background-color:white;height:30px'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select disabled='' id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control'>" + LocnSelect + "</select></td>" +
                        "</tr>";

                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    $('#select_location' + id).val(Locnid);
                    TaxSplit(id);
                    productpopuprefresh();
                    CalcGrandTotal(i);
                    fccalculation(i);
                    i++;
                }
                // i = parseInt(row) + 1;
                CloseEnquiry();
                $('#txtproduct0').focus();
                getdate();
            }
        }

    });
    // ------------------------------------------------------------------------------------------------------End Sales Invoice-----------------------


});


//Main Function For Transfer dropdown
function Transfer() {
    disabletables();
    if ($('#select_transfer').val() == 1)       //Sales Invoice 
    {
        Enquirypopupwindow(1);
    }
}

//Show Enquiry PopUp and Display Enquiry List
function Enquirypopupwindow(id) {
    disabletables();
    $('#SalesInvdiv').hide();
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').hide();
    if (id == 1)                                                      //List All Sales Invoice Details in pop up (Recall)
    {
        if ($('#txtCustId').val() == 0)            //If CustId==0 Get all Sales Invoice Details
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Sales Invoice Details');
            $('#SalesInvdiv').show();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            var data = {};
            data.CustId = 0;
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceRecall",
                data: data,
                success: function (result) {
                    $('#tblSalesInv tr').remove();
                    SalesInvLoad(result.oList);
                }
            });
        }
        else                              //If CustId!=0 Get Sales Invoice Details against That Customer 
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Sales Invoice Details');
            $('#SalesInvdivcust').show();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivsub').hide();
            var data = {};
            data.CustId = $('#txtCustId').val();
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceRecall",
                data: data,
                success: function (result) {
                    $('#tblSalesInvcust tr').remove();
                    SalesInvoiceCustLoad(result.oList);
                }
            });
        }
    }
}


//---------------------------------------------------------------------------------------------Close Enquiry&Quotation--------------------------

//Close Enquiry PopUP
function CloseEnquiry() {
    disabletables();
    $('#SalesInvdiv').hide();
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').hide();
    $('#Enquirypopup').hide();
    $('#Qtndiv').hide();
    $('#RowGet7').val(0);
    $('#RowGet8').val(0);
    $('#RowGet9').val(0);
    $('#Warningpopup').fadeOut();
    Location = ''; Location1 = '';
    sino = ''; sisno = '';

    $('#SearchCustsi').val('')
    $('#hiddencustIdsi').val(0);
    $('#SearchFromdatesi').val(CurDate);
    $('#SearchToDatesi').val(CurDate);

    $('#SearchFromdatesi1').val(CurDate);
    $('#SearchToDatesi1').val(CurDate);

    $('#SearchProdsi').val('')
    $('#hiddenProdIdsi').val('');


    if (($('#txtcrncyrate').val() == 1 || $('#GrandTotal').val() <= 0)) {
        $("#fc").css("opacity", '0');
    }
    else {
        $("#fc").css("opacity", '100');
    }
}

//Remove Rows of All The Tables In the Popup
function removetblrow() {
    $('#tblSalesInv tr').remove();
    $('#tblSalesInvcust tr').remove();
    $('#tblSalesInvsub tr').remove();
}

//Clear Id's in Search
function emptyId(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddenProdIdsi').val(0);

        $('#hiddencustIdsi').val(0);
    }
}

//Back Button for Transfer Popup
function Back(id) {
    if (id == 4) {
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').show();
        $('#SalesInvdivsub').hide();
        $('#SearchCustsi').val('')
        $('#hiddencustIdsi').val(0);
        $('#SearchFromdatesi').val(CurDate);
        $('#SearchToDatesi').val(CurDate);

        $('#SearchFromdatesi1').val(CurDate);
        $('#SearchToDatesi1').val(CurDate);

        $('#SearchProdsi').val('')
        $('#hiddenProdIdsi').val('');
    }
}

//Disable all tables
function disabletables() {

    disable_datatable('tblSalesInv');
    disable_datatable('tblSalesInvcust');
    disable_datatable('tblSalesInvsub');
}

//---------------------------------------------------------------------------------------------End---------------------------------------------

//-------------------------------------------------------------------------------------------- Sales Invoice-----------------------------------------------------------------

//List Sales Invoice Details in Popup 
function SalesInvLoad(result) {
    disable_datatable('tblSalesInv');
    var responseText = "<thead><tr><th></th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr>" +
                              "<tr><th>Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" name="CheckSInv" id= ' + 'SlNoChecksalesinv' + slno + ' ></td>' +
            '<td >' + result[l].BillDescription + '</td>' +
           '<td id=' + 'Invcol' + slno + '>' + result[l].BillSlNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           '<td style="display:none" id=' + 'Blsrs' + slno + '>' + result[l].BillSeriesId + '</td>' +
           '</tr>';

    }
    $('#tblSalesInv').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesInv', 'Single');
    $('#RowGet7').val(result.length);
}

//Function Call To Load Sales Invoice Details To the Fields against a Bill No
function EditSalesInvoice() {
    var row = parseInt($('#RowGet7').val());
    var flg = 0;
    var checkboxes = document.getElementsByName('CheckSInv');
    for (var k = 0, j = checkboxes.length; k < j; k++) {
        if (checkboxes[k].checked == true) {
            flg++;
        }
    }
    if (flg != 1) {
        warningshow('Select One Bill Number');
    }
    else {
        $('#Warningpopup').fadeOut();
        for (m = 1; m <= row; m++) {
            if ($("#SlNoChecksalesinv" + m).is(":checked")) {
                var data = {};
                data.BillSlNo = $('#Invcol' + m).text();
                data.BillSeriesId = $('#Blsrs' + m).text();
                data.DeptId = ERPDeptId;
                console.log(data.BillSlNo)
                console.log(data.BillSeriesId)
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/SalesGetandGets",
                    data: data,
                    success: function (result) {
                        SalesInvGets(result.oList);
                        CloseEnquiry();
                    }
                });

            }
        }
    }
}

//To Load Sales Invoice Details To the Fields against a Bill No
function SalesInvGets(result) {
    Tbldelete();
    copyrefresh();
    TaxClear();
    for (var n = 0; n < result.length; n++) {
        $('#txtSalesNo').val(result[n].BillSlNo);
        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
        $('#txtaddress').val(result[n].CustAddress);
        $('#select_payterms').val(result[n].PayType);
        $('#txtlpono').val(result[n].LPONumber);
        $('#select_terms').val(result[n].InvTerms);
        $('#txtExpdate').val(result[n].ExpectedDate);
        if (result[n].SalesManId != 0 || result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 || result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(1);
        if (result[n].CurrencyId != 0 || result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
        if (result[n].LocId != 0 || result[n].LocId != '')
            $('#select_locn').val(result[n].LocId);
        else
            $('#select_locn').val(UserLocationId);
        $('#select_jobno').val(result[n].JobCode);
        $('#GrandTotal').val((parseFloat(result[n].FCGrandTotal).toFixed(Decimal)));
        $('#FcGrandTotal').val((parseFloat(result[n].GrandTotal).toFixed(Decimal)));
        $('#TotalTaxable').val((parseFloat(result[n].TotalTaxable).toFixed(Decimal)));
        $('#FcTotalTaxable').val((parseFloat(result[n].FCTotTaxable).toFixed(Decimal)));
        $('#TotalDiscount').val((parseFloat(result[n].TotalDiscount).toFixed(Decimal)));
        $('#FcTotalDiscount').val((parseFloat(result[n].FCTotalDiscount).toFixed(Decimal)));
        $('#TotalTax').val((parseFloat(result[n].TotalTax).toFixed(Decimal)));
        $('#FcTotalTax').val((parseFloat(result[n].FCTotTax).toFixed(Decimal)));
        $('#txtmsg').val(result[n].Remarks);
        $('#gndtotal').text(parseFloat(result[n].GrandTotal).toFixed(Decimal));
        $('#ProjectJobId').val(result[n].JobNumber);
        $('#TotalAvgCost').val((parseFloat(result[n].TotalCost).toFixed(Decimal)));

        var fcur = result[n].FCGrandTotal;
        $("#fc").text('FC : ' + fcur.toFixed(Decimal));
        $("#fc").css("opacity", '100');
        var rowcount = CountRows();
        if (rowcount == 0) {
            i = 1;
        }
        var slno = rowcount + 1;
        var id = parseInt(n + 1);

        var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'Bilnumbr' + id + " style='display:none' value='" + result[n].BillSlNo + "' /><input type='text' id=" + 'Bilseries' + id + " style='display:none' value='" + result[n].BillSeriesId + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (result[n].AvgCost * result[n].ProdQty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat(result[n].AvgCost).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><select id=" + 'select_location' + id + " value=" + result[n].LocnId + " style='background-color:white;height:30px' disabled='' class='form-control'>" + LocnSelect + "</select></td>" +
                  "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);
        $('#select_location' + id).val(result[n].LocnId);
        TaxSplit(id);
        i++;
    }
    // i = parseInt(result.length + 1);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    CalcGrandTotal(i);
    $('#tblSalesInvsub tr').remove();
    getdate();
}

//List  Sales Invoice Details against a customer in Popup  
function SalesInvoiceCustLoad(result) {
    disable_datatable('tblSalesInvcust');
    var responseText = "<thead><tr><th style='width:90px;'><input type='checkbox' checked id= 'SlNoHdCheckCustSlInv0' 'custom-control-input cz-bg-image-display' onchange='selectallcust1()'>&nbsp;&nbsp;&nbsp;Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" name="CheckcustSInv" checked id= ' + 'SlNoHdCheckCustSlInv' + slno + ' ></td>' +
              '<td >' + result[l].BillDescription + '</td>' +
           '<td id=' + 'SInvcol' + slno + '>' + result[l].BillSlNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           '<td style="display:none" id=' + 'CurncyId' + slno + '>' + result[l].CurrencyId + '</td>' +
           '<td style="display:none" id=' + 'SBlsrs' + slno + '>' + result[l].BillSeriesId + '</td>' +
           '</tr>';
    }
    $('#tblSalesInvcust').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesInvcust', 'Multiple');
    $('#RowGet8').val(result.length);
}

//Selecting checkbox for Sales Invoice Customer List
function selectallcust1() {
    var rowCount = $('#RowGet8').val();
    var flag = $("#SlNoHdCheckCustSlInv0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoHdCheckCustSlInv" + h) != null) {
            document.getElementById("SlNoHdCheckCustSlInv" + h).checked = flag;
        }
    }
}

//ProductList in the DB based on Bill No 
function ShowItemGetSalesInvoice(result) {
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').show();
    disable_datatable('tblSalesInvsub');
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' checked id= 'SlNoCheckSIItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtsI()'>&nbsp;&nbsp;&nbsp;Select</th><th>Bill Series</th><th>Bill No</th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Bill Series</th><th>Bill No</th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input name="checkitemsi" type="checkbox" checked  id= ' + 'SlNoCheckSIItem' + slno + ' ></td>' +
       '<td id=' + 'Billdesc' + slno + '>' + result[l].BillDescription + '<input type="hidden" id=' + 'billseriesno' + slno + ' value=' + result[l].BillSeriesId + '></td>' +
       '<td id=' + 'billnoRow' + slno + '>' + result[l].BillSlNo + '<input type="hidden" id=' + 'billnumber' + slno + ' value=' + result[l].BillSlNo + '></td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
        '<td id=' + 'Des' + slno + '>' + result[l].ProductDescr + '</td>' +
        '<td id=' + 'UnitName' + slno + '>' + result[l].UnitName + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
        '<td id=' + 'qty' + slno + '>' + parseInt(result[l].ProdQty) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].ProdQty + '></td>' +
        '<td id=' + 'rate' + slno + '>' + parseFloat(result[l].ProdRate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].ProdRate + '><input type="hidden" id="fcrte_' + slno + '" value=' + result[l].FcProdRate + '><input type="hidden" id="avg_' + slno + '" value=' + result[l].AvgCost + '></td>' +
        '<td style=display:none; id=' + 'discount' + slno + '>' + parseFloat(result[l].ProdDisc).toFixed(Decimal) + '<input type="hidden" id="dis_' + slno + '" value=' + result[l].ProdDisc + '><input type="hidden" id="fcdis_' + slno + '" value=' + result[l].FcProdDisc + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxid' + slno + ' value= ' + result[l].TaxId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'LocnId' + slno + ' value= ' + result[l].LocnId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' + result[l].TaxPercent + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' + result[l].TaxableAmount + '><input type="text" style="display:none;" id= ' + 'fctaxableamt' + slno + ' value= ' + result[l].FCTaxableAmount + '></td>' +
        '<td id=' + 'taxamt' + slno + '>' + parseFloat(result[l].TaxAmount).toFixed(Decimal) + '</td><input type="hidden" id="taxamt_' + slno + '" value=' + result[l].TaxAmount + '><input type="hidden" id="fctaxamt_' + slno + '" value=' + result[l].FCTaxAmount + '>' +
        '<td id=' + 'total' + slno + '>' + parseFloat(result[l].Amount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' + result[l].Amount + '><input type="hidden" id="fctotal_' + slno + '" value=' + result[l].FCAmount + '></td></tr>';
    }

    $('#tblSalesInvsub').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesInvsub', 'Multiple');
    $('#RowGet9').val(result.length);
}

//Selecting checkbox for productslist(Sales Invoice)
function selectallprdtsI() {
    var rowCount = $('#RowGet9').val();
    var flag = $("#SlNoCheckSIItem0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoCheckSIItem" + h) != null) {
            document.getElementById("SlNoCheckSIItem" + h).checked = flag;
        }
    }
}

//Saerch Customer in sales Invoice Popup When CustId=0 
function SearchSInv(Flag) {
    disable_datatable('tblSalesInv');
    if (Flag == 1)                         //search
    {
        if ($('#hiddencustIdsi').val() == 0) {
            $('#SearchCustsi').val('');
            $('#SearchCustsi').focus();
        }

        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Invoice Details');
        $('#SalesInvdiv').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.CustId = $('#hiddencustIdsi').val();
        data.FromDate = $('#SearchFromdatesi').val();
        data.ToDate = $('#SearchToDatesi').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecall",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesInv').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    SalesInvLoad(result.oList);
                }
            }
        });
    }
    else if (Flag == 0)                      //Clear
    {
        $('#SearchCustsi').val('')
        $('#hiddencustIdsi').val(0);
        $('#SearchFromdatesi').val(CurDate);
        $('#SearchToDatesi').val(CurDate);

        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Invoice Details');
        $('#SalesInvdiv').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.CustId = 0;
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecall",
            data: data,
            success: function (result) {
                SalesInvLoad(result.oList);
            }
        });
    }
}

//Search Customer in sales Invoice Popup When CustId!=0
function SearchSInvCust(flag) {
    disable_datatable('tblSalesInvcust');
    if (flag == 1)          //Search
    {

        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Invoice Details');
        $('#SalesInvdivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = $('#SearchFromdatesi1').val();
        data.ToDate = $('#SearchToDatesi1').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecall",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesInvcust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    SalesInvoiceCustLoad(result.oList);
                }
            }
        });

    }
    else if (flag == 0)        //Clear
    {
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Invoice Details');
        $('#SalesInvdivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        $('#SearchFromdatesi1').val(CurDate);
        $('#SearchToDatesi1').val(CurDate);
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecall",
            data: data,
            success: function (result) {
                SalesInvoiceCustLoad(result.oList);
            }
        });
    }
}

//Saerch Product in sales Invoice Popup
var sino = ''; var sisno = '';
function SearchSInvoiceSub(Flag) {
    disable_datatable('tblSalesInvsub');
    if (Flag == 1)                          //search
    {
        if ($('#hiddenProdIdsi').val() == 0) {
            $('#SearchProdsi').val('');
            $('#SearchProdsi').focus();
        }
        var data = {};
        data.BlSlNo = sino;
        data.BlSeriesId = sisno;
        data.ProductId = $('#hiddenProdIdsi').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceGetProducts",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesInvsub').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    ShowItemGetSalesInvoice(result.oList);
                }
            }
        });
    }

    else if (Flag == 0) {                               //Clear
        $('#SearchProdsi').val('')
        $('#hiddenProdIdsi').val('');
        var data = {};
        data.BlSlNo = sino;
        data.BlSeriesId = sisno;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceGetProducts",
            data: data,
            success: function (result) {
                ShowItemGetSalesInvoice(result.oList);
            }
        });
    }
}

//--------------------------------------------------------------------------------------------End Sales Invoice-----------------------------------------------------------------


var copyflag = 0;

function formrefreshconfirm() {
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else {
        var rowcount = CountRows();
        if (rowcount > 0 && copyflag == 0) {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('refresh'); $('#ConfirmRowId').val(0);
            $('#confirmmessage').text('Data will be lost.Do you want to Continue?');
        }
        else {
            formrefresh();
        }
    }
}

//All Popup Refresh
function popuprefresh() {
    $('#popupdiv').hide();
    $('#txt_code').val('');
    $('#txt_cname').val('');
    $('#txt_rate').val('');
    $('#txt_remark').val('');
    $('#CrncyId').val(0);

    $('#txtname').val('');
    $('#select_areagroup').val('0');
    $('#txtcode').val('');
    $('#txtdescription').val('');
    $('#AreaId').val(0);

    $('#LocationName').val('');
    $('#LocationCode').val('');
    $('#LocationDescription').val('');
    $('#LocationId').val(0);

    $('#code').val('');
    $('#txt_fname').val('');
    $('#txt_lname').val('');
    $('#txt_amount').val('');
    $('#txt_contactnumber').val('');
    $('#txt_address1').val('');
    $('#txt_address2').val('');
    $('#txt_address3').val('');
    $('#SalesmanId').val(0);

    $('#txtterms').val('');
    $('#txtdesc').val('');
    $('#TermsId').val(0);
}

//Product Popup Refresh
function productpopuprefresh() {
    $('#productpopupdiv').hide();
    $('#pdctrow').remove();
    $('#pdctrow1').remove();
    $('#custlsp').hide();
}

//Form Refresh
function formrefresh() {
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else {
        $('#copybill').hide();
        $('#bill').show();
        $('#txtBillSlNocopy').prop('disabled', false);


        $('#btnlist').prop('disabled', false);
        $('#btntrnsfr').css("height", '100%');

        $('#btnsubmit').prop("disabled", false);
        $('#btnlist').prop("disabled", false);
        $('#txtBillSlNo').prop("disabled", true);
        $('#btnadd').prop("disabled", false);
        $('#txtcustomer').prop("disabled", false);
        $('#txtivdate').val(CurDate);
        $('#txttaxpercent0').val('');
        $('#txtmsg').val('');
        $('#txtBillseriesId').val();
        $('#txtBillSlNo').val('');
        $('#txtBillSlNocopy').val('');
        $('#select_payterms').val(2);
        $('#select_transfer').val(0);
        $('#txtcustomer').val('');
        $('#txtCustId').val(0);
        $('#select_terms').val(0);
        $('#txtproductimei0').val('');
        $('#ReturnNo').val('');


        $('#txtaddress').val('');
        $('#PriceGroupId').val(0);
        $('#TransPrdtId0').val(0);
        $('#pdtrowcnt').val('');
        $('#codelength').val('');
        $('#select_salesman').val(UserSalesmanId);

        $('#select_jobno').val('');
        $('#txtproduct0').val('');
        $('#btndelete').hide();

        $('#select_unit0').val(0);
        $('#txtquantity0').val('');
        $('#txtstocktotloseqty0').val(0);
        $('#txtrate0').val('');
        $('#txtdiscount0').val('');
        $('#select_tax0').val(0);
        $('#txtamnt0').val('');
        $('#txtlpono').val('');

        $('#roundgndtotal').val(0);
        $('#roundfcgndtotal').val(0);

        $('#TotalDiscount').val('0.00');
        $('#TotalTaxable').val('0.00');
        $('#TotalTax').val('0.00');
        $('#GrandTotal').val('0.00');

        $('#gndtotal').text('0.00');
        $('#fc').text('fc');
        $("#fc").css("opacity", '0');
        $('#btndelete').hide();
        $('#Warningpopup').fadeOut();
        GrandTotal = 0;
        BillLoad();
        copyflag = 0;
        foc = 0;
        qtyflag = 0;

        $('#txtduedate').css("background-color", 'white');
        //$('#txttaxpercent0').css("background-color", 'white');
        //$('#txtamnt0').css("background-color", 'white');
        $('.form-control,.btn-outline-primary').prop("disabled", false);
        $('#txtBillSlNo').prop("disabled", true);
        $('#txtduedate').prop("disabled", true);
        $('#txttaxpercent0').prop("disabled", true);
        $('#txtamnt0').prop("disabled", true);

        $('.jsgrid').prop("disabled", false);
        //  $('#tour1').fadeOut();

        productpopuprefresh();

        Tbldelete();
        copyrefresh();
        removetblrow();

        $('#custlsp').hide();
        $('#btnprvs').prop("disabled", true);
        $('#btnnxt').prop("disabled", true);
       // $('#select_transfer').css("height", '100%');
        //$('#btnlocn').css("height", '100%');
        $('#btnterms').css("height", '100%');
        $('#select_terms').css("height", '100%');


        $('#select_crncy').val(BaseCurrency);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));


        $('#RowGet7').val(0);
        $('#RowGet8').val(0);
        $('#RowGet9').val(0);
        $('#RowGetprdt').val(0);

        CloseEnquiry();
      
        $('#editheader').show();
        $('#select_locn').val(UserLocationId);
        $('#select_location0').val(UserLocationId);
        $('#locn_job').val(UserLocationId);
        $('#select_place').val(DefaultArea);

        $('#TotalAvgCost').val(0);
        $('#LineAvgCost0').val(0);
        $('#AvgCost0').val(0);
        $('#txtduedate').val(CurDate);
        $('#TotalDiscount,#TotalTaxable,#TotalTax').prop("disabled", true);
        eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = ''; elocn = '';
        $('#btnprint').hide();
        $('#btnsubmit').show();
        $('#btnlist').show();
        $("#panel1").hide();
        TaxClear();
    }

}

function Defaultfocus() {
    $('#txtcustomer').focus();
}

//Calculate GrandTotal Amount 
var GrandTotal;
function CalcGrandTotal(Id) {
    var TotalTaxable = 0;
    var TotalDiscount = 0;
    var TotalTax = 0;
    var LineAverage = 0;
    GrandTotal = 0;
    $('#GrandTotal').val('');
    $('#TotalDiscount').val('');
    $('#TotalTax').val('');
    $('#TotalTaxable').val('');
    $('#TotalAvgCost').val('');
    for (var i = 1; i <= Id; i++) {
        GrandTotal = GrandTotal + parseFloat($('#txtamnt' + i).val() || 0);
        TotalDiscount = TotalDiscount + parseFloat($('#txtdiscount' + i).val() || 0);
        TotalTax = TotalTax + parseFloat($('#txttaxamnt' + i).val() || 0);
        TotalTaxable = TotalTaxable + parseFloat($('#txttaxableamnt' + i).val() || 0);
        LineAverage = LineAverage + parseFloat($('#LineAvgCost' + i).val() || 0);
    }
    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#TotalDiscount').val(TotalDiscount.toFixed(Decimal));
    $('#TotalTax').val(TotalTax.toFixed(Decimal));
    $('#TotalTaxable').val(TotalTaxable.toFixed(Decimal));
    $('#TotalAvgCost').val(LineAverage.toFixed(Decimal));
    $('#gndtotal').text(GrandTotal.toFixed(Decimal));

    fccalculation(Id);

}

//Calculate Each Row Total Amount FC
function fccalculation(id) {
    var fc = parseFloat($('#txtcrncyrate').val()).toFixed(Decimal);
    fc = isNaN(fc) ? 0 : fc;

    var fcgrandtotal = 0;
    var fctotdisc = 0;
    var fctottaxable = 0;
    var fctottax = 0;

    fcgrandtotal = parseFloat($('#GrandTotal').val() || 0) * fc;
    var rowcount = CountRows();
    if (fcgrandtotal > 0 && rowcount > 0) {
        $("#fc").text('FC : ' + GrandTotal.toFixed(Decimal));

        if (fc != 1) {
            $("#fc").css("opacity", '100');
        }
        else {
            $("#fc").css("opacity", '0');
        }
        $('#gndtotal').text(fcgrandtotal.toFixed(Decimal));

    }
    else {
        $("#fc").css("opacity", '0');
    }


    fctotdisc = parseFloat($('#TotalDiscount').val()) * fc;
    fctottaxable = parseFloat($('#TotalTaxable').val()) * fc;
    fctottax = parseFloat($('#TotalTax').val()) * fc;

    $('#FcTotalDiscount').val(fctotdisc.toFixed(Decimal));
    $('#FcTotalTaxable').val(fctottaxable.toFixed(Decimal));
    $('#FcTotalTax').val(fctottax.toFixed(Decimal));
    $('#FcGrandTotal').val(fcgrandtotal.toFixed(Decimal));


}

//Calculate Each Row Total Amount
function amountcalculation(id) {
    var fc = $('#txtcrncyrate').val();
    var fcprodrate = 0;
    var fcproddisc = 0;
    var fctaxable = 0;
    var fctax = 0;
    var fcamnt = 0;

    var quantity = $('#txtquantity' + id).val() || 0;
    var LineAvgCost = quantity * parseFloat($('#AvgCost' + id).val() || 0);
    var rate = parseFloat($('#txtrate' + id).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var amount = parseFloat(quantity * rate);
    var discount = parseFloat($('#txtdiscount' + id).val() || 0);
    discount = isNaN(discount) ? 0 : discount;
    var taxableamount = parseFloat(amount - discount);
    var taxrate = parseFloat($('#txttaxpercent' + id).val() || 0);
    var taxamount = parseFloat((taxableamount * taxrate) / 100);
    var totalamount = parseFloat(taxableamount.toFixed(Decimal)) + parseFloat(taxamount.toFixed(Decimal));
    $('#LineAvgCost' + id).val(LineAvgCost.toFixed(Decimal));
    $('#txtamnt' + id).val(totalamount.toFixed(Decimal));
    $('#txttaxableamnt' + id).val(taxableamount.toFixed(Decimal));
    $('#txttaxamnt' + id).val((taxamount).toFixed(Decimal));

    fcprodrate = parseFloat($('#txtrate' + id).val() || 0) * fc;
    fcproddisc = parseFloat($('#txtdiscount' + id).val() || 0) * fc;
    fctaxable = parseFloat($('#txttaxableamnt' + id).val() || 0) * fc;
    fctax = parseFloat($('#txttaxamnt' + id).val() || 0) * fc;
    fcamnt = parseFloat($('#txtamnt' + id).val() || 0) * fc;

    $('#txtfcrate' + id).val(fcprodrate.toFixed(Decimal));
    $('#txtfcdiscount' + id).val(fcproddisc.toFixed(Decimal));
    $('#txtfctaxableamnt' + id).val(fctaxable.toFixed(Decimal));
    $('#txtfctaxamnt' + id).val(fctax.toFixed(Decimal));
    $('#txtfcamnt' + id).val(fcamnt.toFixed(Decimal));
    if (id != 0) {
        CalcGrandTotal(i);

    }
    // alert('#LineAvgCost' + id)
    //alert( $('#LineAvgCost' + id).val())
}

//Tax Split for Product Add
function TaxSplit(RowId) {

    var TaxId = $('#txttaxpercent' + RowId).val()
    var splittaxable = parseFloat($('#txttaxableamnt' + RowId).val());
    var CurrentSplitTaxable = parseFloat($('#hiddensplittaxable_' + TaxId).val() || 0);

    var splittax = parseFloat($('#txttaxamnt' + RowId).val());
    var CurrentSplitTax = parseFloat($('#hiddensplittax_' + TaxId).val() || 0);
    CurrentSplitTaxable = parseFloat(CurrentSplitTaxable + splittaxable);
    CurrentSplitTax = parseFloat(CurrentSplitTax + splittax);

    $('#splittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#hiddensplittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#splittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
    $('#hiddensplittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));

}



//Tax Split for Row Delete
function TaxSplitDelete(TaxId, Taxable, Tax) {

    var CurrentSplitTaxable = parseFloat($('#hiddensplittaxable_' + TaxId).val());
    CurrentSplitTaxable = parseFloat(CurrentSplitTaxable - Taxable);

    var CurrentSplitTax = parseFloat($('#hiddensplittax_' + TaxId).val());
    CurrentSplitTax = parseFloat(CurrentSplitTax - Tax);
    //CurrentSplitTax = parseFloat((CurrentSplitTaxable * TaxId) / 100);

    $('#splittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#hiddensplittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#splittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
    $('#hiddensplittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
}

//Tax Split for Row Update
function TaxSplitupdate(PrevtaxId, PrevSplitTaxable, PrevSplitTax, RowId) {

    console.log(PrevtaxId, PrevSplitTaxable, PrevSplitTax, RowId)
    var PrevTaxable = parseFloat($('#hiddensplittaxable_' + PrevtaxId).val());
    PrevTaxable = parseFloat(PrevTaxable - PrevSplitTaxable);
    var PrevTax = parseFloat($('#hiddensplittax_' + PrevtaxId).val());
    PrevTax = parseFloat(PrevTax - PrevSplitTax);

    $('#splittaxable_' + PrevtaxId).val(PrevTaxable.toFixed(Decimal));
    $('#hiddensplittaxable_' + PrevtaxId).val(PrevTaxable.toFixed(Decimal));
    $('#splittax_' + PrevtaxId).val(PrevTax.toFixed(Decimal));
    $('#hiddensplittax_' + PrevtaxId).val(PrevTax.toFixed(Decimal));
    TaxSplit(RowId);
}

//Clear Product Row After Adding
function clearrow() { 
    $('#pdtrowcnt').val('');
    $('#codelength').val('');
    $('#TransPrdtId0').val(0);
    $('#PrdtId0').val('');
    $('#txtproduct0').val('');
    $('#txtquantity0').val('');
    $('#txtstocktotloseqty0').val(0);
    $('#txtrate0').val('');
    $('#txtdiscount0').val('');
    $('#select_unit0').val(0);
    $('#select_tax0').val(0);
    $('#txtamnt0').val('');
    $('#txttaxpercent0').val('');
    $('#txtproduct0').focus();
    $('#select_location0').val($('#select_locn').val());
    $('#AvgCost0').val('');
    $('#txtproductimei0').val('');
    $('#IMEIlength').val(0);
    $('#IEMICount').val(0); 
    $('#Otherdescription0').val('');
    $('#txtquantity0').prop('disabled', false);
    $('#txtrate0').prop('disabled', false);
    $('#txtdiscount0').prop('disabled', false);
   
}


var qtyflag = 0;
var foc = 0;

//Add Product Details To Product Grid
function productadd() {
  
  
    var imeilen = $('#txtproductimei0').val()||0;   
    var imlen = $('#IMEIlength').val()||0;

    var a = parseFloat($('#txtdiscount0').val());
    var c = parseFloat($('#txtrate0').val());
    $("#txtdiscount0").val(isNaN(a) ? 0 : a);
    $('#txtrate0').val(isNaN(c) ? 0 : c);
    var rowcount = CountRows();
    var ProductFlag = 0;
    var IMEIFlag = 0;

   
    for (p = 1; p <= i; p++) {
        if (($('#PrdtId' + p).val() == $("#PrdtId0").val()) && $('#select_location' + p).val() == $("#select_location0").val()) {
            ProductFlag = 1;
        }
        if (($('#txtproductimei' + p).val() != '') && ($('#txtproductimei' + p).val() == $("#txtproductimei0").val())) {
            IMEIFlag = 1;
        }
    }

    if ($.trim($("#txtproduct0").val()) == '') {
        warningshow('Please Enter The Product', 'txtproduct0');
    }
    else if ($("#PrdtId0").val() == 0) {
        warningshow('Please Enter a Valid Product', 'txtproduct0');
        $('#txtproduct0').select();
    }
    else if (($.trim($("#txtproductimei0").val()) == '') && ($("#IEMICount").val() != 0)) {
        warningshow('Please Enter The IMEI Number', 'txtproductimei0');
    }
    else if ($("#PrdtId0").val() != 0 && (imlen != imeilen)) { 
        warningshow('Please Enter a Valid IMEI Number', 'txtproductimei0');
        $('#txtproductimei0').select();
    }
    else if (IMEIFlag == 1) {
        warningshow('IMEI Number Already added', 'txtproductimei0');
        $('#txtproductimei0').select();
    }

    else if ($('#select_location0').val() == 0) {
        warningshow('Please Select Location', 'select_location0');
    }
    else if ($("#select_unit0").val() == 0 || $("#select_unit0").val() == '') {
        warningshow('Please Select The Unit', 'select_unit0');
        $('#select_unit0').select();
    }
    else if ($("#txtquantity0").val() == '' || $("#txtquantity0").val() == 0) {
        warningshow('Please Enter The Quantity', 'txtquantity0');
        $('#txtquantity0').select();
    }
    else if ($("#txtrate0").val() == '') {
        warningshow('Please Enter The Rate', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ((BelowCost == 'NO') && (parseFloat($("#txtrate0").val()) < parseFloat($('#AvgCost0').val()))) {
        warningshow('Rate must be greater than ' + $('#AvgCost0').val(), 'txtrate0'); 
        $('#txtrate0').select();
        return false;
    }
    else if (foc == 0 && ($("#txtamnt0").val() == 0)) {

        warningshow('Amount cant be 0', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ($("#txtamnt0").val() < 0) {

        warningshow('Amount cant be Negative', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ($("#select_tax0").val() == 0) {
        warningshow('Plaease select Tax', 'select_tax0');
    }
    else {
        if (rowcount == 0) {
            i = 1;
        }
        if (ProductFlag == 1) {
            var Res = confirm('Product Already Added! Do You Want to Continue');
            if (Res == false) {
                clearrow();
                return false;
            }
        }
        //var slno = $('#tblsalesinvoice tr').length+1;    
        $('#Warningpopup').fadeOut();
        amountcalculation(0);
        var slno = rowcount + 1;
        var id = parseInt(i);
        var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center'  id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input  class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button'  type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + $("#PrdtId0").val() + "' /><input type='text' style='display:none;height:30px' id=" + 'ProductDesc' + id + " value='" + $("#ProductDesc0").val() + "'><input type='text' style='display:none;height:30px' id=" + 'Otherdescription' + id + " value='" + $("#Otherdescription0").val() + "'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#txtproduct0").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproductimei' + id + " value='" + $("#txtproductimei0").val() + "'></td>" +
             "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + $("#ProductDesc0").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#txtquantity0').val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#AvgCost0').val()).toFixed(Decimal) + " style='background-color:white;height:30px;display:none'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#txtfcrate0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate0').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + parseFloat($('#LineAvgCost0').val()).toFixed(Decimal) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#AvgCost0').val()).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#txtfcdiscount0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#txtdiscount0').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#txtfctaxableamnt0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxableamnt0').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#txttaxpercent0').val() + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#txtfctaxamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttaxamnt0').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#txtfcamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#txtamnt0').val() + "></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select style='background-color:white;height:30px' disabled='' id=" + 'select_location' + id + " class='form-control'>" + LocnSelect + "</select></td>" +
            "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val($('#select_unit0').val());
        $('#select_tax' + id).val($('#select_tax0').val());
        $('#select_location' + id).val($('#select_location0').val());
        TaxSplit(id);
        clearrow();
        productpopuprefresh();

        CalcGrandTotal(i);
        fccalculation(i);
        i++;
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
}


//Job Popup Refresh
function jobpopuprefresh() {

    $('#jobpopupdiv').hide();
    $('#product_0').val('');
    $('#productId_job').val(0);
    $('#productjob').val('');
    $('#unit_job').val(0);
    $('#txtrate_job').val('');
    $('#tax_job').val(0);
    $('#taxpercentage_job').val('');
    $('#quantity_job').val('');
    $('#discount_job').val('');
    $('#amount_job').val('');
}

//Add Details From Job Popup to Product Grid
function JobAdd() {

    var a = parseFloat($('#discount_job').val());
    var b = parseFloat($('#txtsubtotal_job').val());

    var rowcount = CountRows();
    if ($.trim($('#productjob').val()) == "") {
        warningshow('Please Enter Product', 'productjob');
        return false;
    }
    else if ($('#unit_job').val() == 0) {
        warningshow('Please Select Unit', 'unit_job');
        return false;
    }
    else if ($.trim($('#quantity_job').val()) == '' || $.trim($('#quantity_job').val()) == 0) {
        warningshow('Please Enter Quantity', 'quantity_job');
        return false;
    }
    else if ($.trim($('#txtrate_job').val()) == '') {
        warningshow('Please Enter Rate', 'txtrate_job');
        return false;
    }
    else if ($('#discount_job').val() > 100) {
        warningshow('Discount Limit Exceeded', 'discount_job');
        return false;
    }
    else if (a > b) {
        warningshow('Amount Cannot be Negative', 'txtrate_job');
        return false;
    }
    else if (foc == 0 && ($("#amount_job").val() == 0)) {

        warningshow('Amount cant be 0', 'txtrate_job');
    }
    else if ($('#tax_job').val() == 0) {
        warningshow('Please select Tax', 'tax_job');
        return false;
    }
    else {
        var no = $('#tblsalesinvoice tr').length + 1;
        var id = parseInt(i); 

         
        var prodjob = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + no + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='0' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#productjob").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproductimei' + id + " value=''></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='JOB'></td>" +       
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#quantity_job').val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#fcamount_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate_job').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value='0.00' style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value='0.00' style='background-color:white;height:30px'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#fctxtdisc_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#discount_job').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#fctxttaxable_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxable_job').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#taxpercentage_job').val() + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#fctxttax_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttax_job').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#fctxtsubtotal_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#amount_job').val() + "></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select style='background-color:white;height:30px' disabled='' id=" + 'select_location' + id + " class='form-control'>" + LocnSelect + "</select></td>" +
            "</tr>";

        $('#tblsalesinvoice').append(prodjob);
        $('#select_unit' + id).val($('#unit_job').val());
        $('#select_tax' + id).val($('#tax_job').val());
        $('#select_location' + id).val($('#locn_job').val());
        $('#txtunit_' + id).val($('#txtunit_job').val());
        TaxSplit(id);
        i++;
        clearrow();
        jobpopuprefresh();
        $('#product_0').val('');
        CalcGrandTotal(i);
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
}


//Calculate Total Amount Of Job
function CalcJobAmount() {
    var fc = $('#txtcrncyrate').val();
    var fcjobprodrate = 0;
    var fcjobproddisc = 0;
    var fcjobtaxable = 0;
    var fcjobtax = 0;
    var fcjobamnt = 0;


    var jbquantity = parseFloat($('#quantity_job').val() || 0);
    var jbrate = parseFloat($('#txtrate_job').val() || 0);
    jbrate = isNaN(jbrate) ? 0 : jbrate;
    var jbdiscount = parseFloat($('#discount_job').val() || 0);
    jbdiscount = isNaN(jbdiscount) ? 0 : jbdiscount;
    var jbtaxpercentage = parseFloat($("#taxpercentage_job").val() || 0);
    var jbtamount = parseFloat(jbquantity * jbrate)
    var jbtaxableamount = parseFloat(jbtamount - jbdiscount)
    var jbtaxamount = parseFloat(jbtaxableamount * (jbtaxpercentage / 100));
    var jbtotalamount = parseFloat(jbtaxableamount.toFixed(Decimal)) + parseFloat(jbtaxamount.toFixed(Decimal));

    $("#amount_job").val(jbtotalamount.toFixed(Decimal));
    $("#txttaxable_job").val(jbtaxableamount.toFixed(Decimal));
    $("#txttax_job").val(jbtaxamount.toFixed(Decimal));
    $("#txtsubtotal_job").val(jbtamount.toFixed(Decimal));

    fcjobprodrate = parseFloat($('#txtrate_job').val() || 0) * fc;
    fcjobproddisc = parseFloat($('#discount_job').val() || 0) * fc;
    fcjobtaxable = parseFloat(jbtamount - jbdiscount) * fc;
    fcjobtax = parseFloat(jbtaxableamount * (jbtaxpercentage / 100)) * fc;
    fcjobamnt = parseFloat(jbtaxableamount + jbtaxamount) * fc;

    $("#fcamount_job").val(fcjobprodrate.toFixed(Decimal));
    $("#fctxttaxable_job").val(fcjobtaxable.toFixed(Decimal));
    $("#fctxttax_job").val(fcjobtax.toFixed(Decimal));
    $("#fctxtsubtotal_job").val(fcjobamnt.toFixed(Decimal));
    $("#fctxtdisc_job").val(fcjobproddisc.toFixed(Decimal));

}

//Count Rows Of Product Grid
function CountRows() {
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblsalesinvoice");
    var rows = table.getElementsByTagName("tr")
    for (var i = 0; i < rows.length; i++) {
        totalRowCount++;
        if (rows[i].getElementsByTagName("td").length > 0) {
            rowCount++;
        }
    }
    var message = "Total Row Count: " + totalRowCount;
    message += "\nRow Count: " + rowCount;
    return rowCount;
}

//Tax Change
function ChangeTax(TId, selectObject) {
    var value = selectObject.value;
    $("#txttaxpercent" + TId).val($(selectObject).find("option:selected").attr("name"))
    amountcalculation(TId);
}

//Unit Change
function changeunit(TId, selectObject) {
    var value = selectObject.value;
    var unitsname = $(selectObject).find("option:selected").attr("name");
    if (unitsname == 'FOC') {
        foc = 1;
        $('#txtrate' + TId).val(0);
        amountcalculation(TId);
    }
    else {
        foc = 0;
    }
}

var eunit = ''; var eqnty = ''; var erate = ''; var edis = ''; var etaxable = ''; var etax = ''; var etaxperc = ''; var etaxamnt = ''; var eamnt = '';
//Edit Button Click
function EditRow(id) {
    if (editflag == 0) {
        editflag = editflag + 1;
        $('#row' + id).children('td,th').css('background-color', 'rgb(232,226,226)');
        eunit = $('#select_unit' + id).val();
        eqnty = $('#txtquantity' + id).val();
        erate = $('#txtrate' + id).val();
        edis = $('#txtdiscount' + id).val();
        etaxable = $('#txttaxableamnt' + id).val();
        etax = $('#select_tax' + id).val();
        etaxperc = $('#txttaxpercent' + id).val();
        etaxamnt = $('#txttaxamnt' + id).val();
        eamnt = $('#txtamnt' + id).val();

        splittaxid = $('#txttaxpercent' + id).val();
        splittaxbleat = $('#txttaxableamnt' + id).val();
        splittaxat = $('#txttaxamnt' + id).val();

        $('#col13_' + id).hide();
        $('#col14_' + id).show();
        $('#editheader').hide();
        $('#editcancelheader').show();
        $('#select_unit' + id).prop('disabled', false);
        $('#txtquantity' + id).prop('disabled', false);
        $('#txtrate' + id).prop('disabled', false);
        $('#txtdiscount' + id).prop('disabled', false);
        $('#select_tax' + id).prop('disabled', false);
        $('#select_unit' + id).focus();
        CalcGrandTotal(i);
    }
    else {
        warningshow('Update Edit Mode Row First');
    }

}

//Edit Cancel
function editcancel(id) {
    editflag--;

    $('#row' + id).children('td,th').css('background-color', 'white');
    $('#col14_' + id).hide();
    $('#col13_' + id).show();
    $('#editcancelheader').hide();
    $('#editheader').show();
    $('#select_unit' + id).val(eunit);
    $('#txtquantity' + id).val(eqnty);
    $('#txtrate' + id).val(erate);
    $('#txtdiscount' + id).val(edis);
    $('#txttaxableamnt' + id).val(etaxable);
    $('#select_tax' + id).val(etax);
    $('#txttaxpercent' + id).val(etaxperc);
    $('#txttaxamnt' + id).val(etaxamnt);
    $('#txtamnt' + id).val(eamnt);

    $('#txtproduct' + id).prop('disabled', true);
    $('#select_unit' + id).prop('disabled', true);
    $('#txtquantity' + id).prop('disabled', true);
    $('#txtrate' + id).prop('disabled', true);
    $('#txtdiscount' + id).prop('disabled', true);
    $('#select_tax' + id).prop('disabled', true);

    $('#txtproduct0').focus();
    CalcGrandTotal(i);
    eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = ''; elocn = '';
    $('#Warningpopup').fadeOut();
}

var splittaxid = "";
var splittaxbleat = "";
var splittaxat = "";
//Update Function
function updaterow(id) {
    var a = parseFloat($('#txtdiscount' + id).val());
    var c = parseFloat($('#txtrate' + id).val());
    $("#txtdiscount" + id).val(isNaN(a) ? 0 : a);
    $('#txtrate' + id).val(isNaN(c) ? 0 : c);
    if (($('#txtquantity' + id).val() == '')) {
        warningshow('Please Enter Quantity', 'txtquantity' + id);
        $('#txtquantity' + id).select();
        return false;
    }
    else if (($('#txtquantity' + id).val() == 0)) {
        warningshow('Quantity can not be Zero', 'txtquantity' + id);
        $('#txtquantity' + id).select();
        return false;
    }

    else if (($('#txtrate' + id).val() == '')) {
        warningshow('Please Enter the Rate', 'txtrate' + id);
        return false;
    }
    else if ((BelowCost == 'NO') && ($('#PrdtId' + id).val() != 0) && ($('#AvgCost' + id).val() != 0) && (parseFloat($('#txtrate' + id).val()) < parseFloat($('#AvgCost' + id).val()))) { 
        warningshow('Rate must be greater than ' + $('#AvgCost' + id).val());
        $('#txtrate' + id).select();
        return false;
    }
    else if ($("#txtamnt" + id).val() < 0) {
        warningshow('Amount Cant be negative', 'txtrate' + id);
        $('#txtrate' + id).select();
    }
    else if (foc == 0 && ($("#txtamnt" + id).val() == 0)) {
        warningshow('Amount Cant be Zero', 'txtrate' + id);
        $('#txtrate' + id).select();
    }
    else if ($("#select_tax" + id).val() == 0) {
        warningshow('Please Select Tax', 'select_tax' + id);
        return false;
    }
    else {
        editflag--;
        var ratenum = parseFloat($("#txtrate" + id).val() || 0);
        $("#txtrate" + id).val(ratenum.toFixed(Decimal));
        var disnum = parseFloat($("#txtdiscount" + id).val() || 0);
        $("#txtdiscount" + id).val(disnum.toFixed(Decimal));

        $('#row' + id).children('td,th').css('background-color', 'white');


        $('#col14_' + id).hide();
        $('#col13_' + id).show();
        $('#editcancelheader').hide();
        $('#editheader').show();

        $('#txtproduct' + id).prop('disabled', true);
        $('#select_unit' + id).prop('disabled', true);
        $('#txtquantity' + id).prop('disabled', true);
        $('#txtrate' + id).prop('disabled', true);
        $('#txtdiscount' + id).prop('disabled', true);
        $('#select_tax' + id).prop('disabled', true);
        $('#select_location' + id).prop('disabled', true);

        $('#txtproduct0').focus();
        CalcGrandTotal(i);
        eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = ''; elocn = '';
        $('#Warningpopup').fadeOut();
        TaxSplitupdate(splittaxid, splittaxbleat, splittaxat, id);
        splittaxid = "";
        splittaxbleat = "";
        splittaxat = "";
    }

}

//Delete All the rows of Product Grid
function Tbldelete() {
    $('#tblsalesinvoice tr').remove();
    i = 1;
    // $('#txtproduct0').focus();
}

//Clear All Values Before Copy Function
function copyrefresh() {
    $('#select_payterms').val(2);
    $('#select_transfer').val(0);
    $('#txtcustomer').val('');
    $('#select_terms').val(0);
    $('#txtduedate').val('');
    $('#txtaddress').val('');
    $('#PriceGroupId').val(0);
    $('#select_locn').val(0);
    $('#select_salesman').val(UserSalesmanId);
    $('#select_place').val(0);
    $('#select_crncy').val(BaseCurrency);
    $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
    $('#select_jobno').val('');
    $('#txtproduct0').val('');
    $('#btndelete').hide();
    $('#select_location0').val(0);
    $('#select_unit0').val(0);
    $('#txtquantity0').val('');
    $('#txtstocktotloseqty0').val(0);
    $('#txtrate0').val('');
    $('#txtdiscount0').val('');
    $('#select_tax0').val(0);
    $('#txtamnt0').val('');
    $('#txtproductimei0').val('');

    $('#TotalDiscount').val('0.00');
    $('#TotalTaxable').val('0.00');
    $('#TotalTax').val('0.00');
    $('#GrandTotal').val('0.00');

    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');
}

//Delete The Selected Row in The Product Grid
function rowdelete(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('delete'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want to Delete this Record?');
}


//Delete rows
function rowdeleteconfirm(RowId) {
    var slno = 1;
    var splittaxable = parseFloat($('#txttaxableamnt' + RowId).val());
    var splittax = parseFloat($('#txttaxamnt' + RowId).val());
    var splittaxid = $('#txttaxpercent' + RowId).val();
    $('#row' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#txtproduct' + j).val() != undefined) {
            $('#td' + j).text(slno);
            slno++;
        }
    }
    TaxSplitDelete(splittaxid, splittaxable, splittax);
    $('#txtproduct0').focus();
    CalcGrandTotal(i);
}


//Delete Grid Rows Confirm box
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'delete') {
        rowdeleteconfirm(rowid);
    }
    else if (Result == 'true' && status == 'refresh') {
        formrefresh();
    }
    else if (Result == 'true' && status == 'copy') {
        SalesReturnCopy();
    }
    $('#confirm').fadeOut();
}


//If value of CustomerId is empty
function checkcustomerempty() {
    if ($('#txtCustId').val() != 0) {
        $('#txtCustId').val(0);
        $('#txtaddress').val('');
        $('#PriceGroupId').val(0);
        $('#select_salesman').val(UserSalesmanId);
        $('#select_crncy').val(BaseCurrency);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        for (j = 0; j <= i; j++) {
            amountcalculation(j);
        }
        CalcGrandTotal(i);

        $('#select_place').val(0);

        $('#select_terms').val(0);
        getdate();
    }
}

//If value of ProjectJobId is empty
function checkjobempty() {
    $('#ProjectJobId').val(0);
}

//If value of ProductId is empty
function checkpdcttextempty(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode != 13) {
        console.log($('#txtproduct0').val().length)
        console.log($('#codelength').val())
        var a = ($('#txtproduct0').val()).length;
        if ($('#codelength').val() != a) {

            $('#TransPrdtId0').val(0);
            $('#PrdtId0').val(0);
            $('#select_unit0').val(0);
            $('#select_tax0').val(0);
            $('#txttaxpercent0').val('');
            $('#txtrate0').val('');
            $('#txtquantity0').val('');
            $('#txtstocktotloseqty0').val('');
            $('#txtdiscount0').val('');
            $('#txtamnt0').val('');
            $('#LPCost').val(0);
            $('#AvgCost0').val(0);
            $('#Sumtotqty').val(0);
            productpopuprefresh();
            qtyflag = 0;
            $('#txtproductimei0').val('');
            $('#txtproductimei0').prop("disabled", false);
        }

    }
}


//--------------Common Functions---------------
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

function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function Showalerts(Status, billsrs, billsrlno) {

    console.log(Status)
    $('#savealert').html('');
    //$('#alertpopup').hide(); 
    //$('#alertdiv1').hide();
    if (Status == 1) {
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#savealert').append('<b>Bill No : ' + billsrs + '-' + billsrlno + '</b><br> Saved Successfully!<br>Do you want to print this bill?');
        $('#btnok').focus();
        //swal('Bill No : ' + billsrs + '-' + billsrlno+' Saved Successfully', "Do you want to print the bill?", "success");       
        //$('.swal-button swal-button--confirm').focus();    
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
}

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

function datatableWithsearch(tablename, Type) {
    console.log(Type)
    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Select' || title == 'Details') {
                $(this).html('<input type="text" class="form-control"  style="width:30px;display:none"  placeholder="' + title + '"/>')
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
            //"order": false,
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
    console.log(tablename)
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        console.log('i')
        var table = $('#' + tablename).DataTable();
        console.log(table)
        table.destroy();
        console.log('table destroyed')
        return;
    }
}

function alertpopuprefresh(e) {
    $('#alertpopup').hide();
    $('#alertdiv').hide();

}