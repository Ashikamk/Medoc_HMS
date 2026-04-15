var LocnSelect = '';
function LocationLoad(result, a) {
    $("#select_locn,#select_location0,#locn_job").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        if (LocArray.includes(result[i].LocationId))
            LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
        else
            LocnSelect += "<option style='color:#26ACAE' disabled value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
    }
    $("#select_location0,#select_locn,#locn_job").append(LocnSelect);
    //if (a == 0) {
    $('#select_locn').val(0);
    $('#select_location0').val(0);
    $('#locn_job').val(0);
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
var UnitSelect = '';
function UnitLoad(result) {
    $("#select_unit0,#unit_job").empty();
    UnitSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'name='" + result[i].UnitName + "'>" + result[i].UnitName + "</option>";
    }
    $("#select_unit0,#unit_job").append(UnitSelect);
}
var TaxSelect = '';
function TaxLoad(result) {
    $("#select_tax0,#tax_job").empty();
    TaxSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "' name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>";
    }
    $("#select_tax0,#tax_job").append(TaxSelect);
    $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"));
    $("#txttaxpercent0").val($("#select_tax0").find("option:selected").attr("name"));
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

function VehicleLoad(result) {

    $("#select_vehicle").empty();
    $("#select_vehicle").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_vehicle").append("<option value='" + result[i].VehicleId + "'>" + result[i].RegistrationNumber + "</option>");
    }
}
function Vehicle() {
    var data = {};
    data.VehicleId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/VehicleGetandGets",
        data: data,
        success: function (result) {
            VehicleLoad(result.oList);
        }
    });
}
function DriverLoad(result) {

    $("#select_driver").empty();
    $("#select_driver").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_driver").append("<option value='" + result[i].DriverId + "' name=" + result[i].DriverName + ">" + result[i].DriverName + "</option>");
    }
}
function Driver() {
    var data = {};
    data.DriverId = 0;
    $.ajax({
        type: "POST",
        url: "../inventory/DriverGetandGets",
        data: data,
        success: function (result) {
            DriverLoad(result.oList);
        }
    });
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
var LocArray = [];
function LocnLoad(id) {
    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
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


function DOrdrNo() {
    var data = {};
    data.id = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Common/SlNoGetandGets",
        data: data,
        success: function (result) {
            DOrdrNoload(result.oList);
        }
    });
}
function DOrdrNoload(result) {
    $('#txtBillSlNo').val(result[0].DOrderNo);
    $('#txtBlSlNo').val(result[0].DOrderNo);
    $('#txtBillSlNocopy').val(result[0].DOrderNo);
}

var Decimal = Decimal;
var editflag = 0;
var i = 1;

function Selecttrans() {
    if ($('#salestransdiv').is(':visible'))
        TransactionSales();
    else if ($('#purchasetransdiv').is(':visible'))
        TransactionPurchase();
    else if ($('#alltranstransdiv').is(':visible'))
        TransactionAll();
}

function TransactionSales() {
    if ($("#PrdtId0").val() != 0) {

        $('#idforlabeltype').text('All');
        if ($('#status_type').prop("checked"))
            var flag = 1;
        else
            var flag = 0;

        var data = {};
        data.ProductId = $("#PrdtId0").val();
        data.DeptId = ERPDeptId;
        data.type = flag;
        data.UserId = ERPUserId;
        $.ajax({
            type: "POST",
            url: '../SalesInvoice/SalesTransGetandGets',
            data: data,
            success: function (result) {
                productpopuprefresh();
                $('#purchasetransdiv').hide();
                $('#salestranspopupdiv').show();
                var ProductDesc = $('#ProductDesc0').val();
                var product = $('#txtproduct0').val();
                $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - Last Sales Transaction Details');
                $('#salestransdiv').show();
                $('#txtquantity0').focus();
                SalesTransLoad(result);
            }
        });
    }
}

function TransactionPurchase() {
    if ($("#PrdtId0").val() != 0) {

        $('#idforlabeltype').text('All');
        if ($('#status_type').prop("checked"))
            var flag = 1;
        else
            var flag = 0;

        var data = {};
        data.ItemId = $("#PrdtId0").val();
        data.DepartmentId = ERPDeptId;
        data.UserId = ERPUserId;
        data.Type = flag;
        $.ajax({
            type: "POST",
            url: '../Purchase/PurchaseTransactionSearch',
            data: data,
            success: function (result) {
                productpopuprefresh();
                //  $('#tblurchasetrans tr td').remove();

                disable_datatable('tblurchasetrans');
                $('#tblurchasetrans tr').remove();
                $('#salestranspopupdiv').show();
                $('#purchasetransdiv').show();

                var AVCOST = '';
                if (result.length > 0) {
                    AVCOST = '[ Average Cost : ' + parseFloat(result[0].Cost).toFixed(Decimal) + ']';
                }

                var ProductDesc = $('#ProductDesc0').val();
                var product = $('#txtproduct0').val();
                $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - Last Purchase Transaction Details  ' + AVCOST);
                $('#salestransdiv').hide();
                $('#txtquantity0').focus();

                var ProdRow = "<thead><tr><th>Invoice No</th><th>Date</th><th>Supplier</th><th>Supp_No</th><th>Qty.</th><th>FC Cost</th><th>Cost</th><th>Location</th><th>Currency</th><th>Dept</th><th>PO_Ref</th><th>OtherCost</th></tr>" +
                                  "<tr><th>Invoice No</th><th>Date </th><th>Supplier</th><th>Supp_No</th><th>Qty.</th><th>FC Cost</th><th>Cost</th><th>Location</th><th>Currency </th><th>Dept</th><th>PO_Ref</th><th>OtherCost</th></tr></thead><tbody>";



                if (result.length != 0) {

                    for (var p = 0; p < result.length; p++) {
                        var a = (result[p].Rate + result[p].OtherCost).toFixed(Decimal);
                        var lpotr = '';
                        if (result[p].LPO != '0')
                            lpotr = result[p].LPO;

                        if (result[p].PurchaseType == 'Local' || SuppDetailsRight == 'Yes') {
                            ProdRow = ProdRow + "<tr id=" + 'pdctrow' + (p + 1) + ">" +
                                "<td style='width:12%' class='text-left'>Sl No: (" + result[p].SlNo + ") - Inv No: (" + result[p].InvoNo + ")</td>" +
                                "<td class='text-left'>" + result[p].InvoDate + "</td>" +
                                "<td style='width:20%' class='text-left'>" + result[p].SupplierName + "</td>" +
                                "<td class='text-left'>" + result[p].AccName + "</td>" +
                                "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                                  "<td style='text-align:right'>" + parseFloat(result[p].FCGrandTotal).toFixed(Decimal) + "</td>" +
                                "<td style='text-align:right'>" + a + "</td>" +
                                //"<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                                "<td class='text-left'>" + result[p].Locnname + "</td>" +
                                "<td class='text-left'>" + result[p].CurrencyName + "</td>" +
                                "<td class='text-left'>" + result[p].DeptName + "</td>" +
                                "<td class='text-left'>" + lpotr + "</td>" +
                                 "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                                "</tr>";
                        }
                        else {
                            ProdRow = ProdRow + "<tr id=" + 'pdctrow' + (p + 1) + ">" +
                                "<td style='width:12%' class='text-left'>Sl No: (" + result[p].SlNo + ") - Inv No: (" + result[p].InvoNo + ")</td>" +
                                "<td class='text-left'>" + result[p].InvoDate + "</td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                                  "<td style='text-align:right'>" + parseFloat(result[p].FCGrandTotal).toFixed(Decimal) + "</td>" +
                                "<td style='text-align:right'>" + a + "</td>" +
                                //"<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                                "<td class='text-left'>" + result[p].Locnname + "</td>" +
                                "<td class='text-left'>" + result[p].CurrencyName + "</td>" +
                                "<td class='text-left'>" + result[p].DeptName + "</td>" +
                                "<td class='text-left'>" + lpotr + "</td>" +
                                 "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                                "</tr>";
                        }
                    }

                    $('#tblurchasetrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblurchasetrans', 'MultiplePurchaseT');
                    $('#tblurchasetrans').scrollTop(0);

                }
                else {
                    $('#tblurchasetrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblurchasetrans', 'MultiplePurchaseT');
                }
            }
        });
    }
}

function TransactionAll() {
    if ($("#PrdtId0").val() != 0) {

        $('#idforlabeltype').text('Previous');
        if ($('#status_type').prop("checked"))
            var flag = 1;
        else
            var flag = 0;

        var data = {};
        data.ItemId = $("#TransPrdtId0").val();
        data.DepartmentId = ERPDeptId;
        data.UserId = ERPUserId;
        data.Type = flag;
        $.ajax({
            type: "POST",
            url: "../Purchase/TransactionSearch",
            data: data,
            success: function (result) {

                var ProductDesc = $('#ProductDesc0').val();
                var product = $('#txtproduct0').val();

                disable_datatable('tblalltrans');
                productpopuprefresh();
                $('#salestranspopupdiv').show();
                $('#salestransdiv').hide();
                $('#alltranstransdiv').show();
                $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - All Transaction Details');
                $('#purchasetransdiv').hide();
                $("#txtquantity0,#txtproduct0").blur();
                $('#tblalltrans tr').remove();

                var ProdRow = "<thead><tr><th>Bill Number</th><th>Invoice Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account Name</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Dept</th><th>Job Code</th></tr>" +
                            "<tr><th>Bill Number</th><th>Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account Name</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Dept</th><th>Job Code</th></tr></thead><tbody>";

                if (result.length != 0) {

                    var BalQty = parseInt(result[0].OpeningQty);

                    for (var n = 0; n < result.length; n++) {
                        if (result[n].Status == 'IN') {
                            BalQty += parseInt(result[n].Quantity)
                        }
                        else {
                            BalQty = BalQty - parseInt(result[n].Quantity)
                        }

                        ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                              "<td class='text-left'  style='width:1%'> " + result[n].BillNo + "</td>" +
                                "<td class='text-left' style='width:1%'>" + result[n].InvoDate + " </td>" +
                              "<td class='text-left' style='width:1%'>" + result[n].TransType + "  </td>" +
                             "<td class='text-left' style='width:3%'>" + result[n].Salesman + " </td>" +
                               "<td class='text-left' style='width:1%'>" + result[n].Status + "  </td>" +
                             "<td class='text-left' style='width:6%'>" + result[n].AccountName + " </td>" +
                               "<td class='text-left' style='width:6%'>" + result[n].Remarks + " </td>" +
                             "<td class='text-left' style='width:1%'>" + result[n].Quantity + " </td>" +
                             "<td class='text-left' style='width:1%'>" + BalQty + "  </td>" +
                             "<td class='text-right' style='width:3%'>" + parseFloat(result[n].Cost || 0).toFixed(Decimal) + "   </td>" +
                             "<td class='text-right' style='width:3%'>" + parseFloat(result[n].TransPrice || 0).toFixed(Decimal) + " </td>" +
                              "<td class='text-left' style='width:5%'>" + result[n].Locnname + " </td>" +
                               "<td class='text-left' style='width:1%'>" + result[n].DeptName + "  </td>" +
                               "<td class='text-left' style='width:6%'>" + result[n].JobCode + "  </td>" + "</tr>";
                    }
                    $('#tblalltrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblalltrans', 'MultipleAllTransaction');
                    $('#alltranstransdiv').scrollTop(0);
                }
                else {
                    $('#tblalltrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblalltrans', 'MultipleAllTransaction');
                }
            }
        });

    }
}


$(document).keydown(function (e) {

    var x = event.keyCode;
    if ((x > 111 && x < 124)) {                  //Functional Keys default function block  
        if ((x == 118)) {                     // F7 - Pop Up to Show Sales Transaction Details of Selected Product 

            salestranspopuprefresh();
            $('#status_type').prop("checked", false)
            TransactionSales();
        }

        else if ((x == 119)) {                         // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 

            salestranspopuprefresh();
            $('#status_type').prop("checked", false)
            TransactionPurchase();

        }
        else if ((x == 120)) {  // F9 :   All Transaction details Popup      

            salestranspopuprefresh();
            $('#status_type').prop("checked", false)
            TransactionAll();
        }

        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = false;
        return false;

    }
    if ((e.altKey && e.keyCode == 83) && (!$("#salestranspopupdiv").is(":visible"))) {                        //Alt+S
        if (copyflag != 1)
            savedeliveryOrder(1);
    }
    else if ((e.altKey && e.keyCode == 67) && (!$("#salestranspopupdiv").is(":visible"))) {                 //Alt+C      
        if (copyflag != 1)
            GetRows(0);
    }
    else if ((e.altKey && e.keyCode == 78) && (!$("#salestranspopupdiv").is(":visible"))) {                  //Alt+N
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
    else if (e.altKey && e.keyCode == 49 && (copyflag == 0)) {
        $('#typecredit').prop("checked", true);

    }
    else if (e.altKey && e.keyCode == 50 && (copyflag == 0)) {
        $('#typecash').prop("checked", true);

    }
    else if (e.altKey && e.keyCode == 49) { //alt+1 


    }
    else if (e.altKey && e.keyCode == 51) { //alt+3  

    }

    else if ((e.altKey && e.keyCode == 52) && (!$("#addacnttype").is(":visible"))) {                      //Alt+4    :   All Transaction details Popup      

    }

});

//Pop Up for Sales Transactions
function SalesTransLoad(result) {

    disable_datatable('tblsalestrans');
    $('#tblsalestrans tr').remove();
    var ProdRow = "<thead><tr><th>SalesInvoice</th><th>Date</th><th style='width:20%'>AccountName</th><th style='width:6%'>Qty.</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr>" +
                               "<tr><th>SalesInvoice</th><th>Date</th><th style='width:20%'>AccountName</th><th style='width:6%'>Qty.</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr></thead><tbody>";


    if (result.length != 0) {

        for (var n = 0; n < result.length; n++) {

            ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
               "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
               "<td class='text-left'>" + result[n].InvDate + "                                   </td>" +
               "<td  class='text-left'>" + result[n].CustName + "                                   </td>" +
               //"<td style='width:15%' class='text-left'>" + result[n].CustAddress + "                                   </td>" +
               "<td class='text-right'>" + result[n].ProdQty + "                                   </td>" +
               "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
               "<td class='text-left'>" + result[n].Location + " </td>" +
               "<td class='text-left'>" + result[n].SalesMan + " </td>" +
               //"<td style='width:7%' class='text-left'>" + result[n].LPONumber + "                                   </td>" +
               "<td class='text-left'>" + result[n].DepartmentName + "                                   </td>" +
                "</tr>";
        }
        $('#tblsalestrans').html(ProdRow + '</tbody>');
        datatableWithsearch('tblsalestrans', 'MultipleSalesT');
        $('#tblsalestrans').scrollTop(0);
    }
    else {
        $('#tblsalestrans').html(ProdRow + '</tbody>');
        datatableWithsearch('tblsalestrans', 'MultipleSalesT');
    }
}


function salestranspopuprefresh() {

    $('#tblsalestrans tr td').remove();
    $('#tblurchasetrans tr td').remove();
    $('#tblalltrans tr td').remove();
    $('#salestranspopupdiv').hide();
    $('#salestransdiv').hide();
    $('#alltranstransdiv').hide();
    $('#purchasetransdiv').hide();
    $('#salesheader').text('Transaction Details');
    $('#txtproduct0').focus();
}

//Save Sales Order
function savedeliveryOrder(flg) {

    if ($('#typecash').prop("checked")) {
        $("#select_payterms").val(1);
    }
    else if ($('#typecredit').prop("checked")) {
        $("#select_payterms").val(2);
    }

    if ($('#select_salesman').val() == 0 || $('#select_salesman').val() == '')
        $('#select_salesman').val(UserSalesmanId)

    var r = parseFloat($('#txtcrncyrate').val());
    $("#txtcrncyrate").val(isNaN(r) ? 0 : r);
    var rowcount = CountRows();
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else if (copyflag == 1) {
        return false;
    }
    else if (($('#txtlpono').val()||0) == 0) { 
        warningshow('Please Select LPO No', 'txtlpono');
    }
    else if ($.trim($("#txtcustomer").val()) == '') {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    else if (($("#txtCustId").val() == 0) && ($('#typecredit').prop("checked"))) {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    else if ($('#select_place').val() == 0) {
        warningshow('Please Select Place', 'select_place');
    }
    else if ($('#select_vehicle').val() == 0) {
        warningshow('Please Select Vehicle', 'select_vehicle');
    }
    else if ($('#select_driver').val() == 0) {
        warningshow('Please Select Driver', 'select_driver');
    }      
    else if (rowcount == 0) {
        warningshow('No Products Added!', 'txtproduct0');
    }
    else {
        if (flg == 1)
        { $('#btnsubmit').prop('disabled', true); }
        else if (flg == 2)
        { $('#btnsaveedit').prop('disabled', true); } 
        
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
            var DeliveryOrderNo = $('#txtBillSlNo').val();
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
            if ($('#select_location' + k).val() == 0 || $('#select_location' + k).val() == '' || $('#select_location' + k).val() == null)
                LocnId = UserLocationId;
            var BatchSNo = 1;
            var Batch = 'B';
            var PayType = $('#select_payterms').val();
            var LPONumber = $('#txtlpono').val();
            var CustId = $('#txtCustId').val();
            var CustName = $('#txtcustomer').val();
            var CustAddress = $('#txtaddress').val();
            var InvDate = $('#txtivdate').val();
            var VehicleId = $('#select_vehicle').val();
            var ExpectedDate = $('#txtExpdate').val();
            var LocId = $('#select_location1').val();
            var SalesManId = $('#select_salesman').val();
            var AreaId = $('#select_place').val();
            var CurrencyId = $('#select_crncy').val();
            var CurrencyRate = $('#txtcrncyrate').val();
            var DriverId = $('#select_driver').val();
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
            var QtnNo = $('#qutnnum' + k).val()||0;
            var OrderNo = $('#ordno' + k).val() || 0;
            var SalesNo = $('#bilnum' + k).val() || 0;
            var BillSeriesId = $('#bilsers' + k).val() || 0;
            var SaleSubId = $('#salesubid' + k).val()||0;
            var SordSubId = $('#ordsubid' + k).val() || 0;

            if (ProductCode != undefined) {

                oArray.push({
                    'ProductId': ProductId,
                    'ProductCode': ProductCode,
                    'ProductDescr': ProductDescr,
                    'DeliveryOrderNo': DeliveryOrderNo,
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
                    'VehicleId': VehicleId,
                    'ExpectedDate': ExpectedDate,
                    'LocId': LocId,
                    'SalesManId': SalesManId,
                    'AreaId': AreaId,
                    'CurrencyId': CurrencyId,
                    'CurrencyRate': CurrencyRate,
                    'DriverId': DriverId,
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
                    'QtnNo': QtnNo,
                    'OrderNo': OrderNo,
                    'SalesNo': SalesNo,
                    'BillSeriesId': BillSeriesId,
                    'SaleSubId': SaleSubId,
                    'SordSubId': SordSubId,
                })
            }

        }
        if (oArray != "") {
        var data = { 'DeliveryOrderModel': oArray };
        if (flg == 1)
        {
        $.ajax(
        {

            type: "POST",
            url: "../SalesInvoice/DeliveryOrderGasTradingInsertandUpdate",
            data: data,
            success: function (result) {
               
                    var status = result.oList[0].Status;
                    var billno = result.oList[0].DeliveryOrderNo;
                    var Prodcod = result.oList[0].ProductCode;
                    if (flg == 1)
                    { $('#btnsubmit').prop('disabled', false); }
                    else if (flg == 2)
                    { $('#btnsaveedit').prop('disabled', false); }
                    if (status == 5)
                    { Showalerts(status, Prodcod); }
                    else if (status != 0) {                      
                       Showalerts(status, billno);
                       Tbldelete();
                    }
                    else {

                        $('#tblAlert tr').remove();
                        $('#alertpopup').show();
                        $('#alertdiv').show();
                        $('#alertdiv1').hide();
                        var Prod1 = "<tr class='jsgrid-row'><td colspan=4 style='border-top: 1px solid white;'><h2 style='color:#FF586B'>Not enough quantity on hand!</h2></td></tr>" +
                          "<tr class='jsgrid-row' style='color:#607D8B'><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Quantity</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Location</th></tr>";
                        $('#tblAlert').append(Prod1);
                        $("#btnokalert").focus();
                        for (var j = 0; j <= result.oList.length; j++) {
                            var Prod =
                            "<tr class='jsgrid-row' style='color:#607D8B'>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[j].ProductCode + "</td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[j].ProductDescr + "</td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[j].ProdQty + "</td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[j].Location + "</td></tr>";
                            $('#tblAlert').append(Prod);
                        }

                    }                                    
            }
        });
        }
        else
        {
        $.ajax(
        {
            type: "POST",
            url: "../SalesInvoice/DeliveryOrderGasTradingUpdate", 
            data: data,
            success: function (result) {
                
                    var status = result.oList[0].Status;
                    var billno = result.oList[0].DeliveryOrderNo;

                    if (flg == 1)
                    { $('#btnsubmit').prop('disabled', false); }
                    else if (flg == 2)
                    { $('#btnsaveedit').prop('disabled', false); }

                    if (status != 0) {
                        Showalerts(status, billno);
                        Tbldelete();
                    }
                    else {

                        $('#tblAlert tr').remove();
                        $('#alertpopup').show();
                        $('#alertdiv').show();
                        $('#alertdiv1').hide();
                        var Prod1 = "<tr class='jsgrid-row'><td colspan=4 style='border-top: 1px solid white;'><h2 style='color:#FF586B'>Not enough quantity on hand!</h2></td></tr>" +
                          "<tr class='jsgrid-row' style='color:#607D8B'><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Quantity</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Location</th></tr>";
                        $('#tblAlert').append(Prod1);
                        $("#btnokalert").focus();
                        for (var j = 0; j <= result.oList.length; j++) {
                            var Prod =
                            "<tr class='jsgrid-row' style='color:#607D8B'>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[j].ProductCode + "</td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[j].ProductDescr + "</td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[j].ProdQty + "</td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[j].Location + "</td></tr>";
                            $('#tblAlert').append(Prod);
                        }

                    }
                
            }
          });
            }
        }
    }
}

function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    $('#alertdiv1').hide();
    $('#savedbillno').val('');
}

//Document Ready
$(document).ready(function () {

    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserLocationGetandGets",
        data: data,
        success: function (result) {
            for (var b = 0; b <= result.oList.length; b++) {
                if (b != result.oList.length)
                    LocArray.push(result.oList[b].LocationId);
                else
                    LocnLoad(0);
            }

        }
    });

    $('.form-control').attr('autocomplete', 'off');
    Defaultfocus();

    //$('#btntrnsfr').css("height", '100%');
    //$('#select_transfer').css("height", '100%');
    $('#btnlocn').css("height", '100%');
    $('#select_locn').css("height", '100%');
    $('#btnsales').css("height", '100%');
    $('#select_salesman').css("height", '100%');
    //$('#btnsply').css("height", '85%');
    //$('#select_place').css("height", '85%');
    $('#btnterms').css("height", '85%');
    $('#select_crncy').css("height", '100%');
    $('#btnprvs,#btnnxt').css("height", '100%');
    //$('#txtBillSlNocopy').css("height", '100%');
    crncyload(0);
    placeload(0);

    deptloadView();


    Salesman(0);
    GetAreaGroupselect(0);
    DOrdrNo();
    Vehicle();
    Driver();


    $("#btnNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btnYes").focus();
        }
    });
    $("#btnYes").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnNo").focus();
        }
    });
    $("#btnNo").focus(function (e) {
        $("#btnNo").removeClass("btn btn-outline-primary");
        $("#btnNo").addClass("btn btn-primary");
    });
    $("#btnNo").focusout(function () {
        $("#btnNo").removeClass("btn btn-primary");
        $("#btnNo").addClass("btn btn-outline-primary");
    });

    $("#btnYes").focus(function (e) {
        $("#btnYes").removeClass("btn btn-outline-primary");
        $("#btnYes").addClass("btn btn-primary");
    });
    $("#btnYes").focusout(function () {
        $("#btnYes").removeClass("btn btn-primary");
        $("#btnYes").addClass("btn btn-outline-primary");
    });

    $("#btnadd").focus(function (e) {
        $("#btnadd").removeClass("btn btn-outline-primary");
        $("#btnadd").addClass("btn btn-primary");
    });

    $("#btnadd").focusout(function () {
        $("#btnadd").removeClass("btn btn-primary");
        $("#btnadd").addClass("btn btn-outline-primary");
    });

    $("#btnokalert").focus(function (e) {
        $("#btnokalert").removeClass("btn btn-outline-primary");
        $("#btnokalert").addClass("btn btn-primary");
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
    $("#btnotpsave").focus(function (e) {
        $("#btnotpsave").removeClass("btn btn-outline-warning");
        $("#btnotpsave").addClass("btn btn-warning");
    });
    $("#btnotpsave").focusout(function (e) {
        $("#btnotpsave").removeClass("btn btn-warning");
        $("#btnotpsave").addClass("btn btn-outline-warning");
    });

    $("#btncnclsave").focus(function (e) {
        $("#btncnclsave").removeClass("btn btn-outline-warning");
        $("#btncnclsave").addClass("btn btn-warning");
    });
    $("#btncnclsave").focusout(function (e) {
        $("#btncnclsave").removeClass("btn btn-warning");
        $("#btncnclsave").addClass("btn btn-outline-warning");
    });

    $("#btnsubmit").click(function (e) {
        savedeliveryOrder(1);
    });
    $("#btnsaveedit").click(function (e) {
        savedeliveryOrder(2);
    });

    $("#tax_job").change(function () {
        var selectedValue = $(this).val();
        $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"));
        var x = $('#taxpercentage_job').val();
        CalcJobAmount();
    });

    $("#txtproduct0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#txtproduct0').val() =='') {               
                $('#txtquantity0').focus();
            }
            else if ($('#PrdtId0').val() != 0) {
                if ($('#select_location0').val() == 0) {
                    warningshow('Press Enter Location', 'select_location0');
                    return false;
                }
                $('#txtquantity0').focus().select();
            }
            else if ($('#PrdtId0').val() == 0 && ($.trim($('#txtproduct0').val()) == 'job' || $.trim($('#txtproduct0').val()) == 'JOB')) {
                addpopupjob(1);
                clearrow();
                $('#productjob').focus();
            }
        }

        if (key == 13 && qtyflag == 1) {
            qtyflag == 1;
            warningshow('Not enough stock!', 'txtproduct0');
            $('#txtproduct0').val('');
            return false;
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



    $('#txt_code,#txt_cname,#txt_rate,#txtname,#select_areagroup,#txtcode,#txtdescription,#LocationName,#LocationCode,#code,#txt_fname,#txt_lname,#txt_amount,#txt_address1,#txt_address2,#txt_address3,#txtdesc,#txtExpdate').keydown(function (e) {
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
    $('#select_payterms').val(2);
    $('#typecredit').prop("checked", true);


    $("#flip1").click(function () {
        $("#panel1").slideToggle(1);
        $('#txtmsg').focus();
    });

    $('#select_payterms').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_transfer').focus();
            e.preventDefault(); s
        }
    });
    $('#select_transfer').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtcustomer').focus();
            e.preventDefault();
        }
    });
    $('#txtlpono').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#txtivdate").focus();
        }

    });

    $('#txtivdate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#txtcustomer").focus();
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
        checkpdcttextempty(this);
        $('#txtproduct0').val('');
        $('#ProductDesc0').val('');
        $('#PrdtId0').val('');
    });

    $('#select_locn').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_vehicle').focus();
            e.preventDefault();
        }
    });
    $('#select_salesman').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtproduct0').focus();
            e.preventDefault();
        }
    });
    $('#select_vehicle').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_driver').focus();
            e.preventDefault();
        }
    });
    $('#select_driver').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_location0').focus();
            e.preventDefault();
        }
    });
    $('#select_place').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_vehicle').focus();
            e.preventDefault();
        }
    });

    $('#select_crncy').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_salesman').focus();
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
            $('#txtproduct0').focus();
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
                $('#select_vehicle').focus();
            se.preventDefault();
        }
    });
    $('#txtproduct0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && $('#PrdtId0').val() != 0) {
            $('#txtquantity0').focus();
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


    // ------------------------------------------------------------------------------------------------------------Quotation--------------------

    //View Button Click to view product details against a Quotation
    $("#btnview1").click(function (e) {
        var QtnNo = '';
        var qtnmainid = 0;
        var CurncyId = '';
        var row = $('#RowGet3').val();
        var fl = 0;

        var checkboxes = document.getElementsByName('Checkcustq');
        for (var k = 0, j = checkboxes.length; k < j; k++) {
            if (checkboxes[k].checked == true) {
                fl++;
            }
        }
        if (fl == 0) {
            warningshow('Select Quotation Number');
        }
        else {
            for (var n = 1; n <= row; n++) {
                if ($("#SlNoHdCheckCust" + n).is(":checked")) {
                    CurncyId = $('#CurncyId' + n).text();
                    break;
                }
            }
            for (var m = 1; m <= row; m++) {
                if ($("#SlNoHdCheckCust" + m).is(":checked")) {
                    if (($('#CurncyId' + m).text() != CurncyId)) {
                        warningshow('Please Select Quotation with Same Curency!');
                        return false;
                    }
                    else {
                        if (QtnNo == '') {
                            QtnNo += $('#Qtncol' + m).text();
                        }
                        else {
                            QtnNo += ',' + $('#Qtncol' + m).text();
                        }
                    }
                }
            }
            var data = {};
            qtno = QtnNo;
            data.QtnNo = QtnNo;
            data.ProductId = 0;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/QuotationEntryGetProducts",
                data: data,
                success: function (result) {
                    if (QtnNo != 0)
                        ShowItemGetQtn(result.oList);
                }
            });
        }


    });


    //Button Click to add selected product details to grid from popup table (quotation table data)
    $("#btnprdtadd1").click(function (e) {
        var flg = 0;
        var row = $('#RowGet3q').val();
        $("#tblsalesinvoice tr").remove();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('SlNoCheckQtnItemq');
            for (var k = 0, j = checkboxes.length; k < j; k++) {
                if (checkboxes[k].checked == true) {
                    flg++;
                }
            }
            if (flg == 0) {
                warningshow('Select Product');
            }
            else {
                if ($("#SlNoCheckQtnItem" + m).is(":checked")) {
                    var ProductId = $('#ItemId' + m).val();
                    var Productcode = $('#Productcode' + m).text();
                    var ProductDescr = $('#Des' + m).text();
                    var unitIdgrid = $('#UnitIdgrid' + m).val();
                    var qty = parseInt($('#qty_' + m).val() || 0);
                    var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
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
                    var qtnno = $('#qtnnoRow' + m).text();
                    var Locnid = $('#LocnId' + m).text();
                    $('#txtQtnNo').val(qtnno);
                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'qutnnum' + id + " style='display:none' value='" + qtnno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px;display:none'><select disabled='' id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control'>" + LocnSelect + "</select></td>" +
                        "</tr>";
                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    $('#select_location' + id).val(Location1);
                    amountcalculation(id);
                    productpopuprefresh();
                    CalcGrandTotal(i);
                    fccalculation(i);
                    i++;
                }
                //  i = parseInt(row) + 1;
                CloseEnquiry();
                $('#txtproduct0').focus();
            }
        }
        Location1 = '';
    });
    // ------------------------------------------------------------------------------------------------------End Quotation-----------------------

    // ------------------------------------------------------------------------------------------------------------Sales Order--------------------


    //View Button Click to view product details against an Order
    $("#btnview2").click(function (e) {
        var OrdNo = '';
        var CurncyId = '';
        var row = $('#RowGet4').val();
        var fl = 0;

        var checkboxes = document.getElementsByName('Checkcustsord');
        for (var k = 0, j = checkboxes.length; k < j; k++) {
            if (checkboxes[k].checked == true) {
                fl++;
            }
        }
        if (fl == 0) {
            warningshow('Select Order Number');
        }
        else {
            for (var n = 1; n <= row; n++) {
                if ($("#SlNoHdCheckCustsord" + n).is(":checked")) {
                    CurncyId = $('#CurncyId' + n).text();
                    break;
                }
            }
            for (var m = 1; m <= row; m++) {
                if ($("#SlNoHdCheckCustsord" + m).is(":checked")) {
                    if (($('#CurncyId' + m).text() != CurncyId)) {
                        warningshow('Please Select Sales Order with Same Curency!');
                        return false;
                    }
                    else {
                        if (OrdNo == '') {
                            OrdNo += $('#Qtncol' + m).text();
                        }
                        else {
                            OrdNo += ',' + $('#Qtncol' + m).text();
                        }
                    }
                }
            }
            var data = {};
            sono = OrdNo;
            data.OrdNo = OrdNo;
            data.ProductId = 0;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesOrderGetProductsDeliveryOrder",
                data: data,
                success: function (result) {
                    if (OrdNo != 0)
                        ShowItemGetSalesOrder(result.oList);
                }
            });
        }
    });


    //Button Click to add selected product details to grid from popup table (SalesOrder table data)
    $("#btnprdtadd2").click(function (e) {
        var row = $('#RowGet6').val();
        var flg = 0;
        $("#tblsalesinvoice tr").remove();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('SlNoCheckQtnItemso');
            for (var k = 0, j = checkboxes.length; k < j; k++) {
                if (checkboxes[k].checked == true) {
                    flg++;
                }
            }
            if (flg == 0) {
                warningshow('Select Product');
            }
            else {
                if ($("#SlNoCheckSoItem" + m).is(":checked")) {
                    var ProductId = $('#ItemId' + m).val();
                    var Productcode = $('#Productcode' + m).text();
                    var ProductDescr = $('#Des' + m).text();
                    var unitIdgrid = $('#UnitIdgrid' + m).val();
                    var qty = parseInt($('#qty_' + m).val() || 0);
                    var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
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
                    var ordersubid = $('#ordersubidRow' + m).text();
                    var Locnid = $('#LocnId' + m).val();

                    $('#txtOrdNo').val(orderno);
                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'ordsubid' + id + " style='display:none' value='" + ordersubid + "' /><input type='text' id=" + 'ordno' + id + " style='display:none' value='" + orderno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px;display:none'><select disabled='' id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control'>" + LocnSelect + "</select></td>" +
                        "</tr>";

                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    $('#select_location' + id).val(Locnid);
                    amountcalculation(id);
                    productpopuprefresh();
                    CalcGrandTotal(i);
                    fccalculation(i);
                    i++;
                }
                //  i = parseInt(row) + 1;
                CloseEnquiry();
                $('#txtproduct0').focus();
            }
        }

    });
    // ------------------------------------------------------------------------------------------------------End Sales Order-----------------------

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
        }
        var data = {};
        data.BlSlNo = Billsln;
        data.BlSeriesId = Billsr;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        sino = Billsln;
        sisno = Billsr;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceGetProductsDeliveryOrder",
            data: data,
            success: function (result) {
                if (Billsr != 0)
                    ShowItemGetSalesInvoice(result.oList);
            }
        });
    });


    //Button Click to add selected product details to grid from popup table (SalesInvoice table data)
    $("#btnprdtadd3").click(function (e) {
        var row = $('#RowGet9').val();
        var flg = 0;
        $("#tblsalesinvoice tr").remove();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('CheckItemsi');
            for (var k = 0, j = checkboxes.length; k < j; k++) {
                if (checkboxes[k].checked == true) {
                    flg++;
                }
            }
            if (flg == 0) {
                warningshow('Select Product');
                return false;
            }
            else {

                if ($("#SlNoCheckSIItem" + m).is(":checked")) {
                    var ProductId = $('#ItemId' + m).val();
                    var Productcode = $('#Productcode' + m).text();
                    var ProductDescr = $('#Des' + m).text();
                    var unitIdgrid = $('#UnitIdgrid' + m).val();
                    var qty = parseInt($('#qty_' + m).val() || 0);
                    var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
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
                    var slssubid = $('#slssubidRow' + m).text();

                    $('#txtSalesNo').val(srlno);
                    $('#txtSalesSrlNo').val(srsno);
                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'salesubid' + id + " style='display:none' value='" + slssubid + "' /><input type='text' id=" + 'bilsers' + id + " style='display:none' value='" + srsno + "' /><input type='text' id=" + 'bilnum' + id + " style='display:none' value='" + srlno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='checksaleqty(" + id + "),amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'> <input type='text' id=" + 'tmpqty' + id + " style='display:none' value='" + qty + "' />  </td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px;display:none'><select disabled='' id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control'>" + LocnSelect + "</select></td>" +
                        "</tr>";

                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    $('#select_location' + id).val(Locnid);
                    amountcalculation(id);
                    productpopuprefresh();
                    CalcGrandTotal(i);
                    fccalculation(i);
                    i++;
                }
                CloseEnquiry();
                $('#txtproduct0').focus();
            }
        }

    });
    // ------------------------------------------------------------------------------------------------------End Sales Invoice-----------------------

});

//Main Function For Transfer dropdown
function Transfer() {
    disabletables();
    if ($('#select_transfer').val() == 1)      //Quotation
    {
        Enquirypopupwindow(1);
    }
    else if ($('#select_transfer').val() == 2)      //Sales Order 
    {
        Enquirypopupwindow(2);
    }
    else if ($('#select_transfer').val() == 3)       //Sales Invoice
    {
        Enquirypopupwindow(3);
    }
}

//Show Enquiry PopUp and Display Enquiry List
function Enquirypopupwindow(id) {
    disabletables();
    $('#Qtndiv').hide();
    $('#Qtndivcust').hide();
    $('#Qtndivsub').hide();
    $('#SalesOrderdiv').hide();
    $('#SalesOrderdivcust').hide();
    $('#SalesOrderdivsub').hide();
    $('#SalesInvdiv').hide();
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').hide();
    if (id == 1)                                                      //List All Quotation Entry Details in pop up  
    {
        if ($('#txtCustId').val() == 0)            //If CustId==0 Get all Quotation Details
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Quotation Entry Details');
            $('#Qtndiv').show();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdiv').hide();
            $('#SalesOrderdivcust').hide();
            $('#SalesOrderdivsub').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            var data = {};
            data.QuotationNo = 0;
            data.CustId = 0;
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/QuotationEntryRecall",
                data: data,
                success: function (result) {
                    $('#tblQtn tr').remove();
                    QuotationLoad(result.oList);
                }
            });
        }
        else                                //If CustId!=0 Get Quotation Details against That Customer                     
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Quotation Entry Details');
            $('#Qtndivcust').show();
            $('#Qtndiv').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdiv').hide();
            $('#SalesOrderdivcust').hide();
            $('#SalesOrderdivsub').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            var data = {};
            data.QuotationNo = 0;
            data.CustId = $('#txtCustId').val();
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/QuotationEntryRecall",
                data: data,
                success: function (result) {
                    $('#tblQtncust tr').remove();
                    QuotationCustLoad(result.oList);
                }
            });
        }
    }
    else if (id == 2)                                                      //SalesOrder
    {
        if ($('#txtCustId').val() == 0)  //If CustId==0 Get all SalesOrder Details
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Sales Order Details');
            $('#SalesOrderdiv').show();
            $('#Qtndiv').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdivcust').hide();
            $('#SalesOrderdivsub').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            var data = {};
            data.CustId = 0;
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesOrderRecallDeliveryOrder",
                data: data,
                success: function (result) {
                    $('#tblSalesOrder tr').remove();
                    SalesOrderLoad(result.oList);
                }
            });
        }
        else                                //If CustId!=0 Get SalesOrder Details against That Customer                     
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Sales Order Details');
            $('#SalesOrderdivcust').show();
            $('#Qtndiv').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdiv').hide();
            $('#SalesOrderdivsub').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            var data = {};
            data.CustId = $('#txtCustId').val();
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesOrderRecallDeliveryOrder",
                data: data,
                success: function (result) {
                    $('#tblSalesOrdercust tr').remove();
                    SalesOrderCustLoad(result.oList);
                }
            });
        }
    }
    else if (id == 3)                                                      //List All Sales Invoice Details in pop up 
    {
        if ($('#txtCustId').val() == 0)            //If CustId==0 Get all Sales Invoice Details
        {
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
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            var data = {};
            data.CustId = 0;
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceRecallDeliveryOrder",
                data: data,
                success: function (result) {
                    $("#tblSalesInv tr").remove();
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
            $('#Qtndiv').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdiv').hide();
            $('#SalesOrderdivcust').hide();
            $('#SalesOrderdivsub').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivsub').hide();
            var data = {};
            data.CustId = $('#txtCustId').val();
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceRecallDeliveryOrder",
                data: data,
                success: function (result) {
                    $("#tblSalesInvcust tr").remove();
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
    $('#Qtndiv').hide();
    $('#Qtndivcust').hide();
    $('#Qtndivsub').hide();
    $('#SalesOrderdiv').hide();
    $('#SalesOrderdivcust').hide();
    $('#SalesOrderdivsub').hide();
    $('#SalesInvdiv').hide();
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').hide();
    $('#Enquirypopup').hide();
    $('#Qtndiv').hide();
    $('#RowGet1').val(0);
    $('#RowGet').val(0);
    $('#RowGet2').val(0);
    $('#RowGet4').val(0);
    $('#RowGet5').val(0);
    $('#RowGet6').val(0);
    $('#RowGet7').val(0);
    $('#RowGet8').val(0);
    $('#RowGet9').val(0);
    $('#txtEnquiryNo').hide();
    $('#txtQuotationNo').show();
    $('#Warningpopup').fadeOut();
    sono = ''; sino = ''; sisno = ''; qtno = '';
    //  removetblrow();
    $('#SearchProdso').val('')
    $('#hiddenProdIdso').val('');
    $('#SearchProdsi').val('')
    $('#hiddenProdIdsi').val('');

    $('#SearchCustso').val('')
    $('#hiddencustIdso').val(0);
    $('#SearchFromdateso').val(CurDate);
    $('#SearchToDateso').val(CurDate);

    $('#SearchFromdateso1').val(CurDate);
    $('#SearchToDateso1').val(CurDate);

    $('#SearchCustsi').val('')
    $('#hiddencustIdsi').val(0);
    $('#SearchFromdatesi').val(CurDate);
    $('#SearchToDatesi').val(CurDate);

    $('#SearchFromdatesi1').val(CurDate);
    $('#SearchToDatesi1').val(CurDate);

    $('#SearchCustqtn').val('')
    $('#hiddencustIdqtn').val(0);
    $('#SearchFromdateqtn').val(CurDate);
    $('#SearchToDateqtn').val(CurDate);

    $('#SearchFromdateqtn1').val(CurDate);
    $('#SearchToDateqtn1').val(CurDate);

    $('#SearchProdqtn').val('')
    $('#hiddenProdIdqtn').val('');
    if (($('#txtcrncyrate').val() == 1 || $('#GrandTotal').val() <= 0)) {
        $("#fc").css("opacity", '0');
    }
    else {
        $("#fc").css("opacity", '100');
    }
}

//Remove Rows of All The Tables In the Popup
function removetblrow() {
    $('#tblQtn tr').remove();
    $('#tblQtncust tr').remove();
    $('#tblQtnsub tr').remove();
    $('#tblSalesOrder tr').remove();
    $('#tblSalesOrdercust tr').remove();
    $('#tblSalesOrdersub tr').remove();
    $('#tblSalesInv tr').remove();
    $('#tblSalesInvcust tr').remove();
    $('#tblSalesInvsub tr').remove();
}

//Disable all tables
function disabletables() {

    disable_datatable('tblQtn');
    disable_datatable('tblQtncust');
    disable_datatable('tblQtnsub');

    disable_datatable('tblSalesOrder');
    disable_datatable('tblSalesOrdercust');
    disable_datatable('tblSalesOrdersub');

    disable_datatable('tblSalesInv');
    disable_datatable('tblSalesInvcust');
    disable_datatable('tblSalesInvsub');
}

//Clear Id's in Search
function emptyId(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddenProdIdsi').val(0);

        $('#hiddenProdIdso').val(0);

        $('#hiddenProdIdqtn').val(0);

        $('#hiddencustIdqtn').val(0);

        $('#hiddencustIdsi').val(0);

        $('#hiddencustIdso').val(0);
    }
}

//Back Button for Transfer Popup
function Back(id) {
    if (id == 1) {
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#Qtndiv').hide();
        $('#Qtndivcust').show();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
    }
    else if (id == 2) {
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').show();
        $('#SalesOrderdivsub').hide();
    }
    else if (id == 3) {
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').show();
        $('#SalesInvdivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
    }
}

//---------------------------------------------------------------------------------------------End---------------------------------------------

//--------------------------------------------------------------------------------------------Quotation---------------------------------------------

//List Quotation Details in Quotation Popup 
function QuotationLoad(result) {
    disable_datatable('tblQtn');
    var responseText = "<thead><tr><th></th><th>Quotation No</th><th>Customer</th><th>Phone No</th><th>Invoice Date</th><th>TRN Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style=display:none;></th><th style=display:none;></th><th></th></tr>" +
    "<tr><th>Select</th><th>Quotation No</th><th>Customer</th><th>Phone No</th><th>Invoice Date</th><th>TRN Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style=display:none;></th><th style=display:none;></th><th>Details</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" name="Checkqtn" id= ' + 'SlNoCheckRevision' + slno + ' style="zoom:1.5;" ></td>' +
           '<td id=' + 'Enquirycol' + slno + '>' + result[l].QuotationNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           //'<td>' + result[l].PhoneNumber + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].DocNumber + '</td>' +
           '<td>' + result[l].Salesman + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           '<td style="display:none" id=' + 'Qtnnum' + slno + '> ' + result[l].QuotationNo + '</td>' +
           '<td style="display:none" id=' + 'Qtmainid' + slno + '>' + result[l].QuotationEntryMainId + '</td>' +
           '<td><a onclick="ViewRevisionDetails(' + result[l].QuotationNo + ')">Details</a></td>' +
           '</tr>';

    }
    $('#tblQtn').html(responseText + '</tbody>');
    datatableWithsearch('tblQtn', 'Single');
    $('#RowGet2').val(result.length);
}


//List Quotation Details against a customer in Quotation Popup 
var Location1 = '';
function QuotationCustLoad(result) {
    disable_datatable('tblQtncust');
    var responseText = "<thead><tr><th><input type='checkbox' style='zoom:1.5;' checked id= 'SlNoHdCheckCust0' 'custom-control-input cz-bg-image-display' onchange='selectallcust4()'>&nbsp;&nbsp;&nbsp;Select</th><th>Quotation No</th><th>Customer</th><th>Phone No</th><th>Invoice Date</th><th>TRN Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th><th></th></tr>" +
        "<tr><th style='width:110px'>Select</th><th>Quotation No</th><th>Customer</th><th>Phone No</th><th>Invoice Date</th><th>TRN Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th><th>Details</th></tr></thead><tbody>";

    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" checked name="Checkcustq" id= ' + 'SlNoHdCheckCust' + slno + ' ></td>' +
           '<td id=' + 'Qtncol' + slno + '>' + result[l].QuotationNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           //'<td>' + result[l].PhoneNumber + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].DocNumber + '</td>' +
           '<td>' + result[l].Salesman + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           '<td style="display:none" id=' + 'CurncyId' + slno + '>' + result[l].CurrencyId + '</td>' +
           '<td id=' + 'qtnmainid' + slno + ' style="display:none">' + result[l].QuotationEntryMainId + '</td>' +
           '<td><a onclick="ViewRevisionDetails(' + result[l].QuotationNo + ')">Details</a></td>' +
           '</tr>';
    }
    $('#tblQtncust').html(responseText + '</tbody>');
    datatableWithsearch('tblQtncust', 'Multiple');
    $('#RowGet3').val(result.length);
    //for (var l = 0; l < 1; l++) {
    Location1 = result[0].Location;
    //    break;
    //}
}


//Selecting checkbox for Quotation Customer List
function selectallcust4() {
    var rowCountq = $('#RowGet3').val();
    var flag = $("#SlNoHdCheckCust0").is(":checked");
    for (var h = 1; h <= rowCountq; h++) {
        if (document.getElementById("SlNoHdCheckCust" + h) != null) {
            document.getElementById("SlNoHdCheckCust" + h).checked = flag;
        }
    }
}

//ProductList in the DB based on Quotation No 
function ShowItemGetQtn(result) {
    $('#Qtndivcust').hide();
    $('#Qtndivsub').show();
    disable_datatable('tblQtnsub');
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5;' checked id= 'SlNoCheckQtnItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtqtn()'>&nbsp;&nbsp;&nbsp;Select</th><th>Quotation No</th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr>" +
        "<tr><th style='width:90px;'>Select</th><th>Quotation No</th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input type="checkbox" style="zoom:1.5;" checked  id= ' + 'SlNoCheckQtnItem' + slno + ' name="SlNoCheckQtnItemq" ></td>' +
       '<td id=' + 'qtnnoRow' + slno + '>' + result[l].QuotationNo + '<input type="hidden" id="enqno"' + slno + '" value=' + result[l].QuotationNo + '></td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
        '<td id=' + 'Des' + slno + '>' + result[l].ProductDescr + '</td>' +
        '<td id=' + 'UnitName' + slno + '>' + result[l].UnitName + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
        '<td id=' + 'qty' + slno + '>' + parseInt(result[l].ProdQty) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].ProdQty + '></td>' +
        '<td id=' + 'rate' + slno + '>' + parseFloat(result[l].ProdRate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].ProdRate + '><input type="hidden" id="fcrte_' + slno + '" value=' + result[l].FcProdRate + '></td>' +
        '<td style=display:none; id=' + 'discount' + slno + '>' + parseFloat(result[l].ProdDisc).toFixed(Decimal) + '<input type="hidden" id="dis_' + slno + '" value=' + result[l].ProdDisc + '><input type="hidden" id="fcdis_' + slno + '" value=' + result[l].FcProdDisc + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxid' + slno + ' value= ' + result[l].TaxId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' + result[l].TaxPercent + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' + result[l].TaxableAmount + '><input type="text" style="display:none;" id= ' + 'fctaxableamt' + slno + ' value= ' + result[l].FCTaxableAmount + '></td>' +
        '<td id=' + 'taxamt' + slno + '>' + parseFloat(result[l].TaxAmount).toFixed(Decimal) + '</td><input type="hidden" id="taxamt_' + slno + '" value=' + result[l].TaxAmount + '><input type="hidden" id="fctaxamt_' + slno + '" value=' + result[l].FCTaxAmount + '>' +
        '<td id=' + 'total' + slno + '>' + parseFloat(result[l].Amount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' + result[l].Amount + '><input type="hidden" id="fctotal_' + slno + '" value=' + result[l].FCAmount + '></td></tr>';
    }

    $('#tblQtnsub').html(responseText + '</tbody>');
    datatableWithsearch('tblQtnsub', 'Multiple');
    $('#RowGet3q').val(result.length);
}

//Selecting checkbox for productslist(Quotation)
function selectallprdtqtn() {
    var rowCount = $('#RowGet3q').val();
    var flag = $("#SlNoCheckQtnItem0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoCheckQtnItem" + h) != null) {
            document.getElementById("SlNoCheckQtnItem" + h).checked = flag;
        }
    }
}

//Function Call To Load Quotation Details To the Fields against a Qtn No
function EditQtn() {
    var row = parseInt($('#RowGet2').val());
    var flg = 0;
    var checkboxes = document.getElementsByName('Checkqtn');
    for (var k = 0, j = checkboxes.length; k < j; k++) {
        if (checkboxes[k].checked == true) {
            flg++;
        }
    }
    if (flg != 1) {
        warningshow('Select One Quotation Number');
    }
    else {
        $('#Warningpopup').fadeOut();
        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheckRevision" + m).is(":checked")) {
                $('#txtEnquiryNo').hide();
                $('#txtQuotationNo').show();
                var data = {};
                data.QuotationNo = $('#Qtnnum' + m).text();
                data.DeptId = ERPDeptId;
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/QuotationEntryGetandGets",
                    data: data,
                    success: function (result) {
                        QtnEntryGets(result.oList);
                        CloseEnquiry();
                    }
                });

            }
        }
    }
}

//To Load Qtn Details To the Fields against a Qtn No 
function QtnEntryGets(result) {

    Tbldelete();
    copyrefresh();
    for (var n = 0; n < result.length; n++) {
        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
        //$('#txtaddress').val(result[n].CustAddress);
        if (result[n].SalesManId != 0 && result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 && result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(DefaultArea);
        if (result[n].CurrencyId != 0 && result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
        if (result[n].Location != 0 && result[n].Location != '')
            $('#select_locn').val(result[n].Location);
        else
            $('#select_locn').val(UserLocationId);
        $('#select_location0').val($('#select_locn').val());
        $('#GrandTotal').val((parseFloat(result[n].FCGrandTotal).toFixed(Decimal)));
        $('#FcGrandTotal').val((parseFloat(result[n].GrandTotal).toFixed(Decimal)));
        $('#FcTotalTaxable').val((parseFloat(result[n].FCTotTaxable).toFixed(Decimal)));
        $('#TotalTaxable').val((parseFloat(result[n].TotalTaxable).toFixed(Decimal)));
        $('#FcTotalDiscount').val((parseFloat(result[n].FCTotalDiscount).toFixed(Decimal)));
        $('#TotalDiscount').val((parseFloat(result[n].TotalDiscount).toFixed(Decimal)));
        $('#FcTotalTax').val((parseFloat(result[n].FCTotTax).toFixed(Decimal)));
        $('#TotalTax').val((parseFloat(result[n].TotalTax).toFixed(Decimal)));
        $('#txtmsg').val(result[n].Remarks);
        $('#gndtotal').text(parseFloat(result[n].GrandTotal).toFixed(Decimal));
        $('#txtQtnNo').val(result[n].QuotationNo);

        $('#txtdays').val(result[n].QDays);

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
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'qutnnum' + id + " style='display:none' value='" + result[n].QuotationNo + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:40px;display:none;'><select disabled='' id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control'>" + LocnSelect + "</select></td>" +
                  "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);
        $('#select_location' + id).val(result[n].Location);
        amountcalculation(id);
        i++;
    }
    // i = parseInt(result.length + 1);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    CalcGrandTotal(i);
}

//Function Call To View Revision Details of Selected Quotation No
function ViewRevisionDetails(qn) {
    $('#Warningpopup').fadeOut();
    $('#Revisionpopupdiv,#Revdiv').show();
    $('#revheader').text('Revision Details')
    $('#tblRevision tr').remove();
    var data = {};
    data.QuotationNo = qn;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/QuotationGetRevision",
        data: data,
        success: function (result) {
            ViewRevision(result.oList);
        }
    });
}

//View Revision Details In Popup
function ViewRevision(result) {
    var checkboxes = document.getElementsByName('CheckRevision');
    for (var k = 0, j = checkboxes.length; k < j; k++) {
        checkboxes[k].checked = false;
    }
    if (result.length == 0) {
        $('#tblRevision').html("<span class='label label-danger'>No records found</span>");
    }
    else {
        var responseText = "<thead><tr><th>Quotation No</th><th>Customer</th><th>Address</th><th>Date</th><th>Currency</th><th>Currency Rate</th><th>Total Discount</th><th>Total Taxable</th><th>Total Tax</th><th>Grand Toatal</th><th></th></tr></thead><tbody>";
        for (var l = 0; l < result.length; l++) {

            var slno = parseInt(l + 1);
            responseText += '<tr id=' + "row" + slno + '>' +
               '<td id=' + 'Enquirycol' + slno + '>' + result[l].QuotationNo + '</td>' +
               '<td>' + result[l].CustName + '</td>' +
               '<td >' + result[l].CustAddress + '</td>' +
               '<td>' + result[l].InvDate + '</td>' +
               '<td>' + result[l].CurrencyName + '</td>' +
               '<td>' + parseFloat(result[l].CurrencyRate).toFixed(Decimal) + '</td>' +
               '<td>' + parseFloat(result[l].TotalDiscount).toFixed(Decimal) + '</td>' +
               '<td>' + parseFloat(result[l].TotalTaxable).toFixed(Decimal) + '</td>' +
               '<td>' + parseFloat(result[l].TotalTax).toFixed(Decimal) + '</td>' +
               '<td>' + parseFloat(result[l].FCGrandTotal).toFixed(Decimal) + '</td>' +
               '</tr>';

        }
        $('#tblRevision').html(responseText + '</tbody>');
    }
}

//Saerch Customer in Quotation Popup When CustId=0
function SearchQuotation(Flag) {
    disable_datatable('tblQtn');
    if (Flag == 1)                         //search
    {

        if ($('#hiddencustIdqtn').val() == 0) {
            $('#SearchCustqtn').val('');
            $('#SearchCustqtn').focus();
        }
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Quotation Entry Details');
        $('#Qtndiv').show();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.QuotationNo = 0;
        data.CustId = $('#hiddencustIdqtn').val();
        data.FromDate = $('#SearchFromdateqtn').val();
        data.ToDate = $('#SearchToDateqtn').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryRecall",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblQtn').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    QuotationLoad(result.oList);
                }
            }
        });
    }
    else if (Flag == 0)                      //Clear
    {
        $('#SearchCustqtn').val('')
        $('#hiddencustIdqtn').val(0);
        $('#SearchFromdateqtn').val(CurDate);
        $('#SearchToDateqtn').val(CurDate);
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Quotation Entry Details');
        $('#Qtndiv').show();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.QuotationNo = 0;
        data.CustId = 0;
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryRecall",
            data: data,
            success: function (result) {
                QuotationLoad(result.oList);
            }
        });
    }
}

//Search Customer in Quotation Popup When CustId!=0
function SearchSQtnCust(flag) {
    disable_datatable('tblQtncust');
    if (flag == 1)          //Search
    {
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Quotation Entry Details');
        $('#Qtndivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.QuotationNo = 0;
        data.CustId = $('#txtCustId').val();
        data.FromDate = $('#SearchFromdateqtn1').val();
        data.ToDate = $('#SearchToDateqtn1').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryRecall",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblQtncust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    QuotationCustLoad(result.oList);
                }
            }
        });
    }
    else if (flag == 0)        //Clear
    {
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Quotation Entry Details');
        $('#Qtndivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#SearchFromdateqtn1').val(CurDate);
        $('#SearchToDateqtn1').val(CurDate);
        var data = {};
        data.QuotationNo = 0;
        data.CustId = $('#txtCustId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryRecall",
            data: data,
            success: function (result) {
                QuotationCustLoad(result.oList);
            }
        });

    }
}

//Saerch Product in Quotation Popup 
var qtno = '';
function SearchSQtnSub(Flag) {
    disable_datatable('tblQtnsub');
    if (Flag == 1)                          //search
    {
        if ($('#hiddenProdIdqtn').val() == 0) {
            $('#SearchProdqtn').val('');
            $('#SearchProdqtn').focus();
        }
        var data = {};
        data.QtnNo = qtno;
        data.ProductId = $('#hiddenProdIdqtn').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryGetProducts",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblQtnsub').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    ShowItemGetQtn(result.oList);
                }
            }
        });
    }

    else if (Flag == 0) {
        $('#SearchProdqtn').val('')
        $('#hiddenProdIdqtn').val('');

        var data = {};
        data.QtnNo = qtno;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryGetProducts",
            data: data,
            success: function (result) {
                ShowItemGetQtn(result.oList);
            }
        });
    }                    //Clear
}


//---------------------------------------------------------------------------------------------End Quotation------------------------------------

//-------------------------------------------------------------------------------------------Sales Order--------------------------------


//List Sales Order Details in Popup 
function SalesOrderLoad(result) {
    disable_datatable('tblSalesOrder');
    var responseText = "<thead><tr><th></th><th>Order No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr>" +
        "<tr><th>Select</th><th>Order No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" name="CheckSlord" id= ' + 'SlNoCheckSlord' + slno + ' ></td>' +
           '<td id=' + 'Enquirycol' + slno + '>' + result[l].OrderNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].Area + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].Currency + '</td>' +
           '<td style="display:none" id=' + 'Qtnnum' + slno + '> ' + result[l].OrderNo + '</td>' +
           '<td style="display:none" id=' + 'Qtmainid' + slno + '>' + result[l].SalesOrderMainId + '</td>' +
           '</tr>';
    }
    $('#tblSalesOrder').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesOrder', 'Single');
    $('#RowGet5').val(result.length);
}


//List  Sales Order Details against a customer in Popup 
function SalesOrderCustLoad(result) {
    disable_datatable('tblSalesOrdercust');
    var responseText = "<thead><tr><th style='width:90px;'><input type='checkbox' style='zoom:1.5;' checked id= 'SlNoHdCheckCustso0' 'custom-control-input cz-bg-image-display' onchange='selectallcust2()'>&nbsp;&nbsp;&nbsp;Select</th><th>Order No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th></tr>" +
        "<tr><th style='width:90px;'>Select</th><th>Order No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" name="Checkcustsord" checked id= ' + 'SlNoHdCheckCustsord' + slno + ' ></td>' +
           '<td id=' + 'Qtncol' + slno + '>' + result[l].OrderNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].Area + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].Currency + '</td>' +
           '<td style="display:none" id=' + 'CurncyId' + slno + '>' + result[l].CurrencyId + '</td>' +
           '</tr>';
    }
    $('#tblSalesOrdercust').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesOrdercust', 'Multiple');
    $('#RowGet4').val(result.length);
}

//Selecting checkbox for Sales Order Customer List
function selectallcust2() {
    var rowCount = $('#RowGet4').val();
    var flag = $("#SlNoHdCheckCustso0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoHdCheckCustsord" + h) != null) {
            document.getElementById("SlNoHdCheckCustsord" + h).checked = flag;
        }
    }
}

//Function Call To Load Sales Order Details To the Fields against an Order No
function EditSalesOrder() {
    var row = parseInt($('#RowGet5').val());
    var flg = 0;
    var checkboxes = document.getElementsByName('CheckSlord');
    for (var k = 0, j = checkboxes.length; k < j; k++) {
        if (checkboxes[k].checked == true) {
            flg++;
        }
    }
    if (flg != 1) {
        warningshow('Select One Order Number');
    }
    else {
        $('#Warningpopup').fadeOut();
        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheckSlord" + m).is(":checked")) {
                var data = {};
                data.OrderNo = $('#Qtnnum' + m).text();
                data.DeptId = ERPDeptId;
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/SalesOrderGetandGetsDeliveryOrder",
                    data: data,
                    success: function (result) {
                        SalesOrderGets(result.oList);
                        CloseEnquiry();
                    }
                });

            }
        }
    }
}


//To Load Sales Order Details To the Fields against an Order No 
function SalesOrderGets(result) {
    Tbldelete();
    copyrefresh();

    if (result[0].PayType == 2)
        $('#typecredit').prop("checked", true);
    else if (result[0].PayType == 1)
        $('#typecash').prop("checked", true);

    for (var n = 0; n < result.length; n++) {
        $('#txtOrdNo').val(result[n].OrderNo);
        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
        $('#txtaddress').val(result[n].CustAddress);
        $('#select_payterms').val(result[n].PayType);
        $('#txtlpono').val(result[n].LPONumber);
        $('#txtExpdate').val(result[n].ExpectedDate);


        if (result[n].SalesManId != 0 && result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 && result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(DefaultArea);
        if (result[n].CurrencyId != 0 && result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
        if (result[n].LocId != 0 && result[n].LocId != '')
            $('#select_locn').val(result[n].LocId);
        else
            $('#select_locn').val(UserLocationId);
        $('#select_location0').val($('#select_locn').val());
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
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'ordsubid' + id + " style='display:none' value='" + result[n].SalesOrderSubId + "' /><input type='text' id=" + 'ordno' + id + " style='display:none' value='" + result[n].OrderNo + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px;display:none;'><select id=" + 'select_location' + id + " value=" + result[n].LocnId + " style='background-color:white;height:30px' disabled='' class='form-control'>" + LocnSelect + "</select></td>" +
                  "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);
        $('#select_location' + id).val(result[n].LocnId);
        amountcalculation(id);
        i++;
    }
    //   i = parseInt(result.length + 1);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    CalcGrandTotal(i);
}


//ProductList in the DB based on Order No 
function ShowItemGetSalesOrder(result) {
    $('#SalesOrderdivcust').hide();
    $('#SalesOrderdivsub').show();
    disable_datatable('tblSalesOrdersub');
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5;' checked id= 'SlNoCheckSoItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtso()'>&nbsp;&nbsp;&nbsp;Select</th><th>Order No</th></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Tax Amount</th><th>Amount</th><th style='display:none'></th><th style='display:none'><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Order No</th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th></th><th>Tax Amount</th><th>Amount</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input type="checkbox" style="zoom:1.5;" name="SlNoCheckQtnItemso" checked  id= ' + 'SlNoCheckSoItem' + slno + ' ></td>' +
       '<td id=' + 'qtnnoRow' + slno + '>' + result[l].OrderNo + '<input type="hidden" id="enqno"' + slno + '" value=' + result[l].OrderNo + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
        '<td id=' + 'Des' + slno + '>' + result[l].ProductDescr + '</td>' +
        '<td id=' + 'UnitName' + slno + '>' + result[l].UnitName + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
        '<td id=' + 'qty' + slno + '>' + parseInt(result[l].ProdQty) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].ProdQty + '></td>' +
        '<td id=' + 'rate' + slno + '>' + parseFloat(result[l].ProdRate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].ProdRate + '><input type="hidden" id="fcrte_' + slno + '" value=' + result[l].FcProdRate + '></td>' +
        '<td id=' + 'taxamt' + slno + '>' + parseFloat(result[l].TaxAmount).toFixed(Decimal) + '</td><input type="hidden" id="taxamt_' + slno + '" value=' + result[l].TaxAmount + '><input type="hidden" id="fctaxamt_' + slno + '" value=' + result[l].FCTaxAmount + '>' +
        '<td id=' + 'total' + slno + '>' + parseFloat(result[l].Amount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' + result[l].Amount + '><input type="hidden" id="fctotal_' + slno + '" value=' + result[l].FCAmount + '></td>' +
        '<td style=display:none; id=' + 'discount' + slno + '>' + parseFloat(result[l].ProdDisc).toFixed(Decimal) + '<input type="hidden" id="dis_' + slno + '" value=' + result[l].ProdDisc + '><input type="hidden" id="fcdis_' + slno + '" value=' + result[l].FcProdDisc + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxid' + slno + ' value= ' + result[l].TaxId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'LocnId' + slno + ' value= ' + result[l].LocnId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' + result[l].TaxPercent + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' + result[l].TaxableAmount + '><input type="text" style="display:none;" id= ' + 'fctaxableamt' + slno + ' value= ' + result[l].FCTaxableAmount + '></td>' +
        '<td id=' + 'ordersubidRow' + slno + ' style=display:none;>' + result[l].SalesOrderSubId + '</td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '</tr>';
    }

    $('#tblSalesOrdersub').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesOrdersub', 'Multiple');
    $('#RowGet6').val(result.length);
}

//Selecting checkbox for productslist(Sales Order)
function selectallprdtso() {
    var rowCount = $('#RowGet6').val();
    var flag = $("#SlNoCheckSoItem0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoCheckSoItem" + h) != null) {
            document.getElementById("SlNoCheckSoItem" + h).checked = flag;
        }
    }
}


//Saerch Customer in sales Order Popup When CustId=0
function SearchSOrder(Flag) {
    disable_datatable('tblSalesOrder');
    if (Flag == 1)                         //search
    {
        if ($('#hiddencustIdso').val() == 0) {
            $('#SearchCustso').val('');
            $('#SearchCustso').focus();
        }
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Order Details');
        $('#SalesOrderdiv').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.CustId = $('#hiddencustIdso').val();
        data.FromDate = $('#SearchFromdateso').val();
        data.ToDate = $('#SearchToDateso').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderRecallDeliveryOrder",
            data: data,
            success: function (result) {

                if (result.oList.length == 0) {
                    $('#tblSalesOrder').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    SalesOrderLoad(result.oList);
                }

            }
        });
    }
    else if (Flag == 0)                      //Clear
    {
        $('#SearchCustso').val('')
        $('#hiddencustIdso').val(0);
        $('#SearchFromdateso').val(CurDate);
        $('#SearchToDateso').val(CurDate);
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Order Details');
        $('#SalesOrderdiv').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.CustId = 0;
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderRecallDeliveryOrder",
            data: data,
            success: function (result) {
                SalesOrderLoad(result.oList);
            }
        });
    }
}

//Search Customer in sales Order Popup When CustId!=0
function SearchSOrderCust(flag) {
    disable_datatable('tblSalesOrdercust');
    if (flag == 1)          //Search
    {
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Order Details');
        $('#SalesOrderdivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = $('#SearchFromdateso1').val();
        data.ToDate = $('#SearchToDateso1').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderRecallDeliveryOrder",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesOrdercust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else
                    SalesOrderCustLoad(result.oList);
            }
        });
    }
    else if (flag == 0)        //Clear
    {
        $('#SearchFromdateso1').val(CurDate);
        $('#SearchToDateso1').val(CurDate);
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Order Details');
        $('#SalesOrderdivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderRecallDeliveryOrder",
            data: data,
            success: function (result) {
                SalesOrderCustLoad(result.oList);
            }
        });
    }
}

//Saerch Product in sales Order Popup
var sono = '';
function SearchSOrderSub(Flag) {
    disable_datatable('tblSalesOrdersub');
    if (Flag == 1)                          //search
    {
        if ($('#hiddenProdIdso').val() == 0) {
            $('#SearchProdso').val('');
            $('#SearchProdso').focus();
        }
        var data = {};
        data.OrdNo = sono;
        data.ProductId = $('#hiddenProdIdso').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderGetProductsDeliveryOrder",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesOrdersub').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    ShowItemGetSalesOrder(result.oList);
                }
            }
        });
    }

    else if (Flag == 0) {
        $('#SearchProdso').val('')
        $('#hiddenProdIdso').val('');

        var data = {};
        data.OrdNo = sono;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderGetProductsDeliveryOrder",
            data: data,
            success: function (result) {
                ShowItemGetSalesOrder(result.oList);
            }
        });
    }                    //Clear
}

//--------------------------------------------------------------------------------------------End-----------------------------------------------------------------

//--------------------------------------------------------------------------------------------Sales Invoice-----------------------------------------------------------------

//List Sales Invoice Details in Popup 
function SalesInvLoad(result) {
    disable_datatable('tblSalesInv');
    var responseText = "<thead><tr><th></th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr>" +
        "<tr><th>Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" name="CheckSInv" id= ' + 'SlNoChecksalesinv' + slno + ' ></td>' +
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
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/SalesGetandGetsDeliveryOrder",
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

    if (result[0].PayType == 2)
        $('#typecredit').prop("checked", true);
    else if (result[0].PayType == 1)
        $('#typecash').prop("checked", true);

    for (var n = 0; n < result.length; n++) {
        //  $('#txtBillSlNocopy').val(result[n].BillSlNo);
        $('#txtSalesNo').val(result[n].BillSlNo);
        $('#txtSalesSrlNo').val(result[n].BillSeriesId);
        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
        $('#txtaddress').val(result[n].CustAddress);
        $('#select_payterms').val(result[n].PayType);
        $('#txtlpono').val(result[n].LPONumber);
        $('#txtExpdate').val(result[n].ExpectedDate);
        if (result[n].SalesManId != 0 && result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 && result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(DefaultArea);
        if (result[n].CurrencyId != 0 && result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
        if (result[n].LocId != 0 && result[n].LocId != '')
            $('#select_locn').val(result[n].LocId);
        else
            $('#select_locn').val(UserLocationId);
        $('#select_location0').val($('#select_locn').val());
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
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button'  type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'salesubid' + id + " style='display:none' value='" + result[n].SalesSubId + "' /><input type='text' id=" + 'bilsers' + id + " style='display:none' value='" + result[n].BillSeriesId + "' /><input type='text' id=" + 'bilnum' + id + " style='display:none' value='" + result[n].BillSlNo + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='checksaleqty(" + id + "),amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' id=" + 'tmpqty' + id + " style='display:none' value='" + result[n].ProdQty + "' /><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px;display:none;'><select id=" + 'select_location' + id + " value=" + result[n].LocnId + " style='background-color:white;height:30px' disabled='' class='form-control'>" + LocnSelect + "</select></td>" +
                  "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);
        $('#select_location' + id).val(result[n].LocnId);
        amountcalculation(id);
        i++;
    }
    // i = parseInt(result.length + 1);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    CalcGrandTotal(i);
}

//List  Sales Invoice Details against a customer in Popup  
function SalesInvoiceCustLoad(result) {
    disable_datatable('tblSalesInvcust');
    var responseText = "<thead><tr><th style='width:90px;'><input type='checkbox' style='zoom:1.5;' checked id= 'SlNoHdCheckCustSlInv0' 'custom-control-input cz-bg-image-display' onchange='selectallcust1()'>&nbsp;&nbsp;&nbsp;Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr>" +
        "<tr><th style='width:90px;'>Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" name="CheckcustSInv" checked id= ' + 'SlNoHdCheckCustSlInv' + slno + ' ></td>' +
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
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5;' checked id= 'SlNoCheckSIItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtsI()'>&nbsp;&nbsp;&nbsp;Select</th><th>Bill Series</th><th>Bill No</th><th style='display:none'></th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr>" +
        "<tr><th style='width:90px;'>Select</th><th>Bill Series</th><th>Bill No</th><th style='display:none'></th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input type="checkbox" checked  style="zoom:1.5;"  id= ' + 'SlNoCheckSIItem' + slno + ' name="CheckItemsi"></td>' +
       '<td id=' + 'Billdesc' + slno + '>' + result[l].BillDescription + '<input type="hidden" id=' + 'billseriesno' + slno + ' value=' + result[l].BillSeriesId + '></td>' +
       '<td id=' + 'billnoRow' + slno + '>' + result[l].BillSlNo + '<input type="hidden" id=' + 'billnumber' + slno + ' value=' + result[l].BillSlNo + '></td>' +
        '<td id=' + 'slssubidRow' + slno + ' style=display:none;>' + result[l].SalesSubId + '</td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
        '<td id=' + 'Des' + slno + '>' + result[l].ProductDescr + '</td>' +
        '<td id=' + 'UnitName' + slno + '>' + result[l].UnitName + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
        '<td id=' + 'qty' + slno + '>' + parseInt(result[l].ProdQty) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].ProdQty + '></td>' +
        '<td id=' + 'rate' + slno + '>' + parseFloat(result[l].ProdRate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].ProdRate + '><input type="hidden" id="fcrte_' + slno + '" value=' + result[l].FcProdRate + '></td>' +
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
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.CustId = $('#hiddencustIdsi').val();
        data.FromDate = $('#SearchFromdatesi').val();
        data.ToDate = $('#SearchToDatesi').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecallDeliveryOrder",
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
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.CustId = 0;
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecallDeliveryOrder",
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
        $('#SalesInvdiv').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = $('#SearchFromdatesi1').val();
        data.ToDate = $('#SearchToDatesi1').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecallDeliveryOrder",
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
        $('#SalesInvdiv').hide();
        $('#SalesInvdivsub').hide();
        $('#SearchFromdatesi1').val(CurDate);
        $('#SearchToDatesi1').val(CurDate);
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecallDeliveryOrder",
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
            url: "../SalesInvoice/SalesInvoiceGetProductsDeliveryOrder",
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
            url: "../SalesInvoice/SalesInvoiceGetProductsDeliveryOrder",
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
        //$('#btntrnsfr').css("height", '100%');


        $('#btnsubmit').prop("disabled", false);
        $('#btnlist').prop("disabled", false);
        $('#txtBillSlNo').prop("disabled", true);
        $('#btnadd').prop("disabled", false);
        $('#txtcustomer').prop("disabled", false);
        $('#txtivdate').val(CurDate);
        $('#txttaxpercent0').val('');
        $('#txtmsg').val('');

        $('#txtBillSlNo').val('');
        $('#txtBillSlNocopy').val('');
        $('#select_payterms').val(2);
        $('#typecredit').prop("checked", true);
        $('#select_transfer').val(0);
        $('#txtcustomer').val('');
        $('#txtCustId').val(0);
        $('#select_driver').val(0);
        $('#txtvalidity').val('');
        $('#txtaddress').val('');
        $('#PriceGroupId').val(0);
        $('#select_salesman').val(UserSalesmanId);
        $('#select_vehicle').val(0);
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
        $('#TransPrdtId0').val(0);

        $('#codelength').val('');
        $('#AvgCost0').val(0);

        $('#roundgndtotal').val(0);
        $('#roundfcgndtotal').val(0);

        $('#TotalDiscount').val('0.00');
        $('#TotalTaxable').val('0.00');
        $('#TotalTax').val('0.00');
        $('#GrandTotal').val('0.00');
        $('#disc').val('0.00');
        $('#gndtotal').text('0.00');
        $('#fc').text('fc');
        $("#fc").css("opacity", '0');
        $('#btndelete').hide();
        $('#Warningpopup').fadeOut();
        GrandTotal = 0;
        DOrdrNo();
        copyflag = 0;
        foc = 0;
        qtyflag = 0;

        $("#panel1").hide();
        //$('#txttaxpercent0').css("background-color", 'white');
        //$('#txtamnt0').css("background-color", 'white');
        $('.form-control,.btn-outline-primary').prop("disabled", false);
        $('#txtBillSlNo').prop("disabled", true);
        $('#txttaxpercent0').prop("disabled", true);
        $('#txtamnt0').prop("disabled", true);

        $('.jsgrid').prop("disabled", false);
        //  $('#tour1').fadeOut();

        productpopuprefresh();

        Tbldelete();
        copyrefresh();

        $('#custlsp,#btnsaveedit').hide();
        $('#btnprvs').prop("disabled", true);
        $('#btnnxt').prop("disabled", true);


        $('#select_crncy').val(BaseCurrency);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));

        $('#txtQtnNo').val(0);
        $('#txtOrdNo').val(0);
        $('#txtSalesNo').val(0);
        $('#RowGet1').val(0);
        $('#RowGet').val(0);
        $('#RowGet2').val(0);
        $('#RowGet3').val(0);
        $('#RowGet3q').val(0);
        $('#RowGet4').val(0);
        $('#RowGet5').val(0);
        $('#RowGet6').val(0);
        $('#RowGet7').val(0);
        $('#RowGet8').val(0);
        $('#RowGet9').val(0);
        CloseEnquiry();
        Defaultfocus();
        $('#editheader').show();
        $('#select_locn').val(0);
        $('#select_location0').val(0);
        $('#locn_job').val(0);
        $('#txtExpdate').val(CurDate);
        $('#select_place').val(DefaultArea);
        $('#TotalDiscount,#TotalTaxable,#TotalTax').prop("disabled", true);
        //  $('#txtExpdate').prop("disabled", false);
        $('#txtExpdate,#txtivdate').prop("disabled", false);
        eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = '';

        //$('#txtBillSlNocopy').css("height", '100%');
        $('#btnnxt').css("height", '100%');
        $('#btnprvs').css("height", '100%');


        //$('#btntrnsfr').css("height", '100%');
        //$('#select_transfer').css("height", '100%');
        $('#billrow').css("margin-bottom", '0px');

        $('#btnsubmit').show();
        $('#btnlist,#btnview').show();
        $('#SalesDepartmentId').val('');
        $('#txtotp,#otpremarks,#otpflg').val('');
        $('#Deliveryqty').val('');
    }

}



function Defaultfocus() {
    $('#txtlpono').focus().select();
    //$('#txtcustomer').focus();
}


//Calculate GrandTotal Amount 
var GrandTotal;
function CalcGrandTotal(Id) {
    var TotalTaxable = 0;
    var TotalDiscount = 0;
    var TotalTax = 0;
    GrandTotal = 0;
    $('#GrandTotal').val('');
    $('#TotalDiscount').val('');
    $('#TotalTax').val('');
    $('#TotalTaxable').val('');
    for (var i = 1; i <= Id; i++) {
        GrandTotal = GrandTotal + parseFloat($('#txtamnt' + i).val() || 0);
        TotalDiscount = TotalDiscount + parseFloat($('#txtdiscount' + i).val() || 0);
        TotalTax = TotalTax + parseFloat($('#txttaxamnt' + i).val() || 0);
        TotalTaxable = TotalTaxable + parseFloat($('#txttaxableamnt' + i).val() || 0);
    }
    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#TotalDiscount').val(TotalDiscount.toFixed(Decimal));
    $('#TotalTax').val(TotalTax.toFixed(Decimal));
    $('#TotalTaxable').val(TotalTaxable.toFixed(Decimal));
    $('#gndtotal').text(GrandTotal.toFixed(Decimal));

    fccalculation(Id);

}

//Calculate FC of Product Row
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
        if (fc != 1) {
            $("#fc").css("opacity", '100');
        }
        else {
            $("#fc").css("opacity", '0');
        }
        $('#gndtotal').text(fcgrandtotal.toFixed(Decimal));

        $("#fc").text('FC : ' + GrandTotal.toFixed(Decimal));
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


//Calculate Product Row Amount
function amountcalculation(id) {
    var fc = $('#txtcrncyrate').val();
    var fcprodrate = 0;
    var fcproddisc = 0;
    var fctaxable = 0;
    var fctax = 0;
    var fcamnt = 0;

    var quantity = $('#txtquantity' + id).val() || 0;
    var rate = parseFloat($('#txtrate' + id).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var amount = parseFloat(quantity * rate);
    var discount = parseFloat($('#txtdiscount' + id).val() || 0);
    discount = isNaN(discount) ? 0 : discount;
    var taxableamount = parseFloat(amount - discount);
    var taxrate = parseFloat($('#txttaxpercent' + id).val() || 0);
    var taxamount = (taxableamount * taxrate) / 100;
    var totalamount = parseFloat(taxableamount.toFixed(Decimal)) + parseFloat(taxamount.toFixed(Decimal));
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

}

//Clear Product Row After Adding
function clearrow() {
    $('#TransPrdtId0').val(0);

    $('#codelength').val('');
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
}


var qtyflag = 0;
var foc = 0;

//Add Product Details To Product Grid
function productadd() {
    var a = parseFloat($('#txtdiscount0').val());
    var c = parseFloat($('#txtrate0').val());
    $("#txtdiscount0").val(isNaN(a) ? 0 : a);
    $('#txtrate0').val(isNaN(c) ? 0 : c);
    var rowcount = CountRows();
    var ProductFlag = 0;
    for (p = 1; p <= i; p++) {
        if (($('#PrdtId' + p).val() == $("#PrdtId0").val()) && $('#select_location' + p).val() == $("#select_location0").val()) {
            ProductFlag = 1;
        }
    }

    if ($.trim($("#txtproduct0").val()) == '') {
        warningshow('Please Enter The Product', 'txtproduct0');
    }
    else if ($("#PrdtId0").val() == 0) {
        warningshow('Please Enter a Valid Product', 'txtproduct0');
        $('#txtproduct0').select();
    }

    else if (($("#PrdtId0").val() != 0) && (qtyflag == 1)) {
        warningshow('Not enough stock!', 'txtproduct0');
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
    else if (checkqty(0)==false) {
        return checkqty(0);
    }
    else if ($("#txtrate0").val() == '') {
        warningshow('Please Enter The Rate', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ((BelowCost == 'NO') && (parseFloat($("#txtrate0").val()) < parseFloat($('#AvgCost0').val()))) {
        warningshow('Rate must be greater than' + $('#AvgCost0').val(), 'txtrate0');
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
        //if (ProductFlag == 1) {
        //    var Res = confirm('Product Already Added! Do You Want to Continue');
        //    if (Res == false) {
        //        clearrow();
        //        return false;
        //    }
        //}
        $('#Warningpopup').fadeOut();
        amountcalculation(0);
        var slno = rowcount + 1;
        var id = parseInt(i);
        var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + $("#PrdtId0").val() + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#txtproduct0").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + $("#ProductDesc0").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#txtquantity0').val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'><input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#AvgCost0').val()).toFixed(Decimal) + " style='background-color:white;height:30px;display:none'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#txtfcrate0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate0').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#txtfcdiscount0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#txtdiscount0').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#txtfctaxableamnt0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxableamnt0').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#txttaxpercent0').val() + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#txtfctaxamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttaxamnt0').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#txtfcamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#txtamnt0').val() + "></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:40px;display:none'><select style='background-color:white;height:30px' disabled='' id=" + 'select_location' + id + " class='form-control'>" + LocnSelect + "</select></td>" +
            "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val($('#select_unit0').val());
        $('#select_tax' + id).val($('#select_tax0').val());
        $('#select_location' + id).val($('#select_location0').val());
        i++;
        clearrow();
        productpopuprefresh();
        CalcGrandTotal(i);
        fccalculation(i);
        salestranspopuprefresh();
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
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + no + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='0' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#productjob").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='JOB'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#quantity_job').val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#fcamount_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate_job').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#fctxtdisc_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#discount_job').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#fctxttaxable_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxable_job').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#taxpercentage_job').val() + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#fctxttax_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttax_job').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#fctxtsubtotal_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#amount_job').val() + "></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:40px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_location' + id + " class='form-control'>" + LocnSelect + "</select></td>" +
            "</tr>";

        $('#tblsalesinvoice').append(prodjob);
        $('#select_unit' + id).val($('#unit_job').val());
        $('#select_tax' + id).val($('#tax_job').val());
        $('#select_location' + id).val($('#locn_job').val());
        $('#txtunit_' + id).val($('#txtunit_job').val());

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
    $('#select_location' + id).prop('disabled', true);

    $('#txtproduct0').focus();
    CalcGrandTotal(i);
    eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = ''; elocn = '';

}

function checksaleqty(id) {
    if (parseInt($('#txtquantity' + id).val()) > parseInt($('#tmpqty' + id).val())) {
        warningshow('Quantity can not be greater than ' + $('#tmpqty' + id).val());
        $('#txtquantity' + id).val('');
        return false;
    }
}

//Update Function
function updaterow(id) {
    var a = parseFloat($('#txtdiscount' + id).val());
    var c = parseFloat($('#txtrate' + id).val());
    $("#txtdiscount" + id).val(isNaN(a) ? 0 : a);
    $('#txtrate' + id).val(isNaN(c) ? 0 : c);
    if ((BelowCost == 'NO') && ($('#PrdtId' + id).val() != 0) && ($('#AvgCost' + id).val() != 0) && (parseFloat($('#txtrate' + id).val()) < parseFloat($('#AvgCost' + id).val()))) {
        warningshow('Rate must be greater than ' + $('#AvgCost' + id).val());
        $('#txtrate' + id).select();
        return false;
    }
    else if (($('#txtquantity' + id).val() == '')) {
        warningshow('Please Enter Quantity', 'txtquantity' + id);
        $('#txtquantity' + id).select();
        return false;
    }
    else if (($('#txtquantity' + id).val() == 0)) {
        warningshow('Quantity can not be Zero', 'txtquantity' + id);
        $('#txtquantity' + id).select();
        return false;
    }
    else if (parseInt($('#txtquantity' + id).val()) > parseInt($('#tmpqty' + id).val())) {
        warningshow('Quantity can not be greater than ' + $('#tmpqty' + id).val());
        $('#txtquantity' + id).val('');
        return false;
    }
    else if (($('#txtrate' + id).val() == '')) {
        warningshow('Please Enter the Rate', 'txtrate' + id);
        return false;
    }
    else if ($("#txtamnt" + id).val() < 0) {
        warningshow('Amount Cant be negative', 'txtrate' + id);
    }
    else if (foc == 0 && ($("#txtamnt" + id).val() == 0)) {
        warningshow('Amount Cant be Zero', 'txtrate' + id);
    }
    else if ($("#select_tax" + id).val() == 0) {
        warningshow('Please Select Tax', 'select_tax' + id);
        return false;
    }
    else {

        $('#row' + id).children('td,th').css('background-color', 'white');
        editflag--;
        var ratenum = parseFloat($("#txtrate" + id).val() || 0);
        $("#txtrate" + id).val(ratenum.toFixed(Decimal));
        var disnum = parseFloat($("#txtdiscount" + id).val() || 0);
        $("#txtdiscount" + id).val(disnum.toFixed(Decimal));

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
        eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = '';
    }

}

//Delete All the rows of Product Grid
function Tbldelete() {
    $('#tblsalesinvoice tr').remove();
    i = 1;
    //$('#txtproduct0').focus();
}

//Clear All Values Before Copy Function
function copyrefresh() {
    $('#select_payterms').val(2);
    $('#typecredit').prop("checked", true);
    $('#select_transfer').val(0);
    $('#txtcustomer').val('');
    $('#select_driver').val(0);
    $('#txtvalidity').val('')
    $('#txtExpdate').val(CurDate);
    $('#txtivdate').val(CurDate);
    $('#txtaddress').val('');
    $('#PriceGroupId').val(0);
    $('#select_locn').val(UserLocationId);
    $('#select_salesman').val(UserSalesmanId);
    $('#select_place').val(DefaultArea);
    $('#select_crncy').val(BaseCurrency);
    $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
    $('#select_vehicle').val(0);
    $('#txtproduct0').val('');
    $('#btndelete,#btnedit').hide();

    $('#select_unit0').val(0);
    $('#txtquantity0').val('');
    $('#txtstocktotloseqty0').val(0);
    $('#txtrate0').val('');
    $('#txtdiscount0').val('');
    $('#select_tax0').val(0);
    $('#txtamnt0').val('');
    $('#TotalDiscount').val('0.00');
    $('#TotalTaxable').val('0.00');
    $('#TotalTax').val('0.00');
    $('#GrandTotal').val('0.00');
    $('#disc').val('0.00');
    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');
    $('#AvgCost0').val(0);
    $('#select_location0').val($('#select_locn').val());
    $('#SalesDepartmentId').val('');
    $('#Deliveryqty').val(''); 
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
    $('#row' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#txtproduct' + j).val() != undefined) {
            $('#td' + j).text(slno);
            slno++;
        }
    }
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
        DeliveryOrderCopy(rowid);
    }
    else if (Result == 'true' && status == 'billcancel') {
        $('#otpflg').val(0);
        $('#OTPDiv').show();
        $('#txtotp,#otpremarks').prop('disabled', false);
        $('#txtotp').focus();
    }
    $('#confirm').fadeOut();

}

function deptloadView() {
    var data = {};
    data.DepartmentId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            $("#DepartmentCode").val(result.oList[0].DepartmentCode);
        }
    });

    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserDepartmentGetandGets",
        data: data,
        success: function (result) {
            DeptSelect = "";
            $("#select_dept").empty();
            DeptSelect = "<option value=0>-All-</option>";
            for (var j = 0; j < result.oList.length; j++) {
                DeptSelect += "<option value='" + result.oList[j].DepartmentId + "'name='" + result.oList[j].DepartmentName + "'>" + result.oList[j].DepartmentName + "</option>";
            }
            $("#select_dept").append(DeptSelect);
        }
    });
}


function GoEditInv(flg) {
    $('#txtotp,#otpremarks,#otpflg').val('')
    if (parseInt($('#SalesDepartmentId').val()) == parseInt(ERPDeptId)) {
        if (($('#Deliveryqty').val() || 0) == 0)
        {
            if (flg == 0)         //Edit
            {
                $('#otpflg').val(1);
                $('#OTPDiv').show();
                $('#txtotp,#otpremarks').prop('disabled', false);
                $('#txtotp').focus();
            }
            else if (flg == 1)    //Delete
            {
                if ($('#txtBillSlNocopy').val() == '') {
                    warningshow('Please Enter Bill Number', 'txtBillSlNocopy');
                }
                else {
                    if ($('#tblsalesinvoice tr td').length == 0) {
                        Showalerts(4, $('#txtBillSlNocopy').val());
                    }
                    else {
                        $('#confirm').show();
                        $('#confirmOk').focus();
                        $('#Confirmflag').val('billcancel'); $('#ConfirmRowId').val(0);
                        $('#confirmmessage').text('Do you want to Cancel the Bill?');
                    }
                }
            }
        }
        else {
            warningshow('Please Delete Sales Bill before editing');
        }
       
    }
    else {
        warningshow('ORDER NO : '+ $('#txtBillSlNocopy').val() + ' is From other Department');
    }
}

function CheckEditDelete()
{
    if ($.trim($('#txtotp').val()) == '') {
        warningshow('Enter OTP', 'txtotp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Opn = '';
        if ($('#otpflg').val() == 1)
        { Opn = 'Delivery Order - OTP - Edit , Do No.' + $('#txtBillSlNocopy').val(); }
        else if ($('#otpflg').val() == 0)
        { Opn = 'Delivery Order - OTP - Delete , Do No.' + $('#txtBillSlNocopy').val(); }

        var data = {};
        data.UserId = ERPUserId;
        data.OTP = $("#txtotp").val();
        data.Remarks = $('#otpremarks').val();
        data.Operation = Opn;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Home/OTPCheckforUser",
            data: data,
            success: function (result) {
                    var status = result.oList[0].Status;
                    OTPCheck(status, $('#otpflg').val());
            }
        });
    }    
}

function OTPCheck(status,flg) {
    if (status == 1) {
        if (flg == 1) {
            EditDelivery();
        }
        else if (flg == 0) {
            DeleteDeivery();
        }
    }
    else {
        warningshow('Invalid OTP', 'txtotp');
        $("#txtotp").select();
    }
}

function EditDelivery() {
    $('#OTPDiv').hide();
    $('#txtotp,#otpremarks').val('')
    if ($('#tblsalesinvoice tr').length >= 1) {
       
        copyflag = 0;
        $('.jsgrid-button').prop("disabled", false);
        $('#txtBillSlNo').val($('#txtBillSlNocopy').val());
        //$('#btntrnsfr').css("height", '100%');
        //$('#select_transfer').css("height", '100%');
        $('#btnedit').hide();
        $('#btnprint').hide();
        $('#btncustomprint').hide();

        $('#btnsaveedit').show();
        $('#copybill').hide();
        $('#btndelete,#btnview').hide();
        $('#btnwrk').hide();
        $('#bill').show();
        $('.form-control,.btn-outline-primary').prop("disabled", false);
        $('#txttaxpercent0,#CashAdvance').prop("disabled", true);
        $('#txtamnt0').prop("disabled", true);
        $('#txtBillSlNo').prop("disabled", true);
        $('#txtBillseriesId').prop("disabled", true);

        $('#TotalDiscount').prop("disabled", true);
        $('#TotalTaxable').prop("disabled", true);
        $('#TotalTax').prop("disabled", true);
        //  $('#select_location0').prop("disabled", true);
        $('#select_transfer').prop("disabled", true);
        $('#btntrnsfr').prop("disabled", true);

        $('#TotRoundOff,#txtlpono').prop("disabled", true);
        $('#Discountpercent,#TotalProducts,#TotalPdtQty').prop("disabled", true);
       
        $('#txtivdate').prop("disabled", false);
              
        $('#txttaxpercent0').css("background-color", 'WHITE');
       
        $('#txtproduct0').focus();
        $('.custom-control-input').prop("disabled", false);
        $('.jsgrid-cell input').prop("disabled", true);
        $('.jsgrid-button').prop('disabled', false);
    }
    else {
        warningshow('Please select Delivery Order', 'txtBillSlNocopy');
    }
}

function DeleteDeivery() {
    $('#Loadingsave').show();
    $('#OTPDiv').hide();
    $('#txtotp,#otpremarks').val('');
    var data = {};
    data.DeliveryOrderNo = $('#txtBillSlNocopy').val(); 
    data.DeliveryOrderMainId = 0;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/DeliveryOrderCancel", 
        data: data,
        success: function (result) {
          
            for (var i = 0; i <= result.oList.length; i++) {
                var status = result.oList[i].Status;
                var billno = result.oList[i].BillSlNo;
                var billsrs = $('#txtBillseriesId').find("option:selected").text();
                $('#Loadingsave').hide();
                Showalerts(status, billsrs, billno);
            }
        }
    });
}

//If value of CustomerId is empty
function checkcustomerempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode != 13) {
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

            $('#select_place').val(DefaultArea);
        }
    }

}


//If value of ProductId is empty
function checkpdcttextempty(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode != 13) {
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
            $('#txtamnt0').val('');
            $('#LPCost').val(0);
            $('#AvgCost0').val(0);
            $('#Sumtotqty').val(0);
            productpopuprefresh();
            qtyflag = 0;
        }

    }
}

function checkqty(id)
{
    if ((Negativebill == 'NO') &&  ($('#PrdtId' + id).val() != 0) && (parseFloat($('#txtquantity' + id).val()) > parseFloat($('#txtstocktotloseqty' + id).val()))) {
        warningshow('Not Enough Stock!Available stock is ' + $('#txtstocktotloseqty' + id).val());
        $('#txtquantity' + id).val('');
        $('#txtquantity' + id).focus();
        return false;
    }
    else { return true; }
}

//--------------Common Functions-------------
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
function Showalerts(Status, billsrlno) {
    if (Status == 1) {
        formrefresh();
        swal('Delivery Order No - ' + billsrlno, "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh();
        swal('Delivery Order No - ' + billsrlno, "Updated Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 3) {
        formrefresh();
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        swal('Delivery Order Number : ' + billsrlno + ' is not Valid', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        swal('LPO Number ' + billsrlno + ' Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }

}
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}
function datatableWithsearch(tablename, Type) {
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

    else if (Type == 'MultipleAllTransaction') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "10%", "targets": 2 }
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

